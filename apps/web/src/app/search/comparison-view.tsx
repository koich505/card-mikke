"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  categoryLabel,
  withPrototypeScenario,
} from "@/features/card-detail/prototype-scenario";
import type {
  PrototypeComparisonCard,
  PrototypeComparisonFact,
} from "@/features/search/comparison-prototype";
import type { PrototypeSearchScenario } from "@/types/card-detail-prototype";
import type { PrototypeCardId } from "@/types/ui-prototype";
import styles from "./comparison-view.module.css";

type ComparisonScenario = "default" | "loading" | "partial" | "error";
type ComparisonRow = {
  id: string;
  label: string;
  value: (card: PrototypeComparisonCard) => string;
  emphasis?: boolean;
};

const yen = new Intl.NumberFormat("ja-JP");

const factValue = (fact: PrototypeComparisonFact) =>
  `${fact.label}：${fact.value}\n開示状態：${fact.disclosureLabel}\n確認日：${fact.confirmedOn}\n適用期間：${fact.effectivePeriod}\n根拠：${fact.evidenceLabel}`;

const factListValue = (items: PrototypeComparisonFact[]) =>
  items.map(factValue).join("\n\n");

const timelineValue = (items: PrototypeComparisonFact[]) =>
  items
    .map(
      (fact) =>
        `${fact.label}\n確認日 ${fact.confirmedOn}\n適用期間 ${fact.effectivePeriod}`,
    )
    .join("\n\n");

const comparisonRows: ComparisonRow[] = [
  {
    id: "regular-value",
    label: "通常年の年間正味還元額",
    value: (card) => `${yen.format(card.regularNetYen)}円`,
    emphasis: true,
  },
  {
    id: "first-value",
    label: "初年度の年間正味還元額",
    value: (card) => `${yen.format(card.firstYearNetYen)}円`,
    emphasis: true,
  },
  { id: "annual-fee", label: "年会費", value: (card) => factValue(card.annualFee) },
  {
    id: "base-reward",
    label: "基本還元率",
    value: (card) => factValue(card.baseReward),
  },
  {
    id: "reward-program",
    label: "ポイント",
    value: (card) => factValue(card.rewardProgram),
  },
  {
    id: "category-reward",
    label: "利用先別還元",
    value: (card) => factListValue(card.categoryRewards),
  },
  {
    id: "campaign",
    label: "キャンペーン",
    value: (card) => factListValue(card.campaigns),
  },
  {
    id: "application",
    label: "申込経路・申込条件",
    value: (card) => factListValue(card.applicationRoutes),
  },
  {
    id: "variants",
    label: "国際ブランド・バリエーション",
    value: (card) => factListValue(card.variants),
  },
  {
    id: "family-card",
    label: "家族・追加カード",
    value: (card) => factValue(card.familyCard),
  },
  { id: "etc-card", label: "ETCカード", value: (card) => factValue(card.etcCard) },
  {
    id: "confirmed",
    label: "Claim別の確認日・適用期間",
    value: (card) => timelineValue(card.timeline),
  },
  {
    id: "state",
    label: "情報状態・算定状態",
    value: (card) =>
      `商品情報：${card.informationStateLabel}\n計算結果：${card.calculationStateLabel}`,
  },
];

const partialUnavailable =
  "取得失敗：この項目は再取得できておらず、保持値や推測値を表示していません。";

export default function ComparisonView({
  cards,
  scenario,
  onBack,
  onRemove,
  onClear,
}: {
  cards: PrototypeComparisonCard[];
  scenario: PrototypeSearchScenario | null;
  onBack: () => void;
  onRemove: (id: PrototypeCardId) => void;
  onClear: () => void;
}) {
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [displayScenario, setDisplayScenario] = useState<ComparisonScenario>("default");
  const clearTriggerRef = useRef<HTMLButtonElement>(null);
  const clearDialogRef = useRef<HTMLDialogElement>(null);
  const clearCancelRef = useRef<HTMLButtonElement>(null);
  const clearConfirmRef = useRef<HTMLButtonElement>(null);
  const partialCardId = cards.at(-1)?.id;

  const visibleRows = useMemo(
    () =>
      differencesOnly
        ? comparisonRows.filter(
            (row) =>
              new Set(
                cards.map((card) =>
                  displayScenario === "partial" && card.id === partialCardId
                    ? partialUnavailable
                    : row.value(card),
                ),
              ).size > 1,
          )
        : comparisonRows,
    [cards, differencesOnly, displayScenario, partialCardId],
  );
  const allocated = scenario
    ? Object.values(scenario.usageByCategory).reduce(
        (total, amount) => total + (amount ?? 0),
        0,
      )
    : 0;
  const usageSummary = scenario
    ? Object.entries(scenario.usageByCategory)
        .filter(([, amount]) => (amount ?? 0) > 0)
        .map(
          ([category, amount]) =>
            `${categoryLabel(category as keyof typeof scenario.usageByCategory)} ${yen.format(amount ?? 0)}円`,
        )
    : [];
  const isPartialCard = (card: PrototypeComparisonCard) =>
    displayScenario === "partial" && card.id === partialCardId;
  const valueFor = (row: ComparisonRow, card: PrototypeComparisonCard) =>
    isPartialCard(card) ? partialUnavailable : row.value(card);

  const openClearDialog = () => {
    clearDialogRef.current?.showModal();
    clearCancelRef.current?.focus({ preventScroll: true });
  };
  const closeClearDialog = () => clearDialogRef.current?.close();

  const removeCardAndKeepFocus = (id: PrototypeCardId) => {
    const removedIndex = cards.findIndex((card) => card.id === id);
    const nextCardId = cards[removedIndex + 1]?.id ?? cards[removedIndex - 1]?.id;
    onRemove(id);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const nextButtons = nextCardId
          ? document.querySelectorAll<HTMLButtonElement>(
              `[data-remove-card="${nextCardId}"]`,
            )
          : [];
        const nextVisibleButton = Array.from(nextButtons).find(
          (button) => button.getClientRects().length > 0,
        );
        const fallback = document.querySelector<HTMLButtonElement>(
          '[data-comparison-focus-fallback="true"]',
        );
        (nextVisibleButton ?? fallback)?.focus({ preventScroll: true });
      });
    });
  };

  if (cards.length < 2) {
    return (
      <section className={styles.page} aria-labelledby="compare-title">
        <p className={styles.eyebrow}>選んだカードを同じ条件で比較</p>
        <h1 id="compare-title">比較するカードをもう1枚選んでください</h1>
        <div className={styles.insufficient} role="status">
          <strong>現在の比較候補は{cards.length}枚です</strong>
          <p>同じ条件で違いを確認するには、2枚以上を選択してください。</p>
          <button type="button" data-comparison-focus-fallback="true" onClick={onBack}>
            検索結果でカードを選ぶ
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page} aria-labelledby="compare-title">
      <div className={styles.headingRow}>
        <div>
          <p className={styles.eyebrow}>選んだカードを同じ条件で比較</p>
          <h1 id="compare-title">カードの違いをチェック</h1>
          <p className={styles.lead}>
            金額だけでなく、算定状態、条件、確認日まで揃えて比較します。
          </p>
        </div>
        <button type="button" className={styles.backButton} onClick={onBack}>
          ← 検索結果へ戻る
        </button>
      </div>

      <section className={styles.conditions} aria-labelledby="condition-title">
        <div>
          <p>今回の共通条件</p>
          <h2 id="condition-title">
            年間利用額 {yen.format(scenario?.annualSpend ?? 0)}円
          </h2>
        </div>
        <ul>
          {usageSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {scenario && scenario.annualSpend > allocated && (
            <li>その他の利用 {yen.format(scenario.annualSpend - allocated)}円</li>
          )}
          {!scenario && <li>各カードの合成初期条件を使用</li>}
        </ul>
        <p>
          金額は入力条件と表示中の仮定に基づくUIモックの概算で、将来の還元を保証しません。
        </p>
      </section>

      <div className={styles.toolbar}>
        <label>
          <input
            type="checkbox"
            checked={differencesOnly}
            onChange={(event) => setDifferencesOnly(event.target.checked)}
          />
          違いがある項目だけ表示
        </label>
        <span>{cards.length}枚を比較中（最大5枚）</span>
        <button type="button" onClick={onBack}>
          カードを入れ替える
        </button>
        <button ref={clearTriggerRef} type="button" onClick={openClearDialog}>
          すべて解除
        </button>
      </div>

      <details className={styles.scenarioControl}>
        <summary>UIモックの状態を確認</summary>
        <div role="group" aria-label="比較画面の表示状態">
          {(
            [
              ["default", "通常"],
              ["loading", "読み込み中"],
              ["partial", "一部取得失敗"],
              ["error", "全面取得失敗"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={displayScenario === value}
              onClick={() => setDisplayScenario(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </details>

      {displayScenario === "loading" ? (
        <div className={styles.loading} aria-busy="true" aria-live="polite">
          <strong>比較情報を読み込んでいます</strong>
          <span />
          <span />
          <span />
        </div>
      ) : displayScenario === "error" ? (
        <div className={styles.partialNotice} role="alert">
          <div>
            <strong>比較情報を取得できませんでした</strong>
            <p>表示できる保持値はありません。通信状態を確認して再試行してください。</p>
          </div>
          <button type="button" onClick={() => setDisplayScenario("default")}>
            再試行
          </button>
        </div>
      ) : (
        <>
          {displayScenario === "partial" && (
            <div className={styles.partialNotice} role="alert">
              <div>
                <strong>一部の情報を取得できませんでした</strong>
                <p>
                  {cards.at(-1)?.name}
                  の金額、比較項目、算定内訳、Evidenceを取得できませんでした。ほかのカードの取得済み情報だけを表示しています。
                </p>
              </div>
              <button type="button" onClick={() => setDisplayScenario("default")}>
                再試行
              </button>
            </div>
          )}

          <div
            className={styles.desktopTable}
            data-testid="desktop-comparison-scroll"
            tabIndex={0}
          >
            <table>
              <caption className={styles.srOnly}>選択したカードの比較表</caption>
              <thead>
                <tr>
                  <th scope="col">比較項目</th>
                  {cards.map((card) => (
                    <th scope="col" key={card.id}>
                      <CardHeading
                        card={card}
                        scenario={scenario}
                        partial={isPartialCard(card)}
                        onRemove={removeCardAndKeepFocus}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    {cards.map((card) => (
                      <td
                        key={card.id}
                        className={row.emphasis ? styles.emphasis : undefined}
                      >
                        {valueFor(row, card)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.mobileComparison}>
            <div className={styles.mobileCards} aria-label="比較中のカード">
              {cards.map((card) => (
                <CardHeading
                  key={card.id}
                  card={card}
                  scenario={scenario}
                  partial={isPartialCard(card)}
                  onRemove={removeCardAndKeepFocus}
                />
              ))}
            </div>
            {visibleRows.map((row) => (
              <section key={row.id} className={styles.mobileRow}>
                <h2>{row.label}</h2>
                {cards.map((card) => (
                  <div key={card.id}>
                    <strong>{card.name}</strong>
                    <p className={row.emphasis ? styles.emphasis : undefined}>
                      {valueFor(row, card)}
                    </p>
                  </div>
                ))}
              </section>
            ))}
          </div>

          {differencesOnly && visibleRows.length === comparisonRows.length && (
            <p className={styles.noDifferences} role="status">
              現在の比較では、すべての項目に違いがあります。
            </p>
          )}
          {visibleRows.length === 0 && (
            <p className={styles.noDifferences} role="status">
              現在の比較項目に違いはありません。「違いがある項目だけ表示」を解除すると全項目を確認できます。
            </p>
          )}

          <section className={styles.detailGrid} aria-labelledby="detail-title">
            <div className={styles.detailHeading}>
              <p>DETAILS &amp; EVIDENCE</p>
              <h2 id="detail-title">算定内訳と根拠</h2>
            </div>
            {cards.map((card) => (
              <article key={card.id}>
                <h3>{card.name}</h3>
                {isPartialCard(card) ? (
                  <p className={styles.unavailable} role="status">
                    金額、内訳、対象外項目、Evidenceは取得失敗のため表示していません。再試行してください。
                  </p>
                ) : (
                  <>
                    <p
                      className={styles.stateNotice}
                      data-state={card.calculationState}
                    >
                      {card.calculationStateLabel}
                    </p>
                    <ul className={styles.alwaysNotices}>
                      {card.riskNotices.map((notice) => (
                        <li key={notice}>{notice}</li>
                      ))}
                      {card.cautions.map((caution) => (
                        <li key={caution}>{caution}</li>
                      ))}
                    </ul>
                    <details>
                      <summary>通常年・初年度の算定内訳</summary>
                      <CalculationRows
                        title="通常年"
                        rows={card.calculation.regularRows}
                      />
                      <CalculationRows
                        title="初年度"
                        rows={card.calculation.firstYearRows}
                      />
                    </details>
                    <details>
                      <summary>対象外項目と計算上の仮定</summary>
                      <h4>算定対象外・未確認</h4>
                      <ul>
                        {card.calculation.excluded.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <h4>共通の仮定</h4>
                      <ul>
                        {card.calculation.assumptions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </details>
                    <details>
                      <summary>ClaimとEvidenceの対応</summary>
                      <ul>
                        {card.timeline.map((item) => (
                          <li key={item.evidenceId}>
                            <strong>
                              {item.label} — {item.disclosureLabel}
                            </strong>
                            <span>
                              {item.evidenceLabel}／確認日 {item.confirmedOn}／適用期間{" "}
                              {item.effectivePeriod}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                    <details>
                      <summary>Evidence Source詳細</summary>
                      <ul>
                        {card.evidence.map((item) => (
                          <li key={item.id}>
                            <strong>{item.label}</strong>
                            <span>{item.value}</span>
                            <span>{item.note}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </>
                )}
              </article>
            ))}
          </section>
        </>
      )}

      <dialog
        ref={clearDialogRef}
        className={styles.dialog}
        aria-labelledby="clear-dialog-title"
        aria-describedby="clear-dialog-description"
        onCancel={(event) => {
          event.preventDefault();
          closeClearDialog();
        }}
        onClose={() => {
          clearTriggerRef.current?.focus({ preventScroll: true });
        }}
      >
        <h2 id="clear-dialog-title">比較候補をすべて解除しますか？</h2>
        <p id="clear-dialog-description">
          入力した検索条件は保持されます。検索結果からもう一度カードを選択できます。
        </p>
        <div>
          <button
            ref={clearCancelRef}
            type="button"
            onClick={closeClearDialog}
            onKeyDown={(event) => {
              if (event.key !== "Tab" || !event.shiftKey) return;
              event.preventDefault();
              clearConfirmRef.current?.focus({ preventScroll: true });
            }}
          >
            キャンセル
          </button>
          <button
            ref={clearConfirmRef}
            type="button"
            onKeyDown={(event) => {
              if (event.key !== "Tab" || event.shiftKey) return;
              event.preventDefault();
              clearCancelRef.current?.focus({ preventScroll: true });
            }}
            onClick={() => {
              clearDialogRef.current?.close();
              onClear();
            }}
          >
            すべて解除
          </button>
        </div>
      </dialog>
    </section>
  );
}

function CardHeading({
  card,
  scenario,
  partial,
  onRemove,
}: {
  card: PrototypeComparisonCard;
  scenario: PrototypeSearchScenario | null;
  partial: boolean;
  onRemove: (id: PrototypeCardId) => void;
}) {
  const detailHref = scenario
    ? withPrototypeScenario(`/cards/${card.id}`, scenario)
    : `/cards/${card.id}`;
  return (
    <div className={styles.cardHeading} data-accent={card.accent}>
      <div className={styles.cardFace} aria-hidden="true">
        <span />
        <small>CARD MIKKE</small>
      </div>
      <strong>{card.name}</strong>
      <small>{card.issuer}</small>
      <p className={styles.headerValue}>
        <span>通常年の年間正味還元額</span>
        <strong>{partial ? "取得失敗" : `${yen.format(card.regularNetYen)}円`}</strong>
      </p>
      <p className={styles.stateNotice} data-state={card.informationState}>
        商品情報：{partial ? "取得失敗" : card.informationStateLabel}
      </p>
      <p className={styles.stateNotice} data-state={card.calculationState}>
        計算結果：{partial ? "取得失敗" : card.calculationStateLabel}
      </p>
      {!partial && card.calculationState === "incomplete" && (
        <p className={styles.compactRisk}>
          確認できた要素のみの金額です。過小評価・順位変動の可能性があります。
        </p>
      )}
      <div>
        <Link href={detailHref}>詳細を見る</Link>
        <button
          type="button"
          aria-label={`${card.name}を比較から外す`}
          data-remove-card={card.id}
          onClick={() => onRemove(card.id)}
        >
          比較から外す
        </button>
      </div>
    </div>
  );
}

function CalculationRows({
  title,
  rows,
}: {
  title: string;
  rows: PrototypeComparisonCard["calculation"]["regularRows"];
}) {
  return (
    <div className={styles.calculationRows}>
      <h4>{title}</h4>
      <ul>
        {rows.map((row) => (
          <li key={`${title}-${row.id}`}>
            <span>{row.label}</span>
            <strong>
              {row.operation === "minus" ? "−" : "＋"}
              {yen.format(row.amountYen)}円
            </strong>
            <small>{row.note}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
