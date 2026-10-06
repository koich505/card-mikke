"use client";
import { useRef, useState } from "react";
import { prototypeArticleDraft } from "@/fixtures/ops-workflows";
import { OpsShell } from "../ops-shell";
import { ReauthDialog } from "../reauth-dialog";
import styles from "../workflow.module.css";
const plainTextPattern =
  /^[\p{L}\p{N}\p{M}\p{Zs}\n\r\t、。・，．,:：;；!?！？（）()\[\]「」『』【】／/＋+＝=％%&＆'"’“”ー〜～—–…_-]*$/u;
const schemePattern = /[a-z][a-z0-9+.-]*:/i;
const isUnsafePlainText = (value: string) =>
  !plainTextPattern.test(value) ||
  schemePattern.test(value) ||
  /\/\/|on\w+\s*=/i.test(value);

const placementRules = ["日常利用", "旅行Benefit", "年会費無料"] as const;
export default function ArticleDraftReview() {
  const [title, setTitle] = useState<string>(prototypeArticleDraft.title),
    [criterion, setCriterion] = useState<string>(prototypeArticleDraft.criterion),
    [body, setBody] = useState<string>(prototypeArticleDraft.body),
    [placements, setPlacements] = useState<string[]>([
      ...prototypeArticleDraft.placements,
    ]),
    [excluded, setExcluded] = useState<string>(prototypeArticleDraft.excluded),
    [saved, setSaved] = useState(false),
    [validated, setValidated] = useState(true),
    [axesApproved, setAxesApproved] = useState(false),
    [bodyApproved, setBodyApproved] = useState(false),
    [result, setResult] = useState(""),
    [reauthOpen, setReauthOpen] = useState(false),
    [approved, setApproved] = useState(false),
    [generationState, setGenerationState] = useState<"ready" | "failed">("ready"),
    [audits, setAudits] = useState<string[]>([
      "2026-10-05 07:40｜AI生成Draft作成 / 自動公開なし",
    ]);
  const resultRef = useRef<HTMLDivElement>(null);
  const unsafe = [title, criterion, body, ...placements, excluded].some(
    isUnsafePlainText,
  );
  const semanticallyConsistent =
    criterion.includes("年会費") &&
    criterion.includes("日常利用") &&
    placements.every((value, index) => value.includes(placementRules[index])) &&
    excluded.includes("情報不足");
  const contentComplete = Boolean(
    title.trim() &&
    body.trim() &&
    criterion.trim() &&
    excluded.trim() &&
    placements.every((value) => value.trim()),
  );
  const ready = Boolean(
    !approved &&
    generationState === "ready" &&
    saved &&
    validated &&
    !unsafe &&
    contentComplete &&
    axesApproved &&
    bodyApproved,
  );
  const announce = (text: string) => {
    setResult(text);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  const audit = (text: string) => setAudits((current) => [...current, `現在｜${text}`]);
  const edited = () => {
    setSaved(false);
    setBodyApproved(false);
  };
  const recordEdit = (target: string) => audit(`${target}を編集`);
  const placementEdited = () => {
    setSaved(false);
    setValidated(false);
    setAxesApproved(false);
  };
  const revalidate = () => {
    if (
      !criterion.trim() ||
      !placements.every((value) => value.trim()) ||
      !excluded.trim() ||
      unsafe ||
      !semanticallyConsistent
    ) {
      setValidated(false);
      announce(
        "評価基準、対象・除外、各配置理由の整合性、安全性を修正してください。再検証は完了していません。",
      );
      return;
    }
    setValidated(true);
    audit("編集後の評価基準で全配置を再検証");
    announce("3件の配置を編集後の基準で再検証しました（合成）。");
  };
  return (
    <OpsShell>
      <main id="main-content" className={styles.main}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>ARTICLE WORKFLOW</p>
            <h1>記事Draft編集・承認</h1>
            <p>
              AI生成Contentを未信頼Draftとして編集し、本文と二軸配置を別々に確認します。
            </p>
          </div>
          <span className={styles.badge}>公開版は自動更新しません</span>
        </div>
        {result && (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="region"
            aria-label="記事Draftの操作結果"
            className={styles.result}
          >
            <span role="status">{result}</span>
          </div>
        )}
        <section className={styles.panel}>
          <div className={styles.heading}>
            <div>
              <span
                className={styles.status}
                data-tone={
                  approved
                    ? "success"
                    : generationState === "failed"
                      ? "danger"
                      : "warning"
                }
              >
                {approved
                  ? "承認済み"
                  : generationState === "failed"
                    ? "生成失敗・未公開"
                    : "未承認Draft"}
              </span>
              <h2>{prototypeArticleDraft.id}</h2>
            </div>
            <span className={styles.status}>更新Draft</span>
          </div>
          <p className={styles.alert}>
            <strong>{prototypeArticleDraft.publishedVersion}</strong>
            <br />
            このDraftの編集・生成だけでは公開中の旧版を削除・更新しません。
          </p>
          <div className={styles.metaCards}>
            <article>
              <strong>生成</strong>
              <small>
                {prototypeArticleDraft.generatedAt}
                <br />
                {prototypeArticleDraft.model}
              </small>
            </article>
            <article>
              <strong>Template</strong>
              <small>
                {prototypeArticleDraft.template}
                <br />
                {prototypeArticleDraft.inputRevision}
              </small>
            </article>
            <article>
              <strong>Evidence</strong>
              <small>{prototypeArticleDraft.source}</small>
            </article>
          </div>
          <div className={styles.actions}>
            {generationState === "ready" ? (
              <button
                className={styles.secondary}
                type="button"
                disabled={approved}
                onClick={() => {
                  setGenerationState("failed");
                  setSaved(false);
                  setValidated(false);
                  setBodyApproved(false);
                  setAxesApproved(false);
                  audit("記事生成失敗 / 未承認・未公開を維持");
                  announce(
                    "記事生成に失敗した状態を再現しました。旧公開版は継続し、Draftは未公開です。",
                  );
                }}
              >
                記事生成失敗を再現
              </button>
            ) : (
              <button
                className={styles.secondary}
                type="button"
                onClick={() => {
                  setGenerationState("ready");
                  setSaved(false);
                  setValidated(false);
                  setBodyApproved(false);
                  setAxesApproved(false);
                  audit("記事生成を再試行してDraftへ復帰");
                  announce("記事生成を再試行し、未承認Draftへ戻しました。");
                }}
              >
                記事生成を再試行
              </button>
            )}
          </div>
        </section>
        <div className={styles.editorGrid}>
          <section className={styles.panel}>
            <h2>本文を編集</h2>
            <div className={styles.form}>
              <label>
                記事タイトル
                <input
                  value={title}
                  disabled={approved}
                  maxLength={100}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    edited();
                  }}
                  onBlur={() => recordEdit("記事タイトル")}
                />
              </label>
              <label>
                記事本文
                <textarea
                  value={body}
                  disabled={approved}
                  maxLength={2000}
                  onChange={(e) => {
                    setBody(e.target.value);
                    edited();
                  }}
                  onBlur={() => recordEdit("記事本文")}
                />
              </label>
            </div>
            {unsafe && (
              <div role="alert" className={styles.alert}>
                <strong>公開前Validationに失敗しました。</strong>
                <br />
                このMockはPlain Textだけを許可し、Markup、Event
                Handler、外部URL、危険scheme、埋込を拒否します。
              </div>
            )}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                disabled={approved || generationState === "failed"}
                onClick={() => {
                  if (unsafe || !contentComplete) {
                    announce(
                      "安全性または必須入力を修正してください。Draftは保存していません。",
                    );
                    return;
                  }
                  setSaved(true);
                  audit("編集Draftを保存 / 公開版は不変");
                  announce(
                    "記事DraftをMemory内に保存しました。公開版は変更していません。",
                  );
                }}
              >
                Draft保存
              </button>
            </div>
            <label className={styles.checklist}>
              <span>
                <input
                  type="checkbox"
                  checked={bodyApproved}
                  disabled={approved}
                  onChange={(e) => setBodyApproved(e.target.checked)}
                />{" "}
                本文、Source、確認日、公開可能な構造を確認した
              </span>
            </label>
          </section>
          <section className={styles.panel}>
            <h2>二軸・配置を確認</h2>
            <div className={styles.form}>
              <label>
                軸と評価基準
                <textarea
                  value={criterion}
                  disabled={approved}
                  onChange={(e) => {
                    setCriterion(e.target.value);
                    placementEdited();
                  }}
                  onBlur={() => recordEdit("軸と評価基準")}
                />
              </label>
              {placements.map((value, index) => (
                <label key={index}>
                  配置{index + 1}と理由
                  <textarea
                    value={value}
                    disabled={approved}
                    onChange={(e) => {
                      setPlacements((current) =>
                        current.map((item, i) => (i === index ? e.target.value : item)),
                      );
                      placementEdited();
                    }}
                    onBlur={() => recordEdit(`配置${index + 1}と理由`)}
                  />
                </label>
              ))}
              <label>
                配置不能・除外と理由
                <textarea
                  value={excluded}
                  disabled={approved}
                  onChange={(e) => {
                    setExcluded(e.target.value);
                    placementEdited();
                  }}
                  onBlur={() => recordEdit("配置不能・除外と理由")}
                />
              </label>
            </div>
            {!validated && (
              <div role="alert" className={styles.alert}>
                編集後の基準で、すべての配置を再検証するまで承認できません。
              </div>
            )}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                disabled={approved}
                onClick={revalidate}
              >
                すべての配置を再検証
              </button>
            </div>
            <label className={styles.checklist}>
              <span>
                <input
                  type="checkbox"
                  checked={axesApproved}
                  disabled={!validated || approved}
                  onChange={(e) => setAxesApproved(e.target.checked)}
                />{" "}
                軸・評価基準・対象・除外・配置理由を本文とは別に確認した
              </span>
            </label>
          </section>
        </div>
        <section className={styles.panel}>
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>FINAL VALIDATION</p>
              <h2>公開承認前の確認</h2>
            </div>
            <span
              className={styles.status}
              data-tone={approved || ready ? "success" : "danger"}
            >
              {approved ? "承認済み" : ready ? "承認可能" : "承認Blocked"}
            </span>
          </div>
          <ul className={styles.checklist}>
            <li>入力RevisionとEvidenceを追跡可能</li>
            <li>未承認値・推測値を確定入力に不使用</li>
            <li>本文と二軸配置を別々に明示確認</li>
            <li>編集後の全配置を再検証</li>
            <li>Plain Text allowlistによる公開直前Validation</li>
          </ul>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primary}
              disabled={!ready}
              onClick={() => setReauthOpen(true)}
            >
              再認証して記事を承認
            </button>
          </div>
        </section>
        <section className={styles.panel}>
          <h2>合成監査Timeline</h2>
          <ul className={styles.audit}>
            {audits.map((item, index) => {
              const [time, ...rest] = item.split("｜");
              return (
                <li key={`${item}-${index}`}>
                  <time>{time}</time>
                  {rest.join("｜")}
                </li>
              );
            })}
          </ul>
        </section>
        <ReauthDialog
          open={reauthOpen}
          actionLabel="記事を承認"
          description="安全性Validation済みの本文と、別途確認した二軸・配置を公開可能な版として承認します。"
          onCancel={() => setReauthOpen(false)}
          onConfirm={() => {
            setReauthOpen(false);
            setApproved(true);
            audit("記事Draftを明示承認 / 再承認不可");
            announce(
              "記事Draftを承認済みとしたUI-only状態です。再承認はできません。外部公開・永続化は行っていません。",
            );
          }}
        />
      </main>
    </OpsShell>
  );
}
