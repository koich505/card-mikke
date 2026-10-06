"use client";

import { useState } from "react";
import styles from "./article.module.css";

type AffiliateMockActionProps = {
  label: string;
  cardName: string;
  applicationRouteLabel: string;
};

export default function AffiliateMockAction({
  label,
  cardName,
  applicationRouteLabel,
}: AffiliateMockActionProps) {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.applicationMock}>
      <button
        onClick={() =>
          setMessage(
            `UI-only Mockのため、${cardName}の${applicationRouteLabel}から外部遷移・送信・保存は行いません。最新の申込条件はカード詳細で確認できます。`,
          )
        }
        type="button"
      >
        {label}
      </button>
      {message ? <p role="status">{message}</p> : null}
    </div>
  );
}
