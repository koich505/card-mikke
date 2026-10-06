import type { Metadata } from "next";
import ReviewModeration from "./review-moderation";

export const metadata: Metadata = {
  title: "Review Moderation | カードみっけ",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <ReviewModeration />;
}
