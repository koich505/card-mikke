import type { Metadata } from "next";
import { prototypeOpsChanges } from "@/fixtures/ops";
import { OpsChangeReview } from "../change-review";

export const metadata: Metadata = {
  title: "カード情報差分の確認・編集 | カードみっけ",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(prototypeOpsChanges).map((id) => ({ id }));
}

export default async function Page({ params }: PageProps<"/ops/changes/[id]">) {
  const { id } = await params;
  return <OpsChangeReview changeId={id} />;
}
