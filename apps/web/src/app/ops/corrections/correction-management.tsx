"use client";

import { useRef, useState } from "react";
import { prototypeCorrectionCases } from "@/fixtures/ops-workflows";
import { OpsShell } from "../ops-shell";
import { ReauthDialog } from "../reauth-dialog";
import styles from "../workflow.module.css";

type Id = (typeof prototypeCorrectionCases)[number]["id"];
type Outcome = "fix" | "reject";
type CorrectionState = {
  status: "unreviewed" | "reviewing" | "draft" | "forwarded" | "rejected" | "completed";
  outcome: Outcome;
  reason: string;
  reasonCategory: string;
  sourceChecked: boolean;
};
type Audit = { at: string; actor: string; action: string; reason: string };

const initialStates = Object.fromEntries(
  prototypeCorrectionCases.map((item) => [
    item.id,
    {
      status: item.status === "完了" ? "completed" : "unreviewed",
      outcome: "fix",
      reason: "",
      reasonCategory: "",
      sourceChecked: false,
    },
  ]),
) as Record<Id, CorrectionState>;

const labels: Record<CorrectionState["status"], string> = {
  unreviewed: "未確認",
  reviewing: "確認中",
  draft: "判断Draft",
  forwarded: "修正対応",
  rejected: "却下",
  completed: "完了",
};
const containsSensitiveText = (value: string) =>
  /[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|password|secret|api[_ -]?key)\s*[:=]/i.test(
    value,
  );

export default function CorrectionManagement() {
  const [selectedId, setSelectedId] = useState<Id>(prototypeCorrectionCases[0].id);
  const [states, setStates] = useState(initialStates);
  const [reauthOpen, setReauthOpen] = useState(false);
  const [result, setResult] = useState("");
  const [audits, setAudits] = useState<Record<Id, Audit[]>>(
    Object.fromEntries(
      prototypeCorrectionCases.map((item) => [
        item.id,
        item.audit.map((event) => ({ ...event })),
      ]),
    ) as Record<Id, Audit[]>,
  );
  const resultRef = useRef<HTMLDivElement>(null);
  const selected = prototypeCorrectionCases.find((item) => item.id === selectedId)!;
  const state = states[selectedId];
  const terminal = ["forwarded", "rejected", "completed"].includes(state.status);
  const update = (patch: Partial<CorrectionState>) =>
    setStates((current) => ({
      ...current,
      [selectedId]: { ...current[selectedId], ...patch },
    }));
  const announce = (message: string) => {
    setResult(message);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  return (
    <OpsShell>
      <main id="main-content" className={styles.main}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>CORRECTION INTAKE</p>
            <h1>誤情報指摘管理</h1>
            <p>
              利用者の指摘と公式Sourceを照合し、修正対応または却下理由を記録します。
            </p>
          </div>
          <span className={styles.badge}>受付から3営業日以内の着手目標</span>
        </div>
        {result && (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="region"
            aria-label="誤情報指摘の操作結果"
            className={styles.result}
          >
            <span role="status">{result}</span>
          </div>
        )}
        <div className={styles.grid}>
          <aside className={styles.panel} aria-label="誤情報指摘一覧">
            <h2>受付一覧</h2>
            <div className={styles.queue}>
              {prototypeCorrectionCases.map((item) => (
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
                    data-tone={
                      states[item.id].status === "unreviewed"
                        ? "danger"
                        : states[item.id].status === "completed"
                          ? "success"
                          : "warning"
                    }
                  >
                    {labels[states[item.id].status]}
                  </span>
                  <strong>{item.target}</strong>
                  <span>{item.field}</span>
                  <small>
                    {item.id} / 受付 {item.received}
                  </small>
                </button>
              ))}
            </div>
          </aside>
          <div>
            <section className={styles.panel} aria-labelledby="correction-title">
              <div className={styles.heading}>
                <div>
                  <span
                    className={styles.status}
                    data-tone={terminal ? "success" : "warning"}
                  >
                    {labels[state.status]}
                  </span>
                  <h2 id="correction-title">{selected.target}</h2>
                </div>
                <strong>{selected.id}</strong>
              </div>
              <dl className={styles.definition}>
                <div>
                  <dt>掲載項目</dt>
                  <dd>{selected.field}</dd>
                </div>
                <div>
                  <dt>指摘内容</dt>
                  <dd>{selected.detail}</dd>
                </div>
                <div>
                  <dt>利用者提示の根拠</dt>
                  <dd>{selected.evidence}</dd>
                </div>
                <div>
                  <dt>受付・着手目標</dt>
                  <dd>
                    {selected.received} / {selected.due}
                  </dd>
                </div>
                <div>
                  <dt>公式Source候補</dt>
                  <dd>{selected.source}</dd>
                </div>
              </dl>
              <p className={styles.help}>
                連絡先は任意かつ運営確認用です。このMockでは実在メール・個人情報を表示しません。
              </p>
              {!terminal && state.status === "unreviewed" && (
                <div className={styles.actions}>
                  <button
                    className={styles.primary}
                    type="button"
                    onClick={() => {
                      update({ status: "reviewing" });
                      setAudits((current) => ({
                        ...current,
                        [selectedId]: [
                          ...current[selectedId],
                          {
                            at: "2026-10-06 10:20（合成）",
                            actor: "ops-editor@example.invalid",
                            action: "公式Source確認へ着手",
                            reason: "受付内容と公式Source候補を照合するため",
                          },
                        ],
                      }));
                      announce(
                        "確認中へ変更しました。受付自体を正しい・誤りと確定していません。",
                      );
                    }}
                  >
                    公式Source確認を開始
                  </button>
                </div>
              )}
            </section>
            {!terminal && state.status !== "unreviewed" && (
              <section className={styles.panel}>
                <h2>確認と判断Draft</h2>
                <div className={styles.form}>
                  <label>
                    <span>
                      <input
                        type="checkbox"
                        checked={state.sourceChecked}
                        onChange={(event) =>
                          update({
                            sourceChecked: event.target.checked,
                            status: "reviewing",
                          })
                        }
                      />{" "}
                      公式Sourceの対象・適用時期・Rule versionを確認した
                    </span>
                  </label>
                  <fieldset className={styles.radioGroup}>
                    <legend>判断</legend>
                    <label>
                      <input
                        type="radio"
                        name="outcome"
                        checked={state.outcome === "fix"}
                        onChange={() =>
                          update({
                            outcome: "fix",
                            reasonCategory: "",
                            status: "reviewing",
                          })
                        }
                      />
                      修正案を作成し、カード情報差分の確認・承認へ送る
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="outcome"
                        checked={state.outcome === "reject"}
                        onChange={() =>
                          update({
                            outcome: "reject",
                            reasonCategory: "",
                            status: "reviewing",
                          })
                        }
                      />
                      掲載情報が正しい、または根拠未確認として却下する
                    </label>
                  </fieldset>
                  <label>
                    理由カテゴリ
                    <select
                      value={state.reasonCategory}
                      onChange={(event) =>
                        update({
                          reasonCategory: event.target.value,
                          status: "reviewing",
                        })
                      }
                    >
                      <option value="">選択してください</option>
                      {state.outcome === "fix" ? (
                        <option value="公式情報の更新を確認">
                          公式情報の更新を確認
                        </option>
                      ) : (
                        <>
                          <option value="掲載内容と公式情報が一致">
                            掲載内容と公式情報が一致
                          </option>
                          <option value="根拠不足・適用対象外">
                            根拠不足・適用対象外
                          </option>
                        </>
                      )}
                    </select>
                  </label>
                  <label>
                    判断補足（非監査）
                    <textarea
                      value={state.reason}
                      maxLength={800}
                      onChange={(event) =>
                        update({ reason: event.target.value, status: "reviewing" })
                      }
                    />
                  </label>
                  <p className={styles.help}>
                    氏名・電話番号・住所など不要な個人情報、Password、Token、Secretは入力しないでください。Client側ではメールアドレスとCredential・Secretの一部だけを補助検出し、監査Eventには選択した理由カテゴリだけを記録します。
                  </p>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.secondary}
                    type="button"
                    onClick={() => {
                      if (
                        !state.sourceChecked ||
                        !state.reasonCategory ||
                        !state.reason.trim()
                      ) {
                        announce(
                          "公式Source確認、理由カテゴリ、判断補足を入力してください。Draftは保存していません。",
                        );
                        return;
                      }
                      if (containsSensitiveText(state.reason)) {
                        announce(
                          "判断理由にメールアドレスやCredential・Secretを入力しないでください。Draftは保存していません。",
                        );
                        return;
                      }
                      const categoryMatchesOutcome =
                        state.outcome === "fix"
                          ? state.reasonCategory === "公式情報の更新を確認"
                          : [
                              "掲載内容と公式情報が一致",
                              "根拠不足・適用対象外",
                            ].includes(state.reasonCategory);
                      if (!categoryMatchesOutcome) {
                        announce(
                          "判断と理由カテゴリの組合せが一致しません。Draftは保存していません。",
                        );
                        return;
                      }
                      update({ status: "draft" });
                      setAudits((current) => ({
                        ...current,
                        [selectedId]: [
                          ...current[selectedId],
                          {
                            at: "2026-10-06 10:30（合成）",
                            actor: "ops-editor@example.invalid",
                            action: `${state.outcome === "fix" ? "修正対応" : "却下"}の判断Draftを保存`,
                            reason: state.reasonCategory,
                          },
                        ],
                      }));
                      announce(
                        "判断DraftをMemory内に保存しました。公開情報は変更していません。",
                      );
                    }}
                  >
                    判断Draft保存
                  </button>
                  <button
                    className={state.outcome === "fix" ? styles.primary : styles.danger}
                    type="button"
                    disabled={state.status !== "draft"}
                    onClick={() => setReauthOpen(true)}
                  >
                    再認証して判断を確定
                  </button>
                </div>
              </section>
            )}
            <section className={styles.panel}>
              <h2>処理境界</h2>
              <ul className={styles.checklist}>
                <li>指摘だけで掲載情報を自動変更しない</li>
                <li>修正案はFR-022の差分確認・明示承認へ送る</li>
                <li>却下時も公式Sourceと判断理由を保持する</li>
                <li>ObservationからDomain Factまでの追跡を維持する</li>
              </ul>
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
          actionLabel="訂正判断を確定"
          description="公式Sourceの確認結果と判断理由を記録します。修正案は別の差分承認を経るまで公開されません。"
          onCancel={() => setReauthOpen(false)}
          onConfirm={() => {
            const next = state.outcome === "fix" ? "forwarded" : "rejected";
            update({ status: next });
            setAudits((current) => ({
              ...current,
              [selectedId]: [
                ...current[selectedId],
                {
                  at: "2026-10-06 10:40（合成）",
                  actor: "ops-approver@example.invalid",
                  action: next === "forwarded" ? "修正対応へ送付" : "指摘を却下",
                  reason: state.reasonCategory,
                },
              ],
            }));
            setReauthOpen(false);
            announce(
              next === "forwarded"
                ? "修正案を差分確認へ送ったUI-only状態です。公開情報は変更していません。"
                : "指摘を却下したUI-only状態です。判断理由を記録しました。",
            );
          }}
        />
      </main>
    </OpsShell>
  );
}
