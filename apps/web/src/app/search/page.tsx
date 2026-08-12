import type { Metadata } from "next";
import { parsePrototypeScenario } from "@/features/card-detail/prototype-scenario";
import SearchPrototype from "./search-prototype";

export const metadata: Metadata = {
  title: "条件からカードを探す｜カードみっけ",
  description:
    "年間利用額とタイプを選ぶかんたん検索と、利用先まで入力できる詳細検索でカードを比較できます。",
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const scenario = parsePrototypeScenario(await searchParams);
  return <SearchPrototype initialScenario={scenario} />;
}
