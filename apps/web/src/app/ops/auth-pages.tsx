"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useOps } from "./ops-provider";
import styles from "./ops.module.css";

function AuthFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className={styles.authPage} id="main-content">
      <div className={styles.authBrand}>
        <span aria-hidden="true">C</span>
        <strong>
          カードみっけ
          <small>運営管理 UIモック</small>
        </strong>
      </div>
      <section className={styles.authCard} aria-labelledby="auth-heading">
        <span className={styles.prototypeBadge}>UI-only / 合成Account</span>
        <h1 id="auth-heading">{title}</h1>
        <p className={styles.lead}>{description}</p>
        {children}
      </section>
      <p className={styles.authFootnote}>
        本画面は認証UIの設計検証です。本人確認、外部通信、Credential保存を行いません。
      </p>
    </main>
  );
}

export function OpsLoginPage() {
  const { login, authState } = useOps();
  const router = useRouter();
  const [email, setEmail] = useState("operator@example.invalid");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = login(email.trim(), password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError("");
    router.push("/ops/mfa");
  };

  return (
    <AuthFrame
      title="管理者Login"
      description="一般利用者とは分離した、非共有の管理者Accountを想定しています。"
    >
      {authState === "expired" && (
        <div className={styles.inlineAlert} role="alert" data-tone="warning">
          Session期限が切れました。再Loginしてください。
        </div>
      )}
      <form className={styles.formStack} onSubmit={submit} noValidate>
        {error && (
          <div className={styles.inlineAlert} role="alert" tabIndex={-1}>
            {error}
          </div>
        )}
        <label>
          管理者メールアドレス
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={12}
            aria-describedby="password-help"
            required
          />
        </label>
        <small id="password-help" className={styles.fieldHelp}>
          12文字以上の合成文字列を入力してください。実際のPasswordは入力しないでください。
        </small>
        <button className={styles.primaryButton} type="submit">
          Passwordを確認
        </button>
      </form>
    </AuthFrame>
  );
}

export function OpsMfaPage() {
  const { authState, verifyMfa } = useOps();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = verifyMfa(code);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError("");
    router.push("/ops");
  };

  if (authState !== "primary_verified") {
    return (
      <AuthFrame
        title="一次認証から開始してください"
        description="MFAだけで管理者Loginを完了することはできません。"
      >
        <Link className={styles.primaryButton} href="/ops/login">
          管理者Loginへ戻る
        </Link>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame
      title="多要素認証"
      description="Authenticatorに表示された6桁コードを入力する想定のUIです。"
    >
      <form className={styles.formStack} onSubmit={submit} noValidate>
        {error && (
          <div className={styles.inlineAlert} role="alert">
            {error}
          </div>
        )}
        <label>
          6桁の確認コード
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            aria-describedby="mfa-help"
            required
          />
        </label>
        <small id="mfa-help" className={styles.fieldHelp}>
          UIモックでは任意の6桁を受け付けます。実際の認証コードは入力しないでください。
        </small>
        <button className={styles.primaryButton} type="submit">
          確認してDashboardへ
        </button>
      </form>
      <div className={styles.authLinks}>
        <Link href="/ops/login">Passwordからやり直す</Link>
        <Link href="/ops/mfa/recovery">MFAを利用できない場合</Link>
      </div>
    </AuthFrame>
  );
}

export function OpsMfaRecoveryPage() {
  const [receipt, setReceipt] = useState(false);

  return (
    <AuthFrame
      title="MFA回復手続き"
      description="認証要素の喪失時は、通常のLoginとは分離した本人確認が必要です。"
    >
      <ol className={styles.recoverySteps}>
        <li>
          <strong>回復申請</strong>
          <span>管理者Accountと通常の連絡経路を確認します。</span>
        </li>
        <li>
          <strong>本人確認</strong>
          <span>既存のMFAだけに依存しない確認手続きを行います。</span>
        </li>
        <li>
          <strong>要素変更と通知</strong>
          <span>実行内容を監査記録へ残し、管理者へ通知します。</span>
        </li>
      </ol>
      {receipt ? (
        <div className={styles.inlineAlert} role="status" data-tone="success">
          合成受付 OPS-RECOVERY-0001 を表示しました。外部送信はしていません。
        </div>
      ) : (
        <button className={styles.secondaryButton} onClick={() => setReceipt(true)}>
          合成の回復受付を確認
        </button>
      )}
      <div className={styles.authLinks}>
        <Link href="/ops/login">管理者Loginへ戻る</Link>
      </div>
    </AuthFrame>
  );
}
