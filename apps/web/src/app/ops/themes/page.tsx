import type { Metadata } from "next";
import ThemeManagement from "./theme-management";

export const metadata: Metadata = {
  title: "テーマ管理 | カードみっけ",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <ThemeManagement />;
}
