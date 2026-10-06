"use client";

import { useRef, useState } from "react";
import { prototypeBusinessRecords } from "@/fixtures/ops-workflows";
import { OpsShell } from "../ops-shell";
import { ReauthDialog } from "../reauth-dialog";
import styles from "../workflow.module.css";

type Id = (typeof prototypeBusinessRecords)[number]["id"];
type RecordState = {
  value: string;
  source: string;
  effective: string;
  reason: string;
  reasonCategory: string;
  status: "editing" | "saved" | "approved" | "invalidated";
};
type Action = "approve" | "invalidate";
type Audit = { at: string; actor: string; action: string; reason: string };

const initialStates = Object.fromEntries(
  prototypeBusinessRecords.map((item) => [
    item.id,
    {
      value: item.value,
      source: item.source,
      effective: item.effective,
      reason: "",
      reasonCategory: "",
      status: "editing",
    },
  ]),
) as Record<Id, RecordState>;
const unsafe = (value: string) => /[<>]|[a-z][a-z0-9+.-]*:|\/\//i.test(value);
const containsSensitiveText = (value: string) =>
  /[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:token|password|secret|api[_ -]?key)\s*[:=]/i.test(
    value,
  );

export default function BusinessDataManagement() {
  const [selectedId, setSelectedId] = useState<Id>(prototypeBusinessRecords[0].id);
  const [states, setStates] = useState(initialStates);
  const [action, setAction] = useState<Action>("approve");
  const [reauthOpen, setReauthOpen] = useState(false);
  const [result, setResult] = useState("");
  const [audits, setAudits] = useState<Record<Id, Audit[]>>(
    Object.fromEntries(
      prototypeBusinessRecords.map((item) => [
        item.id,
        item.audit.map((event) => ({ ...event })),
      ]),
    ) as Record<Id, Audit[]>,
  );
  const resultRef = useRef<HTMLDivElement>(null);
  const selected = prototypeBusinessRecords.find((item) => item.id === selectedId)!;
  const state = states[selectedId];
  const terminal = state.status === "approved" || state.status === "invalidated";
  const draftCount = Object.values(states).filter(
    (item) => item.status === "editing" || item.status === "saved",
  ).length;
  const domainTypeCount = new Set(prototypeBusinessRecords.map((item) => item.type))
    .size;
  const complete = Boolean(
    state.value.trim() &&
    state.source.trim() &&
    state.effective.trim() &&
    state.reasonCategory &&
    state.reason.trim(),
  );
  const safe = ![state.value, state.source, state.effective, state.reason].some(unsafe);
  const hasSensitiveText = [
    state.value,
    state.source,
    state.effective,
    state.reason,
  ].some(containsSensitiveText);
  const update = (patch: Partial<RecordState>) =>
    setStates((current) => ({
      ...current,
      [selectedId]: { ...current[selectedId], ...patch },
    }));
  const announce = (message: string) => {
    setResult(message);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  const edit = (patch: Partial<RecordState>) => update({ ...patch, status: "editing" });
  const request = (next: Action) => {
    const expectedCategory =
      selected.status === "改定Draft"
        ? "公式条件の改定"
        : selected.status === "訂正Draft"
          ? "表記・関係の訂正"
          : selected.status === "追加Draft"
            ? "新規分類の追加"
            : "対象終了・無効化";
    if (
      state.reasonCategory !== expectedCategory ||
      (next === "invalidate") !== (selected.status === "無効化Draft")
    ) {
      announce("候補種別・理由カテゴリ・確定Actionの組合せが一致しません。");
      return;
    }
    setAction(next);
    setReauthOpen(true);
  };
  const label = (value: RecordState["status"]) =>
    value === "approved"
      ? "承認済み"
      : value === "invalidated"
        ? "無効化済み"
        : value === "saved"
          ? "Draft保存済み"
          : selected.status;
  return (
    <OpsShell>
      <main id="main-content" className={styles.main}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>BUSINESS DATA</p>
            <h1>業務情報管理</h1>
            <p>
              追加・訂正・無効化を、Source、適用時期、変更理由、Domain上の関係とともに確認します。
            </p>
          </div>
          <span className={styles.badge}>編集と承認を分離</span>
        </div>
        <div className={styles.metrics} aria-label="業務情報概要">
          <div>
            <strong>{draftCount}</strong>
            <small>変更Draft</small>
          </div>
          <div>
            <strong>{domainTypeCount}種</strong>
            <small>Domain対象</small>
          </div>
          <div>
            <strong>0</strong>
            <small>直接削除</small>
          </div>
          <div>
            <strong>3年</strong>
            <small>合成履歴保持表示</small>
          </div>
        </div>
        {result && (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="region"
            aria-label="業務情報の操作結果"
            className={styles.result}
          >
            <span role="status">{result}</span>
          </div>
        )}
        <div className={styles.grid}>
          <aside className={styles.panel} aria-label="業務情報Draft一覧">
            <h2>変更Draft</h2>
            <div className={styles.queue}>
              {prototypeBusinessRecords.map((item) => (
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
                      states[item.id].status === "approved"
                        ? "success"
                        : states[item.id].status === "invalidated"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {states[item.id].status === "approved"
                      ? "承認済み"
                      : states[item.id].status === "invalidated"
                        ? "無効化済み"
                        : item.status}
                  </span>
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                  <small>{item.relation}</small>
                </button>
              ))}
            </div>
          </aside>
          <div>
            <section className={styles.panel} aria-labelledby="business-title">
              <div className={styles.heading}>
                <div>
                  <span
                    className={styles.status}
                    data-tone={
                      terminal
                        ? state.status === "approved"
                          ? "success"
                          : "danger"
                        : "warning"
                    }
                  >
                    {label(state.status)}
                  </span>
                  <h2 id="business-title">{selected.name}</h2>
                </div>
                <strong>{selected.id}</strong>
              </div>
              <dl className={styles.definition}>
                <div>
                  <dt>対象種別</dt>
                  <dd>{selected.type}</dd>
                </div>
                <div>
                  <dt>Domain上の関係</dt>
                  <dd>{selected.relation}</dd>
                </div>
                <div>
                  <dt>変更種別</dt>
                  <dd>{selected.status}</dd>
                </div>
              </dl>
              <div className={styles.form}>
                <label>
                  値・条件
                  <textarea
                    disabled={terminal}
                    value={state.value}
                    maxLength={500}
                    onChange={(event) => edit({ value: event.target.value })}
                  />
                </label>
                <label>
                  公式Source識別子
                  <input
                    disabled={terminal}
                    value={state.source}
                    onChange={(event) => edit({ source: event.target.value })}
                  />
                </label>
                <label>
                  適用時期
                  <input
                    disabled={terminal}
                    value={state.effective}
                    onChange={(event) => edit({ effective: event.target.value })}
                  />
                </label>
                <label>
                  理由カテゴリ
                  <select
                    disabled={terminal}
                    value={state.reasonCategory}
                    onChange={(event) => edit({ reasonCategory: event.target.value })}
                  >
                    <option value="">選択してください</option>
                    <option
                      value={
                        selected.status === "改定Draft"
                          ? "公式条件の改定"
                          : selected.status === "訂正Draft"
                            ? "表記・関係の訂正"
                            : selected.status === "追加Draft"
                              ? "新規分類の追加"
                              : "対象終了・無効化"
                      }
                    >
                      {selected.status === "改定Draft"
                        ? "公式条件の改定"
                        : selected.status === "訂正Draft"
                          ? "表記・関係の訂正"
                          : selected.status === "追加Draft"
                            ? "新規分類の追加"
                            : "対象終了・無効化"}
                    </option>
                  </select>
                </label>
                <label>
                  変更補足（非監査）
                  <textarea
                    disabled={terminal}
                    value={state.reason}
                    maxLength={500}
                    onChange={(event) => edit({ reason: event.target.value })}
                  />
                </label>
                <p className={styles.help}>
                  氏名・電話番号・住所など不要な個人情報、Password、Token、Secretは入力しないでください。Client側ではメールアドレスとCredential・Secretの一部だけを補助検出し、監査Eventには選択した理由カテゴリだけを記録します。
                </p>
              </div>
              {(!safe || hasSensitiveText) && (
                <div role="alert" className={styles.alert}>
                  Markup、URL
                  scheme、外部URL、メールアドレス・Credential・Secretは入力できません。安全なPlain
                  Textへ修正してください。
                </div>
              )}
              <div className={styles.actions}>
                <button
                  className={styles.secondary}
                  type="button"
                  disabled={terminal}
                  onClick={() => {
                    if (!complete || !safe || hasSensitiveText) {
                      announce(
                        "必須入力と安全性を修正してください。Draftは保存していません。",
                      );
                      return;
                    }
                    update({ status: "saved" });
                    setAudits((current) => ({
                      ...current,
                      [selectedId]: [
                        ...current[selectedId],
                        {
                          at: "2026-10-06 11:10（合成）",
                          actor: "ops-editor@example.invalid",
                          action: "変更Draftを保存",
                          reason: state.reasonCategory,
                        },
                      ],
                    }));
                    announce(
                      "変更DraftをMemory内に保存しました。承認済み情報は変更していません。",
                    );
                  }}
                >
                  変更Draft保存
                </button>
                <button
                  className={styles.primary}
                  type="button"
                  disabled={
                    state.status !== "saved" || selected.status === "無効化Draft"
                  }
                  onClick={() => request("approve")}
                >
                  再認証して承認
                </button>
                <button
                  className={styles.danger}
                  type="button"
                  disabled={
                    state.status !== "saved" || selected.status !== "無効化Draft"
                  }
                  onClick={() => request("invalidate")}
                >
                  再認証して無効化
                </button>
              </div>
            </section>
            <section className={styles.panel}>
              <h2>変更前後と追跡</h2>
              <div className={styles.layout}>
                <div className={styles.notice}>
                  <strong>変更前</strong>
                  {selected.previous ? (
                    <small>
                      {selected.previous.type} / {selected.previous.relation} /{" "}
                      {selected.previous.value} / version {selected.previous.version} /{" "}
                      {selected.previous.effective}
                    </small>
                  ) : (
                    <small>変更前なし（新規追加候補）</small>
                  )}
                </div>
                <div className={styles.notice}>
                  <strong>変更後候補</strong>
                  <small>
                    {state.value} / {state.effective}
                  </small>
                </div>
              </div>
              <ul className={styles.checklist}>
                <li>Product・Offering・Variantを共通値として統合しない</li>
                <li>Rule versionとCampaign Instance/effectを区別する</li>
                <li>無効化後も過去の計算・記事・Evidenceとの関係を保持する</li>
                <li>編集者と承認者を別Eventとして記録する</li>
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
          actionLabel={action === "approve" ? "業務情報を承認" : "業務情報を無効化"}
          description={
            action === "approve"
              ? "保存済みDraftを承認可能な版へ進めます。"
              : "情報を削除せず無効化し、過去の追跡関係を残します。"
          }
          onCancel={() => setReauthOpen(false)}
          onConfirm={() => {
            const next = action === "approve" ? "approved" : "invalidated";
            update({ status: next });
            setAudits((current) => ({
              ...current,
              [selectedId]: [
                ...current[selectedId],
                {
                  at: "2026-10-06 11:20（合成）",
                  actor: "ops-approver@example.invalid",
                  action: next === "approved" ? "変更を明示承認" : "情報を無効化",
                  reason: state.reasonCategory,
                },
              ],
            }));
            setReauthOpen(false);
            announce(
              next === "approved"
                ? "業務情報を承認済みとしたUI-only状態です。外部反映・永続化は行っていません。"
                : "業務情報を削除せず無効化したUI-only状態です。過去履歴を保持します。",
            );
          }}
        />
      </main>
    </OpsShell>
  );
}
