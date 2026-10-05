"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { CorrectionReportTarget } from "@/types/correction-report-prototype";
import styles from "./correction-report.module.css";

type FieldName = "item" | "detail" | "evidence" | "email";
type FieldErrors = Partial<Record<FieldName, string>>;

const limits = {
  item: 100,
  detail: 1_000,
  evidence: 1_000,
  email: 254,
} as const;

const fieldLabels: Record<FieldName, string> = {
  item: "誤り・変更がある掲載項目",
  detail: "指摘内容",
  evidence: "把握している根拠",
  email: "メールアドレス",
};

export default function CorrectionReportForm({
  target,
  initialItem,
}: {
  target: CorrectionReportTarget;
  initialItem: string;
}) {
  const [item, setItem] = useState(initialItem);
  const [detail, setDetail] = useState("");
  const [evidence, setEvidence] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const itemRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);
  const evidenceRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const completeHeadingRef = useRef<HTMLHeadingElement>(null);

  const fieldRefs = {
    item: itemRef,
    detail: detailRef,
    evidence: evidenceRef,
    email: emailRef,
  };

  useEffect(() => {
    if (isComplete) completeHeadingRef.current?.focus();
  }, [isComplete]);

  function validate() {
    const nextErrors: FieldErrors = {};
    const trimmedItem = item.trim();
    const trimmedDetail = detail.trim();
    const trimmedEvidence = evidence.trim();
    const trimmedEmail = email.trim();

    if (!trimmedItem) {
      nextErrors.item = "掲載項目を入力してください。";
    } else if (item.length > limits.item) {
      nextErrors.item = `掲載項目は${limits.item}文字以内で入力してください。`;
    }

    if (!trimmedDetail) {
      nextErrors.detail = "指摘内容を入力してください。";
    } else if (detail.length > limits.detail) {
      nextErrors.detail = `指摘内容は${limits.detail}文字以内で入力してください。`;
    }

    if (!trimmedEvidence) {
      nextErrors.evidence = "把握している根拠を入力してください。";
    } else if (evidence.length > limits.evidence) {
      nextErrors.evidence = `根拠は${limits.evidence}文字以内で入力してください。`;
    }

    if (email.length > limits.email) {
      nextErrors.email = `メールアドレスは${limits.email}文字以内で入力してください。`;
    } else if (trimmedEmail && emailRef.current?.validity.typeMismatch) {
      nextErrors.email = "メールアドレスの形式を確認してください。";
    }

    return nextErrors;
  }

  function focusField(field: FieldName) {
    fieldRefs[field].current?.focus();
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstError) {
      window.requestAnimationFrame(() => focusField(firstError));
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 350);
  }

  if (isComplete) {
    return (
      <section className={styles.complete} aria-labelledby="complete-title">
        <span className={styles.completeMark} aria-hidden="true">
          ✓
        </span>
        <p className={styles.kicker}>REPORT RECEIVED</p>
        <h1 id="complete-title" ref={completeHeadingRef} tabIndex={-1}>
          指摘を受け付けました
        </h1>
        <p className={styles.completeLead}>
          ご連絡ありがとうございます。掲載内容は公式情報を確認し、必要な場合だけ承認を経て修正します。
        </p>
        <dl className={styles.receipt}>
          <div>
            <dt>合成受付番号</dt>
            <dd>CM-MOCK-0001</dd>
          </div>
          <div>
            <dt>対象</dt>
            <dd>{target.label}</dd>
          </div>
        </dl>
        <div className={styles.contactResult}>
          <strong>
            {email.trim() ? "連絡先を受け付けました" : "連絡先は登録されていません"}
          </strong>
          <p>
            {email.trim()
              ? "確認結果または追加確認が必要な場合の連絡にのみ使用します。"
              : "メール未入力のため、個別回答や追加確認のご連絡はできません。"}
          </p>
        </div>
        <p className={styles.mockBoundary}>
          UI-only
          Mockのため、入力内容・メール・受付番号は送信・保存されず、再読み込みすると消去されます。
        </p>
        <div className={styles.completeActions}>
          <Link href={target.sourceHref}>指摘したページへ戻る</Link>
          <Link href="/">トップページへ戻る</Link>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.reportLayout}>
      <section className={styles.intro} aria-labelledby="report-title">
        <p className={styles.kicker}>CORRECTION REPORT</p>
        <h1 id="report-title" aria-label="掲載情報の誤り・変更をお知らせください">
          <span aria-hidden="true">掲載情報の</span>
          <span aria-hidden="true">誤り・変更を</span>
          <span aria-hidden="true">お知らせください</span>
        </h1>
        <p>
          ログインせずに送信できます。いただいた内容だけで情報を変更せず、公式情報を確認して判断します。
        </p>
        <div className={styles.targetCard}>
          <span>{target.kindLabel}</span>
          <strong>{target.label}</strong>
          <Link href={target.sourceHref}>対象ページを確認する</Link>
        </div>
        <aside className={styles.safetyNotice} aria-labelledby="safety-title">
          <strong id="safety-title">入力前にご確認ください</strong>
          <ul>
            <li>Password、認証Token、カード番号などのSecretを書かないでください。</li>
            <li>氏名、電話番号など、確認に不要な個人情報を書かないでください。</li>
            <li>送信により、修正や個別回答を保証するものではありません。</li>
          </ul>
        </aside>
      </section>

      <form className={styles.formCard} onSubmit={submitReport} noValidate>
        {Object.keys(errors).length > 0 && (
          <div
            className={styles.errorSummary}
            role="alert"
            aria-labelledby="error-title"
          >
            <strong id="error-title">入力内容を確認してください</strong>
            <ul>
              {(Object.entries(errors) as Array<[FieldName, string]>).map(
                ([field, message]) => (
                  <li key={field}>
                    <button type="button" onClick={() => focusField(field)}>
                      {fieldLabels[field]}：{message}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        <div className={styles.fixedTarget}>
          <span>指摘対象</span>
          <strong>{target.label}</strong>
          <small>対象を変更する場合は、該当ページの入口から開き直してください。</small>
        </div>

        <label className={styles.field} htmlFor="report-item">
          <span>
            誤り・変更がある掲載項目 <b>必須</b>
          </span>
          <input
            id="report-item"
            ref={itemRef}
            value={item}
            onChange={(event) => setItem(event.target.value)}
            maxLength={limits.item + 1}
            aria-invalid={Boolean(errors.item)}
            aria-describedby={`report-item-help${errors.item ? " report-item-error" : ""}`}
          />
          <small id="report-item-help">
            例：年会費、ポイント還元率、申込条件、記事の比較内容（{item.length}/
            {limits.item}文字）
          </small>
          {errors.item && (
            <strong className={styles.fieldError} id="report-item-error">
              {errors.item}
            </strong>
          )}
        </label>

        <label className={styles.field} htmlFor="report-detail">
          <span>
            指摘内容 <b>必須</b>
          </span>
          <textarea
            id="report-detail"
            ref={detailRef}
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            rows={6}
            maxLength={limits.detail + 1}
            aria-invalid={Boolean(errors.detail)}
            aria-describedby={`report-detail-help${errors.detail ? " report-detail-error" : ""}`}
          />
          <small id="report-detail-help">
            どの記載が、どのように異なるかを入力してください（{detail.length}/
            {limits.detail}文字）
          </small>
          {errors.detail && (
            <strong className={styles.fieldError} id="report-detail-error">
              {errors.detail}
            </strong>
          )}
        </label>

        <label className={styles.field} htmlFor="report-evidence">
          <span>
            把握している根拠 <b>必須</b>
          </span>
          <textarea
            id="report-evidence"
            ref={evidenceRef}
            value={evidence}
            onChange={(event) => setEvidence(event.target.value)}
            rows={5}
            maxLength={limits.evidence + 1}
            aria-invalid={Boolean(errors.evidence)}
            aria-describedby={`report-evidence-help${errors.evidence ? " report-evidence-error" : ""}`}
          />
          <small id="report-evidence-help">
            公式ページ名、確認した日、変更のお知らせなどを入力してください（
            {evidence.length}/{limits.evidence}文字）
          </small>
          {errors.evidence && (
            <strong className={styles.fieldError} id="report-evidence-error">
              {errors.evidence}
            </strong>
          )}
        </label>

        <label className={styles.field} htmlFor="report-email">
          <span>
            メールアドレス <i>任意</i>
          </span>
          <input
            id="report-email"
            ref={emailRef}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={limits.email + 1}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={`report-email-help${errors.email ? " report-email-error" : ""}`}
          />
          <small id="report-email-help">
            確認結果または追加確認が必要な場合の連絡にのみ使用します。未入力の場合は個別に回答できません。
          </small>
          {errors.email && (
            <strong className={styles.fieldError} id="report-email-error">
              {errors.email}
            </strong>
          )}
        </label>

        <div className={styles.formFooter}>
          <p>UI-only Mockのため、入力内容は外部送信・メール送信・保存されません。</p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "受付処理中…" : "この内容で指摘する"}
          </button>
        </div>
      </form>
    </div>
  );
}
