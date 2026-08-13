import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("カード詳細UIモック", () => {
  test("単一Tab PanelをKeyboardで切り替える", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    const valueTab = page.getByRole("tab", { name: "おトク試算" });
    await valueTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "ポイント" })).toBeFocused();
    await expect(page.getByRole("tabpanel")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "ポイント・還元" })).toBeVisible();
  });

  test("複数Campaignを手動で横切替でき自動再生しない", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    const carousel = page.getByRole("region", { name: "注目のキャンペーン" });
    await expect(carousel.getByText("新規入会・利用特典")).toBeVisible();
    await carousel.getByRole("button", { name: "次のキャンペーンを見る" }).click();
    await expect(carousel.getByText("秋のタッチ決済Campaign")).toBeVisible();
    await page.waitForTimeout(700);
    await expect(carousel.getByText("秋のタッチ決済Campaign")).toBeVisible();
  });

  test("確認済み上限とCampaign成立Scenarioを試算へ反映する", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    await expect(page.getByText("24,200円", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("27,200円", { exact: true }).first()).toBeVisible();
    await page.getByRole("tab", { name: "ポイント" }).click();
    await expect(
      page.locator("dd").filter({ hasText: "月300ポイント（合成）" }).last(),
    ).toBeVisible();
  });

  test("カスタム試算はError理由と更新結果を通知する", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    await page.getByRole("button", { name: "条件を変更して試算" }).click();
    const total = page.getByRole("spinbutton", {
      name: "年間利用額 円",
      exact: true,
    });
    await total.fill("0");
    await expect(page.getByText("利用額を1円以上で入力してください。")).toBeVisible();
    await total.fill("2000000");
    await page.getByRole("button", { name: "この条件で試算する" }).click();
    await expect(page.getByRole("status")).toContainText("試算を更新しました");
    await expect(page.getByText("カスタム条件")).toBeVisible();
  });

  test("カテゴリ内の具体的な架空Serviceを選べる", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    await page.getByRole("button", { name: "条件を変更して試算" }).click();
    await page
      .getByRole("combobox", { name: "コンビニで使う店舗・サービス" })
      .selectOption("featured");
    await page.getByRole("button", { name: "この条件で試算する" }).click();
    await expect(page.getByText("デイリー24（架空）", { exact: true })).toBeVisible();
  });

  test("カスタム条件を関連Cardと検索へ引き継ぐ", async ({ page }) => {
    await page.goto(
      "/cards/everyday-plus?annualSpend=1200000&profile=everyday&usage=convenience%3A180000&usage=supermarket%3A420000&service=convenience%3Abest&service=supermarket%3Aother",
    );
    await page.getByRole("button", { name: "条件を変更して試算" }).click();
    await page
      .getByRole("spinbutton", { name: "年間利用額 円", exact: true })
      .fill("2000000");
    await page.getByRole("button", { name: "この条件で試算する" }).click();
    const related = page.getByRole("link", {
      name: /トラベルステップカード.*現在の利用額・使い道/,
    });
    await expect(related).toHaveAttribute("href", /annualSpend=2000000/);
    await expect(related).toHaveAttribute("href", /service=supermarket%3Aother/);
    await related.click();
    await expect(page.getByText("年間 2,000,000円")).toBeVisible();
    await page.getByRole("link", { name: "検索結果へ戻る" }).click();
    await expect(page.getByText("年間利用額 2,000,000円")).toBeVisible();
  });

  test("鮮度IconはFocus時に意味を取得できる", async ({ page }) => {
    await page.goto("/cards/travel-step");
    const freshness = page.getByRole("img", {
      name: "旅行還元の一部を変更確認中",
    });
    await freshness.focus();
    await expect(freshness).toBeFocused();
    await expect(freshness).toHaveAttribute(
      "data-tooltip",
      "旅行還元の一部を変更確認中",
    );
  });

  test("レビュー投稿はLogin状態、入力Validation、編集・削除を確認できる", async ({
    page,
  }) => {
    await page.goto("/cards/everyday-plus");
    await page.getByRole("tab", { name: "レビュー" }).click();
    await expect(page.getByText("レビュー投稿にはログインが必要です")).toBeVisible();

    await page.getByLabel("ログイン済みとして確認する").check();
    await page.getByRole("button", { name: "投稿する" }).click();
    await expect(
      page.getByText("評価を1〜5から選択してください。", { exact: true }),
    ).toBeVisible();

    await page.getByRole("radio", { name: "5点", exact: true }).check();
    await page.getByLabel("レビュー本文（必須）").fill("a".repeat(1001));
    await page.getByRole("button", { name: "投稿する" }).click();
    await expect(
      page.getByText("レビュー本文は1000文字以内で入力してください。", { exact: true }),
    ).toBeVisible();

    await page
      .getByLabel("レビュー本文（必須）")
      .fill("還元条件を確認してから使うと分かりやすいです。");
    await page.getByRole("button", { name: "投稿する" }).click();
    await expect(page.getByText("あなたのレビュー")).toBeVisible();
    await expect(
      page.getByText("レビューを投稿しました。", { exact: true }),
    ).toBeVisible();

    await page.getByRole("button", { name: "編集して再投稿" }).click();
    await page.getByRole("button", { name: "更新する" }).click();
    await expect(page.getByText("投稿済み")).toBeVisible();

    await page.getByRole("button", { name: "削除する" }).click();
    await expect(
      page.getByRole("dialog", { name: "レビューを削除しますか？" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "削除して非公開にする" }).click();
    await expect(page.getByText(/レビューを非公開にしました/)).toBeVisible();
  });

  test("公開レビューを通報して受付完了を確認できる", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    await page.getByRole("tab", { name: "レビュー" }).click();
    await page.getByRole("button", { name: "このレビューを通報" }).first().click();
    const dialog = page.getByRole("dialog", { name: "レビューを通報" });
    await dialog.getByLabel("理由").selectOption("個人情報");
    await dialog
      .getByLabel("説明（任意）")
      .fill("公開情報に見えない個人情報が含まれます。");
    await dialog.getByRole("button", { name: "通報を送信" }).click();
    await expect(
      page.getByText(/通報を受け付けました（理由：個人情報）/),
    ).toBeVisible();
  });

  test("Not FoundとMobile overflowを確認する", async ({ page }) => {
    await page.goto("/cards/not-a-card");
    await expect(
      page.getByRole("heading", { name: "カードが見つかりませんでした" }),
    ).toBeVisible();
    await page.goto("/cards/everyday-plus");
    await expect(
      page.getByRole("heading", { name: "まいにちプラスカード", level: 1 }),
    ).toBeVisible();
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
  });

  test("自動Accessibility検査に重大違反がない", async ({ page }) => {
    await page.goto("/cards/everyday-plus");
    await expect(
      page.getByRole("heading", { name: "まいにちプラスカード", level: 1 }),
    ).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
