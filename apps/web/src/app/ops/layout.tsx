import type { Metadata } from "next";
import { OpsProvider } from "./ops-provider";

export const metadata: Metadata = {
  title: "運営管理 UIモック | カードみっけ",
  description: "カードみっけの運営管理Flowを確認するUI-only Mockです。",
  robots: { index: false, follow: false, nocache: true },
};

export default function OpsLayout({ children }: LayoutProps<"/ops">) {
  return <OpsProvider>{children}</OpsProvider>;
}
