"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { parsePrototypeScenario } from "@/features/card-detail/prototype-scenario";
import { parsePrototypeSearchLaunch } from "@/features/search/prototype-launch";
import { toPrototypeRawSearchParams } from "@/features/search/url-search-params";
import { getPublishedThemePreset } from "@/fixtures/theme-presets";
import SearchPrototype from "./search-prototype";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const rawSearchParams = toPrototypeRawSearchParams(searchParams);
  const rawTheme = Array.isArray(rawSearchParams.theme)
    ? rawSearchParams.theme[0]
    : rawSearchParams.theme;
  const theme = getPublishedThemePreset(rawTheme);
  const scenario = theme?.scenario ?? parsePrototypeScenario(rawSearchParams);
  const launch = parsePrototypeSearchLaunch(rawSearchParams);

  useEffect(() => {
    document.title =
      launch.initialView === "compare"
        ? "選んだカードを比較｜カードみっけ"
        : "条件からカードを探す｜カードみっけ";
  }, [launch.initialView]);

  return (
    <SearchPrototype
      key={queryKey}
      initialScenario={scenario}
      initialView={launch.initialView}
      initialCompareIds={launch.compareCardIds}
      initialFromHistory={launch.fromHistory}
      initialTheme={theme}
      invalidThemeRequested={Boolean(rawTheme && !theme)}
    />
  );
}
