import type { Metadata } from "next";
import { parsePrototypeScenario } from "@/features/card-detail/prototype-scenario";
import { parsePrototypeSearchLaunch } from "@/features/search/prototype-launch";
import { getPublishedThemePreset } from "@/fixtures/theme-presets";
import SearchPrototype from "./search-prototype";

export async function generateMetadata({
  searchParams,
}: PageProps<"/search">): Promise<Metadata> {
  const rawSearchParams = await searchParams;
  const launch = parsePrototypeSearchLaunch(rawSearchParams);
  return {
    title:
      launch.initialView === "compare"
        ? "選んだカードを比較｜カードみっけ"
        : "条件からカードを探す｜カードみっけ",
    description:
      "年間利用額とタイプを選ぶかんたん検索と、利用先まで入力できる詳細検索でカードを比較できます。",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const rawSearchParams = await searchParams;
  const rawTheme = Array.isArray(rawSearchParams.theme)
    ? rawSearchParams.theme[0]
    : rawSearchParams.theme;
  const theme = getPublishedThemePreset(rawTheme);
  const scenario = theme?.scenario ?? parsePrototypeScenario(rawSearchParams);
  const launch = parsePrototypeSearchLaunch(rawSearchParams);
  return (
    <SearchPrototype
      initialScenario={scenario}
      initialView={launch.initialView}
      initialCompareIds={launch.compareCardIds}
      initialFromHistory={launch.fromHistory}
      initialTheme={theme}
      invalidThemeRequested={Boolean(rawTheme && !theme)}
    />
  );
}
