import type { Metadata } from "next";
import { OpsChangesList } from "./changes-list";

export const metadata: Metadata = { title: "公式Source差分一覧 | カードみっけ" };

export default async function Page({ searchParams }: PageProps<"/ops/changes">) {
  const params = await searchParams;
  return <OpsChangesList initialParams={params} />;
}
