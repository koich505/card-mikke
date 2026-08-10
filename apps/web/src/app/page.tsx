import { featuredCards, newsItems, recommendedArticles } from "@/fixtures/home";
import styles from "./page.module.css";

const yen = new Intl.NumberFormat("ja-JP");

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        本文へ移動
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a
            className={styles.brand}
            href="#featured"
            aria-label="カード比較くん ホーム"
          >
            <span className={styles.brandBurst} aria-hidden="true">
              比較！
            </span>
            <span className={styles.brandName}>カード比較くん</span>
          </a>

          <nav className={styles.primaryNav} aria-label="メインナビゲーション">
            <a href="#featured">注目カード</a>
            <a href="#quick-start">カードを探す</a>
            <a href="#articles">特集記事</a>
            <a href="#trust">サイト方針</a>
          </nav>

          <div className={styles.utilityActions}>
            <button type="button" aria-label="お気に入り。現在0件">
              ★ お気に入り <span>0</span>
            </button>
            <button type="button">ログイン</button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section
          className={styles.featured}
          id="featured"
          aria-labelledby="featured-title"
        >
          <div className={styles.featuredHeader}>
            <div className={styles.featuredIntro}>
              <p className={styles.resultBadge}>注目カード</p>
              <h2 id="featured-title">
                いま見てほしい<span>カード</span>を集めました
              </h2>
              <p className={styles.featuredLead}>
                年会費、還元額、確認状態を並べて、気になる3枚を見比べられます。
              </p>
              <ul className={styles.criteriaList} aria-label="表示している比較項目">
                <li>年会費</li>
                <li>年間正味還元額</li>
                <li>通常年・初年度</li>
                <li>確認状態</li>
              </ul>
            </div>
            <aside className={styles.featuredSummary} aria-label="注目カードの表示概要">
              <span>今回の注目候補</span>
              <p>
                <strong>{featuredCards.length}</strong>枚
              </p>
              <small>すべて合成データ</small>
            </aside>
          </div>

          <p className={styles.selectionNote}>
            個人条件による順位ではありません。UIの状態表示を確認する編集枠です。
          </p>

          <div className={styles.cardGrid}>
            {featuredCards.map((card, index) => (
              <article
                className={`${styles.featureCard} ${styles[`accent_${card.accent}`]}`}
                key={card.id}
              >
                <div className={styles.cardRank} aria-label={`${index + 1}件目`}>
                  <span>PICK</span>
                  <strong>{index + 1}</strong>
                  <small>位</small>
                </div>
                <p className={styles.cardHighlight}>{card.label}</p>
                <div
                  className={styles.cardVisual}
                  aria-label={`${card.name}の抽象券面`}
                >
                  <div className={styles.cardVisualTop}>
                    <span>CARD HIKAKU</span>
                    <span className={styles.contactlessMark} aria-hidden="true">
                      )))
                    </span>
                  </div>
                  <span className={styles.cardChip} aria-hidden="true" />
                  <span className={styles.cardNumber} aria-hidden="true">
                    •••• •••• •••• {String(index + 1).padStart(4, "0")}
                  </span>
                  <small>UI PROTOTYPE</small>
                </div>
                <div className={styles.cardIntro}>
                  <h3>{card.name}</h3>
                  <p className={styles.issuer}>{card.issuer}</p>
                  <p className={styles.cardReason}>{card.reason}</p>
                </div>
                <div className={styles.valueBox}>
                  <span>表示中の条件での目安</span>
                  <p>
                    <strong>{yen.format(card.regularYearValue)}</strong>円<b> おトク</b>
                  </p>
                  <small>
                    通常年の年間正味還元額 ・ 初年度 {yen.format(card.firstYearValue)}円
                  </small>
                </div>
                <div className={styles.cardInfoGrid}>
                  <div className={styles.infoTile}>
                    <span className={styles.infoIcon} aria-hidden="true">
                      ¥
                    </span>
                    <small>年会費</small>
                    <strong>{card.annualFeeLabel.replace("年会費 ", "")}</strong>
                  </div>
                  <div className={styles.infoTile}>
                    <span className={styles.infoIcon} aria-hidden="true">
                      %
                    </span>
                    <small>基本還元</small>
                    <strong>{card.baseRewardLabel.replace("基本還元 ", "")}</strong>
                  </div>
                  <div
                    className={`${styles.infoTile} ${styles.state} ${styles[`state_${card.state}`]}`}
                  >
                    <span className={styles.infoIcon} aria-hidden="true">
                      ✓
                    </span>
                    <small>情報の状態</small>
                    <strong>{card.stateLabel}</strong>
                    <span>確認日 {card.confirmedOn}</span>
                  </div>
                </div>
                <button type="button" className={styles.detailButton}>
                  {index === 0 ? "このカードの詳細を見る" : "公式情報・詳細を見る"}
                  <span aria-hidden="true">›</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          className={styles.quickStart}
          id="quick-start"
          aria-labelledby="quick-title"
        >
          <div className={styles.sectionHeading}>
            <span className={styles.headingSticker}>あなたなら？</span>
            <div>
              <p>条件からカードを探す</p>
              <h2 id="quick-title">自分に合うカードを探してみる</h2>
            </div>
          </div>

          <form className={styles.quickForm} action="/search">
            <div className={styles.amountField}>
              <label htmlFor="annual-spend">年間利用額</label>
              <div className={styles.amountInput}>
                <span aria-hidden="true">¥</span>
                <input
                  id="annual-spend"
                  name="annual-spend"
                  type="text"
                  inputMode="numeric"
                  defaultValue="1,200,000"
                  aria-describedby="amount-help"
                />
                <strong>円</strong>
              </div>
              <p id="amount-help">月10万円なら、年間120万円が目安です。</p>
            </div>

            <fieldset className={styles.popularPlaces}>
              <legend>よく使う場所を選ぶ（あとで金額も設定できます）</legend>
              <label>
                <input type="checkbox" name="place" value="convenience" />
                <span>コンビニ</span>
              </label>
              <label>
                <input type="checkbox" name="place" value="supermarket" />
                <span>スーパー</span>
              </label>
              <label>
                <input type="checkbox" name="place" value="online" />
                <span>ネット通販</span>
              </label>
              <label>
                <input type="checkbox" name="place" value="travel" />
                <span>旅行・宿泊</span>
              </label>
            </fieldset>

            <button className={styles.searchButton} type="submit">
              <span>条件入力へすすむ</span>
              <strong aria-hidden="true">→</strong>
            </button>
          </form>

          <p className={styles.formNote}>
            この画面の入力は保存・送信されません。UI Mock内だけで使用します。
          </p>
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
            </div>
          </div>

          <div className={styles.articleGrid}>
            {recommendedArticles.map((article) => (
              <article
                className={`${styles.articleCard} ${styles[`article_${article.accent}`]}`}
                key={article.id}
              >
                <div className={styles.articleMeta}>
                  <span>{article.kind}</span>
                  <time dateTime={article.updatedOn}>更新 {article.updatedOn}</time>
                </div>
                <p className={styles.articleAudience}>{article.audience}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <button type="button">この記事を読む →</button>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.newsAndTrust}>
          <div className={styles.news} aria-labelledby="news-title">
            <div className={styles.tapeTitle}>
              <span>NEW!</span>
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
            <p className={styles.trustStamp}>ちゃんと確認</p>
            <h2 id="trust-title">おトクだけで、あおりません。</h2>
            <ul>
              <li>年間正味還元額は入力と仮定に基づく目安</li>
              <li>確認できない条件は推測せず、状態を表示</li>
              <li>広告・Affiliate関係は申込前に明示</li>
              <li>国内すべてのカードを網羅しているとは断定しません</li>
            </ul>
            <button type="button">算定方法・掲載方針を見る</button>
          </aside>
        </section>
      </main>

      <footer className={styles.footer}>
        <strong>カード比較くん</strong>
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
