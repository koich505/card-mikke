import type { Metadata } from "next";
import { OpsChangeReview } from "../change-review";

export const metadata: Metadata = {
  title: "カード情報差分の確認・編集 | カードみっけ",
};

export default async function Page({
  params,
  searchParams,
}: PageProps<"/ops/changes/[id]">) {
  const { id } = await params;
  const query = await searchParams;
  return (
    <OpsChangeReview
      changeId={id}
      returnQuery={typeof query.return === "string" ? query.return : ""}
    />
  );
}
