import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import { cardDetails, featuredCards } from "@/fixtures/home";
import AffiliateButton from "./affiliate-button";
import CardDetailTabs from "./card-detail-tabs";
import styles from "./card-detail.module.css";

const yen = new Intl.NumberFormat("ja-JP");

const affiliateStatusLabel = (
  status:
    "correspondence_unverified" | "verified_same" | "verified_different" | "inactive",
) =>
  ({
    correspondence_unverified: "公式申込との差異は未確認",
    verified_same: "公式申込と同条件を確認済み",
    verified_different: "公式申込との条件差を確認済み",
    inactive: "アフィリエイト対象外",
  })[status];

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredCards.map((card) => ({ id: card.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const card = featuredCards.find((item) => item.id === id);
  const detail = cardDetails[id as keyof typeof cardDetails];
  if (!card || !detail) return {};

  return {
    title: `${card.name}の詳細・還元・特典 | カードみっけ`,
    description: `${card.name}の年会費、還元、キャンペーン、申込経路、算定内訳、Evidence、レビューを確認できるUIモックです。状態：${card.stateLabel}、確認日：${card.confirmedOn}。`,
    alternates: { canonical: `/cards/${card.id}` },
    openGraph: {
      title: `${card.name}の詳細 | カードみっけ`,
      description: `${detail.summary} 状態：${card.stateLabel}、確認日：${card.confirmedOn}。`,
      type: "article",
      url: `/cards/${card.id}`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = featuredCards.find((item) => item.id === id);
  const detail = cardDetails[id as keyof typeof cardDetails];

  if (!card || !detail) notFound();

  const relatedCards = featuredCards.filter((item) => item.id !== card.id);
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

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#card-detail-main">
        本文へ移動
      </a>

      <SiteHeader currentPage="card" />

      <main id="card-detail-main">
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <ol>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href="/search">カードを探す</Link>
            </li>
            <li aria-current="page">{card.name}</li>
          </ol>
        </nav>

        <section className={styles.hero} aria-labelledby="card-title">
          <div className={styles.heroTopline}>
            <p>{card.label}</p>
            <div className={styles.verification} data-state={card.state}>
              <span aria-hidden="true">✓</span>
              <div>
                <strong>{card.stateLabel}</strong>
                <small>
                  Evidence取得日{" "}
                  <time dateTime={detail.evidenceStatus.retrievedOn}>
                    {detail.evidenceStatus.retrievedOn}
                  </time>
                </small>
              </div>
            </div>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.cardStage}>
              <span className={styles.sparkleOne} aria-hidden="true">
                ✦
              </span>
              <span className={styles.sparkleTwo} aria-hidden="true">
                ✦
              </span>
              <div
                className={`${styles.cardVisual} ${styles[`card_${card.accent}`]}`}
                role="img"
                aria-label={`${card.name}のカード券面イメージ`}
              >
                <div>
                  <small>CARD MIKKE</small>
                  <span aria-hidden="true">)))</span>
                </div>
                <span className={styles.cardChip} aria-hidden="true" />
                <strong>{card.name}</strong>
                <small>GOOD FOR YOUR EVERYDAY</small>
              </div>
              <span className={styles.mockLabel}>合成カードイメージ</span>
            </div>

            <div className={styles.heroCopy}>
              <p className={styles.issuer}>{card.issuer}</p>
              <small>Claim: {card.issuerEvidenceClaimId}</small>
              <h1 id="card-title">{card.name}</h1>
              <h2>{detail.catchCopy}</h2>
              <p className={styles.summary}>{detail.summary}</p>
              <p className={styles.editorialNote}>
                <strong>編集要約</strong>
                {detail.editorialContext.nature} 根拠Claim:{" "}
                {detail.editorialContext.sourceClaimIds.join(" / ")}
                。おすすめ判定・おトク試算には直接使用しません。
              </p>
              <ul className={styles.quickFacts}>
                <li>
                  <span>年会費</span>
                  <strong>{card.annualFeeLabel.replace("年会費 ", "")}</strong>
                  <small>Claim: {card.annualFeeEvidenceClaimId}</small>
                </li>
                <li>
                  <span>基本還元</span>
                  <strong>{card.baseRewardLabel.replace("基本還元 ", "")}</strong>
                  <small>Claim: {card.baseRewardEvidenceClaimId}</small>
                </li>
              </ul>
            </div>

            <aside className={styles.valuePanel} aria-label="おトク目安">
              <p>通常年のおトク目安</p>
              <strong>
                {yen.format(card.regularYearValue)}
                <small>円／年</small>
              </strong>
              <div>
                <span>初年度</span>
                <b>{yen.format(card.firstYearValue)}円</b>
              </div>
              <small>合成条件によるUI確認用の試算です</small>
              <small>算定Claim: {card.valueEvidenceClaimIds.join(" / ")}</small>
              {primaryRoute ? (
                <>
                  <p className={styles.ctaCondition}>
                    対象経路：{primaryRoute.label}／対応確認：
                    {affiliateStatusLabel(primaryRoute.affiliateStatus)}
                    ／条件差：{primaryRoute.affiliateCondition}（
                    {primaryRoute.conditionDisclosureStatus}）
                  </p>
                  <AffiliateButton
                    className={styles.heroAffiliateButton}
                    wrapperClassName={styles.affiliateButtonWrap}
                    href={primaryRoute.affiliateUrl!}
                    routeLabel={primaryRoute.label}
                  />
                </>
              ) : (
                <p>現在利用できる申込経路はありません。</p>
              )}
              <p className={styles.heroDisclosure} id="affiliate-disclosure">
                広告を含みます
              </p>
              <Link href="/search" className={styles.heroSearchLink}>
                自分の条件で比較する
              </Link>
            </aside>
          </div>
          <div className={styles.heroStateNotice} data-state={card.state}>
            <div>
              <strong>{card.stateLabel}</strong>
              <span>
                最終確認日 <time dateTime={card.confirmedOn}>{card.confirmedOn}</time>
              </span>
            </div>
            <p>
              未確認要素は算定対象外です。0円の価値があるとは確定せず、表示額の過小評価や順位変更の可能性を明示しています。
            </p>
            <ul>
              {detail.calculation.excludedItems.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>：{item.reason}（{item.impact}）
                </li>
              ))}
            </ul>
            {detail.evidenceStatus.changeReview && (
              <dl className={styles.changeReviewSummary}>
                <div>
                  <dt>変更対象</dt>
                  <dd>{detail.evidenceStatus.changeReview.target}</dd>
                </div>
                <div>
                  <dt>旧承認値・確認日</dt>
                  <dd>
                    {detail.evidenceStatus.changeReview.previousApprovedValue}（
                    {detail.evidenceStatus.changeReview.previousConfirmedOn}）
                  </dd>
                </div>
                <div>
                  <dt>暫定算定</dt>
                  <dd>{detail.evidenceStatus.changeReview.calculationTreatment}</dd>
                </div>
                <div>
                  <dt>新候補・影響</dt>
                  <dd>
                    {detail.evidenceStatus.changeReview.candidateValue}／
                    {detail.evidenceStatus.changeReview.impact}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </section>

        <CardDetailTabs card={card} detail={detail} />

        <section className={styles.related} aria-labelledby="related-title">
          <div className={styles.relatedHeading}>
            <div>
              <p>ほかの候補も見てみる</p>
              <h2 id="related-title">あわせてチェックしたいカード</h2>
            </div>
            <Link href="/search">すべての候補を見る →</Link>
          </div>
          <div className={styles.relatedGrid}>
            {relatedCards.map((relatedCard) => (
              <article key={relatedCard.id}>
                <div
                  className={`${styles.miniCard} ${styles[`card_${relatedCard.accent}`]}`}
                  aria-hidden="true"
                >
                  <span />
                  <strong>{relatedCard.name}</strong>
                </div>
                <div>
                  <p>{relatedCard.label}</p>
                  <h3>{relatedCard.name}</h3>
                  <small>
                    {relatedCard.annualFeeLabel}・{relatedCard.baseRewardLabel}
                  </small>
                  <Link href={`/cards/${relatedCard.id}`}>詳細を見る →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerBrand}>
          <span aria-hidden="true">C</span>
          <strong>カードみっけ</strong>
        </Link>
        <p>UI-only Mock — 合成Fixtureのみを使用しています。</p>
        <nav aria-label="フッターナビゲーション">
          <Link href="/">トップページ</Link>
          <Link href="/search">カードを探す</Link>
          <Link href="/#trust">掲載方針</Link>
          <details>
            <summary>誤情報を指摘</summary>
            <p>{card.name}の指摘フォームはUIモックです。送信は行いません。</p>
          </details>
        </nav>
      </footer>
    </div>
  );
}
