"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { PrototypeCardDetail, PrototypeFeaturedCard } from "@/types/ui-prototype";
import AffiliateButton from "./affiliate-button";
import styles from "./card-detail.module.css";

const tabs = [
  { id: "overview", label: "特徴・おすすめ" },
  { id: "benefits", label: "特典・ポイント" },
  { id: "specs", label: "基本・契約情報" },
  { id: "calculation", label: "算定・Evidence" },
  { id: "reviews", label: "レビュー" },
  { id: "cautions", label: "注意事項" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type CardDetailTabsProps = {
  card: PrototypeFeaturedCard;
  detail: PrototypeCardDetail;
};

const yen = new Intl.NumberFormat("ja-JP");

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

function SyntheticLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  return (
    <span className={styles.syntheticLinkWrap}>
      <a
        href={href}
        className={styles.syntheticLink}
        onClick={(event) => {
          event.preventDefault();
          setMessage("合成URLのため外部ページには遷移しません。");
        }}
        onAuxClick={(event) => event.preventDefault()}
        onContextMenu={(event) => event.preventDefault()}
      >
        {children} ↗
      </a>
      <small>{href}</small>
      {message && <small role="status">{message}</small>}
    </span>
  );
}

function UnknownValue({ value }: { value?: string }) {
  return <>{value ?? "未設定（Unknown）"}</>;
}

function affiliateStatusLabel(
  status: PrototypeCardDetail["applicationRoutes"][number]["affiliateStatus"],
) {
  return {
    correspondence_unverified: "公式申込との差異は未確認",
    verified_same: "公式申込と同条件を確認済み",
    verified_different: "公式申込との条件差を確認済み",
    inactive: "アフィリエイト対象外",
  }[status];
}

export default function CardDetailTabs({ card, detail }: CardDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [reviewMessage, setReviewMessage] = useState("");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const componentId = useId().replaceAll(":", "");
  const primaryRoute =
    detail.applicationRoutes.find(
      (route) =>
        route.isPrimary &&
        route.status === "受付中" &&
        route.type === "一般公開" &&
        route.affiliateStatus !== "inactive" &&
        Boolean(route.affiliateUrl),
    ) ??
    detail.applicationRoutes.find(
      (route) =>
        route.status === "受付中" &&
        route.type === "一般公開" &&
        route.affiliateStatus !== "inactive" &&
        Boolean(route.affiliateUrl),
    );

  function selectAdjacentTab(currentIndex: number, key: string) {
    let nextIndex = currentIndex;
    if (key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (key === "Home") nextIndex = 0;
    if (key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === currentIndex && !["Home", "End"].includes(key)) return;
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <>
      <div className={styles.tabWrap}>
        <div className={styles.tabList} role="tablist" aria-label="カード詳細情報">
          {tabs.map((tab, index) => (
            <button
              type="button"
              role="tab"
              id={`${componentId}-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`${componentId}-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                  event.preventDefault();
                  selectAdjacentTab(index, event.key);
                }
              }}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              key={tab.id}
            >
              {tab.label}
              {tab.id === "reviews" && <span>{detail.reviewSummary.total}</span>}
            </button>
          ))}
        </div>
        <p>タブを選ぶと、この位置のまま情報が切り替わります。</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.tabPanel}>
          <div
            role="tabpanel"
            id={`${componentId}-panel-overview`}
            aria-labelledby={`${componentId}-tab-overview`}
            hidden={activeTab !== "overview"}
            tabIndex={0}
          >
            <div className={styles.panelStack}>
              <section className={styles.recommendBox}>
                <div className={styles.sectionHeading}>
                  <span>GOOD MATCH</span>
                  <div>
                    <p>こんな人におすすめ！</p>
                    <h2>このカードと相性がいい人</h2>
                  </div>
                </div>
                <ul>
                  {detail.recommendedFor.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={styles.reason}>
                  <strong>今回の注目理由</strong>
                  {card.reason}
                </p>
                <p className={styles.editorialNote}>
                  <strong>編集方針</strong>
                  「おすすめ」「注目理由」は編集上の要約です。根拠Claim:{" "}
                  {detail.editorialContext.sourceClaimIds.join(" / ")}
                  。公式Fact・利用者レビュー・試算入力には使用しません。
                </p>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>POINT</span>
                  <div>
                    <p>ここがうれしい！</p>
                    <h2>カードの3つの特徴</h2>
                  </div>
                </div>
                <div className={styles.highlightGrid}>
                  {detail.highlights.map((highlight, index) => (
                    <article key={highlight.title}>
                      <span className={styles.highlightNumber}>0{index + 1}</span>
                      <i aria-hidden="true">{highlight.mark}</i>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.description}</p>
                      <small>
                        Claim:{" "}
                        {[
                          highlight.evidenceClaimId,
                          ...(highlight.supportingEvidenceClaimIds ?? []),
                        ].join(" / ")}
                      </small>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>STATUS</span>
                  <div>
                    <p>重要な状態を常時確認</p>
                    <h2>算定・開示・変更状態</h2>
                  </div>
                </div>
                <dl className={styles.verificationDetail}>
                  <div>
                    <dt>算定状態</dt>
                    <dd>{card.stateLabel}</dd>
                  </div>
                  <div>
                    <dt>最終確認日</dt>
                    <dd>{card.confirmedOn}</dd>
                  </div>
                </dl>
                <p className={styles.dataNote}>
                  未確認要素は算定対象外です。表示額を過小評価している可能性や、確認後に順位が変わる可能性があります。
                </p>
                <ul className={styles.compactList}>
                  {detail.calculation.excludedItems.map((item) => (
                    <li key={item.label}>
                      <strong>{item.label}</strong>：{item.reason}（{item.impact}）
                    </li>
                  ))}
                </ul>
                {detail.evidenceStatus.changeReview && (
                  <dl className={styles.specList}>
                    <div>
                      <dt>変更対象</dt>
                      <dd>{detail.evidenceStatus.changeReview.target}</dd>
                    </div>
                    <div>
                      <dt>旧承認値</dt>
                      <dd>
                        {detail.evidenceStatus.changeReview.previousApprovedValue}
                      </dd>
                    </div>
                    <div>
                      <dt>旧値確認日</dt>
                      <dd>{detail.evidenceStatus.changeReview.previousConfirmedOn}</dd>
                    </div>
                    <div>
                      <dt>暫定算定</dt>
                      <dd>{detail.evidenceStatus.changeReview.calculationTreatment}</dd>
                    </div>
                    <div>
                      <dt>新候補値</dt>
                      <dd>{detail.evidenceStatus.changeReview.candidateValue}</dd>
                    </div>
                    <div>
                      <dt>影響範囲</dt>
                      <dd>{detail.evidenceStatus.changeReview.impact}</dd>
                    </div>
                  </dl>
                )}
              </section>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${componentId}-panel-benefits`}
            aria-labelledby={`${componentId}-tab-benefits`}
            hidden={activeTab !== "benefits"}
            tabIndex={0}
          >
            <div className={styles.panelStack}>
              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>REWARD</span>
                  <div>
                    <p>使う場所でどう変わる？</p>
                    <h2>主な還元率</h2>
                  </div>
                </div>
                <div className={styles.rewardList}>
                  {detail.rewardExamples.map((reward, index) => (
                    <div key={reward.place}>
                      <span aria-hidden="true">
                        {index === 0 ? "買" : index === 1 ? "＋" : "基"}
                      </span>
                      <div>
                        <strong>{reward.place}</strong>
                        <small>{reward.note}</small>
                      </div>
                      <p>
                        <strong>{reward.rate}</strong>
                        <span>還元</span>
                      </p>
                      <small>Claim: {reward.evidenceClaimId}</small>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>CAMPAIGN</span>
                  <div>
                    <p>入会前に条件を確認</p>
                    <h2>入会特典・キャンペーン</h2>
                  </div>
                </div>
                <div className={styles.campaignGrid}>
                  {detail.campaigns.map((campaign) => (
                    <article key={campaign.id}>
                      <p>{campaign.title}</p>
                      <strong>{campaign.value}</strong>
                      <small>{campaign.condition}</small>
                      <dl className={styles.detailFacts}>
                        <div>
                          <dt>開始</dt>
                          <dd>
                            <UnknownValue value={campaign.startsOn} />
                          </dd>
                        </div>
                        <div>
                          <dt>終了</dt>
                          <dd>
                            <UnknownValue value={campaign.endsOn} />
                          </dd>
                        </div>
                        <div>
                          <dt>エントリー</dt>
                          <dd>
                            <UnknownValue value={campaign.entryRequired} />
                          </dd>
                        </div>
                        <div>
                          <dt>対象取引</dt>
                          <dd>
                            <UnknownValue value={campaign.eligibleTransactions} />
                          </dd>
                        </div>
                        <div>
                          <dt>除外取引</dt>
                          <dd>
                            <UnknownValue value={campaign.excludedTransactions} />
                          </dd>
                        </div>
                        <div>
                          <dt>上限</dt>
                          <dd>
                            <UnknownValue value={campaign.cap} />
                          </dd>
                        </div>
                        <div>
                          <dt>付与時期</dt>
                          <dd>
                            <UnknownValue value={campaign.awardedOn} />
                          </dd>
                        </div>
                        <div>
                          <dt>重複条件</dt>
                          <dd>
                            <UnknownValue value={campaign.stackingRule} />
                          </dd>
                        </div>
                        <div>
                          <dt>受付状態</dt>
                          <dd>
                            <UnknownValue value={campaign.status} />
                          </dd>
                        </div>
                      </dl>
                      <ul className={styles.conditionEvidenceList}>
                        {campaign.conditionFacts.map((fact) => (
                          <li key={fact.label}>
                            {fact.label}：{fact.value}（{fact.disclosureStatus} / Claim:{" "}
                            {fact.evidenceClaimId}）
                          </li>
                        ))}
                      </ul>
                      <div>
                        <SyntheticLink href={campaign.campaignUrl}>
                          合成キャンペーンURL
                        </SyntheticLink>
                        <SyntheticLink href={campaign.sourceUrl}>
                          合成条件URL
                        </SyntheticLink>
                      </div>
                      <small>Claim: {campaign.evidenceClaimId}</small>
                    </article>
                  ))}
                </div>
                <div className={styles.spendBonusBlock}>
                  <div>
                    <p>達成条件をわかりやすく</p>
                    <h3>いつまでに、いくら使うと何ポイント？</h3>
                  </div>
                  <div className={styles.spendBonusList}>
                    {detail.spendBonuses.map((bonus) => (
                      <article key={bonus.id}>
                        <span>{bonus.period}</span>
                        <p>
                          <strong>{bonus.spend}</strong> 使うと
                        </p>
                        <b>{bonus.reward}</b>
                        <small>{bonus.note}</small>
                        <dl className={styles.detailFacts}>
                          <div>
                            <dt>集計起点</dt>
                            <dd>
                              <UnknownValue value={bonus.measurementStartsFrom} />
                            </dd>
                          </div>
                          <div>
                            <dt>対象取引</dt>
                            <dd>
                              <UnknownValue value={bonus.eligibleTransactions} />
                            </dd>
                          </div>
                          <div>
                            <dt>除外取引</dt>
                            <dd>
                              <UnknownValue value={bonus.excludedTransactions} />
                            </dd>
                          </div>
                          <div>
                            <dt>上限</dt>
                            <dd>
                              <UnknownValue value={bonus.cap} />
                            </dd>
                          </div>
                          <div>
                            <dt>付与時期</dt>
                            <dd>
                              <UnknownValue value={bonus.awardedOn} />
                            </dd>
                          </div>
                          <div>
                            <dt>重複条件</dt>
                            <dd>
                              <UnknownValue value={bonus.stackingRule} />
                            </dd>
                          </div>
                        </dl>
                        <ul className={styles.conditionEvidenceList}>
                          {bonus.conditionFacts.map((fact) => (
                            <li key={fact.label}>
                              {fact.label}：{fact.value}（{fact.disclosureStatus} /
                              Claim: {fact.evidenceClaimId}）
                            </li>
                          ))}
                        </ul>
                        <SyntheticLink href={bonus.sourceUrl}>
                          合成条件URL
                        </SyntheticLink>
                        <small>Claim: {bonus.evidenceClaimId}</small>
                      </article>
                    ))}
                  </div>
                </div>
                <div className={styles.annualMilestoneBlock}>
                  <div>
                    <p>継続利用でもらえる特典</p>
                    <h3>年間利用額の達成特典</h3>
                  </div>
                  <div className={styles.annualMilestoneList}>
                    {detail.annualMilestones.map((milestone) => (
                      <article key={milestone.id}>
                        <span>{milestone.period}</span>
                        <p>
                          年間 <strong>{milestone.spend}</strong> 利用で
                        </p>
                        <b>{milestone.benefit}</b>
                        <small>{milestone.note}</small>
                        <dl className={styles.detailFacts}>
                          <div>
                            <dt>集計起点</dt>
                            <dd>
                              <UnknownValue value={milestone.measurementStartsFrom} />
                            </dd>
                          </div>
                          <div>
                            <dt>対象取引</dt>
                            <dd>
                              <UnknownValue value={milestone.eligibleTransactions} />
                            </dd>
                          </div>
                          <div>
                            <dt>除外取引</dt>
                            <dd>
                              <UnknownValue value={milestone.excludedTransactions} />
                            </dd>
                          </div>
                          <div>
                            <dt>付与時期</dt>
                            <dd>
                              <UnknownValue value={milestone.awardedOn} />
                            </dd>
                          </div>
                          <div>
                            <dt>有効期間</dt>
                            <dd>
                              <UnknownValue value={milestone.benefitValidity} />
                            </dd>
                          </div>
                          <div>
                            <dt>重複条件</dt>
                            <dd>
                              <UnknownValue value={milestone.stackingRule} />
                            </dd>
                          </div>
                        </dl>
                        <ul className={styles.conditionEvidenceList}>
                          {milestone.conditionFacts.map((fact) => (
                            <li key={fact.label}>
                              {fact.label}：{fact.value}（{fact.disclosureStatus} /
                              Claim: {fact.evidenceClaimId}）
                            </li>
                          ))}
                        </ul>
                        <SyntheticLink href={milestone.sourceUrl}>
                          合成集計条件URL
                        </SyntheticLink>
                        <small>Claim: {milestone.evidenceClaimId}</small>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>POINT</span>
                  <div>
                    <p>貯めたあとも確認</p>
                    <h2>ポイントプログラム</h2>
                  </div>
                </div>
                <dl className={styles.pointSummary}>
                  <div>
                    <dt>名称</dt>
                    <dd>{detail.pointProgram.name}</dd>
                  </div>
                  <div>
                    <dt>有効期限</dt>
                    <dd>{detail.pointProgram.expiry}</dd>
                  </div>
                  <div>
                    <dt>交換価値</dt>
                    <dd>{detail.pointProgram.value}</dd>
                  </div>
                </dl>
                <div className={styles.pointUses}>
                  <strong>主な使い道</strong>
                  <ul>
                    {detail.pointProgram.uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                  <dl className={styles.detailFacts}>
                    {detail.calculation.formulaChecks.map((formula) => (
                      <div key={formula.label}>
                        <dt>{formula.label}</dt>
                        <dd>
                          {yen.format(formula.annualSpend)}円 × {formula.rate * 100}% ＝
                          {yen.format(formula.expectedAmount)}円
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <p className={styles.dataNote}>
                  Claim: {detail.pointProgram.evidenceClaimId}
                </p>
              </section>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${componentId}-panel-specs`}
            aria-labelledby={`${componentId}-tab-specs`}
            hidden={activeTab !== "specs"}
            tabIndex={0}
          >
            <div className={styles.panelStack}>
              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>SPEC</span>
                  <div>
                    <p>申し込み前にまとめて確認</p>
                    <h2>カードの基本情報・Variant</h2>
                  </div>
                </div>
                <dl className={styles.specList}>
                  {detail.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>
                        {spec.value}
                        <small>Claim: {spec.evidenceClaimId}</small>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className={styles.dataNote}>
                  Brand / Network Identifier：{detail.networkIdentifiers.join(" / ")}
                  （運営主体のActor Roleとは分離）／Claim:{" "}
                  {detail.networkIdentifiersEvidenceClaimId}
                </p>
                <div className={styles.variantGrid}>
                  {detail.variants.map((variant) => (
                    <article key={variant.id}>
                      <span>{variant.brand}</span>
                      <strong>{variant.form}</strong>
                      <dl>
                        <div>
                          <dt>年会費</dt>
                          <dd>{variant.annualFee}</dd>
                        </div>
                        <div>
                          <dt>備考</dt>
                          <dd>{variant.note}</dd>
                        </div>
                      </dl>
                      <small>Claim: {variant.evidenceClaimId}</small>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>ENTRY</span>
                  <div>
                    <p>発行までの条件</p>
                    <h2>申込経路・支払い情報</h2>
                  </div>
                </div>
                <dl className={styles.applicationList}>
                  <div>
                    <dt>申込対象</dt>
                    <dd>{detail.application.eligibility}</dd>
                  </div>
                  <div>
                    <dt>発行スピード</dt>
                    <dd>{detail.application.issueSpeed}</dd>
                  </div>
                  <div>
                    <dt>締め日</dt>
                    <dd>{detail.application.closingDate}</dd>
                  </div>
                  <div>
                    <dt>支払日</dt>
                    <dd>{detail.application.paymentDate}</dd>
                  </div>
                </dl>
                <p className={styles.dataNote}>
                  Claim: {detail.application.evidenceClaimId}
                </p>
                <div className={styles.applicationRoutes}>
                  {detail.applicationRoutes.map((route) => (
                    <article key={route.id}>
                      <span>{route.type}</span>
                      <div>
                        <strong>{route.label}</strong>
                        <small>{route.eligibility}</small>
                        <small>{route.affiliateCondition}</small>
                        <SyntheticLink href={route.officialApplicationUrl}>
                          合成公式申込URL
                        </SyntheticLink>
                        {route.affiliateStatus !== "inactive" && route.affiliateUrl && (
                          <SyntheticLink href={route.affiliateUrl}>
                            合成Affiliate URL
                          </SyntheticLink>
                        )}
                        <small>
                          {affiliateStatusLabel(route.affiliateStatus)} / 開示状態：
                          {route.conditionDisclosureStatus} / Claim:
                          {route.evidenceClaimId}
                        </small>
                        <small>
                          Campaign対応：
                          {route.campaignRelationStatus === "unknown"
                            ? "未確認（Unknown）"
                            : route.campaignRelationStatus === "not_applicable"
                              ? "対象外"
                              : route.campaignIds.join("／")}
                          ／External Account IDs：
                          {route.externalAccountIds.join("／") || "参照なし"}
                        </small>
                      </div>
                      <em>{route.status}</em>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>PAYMENT</span>
                  <div>
                    <p>方式ごとに分離して確認</p>
                    <h2>支払方法・手数料</h2>
                  </div>
                </div>
                <div className={styles.paymentSchemeList}>
                  {detail.paymentSchemes.map((scheme) => (
                    <article key={scheme.name}>
                      <div>
                        <strong>{scheme.name}</strong>
                        <span>{scheme.disclosureStatus}</span>
                      </div>
                      <dl>
                        <div>
                          <dt>支払日程</dt>
                          <dd>{scheme.schedule}</dd>
                        </div>
                        <div>
                          <dt>手数料</dt>
                          <dd>{scheme.fee}</dd>
                        </div>
                        <div>
                          <dt>利用時選択</dt>
                          <dd>{scheme.selectableAtPurchase}</dd>
                        </div>
                        <div>
                          <dt>利用後変更</dt>
                          <dd>{scheme.postPurchaseChange}</dd>
                        </div>
                        <div>
                          <dt>回数</dt>
                          <dd>{scheme.installmentCount}</dd>
                        </div>
                        <div>
                          <dt>加盟店条件</dt>
                          <dd>{scheme.merchantLimitations}</dd>
                        </div>
                        <div>
                          <dt>法的位置付け</dt>
                          <dd>{scheme.legalClassification}</dd>
                        </div>
                      </dl>
                      <small>Claim: {scheme.evidenceClaimId}</small>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>STRUCTURE</span>
                  <div>
                    <p>主体・資金・経済フローを分離</p>
                    <h2>契約構造と研究項目</h2>
                  </div>
                </div>
                <div className={styles.actorRoleList}>
                  {detail.actorRoles.map((actor) => (
                    <article key={actor.role}>
                      <span>{actor.role}</span>
                      <strong>{actor.organization}</strong>
                      <small>
                        {actor.responsibility} / Concept:{" "}
                        <UnknownValue value={actor.conceptId} /> / 期間:{" "}
                        <UnknownValue value={actor.effectivePeriod} /> / Claim:{" "}
                        {actor.evidenceClaimId}
                      </small>
                    </article>
                  ))}
                </div>
                <dl className={styles.specList}>
                  <div>
                    <dt>Payment Instrument</dt>
                    <dd>{detail.researchCoverage.paymentInstrument.value}</dd>
                    <dd>
                      {detail.researchCoverage.paymentInstrument.disclosureStatus} /
                      Claim: {detail.researchCoverage.paymentInstrument.evidenceClaimId}
                    </dd>
                  </div>
                  <div>
                    <dt>Funding Method</dt>
                    <dd>
                      {detail.researchCoverage.fundingMethods
                        .map((item) => item.value)
                        .join("／")}
                    </dd>
                    <dd>
                      {detail.researchCoverage.fundingMethods
                        .map(
                          (item) =>
                            `${item.disclosureStatus} / Claim: ${item.evidenceClaimId}`,
                        )
                        .join("／")}
                    </dd>
                  </div>
                  <div>
                    <dt>Billing / Settlement</dt>
                    <dd>{detail.researchCoverage.billingSettlement.value}</dd>
                    <dd>
                      {detail.researchCoverage.billingSettlement.disclosureStatus} /
                      Claim: {detail.researchCoverage.billingSettlement.evidenceClaimId}
                    </dd>
                  </div>
                  <div>
                    <dt>Credit Provider</dt>
                    <dd>{detail.researchCoverage.creditProvider.value}</dd>
                    <dd>
                      {detail.researchCoverage.creditProvider.disclosureStatus} / Claim:{" "}
                      {detail.researchCoverage.creditProvider.evidenceClaimId}
                    </dd>
                  </div>
                  <div>
                    <dt>Deposit Rule</dt>
                    <dd>{detail.researchCoverage.depositRule.value}</dd>
                    <dd>
                      {detail.researchCoverage.depositRule.disclosureStatus} / Claim:{" "}
                      {detail.researchCoverage.depositRule.evidenceClaimId}
                    </dd>
                  </div>
                </dl>
                <h3>Instrument・FundingのID参照</h3>
                <div className={styles.dataCardGrid}>
                  <article>
                    <strong>
                      {detail.researchCoverage.paymentInstrumentDetails.id}
                    </strong>
                    <p>
                      Variant：
                      {detail.researchCoverage.paymentInstrumentDetails.variantIds.join(
                        "／",
                      )}
                    </p>
                    <p>
                      Issuer：
                      {detail.researchCoverage.paymentInstrumentDetails.issuerActorId}
                      ／Credit Provider：
                      {
                        detail.researchCoverage.paymentInstrumentDetails
                          .creditProviderActorId
                      }
                    </p>
                    <small>
                      {detail.researchCoverage.paymentInstrumentDetails.lifecycleStatus}{" "}
                      / Claim:{" "}
                      {detail.researchCoverage.paymentInstrumentDetails.evidenceClaimId}
                    </small>
                  </article>
                  {detail.researchCoverage.fundingMethodDetails.map((method) => (
                    <article key={method.id}>
                      <strong>{method.id}</strong>
                      <p>
                        Provider：{method.providerActorId}／供給先：
                        {method.destinationAccount}
                      </p>
                      <p>
                        手数料：{method.fee}／期間：{method.effectivePeriod}
                      </p>
                      <small>
                        {method.disclosureStatus} / Claim: {method.evidenceClaimId}
                      </small>
                    </article>
                  ))}
                </div>
                <h3>Actorの登録事実</h3>
                <div className={styles.dataCardGrid}>
                  {detail.researchCoverage.regulatoryRegistrations.map((item) => (
                    <article key={item.actor}>
                      <strong>{item.actor}</strong>
                      <p>{item.registration}</p>
                      <small>
                        {item.disclosureStatus} / Claim: {item.evidenceClaimId}
                      </small>
                    </article>
                  ))}
                </div>
                <h3>Reward destination</h3>
                <div className={styles.dataCardGrid}>
                  {detail.researchCoverage.rewardDestinations.map((destination) => (
                    <article key={destination.id}>
                      <strong>{destination.id}</strong>
                      <p>Operator：{destination.operator}</p>
                      <p>External Account：{destination.externalAccountId}</p>
                      <p>{destination.status}</p>
                      <small>Claim: {destination.evidenceClaimId}</small>
                    </article>
                  ))}
                </div>
                <h3>外部アカウント</h3>
                <div className={styles.dataCardGrid}>
                  {detail.researchCoverage.externalAccounts.map((item) => (
                    <article key={item.id}>
                      <strong>
                        {item.name}（{item.id}）
                      </strong>
                      <p>Operator：{item.operator}</p>
                      <p>申込Route参照：{item.applicationRouteIds.join("／")}</p>
                      <p>Reward参照：{item.rewardDestinationIds.join("／")}</p>
                      <p>申込要件：{item.applicationRequirement}</p>
                      <p>特典受取先：{item.rewardDestination}</p>
                      <small>
                        {item.disclosureStatus} / {item.effectivePeriod} / Claim:{" "}
                        {item.evidenceClaimId}
                      </small>
                    </article>
                  ))}
                </div>
                <h3>会員還元と提携先収益</h3>
                <div className={styles.dataCardGrid}>
                  {detail.researchCoverage.economicFlows.map((flow) => (
                    <article key={`${flow.beneficiary}-${flow.flowType}`}>
                      <strong>{flow.flowType}</strong>
                      <p>
                        支払元：{flow.payer}／受益者：{flow.beneficiary}
                      </p>
                      <p>
                        Partnership：{flow.partnership}／期間：{flow.effectivePeriod}
                      </p>
                      <p>運営：{flow.operator}</p>
                      <p>{flow.condition}</p>
                      <small>
                        {flow.disclosureStatus} / Claim: {flow.evidenceClaimId}
                      </small>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>DETAIL</span>
                  <div>
                    <p>未設定もUnknownとして表示</p>
                    <h2>手数料・限度額・ポイント・保険・セキュリティ</h2>
                  </div>
                </div>
                {[
                  ["手数料・限度額", detail.researchCoverage.feesAndLimits],
                  ["ポイント詳細", detail.researchCoverage.rewardRules],
                  ["保険・セキュリティ", detail.researchCoverage.insuranceAndSecurity],
                ].map(([title, items]) => (
                  <div className={styles.factGroup} key={title as string}>
                    <h3>{title as string}</h3>
                    <dl className={styles.specList}>
                      {(
                        items as PrototypeCardDetail["researchCoverage"]["feesAndLimits"]
                      ).map((item) => (
                        <div key={item.label}>
                          <dt>{item.label}</dt>
                          <dd>
                            {item.value}
                            <small>
                              {item.disclosureStatus} / Claim: {item.evidenceClaimId}
                            </small>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>SERVICE</span>
                  <div>
                    <p>付帯内容を確認</p>
                    <h2>サービス・商品ライフサイクル</h2>
                  </div>
                </div>
                <div className={styles.serviceGrid}>
                  {detail.services.map((service) => (
                    <article key={service.id}>
                      <span aria-hidden="true">✓</span>
                      <div>
                        <strong>{service.name}</strong>
                        <p>{service.description}</p>
                        <small>
                          Claim:{" "}
                          {[
                            service.evidenceClaimId,
                            ...(service.supportingEvidenceClaimIds ?? []),
                          ].join(" / ")}
                        </small>
                        <small>
                          価値算定レビュー：
                          {service.valueReview.status}（{service.valueReview.reason}）
                        </small>
                      </div>
                    </article>
                  ))}
                </div>
                <div className={styles.lifecycleBox}>
                  <div>
                    <span>商品状態</span>
                    <strong>{detail.lifecycle.productStatus.value}</strong>
                    <small>
                      {detail.lifecycle.productStatus.disclosureStatus} / Claim:{" "}
                      {detail.lifecycle.productStatus.evidenceClaimId}
                    </small>
                  </div>
                  <div>
                    <span>申込状態</span>
                    <strong>{detail.lifecycle.applicationStatus.value}</strong>
                    <small>
                      {detail.lifecycle.applicationStatus.disclosureStatus} / Claim:{" "}
                      {detail.lifecycle.applicationStatus.evidenceClaimId}
                    </small>
                  </div>
                  <ol>
                    {detail.lifecycle.events.map((event) => (
                      <li key={`${event.date}-${event.target}`}>
                        <time dateTime={event.date}>{event.date}</time>
                        <strong>
                          {event.scope} / {event.target}
                        </strong>
                        <span>
                          {event.status}：{event.change}（公開 {event.publishedOn}／適用
                          {event.effectiveFrom}〜{event.effectiveTo}／Claim:{" "}
                          {event.evidenceClaimId}）
                          <br />
                          発表：
                          <UnknownValue value={event.announcedOn} />
                          ／取得：
                          <UnknownValue value={event.retrievedOn} />
                          ／遷移：
                          <UnknownValue value={event.fromStatus} /> →{" "}
                          <UnknownValue value={event.toStatus} />
                          ／対象：
                          <UnknownValue value={event.memberCohort} />
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <h3>後継関係・契約継続性</h3>
                <div className={styles.dataCardGrid}>
                  {detail.lifecycle.successorRelations.map((relation) => (
                    <article key={relation.successor}>
                      <strong>{relation.successor}</strong>
                      <p>契約継続：{relation.contractContinuity}</p>
                      <p>ポイント移行：{relation.rewardMigration}</p>
                      <p>自動切替：{relation.automaticSwitch}</p>
                      <small>
                        {relation.disclosureStatus} / Claim: {relation.evidenceClaimId}
                      </small>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${componentId}-panel-calculation`}
            aria-labelledby={`${componentId}-tab-calculation`}
            hidden={activeTab !== "calculation"}
            tabIndex={0}
          >
            <div className={styles.panelStack}>
              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>CALC</span>
                  <div>
                    <p>合計だけでなく根拠まで</p>
                    <h2>年間おトク目安の算定内訳</h2>
                  </div>
                </div>
                <div className={styles.assumptionBox}>
                  <strong>年間利用額</strong>
                  <p>{detail.calculation.annualSpend}</p>
                  <ul>
                    {detail.calculation.usageAssumptions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>採用した利用先・適用仮定</h3>
                  <dl>
                    {detail.calculation.appliedEligibilityAssumptions.map(
                      (assumption) => (
                        <div key={`${assumption.category}-${assumption.service}`}>
                          <dt>
                            {assumption.category}：{assumption.service}
                          </dt>
                          <dd>{assumption.conditions}</dd>
                          <dd>Claim: {assumption.evidenceClaimId}</dd>
                        </div>
                      ),
                    )}
                  </dl>
                </div>
                <div className={styles.calculationGrid}>
                  {[
                    {
                      title: "通常年",
                      rows: detail.calculation.regularYear,
                      total: card.regularYearValue,
                    },
                    {
                      title: "初年度",
                      rows: detail.calculation.firstYear,
                      total: card.firstYearValue,
                    },
                  ].map((group) => (
                    <article key={group.title}>
                      <h3>{group.title}</h3>
                      <dl>
                        {group.rows.map((row) => (
                          <div key={`${group.title}-${row.label}`}>
                            <dt>
                              {row.label}
                              <small>Claim: {row.evidenceClaimId}</small>
                            </dt>
                            <dd>
                              {row.operation === "minus" ? "−" : "＋"}
                              {yen.format(row.amount)}円
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
                <div className={styles.excludedBox}>
                  <h3>算定対象外・未確認項目</h3>
                  <p>対象外は「価値0円」と確定したものではありません。</p>
                  {detail.calculation.excludedItems.map((item) => (
                    <article key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.disclosureStatus}</span>
                      <p>{item.reason}</p>
                      <small>
                        {item.impact} / Claim: {item.evidenceClaimId} / 対象ID:{" "}
                        {item.sourceEntityIds.length > 0
                          ? item.sourceEntityIds.join(" / ")
                          : "個別Entityなし"}
                      </small>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.contentSection}>
                <div className={styles.sectionHeading}>
                  <span>EVIDENCE</span>
                  <div>
                    <p>Claim単位で追跡</p>
                    <h2>Evidence chain</h2>
                  </div>
                </div>
                <div className={styles.fixtureNotice}>
                  <strong>合成Fixture / no-evidence</strong>
                  <p>
                    以下はUI構造確認用です。実在する公式情報やTier
                    1〜3の証拠ではなく、URLも外部遷移しません。
                  </p>
                </div>
                <div className={styles.evidenceClaimList}>
                  {detail.evidenceClaims.map((evidence) => (
                    <article id={`${componentId}-${evidence.id}`} key={evidence.id}>
                      <div>
                        <strong>{evidence.claim}</strong>
                        <span>{evidence.calculationUse}</span>
                      </div>
                      <p>{evidence.value}</p>
                      <dl>
                        <div>
                          <dt>文書名</dt>
                          <dd>{evidence.sourceTitle}</dd>
                        </div>
                        <div>
                          <dt>発行主体</dt>
                          <dd>{evidence.publisher}</dd>
                        </div>
                        <div>
                          <dt>Source type / Tier</dt>
                          <dd>
                            {evidence.sourceType} / {evidence.tier}
                          </dd>
                        </div>
                        <div>
                          <dt>公開日 / 適用期間</dt>
                          <dd>
                            {evidence.publishedOn} / {evidence.effectivePeriod}
                          </dd>
                        </div>
                        <div>
                          <dt>取得日</dt>
                          <dd>{evidence.retrievedOn}</dd>
                        </div>
                        <div>
                          <dt>Confidence / Disclosure</dt>
                          <dd>
                            {evidence.confidence} / {evidence.disclosureStatus}
                          </dd>
                        </div>
                      </dl>
                      <SyntheticLink href={evidence.url}>
                        合成ソースURLを表示
                      </SyntheticLink>
                    </article>
                  ))}
                </div>
                <div className={styles.sourceLinks}>
                  <div>
                    <strong>商品・規約URL（合成）</strong>
                    <p>リンク形式のUIのみ確認できます。</p>
                  </div>
                  <ul>
                    <li>
                      <SyntheticLink href={detail.officialUrl}>
                        合成商品URL
                      </SyntheticLink>
                    </li>
                    <li>
                      <SyntheticLink href={detail.termsUrl}>合成規約URL</SyntheticLink>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${componentId}-panel-reviews`}
            aria-labelledby={`${componentId}-tab-reviews`}
            hidden={activeTab !== "reviews"}
            tabIndex={0}
          >
            <section className={styles.contentSection}>
              <div className={styles.sectionHeading}>
                <span>REVIEW</span>
                <div>
                  <p>利用者の声をチェック</p>
                  <h2>口コミ・レビュー</h2>
                </div>
              </div>
              {detail.reviewSummary.total > 0 &&
              detail.reviewSummary.average !== null ? (
                <div className={styles.reviewOverview}>
                  <div className={styles.reviewScore}>
                    <strong>{detail.reviewSummary.average.toFixed(1)}</strong>
                    <Stars rating={detail.reviewSummary.average} />
                    <span>{detail.reviewSummary.total}件の合成レビュー</span>
                  </div>
                  <div className={styles.reviewBars}>
                    {detail.reviewSummary.distributions.map((value, index) => (
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
                <div className={styles.reviewPolicy}>
                  <strong>公開レビューはまだありません</strong>
                  <p>
                    平均点と分布は、公開承認済みレビューが1件以上ある場合のみ表示します。
                  </p>
                </div>
              )}
              <div className={styles.reviewList}>
                {detail.reviewSummary.reviews.map((review) => (
                  <article key={review.title}>
                    <div>
                      <Stars rating={review.rating} />
                      <time dateTime={review.postedOn}>{review.postedOn}</time>
                    </div>
                    <h3>{review.title}</h3>
                    <p>{review.body}</p>
                    <small>
                      {review.profile}・
                      {review.verified ? "本人確認済み" : "本人確認なし"}・
                      {review.moderationStatus === "approved"
                        ? "公開承認済み"
                        : review.moderationStatus}
                    </small>
                    <details className={styles.reportMock}>
                      <summary>ログインしてこのレビューを通報</summary>
                      <p>対象Review：{review.title}</p>
                      <label>
                        理由
                        <select defaultValue="">
                          <option value="" disabled>
                            選択してください
                          </option>
                          <option>不正確な内容</option>
                          <option>不適切な表現</option>
                          <option>個人情報を含む</option>
                          <option>Spam・宣伝</option>
                          <option>その他</option>
                        </select>
                      </label>
                      <label>
                        任意説明
                        <textarea rows={3} placeholder="詳細を入力（任意）" />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setReviewMessage(
                            `「${review.title}」の通報にはログインが必要です。UIモックのため送信されません。`,
                          )
                        }
                      >
                        通報内容を確認
                      </button>
                    </details>
                  </article>
                ))}
              </div>
              <div className={styles.reviewPolicy}>
                <strong>レビュー掲載方針</strong>
                <p>
                  表示例 {detail.reviewSummary.displayedCount}件／総数{" "}
                  {detail.reviewSummary.total}件。収集期間：
                  {detail.reviewSummary.collectionPeriod}
                </p>
                <p>{detail.reviewSummary.moderationPolicy}</p>
                <p>
                  レビューは利用者投稿を想定した情報で、公式情報ではありません。算定額・検索順位・記事選定には影響しません。
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setReviewMessage(
                      "ログイン利用者向け投稿・編集フォームはUIモックです。",
                    )
                  }
                >
                  ログインしてレビューを投稿・編集
                </button>
                {reviewMessage && <p role="status">{reviewMessage}</p>}
              </div>
            </section>
          </div>

          <div
            role="tabpanel"
            id={`${componentId}-panel-cautions`}
            aria-labelledby={`${componentId}-tab-cautions`}
            hidden={activeTab !== "cautions"}
            tabIndex={0}
          >
            <section className={styles.cautions}>
              <div className={styles.sectionHeading}>
                <span>CHECK</span>
                <div>
                  <p>大切な確認ポイント</p>
                  <h2>注意事項・算定条件</h2>
                </div>
              </div>
              <ul>
                {detail.cautions.map((caution) => (
                  <li key={caution}>{caution}</li>
                ))}
              </ul>
              <p className={styles.dataNote}>
                注意事項のClaim: {detail.cautionsEvidenceClaimId}
              </p>
              <dl className={styles.verificationDetail}>
                <div>
                  <dt>情報確認日</dt>
                  <dd>{card.confirmedOn}</dd>
                </div>
                <div>
                  <dt>算定状態</dt>
                  <dd>{card.stateLabel}</dd>
                </div>
                <div>
                  <dt>Evidence</dt>
                  <dd>{detail.evidenceStatus.sourceTier}</dd>
                </div>
                <div>
                  <dt>Confidence</dt>
                  <dd>{detail.evidenceStatus.confidence}</dd>
                </div>
              </dl>
              <div className={styles.evidenceStatus}>
                <section>
                  <h3>未確認・未開示の情報</h3>
                  <ul>
                    {detail.evidenceStatus.unknowns.map((unknown) => (
                      <li key={unknown}>{unknown}</li>
                    ))}
                  </ul>
                  <p>
                    確認できない要素は算定対象外とし、結果を「算定不完全」または「変更確認中」と表示します。実際の価値や順位が変わる可能性があります。
                  </p>
                </section>
              </div>
              <div className={styles.fixtureNotice}>
                <strong>UI-only Mock</strong>
                <p>
                  カード名・会社・還元率・特典・レビュー・URLはすべて架空です。公式・規約・出典のリンク先も証拠ではありません。
                </p>
              </div>
              <div className={styles.affiliatePolicy}>
                <strong>広告・アフィリエイトについて</strong>
                <p>
                  申込ボタンは広告UIのモックです。広告掲載や報酬額は、おすすめ順位・算定結果・レビュー掲載に影響しません。
                </p>
              </div>
            </section>
          </div>
        </div>

        <aside className={styles.sideColumn} aria-label="カード申込と補助情報">
          <div className={styles.sideCta}>
            <span>おすすめカードを見つけたら</span>
            <h2>
              申込条件を
              <br />
              最終確認
            </h2>
            {primaryRoute ? (
              <>
                <p>
                  {primaryRoute.label}：{primaryRoute.eligibility}
                </p>
                <p className={styles.ctaCondition}>
                  対応確認：{affiliateStatusLabel(primaryRoute.affiliateStatus)}
                  ／条件差：
                  {primaryRoute.affiliateCondition}（
                  {primaryRoute.conditionDisclosureStatus}）
                </p>
                <AffiliateButton
                  className={styles.sideAffiliateButton}
                  wrapperClassName={styles.affiliateButtonWrap}
                  href={primaryRoute.affiliateUrl!}
                  routeLabel={primaryRoute.label}
                />
                <small>広告UI・外部遷移なし</small>
              </>
            ) : (
              <p>現在利用できる一般申込経路はありません。</p>
            )}
          </div>
          <div className={styles.sideGuide}>
            <strong>ほかのカードも比較する</strong>
            <p>利用額と使い方から、最大5枚を同じ条件で比べられます。</p>
            <Link href="/search">自分の条件で判定する →</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
