"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { featuredCards } from "@/fixtures/home";
import styles from "./search.module.css";

const categories = [
  "コンビニ",
  "スーパー",
  "ドラッグストア",
  "飲食店",
  "ガソリン",
  "公共料金",
  "携帯電話",
  "交通",
  "旅行・宿泊",
  "ネット通販",
  "その他",
] as const;

type Category = (typeof categories)[number];
type View = "conditions" | "results" | "compare";
type SpendPeriod = "monthly" | "annual";

const yen = new Intl.NumberFormat("ja-JP");

export default function SearchPrototype() {
  const [step, setStep] = useState(1);
  const [view, setView] = useState<View>("conditions");
  const [annualSpend, setAnnualSpend] = useState(1_200_000);
  const [spendPeriod, setSpendPeriod] = useState<SpendPeriod>("monthly");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    "コンビニ",
    "スーパー",
  ]);
  const [amounts, setAmounts] = useState<Partial<Record<Category, number>>>({
    コンビニ: 120_000,
    スーパー: 360_000,
  });
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [freeFeeOnly, setFreeFeeOnly] = useState(false);
  const [includeInvitation, setIncludeInvitation] = useState(false);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const allocated = useMemo(
    () => Object.values(amounts).reduce((sum, value) => sum + (value ?? 0), 0),
    [amounts],
  );
  const remaining = annualSpend - allocated;
  const invalid = remaining < 0;
  const periodLabel = spendPeriod === "monthly" ? "月間" : "年間";
  const periodMultiplier = spendPeriod === "monthly" ? 12 : 1;
  const displayedSpend = annualSpend / periodMultiplier;

  const visibleCards = useMemo(
    () =>
      featuredCards
        .filter((card) => (freeFeeOnly ? card.annualFeeLabel.includes("無料") : true))
        .toSorted((a, b) => b.regularYearValue - a.regularYearValue),
    [freeFeeOnly],
  );

  function toggleCategory(category: Category) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
    if (selectedCategories.includes(category)) {
      setAmounts((current) => ({ ...current, [category]: 0 }));
    }
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 5) return current;
      return [...current, id];
    });
  }

  const comparedCards = featuredCards.filter((card) => compareIds.includes(card.id));

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#search-main">
        本文へ移動
      </a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          <span aria-hidden="true">比較！</span>
          カード比較くん
        </Link>
        <nav aria-label="検索中のナビゲーション">
          <Link href="/">ホーム</Link>
          <button type="button" onClick={() => setView("conditions")}>
            条件を変更
          </button>
          <button type="button" onClick={() => setView("results")}>
            検索結果
          </button>
        </nav>
      </header>

      <main id="search-main" className={styles.main}>
        <div className={styles.prototypeNotice}>
          UI Mock：入力・Filter・比較はMemory内の合成データだけで動作します
        </div>

        {view === "conditions" && (
          <section aria-labelledby="condition-title">
            <div className={styles.titleRow}>
              <div>
                <p className={styles.conditionBadge}>かんたん3STEP</p>
                <h1 id="condition-title">あなたの使い方を教えてください</h1>
                <span className={styles.titleLead}>
                  入力した条件は、このUI Mockの中だけで比較に使用します。
                </span>
              </div>
              <div className={styles.stepper} aria-label={`全3ステップ中${step}番目`}>
                {[1, 2, 3].map((item) => (
                  <span key={item} aria-current={item === step ? "step" : undefined}>
                    <small>STEP</small>
                    <strong>{item}</strong>
                  </span>
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className={styles.conditionPanel} data-step="1">
                <p className={styles.panelSticker} aria-label="ステップ1">
                  <span>STEP</span>
                  <strong>1</strong>
                  <small>/ 3</small>
                </p>
                <p className={styles.panelBand}>まずは利用額を入力</p>
                <div className={styles.spendLayout}>
                  <div className={styles.spendInputArea}>
                    <fieldset className={styles.periodSwitch}>
                      <legend>入力する期間</legend>
                      {(["monthly", "annual"] as const).map((period) => (
                        <button
                          type="button"
                          aria-pressed={spendPeriod === period}
                          onClick={() => setSpendPeriod(period)}
                          key={period}
                        >
                          {period === "monthly" ? "月間" : "年間"}
                        </button>
                      ))}
                    </fieldset>
                    <label htmlFor="search-spend">{periodLabel}利用額</label>
                    <div className={styles.bigAmount}>
                      <span>¥</span>
                      <input
                        id="search-spend"
                        type="number"
                        min="0"
                        step="10000"
                        value={displayedSpend}
                        onChange={(event) =>
                          setAnnualSpend(Number(event.target.value) * periodMultiplier)
                        }
                      />
                      <strong>円</strong>
                    </div>
                    <p>
                      {spendPeriod === "monthly"
                        ? "毎月のおおよその利用額を入力してください。"
                        : "1年間のおおよその合計を入力してください。"}
                    </p>
                    <div className={styles.presetButtons} aria-label="入力例">
                      {(spendPeriod === "monthly"
                        ? [50_000, 100_000, 200_000]
                        : [600_000, 1_200_000, 2_400_000]
                      ).map((value) => (
                        <button
                          type="button"
                          onClick={() => setAnnualSpend(value * periodMultiplier)}
                          key={value}
                        >
                          <span>{spendPeriod === "monthly" ? "月" : "年"}</span>
                          {yen.format(value)}円
                        </button>
                      ))}
                    </div>
                  </div>
                  <aside
                    className={styles.spendSummary}
                    aria-label="比較に使用する金額"
                  >
                    <span className={styles.summaryIcon} aria-hidden="true">
                      ¥
                    </span>
                    <small>比較に使用する年間利用額</small>
                    <p>
                      <strong>{yen.format(annualSpend)}</strong>円
                    </p>
                    <div>
                      <span>月額換算</span>
                      <b>{yen.format(Math.round(annualSpend / 12))}円</b>
                    </div>
                    <em>入力期間を切り替えても同じ年額として比較します</em>
                  </aside>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.conditionPanel} data-step="2">
                <p className={styles.panelSticker} aria-label="ステップ2">
                  <span>STEP</span>
                  <strong>2</strong>
                  <small>/ 3</small>
                </p>
                <p className={styles.panelBand}>よく使う場所を選択</p>
                <h2>利用先カテゴリを選ぶ</h2>
                <p>
                  選択したカテゴリだけ金額欄を表示します。企業・Service名はすべて架空です。
                </p>
                <fieldset className={styles.periodSwitch}>
                  <legend>カテゴリ別の入力期間</legend>
                  {(["monthly", "annual"] as const).map((period) => (
                    <button
                      type="button"
                      aria-pressed={spendPeriod === period}
                      onClick={() => setSpendPeriod(period)}
                      key={period}
                    >
                      {period === "monthly" ? "月間" : "年間"}
                    </button>
                  ))}
                </fieldset>
                <div className={styles.categoryGrid}>
                  {categories.map((category) => {
                    const selected = selectedCategories.includes(category);
                    return (
                      <div
                        className={
                          selected ? styles.categorySelected : styles.categoryCollapsed
                        }
                        key={category}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleCategory(category)}
                          />
                          <strong>{category}</strong>
                        </label>
                        {selected && (
                          <div className={styles.categoryAmount}>
                            <label htmlFor={`amount-${category}`}>
                              {periodLabel}利用額
                            </label>
                            <input
                              id={`amount-${category}`}
                              type="number"
                              min="0"
                              step="10000"
                              value={(amounts[category] ?? 0) / periodMultiplier}
                              onChange={(event) =>
                                setAmounts((current) => ({
                                  ...current,
                                  [category]:
                                    Number(event.target.value) * periodMultiplier,
                                }))
                              }
                            />
                            <span>円</span>
                            <small>カテゴリ内の確認済み最良条件を使う目安</small>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {invalid && (
                  <div className={styles.inlineError} role="alert">
                    <strong>利用額の内訳が全体の利用額を超えています</strong>
                    <span>
                      {periodLabel}の内訳合計は
                      {yen.format(allocated / periodMultiplier)}円です。全体の
                      {periodLabel}利用額を
                      {yen.format(Math.abs(remaining) / periodMultiplier)}
                      円以上増やすか、 カテゴリ別利用額を減らしてください。
                    </span>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className={styles.reviewGrid}>
                <div className={styles.conditionPanel} data-step="3">
                  <p className={styles.panelSticker} aria-label="ステップ3">
                    <span>STEP</span>
                    <strong>3</strong>
                    <small>/ 3</small>
                  </p>
                  <p className={styles.panelBand}>入力内容を最終確認</p>
                  <h2>この条件で比べます</h2>
                  <dl className={styles.reviewList}>
                    <div>
                      <dt>年間利用額</dt>
                      <dd>{yen.format(annualSpend)}円</dd>
                    </div>
                    {selectedCategories.map((category) => (
                      <div key={category}>
                        <dt>{category}</dt>
                        <dd>{yen.format(amounts[category] ?? 0)}円</dd>
                      </div>
                    ))}
                    <div>
                      <dt>その他の利用</dt>
                      <dd>{yen.format(Math.max(remaining, 0))}円</dd>
                    </div>
                  </dl>
                </div>
                <aside className={invalid ? styles.summaryError : styles.summaryOk}>
                  <strong>
                    {invalid ? "内訳が年額を超えています" : "合計は一致しています"}
                  </strong>
                  <span>年間利用額 {yen.format(annualSpend)}円</span>
                  <span>利用先内訳 {yen.format(allocated)}円</span>
                  {invalid && (
                    <p>{yen.format(Math.abs(remaining))}円減らしてください。</p>
                  )}
                  {!invalid && (
                    <p>差額は「その他の利用」として通常還元の目安に含めます。</p>
                  )}
                </aside>
              </div>
            )}

            <div className={styles.stepActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={step === 1}
                onClick={() => setStep((current) => Math.max(1, current - 1))}
              >
                ← 戻る
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={step === 2 && invalid}
                  onClick={() => setStep((current) => Math.min(3, current + 1))}
                >
                  次へ →
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={invalid}
                  onClick={() => setView("results")}
                >
                  この条件で結果を見る！
                </button>
              )}
            </div>
          </section>
        )}

        {view === "results" && (
          <section aria-labelledby="results-title">
            <div className={styles.resultsHeading}>
              <div>
                <p>年間 {yen.format(annualSpend)}円の合成結果</p>
                <h1 id="results-title">あなたの条件では、この3枚に注目！</h1>
              </div>
              <button type="button" onClick={() => setView("conditions")}>
                条件を変更
              </button>
            </div>
            <div className={styles.activeConditions} aria-label="適用中の条件">
              <strong>適用中：</strong>
              {selectedCategories.map((category) => (
                <span key={category}>{category}</span>
              ))}
              <span>通常年が高い順</span>
            </div>

            <button
              type="button"
              className={styles.mobileFilterButton}
              onClick={() => setFilterOpen(true)}
              aria-expanded={filterOpen}
              aria-controls="search-filters"
            >
              絞り込みを開く
            </button>

            <div className={styles.resultLayout}>
              <aside
                className={`${styles.filters} ${filterOpen ? styles.filtersOpen : ""}`}
                id="search-filters"
                aria-labelledby="filter-title"
                aria-modal={filterOpen || undefined}
                role={filterOpen ? "dialog" : undefined}
              >
                <button
                  type="button"
                  className={styles.mobileFilterClose}
                  onClick={() => setFilterOpen(false)}
                >
                  閉じる
                </button>
                <h2 id="filter-title">絞り込み</h2>
                <label>
                  <input
                    type="checkbox"
                    checked={freeFeeOnly}
                    onChange={(event) => setFreeFeeOnly(event.target.checked)}
                  />
                  年会費無料
                </label>
                <label>
                  <input type="checkbox" /> 還元率1.0%以上
                </label>
                <label>
                  <input type="checkbox" /> 家族・追加カード発行可
                </label>
                <label>
                  <input type="checkbox" /> ETCカード発行可
                </label>
                <hr />
                <label>
                  <input
                    type="checkbox"
                    checked={includeInvitation}
                    onChange={(event) => setIncludeInvitation(event.target.checked)}
                  />
                  招待制を含める
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={includeClosed}
                    onChange={(event) => setIncludeClosed(event.target.checked)}
                  />
                  新規受付停止を含める
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setFreeFeeOnly(false);
                    setIncludeInvitation(false);
                    setIncludeClosed(false);
                  }}
                >
                  すべて解除
                </button>
                <button
                  type="button"
                  className={styles.mobileFilterApply}
                  onClick={() => setFilterOpen(false)}
                >
                  {visibleCards.length}件の結果を表示
                </button>
              </aside>

              <div className={styles.results} aria-live="polite">
                <p className={styles.resultCount}>{visibleCards.length}件を表示</p>
                {visibleCards.map((card, index) => {
                  const selected = compareIds.includes(card.id);
                  return (
                    <article className={styles.resultCard} key={card.id}>
                      <div className={styles.resultRank}>
                        <span>通常年の目安順</span>
                        <strong>{index + 1}</strong>
                      </div>
                      <div
                        className={`${styles.miniCard} ${styles[`mini_${card.accent}`]}`}
                      >
                        <small>UI PROTOTYPE</small>
                        <strong>{card.name}</strong>
                      </div>
                      <div className={styles.resultMain}>
                        <p className={styles.resultLabel}>{card.label}</p>
                        <h2>{card.name}</h2>
                        <p>{card.issuer}</p>
                        <div className={styles.resultValue}>
                          <span>通常年の年間正味還元額</span>
                          <p>
                            <strong>{yen.format(card.regularYearValue)}</strong>円
                          </p>
                          <small>初年度 {yen.format(card.firstYearValue)}円</small>
                        </div>
                        <ul>
                          <li>{card.annualFeeLabel}</li>
                          <li>{card.baseRewardLabel}</li>
                        </ul>
                      </div>
                      <div className={styles.resultActions}>
                        <div className={styles.resultState} data-state={card.state}>
                          <strong>{card.stateLabel}</strong>
                          <span>確認日 {card.confirmedOn}</span>
                        </div>
                        <button
                          type="button"
                          className={selected ? styles.compareSelected : ""}
                          onClick={() => toggleCompare(card.id)}
                        >
                          {selected ? "✓ 比較に追加済み" : "+ 比較に追加"}
                        </button>
                        <details>
                          <summary>算定内訳と根拠</summary>
                          <p>{card.reason}</p>
                          <p>通常還元・利用先還元・年会費を区別した合成説明です。</p>
                        </details>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {view === "compare" && (
          <section aria-labelledby="compare-title">
            <div className={styles.resultsHeading}>
              <div>
                <p>同じ年間利用条件で比較</p>
                <h1 id="compare-title">選んだカードの違い</h1>
              </div>
              <button type="button" onClick={() => setView("results")}>
                ← 検索結果へ戻る
              </button>
            </div>
            <div className={styles.compareTableWrap}>
              <table className={styles.compareTable}>
                <caption>選択したカードの合成データ比較</caption>
                <thead>
                  <tr>
                    <th scope="col">比較項目</th>
                    {comparedCards.map((card) => (
                      <th scope="col" key={card.id}>
                        {card.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">通常年</th>
                    {comparedCards.map((card) => (
                      <td key={card.id} className={styles.compareMoney}>
                        {yen.format(card.regularYearValue)}円
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">初年度</th>
                    {comparedCards.map((card) => (
                      <td key={card.id}>{yen.format(card.firstYearValue)}円</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">年会費</th>
                    {comparedCards.map((card) => (
                      <td key={card.id}>{card.annualFeeLabel}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">基本還元</th>
                    {comparedCards.map((card) => (
                      <td key={card.id}>{card.baseRewardLabel}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">算定状態</th>
                    {comparedCards.map((card) => (
                      <td key={card.id}>
                        <strong>{card.stateLabel}</strong>
                        <br />
                        <small>確認日 {card.confirmedOn}</small>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.mobileComparison}>
              <label className={styles.differenceToggle}>
                <input
                  type="checkbox"
                  checked={differencesOnly}
                  onChange={(event) => setDifferencesOnly(event.target.checked)}
                />
                違いがある項目のみ表示
              </label>

              <section aria-labelledby="mobile-regular-year">
                <h2 id="mobile-regular-year">通常年</h2>
                {comparedCards.map((card) => (
                  <div key={card.id}>
                    <strong>{card.name}</strong>
                    <span className={styles.compareMoney}>
                      {yen.format(card.regularYearValue)}円
                    </span>
                  </div>
                ))}
              </section>

              <section aria-labelledby="mobile-first-year">
                <h2 id="mobile-first-year">初年度</h2>
                {comparedCards.map((card) => (
                  <div key={card.id}>
                    <strong>{card.name}</strong>
                    <span>{yen.format(card.firstYearValue)}円</span>
                  </div>
                ))}
              </section>

              <section aria-labelledby="mobile-fee">
                <h2 id="mobile-fee">年会費</h2>
                {comparedCards.map((card) => (
                  <div key={card.id}>
                    <strong>{card.name}</strong>
                    <span>{card.annualFeeLabel}</span>
                  </div>
                ))}
              </section>

              <section aria-labelledby="mobile-reward">
                <h2 id="mobile-reward">基本還元</h2>
                {comparedCards.map((card) => (
                  <div key={card.id}>
                    <strong>{card.name}</strong>
                    <span>{card.baseRewardLabel}</span>
                  </div>
                ))}
              </section>

              {!differencesOnly && (
                <section aria-labelledby="mobile-evidence-policy">
                  <h2 id="mobile-evidence-policy">算定に使うSource</h2>
                  {comparedCards.map((card) => (
                    <div key={card.id}>
                      <strong>{card.name}</strong>
                      <span>公式Sourceで確認済みの要素のみ</span>
                    </div>
                  ))}
                </section>
              )}

              <section aria-labelledby="mobile-state">
                <h2 id="mobile-state">算定状態</h2>
                {comparedCards.map((card) => (
                  <div key={card.id}>
                    <strong>{card.name}</strong>
                    <span>{card.stateLabel}</span>
                    <small>確認日 {card.confirmedOn}</small>
                    <button type="button" onClick={() => toggleCompare(card.id)}>
                      比較から外す
                    </button>
                  </div>
                ))}
              </section>
            </div>
          </section>
        )}
      </main>

      {view === "results" && compareIds.length > 0 && (
        <div className={styles.compareBar} role="region" aria-label="比較候補">
          <div>
            <strong>{compareIds.length}枚</strong>
            <span>を比較候補に選択中（最大5枚）</span>
          </div>
          <button type="button" onClick={() => setCompareIds([])}>
            全解除
          </button>
          <button type="button" onClick={() => setView("compare")}>
            比較する！ →
          </button>
        </div>
      )}
    </div>
  );
}
