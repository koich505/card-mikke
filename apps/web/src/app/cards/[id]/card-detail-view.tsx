"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import {
  calculatePrototypeCard,
  categoryLabel,
  prototypeCategories,
} from "@/features/card-detail/prototype-scenario";
import type {
  PrototypeCardCalculation,
  PrototypeCardDetailViewModel,
  PrototypeCategoryId,
  PrototypeSearchScenario,
} from "@/types/card-detail-prototype";
import AffiliateButton from "./affiliate-button";
import styles from "./card-detail.module.css";

type Props = {
  detail: PrototypeCardDetailViewModel;
  scenario: PrototypeSearchScenario;
  calculation: PrototypeCardCalculation;
  searchHref: string;
  relatedCards: Array<{ id: string; name: string; href: string }>;
};

const yen = new Intl.NumberFormat("ja-JP");

const disclosureLabel = {
  disclosed: "合成条件を確認済み",
  partially_disclosed: "一部確認できず",
  undisclosed: "非公開",
  unknown: "確認できず",
} as const;

const disclosureIcon = {
  disclosed: "✓",
  partially_disclosed: "!",
  undisclosed: "🔒",
  unknown: "?",
} as const;

const detailTabs = [
  { id: "value", label: "おトク試算" },
  { id: "rewards", label: "ポイント" },
  { id: "campaigns", label: "Campaign" },
  { id: "fees", label: "費用・追加カード" },
  { id: "benefits", label: "特典・保険" },
  { id: "application", label: "申込・仕様" },
  { id: "reviews", label: "レビュー" },
  { id: "evidence", label: "情報の根拠" },
] as const;

type DetailTabId = (typeof detailTabs)[number]["id"];
type SpendPeriod = "annual" | "monthly";

const profileLabel = {
  everyday: "コツコツ派",
  points: "ポイント派",
  travel: "おでかけ派",
  simple: "シンプル派",
  shopping: "お買い物派",
  custom: "こだわり派",
} as const;

const clampYen = (value: number) =>
  Number.isFinite(value) ? Math.min(Math.max(Math.round(value), 0), 100_000_000) : 0;

function StatusBadge({ status }: { status: keyof typeof disclosureLabel }) {
  return (
    <span
      className={styles.statusBadge}
      data-status={status}
      role="img"
      aria-label={disclosureLabel[status]}
      title={disclosureLabel[status]}
    >
      <span aria-hidden="true">{disclosureIcon[status]}</span>
    </span>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span>{number}</span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        <small>{description}</small>
      </div>
    </div>
  );
}

function DefinitionGrid({
  items,
}: {
  items: Array<{ label: string; value: React.ReactNode }>;
}) {
  return (
    <dl className={styles.definitionGrid}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`5点満点中${rating}点`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span data-active={index < Math.round(rating)} aria-hidden="true" key={index}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function CardDetailView({
  detail,
  scenario,
  calculation,
  searchHref,
  relatedCards,
}: Props) {
  const [faceIndex, setFaceIndex] = useState(0);
  /**
   * @ui-intent Heroでも複数Campaignを確認できるよう、横スライドで1件ずつ表示する。
   * @invariant 自動再生せず、前後Button、Indicator、左右Swipeで選択できること。
   * Campaign Tabの全件一覧は条件比較用として別途維持する。
   */
  const [campaignIndex, setCampaignIndex] = useState(0);
  const campaignPointerStartX = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState<DetailTabId>("value");
  /**
   * @ui-intent Searchと詳細で試算ロジックを分岐させず、同じScenarioと
   * calculatePrototypeCardを使って再計算する。
   * @invariant 月間入力は年額へ換算して保持し、利用先合計が総利用額を
   * 超える条件は適用しない。UI-onlyのため保存・外部送信は行わない。
   */
  const [activeScenario, setActiveScenario] =
    useState<PrototypeSearchScenario>(scenario);
  const [isScenarioEditorOpen, setIsScenarioEditorOpen] = useState(false);
  const [draftPeriod, setDraftPeriod] = useState<SpendPeriod>("annual");
  const [draftAnnualSpend, setDraftAnnualSpend] = useState(scenario.annualSpend);
  const [draftUsage, setDraftUsage] = useState<
    Partial<Record<PrototypeCategoryId, number>>
  >(scenario.usageByCategory);
  const [reviewMessage, setReviewMessage] = useState("");
  const galleryId = useId();
  const face = detail.cardFaces[faceIndex];
  const mainFee = detail.feeRules.find((item) => item.target === "本会員");
  const baseRule = detail.rewardRules.find((item) => item.kind === "base");
  const baseProgram = detail.rewardPrograms.find(
    (item) => item.role === "基本で貯まる",
  );
  const activeCampaign = detail.campaigns[campaignIndex];
  const primaryRoute = detail.applicationRoutes.find(
    (route) => route.type === "一般申込" && route.status === "受付中",
  );
  const activeCalculation = useMemo(
    () =>
      activeScenario === scenario
        ? calculation
        : calculatePrototypeCard(detail, activeScenario),
    [activeScenario, calculation, detail, scenario],
  );
  const scenarioUsage = Object.entries(activeScenario.usageByCategory).filter(
    ([, value]) => Boolean(value),
  );
  const draftAllocated = Object.values(draftUsage).reduce(
    (total, amount) => total + (amount ?? 0),
    0,
  );
  const scenarioInvalid = draftAnnualSpend <= 0 || draftAllocated > draftAnnualSpend;

  function selectAdjacentFace(direction: -1 | 1) {
    setFaceIndex(
      (current) =>
        (current + direction + detail.cardFaces.length) % detail.cardFaces.length,
    );
  }

  function selectAdjacentCampaign(direction: -1 | 1) {
    setCampaignIndex(
      (current) =>
        (current + direction + detail.campaigns.length) % detail.campaigns.length,
    );
  }

  function applyCustomScenario() {
    if (scenarioInvalid) return;
    setActiveScenario({
      annualSpend: draftAnnualSpend,
      profileId: activeScenario.profileId,
      usageByCategory: draftUsage,
      source: "custom",
    });
    setIsScenarioEditorOpen(false);
  }

  function resetScenario() {
    setActiveScenario(scenario);
    setDraftAnnualSpend(scenario.annualSpend);
    setDraftUsage(scenario.usageByCategory);
    setDraftPeriod("annual");
    setIsScenarioEditorOpen(false);
  }

  return (
    <>
      <section className={styles.hero} aria-labelledby="card-title">
        <div className={styles.heroFlagRow}>
          <p>{detail.eyebrow}</p>
          <div className={styles.freshness} data-state={detail.state}>
            <strong role="img" aria-label={detail.stateLabel} title={detail.stateLabel}>
              <span aria-hidden="true">
                {detail.state === "complete"
                  ? "✓"
                  : detail.state === "under_review"
                    ? "!"
                    : "?"}
              </span>
            </strong>
            <span>
              最終確認 <time dateTime={detail.confirmedOn}>{detail.confirmedOn}</time>
            </span>
          </div>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.gallery} aria-labelledby={`${galleryId}-title`}>
            <div className={styles.galleryTitle}>
              <div>
                <span>DESIGN</span>
                <h2 id={`${galleryId}-title`}>選べる券面</h2>
              </div>
              <p aria-live="polite">
                {faceIndex + 1} / {detail.cardFaces.length}
              </p>
            </div>

            <div className={styles.cardStage}>
              <div
                className={styles.cardFace}
                data-tone={face.tone}
                data-motif={face.motif}
                role="img"
                aria-label={face.alt}
              >
                <div className={styles.cardFaceTop}>
                  <small>CARD MIKKE</small>
                  <span aria-hidden="true">)))</span>
                </div>
                <i className={styles.cardChip} aria-hidden="true" />
                <div className={styles.cardFaceBottom}>
                  <strong>{detail.name}</strong>
                  <small>{face.name}</small>
                </div>
              </div>
              <button
                type="button"
                className={styles.galleryPrevious}
                onClick={() => selectAdjacentFace(-1)}
                aria-label="前の券面を見る"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.galleryNext}
                onClick={() => selectAdjacentFace(1)}
                aria-label="次の券面を見る"
              >
                →
              </button>
            </div>

            <div className={styles.faceThumbnails} aria-label="券面を選択">
              {detail.cardFaces.map((item, index) => (
                <button
                  type="button"
                  data-selected={index === faceIndex}
                  aria-pressed={index === faceIndex}
                  onClick={() => setFaceIndex(index)}
                  key={item.id}
                >
                  <span data-tone={item.tone} data-motif={item.motif} />
                  <small>{item.name}</small>
                </button>
              ))}
            </div>

            <div className={styles.faceDetails}>
              <div>
                <span>表示中</span>
                <strong>{face.name}</strong>
                <em>{face.material}</em>
              </div>
              <DefinitionGrid
                items={[
                  { label: "国際ブランド", value: face.brand },
                  { label: "グレード", value: face.grade },
                  { label: "選択可否", value: face.availability },
                  { label: "追加料金", value: face.additionalFee },
                ]}
              />
              <details>
                <summary>変更・再発行条件も確認</summary>
                <p>{face.changeRule}</p>
                <p>適用期間：{face.effectivePeriod}</p>
              </details>
              <small>
                CSSで作成した合成券面です。実在するカード画像ではありません。
              </small>
            </div>
          </div>

          <div className={styles.heroContent}>
            <p className={styles.issuer}>{detail.issuer}</p>
            <h1 id="card-title">{detail.name}</h1>
            <h2>{detail.catchCopy}</h2>
            <p className={styles.summary}>{detail.summary}</p>

            <ul className={styles.quickFacts}>
              <li>
                <span>年会費</span>
                <strong>{mainFee?.displayValue ?? "確認できず"}</strong>
                <small>{mainFee?.freeCondition}</small>
              </li>
              <li>
                <span>基本還元</span>
                <strong>{baseRule?.displayRate ?? "確認できず"}</strong>
                <small>{baseProgram?.name ?? "ポイント名を確認できず"}</small>
              </li>
              <li>
                <span>申込</span>
                <strong>{detail.applicationStatus}</strong>
                <small>{primaryRoute?.issueTime ?? "発行目安を確認できず"}</small>
              </li>
            </ul>

            {activeCampaign ? (
              <div
                className={styles.campaignCarousel}
                role="region"
                aria-label="開催中のキャンペーン"
                aria-roledescription="カルーセル"
              >
                <div className={styles.campaignCarouselHeader}>
                  <span>開催中のキャンペーン</span>
                  {detail.campaigns.length > 1 && (
                    <span aria-live="polite">
                      {campaignIndex + 1} / {detail.campaigns.length}
                    </span>
                  )}
                </div>

                <div
                  className={styles.campaignCarouselViewport}
                  onPointerDown={(event) => {
                    campaignPointerStartX.current = event.clientX;
                  }}
                  onPointerUp={(event) => {
                    const startX = campaignPointerStartX.current;
                    campaignPointerStartX.current = null;
                    if (startX === null || detail.campaigns.length < 2) return;
                    const distance = event.clientX - startX;
                    if (Math.abs(distance) < 40) return;
                    selectAdjacentCampaign(distance < 0 ? 1 : -1);
                  }}
                  onPointerCancel={() => {
                    campaignPointerStartX.current = null;
                  }}
                >
                  <div
                    className={styles.campaignCarouselTrack}
                    style={{ transform: `translateX(-${campaignIndex * 100}%)` }}
                  >
                    {detail.campaigns.map((campaign, index) => (
                      <article
                        className={styles.campaignSpotlight}
                        aria-hidden={index !== campaignIndex}
                        key={campaign.id}
                      >
                        <span>{campaign.status}</span>
                        <strong>{campaign.title}</strong>
                        <p>{campaign.effects.map((item) => item.reward).join("＋")}</p>
                        <small>
                          {campaign.effects.map((item) => item.certainty).join("／")}・
                          {campaign.qualifyingPeriod}
                        </small>
                      </article>
                    ))}
                  </div>
                </div>

                {detail.campaigns.length > 1 && (
                  <div className={styles.campaignCarouselControls}>
                    <button
                      type="button"
                      onClick={() => selectAdjacentCampaign(-1)}
                      aria-label="前のキャンペーンを見る"
                    >
                      ←
                    </button>
                    <div aria-label="キャンペーンを選択">
                      {detail.campaigns.map((campaign, index) => (
                        <button
                          type="button"
                          aria-label={`${campaign.title}を表示`}
                          aria-pressed={index === campaignIndex}
                          onClick={() => setCampaignIndex(index)}
                          key={campaign.id}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => selectAdjacentCampaign(1)}
                      aria-label="次のキャンペーンを見る"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.campaignSpotlight} data-empty="true">
                <span>現在の入会特典</span>
                <strong>確認できるCampaignはありません</strong>
                <small>特典がないと確定した意味ではありません。</small>
              </div>
            )}

            <div className={styles.heroValue}>
              <div>
                <span>
                  {activeScenario.source === "search"
                    ? "あなたの通常年"
                    : activeScenario.source === "custom"
                      ? "カスタム試算・通常年"
                      : "標準試算例・通常年"}
                </span>
                <strong>{yen.format(activeCalculation.regularNetYen)}円</strong>
              </div>
              <p>
                初年度 <b>{yen.format(activeCalculation.firstYearNetYen)}円</b>
              </p>
            </div>

            {primaryRoute ? (
              <AffiliateButton
                className={styles.applyButton}
                wrapperClassName={styles.applyButtonWrap}
                href={primaryRoute.mockUrl}
                routeLabel={primaryRoute.label}
              />
            ) : (
              <p className={styles.unavailable}>
                現在利用できる一般申込Routeはありません。
              </p>
            )}
            <p className={styles.adDisclosure}>広告を含む想定のUIモックです</p>
            <Link href={searchHref} className={styles.secondaryAction}>
              {scenario.source === "search" ? "検索結果へ戻る" : "自分の条件で試算する"}{" "}
              →
            </Link>
          </div>
        </div>

        <div className={styles.cautionBar} data-state={detail.state}>
          <strong>申込前の確認ポイント</strong>
          <ul>
            {detail.keyCautions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div
        className={styles.sectionNav}
        role="tablist"
        aria-label="カード詳細の表示内容"
      >
        {detailTabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            id={`detail-tab-${tab.id}`}
            aria-controls={`detail-panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                return;
              }
              event.preventDefault();
              const nextIndex =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? detailTabs.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        detailTabs.length) %
                      detailTabs.length;
              const nextTab = detailTabs[nextIndex];
              setActiveTab(nextTab.id);
              document.getElementById(`detail-tab-${nextTab.id}`)?.focus();
            }}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.pageBody}>
        <section
          className={styles.contentSection}
          id="detail-panel-value"
          role="tabpanel"
          aria-labelledby="detail-tab-value"
          hidden={activeTab !== "value"}
        >
          <SectionHeading
            number="01"
            eyebrow="YOUR VALUE"
            title="年間のおトク目安"
            description="検索条件または標準例を使い、初年度と通常年を分けています。"
          />
          <div className={styles.scenarioBox}>
            <div>
              <span>
                {activeScenario.source === "search"
                  ? activeScenario.profileId
                    ? `${profileLabel[activeScenario.profileId]}の条件を反映`
                    : "検索条件を反映"
                  : activeScenario.source === "custom"
                    ? "カスタム条件"
                    : "標準試算例"}
              </span>
              <strong>年間 {yen.format(activeScenario.annualSpend)}円</strong>
              <small>
                {activeScenario.source === "search"
                  ? "検索またはプロフィール相当の条件を引き継いでいます。"
                  : activeScenario.source === "custom"
                    ? "この画面で入力した条件です。保存・外部送信は行いません。"
                    : "直接アクセスのため、合成Fixtureの標準条件を使用しています。"}
              </small>
            </div>
            <div className={styles.scenarioSummaryActions}>
              {scenarioUsage.length > 0 && (
                <ul>
                  {scenarioUsage.map(([category, amount]) => (
                    <li key={category}>
                      {categoryLabel(category as PrototypeCategoryId)}
                      <strong>{yen.format(amount ?? 0)}円</strong>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => setIsScenarioEditorOpen((current) => !current)}
                aria-expanded={isScenarioEditorOpen}
                aria-controls="custom-scenario-editor"
              >
                {isScenarioEditorOpen ? "入力を閉じる" : "条件を変更して試算"}
              </button>
            </div>
          </div>

          {isScenarioEditorOpen && (
            <div className={styles.scenarioEditor} id="custom-scenario-editor">
              <div className={styles.scenarioEditorHeader}>
                <div>
                  <span>CUSTOM CONDITION</span>
                  <h3>利用額と使い道を入力</h3>
                </div>
                <div className={styles.periodSwitch} aria-label="入力期間">
                  <button
                    type="button"
                    aria-pressed={draftPeriod === "annual"}
                    onClick={() => setDraftPeriod("annual")}
                  >
                    年間
                  </button>
                  <button
                    type="button"
                    aria-pressed={draftPeriod === "monthly"}
                    onClick={() => setDraftPeriod("monthly")}
                  >
                    月間
                  </button>
                </div>
              </div>

              <label className={styles.totalSpendInput}>
                <span>{draftPeriod === "annual" ? "年間" : "月間"}利用額</span>
                <span>
                  <input
                    type="number"
                    min="0"
                    max={draftPeriod === "annual" ? 100_000_000 : 8_333_333}
                    step="1000"
                    value={
                      draftPeriod === "annual"
                        ? draftAnnualSpend
                        : Math.round(draftAnnualSpend / 12)
                    }
                    onChange={(event) => {
                      const value = clampYen(Number(event.target.value));
                      setDraftAnnualSpend(
                        draftPeriod === "annual" ? value : clampYen(value * 12),
                      );
                    }}
                  />
                  円
                </span>
              </label>

              <fieldset className={styles.categoryEditor}>
                <legend>使い道と金額</legend>
                <p>選択した利用先だけ、合成追加還元の判定に使用します。</p>
                <div>
                  {prototypeCategories.map((category) => {
                    const selected = category.id in draftUsage;
                    const annualAmount = draftUsage[category.id] ?? 0;
                    return (
                      <div data-selected={selected} key={category.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={(event) => {
                              setDraftUsage((current) => {
                                if (event.target.checked) {
                                  return { ...current, [category.id]: 0 };
                                }
                                const next = { ...current };
                                delete next[category.id];
                                return next;
                              });
                            }}
                          />
                          {category.label}
                        </label>
                        {selected && (
                          <label>
                            <span className={styles.srOnly}>
                              {category.label}の
                              {draftPeriod === "annual" ? "年間" : "月間"}利用額
                            </span>
                            <input
                              type="number"
                              min="0"
                              step="1000"
                              value={
                                draftPeriod === "annual"
                                  ? annualAmount
                                  : Math.round(annualAmount / 12)
                              }
                              onChange={(event) => {
                                const value = clampYen(Number(event.target.value));
                                setDraftUsage((current) => ({
                                  ...current,
                                  [category.id]:
                                    draftPeriod === "annual"
                                      ? value
                                      : clampYen(value * 12),
                                }));
                              }}
                            />
                            円
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <div className={styles.scenarioEditorFooter}>
                <p
                  data-error={scenarioInvalid}
                  role={scenarioInvalid ? "alert" : undefined}
                >
                  利用先合計 {yen.format(draftAllocated)}円／年間利用額{" "}
                  {yen.format(draftAnnualSpend)}円
                  {draftAllocated > draftAnnualSpend && (
                    <strong>利用先合計を年間利用額以下に調整してください。</strong>
                  )}
                </p>
                <div>
                  <button type="button" onClick={resetScenario}>
                    初期条件に戻す
                  </button>
                  <button
                    type="button"
                    onClick={applyCustomScenario}
                    disabled={scenarioInvalid}
                  >
                    この条件で試算する →
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.calculationColumns}>
            {[
              {
                title: "通常年",
                total: activeCalculation.regularNetYen,
                rows: activeCalculation.regularRows,
              },
              {
                title: "初年度",
                total: activeCalculation.firstYearNetYen,
                rows: activeCalculation.firstYearRows,
              },
            ].map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <dl>
                  {group.rows.map((row) => (
                    <div key={row.id}>
                      <dt>
                        {row.label}
                        <small>{row.note}</small>
                      </dt>
                      <dd>
                        {row.operation === "minus" ? "−" : "＋"}
                        {yen.format(row.amountYen)}円
                      </dd>
                    </div>
                  ))}
                </dl>
                <p>
                  <span>正味還元額</span>
                  <strong>{yen.format(group.total)}円</strong>
                </p>
              </article>
            ))}
          </div>

          <details className={styles.excludedDetails}>
            <summary>算定対象外と仮定を確認</summary>
            <p>対象外は価値が0円と確定した項目ではありません。</p>
            <ul>
              {activeCalculation.excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-rewards"
          role="tabpanel"
          aria-labelledby="detail-tab-rewards"
          hidden={activeTab !== "rewards"}
        >
          <SectionHeading
            number="02"
            eyebrow="POINT & REWARD"
            title="ポイント・還元"
            description="基本で貯まるポイント、選択コース、交換先、加算Ruleを混同しません。"
          />
          <div className={styles.programGrid}>
            {detail.rewardPrograms.map((program) => (
              <article key={program.id}>
                <span>{program.role}</span>
                <h3>{program.name}</h3>
                <p>{program.selectionRule}</p>
                <DefinitionGrid
                  items={[
                    { label: "運営", value: program.operator },
                    { label: "有効期限", value: program.expiry },
                    { label: "交換価値", value: program.value },
                    { label: "最低交換単位", value: program.minimumExchange },
                  ]}
                />
                <ul>
                  {program.uses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <StatusBadge status={program.disclosureStatus} />
              </article>
            ))}
          </div>

          <div className={styles.ruleList}>
            {detail.rewardRules.map((rule) => (
              <article key={rule.id}>
                <div>
                  <span>{rule.kind === "base" ? "基本" : "利用先別"}</span>
                  <h3>{rule.label}</h3>
                  <strong>{rule.displayRate}</strong>
                </div>
                <DefinitionGrid
                  items={[
                    { label: "対象利用", value: rule.eligibleTransactions },
                    { label: "対象外", value: rule.excludedTransactions },
                    { label: "付与単位", value: rule.grantUnit },
                    { label: "端数処理", value: rule.rounding },
                    { label: "付与時期", value: rule.grantedOn },
                    { label: "上限", value: rule.cap },
                    { label: "重複", value: rule.stacking },
                    { label: "適用期間", value: rule.effectivePeriod },
                  ]}
                />
                <StatusBadge status={rule.disclosureStatus} />
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-campaigns"
          role="tabpanel"
          aria-labelledby="detail-tab-campaigns"
          hidden={activeTab !== "campaigns"}
        >
          <SectionHeading
            number="03"
            eyebrow="CAMPAIGN"
            title="入会特典・期間限定Campaign"
            description="実施回、確定付与と抽選、登録・利用・付与期間を分けて表示します。"
          />
          {detail.campaigns.length > 0 ? (
            <div className={styles.campaignList}>
              {detail.campaigns.map((campaign) => (
                <article key={campaign.id}>
                  <div className={styles.campaignHeader}>
                    <span>{campaign.status}</span>
                    <h3>{campaign.title}</h3>
                    <StatusBadge status={campaign.disclosureStatus} />
                  </div>
                  <div className={styles.effectGrid}>
                    {campaign.effects.map((effect) => (
                      <div key={`${campaign.id}-${effect.label}`}>
                        <span data-certainty={effect.certainty}>
                          {effect.certainty}
                        </span>
                        <strong>{effect.reward}</strong>
                        <small>{effect.beneficiary}</small>
                      </div>
                    ))}
                  </div>
                  <details>
                    <summary>Campaign条件をすべて確認</summary>
                    <DefinitionGrid
                      items={[
                        { label: "登録・応募期間", value: campaign.registrationPeriod },
                        { label: "対象利用期間", value: campaign.qualifyingPeriod },
                        { label: "エントリー", value: campaign.entryRequired },
                        { label: "対象取引", value: campaign.eligibleTransactions },
                        { label: "対象外", value: campaign.excludedTransactions },
                        { label: "上限", value: campaign.cap },
                        { label: "付与時期", value: campaign.grantedOn },
                        { label: "重複", value: campaign.stacking },
                      ]}
                    />
                  </details>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <strong>確認できるCampaignはありません</strong>
              <p>Campaignが存在しないと確定した意味ではありません。</p>
            </div>
          )}

          <div className={styles.annualBlock}>
            <div>
              <span>ANNUAL BENEFIT</span>
              <h3>年間利用特典</h3>
              <p>期間限定Campaignではなく、継続する利用額達成Ruleです。</p>
            </div>
            {detail.annualBenefits.length > 0 ? (
              <div className={styles.annualList}>
                {detail.annualBenefits.map((benefit) => (
                  <article key={benefit.id}>
                    <span>年間 {yen.format(benefit.thresholdYen)}円利用で</span>
                    <strong>{benefit.reward}</strong>
                    <DefinitionGrid
                      items={[
                        { label: "集計期間", value: benefit.measurementPeriod },
                        { label: "対象利用", value: benefit.eligibleTransactions },
                        { label: "対象外", value: benefit.excludedTransactions },
                        { label: "付与時期", value: benefit.grantedOn },
                        { label: "有効期限", value: benefit.validUntil },
                        { label: "重複", value: benefit.stacking },
                      ]}
                    />
                    <StatusBadge status={benefit.disclosureStatus} />
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.emptyCompact}>
                確認できる年間利用特典はありません。
              </p>
            )}
          </div>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-fees"
          role="tabpanel"
          aria-labelledby="detail-tab-fees"
          hidden={activeTab !== "fees"}
        >
          <SectionHeading
            number="04"
            eyebrow="FEE & EXTRA CARD"
            title="年会費・各種手数料・追加カード"
            description="本カード、家族カード、ETCカード、再発行、海外利用を別々に確認します。"
          />
          <div className={styles.feeTableWrap}>
            <table className={styles.feeTable}>
              <thead>
                <tr>
                  <th>対象</th>
                  <th>費用</th>
                  <th>無料・免除条件</th>
                  <th>集計・請求</th>
                  <th>確認状態</th>
                </tr>
              </thead>
              <tbody>
                {detail.feeRules.map((fee) => (
                  <tr key={fee.id}>
                    <th>{fee.label}</th>
                    <td>{fee.displayValue}</td>
                    <td>{fee.freeCondition}</td>
                    <td>
                      {fee.measurementPeriod}
                      <small>{fee.chargedOn}</small>
                    </td>
                    <td>
                      <StatusBadge status={fee.disclosureStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.additionalGrid}>
            {detail.additionalCards.map((card) => (
              <article key={card.id}>
                <span>{card.kind}</span>
                <h3>{card.availability}</h3>
                <DefinitionGrid
                  items={[
                    { label: "対象者", value: card.eligibleUser },
                    { label: "枚数", value: card.count },
                    { label: "年会費", value: card.annualFee },
                    { label: "発行手数料", value: card.issueFee },
                    { label: "申込方法", value: card.application },
                    { label: "発行目安", value: card.issueTime },
                    { label: "ポイント", value: card.reward },
                    { label: "利用枠", value: card.sharedLimit },
                    { label: "特典", value: card.benefits },
                  ]}
                />
                <StatusBadge status={card.disclosureStatus} />
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-benefits"
          role="tabpanel"
          aria-labelledby="detail-tab-benefits"
          hidden={activeTab !== "benefits"}
        >
          <SectionHeading
            number="05"
            eyebrow="BENEFIT & INSURANCE"
            title="特典・ラウンジ・保険"
            description="保有するだけの便益と、登録・予約・決済が必要な便益を区別します。"
          />
          <div className={styles.benefitGrid}>
            {detail.benefits.map((benefit) => (
              <article key={benefit.id}>
                <span>{benefit.category}</span>
                <h3>{benefit.name}</h3>
                <strong>{benefit.conditionType}</strong>
                <DefinitionGrid
                  items={[
                    { label: "提供者", value: benefit.provider },
                    { label: "利用者", value: benefit.user },
                    { label: "受益者", value: benefit.beneficiary },
                    { label: "利用経路", value: benefit.access },
                    { label: "条件", value: benefit.conditions },
                    { label: "上限", value: benefit.limit },
                    { label: "同伴者", value: benefit.companion },
                    { label: "除外", value: benefit.exclusions },
                    { label: "期間", value: benefit.effectivePeriod },
                  ]}
                />
                <StatusBadge status={benefit.disclosureStatus} />
              </article>
            ))}
          </div>

          <div className={styles.insuranceList}>
            {detail.insuranceProducts.map((insurance) => (
              <article key={insurance.id}>
                <div className={styles.insuranceHeader}>
                  <span>INSURANCE / COMPENSATION</span>
                  <h3>{insurance.name}</h3>
                  <p>{insurance.attachment}</p>
                  <small>
                    引受主体：{insurance.underwriter}／請求窓口：
                    {insurance.claimsHandler}
                  </small>
                </div>
                <div className={styles.coverageList}>
                  {insurance.coverages.map((coverage) => (
                    <details key={coverage.id}>
                      <summary>
                        <span>{coverage.name}</span>
                        <strong>{coverage.limit}</strong>
                      </summary>
                      <DefinitionGrid
                        items={[
                          { label: "対象者", value: coverage.insured },
                          { label: "受益者", value: coverage.beneficiary },
                          { label: "付帯条件", value: coverage.attachment },
                          { label: "補償事故", value: coverage.insuredEvent },
                          { label: "限度額", value: coverage.limit },
                          { label: "免責", value: coverage.deductible },
                          { label: "除外", value: coverage.exclusions },
                          { label: "請求要件", value: coverage.claimRequirement },
                          { label: "補償期間", value: coverage.coveragePeriod },
                        ]}
                      />
                      <StatusBadge status={coverage.disclosureStatus} />
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-application"
          role="tabpanel"
          aria-labelledby="detail-tab-application"
          hidden={activeTab !== "application"}
        >
          <SectionHeading
            number="06"
            eyebrow="APPLICATION & SPEC"
            title="申込条件・基本仕様・セキュリティ"
            description="公開されている資格条件と申込経路を示し、審査難易度は推測しません。"
          />
          <div className={styles.routeList}>
            {detail.applicationRoutes.map((route) => (
              <article key={route.id}>
                <span>{route.type}</span>
                <div>
                  <h3>{route.label}</h3>
                  <p>{route.eligibility}</p>
                  <strong>{route.screening}</strong>
                  <small>{route.conditionDifference}</small>
                </div>
                <div>
                  <em>{route.status}</em>
                  <small>{route.issueTime}</small>
                  <StatusBadge status={route.disclosureStatus} />
                </div>
              </article>
            ))}
          </div>

          <div className={styles.specificationGrid}>
            <article>
              <span>PAYMENT</span>
              <h3>決済・発行</h3>
              <DefinitionGrid
                items={[
                  {
                    label: "国際ブランド",
                    value: detail.specifications.brands.join("／"),
                  },
                  { label: "タッチ決済", value: detail.specifications.contactless },
                  {
                    label: "モバイルWallet",
                    value: detail.specifications.mobileWallets,
                  },
                  { label: "発行形態", value: detail.specifications.issueForm },
                  { label: "締め日", value: detail.specifications.closingDate },
                  { label: "支払日", value: detail.specifications.paymentDate },
                  { label: "海外事務手数料", value: detail.specifications.overseasFee },
                  { label: "再発行手数料", value: detail.specifications.reissueFee },
                ]}
              />
            </article>
            <article>
              <span>SECURITY</span>
              <h3>セキュリティ</h3>
              <DefinitionGrid
                items={[
                  { label: "利用通知", value: detail.specifications.notification },
                  { label: "カードロック", value: detail.specifications.cardLock },
                  { label: "本人認証", value: detail.specifications.authentication },
                ]}
              />
              <p>
                不正利用補償の対象・期間・除外は、上の保険・補償欄でCoverageごとに確認してください。
              </p>
            </article>
          </div>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-reviews"
          role="tabpanel"
          aria-labelledby="detail-tab-reviews"
          hidden={activeTab !== "reviews"}
        >
          <SectionHeading
            number="07"
            eyebrow="USER REVIEW"
            title="口コミ・レビュー"
            description="ログインユーザーの投稿であり、公式情報・検索順位・試算には使用しません。"
          />
          {detail.reviews.total > 0 && detail.reviews.average !== null ? (
            <div className={styles.reviewSummary}>
              <div>
                <strong>{detail.reviews.average.toFixed(1)}</strong>
                <Stars rating={detail.reviews.average} />
                <span>{detail.reviews.total}件の合成レビュー</span>
              </div>
              <div className={styles.reviewBars}>
                {detail.reviews.distributions.map((value, index) => (
                  <div key={5 - index}>
                    <span>{5 - index}</span>
                    <i>
                      <b style={{ width: `${value}%` }} />
                    </i>
                    <small>{value}%</small>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <strong>公開レビューはまだありません</strong>
              <p>1件以上公開されるまで平均点・分布は表示しません。</p>
            </div>
          )}

          <div className={styles.reviewList}>
            {detail.reviews.reviews.map((review) => (
              <article key={review.id}>
                <div>
                  <Stars rating={review.rating} />
                  <time dateTime={review.postedOn}>{review.postedOn}</time>
                </div>
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <small>{review.profile}・ログインユーザーの投稿・公開承認済み</small>
              </article>
            ))}
          </div>
          <div className={styles.reviewPolicy}>
            <strong>レビュー掲載方針</strong>
            <p>{detail.reviews.moderationPolicy}</p>
            <small>収集期間：{detail.reviews.collectionPeriod}</small>
            <button
              type="button"
              onClick={() =>
                setReviewMessage("投稿・通報はUIモックです。送信・保存は行いません。")
              }
            >
              ログインして投稿・通報を確認
            </button>
            {reviewMessage && <p role="status">{reviewMessage}</p>}
          </div>
        </section>

        <section
          className={styles.contentSection}
          id="detail-panel-evidence"
          role="tabpanel"
          aria-labelledby="detail-tab-evidence"
          hidden={activeTab !== "evidence"}
        >
          <SectionHeading
            number="08"
            eyebrow="SOURCE & FRESHNESS"
            title="情報の根拠・確認状態"
            description="利用者向けの確認状態、確認日、適用期間、Source相当情報だけを表示します。"
          />
          <div className={styles.fixtureNotice}>
            <strong>合成Fixtureのみを使用しています</strong>
            <p>
              実在する公式情報・券面・ロゴ・外部URLではありません。Claim
              IDや内部管理IDは公開画面へ表示していません。
            </p>
          </div>
          <div className={styles.evidenceList}>
            {detail.evidence.map((evidence) => (
              <article key={evidence.id}>
                <div>
                  <h3>{evidence.label}</h3>
                  <StatusBadge status={evidence.status} />
                </div>
                <p>{evidence.sourceTitle}</p>
                <DefinitionGrid
                  items={[
                    { label: "確認日", value: evidence.confirmedOn },
                    { label: "適用期間", value: evidence.effectivePeriod },
                    { label: "補足", value: evidence.note },
                  ]}
                />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="related-title">
          <div>
            <p>ほかの候補も同じ条件で確認</p>
            <h2 id="related-title">あわせて見たいカード</h2>
          </div>
          <div>
            {relatedCards.map((card) => (
              <Link href={card.href} key={card.id}>
                <span>RELATED CARD</span>
                <strong>{card.name}</strong>
                <small>同じ試算条件で詳細を見る →</small>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
