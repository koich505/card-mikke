import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("特集記事一覧UIモック", () => {
  test("キーワード、複数タグAND、記事種別、並び順で公開記事を絞り込める", async ({
    page,
  }) => {
    await page.goto("/articles");
    await expect(page.getByRole("heading", { name: "特集記事を探す" })).toBeVisible();
    await expect(page.getByRole("article").locator("img")).toHaveCount(3);

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
    const ordinaryCard = page.getByRole("article", {
      name: /コンビニ・スーパー中心なら、どこを比べる？/,
    });
    await expect(ordinaryCard).not.toContainText(/公開日|更新日|最終確認日/);
    const card = page.getByRole("article", {
      name: /まいにちプラスカードの特徴を合成データでチェック/,
    });
    await expect(card.getByText("更新確認中")).toBeVisible();
    await expect(
      card.getByText(
        "公開済みの旧記事です。最終確認日 2026-08-08。申込前には公式情報を確認してください。",
      ),
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

  test("用途別記事で対象読者・選定基準・候補理由・根拠を確認できる", async ({
    page,
  }) => {
    await page.goto("/articles/daily-shopping");
    await expect(page.getByText("毎日の買い物が多い人向け")).toBeVisible();
    await expect(page.getByRole("heading", { name: "今回の選定基準" })).toBeVisible();
    await expect(page.getByText("日常利用とのバランスを確認する候補")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "確認に使用した公式Source" }),
    ).toBeVisible();
    await expect(page.getByText("一部開示")).toBeVisible();
    await expect(page.getByLabel("広告・Affiliate情報")).toContainText(
      "報酬の有無・金額は候補の選定や掲載順に使用していません",
    );
    await expect(
      page.getByText("申込経路：新規Web申込（合成）", { exact: true }),
    ).toHaveCount(2);
    await expect(
      page.getByText("申込経路：デジタルカード申込（合成）", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("申込条件差：未確認", { exact: true })).toHaveCount(3);
    const urlBeforeApplicationMock = page.url();
    await page
      .getByRole("button", {
        name: "まいにちプラスカード・新規Web申込（合成）の申込先へ進む（UI-only）",
      })
      .click();
    await expect(
      page.getByText(/まいにちプラスカードの新規Web申込（合成）から外部遷移/),
    ).toBeVisible();
    expect(page.url()).toBe(urlBeforeApplicationMock);
  });

  test("単一カード特集で対象・特徴・条件・変更確認中・公式Sourceを確認できる", async ({
    page,
  }) => {
    await page.goto("/articles/everyday-plus-feature");
    await expect(page.getByText("対象カード：")).toContainText("まいにちプラスカード");
    await expect(
      page.getByRole("heading", { name: "特徴", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "適用条件", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "変更点", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/カテゴリ追加還元の対象外条件に差分候補/),
    ).toBeVisible();
    const changingSource = page
      .locator("#evidence")
      .getByRole("article")
      .filter({
        has: page.getByRole("heading", {
          name: "カテゴリ追加還元の適用条件（合成）",
        }),
      });
    await expect(changingSource).toContainText("対象外利用");
    await expect(changingSource).toContainText("一部開示");
    await expect(changingSource).toContainText("変更確認中");
    await expect(page.getByText("申込条件差：未確認")).toBeVisible();
    const urlBeforeApplicationMock = page.url();
    await page
      .getByRole("button", {
        name: "まいにちプラスカード・新規Web申込（合成）の申込先へ進む（UI-only）",
      })
      .click();
    await expect(
      page.getByText(/新規Web申込（合成）から外部遷移・送信・保存は行いません/),
    ).toBeVisible();
    expect(page.url()).toBe(urlBeforeApplicationMock);
    await expect(page.getByText("まいにちプラスカード商品概要（合成）")).toBeVisible();
    await page.getByRole("link", { name: "カード詳細で条件を確認" }).click();
    await expect(page).toHaveURL(/\/cards\/everyday-plus$/);
  });

  for (const article of [
    { label: "用途別記事", path: "/articles/daily-shopping" },
    { label: "単一カード特集", path: "/articles/everyday-plus-feature" },
  ]) {
    test(`${article.label}は横overflowがなく重大なAccessibility違反がない`, async ({
      page,
    }) => {
      await page.goto(article.path);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflows).toBe(false);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("単一カード特集の主要ActionをKeyboardで操作できる", async ({ page }) => {
    await page.goto("/articles/everyday-plus-feature");

    const applicationButton = page.getByRole("button", {
      name: "まいにちプラスカード・新規Web申込（合成）の申込先へ進む（UI-only）",
    });
    await applicationButton.focus();
    await expect(applicationButton).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      page.getByText(/新規Web申込（合成）から外部遷移・送信・保存は行いません/),
    ).toBeVisible();

    const cardDetailLink = page.getByRole("link", {
      name: "カード詳細で条件を確認",
    });
    await cardDetailLink.focus();
    await expect(cardDetailLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/cards\/everyday-plus$/);
  });

  test("存在しない記事から記事一覧へ戻れる", async ({ page }) => {
    await page.goto("/articles/not-a-feature-article");
    await expect(
      page.getByRole("heading", { name: "記事が見つかりませんでした" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "特集記事を選び直す" }).click();
    await expect(page).toHaveURL(/\/articles$/);
    await expect(page.getByRole("heading", { name: "特集記事を探す" })).toBeVisible();
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
