export type PrototypeCalculationState = "complete" | "incomplete" | "under_review";

export type PrototypeFeaturedCard = {
  id: string;
  name: string;
  issuer: string;
  label: string;
  reason: string;
  regularYearValue: number;
  firstYearValue: number;
  annualFeeLabel: string;
  baseRewardLabel: string;
  confirmedOn: string;
  state: PrototypeCalculationState;
  stateLabel: string;
  accent: "red" | "teal" | "navy";
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
