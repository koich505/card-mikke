import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import { featureArticles, findFeatureArticle } from "@/fixtures/articles";
import { correctionReportHref } from "@/fixtures/correction-report";
import { featuredCards } from "@/fixtures/home";
import type { PrototypeFeatureArticle } from "@/types/article-prototype";
import type { PrototypeCardId } from "@/types/ui-prototype";
import styles from "./article.module.css";

const yen = new Intl.NumberFormat("ja-JP");

const mockPointPrograms: Record<
  PrototypeCardId,
  { name: string; mark: string; tone: "pay" | "vpoint" | "mile" }
> = {
  "everyday-plus": { name: "PayPayポイント風（仮）", mark: "P", tone: "pay" },
  "travel-step": { name: "マイルポイント風（仮）", mark: "M", tone: "mile" },
  "smart-basic": { name: "Vポイント風（仮）", mark: "V", tone: "vpoint" },
  "daily-light": { name: "PayPayポイント風（仮）", mark: "P", tone: "pay" },
  "journey-flex": { name: "マイルポイント風（仮）", mark: "M", tone: "mile" },
  "simple-choice": { name: "Vポイント風（仮）", mark: "V", tone: "vpoint" },
  "long-name-edge": { name: "PayPayポイント風（仮）", mark: "P", tone: "pay" },
};

export function generateStaticParams() {
  return featureArticles.map((article) => ({ id: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[id]">): Promise<Metadata> {
  const { id } = await params;
  const article = findFeatureArticle(id);
  if (!article) return {};

  return {
    title: `${article.title} | カードみっけ`,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `/articles/${article.slug}`,
    },
    robots: { index: false, follow: false },
  };
}

function cardById(id: PrototypeCardId) {
  const card = featuredCards.find((item) => item.id === id);
  if (!card) throw new Error(`Article fixture references unknown card: ${id}`);
  return card;
}

function PatternContent({ article }: { article: PrototypeFeatureArticle }) {
  if (article.type === "purpose") {
    return (
      <section className={styles.patternPanel} aria-labelledby="selection-title">
        <p className={styles.panelKicker}>SELECTION GUIDE</p>
        <h2 id="selection-title">今回の選定基準</h2>
        <ol className={styles.criteriaList}>
          {article.selectionCriteria.map((criterion) => (
            <li key={criterion}>{criterion}</li>
          ))}
        </ol>
        <div className={styles.reasonGrid}>
          {article.candidateReasons.map((candidate) => {
            const card = cardById(candidate.cardId);
            return (
              <div key={candidate.cardId}>
                <strong>{card.name}</strong>
                <p>{candidate.reason}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (article.type === "single-card") {
    const target = cardById(article.targetCardId);
    return (
      <section className={styles.patternPanel} aria-labelledby="feature-title">
        <p className={styles.panelKicker}>CARD FEATURE</p>
        <h2 id="feature-title">{target.name}の確認ポイント</h2>
        <div className={styles.tripleGrid}>
          <div>
            <h3>特徴</h3>
            <ul>
              {article.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>適用条件</h3>
            <ul>
              {article.conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>変更点</h3>
            <ul>
              {article.changes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.patternPanel} aria-labelledby="map-title">
      <p className={styles.panelKicker}>TWO-AXIS MAP</p>
      <h2 id="map-title">2つの基準で位置を確認</h2>
      <dl className={styles.axisDefinition}>
        <div>
          <dt>横軸：{article.axes.horizontal.name}</dt>
          <dd>{article.axes.horizontal.criterion}</dd>
        </div>
        <div>
          <dt>縦軸：{article.axes.vertical.name}</dt>
          <dd>{article.axes.vertical.criterion}</dd>
        </div>
      </dl>
      <div className={styles.map} aria-hidden="true">
        <span className={styles.axisNameY}>{article.axes.vertical.name}</span>
        <span className={styles.axisNameX}>{article.axes.horizontal.name}</span>
        <span className={styles.yHigh}>{article.axes.vertical.high}</span>
        <span className={styles.yLow}>{article.axes.vertical.low}</span>
        <span className={styles.xLow}>{article.axes.horizontal.low}</span>
        <span className={styles.xHigh}>{article.axes.horizontal.high}</span>
        {article.placements.map((placement) => {
          const card = cardById(placement.cardId);
          const positionStyle = {
            "--map-x": `${placement.x}%`,
            "--map-y": `${placement.y}%`,
          } as CSSProperties;
          return (
            <span
              className={styles.mapCard}
              key={placement.cardId}
              style={positionStyle}
            >
              <span className={styles.mapCardFace} data-accent={card.accent}>
                <small>CARD MIKKE</small>
                <i aria-hidden="true" />
                <strong>{card.name}</strong>
              </span>
            </span>
          );
        })}
      </div>
      <div className={styles.mapAlternative}>
        <h3>位置関係のテキスト説明</h3>
        <ul>
          {article.textAlternative.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: PageProps<"/articles/[id]">) {
  const { id } = await params;
  const article = findFeatureArticle(id);
  if (!article) notFound();
  const related = article.relatedCards.map((item) => ({
    ...item,
    card: cardById(item.cardId),
  }));

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#article-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="article" />
      <main id="article-main">
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <ol>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href="/articles">特集記事</Link>
            </li>
            <li aria-current="page">{article.title}</li>
          </ol>
        </nav>

        <article>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <div className={styles.meta}>
                <span>{article.kindLabel}</span>
                <time dateTime={article.updatedOn}>更新 {article.updatedOn}</time>
              </div>
              <p className={styles.audience}>{article.audience}</p>
              <h1>{article.title}</h1>
              <p className={styles.description}>{article.description}</p>
              {article.publicationState === "change-under-review" ? (
                <p className={styles.reviewNotice} role="note">
                  更新確認中：これは公開済みの旧記事です。最終確認日{" "}
                  {article.confirmedOn}
                  。申込前には公式情報を確認してください。
                </p>
              ) : null}
            </div>
            <div
              className={styles.visual}
              data-theme={article.visualTheme}
              role="img"
              aria-label={`${article.kindLabel}を表す装飾イメージ`}
            >
              <span className={styles.visualIcon}>
                {article.type === "purpose"
                  ? "買"
                  : article.type === "single-card"
                    ? "C"
                    : "↗"}
              </span>
              <strong>
                {article.type === "purpose"
                  ? "SHOPPING GUIDE"
                  : article.type === "single-card"
                    ? "CARD FEATURE"
                    : "COMPARE MAP"}
              </strong>
              <i />
              <i />
            </div>
          </header>

          <div className={styles.contentLayout}>
            <aside className={styles.toc} aria-labelledby="toc-title">
              <h2 id="toc-title">この記事の内容</h2>
              <ol>
                {article.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
                <li>
                  <a href="#pattern">記事の比較ポイント</a>
                </li>
                <li>
                  <a href="#comparison">関連カード比較</a>
                </li>
                <li>
                  <a href="#related-cards">カード詳細</a>
                </li>
              </ol>
            </aside>
            <div className={styles.articleBody}>
              {article.sections.map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <div id="pattern">
                <PatternContent article={article} />
              </div>
            </div>
          </div>

          <section
            className={styles.comparison}
            id="comparison"
            aria-labelledby="comparison-title"
          >
            <div className={styles.sectionHeading}>
              <p>QUICK COMPARISON</p>
              <h2 id="comparison-title">関連カードをかんたん比較</h2>
              <span>
                記事を読むときの参考情報です。本格的な比較候補には追加されません。
              </span>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <caption>
                  関連カードの年会費、貯まるポイントと基本還元、通常年のおトク目安、確認日
                </caption>
                <thead>
                  <tr>
                    <th scope="col">比較項目</th>
                    {related.map(({ card }) => (
                      <th scope="col" key={card.id}>
                        {card.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">年会費</th>
                    {related.map(({ card }) => (
                      <td key={card.id} data-label={card.name}>
                        {card.annualFeeLabel.replace("年会費 ", "")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">ポイント・基本還元</th>
                    {related.map(({ card }) => {
                      const program = mockPointPrograms[card.id];
                      return (
                        <td key={card.id} data-label={card.name}>
                          <span className={styles.pointProgram}>
                            <span
                              className={styles.pointIcon}
                              data-tone={program.tone}
                              aria-hidden="true"
                            >
                              {program.mark}
                            </span>
                            <span className={styles.srOnly}>{program.name}</span>
                            <strong>
                              {card.baseRewardLabel.replace("基本還元 ", "")}
                            </strong>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <th scope="row">通常年のおトク目安</th>
                    {related.map(({ card }) => (
                      <td key={card.id} data-label={card.name}>
                        <strong>{yen.format(card.regularYearValue)}円</strong>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">確認日</th>
                    {related.map(({ card }) => (
                      <td key={card.id} data-label={card.name}>
                        <time dateTime={card.confirmedOn}>{card.confirmedOn}</time>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section
            className={styles.related}
            id="related-cards"
            aria-labelledby="related-title"
          >
            <div className={styles.sectionHeading}>
              <p>NEXT STEP</p>
              <h2 id="related-title">関連カードの詳細を見る</h2>
              <span>算定条件や特典、申込前の確認事項はカード詳細で確認できます。</span>
            </div>
            <div className={styles.cardGrid}>
              {related.map(({ reason, card }) => (
                <article className={styles.card} key={card.id}>
                  <div
                    className={styles.miniCard}
                    data-accent={card.accent}
                    aria-hidden="true"
                  >
                    <small>CARD MIKKE</small>
                    <strong>{card.name}</strong>
                  </div>
                  <p className={styles.cardReason}>{reason}</p>
                  <h3>{card.name}</h3>
                  <small>{card.issuer}</small>
                  <dl>
                    <div>
                      <dt>年会費</dt>
                      <dd>{card.annualFeeLabel.replace("年会費 ", "")}</dd>
                    </div>
                    <div>
                      <dt>基本還元</dt>
                      <dd>{card.baseRewardLabel.replace("基本還元 ", "")}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/cards/${card.id}`}
                    aria-label={`${card.name}のカード詳細を見る`}
                  >
                    カードの詳細を見る <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <footer className={styles.articleFooter}>
            <strong>記事情報と注意事項</strong>
            <p>
              内容確認日：
              <time dateTime={article.confirmedOn}>{article.confirmedOn}</time>
            </p>
            <ul>
              {article.cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
            <p>
              UI-only Mock —
              掲載内容はすべて合成データです。広告・Affiliate報酬の有無や金額は、記事の選定理由・比較順・配置に影響しません。
            </p>
            <div className={styles.reportPrompt}>
              <div>
                <strong>記事の内容に誤りや変更がありますか？</strong>
                <p>
                  この記事と「記事情報と注意事項」を対象にしてお知らせいただけます。
                </p>
              </div>
              <Link
                href={correctionReportHref(
                  "article",
                  article.slug,
                  "記事情報と注意事項",
                )}
              >
                この情報の誤りを指摘する
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <footer className={styles.siteFooter}>
        <Link href="/" className={styles.footerBrand}>
          <span aria-hidden="true">C</span>
          <strong>カードみっけ</strong>
        </Link>
        <p>UI-only Mock — 合成Fixtureのみを使用しています。</p>
        <nav aria-label="フッターナビゲーション">
          <Link href="/">トップページ</Link>
          <Link href="/search">カードを探す</Link>
          <Link href="/#articles">特集記事</Link>
          <Link href={correctionReportHref("article", article.slug)}>誤情報を指摘</Link>
        </nav>
      </footer>
    </div>
  );
}
