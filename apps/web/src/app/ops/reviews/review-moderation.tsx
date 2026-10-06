"use client";

import { useRef, useState } from "react";
import { prototypeReviewCases } from "@/fixtures/ops-workflows";
import { OpsShell } from "../ops-shell";
import { ReauthDialog } from "../reauth-dialog";
import styles from "../workflow.module.css";

type Id = (typeof prototypeReviewCases)[number]["id"];
type Decision = "publish" | "keep" | "hide" | "remove";
type CaseState = {
  status: "pending" | "reported" | "published" | "kept" | "hidden" | "removed";
  reason: string;
  reasonCategory: string;
  check: "ready" | "failed";
};
type Audit = { at: string; actor: string; action: string; reason: string };

const initialStates = Object.fromEntries(
  prototypeReviewCases.map((item) => [
    item.id,
    {
      status: item.reports ? "reported" : "pending",
      reason: "",
      reasonCategory: "",
      check: "ready",
    },
  ]),
) as Record<Id, CaseState>;

const statusLabel = (status: CaseState["status"]) =>
  ({
    pending: "確認待ち・非公開",
    reported: "通報あり・公開中",
    published: "公開承認済み",
    kept: "掲載継続",
    hidden: "一時非公開",
    removed: "削除判断済み",
  })[status];
const statusTone = (status: CaseState["status"]) =>
  status === "removed"
    ? "danger"
    : status === "pending" || status === "reported" || status === "hidden"
      ? "warning"
      : "success";
const containsSensitiveText = (value: string) =>
  /[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|password|secret|api[_ -]?key)\s*[:=]/i.test(
    value,
  );

export default function ReviewModeration() {
  const [selectedId, setSelectedId] = useState<Id>(prototypeReviewCases[0].id);
  const [states, setStates] = useState(initialStates);
  const [pendingDecision, setPendingDecision] = useState<Decision>("publish");
  const [reauthOpen, setReauthOpen] = useState(false);
  const [result, setResult] = useState("");
  const [audits, setAudits] = useState<Record<Id, Audit[]>>(
    Object.fromEntries(
      prototypeReviewCases.map((item) => [
        item.id,
        item.audit.map((event) => ({ ...event })),
      ]),
    ) as Record<Id, Audit[]>,
  );
  const resultRef = useRef<HTMLDivElement>(null);
  const selected = prototypeReviewCases.find((item) => item.id === selectedId)!;
  const state = states[selectedId];
  const terminal = ["published", "kept", "hidden", "removed"].includes(state.status);
  const pendingCount = Object.values(states).filter(
    (item) => item.status === "pending",
  ).length;
  const reportedCount = Object.values(states).filter(
    (item) => item.status === "reported",
  ).length;
  const update = (patch: Partial<CaseState>) =>
    setStates((current) => ({
      ...current,
      [selectedId]: { ...current[selectedId], ...patch },
    }));
  const announce = (message: string) => {
    setResult(message);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  const requestDecision = (decision: Decision) => {
    if (
      !state.reasonCategory ||
      !state.reason.trim() ||
      state.check === "failed" ||
      terminal
    ) {
      announce(
        "理由カテゴリと判断補足を入力し、Content判定を完了してから判断してください。",
      );
      return;
    }
    if (containsSensitiveText(state.reason)) {
      announce(
        "判断理由にメールアドレスやCredential・Secretを入力しないでください。判断は確定していません。",
      );
      return;
    }
    const positive = ["内容・公式条件を照合済み", "利用体験として掲載可能"];
    const negative = ["規約違反を確認", "事実誤認の可能性"];
    const allowed = decision === "publish" || decision === "keep" ? positive : negative;
    if (!allowed.includes(state.reasonCategory)) {
      announce("選択した理由カテゴリは、この判断Actionには使用できません。");
      return;
    }
    setPendingDecision(decision);
    setReauthOpen(true);
  };
  return (
    <OpsShell>
      <main id="main-content" className={styles.main}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>USER REVIEW OPERATIONS</p>
            <h1>Review Moderation</h1>
            <p>確認候補と公開後通報を区別し、人間の判断と理由を記録します。</p>
          </div>
          <span className={styles.badge}>UI-only / 利用者へ判定理由を非表示</span>
        </div>
        <div className={styles.metrics} aria-label="Reviewキュー概要">
          <div>
            <strong>{pendingCount}</strong>
            <small>確認待ち・非公開</small>
          </div>
          <div>
            <strong>{reportedCount}</strong>
            <small>公開後通報</small>
          </div>
          <div>
            <strong>3営業日</strong>
            <small>通報確認の着手目標</small>
          </div>
          <div>
            <strong>0</strong>
            <small>自動削除</small>
          </div>
        </div>
        {result && (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="region"
            aria-label="Review判断結果"
            className={styles.result}
          >
            <span role="status">{result}</span>
          </div>
        )}
        <div className={styles.grid}>
          <aside className={styles.panel} aria-label="Review確認キュー">
            <h2>確認キュー</h2>
            <div className={styles.queue}>
              {prototypeReviewCases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === selectedId}
                  onClick={() => {
                    setSelectedId(item.id);
                    setResult("");
                  }}
                >
                  <span
                    className={styles.status}
                    data-tone={statusTone(states[item.id].status)}
                  >
                    {statusLabel(states[item.id].status)}
                  </span>
                  <strong>{item.card}</strong>
                  <small>
                    {item.origin} / {item.submitted}
                  </small>
                </button>
              ))}
            </div>
          </aside>
          <div>
            <section className={styles.panel} aria-labelledby="review-case-title">
              <div className={styles.heading}>
                <div>
                  <span className={styles.status} data-tone={statusTone(state.status)}>
                    {statusLabel(state.status)}
                  </span>
                  <h2 id="review-case-title">{selected.card}</h2>
                </div>
                <strong aria-label={`${selected.rating}つ星`}>
                  {"★".repeat(selected.rating)}
                  {"☆".repeat(5 - selected.rating)}
                </strong>
              </div>
              <dl className={styles.definition}>
                <div>
                  <dt>Case ID</dt>
                  <dd>{selected.id}</dd>
                </div>
                <div>
                  <dt>投稿時点</dt>
                  <dd>{selected.submitted}</dd>
                </div>
                <div>
                  <dt>現在の公開・確認状態</dt>
                  <dd>{statusLabel(state.status)}</dd>
                </div>
                <div>
                  <dt>通報件数</dt>
                  <dd>{selected.reports}件（件数だけで非公開・虚偽確定しません）</dd>
                </div>
              </dl>
              {selected.reportDetails.length > 0 && (
                <>
                  <h3>通報内訳（通報者情報は非表示）</h3>
                  <ol className={styles.signalList} aria-label="通報内訳">
                    {selected.reportDetails.map((report, index) => (
                      <li key={`${report.reportedAt}-${index}`}>
                        <strong>
                          通報{index + 1}: {report.reason}
                        </strong>
                        <br />
                        {report.description} / 通報時点 {report.reportedAt}
                      </li>
                    ))}
                  </ol>
                </>
              )}
              <blockquote className={styles.reviewBody}>{selected.body}</blockquote>
              <h3>自動判定の確認候補</h3>
              <ul className={styles.signalList}>
                {selected.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
              <p className={styles.help}>
                AI判定は未信頼の補助情報です。投稿者へ判定方式・結果・理由カテゴリを表示しません。
              </p>
              {state.check === "failed" && (
                <div role="alert" className={styles.alert}>
                  Content判定に失敗しました。Reviewは現在状態を維持し、自動公開・自動削除しません。
                </div>
              )}
              <div className={styles.actions}>
                {state.check === "ready" ? (
                  <button
                    className={styles.secondary}
                    type="button"
                    disabled={terminal}
                    onClick={() => {
                      update({ check: "failed" });
                      announce(
                        "Content判定失敗を再現しました。現在の公開状態は変更していません。",
                      );
                    }}
                  >
                    判定失敗を再現
                  </button>
                ) : (
                  <button
                    className={styles.secondary}
                    type="button"
                    onClick={() => {
                      update({ check: "ready" });
                      announce("Content判定を再試行しました。人間の判断待ちです。");
                    }}
                  >
                    Content判定を再試行
                  </button>
                )}
              </div>
            </section>
            <section className={styles.panel}>
              <h2>人間による判断</h2>
              <div className={styles.form}>
                <label>
                  理由カテゴリ
                  <select
                    value={state.reasonCategory}
                    disabled={terminal}
                    onChange={(event) => update({ reasonCategory: event.target.value })}
                  >
                    <option value="">選択してください</option>
                    <option value="内容・公式条件を照合済み">
                      内容・公式条件を照合済み
                    </option>
                    <option value="利用体験として掲載可能">
                      利用体験として掲載可能
                    </option>
                    <option value="規約違反を確認">規約違反を確認</option>
                    <option value="事実誤認の可能性">事実誤認の可能性</option>
                  </select>
                </label>
                <label>
                  判断補足（非監査）
                  <textarea
                    value={state.reason}
                    disabled={terminal}
                    maxLength={500}
                    onChange={(event) => update({ reason: event.target.value })}
                  />
                </label>
                <p className={styles.help}>
                  氏名・電話番号・住所など不要な個人情報、Password、Token、Secretは入力しないでください。Client側ではメールアドレスとCredential・Secretの一部だけを補助検出し、監査Eventには選択した理由カテゴリだけを記録します。
                </p>
              </div>
              <div className={styles.actions}>
                {selected.reports === 0 ? (
                  <>
                    <button
                      className={styles.primary}
                      type="button"
                      disabled={terminal}
                      onClick={() => requestDecision("publish")}
                    >
                      再認証して公開承認
                    </button>
                    <button
                      className={styles.danger}
                      type="button"
                      disabled={terminal}
                      onClick={() => requestDecision("remove")}
                    >
                      再認証して却下・削除
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.primary}
                      type="button"
                      disabled={terminal}
                      onClick={() => requestDecision("keep")}
                    >
                      再認証して掲載継続
                    </button>
                    <button
                      className={styles.secondary}
                      type="button"
                      disabled={terminal}
                      onClick={() => requestDecision("hide")}
                    >
                      再認証して一時非公開
                    </button>
                    <button
                      className={styles.danger}
                      type="button"
                      disabled={terminal}
                      onClick={() => requestDecision("remove")}
                    >
                      再認証して削除
                    </button>
                  </>
                )}
              </div>
            </section>
            <section className={styles.panel}>
              <h2>合成監査Timeline</h2>
              <ul className={styles.audit}>
                {audits[selectedId].map((event, index) => (
                  <li key={`${event.at}-${event.action}-${index}`}>
                    <time>{event.at}</time>
                    <strong>{event.action}</strong> / 対象 {selected.id} / Actor{" "}
                    {event.actor}
                    <br />
                    理由: {event.reason}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <ReauthDialog
          open={reauthOpen}
          actionLabel="Review判断を確定"
          description="Reviewの公開状態を変更し、判断理由を監査Eventへ記録します。"
          onCancel={() => setReauthOpen(false)}
          onConfirm={() => {
            const nextStatus: CaseState["status"] =
              pendingDecision === "publish"
                ? "published"
                : pendingDecision === "keep"
                  ? "kept"
                  : pendingDecision === "hide"
                    ? "hidden"
                    : "removed";
            update({ status: nextStatus });
            setAudits((current) => ({
              ...current,
              [selectedId]: [
                ...current[selectedId],
                {
                  at: "2026-10-06 11:00（合成）",
                  actor: "ops-reviewer@example.invalid",
                  action: statusLabel(nextStatus),
                  reason: state.reasonCategory,
                },
              ],
            }));
            setReauthOpen(false);
            announce(
              `${statusLabel(nextStatus)}としたUI-only状態です。外部公開・削除・永続化は行っていません。`,
            );
          }}
        />
      </main>
    </OpsShell>
  );
}
