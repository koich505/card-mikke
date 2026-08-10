import type { Metadata } from "next";
import SearchPrototype from "./search-prototype";

export const metadata: Metadata = {
  title: "条件からカードを探す｜カードみっけ",
  description: "年間利用額と利用先を指定し、合成カードの比較UIを試せます。",
};

export default function SearchPage() {
  return <SearchPrototype />;
}
