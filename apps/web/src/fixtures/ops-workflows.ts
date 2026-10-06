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

export const prototypeReviewCases = [
  {
    id: "review-case-021",
    card: "まいにちプラスカード（架空）",
    rating: 4,
    body: "日常の買い物で使いやすいです。問い合わせ時の案内も分かりやすかったです。",
    submitted: "2026-10-05 08:20",
    state: "確認待ち・非公開",
    origin: "新規投稿",
    signals: ["個人情報らしき表現", "文脈確認が必要"],
    reports: 0,
    reportDetails: [],
    audit: [
      {
        at: "2026-10-05 08:20",
        actor: "content-check / system",
        action: "確認候補を作成",
        reason: "個人情報らしき表現の文脈確認が必要",
      },
    ],
  },
  {
    id: "review-case-022",
    card: "トラベルステップカード（架空）",
    rating: 2,
    body: "旅行予約時の条件が想定と違いました。適用条件は申込前に確認した方がよいです。",
    submitted: "2026-10-04 17:10",
    state: "通報あり・公開中",
    origin: "公開後通報",
    signals: ["虚偽の可能性という通報", "Spam判定なし"],
    reports: 3,
    reportDetails: [
      {
        reason: "掲載条件との相違",
        description: "予約経路による適用条件が本文から読み取りにくい",
        reportedAt: "2026-10-05 07:40",
      },
      {
        reason: "誤解を招く表現",
        description: "全予約が対象と読める可能性がある",
        reportedAt: "2026-10-05 08:05",
      },
      {
        reason: "事実確認を希望",
        description: "公式条件との照合を希望（追加説明なし）",
        reportedAt: "2026-10-05 08:18",
      },
    ],
    audit: [
      {
        at: "2026-10-04 17:10",
        actor: "review-intake / system",
        action: "投稿を公開状態で受付",
        reason: "初回Content判定を通過",
      },
      {
        at: "2026-10-05 08:18",
        actor: "report-queue / system",
        action: "通報確認Queueへ追加",
        reason: "通報3件を集約（通報者情報は非表示）",
      },
    ],
  },
] as const;

export const prototypeCorrectionCases = [
  {
    id: "COR-2026-0142",
    target: "まいにちプラスカード（架空）",
    field: "年間利用Bonusの適用条件",
    detail: "公式案内では対象期間が更新されているように見えます。",
    evidence: "issuer.example.invalid/support/bonus-revision",
    received: "2026-10-05 09:10",
    due: "2026-10-08",
    status: "未確認",
    source: "issuer.example.invalid/cards/everyday-plus/bonus",
    audit: [
      {
        at: "2026-10-05 09:10",
        actor: "correction-intake / system",
        action: "Login不要Formから受付",
        reason: "年間利用Bonusの適用条件への指摘",
      },
    ],
  },
  {
    id: "COR-2026-0138",
    target: "暮らし方で見るカード比較マップ",
    field: "カードの配置理由",
    detail: "記載内容と公式の年会費条件は一致しています。",
    evidence: "根拠候補なし（合成）",
    received: "2026-10-03 14:30",
    due: "2026-10-07",
    status: "完了",
    source: "issuer.example.invalid/cards/simple-blue/fees",
    audit: [
      {
        at: "2026-10-03 14:30",
        actor: "correction-intake / system",
        action: "Login不要Formから受付",
        reason: "配置理由への指摘",
      },
      {
        at: "2026-10-03 16:45",
        actor: "ops-reviewer@example.invalid",
        action: "指摘を却下して完了",
        reason: "公式Sourceと掲載中の年会費条件が一致",
      },
    ],
  },
] as const;

export const prototypeBusinessRecords = [
  {
    id: "business-rule-018",
    type: "ポイント換算基準",
    name: "Mikke Point 通常換算（架空）",
    relation: "Reward Rule version r18 → Offering 3件",
    value: "1,000 point = 1,000円相当（確認済み範囲）",
    source: "issuer.example.invalid/rewards/r18",
    effective: "2026-11-01〜",
    status: "改定Draft",
    previous: {
      type: "ポイント換算基準",
      relation: "Reward Rule version r17 → Offering 3件",
      value: "1,000 point = 900円相当（確認済み範囲）",
      version: "r17",
      effective: "2026-04-01〜2026-10-31",
    },
    audit: [
      {
        at: "2026-10-05 10:20",
        actor: "ops-editor@example.invalid",
        action: "業務情報の変更候補を作成",
        reason: "換算基準の改定候補",
      },
    ],
  },
  {
    id: "business-service-044",
    type: "企業・Service",
    name: "Mikke Travel（架空）",
    relation: "Service → 旅行カテゴリ → Benefit 2件",
    value: "旅行予約Service / 対象Route限定",
    source: "partner.example.invalid/services/mikke-travel",
    effective: "2026-10-01〜",
    status: "訂正Draft",
    previous: {
      type: "企業・Service",
      relation: "Service → 旅行カテゴリ → Benefit 1件",
      value: "旅行予約Service / 国内Route限定",
      version: "service-v3",
      effective: "2026-04-01〜2026-09-30",
    },
    audit: [
      {
        at: "2026-10-05 10:32",
        actor: "ops-editor@example.invalid",
        action: "業務情報の変更候補を作成",
        reason: "対象Route訂正候補",
      },
    ],
  },
  {
    id: "business-category-new",
    type: "利用先カテゴリ",
    name: "サブスクリプション（新規候補）",
    relation: "Category候補 / 関連Service未承認",
    value: "動画・音楽等の継続課金（合成）",
    source: "issuer.example.invalid/rules/category-proposal",
    effective: "2027-01-01〜",
    status: "追加Draft",
    previous: null,
    audit: [
      {
        at: "2026-10-05 10:40",
        actor: "ops-editor@example.invalid",
        action: "新規カテゴリ候補を作成",
        reason: "継続課金の分類候補を追加",
      },
    ],
  },
  {
    id: "business-service-retire",
    type: "企業・Service",
    name: "Mikke Lounge旧受付（架空）",
    relation: "Service → 空港カテゴリ → Benefit 1件（過去関係を保持）",
    value: "旧受付Serviceを無効化し、新受付へ関係を移行",
    source: "partner.example.invalid/services/lounge-migration",
    effective: "2026-12-31終了",
    status: "無効化Draft",
    previous: {
      type: "企業・Service",
      relation: "Service → 空港カテゴリ → Benefit 1件",
      value: "空港Lounge予約受付Service",
      version: "service-v5",
      effective: "2025-04-01〜2026-12-31",
    },
    audit: [
      {
        at: "2026-10-05 10:52",
        actor: "ops-editor@example.invalid",
        action: "無効化候補を作成",
        reason: "旧受付終了後も過去の利用関係を追跡可能にするため",
      },
    ],
  },
] as const;
