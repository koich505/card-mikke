"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import SiteHeader from "@/app/components/site-header";
import styles from "./account-auth.module.css";
type Mode = "login" | "register" | "reset";
type GoogleState = "idle" | "same_email" | "linked" | "only_google";
export default function AccountAuth() {
  const [mode, setMode] = useState<Mode>("login"),
    [email, setEmail] = useState("user@example.invalid"),
    [password, setPassword] = useState(""),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [errorField, setErrorField] = useState<"email" | "password" | "">(""),
    [busy, setBusy] = useState(false),
    [googleState, setGoogleState] = useState<GoogleState>("idle");
  const resultRef = useRef<HTMLDivElement>(null),
    emailRef = useRef<HTMLInputElement>(null),
    passwordRef = useRef<HTMLInputElement>(null);
  const announce = (text: string) => {
    setMessage(text);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  const switchMode = (next: Mode) => {
    if (busy) return;
    setMode(next);
    setError("");
    setErrorField("");
    setMessage("");
    setPassword("");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setErrorField("");
    setMessage("");
    if (!/^[^\s@]+@[^\s@]+\.invalid$/.test(email)) {
      setError("UIモックでは .invalid の合成メールを入力してください。");
      setErrorField("email");
      emailRef.current?.focus();
      return;
    }
    if (mode !== "reset" && password.length < 12) {
      setError("Passwordは12文字以上で入力してください。");
      setErrorField("password");
      passwordRef.current?.focus();
      return;
    }
    const submittedMode = mode;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      announce(
        submittedMode === "login"
          ? "合成AccountへLoginしました。保存済みProfileを確認できます。"
          : submittedMode === "register"
            ? "確認メールを送信した想定です。メール確認が完了するまでAccountは有効になりません。"
            : "確認済みメールへPassword再設定案内を送信した想定です。既存Sessionは再設定後に失効します。",
      );
    }, 180);
  };
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#account-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="account" />
      <main id="account-main" className={styles.main}>
        <section className={styles.value}>
          <p>OPTIONAL ACCOUNT</p>
          <h1>探した続きへ、すぐ戻れる。</h1>
          <p>Accountは任意です。カード検索・比較は登録なしで利用できます。</p>
          <ul>
            <li>Profileで入力を省略</li>
            <li>明示保存した検索・比較を再利用</li>
            <li>お気に入りを継続保存</li>
          </ul>
          <Link href="/search">登録せずカードを探す →</Link>
        </section>
        <section className={styles.authCard} aria-labelledby="auth-title">
          <span>UI-only / 認証・メール送信なし</span>
          <div className={styles.tabs} aria-label="Login・登録の切替">
            <button
              type="button"
              aria-pressed={mode === "login"}
              disabled={busy}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              aria-pressed={mode === "register"}
              disabled={busy}
              onClick={() => switchMode("register")}
            >
              新規登録
            </button>
          </div>
          <h2 id="auth-title">
            {mode === "login"
              ? "AccountへLogin"
              : mode === "register"
                ? "Accountを作成"
                : "Passwordを再設定"}
          </h2>
          {error && (
            <div id="account-error" role="alert" className={styles.error}>
              {error}
            </div>
          )}
          {message && (
            <div
              ref={resultRef}
              tabIndex={-1}
              role="region"
              aria-label="Account操作結果"
              className={styles.success}
            >
              <span role="status">{message}</span>
              {mode === "login" && <Link href="/account/profile">Profileへ進む</Link>}
            </div>
          )}
          <form onSubmit={submit} noValidate>
            <label>
              メールアドレス
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorField === "email") {
                    setError("");
                    setErrorField("");
                  }
                }}
                autoComplete="email"
                aria-invalid={errorField === "email"}
                aria-describedby={errorField === "email" ? "account-error" : undefined}
              />
            </label>
            {mode !== "reset" && (
              <label>
                Password
                <input
                  ref={passwordRef}
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorField === "password") {
                      setError("");
                      setErrorField("");
                    }
                  }}
                  autoComplete={
                    mode === "register" ? "new-password" : "current-password"
                  }
                  aria-invalid={errorField === "password"}
                  aria-describedby={
                    errorField === "password"
                      ? "account-error password-help"
                      : "password-help"
                  }
                />
                <small id="password-help">
                  12文字以上。実際のCredentialは入力しないでください。
                </small>
              </label>
            )}
            <button type="submit" disabled={busy}>
              {busy
                ? "処理中…"
                : mode === "login"
                  ? "Login"
                  : mode === "register"
                    ? "確認メールを送る"
                    : "再設定案内を送る"}
            </button>
          </form>
          {mode === "login" && (
            <button
              type="button"
              disabled={busy}
              className={styles.textButton}
              onClick={() => switchMode("reset")}
            >
              Passwordを忘れた場合
            </button>
          )}
          {mode === "reset" && (
            <button
              type="button"
              disabled={busy}
              className={styles.textButton}
              onClick={() => switchMode("login")}
            >
              Loginへ戻る
            </button>
          )}
          <div className={styles.divider}>
            <span>または</span>
          </div>
          <button
            type="button"
            disabled={busy}
            className={styles.google}
            onClick={() => {
              setGoogleState("only_google");
              announce(
                "Googleで本人確認された合成Accountを作成しました。現在のLogin方法はGoogleだけです（外部接続なし）。",
              );
            }}
          >
            Google Accountで続ける（合成）
          </button>
          <button
            type="button"
            disabled={busy}
            className={styles.sameEmail}
            onClick={() => {
              setGoogleState("same_email");
              announce(
                "同じメールの既存Accountがあります。自動統合せず、既存AccountへLoginして本人確認してください。",
              );
            }}
          >
            同じメールの既存Accountを確認
          </button>
          {googleState === "same_email" && (
            <button
              type="button"
              className={styles.google}
              onClick={() => {
                setGoogleState("linked");
                announce(
                  "既存AccountへLoginして本人確認し、Google Accountを連携しました（UI-only）。",
                );
              }}
            >
              既存AccountへLoginして連携
            </button>
          )}
          {(googleState === "linked" || googleState === "only_google") && (
            <button
              type="button"
              className={styles.sameEmail}
              onClick={() => {
                if (googleState === "only_google") {
                  announce(
                    "解除できません。唯一のLogin方法を失わないよう、先に確認済みメールとPasswordを設定してください。",
                  );
                  return;
                }
                setGoogleState("idle");
                announce(
                  "Google連携を解除しました。メール・Password Loginは利用できます（UI-only）。",
                );
              }}
            >
              Google連携を解除
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
