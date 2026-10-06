"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "@/app/components/site-header";
import {
  calculatePrototypeCard,
  featuredServiceLabel,
  withPrototypeScenario,
} from "@/features/card-detail/prototype-scenario";
import {
  prototypeCategories,
  prototypeCategoryIdByLabel,
  prototypeCategoryMarkByLabel,
  type PrototypeCategoryLabel,
} from "@/features/search/prototype-condition-options";
import { buildPrototypeComparisonCards } from "@/features/search/comparison-prototype";
import { redesignedCardDetails } from "@/fixtures/card-detail-v2";
import { correctionReportHref } from "@/fixtures/correction-report";
import { featuredCards, prototypeSearchCards } from "@/fixtures/home";
import type { PrototypeSearchScenario } from "@/types/card-detail-prototype";
import type { PrototypeCardId } from "@/types/ui-prototype";
import ComparisonView from "./comparison-view";
import styles from "./search.module.css";

const spendOptions = [
  { id: "amount-1", monthly: 50_000, annual: 500_000, icon: "\u00a5" },
  { id: "amount-2", monthly: 100_000, annual: 1_000_000, icon: "W" },
  { id: "amount-3", monthly: 200_000, annual: 2_000_000, icon: "C" },
  { id: "amount-4", monthly: 300_000, annual: 3_000_000, icon: "B" },
  { id: "amount-5", monthly: 500_000, annual: 5_000_000, icon: "P" },
  { id: "amount-6", monthly: 700_000, annual: 7_000_000, icon: "7" },
] as const;

const profiles = [
  {
    id: "everyday",
    name: "コツコツ派",
    description: "コンビニやスーパーをよく使う",
    badge: "日常使い重視",
    icon: "SHOP",
  },
  {
    id: "points",
    name: "ポイント派",
    description: "還元率やポイントを重視したい",
    badge: "還元率重視",
    icon: "POINT",
  },
  {
    id: "travel",
    name: "おでかけ派",
    description: "旅行や交通でおトクに使いたい",
    badge: "旅行・交通重視",
    icon: "TRIP",
  },
  {
    id: "simple",
    name: "シンプル派",
    description: "年会費をかけず気軽に使いたい",
    badge: "年会費重視",
    icon: "FREE",
  },
  {
    id: "shopping",
    name: "お買い物派",
    description: "ネット通販や大きな買い物が多い",
    badge: "買い物重視",
    icon: "CART",
  },
  {
    id: "custom",
    name: "こだわり派",
    description: "利用先と金額まで自分で設定したい",
    badge: "詳細条件を入力",
    icon: "EDIT",
  },
] as const;

const categories = prototypeCategories.map((category) => category.label);

type Category = PrototypeCategoryLabel;
type ProfileId = (typeof profiles)[number]["id"];
type SpendPeriod = "monthly" | "annual";
type View = "search" | "results" | "compare";
type SaveState = "idle" | "saving" | "saved" | "failed";

const yen = new Intl.NumberFormat("ja-JP");
const summaryMaxLength = 50;

const categoryMarks = prototypeCategoryMarkByLabel;
const categoryIdByLabel = prototypeCategoryIdByLabel;

export default function SearchPrototype({
  initialScenario,
  initialView,
  initialCompareIds,
  initialFromHistory,
}: {
  initialScenario: PrototypeSearchScenario | null;
  initialView: "results" | "compare";
  initialCompareIds: PrototypeCardId[];
  initialFromHistory: boolean;
}) {
  const initialCategories: Category[] = initialScenario
    ? categories.filter(
        (category) =>
          (initialScenario.usageByCategory[categoryIdByLabel[category]] ?? 0) > 0,
      )
    : ["コンビニ", "スーパー"];
  const initialAmounts: Partial<Record<Category, number>> = initialScenario
    ? Object.fromEntries(
        initialCategories.map((category) => [
          category,
          initialScenario.usageByCategory[categoryIdByLabel[category]] ?? 0,
        ]),
      )
    : { コンビニ: 120_000, スーパー: 360_000 };
  const [view, setView] = useState<View>(initialScenario ? initialView : "search");
  const [annualSpend, setAnnualSpend] = useState<number | null>(
    initialScenario?.annualSpend ?? null,
  );
  const [mainSpendPeriod, setMainSpendPeriod] = useState<SpendPeriod>("annual");
  const [selectedSpendId, setSelectedSpendId] = useState<string | null>(null);
  const [customSpendMan, setCustomSpendMan] = useState("");
  const [profile, setProfile] = useState<ProfileId | null>(
    initialScenario?.profileId ?? null,
  );
  const [spendPeriod, setSpendPeriod] = useState<SpendPeriod>("monthly");
  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(initialCategories);
  const [amounts, setAmounts] =
    useState<Partial<Record<Category, number>>>(initialAmounts);
  const [services, setServices] = useState<
    Partial<Record<Category, "best" | "featured" | "other">>
  >(
    initialScenario
      ? Object.fromEntries(
          initialCategories.map((category) => [
            category,
            initialScenario.serviceByCategory?.[categoryIdByLabel[category]] ?? "best",
          ]),
        )
      : {},
  );
  const [freeFeeOnly, setFreeFeeOnly] = useState(false);
  const [compareIds, setCompareIds] = useState<PrototypeCardId[]>(initialCompareIds);
  const [compareLimitMessage, setCompareLimitMessage] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveSummary, setSaveSummary] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedSummary, setSavedSummary] = useState("");
  const [failNextSave, setFailNextSave] = useState(false);
  const saveTriggerRef = useRef<HTMLButtonElement>(null);
  const saveInputRef = useRef<HTMLInputElement>(null);
  const resultsTitleRef = useRef<HTMLHeadingElement>(null);
  const focusResultsAfterTransitionRef = useRef(false);

  useEffect(() => {
    if (saveDialogOpen) saveInputRef.current?.focus();
  }, [saveDialogOpen]);

  useEffect(() => {
    document.title =
      view === "compare"
        ? "選んだカードを比較｜カードみっけ"
        : view === "results"
          ? "カード検索結果｜カードみっけ"
          : "条件からカードを探す｜カードみっけ";
  }, [view]);

  useEffect(() => {
    if (view !== "results" || !focusResultsAfterTransitionRef.current) return;
    focusResultsAfterTransitionRef.current = false;
    resultsTitleRef.current?.focus({ preventScroll: true });
  }, [view]);

  const showResultsAndFocus = () => {
    focusResultsAfterTransitionRef.current = true;
    setView("results");
  };

  const detailedAnnualSpend = annualSpend ?? 0;
  const periodMultiplier = spendPeriod === "monthly" ? 12 : 1;
  const allocated = useMemo(
    () => Object.values(amounts).reduce((total, value) => total + (value ?? 0), 0),
    [amounts],
  );
  const invalid = allocated > detailedAnnualSpend;
  const usesComparisonDensityFixtures = initialCompareIds.some(
    (id) => !featuredCards.some((card) => card.id === id),
  );

  const currentScenario = useMemo<PrototypeSearchScenario | null>(() => {
    if (!annualSpend) return null;
    return {
      annualSpend,
      profileId: profile ?? undefined,
      usageByCategory: Object.fromEntries(
        selectedCategories.map((category) => [
          categoryIdByLabel[category],
          amounts[category] ?? 0,
        ]),
      ),
      serviceByCategory: Object.fromEntries(
        selectedCategories.map((category) => [
          categoryIdByLabel[category],
          services[category] ?? "best",
        ]),
      ),
      source: "search",
    };
  }, [amounts, annualSpend, profile, selectedCategories, services]);

  const rankedCards = useMemo(() => {
    return [...(usesComparisonDensityFixtures ? prototypeSearchCards : featuredCards)]
      .filter((card) => !freeFeeOnly || card.annualFeeLabel.includes("無料"))
      .toSorted((a, b) => {
        if (!currentScenario) return 0;
        const aValue = calculatePrototypeCard(
          redesignedCardDetails[a.id],
          currentScenario,
        ).regularNetYen;
        const bValue = calculatePrototypeCard(
          redesignedCardDetails[b.id],
          currentScenario,
        ).regularNetYen;
        return bValue - aValue;
      });
  }, [currentScenario, freeFeeOnly, usesComparisonDensityFixtures]);

  const selectedProfile = profiles.find((item) => item.id === profile);
  const comparedCards = useMemo(
    () => buildPrototypeComparisonCards(compareIds, currentScenario),
    [compareIds, currentScenario],
  );

  function selectSpend(id: string, value: number) {
    setSelectedSpendId(id);
    setCustomSpendMan("");
    setAnnualSpend(mainSpendPeriod === "monthly" ? value * 12 : value);
  }

  function changeMainSpendPeriod(period: SpendPeriod) {
    setMainSpendPeriod(period);
    setSelectedSpendId(null);
    setCustomSpendMan("");
    setAnnualSpend(null);
  }

  function updateCustomSpend(value: string) {
    setSelectedSpendId("custom");
    setCustomSpendMan(value);
    const amount = Number(value) * 10_000;
    setAnnualSpend(
      value === "" ? null : mainSpendPeriod === "monthly" ? amount * 12 : amount,
    );
  }

  function toggleCategory(category: Category) {
    const isSelected = selectedCategories.includes(category);
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
    if (isSelected) {
      setAmounts((current) => ({ ...current, [category]: 0 }));
      setServices((current) => {
        const next = { ...current };
        delete next[category];
        return next;
      });
    } else {
      setServices((current) => ({ ...current, [category]: "best" }));
    }
  }

  function toggleCompare(id: PrototypeCardId) {
    setCompareIds((current) => {
      if (current.includes(id)) {
        setCompareLimitMessage("");
        return current.filter((item) => item !== id);
      }
      if (current.length >= 5) {
        setCompareLimitMessage(
          "比較できるのは最大5枚です。選択中のカードを1枚外してから追加してください。",
        );
        return current;
      }
      setCompareLimitMessage("");
      return [...current, id];
    });
  }

  function showResults() {
    setFreeFeeOnly(false);
    setCompareIds([]);
    setView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function returnToSearch() {
    setView("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSaveDialog() {
    setSaveError("");
    setSaveState("idle");
    setSaveDialogOpen(true);
  }

  function closeSaveDialog() {
    if (saveState === "saving") return;
    setSaveDialogOpen(false);
    window.setTimeout(() => saveTriggerRef.current?.focus(), 0);
  }

  function saveSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedSummary = saveSummary.trim();
    if (!normalizedSummary) {
      setSaveError("概要を入力してください。空白だけでは保存できません。");
      saveInputRef.current?.focus();
      return;
    }
    if (saveSummary.length > summaryMaxLength) {
      setSaveError(`概要は${summaryMaxLength}文字以内で入力してください。`);
      saveInputRef.current?.focus();
      return;
    }

    setSaveError("");
    setSaveState("saving");
    window.setTimeout(() => {
      if (failNextSave) {
        setFailNextSave(false);
        setSaveState("failed");
        setSaveError(
          "UIモックの保存に失敗しました。入力内容を保持しているため、もう一度保存できます。",
        );
        saveInputRef.current?.focus();
        return;
      }
      setSavedSummary(normalizedSummary);
      setSaveState("saved");
      setSaveDialogOpen(false);
      window.setTimeout(() => saveTriggerRef.current?.focus(), 0);
    }, 450);
  }

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#search-main">
        本文へ移動
      </a>

      <SiteHeader currentPage="search" />

      <main id="search-main">
        {initialFromHistory && view !== "search" && (
          <div className={styles.historyLaunchNotice} role="status">
            <span aria-hidden="true">履</span>
            <div>
              <strong>履歴の条件を現在のカード情報で再計算しています</strong>
              <p>
                ここに表示する金額は当時の合成記録ではなく、現在のUIモック情報による結果です。
              </p>
            </div>
          </div>
        )}
        {view === "search" && (
          <>
            <section className={styles.hero} aria-labelledby="hero-title">
              <div className={styles.heroInner}>
                <div className={styles.heroVisual} aria-hidden="true">
                  <span className={styles.sparkleOne}>✦</span>
                  <span className={styles.sparkleTwo}>✦</span>
                  <div className={styles.floatingCardBack}>
                    <span />
                  </div>
                  <div className={styles.floatingCardFront}>
                    <span className={styles.cardChip} />
                    <strong>CARD</strong>
                    <small>GOOD MATCH</small>
                  </div>
                  <div className={styles.matchSeal}>
                    <strong>BEST</strong>
                    <span>MATCH!</span>
                  </div>
                </div>

                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>
                    むずかしいカード選びを、もっと楽しく！
                  </p>
                  <h1 id="hero-title">
                    いつもの使い方で
                    <span>どれがおトク？</span>
                  </h1>
                  <p className={styles.heroDescription}>
                    年間利用額とあなたのタイプを選ぶだけ。
                    <br />
                    ぴったりのカードを、わかりやすく比べられます。
                  </p>
                  <ul className={styles.heroBenefits}>
                    <li>
                      <span>✓</span>登録なしで比較OK
                    </li>
                    <li>
                      <span>★</span>最大5枚を比較
                    </li>
                    <li>
                      <span>◷</span>最短30秒
                    </li>
                  </ul>
                </div>

                <aside className={styles.howTo} id="how-to" aria-label="検索の流れ">
                  <div className={styles.howToTitle}>
                    <small>たったの</small>
                    <strong>2</strong>
                    <span>STEP</span>
                  </div>
                  <ol>
                    <li>
                      <span>1</span>
                      <strong>年間利用額を選ぶ</strong>
                    </li>
                    <li>
                      <span>2</span>
                      <strong>あなたのタイプを選ぶ</strong>
                    </li>
                    <li className={styles.howToGoal}>
                      <span>✓</span>
                      <strong>おすすめをチェック！</strong>
                    </li>
                  </ol>
                </aside>
              </div>
            </section>

            <section
              className={styles.searchShell}
              id="search-panel"
              aria-label="カード検索"
            >
              <div className={styles.quickPanel}>
                <section className={styles.questionBlock} aria-labelledby="spend-title">
                  <div className={styles.spendHeaderRow}>
                    <div className={styles.questionHeader}>
                      <p>
                        <span>まずはココ！</span>条件からカードを探す
                      </p>
                      <h2 id="spend-title">
                        <span>Q1</span>
                        {mainSpendPeriod === "monthly" ? "月間" : "年間"}
                        いくらくらい使いますか？
                      </h2>
                    </div>
                    <fieldset
                      className={`${styles.periodSwitch} ${styles.mainPeriodSwitch}`}
                    >
                      <legend>利用額の期間</legend>
                      {(["monthly", "annual"] as const).map((period) => (
                        <button
                          type="button"
                          aria-pressed={mainSpendPeriod === period}
                          onClick={() => changeMainSpendPeriod(period)}
                          key={period}
                        >
                          {period === "monthly" ? "月間" : "年間"}
                        </button>
                      ))}
                    </fieldset>
                  </div>
                  <div className={styles.spendGrid}>
                    {spendOptions.map((option, index) => (
                      <button
                        type="button"
                        className={
                          selectedSpendId === option.id ? styles.choiceSelected : ""
                        }
                        aria-pressed={selectedSpendId === option.id}
                        onClick={() => selectSpend(option.id, option[mainSpendPeriod])}
                        key={option.id}
                      >
                        <span className={styles.spendIcon} data-index={index}>
                          {option.icon}
                        </span>
                        <strong>{option[mainSpendPeriod] / 10_000}万円</strong>
                        {selectedSpendId === option.id && <i aria-hidden="true">✓</i>}
                      </button>
                    ))}
                    <label
                      className={`${styles.customSpendCard} ${
                        selectedSpendId === "custom" ? styles.choiceSelected : ""
                      }`}
                    >
                      <span className={styles.customSpendIcon} aria-hidden="true">
                        FREE
                      </span>
                      <strong>自由入力</strong>
                      <div>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          inputMode="numeric"
                          aria-label={`${mainSpendPeriod === "monthly" ? "月間" : "年間"}利用額を自由入力`}
                          value={customSpendMan}
                          onFocus={() => {
                            setSelectedSpendId("custom");
                            if (customSpendMan === "") setAnnualSpend(null);
                          }}
                          onChange={(event) => updateCustomSpend(event.target.value)}
                        />
                        <span>万円</span>
                      </div>
                      <small>
                        {mainSpendPeriod === "monthly" ? "1か月分" : "1年分"}
                      </small>
                      {selectedSpendId === "custom" && customSpendMan !== "" && (
                        <i aria-hidden="true">✓</i>
                      )}
                    </label>
                  </div>
                </section>

                <section
                  className={`${styles.questionBlock} ${styles.secondQuestion}`}
                  aria-labelledby="profile-title"
                >
                  <div className={styles.questionHeader}>
                    <p>つぎに、使い方を選択</p>
                    <h2 id="profile-title">
                      <span>Q2</span>あなたに近いタイプはどれですか？
                    </h2>
                  </div>
                  <div className={styles.profileGrid}>
                    {profiles.map((item) => (
                      <button
                        type="button"
                        className={profile === item.id ? styles.profileSelected : ""}
                        aria-pressed={profile === item.id}
                        onClick={() => setProfile(item.id)}
                        key={item.id}
                      >
                        <span>{item.icon}</span>
                        <strong>{item.name}</strong>
                        <small>{item.description}</small>
                        <em>{item.badge}</em>
                        {profile === item.id && <i aria-hidden="true">✓</i>}
                      </button>
                    ))}
                  </div>
                </section>

                {profile === "custom" && (
                  <div className={`${styles.detailPanel} ${styles.customDetail}`}>
                    <div className={styles.detailHeading}>
                      <p>
                        <span>DETAIL SEARCH</span>こだわり条件を入力
                      </p>
                      <h2>よく使う場所と金額を教えてください</h2>
                      <small>
                        選択した年間利用額の中で、利用先ごとの内訳を設定できます。
                      </small>
                    </div>

                    <div className={styles.customSummaryRow}>
                      <div className={styles.selectedSpendSummary}>
                        <span>選択中の年間利用額</span>
                        <strong>
                          {annualSpend ? `${yen.format(annualSpend)}円` : "未選択"}
                        </strong>
                      </div>
                    </div>

                    <div className={styles.detailCategories}>
                      <div className={styles.detailSectionTitle}>
                        <span className={styles.detailNumber}>3</span>
                        <div>
                          <strong>よく使う場所と金額</strong>
                          <small>使わない項目は選択しなくてOKです</small>
                        </div>
                        <fieldset className={styles.periodSwitch}>
                          <legend>カテゴリ別金額の入力期間</legend>
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
                      </div>
                      <div className={styles.categoryGrid}>
                        {categories.map((category) => {
                          const selected = selectedCategories.includes(category);
                          return (
                            <div
                              className={selected ? styles.categorySelected : ""}
                              key={category}
                            >
                              <label className={styles.categoryToggle}>
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => toggleCategory(category)}
                                />
                                <span aria-hidden="true">
                                  {categoryMarks[category]}
                                </span>
                                <strong>{category}</strong>
                              </label>
                              {selected && (
                                <div>
                                  <label
                                    className={styles.categoryAmount}
                                    htmlFor={`amount-${category}`}
                                  >
                                    <input
                                      id={`amount-${category}`}
                                      type="number"
                                      min="0"
                                      step="1000"
                                      value={Math.round(
                                        (amounts[category] ?? 0) / periodMultiplier,
                                      )}
                                      onChange={(event) =>
                                        setAmounts((current) => ({
                                          ...current,
                                          [category]:
                                            Number(event.target.value) *
                                            periodMultiplier,
                                        }))
                                      }
                                    />
                                    <span>
                                      円／{spendPeriod === "monthly" ? "月" : "年"}
                                    </span>
                                  </label>
                                  <label className={styles.categoryService}>
                                    <span className={styles.srOnly}>
                                      {category}で使う店舗・サービス
                                    </span>
                                    <select
                                      value={services[category] ?? "best"}
                                      onChange={(event) =>
                                        setServices((current) => ({
                                          ...current,
                                          [category]: event.target.value as
                                            "best" | "featured" | "other",
                                        }))
                                      }
                                    >
                                      <option value="best">カテゴリ内最良条件</option>
                                      <option value="featured">
                                        {featuredServiceLabel(
                                          categoryIdByLabel[category],
                                        )}
                                      </option>
                                      <option value="other">
                                        その他の店舗・サービス
                                      </option>
                                    </select>
                                  </label>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className={invalid ? styles.totalError : styles.totalSummary}
                        role={invalid ? "alert" : undefined}
                      >
                        <div>
                          <span>入力した内訳の年間合計</span>
                          <strong>{yen.format(allocated)}円</strong>
                        </div>
                        <p>
                          {!annualSpend
                            ? "先に年間利用額を選択してください。"
                            : invalid
                              ? `年間利用額を ${yen.format(allocated - detailedAnnualSpend)}円 超えています。`
                              : `残り ${yen.format(detailedAnnualSpend - allocated)}円は、その他の利用として判定します。`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.unifiedActions}>
                  <p>
                    {!annualSpend
                      ? "年間利用額を選択してください"
                      : !profile
                        ? "あなたのタイプを選択してください"
                        : profile === "custom" && invalid
                          ? "内訳の金額を調整してください"
                          : "入力内容をもとに、おすすめを判定します"}
                  </p>
                  <button
                    type="button"
                    className={styles.resultButton}
                    disabled={
                      !annualSpend || !profile || (profile === "custom" && invalid)
                    }
                    onClick={showResults}
                  >
                    おすすめ結果を見る <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.typeGuide} aria-labelledby="type-guide-title">
              <p>✦</p>
              <div>
                <span>かんたん検索なら</span>
                <h2 id="type-guide-title">
                  あなたのタイプに合わせて、比較ポイントを変えます
                </h2>
              </div>
              <ul>
                <li>
                  <span>買</span>
                  <strong>日常使い</strong>
                </li>
                <li>
                  <span>P</span>
                  <strong>ポイント</strong>
                </li>
                <li>
                  <span>旅</span>
                  <strong>旅行・交通</strong>
                </li>
                <li>
                  <span>¥</span>
                  <strong>年会費</strong>
                </li>
              </ul>
            </section>
          </>
        )}

        {view === "results" && (
          <section className={styles.resultsPage} aria-labelledby="results-title">
            <div className={styles.resultsHero}>
              <p>あなたの条件に合わせて判定しました</p>
              <h1 id="results-title" ref={resultsTitleRef} tabIndex={-1}>
                おすすめカードは、この{rankedCards.length}枚！
              </h1>
              <div>
                <span>
                  年間利用額{" "}
                  <strong>{yen.format(annualSpend ?? detailedAnnualSpend)}円</strong>
                </span>
                <span>
                  {profile === "custom"
                    ? `${selectedCategories.length}カテゴリを詳細入力`
                    : (selectedProfile?.badge ?? "かんたん検索")}
                </span>
              </div>
            </div>

            {saveState === "saved" && savedSummary && (
              <div className={styles.saveSuccess} role="status">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>「{savedSummary}」を保存しました</strong>
                  <p>
                    UIモックのBrowser
                    Memory内だけに保存しています。再読み込みすると初期状態へ戻ります。
                  </p>
                </div>
              </div>
            )}

            <div className={styles.resultsToolbar}>
              <p>
                <strong>{rankedCards.length}</strong>件の候補
              </p>
              <label>
                <input
                  type="checkbox"
                  checked={freeFeeOnly}
                  onChange={(event) => setFreeFeeOnly(event.target.checked)}
                />
                年会費無料だけ表示
              </label>
              <button
                ref={saveTriggerRef}
                type="button"
                className={styles.saveSearchButton}
                onClick={openSaveDialog}
              >
                {saveState === "saved" ? "別の概要で保存" : "検索条件を保存"}
              </button>
              <button type="button" onClick={returnToSearch}>
                ← 条件を変更する
              </button>
            </div>

            {compareLimitMessage && (
              <p className={styles.resultNotice} role="alert">
                {compareLimitMessage}
              </p>
            )}
            <div className={styles.resultList} aria-live="polite">
              {rankedCards.map((card, index) => {
                const selected = compareIds.includes(card.id);
                const calculated = currentScenario
                  ? calculatePrototypeCard(
                      redesignedCardDetails[card.id],
                      currentScenario,
                    )
                  : null;
                const detailHref = currentScenario
                  ? withPrototypeScenario(`/cards/${card.id}`, currentScenario)
                  : `/cards/${card.id}`;
                return (
                  <article className={styles.resultCard} key={card.id}>
                    <div className={styles.resultRank}>
                      <small>おすすめ</small>
                      <strong>{index + 1}</strong>
                      <span>位</span>
                    </div>
                    <div
                      className={`${styles.cardMock} ${styles[`card_${card.accent}`]}`}
                      aria-hidden="true"
                    >
                      <span />
                      <small>CARD MIKKE</small>
                      <strong>{card.name}</strong>
                    </div>
                    <div className={styles.resultContent}>
                      <p>{card.label}</p>
                      <h2>{card.name}</h2>
                      <small>{card.issuer}</small>
                      <ul>
                        <li>{card.annualFeeLabel}</li>
                        <li>{card.baseRewardLabel}</li>
                      </ul>
                    </div>
                    <div className={styles.resultValue}>
                      <span>年間のおトク目安</span>
                      <p>
                        <strong>
                          {yen.format(
                            calculated?.regularNetYen ?? card.regularYearValue,
                          )}
                        </strong>
                        円
                      </p>
                      <small>
                        初年度{" "}
                        {yen.format(calculated?.firstYearNetYen ?? card.firstYearValue)}
                        円
                      </small>
                    </div>
                    <div className={styles.resultActions}>
                      <Link href={detailHref} className={styles.cardDetailLink}>
                        詳細を見る <span>→</span>
                      </Link>
                      <Link
                        href={`/favorites?add=${card.id}`}
                        className={styles.favoriteLink}
                      >
                        ☆ 一時お気に入りに追加
                      </Link>
                      <button
                        type="button"
                        className={selected ? styles.compareSelected : ""}
                        onClick={() => toggleCompare(card.id)}
                      >
                        {selected ? "✓ 比較に追加済み" : "+ 比較に追加"}
                      </button>
                      <details>
                        <summary>この判定の理由</summary>
                        <p>{card.reason}</p>
                      </details>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {view === "compare" && (
          <ComparisonView
            cards={comparedCards}
            scenario={currentScenario}
            onBack={showResultsAndFocus}
            onRemove={(id) =>
              setCompareIds((current) => {
                setCompareLimitMessage("");
                return current.filter((item) => item !== id);
              })
            }
            onClear={() => {
              setCompareLimitMessage("");
              setCompareIds([]);
              showResultsAndFocus();
            }}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerBrand}>
          <span aria-hidden="true">C</span>
          <strong>カードみっけ</strong>
        </Link>
        <p>UI-only Mock — 合成Fixtureのみを使用しています。</p>
        <nav aria-label="フッターナビゲーション">
          <Link href="/">トップページ</Link>
          <Link href="/#trust">掲載範囲</Link>
          <Link href="/#trust">広告方針</Link>
          <Link href={correctionReportHref("page", "search")}>誤情報を指摘</Link>
        </nav>
      </footer>

      {view === "results" && compareIds.length > 0 && (
        <div className={styles.compareBar} aria-label="比較候補">
          <div>
            <strong>{compareIds.length}枚</strong>
            <span>選択中（最大5枚）</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCompareLimitMessage("");
              setCompareIds([]);
            }}
          >
            全解除
          </button>
          <button
            type="button"
            disabled={compareIds.length < 2}
            onClick={() => setView("compare")}
          >
            比較する →
          </button>
        </div>
      )}

      {saveDialogOpen && (
        <div className={styles.dialogBackdrop}>
          <section
            className={styles.saveDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-dialog-title"
            aria-describedby="save-dialog-description"
            onKeyDown={(event) => {
              if (event.key === "Escape") closeSaveDialog();
            }}
          >
            <div className={styles.dialogHeading}>
              <span aria-hidden="true">保</span>
              <div>
                <p>SAVE SEARCH</p>
                <h2 id="save-dialog-title">検索条件を保存</h2>
              </div>
            </div>
            <p id="save-dialog-description" className={styles.dialogDescription}>
              後から見つけやすい概要を入力してください。検索条件と現在の合成結果をまとめて保存します。
            </p>
            <form onSubmit={saveSearch} noValidate>
              <label htmlFor="search-summary">
                概要 <span>必須</span>
              </label>
              <input
                ref={saveInputRef}
                id="search-summary"
                type="text"
                value={saveSummary}
                aria-invalid={saveError ? "true" : undefined}
                aria-describedby={saveError ? "save-summary-error" : "summary-count"}
                placeholder="例：日常の買い物用に比較"
                disabled={saveState === "saving"}
                onChange={(event) => {
                  setSaveSummary(event.target.value);
                  if (saveError) setSaveError("");
                  if (saveState === "failed") setSaveState("idle");
                }}
              />
              <div className={styles.summaryMeta}>
                <small>同じ概要でも保存できます（UIモック暫定）。</small>
                <span
                  id="summary-count"
                  className={
                    saveSummary.length > summaryMaxLength ? styles.countError : ""
                  }
                >
                  {saveSummary.length}／{summaryMaxLength}文字
                </span>
              </div>
              {saveError && (
                <p id="save-summary-error" className={styles.saveError} role="alert">
                  {saveError}
                </p>
              )}
              <div className={styles.savePreview} aria-label="保存する内容">
                <div>
                  <span>年間利用額</span>
                  <strong>{yen.format(annualSpend ?? detailedAnnualSpend)}円</strong>
                </div>
                <div>
                  <span>検索条件</span>
                  <strong>
                    {profile === "custom"
                      ? `${selectedCategories.length}カテゴリを詳細入力`
                      : (selectedProfile?.badge ?? "かんたん検索")}
                  </strong>
                </div>
                <div>
                  <span>現在の結果</span>
                  <strong>{rankedCards.length}件</strong>
                </div>
              </div>
              <label className={styles.mockFailureToggle}>
                <input
                  type="checkbox"
                  checked={failNextSave}
                  disabled={saveState === "saving"}
                  onChange={(event) => setFailNextSave(event.target.checked)}
                />
                <span>
                  次の保存を失敗させる <small>UIモック確認用</small>
                </span>
              </label>
              <div className={styles.dialogActions}>
                <button
                  type="button"
                  disabled={saveState === "saving"}
                  onClick={closeSaveDialog}
                >
                  キャンセル
                </button>
                <button type="submit" disabled={saveState === "saving"}>
                  {saveState === "saving"
                    ? "保存中…"
                    : saveState === "failed"
                      ? "もう一度保存"
                      : "この内容で保存"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
