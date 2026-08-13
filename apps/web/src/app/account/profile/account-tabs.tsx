import type { KeyboardEvent } from "react";
import type { PrototypeAccountTabId } from "@/types/account-prototype";
import styles from "./profile.module.css";

const accountTabs: Array<{
  id: PrototypeAccountTabId;
  label: string;
  mark: string;
}> = [
  { id: "profile", label: "プロフィール", mark: "人" },
  { id: "history", label: "検索・比較履歴", mark: "履" },
  { id: "data", label: "データ管理", mark: "管" },
];

export default function AccountTabs({
  activeTab,
  onChange,
}: {
  activeTab: PrototypeAccountTabId;
  onChange: (tab: PrototypeAccountTabId) => void;
}) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % accountTabs.length;
    else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + accountTabs.length) % accountTabs.length;
    } else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = accountTabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = accountTabs[nextIndex];
    onChange(nextTab.id);
    document.getElementById(`account-tab-${nextTab.id}`)?.focus();
  }

  return (
    <div className={styles.accountNav} role="tablist" aria-label="Accountメニュー">
      {accountTabs.map((tab, index) => (
        <button
          type="button"
          role="tab"
          id={`account-tab-${tab.id}`}
          aria-controls={`account-panel-${tab.id}`}
          aria-selected={activeTab === tab.id}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          key={tab.id}
        >
          <span aria-hidden="true">{tab.mark}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
