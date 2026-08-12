import type {
  PrototypeCardId,
  PrototypeDisclosureStatus,
  PrototypeRating,
} from "@/types/ui-prototype";

/**
 * UI-onlyモック専用の表示モデル。
 * Domain Entity、永続化Model、API Contractとして使用しない。
 */
export type PrototypeCategoryId =
  | "convenience"
  | "supermarket"
  | "drugstore"
  | "restaurant"
  | "gas"
  | "utilities"
  | "mobile"
  | "transit"
  | "travel"
  | "online";

export type PrototypeProfileId =
  "everyday" | "points" | "travel" | "simple" | "shopping" | "custom";

export type PrototypeSearchScenario = {
  annualSpend: number;
  profileId?: PrototypeProfileId;
  usageByCategory: Partial<Record<PrototypeCategoryId, number>>;
  source: "search" | "default" | "custom";
};

export type PrototypeCardFace = {
  id: string;
  name: string;
  material: string;
  brand: string;
  grade: string;
  availability: string;
  additionalFee: string;
  changeRule: string;
  effectivePeriod: string;
  alt: string;
  tone: "yellow" | "navy" | "red" | "teal" | "silver" | "white";
  motif: "sun" | "grid" | "journey" | "lines" | "minimal" | "dots";
};

export type PrototypeFeeRule = {
  id: string;
  target: "本会員" | "家族カード" | "ETCカード" | "再発行" | "海外利用";
  label: string;
  firstYearYen?: number;
  regularYearYen?: number;
  displayValue: string;
  freeCondition: string;
  measurementPeriod: string;
  excludedTransactions: string;
  chargedOn: string;
  effectivePeriod: string;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeRewardProgram = {
  id: string;
  name: string;
  role: "基本で貯まる" | "選択コース" | "交換先" | "Campaign付与";
  operator: string;
  selectionRule: string;
  expiry: string;
  value: string;
  minimumExchange: string;
  uses: string[];
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeRewardRule = {
  id: string;
  label: string;
  kind: "base" | "category";
  programId: string;
  categoryId?: PrototypeCategoryId;
  rate: number;
  displayRate: string;
  eligibleTransactions: string;
  excludedTransactions: string;
  grantUnit: string;
  rounding: string;
  grantedOn: string;
  cap: string;
  stacking: string;
  effectivePeriod: string;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeCampaign = {
  id: string;
  title: string;
  status: string;
  routeIds: string[];
  registrationPeriod: string;
  qualifyingPeriod: string;
  entryRequired: string;
  eligibleTransactions: string;
  excludedTransactions: string;
  cap: string;
  grantedOn: string;
  stacking: string;
  minimumSpendYen?: number;
  effects: Array<{
    label: string;
    reward: string;
    rewardYen?: number;
    certainty: "確定付与" | "抽選";
    beneficiary: string;
  }>;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeAnnualBenefit = {
  id: string;
  title: string;
  thresholdYen: number;
  measurementPeriod: string;
  eligibleTransactions: string;
  excludedTransactions: string;
  reward: string;
  rewardYen?: number;
  grantedOn: string;
  validUntil: string;
  stacking: string;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeAdditionalCard = {
  id: string;
  kind: "家族カード" | "ETCカード";
  availability: string;
  eligibleUser: string;
  count: string;
  annualFee: string;
  issueFee: string;
  application: string;
  issueTime: string;
  reward: string;
  sharedLimit: string;
  benefits: string;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeBenefit = {
  id: string;
  name: string;
  category: "ラウンジ" | "旅行" | "ショッピング" | "日常" | "セキュリティ";
  provider: string;
  user: string;
  beneficiary: string;
  access: string;
  conditionType: "保有のみ" | "登録" | "予約" | "対象利用";
  conditions: string;
  limit: string;
  companion: string;
  exclusions: string;
  effectivePeriod: string;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeCoverage = {
  id: string;
  name: string;
  insured: string;
  beneficiary: string;
  attachment: string;
  insuredEvent: string;
  limit: string;
  deductible: string;
  exclusions: string;
  claimRequirement: string;
  coveragePeriod: string;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeInsuranceProduct = {
  id: string;
  name: string;
  underwriter: string;
  claimsHandler: string;
  attachment: string;
  effectivePeriod: string;
  coverages: PrototypeCoverage[];
};

export type PrototypeApplicationRoute = {
  id: string;
  type: "一般申込" | "招待" | "切替";
  label: string;
  eligibility: string;
  screening: string;
  status: "受付中" | "受付停止" | "招待受付";
  issueTime: string;
  campaignIds: string[];
  conditionDifference: string;
  mockUrl: `https://${string}`;
  disclosureStatus: PrototypeDisclosureStatus;
};

export type PrototypeSpecification = {
  brands: string[];
  contactless: string;
  mobileWallets: string;
  closingDate: string;
  paymentDate: string;
  issueForm: string;
  overseasFee: string;
  reissueFee: string;
  notification: string;
  cardLock: string;
  authentication: string;
};

export type PrototypeReviewSummary = {
  average: number | null;
  total: number;
  distributions: [number, number, number, number, number];
  collectionPeriod: string;
  moderationPolicy: string;
  reviews: Array<{
    id: string;
    title: string;
    rating: PrototypeRating;
    profile: string;
    body: string;
    postedOn: string;
  }>;
};

export type PrototypeEvidenceSource = {
  id: string;
  label: string;
  status: PrototypeDisclosureStatus;
  confirmedOn: string;
  effectivePeriod: string;
  sourceTitle: string;
  note: string;
};

export type PrototypeCardDetailViewModel = {
  id: PrototypeCardId;
  name: string;
  issuer: string;
  eyebrow: string;
  catchCopy: string;
  summary: string;
  state: "complete" | "incomplete" | "under_review";
  stateLabel: string;
  confirmedOn: string;
  applicationStatus: string;
  defaultScenario: Omit<PrototypeSearchScenario, "source">;
  cardFaces: PrototypeCardFace[];
  feeRules: PrototypeFeeRule[];
  rewardPrograms: PrototypeRewardProgram[];
  rewardRules: PrototypeRewardRule[];
  campaigns: PrototypeCampaign[];
  annualBenefits: PrototypeAnnualBenefit[];
  additionalCards: PrototypeAdditionalCard[];
  benefits: PrototypeBenefit[];
  insuranceProducts: PrototypeInsuranceProduct[];
  applicationRoutes: PrototypeApplicationRoute[];
  specifications: PrototypeSpecification;
  reviews: PrototypeReviewSummary;
  evidence: PrototypeEvidenceSource[];
  keyCautions: string[];
};

export type PrototypeCalculationRow = {
  id: string;
  label: string;
  amountYen: number;
  operation: "plus" | "minus";
  note: string;
};

export type PrototypeCardCalculation = {
  regularRows: PrototypeCalculationRow[];
  firstYearRows: PrototypeCalculationRow[];
  regularNetYen: number;
  firstYearNetYen: number;
  excluded: string[];
};
