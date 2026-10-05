import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import {
  calculatePrototypeCard,
  createDefaultScenario,
  parsePrototypeScenario,
  withPrototypeScenario,
} from "@/features/card-detail/prototype-scenario";
import { redesignedCardDetails } from "@/fixtures/card-detail-v2";
import { correctionReportHref } from "@/fixtures/correction-report";
import { featuredCards } from "@/fixtures/home";
import type { PrototypeCardId } from "@/types/ui-prototype";
import CardDetailView from "./card-detail-view";
import styles from "./card-detail.module.css";

export function generateStaticParams() {
  return featuredCards.map((card) => ({ id: card.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cards/[id]">): Promise<Metadata> {
  const { id } = await params;
  const detail = redesignedCardDetails[id as PrototypeCardId];
  if (!detail) return {};

  return {
    title: `${detail.name}の詳細・ポイント・特典 | カードみっけ`,
    description: `${detail.name}の券面、年会費、ポイント、Campaign、家族・ETCカード、特典、保険、レビューを確認できるUIモックです。`,
    alternates: { canonical: `/cards/${detail.id}` },
    openGraph: {
      title: `${detail.name}の詳細 | カードみっけ`,
      description: detail.summary,
      type: "article",
      url: `/cards/${detail.id}`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function CardDetailPage({
  params,
  searchParams,
}: PageProps<"/cards/[id]">) {
  const [{ id }, rawSearchParams] = await Promise.all([params, searchParams]);
  const detail = redesignedCardDetails[id as PrototypeCardId];
  if (!detail) notFound();

  const scenario =
    parsePrototypeScenario(rawSearchParams) ?? createDefaultScenario(detail);
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
