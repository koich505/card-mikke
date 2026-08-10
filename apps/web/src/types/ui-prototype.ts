export type PrototypeCalculationState = "complete" | "incomplete" | "under_review";
export type PrototypeCardId = "everyday-plus" | "travel-step" | "smart-basic";
export type PrototypeHttpsUrl = `https://${string}`;
export type PrototypeRating = 1 | 2 | 3 | 4 | 5;
export type PrototypeDisclosureStatus =
  "disclosed" | "partially_disclosed" | "undisclosed" | "unknown";

export type PrototypeEvidenceFact = {
  value: string;
  disclosureStatus: PrototypeDisclosureStatus;
  evidenceClaimId: string;
};

export type PrototypeFeaturedCard = {
  id: PrototypeCardId;
  name: string;
  issuer: string;
  issuerEvidenceClaimId: string;
  label: string;
  reason: string;
  regularYearValue: number;
  firstYearValue: number;
  annualFeeLabel: string;
  annualFeeEvidenceClaimId: string;
  baseRewardLabel: string;
  baseRewardEvidenceClaimId: string;
  valueEvidenceClaimIds: string[];
  confirmedOn: string;
  state: PrototypeCalculationState;
  stateLabel: string;
  accent: "red" | "teal" | "navy";
};

export type PrototypeCardDetail = {
  catchCopy: string;
  summary: string;
  editorialContext: {
    nature: string;
    sourceClaimIds: string[];
    affectsCalculation: false;
  };
  officialUrl: PrototypeHttpsUrl;
  termsUrl: PrototypeHttpsUrl;
  recommendedFor: string[];
  highlights: Array<{
    mark: string;
    title: string;
    description: string;
    evidenceClaimId: string;
    supportingEvidenceClaimIds?: string[];
  }>;
  rewardExamples: Array<{
    place: string;
    rate: string;
    note: string;
    evidenceClaimId: string;
  }>;
  specs: Array<{
    label: string;
    value: string;
    evidenceClaimId: string;
  }>;
  campaigns: Array<{
    id: string;
    evidenceClaimId: string;
    title: string;
    value: string;
    condition: string;
    campaignUrl: PrototypeHttpsUrl;
    sourceUrl: PrototypeHttpsUrl;
    startsOn?: string;
    endsOn?: string;
    entryRequired?: string;
    eligibleTransactions?: string;
    excludedTransactions?: string;
    cap?: string;
    awardedOn?: string;
    stackingRule?: string;
    status?: string;
    conditionFacts: Array<{
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
  }>;
  spendBonuses: Array<{
    id: string;
    evidenceClaimId: string;
    period: string;
    spend: string;
    reward: string;
    note: string;
    sourceUrl: PrototypeHttpsUrl;
    measurementStartsFrom?: string;
    eligibleTransactions?: string;
    excludedTransactions?: string;
    cap?: string;
    awardedOn?: string;
    stackingRule?: string;
    conditionFacts: Array<{
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
  }>;
  annualMilestones: Array<{
    id: string;
    evidenceClaimId: string;
    period: string;
    spend: string;
    benefit: string;
    note: string;
    sourceUrl: PrototypeHttpsUrl;
    measurementStartsFrom?: string;
    eligibleTransactions?: string;
    excludedTransactions?: string;
    awardedOn?: string;
    benefitValidity?: string;
    stackingRule?: string;
    conditionFacts: Array<{
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
  }>;
  pointProgram: {
    name: string;
    expiry: string;
    value: string;
    uses: string[];
    evidenceClaimId: string;
  };
  services: Array<{
    id: string;
    name: string;
    description: string;
    evidenceClaimId: string;
    supportingEvidenceClaimIds?: string[];
    valueReview: {
      status: "excluded_non_monetary" | "not_applicable";
      reason: string;
    };
  }>;
  application: {
    eligibility: string;
    issueSpeed: string;
    closingDate: string;
    paymentDate: string;
    evidenceClaimId: string;
  };
  applicationRoutes: Array<{
    id: string;
    type: string;
    label: string;
    eligibility: string;
    status: "受付中" | "受付停止" | "招待制";
    isPrimary: boolean;
    affiliateCondition: string;
    affiliateStatus:
      "correspondence_unverified" | "verified_same" | "verified_different" | "inactive";
    conditionDisclosureStatus: PrototypeDisclosureStatus;
    campaignIds: string[];
    campaignRelationStatus: "unknown" | "linked" | "not_applicable";
    externalAccountIds: string[];
    evidenceClaimId: string;
    officialApplicationUrl: PrototypeHttpsUrl;
    affiliateUrl?: PrototypeHttpsUrl;
  }>;
  variants: Array<{
    id: string;
    brand: string;
    form: string;
    annualFee: string;
    note: string;
    evidenceClaimId: string;
  }>;
  paymentSchemes: Array<{
    name: string;
    schedule: string;
    fee: string;
    selectableAtPurchase: string;
    postPurchaseChange: string;
    installmentCount: string;
    merchantLimitations: string;
    legalClassification: string;
    disclosureStatus: PrototypeDisclosureStatus;
    evidenceClaimId: string;
  }>;
  networkIdentifiers: string[];
  networkIdentifiersEvidenceClaimId: string;
  actorRoles: Array<{
    id: string;
    role: string;
    conceptId: string;
    organization: string;
    responsibility: string;
    effectivePeriod: string;
    evidenceClaimId: string;
  }>;
  lifecycle: {
    productStatus: PrototypeEvidenceFact;
    applicationStatus: PrototypeEvidenceFact;
    events: Array<{
      date: string;
      publishedOn: string;
      announcedOn?: string;
      retrievedOn?: string;
      effectiveFrom: string;
      effectiveTo: string;
      scope: "product" | "feature" | "application" | "partnership";
      target: string;
      status: string;
      fromStatus?: string;
      toStatus?: string;
      memberCohort?: string;
      change: string;
      evidenceClaimId: string;
    }>;
    successorRelations: Array<{
      successor: string;
      contractContinuity: string;
      rewardMigration: string;
      automaticSwitch: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
  };
  researchCoverage: {
    paymentInstrument: PrototypeEvidenceFact;
    fundingMethods: PrototypeEvidenceFact[];
    billingSettlement: PrototypeEvidenceFact;
    paymentInstrumentDetails: {
      id: string;
      variantIds: string[];
      issuerActorId: string;
      creditProviderActorId: string;
      lifecycleStatus: string;
      evidenceClaimId: string;
    };
    fundingMethodDetails: Array<{
      id: string;
      providerActorId: string;
      destinationAccount: string;
      fee: string;
      effectivePeriod: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
    creditProvider: PrototypeEvidenceFact;
    depositRule: PrototypeEvidenceFact;
    regulatoryRegistrations: Array<{
      actor: string;
      registration: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
    externalAccounts: Array<{
      id: string;
      name: string;
      operator: string;
      applicationRouteIds: string[];
      rewardDestinationIds: string[];
      applicationRequirement: string;
      rewardDestination: string;
      effectivePeriod: string;
      evidenceClaimId: string;
      disclosureStatus: PrototypeDisclosureStatus;
    }>;
    rewardDestinations: Array<{
      id: string;
      operator: string;
      externalAccountId: string;
      status: string;
      evidenceClaimId: string;
    }>;
    economicFlows: Array<{
      beneficiary: string;
      payer: string;
      partnership: string;
      flowType: "member_reward" | "partner_revenue_share_provisional";
      operator: string;
      condition: string;
      effectivePeriod: string;
      evidenceClaimId: string;
      disclosureStatus: PrototypeDisclosureStatus;
    }>;
    feesAndLimits: Array<{
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
    rewardRules: Array<{
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
    insuranceAndSecurity: Array<{
      label: string;
      value: string;
      disclosureStatus: PrototypeDisclosureStatus;
      evidenceClaimId: string;
    }>;
  };
  calculation: {
    annualSpend: string;
    usageAssumptions: string[];
    appliedEligibilityAssumptions: Array<{
      category: string;
      service: string;
      conditions: string;
      evidenceClaimId: string;
    }>;
    formulaChecks: Array<{
      label: string;
      annualSpend: number;
      rate: number;
      expectedAmount: number;
    }>;
    regularYear: Array<{
      label: string;
      amount: number;
      operation: "plus" | "minus";
      evidenceClaimId: string;
    }>;
    firstYear: Array<{
      label: string;
      amount: number;
      operation: "plus" | "minus";
      evidenceClaimId: string;
    }>;
    excludedItems: Array<{
      label: string;
      reason: string;
      disclosureStatus: PrototypeDisclosureStatus;
      impact: string;
      evidenceClaimId: string;
      supportingEvidenceClaimIds?: string[];
      sourceEntityIds: string[];
    }>;
  };
  evidenceStatus: {
    sourceTier: string;
    retrievedOn: string;
    confidence: string;
    unknowns: string[];
    changeReview?: {
      target: string;
      previousApprovedValue: string;
      previousConfirmedOn: string;
      calculationTreatment: string;
      candidateValue: string;
      impact: string;
    };
  };
  reviewSummary: {
    average: number | null;
    total: number;
    distributions: [number, number, number, number, number];
    collectionPeriod: string;
    displayedCount: number;
    moderationPolicy: string;
    reviews: Array<{
      title: string;
      rating: PrototypeRating;
      profile: string;
      body: string;
      postedOn: string;
      verified: boolean;
      moderationStatus: "approved";
    }>;
  };
  evidenceClaims: Array<{
    id: string;
    claim: string;
    value: string;
    sourceTitle: string;
    publisher: string;
    sourceType: "synthetic_fixture_no_evidence";
    tier: "no-evidence";
    publishedOn: string;
    effectivePeriod: string;
    retrievedOn: string;
    confidence: "not_applicable";
    disclosureStatus: PrototypeDisclosureStatus;
    calculationUse: "mock_scenario" | "included" | "excluded" | "reference_only";
    url: PrototypeHttpsUrl;
  }>;
  cautions: string[];
  cautionsEvidenceClaimId: string;
};

export type PrototypeArticle = {
  id: string;
  kind: "用途別" | "カード特集";
  title: string;
  description: string;
  audience: string;
  updatedOn: string;
  accent: "yellow" | "orange" | "teal";
};

export type PrototypeNewsItem = {
  id: string;
  kind: "記事公開" | "記事更新" | "カード情報更新";
  title: string;
  publishedOn: string;
};
