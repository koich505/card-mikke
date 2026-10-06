import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import styles from "./article.module.css";

export default function ArticleNotFound() {
  return (
    <div className={styles.page}>
      <SiteHeader currentPage="article" />
      <main className={styles.notFound}>
        <span>404 / ARTICLE NOT FOUND</span>
        <strong aria-hidden="true">?</strong>
        <h1>記事が見つかりませんでした</h1>
        <p>指定された記事は、このUI-onlyモックの合成Fixtureにありません。</p>
        <Link href="/articles">特集記事を選び直す →</Link>
      </main>
    </div>
  );
}
