import type { Metadata } from "next";
import AccountAuth from "./account-auth";

export const metadata: Metadata = {
  title: "Login・新規登録 | カードみっけ",
  description: "任意のAccount利用と認証状態を確認するUI-only Mockです。",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <AccountAuth />;
}
