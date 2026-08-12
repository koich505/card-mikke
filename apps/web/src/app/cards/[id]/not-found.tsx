import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import styles from "./card-detail.module.css";

export default function CardDetailNotFound() {
  return (
    <div className={styles.page}>
      <SiteHeader currentPage="card" />
      <main className={styles.notFoundPage}>
        <section>
          <span>404 / CARD NOT FOUND</span>
          <strong aria-hidden="true">?</strong>
          <h1>カードが見つかりませんでした</h1>
          <p>
            指定されたカードは、このUI-onlyモックの合成Fixtureにありません。
            検索ページから3枚のサンプルカードを選び直してください。
          </p>
          <Link href="/search">カードを探し直す →</Link>
        </section>
      </main>
    </div>
  );
}
