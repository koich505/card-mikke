import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";

const loginOps = async (page: Page) => {
  await page.goto("/ops/login");
  await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
  await page.getByRole("button", { name: "Passwordを確認" }).click();
  await page.getByLabel("6桁の確認コード").fill("123456");
  await page.getByRole("button", { name: "確認してDashboardへ" }).click();
};

const openOps = async (page: Page, testInfo: TestInfo, label: string) => {
  if (testInfo.project.name === "mobile-chrome") {
    await page.getByRole("button", { name: "メニュー" }).click();
    await expect(
      page.getByRole("button", { name: "閉じる", exact: true }),
    ).toBeFocused();
    await page
      .getByRole("complementary", { name: "運営管理メニュー" })
      .getByRole("link", { name: label })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "運営管理ナビゲーション" })
      .getByRole("link", { name: label })
      .click();
  }
};

test.describe("掲載方針・Account・運営Workflow UIモック", () => {
  test("掲載範囲、算定、更新、Affiliate、免責を開示する", async ({ page }) => {
    await page.goto("/policy");
    await expect(
      page.getByRole("heading", { name: "どこまで掲載し、どう比べているか。" }),
    ).toBeVisible();
    await expect(
      page.getByText("国内すべてのカードを網羅しているわけではありません。"),
    ).toBeVisible();
    await expect(page.getByText("Product / Offering単位の合成集計")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "広告・Affiliate方針" }),
    ).toBeVisible();
    await expect(page.getByText(/報酬の有無や金額を順位/)).toBeVisible();
    await expect(page.getByText(/申込前に公式情報/)).toBeVisible();
  });

  test("利用者Login・登録・再設定・Google同一メールを自動統合しない", async ({
    page,
  }) => {
    await page.goto("/account/login");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await page.getByLabel(/^Password/).fill("short");
    await page.locator("form").getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "12文字以上" }),
    ).toBeVisible();
    await expect(page.getByLabel("メールアドレス")).not.toHaveAttribute(
      "aria-describedby",
      /account-error/,
    );
    await expect(page.getByLabel(/^Password/)).toHaveAttribute(
      "aria-describedby",
      /account-error/,
    );
    await page.getByRole("button", { name: "新規登録" }).click();
    await page.getByLabel(/^Password/).fill("prototype-passphrase");
    await page.getByRole("button", { name: "確認メールを送る" }).click();
    await expect(page.getByRole("status")).toContainText("メール確認が完了するまで");
    await page.getByRole("button", { name: "同じメールの既存Accountを確認" }).click();
    await expect(page.getByRole("status")).toContainText("自動統合せず");
    await page.getByRole("button", { name: "既存AccountへLoginして連携" }).click();
    await expect(page.getByRole("status")).toContainText("Google Accountを連携");
    await page.getByRole("button", { name: "Google連携を解除" }).click();
    await expect(page.getByRole("status")).toContainText("Google連携を解除しました");
    await page.getByRole("button", { name: "Google Accountで続ける（合成）" }).click();
    await page.getByRole("button", { name: "Google連携を解除" }).click();
    await expect(page.getByRole("status")).toContainText(
      "唯一のLogin方法を失わないよう",
    );
  });

  test("券面画像は許諾不明をBlockし、Draft保存と再認証後だけ承認する", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "券面画像");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await page.getByRole("button", { name: /コーラル限定/ }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "公開承認できません" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "再認証して公開承認" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: /サンライズ/ }).click();
    await page.getByRole("button", { name: "Draft保存" }).click();
    await page.getByRole("button", { name: "再認証して公開承認" }).click();
    expect(
      (await new AxeBuilder({ page }).include("dialog").analyze()).violations,
    ).toEqual([]);
    const approveButton = page.getByRole("button", {
      name: "再認証して公開承認",
    });
    await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
    await page.getByLabel("6桁のMFAコード").fill("12");
    await page.getByRole("button", { name: "券面を公開承認" }).click();
    await expect(page.getByLabel("6桁のMFAコード")).toBeFocused();
    await expect(page.getByLabel("6桁のMFAコード")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
      "aria-invalid",
      "false",
    );
    await page.keyboard.press("Escape");
    await expect(approveButton).toBeFocused();
    await approveButton.click();
    await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
    await page.getByLabel("6桁のMFAコード").fill("123456");
    await page.getByRole("button", { name: "券面を公開承認" }).click();
    await expect(page.getByRole("status")).toContainText(
      "外部公開・永続化は行っていません",
    );
    await expect(
      page.getByRole("button", { name: "再認証して公開承認" }),
    ).toBeDisabled();

    await page.getByRole("button", { name: /コーラル限定/ }).click();
    await page.getByLabel("却下理由").fill("利用条件を確認できないため");
    await page.getByRole("button", { name: /サンライズ/ }).click();
    await expect(page.getByLabel("却下理由")).toHaveValue("");
  });

  test("記事は編集後の再検証と本文・配置の別承認を要求する", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "記事Draft");
    await page.getByLabel(/本文、Source/).check();
    await page.getByLabel(/軸・評価基準/).check();
    await page.getByRole("button", { name: "記事生成失敗を再現" }).click();
    await expect(page.getByRole("status")).toContainText("旧公開版は継続");
    await page.getByRole("button", { name: "記事生成を再試行" }).click();
    await expect(page.getByLabel(/本文、Source/)).not.toBeChecked();
    await expect(page.getByLabel(/軸・評価基準/)).not.toBeChecked();
    await expect(
      page.getByRole("button", { name: "再認証して記事を承認" }),
    ).toBeDisabled();
    await page.getByLabel("軸と評価基準").fill("");
    await page.getByRole("button", { name: "すべての配置を再検証" }).click();
    await expect(page.getByRole("status")).toContainText("修正してください");
    await page
      .getByLabel("軸と評価基準")
      .fill("横軸: 年会費 / 縦軸: 日常利用の確認範囲");
    await expect(page.getByText(/すべての配置を再検証するまで/)).toBeVisible();
    await page.getByRole("button", { name: "すべての配置を再検証" }).click();
    await page.getByLabel("配置1と理由").fill("基準と一致しない配置理由");
    await page.getByRole("button", { name: "すべての配置を再検証" }).click();
    await expect(page.getByRole("status")).toContainText("整合性");
    await page
      .getByLabel("配置1と理由")
      .fill("まいにちプラス: 日常利用の確認済み条件が多い");
    await page.getByRole("button", { name: "すべての配置を再検証" }).click();
    await page.getByRole("button", { name: "Draft保存" }).click();
    await page.getByLabel(/本文、Source/).check();
    await page.getByLabel(/軸・評価基準/).check();
    await page.getByRole("button", { name: "再認証して記事を承認" }).click();
    await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
    await page.getByLabel("6桁のMFAコード").fill("123456");
    await page.getByRole("button", { name: "記事を承認", exact: true }).click();
    await expect(page.getByRole("status")).toContainText(
      "外部公開・永続化は行っていません",
    );
    await expect(page.getByText("承認済み", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByRole("button", { name: "再認証して記事を承認" }),
    ).toBeDisabled();
    const timeline = page
      .getByRole("heading", { name: "合成監査Timeline" })
      .locator("..");
    await expect(timeline.getByText(/軸と評価基準を編集/).first()).toBeVisible();
    await expect(timeline.getByText(/編集Draftを保存/)).toBeVisible();
    await expect(timeline.getByText(/全配置を再検証/).first()).toBeVisible();
    await expect(timeline.getByText(/記事Draftを明示承認/)).toBeVisible();
  });

  test("記事の危険Contentを公開承認せず、再読込で管理状態を失う", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "記事Draft");
    for (const unsafe of [
      '<script>alert("x")</script>',
      '<img src="https://example.invalid/x.png">',
      '<form action="data:text/html,x">',
      '<meta http-equiv="refresh">',
      "vbscript:msgbox(1)",
      "mailto:test@example.invalid",
      "file:///tmp/mock.txt",
      "blob:synthetic-id",
      "説明[mailto:test]",
      "説明,file:test",
      "文中blob:synthetic-id",
      "説明.mailto:test",
      "説明+file:test",
      "説明-mailto:test",
    ]) {
      await page.getByLabel("記事本文").fill(unsafe);
      await expect(
        page.getByRole("alert").filter({ hasText: "Validationに失敗" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "再認証して記事を承認" }),
      ).toBeDisabled();
    }
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "管理者Loginが必要です" }),
    ).toBeVisible();
  });

  test("4画面で横Overflowと重大なAccessibility違反がない", async ({
    page,
  }, testInfo) => {
    for (const path of ["/policy", "/account/login"]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      ).toBe(false);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
    await loginOps(page);
    if (testInfo.project.name === "mobile-chrome") {
      const menu = page.getByRole("button", { name: "メニュー", exact: true });
      await menu.click();
      await page.getByRole("button", { name: "閉じる", exact: true }).click();
      await expect(menu).toBeFocused();
      await menu.click();
      await page.keyboard.press("Escape");
      await expect(menu).toBeFocused();
      await menu.click();
      const viewport = page.viewportSize();
      if (viewport) await page.mouse.click(viewport.width - 4, viewport.height - 4);
      await expect(menu).toBeFocused();
    }
    for (const label of ["券面画像", "記事Draft"]) {
      await openOps(page, testInfo, label);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      ).toBe(false);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
    const browserState = await page.evaluate(() => ({
      cookie: document.cookie,
      local: localStorage.length,
      session: sessionStorage.length,
    }));
    expect(browserState).toEqual({ cookie: "", local: 0, session: 0 });
  });
});
