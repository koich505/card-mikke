import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import styles from "./policy.module.css";

export const metadata: Metadata = {
  title: "掲載範囲・サイト方針 | カードみっけ",
  description: "掲載範囲、算定、更新、広告・Affiliate方針を確認するUIモックです。",
};

const coverage = [
  ["掲載会社", "12社", "発行会社として区別した合成集計"],
  ["掲載カード", "38件", "Product / Offering単位の合成集計"],
  ["一般申込Route確認済み", "31件", "現在有効なRouteを確認できた合成候補"],
] as const;

export default function PolicyPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#policy-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="policy" />
      <main id="policy-main">
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <Link href="/">トップ</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">掲載範囲・サイト方針</span>
        </nav>
        <header className={styles.hero}>
          <p>TRUST &amp; COVERAGE</p>
          <h1>どこまで掲載し、どう比べているか。</h1>
          <p>
            カードみっけが扱う範囲、参考値の考え方、情報更新、広告との距離をまとめています。
          </p>
          <span>UI-only Mock / 数値・会社名は合成です</span>
        </header>
        <nav className={styles.localNav} aria-label="このページの目次">
          <a href="#coverage">掲載範囲</a>
          <a href="#calculation">算定方法</a>
          <a href="#updates">情報更新</a>
          <a href="#affiliate">広告・Affiliate</a>
          <a href="#governance">規約・Privacy</a>
          <a href="#disclaimer">免責</a>
        </nav>
        <section
          id="coverage"
          className={styles.section}
          aria-labelledby="coverage-title"
        >
          <Heading number="01" label="COVERAGE" title="掲載範囲" id="coverage-title" />
          <div className={styles.metrics}>
            {coverage.map(([label, value, note]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </article>
            ))}
          </div>
          <div className={styles.notice}>
            <strong>国内すべてのカードを網羅しているわけではありません。</strong>
            <p>
              一般向け個人カードを中心に段階的に拡大しています。法人カード、招待専用商品、提携先限定Route、一部の地域・利用先カテゴリは未対応です。
            </p>
          </div>
          <dl className={styles.definitionList}>
            <div>
              <dt>対象範囲</dt>
              <dd>
                日本国内で一般申込Routeを確認できる個人向けカードを中心とする合成例
              </dd>
            </div>
            <div>
              <dt>集計単位</dt>
              <dd>
                同名でもOffering・Variant・Application Routeの条件が異なる場合は区別
              </dd>
            </div>
            <div>
              <dt>最終確認日</dt>
              <dd>
                <time dateTime="2026-10-06">2026-10-06</time>（UI確認用固定日）
              </dd>
            </div>
          </dl>
        </section>
        <section
          id="calculation"
          className={styles.section}
          aria-labelledby="calculation-title"
        >
          <Heading
            number="02"
            label="CALCULATION"
            title="年間正味還元額の考え方"
            id="calculation-title"
          />
          <ol className={styles.steps}>
            <li>
              <strong>入力条件</strong>
              <span>年間利用額と使い道を重複なく扱います。</span>
            </li>
            <li>
              <strong>公式Source</strong>
              <span>確認済みのFee・Reward Rule・Campaignだけを使います。</span>
            </li>
            <li>
              <strong>対象外</strong>
              <span>価値が一定でないマイル、保険等は金額へ含めません。</span>
            </li>
            <li>
              <strong>参考値</strong>
              <span>仮定、不完全情報、確認日を近くに示します。</span>
            </li>
          </ol>
          <p className={styles.subtle}>
            算定結果は審査、発行、将来の還元、実際の利益を保証するものではありません。
          </p>
        </section>
        <section
          id="updates"
          className={styles.section}
          aria-labelledby="updates-title"
        >
          <Heading
            number="03"
            label="UPDATE"
            title="情報確認と更新"
            id="updates-title"
          />
          <div className={styles.twoColumns}>
            <PolicyCard title="公式Sourceを優先">
              claimに責任を持つ主体の情報を項目ごとに確認します。
            </PolicyCard>
            <PolicyCard title="未確認を推測しない">
              変更検知やAI Draftだけでは更新せず、人間がEvidenceと影響範囲を確認します。
            </PolicyCard>
            <PolicyCard title="更新確認中を表示">
              再承認まで旧版を維持し、最終確認日と公式確認案内を表示します。
            </PolicyCard>
            <PolicyCard title="訂正を受け付ける">
              誤りや変更は、Loginなしで根拠とともに知らせることができます。
            </PolicyCard>
          </div>
          <Link className={styles.action} href="/correction-report?from=policy">
            掲載情報の誤りを知らせる
          </Link>
        </section>
        <section
          id="affiliate"
          className={styles.section}
          aria-labelledby="affiliate-title"
        >
          <Heading
            number="04"
            label="ADVERTISING"
            title="広告・Affiliate方針"
            id="affiliate-title"
          />
          <ul className={styles.checkList}>
            <li>広告・PRを含む導線は申込Link付近で識別可能にします。</li>
            <li>報酬の有無や金額を順位・絞り込み・記事選定へ反映しません。</li>
            <li>申込Routeや条件差を確認し、未確認なら同じ条件と推測しません。</li>
            <li>LinkはEligibility、審査承認、契約成立、発行を保証しません。</li>
          </ul>
        </section>
        <section
          id="governance"
          className={styles.section}
          aria-labelledby="governance-title"
        >
          <Heading
            number="05"
            label="GOVERNANCE"
            title="利用規約・Privacy・編集方針"
            id="governance-title"
          />
          <div className={styles.twoColumns}>
            <PolicyCard title="利用規約">
              比較支援の参考情報として利用し、不正利用、Contentの無断再配布、Service妨害を行わない想定です。正式文言は法務確認前のUI検証用です。
            </PolicyCard>
            <PolicyCard title="Privacy Policy">
              初期Releaseで必要なAccount・Profile情報だけを目的限定で扱い、外部送信やAnalyticsの採用前に計測・同意方針を確定します。
            </PolicyCard>
            <PolicyCard title="編集方針">
              公式SourceとEvidenceを優先し、AI出力は未信頼Draftとして人間が確認します。報酬やReviewを順位・記事選定へ混在させません。
            </PolicyCard>
          </div>
        </section>

        <section
          id="disclaimer"
          className={`${styles.section} ${styles.disclaimer}`}
          aria-labelledby="disclaimer-title"
        >
          <Heading
            number="06"
            label="BEFORE APPLYING"
            title="申込前に公式情報をご確認ください"
            id="disclaimer-title"
          />
          <p>
            掲載情報と試算は比較を助ける参考情報です。最新の条件は必ず公式Sourceで確認してください。法的判断や個別の金融助言を提供するものではありません。
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <strong>カードみっけ</strong>
        <p>UI-only Mock — 外部通信・永続化は行いません。</p>
        <nav aria-label="フッター">
          <Link href="/">トップ</Link>
          <Link href="/search">カードを探す</Link>
          <Link href="/articles">記事</Link>
          <Link href="/account/login">Account</Link>
        </nav>
      </footer>
    </div>
  );
}

function Heading({
  number,
  label,
  title,
  id,
}: {
  number: string;
  label: string;
  title: string;
  id: string;
}) {
  return (
    <div className={styles.heading}>
      <p>
        {number} {label}
      </p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
function PolicyCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
