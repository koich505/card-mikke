import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "./search-page-client";
import SearchPrototype from "./search-prototype";

export const metadata: Metadata = {
  title: "条件からカードを探す｜カードみっけ",
  description:
    "年間利用額とタイプを選ぶかんたん検索と、利用先まで入力できる詳細検索でカードを比較できます。",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <SearchPrototype
          initialScenario={null}
          initialView="results"
          initialCompareIds={[]}
          initialFromHistory={false}
          initialTheme={null}
          invalidThemeRequested={false}
        />
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
