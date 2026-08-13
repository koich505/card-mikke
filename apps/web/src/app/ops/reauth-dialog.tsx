"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useOps } from "./ops-provider";
import styles from "./ops.module.css";

export function ReauthDialog({
  open,
  actionLabel,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  actionLabel: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { reauthenticate } = useOps();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog?.open) {
      dialog?.showModal();
      window.setTimeout(() => passwordRef.current?.focus(), 0);
    }
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  const close = () => {
    setPassword("");
    setCode("");
    setError("");
    onCancel();
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = reauthenticate(password, code);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setPassword("");
    setCode("");
    setError("");
    dialogRef.current?.close();
    onConfirm();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.reauthDialog}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        if (open) onCancel();
      }}
      aria-labelledby="reauth-heading"
    >
      <form onSubmit={submit} className={styles.formStack} noValidate>
        <span className={styles.statusChip} data-tone="warning">
          高Risk操作
        </span>
        <h2 id="reauth-heading">本人再認証</h2>
        <p>{description}</p>
        {error && (
          <div className={styles.inlineAlert} role="alert">
            {error}
          </div>
        )}
        <label>
          Password
          <input
            ref={passwordRef}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={12}
            required
          />
        </label>
        <label>
          6桁のMFAコード
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            maxLength={6}
            required
          />
        </label>
        <small className={styles.fieldHelp}>
          UIモック用の合成文字列だけを入力してください。
        </small>
        <div className={styles.buttonRow}>
          <button className={styles.dangerButton} type="submit">
            {actionLabel}
          </button>
          <button className={styles.secondaryButton} type="button" onClick={close}>
            取消
          </button>
        </div>
      </form>
    </dialog>
  );
}
