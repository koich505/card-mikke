import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("お気に入りUIモック", () => {
  test("未登録の一時保存・30日・消失可能性・上限を明示する", async ({ page }) => {
    await page.goto("/favorites");
    await expect(
      page.getByRole("heading", { name: "気になるカードを、あとでじっくり。" }),
    ).toBeVisible();
    await expect(page.getByText("この端末の一時お気に入りです")).toBeVisible();
    await expect(page.getByText(/2026-11-05まで保持/)).toBeVisible();
    await expect(page.getByText(/30日より前でも失われる場合/)).toBeVisible();
    await expect(page.getByText("Accountには保存されていません。")).toBeVisible();
    await expect(page.getByLabel("お気に入り枚数")).toContainText("1/ 50枚");
  });

  test("検索結果から対象カードを一時お気に入りへ追加する", async ({ page }) => {
    await page.goto("/search?annualSpend=1200000&profile=everyday&compare=daily-light");
    const card = page.getByRole("article").filter({
      has: page.getByRole("heading", { name: "デイリーライトカード" }),
    });
    await card.getByRole("link", { name: "一時お気に入りに追加" }).click();
    await expect(page).toHaveURL(/\/favorites\?add=daily-light$/);
    await expect(page.getByRole("status")).toContainText(
      "デイリーライトカードを一時お気に入りに追加しました",
    );
    await expect(page.getByLabel("お気に入り枚数")).toContainText("2/ 50枚");
  });

  test("カード詳細から対象カードを一時お気に入りへ追加する", async ({ page }) => {
    await page.goto("/cards/daily-light");
    await page.getByRole("link", { name: "このカードを一時お気に入りに追加" }).click();
    await expect(page).toHaveURL(/\/favorites\?add=daily-light$/);
    await expect(page.getByRole("status")).toContainText(
      "デイリーライトカードを一時お気に入りに追加しました",
    );
  });

  test("解除・取消・Emptyからカード探索への復帰を行う", async ({ page }) => {
    await page.goto("/favorites");
    await page
      .getByRole("button", {
        name: "トラベルステップカードをお気に入りから解除",
      })
      .click();
    await expect(
      page.getByRole("region", { name: "お気に入りの操作結果" }),
    ).toBeFocused();
    await expect(
      page.getByRole("heading", { name: "お気に入りはまだありません" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("region", { name: "お気に入りのカード" })
        .getByRole("link", { name: "カードを探す", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "解除を取り消す" }).click();
    await expect(
      page.getByRole("region", { name: "お気に入りの操作結果" }),
    ).toBeFocused();
    await expect(
      page.getByRole("heading", { name: "トラベルステップカード" }),
    ).toBeVisible();
    await expect(page.getByRole("status")).toContainText("解除を取り消しました");
  });

  test("引継ぎDialogはFocusを閉じ込め、Escapeで起点へ戻す", async ({ page }) => {
    await page.goto("/favorites");
    const trigger = page.getByRole("button", { name: "Account登録時の引継ぎを確認" });
    await trigger.click();
    const dialog = page.getByRole("dialog", {
      name: "一時お気に入りを引き継ぎますか？",
    });
    const confirm = dialog.getByRole("button", { name: "同意して1枚を引き継ぐ" });
    await expect(confirm).toBeFocused();
    const axeResults = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();
    expect(axeResults.violations).toEqual([]);
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "キャンセル" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("同意した場合だけAccountへ引き継ぎ、同意しない場合は空にする", async ({
    page,
  }) => {
    await page.goto("/favorites");
    await page.getByRole("button", { name: "Account登録時の引継ぎを確認" }).click();
    await page.getByRole("button", { name: "同意して1枚を引き継ぐ" }).click();
    await expect(
      page.getByRole("region", { name: "お気に入りの操作結果" }),
    ).toBeFocused();
    await expect(page.getByText("Accountに継続保存するお気に入りです")).toBeVisible();
    await expect(page.getByRole("status")).toContainText(
      "1枚をAccountのお気に入りへ引き継ぎました",
    );

    await page.goto("/favorites");
    await page.getByRole("button", { name: "Account登録時の引継ぎを確認" }).click();
    await page.getByRole("button", { name: "引き継がずAccountを利用" }).click();
    await expect(
      page.getByRole("region", { name: "お気に入りの操作結果" }),
    ).toBeFocused();
    await expect(
      page.getByRole("status").filter({ hasText: "自動では引き継がれません" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "お気に入りはまだありません" }),
    ).toBeVisible();
    const browserState = await page.evaluate(() => ({
      cookie: document.cookie,
      localStorageEntries: localStorage.length,
      sessionStorageEntries: sessionStorage.length,
    }));
    expect(browserState).toEqual({
      cookie: "",
      localStorageEntries: 0,
      sessionStorageEntries: 0,
    });
  });

  test("50枚の上限を超えて追加しない", async ({ page }) => {
    await page.goto("/favorites?scenario=limit");
    await expect(page.getByLabel("お気に入り枚数")).toContainText("50/ 50枚");
    await page
      .getByRole("button", {
        name: "トラベルステップカードをお気に入りから解除",
      })
      .click();
    await expect(page.getByLabel("お気に入り枚数")).toContainText("49/ 50枚");
    await expect(page.getByText("49枚のお気に入りが残っています")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "お気に入りはまだありません" }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "解除を取り消す" }).click();
    await expect(page.getByLabel("お気に入り枚数")).toContainText("50/ 50枚");
    await page
      .getByRole("button", {
        name: "トラベルステップカードをお気に入りから解除",
      })
      .click();
    await page.getByRole("button", { name: "お気に入りに追加" }).click();
    await expect(page.getByLabel("お気に入り枚数")).toContainText("50/ 50枚");
    await page.getByRole("button", { name: "お気に入りに追加" }).click();
    await expect(page.getByRole("status")).toContainText("お気に入りは最大50枚です");
  });

  test("不正Queryを無害化し、Memory変更を再読込で保持しない", async ({ page }) => {
    await page.goto("/favorites?add=%3Cscript%3Ealert%281%29%3C%2Fscript%3E");
    await expect(page.getByLabel("お気に入り枚数")).toContainText("1/ 50枚");
    await expect(page.getByText(/alert\(1\)/)).toHaveCount(0);

    await page.goto("/favorites");
    await page.getByRole("button", { name: "お気に入りに追加" }).click();
    await expect(page.getByLabel("お気に入り枚数")).toContainText("2/ 50枚");
    await page.reload();
    await expect(page.getByLabel("お気に入り枚数")).toContainText("1/ 50枚");
  });

  test("横Overflowがなく重大なAccessibility違反がない", async ({ page }) => {
    await page.goto("/favorites");
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
