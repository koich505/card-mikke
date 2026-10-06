"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resolveCorrectionReportTarget } from "@/fixtures/correction-report";
import CorrectionReportForm from "./correction-report-form";
import styles from "./correction-report.module.css";

export default function CorrectionReportContent() {
  const searchParams = useSearchParams();
  const target = resolveCorrectionReportTarget(
    searchParams.get("targetType") ?? undefined,
    searchParams.get("targetId") ?? undefined,
  );
  const requestedItem = searchParams.get("item")?.trim();
  const initialItem = (requestedItem || target?.defaultItem || "").slice(0, 100);

  if (target) {
    return (
      <CorrectionReportForm
        key={searchParams.toString()}
        target={target}
        initialItem={initialItem}
      />
    );
  }

  return (
    <section className={styles.invalidTarget} aria-labelledby="invalid-title">
      <span aria-hidden="true">?</span>
      <p>REPORT TARGET</p>
      <h1 id="invalid-title">対象の掲載情報を確認できませんでした</h1>
      <p>
        指摘したいカード・記事・公開ページへ戻り、その画面の「誤情報を指摘」からもう一度お進みください。
      </p>
      <Link href="/">トップページへ戻る</Link>
    </section>
  );
}
