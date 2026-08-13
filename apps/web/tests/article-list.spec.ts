import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("特集記事一覧UIモック", () => {
  test("キーワード、複数タグAND、記事種別、並び順で公開記事を絞り込める", async ({
    page,
  }) => {
    await page.goto("/articles");
    await expect(page.getByRole("heading", { name: "特集記事を探す" })).toBeVisible();
    await expect(page.locator("img[src*='/images/articles/']")).toHaveCount(3);

    await page.getByRole("searchbox", { name: "キーワードで探す" }).fill("年会費");
    await expect(page.getByRole("heading", { name: "3件の記事" })).toBeVisible();

    await page.getByRole("checkbox", { name: "日常の買い物" }).check();
    await page.getByRole("checkbox", { name: "還元" }).check();
    await expect(page.getByRole("heading", { name: "1件の記事" })).toBeVisible();
    await expect(
      page.getByText("まいにちプラスカードの特徴を合成データでチェック"),
    ).toBeVisible();

    await page.getByRole("radio", { name: "単一カード特集" }).check();
    await expect(page.getByRole("heading", { name: "1件の記事" })).toBeVisible();
    await page.getByRole("combobox", { name: "並び順" }).selectOption("updated");
    await expect(page.getByText("更新順", { exact: true })).toBeVisible();
  });

  test("0件では自動緩和せず、全解除で初期結果へ戻る", async ({ page }) => {
    await page.goto("/articles");
    await page
      .getByRole("searchbox", { name: "キーワードで探す" })
      .fill("存在しない検索語");
    await expect(
      page.getByRole("heading", { name: "条件に一致する記事はありません" }),
    ).toBeVisible();
    await page
      .getByRole("status")
      .getByRole("button", { name: "条件をすべて解除" })
      .click();
    await expect(page.getByRole("heading", { name: "3件の記事" })).toBeVisible();
    await expect(page.getByRole("searchbox", { name: "キーワードで探す" })).toHaveValue(
      "",
    );
  });

  test("更新確認中の旧記事を識別して詳細へ進める", async ({ page }) => {
    await page.goto("/articles");
    const card = page.getByRole("article", {
      name: /まいにちプラスカードの特徴を合成データでチェック/,
    });
    await expect(card.getByText("更新確認中")).toBeVisible();
    await expect(
      card.getByText("公開済みの旧記事です。申込前には公式情報を確認してください。"),
    ).toBeVisible();
    await card.getByRole("link", { name: /まいにちプラスカードの特徴/ }).click();
    await expect(
      page.getByRole("heading", {
        name: "まいにちプラスカードの特徴を合成データでチェック",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "更新確認中：これは公開済みの旧記事です。最終確認日 2026-08-08。申込前には公式情報を確認してください。",
      ),
    ).toBeVisible();
  });

  test("Mobileで横overflowがなく、重大なAccessibility違反がない", async ({ page }) => {
    await page.goto("/articles");
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
