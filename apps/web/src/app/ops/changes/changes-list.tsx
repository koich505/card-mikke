"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { prototypeOpsQueue } from "@/fixtures/ops";
import type { PrototypeOpsSourceChange } from "@/types/ops-prototype";
import { OpsShell } from "../ops-shell";
import { useOps } from "../ops-provider";
import styles from "../ops.module.css";

type Filter = "pending" | "completed" | "blocked" | "all";
type Sort = "newest" | "oldest" | "priority";
type Scenario = "default" | "loading" | "error" | "empty";

const getStatus = (change: PrototypeOpsSourceChange) => {
  if (change.scopeUnknown || change.revisionConflict || change.status === "blocked") {
    return "blocked" as const;
  }
  const processed = change.claims.filter(
    (claim) => claim.decision !== "pending",
  ).length;
  if (change.claims.length > 0 && processed === change.claims.length)
    return "completed" as const;
  if (processed > 0) return "in_progress" as const;
  return "pending" as const;
};

const statusLabel = {
  pending: "未処理",
  in_progress: "処理中",
  completed: "完了",
  blocked: "確認不能",
} as const;

export function OpsChangesList() {
  const { changes } = useOps();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = (
    ["pending", "completed", "blocked", "all"].includes(
      searchParams.get("status") ?? "",
    )
      ? searchParams.get("status")
      : "pending"
  ) as Filter;
  const sort = (
    ["newest", "oldest", "priority"].includes(searchParams.get("sort") ?? "")
      ? searchParams.get("sort")
      : "newest"
  ) as Sort;
  const scenario = (
    ["loading", "error", "empty"].includes(searchParams.get("scenario") ?? "")
      ? searchParams.get("scenario")
      : "default"
  ) as Scenario;
  const query = searchParams.get("q") ?? "";

  const setParams = (patch: Record<string, string>) => {
    const next = new URLSearchParams();
    const values = { status: filter, sort, q: query, ...patch };
    Object.entries(values).forEach(([key, value]) => value && next.set(key, value));
    router.push(`/ops/changes?${next.toString()}`);
  };

  const rows = useMemo(() => {
    if (scenario === "empty") return [];
    return Object.values(changes)
      .map((change) => {
        const queue = prototypeOpsQueue.find((item) => item.id === change.id);
        const processed = change.claims.filter(
          (claim) => claim.decision !== "pending",
        ).length;
        return {
          change,
          queue,
          processed,
          pending: change.claims.length - processed,
          status: getStatus(change),
        };
      })
      .filter((row) => {
        if (filter === "pending" && !["pending", "in_progress"].includes(row.status))
          return false;
        if (filter === "completed" && row.status !== "completed") return false;
        if (filter === "blocked" && row.status !== "blocked") return false;
        const needle = query.trim().toLocaleLowerCase("ja");
        return (
          !needle ||
          `${row.change.productName} ${row.change.sourceTitle}`
            .toLocaleLowerCase("ja")
            .includes(needle)
        );
      })
      .sort((a, b) => {
        if (sort === "priority")
          return (
            (a.queue?.priority === "high" ? -1 : 1) -
            (b.queue?.priority === "high" ? -1 : 1)
          );
        const comparison = a.change.retrievedAt.localeCompare(b.change.retrievedAt);
        return sort === "oldest" ? comparison : -comparison;
      });
  }, [changes, filter, query, scenario, sort]);

  const returnQuery = new URLSearchParams({
    status: filter,
    sort,
    ...(query ? { q: query } : {}),
  }).toString();

  return (
    <OpsShell>
      <main className={styles.opsMain} id="main-content">
        <div className={styles.pageHeading}>
          <div>
            <p className={styles.eyebrow}>SOURCE CHANGES</p>
            <h1>公式Source差分一覧</h1>
            <p>変更Revisionと対象カードごとに、未処理の提案を確認します。</p>
          </div>
          <Link className={styles.secondaryButton} href="/ops">
            Dashboardへ戻る
          </Link>
        </div>

        <nav className={styles.scenarioLinks} aria-label="一覧状態確認">
          <Link href="/ops/changes">通常</Link>
          <Link href="/ops/changes?scenario=loading">Loading</Link>
          <Link href="/ops/changes?scenario=empty">Empty</Link>
          <Link href="/ops/changes?scenario=error">Error</Link>
        </nav>

        <section className={styles.listControls} aria-label="差分一覧の絞り込み">
          <label>
            検索
            <input
              value={query}
              onChange={(event) => setParams({ q: event.target.value })}
              placeholder="カード名・Source名"
            />
          </label>
          <label>
            状態
            <select
              value={filter}
              onChange={(event) => setParams({ status: event.target.value })}
            >
              <option value="pending">未処理のみ</option>
              <option value="completed">完了</option>
              <option value="blocked">確認不能</option>
              <option value="all">すべて</option>
            </select>
          </label>
          <label>
            並び順
            <select
              value={sort}
              onChange={(event) => setParams({ sort: event.target.value })}
            >
              <option value="newest">検知日の新しい順</option>
              <option value="oldest">検知日の古い順</option>
              <option value="priority">優先度順</option>
            </select>
          </label>
        </section>

        {scenario === "loading" && (
          <section className={styles.statePanel} aria-busy="true">
            <div className={styles.loadingBar} />
            <h2>差分一覧を読み込んでいます</h2>
          </section>
        )}
        {scenario === "error" && (
          <section className={styles.statePanel} role="alert">
            <h2>差分一覧を取得できませんでした</h2>
            <Link className={styles.secondaryButton} href="/ops/changes">
              再試行
            </Link>
          </section>
        )}
        {scenario !== "loading" && scenario !== "error" && rows.length === 0 && (
          <section className={styles.statePanel}>
            <h2>
              {query
                ? "検索条件に一致する差分はありません"
                : "表示する差分はありません"}
            </h2>
            <p>絞り込み条件を変更してください。</p>
          </section>
        )}

        {scenario === "default" && rows.length > 0 && (
          <div className={styles.changesTable} role="table" aria-label="公式Source差分">
            <div className={styles.changesTableHeader} role="row">
              <span>対象カード・Source</span>
              <span>検知・期限</span>
              <span>提案件数</span>
              <span>状態</span>
              <span>操作</span>
            </div>
            {rows.map(({ change, queue, processed, pending, status }) => (
              <article key={change.id} role="row" data-status={status}>
                <div>
                  <strong>{change.productName}</strong>
                  <span>{change.sourceTitle}</span>
                  <code>{change.sourceIdentifier}</code>
                </div>
                <div>
                  <span>{change.retrievedAt}</span>
                  <small>{queue?.dueLabel ?? "期限未設定"}</small>
                </div>
                <div>
                  <strong>未処理 {pending}件</strong>
                  <small>処理済み {processed}件</small>
                </div>
                <div>
                  <span className={styles.statusChip} data-tone={status}>
                    {statusLabel[status]}
                  </span>
                  <small>{queue?.priority === "high" ? "優先" : "通常"}</small>
                </div>
                <Link
                  className={styles.secondaryButton}
                  href={`/ops/changes/${change.id}?return=${encodeURIComponent(returnQuery)}`}
                >
                  確認する
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </OpsShell>
  );
}
