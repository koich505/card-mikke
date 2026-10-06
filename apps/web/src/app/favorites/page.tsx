import type { Metadata } from "next";
import { prototypeSearchCards } from "@/fixtures/home";
import type { PrototypeCardId } from "@/types/ui-prototype";
import FavoritesView from "./favorites-view";

export const metadata: Metadata = {
  title: "お気に入り | カードみっけ",
  description:
    "検討中のカードを一時お気に入りまたはAccountのお気に入りとして確認するUIモックです。",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: false },
};

export default async function FavoritesPage({ searchParams }: PageProps<"/favorites">) {
  const rawSearchParams = await searchParams;
  const rawAdd = rawSearchParams.add;
  const add = Array.isArray(rawAdd) ? rawAdd[0] : rawAdd;
  const initialAddId = prototypeSearchCards.some((card) => card.id === add)
    ? (add as PrototypeCardId)
    : null;

  return (
    <FavoritesView
      initialAddId={initialAddId}
      initialLimitScenario={rawSearchParams.scenario === "limit"}
      initialTransferOpen={rawSearchParams.dialog === "transfer"}
    />
  );
}
