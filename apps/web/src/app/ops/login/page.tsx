import type { Metadata } from "next";
import { OpsLoginPage } from "../auth-pages";

export const metadata: Metadata = { title: "管理者Login | カードみっけ" };

export default function Page() {
  return <OpsLoginPage />;
}
