import Link from "next/link";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  currentPage: "home" | "search" | "card" | "article" | "account";
};

export default function SiteHeader({ currentPage }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="カードみっけ ホーム">
          <span className={styles.brandMark} aria-hidden="true">
            C
          </span>
          <span>
            カード<strong>みっけ</strong>
            <small>あなたにピッタリの1枚が見つかる！</small>
          </span>
        </Link>

        <nav className={styles.primaryNav} aria-label="メインナビゲーション">
          <Link href="/#how-it-works">使い方</Link>
          <Link href="/#featured">注目カード</Link>
          <Link
            href="/articles"
            aria-current={currentPage === "article" ? "page" : undefined}
          >
            特集記事
          </Link>
          <Link
            href="/search"
            className={styles.navSearch}
            aria-current={currentPage === "search" ? "page" : undefined}
          >
            カードを探す <span>→</span>
          </Link>
          <Link
            href="/account/profile"
            className={styles.navAccount}
            aria-current={currentPage === "account" ? "page" : undefined}
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
