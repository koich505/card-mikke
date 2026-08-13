import type { PrototypeCategoryId } from "./card-detail-prototype";

export type PrototypeAgeBand =
  "18-19" | "20s" | "30s" | "40s" | "50s" | "60plus" | "prefer-not-to-answer";

export type PrototypeJoiningTime =
  "within-one-month" | "within-three-months" | "within-six-months" | "undecided";

export type PrototypeProfile = {
  annualSpend: number | null;
  usageByCategory: Partial<Record<PrototypeCategoryId, number>>;
  frequentServiceIds: string[];
  ageBand: PrototypeAgeBand;
  joiningTime: PrototypeJoiningTime;
  pointPreferenceIds: string[];
};

export type PrototypeProfileSection = "usage" | "personal" | "points";
export type PrototypeProfileSaveState = "saved" | "saving" | "failed";
