import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { redesignedCardDetails } from "@/fixtures/card-detail-v2";
import type { PrototypeCardId } from "@/types/ui-prototype";
import CardDetailPageClient from "./card-detail-page-client";

export function generateStaticParams() {
  return Object.keys(redesignedCardDetails).map((id) => ({ id }));
}

export const dynamicParams = false;

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

export default async function CardDetailPage({ params }: PageProps<"/cards/[id]">) {
  const { id } = await params;
  const detail = redesignedCardDetails[id as PrototypeCardId];
  if (!detail) notFound();

  return (
    <Suspense fallback={null}>
      <CardDetailPageClient detail={detail} />
    </Suspense>
  );
}
