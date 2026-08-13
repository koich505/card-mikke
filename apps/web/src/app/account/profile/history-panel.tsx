"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { withPrototypeSearchLaunch } from "@/features/search/prototype-launch";
import { featuredCards } from "@/fixtures/home";
import type {
  PrototypeDestructiveActionState,
  PrototypeSearchHistory,
} from "@/types/account-prototype";
import styles from "./profile.module.css";

const yen = new Intl.NumberFormat("ja-JP");
const cardNames = Object.fromEntries(featuredCards.map((card) => [card.id, card.name]));

type HistoryPanelProps = {
  hidden: boolean;
  entries: PrototypeSearchHistory;
  expandedIds: string[];
  actionState: PrototypeDestructiveActionState;
  deleteTargetId: string | null;
  actionMessage: string;
  failNextDelete: boolean;
  onFailNextDeleteChange: (checked: boolean) => void;
  onToggleDetails: (id: string) => void;
  onRequestDelete: (id: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onRetryDelete: () => void;
};

export default function HistoryPanel({
  hidden,
  entries,
  expandedIds,
  actionState,
  deleteTargetId,
  actionMessage,
  failNextDelete,
  onFailNextDeleteChange,
  onToggleDetails,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
  onRetryDelete,
}: HistoryPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const deleteTriggerRef = useRef<HTMLButtonElement | null>(null);
  const failureRef = useRef<HTMLDivElement>(null);
  const deleteTarget = entries.find((entry) => entry.id === deleteTargetId);

  useEffect(() => {
    if (actionState === "confirming" && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [actionState]);

  useEffect(() => {
    if (actionState === "failed") failureRef.current?.focus();
  }, [actionState]);

  function cancelDelete() {
    dialogRef.current?.close();
    onCancelDelete();
    window.requestAnimationFrame(() => deleteTriggerRef.current?.focus());
  }

  function confirmDelete() {
    dialogRef.current?.close();
    onConfirmDelete();
  }

  return (
    <div
      className={styles.accountPanel}
      id="account-panel-history"
      role="tabpanel"
      aria-labelledby="account-tab-history"
      hidden={hidden}
    >
      <section className={styles.panelIntro} aria-labelledby="history-title">
        <div>
          <p className={styles.panelEyebrow}>SEARCH &amp; COMPARE HISTORY</p>
          <h2 id="history-title">検索・比較履歴</h2>
          <p>
            保存した合成条件を確認し、現在のカード情報でもう一度検索できます。
            当時の合成記録と現在情報による再計算を分けて表示します。
          </p>
        </div>
        <div className={styles.countBadge} aria-label={`保存履歴 ${entries.length}件`}>
          <strong>{entries.length}</strong>
          <span>件の履歴</span>
        </div>
      </section>

      <section className={styles.mockNotice} aria-labelledby="history-mock-title">
        <div>
          <strong id="history-mock-title">UIモックとして表示しています</strong>
          <p>
            履歴と削除結果はBrowser
            Memory内だけで保持し、再読み込みで合成初期値へ戻ります。
          </p>
        </div>
        <label className={styles.failureToggle}>
          <input
            type="checkbox"
            checked={failNextDelete}
            onChange={(event) => onFailNextDeleteChange(event.target.checked)}
          />
          <span>次の履歴削除を失敗させる</span>
          <small>UIモック確認用</small>
        </label>
      </section>

      {(actionState === "processing" || actionState === "succeeded") && (
        <div className={styles.actionStatus} role="status">
          <span aria-hidden="true">{actionState === "processing" ? "…" : "✓"}</span>
          {actionState === "processing" ? "履歴を削除しています…" : actionMessage}
        </div>
      )}
      {actionState === "failed" && (
        <div
          className={`${styles.actionStatus} ${styles.actionError}`}
          role="alert"
          tabIndex={-1}
          ref={failureRef}
        >
          <span aria-hidden="true">!</span>
          <div>
            <strong>履歴を削除できませんでした</strong>
            <p>{actionMessage} 入力やほかの履歴は保持されています。</p>
          </div>
          <button type="button" onClick={onRetryDelete}>
            削除を再試行
          </button>
        </div>
      )}

      {entries.length === 0 ? (
        <section className={styles.emptyState} aria-labelledby="history-empty-title">
          <span aria-hidden="true">履</span>
          <h3 id="history-empty-title">保存されている履歴はありません</h3>
          <p>検索すると、今回のUIモックでは再読み込み後に合成履歴へ戻ります。</p>
          <Link href="/search">カードを探す</Link>
        </section>
      ) : (
        <div className={styles.historyList} aria-label="保存された検索・比較履歴">
          {entries.map((entry) => {
            const expanded = expandedIds.includes(entry.id);
            const compareHref = withPrototypeSearchLaunch(
              entry.scenario,
              entry.compareCardIds,
            );
            return (
              <article className={styles.historyCard} key={entry.id}>
                <header>
                  <div className={styles.historyKind}>
                    <span aria-hidden="true">
                      {entry.kind === "compare" ? "比" : "検"}
                    </span>
                    <strong>
                      {entry.kind === "compare" ? "比較あり" : "検索のみ"}
                    </strong>
                  </div>
                  <div>
                    <p>{entry.searchedAt}</p>
                    <h3>{entry.title}</h3>
                  </div>
                  <button
                    type="button"
                    className={styles.deleteTextButton}
                    disabled={actionState === "processing"}
                    onClick={(event) => {
                      deleteTriggerRef.current = event.currentTarget;
                      onRequestDelete(entry.id);
                    }}
                  >
                    この履歴を削除
                  </button>
                </header>

                <div className={styles.historySummary}>
                  <div>
                    <span>年間利用額</span>
                    <strong>{yen.format(entry.scenario.annualSpend)}円</strong>
                  </div>
                  <div>
                    <span>主な利用先</span>
                    <strong>{entry.categoryLabels.join("・")}</strong>
                  </div>
                  <div>
                    <span>検索結果</span>
                    <strong>{entry.resultCount}件</strong>
                  </div>
                  <div>
                    <span>比較対象</span>
                    <strong>{entry.compareCardIds.length}枚</strong>
                  </div>
                </div>

                <div
                  className={styles.historyDetails}
                  id={`history-details-${entry.id}`}
                  hidden={!expanded}
                >
                  <div>
                    <h4>当時の計算結果（合成記録）</h4>
                    <ul>
                      {entry.historicalCalculation.cardResults.map((result) => (
                        <li key={result.cardId}>
                          {cardNames[result.cardId]}：
                          {yen.format(result.annualNetValueYen)}円
                        </li>
                      ))}
                    </ul>
                    <small>
                      計算：{entry.historicalCalculation.calculatedAt}／根拠確認：
                      {entry.historicalCalculation.evidenceConfirmedOn}
                    </small>
                  </div>
                  <div>
                    <h4>利用先</h4>
                    <ul>
                      {entry.categoryLabels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>希望条件</h4>
                    <ul>
                      {entry.preferenceLabels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </div>
                  {entry.compareCardIds.length > 0 && (
                    <div>
                      <h4>比較した合成カード</h4>
                      <ul>
                        {entry.compareCardIds.map((id) => (
                          <li key={id}>{cardNames[id]}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <footer>
                  <button
                    type="button"
                    className={styles.detailToggle}
                    aria-expanded={expanded}
                    aria-controls={`history-details-${entry.id}`}
                    onClick={() => onToggleDetails(entry.id)}
                  >
                    {expanded ? "条件を閉じる" : "条件を確認"}
                  </button>
                  <div>
                    <Link href={withPrototypeSearchLaunch(entry.scenario)}>
                      現在の情報で再検索
                    </Link>
                    {entry.kind === "compare" && (
                      <Link className={styles.primaryLink} href={compareHref}>
                        比較を再表示
                      </Link>
                    )}
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      )}

      <dialog
        className={styles.leaveDialog}
        ref={dialogRef}
        aria-labelledby="history-delete-title"
        onCancel={(event) => {
          event.preventDefault();
          cancelDelete();
        }}
      >
        <div>
          <span className={styles.dialogIcon} aria-hidden="true">
            !
          </span>
          <h2 id="history-delete-title">この履歴を削除しますか？</h2>
          <p>
            「{deleteTarget?.title ?? "選択した履歴"}」だけを削除します。
            プロフィールやほかの履歴には影響しません。
          </p>
          <div>
            <button type="button" className={styles.resetButton} onClick={cancelDelete}>
              キャンセル
            </button>
            <button
              type="button"
              className={styles.dangerButton}
              onClick={confirmDelete}
            >
              この履歴を削除
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
