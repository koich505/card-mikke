import type { PrototypeFeatureArticle } from "@/types/article-prototype";

export const featureArticles: PrototypeFeatureArticle[] = [
  {
    slug: "daily-shopping",
    type: "purpose",
    kindLabel: "用途・読者像別",
    title: "コンビニ・スーパー中心なら、どこを比べる？",
    description:
      "日々の買い物で使うカードを選ぶときに、年会費・基本還元・利用先との相性を混ぜずに比べるための合成ガイドです。",
    coverImage: "/images/articles/daily-shopping-cover.png",
    audience: "毎日の買い物が多い人向け",
    publishedOn: "2026-08-05",
    updatedOn: "2026-08-09",
    confirmedOn: "2026-08-09",
    tags: ["日常の買い物", "スーパー", "年会費"],
    publicationState: "published",
    visualTheme: "shopping",
    selectionCriteria: [
      "通常年のおトク目安を同じ利用条件で見る",
      "年会費を差し引いた値か確認する",
      "基本還元と特定店舗の追加還元を分けて考える",
    ],
    candidateReasons: [
      { cardId: "everyday-plus", reason: "日常利用とのバランスを確認する候補" },
      { cardId: "smart-basic", reason: "年会費無料を重視して比べる候補" },
      { cardId: "travel-step", reason: "有料カードとの差を見る比較候補" },
    ],
    sections: [
      {
        id: "starting-point",
        title: "最初に、いつもの支払いを整理する",
        paragraphs: [
          "毎日の買い物向けカードは、目立つ還元率だけで決めず、実際によく使う店舗と年間利用額を先に整理すると比較しやすくなります。",
          "このモックでは、すべての候補を同じ合成条件で見た通常年のおトク目安を使います。",
        ],
      },
      {
        id: "how-to-compare",
        title: "年会費と還元を別々に確認する",
        paragraphs: [
          "年会費無料でも還元額が必ず大きいとは限りません。有料カードも、追加還元の条件を満たさなければ費用を回収できない場合があります。",
        ],
        points: [
          "通常年と初年度を混ぜない",
          "期間限定特典を通常還元に含めない",
          "未確認条件は推測しない",
        ],
      },
    ],
    relatedCards: [
      { cardId: "everyday-plus", reason: "毎日の買い物を想定した合成例として紹介" },
      { cardId: "smart-basic", reason: "シンプルな条件と比較するために紹介" },
      { cardId: "travel-step", reason: "年会費がある候補との違いを確認するために紹介" },
    ],
    cautions: [
      "表示額は合成条件による算定例です。",
      "実際の申込前には公式情報を確認してください。",
    ],
    officialSources: [
      {
        id: "daily-shopping-everyday-plus",
        title: "まいにちプラスカード商品・ポイント案内（合成）",
        publisher: "くらしフィナンシャル（架空）",
        defaultClaimConfirmedOn: "2026-08-09",
        defaultClaimEffectivePeriod: "2026-08-01〜UIモック終了まで（合成）",
        claims: [
          {
            id: "everyday-plus-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
          {
            id: "everyday-plus-base-reward",
            label: "基本還元率",
            disclosureStatus: "disclosed",
          },
          {
            id: "everyday-plus-reward-exclusions",
            label: "ポイント対象外利用",
            disclosureStatus: "disclosed",
          },
        ],
      },
      {
        id: "daily-shopping-smart-basic",
        title: "スマートベーシックカード商品・ポイント案内（合成）",
        publisher: "みらいペイメント（架空）",
        defaultClaimConfirmedOn: "2026-08-09",
        defaultClaimEffectivePeriod: "UIモック期間のみ",
        claims: [
          {
            id: "smart-basic-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
          {
            id: "smart-basic-base-reward",
            label: "基本還元率",
            disclosureStatus: "disclosed",
          },
          {
            id: "smart-basic-reward-exclusions",
            label: "ポイント対象外利用",
            disclosureStatus: "partially_disclosed",
          },
        ],
      },
      {
        id: "daily-shopping-travel-step",
        title: "トラベルステップカード商品・ポイント案内（合成）",
        publisher: "そらいろカード（架空）",
        defaultClaimConfirmedOn: "2026-08-09",
        defaultClaimEffectivePeriod: "UIモック期間のみ",
        claims: [
          {
            id: "travel-step-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
          {
            id: "travel-step-base-reward",
            label: "基本還元率",
            disclosureStatus: "disclosed",
          },
          {
            id: "travel-step-category-reward",
            label: "旅行カテゴリ追加還元",
            disclosureStatus: "disclosed",
          },
        ],
      },
    ],
    affiliateDisclosure: {
      hasRelationship: true,
      note: "広告を含む想定ですが、報酬の有無・金額は候補の選定や掲載順に使用していません。申込条件差は候補カードと合成申込経路ごとに表示します。",
      applicationActions: [
        {
          cardId: "everyday-plus",
          applicationRouteLabel: "新規Web申込（合成）",
          conditionDifference: "unknown",
          conditionDifferenceNote: "通常申込との差異は未確認です。",
        },
        {
          cardId: "smart-basic",
          applicationRouteLabel: "デジタルカード申込（合成）",
          conditionDifference: "unknown",
          conditionDifferenceNote: "通常申込との差異は未確認です。",
        },
        {
          cardId: "travel-step",
          applicationRouteLabel: "新規Web申込（合成）",
          conditionDifference: "unknown",
          conditionDifferenceNote: "通常申込との差異は未確認です。",
        },
      ],
    },
  },
  {
    slug: "everyday-plus-feature",
    type: "single-card",
    kindLabel: "単一カード特集",
    title: "まいにちプラスカードの特徴を合成データでチェック",
    description:
      "まいにちプラスカードの特徴、適用条件、確認時点、算定に含めない項目を一つずつ確認する単一カード特集です。",
    coverImage: "/images/articles/everyday-plus-feature-cover.png",
    audience: "特定カードを詳しく見たい人向け",
    publishedOn: "2026-08-06",
    updatedOn: "2026-08-07",
    confirmedOn: "2026-08-08",
    tags: ["日常の買い物", "還元", "年会費"],
    publicationState: "change-under-review",
    visualTheme: "single-card",
    targetCardId: "everyday-plus",
    features: [
      "年会費無料の合成設定",
      "基本還元1.0%の合成設定",
      "日常利用を想定したカテゴリ還元",
    ],
    conditions: [
      "対象利用と対象外利用を分ける",
      "カテゴリ還元の上限を確認する",
      "通常年の条件で比較する",
    ],
    changes: [
      "合成Sourceでカテゴリ追加還元の対象外条件に差分候補を検知しています",
      "差分は未確認のため、この記事には反映せず公開済み旧版を表示しています",
    ],
    sections: [
      {
        id: "overview",
        title: "日常利用とのバランスを見る合成カード",
        paragraphs: [
          "まいにちプラスカードは、日常の支払いをまとめる利用者を想定した架空のカードです。年会費と基本還元を把握しやすい一方、カテゴリ還元には条件確認が必要です。",
        ],
      },
      {
        id: "before-application",
        title: "申込前に確認したいこと",
        paragraphs: [
          "記事で紹介する数値だけで判断せず、カード詳細で算定条件、対象外利用、申込経路を確認してください。",
        ],
        points: ["年会費の適用条件", "ポイント付与対象外", "キャンペーンの期間と上限"],
      },
    ],
    relatedCards: [
      { cardId: "everyday-plus", reason: "この記事の対象カード" },
      { cardId: "smart-basic", reason: "年会費無料の合成候補として比較" },
      { cardId: "travel-step", reason: "異なる利用目的の合成候補として比較" },
    ],
    cautions: [
      "カード名、会社名、条件はすべて架空です。",
      "広告報酬は記事の選定理由や掲載順に影響しません。",
    ],
    officialSources: [
      {
        id: "everyday-plus-product",
        title: "まいにちプラスカード商品概要（合成）",
        publisher: "くらしフィナンシャル（架空）",
        defaultClaimConfirmedOn: "2026-08-08",
        defaultClaimEffectivePeriod: "2026-08-01〜条件変更まで（合成）",
        claims: [
          {
            id: "everyday-plus-application-route",
            label: "対象カードと申込経路",
            disclosureStatus: "disclosed",
          },
          {
            id: "everyday-plus-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
          {
            id: "everyday-plus-base-reward",
            label: "基本還元率",
            disclosureStatus: "disclosed",
          },
        ],
      },
      {
        id: "everyday-plus-category-reward",
        title: "カテゴリ追加還元の適用条件（合成）",
        publisher: "くらしフィナンシャル（架空）",
        defaultClaimConfirmedOn: "2026-08-08",
        defaultClaimEffectivePeriod: "2026-08-01〜2026-10-31（合成）",
        reviewState: "change-under-review",
        claims: [
          {
            id: "everyday-plus-category-eligible-spend",
            label: "対象利用",
            disclosureStatus: "disclosed",
          },
          {
            id: "everyday-plus-category-monthly-cap",
            label: "月間付与上限",
            disclosureStatus: "disclosed",
          },
          {
            id: "everyday-plus-category-exclusions",
            label: "対象外利用",
            disclosureStatus: "partially_disclosed",
          },
        ],
      },
    ],
    affiliateDisclosure: {
      hasRelationship: true,
      note: "広告を含む想定です。合成Sourceの変更確認中のため、Affiliate経由と通常申込で条件差があるかは未確認です。申込Actionは外部へ遷移しません。",
      applicationActions: [
        {
          cardId: "everyday-plus",
          applicationRouteLabel: "新規Web申込（合成）",
          conditionDifference: "unknown",
          conditionDifferenceNote: "通常申込との差異は未確認です。",
        },
      ],
    },
  },
  {
    slug: "card-balance-map",
    type: "two-axis",
    kindLabel: "二軸比較記事",
    title: "年会費と通常年のおトク目安で見るカード比較マップ",
    description:
      "3枚の合成カードを、年会費の負担と通常年のおトク目安という二つの軸で整理した比較記事です。",
    coverImage: "/images/articles/card-balance-map-cover.png",
    audience: "カードごとの違いを視覚的に把握したい人向け",
    publishedOn: "2026-08-10",
    updatedOn: "2026-08-10",
    confirmedOn: "2026-08-10",
    tags: ["比較", "年会費", "還元"],
    publicationState: "published",
    visualTheme: "positioning",
    axes: {
      horizontal: {
        name: "年会費の負担",
        low: "小さい",
        high: "大きい",
        criterion: "表示されている本会員年会費",
      },
      vertical: {
        name: "通常年のおトク目安",
        low: "小さい",
        high: "大きい",
        criterion: "同一の合成利用条件による算定値",
      },
    },
    placements: [
      {
        cardId: "everyday-plus",
        x: 25,
        y: 75,
        reason: "年会費無料かつ通常年算定値が3候補中で最大",
      },
      {
        cardId: "travel-step",
        x: 76,
        y: 52,
        reason: "年会費があり、通常年算定値は3候補中で中間",
      },
      {
        cardId: "smart-basic",
        x: 25,
        y: 23,
        reason: "年会費無料で、通常年算定値は3候補中で最小",
      },
    ],
    textAlternative: [
      "まいにちプラスカード：年会費の負担は小さく、おトク目安は大きい位置",
      "トラベルステップカード：年会費の負担は大きく、おトク目安は中間の位置",
      "スマートベーシックカード：年会費の負担は小さく、おトク目安は小さい位置",
    ],
    sections: [
      {
        id: "reading-map",
        title: "このマップの読み方",
        paragraphs: [
          "横軸は表示年会費、縦軸は同じ合成条件で計算した通常年のおトク目安です。位置は総合順位やすべての利用者へのおすすめ順を表しません。",
        ],
      },
      {
        id: "limitations",
        title: "二軸だけでは分からないこと",
        paragraphs: [
          "旅行特典、保険、利用先別還元、申込条件などは、このマップの位置に反映していません。候補を絞った後は比較表とカード詳細を確認してください。",
        ],
      },
    ],
    relatedCards: [
      { cardId: "everyday-plus", reason: "負担が小さく算定値が大きい合成例" },
      { cardId: "travel-step", reason: "年会費とカテゴリ特典を見比べる合成例" },
      { cardId: "smart-basic", reason: "シンプルな条件を比較する合成例" },
    ],
    cautions: [
      "マップは総合順位ではありません。",
      "情報不足を推測して配置していません。",
    ],
    officialSources: [
      {
        id: "balance-map-everyday-plus-fee",
        title: "まいにちプラスカード年会費案内（合成）",
        publisher: "くらしフィナンシャル（架空）",
        defaultClaimConfirmedOn: "2026-08-10",
        defaultClaimEffectivePeriod: "UIモック期間のみ",
        claims: [
          {
            id: "everyday-plus-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
        ],
      },
      {
        id: "balance-map-smart-basic-fee",
        title: "スマートベーシックカード年会費案内（合成）",
        publisher: "みらいペイメント（架空）",
        defaultClaimConfirmedOn: "2026-08-10",
        defaultClaimEffectivePeriod: "UIモック期間のみ",
        claims: [
          {
            id: "smart-basic-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
        ],
      },
      {
        id: "balance-map-travel-step-fee",
        title: "トラベルステップカード年会費案内（合成）",
        publisher: "そらいろカード（架空）",
        defaultClaimConfirmedOn: "2026-08-10",
        defaultClaimEffectivePeriod: "UIモック期間のみ",
        claims: [
          {
            id: "travel-step-annual-fee",
            label: "本会員年会費",
            disclosureStatus: "disclosed",
          },
        ],
      },
      {
        id: "balance-map-calculation",
        title: "通常年のおトク目安算定根拠（合成）",
        publisher: "カードみっけ編集部（架空）",
        defaultClaimConfirmedOn: "2026-08-10",
        defaultClaimEffectivePeriod: "2026-08-10時点の合成条件",
        claims: [
          {
            id: "balance-map-calculation-condition",
            label: "縦軸の算定条件",
            disclosureStatus: "disclosed",
          },
          {
            id: "balance-map-calculation-scope",
            label: "算定対象範囲",
            disclosureStatus: "disclosed",
          },
          {
            id: "balance-map-calculation-exclusions",
            label: "算定除外項目",
            disclosureStatus: "disclosed",
          },
        ],
      },
    ],
    affiliateDisclosure: {
      hasRelationship: false,
      note: "この記事の比較軸・配置・掲載順に広告報酬は使用していません。",
      applicationActions: [],
    },
  },
];

export function findFeatureArticle(slug: string) {
  return featureArticles.find((article) => article.slug === slug);
}
