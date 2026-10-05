import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const reportUrl =
  "/correction-report?targetType=card&targetId=everyday-plus&item=%E6%83%85%E5%A0%B1%E3%81%AE%E6%A0%B9%E6%8B%A0%E3%83%BB%E7%A2%BA%E8%AA%8D%E7%8A%B6%E6%85%8B";

async function fillRequiredFields(page: Page) {
  await page.getByLabel("指摘内容 必須").fill("年会費の記載が変更されています。");
  await page
    .getByLabel("把握している根拠 必須")
    .fill("合成の公式ページを2026-08-14に確認しました。");
}

test.describe("誤情報指摘フォームUIモック", () => {
  test("カード詳細の根拠から対象と掲載項目を引き継ぐ", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    await page.getByRole("tab", { name: "情報の根拠" }).click();
    await page.getByRole("link", { name: "この情報の誤りを指摘する" }).click();

    await expect(
      page.getByText("まいにちプラスカード", { exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByLabel("誤り・変更がある掲載項目 必須")).toHaveValue(
      "情報の根拠・確認状態",
    );
  });

  test("記事の注意事項から記事を対象として引き継ぐ", async ({ page }) => {
    await page.goto("/articles/daily-shopping");
    await page.getByRole("link", { name: "この情報の誤りを指摘する" }).click();

    await expect(
      page
        .getByText("コンビニ・スーパー中心なら、どこを比べる？", { exact: true })
        .first(),
    ).toBeVisible();
    await expect(page.getByLabel("誤り・変更がある掲載項目 必須")).toHaveValue(
      "記事情報と注意事項",
    );
  });

  test("公開ページのフッターから現在の画面を対象にできる", async ({ page }) => {
    await page.goto("/");
    const homeReport = page.getByRole("contentinfo").getByRole("link", {
      name: "誤情報を指摘",
    });
    await expect(homeReport).toHaveAttribute(
      "href",
      "/correction-report?targetType=page&targetId=home",
    );

    await page.goto("/search");
    const searchReport = page.getByRole("contentinfo").getByRole("link", {
      name: "誤情報を指摘",
    });
    await expect(searchReport).toHaveAttribute(
      "href",
      "/correction-report?targetType=page&targetId=search",
    );
  });

  test("必須Errorを通知して最初の不正項目へFocusを移す", async ({ page }) => {
    await page.goto(reportUrl);
    await page.getByLabel("指摘内容 必須").fill("   ");
    await page.getByLabel("把握している根拠 必須").fill("\n ");
    await page.getByRole("button", { name: "この内容で指摘する" }).click();

    const errorSummary = page.getByRole("alert", {
      name: "入力内容を確認してください",
    });
    await expect(errorSummary).toContainText("入力内容を確認してください");
    await expect(page.getByLabel("指摘内容 必須")).toBeFocused();
    await expect(
      page.getByText("指摘内容を入力してください。", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("把握している根拠を入力してください。", { exact: true }),
    ).toBeVisible();
  });

  test("文字数上限とメール形式を検証する", async ({ page }) => {
    await page.goto(reportUrl);
    await page.getByLabel("指摘内容 必須").fill("あ".repeat(1_001));
    await page.getByLabel("把握している根拠 必須").fill("根拠");
    await page.getByLabel("メールアドレス 任意").fill("not-an-email");
    await page.getByRole("button", { name: "この内容で指摘する" }).click();

    const errorSummary = page.getByRole("alert", {
      name: "入力内容を確認してください",
    });
    await expect(errorSummary).toContainText(
      "指摘内容は1000文字以内で入力してください。",
    );
    await expect(errorSummary).toContainText(
      "メールアドレスの形式を確認してください。",
    );
  });

  test("各入力の上限超過をまとめて通知する", async ({ page }) => {
    await page.goto(reportUrl);
    await page.getByLabel("誤り・変更がある掲載項目 必須").fill("項".repeat(101));
    await page.getByLabel("指摘内容 必須").fill("指摘");
    await page.getByLabel("把握している根拠 必須").fill("根".repeat(1_001));
    await page.getByLabel("メールアドレス 任意").fill(`${"a".repeat(249)}@a.com`);
    await page.getByRole("button", { name: "この内容で指摘する" }).click();

    const errorSummary = page.getByRole("alert", {
      name: "入力内容を確認してください",
    });
    await expect(errorSummary).toContainText("掲載項目は100文字以内");
    await expect(errorSummary).toContainText("根拠は1000文字以内");
    await expect(errorSummary).toContainText("メールアドレスは254文字以内");
  });

  test("メールなしで二重送信を止め、受付条件を表示する", async ({ page }) => {
    await page.goto(reportUrl);
    await fillRequiredFields(page);
    const submit = page.getByRole("button", { name: "この内容で指摘する" });
    await submit.click();
    await expect(page.getByRole("button", { name: "受付処理中…" })).toBeDisabled();

    await expect(
      page.getByRole("heading", { name: "指摘を受け付けました" }),
    ).toBeFocused();
    await expect(page.getByText("CM-MOCK-0001", { exact: true })).toBeVisible();
    await expect(page.getByText("連絡先は登録されていません")).toBeVisible();
    await expect(
      page.getByText(/個別回答や追加確認のご連絡はできません/),
    ).toBeVisible();
  });

  test("メールありでは連絡目的を限定して表示する", async ({ page }) => {
    await page.goto(reportUrl);
    await fillRequiredFields(page);
    await page.getByLabel("メールアドレス 任意").fill("reporter@example.invalid");
    await page.getByRole("button", { name: "この内容で指摘する" }).click();

    await expect(page.getByText("連絡先を受け付けました")).toBeVisible();
    await expect(page.getByText(/確認結果または追加確認が必要な場合/)).toBeVisible();
  });

  test("未知の対象ではフォームを表示しない", async ({ page }) => {
    await page.goto("/correction-report?targetType=card&targetId=not-a-card");
    await expect(
      page.getByRole("heading", { name: "対象の掲載情報を確認できませんでした" }),
    ).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
  });

  test("DesktopとMobileで横Overflowと重大なAccessibility違反がない", async ({
    page,
  }) => {
    await page.goto(reportUrl);
    await expect(
      page.getByRole("heading", { name: "掲載情報の誤り・変更をお知らせください" }),
    ).toBeVisible();
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
