import type { Metadata } from "next";
import CorrectionManagement from "./correction-management";

export const metadata: Metadata = {
  title: "誤情報指摘管理 | カードみっけ",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <CorrectionManagement />;
}
