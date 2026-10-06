import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "@/app/components/site-header";
import CorrectionReportContent from "./correction-report-content";
import styles from "./correction-report.module.css";

export const metadata: Metadata = {
  title: "掲載情報の誤り・変更を知らせる｜カードみっけ",
  description:
    "カードみっけに掲載されたカード情報や記事の誤り・変更を、ログインせずに知らせるためのUIモックです。",
  robots: { index: false, follow: false },
};

export default function CorrectionReportPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#correction-report-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="report" />

      <main id="correction-report-main" className={styles.main}>
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <ol>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li aria-current="page">誤情報を指摘</li>
          </ol>
        </nav>

        <Suspense fallback={null}>
          <CorrectionReportContent />
        </Suspense>
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerBrand}>
          <span aria-hidden="true">C</span>
          <strong>カードみっけ</strong>
        </Link>
        <p>UI-only Mock — 入力内容の送信・保存は行いません。</p>
        <nav aria-label="フッターナビゲーション">
          <Link href="/">トップページ</Link>
          <Link href="/search">カードを探す</Link>
          <Link href="/#trust">掲載方針</Link>
        </nav>
      </footer>
    </div>
  );
}
