import { serializePrototypeScenario } from "@/features/card-detail/prototype-scenario";
import type { PrototypeRawSearchParams } from "@/features/card-detail/prototype-scenario";
import type { PrototypeSearchScenario } from "@/types/card-detail-prototype";
import type { PrototypeCardId } from "@/types/ui-prototype";

const prototypeCardIds: PrototypeCardId[] = [
  "everyday-plus",
  "travel-step",
  "smart-basic",
];
const prototypeCardIdSet = new Set(prototypeCardIds);

export type PrototypeSearchLaunch = {
  initialView: "results" | "compare";
  compareCardIds: PrototypeCardId[];
  fromHistory: boolean;
};

export function parsePrototypeSearchLaunch(
  raw: PrototypeRawSearchParams,
): PrototypeSearchLaunch {
  const rawView = Array.isArray(raw.view) ? raw.view[0] : raw.view;
  const rawHistory = Array.isArray(raw.history) ? raw.history[0] : raw.history;
  const compareValues = raw.compare
    ? Array.isArray(raw.compare)
      ? raw.compare
      : [raw.compare]
    : [];
  const compareCardIds = [...new Set(compareValues)]
    .filter((id): id is PrototypeCardId =>
      prototypeCardIdSet.has(id as PrototypeCardId),
    )
    .slice(0, 5);

  return {
    initialView:
      rawView === "compare" && compareCardIds.length >= 2 ? "compare" : "results",
    compareCardIds,
    fromHistory: rawHistory === "latest",
  };
}

export function withPrototypeSearchLaunch(
  scenario: PrototypeSearchScenario,
  compareCardIds: PrototypeCardId[] = [],
) {
  const query = new URLSearchParams(serializePrototypeScenario(scenario));
  query.set("history", "latest");
  const validIds = [...new Set(compareCardIds)]
    .filter((id) => prototypeCardIdSet.has(id))
    .slice(0, 5);
  if (validIds.length >= 2) {
    query.set("view", "compare");
    validIds.forEach((id) => query.append("compare", id));
  }
  return `/search?${query.toString()}`;
}
