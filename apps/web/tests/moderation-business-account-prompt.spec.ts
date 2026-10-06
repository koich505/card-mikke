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
    await page.getByRole("button", { name: "メニュー", exact: true }).click();
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

const reauthenticate = async (page: Page, action: string) => {
  await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
  await page.getByLabel("6桁のMFAコード").fill("123456");
  await page.getByRole("button", { name: action, exact: true }).click();
};

test.describe("Moderation・訂正・業務情報・Account Prompt UIモック", () => {
  test("未登録の保存要求ではAccount価値を説明し、自動保存しない", async ({ page }) => {
    await page.goto("/search?annualSpend=1200000&profile=everyday");
    const trigger = page.getByRole("button", { name: "検索条件を保存" });
    await trigger.click();
    const dialog = page.getByRole("dialog", {
      name: "保存するにはAccountが必要です",
    });
    await expect(
      dialog.getByText("この画面を閉じるだけでは保存されません"),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "Login・登録へ進む" }),
    ).toHaveAttribute("href", "/account/login");
    expect(
      (await new AxeBuilder({ page }).include("dialog").analyze()).violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await trigger.click();
    await dialog.getByRole("button", { name: /登録済みとして保存Flowを確認/ }).click();
    const saveDialog = page.getByRole("dialog", { name: "検索条件を保存" });
    await expect(saveDialog).toBeVisible();
    await expect(page.getByLabel("概要 必須")).toBeFocused();
    await saveDialog.getByRole("button", { name: "この内容で保存" }).focus();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("概要 必須")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(
      saveDialog.getByRole("button", { name: "この内容で保存" }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    expect(
      await page.evaluate(() => ({
        cookie: document.cookie,
        local: localStorage.length,
        session: sessionStorage.length,
      })),
    ).toEqual({ cookie: "", local: 0, session: 0 });
  });

  test("Review判定失敗時は状態を維持し、理由と再認証後だけ公開承認する", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "Review Moderation");
    await page.getByRole("button", { name: "判定失敗を再現" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "自動公開・自動削除しません" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Content判定を再試行" }).click();
    await page.getByLabel("理由カテゴリ").selectOption("内容・公式条件を照合済み");
    await page.getByLabel("判断補足（非監査）").fill("user@example.com を確認");
    await page.getByRole("button", { name: "再認証して公開承認" }).click();
    await expect(page.getByRole("status")).toContainText("メールアドレス");
    await expect(
      page.getByRole("listitem").filter({ hasText: "user@example.com" }),
    ).toHaveCount(0);
    await page
      .getByLabel("判断補足（非監査）")
      .fill("合成本文に実在個人情報がなく、文脈上公開可能と確認");
    await page.getByRole("button", { name: "再認証して却下・削除" }).click();
    await expect(page.getByRole("status")).toContainText(
      "この判断Actionには使用できません",
    );
    await expect(page.getByLabel("Password", { exact: true })).not.toBeVisible();
    await page.getByRole("button", { name: "再認証して公開承認" }).click();
    await reauthenticate(page, "Review判断を確定");
    await expect(page.getByRole("status")).toContainText("公開承認済み");
    await expect(page.getByText("現在の公開・確認状態").locator("..")).toContainText(
      "公開承認済み",
    );
    await expect(
      page.getByRole("button", { name: "再認証して公開承認" }),
    ).toBeDisabled();
    await expect(
      page
        .getByLabel("Reviewキュー概要")
        .locator("div")
        .filter({ hasText: "確認待ち" }),
    ).toContainText("0");
    await page.getByRole("button", { name: /トラベルステップカード/ }).click();
    await expect(
      page.getByRole("list", { name: "通報内訳" }).getByRole("listitem"),
    ).toHaveCount(3);
    await expect(
      page.getByRole("listitem").filter({ hasText: /合成本文に実在個人情報/ }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: /まいにちプラスカード/ }).click();
    await expect(
      page.getByRole("listitem").filter({ hasText: /内容・公式条件を照合済み/ }),
    ).toHaveCount(1);
  });

  test("公開後通報は件数だけで非公開にせず掲載継続を判断できる", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "Review Moderation");
    await page.getByRole("button", { name: /トラベルステップカード/ }).click();
    await expect(
      page.getByText("3件（件数だけで非公開・虚偽確定しません）"),
    ).toBeVisible();
    await page.getByLabel("理由カテゴリ").selectOption("利用体験として掲載可能");
    await page
      .getByLabel("判断補足（非監査）")
      .fill("公式条件と本文を照合し、利用体験として掲載継続可能");
    await page.getByRole("button", { name: "再認証して掲載継続" }).click();
    await reauthenticate(page, "Review判断を確定");
    await expect(page.getByRole("status")).toContainText("掲載継続");
  });

  test("誤情報指摘はSource確認と理由をDraft保存し、差分承認へ送る", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "誤情報指摘");
    await page.getByRole("button", { name: "公式Source確認を開始" }).click();
    await page.getByRole("button", { name: "判断Draft保存" }).click();
    await expect(page.getByRole("status")).toContainText(
      "公式Source確認、理由カテゴリ",
    );
    await page.getByLabel(/公式Sourceの対象/).check();
    await page.getByLabel("理由カテゴリ").selectOption("公式情報の更新を確認");
    await page.getByLabel(/掲載情報が正しい/).check();
    await expect(page.getByLabel("理由カテゴリ")).toHaveValue("");
    await page.getByRole("button", { name: "判断Draft保存" }).click();
    await expect(page.getByRole("status")).toContainText("理由カテゴリ");
    await page.getByLabel(/修正案を作成/).check();
    await page.getByLabel("理由カテゴリ").selectOption("公式情報の更新を確認");
    await page.getByLabel("判断補足（非監査）").fill("reviewer@example.com と照合");
    await page.getByRole("button", { name: "判断Draft保存" }).click();
    await expect(page.getByRole("status")).toContainText("メールアドレス");
    await expect(
      page.getByRole("listitem").filter({ hasText: "reviewer@example.com" }),
    ).toHaveCount(0);
    await page
      .getByLabel("判断補足（非監査）")
      .fill("適用期間の改定候補を確認したため差分確認へ送る");
    await page.getByRole("button", { name: "判断Draft保存" }).click();
    await page.getByRole("button", { name: "再認証して判断を確定" }).click();
    await reauthenticate(page, "訂正判断を確定");
    await expect(page.getByRole("status")).toContainText("公開情報は変更していません");
    await expect(page.getByText("修正対応", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByRole("listitem").filter({ hasText: "公式情報の更新を確認" }),
    ).toHaveCount(2);
    await page.getByRole("button", { name: /暮らし方で見るカード比較マップ/ }).click();
    await expect(page.getByText(/公式Source確認へ着手/)).toHaveCount(0);
    await expect(page.getByText(/指摘を却下して完了/)).toBeVisible();
  });

  test("業務情報は安全なDraft保存と再認証承認を分離し、追加候補を無効化しない", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    await openOps(page, testInfo, "業務情報");
    await page.getByLabel("理由カテゴリ").selectOption("公式条件の改定");
    await page.getByLabel("変更補足（非監査）").fill("換算Ruleの改定を反映");
    await page.getByLabel("公式Source識別子").fill("https://example.invalid/rule");
    await page.getByRole("button", { name: "変更Draft保存" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "URL scheme" }),
    ).toBeVisible();
    await page
      .getByLabel("公式Source識別子")
      .fill("issuer.example.invalid/rewards/r18");
    await page.getByLabel("変更補足（非監査）").fill("api_key=prototype-value");
    await page.getByRole("button", { name: "変更Draft保存" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Credential・Secret" }),
    ).toBeVisible();
    await expect(
      page.getByRole("listitem").filter({ hasText: "prototype-value" }),
    ).toHaveCount(0);
    await page.getByLabel("変更補足（非監査）").fill("換算Ruleの改定を反映");
    await page.getByRole("button", { name: "変更Draft保存" }).click();
    await expect(page.getByRole("button", { name: "再認証して無効化" })).toBeDisabled();
    await page.getByRole("button", { name: "再認証して承認" }).click();
    await reauthenticate(page, "業務情報を承認");
    await expect(page.getByRole("status")).toContainText(
      "外部反映・永続化は行っていません",
    );
    await expect(
      page.getByRole("listitem").filter({ hasText: "公式条件の改定" }),
    ).toHaveCount(2);
    await expect(
      page.getByLabel("業務情報概要").locator("div").filter({ hasText: "変更Draft" }),
    ).toContainText("3");
    await page.getByRole("button", { name: /Mikke Travel/ }).click();
    await expect(page.getByText(/Rule version r17/)).toHaveCount(0);
    await expect(page.getByText(/Service → 旅行カテゴリ/).last()).toBeVisible();
    await expect(page.getByText(/換算Ruleの改定を反映/)).toHaveCount(0);
    await page.getByRole("button", { name: /サブスクリプション/ }).click();
    await expect(page.getByText("変更前なし（新規追加候補）")).toBeVisible();
    await page.getByLabel("理由カテゴリ").selectOption("新規分類の追加");
    await page.getByLabel("変更補足（非監査）").fill("新規カテゴリ追加の確認");
    await page.getByRole("button", { name: "変更Draft保存" }).click();
    await expect(page.getByRole("button", { name: "再認証して無効化" })).toBeDisabled();
    await page.getByRole("button", { name: /Mikke Lounge旧受付/ }).click();
    await page.getByLabel("理由カテゴリ").selectOption("対象終了・無効化");
    await page.getByLabel("変更補足（非監査）").fill("旧受付終了後も履歴を保持する");
    await page.getByRole("button", { name: "変更Draft保存" }).click();
    await expect(page.getByRole("button", { name: "再認証して承認" })).toBeDisabled();
    await page.getByRole("button", { name: "再認証して無効化" }).click();
    await reauthenticate(page, "業務情報を無効化");
    await expect(page.getByRole("status")).toContainText("削除せず無効化");
  });

  test("3管理画面でnoindex・Accessibility・横Overflowを確認する", async ({
    page,
  }, testInfo) => {
    await loginOps(page);
    for (const label of ["Review Moderation", "誤情報指摘", "業務情報"]) {
      await openOps(page, testInfo, label);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      ).toBe(false);
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
  });
});
