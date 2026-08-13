import type { PrototypeCategoryId } from "@/types/card-detail-prototype";

export const prototypeCategories = [
  {
    id: "convenience",
    label: "コンビニ",
    mark: "24",
    services: [
      { id: "convenience-daily24", label: "デイリー24（架空）" },
      { id: "convenience-quickmart", label: "クイックマート（架空）" },
    ],
  },
  {
    id: "supermarket",
    label: "スーパー",
    mark: "食",
    services: [
      { id: "supermarket-mainichi", label: "まいにちマート（架空）" },
      { id: "supermarket-harvest", label: "ハーベスト市場（架空）" },
    ],
  },
  {
    id: "drugstore",
    label: "ドラッグストア",
    mark: "+",
    services: [
      { id: "drugstore-careplus", label: "ケアプラス（架空）" },
      { id: "drugstore-sukoyaka", label: "すこやか薬店（架空）" },
    ],
  },
  {
    id: "restaurant",
    label: "飲食店",
    mark: "皿",
    services: [
      { id: "restaurant-table", label: "テーブル日和（架空）" },
      { id: "restaurant-kitchen", label: "みんなのキッチン（架空）" },
    ],
  },
  {
    id: "gas",
    label: "ガソリン",
    mark: "G",
    services: [
      { id: "gas-road", label: "ロード給油所（架空）" },
      { id: "gas-drive", label: "ドライブエナジー（架空）" },
    ],
  },
  {
    id: "utilities",
    label: "公共料金",
    mark: "光",
    services: [
      { id: "utilities-light", label: "くらし電気（架空）" },
      { id: "utilities-water", label: "まちの水道（架空）" },
    ],
  },
  {
    id: "mobile",
    label: "携帯電話",
    mark: "TEL",
    services: [
      { id: "mobile-one", label: "モバイルワン（架空）" },
      { id: "mobile-link", label: "リンクモバイル（架空）" },
    ],
  },
  {
    id: "transit",
    label: "交通",
    mark: "IC",
    services: [
      { id: "transit-sorairo", label: "そらいろ交通（架空）" },
      { id: "transit-city", label: "シティパス（架空）" },
    ],
  },
  {
    id: "travel",
    label: "旅行・宿泊",
    mark: "旅",
    services: [
      { id: "travel-mikke", label: "みっけトラベル（架空）" },
      { id: "travel-holiday", label: "ホリデイ予約（架空）" },
    ],
  },
  {
    id: "online",
    label: "ネット通販",
    mark: "WEB",
    services: [
      { id: "online-kurashi", label: "くらしネット（架空）" },
      { id: "online-box", label: "ショッピングボックス（架空）" },
    ],
  },
  {
    id: "other",
    label: "その他",
    mark: "他",
    services: [
      { id: "other-learning", label: "まなびプラス（架空）" },
      { id: "other-entertainment", label: "エンタメパス（架空）" },
    ],
  },
] as const satisfies ReadonlyArray<{
  id: PrototypeCategoryId;
  label: string;
  mark: string;
  services: ReadonlyArray<{ id: string; label: string }>;
}>;

export type PrototypeCategoryLabel = (typeof prototypeCategories)[number]["label"];

export const prototypeCategoryIdByLabel = Object.fromEntries(
  prototypeCategories.map((category) => [category.label, category.id]),
) as Record<PrototypeCategoryLabel, PrototypeCategoryId>;

export const prototypeCategoryMarkByLabel = Object.fromEntries(
  prototypeCategories.map((category) => [category.label, category.mark]),
) as Record<PrototypeCategoryLabel, string>;

export const PROTOTYPE_PROFILE_MAX_ANNUAL_SPEND = 100_000_000;
