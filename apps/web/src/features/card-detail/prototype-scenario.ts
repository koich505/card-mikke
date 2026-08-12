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
  { id: "other", label: "その他" },
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
const featuredServiceLabels: Record<PrototypeCategoryId, string> = {
  convenience: "デイリー24（架空）",
  supermarket: "みっけマート（架空）",
  drugstore: "ヘルスプラス（架空）",
  restaurant: "みっけダイニング（架空）",
  gas: "ロード給油所（架空）",
  utilities: "くらし電力（架空）",
  mobile: "みっけモバイル（架空）",
  transit: "そらいろ交通（架空）",
  travel: "そらいろホテル（架空）",
  online: "みっけモール（架空）",
  other: "個別の利用先（架空）",
};
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
  const serviceByCategory: PrototypeSearchScenario["serviceByCategory"] = {};

  for (const value of usageValues) {
    const separator = value.indexOf(":");
    if (separator < 1) continue;
    const categoryId = value.slice(0, separator) as PrototypeCategoryId;
    const amount = safeYen(value.slice(separator + 1));
    if (!categoryIds.has(categoryId) || amount === undefined) continue;
    usageByCategory[categoryId] = amount;
  }
  const serviceValues = raw.service
    ? Array.isArray(raw.service)
      ? raw.service
      : [raw.service]
    : [];
  for (const value of serviceValues) {
    const separator = value.indexOf(":");
    if (separator < 1) continue;
    const categoryId = value.slice(0, separator) as PrototypeCategoryId;
    const service = value.slice(separator + 1);
    if (
      !categoryIds.has(categoryId) ||
      !["best", "featured", "other"].includes(service)
    )
      continue;
    serviceByCategory[categoryId] = service as "best" | "featured" | "other";
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
    serviceByCategory,
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
    const service = scenario.serviceByCategory?.[id];
    if (service) query.append("service", `${id}:${service}`);
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
  const excluded: string[] = [
    "家族カード・ETCカードの任意費用",
    "ラウンジ・保険等の金銭換算しにくい便益",
  ];
  const assumptions: string[] = [
    "年間利用額を12か月へ均等配分して月間条件と上限を判定",
    "カテゴリだけを指定した場合は、表示した対象サービス内の最良条件を採用",
    "取引明細がないため、取引単位の端数は再現しない概算",
    "利用先内訳との差額は「その他の利用」として通常還元だけを適用",
  ];
  const regularRows: PrototypeCardCalculation["regularRows"] = [];

  const rewardFor = (annualAmount: number, rule: typeof baseRule) => {
    if (!rule) return 0;
    const unit = rule.grantUnitYen ?? 1;
    const usesMonthlyRounding = rule.grantUnit.includes("月間");
    const raw = usesMonthlyRounding
      ? Math.floor(annualAmount / 12 / unit) * unit * rule.rate * 12
      : annualAmount * rule.rate;
    return Math.floor(
      Math.min(
        raw,
        rule.monthlyCapYen === undefined
          ? Number.POSITIVE_INFINITY
          : rule.monthlyCapYen * 12,
        rule.annualCapYen ?? Number.POSITIVE_INFINITY,
      ),
    );
  };

  if (baseRule?.disclosureStatus === "disclosed") {
    regularRows.push({
      id: "base",
      label: "通常ポイント",
      amountYen: rewardFor(scenario.annualSpend, baseRule),
      operation: "plus",
      note: `${baseRule.displayRate}・${baseRule.grantUnit}・${baseRule.rounding}`,
    });
  } else {
    excluded.push("通常ポイント（確認状態が一部未確認または未確認）");
  }

  for (const rule of detail.rewardRules.filter(
    (item) => item.kind === "category" && item.categoryId,
  )) {
    const amount = scenario.usageByCategory[rule.categoryId!] ?? 0;
    if (amount <= 0) continue;
    if (rule.disclosureStatus !== "disclosed") {
      excluded.push(`${rule.label}の追加還元（条件または重複関係を確認できず）`);
      continue;
    }
    if (scenario.serviceByCategory?.[rule.categoryId!] === "other") {
      excluded.push(
        `${rule.label}の追加還元（「その他の店舗・サービス」を指定したため通常還元のみ）`,
      );
      continue;
    }
    const reward = rewardFor(amount, rule);
    if (reward <= 0) continue;
    regularRows.push({
      id: rule.id,
      label: `${rule.label}の追加還元`,
      amountYen: reward,
      operation: "plus",
      note: `${rule.displayRate}・${scenario.serviceByCategory?.[rule.categoryId!] === "featured" ? featuredServiceLabels[rule.categoryId!] : (rule.assumedService ?? rule.eligibleTransactions)}・${rule.cap}`,
    });
  }

  for (const benefit of detail.annualBenefits) {
    if (scenario.annualSpend < benefit.thresholdYen) continue;
    if (
      benefit.disclosureStatus !== "disclosed" ||
      !benefit.rewardYen ||
      benefit.effectType === "用途限定クーポン"
    ) {
      excluded.push(`${benefit.title}（換算価値または条件を確認できず）`);
      continue;
    }
    regularRows.push({
      id: benefit.id,
      label: benefit.title,
      amountYen: benefit.rewardYen,
      operation: "plus",
      note: benefit.reward,
    });
  }

  const mainFee = detail.feeRules.find((fee) => fee.target === "本会員");
  const feeIsConfirmed = mainFee?.disclosureStatus === "disclosed";
  const regularFeeWaived = Boolean(
    mainFee?.regularYearWaiver &&
    scenario.annualSpend >= mainFee.regularYearWaiver.thresholdYen,
  );
  if (feeIsConfirmed && (mainFee?.regularYearYen ?? 0) > 0 && !regularFeeWaived) {
    regularRows.push({
      id: "regular-fee",
      label: "本会員年会費",
      amountYen: mainFee!.regularYearYen!,
      operation: "minus",
      note: mainFee!.displayValue,
    });
  } else if (feeIsConfirmed && regularFeeWaived) {
    regularRows.push({
      id: "regular-fee-waived",
      label: "本会員年会費",
      amountYen: 0,
      operation: "minus",
      note: `${mainFee!.freeCondition}を入力条件で充足`,
    });
  } else if (!feeIsConfirmed) {
    excluded.push("本会員年会費（適用条件を確認できず）");
  }

  const firstYearRows = regularRows
    .filter((row) => row.id !== "regular-fee" && row.id !== "regular-fee-waived")
    .map((row) => ({ ...row }));
  if (feeIsConfirmed && (mainFee?.firstYearYen ?? 0) > 0) {
    firstYearRows.push({
      id: "first-fee",
      label: "初年度の本会員年会費",
      amountYen: mainFee!.firstYearYen!,
      operation: "minus",
      note: mainFee!.displayValue,
    });
  }

  for (const campaign of detail.campaigns) {
    const eligible =
      campaign.disclosureStatus === "disclosed" &&
      scenario.eligibleCampaignIds?.includes(campaign.id) &&
      (campaign.minimumSpendYen === undefined ||
        (scenario.campaignQualifyingSpendYen?.[campaign.id] ?? 0) >=
          campaign.minimumSpendYen);
    for (const effect of campaign.effects) {
      if (effect.certainty === "抽選") {
        excluded.push(`${campaign.title}の抽選特典`);
        continue;
      }
      if (!eligible || effect.disclosureStatus !== "disclosed" || !effect.rewardYen) {
        excluded.push(
          `${campaign.title}（申込経路・対象者・登録・対象期間を現在の条件では充足判定できない特典）`,
        );
        continue;
      }
      firstYearRows.push({
        id: `${campaign.id}-${effect.label}`,
        label: campaign.title,
        amountYen: effect.rewardYen,
        operation: "plus",
        note: `${effect.certainty}・${effect.reward}・${campaign.qualifyingPeriod}に${(scenario.campaignQualifyingSpendYen?.[campaign.id] ?? 0).toLocaleString("ja-JP")}円利用を確認済み`,
      });
    }
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
    assumptions,
    isIncomplete:
      detail.state !== "complete" ||
      excluded.some(
        (item) => item.includes("確認できず") || item.includes("判定できない"),
      ),
  };
}

export function categoryLabel(categoryId: PrototypeCategoryId) {
  return (
    prototypeCategories.find((item) => item.id === categoryId)?.label ?? categoryId
  );
}

export function featuredServiceLabel(categoryId: PrototypeCategoryId) {
  return featuredServiceLabels[categoryId];
}
