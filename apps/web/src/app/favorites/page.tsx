import type { Metadata } from "next";
import { Suspense } from "react";
import FavoritesView from "./favorites-view";

export const metadata: Metadata = {
  title: "お気に入り | カードみっけ",
  description:
    "検討中のカードを一時お気に入りまたはAccountのお気に入りとして確認するUIモックです。",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: false },
};

export default function FavoritesPage() {
  return (
    <Suspense fallback={null}>
      <FavoritesView />
    </Suspense>
  );
}
