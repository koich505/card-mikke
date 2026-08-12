import type {
  PrototypeCardCalculation,
  PrototypeCardDetailViewModel,
  PrototypeCategoryId,
  PrototypeProfileId,
  PrototypeSearchScenario,
} from "@/types/card-detail-prototype";

export type PrototypeRawSearchParams = Record<string, string | string[] | undefined>;

export const prototypeCategories: Array<{
  id: PrototypeCategoryId;
  label: string;
}> = [
  { id: "convenience", label: "コンビニ" },
  { id: "supermarket", label: "スーパー" },
  { id: "drugstore", label: "ドラッグストア" },
  { id: "restaurant", label: "飲食店" },
  { id: "gas", label: "ガソリン" },
  { id: "utilities", label: "公共料金" },
  { id: "mobile", label: "携帯電話" },
  { id: "transit", label: "交通" },
  { id: "travel", label: "旅行・宿泊" },
  { id: "online", label: "ネット通販" },
];

const profileIds: PrototypeProfileId[] = [
  "everyday",
  "points",
  "travel",
  "simple",
  "shopping",
  "custom",
];

const categoryIds = new Set(prototypeCategories.map((item) => item.id));
const MAX_ANNUAL_SPEND = 100_000_000;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const safeYen = (value: string | undefined) => {
  if (!value || !/^\d+$/.test(value)) return undefined;
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0 || number > MAX_ANNUAL_SPEND) {
    return undefined;
  }
  return number;
};

export function parsePrototypeScenario(
  raw: PrototypeRawSearchParams,
): PrototypeSearchScenario | null {
  const annualSpend = safeYen(first(raw.annualSpend));
  if (!annualSpend || annualSpend === 0) return null;

  const profileValue = first(raw.profile);
  const profileId = profileIds.includes(profileValue as PrototypeProfileId)
    ? (profileValue as PrototypeProfileId)
    : undefined;
  const usageValues = raw.usage
    ? Array.isArray(raw.usage)
      ? raw.usage
      : [raw.usage]
    : [];
  const usageByCategory: PrototypeSearchScenario["usageByCategory"] = {};

  for (const value of usageValues) {
    const separator = value.indexOf(":");
    if (separator < 1) continue;
    const categoryId = value.slice(0, separator) as PrototypeCategoryId;
    const amount = safeYen(value.slice(separator + 1));
    if (!categoryIds.has(categoryId) || amount === undefined) continue;
    usageByCategory[categoryId] = amount;
  }

  const allocated = Object.values(usageByCategory).reduce(
    (total, amount) => total + (amount ?? 0),
    0,
  );
  if (allocated > annualSpend) return null;

  return {
    annualSpend,
    profileId,
    usageByCategory,
    source: first(raw.scenario) === "default" ? "default" : "search",
  };
}

export function createDefaultScenario(
  detail: PrototypeCardDetailViewModel,
): PrototypeSearchScenario {
  return { ...detail.defaultScenario, source: "default" };
}

export function serializePrototypeScenario(scenario: PrototypeSearchScenario) {
  const query = new URLSearchParams();
  query.set("annualSpend", String(Math.round(scenario.annualSpend)));
  if (scenario.source === "default") query.set("scenario", "default");
  if (scenario.profileId) query.set("profile", scenario.profileId);
  for (const { id } of prototypeCategories) {
    const amount = scenario.usageByCategory[id];
    if (amount && amount > 0) query.append("usage", `${id}:${Math.round(amount)}`);
  }
  return query.toString();
}

export function withPrototypeScenario(
  pathname: string,
  scenario: PrototypeSearchScenario,
) {
  const query = serializePrototypeScenario(scenario);
  return query ? `${pathname}?${query}` : pathname;
}

export function calculatePrototypeCard(
  detail: PrototypeCardDetailViewModel,
  scenario: PrototypeSearchScenario,
): PrototypeCardCalculation {
  const baseRule = detail.rewardRules.find((rule) => rule.kind === "base");
  const baseReward = Math.floor(scenario.annualSpend * (baseRule?.rate ?? 0));
  const regularRows: PrototypeCardCalculation["regularRows"] = [
    {
      id: "base",
      label: "通常ポイント",
      amountYen: baseReward,
      operation: "plus",
      note: baseRule?.displayRate ?? "確認できず",
    },
  ];

  for (const rule of detail.rewardRules.filter(
    (item) => item.kind === "category" && item.categoryId,
  )) {
    const amount = scenario.usageByCategory[rule.categoryId!] ?? 0;
    if (amount <= 0) continue;
    const reward = Math.floor(amount * rule.rate);
    if (reward <= 0) continue;
    regularRows.push({
      id: rule.id,
      label: `${rule.label}の追加還元`,
      amountYen: reward,
      operation: "plus",
      note: `${rule.displayRate}・年間利用額 ${amount.toLocaleString("ja-JP")}円`,
    });
  }

  for (const benefit of detail.annualBenefits) {
    if (scenario.annualSpend < benefit.thresholdYen || !benefit.rewardYen) continue;
    regularRows.push({
      id: benefit.id,
      label: benefit.title,
      amountYen: benefit.rewardYen,
      operation: "plus",
      note: benefit.reward,
    });
  }

  const mainFee = detail.feeRules.find((fee) => fee.target === "本会員");
  if ((mainFee?.regularYearYen ?? 0) > 0) {
    regularRows.push({
      id: "regular-fee",
      label: "本会員年会費",
      amountYen: mainFee!.regularYearYen!,
      operation: "minus",
      note: mainFee!.displayValue,
    });
  }

  const firstYearRows = regularRows
    .filter((row) => row.id !== "regular-fee")
    .map((row) => ({ ...row }));
  if ((mainFee?.firstYearYen ?? 0) > 0) {
    firstYearRows.push({
      id: "first-fee",
      label: "初年度の本会員年会費",
      amountYen: mainFee!.firstYearYen!,
      operation: "minus",
      note: mainFee!.displayValue,
    });
  }

  const excluded: string[] = [
    "家族カード・ETCカードの任意費用",
    "ラウンジ・保険等の金銭換算しにくい便益",
  ];

  for (const campaign of detail.campaigns) {
    const eligible =
      campaign.minimumSpendYen === undefined ||
      scenario.annualSpend >= campaign.minimumSpendYen;
    for (const effect of campaign.effects) {
      if (effect.certainty === "抽選") {
        excluded.push(`${campaign.title}の抽選特典`);
        continue;
      }
      if (!eligible || !effect.rewardYen) {
        excluded.push(`${campaign.title}（入力条件では充足判定できない特典）`);
        continue;
      }
      firstYearRows.push({
        id: `${campaign.id}-${effect.label}`,
        label: campaign.title,
        amountYen: effect.rewardYen,
        operation: "plus",
        note: `${effect.certainty}・${effect.reward}`,
      });
    }
  }

  if (detail.state !== "complete") {
    excluded.push("確認できない条件・変更確認中の情報");
  }

  const total = (rows: PrototypeCardCalculation["regularRows"]) =>
    rows.reduce(
      (sum, row) => sum + (row.operation === "minus" ? -row.amountYen : row.amountYen),
      0,
    );

  return {
    regularRows,
    firstYearRows,
    regularNetYen: total(regularRows),
    firstYearNetYen: total(firstYearRows),
    excluded: [...new Set(excluded)],
  };
}

export function categoryLabel(categoryId: PrototypeCategoryId) {
  return (
    prototypeCategories.find((item) => item.id === categoryId)?.label ?? categoryId
  );
}
