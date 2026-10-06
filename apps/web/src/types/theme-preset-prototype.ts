import type { PrototypeSearchScenario } from "@/types/card-detail-prototype";

/** UI-onlyモック専用。Domain Entity、API Contract、永続化Modelではない。 */
export type PrototypeThemePreset = {
  id: string;
  name: string;
  description: string;
  displayOrder: number;
  state: "published" | "private";
  scenario: PrototypeSearchScenario;
  updatedAt: string;
};

export type PrototypeThemeHistorySnapshot = {
  id: string;
  savedAt: string;
  themeName: string;
  scenario: PrototypeSearchScenario;
  resultNames: string[];
};
