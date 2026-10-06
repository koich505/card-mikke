import type { Metadata } from "next";
import BusinessDataManagement from "./business-data-management";

export const metadata: Metadata = {
  title: "業務情報管理 | カードみっけ",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <BusinessDataManagement />;
}
