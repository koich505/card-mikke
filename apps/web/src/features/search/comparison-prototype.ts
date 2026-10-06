import { calculatePrototypeCard } from "@/features/card-detail/prototype-scenario";
import { redesignedCardDetails } from "@/fixtures/card-detail-v2";
import { prototypeSearchCards } from "@/fixtures/home";
import type {
  PrototypeCardCalculation,
  PrototypeSearchScenario,
} from "@/types/card-detail-prototype";
import type { PrototypeCardId, PrototypeDisclosureStatus } from "@/types/ui-prototype";

/** UI-onlyモック専用。Domain Entity、永続化Model、API Contractではない。 */
export type PrototypeComparisonFact = {
  label: string;
  value: string;
  disclosureStatus: PrototypeDisclosureStatus;
  disclosureLabel: string;
  confirmedOn: string;
  effectivePeriod: string;
  evidenceId: string;
  evidenceLabel: string;
};

export type PrototypeComparisonCard = {
  id: PrototypeCardId;
  name: string;
  issuer: string;
  accent: "red" | "teal" | "navy";
  informationState: "complete" | "incomplete" | "under_review";
  informationStateLabel: string;
  calculationState: "complete" | "incomplete";
  calculationStateLabel: string;
  regularNetYen: number;
  firstYearNetYen: number;
  annualFee: PrototypeComparisonFact;
  baseReward: PrototypeComparisonFact;
  rewardProgram: PrototypeComparisonFact;
  categoryRewards: PrototypeComparisonFact[];
  campaigns: PrototypeComparisonFact[];
  applicationRoutes: PrototypeComparisonFact[];
  variants: PrototypeComparisonFact[];
  familyCard: PrototypeComparisonFact;
  etcCard: PrototypeComparisonFact;
  timeline: PrototypeComparisonFact[];
  calculation: PrototypeCardCalculation;
  evidence: Array<{ id: string; label: string; value: string; note: string }>;
  cautions: string[];
  riskNotices: string[];
};

const disclosureLabels: Record<PrototypeDisclosureStatus, string> = {
  disclosed: "公式確認済み相当",
  partially_disclosed: "一部未確認",
  undisclosed: "非公開",
  unknown: "確認できず",
};

const joinDetail = (primary: string, secondary: string) =>
  secondary ? `${primary}\n${secondary}` : primary;

export function buildPrototypeComparisonCards(
  ids: PrototypeCardId[],
  scenario: PrototypeSearchScenario | null,
): PrototypeComparisonCard[] {
  return ids.flatMap((id) => {
    const detail = redesignedCardDetails[id];
    const featured = prototypeSearchCards.find((card) => card.id === id);
    if (!detail || !featured) return [];

    const activeScenario: PrototypeSearchScenario = scenario ?? {
      ...detail.defaultScenario,
      source: "default",
    };
    const calculation = calculatePrototypeCard(detail, activeScenario);
    const sourceFor = (sourceId: string) =>
      detail.evidence.find((source) => source.id === sourceId) ?? detail.evidence[0];
    const fact = ({
      label,
      value,
      disclosureStatus,
      evidenceId,
      effectivePeriod,
      confirmedOn,
    }: {
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceId: string;
      effectivePeriod?: string;
      confirmedOn?: string;
    }): PrototypeComparisonFact => {
      const source = sourceFor(evidenceId);
      return {
        label,
        value,
        disclosureStatus,
        disclosureLabel: disclosureLabels[disclosureStatus],
        confirmedOn: confirmedOn ?? source?.confirmedOn ?? detail.confirmedOn,
        effectivePeriod:
          effectivePeriod ?? source?.effectivePeriod ?? "適用期間を確認できず",
        evidenceId: `${id}-${evidenceId}-${label}`,
        evidenceLabel: source?.sourceTitle ?? "対応するEvidenceを確認できず",
      };
    };

    const mainFee = detail.feeRules.find((fee) => fee.target === "本会員");
    const baseReward = detail.rewardRules.find((rule) => rule.kind === "base");
    const primaryReward = detail.rewardPrograms.find(
      (program) => program.role === "基本で貯まる",
    );
    const familyCard = detail.additionalCards.find(
      (card) => card.kind === "家族カード",
    );
    const etcCard = detail.additionalCards.find((card) => card.kind === "ETCカード");

    const annualFee = mainFee
      ? fact({
          label: "本会員年会費",
          value: joinDetail(mainFee.displayValue, mainFee.freeCondition),
          disclosureStatus: mainFee.disclosureStatus,
          evidenceId: "rewards",
          effectivePeriod: mainFee.effectivePeriod,
        })
      : fact({
          label: "本会員年会費",
          value: "確認できませんでした。不存在とは確定していません。",
          disclosureStatus: "unknown",
          evidenceId: "rewards",
        });
    const baseRewardFact = baseReward
      ? fact({
          label: baseReward.label,
          value: joinDetail(baseReward.displayRate, baseReward.eligibleTransactions),
          disclosureStatus: baseReward.disclosureStatus,
          evidenceId: "rewards",
          effectivePeriod: baseReward.effectivePeriod,
        })
      : fact({
          label: "基本還元",
          value: "確認できませんでした。不存在とは確定していません。",
          disclosureStatus: "unknown",
          evidenceId: "rewards",
        });
    const rewardProgram = primaryReward
      ? fact({
          label: primaryReward.name,
          value: `${primaryReward.value}／${primaryReward.expiry}`,
          disclosureStatus: primaryReward.disclosureStatus,
          evidenceId: "rewards",
        })
      : fact({
          label: "ポイントProgram",
          value: "確認できませんでした。不存在とは確定していません。",
          disclosureStatus: "unknown",
          evidenceId: "rewards",
        });
    const categoryRewards = detail.rewardRules
      .filter((rule) => rule.kind === "category")
      .map((rule) =>
        fact({
          label: rule.label,
          value: joinDetail(
            rule.displayRate,
            `${rule.assumedService ?? rule.eligibleTransactions}／${rule.cap}`,
          ),
          disclosureStatus: rule.disclosureStatus,
          evidenceId: "rewards",
          effectivePeriod: rule.effectivePeriod,
        }),
      );
    const campaigns =
      detail.campaigns.length > 0
        ? detail.campaigns.map((campaign) =>
            fact({
              label: campaign.title,
              value: [
                campaign.status,
                campaign.instanceLabel ?? "実施回を確認できず",
                `登録期間：${campaign.registrationPeriod}`,
                `対象利用期間：${campaign.qualifyingPeriod}`,
                `判定期間：${campaign.decisionPeriod}`,
                `付与期間：${campaign.grantPeriod}`,
              ].join("\n"),
              disclosureStatus: campaign.disclosureStatus,
              evidenceId: "rewards",
              effectivePeriod: [
                `登録 ${campaign.registrationPeriod}`,
                `対象利用 ${campaign.qualifyingPeriod}`,
                `判定 ${campaign.decisionPeriod}`,
                `付与 ${campaign.grantPeriod}`,
              ].join("／"),
            }),
          )
        : [
            fact({
              label: "Campaign",
              value: "合成Fixtureに登録がありません。実施なしとは確認できていません。",
              disclosureStatus: "unknown",
              evidenceId: "rewards",
            }),
          ];
    const applicationRoutes = detail.applicationRoutes.map((route) =>
      fact({
        label: route.label,
        value: `${route.status}・${route.eligibility}\n${route.type}／${route.conditionDifference}`,
        disclosureStatus: route.disclosureStatus,
        evidenceId: "product",
      }),
    );
    const variants = detail.cardFaces.map((face) =>
      fact({
        label: face.name,
        value: `${face.brand}／${face.grade}／${face.material}\n${face.availability}／${face.additionalFee}\n券面Claim固有の開示状態EvidenceはFixture未設定`,
        disclosureStatus: "unknown",
        evidenceId: "product",
        effectivePeriod: face.effectivePeriod,
      }),
    );
    const additionalFact = (
      kind: "家族カード" | "ETCカード",
      card: typeof familyCard,
    ) =>
      card
        ? fact({
            label: kind,
            value:
              kind === "家族カード"
                ? `${card.availability}・${card.annualFee}\n${card.eligibleUser}`
                : `${card.availability}・${card.annualFee}\n${card.application}`,
            disclosureStatus: card.disclosureStatus,
            evidenceId: "benefits",
          })
        : fact({
            label: kind,
            value: "確認できませんでした。設定なしとは確定していません。",
            disclosureStatus: "unknown",
            evidenceId: "benefits",
          });

    const calculationState = calculation.isIncomplete ? "incomplete" : "complete";
    const riskNotices = [
      ...(calculation.isIncomplete
        ? [
            "算定不完全：確認できた要素だけで計算しています。表示額は過小評価の可能性があり、未確認条件の確定後に結果・順位が変わる場合があります。",
          ]
        : ["算定条件を確認済み：表示した仮定の範囲で計算しています。"]),
      ...(detail.state === "under_review"
        ? [
            "変更確認中：旧値を確定値として継続利用せず、影響する追加還元を算定から除外しています。結果・順位が変わる可能性があるため、申込前に公式情報を確認してください。",
          ]
        : []),
    ];
    const timeline = [
      annualFee,
      baseRewardFact,
      rewardProgram,
      ...categoryRewards,
      ...campaigns,
      ...applicationRoutes,
      ...variants,
      additionalFact("家族カード", familyCard),
      additionalFact("ETCカード", etcCard),
    ];

    return [
      {
        id,
        name: detail.name,
        issuer: detail.issuer,
        accent: featured.accent,
        informationState: detail.state,
        informationStateLabel: detail.stateLabel,
        calculationState,
        calculationStateLabel:
          calculationState === "incomplete" ? "算定不完全" : "算定条件を確認済み",
        regularNetYen: calculation.regularNetYen,
        firstYearNetYen: calculation.firstYearNetYen,
        annualFee,
        baseReward: baseRewardFact,
        rewardProgram,
        categoryRewards,
        campaigns,
        applicationRoutes,
        variants,
        familyCard: additionalFact("家族カード", familyCard),
        etcCard: additionalFact("ETCカード", etcCard),
        timeline,
        calculation,
        evidence: detail.evidence.map((source) => ({
          id: `${id}-${source.id}`,
          label: source.label,
          value: `${source.sourceTitle}／確認日 ${source.confirmedOn}／適用期間 ${source.effectivePeriod}`,
          note: source.note,
        })),
        cautions: detail.keyCautions,
        riskNotices,
      },
    ];
  });
}
