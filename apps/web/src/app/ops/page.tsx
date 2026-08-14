import type { Metadata } from "next";
import { OpsDashboard } from "./dashboard";

export const metadata: Metadata = { title: "運営Dashboard | カードみっけ" };

export default async function Page({ searchParams }: PageProps<"/ops">) {
  const params = await searchParams;
  const raw = params.scenario;
  const scenario =
    raw === "loading" || raw === "empty" || raw === "error" ? raw : "default";
  return <OpsDashboard scenario={scenario} />;
}
