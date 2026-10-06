import type { Metadata } from "next";
import OpsDashboardClient from "./dashboard-client";

export const metadata: Metadata = { title: "運営Dashboard | カードみっけ" };

export default function Page() {
  return <OpsDashboardClient />;
}
