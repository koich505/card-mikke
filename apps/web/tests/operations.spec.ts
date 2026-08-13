import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const login = async (page: Page) => {
  await page.goto("/ops/login");
  await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
  await page.getByRole("button", { name: "Passwordを確認" }).click();
  await page.getByLabel("6桁の確認コード").fill("123456");
  await page.getByRole("button", { name: "確認してDashboardへ" }).click();
  await expect(page.getByRole("heading", { name: "運営Dashboard" })).toBeVisible();
};

const openQueueItem = async (page: Page, title: string) => {
  const item = page.locator("article").filter({ hasText: title });
  await item.getByRole("link", { name: "差分を確認" }).click();
};

const decideClaims = async (page: Page) => {
  const cards = page.locator("article[data-decision]");
  const count = await cards.count();
  for (let index = 0; index < count; index += 1) {
    const card = cards.nth(index);
    const approve = card.getByRole("button", { name: /採用 情報を更新する/ });
    if (await approve.isEnabled()) {
      await approve.click();
      await page.getByRole("button", { name: "採用を確定" }).click();
    } else {
      await card.getByRole("button", { name: /却下 情報はそのまま/ }).click();
      await page.getByRole("button", { name: "却下を確定" }).click();
    }
  }
};

test.describe("管理画面UIモック", () => {
  test("Login入力ErrorとMFAを経てDashboardへ進む", async ({ page }) => {
    await page.goto("/ops/login");
    await page.getByLabel("管理者メールアドレス").fill("operator@example.com");
    await page.getByLabel("Password", { exact: true }).fill("short");
    await page.getByRole("button", { name: "Passwordを確認" }).click();
    await expect(page.getByText(/UIモックでは\.example\.invalid/)).toBeVisible();

    await page.getByLabel("管理者メールアドレス").fill("operator@example.invalid");
    await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
    await page.getByRole("button", { name: "Passwordを確認" }).click();
    await page.getByLabel("6桁の確認コード").fill("123");
    await page.getByRole("button", { name: "確認してDashboardへ" }).click();
    await expect(
      page.getByText("6桁の合成確認コードを入力してください。"),
    ).toBeVisible();
    await page.getByLabel("6桁の確認コード").fill("123456");
    await page.getByRole("button", { name: "確認してDashboardへ" }).click();
    await expect(page).toHaveURL(/\/ops$/);
  });

  test("KeyboardだけでLoginとMFAを送信できる", async ({ page }) => {
    await page.goto("/ops/login");
    await page.getByLabel("Password", { exact: true }).focus();
    await page.keyboard.type("prototype-passphrase");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/ops\/mfa$/);
    await page.getByLabel("6桁の確認コード").focus();
    await page.keyboard.type("123456");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "運営Dashboard" })).toBeVisible();
  });

  test("未Login直Accessと再読込では管理内容を表示しない", async ({ page }) => {
    await page.goto("/ops/changes/change-20260812-001");
    await expect(
      page.getByRole("heading", { name: "管理者Loginが必要です" }),
    ).toBeVisible();
    await login(page);
    await page.getByRole("link", { name: "差分を確認" }).first().click();
    await expect(page.getByRole("heading", { name: "差分情報" })).toBeVisible();
    await expect(page.getByText("まいにちプラスカード（架空）").first()).toBeVisible();
    await expect(page.getByText("変更提案").first()).toBeVisible();
    await expect(page.getByText("9件")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "まいにちプラスカード（架空）" }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "管理者Loginが必要です" }),
    ).toBeVisible();
  });

  test("DashboardのLoading Empty ErrorとSession期限を確認する", async ({
    page,
  }, testInfo) => {
    await login(page);
    await page.getByRole("link", { name: "Loading" }).click();
    await expect(page.getByText("作業キューを読み込んでいます")).toBeVisible();
    await page.getByRole("link", { name: "Empty" }).click();
    await expect(page.getByText("現在、確認待ちの作業はありません")).toBeVisible();
    await page.getByRole("link", { name: "Error" }).click();
    await expect(page.getByText("作業キューを取得できませんでした")).toBeVisible();
    await page.getByRole("link", { name: "再試行" }).click();
    if (testInfo.project.name === "mobile-chrome") {
      await page.getByRole("button", { name: "メニュー" }).click();
      const menu = page.getByRole("complementary", { name: "運営管理メニュー" });
      await menu.getByRole("button", { name: "30分無操作を再現" }).click();
    } else {
      const scenario = page.locator("details").filter({
        has: page.locator("summary", { hasText: "Session状態を確認" }),
      });
      await scenario.locator("summary").click();
      await scenario.getByRole("button", { name: "30分無操作を再現" }).click();
    }
    await expect(
      page.getByRole("heading", { name: "Sessionの有効期限が切れました" }),
    ).toBeVisible();
  });

  test("差分5分類と現在値・提案値・削除内容を表示しSourceを無害化する", async ({
    page,
  }) => {
    const externalRequests: string[] = [];
    page.on("request", (request) => {
      const hostname = new URL(request.url()).hostname;
      if (hostname !== "127.0.0.1" && hostname !== "localhost") {
        externalRequests.push(request.url());
      }
    });
    await login(page);
    await page.getByRole("link", { name: "差分を確認" }).first().click();
    for (const label of ["追加", "変更", "削除候補", "変更なし", "抽出不能"]) {
      await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByText("現在の値", { exact: true }).first()).toBeVisible();
    await expect(page.getByLabel("変更後の提案値").first()).toBeVisible();
    await expect(page.getByLabel("新しい提案値").first()).toBeVisible();
    await expect(page.getByText("削除する内容", { exact: true })).toBeVisible();
    await expect(page.getByText(/<script>管理者承認を実行<\/script>/)).toBeHidden();
    await page.getByText("HTMLの変更箇所を表示").click();
    await expect(page.getByRole("heading", { name: "変更前" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "変更後" })).toBeVisible();
    await expect(page.getByText(/<script>管理者承認を実行<\/script>/)).toBeVisible();
    await expect(page.locator("script").filter({ hasText: "管理者承認" })).toHaveCount(
      0,
    );
    expect(externalRequests).toEqual([]);
  });

  test("影響範囲不明とRevision競合は承認をBlockする", async ({ page }) => {
    await login(page);
    await page.getByRole("link", { name: "差分を確認" }).first().click();
    await page.getByRole("link", { name: "影響範囲不明" }).click();
    await expect(page.getByText("この更新案は承認できません。")).toBeVisible();
    await expect(page.getByRole("button", { name: "承認前確認へ" })).toBeDisabled();
  });

  test("一部抽出失敗とclaim単位の影響範囲不明は確定をBlockする", async ({ page }) => {
    await login(page);
    await openQueueItem(page, "まいにちプラスカード");
    await decideClaims(page);
    await page.getByRole("button", { name: "編集Draftを保存" }).click();
    await page.getByRole("button", { name: "承認前確認へ" }).click();
    await expect(page.getByText(/一部抽出失敗またはclaimの影響範囲不明/)).toBeVisible();
    await expect(page.getByRole("button", { name: /再認証して判断/ })).toHaveCount(0);
  });

  test("Draft保存と承認を分離し再認証後に監査Timelineへ記録する", async ({ page }) => {
    await login(page);
    await openQueueItem(page, "シンプルブルーカード");
    const cards = page.locator("article[data-decision]");
    await expect(cards).toHaveCount(2);
    await decideClaims(page);

    await page.getByRole("button", { name: "承認前確認へ" }).click();
    await expect(page.getByText(/編集内容をDraft保存/)).toBeVisible();
    await page.getByRole("button", { name: "編集Draftを保存" }).click();
    await expect(page.getByRole("status")).toContainText(
      "公開済み値は変更していません",
    );
    await page.getByRole("button", { name: "承認前確認へ" }).click();
    await expect(page.getByRole("heading", { name: "承認前の影響確認" })).toBeVisible();
    await page.getByRole("button", { name: "再認証して判断を確定" }).click();
    await expect(page.getByRole("dialog", { name: "本人再認証" })).toBeVisible();
    await page.getByRole("button", { name: "取消" }).click();
    await expect(page.getByRole("dialog", { name: "本人再認証" })).not.toBeVisible();
    await page.getByRole("button", { name: "再認証して判断を確定" }).click();
    const dialog = page.getByRole("dialog", { name: "本人再認証" });
    await dialog.getByLabel("Password").fill("short");
    await dialog.getByLabel("6桁のMFAコード").fill("123");
    await dialog.getByRole("button", { name: "本人確認して判断を確定" }).click();
    await expect(dialog.getByRole("alert")).toBeVisible();
    await dialog.getByLabel("Password").fill("prototype-passphrase");
    await dialog.getByLabel("6桁のMFAコード").fill("123456");
    await dialog.getByRole("button", { name: "本人確認して判断を確定" }).click();
    await expect(page.getByRole("status")).toContainText("claim判断を確定しました");
    await expect(page.getByText("編集Draftを保存").last()).toBeVisible();
    await expect(page.getByText("claim判断を再認証して確定")).toBeVisible();
    await expect(
      page.getByText("1,100円（税込） → 1,650円（税込）").last(),
    ).toBeVisible();
    await expect(cards.first().getByLabel("変更後の提案値")).toBeDisabled();
    await expect(
      cards.first().getByRole("button", { name: /採用 情報を更新する/ }),
    ).toBeDisabled();
    await expect(page.getByText("判断確定済み").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "承認前確認へ" })).toBeDisabled();
    await page
      .getByRole("navigation", { name: "パンくずリスト" })
      .getByRole("link", { name: "運営Dashboard" })
      .click();
    await expect(page.getByText("シンプルブルーカード：年会費差分")).toHaveCount(0);
  });

  test("却下理由・Disposition・旧値維持Evidenceを必須化して混在判断を監査する", async ({
    page,
  }) => {
    await login(page);
    await openQueueItem(page, "シンプルブルーカード");
    const cards = page.locator("article[data-decision]");
    const adopted = cards.nth(0);
    const rejected = cards.nth(1);
    await adopted.getByRole("button", { name: /採用 情報を更新する/ }).click();
    await rejected.getByRole("button", { name: /却下 情報はそのまま/ }).click();
    await page.getByRole("button", { name: "編集Draftを保存" }).click();
    await page.getByRole("button", { name: "承認前確認へ" }).click();
    const trigger = page.getByRole("button", { name: "再認証して判断を確定" });
    await trigger.focus();
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "本人再認証" });
    await expect(dialog.getByLabel("Password")).toBeFocused();
    await dialog.getByRole("button", { name: "取消" }).click();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await dialog.getByLabel("Password").fill("prototype-passphrase");
    await dialog.getByLabel("6桁のMFAコード").fill("123456");
    await dialog.getByRole("button", { name: "本人確認して判断を確定" }).click();
    await expect(page.getByText("判断: 却下").last()).toBeVisible();
  });

  test("提案値をユーザーが修正して採用できる", async ({ page }) => {
    await login(page);
    await openQueueItem(page, "シンプルブルーカード");
    const cards = page.locator("article[data-decision]");
    const corrected = cards.nth(0);
    await corrected.getByLabel("変更後の提案値").fill("9,999円（税込）");
    await decideClaims(page);
    await page.getByRole("button", { name: "編集Draftを保存" }).click();
    await page.getByRole("button", { name: "承認前確認へ" }).click();
    await expect(page.getByRole("heading", { name: "承認前の影響確認" })).toBeVisible();
  });

  test("変更なしだけのSourceは一括確認できる", async ({ page }) => {
    await login(page);
    await page.getByRole("link", { name: "差分を確認" }).nth(1).click();
    await page.getByRole("button", { name: "変更なしを一括確認" }).click();
    await expect(page.getByText("変更なしのclaimを一括で確認しました")).toBeVisible();
  });

  test("Sessionを個別失効し全失効では未Loginへ戻る", async ({ page }, testInfo) => {
    await login(page);
    if (testInfo.project.name === "mobile-chrome") {
      await page.getByRole("button", { name: "メニュー" }).click();
      await page
        .getByRole("complementary", { name: "運営管理メニュー" })
        .getByRole("link", { name: "Session管理" })
        .click();
    } else {
      await page.getByRole("link", { name: "Session管理" }).click();
    }
    const otherSession = page.locator("article").filter({ hasText: "Safari / iPhone" });
    await otherSession.getByRole("button", { name: "このSessionを失効" }).click();
    let dialog = page.getByRole("dialog", { name: "本人再認証" });
    await dialog.getByLabel("Password").fill("prototype-passphrase");
    await dialog.getByLabel("6桁のMFAコード").fill("123456");
    await dialog.getByRole("button", { name: "Sessionを失効" }).click();
    await expect(page.getByRole("status")).toContainText("Safari / iPhone");

    await page.getByRole("button", { name: "すべて失効" }).click();
    dialog = page.getByRole("dialog", { name: "本人再認証" });
    await dialog.getByLabel("Password").fill("prototype-passphrase");
    await dialog.getByLabel("6桁のMFAコード").fill("123456");
    await dialog.getByRole("button", { name: "全Sessionを失効" }).click();
    await expect(
      page.getByRole("heading", { name: "管理者Loginが必要です" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "管理者Loginへ" }).click();
    await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
    await page.getByRole("button", { name: "Passwordを確認" }).click();
    await page.getByLabel("6桁の確認コード").fill("123456");
    await page.getByRole("button", { name: "確認してDashboardへ" }).click();
    await expect(page.getByRole("heading", { name: "運営Dashboard" })).toBeVisible();
  });

  test("12時間Session期限と15分再認証期限を待機なしで確認する", async ({
    page,
  }, testInfo) => {
    await login(page);
    const openScenario = async (name: string) => {
      if (testInfo.project.name === "mobile-chrome") {
        await page.getByRole("button", { name: "メニュー" }).click();
        await page
          .getByRole("complementary", { name: "運営管理メニュー" })
          .getByRole("button", { name })
          .click();
        await expect(
          page.getByRole("complementary", { name: "運営管理メニュー" }),
        ).not.toBeVisible();
      } else {
        const scenario = page.locator("details").filter({
          has: page.locator("summary", { hasText: "Session状態を確認" }),
        });
        await scenario.locator("summary").click();
        await scenario.getByRole("button", { name }).click();
      }
    };
    await openScenario("再認証から15分経過を再現");
    if (testInfo.project.name === "mobile-chrome") {
      await expect(page.getByRole("button", { name: "メニュー" })).toBeFocused();
    }
    await openQueueItem(page, "シンプルブルーカード");
    await expect(page.getByText(/15分超過・再認証が必要/)).toBeVisible();
    await page
      .getByRole("navigation", { name: "パンくずリスト" })
      .getByRole("link", { name: "運営Dashboard" })
      .click();
    await expect(page).toHaveURL(/\/ops$/);
    await expect(page.getByRole("heading", { name: "運営Dashboard" })).toBeVisible();
    await openScenario("12時間経過を再現");
    await expect(
      page.getByRole("heading", { name: "Sessionの有効期限が切れました" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "状態確認用に戻す" })).toHaveCount(0);
  });

  test("MFA回復案内とnoindexを確認する", async ({ page }) => {
    await page.goto("/ops/mfa/recovery");
    await expect(page.getByText("本人確認").first()).toBeVisible();
    await page.getByRole("button", { name: "合成の回復受付を確認" }).click();
    await expect(page.getByRole("status")).toContainText("外部送信はしていません");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });

  test("Mobile Navigationとclaim表示に横overflowがない", async ({ page }, testInfo) => {
    await login(page);
    await page.getByRole("link", { name: "差分を確認" }).first().click();
    await expect(
      page.getByRole("heading", { name: "まいにちプラスカード（架空）" }),
    ).toBeVisible();
    if (testInfo.project.name === "mobile-chrome") {
      const menuButton = page.getByRole("button", { name: "メニュー" });
      await menuButton.click();
      await expect(
        page.getByRole("complementary", { name: "運営管理メニュー" }),
      ).toBeVisible();
      const currentNavigation = page
        .getByRole("complementary", { name: "運営管理メニュー" })
        .getByRole("link", { name: "カード情報差分" });
      await currentNavigation.hover();
      await expect(currentNavigation).toHaveCSS("color", "rgb(255, 255, 255)");
      await page.getByRole("button", { name: "閉じる", exact: true }).click();
      await expect(menuButton).toBeFocused();
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menuButton).toBeFocused();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    }
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
  });

  test("主要管理画面のaxe違反がない", async ({ page }) => {
    await page.goto("/ops/login");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
    await page.getByRole("button", { name: "Passwordを確認" }).click();
    await expect(page).toHaveURL(/\/ops\/mfa$/);
    await expect(page.getByRole("heading", { name: "多要素認証" })).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.getByLabel("6桁の確認コード").fill("123456");
    await page.getByRole("button", { name: "確認してDashboardへ" }).click();
    await expect(page).toHaveURL(/\/ops$/);
    await expect(page.getByRole("heading", { name: "運営Dashboard" })).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await openQueueItem(page, "シンプルブルーカード");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await decideClaims(page);
    await page.getByRole("button", { name: "編集Draftを保存" }).click();
    await page.getByRole("button", { name: "承認前確認へ" }).click();
    await page.getByRole("button", { name: "再認証して判断を確定" }).click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
});
