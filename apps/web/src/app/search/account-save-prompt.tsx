"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./search.module.css";

export default function AccountSavePrompt({
  open,
  onCancel,
  onContinue,
}: {
  open: boolean;
  onCancel: () => void;
  onContinue: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) {
      openerRef.current = document.activeElement as HTMLElement;
      dialog?.showModal();
      firstButtonRef.current?.focus();
    }
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  const close = () => {
    dialogRef.current?.close();
    onCancel();
    window.setTimeout(() => openerRef.current?.focus(), 0);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.accountPrompt}
      aria-labelledby="account-prompt-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        if (open) onCancel();
      }}
    >
      <div className={styles.dialogHeading}>
        <span aria-hidden="true">続</span>
        <div>
          <p>SAVE & CONTINUE</p>
          <h2 id="account-prompt-title">保存するにはAccountが必要です</h2>
        </div>
      </div>
      <p className={styles.dialogDescription}>
        検索・比較は登録なしで利用できます。今回の条件を後から使う場合だけ、任意でAccountを利用してください。
      </p>
      <ul className={styles.accountBenefits}>
        <li>概要を付けた検索・比較を明示保存</li>
        <li>保存時点と現在情報を区別して再確認</li>
        <li>Profileやお気に入りを継続利用</li>
      </ul>
      <p className={styles.accountBoundary}>
        この画面を閉じるだけでは保存されません。Account登録時も一時データを自動移行しません。
      </p>
      <div className={styles.promptActions}>
        <button ref={firstButtonRef} type="button" onClick={close}>
          今回は保存しない
        </button>
        <Link href="/account/login">Login・登録へ進む</Link>
        <button
          type="button"
          onClick={() => {
            dialogRef.current?.close();
            onContinue();
          }}
        >
          登録済みとして保存Flowを確認
          <small>UIモック専用</small>
        </button>
      </div>
    </dialog>
  );
}
