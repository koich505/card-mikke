import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import { featuredCards, newsItems, recommendedArticles } from "@/fixtures/home";
import styles from "./page.module.css";

const yen = new Intl.NumberFormat("ja-JP");

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        本文へ移動
      </a>

      <SiteHeader currentPage="home" />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroDots} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>カード選びを、もっと楽しく・かんたんに！</p>
              <h1 id="hero-title">
                あなたに合う1枚、
                <span>ここでみっけ。</span>
              </h1>
              <p className={styles.heroLead}>
                いつもの利用額と使い方を選ぶだけ。
                <br />
                年会費や還元額を比べて、ぴったりのカードを見つけよう。
              </p>
              <div className={styles.heroActions}>
                <Link href="/search" className={styles.primaryButton}>
                  かんたん検索をはじめる <span>→</span>
                </Link>
                <a href="#how-it-works" className={styles.textLink}>
                  使い方を見る <span>⌄</span>
                </a>
              </div>
              <ul className={styles.heroBenefits}>
                <li>
                  <span>✓</span>登録なしでOK
                </li>
                <li>
                  <span>★</span>最大3枚を比較
                </li>
                <li>
                  <span>◷</span>最短30秒
                </li>
              </ul>
            </div>

            <div className={styles.heroVisual} aria-hidden="true">
              <span className={styles.sparkleOne}>✦</span>
              <span className={styles.sparkleTwo}>✦</span>
              <div className={styles.cardBack}>
                <span />
              </div>
              <div className={styles.cardFront}>
                <span className={styles.heroChip} />
                <small>CARD MIKKE</small>
                <strong>GOOD MATCH</strong>
              </div>
              <div className={styles.matchBadge}>
                <strong>BEST</strong>
                <span>MATCH!</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.howItWorks}
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <div className={styles.sectionIntro}>
            <p>かんたん2STEP</p>
            <h2 id="how-title">迷わず、自分に合うカードへ</h2>
            <span>むずかしい知識や細かな入力は必要ありません。</span>
          </div>
          <ol className={styles.steps}>
            <li>
              <span>1</span>
              <div>
                <small>STEP 1</small>
                <strong>利用額を選ぶ</strong>
                <p>月間または年間から、近い金額を選択。</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <small>STEP 2</small>
                <strong>使い方を選ぶ</strong>
                <p>旅行、買い物、ポイントなどから選択。</p>
              </div>
            </li>
            <li className={styles.stepGoal}>
              <span>✓</span>
              <div>
                <small>RESULT</small>
                <strong>おすすめを確認</strong>
                <p>条件に合うカードを最大3枚で比較。</p>
              </div>
            </li>
          </ol>
          <Link href="/search" className={styles.inlineCta}>
            さっそくカードを探す <span>→</span>
          </Link>
        </section>

        <section
          className={styles.featured}
          id="featured"
          aria-labelledby="featured-title"
        >
          <div className={styles.sectionTitleRow}>
            <div>
              <p className={styles.sectionKicker}>いま見てほしい！</p>
              <h2 id="featured-title">注目のカードをチェック</h2>
              <span>年会費・基本還元・年間のおトク目安をまとめて比較できます。</span>
            </div>
            <Link href="/search">あなたの条件で探す →</Link>
          </div>

          <div className={styles.cardGrid}>
            {featuredCards.map((card, index) => (
              <article className={styles.featureCard} key={card.id}>
                <div className={styles.cardTopline}>
                  <span className={styles.rank}>
                    <small>PICK</small>
                    <strong>{index + 1}</strong>
                  </span>
                  <p>{card.label}</p>
                </div>
                <div
                  className={`${styles.cardVisual} ${styles[`card_${card.accent}`]}`}
                  aria-hidden="true"
                >
                  <div>
                    <small>CARD MIKKE</small>
                    <span>)))</span>
                  </div>
                  <span className={styles.featureChip} />
                  <strong>{card.name}</strong>
                </div>
                <div className={styles.cardHeading}>
                  <h3>{card.name}</h3>
                  <p>{card.issuer}</p>
                </div>
                <div className={styles.valueBox}>
                  <span>通常年のおトク目安</span>
                  <p>
                    <strong>{yen.format(card.regularYearValue)}</strong>円
                  </p>
                  <small>初年度 {yen.format(card.firstYearValue)}円</small>
                </div>
                <ul className={styles.cardFacts}>
                  <li>
                    <span>¥</span>
                    <div>
                      <small>年会費</small>
                      <strong>{card.annualFeeLabel.replace("年会費 ", "")}</strong>
                    </div>
                  </li>
                  <li>
                    <span>%</span>
                    <div>
                      <small>基本還元</small>
                      <strong>{card.baseRewardLabel.replace("基本還元 ", "")}</strong>
                    </div>
                  </li>
                </ul>
                <div className={styles.cardState} data-state={card.state}>
                  <span>✓</span>
                  <div>
                    <strong>{card.stateLabel}</strong>
                    <small>確認日 {card.confirmedOn}</small>
                  </div>
                </div>
                <button type="button" className={styles.detailButton}>
                  カードの詳細を見る <span>→</span>
                </button>
              </article>
            ))}
          </div>
          <p className={styles.fixtureNote}>掲載内容はUI確認用の合成データです。</p>
        </section>

        <section className={styles.searchBanner} aria-labelledby="search-banner-title">
          <div className={styles.searchBannerMark} aria-hidden="true">
            ?
          </div>
          <div>
            <p>どのカードが合うかわからない？</p>
            <h2 id="search-banner-title">いつもの使い方から探してみよう</h2>
            <span>利用額とタイプを選ぶだけ。こだわり条件も設定できます。</span>
          </div>
          <Link href="/search" className={styles.bannerButton}>
            カードを探す <span>→</span>
          </Link>
        </section>

        <section
          className={styles.articles}
          id="articles"
          aria-labelledby="articles-title"
        >
          <div className={styles.sectionTitleRow}>
            <div>
              <p className={styles.sectionKicker}>読むだけでもわかる！</p>
              <h2 id="articles-title">おすすめ特集記事</h2>
              <span>カード選びのポイントを、やさしく整理しました。</span>
            </div>
          </div>
          <div className={styles.articleGrid}>
            {recommendedArticles.map((article, index) => (
              <article className={styles.articleCard} key={article.id}>
                <div
                  className={styles.articleVisual}
                  data-index={index}
                  aria-hidden="true"
                >
                  <span>{index === 0 ? "買" : index === 1 ? "初" : "知"}</span>
                  <strong>GUIDE</strong>
                </div>
                <div className={styles.articleBody}>
                  <div className={styles.articleMeta}>
                    <span>{article.kind}</span>
                    <time dateTime={article.updatedOn}>更新 {article.updatedOn}</time>
                  </div>
                  <p>{article.audience}</p>
                  <h3>{article.title}</h3>
                  <small>{article.description}</small>
                  <button type="button">
                    この記事を読む <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.newsAndTrust}>
          <div className={styles.news} aria-labelledby="news-title">
            <div className={styles.miniHeading}>
              <span>NEW</span>
              <h2 id="news-title">新着情報</h2>
            </div>
            <ul>
              {newsItems.map((item) => (
                <li key={item.id}>
                  <time dateTime={item.publishedOn}>{item.publishedOn}</time>
                  <span>{item.kind}</span>
                  <button type="button">{item.title}</button>
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.trust} id="trust" aria-labelledby="trust-title">
            <p>安心して比べるために</p>
            <h2 id="trust-title">おトクだけで、あおりません。</h2>
            <ul>
              <li>年間正味還元額は入力と仮定に基づく目安</li>
              <li>確認できない条件は推測せず状態を表示</li>
              <li>広告・Affiliate関係は申込前に明示</li>
            </ul>
            <button type="button">算定方法・掲載方針を見る →</button>
          </aside>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span>C</span>
          <strong>カードみっけ</strong>
        </div>
        <p>UI-only Mock — 合成Fixtureのみを使用しています。</p>
        <nav aria-label="フッターナビゲーション">
          <a href="#trust">掲載範囲</a>
          <a href="#trust">広告方針</a>
          <button type="button">誤情報を指摘</button>
        </nav>
      </footer>
    </div>
  );
}
