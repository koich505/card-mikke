import type { PrototypeSearchScenario } from "./card-detail-prototype";
import type { PrototypeCardId } from "./ui-prototype";

/**
 * UI-onlyモック専用の検索・比較履歴表示モデル。
 * Domain Entity、永続化Model、API Contractとして使用しない。
 */
export type PrototypeHistoryEntry = {
  id: string;
  searchedAt: string;
  title: string;
  kind: "search" | "compare";
  resultCount: number;
  scenario: PrototypeSearchScenario;
  categoryLabels: string[];
  preferenceLabels: string[];
  compareCardIds: PrototypeCardId[];
  historicalCalculation: {
    calculatedAt: string;
    evidenceConfirmedOn: string;
    cardResults: Array<{ cardId: PrototypeCardId; annualNetValueYen: number }>;
  };
};

export type PrototypeSearchHistory = PrototypeHistoryEntry[];

export type PrototypeDataSummary = {
  historyRetention: string;
  accountDeletionSchedule: string;
  accountRetentionExceptions: string[];
};

export type PrototypeDestructiveActionState =
  "idle" | "confirming" | "processing" | "succeeded" | "failed";

export type PrototypeAccountTabId = "profile" | "history" | "data";
