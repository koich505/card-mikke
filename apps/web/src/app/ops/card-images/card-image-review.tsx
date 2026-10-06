"use client";
import { useRef, useState } from "react";
import { prototypeCardImages, prototypeImageHistory } from "@/fixtures/ops-workflows";
import { OpsShell } from "../ops-shell";
import { ReauthDialog } from "../reauth-dialog";
import styles from "../workflow.module.css";
type Id = (typeof prototypeCardImages)[number]["id"];
type State = {
  alt: string;
  reason: string;
  status: "draft" | "blocked" | "approved" | "rejected";
};
const initialStates = Object.fromEntries(
  prototypeCardImages.map((item) => [
    item.id,
    { alt: item.alt, reason: "", status: item.status },
  ]),
) as Record<Id, State>;
export default function CardImageReview() {
  const [selectedId, setSelectedId] = useState<Id>(prototypeCardImages[0].id),
    [states, setStates] = useState(initialStates),
    [draftSaved, setDraftSaved] = useState(false),
    [result, setResult] = useState(""),
    [reauthOpen, setReauthOpen] = useState(false),
    [pendingAction, setPendingAction] = useState<"approve" | "invalidate">("approve"),
    [historyInvalidated, setHistoryInvalidated] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const selected = prototypeCardImages.find((item) => item.id === selectedId)!;
  const state = states[selectedId];
  const update = (patch: Partial<State>) =>
    setStates((current) => ({
      ...current,
      [selectedId]: { ...current[selectedId], ...patch },
    }));
  const terminal = state.status === "approved" || state.status === "rejected";
  const valid =
    state.status === "draft" &&
    selected.license !== "未確認" &&
    state.alt.trim() &&
    draftSaved;
  const announce = (text: string) => {
    setResult(text);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  const choose = (id: Id) => {
    setSelectedId(id);
    setDraftSaved(false);
    setResult("");
  };
  const label = (value: State["status"]) =>
    value === "approved"
      ? "承認済み"
      : value === "rejected"
        ? "却下済み"
        : value === "blocked"
          ? "許諾確認待ち"
          : "未公開Draft";
  return (
    <OpsShell>
      <main id="main-content" className={styles.main}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>CARD IMAGE REVIEW</p>
            <h1>券面画像確認・承認</h1>
            <p>
              AI取得候補を未公開Draftとして確認し、人間の明示承認後だけ公開可能にします。
            </p>
          </div>
          <span className={styles.badge}>合成CSS券面 / 実Assetなし</span>
        </div>
        {result && (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="region"
            aria-label="券面画像の操作結果"
            className={styles.result}
          >
            <span role="status">{result}</span>
          </div>
        )}
        <div className={styles.grid}>
          <aside className={styles.panel} aria-label="券面画像候補一覧">
            <h2>券面候補 2件</h2>
            <div className={styles.queue}>
              {prototypeCardImages.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={item.id === selectedId}
                  onClick={() => choose(item.id)}
                >
                  <span
                    className={styles.status}
                    data-tone={
                      states[item.id].status === "approved"
                        ? "success"
                        : states[item.id].status === "draft"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {label(states[item.id].status)}
                  </span>
                  <strong>{item.card}</strong>
                  <span>{item.design}</span>
                  <small>
                    {item.brand} / {item.variant}
                  </small>
                </button>
              ))}
            </div>
          </aside>
          <div>
            <section className={styles.panel} aria-labelledby="candidate-heading">
              <div className={styles.heading}>
                <div>
                  <span
                    className={styles.status}
                    data-tone={
                      state.status === "approved"
                        ? "success"
                        : state.status === "draft"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {label(state.status)}
                  </span>
                  <h2 id="candidate-heading">
                    {selected.card} / {selected.design}
                  </h2>
                </div>
              </div>
              <div className={styles.layout}>
                <div>
                  <div
                    className={styles.preview}
                    data-accent={selected.accent}
                    role="img"
                    aria-label={state.alt || "代替Text未入力"}
                  >
                    <small>CARD MIKKE / ABSTRACT</small>
                    <strong>{selected.design}</strong>
                  </div>
                  <p className={styles.help}>
                    画像だけで商品を識別せず、カード名称と対応条件を併記します。
                  </p>
                </div>
                <dl className={styles.definition}>
                  <div>
                    <dt>Brand・Variant</dt>
                    <dd>
                      {selected.brand} / {selected.variant}
                    </dd>
                  </div>
                  <div>
                    <dt>公式Source候補</dt>
                    <dd>{selected.source}</dd>
                  </div>
                  <div>
                    <dt>取得日</dt>
                    <dd>{selected.retrieved}</dd>
                  </div>
                  <div>
                    <dt>利用条件</dt>
                    <dd>{selected.license}</dd>
                  </div>
                  <div>
                    <dt>適用期間</dt>
                    <dd>{selected.period}</dd>
                  </div>
                  <div>
                    <dt>既存との差分</dt>
                    <dd>
                      配色・名称・適用期間の追加候補。Product同一性は推論しません。
                    </dd>
                  </div>
                </dl>
              </div>
              {state.status === "blocked" && (
                <div role="alert" className={styles.alert}>
                  <strong>公開承認できません。</strong>
                  <br />
                  利用許諾または公式な利用条件の確認が必要です。
                </div>
              )}
              <div className={styles.form}>
                <label>
                  代替Text
                  <textarea
                    value={state.alt}
                    disabled={terminal}
                    maxLength={180}
                    onChange={(event) => {
                      update({ alt: event.target.value });
                      setDraftSaved(false);
                    }}
                  />
                </label>
                <small className={styles.help}>{state.alt.length}/180文字</small>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.secondary}
                  type="button"
                  disabled={terminal}
                  onClick={() => {
                    setDraftSaved(true);
                    announce(
                      "券面metadataのDraftをMemory内に保存しました。公開中画像は変更していません。",
                    );
                  }}
                >
                  Draft保存
                </button>
                <button
                  className={styles.primary}
                  type="button"
                  disabled={!valid}
                  onClick={() => {
                    setPendingAction("approve");
                    setReauthOpen(true);
                  }}
                >
                  再認証して公開承認
                </button>
              </div>
            </section>
            <section className={styles.panel}>
              <h2>却下</h2>
              <div className={styles.form}>
                <label>
                  却下理由
                  <textarea
                    value={state.reason}
                    disabled={terminal}
                    onChange={(event) => update({ reason: event.target.value })}
                  />
                </label>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.danger}
                  type="button"
                  disabled={!state.reason.trim() || terminal}
                  onClick={() => {
                    update({ status: "rejected" });
                    announce(
                      "候補を却下しました。画像本体は30日以内、Source・取得日・却下理由metadataは3年間保持する想定です（UI-only）。",
                    );
                  }}
                >
                  候補を却下
                </button>
              </div>
            </section>
            <section className={styles.panel}>
              <h2>公開画像の履歴</h2>
              <ul className={styles.history}>
                {state.status === "approved" && (
                  <li>
                    <strong>新Draft</strong>
                    <span>承認済み / 差替え候補</span>
                    <span>現在のMemory Session</span>
                  </li>
                )}
                {prototypeImageHistory.map((item, index) => (
                  <li key={item.version}>
                    <strong>{item.version}</strong>
                    <span>
                      {index === 0 && historyInvalidated ? "無効化済み" : item.status}
                      <small>{item.period}</small>
                    </span>
                    <span>
                      承認 {item.approved}
                      <small>{item.actor}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <p className={styles.help}>
                旧画像と適用期間を上書きせず、履歴として保持します。
              </p>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.danger}
                  disabled={historyInvalidated}
                  onClick={() => {
                    setPendingAction("invalidate");
                    setReauthOpen(true);
                  }}
                >
                  公開中v2を再認証して無効化
                </button>
              </div>
            </section>
          </div>
        </div>
        <ReauthDialog
          open={reauthOpen}
          actionLabel={
            pendingAction === "approve" ? "券面を公開承認" : "公開画像を無効化"
          }
          description="対象、Source、利用条件、適用期間、代替Text、履歴への影響を確認した操作として記録します。"
          onCancel={() => setReauthOpen(false)}
          onConfirm={() => {
            setReauthOpen(false);
            if (pendingAction === "approve") {
              update({ status: "approved" });
              setDraftSaved(false);
              announce(
                "券面画像を承認済みとしたUI-only状態です。再承認はできません。外部公開・永続化は行っていません。",
              );
            } else {
              setHistoryInvalidated(true);
              announce(
                "公開中v2を無効化したUI-only状態です。旧版履歴は保持しています。",
              );
            }
          }}
        />
      </main>
    </OpsShell>
  );
}
