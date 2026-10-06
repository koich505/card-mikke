import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type TestInfo } from "@playwright/test";

const loginOps = async (page: Page) => {
  await page.goto("/ops/login");
  await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
  await page.getByRole("button", { name: "Passwordを確認" }).click();
  await page.getByLabel("6桁の確認コード").fill("123456");
  await page.getByRole("button", { name: "確認してDashboardへ" }).click();
};

const openThemes = async (page: Page, testInfo: TestInfo) => {
  if (testInfo.project.name === "mobile-chrome") {
    await page.getByRole("button", { name: "メニュー", exact: true }).click();
    await page
      .getByRole("complementary", { name: "運営管理メニュー" })
      .getByRole("link", { name: "テーマ管理" })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "運営管理ナビゲーション" })
      .getByRole("link", { name: "テーマ管理" })
      .click();
  }
};

const reauthenticate = async (page: Page, action: string) => {
  await page.getByLabel("Password", { exact: true }).fill("prototype-passphrase");
  await page.getByLabel("6桁のMFAコード").fill("123456");
  await page.getByRole("button", { name: action, exact: true }).click();
};

test.describe("テーマ別プリセット検索 UIモック", () => {
  test("公開テーマだけを表示順に示し、1回の選択で結果へ進む", async ({ page }) => {
    await page.goto("/");
    const list = page.getByTestId("published-theme-list");
    await expect(list.getByRole("heading")).toHaveText([
      "旅行好き",
      "ショッピング好き",
      "シンプルでお得重視",
    ]);
    await expect(page.getByText("週末ドライブ候補")).toHaveCount(0);

    await list.getByRole("link", { name: /旅行好き/ }).click();
    await expect(page).toHaveURL(/\/search\?theme=travel-lover/);
    await expect(page.getByText("旅行好き", { exact: true })).toBeVisible();
    await expect(
      page.getByText("今回の検索のみ（Profileは更新しません）"),
    ).toBeVisible();
    await expect(page.getByText("こだわり派")).toBeVisible();
    await expect(page.getByText(/ネット通販 240,000円（その他/)).toBeVisible();
    const appliedTheme = page
      .getByRole("complementary")
      .filter({ hasText: "選択したテーマ" });
    await expect(appliedTheme.getByText("年間利用額").locator("..")).toContainText(
      "2,400,000円",
    );
    await expect(page.getByText("公開中テーマの条件一式を適用中")).toBeVisible();
  });

  test("テーマ条件を変更して再検索でき、変更状態を示す", async ({ page }) => {
    await page.goto("/search?theme=travel-lover");
    await page.getByRole("button", { name: "← 条件を変更する" }).click();
    await expect(page.getByRole("heading", { name: /いつもの使い方で/ })).toBeFocused();
    await page.locator('input[id="amount-旅行・宿泊"]').fill("-1");
    await expect(page.getByText(/0以上の整数/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /おすすめ結果を見る/ }),
    ).toBeDisabled();
    await page.locator('input[id="amount-旅行・宿泊"]').fill("50000");
    await page.getByRole("button", { name: /おすすめ結果を見る/ }).click();
    await expect(page.getByRole("heading", { name: /おすすめカードは/ })).toBeFocused();
    await expect(page.getByText("テーマを基に条件変更済み")).toBeVisible();
    await expect(page.getByText(/旅行・宿泊 600,000円/)).toBeVisible();
  });

  test("非公開・不明テーマの直指定を適用しない", async ({ page }) => {
    await page.goto("/search?theme=weekend-drive");
    await expect(page.getByText("このテーマは現在選択できません")).toBeVisible();
    await expect(page.getByText("週末ドライブ候補")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /いつもの使い方で/ })).toBeVisible();
    await page.goto("/search?theme=unknown-theme");
    await expect(page.getByText("このテーマは現在選択できません")).toBeVisible();
    await expect(page.getByRole("heading", { name: /いつもの使い方で/ })).toBeVisible();
  });

  test("Desktop／MobileでKeyboard・Accessibility・横幅を確認する", async ({ page }) => {
    await page.goto("/");
    const themeLink = page.getByRole("link", { name: /旅行好き/ });
    expect(
      (
        await new AxeBuilder({ page })
          .include('[data-testid="published-theme-list"]')
          .analyze()
      ).violations,
    ).toEqual([]);
    await themeLink.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("旅行好き", { exact: true })).toBeVisible();
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
    expect(
      (await new AxeBuilder({ page }).include("aside").analyze()).violations,
    ).toEqual([]);
  });
});

test.describe("テーマ管理 UIモック", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await loginOps(page);
    await openThemes(page, testInfo);
  });

  test("追加・Validation・Draft保存をMemory内で行う", async ({ page }) => {
    await page.getByRole("button", { name: "新規追加" }).click();
    await expect(page.getByRole("heading", { name: "テーマ設定" })).toBeVisible();
    const nameInput = page.getByLabel("利用者向け名称");
    await nameInput.fill("");
    await expect(nameInput).toHaveValue("");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByText("名称と説明を入力してください。")).toBeVisible();
    await page.getByLabel("利用者向け名称").fill("通勤中心");
    await page.getByLabel("年間利用額（円）").fill("100000");
    await page.getByLabel("交通（円）").fill("120000");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByText(/内訳合計を年間利用額以下/)).toBeVisible();
    await page.getByLabel("年間利用額（円）").fill("1000000");
    await page.getByLabel("交通（円）").fill("-1");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByText(/0以上の整数/)).toBeVisible();
    await page.getByLabel("交通（円）").fill("120000");
    await page.getByLabel("交通のService条件").selectOption("featured");
    await page.getByLabel("年間利用額（円）").fill("1000000.5");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByText(/年間利用額は.*整数/)).toBeVisible();
    await page.getByLabel("年間利用額（円）").fill("1000000");
    await page.getByLabel("表示順").fill("1.5");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByText(/表示順は.*整数/)).toBeVisible();
    await page.getByLabel("表示順").fill("1");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByText(/表示順が重複/)).toBeVisible();
    await page.getByLabel("表示順").fill("5");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(page.getByRole("status")).toContainText("Browser Memory内");
    await expect(page.getByRole("button", { name: "再認証して公開" })).toBeEnabled();
    expect(
      await page.evaluate(() => ({
        cookie: document.cookie,
        local: localStorage.length,
        session: sessionStorage.length,
      })),
    ).toEqual({ cookie: "", local: 0, session: 0 });
  });

  test("非公開テーマを再認証して公開し、公開順へ反映する", async ({ page }) => {
    await page.getByRole("button", { name: /週末ドライブ候補/ }).click();
    await page.getByLabel("表示順").fill("4");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await page.getByRole("button", { name: "再認証して公開" }).click();
    await reauthenticate(page, "テーマを公開");
    await expect(page.getByRole("status")).toContainText("公開中としたUI-only状態");
    const preview = page.getByTestId("published-order-preview");
    await expect(preview.getByRole("listitem").last()).toContainText(
      "週末ドライブ候補",
    );
  });

  test("公開中テーマのDraftは再認証まで公開Snapshotへ反映しない", async ({ page }) => {
    const preview = page.getByTestId("published-order-preview");
    await page.getByRole("button", { name: /旅行好き/ }).click();
    await page.getByLabel("利用者向け名称").fill("旅行好き・更新案");
    await page.getByLabel("表示順").fill("9");
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await expect(preview).toContainText("旅行好き（表示順 1）");
    await expect(preview).not.toContainText("旅行好き・更新案");
    const publishButton = page.getByRole("button", {
      name: "再認証して変更を公開",
    });
    await publishButton.click();
    await expect(page.getByLabel("Password", { exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(publishButton).toBeFocused();
    await publishButton.click();
    await reauthenticate(page, "テーマの変更を公開");
    await expect(preview).toContainText("旅行好き・更新案（表示順 9）");
    await expect(preview.getByRole("listitem").last()).toContainText(
      "旅行好き・更新案",
    );
  });

  test("非公開化後も保存済み履歴を上書きせずAccessibilityを保つ", async ({ page }) => {
    const snapshot = page.getByTestId("theme-history-snapshot");
    const before = await snapshot.textContent();
    await expect(snapshot).toContainText("当時の条件一式");
    await expect(snapshot).toContainText("指定した架空Service");
    await page.getByRole("button", { name: /旅行好き/ }).click();
    await expect(
      page.getByRole("button", { name: "再認証して非公開化" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Draftを保存" }).click();
    await page.getByRole("button", { name: "再認証して非公開化" }).click();
    await reauthenticate(page, "テーマを非公開化");
    await expect(page.getByRole("status")).toContainText("履歴は変更していません");
    await expect(snapshot).toHaveText(before ?? "");
    await expect(page.getByTestId("published-order-preview")).not.toContainText(
      "旅行好き",
    );
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
});
