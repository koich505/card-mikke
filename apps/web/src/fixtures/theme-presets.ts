import type {
  PrototypeThemeHistorySnapshot,
  PrototypeThemePreset,
} from "@/types/theme-preset-prototype";

export const prototypeThemePresets: PrototypeThemePreset[] = [
  {
    id: "travel-lover",
    name: "旅行好き",
    description: "旅行・宿泊と交通の利用が多い方向けの条件例です。",
    displayOrder: 1,
    state: "published",
    scenario: {
      annualSpend: 2_400_000,
      profileId: "custom",
      usageByCategory: { travel: 720_000, transit: 360_000, online: 240_000 },
      serviceByCategory: { travel: "best", transit: "best", online: "other" },
      source: "search",
    },
    updatedAt: "2026-10-06 09:30",
  },
  {
    id: "shopping-lover",
    name: "ショッピング好き",
    description: "ネット通販や日々の買い物を中心に比べる条件例です。",
    displayOrder: 2,
    state: "published",
    scenario: {
      annualSpend: 1_800_000,
      profileId: "custom",
      usageByCategory: {
        online: 600_000,
        supermarket: 480_000,
        convenience: 180_000,
      },
      serviceByCategory: { online: "best", supermarket: "best", convenience: "best" },
      source: "search",
    },
    updatedAt: "2026-10-06 09:20",
  },
  {
    id: "simple-value",
    name: "シンプルでお得重視",
    description: "年会費を抑えながら日常利用を比べる条件例です。",
    displayOrder: 3,
    state: "published",
    scenario: {
      annualSpend: 1_200_000,
      profileId: "simple",
      usageByCategory: { supermarket: 420_000, convenience: 180_000 },
      serviceByCategory: { supermarket: "best", convenience: "best" },
      source: "search",
    },
    updatedAt: "2026-10-06 09:10",
  },
  {
    id: "weekend-drive",
    name: "週末ドライブ候補",
    description: "公開前の編集確認用テーマです。",
    displayOrder: 4,
    state: "private",
    scenario: {
      annualSpend: 1_500_000,
      profileId: "custom",
      usageByCategory: { gas: 240_000, restaurant: 240_000 },
      serviceByCategory: { gas: "best", restaurant: "best" },
      source: "search",
    },
    updatedAt: "2026-10-06 08:50",
  },
];

export const publishedThemePresets = prototypeThemePresets
  .filter((theme) => theme.state === "published")
  .toSorted((a, b) => a.displayOrder - b.displayOrder);

export const prototypeThemeHistory: PrototypeThemeHistorySnapshot = {
  id: "history-theme-001",
  savedAt: "2026-09-18 20:15",
  themeName: "旅行好き（保存時）",
  scenario: {
    annualSpend: 2_100_000,
    profileId: "custom",
    usageByCategory: { travel: 660_000, transit: 300_000, online: 180_000 },
    serviceByCategory: { travel: "featured", transit: "best", online: "other" },
    source: "search",
  },
  resultNames: ["くらしスマートカード", "トラベルリンクカード"],
};

export function getPublishedThemePreset(id: string | undefined) {
  return publishedThemePresets.find((theme) => theme.id === id) ?? null;
}
