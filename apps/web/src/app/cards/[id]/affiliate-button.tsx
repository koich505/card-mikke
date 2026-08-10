"use client";

import { useId, useState } from "react";

type AffiliateButtonProps = {
  className: string;
  wrapperClassName: string;
  href: string;
  routeLabel: string;
};

export default function AffiliateButton({
  className,
  wrapperClassName,
  href,
  routeLabel,
}: AffiliateButtonProps) {
  const [message, setMessage] = useState("");
  const descriptionId = useId();

  return (
    <div className={wrapperClassName}>
      <button
        type="button"
        className={className}
        onClick={() =>
          setMessage(
            `「${routeLabel}」の申込CTAを確認しました。UIモックのため外部遷移・申込は行いません。`,
          )
        }
        aria-describedby={descriptionId}
        data-mock-href={href}
      >
        広告｜申込画面を確認 <span aria-hidden="true">→</span>
      </button>
      <span id={descriptionId} hidden>
        アフィリエイト広告を想定したUIモックです。外部遷移しません。
      </span>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
