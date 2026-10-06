/** UI-only合成Fixture。本番Contract、実在Asset、実在Factとして使用しない。 */
export const prototypeCardImages = [
  {
    id: "face-sunrise",
    card: "まいにちプラスカード（架空）",
    design: "サンライズ",
    brand: "VISA（名称表示用合成）",
    variant: "一般 / 新規発行",
    source: "issuer.example.invalid/cards/everyday-plus/design",
    retrieved: "2026-10-05 06:20",
    license: "公式商品ページ内での商品紹介利用条件を確認済み（合成）",
    period: "2026-11-01〜終了未定",
    alt: "黄色と紺色の円を配したサンライズ券面の合成イメージ",
    status: "draft",
    accent: "sunrise",
  },
  {
    id: "face-coral",
    card: "まいにちプラスカード（架空）",
    design: "コーラル限定",
    brand: "Mastercard（名称表示用合成）",
    variant: "期間限定 / 新規発行",
    source: "issuer.example.invalid/cards/everyday-plus/coral",
    retrieved: "2026-10-05 06:25",
    license: "未確認",
    period: "2026-11-01〜2027-01-31",
    alt: "赤色と白色のドットを配したコーラル券面の合成イメージ",
    status: "blocked",
    accent: "coral",
  },
] as const;

export const prototypeImageHistory = [
  {
    version: "v2",
    status: "公開中",
    period: "2026-04-01〜",
    approved: "2026-03-20 14:10",
    actor: "operator@example.invalid",
  },
  {
    version: "v1",
    status: "履歴 / 無効化済み",
    period: "2025-04-01〜2026-03-31",
    approved: "2025-03-18 11:40",
    actor: "operator@example.invalid",
  },
] as const;

export const prototypeArticleDraft = {
  id: "article-draft-map-014",
  title: "暮らし方で見るカード比較マップ",
  type: "二軸比較",
  status: "未承認Draft",
  generatedAt: "2026-10-05 07:40",
  model: "Synthetic Writer / model-ui-1 / v1",
  template: "article-map-template-r7",
  inputRevision: "approved-card-data-r128",
  source: "公式商品概要・Reward規定（合成） 3件 / 確認日 2026-10-04",
  criterion: "横軸: 年会費負担の小ささ / 縦軸: 日常利用の確認済み還元幅",
  body: "承認済み情報だけを使い、3枚の位置関係と理由を説明する合成Draftです。",
  placements: [
    "まいにちプラス: 日常利用の確認済み条件が多い",
    "トラベルステップ: 旅行Benefitは金額評価外",
    "シンプルブルー: 年会費無料・基本還元中心",
  ],
  excluded: "情報不足のカード1件を配置せず、理由を記録",
  publishedVersion: "公開版 v3 は更新確認中の表示で継続掲載",
} as const;
