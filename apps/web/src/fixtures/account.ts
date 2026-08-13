import type {
  PrototypeDataSummary,
  PrototypeSearchHistory,
} from "@/types/account-prototype";

export const syntheticSearchHistoryFixture: PrototypeSearchHistory = [
  {
    id: "history-20260812-1430",
    searchedAt: "2026年8月12日 14:30",
    title: "日常の買い物を中心に比較",
    kind: "compare",
    resultCount: 3,
    scenario: {
      annualSpend: 1_200_000,
      profileId: "everyday",
      usageByCategory: {
        convenience: 180_000,
        supermarket: 420_000,
        online: 240_000,
      },
      serviceByCategory: {
        convenience: "featured",
        supermarket: "best",
        online: "featured",
      },
      source: "search",
    },
    categoryLabels: ["コンビニ", "スーパー", "ネット通販"],
    preferenceLabels: ["日常使い重視", "利用先まで指定"],
    compareCardIds: ["everyday-plus", "smart-basic"],
    historicalCalculation: {
      calculatedAt: "2026年8月12日 14:30",
      evidenceConfirmedOn: "2026年8月8日",
      cardResults: [
        { cardId: "everyday-plus", annualNetValueYen: 22_800 },
        { cardId: "smart-basic", annualNetValueYen: 7_920 },
      ],
    },
  },
  {
    id: "history-20260809-2015",
    searchedAt: "2026年8月9日 20:15",
    title: "旅行と移動の利用先から検索",
    kind: "search",
    resultCount: 3,
    scenario: {
      annualSpend: 2_000_000,
      profileId: "travel",
      usageByCategory: { transit: 240_000, travel: 680_000 },
      serviceByCategory: { transit: "best", travel: "featured" },
      source: "search",
    },
    categoryLabels: ["交通", "旅行・宿泊"],
    preferenceLabels: ["旅行・交通重視", "利用先まで指定"],
    compareCardIds: [],
    historicalCalculation: {
      calculatedAt: "2026年8月9日 20:15",
      evidenceConfirmedOn: "2026年8月7日",
      cardResults: [{ cardId: "travel-step", annualNetValueYen: 18_400 }],
    },
  },
  {
    id: "history-20260804-0810",
    searchedAt: "2026年8月4日 08:10",
    title: "固定費をまとめた場合を比較",
    kind: "compare",
    resultCount: 3,
    scenario: {
      annualSpend: 900_000,
      profileId: "simple",
      usageByCategory: { utilities: 180_000, mobile: 120_000 },
      serviceByCategory: { utilities: "other", mobile: "featured" },
      source: "search",
    },
    categoryLabels: ["公共料金", "携帯電話"],
    preferenceLabels: ["年会費重視", "固定費中心"],
    compareCardIds: ["everyday-plus", "travel-step", "smart-basic"],
    historicalCalculation: {
      calculatedAt: "2026年8月4日 08:10",
      evidenceConfirmedOn: "2026年8月6日",
      cardResults: [
        { cardId: "everyday-plus", annualNetValueYen: 22_800 },
        { cardId: "travel-step", annualNetValueYen: 18_400 },
        { cardId: "smart-basic", annualNetValueYen: 7_920 },
      ],
    },
  },
];

export const syntheticDataSummaryFixture: PrototypeDataSummary = {
  historyRetention:
    "Accountが有効な間、利用者が削除するまで保持する想定です。UIモックでは再読み込みで合成初期値へ戻ります。",
  accountDeletionSchedule:
    "削除完了直後から利用不能とし、通常領域から24時間以内、Backupから30日以内に削除します。",
  accountRetentionExceptions: [
    "不正防止に必要な最小限の仮名化情報：目的を不正防止に限定して90日間",
    "個人との直接紐付けを外したModeration・通報処理の監査Metadata：3年間",
  ],
};
