import type { Metadata } from "next";
import { OpsMfaPage } from "../auth-pages";

export const metadata: Metadata = { title: "多要素認証 | カードみっけ" };

export default function Page() {
  return <OpsMfaPage />;
}
