"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type {
  PrototypeClaimDecision,
  PrototypeOpsClaimDiff,
} from "@/types/ops-prototype";
import { OpsShell } from "../ops-shell";
import { useOps } from "../ops-provider";
import styles from "../ops.module.css";
import { ProposalConfirmDialog } from "./proposal-confirm-dialog";

const decisionLabel: Record<PrototypeClaimDecision, string> = {
  pending: "未判断",
  approve: "採用",
  reject: "却下",
};

const subscribeToLocation = (onStoreChange: () => void) => {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
};

const getReturnQuery = () =>
  new URLSearchParams(window.location.search).get("return") ?? "";

const getServerReturnQuery = () => "";

export function OpsChangeReview({ changeId }: { changeId: string }) {
  const { changes, auditEvents, resolveClaim } = useOps();
  const returnQuery = useSyncExternalStore(
    subscribeToLocation,
    getReturnQuery,
    getServerReturnQuery,
  );
  const change = changes[changeId];
  const [claims, setClaims] = useState<PrototypeOpsClaimDiff[]>(() =>
    structuredClone(change?.claims ?? []),
  );
  const [processedClaims, setProcessedClaims] = useState<PrototypeOpsClaimDiff[]>([]);
  const [pendingClaim, setPendingClaim] = useState<PrototypeOpsClaimDiff | null>(null);
  const [message, setMessage] = useState("");

  const changeAudit = useMemo(
    () => auditEvents.filter((event) => event.changeId === changeId),
    [auditEvents, changeId],
  );

  if (!change) {
    return (
      <OpsShell>
        <main className={styles.opsMain} id="main-content">
          <section className={styles.statePanel}>
            <h1>編集対象が見つかりません</h1>
            <Link className={styles.secondaryButton} href="/ops">
              Dashboardへ戻る
            </Link>
          </section>
        </main>
      </OpsShell>
    );
  }

  const updateClaim = (claimId: string, patch: Partial<PrototypeOpsClaimDiff>) => {
    setClaims((current) =>
      current.map((claim) => (claim.id === claimId ? { ...claim, ...patch } : claim)),
    );
    setMessage("");
  };

  const completeClaim = (claim: PrototypeOpsClaimDiff) => {
    resolveClaim(changeId, claim);
    setClaims((current) => current.filter((item) => item.id !== claim.id));
    setProcessedClaims((current) => [claim, ...current]);
    setMessage(
      claim.decision === "approve"
        ? `「${claim.label}」を採用し、一覧から処理済みへ移動しました。`
        : `「${claim.label}」を却下し、現在の情報を維持しました。`,
    );
  };

  const decideClaim = (
    claim: PrototypeOpsClaimDiff,
    decision: "approve" | "reject",
  ) => {
    const decided = { ...claim, decision };
    setPendingClaim(decided);
  };

  const completeApproval = () => {
    if (!pendingClaim) return;
    completeClaim(pendingClaim);
    setPendingClaim(null);
  };

  return (
    <OpsShell>
      <main className={styles.opsMain} id="main-content">
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <Link href="/ops">運営Dashboard</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/ops/changes${returnQuery ? `?${returnQuery}` : ""}`}>
            公式Source差分一覧
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">カード情報差分の確認・編集</span>
        </nav>

        <nav className={styles.scenarioLinks} aria-label="差分Scenario確認">
          <Link href="/ops/changes/change-20260812-001">差分5分類</Link>
          <Link href="/ops/changes/change-20260812-002">変更なしのみ</Link>
          <Link href="/ops/changes/change-20260812-003">影響範囲不明</Link>
          <Link href="/ops/changes/change-20260812-004">承認可能な差分</Link>
        </nav>

        <div className={styles.pageHeading}>
          <div>
            <p className={styles.eyebrow}>REVIEW, EDIT AND APPROVE</p>
            <h1>{change.productName}</h1>
            <p>{change.sourceDiffSummary}</p>
          </div>
          <span className={styles.statusChip} data-tone="warning">
            {change.status === "approved"
              ? "判断確定済み"
              : `${claims.length}件 未処理`}
          </span>
        </div>

        {message && (
          <div className={styles.inlineAlert} role="status" data-tone="success">
            {message}
          </div>
        )}

        {(change.scopeUnknown || change.revisionConflict) && (
          <div className={styles.inlineAlert} role="alert" data-tone="danger">
            <strong>この更新案は承認できません。</strong>
            {change.scopeUnknown && <span>影響範囲を特定できません。</span>}
            {change.revisionConflict && <span>取得Revisionの競合があります。</span>}
          </div>
        )}

        <section className={styles.sourcePanel} aria-labelledby="change-info-heading">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>CHANGE INFORMATION</p>
              <h2 id="change-info-heading">差分情報</h2>
            </div>
          </div>
          <dl className={styles.definitionList}>
            <div>
              <dt>変更対象のカード</dt>
              <dd>{change.productName}</dd>
            </div>
            <div>
              <dt>差分概要</dt>
              <dd>{change.sourceDiffSummary}</dd>
            </div>
            <div>
              <dt>未処理の変更提案</dt>
              <dd>{claims.length}件</dd>
            </div>
            <div>
              <dt>公式Source</dt>
              <dd>{change.sourceTitle}</dd>
            </div>
            <div>
              <dt>公開主体</dt>
              <dd>{change.sourcePublisher}</dd>
            </div>
            <div>
              <dt>URL・文書ID</dt>
              <dd>
                <code>{change.sourceIdentifier}</code>
                <small>外部Linkとして有効化していません</small>
              </dd>
            </div>
            <div>
              <dt>取得日時</dt>
              <dd>{change.retrievedAt}</dd>
            </div>
            <div>
              <dt>Source公開・更新日</dt>
              <dd>{change.publishedAt}</dd>
            </div>
          </dl>
          <details className={styles.sourceDiffDetails}>
            <summary>HTMLの変更箇所を表示</summary>
            <div className={styles.sourceDiffGrid}>
              <section aria-labelledby="source-before-heading">
                <h3 id="source-before-heading">変更前</h3>
                <del>{change.sourceBeforeExcerpt}</del>
              </section>
              <section aria-labelledby="source-after-heading">
                <h3 id="source-after-heading">変更後</h3>
                <ins>{change.sourceAfterExcerpt}</ins>
              </section>
            </div>
          </details>
        </section>

        <section className={styles.reviewList} aria-labelledby="decision-heading">
          <div className={styles.sectionHeader}>
            <h2 id="decision-heading">変更提案</h2>
          </div>
          {claims.map((claim) => (
            <article key={claim.id} data-decision={claim.decision}>
              <header>
                <div>
                  <span className={styles.statusChip} data-tone={claim.diffKind}>
                    {claim.diffKind === "extraction_failed"
                      ? "抽出不能"
                      : claim.diffKind === "deletion_candidate"
                        ? "削除候補"
                        : claim.diffKind === "unchanged"
                          ? "変更なし"
                          : claim.diffKind === "added"
                            ? "追加"
                            : "変更"}
                  </span>
                  <h3>{claim.label}</h3>
                  <p>
                    {claim.scope}
                    {claim.scopeStatus === "unknown" && "（影響範囲不明）"}
                  </p>
                </div>
                <strong>{decisionLabel[claim.decision]}</strong>
              </header>

              <div className={styles.proposalValues}>
                {claim.diffKind !== "added" && (
                  <div>
                    <span>
                      {claim.diffKind === "deletion_candidate"
                        ? "削除する内容"
                        : "現在の値"}
                    </span>
                    <strong>{claim.previousValue}</strong>
                  </div>
                )}
                {claim.diffKind !== "deletion_candidate" && (
                  <label>
                    {claim.diffKind === "added" ? "新しい提案値" : "変更後の提案値"}
                    <textarea
                      value={claim.candidateValue}
                      onChange={(event) =>
                        updateClaim(claim.id, {
                          candidateValue: event.target.value,
                          decision: "pending",
                        })
                      }
                      rows={3}
                      disabled={
                        claim.diffKind === "extraction_failed" ||
                        change.status === "approved"
                      }
                    />
                  </label>
                )}
              </div>
              <div className={styles.proposalActions} aria-label="この提案の判断">
                <button
                  type="button"
                  className={styles.proposalDecisionButton}
                  data-selected={claim.decision === "approve"}
                  aria-pressed={claim.decision === "approve"}
                  disabled={
                    claim.diffKind === "extraction_failed" ||
                    claim.scopeStatus === "unknown" ||
                    change.status === "approved"
                  }
                  onClick={() => decideClaim(claim, "approve")}
                >
                  <strong>採用</strong>
                  <span>情報を更新する</span>
                </button>
                <button
                  type="button"
                  className={styles.proposalDecisionButton}
                  data-selected={claim.decision === "reject"}
                  data-tone="reject"
                  aria-pressed={claim.decision === "reject"}
                  disabled={change.status === "approved"}
                  onClick={() => decideClaim(claim, "reject")}
                >
                  <strong>却下</strong>
                  <span>情報はそのまま</span>
                </button>
              </div>
            </article>
          ))}
        </section>

        {processedClaims.length > 0 && (
          <details className={styles.processedClaims}>
            <summary>処理済みを表示（{processedClaims.length}件）</summary>
            <ul>
              {processedClaims.map((claim) => (
                <li key={claim.id}>
                  <strong>{claim.label}</strong>
                  <span>{decisionLabel[claim.decision]}</span>
                  <span>{claim.candidateValue}</span>
                </li>
              ))}
            </ul>
          </details>
        )}

        <section className={styles.auditPanel} aria-labelledby="audit-heading">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>AUDIT TIMELINE</p>
              <h2 id="audit-heading">操作履歴</h2>
            </div>
          </div>
          <ol>
            {changeAudit.map((event) => (
              <li key={event.id}>
                <time>{event.occurredAt}</time>
                <strong>{event.action}</strong>
                <span>{event.actor}</span>
                <p>{event.detail}</p>
                {event.claimSnapshots && (
                  <ul className={styles.auditClaims}>
                    {event.claimSnapshots.map((snapshot) => (
                      <li key={`${event.id}-${snapshot.claimId}`}>
                        <strong>{snapshot.label}</strong>
                        <span>
                          {snapshot.previousValue} → {snapshot.candidateValue}
                        </span>
                        <span>判断: {decisionLabel[snapshot.decision]}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        <ProposalConfirmDialog
          claim={pendingClaim}
          onCancel={() => {
            setPendingClaim(null);
          }}
          onConfirm={completeApproval}
        />
      </main>
    </OpsShell>
  );
}
