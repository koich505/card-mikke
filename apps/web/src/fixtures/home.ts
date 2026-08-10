import type {
  PrototypeArticle,
  PrototypeFeaturedCard,
  PrototypeNewsItem,
} from "@/types/ui-prototype";

export const featuredCards: PrototypeFeaturedCard[] = [
  {
    id: "everyday-plus",
    name: "まいにちプラスカード",
    issuer: "くらしフィナンシャル（架空）",
    label: "毎日の買い物派に注目",
    reason: "年会費と日常利用のバランスを確認しやすい合成例",
    regularYearValue: 12840,
    firstYearValue: 18840,
    annualFeeLabel: "年会費 無料",
    baseRewardLabel: "基本還元 1.0%（合成）",
    confirmedOn: "2026-08-08",
    state: "complete",
    stateLabel: "算定要素を確認済み",
    accent: "red",
  },
  {
    id: "travel-step",
    name: "トラベルステップカード",
    issuer: "そらいろカード（架空）",
    label: "旅行・宿泊派に注目",
    reason: "旅行カテゴリの追加還元と通常年を比較する合成例",
    regularYearValue: 16420,
    firstYearValue: 25420,
    annualFeeLabel: "年会費 2,200円（合成）",
    baseRewardLabel: "基本還元 0.8%（合成）",
    confirmedOn: "2026-08-07",
    state: "under_review",
    stateLabel: "一部条件を変更確認中",
    accent: "teal",
  },
  {
    id: "smart-basic",
    name: "スマートベーシックカード",
    issuer: "みらいペイメント（架空）",
    label: "シンプル重視で注目",
    reason: "確認済み要素だけで比較する算定不完全の合成例",
    regularYearValue: 9320,
    firstYearValue: 9320,
    annualFeeLabel: "年会費 無料",
    baseRewardLabel: "基本還元 0.7%（合成）",
    confirmedOn: "2026-08-06",
    state: "incomplete",
    stateLabel: "算定不完全",
    accent: "navy",
  },
];

export const recommendedArticles: PrototypeArticle[] = [
  {
    id: "daily-shopping",
    kind: "用途別",
    title: "コンビニ・スーパー中心なら、どこを比べる？",
    description: "カテゴリ指定とお店指定で結果がどう変わるかを、合成例で整理。",
    audience: "毎日の買い物が多い人向け",
    updatedOn: "2026-08-09",
    accent: "yellow",
  },
  {
    id: "first-card",
    kind: "用途別",
    title: "はじめての1枚、年会費だけで決めない比較ポイント",
    description: "通常年・初年度・利用先別還元を混ぜずに見るコツ。",
    audience: "初めてカードを作る人向け",
    updatedOn: "2026-08-08",
    accent: "orange",
  },
  {
    id: "everyday-plus-feature",
    kind: "カード特集",
    title: "まいにちプラスカードの特徴を合成データでチェック",
    description: "適用条件、確認時点、算定に含めない項目までまとめて確認。",
    audience: "特定カードを詳しく見たい人向け",
    updatedOn: "2026-08-07",
    accent: "teal",
  },
];

export const newsItems: PrototypeNewsItem[] = [
  {
    id: "news-001",
    kind: "記事公開",
    title: "利用先カテゴリから探す比較ガイドを公開しました",
    publishedOn: "2026-08-10",
  },
  {
    id: "news-002",
    kind: "カード情報更新",
    title: "合成カード3件の確認日表示を更新しました",
    publishedOn: "2026-08-09",
  },
  {
    id: "news-003",
    kind: "記事更新",
    title: "初年度と通常年の見分け方を追記しました",
    publishedOn: "2026-08-08",
  },
];
