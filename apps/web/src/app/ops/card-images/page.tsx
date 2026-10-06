import type { Metadata } from "next";
import CardImageReview from "./card-image-review";

export const metadata: Metadata = {
  title: "券面画像確認・承認 | カードみっけ",
  robots: { index: false, follow: false, nocache: true },
};
export default function Page() {
  return <CardImageReview />;
}
