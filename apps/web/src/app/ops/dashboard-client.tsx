"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { OpsDashboard, type DashboardScenario } from "./dashboard";

const subscribeToLocation = (onStoreChange: () => void) => {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
};

const getScenario = () => new URLSearchParams(window.location.search).get("scenario");

const getServerScenario = () => null;

const normalizeScenario = (scenario: string | null): DashboardScenario =>
  scenario === "loading" || scenario === "empty" || scenario === "error"
    ? scenario
    : "default";

export default function OpsDashboardClient() {
  const [selectedScenario, setSelectedScenario] = useState<DashboardScenario | null>(
    null,
  );
  const rawScenario = useSyncExternalStore(
    subscribeToLocation,
    getScenario,
    getServerScenario,
  );
  const urlScenario = normalizeScenario(rawScenario);
  const scenario = selectedScenario ?? urlScenario;

  useEffect(() => {
    const clearSelection = () => setSelectedScenario(null);
    window.addEventListener("popstate", clearSelection);
    return () => window.removeEventListener("popstate", clearSelection);
  }, []);

  return <OpsDashboard scenario={scenario} onScenarioChange={setSelectedScenario} />;
}
