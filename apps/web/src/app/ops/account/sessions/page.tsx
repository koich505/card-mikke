import type { Metadata } from "next";
import { OpsSessionsPage } from "./sessions-page";

export const metadata: Metadata = { title: "管理者Session | カードみっけ" };

export default function Page() {
  return <OpsSessionsPage />;
}
