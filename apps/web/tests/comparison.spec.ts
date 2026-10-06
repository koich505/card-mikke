import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const threeCardUrl =
  "/search?annualSpend=1200000&profile=everyday&usage=convenience:120000&usage=supermarket:360000&view=compare&compare=everyday-plus&compare=travel-step&compare=smart-basic";
const fiveCardUrl = `${threeCardUrl}&compare=daily-light&compare=long-name-edge`;

test.describe("カード比較UIモック", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(threeCardUrl);
    await expect(
      page.getByRole("heading", { name: "カードの違いをチェック" }),
    ).toBeVisible();
  });

  test("必須項目・開示状態・算定状態・内訳を同じ条件で比較する", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "Desktop表の項目網羅はDesktop Projectで検証");
    await expect(page.getByText("年間利用額 1,200,000円")).toBeVisible();
    await expect(page).toHaveTitle("選んだカードを比較｜カードみっけ");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    const table = page.getByRole("table", { name: "選択したカードの比較表" });
    for (const rowName of [
      "通常年の年間正味還元額",
      "キャンペーン",
      "申込経路・申込条件",
      "国際ブランド・バリエーション",
      "家族・追加カード",
      "Claim別の確認日・適用期間",
    ]) {
      await expect(table.getByRole("rowheader", { name: rowName })).toBeVisible();
    }
    await expect(table.getByText("公式確認済み相当").first()).toBeVisible();
    await expect(table.getByText("一部未確認").first()).toBeVisible();
    await expect(table.getByText("確認できず").first()).toBeVisible();
    await page.goto(fiveCardUrl.replace("long-name-edge", "journey-flex"));
    await expect(
      page
        .getByRole("table", { name: "選択したカードの比較表" })
        .getByText("非公開")
        .first(),
    ).toBeVisible();
    await expect(table.getByText(/算定不完全/).first()).toBeVisible();
    await expect(table.getByText(/変更確認中/).first()).toBeVisible();
    await expect(table.getByText(/スカイメタル/).first()).toBeVisible();
    await expect(page.getByText(/過小評価・順位変動/).first()).toBeVisible();

    const details = page.locator("details").filter({
      has: page.getByText("通常年・初年度の算定内訳", { exact: true }),
    });
    await details.first().locator("summary").click();
    await expect(details.first().getByText("通常ポイント").first()).toBeVisible();

    const claimEvidence = page.locator("details").filter({
      has: page.getByText("ClaimとEvidenceの対応", { exact: true }),
    });
    await claimEvidence.first().locator("summary").click();
    for (const claim of [
      "みっけポイント",
      "公式Web申込相当（合成）",
      "家族カード",
      "ETCカード",
      "サンライズ",
    ]) {
      await expect(
        claimEvidence.first().getByText(new RegExp(claim)).first(),
      ).toBeVisible();
    }
    await expect(
      claimEvidence
        .first()
        .getByText(/確認日/)
        .first(),
    ).toBeVisible();
    await expect(
      claimEvidence
        .first()
        .getByText(/適用期間/)
        .first(),
    ).toBeVisible();
  });

  test("Loading・一部取得失敗・全面取得失敗から再試行できる", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "状態境界はDesktop Projectで検証");
    await page.getByText("UIモックの状態を確認").click();
    await page.getByRole("button", { name: "読み込み中" }).click();
    await expect(page.getByText("比較情報を読み込んでいます")).toBeVisible();

    await page.getByRole("button", { name: "一部取得失敗" }).click();
    await expect(
      page.getByText("一部の情報を取得できませんでした", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/金額、比較項目、算定内訳、Evidence/)).toBeVisible();
    await expect(page.getByText("取得失敗", { exact: true }).first()).toBeVisible();
    const smartArticle = page.locator("article").filter({
      has: page.getByRole("heading", { name: "スマートベーシックカード" }),
    });
    await expect(smartArticle.getByText(/Evidenceは取得失敗/)).toBeVisible();
    await expect(smartArticle.getByText("ClaimとEvidenceの対応")).toHaveCount(0);
    await expect(page.getByText("商品情報：取得失敗").first()).toBeVisible();
    await page.getByRole("checkbox", { name: "違いがある項目だけ表示" }).check();
    await expect(page.getByRole("rowheader", { name: "ポイント" })).toBeVisible();
    await page.getByRole("button", { name: "再試行" }).click();
    await expect(smartArticle.getByText("ClaimとEvidenceの対応")).toBeVisible();

    await page.getByRole("button", { name: "全面取得失敗" }).click();
    await expect(page.getByText("比較情報を取得できませんでした")).toBeVisible();
    await page.getByRole("button", { name: "再試行" }).click();
    await expect(
      page.getByRole("table", { name: "選択したカードの比較表" }),
    ).toBeVisible();
  });

  test("全解除DialogはFocusを閉じ込め、Escape後に起点へ戻す", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "Keyboard ModalはDesktop Projectで検証");
    const clearButton = page.getByRole("button", { name: "すべて解除" });
    await clearButton.click();
    const dialog = page.getByRole("dialog", {
      name: "比較候補をすべて解除しますか？",
    });
    const cancelButton = dialog.getByRole("button", { name: "キャンセル" });
    await expect(cancelButton).toBeFocused();
    const confirmButton = dialog.getByRole("button", { name: "すべて解除" });
    for (let cycle = 0; cycle < 3; cycle += 1) {
      await page.keyboard.press("Shift+Tab");
      await expect(confirmButton).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(cancelButton).toBeFocused();
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(clearButton).toBeFocused();
  });

  test("カード削除と検索結果への復帰後も操作位置を維持する", async ({ page }) => {
    await page
      .getByRole("button", { name: "まいにちプラスカードを比較から外す" })
      .click();
    await expect(
      page.getByRole("button", { name: "トラベルステップカードを比較から外す" }),
    ).toBeFocused();

    await page.getByRole("button", { name: "カードを入れ替える" }).click();
    await expect(
      page.getByRole("heading", { name: "おすすめカードは、この3枚！" }),
    ).toBeFocused();
  });

  test("違いだけを表示し、2枚未満では追加選択を案内する", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "比較対象不足FlowはDesktop Projectで検証");
    await page.getByRole("checkbox", { name: "違いがある項目だけ表示" }).check();
    await page
      .getByRole("button", { name: "まいにちプラスカードを比較から外す" })
      .click();
    await expect(page.getByText("2枚を比較中（最大5枚）")).toBeVisible();
    await expect(
      page.getByRole("table", { name: "選択したカードの比較表" }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "トラベルステップカードを比較から外す" })
      .click();
    await expect(
      page.getByRole("heading", { name: "比較するカードをもう1枚選んでください" }),
    ).toBeVisible();
  });

  test("5枚比較と6枚目の拒否理由・解除方法を確認する", async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), "上限操作はDesktop Projectで検証");
    await page.goto(fiveCardUrl);
    await expect(page.getByText("5枚を比較中（最大5枚）")).toBeVisible();
    await expect(
      page.getByText("毎日の買い物と移動をまとめて確認するロングネームカード").first(),
    ).toBeVisible();
    await page.getByRole("button", { name: "← 検索結果へ戻る" }).click();
    await expect(
      page.getByRole("heading", { name: "おすすめカードは、この7枚！" }),
    ).toBeVisible();
    const sixthCard = page.locator("article").filter({
      has: page.getByRole("heading", { name: "シンプルチョイスカード" }),
    });
    await sixthCard.getByRole("button", { name: "+ 比較に追加" }).click();
    await expect(page.getByRole("alert").filter({ hasText: "最大5枚" })).toContainText(
      "1枚外してから追加",
    );
    await page
      .locator("article")
      .filter({ has: page.getByRole("heading", { name: "まいにちプラスカード" }) })
      .getByRole("button", { name: "✓ 比較に追加済み" })
      .click();
    await sixthCard.getByRole("button", { name: "+ 比較に追加" }).click();
    await expect(page.getByText("5枚", { exact: true })).toBeVisible();

    await page.goto("/");
    const featured = page.locator("#featured");
    await expect(featured.locator("article")).toHaveCount(3);
  });

  test("Desktopでは比較項目を縦に全展開し、横方向だけScrollできる", async ({
    page,
    isMobile,
  }) => {
    test.skip(Boolean(isMobile), "Desktop専用の比較表を検証");
    await page.goto(fiveCardUrl);
    const container = page.getByTestId("desktop-comparison-scroll");
    const scrollState = await container.evaluate((element) => {
      element.scrollTop = 500;
      element.scrollLeft = 700;
      return {
        scrollTop: element.scrollTop,
        scrollLeft: element.scrollLeft,
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
      };
    });
    expect(scrollState.scrollTop).toBe(0);
    expect(scrollState.scrollLeft).toBeGreaterThan(0);
    expect(scrollState.scrollHeight - scrollState.clientHeight).toBeLessThanOrEqual(1);

    const positions = await container.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const rowHeader = element.querySelector("tbody th")!.getBoundingClientRect();
      return {
        rowLeft: Math.round(rowHeader.left),
        containerLeft: Math.round(box.left),
      };
    });
    expect(Math.abs(positions.rowLeft - positions.containerLeft)).toBeLessThan(3);
    await expect(
      container.getByText("通常年の年間正味還元額", { exact: true }).first(),
    ).toBeVisible();
    await expect(
      container.getByText("Claim別の確認日・適用期間", { exact: true }),
    ).toBeVisible();
  });

  test("各ProjectでAccessibilityとPage Overflowを確認する", async ({
    page,
    isMobile,
  }) => {
    await page.goto(fiveCardUrl);
    if (isMobile) {
      await expect(
        page.getByRole("table", { name: "選択したカードの比較表" }),
      ).not.toBeVisible();
      await expect(
        page.getByRole("heading", { name: "通常年の年間正味還元額" }),
      ).toBeVisible();
      await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
    } else {
      await expect(
        page.getByRole("table", { name: "選択したカードの比較表" }),
      ).toBeVisible();
    }
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth - document.body.clientWidth,
      root: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    expect(overflow.body).toBeLessThanOrEqual(1);
    expect(overflow.root).toBeLessThanOrEqual(1);
  });
});
