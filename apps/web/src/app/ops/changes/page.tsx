import type { Metadata } from "next";
import { Suspense } from "react";
import { OpsChangesList } from "./changes-list";

export const metadata: Metadata = { title: "公式Source差分一覧 | カードみっけ" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OpsChangesList />
    </Suspense>
  );
}
