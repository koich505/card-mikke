"use client";

import { useEffect, useRef } from "react";
import type {
  PrototypeDataSummary,
  PrototypeDestructiveActionState,
} from "@/types/account-prototype";
import styles from "./profile.module.css";

export type PrototypeDataAction = "history" | "account";

type DataManagementPanelProps = {
  hidden: boolean;
  summary: PrototypeDataSummary;
  historyCount: number;
  pendingAction: PrototypeDataAction | null;
  historyActionState: PrototypeDestructiveActionState;
  accountActionState: PrototypeDestructiveActionState;
  failNextAction: boolean;
  accountAcknowledged: boolean;
  accountConfirmPhrase: string;
  onFailNextActionChange: (checked: boolean) => void;
  onAccountAcknowledgedChange: (checked: boolean) => void;
  onAccountConfirmPhraseChange: (value: string) => void;
  onRequestAction: (action: PrototypeDataAction) => void;
  onCancelAction: () => void;
  onConfirmAction: () => void;
  onRetryAction: (action: PrototypeDataAction) => void;
};

export default function DataManagementPanel({
  hidden,
  summary,
  historyCount,
  pendingAction,
  historyActionState,
  accountActionState,
  failNextAction,
  accountAcknowledged,
  accountConfirmPhrase,
  onFailNextActionChange,
  onAccountAcknowledgedChange,
  onAccountConfirmPhraseChange,
  onRequestAction,
  onCancelAction,
  onConfirmAction,
  onRetryAction,
}: DataManagementPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<Partial<Record<PrototypeDataAction, HTMLButtonElement>>>(
    {},
  );
  const historyFailureRef = useRef<HTMLDivElement>(null);
  const accountFailureRef = useRef<HTMLDivElement>(null);
  const processing =
    historyActionState === "processing" || accountActionState === "processing";
  const accountReady =
    accountAcknowledged && accountConfirmPhrase === "削除する" && !processing;

  useEffect(() => {
    if (pendingAction && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [pendingAction]);

  useEffect(() => {
    if (historyActionState === "failed") historyFailureRef.current?.focus();
  }, [historyActionState]);

  useEffect(() => {
    if (accountActionState === "failed") accountFailureRef.current?.focus();
  }, [accountActionState]);

  function requestAction(action: PrototypeDataAction, trigger: HTMLButtonElement) {
    triggerRefs.current[action] = trigger;
    onRequestAction(action);
  }

  function cancelAction() {
    const action = pendingAction;
    dialogRef.current?.close();
    onCancelAction();
    window.requestAnimationFrame(() => {
      if (action) triggerRefs.current[action]?.focus();
    });
  }

  function confirmAction() {
    dialogRef.current?.close();
    onConfirmAction();
  }

  return (
    <div
      className={styles.accountPanel}
      id="account-panel-data"
      role="tabpanel"
      aria-labelledby="account-tab-data"
      hidden={hidden}
    >
      <section className={styles.panelIntro} aria-labelledby="data-title">
        <div>
          <p className={styles.panelEyebrow}>DATA MANAGEMENT</p>
          <h2 id="data-title">データ管理</h2>
          <p>
            検索・比較履歴またはAccountを削除できます。すべてUIモックで、実データの削除や外部送信は行いません。
          </p>
        </div>
      </section>

      <section className={styles.mockNotice} aria-labelledby="data-mock-title">
        <div>
          <strong id="data-mock-title">UIモックとして表示しています</strong>
          <p>
            操作結果はBrowser Memory内だけで保持し、再読み込みで合成初期値へ戻ります。
          </p>
        </div>
        <label className={styles.failureToggle}>
          <input
            type="checkbox"
            checked={failNextAction}
            onChange={(event) => onFailNextActionChange(event.target.checked)}
          />
          <span>次の削除操作を失敗させる</span>
          <small>UIモック確認用</small>
        </label>
      </section>

      <div className={styles.dataGrid}>
        <section className={styles.managementCard} aria-labelledby="history-data-title">
          <header>
            <span aria-hidden="true">履</span>
            <div>
              <p>保存データ</p>
              <h3 id="history-data-title">検索・比較履歴</h3>
            </div>
            <strong className={styles.inlineCount}>{historyCount}件</strong>
          </header>
          <p>{summary.historyRetention}</p>
          {historyActionState === "succeeded" && (
            <div className={styles.inlineStatus} role="status">
              ✓ 検索・比較履歴をすべて削除しました。
            </div>
          )}
          {historyActionState === "processing" && (
            <div className={styles.inlineStatus} role="status">
              履歴を削除しています…
            </div>
          )}
          {historyActionState === "failed" && (
            <div
              className={styles.inlineError}
              role="alert"
              tabIndex={-1}
              ref={historyFailureRef}
            >
              <strong>履歴を削除できませんでした。</strong>
              <button type="button" onClick={() => onRetryAction("history")}>
                再試行
              </button>
            </div>
          )}
          <button
            type="button"
            className={styles.outlineDangerButton}
            disabled={historyCount === 0 || processing}
            onClick={(event) => requestAction("history", event.currentTarget)}
          >
            検索・比較履歴をすべて削除
          </button>
          <small>プロフィールとAccountは削除しません。</small>
        </section>
      </div>

      <section className={styles.dangerZone} aria-labelledby="danger-zone-title">
        <header>
          <p>DANGER ZONE</p>
          <h3 id="danger-zone-title">Accountを削除</h3>
          <p>
            プロフィールと検索・比較履歴を削除する想定です。このUIモックでは実際のAccountやデータを削除しません。
          </p>
        </header>
        <div className={styles.retentionNote}>
          <p>{summary.accountDeletionSchedule}</p>
          <h4>Account削除後も期限付きで保持する情報</h4>
          <ul>
            {summary.accountRetentionExceptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <label className={styles.dangerCheck}>
          <input
            type="checkbox"
            checked={accountAcknowledged}
            onChange={(event) => onAccountAcknowledgedChange(event.target.checked)}
          />
          <span>削除対象、削除期限、保持例外を確認しました</span>
        </label>
        <label className={styles.confirmPhrase}>
          <span>確認のため「削除する」と入力してください</span>
          <input
            type="text"
            value={accountConfirmPhrase}
            autoComplete="off"
            onChange={(event) => onAccountConfirmPhraseChange(event.target.value)}
          />
        </label>
        {accountActionState === "processing" && (
          <div className={styles.inlineStatus} role="status">
            Accountを削除しています…
          </div>
        )}
        {accountActionState === "failed" && (
          <div
            className={styles.inlineError}
            role="alert"
            tabIndex={-1}
            ref={accountFailureRef}
          >
            <strong>Accountを削除できませんでした。確認内容は保持されています。</strong>
            <button type="button" onClick={() => onRetryAction("account")}>
              再試行
            </button>
          </div>
        )}
        <button
          type="button"
          className={styles.dangerButton}
          disabled={!accountReady}
          onClick={(event) => requestAction("account", event.currentTarget)}
        >
          Account削除の最終確認へ
        </button>
      </section>

      <dialog
        className={styles.leaveDialog}
        ref={dialogRef}
        aria-labelledby="data-action-title"
        onCancel={(event) => {
          event.preventDefault();
          cancelAction();
        }}
      >
        <div>
          <span className={styles.dialogIcon} aria-hidden="true">
            !
          </span>
          <h2 id="data-action-title">
            {pendingAction === "account"
              ? "Account削除を実行しますか？"
              : "検索・比較履歴をすべて削除しますか？"}
          </h2>
          <p>
            {pendingAction === "account"
              ? "プロフィールと検索・比較履歴を削除する想定です。UIモックのため実処理やLogoutは行いません。"
              : "保存中の検索・比較履歴だけを削除します。プロフィールとAccountには影響しません。"}
          </p>
          <div>
            <button type="button" className={styles.resetButton} onClick={cancelAction}>
              キャンセル
            </button>
            <button
              type="button"
              className={styles.dangerButton}
              onClick={confirmAction}
            >
              {pendingAction === "account" ? "Accountを削除" : "履歴をすべて削除"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export function AccountDeletedPanel({ onReset }: { onReset: () => void }) {
  return (
    <section className={styles.accountDeleted} aria-labelledby="account-deleted-title">
      <span aria-hidden="true">✓</span>
      <p className={styles.panelEyebrow}>UI MOCK COMPLETED</p>
      <h2 id="account-deleted-title">Account削除のモック操作が完了しました</h2>
      <p role="status">
        Browser
        Memory内の合成プロフィールと履歴を削除しました。実際のAccount、認証情報、外部データには影響していません。
      </p>
      <button type="button" className={styles.saveButton} onClick={onReset}>
        合成初期状態へ戻す
      </button>
    </section>
  );
}
