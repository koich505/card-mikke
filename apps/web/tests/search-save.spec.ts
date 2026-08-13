import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("検索・比較の明示保存UIモック", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search?annualSpend=1200000&profile=everyday");
    await expect(
      page.getByRole("heading", { name: "おすすめカードは、この3枚！" }),
    ).toBeVisible();
  });

  test("概要を入力して検索条件を保存する", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "検索条件を保存" });
    await openButton.click();
    const dialog = page.getByRole("dialog", { name: "検索条件を保存" });
    const summary = dialog.getByRole("textbox", { name: /概要/ });
    await expect(summary).toBeFocused();

    await dialog.getByRole("button", { name: "この内容で保存" }).click();
    await expect(dialog.getByRole("alert")).toContainText("概要を入力");

    await summary.fill("日常の買い物用に比較");
    await dialog.getByRole("button", { name: "この内容で保存" }).click();
    await expect(page.getByRole("status")).toContainText(
      "「日常の買い物用に比較」を保存しました",
    );
    await expect(page.getByRole("button", { name: "別の概要で保存" })).toBeFocused();
  });

  test("過大入力を拒否し、保存失敗後に再試行する", async ({ page }) => {
    await page.getByRole("button", { name: "検索条件を保存" }).click();
    const dialog = page.getByRole("dialog", { name: "検索条件を保存" });
    const summary = dialog.getByRole("textbox", { name: /概要/ });
    await summary.fill("あ".repeat(51));
    await dialog.getByRole("button", { name: "この内容で保存" }).click();
    await expect(dialog.getByRole("alert")).toContainText("50文字以内");

    await summary.fill("旅行用の候補");
    await dialog.getByRole("checkbox", { name: /次の保存を失敗させる/ }).check();
    await dialog.getByRole("button", { name: "この内容で保存" }).click();
    await expect(dialog.getByRole("alert")).toContainText("保存に失敗");
    await expect(summary).toHaveValue("旅行用の候補");
    await dialog.getByRole("button", { name: "もう一度保存" }).click();
    await expect(page.getByRole("status")).toContainText(
      "「旅行用の候補」を保存しました",
    );
  });

  test("取消時に起点へFocusを戻し、重大なAccessibility違反がない", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "検索条件を保存" });
    await openButton.click();
    const dialog = page.getByRole("dialog", { name: "検索条件を保存" });
    await dialog.getByRole("button", { name: "キャンセル" }).click();
    await expect(openButton).toBeFocused();

    await openButton.click();
    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(results.violations).toEqual([]);
  });
});
