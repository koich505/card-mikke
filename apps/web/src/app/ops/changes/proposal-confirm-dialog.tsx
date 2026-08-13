"use client";

import { useEffect, useRef } from "react";
import type { PrototypeOpsClaimDiff } from "@/types/ops-prototype";
import styles from "../ops.module.css";

export function ProposalConfirmDialog({
  claim,
  onConfirm,
  onCancel,
}: {
  claim: PrototypeOpsClaimDiff | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (claim && !dialog?.open) {
      dialog?.showModal();
      window.setTimeout(() => confirmRef.current?.focus(), 0);
    }
    if (!claim && dialog?.open) dialog.close();
  }, [claim]);

  if (!claim) return null;

  const isApprove = claim.decision === "approve";

  return (
    <dialog
      ref={dialogRef}
      className={styles.reauthDialog}
      aria-labelledby="proposal-confirm-heading"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClose={onCancel}
    >
      <div className={styles.formStack}>
        <h2 id="proposal-confirm-heading">この内容で確定しますか？</h2>
        <p>認証情報の入力は不要です。処理内容を確認してください。</p>
        <dl className={styles.definitionList}>
          <div>
            <dt>変更項目</dt>
            <dd>{claim.label}</dd>
          </div>
          <div>
            <dt>処理</dt>
            <dd>{isApprove ? "採用（情報を更新する）" : "却下（情報はそのまま）"}</dd>
          </div>
          <div>
            <dt>現在の値</dt>
            <dd>{claim.previousValue}</dd>
          </div>
          {isApprove && (
            <div>
              <dt>更新後の値</dt>
              <dd>{claim.candidateValue}</dd>
            </div>
          )}
        </dl>
        <div className={styles.buttonRow}>
          <button
            ref={confirmRef}
            className={isApprove ? styles.primaryButton : styles.dangerButton}
            type="button"
            onClick={onConfirm}
          >
            {isApprove ? "採用を確定" : "却下を確定"}
          </button>
          <button className={styles.secondaryButton} type="button" onClick={onCancel}>
            戻る
          </button>
        </div>
      </div>
    </dialog>
  );
}
