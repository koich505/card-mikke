import type { Metadata } from "next";
import ArticleDraftReview from "./article-draft-review";

export const metadata: Metadata = {
  title: "記事Draft編集・承認 | カードみっけ",
  robots: { index: false, follow: false, nocache: true },
};
export default function Page() {
  return <ArticleDraftReview />;
}
