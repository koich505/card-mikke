"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import {
  calculatePrototypeCard,
  createDefaultScenario,
  parsePrototypeScenario,
  withPrototypeScenario,
} from "@/features/card-detail/prototype-scenario";
import { toPrototypeRawSearchParams } from "@/features/search/url-search-params";
import { correctionReportHref } from "@/fixtures/correction-report";
import { featuredCards } from "@/fixtures/home";
import type { PrototypeCardDetailViewModel } from "@/types/card-detail-prototype";
import CardDetailView from "./card-detail-view";
import styles from "./card-detail.module.css";

export default function CardDetailPageClient({
  detail,
}: {
  detail: PrototypeCardDetailViewModel;
}) {
  const searchParams = useSearchParams();
  const scenario =
    parsePrototypeScenario(toPrototypeRawSearchParams(searchParams)) ??
    createDefaultScenario(detail);
  const calculation = calculatePrototypeCard(detail, scenario);
  const searchHref =
    scenario.source === "search"
      ? withPrototypeScenario("/search", scenario)
      : "/search";
  const relatedCards = featuredCards
    .filter((card) => card.id !== detail.id)
    .map((card) => ({
      id: card.id,
      name: card.name,
    }));

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#card-detail-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="card" />

      <main id="card-detail-main">
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <ol>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li>
              <Link href={searchHref}>カードを探す</Link>
            </li>
            <li aria-current="page">{detail.name}</li>
          </ol>
        </nav>

        <CardDetailView
          detail={detail}
          scenario={scenario}
          calculation={calculation}
          searchHref={searchHref}
          relatedCards={relatedCards}
        />
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.footerBrand}>
          <span aria-hidden="true">C</span>
          <strong>カードみっけ</strong>
        </Link>
        <p>UI-only Mock — 合成Fixtureのみを使用しています。</p>
        <nav aria-label="フッターナビゲーション">
          <Link href="/">トップページ</Link>
          <Link href={searchHref}>カードを探す</Link>
          <Link href="/#trust">掲載方針</Link>
          <Link href={correctionReportHref("card", detail.id)}>誤情報を指摘</Link>
        </nav>
      </footer>
    </div>
  );
}
