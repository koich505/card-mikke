import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("プロフィール編集UIモック", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/account/profile");
    await expect(
      page.getByRole("heading", { name: "プロフィールを編集", level: 1 }),
    ).toBeVisible();
  });

  test("合成プロフィールを初期表示しセクションごとに保存する", async ({ page }) => {
    await expect(
      page.getByRole("spinbutton", { name: "年間利用額 円", exact: true }),
    ).toHaveValue("1200000");

    const personal = page.locator("#personal-section");
    await personal.getByRole("radio", { name: "40代" }).check();
    await expect(personal.getByRole("status")).toContainText("変更あり");
    await personal.getByRole("button", { name: "変更を保存" }).click();
    await expect(personal.getByRole("status")).toContainText("保存済み");

    const points = page.locator("#points-section");
    await points.getByRole("checkbox", { name: /マイル/ }).check();
    await expect(points.getByRole("status")).toContainText("変更あり");
    await expect(personal.getByRole("status")).toContainText("保存済み");
  });

  test("Account Tabに応じて下のPanelを切り替え入力を保持する", async ({ page }) => {
    const personal = page.locator("#personal-section");
    await personal.getByRole("radio", { name: "40代" }).check();

    await page.getByRole("tab", { name: "検索・比較履歴" }).click();
    await expect(page.getByRole("tabpanel", { name: "検索・比較履歴" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "検索・比較履歴", level: 2 }),
    ).toBeVisible();
    await expect(personal).toBeHidden();

    await page.getByRole("tab", { name: "データ管理" }).click();
    await expect(page.getByRole("tabpanel", { name: "データ管理" })).toBeVisible();

    await page.getByRole("tab", { name: "プロフィール" }).click();
    await expect(personal.getByRole("radio", { name: "40代" })).toBeChecked();
    await expect(personal.getByRole("status")).toContainText("変更あり");
  });

  test("Account Tabを矢印キーとHome・Endで操作できる", async ({ page }) => {
    const profileTab = page.getByRole("tab", { name: "プロフィール" });
    const historyTab = page.getByRole("tab", { name: "検索・比較履歴" });
    const dataTab = page.getByRole("tab", { name: "データ管理" });

    await profileTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(historyTab).toBeFocused();
    await expect(historyTab).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(dataTab).toBeFocused();
    await page.keyboard.press("Home");
    await expect(profileTab).toBeFocused();
  });

  test("変更を元に戻すと直前の保存値へ戻る", async ({ page }) => {
    const personal = page.locator("#personal-section");
    await personal.getByRole("radio", { name: "50代" }).check();
    await personal.getByRole("button", { name: "変更を元に戻す" }).click();
    await expect(personal.getByRole("radio", { name: "30代" })).toBeChecked();
    await expect(personal.getByRole("button", { name: "変更を保存" })).toBeDisabled();
  });

  test("利用先別合計が年間利用額を超えると保存できない", async ({ page }) => {
    const usage = page.locator("#usage-section");
    await usage
      .getByRole("spinbutton", { name: "年間利用額 円", exact: true })
      .fill("500000");
    await expect(usage.getByRole("alert")).toContainText("超えています");
    await expect(usage.getByRole("button", { name: "変更を保存" })).toBeDisabled();
  });

  test("内訳がある状態で年間利用額を未設定にできない", async ({ page }) => {
    const usage = page.locator("#usage-section");
    await usage
      .getByRole("spinbutton", { name: "年間利用額 円", exact: true })
      .fill("");
    await expect(usage.getByText("年間利用額を入力してください")).toBeVisible();
    await expect(usage.getByRole("button", { name: "変更を保存" })).toBeDisabled();
  });

  test("利用先別金額は0円以上の整数だけ保存できる", async ({ page }) => {
    const usage = page.locator("#usage-section");
    const convenience = usage.getByRole("spinbutton", {
      name: "コンビニの年間利用額 円",
    });
    await convenience.fill("-1");
    await expect(usage.getByText("0円以上の整数で入力してください")).toBeVisible();
    await expect(usage.getByRole("button", { name: "変更を保存" })).toBeDisabled();
    await convenience.fill("100000.5");
    await expect(usage.getByText("0円以上の整数で入力してください")).toBeVisible();
  });

  test("次の保存だけを失敗させ入力を保持して再試行できる", async ({ page }) => {
    const personal = page.locator("#personal-section");
    await page.getByRole("checkbox", { name: /次の保存を失敗させる/ }).check();
    await personal.getByRole("radio", { name: "40代" }).check();
    await personal.getByRole("button", { name: "変更を保存" }).click();
    await expect(personal.getByRole("alert")).toContainText("保存失敗");
    await expect(personal.getByRole("radio", { name: "40代" })).toBeChecked();
    await expect(
      page.getByRole("checkbox", { name: /次の保存を失敗させる/ }),
    ).not.toBeChecked();
    await personal.getByRole("button", { name: "変更を保存" }).click();
    await expect(personal.getByRole("status")).toContainText("保存済み");
  });

  test("特に希望なしはほかのポイント希望と排他的に選択する", async ({ page }) => {
    const points = page.locator("#points-section");
    await expect(points.getByRole("checkbox", { name: /共通ポイント/ })).toBeChecked();
    await expect(
      points.getByRole("checkbox", { name: /キャッシュバック/ }),
    ).toBeChecked();
    await points.getByRole("checkbox", { name: /特に希望なし/ }).check();
    await expect(points.getByRole("checkbox", { name: /特に希望なし/ })).toBeChecked();
    await expect(
      points.getByRole("checkbox", { name: /共通ポイント/ }),
    ).not.toBeChecked();
    await expect(
      points.getByRole("checkbox", { name: /キャッシュバック/ }),
    ).not.toBeChecked();
    await points.getByRole("checkbox", { name: /マイル/ }).check();
    await expect(
      points.getByRole("checkbox", { name: /特に希望なし/ }),
    ).not.toBeChecked();
  });

  test("未保存変更がある内部移動では確認しFocusを戻せる", async ({ page }) => {
    const personal = page.locator("#personal-section");
    const searchLink = page.getByRole("link", { name: /カードを探す/ });
    await personal.getByRole("radio", { name: "40代" }).check();
    await searchLink.click();
    const dialog = page.getByRole("dialog", { name: "保存していない変更があります" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "編集を続ける" }).click();
    await expect(dialog).not.toBeVisible();
    await expect(searchLink).toBeFocused();

    await searchLink.click();
    await dialog.getByRole("button", { name: "変更を破棄して移動" }).click();
    await expect(page).toHaveURL(/\/search$/);
  });

  test("未保存変更があっても同一ページ内の章へ移動できる", async ({ page }) => {
    const personal = page.locator("#personal-section");
    await personal.getByRole("radio", { name: "40代" }).check();
    await page.getByRole("link", { name: "ポイントの希望" }).click();
    await expect(page).toHaveURL(/#points-section$/);
    await expect(
      page.getByRole("dialog", { name: "保存していない変更があります" }),
    ).not.toBeVisible();
  });

  test("Keyboard操作、Mobile overflow、Accessibilityを確認する", async ({ page }) => {
    const personal = page.locator("#personal-section");
    const age40 = personal.getByRole("radio", { name: "40代" });
    await age40.focus();
    await page.keyboard.press("Space");
    await expect(age40).toBeChecked();
    await expect(personal.getByRole("button", { name: "変更を保存" })).toBeEnabled();

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
