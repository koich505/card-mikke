import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("検索・比較履歴／データ管理UIモック", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/account/profile");
  });

  test("合成履歴を新しい順に表示し条件詳細を展開する", async ({ page }) => {
    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    const panel = page.getByRole("tabpanel", { name: "検索・比較履歴" });
    await expect(panel.getByText("3件の履歴")).toBeVisible();
    const articles = panel.getByRole("article");
    await expect(articles).toHaveCount(3);
    await expect(articles.nth(0)).toContainText("2026年8月12日 14:30");
    await expect(articles.nth(0)).toContainText("比較あり");
    await expect(articles.nth(1)).toContainText("検索のみ");

    const toggle = articles.nth(0).getByRole("button", { name: "条件を確認" });
    await toggle.click();
    await expect(
      articles.nth(0).getByRole("button", { name: "条件を閉じる" }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      articles.nth(0).getByText("まいにちプラスカード", { exact: true }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "データ管理" }).click();
    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    await expect(
      articles.nth(0).getByRole("button", { name: "条件を閉じる" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  test("履歴条件で現在情報の検索結果と比較画面を開く", async ({ page }) => {
    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    const firstHistory = page.getByRole("article").nth(0);
    await firstHistory.getByRole("link", { name: "現在の情報で再検索" }).click();
    await expect(page).toHaveURL(/annualSpend=1200000/);
    await expect(
      page.getByRole("heading", { name: "おすすめカードは、この3枚！" }),
    ).toBeVisible();
    await expect(page.getByRole("status")).toContainText("現在のカード情報で再計算");

    await page.goto("/account/profile");
    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    await page
      .getByRole("article")
      .nth(0)
      .getByRole("link", { name: "比較を再表示" })
      .click();
    await expect(page).toHaveURL(/view=compare/);
    await expect(page).toHaveURL(/compare=everyday-plus/);
    await expect(page).toHaveURL(/compare=smart-basic/);
    await expect(
      page.getByRole("heading", { name: "カードの違いをチェック" }),
    ).toBeVisible();
    await expect(page.getByRole("status")).toContainText("当時の合成記録ではなく");
  });

  test("不正な比較Queryは無視して検索結果へ安全に戻す", async ({ page }) => {
    await page.goto(
      "/search?annualSpend=1200000&view=compare&compare=unknown-card&compare=everyday-plus",
    );
    await expect(
      page.getByRole("heading", { name: "おすすめカードは、この3枚！" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "カードの違いをチェック" }),
    ).not.toBeVisible();
  });

  test("履歴単体削除を取消でき、失敗後に再試行できる", async ({ page }) => {
    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    const panel = page.getByRole("tabpanel", { name: "検索・比較履歴" });
    const firstHistory = panel.getByRole("article").nth(0);
    const deleteButton = firstHistory.getByRole("button", {
      name: "この履歴を削除",
    });
    await deleteButton.click();
    const dialog = page.getByRole("dialog", { name: "この履歴を削除しますか？" });
    await dialog.getByRole("button", { name: "キャンセル" }).click();
    await expect(deleteButton).toBeFocused();

    await panel.getByRole("checkbox", { name: /次の履歴削除を失敗させる/ }).check();
    await deleteButton.click();
    await dialog.getByRole("button", { name: "この履歴を削除" }).click();
    await expect(panel.getByRole("alert")).toContainText("削除できませんでした");
    await expect(firstHistory).toBeVisible();
    await panel.getByRole("button", { name: "削除を再試行" }).click();
    await expect(panel.getByRole("status")).toContainText("削除しました");
    await expect(panel.getByRole("article")).toHaveCount(2);
  });

  test("履歴一括削除を共有しプロフィールを保持する", async ({ page }) => {
    await page.getByRole("tab", { name: "データ管理" }).click();
    const dataPanel = page.getByRole("tabpanel", { name: "データ管理" });
    await expect(dataPanel.getByText("3件", { exact: true })).toBeVisible();
    await expect(
      dataPanel.getByRole("heading", { name: "プロフィール" }),
    ).not.toBeVisible();
    await expect(dataPanel.getByText("データをDownload")).not.toBeVisible();
    const deleteAll = dataPanel.getByRole("button", {
      name: "検索・比較履歴をすべて削除",
    });
    await deleteAll.click();
    const dialog = page.getByRole("dialog", {
      name: "検索・比較履歴をすべて削除しますか？",
    });
    await dialog.getByRole("button", { name: "履歴をすべて削除" }).click();
    await expect(dataPanel.getByRole("status")).toContainText("すべて削除しました");
    await expect(deleteAll).toBeDisabled();

    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    await expect(
      page.getByRole("heading", { name: "保存されている履歴はありません" }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "プロフィール" }).click();
    await expect(
      page.getByRole("spinbutton", { name: "年間利用額 円", exact: true }),
    ).toHaveValue("1200000");
  });

  test("Account削除の三段階確認、失敗、完了、初期状態復帰を行う", async ({ page }) => {
    await page.getByRole("tab", { name: "データ管理" }).click();
    const panel = page.getByRole("tabpanel", { name: "データ管理" });
    const finalButton = panel.getByRole("button", { name: "Account削除の最終確認へ" });
    await expect(finalButton).toBeDisabled();
    await panel.getByRole("checkbox", { name: /削除対象、削除期限、保持例外/ }).check();
    const phrase = panel.getByRole("textbox", { name: /「削除する」と入力/ });
    await phrase.fill("削除");
    await expect(finalButton).toBeDisabled();
    await phrase.fill("削除する");
    await expect(finalButton).toBeEnabled();

    await finalButton.click();
    const dialog = page.getByRole("dialog", { name: "Account削除を実行しますか？" });
    await dialog.getByRole("button", { name: "キャンセル" }).click();
    await expect(finalButton).toBeFocused();

    await panel.getByRole("checkbox", { name: /次の削除操作を失敗させる/ }).check();
    await finalButton.click();
    await dialog.getByRole("button", { name: "Accountを削除" }).click();
    await expect(panel.getByRole("alert")).toContainText("削除できませんでした");
    await expect(phrase).toHaveValue("削除する");
    await panel.getByRole("button", { name: "再試行" }).click();
    await expect(
      page.getByRole("heading", { name: "Account削除のモック操作が完了しました" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "合成初期状態へ戻す" }).click();
    await expect(page.getByRole("tab", { name: "プロフィール" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    await expect(page.getByRole("article")).toHaveCount(3);
  });

  test("履歴・データ管理は文字拡大時も横Overflowと重大なAccessibility違反がない", async ({
    page,
  }) => {
    for (const tabName of ["検索・比較履歴", "データ管理"]) {
      await page.getByRole("tab", { name: tabName }).click();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    }

    await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
  });
});
