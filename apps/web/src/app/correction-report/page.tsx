import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import { resolveCorrectionReportTarget } from "@/fixtures/correction-report";
import CorrectionReportForm from "./correction-report-form";
import styles from "./correction-report.module.css";

export const metadata: Metadata = {
  title: "掲載情報の誤り・変更を知らせる｜カードみっけ",
  description:
    "カードみっけに掲載されたカード情報や記事の誤り・変更を、ログインせずに知らせるためのUIモックです。",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const singleValue = (value: string | string[] | undefined) =>
  typeof value === "string" ? value : undefined;

export default async function CorrectionReportPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const target = resolveCorrectionReportTarget(
    singleValue(query.targetType),
    singleValue(query.targetId),
  );
  const requestedItem = singleValue(query.item)?.trim();
  const initialItem = (requestedItem || target?.defaultItem || "").slice(0, 100);

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

        {target ? (
          <CorrectionReportForm target={target} initialItem={initialItem} />
        ) : (
          <section className={styles.invalidTarget} aria-labelledby="invalid-title">
            <span aria-hidden="true">?</span>
            <p>REPORT TARGET</p>
            <h1 id="invalid-title">対象の掲載情報を確認できませんでした</h1>
            <p>
              指摘したいカード・記事・公開ページへ戻り、その画面の「誤情報を指摘」からもう一度お進みください。
            </p>
            <Link href="/">トップページへ戻る</Link>
          </section>
        )}
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
