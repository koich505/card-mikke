"use client";

import { useState } from "react";
import { OpsShell } from "../../ops-shell";
import { useOps } from "../../ops-provider";
import { ReauthDialog } from "../../reauth-dialog";
import styles from "../../ops.module.css";

type PendingAction =
  { kind: "single"; sessionId: string; label: string } | { kind: "all" } | null;

export function OpsSessionsPage() {
  const {
    sessions,
    revokeSession,
    revokeAllSessions,
    lastReauthenticatedAt,
    reauthenticationState,
  } = useOps();
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [message, setMessage] = useState("");
  const activeSessions = sessions.filter((session) => session.state === "active");

  const confirm = () => {
    if (!pendingAction) return;
    if (pendingAction.kind === "all") {
      revokeAllSessions();
      return;
    }
    revokeSession(pendingAction.sessionId);
    setMessage(`${pendingAction.label}をUIモック上で失効しました。`);
    setPendingAction(null);
  };

  return (
    <OpsShell>
      <main className={styles.opsMain} id="main-content">
        <div className={styles.pageHeading}>
          <div>
            <p className={styles.eyebrow}>ACCOUNT SECURITY</p>
            <h1>有効なSession</h1>
            <p>管理者自身のSessionを確認し、個別または一括で失効します。</p>
          </div>
          <span className={styles.prototypeBadge}>合成Session</span>
        </div>

        {message && (
          <div className={styles.inlineAlert} role="status" data-tone="success">
            {message}
          </div>
        )}

        <section className={styles.sessionList} aria-labelledby="sessions-heading">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>ACTIVE SESSIONS</p>
              <h2 id="sessions-heading">{activeSessions.length}件の有効Session</h2>
            </div>
            <button
              className={styles.dangerButton}
              onClick={() => setPendingAction({ kind: "all" })}
              disabled={activeSessions.length === 0}
            >
              すべて失効
            </button>
          </div>
          {sessions.map((session) => (
            <article key={session.id} data-state={session.state}>
              <div>
                <div className={styles.sessionTitle}>
                  <h3>{session.device}</h3>
                  {session.current && (
                    <span className={styles.statusChip} data-tone="success">
                      このSession
                    </span>
                  )}
                  {session.state === "revoked" && (
                    <span className={styles.statusChip}>失効済み</span>
                  )}
                </div>
                <p>{session.location}</p>
              </div>
              <dl>
                <div>
                  <dt>開始</dt>
                  <dd>{session.startedAt}</dd>
                </div>
                <div>
                  <dt>最終操作</dt>
                  <dd>{session.lastActiveAt}</dd>
                </div>
              </dl>
              <button
                className={styles.secondaryButton}
                disabled={session.state === "revoked"}
                onClick={() =>
                  setPendingAction({
                    kind: "single",
                    sessionId: session.id,
                    label: session.device,
                  })
                }
              >
                このSessionを失効
              </button>
            </article>
          ))}
        </section>

        <section className={styles.opsSection}>
          <h2>Session方針</h2>
          <ul className={styles.checkList}>
            <li>管理者Sessionは最長12時間</li>
            <li>30分間操作がない場合は失効</li>
            <li>Password変更・再設定時は既存Sessionを失効</li>
            <li>認証変更と全Session失効は管理者通知の対象</li>
          </ul>
          <p className={styles.fieldHelp}>
            最終再認証: {lastReauthenticatedAt ?? "このUI Mock Sessionでは未実施"}
            {lastReauthenticatedAt &&
              `（${
                reauthenticationState === "fresh"
                  ? "15分以内"
                  : "15分超過・高Risk操作前に再認証が必要"
              }）`}
          </p>
        </section>

        <ReauthDialog
          open={Boolean(pendingAction)}
          actionLabel={
            pendingAction?.kind === "all" ? "全Sessionを失効" : "Sessionを失効"
          }
          description={
            pendingAction?.kind === "all"
              ? "このSessionを含むすべての管理者Sessionを失効します。"
              : "選択した管理者Sessionを失効します。"
          }
          onCancel={() => setPendingAction(null)}
          onConfirm={confirm}
        />
      </main>
    </OpsShell>
  );
}
