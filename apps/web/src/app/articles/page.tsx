import type { Metadata } from "next";
import SiteHeader from "@/app/components/site-header";
import ArticleList from "@/app/articles/article-list";
import { featureArticles } from "@/fixtures/articles";

export const metadata: Metadata = {
  title: "特集記事 | カードみっけ",
  description:
    "用途別の選び方、カード比較、単一カード特集を検索・絞り込みできる特集記事一覧です。",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <div>
      <a className="skip-link" href="#article-list-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="article" />
      <ArticleList articles={featureArticles} />
    </div>
  );
}
