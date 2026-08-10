import type {
  PrototypeArticle,
  PrototypeCardId,
  PrototypeCardDetail,
  PrototypeDisclosureStatus,
  PrototypeFeaturedCard,
  PrototypeNewsItem,
} from "@/types/ui-prototype";

export const featuredCards: PrototypeFeaturedCard[] = [
  {
    id: "everyday-plus",
    name: "まいにちプラスカード",
    issuer: "くらしフィナンシャル（架空）",
    issuerEvidenceClaimId: "everyday-plus-actor-roles",
    label: "毎日の買い物派に注目",
    reason: "年会費と日常利用のバランスを確認しやすい合成例",
    regularYearValue: 22800,
    firstYearValue: 22800,
    annualFeeLabel: "年会費 無料",
    annualFeeEvidenceClaimId: "everyday-plus-annual-fee",
    baseRewardLabel: "基本還元 1.0%（合成）",
    baseRewardEvidenceClaimId: "everyday-plus-base-reward",
    valueEvidenceClaimIds: [
      "everyday-plus-base-reward",
      "everyday-plus-category-reward",
      "everyday-plus-annual-fee",
    ],
    confirmedOn: "2026-08-08",
    state: "incomplete",
    stateLabel: "合成条件による算定例・Evidenceなし",
    accent: "red",
  },
  {
    id: "travel-step",
    name: "トラベルステップカード",
    issuer: "そらいろカード（架空）",
    issuerEvidenceClaimId: "travel-step-actor-roles",
    label: "旅行・宿泊派に注目",
    reason: "旅行カテゴリの追加還元と通常年を比較する合成例",
    regularYearValue: 18400,
    firstYearValue: 18400,
    annualFeeLabel: "年会費 2,200円（合成）",
    annualFeeEvidenceClaimId: "travel-step-annual-fee",
    baseRewardLabel: "基本還元 0.8%（合成）",
    baseRewardEvidenceClaimId: "travel-step-base-reward",
    valueEvidenceClaimIds: [
      "travel-step-base-reward",
      "travel-step-category-reward",
      "travel-step-annual-fee",
    ],
    confirmedOn: "2026-08-07",
    state: "under_review",
    stateLabel: "一部条件を変更確認中",
    accent: "teal",
  },
  {
    id: "smart-basic",
    name: "スマートベーシックカード",
    issuer: "みらいペイメント（架空）",
    issuerEvidenceClaimId: "smart-basic-actor-roles",
    label: "シンプル重視で注目",
    reason: "確認済み要素だけで比較する算定不完全の合成例",
    regularYearValue: 7920,
    firstYearValue: 7920,
    annualFeeLabel: "年会費 無料",
    annualFeeEvidenceClaimId: "smart-basic-annual-fee",
    baseRewardLabel: "基本還元 0.7%（合成）",
    baseRewardEvidenceClaimId: "smart-basic-base-reward",
    valueEvidenceClaimIds: [
      "smart-basic-base-reward",
      "smart-basic-category-reward",
      "smart-basic-annual-fee",
    ],
    confirmedOn: "2026-08-06",
    state: "incomplete",
    stateLabel: "算定不完全",
    accent: "navy",
  },
];

const syntheticResearchCoverage = (
  slug: PrototypeCardId,
  issuer: string,
  rewardOperator: string,
  externalAccount: string,
): PrototypeCardDetail["researchCoverage"] => ({
  paymentInstrument: {
    value: "後払い式のクレジットカード（合成設定）",
    disclosureStatus: "partially_disclosed",
    evidenceClaimId: `${slug}-payment-instrument`,
  },
  fundingMethods: [
    {
      value: "後払い式InstrumentへのFunding Methodは該当なし（Billing/収納とは分離）",
      disclosureStatus: "partially_disclosed",
      evidenceClaimId: `${slug}-funding-billing`,
    },
  ],
  billingSettlement: {
    value: "カード利用代金は登録銀行口座から口座振替（Billing/収納。Fundingとは分離）",
    disclosureStatus: "partially_disclosed",
    evidenceClaimId: `${slug}-funding-billing`,
  },
  paymentInstrumentDetails: {
    id: "instrument-primary",
    variantIds: ["variant-primary", "variant-secondary"],
    issuerActorId: "actor-issuer",
    creditProviderActorId: "actor-issuer",
    lifecycleStatus: "提供中（合成）",
    evidenceClaimId: `${slug}-payment-instrument`,
  },
  fundingMethodDetails: [],
  creditProvider: {
    value: `${issuer}（合成。Actor登録Evidenceなし）`,
    disclosureStatus: "partially_disclosed",
    evidenceClaimId: `${slug}-actor-roles`,
  },
  depositRule: {
    value: "前払残高・預り金の有無はUnknown（Evidenceなし）",
    disclosureStatus: "unknown",
    evidenceClaimId: `${slug}-unknown`,
  },
  regulatoryRegistrations: [
    {
      actor: issuer,
      registration: "登録番号・登録区分は合成Fixtureのため証拠なし",
      disclosureStatus: "unknown",
      evidenceClaimId: `${slug}-actor-roles`,
    },
  ],
  externalAccounts: [
    {
      id: "external-account-primary",
      name: externalAccount,
      operator: "外部提携事業者（架空）",
      applicationRouteIds: slug === "travel-step" ? ["travel-member"] : [],
      rewardDestinationIds: [`${slug}-reward-transfer-primary`],
      applicationRequirement:
        "一般申込では不要。提携経路のみ要件となる場合あり（合成）",
      rewardDestination: "希望時のポイント移行先（合成）",
      effectivePeriod: "UIモック期間のみ",
      evidenceClaimId: `${slug}-external-flows`,
      disclosureStatus: "partially_disclosed",
    },
  ],
  rewardDestinations: [
    {
      id: `${slug}-reward-transfer-primary`,
      operator: rewardOperator,
      externalAccountId: "external-account-primary",
      status: "任意のポイント移行先という合成設定",
      evidenceClaimId: `${slug}-external-flows`,
    },
  ],
  economicFlows: [
    {
      beneficiary: "カード会員",
      payer: "ポイント運営主体（合成）",
      partnership: "会員契約",
      flowType: "member_reward",
      operator: rewardOperator,
      condition: "対象利用に応じたポイント付与（合成）",
      effectivePeriod: "カード提供期間中（合成）",
      evidenceClaimId: `${slug}-external-flows`,
      disclosureStatus: "disclosed",
    },
    {
      beneficiary: "提携事業者",
      payer: "Unknown",
      partnership: "提携関係の存在自体が未確認",
      flowType: "partner_revenue_share_provisional",
      operator: "契約当事者間（合成）",
      condition: "収益分配の存在・条件ともUnknown。会員還元とは分離して表示",
      effectivePeriod: "Unknown",
      evidenceClaimId: `${slug}-unknown`,
      disclosureStatus: "unknown",
    },
  ],
  feesAndLimits: [
    {
      label: "本会員年会費",
      value: "カード基本情報を参照",
      disclosureStatus: "disclosed",
    },
    {
      label: "家族・ETCカード",
      value: "付帯サービス欄を参照",
      disclosureStatus: "disclosed",
    },
    {
      label: "発行・再発行手数料",
      value: "再発行条件は合成Fixtureで未設定",
      disclosureStatus: "unknown",
    },
    {
      label: "海外事務手数料",
      value: "合成Fixtureで未設定",
      disclosureStatus: "unknown",
    },
    {
      label: "ショッピング利用限度額",
      value: "審査により個別設定（合成）",
      disclosureStatus: "partially_disclosed",
    },
    {
      label: "キャッシング",
      value: "提供有無・枠とも未設定",
      disclosureStatus: "unknown",
    },
    {
      label: "遅延損害金",
      value: "合成規約URLのみ・料率未設定",
      disclosureStatus: "unknown",
    },
  ].map((item) => ({
    ...item,
    disclosureStatus: item.disclosureStatus as PrototypeDisclosureStatus,
    evidenceClaimId: `${slug}-fees-limits`,
  })),
  rewardRules: [
    {
      label: "付与単位",
      value: "100円単位の利用を月次集計する合成設定",
      disclosureStatus: "disclosed",
    },
    {
      label: "端数処理",
      value: "月次合計後に1ポイント未満切り捨て（合成）",
      disclosureStatus: "disclosed",
    },
    {
      label: "付与時期",
      value: "請求確定月の翌月（合成）",
      disclosureStatus: "disclosed",
    },
    {
      label: "交換単位",
      value: "1ポイントから利用可能（合成）",
      disclosureStatus: "disclosed",
    },
    {
      label: "対象外取引",
      value: "手数料・キャッシング等。全件は未設定",
      disclosureStatus: "partially_disclosed",
    },
  ].map((item) => ({
    ...item,
    disclosureStatus: item.disclosureStatus as PrototypeDisclosureStatus,
    evidenceClaimId: `${slug}-point-program`,
  })),
  insuranceAndSecurity: [
    {
      label: "本人認証",
      value: "3Dセキュア相当の本人認証（合成）",
      disclosureStatus: "disclosed",
    },
    {
      label: "不正利用補償",
      value: "届け出日から60日前まで（合成）",
      disclosureStatus: "disclosed",
    },
    {
      label: "保険の対象者・免責",
      value: "補償の有無は基本情報、細目は未設定",
      disclosureStatus: "partially_disclosed",
    },
    {
      label: "本人確認",
      value: "オンライン本人確認を想定（合成）",
      disclosureStatus: "partially_disclosed",
    },
  ].map((item) => ({
    ...item,
    disclosureStatus: item.disclosureStatus as PrototypeDisclosureStatus,
    evidenceClaimId: `${slug}-insurance-security`,
  })),
});

const syntheticEvidenceClaims = (
  slug: PrototypeCardId,
  publisher: string,
  retrievedOn: string,
  campaignCalculationUse: "included" | "excluded",
): PrototypeCardDetail["evidenceClaims"] => [
  {
    id: `${slug}-base-reward`,
    claim: "基本還元率",
    value: "カード基本情報および算定内訳に表示した合成値",
    sourceTitle: "カード商品概要（合成Fixture）",
    publisher,
    sourceType: "synthetic_fixture_no_evidence",
    tier: "no-evidence",
    publishedOn: "該当なし",
    effectivePeriod: "UIモック期間のみ",
    retrievedOn,
    confidence: "not_applicable",
    disclosureStatus: "unknown",
    calculationUse: "mock_scenario",
    url: `https://example.invalid/${slug}/spec/`,
  },
  {
    id: `${slug}-category-reward`,
    claim: "利用先別追加還元",
    value: "還元・ポイント欄に表示した合成条件",
    sourceTitle: "追加還元条件（合成Fixture）",
    publisher,
    sourceType: "synthetic_fixture_no_evidence",
    tier: "no-evidence",
    publishedOn: "該当なし",
    effectivePeriod: "UIモック期間のみ",
    retrievedOn,
    confidence: "not_applicable",
    disclosureStatus: "partially_disclosed",
    calculationUse: "mock_scenario",
    url: `https://example.invalid/${slug}/rewards/`,
  },
  {
    id: `${slug}-campaign`,
    claim: "入会キャンペーン",
    value: "初年度のみの合成特典",
    sourceTitle: "入会キャンペーン規約（合成Fixture）",
    publisher,
    sourceType: "synthetic_fixture_no_evidence",
    tier: "no-evidence",
    publishedOn: "該当なし",
    effectivePeriod: "合成キャンペーン期間",
    retrievedOn,
    confidence: "not_applicable",
    disclosureStatus: "partially_disclosed",
    calculationUse: campaignCalculationUse,
    url: `https://example.invalid/${slug}/campaign/conditions/`,
  },
  {
    id: `${slug}-unknown`,
    claim: "未確認・未開示条件",
    value: "算定対象外。0円の価値があるとは扱わない",
    sourceTitle: "証拠なし",
    publisher: "該当なし",
    sourceType: "synthetic_fixture_no_evidence",
    tier: "no-evidence",
    publishedOn: "該当なし",
    effectivePeriod: "該当なし",
    retrievedOn,
    confidence: "not_applicable",
    disclosureStatus: "unknown",
    calculationUse: "excluded",
    url: `https://example.invalid/${slug}/unverified/`,
  },
  ...(
    [
      ["annual-fee", "本会員年会費", "年会費規定"],
      ["annual-milestone", "年間利用達成特典", "年間特典条件"],
      ["point-program", "ポイント有効期限・交換・付与条件", "ポイントプログラム規約"],
      ["insurance-security", "保険・補償・本人認証", "保険・セキュリティ規定"],
      [
        "ancillary-services",
        "ラウンジ・宅配・利用通知等の付帯サービス",
        "付帯サービス規定",
      ],
      ["additional-cards", "家族・ETC・追加カード", "追加カード規定"],
      ["variants", "カードVariant・Brand Identifier", "商品Variant一覧"],
      ["application-routes", "申込資格・申込経路", "申込受付条件"],
      [
        "payment-instrument",
        "後払いInstrumentの分類・発行形態",
        "Payment Instrument定義",
      ],
      [
        "funding-billing",
        "Funding Method非該当・Billing／収納",
        "Funding・Billing構造",
      ],
      ["payment-schemes", "支払方式・手数料", "支払方式別規約"],
      ["actor-roles", "発行・請求・特典のActor Role", "契約主体一覧"],
      ["lifecycle", "商品・機能・申込・提携のLifecycle", "商品変更履歴"],
      ["fees-limits", "手数料・限度額・キャッシング", "料金・利用枠規定"],
      ["external-flows", "外部アカウント・会員還元・提携収益", "提携構造資料"],
    ] as const
  ).map(([suffix, claim, sourceTitle]) => ({
    id: `${slug}-${suffix}`,
    claim,
    value: "各詳細欄に表示した合成Fixture。未設定部分はUnknownとして表示",
    sourceTitle: `${sourceTitle}（合成Fixture）`,
    publisher,
    sourceType: "synthetic_fixture_no_evidence" as const,
    tier: "no-evidence" as const,
    publishedOn: "該当なし",
    effectivePeriod: "UIモック期間のみ",
    retrievedOn,
    confidence: "not_applicable" as const,
    disclosureStatus: "unknown" as const,
    calculationUse:
      suffix === "annual-fee"
        ? ("mock_scenario" as const)
        : suffix === "annual-milestone" ||
            suffix === "ancillary-services" ||
            suffix === "insurance-security" ||
            suffix === "application-routes"
          ? ("excluded" as const)
          : ("reference_only" as const),
    url: `https://example.invalid/${slug}/${suffix}/` as const,
  })),
];

const specEvidenceClaim = (slug: PrototypeCardId, label: string) => {
  if (label.includes("年会費")) return `${slug}-annual-fee`;
  if (label.includes("基本還元")) return `${slug}-base-reward`;
  if (label.includes("ポイント")) return `${slug}-point-program`;
  if (label.includes("保険")) return `${slug}-insurance-security`;
  if (label.includes("家族")) return `${slug}-additional-cards`;
  return `${slug}-variants`;
};

const rewardEvidenceClaim = (slug: PrototypeCardId, item: { note: string }) =>
  item.note.includes("基本還元") ? `${slug}-base-reward` : `${slug}-category-reward`;

const unknownConditionFacts = (evidenceClaimId: string, labels: string[]) =>
  labels.map((label) => ({
    label,
    value: "未設定",
    disclosureStatus: "unknown" as const,
    evidenceClaimId,
  }));

const campaignConditionLabels = [
  "条件要約",
  "特典内容",
  "対象者",
  "申込経路",
  "開始日",
  "終了日",
  "エントリー要否",
  "対象取引",
  "除外取引",
  "上限",
  "付与時期",
  "重複条件",
  "受付状態",
];
const spendConditionLabels = [
  "条件要約",
  "特典内容",
  "対象者",
  "申込経路",
  "集計起点",
  "達成期限",
  "利用額条件",
  "対象取引",
  "除外取引",
  "上限",
  "付与時期",
  "重複条件",
];
const milestoneConditionLabels = [
  "条件要約",
  "特典内容",
  "対象者",
  "集計起点",
  "集計期間",
  "利用額条件",
  "対象取引",
  "除外取引",
  "付与時期",
  "有効期間",
  "重複条件",
];

export const cardDetails: Record<PrototypeCardId, PrototypeCardDetail> = {
  "everyday-plus": {
    catchCopy: "毎日の買い物が、そのままおトクにつながる1枚。",
    summary:
      "スーパーやコンビニなど、日常の支払いをまとめたい人向けの合成カードです。年会費無料で、基本還元と対象店の追加還元をわかりやすく両立しています。",
    editorialContext: {
      nature:
        "掲載中の合成Fixtureを編集要約した案内です。公式Factや利用者レビューではありません。",
      sourceClaimIds: [
        "everyday-plus-base-reward",
        "everyday-plus-category-reward",
        "everyday-plus-annual-fee",
        "everyday-plus-point-program",
      ],
      affectsCalculation: false,
    },
    officialUrl: "https://example.invalid/everyday-plus/",
    termsUrl: "https://example.invalid/everyday-plus/terms/",
    recommendedFor: [
      "スーパー・コンビニをよく利用する",
      "年会費をかけずにポイントを貯めたい",
      "はじめてのメインカードを探している",
    ],
    highlights: [
      {
        mark: "買",
        title: "日常のお店で還元アップ",
        description: "対象のスーパー・コンビニでは最大3.0%還元になる合成設定です。",
      },
      {
        mark: "¥",
        title: "年会費はずっと無料",
        description: "利用金額にかかわらず、本会員の年会費が無料という合成条件です。",
      },
      {
        mark: "P",
        title: "ポイントを使いやすい",
        description: "1ポイント＝1円相当で、毎月の支払いにも充当できる合成例です。",
      },
    ].map((item, index) => ({
      ...item,
      evidenceClaimId: [
        "everyday-plus-category-reward",
        "everyday-plus-annual-fee",
        "everyday-plus-point-program",
      ][index],
    })),
    rewardExamples: [
      { place: "スーパー", rate: "3.0%", note: "対象店舗・要エントリー" },
      { place: "コンビニ", rate: "2.0%", note: "対象店舗での利用" },
      { place: "その他", rate: "1.0%", note: "基本還元" },
    ].map((item) => ({
      ...item,
      evidenceClaimId: rewardEvidenceClaim("everyday-plus", item),
    })),
    specs: [
      { label: "年会費", value: "永年無料（合成）" },
      { label: "基本還元率", value: "1.0%（合成）" },
      { label: "ポイント", value: "まいにちポイント（合成）" },
      { label: "国際ブランド", value: "Visa / Mastercard（合成）" },
      { label: "家族カード", value: "無料（合成）" },
      { label: "旅行保険", value: "付帯なし（合成）" },
    ].map((item) => ({
      ...item,
      evidenceClaimId: specEvidenceClaim("everyday-plus", item.label),
    })),
    campaigns: [
      {
        id: "everyday-welcome",
        evidenceClaimId: "everyday-plus-campaign",
        conditionFacts: unknownConditionFacts(
          "everyday-plus-campaign",
          campaignConditionLabels,
        ),
        title: "新規入会・利用特典",
        value: "最大6,000ポイント",
        condition: "入会月を含む3か月以内に合計10万円以上利用した場合（合成）",
        campaignUrl: "https://example.invalid/everyday-plus/campaign/welcome/",
        sourceUrl: "https://example.invalid/everyday-plus/campaign/welcome/conditions/",
      },
      {
        id: "everyday-shop-start",
        evidenceClaimId: "everyday-plus-campaign",
        conditionFacts: unknownConditionFacts(
          "everyday-plus-campaign",
          campaignConditionLabels,
        ),
        title: "対象店スタート特典",
        value: "+2.0%還元",
        condition: "入会後30日間、対象のスーパー・コンビニで月2万円まで（合成）",
        campaignUrl: "https://example.invalid/everyday-plus/campaign/shop-start/",
        sourceUrl: "https://example.invalid/everyday-plus/rewards/eligible-stores/",
      },
    ],
    spendBonuses: [
      {
        id: "everyday-step-1",
        evidenceClaimId: "everyday-plus-campaign",
        conditionFacts: unknownConditionFacts(
          "everyday-plus-campaign",
          spendConditionLabels,
        ),
        period: "入会後1か月以内",
        spend: "3万円",
        reward: "1,000ポイント",
        note: "対象利用の合計が3万円以上の場合（合成）",
        sourceUrl: "https://example.invalid/everyday-plus/campaign/welcome/step-1/",
      },
      {
        id: "everyday-step-2",
        evidenceClaimId: "everyday-plus-campaign",
        conditionFacts: unknownConditionFacts(
          "everyday-plus-campaign",
          spendConditionLabels,
        ),
        period: "入会後3か月以内",
        spend: "10万円",
        reward: "追加5,000ポイント",
        note: "1か月目の特典との合計で最大6,000ポイント（合成）",
        sourceUrl: "https://example.invalid/everyday-plus/campaign/welcome/step-2/",
      },
    ],
    annualMilestones: [
      {
        id: "everyday-annual-100",
        evidenceClaimId: "everyday-plus-annual-milestone",
        conditionFacts: unknownConditionFacts(
          "everyday-plus-annual-milestone",
          milestoneConditionLabels,
        ),
        period: "毎年1月〜12月",
        spend: "100万円",
        benefit: "5,000ポイント",
        note: "対象となるカードショッピング利用額の年間合計（合成）",
        sourceUrl: "https://example.invalid/everyday-plus/benefits/annual-100/",
      },
      {
        id: "everyday-annual-200",
        evidenceClaimId: "everyday-plus-annual-milestone",
        conditionFacts: unknownConditionFacts(
          "everyday-plus-annual-milestone",
          milestoneConditionLabels,
        ),
        period: "毎年1月〜12月",
        spend: "200万円",
        benefit: "追加10,000ポイント",
        note: "100万円達成特典との合計で15,000ポイント（合成）",
        sourceUrl: "https://example.invalid/everyday-plus/benefits/annual-200/",
      },
    ],
    pointProgram: {
      name: "まいにちポイント（合成）",
      expiry: "最終獲得月から24か月",
      value: "1ポイント＝1円相当",
      uses: ["カード利用代金に充当", "対象の電子マネーへ交換", "提携商品と交換"],
      evidenceClaimId: "everyday-plus-point-program",
    },
    services: [
      {
        id: "everyday-etc",
        name: "ETCカード",
        description: "年会費無料・発行手数料無料（合成）",
        evidenceClaimId: "everyday-plus-additional-cards",
        valueReview: {
          status: "not_applicable",
          reason:
            "発行・年会費は契約条件として別欄に表示し、おトク価値へ重複算入しない",
        },
      },
      {
        id: "everyday-touch",
        name: "タッチ決済",
        description: "Visa・Mastercardのタッチ決済に対応（合成）",
        evidenceClaimId: "everyday-plus-ancillary-services",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "利便性を一律の金額へ換算できない",
        },
      },
      {
        id: "everyday-wallet",
        name: "スマホ決済",
        description: "Apple Pay・Google Payに対応（合成）",
        evidenceClaimId: "everyday-plus-ancillary-services",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "利便性を一律の金額へ換算できない",
        },
      },
      {
        id: "everyday-fraud-protection",
        name: "不正利用補償",
        description: "届け出日から60日前まで補償（合成）",
        evidenceClaimId: "everyday-plus-insurance-security",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "補償価値は発生確率と損害額に依存し一律換算できない",
        },
      },
    ],
    application: {
      eligibility:
        "満18歳以上で本人または配偶者に安定した収入がある方（高校生を除く・合成）",
      issueSpeed: "最短5分でデジタル発行（合成）",
      closingDate: "毎月末日",
      paymentDate: "翌月27日（合成）",
      evidenceClaimId: "everyday-plus-application-routes",
    },
    applicationRoutes: [
      {
        id: "everyday-web",
        type: "一般公開",
        label: "新規Web申込",
        eligibility: "満18歳以上・高校生を除く（合成）",
        status: "受付中",
        isPrimary: true,
        affiliateCondition: "公式申込との差異は未確認。実際の遷移はしません",
        affiliateStatus: "correspondence_unverified",
        conditionDisclosureStatus: "unknown",
        campaignIds: [],
        campaignRelationStatus: "unknown",
        externalAccountIds: [],
        evidenceClaimId: "everyday-plus-application-routes",
        officialApplicationUrl: "https://example.invalid/everyday-plus/apply/",
        affiliateUrl: "https://example.invalid/everyday-plus/affiliate/apply/",
      },
      {
        id: "everyday-switch",
        type: "切替",
        label: "既存カードからの切替",
        eligibility: "対象カード会員のみ（合成）",
        status: "受付中",
        isPrimary: false,
        affiliateCondition: "アフィリエイト対象外（合成設定）",
        affiliateStatus: "inactive",
        conditionDisclosureStatus: "disclosed",
        campaignIds: [],
        campaignRelationStatus: "not_applicable",
        externalAccountIds: [],
        evidenceClaimId: "everyday-plus-application-routes",
        officialApplicationUrl: "https://example.invalid/everyday-plus/switch/",
      },
    ],
    variants: [
      {
        id: "variant-primary",
        brand: "Visa",
        form: "ナンバーレス",
        annualFee: "無料",
        note: "タッチ決済対応（合成）",
        evidenceClaimId: "everyday-plus-variants",
      },
      {
        id: "variant-secondary",
        brand: "Mastercard",
        form: "ナンバーレス",
        annualFee: "無料",
        note: "タッチ決済対応（合成）",
        evidenceClaimId: "everyday-plus-variants",
      },
    ],
    paymentSchemes: [
      {
        name: "1回払い",
        schedule: "毎月末日締め・翌月27日払い",
        fee: "無料（合成）",
        selectableAtPurchase: "選択可",
        postPurchaseChange: "変更不可",
        installmentCount: "1回",
        merchantLimitations: "原則すべての加盟店（合成）",
        legalClassification: "商品情報から取引単位の法的分類は推定しない",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "everyday-plus-payment-schemes",
      },
      {
        name: "分割払い",
        schedule: "利用時に指定（合成）",
        fee: "回数別手数料は合成規約参照",
        selectableAtPurchase: "対応加盟店で選択可",
        postPurchaseChange: "請求確定前まで変更可（合成）",
        installmentCount: "3・5・6・10・12・15・18・20・24回（合成）",
        merchantLimitations: "加盟店・利用内容により対象外あり（合成）",
        legalClassification: "支払方式ごとの一次情報を確認中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "everyday-plus-payment-schemes",
      },
      {
        name: "リボ払い",
        schedule: "毎月の設定額を支払い（合成）",
        fee: "実質年率は合成規約参照",
        selectableAtPurchase: "対応加盟店で選択可",
        postPurchaseChange: "請求確定前まで変更可（合成）",
        installmentCount: "回数指定なし",
        merchantLimitations: "一部取引は対象外（合成）",
        legalClassification: "支払方式ごとの一次情報を確認中",
        disclosureStatus: "unknown",
        evidenceClaimId: "everyday-plus-payment-schemes",
      },
    ],
    networkIdentifiers: ["Visa", "Mastercard"],
    networkIdentifiersEvidenceClaimId: "everyday-plus-variants",
    actorRoles: [
      {
        id: "actor-issuer",
        role: "発行・会員契約",
        conceptId: "everyday-plus-product",
        organization: "くらしフィナンシャル（架空）",
        responsibility: "カード発行・会員契約",
        effectivePeriod: "商品提供期間中（合成）",
        evidenceClaimId: "everyday-plus-actor-roles",
      },
      {
        id: "actor-billing",
        role: "請求・収納",
        conceptId: "everyday-plus-product",
        organization: "くらしフィナンシャル（架空）",
        responsibility: "利用代金の請求・収納",
        effectivePeriod: "商品提供期間中（合成）",
        evidenceClaimId: "everyday-plus-actor-roles",
      },
      {
        id: "actor-reward",
        role: "ポイント運営",
        conceptId: "everyday-plus-point-program",
        organization: "まいにちリワード（架空）",
        responsibility: "ポイント付与・交換",
        effectivePeriod: "ポイント提供期間中（合成）",
        evidenceClaimId: "everyday-plus-actor-roles",
      },
    ],
    lifecycle: {
      productStatus: {
        value: "提供中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "everyday-plus-lifecycle",
      },
      applicationStatus: {
        value: "新規申込受付中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "everyday-plus-application-routes",
      },
      events: [
        {
          date: "2026-04-01",
          publishedOn: "2026-03-01",
          effectiveFrom: "2026-04-01",
          effectiveTo: "終了日未設定",
          scope: "feature",
          target: "対象店特典",
          status: "提供中",
          change: "対象スーパーを追加（合成）",
          evidenceClaimId: "everyday-plus-lifecycle",
        },
        {
          date: "2026-07-01",
          publishedOn: "2026-06-15",
          effectiveFrom: "2026-07-01",
          effectiveTo: "終了日未設定",
          scope: "application",
          target: "切替申込",
          status: "受付中",
          change: "既存会員向け切替経路を開始（合成）",
          evidenceClaimId: "everyday-plus-lifecycle",
        },
      ],
      successorRelations: [
        {
          successor: "Unknown（Evidenceなし）",
          contractContinuity: "Unknown",
          rewardMigration: "Unknown",
          automaticSwitch: "Unknown",
          disclosureStatus: "unknown",
          evidenceClaimId: "everyday-plus-lifecycle",
        },
      ],
    },
    researchCoverage: syntheticResearchCoverage(
      "everyday-plus",
      "くらしフィナンシャル（架空）",
      "まいにちリワード（架空）",
      "提携ポイント会員（合成）",
    ),
    calculation: {
      annualSpend: "年間120万円（月10万円を均等利用）",
      usageAssumptions: [
        "スーパー月4万円",
        "コンビニ月1万円",
        "その他月5万円",
        "対象店の事前エントリー済みで、各月の利用額は追加還元上限内とする合成シナリオ",
        "取引ごとの端数は月次合計で概算",
      ],
      appliedEligibilityAssumptions: [
        {
          category: "スーパー",
          service: "合成Aスーパー",
          conditions: "対象店・事前エントリー済み・月間上限内として追加2.0%を算入",
          evidenceClaimId: "everyday-plus-category-reward",
        },
        {
          category: "コンビニ",
          service: "合成Bコンビニ",
          conditions: "対象店・月間上限内として追加1.0%を算入",
          evidenceClaimId: "everyday-plus-category-reward",
        },
      ],
      formulaChecks: [
        {
          label: "全利用の基本1.0%",
          annualSpend: 1200000,
          rate: 0.01,
          expectedAmount: 12000,
        },
        {
          label: "スーパー追加2.0%",
          annualSpend: 480000,
          rate: 0.02,
          expectedAmount: 9600,
        },
        {
          label: "コンビニ追加1.0%",
          annualSpend: 120000,
          rate: 0.01,
          expectedAmount: 1200,
        },
      ],
      regularYear: [
        {
          label: "基本還元",
          amount: 12000,
          operation: "plus",
          evidenceClaimId: "everyday-plus-base-reward",
        },
        {
          label: "対象店追加還元",
          amount: 10800,
          operation: "plus",
          evidenceClaimId: "everyday-plus-category-reward",
        },
        {
          label: "年会費",
          amount: 0,
          operation: "minus",
          evidenceClaimId: "everyday-plus-annual-fee",
        },
      ],
      firstYear: [
        {
          label: "基本還元",
          amount: 12000,
          operation: "plus",
          evidenceClaimId: "everyday-plus-base-reward",
        },
        {
          label: "対象店追加還元",
          amount: 10800,
          operation: "plus",
          evidenceClaimId: "everyday-plus-category-reward",
        },
        {
          label: "年会費",
          amount: 0,
          operation: "minus",
          evidenceClaimId: "everyday-plus-annual-fee",
        },
      ],
      excludedItems: [
        {
          label: "入会・対象店キャンペーン",
          reason: "期間・エントリー・除外取引等がUnknownのため",
          disclosureStatus: "partially_disclosed",
          impact: "達成時は初年度価値が表示額を上回る可能性",
          evidenceClaimId: "everyday-plus-campaign",
          sourceEntityIds: [
            "everyday-welcome",
            "everyday-shop-start",
            "everyday-step-1",
            "everyday-step-2",
          ],
        },
        {
          label: "年間利用達成特典",
          reason: "利用時期・対象取引を入力していないため",
          disclosureStatus: "partially_disclosed",
          impact: "実際の価値が表示額を上回る可能性",
          evidenceClaimId: "everyday-plus-annual-milestone",
          sourceEntityIds: ["everyday-annual-100", "everyday-annual-200"],
        },
        {
          label: "タッチ決済・スマホ決済・不正利用補償の非金銭価値",
          reason: "利便性・補償価値を一律の金額へ換算できないため",
          disclosureStatus: "partially_disclosed",
          impact: "利用者によって実際の便益が表示額を上回る可能性",
          evidenceClaimId: "everyday-plus-ancillary-services",
          supportingEvidenceClaimIds: ["everyday-plus-insurance-security"],
          sourceEntityIds: [
            "everyday-touch",
            "everyday-wallet",
            "everyday-fraud-protection",
          ],
        },
        {
          label: "未確認の除外取引",
          reason: "証拠のない合成Fixtureのため",
          disclosureStatus: "unknown",
          impact: "結果が上下する可能性",
          evidenceClaimId: "everyday-plus-unknown",
          sourceEntityIds: [],
        },
      ],
    },
    evidenceStatus: {
      sourceTier: "合成Fixture / no-evidence",
      retrievedOn: "2026-08-08",
      confidence: "証拠評価対象外",
      unknowns: ["分割・リボ払いの取引単位の法的分類", "対象店ごとの除外取引の全件"],
    },
    reviewSummary: {
      average: 4.4,
      total: 128,
      distributions: [52, 38, 8, 2, 0],
      collectionPeriod: "合成データのため該当なし",
      displayedCount: 2,
      moderationPolicy:
        "UI確認用の合成投稿のみ。公開前承認・通報・編集導線をモック表示",
      reviews: [
        {
          title: "日々の買い物で使いやすい",
          rating: 5,
          profile: "30代・会社員",
          body: "よく行くスーパーが対象なので、特典を意識しなくてもポイントが貯まりやすいです。",
          postedOn: "2026-07-18",
          verified: false,
          moderationStatus: "approved",
        },
        {
          title: "シンプルだが上限には注意",
          rating: 4,
          profile: "40代・自営業",
          body: "年会費無料で基本還元も十分です。対象店の月間上限は先に確認した方がよいと思います。",
          postedOn: "2026-06-29",
          verified: false,
          moderationStatus: "approved",
        },
      ],
    },
    evidenceClaims: syntheticEvidenceClaims(
      "everyday-plus",
      "くらしフィナンシャル（架空）",
      "2026-08-08",
      "excluded",
    ),
    cautions: [
      "追加還元には対象店舗・月間上限・事前エントリーの合成条件があります。",
      "年間のおトク目安は、年会費と入力条件に基づくUI確認用の試算です。",
      "入会キャンペーンは適用条件が未確認のため、初年度試算には含めていません。",
    ],
    cautionsEvidenceClaimId: "everyday-plus-unknown",
  },
  "travel-step": {
    catchCopy: "旅の予約から移動まで、楽しみをポイントに変える。",
    summary:
      "旅行・宿泊や交通の支払いが多い人向けの合成カードです。通常年は年会費を差し引いても、対象カテゴリの追加還元が活きる設計です。",
    editorialContext: {
      nature:
        "掲載中の合成Fixtureを編集要約した案内です。公式Factや利用者レビューではありません。",
      sourceClaimIds: [
        "travel-step-base-reward",
        "travel-step-category-reward",
        "travel-step-annual-fee",
        "travel-step-insurance-security",
        "travel-step-ancillary-services",
      ],
      affectsCalculation: false,
    },
    officialUrl: "https://example.invalid/travel-step/",
    termsUrl: "https://example.invalid/travel-step/terms/",
    recommendedFor: [
      "年に数回、旅行や出張へ行く",
      "宿泊予約や交通費をカードにまとめたい",
      "旅行保険やラウンジ特典も重視したい",
    ],
    highlights: [
      {
        mark: "旅",
        title: "旅行・宿泊で還元アップ",
        description: "対象の予約サイトと宿泊施設で最大4.0%還元になる合成設定です。",
      },
      {
        mark: "空",
        title: "空港ラウンジ特典",
        description: "国内主要空港の対象ラウンジを年2回利用できる合成特典です。",
      },
      {
        mark: "保",
        title: "旅行保険を付帯",
        description: "旅行代金を支払うと最高2,000万円の保険が適用される合成例です。",
      },
    ].map((item, index) => ({
      ...item,
      evidenceClaimId: [
        "travel-step-category-reward",
        "travel-step-ancillary-services",
        "travel-step-insurance-security",
      ][index],
    })),
    rewardExamples: [
      { place: "旅行・宿泊", rate: "4.0%", note: "対象予約サイト経由" },
      { place: "交通", rate: "1.5%", note: "対象交通サービス" },
      { place: "その他", rate: "0.8%", note: "基本還元" },
    ].map((item) => ({
      ...item,
      evidenceClaimId: rewardEvidenceClaim("travel-step", item),
    })),
    specs: [
      { label: "年会費", value: "2,200円（合成）" },
      { label: "基本還元率", value: "0.8%（合成）" },
      { label: "ポイント", value: "トラベルマイル（合成）" },
      { label: "国際ブランド", value: "Visa（合成）" },
      { label: "家族カード", value: "1,100円（合成）" },
      { label: "旅行保険", value: "最高2,000万円・利用付帯（合成）" },
    ].map((item) => ({
      ...item,
      evidenceClaimId: specEvidenceClaim("travel-step", item.label),
    })),
    campaigns: [
      {
        id: "travel-start",
        evidenceClaimId: "travel-step-campaign",
        conditionFacts: unknownConditionFacts(
          "travel-step-campaign",
          campaignConditionLabels,
        ),
        title: "旅のスタートキャンペーン",
        value: "最大9,000マイル",
        condition: "入会後3か月以内に対象予約サイトで合計15万円以上利用（合成）",
        campaignUrl: "https://example.invalid/travel-step/campaign/travel-start/",
        sourceUrl:
          "https://example.invalid/travel-step/campaign/travel-start/conditions/",
      },
    ],
    spendBonuses: [
      {
        id: "travel-step-1",
        evidenceClaimId: "travel-step-campaign",
        conditionFacts: unknownConditionFacts(
          "travel-step-campaign",
          spendConditionLabels,
        ),
        period: "入会後1か月以内",
        spend: "5万円",
        reward: "2,000マイル",
        note: "通常のショッピング利用を含む合計金額（合成）",
        sourceUrl: "https://example.invalid/travel-step/campaign/travel-start/step-1/",
      },
      {
        id: "travel-step-2",
        evidenceClaimId: "travel-step-campaign",
        conditionFacts: unknownConditionFacts(
          "travel-step-campaign",
          spendConditionLabels,
        ),
        period: "入会後3か月以内",
        spend: "15万円",
        reward: "追加7,000マイル",
        note: "対象予約サイトでの旅行代金を1件以上含むこと（合成）",
        sourceUrl: "https://example.invalid/travel-step/campaign/travel-start/step-2/",
      },
    ],
    annualMilestones: [
      {
        id: "travel-annual-100",
        evidenceClaimId: "travel-step-annual-milestone",
        conditionFacts: unknownConditionFacts(
          "travel-step-annual-milestone",
          milestoneConditionLabels,
        ),
        period: "カード入会日から1年間",
        spend: "100万円",
        benefit: "トラベルクーポン10,000円分",
        note: "対象旅行予約への利用が必要（合成）",
        sourceUrl: "https://example.invalid/travel-step/benefits/annual-100/",
      },
      {
        id: "travel-annual-200",
        evidenceClaimId: "travel-step-annual-milestone",
        conditionFacts: unknownConditionFacts(
          "travel-step-annual-milestone",
          milestoneConditionLabels,
        ),
        period: "カード入会日から1年間",
        spend: "200万円",
        benefit: "上位会員資格＋ラウンジ2回追加",
        note: "達成翌月から12か月間有効（合成）",
        sourceUrl: "https://example.invalid/travel-step/benefits/annual-200/",
      },
    ],
    pointProgram: {
      name: "トラベルマイル（合成）",
      expiry: "獲得月から36か月",
      value: "1マイル＝1円相当",
      uses: ["対象旅行代金に充当", "提携航空マイルへ交換", "カード利用代金に充当"],
      evidenceClaimId: "travel-step-point-program",
    },
    services: [
      {
        id: "travel-etc",
        name: "ETCカード",
        description: "年会費550円・年1回利用で翌年度無料（合成）",
        evidenceClaimId: "travel-step-additional-cards",
        valueReview: {
          status: "not_applicable",
          reason:
            "発行・年会費は契約条件として別欄に表示し、おトク価値へ重複算入しない",
        },
      },
      {
        id: "travel-lounge",
        name: "空港ラウンジ",
        description: "国内主要空港で年2回無料（合成）",
        evidenceClaimId: "travel-step-ancillary-services",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "利用回数と1回あたりの金銭価値を一律換算できない",
        },
      },
      {
        id: "travel-baggage",
        name: "手荷物宅配",
        description: "帰国時の対象手荷物1個を優待料金で配送（合成）",
        evidenceClaimId: "travel-step-ancillary-services",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "優待料金と通常料金の差額・利用回数が未確定",
        },
      },
      {
        id: "travel-insurance",
        name: "海外旅行保険",
        description: "最高2,000万円・旅行代金の利用付帯（合成）",
        evidenceClaimId: "travel-step-insurance-security",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "補償価値は発生確率と損害額に依存し一律換算できない",
        },
      },
    ],
    application: {
      eligibility: "満20歳以上で安定した継続収入がある方（合成）",
      issueSpeed: "最短3営業日で発行（合成）",
      closingDate: "毎月15日",
      paymentDate: "翌月10日（合成）",
      evidenceClaimId: "travel-step-application-routes",
    },
    applicationRoutes: [
      {
        id: "travel-web",
        type: "一般公開",
        label: "新規Web申込",
        eligibility: "満20歳以上・安定した継続収入（合成）",
        status: "受付中",
        isPrimary: true,
        affiliateCondition: "公式申込との差異は未確認。実際の遷移はしません",
        affiliateStatus: "correspondence_unverified",
        conditionDisclosureStatus: "unknown",
        campaignIds: [],
        campaignRelationStatus: "unknown",
        externalAccountIds: [],
        evidenceClaimId: "travel-step-application-routes",
        officialApplicationUrl: "https://example.invalid/travel-step/apply/",
        affiliateUrl: "https://example.invalid/travel-step/affiliate/apply/",
      },
      {
        id: "travel-member",
        type: "提携会員限定",
        label: "提携旅行サービス会員向け申込",
        eligibility: "対象の外部会員アカウントが必要（合成）",
        status: "受付中",
        isPrimary: false,
        affiliateCondition: "提携会員限定・広告条件は未設定",
        affiliateStatus: "correspondence_unverified",
        conditionDisclosureStatus: "unknown",
        campaignIds: [],
        campaignRelationStatus: "unknown",
        externalAccountIds: ["external-account-primary"],
        evidenceClaimId: "travel-step-application-routes",
        officialApplicationUrl: "https://example.invalid/travel-step/apply/member/",
        affiliateUrl: "https://example.invalid/travel-step/affiliate/member/",
      },
    ],
    variants: [
      {
        id: "variant-primary",
        brand: "Visa",
        form: "プラスチックカード",
        annualFee: "2,200円",
        note: "海外利用対応（合成）",
        evidenceClaimId: "travel-step-variants",
      },
      {
        id: "variant-secondary",
        brand: "Visa",
        form: "デジタルカード",
        annualFee: "2,200円",
        note: "即時発行対象外（合成）",
        evidenceClaimId: "travel-step-variants",
      },
    ],
    paymentSchemes: [
      {
        name: "1回払い",
        schedule: "毎月15日締め・翌月10日払い",
        fee: "無料（合成）",
        selectableAtPurchase: "選択可",
        postPurchaseChange: "変更不可",
        installmentCount: "1回",
        merchantLimitations: "原則すべての加盟店（合成）",
        legalClassification: "支払方式単位で確認が必要",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "travel-step-payment-schemes",
      },
      {
        name: "2回払い",
        schedule: "締日後の2回に分けて支払い（合成）",
        fee: "無料（合成）",
        selectableAtPurchase: "対応加盟店で選択可",
        postPurchaseChange: "変更不可",
        installmentCount: "2回",
        merchantLimitations: "加盟店により利用不可（合成）",
        legalClassification: "支払方式単位で確認が必要",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "travel-step-payment-schemes",
      },
      {
        name: "ボーナス一括払い",
        schedule: "夏季または冬季の指定月（合成）",
        fee: "無料（合成）",
        selectableAtPurchase: "対応加盟店・期間内のみ",
        postPurchaseChange: "変更不可",
        installmentCount: "1回",
        merchantLimitations: "取扱期間・最低金額あり（合成）",
        legalClassification: "支払方式単位で確認が必要",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "travel-step-payment-schemes",
      },
      {
        name: "分割払い",
        schedule: "加盟店・利用内容により選択可（合成）",
        fee: "回数別手数料は合成規約参照",
        selectableAtPurchase: "対応加盟店で選択可",
        postPurchaseChange: "請求確定前まで変更可（合成）",
        installmentCount: "3〜24回（合成）",
        merchantLimitations: "加盟店・利用内容により対象外あり（合成）",
        legalClassification: "商品情報から一律には確定できない",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "travel-step-payment-schemes",
      },
      {
        name: "リボ払い",
        schedule: "毎月の設定額を支払い（合成）",
        fee: "実質年率は合成規約参照",
        selectableAtPurchase: "対応加盟店で選択可",
        postPurchaseChange: "請求確定前まで変更可（合成）",
        installmentCount: "回数指定なし",
        merchantLimitations: "一部取引は対象外（合成）",
        legalClassification: "商品情報から一律には確定できない",
        disclosureStatus: "unknown",
        evidenceClaimId: "travel-step-payment-schemes",
      },
    ],
    networkIdentifiers: ["Visa"],
    networkIdentifiersEvidenceClaimId: "travel-step-variants",
    actorRoles: [
      {
        id: "actor-issuer",
        role: "発行・会員契約",
        conceptId: "travel-step-product",
        organization: "そらいろカード（架空）",
        responsibility: "カード発行・与信・会員契約",
        effectivePeriod: "商品提供期間中（合成）",
        evidenceClaimId: "travel-step-actor-roles",
      },
      {
        id: "actor-billing",
        role: "請求・収納",
        conceptId: "travel-step-product",
        organization: "そらいろカード（架空）",
        responsibility: "利用代金の請求・収納",
        effectivePeriod: "商品提供期間中（合成）",
        evidenceClaimId: "travel-step-actor-roles",
      },
      {
        id: "actor-reward",
        role: "ポイント運営",
        conceptId: "travel-step-point-program",
        organization: "トラベルマイル運営局（架空）",
        responsibility: "マイル付与・交換",
        effectivePeriod: "マイル提供期間中（合成）",
        evidenceClaimId: "travel-step-actor-roles",
      },
      {
        id: "actor-partner",
        role: "提携サービス",
        conceptId: "travel-step-partnership",
        organization: "そらいろトラベル（架空）",
        responsibility: "予約特典・会員資格の提供",
        effectivePeriod: "提携期間中（合成）",
        evidenceClaimId: "travel-step-actor-roles",
      },
    ],
    lifecycle: {
      productStatus: {
        value: "提供中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "travel-step-lifecycle",
      },
      applicationStatus: {
        value: "一般・提携会員ルートとも受付中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "travel-step-application-routes",
      },
      events: [
        {
          date: "2026-05-01",
          publishedOn: "2026-04-01",
          effectiveFrom: "2026-05-01",
          effectiveTo: "終了日未設定",
          scope: "feature",
          target: "ラウンジ特典",
          status: "一部変更",
          change: "対象空港を一部変更（合成）",
          evidenceClaimId: "travel-step-lifecycle",
        },
        {
          date: "2026-07-15",
          publishedOn: "2026-06-20",
          effectiveFrom: "2026-07-15",
          effectiveTo: "2027-07-14（合成）",
          scope: "partnership",
          target: "手荷物宅配提携",
          status: "提供中",
          change: "提携条件の適用期間を更新（合成）",
          evidenceClaimId: "travel-step-lifecycle",
        },
      ],
      successorRelations: [
        {
          successor: "Unknown（Evidenceなし）",
          contractContinuity: "Unknown",
          rewardMigration: "Unknown",
          automaticSwitch: "Unknown",
          disclosureStatus: "unknown",
          evidenceClaimId: "travel-step-lifecycle",
        },
      ],
    },
    researchCoverage: syntheticResearchCoverage(
      "travel-step",
      "そらいろカード（架空）",
      "トラベルマイル運営局（架空）",
      "そらいろトラベル会員（合成）",
    ),
    calculation: {
      annualSpend: "年間120万円（月10万円を均等利用）",
      usageAssumptions: [
        "旅行・宿泊年30万円",
        "交通年20万円",
        "その他年70万円",
        "各カテゴリ内では、下記の合成Serviceと適用条件を満たす利用として概算",
      ],
      appliedEligibilityAssumptions: [
        {
          category: "旅行・宿泊",
          service: "合成トラベル予約サービスA",
          conditions: "対象予約サイトを経由し、追加3.2%の対象条件を満たす前提",
          evidenceClaimId: "travel-step-category-reward",
        },
        {
          category: "交通",
          service: "合成交通サービスB",
          conditions: "対象交通サービスとして追加0.7%の対象条件を満たす前提",
          evidenceClaimId: "travel-step-category-reward",
        },
      ],
      formulaChecks: [
        {
          label: "全利用の基本0.8%",
          annualSpend: 1200000,
          rate: 0.008,
          expectedAmount: 9600,
        },
        {
          label: "旅行・宿泊追加3.2%",
          annualSpend: 300000,
          rate: 0.032,
          expectedAmount: 9600,
        },
        {
          label: "交通追加0.7%",
          annualSpend: 200000,
          rate: 0.007,
          expectedAmount: 1400,
        },
      ],
      regularYear: [
        {
          label: "基本還元",
          amount: 9600,
          operation: "plus",
          evidenceClaimId: "travel-step-base-reward",
        },
        {
          label: "旅行・交通の追加還元",
          amount: 11000,
          operation: "plus",
          evidenceClaimId: "travel-step-category-reward",
        },
        {
          label: "年会費",
          amount: 2200,
          operation: "minus",
          evidenceClaimId: "travel-step-annual-fee",
        },
      ],
      firstYear: [
        {
          label: "基本還元",
          amount: 9600,
          operation: "plus",
          evidenceClaimId: "travel-step-base-reward",
        },
        {
          label: "旅行・交通の追加還元",
          amount: 11000,
          operation: "plus",
          evidenceClaimId: "travel-step-category-reward",
        },
        {
          label: "年会費",
          amount: 2200,
          operation: "minus",
          evidenceClaimId: "travel-step-annual-fee",
        },
      ],
      excludedItems: [
        {
          label: "旅のスタートキャンペーン最大9,000マイル",
          reason: "適用条件の全件を確認できない合成Fixtureのため",
          disclosureStatus: "partially_disclosed",
          impact: "達成時は初年度価値が表示額を上回る可能性",
          evidenceClaimId: "travel-step-campaign",
          sourceEntityIds: ["travel-start", "travel-step-1", "travel-step-2"],
        },
        {
          label: "ラウンジ・手荷物宅配・旅行保険の非金銭価値",
          reason: "利用回数・優待差額・補償価値を一律換算できないため",
          disclosureStatus: "partially_disclosed",
          impact: "実際の価値が表示額を上回る可能性",
          evidenceClaimId: "travel-step-ancillary-services",
          supportingEvidenceClaimIds: ["travel-step-insurance-security"],
          sourceEntityIds: ["travel-lounge", "travel-baggage", "travel-insurance"],
        },
        {
          label: "年間利用達成特典",
          reason:
            "クーポンの利用先・有効期限と上位会員資格の金銭価値を確定できないため",
          disclosureStatus: "partially_disclosed",
          impact: "年間100万円達成時は表示額を上回る可能性",
          evidenceClaimId: "travel-step-annual-milestone",
          sourceEntityIds: ["travel-annual-100", "travel-annual-200"],
        },
        {
          label: "変更確認中の旅行特典",
          reason: "変更後の対象一覧が未確認",
          disclosureStatus: "unknown",
          impact: "結果・順位が変わる可能性",
          evidenceClaimId: "travel-step-unknown",
          sourceEntityIds: [],
        },
      ],
    },
    evidenceStatus: {
      sourceTier: "合成Fixture / no-evidence",
      retrievedOn: "2026-08-07",
      confidence: "証拠評価対象外",
      unknowns: [
        "変更後の対象ラウンジ全件",
        "提携会員ルートの終了予定",
        "手荷物宅配の除外条件",
      ],
      changeReview: {
        target: "旅行・宿泊の対象予約サイトとラウンジ対象空港",
        previousApprovedValue: "旅行4.0%・対象ラウンジ年2回（合成旧値）",
        previousConfirmedOn: "2026-05-01",
        calculationTreatment: "旅行4.0%の旧承認値を暫定利用。ラウンジ価値は算定対象外",
        candidateValue: "対象予約サイト・空港の一部変更候補（詳細未確認）",
        impact: "対象利用の追加還元とカード順位が上下する可能性",
      },
    },
    reviewSummary: {
      average: 4.2,
      total: 86,
      distributions: [41, 39, 15, 5, 0],
      collectionPeriod: "合成データのため該当なし",
      displayedCount: 2,
      moderationPolicy:
        "UI確認用の合成投稿のみ。公開前承認・通報・編集導線をモック表示",
      reviews: [
        {
          title: "旅行予約をまとめるなら便利",
          rating: 5,
          profile: "40代・会社員",
          body: "対象サイトを使う旅行が多く、年会費を差し引いても十分メリットを感じました。",
          postedOn: "2026-07-11",
          verified: false,
          moderationStatus: "approved",
        },
        {
          title: "対象サービスの確認が必要",
          rating: 3,
          profile: "30代・会社員",
          body: "旅行特典は魅力的ですが、予約経路によって還元率が変わる点は少し複雑です。",
          postedOn: "2026-06-22",
          verified: false,
          moderationStatus: "approved",
        },
      ],
    },
    evidenceClaims: syntheticEvidenceClaims(
      "travel-step",
      "そらいろカード（架空）",
      "2026-08-07",
      "excluded",
    ),
    cautions: [
      "旅行・宿泊の追加還元は対象予約サイトを経由した場合の合成設定です。",
      "一部の特典条件は変更確認中のため、結果画面では状態を明示しています。",
      "年間のおトク目安は、年会費を差し引いたUI確認用の試算です。",
    ],
    cautionsEvidenceClaimId: "travel-step-unknown",
  },
  "smart-basic": {
    catchCopy: "迷わず使える。必要なものだけを、シンプルに。",
    summary:
      "維持費とわかりやすさを重視する人向けの合成カードです。通常の買い物は0.7%還元ですが、公共料金など一部取引では還元率が異なる想定です。",
    editorialContext: {
      nature:
        "掲載中の合成Fixtureを編集要約した案内です。公式Factや利用者レビューではありません。",
      sourceClaimIds: [
        "smart-basic-base-reward",
        "smart-basic-category-reward",
        "smart-basic-annual-fee",
        "smart-basic-variants",
      ],
      affectsCalculation: false,
    },
    officialUrl: "https://example.invalid/smart-basic/",
    termsUrl: "https://example.invalid/smart-basic/terms/",
    recommendedFor: [
      "複雑なポイント条件を避けたい",
      "年会費無料のサブカードを探している",
      "通常の買い物で還元率を揃えたい（公共料金などは例外）",
    ],
    highlights: [
      {
        mark: "簡",
        title: "通常の買い物は0.7%還元",
        description:
          "公共料金など一部取引は異なる還元率になる、シンプルな合成設定です。",
      },
      {
        mark: "¥",
        title: "維持費ゼロ",
        description: "本会員・家族カードともに年会費無料という合成条件です。",
      },
      {
        mark: "速",
        title: "すぐに使い始められる",
        description: "審査完了後にデジタルカードを即時発行できる合成例です。",
      },
    ].map((item, index) => ({
      ...item,
      evidenceClaimId: [
        "smart-basic-base-reward",
        "smart-basic-annual-fee",
        "smart-basic-application-routes",
      ][index],
      supportingEvidenceClaimIds:
        index === 0
          ? ["smart-basic-category-reward"]
          : index === 1
            ? ["smart-basic-additional-cards"]
            : undefined,
    })),
    rewardExamples: [
      { place: "日常の買い物", rate: "0.7%", note: "基本還元" },
      { place: "ネット通販", rate: "0.7%", note: "基本還元" },
      { place: "公共料金", rate: "0.5%", note: "一部還元率が異なる設定" },
    ].map((item) => ({
      ...item,
      evidenceClaimId: rewardEvidenceClaim("smart-basic", item),
    })),
    specs: [
      { label: "年会費", value: "永年無料（合成）" },
      { label: "基本還元率", value: "0.7%（合成）" },
      { label: "ポイント", value: "スマートポイント（合成）" },
      { label: "国際ブランド", value: "Visa / JCB（合成）" },
      { label: "家族カード", value: "無料（合成）" },
      { label: "旅行保険", value: "付帯なし（合成）" },
    ].map((item) => ({
      ...item,
      evidenceClaimId: specEvidenceClaim("smart-basic", item.label),
    })),
    campaigns: [
      {
        id: "smart-digital-entry",
        evidenceClaimId: "smart-basic-campaign",
        conditionFacts: unknownConditionFacts(
          "smart-basic-campaign",
          campaignConditionLabels,
        ),
        title: "デジタル入会特典",
        value: "3,000ポイント",
        condition: "デジタルカード発行後、翌月末までに合計5万円以上利用（合成）",
        campaignUrl: "https://example.invalid/smart-basic/campaign/digital-entry/",
        sourceUrl:
          "https://example.invalid/smart-basic/campaign/digital-entry/conditions/",
      },
      {
        id: "smart-family-entry",
        evidenceClaimId: "smart-basic-campaign",
        conditionFacts: unknownConditionFacts(
          "smart-basic-campaign",
          campaignConditionLabels,
        ),
        title: "家族カード同時入会",
        value: "500ポイント",
        condition: "本会員と同時に家族カードへ申し込んだ場合（合成）",
        campaignUrl: "https://example.invalid/smart-basic/campaign/family/",
        sourceUrl: "https://example.invalid/smart-basic/family-card/terms/",
      },
    ],
    spendBonuses: [
      {
        id: "smart-step-1",
        evidenceClaimId: "smart-basic-campaign",
        conditionFacts: unknownConditionFacts(
          "smart-basic-campaign",
          spendConditionLabels,
        ),
        period: "入会後1か月以内",
        spend: "2万円",
        reward: "1,000ポイント",
        note: "デジタルカード発行日から30日以内の利用（合成）",
        sourceUrl: "https://example.invalid/smart-basic/campaign/digital-entry/step-1/",
      },
      {
        id: "smart-step-2",
        evidenceClaimId: "smart-basic-campaign",
        conditionFacts: unknownConditionFacts(
          "smart-basic-campaign",
          spendConditionLabels,
        ),
        period: "入会後2か月以内",
        spend: "5万円",
        reward: "追加2,000ポイント",
        note: "1か月目の特典との合計で最大3,000ポイント（合成）",
        sourceUrl: "https://example.invalid/smart-basic/campaign/digital-entry/step-2/",
      },
    ],
    annualMilestones: [
      {
        id: "smart-annual-50",
        evidenceClaimId: "smart-basic-annual-milestone",
        conditionFacts: unknownConditionFacts(
          "smart-basic-annual-milestone",
          milestoneConditionLabels,
        ),
        period: "毎年4月〜翌年3月",
        spend: "50万円",
        benefit: "2,000ポイント",
        note: "公共料金など一部の集計対象外利用あり（合成）",
        sourceUrl: "https://example.invalid/smart-basic/benefits/annual-50/",
      },
      {
        id: "smart-annual-100",
        evidenceClaimId: "smart-basic-annual-milestone",
        conditionFacts: unknownConditionFacts(
          "smart-basic-annual-milestone",
          milestoneConditionLabels,
        ),
        period: "毎年4月〜翌年3月",
        spend: "100万円",
        benefit: "追加3,000ポイント",
        note: "50万円達成特典との合計で5,000ポイント（合成）",
        sourceUrl: "https://example.invalid/smart-basic/benefits/annual-100/",
      },
    ],
    pointProgram: {
      name: "スマートポイント（合成）",
      expiry: "獲得月から24か月",
      value: "1ポイント＝1円相当",
      uses: ["カード利用代金に充当", "対象ギフト券へ交換", "提携ポイントへ移行"],
      evidenceClaimId: "smart-basic-point-program",
    },
    services: [
      {
        id: "smart-etc",
        name: "ETCカード",
        description: "年会費無料・発行手数料無料（合成）",
        evidenceClaimId: "smart-basic-additional-cards",
        valueReview: {
          status: "not_applicable",
          reason:
            "発行・年会費は契約条件として別欄に表示し、おトク価値へ重複算入しない",
        },
      },
      {
        id: "smart-digital-card",
        name: "デジタルカード",
        description: "審査完了後にアプリへ即時発行（合成）",
        evidenceClaimId: "smart-basic-application-routes",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "即時利用の利便性を一律の金額へ換算できない",
        },
      },
      {
        id: "smart-notification",
        name: "利用通知",
        description: "カード利用時にアプリへリアルタイム通知（合成）",
        evidenceClaimId: "smart-basic-ancillary-services",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "通知機能の利便性を一律の金額へ換算できない",
        },
      },
      {
        id: "smart-fraud-protection",
        name: "不正利用補償",
        description: "届け出日から60日前まで補償（合成）",
        evidenceClaimId: "smart-basic-insurance-security",
        valueReview: {
          status: "excluded_non_monetary",
          reason: "補償価値は発生確率と損害額に依存し一律換算できない",
        },
      },
    ],
    application: {
      eligibility: "満18歳以上で連絡可能な方（高校生を除く・合成）",
      issueSpeed: "最短5分でデジタル発行（合成）",
      closingDate: "毎月10日",
      paymentDate: "翌月5日（合成）",
      evidenceClaimId: "smart-basic-application-routes",
    },
    applicationRoutes: [
      {
        id: "smart-digital",
        type: "一般公開",
        label: "デジタルカード申込",
        eligibility: "満18歳以上・高校生を除く（合成）",
        status: "受付中",
        isPrimary: true,
        affiliateCondition: "公式申込との差異は未確認。実際の遷移はしません",
        affiliateStatus: "correspondence_unverified",
        conditionDisclosureStatus: "unknown",
        campaignIds: [],
        campaignRelationStatus: "unknown",
        externalAccountIds: [],
        evidenceClaimId: "smart-basic-application-routes",
        officialApplicationUrl: "https://example.invalid/smart-basic/apply/digital/",
        affiliateUrl: "https://example.invalid/smart-basic/affiliate/digital/",
      },
      {
        id: "smart-plastic",
        type: "一般公開",
        label: "プラスチックカード同時発行",
        eligibility: "デジタルカード申込時に選択（合成）",
        status: "受付中",
        isPrimary: false,
        affiliateCondition: "同時申込時のみ選択可能（合成）",
        affiliateStatus: "correspondence_unverified",
        conditionDisclosureStatus: "unknown",
        campaignIds: [],
        campaignRelationStatus: "unknown",
        externalAccountIds: [],
        evidenceClaimId: "smart-basic-application-routes",
        officialApplicationUrl: "https://example.invalid/smart-basic/apply/plastic/",
        affiliateUrl: "https://example.invalid/smart-basic/affiliate/plastic/",
      },
    ],
    variants: [
      {
        id: "variant-primary",
        brand: "Visa",
        form: "デジタル＋ナンバーレス",
        annualFee: "無料",
        note: "タッチ決済対応（合成）",
        evidenceClaimId: "smart-basic-variants",
      },
      {
        id: "variant-secondary",
        brand: "JCB",
        form: "デジタル＋ナンバーレス",
        annualFee: "無料",
        note: "タッチ決済対応（合成）",
        evidenceClaimId: "smart-basic-variants",
      },
    ],
    paymentSchemes: [
      {
        name: "1回払い",
        schedule: "毎月10日締め・翌月5日払い",
        fee: "無料（合成）",
        selectableAtPurchase: "選択可",
        postPurchaseChange: "変更不可",
        installmentCount: "1回",
        merchantLimitations: "原則すべての加盟店（合成）",
        legalClassification: "商品情報から取引単位の法的分類は推定しない",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "smart-basic-payment-schemes",
      },
      {
        name: "あとから分割",
        schedule: "請求確定前まで変更可能（合成）",
        fee: "回数別手数料は規約参照（合成）",
        selectableAtPurchase: "利用時は1回払い",
        postPurchaseChange: "請求確定前まで変更可能（合成）",
        installmentCount: "3〜24回（合成）",
        merchantLimitations: "一部取引は変更対象外（合成）",
        legalClassification: "支払方式ごとの一次情報を確認中",
        disclosureStatus: "unknown",
        evidenceClaimId: "smart-basic-payment-schemes",
      },
    ],
    networkIdentifiers: ["Visa", "JCB"],
    networkIdentifiersEvidenceClaimId: "smart-basic-variants",
    actorRoles: [
      {
        id: "actor-issuer",
        role: "発行・会員契約",
        conceptId: "smart-basic-product",
        organization: "みらいペイメント（架空）",
        responsibility: "カード発行・与信・会員契約",
        effectivePeriod: "商品提供期間中（合成）",
        evidenceClaimId: "smart-basic-actor-roles",
      },
      {
        id: "actor-billing",
        role: "請求・収納",
        conceptId: "smart-basic-product",
        organization: "みらいペイメント（架空）",
        responsibility: "利用代金の請求・収納",
        effectivePeriod: "商品提供期間中（合成）",
        evidenceClaimId: "smart-basic-actor-roles",
      },
      {
        id: "actor-reward",
        role: "ポイント運営",
        conceptId: "smart-basic-point-program",
        organization: "スマートポイント事務局（架空）",
        responsibility: "ポイント付与・交換",
        effectivePeriod: "ポイント提供期間中（合成）",
        evidenceClaimId: "smart-basic-actor-roles",
      },
    ],
    lifecycle: {
      productStatus: {
        value: "提供中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "smart-basic-lifecycle",
      },
      applicationStatus: {
        value: "新規申込受付中",
        disclosureStatus: "partially_disclosed",
        evidenceClaimId: "smart-basic-application-routes",
      },
      events: [
        {
          date: "2026-06-01",
          publishedOn: "2026-05-01",
          effectiveFrom: "2026-06-01",
          effectiveTo: "終了日未設定",
          scope: "feature",
          target: "デジタル発行",
          status: "提供中",
          change: "対応端末条件を更新（合成）",
          evidenceClaimId: "smart-basic-lifecycle",
        },
        {
          date: "2026-07-01",
          publishedOn: "2026-06-10",
          effectiveFrom: "2026-07-01",
          effectiveTo: "終了日未設定",
          scope: "application",
          target: "プラスチックカード同時発行",
          status: "受付中",
          change: "同時発行経路を開始（合成）",
          evidenceClaimId: "smart-basic-lifecycle",
        },
      ],
      successorRelations: [
        {
          successor: "Unknown（Evidenceなし）",
          contractContinuity: "Unknown",
          rewardMigration: "Unknown",
          automaticSwitch: "Unknown",
          disclosureStatus: "unknown",
          evidenceClaimId: "smart-basic-lifecycle",
        },
      ],
    },
    researchCoverage: syntheticResearchCoverage(
      "smart-basic",
      "みらいペイメント（架空）",
      "スマートポイント事務局（架空）",
      "提携ポイント会員（合成）",
    ),
    calculation: {
      annualSpend: "年間120万円（月10万円を均等利用）",
      usageAssumptions: [
        "日常・通販年96万円",
        "公共料金年24万円",
        "公共料金は下記の合成対象事業者への支払いのみを算入",
        "月次合計後に端数処理する前提",
      ],
      appliedEligibilityAssumptions: [
        {
          category: "公共料金",
          service: "合成電力A・合成通信B",
          conditions:
            "0.5%還元の対象事業者として明示した合成シナリオ。未確認の他事業者は算入しない",
          evidenceClaimId: "smart-basic-category-reward",
        },
      ],
      formulaChecks: [
        {
          label: "日常・通販0.7%",
          annualSpend: 960000,
          rate: 0.007,
          expectedAmount: 6720,
        },
        {
          label: "公共料金0.5%",
          annualSpend: 240000,
          rate: 0.005,
          expectedAmount: 1200,
        },
      ],
      regularYear: [
        {
          label: "日常・通販の基本還元",
          amount: 6720,
          operation: "plus",
          evidenceClaimId: "smart-basic-base-reward",
        },
        {
          label: "公共料金の還元",
          amount: 1200,
          operation: "plus",
          evidenceClaimId: "smart-basic-category-reward",
        },
        {
          label: "年会費",
          amount: 0,
          operation: "minus",
          evidenceClaimId: "smart-basic-annual-fee",
        },
      ],
      firstYear: [
        {
          label: "日常・通販の基本還元",
          amount: 6720,
          operation: "plus",
          evidenceClaimId: "smart-basic-base-reward",
        },
        {
          label: "公共料金の還元",
          amount: 1200,
          operation: "plus",
          evidenceClaimId: "smart-basic-category-reward",
        },
        {
          label: "年会費",
          amount: 0,
          operation: "minus",
          evidenceClaimId: "smart-basic-annual-fee",
        },
      ],
      excludedItems: [
        {
          label: "デジタル入会特典",
          reason: "達成可否を入力していないため",
          disclosureStatus: "partially_disclosed",
          impact: "達成時は表示額を上回る可能性",
          evidenceClaimId: "smart-basic-campaign",
          sourceEntityIds: ["smart-digital-entry", "smart-step-1", "smart-step-2"],
        },
        {
          label: "家族カード同時入会特典",
          reason: "同時申込の達成可否と付与条件を入力していないため",
          disclosureStatus: "partially_disclosed",
          impact: "達成時は表示額を500ポイント分上回る可能性",
          evidenceClaimId: "smart-basic-campaign",
          sourceEntityIds: ["smart-family-entry"],
        },
        {
          label: "年間利用達成特典",
          reason: "集計対象外取引・付与時期等がUnknownのため",
          disclosureStatus: "partially_disclosed",
          impact: "達成時は表示額を上回る可能性",
          evidenceClaimId: "smart-basic-annual-milestone",
          sourceEntityIds: ["smart-annual-50", "smart-annual-100"],
        },
        {
          label: "即時発行・利用通知・不正利用補償の非金銭価値",
          reason: "利便性・補償価値を一律の金額へ換算できないため",
          disclosureStatus: "partially_disclosed",
          impact: "利用者によって実際の便益が表示額を上回る可能性",
          evidenceClaimId: "smart-basic-ancillary-services",
          supportingEvidenceClaimIds: [
            "smart-basic-application-routes",
            "smart-basic-insurance-security",
          ],
          sourceEntityIds: [
            "smart-digital-card",
            "smart-notification",
            "smart-fraud-protection",
          ],
        },
        {
          label: "公共料金の対象事業者",
          reason: "全件を確認できない合成設定",
          disclosureStatus: "unknown",
          impact: "結果が上下する可能性",
          evidenceClaimId: "smart-basic-category-reward",
          sourceEntityIds: [],
        },
        {
          label: "あとから分割の適用除外",
          reason: "条件未確認",
          disclosureStatus: "unknown",
          impact: "試算額には含めず、順位が変わる可能性",
          evidenceClaimId: "smart-basic-payment-schemes",
          sourceEntityIds: [],
        },
      ],
    },
    evidenceStatus: {
      sourceTier: "合成Fixture / no-evidence",
      retrievedOn: "2026-08-06",
      confidence: "証拠評価対象外",
      unknowns: [
        "あとから分割の一部適用除外",
        "公共料金の対象事業者全件",
        "発行時間の混雑時上限",
      ],
    },
    reviewSummary: {
      average: 3.9,
      total: 74,
      distributions: [30, 38, 24, 8, 0],
      collectionPeriod: "合成データのため該当なし",
      displayedCount: 2,
      moderationPolicy:
        "UI確認用の合成投稿のみ。公開前承認・通報・編集導線をモック表示",
      reviews: [
        {
          title: "サブカードとして十分",
          rating: 4,
          profile: "20代・会社員",
          body: "アプリが見やすく、使った直後に通知が来るので管理しやすいです。",
          postedOn: "2026-07-03",
          verified: false,
          moderationStatus: "approved",
        },
        {
          title: "特典よりわかりやすさ重視",
          rating: 4,
          profile: "50代・会社員",
          body: "高還元の対象店を調べる手間がなく、どこでも同じ感覚で使える点が気に入っています。",
          postedOn: "2026-06-15",
          verified: false,
          moderationStatus: "approved",
        },
      ],
    },
    evidenceClaims: syntheticEvidenceClaims(
      "smart-basic",
      "みらいペイメント（架空）",
      "2026-08-06",
      "excluded",
    ),
    cautions: [
      "公共料金や一部取引では基本還元率と異なる合成設定があります。",
      "未確認項目は算定対象外です。0円の価値があるとは扱わず、過小評価の可能性を明示します。",
      "年間のおトク目安は入力条件に基づくUI確認用の試算です。",
    ],
    cautionsEvidenceClaimId: "smart-basic-unknown",
  },
};

const setKnownCondition = (
  facts: PrototypeCardDetail["campaigns"][number]["conditionFacts"],
  label: string,
  value: string,
) => {
  const fact = facts.find((item) => item.label === label);
  if (!fact) return;
  fact.value = value;
  fact.disclosureStatus = "partially_disclosed";
};

for (const detail of Object.values(cardDetails)) {
  for (const campaign of detail.campaigns) {
    setKnownCondition(campaign.conditionFacts, "条件要約", campaign.condition);
    setKnownCondition(campaign.conditionFacts, "特典内容", campaign.value);
  }
  for (const bonus of detail.spendBonuses) {
    setKnownCondition(bonus.conditionFacts, "達成期限", bonus.period);
    setKnownCondition(bonus.conditionFacts, "利用額条件", bonus.spend);
    setKnownCondition(bonus.conditionFacts, "条件要約", bonus.note);
    setKnownCondition(bonus.conditionFacts, "特典内容", bonus.reward);
  }
  for (const milestone of detail.annualMilestones) {
    setKnownCondition(milestone.conditionFacts, "集計期間", milestone.period);
    setKnownCondition(milestone.conditionFacts, "利用額条件", milestone.spend);
    setKnownCondition(milestone.conditionFacts, "条件要約", milestone.note);
    setKnownCondition(milestone.conditionFacts, "特典内容", milestone.benefit);
  }
}

for (const card of featuredCards) {
  const detail = cardDetails[card.id];
  const calculation = detail.calculation;
  const total = (rows: typeof calculation.regularYear) =>
    rows.reduce(
      (sum, row) => sum + (row.operation === "minus" ? -row.amount : row.amount),
      0,
    );

  if (
    total(calculation.regularYear) !== card.regularYearValue ||
    total(calculation.firstYear) !== card.firstYearValue ||
    calculation.formulaChecks.some(
      (formula) => formula.annualSpend * formula.rate !== formula.expectedAmount,
    ) ||
    calculation.formulaChecks.reduce(
      (sum, formula) => sum + formula.expectedAmount,
      0,
    ) -
      calculation.regularYear
        .filter((row) => row.operation === "minus")
        .reduce((sum, row) => sum + row.amount, 0) !==
      card.regularYearValue
  ) {
    throw new Error(`Card calculation fixture is inconsistent: ${card.id}`);
  }

  const evidenceIds = new Set(detail.evidenceClaims.map((claim) => claim.id));
  const referencedEvidenceIds = [
    ...detail.highlights.map((item) => item.evidenceClaimId),
    ...detail.highlights.flatMap((item) => item.supportingEvidenceClaimIds ?? []),
    ...detail.rewardExamples.map((item) => item.evidenceClaimId),
    ...detail.specs.map((item) => item.evidenceClaimId),
    ...detail.campaigns.map((item) => item.evidenceClaimId),
    ...detail.campaigns.flatMap((item) =>
      item.conditionFacts.map((fact) => fact.evidenceClaimId),
    ),
    ...detail.spendBonuses.map((item) => item.evidenceClaimId),
    ...detail.spendBonuses.flatMap((item) =>
      item.conditionFacts.map((fact) => fact.evidenceClaimId),
    ),
    ...detail.annualMilestones.map((item) => item.evidenceClaimId),
    ...detail.annualMilestones.flatMap((item) =>
      item.conditionFacts.map((fact) => fact.evidenceClaimId),
    ),
    detail.pointProgram.evidenceClaimId,
    detail.application.evidenceClaimId,
    detail.lifecycle.productStatus.evidenceClaimId,
    detail.lifecycle.applicationStatus.evidenceClaimId,
    detail.networkIdentifiersEvidenceClaimId,
    detail.cautionsEvidenceClaimId,
    ...detail.services.map((item) => item.evidenceClaimId),
    ...detail.services.flatMap((item) => item.supportingEvidenceClaimIds ?? []),
    ...detail.applicationRoutes.map((item) => item.evidenceClaimId),
    ...detail.variants.map((item) => item.evidenceClaimId),
    ...detail.paymentSchemes.map((item) => item.evidenceClaimId),
    ...detail.actorRoles.map((item) => item.evidenceClaimId),
    ...detail.lifecycle.events.map((item) => item.evidenceClaimId),
    ...detail.lifecycle.successorRelations.map((item) => item.evidenceClaimId),
    ...detail.calculation.regularYear.map((item) => item.evidenceClaimId),
    ...detail.calculation.firstYear.map((item) => item.evidenceClaimId),
    ...detail.calculation.appliedEligibilityAssumptions.map(
      (item) => item.evidenceClaimId,
    ),
    ...detail.calculation.excludedItems.map((item) => item.evidenceClaimId),
    detail.researchCoverage.paymentInstrumentDetails.evidenceClaimId,
    detail.researchCoverage.paymentInstrument.evidenceClaimId,
    ...detail.researchCoverage.fundingMethods.map((item) => item.evidenceClaimId),
    detail.researchCoverage.billingSettlement.evidenceClaimId,
    detail.researchCoverage.creditProvider.evidenceClaimId,
    detail.researchCoverage.depositRule.evidenceClaimId,
    ...detail.researchCoverage.fundingMethodDetails.map((item) => item.evidenceClaimId),
    ...detail.editorialContext.sourceClaimIds,
    ...detail.researchCoverage.regulatoryRegistrations.map(
      (item) => item.evidenceClaimId,
    ),
    ...detail.researchCoverage.externalAccounts.map((item) => item.evidenceClaimId),
    ...detail.researchCoverage.rewardDestinations.map((item) => item.evidenceClaimId),
    ...detail.researchCoverage.economicFlows.map((item) => item.evidenceClaimId),
    ...detail.researchCoverage.feesAndLimits.map((item) => item.evidenceClaimId),
    ...detail.researchCoverage.rewardRules.map((item) => item.evidenceClaimId),
    ...detail.researchCoverage.insuranceAndSecurity.map((item) => item.evidenceClaimId),
    card.issuerEvidenceClaimId,
    card.annualFeeEvidenceClaimId,
    card.baseRewardEvidenceClaimId,
    ...card.valueEvidenceClaimIds,
  ];

  if (referencedEvidenceIds.some((id) => !evidenceIds.has(id))) {
    throw new Error(`Card evidence reference is unresolved: ${card.id}`);
  }

  const variantIds = new Set(detail.variants.map((item) => item.id));
  const actorIds = new Set(detail.actorRoles.map((item) => item.id));
  const routeIds = new Set(detail.applicationRoutes.map((item) => item.id));
  const externalAccountIds = new Set(
    detail.researchCoverage.externalAccounts.map((item) => item.id),
  );
  const campaignIds = new Set(detail.campaigns.map((item) => item.id));
  const rewardDestinationIds = new Set(
    detail.researchCoverage.rewardDestinations.map((item) => item.id),
  );
  const instrument = detail.researchCoverage.paymentInstrumentDetails;
  const idsAreUnique = (ids: string[]) => new Set(ids).size === ids.length;
  const benefitEntityIds = [
    ...detail.campaigns.map((item) => item.id),
    ...detail.spendBonuses.map((item) => item.id),
    ...detail.annualMilestones.map((item) => item.id),
    ...detail.services
      .filter((item) => item.valueReview.status === "excluded_non_monetary")
      .map((item) => item.id),
  ];
  const excludedEntityIds = detail.calculation.excludedItems.flatMap(
    (item) => item.sourceEntityIds,
  );

  if (
    instrument.variantIds.some((id) => !variantIds.has(id)) ||
    !actorIds.has(instrument.issuerActorId) ||
    !actorIds.has(instrument.creditProviderActorId) ||
    detail.researchCoverage.fundingMethodDetails.some(
      (method) => !actorIds.has(method.providerActorId),
    ) ||
    detail.researchCoverage.externalAccounts.some(
      (account) =>
        account.applicationRouteIds.some((id) => !routeIds.has(id)) ||
        account.rewardDestinationIds.some((id) => !rewardDestinationIds.has(id)),
    ) ||
    detail.applicationRoutes.some(
      (route) =>
        route.externalAccountIds.some((id) => !externalAccountIds.has(id)) ||
        route.campaignIds.some((id) => !campaignIds.has(id)) ||
        (route.campaignRelationStatus === "linked" && route.campaignIds.length === 0),
    ) ||
    detail.researchCoverage.rewardDestinations.some(
      (destination) => !externalAccountIds.has(destination.externalAccountId),
    ) ||
    !idsAreUnique(detail.evidenceClaims.map((item) => item.id)) ||
    !idsAreUnique(detail.variants.map((item) => item.id)) ||
    !idsAreUnique(detail.actorRoles.map((item) => item.id)) ||
    !idsAreUnique(detail.applicationRoutes.map((item) => item.id)) ||
    !idsAreUnique(
      detail.researchCoverage.fundingMethodDetails.map((item) => item.id),
    ) ||
    !idsAreUnique(detail.campaigns.map((item) => item.id)) ||
    !idsAreUnique(detail.spendBonuses.map((item) => item.id)) ||
    !idsAreUnique(detail.annualMilestones.map((item) => item.id)) ||
    !idsAreUnique(detail.services.map((item) => item.id)) ||
    !idsAreUnique(excludedEntityIds) ||
    benefitEntityIds.some((id) => !excludedEntityIds.includes(id)) ||
    excludedEntityIds.some((id) => !benefitEntityIds.includes(id)) ||
    !idsAreUnique(detail.researchCoverage.externalAccounts.map((item) => item.id)) ||
    !idsAreUnique(detail.researchCoverage.rewardDestinations.map((item) => item.id))
  ) {
    throw new Error(`Card entity reference is unresolved: ${card.id}`);
  }

  const evidenceById = new Map(detail.evidenceClaims.map((claim) => [claim.id, claim]));
  const calculationClaimIds = [
    ...calculation.regularYear.map((row) => row.evidenceClaimId),
    ...calculation.firstYear.map((row) => row.evidenceClaimId),
  ];
  if (
    calculationClaimIds.some(
      (id) => evidenceById.get(id)?.calculationUse !== "mock_scenario",
    ) ||
    detail.campaigns.some(
      (campaign) =>
        evidenceById.get(campaign.evidenceClaimId)?.calculationUse !== "excluded",
    ) ||
    detail.annualMilestones.some(
      (milestone) =>
        evidenceById.get(milestone.evidenceClaimId)?.calculationUse !== "excluded",
    ) ||
    detail.services
      .filter((service) => service.valueReview.status === "excluded_non_monetary")
      .some(
        (service) =>
          evidenceById.get(service.evidenceClaimId)?.calculationUse !== "excluded",
      )
  ) {
    throw new Error(`Card evidence meaning is inconsistent: ${card.id}`);
  }

  const review = detail.reviewSummary;
  const distributionTotal = review.distributions.reduce((sum, value) => sum + value, 0);
  const weightedAverage =
    review.distributions.reduce((sum, value, index) => sum + value * (5 - index), 0) /
    100;
  if (
    review.displayedCount !== review.reviews.length ||
    review.displayedCount > review.total ||
    (review.total === 0 &&
      (review.displayedCount !== 0 || review.reviews.length !== 0)) ||
    (review.total === 0 ? distributionTotal !== 0 : distributionTotal !== 100) ||
    (review.total === 0 && review.average !== null) ||
    (review.total > 0 &&
      (review.average === null || Math.abs(review.average - weightedAverage) >= 0.051))
  ) {
    throw new Error(`Card review fixture is inconsistent: ${card.id}`);
  }
}

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
