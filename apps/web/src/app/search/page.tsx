import type { Metadata } from "next";
import SearchPrototype from "./search-prototype";

export const metadata: Metadata = {
  title: "条件からカードを探す｜カードみっけ",
  description:
    "年間利用額とタイプを選ぶかんたん検索と、利用先まで入力できる詳細検索でカードを比較できます。",
};

export default function SearchPage() {
  return <SearchPrototype />;
}
