import SiteHeader from "@/app/components/site-header";
import styles from "./card-detail.module.css";

export default function CardDetailLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="カード詳細を読み込み中">
      <SiteHeader currentPage="card" />
      <main className={styles.loadingPage}>
        <div className={styles.loadingBreadcrumb} />
        <section className={styles.loadingHero}>
          <div>
            <div className={styles.loadingCard} />
            <div className={styles.loadingLine} />
          </div>
          <div>
            <div className={styles.loadingEyebrow} />
            <div className={styles.loadingTitle} />
            <div className={styles.loadingLine} />
            <div className={styles.loadingLine} />
            <div className={styles.loadingFacts} />
          </div>
        </section>
        <span className={styles.srOnly}>カード詳細を読み込んでいます。</span>
      </main>
    </div>
  );
}
