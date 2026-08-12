import type { PrototypeCardId } from "@/types/ui-prototype";

export type PrototypeArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

type PrototypeArticleBase = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  updatedOn: string;
  confirmedOn: string;
  visualTheme: "shopping" | "single-card" | "positioning";
  sections: PrototypeArticleSection[];
  relatedCards: Array<{
    cardId: PrototypeCardId;
    reason: string;
  }>;
  cautions: string[];
};

export type PrototypePurposeArticle = PrototypeArticleBase & {
  type: "purpose";
  kindLabel: "用途・読者像別";
  selectionCriteria: string[];
  candidateReasons: Array<{
    cardId: PrototypeCardId;
    reason: string;
  }>;
};

export type PrototypeSingleCardArticle = PrototypeArticleBase & {
  type: "single-card";
  kindLabel: "単一カード特集";
  targetCardId: PrototypeCardId;
  features: string[];
  conditions: string[];
  changes: string[];
};

export type PrototypeAxisArticle = PrototypeArticleBase & {
  type: "two-axis";
  kindLabel: "二軸比較記事";
  axes: {
    horizontal: { name: string; low: string; high: string; criterion: string };
    vertical: { name: string; low: string; high: string; criterion: string };
  };
  placements: Array<{
    cardId: PrototypeCardId;
    /** 軸内の相対位置。0が小さい側、100が大きい側。 */
    x: number;
    /** 軸内の相対位置。0が小さい側、100が大きい側。 */
    y: number;
    reason: string;
  }>;
  textAlternative: string[];
};

export type PrototypeFeatureArticle =
  PrototypePurposeArticle | PrototypeSingleCardArticle | PrototypeAxisArticle;
