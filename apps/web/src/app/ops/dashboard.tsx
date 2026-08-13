"use client";

import Link from "next/link";
import { prototypeOpsQueue } from "@/fixtures/ops";
import { OpsShell } from "./ops-shell";
import { useOps } from "./ops-provider";
import styles from "./ops.module.css";

type DashboardScenario = "default" | "loading" | "empty" | "error";

const kindLabel = {
  source_change: "Source差分",
  correction: "訂正指摘",
  review: "Review",
  article: "記事",
} as const;

export function OpsDashboard({ scenario }: { scenario: DashboardScenario }) {
  const { changes } = useOps();
  const queue = prototypeOpsQueue.filter(
    (item) => !item.actionable || changes[item.id]?.status !== "approved",
  );
  const pendingSourceChanges = Object.values(changes).filter(
    (change) => change.status !== "approved",
  ).length;
  const approvedSourceChanges = Object.values(changes).filter(
    (change) => change.status === "approved",
  ).length;
  return (
    <OpsShell>
      <main className={styles.opsMain} id="main-content">
        <div className={styles.pageHeading}>
          <div>
            <p className={styles.eyebrow}>OPERATIONS OVERVIEW</p>
            <h1>運営Dashboard</h1>
            <p>確認待ち、期限、障害を把握し、承認が必要な作業へ進みます。</p>
          </div>
          <span className={styles.prototypeBadge}>合成データ / 保存なし</span>
        </div>

        <nav className={styles.scenarioLinks} aria-label="Dashboard状態確認">
          <Link href="/ops">通常</Link>
          <Link href="/ops?scenario=loading">Loading</Link>
          <Link href="/ops?scenario=empty">Empty</Link>
          <Link href="/ops?scenario=error">Error</Link>
        </nav>

        {scenario === "loading" && (
          <section className={styles.statePanel} aria-busy="true" aria-live="polite">
            <div className={styles.loadingBar} />
            <h2>作業キューを読み込んでいます</h2>
            <p>未確定の件数を表示していません。</p>
          </section>
        )}

        {scenario === "error" && (
          <section className={styles.statePanel} role="alert">
            <span className={styles.statusChip} data-tone="danger">
              Error
            </span>
            <h2>作業キューを取得できませんでした</h2>
            <p>承認済み情報や公開内容は変更されていません。</p>
            <Link className={styles.secondaryButton} href="/ops">
              再試行
            </Link>
          </section>
        )}

        {scenario === "empty" && (
          <section className={styles.statePanel}>
            <span className={styles.statusChip} data-tone="success">
              Empty
            </span>
            <h2>現在、確認待ちの作業はありません</h2>
            <p>最終日次確認は2026-08-12 06:30に成功しました（合成）。</p>
          </section>
        )}

        {scenario === "default" && (
          <>
            <section className={styles.metricGrid} aria-label="作業状況の要約">
              <article>
                <span>未承認Draft</span>
                <strong>{pendingSourceChanges}</strong>
                <small>Source差分 / Block中を含む</small>
              </article>
              <article>
                <span>訂正・Review待ち</span>
                <strong>4</strong>
                <small>3営業日以内に確認</small>
              </article>
              <article data-tone="danger">
                <span>日次確認の失敗</span>
                <strong>3日</strong>
                <small>運営者確認が必要</small>
              </article>
              <article>
                <span>判断確定済み</span>
                <strong>{approvedSourceChanges}</strong>
                <small>このMemory Session内</small>
              </article>
            </section>

            <section className={styles.opsSection} aria-labelledby="queue-heading">
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>WORK QUEUE</p>
                  <h2 id="queue-heading">確認が必要な作業</h2>
                </div>
                <p>期限と影響を確認し、優先度順に着手します。</p>
              </div>
              <div className={styles.queueList}>
                {queue.map((item) => (
                  <article key={item.id} data-priority={item.priority}>
                    <div>
                      <span className={styles.statusChip} data-tone={item.priority}>
                        {kindLabel[item.kind]}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.status}</p>
                      {item.failureReason && (
                        <p className={styles.failureReason}>{item.failureReason}</p>
                      )}
                    </div>
                    <dl>
                      <div>
                        <dt>検知</dt>
                        <dd>{item.detectedAt}</dd>
                      </div>
                      <div>
                        <dt>期限・状態</dt>
                        <dd>{item.dueLabel}</dd>
                      </div>
                    </dl>
                    {item.actionable ? (
                      <Link
                        className={styles.secondaryButton}
                        href={`/ops/changes/${item.id}`}
                      >
                        差分を確認
                      </Link>
                    ) : (
                      <span className={styles.futureLabel}>後続Mockで操作</span>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.dashboardColumns}>
              <section className={styles.opsSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>OPERATIONS HEALTH</p>
                    <h2>日次確認と費用</h2>
                  </div>
                </div>
                <dl className={styles.definitionList}>
                  <div>
                    <dt>Source確認</dt>
                    <dd>128 / 131件成功（合成）</dd>
                  </div>
                  <div>
                    <dt>非AI運用費</dt>
                    <dd>2,840円 / 月（警告4,000円）</dd>
                  </div>
                  <div>
                    <dt>AI生成費</dt>
                    <dd>1,260円 / 月・別集計</dd>
                  </div>
                </dl>
              </section>
              <section className={styles.opsSection}>
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>TRUST BOUNDARY</p>
                    <h2>公開への境界</h2>
                  </div>
                </div>
                <ul className={styles.checkList}>
                  <li>AI出力はすべて未承認Draft</li>
                  <li>編集と承認は別操作・別時刻</li>
                  <li>公開・算定への反映は明示承認後のみ</li>
                </ul>
              </section>
            </div>
          </>
        )}
      </main>
    </OpsShell>
  );
}
