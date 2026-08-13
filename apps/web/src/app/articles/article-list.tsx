"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { featuredCards } from "@/fixtures/home";
import type { PrototypeFeatureArticle } from "@/types/article-prototype";
import styles from "./article-list.module.css";

type ArticleListProps = { articles: PrototypeFeatureArticle[] };
type ArticleType = PrototypeFeatureArticle["type"] | "all";
type Sort = "newest" | "updated";

const articleTypes: Array<{ value: ArticleType; label: string }> = [
  { value: "all", label: "すべて" },
  { value: "purpose", label: "用途・読者像別" },
  { value: "two-axis", label: "二軸比較" },
  { value: "single-card", label: "単一カード特集" },
];

export default function ArticleList({ articles }: ArticleListProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<ArticleType>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const tags = useMemo(
    () =>
      [...new Set(articles.flatMap((article) => article.tags))].sort((a, b) =>
        a.localeCompare(b, "ja"),
      ),
    [articles],
  );

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ja-JP");
    return articles
      .filter((article) => {
        const targetCardName =
          article.type === "single-card"
            ? (featuredCards.find((card) => card.id === article.targetCardId)?.name ??
              "")
            : "";
        const haystack = [
          article.title,
          article.description,
          article.tags.join(" "),
          targetCardName,
        ]
          .join(" ")
          .toLocaleLowerCase("ja-JP");
        return (
          (!normalizedQuery || haystack.includes(normalizedQuery)) &&
          (selectedType === "all" || article.type === selectedType) &&
          selectedTags.every((tag) => article.tags.includes(tag))
        );
      })
      .sort((a, b) => {
        const date = sort === "newest" ? "publishedOn" : "updatedOn";
        return b[date].localeCompare(a[date]);
      });
  }, [articles, query, selectedTags, selectedType, sort]);

  const hasConditions =
    query.trim() ||
    selectedTags.length > 0 ||
    selectedType !== "all" ||
    sort !== "newest";
  const conditionSummary = [
    query.trim() ? `キーワード：${query.trim()}` : "",
    selectedType !== "all"
      ? `種別：${articleTypes.find((item) => item.value === selectedType)?.label}`
      : "",
    ...selectedTags.map((tag) => `タグ：${tag}`),
    sort === "updated" ? "更新順" : "新着順",
  ].filter(Boolean);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  function clearConditions() {
    setQuery("");
    setSelectedTags([]);
    setSelectedType("all");
    setSort("newest");
  }

  return (
    <main id="article-list-main" className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>FEATURE ARTICLES</p>
        <h1>特集記事を探す</h1>
        <p>用途別の選び方、二軸比較、カード特集から、いま知りたいことを探せます。</p>
        <p className={styles.fixtureNote}>掲載内容はUI確認用の合成データです。</p>
      </header>

      <section className={styles.controls} aria-label="記事を絞り込む">
        <div className={styles.searchField}>
          <label htmlFor="article-query">キーワードで探す</label>
          <input
            id="article-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：年会費、買い物、比較"
            type="search"
          />
          <small>タイトル・要約・タグ・対象カード名から検索します。</small>
        </div>

        <fieldset className={styles.typeFieldset}>
          <legend>記事種別</legend>
          <div className={styles.choiceRow}>
            {articleTypes.map((articleType) => (
              <label key={articleType.value}>
                <input
                  checked={selectedType === articleType.value}
                  name="article-type"
                  onChange={() => setSelectedType(articleType.value)}
                  type="radio"
                  value={articleType.value}
                />
                <span>{articleType.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.tagFieldset}>
          <legend>タグで絞り込む</legend>
          <p>複数選択では、選んだすべてのタグを含む記事を表示します。</p>
          <div className={styles.choiceRow}>
            {tags.map((tag) => (
              <label key={tag}>
                <input
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  type="checkbox"
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.sortRow}>
          <label htmlFor="article-sort">並び順</label>
          <select
            id="article-sort"
            onChange={(event) => setSort(event.target.value as Sort)}
            value={sort}
          >
            <option value="newest">新着順（公開日）</option>
            <option value="updated">更新順（更新日）</option>
          </select>
        </div>
      </section>

      <section className={styles.results} aria-labelledby="article-results-title">
        <p className={styles.screenReaderStatus} role="status">
          {`${conditionSummary.join("、")}で${results.length}件の記事を表示しています。`}
        </p>
        <div className={styles.resultSummary} aria-live="polite">
          <div>
            <p>検索結果</p>
            <h2 id="article-results-title">{results.length}件の記事</h2>
          </div>
          {hasConditions ? (
            <button
              className={styles.clearButton}
              onClick={clearConditions}
              type="button"
            >
              条件をすべて解除
            </button>
          ) : null}
        </div>

        {hasConditions ? (
          <div className={styles.activeConditions} aria-label="適用中の条件">
            {query.trim() ? <span>キーワード：{query.trim()}</span> : null}
            {selectedType !== "all" ? (
              <span>
                種別：{articleTypes.find((item) => item.value === selectedType)?.label}
              </span>
            ) : null}
            {selectedTags.map((tag) => (
              <span key={tag}>タグ：{tag}</span>
            ))}
            {sort === "updated" ? <span>更新順</span> : null}
          </div>
        ) : null}

        {results.length === 0 ? (
          <div className={styles.empty} role="status">
            <h2>条件に一致する記事はありません</h2>
            <p>
              検索語やタグを減らすか、すべての条件を解除してもう一度探してください。
            </p>
            <button onClick={clearConditions} type="button">
              条件をすべて解除
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {results.map((article) => (
              <article aria-labelledby={`${article.slug}-title`} key={article.slug}>
                <Link className={styles.card} href={`/articles/${article.slug}`}>
                  <Image
                    alt=""
                    className={styles.coverImage}
                    height={900}
                    priority={article.slug === "card-balance-map"}
                    src={article.coverImage}
                    width={1600}
                  />
                  <div className={styles.cardTop}>
                    <span className={styles.kind}>{article.kindLabel}</span>
                    {article.publicationState === "change-under-review" ? (
                      <span className={styles.reviewing}>更新確認中</span>
                    ) : null}
                  </div>
                  <p className={styles.audience}>{article.audience}</p>
                  <h3 id={`${article.slug}-title`}>{article.title}</h3>
                  <p className={styles.description}>{article.description}</p>
                  <ul className={styles.tags} aria-label="記事タグ">
                    {article.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {article.publicationState === "change-under-review" ? (
                    <p className={styles.reviewNote}>
                      公開済みの旧記事です。申込前には公式情報を確認してください。
                    </p>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
