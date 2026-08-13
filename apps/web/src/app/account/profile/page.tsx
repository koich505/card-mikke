import type { Metadata } from "next";
import ProfilePrototype from "./profile-prototype";

export const metadata: Metadata = {
  title: "Account｜カードみっけ",
  description:
    "プロフィール、検索・比較履歴、保存データを確認・管理するAccount UIモックです。",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfilePrototype />;
}
