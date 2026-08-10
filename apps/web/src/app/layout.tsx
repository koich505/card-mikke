import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://card-mikke.example.invalid"),
  title: "カードみっけ｜使い方に合うクレジットカードを比較",
  description:
    "年間利用額やよく使うお店から、クレジットカードの年間正味還元額を比較できるUIモックです。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
