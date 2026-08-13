"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "@/app/components/site-header";
import {
  syntheticDataSummaryFixture,
  syntheticSearchHistoryFixture,
} from "@/fixtures/account";
import {
  PROTOTYPE_PROFILE_MAX_ANNUAL_SPEND,
  prototypeCategories,
} from "@/features/search/prototype-condition-options";
import {
  ageBandOptions,
  joiningTimeOptions,
  pointPreferenceOptions,
  syntheticProfileFixture,
} from "@/fixtures/profile";
import type { PrototypeCategoryId } from "@/types/card-detail-prototype";
import type {
  PrototypeAgeBand,
  PrototypeJoiningTime,
  PrototypeProfile,
  PrototypeProfileSaveState,
  PrototypeProfileSection,
} from "@/types/profile-prototype";
import type {
  PrototypeAccountTabId,
  PrototypeDestructiveActionState,
} from "@/types/account-prototype";
import AccountTabs from "./account-tabs";
import DataManagementPanel, {
  AccountDeletedPanel,
  type PrototypeDataAction,
} from "./data-management-panel";
import HistoryPanel from "./history-panel";
import styles from "./profile.module.css";

type UsageDraft = Pick<
  PrototypeProfile,
  "annualSpend" | "usageByCategory" | "frequentServiceIds"
>;
type PersonalDraft = Pick<PrototypeProfile, "ageBand" | "joiningTime">;
type PointsDraft = Pick<PrototypeProfile, "pointPreferenceIds">;
const yen = new Intl.NumberFormat("ja-JP");

const heroContent: Record<
  PrototypeAccountTabId,
  {
    eyebrow: string;
    title: string;
    description: string;
    summary: string;
    detail: string;
  }
> = {
  profile: {
    eyebrow: "MY PROFILE",
    title: "プロフィールを編集",
    description:
      "いつもの利用額や希望を保存して、カード検索の入力を短くできます。必要な項目だけ設定してください。",
    summary: "検索・比較の初期値に使用",
    detail: "今回だけの検索条件とは分けて扱います",
  },
  history: {
    eyebrow: "MY HISTORY",
    title: "検索・比較履歴",
    description:
      "保存した検索条件と比較対象を振り返り、現在のカード情報でもう一度確認できます。",
    summary: "当時と現在を区別",
    detail: "過去結果ではなく現在情報で再検索します",
  },
  data: {
    eyebrow: "MY DATA",
    title: "データを管理",
    description:
      "保存対象と削除の影響範囲を確認し、履歴やAccountの削除操作を試せます。",
    summary: "UIモック内だけで操作",
    detail: "実データの削除や外部送信は行いません",
  },
};

function cloneProfile(profile: PrototypeProfile): PrototypeProfile {
  return {
    ...profile,
    usageByCategory: { ...profile.usageByCategory },
    frequentServiceIds: [...profile.frequentServiceIds],
    pointPreferenceIds: [...profile.pointPreferenceIds],
  };
}

function emptyProfile(): PrototypeProfile {
  return {
    annualSpend: null,
    usageByCategory: {},
    frequentServiceIds: [],
    ageBand: "prefer-not-to-answer",
    joiningTime: "undecided",
    pointPreferenceIds: [],
  };
}

function usageKey(value: UsageDraft) {
  return JSON.stringify({
    annualSpend: value.annualSpend,
    usageByCategory: Object.entries(value.usageByCategory).toSorted(([a], [b]) =>
      a.localeCompare(b),
    ),
    frequentServiceIds: [...value.frequentServiceIds].toSorted(),
  });
}

function pointsKey(value: PointsDraft) {
  return JSON.stringify([...value.pointPreferenceIds].toSorted());
}

export default function ProfilePrototype() {
  const initial = useMemo(() => cloneProfile(syntheticProfileFixture), []);
  const [savedProfile, setSavedProfile] = useState<PrototypeProfile>(initial);
  const [usageDraft, setUsageDraft] = useState<UsageDraft>({
    annualSpend: initial.annualSpend,
    usageByCategory: { ...initial.usageByCategory },
    frequentServiceIds: [...initial.frequentServiceIds],
  });
  const [personalDraft, setPersonalDraft] = useState<PersonalDraft>({
    ageBand: initial.ageBand,
    joiningTime: initial.joiningTime,
  });
  const [pointsDraft, setPointsDraft] = useState<PointsDraft>({
    pointPreferenceIds: [...initial.pointPreferenceIds],
  });
  const [saveStates, setSaveStates] = useState<
    Record<PrototypeProfileSection, PrototypeProfileSaveState>
  >({ usage: "saved", personal: "saved", points: "saved" });
  const [failNextSave, setFailNextSave] = useState(false);
  const [activeAccountTab, setActiveAccountTab] =
    useState<PrototypeAccountTabId>("profile");
  const [historyEntries, setHistoryEntries] = useState(() => [
    ...syntheticSearchHistoryFixture,
  ]);
  const [expandedHistoryIds, setExpandedHistoryIds] = useState<string[]>([]);
  const [historyActionState, setHistoryActionState] =
    useState<PrototypeDestructiveActionState>("idle");
  const [historyDeleteTargetId, setHistoryDeleteTargetId] = useState<string | null>(
    null,
  );
  const [historyActionMessage, setHistoryActionMessage] = useState("");
  const [failNextHistoryDelete, setFailNextHistoryDelete] = useState(false);
  const [pendingDataAction, setPendingDataAction] =
    useState<PrototypeDataAction | null>(null);
  const [dataActionStates, setDataActionStates] = useState<
    Record<PrototypeDataAction, PrototypeDestructiveActionState>
  >({ history: "idle", account: "idle" });
  const [failNextDataAction, setFailNextDataAction] = useState(false);
  const [accountAcknowledged, setAccountAcknowledged] = useState(false);
  const [accountConfirmPhrase, setAccountConfirmPhrase] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const leaveDialogRef = useRef<HTMLDialogElement>(null);
  const leaveTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const statusRefs = useRef<
    Partial<Record<PrototypeProfileSection, HTMLParagraphElement>>
  >({});

  const usageDirty =
    usageKey(usageDraft) !==
    usageKey({
      annualSpend: savedProfile.annualSpend,
      usageByCategory: savedProfile.usageByCategory,
      frequentServiceIds: savedProfile.frequentServiceIds,
    });
  const personalDirty =
    personalDraft.ageBand !== savedProfile.ageBand ||
    personalDraft.joiningTime !== savedProfile.joiningTime;
  const pointsDirty =
    pointsKey(pointsDraft) !==
    pointsKey({ pointPreferenceIds: savedProfile.pointPreferenceIds });
  const anyDirty = usageDirty || personalDirty || pointsDirty;

  const allocated = Object.values(usageDraft.usageByCategory).reduce(
    (total, value) => total + (value ?? 0),
    0,
  );
  const invalidCategoryIds = new Set(
    Object.entries(usageDraft.usageByCategory)
      .filter(
        ([, value]) => value === undefined || value < 0 || !Number.isInteger(value),
      )
      .map(([categoryId]) => categoryId),
  );
  const annualOutOfRange =
    usageDraft.annualSpend !== null &&
    (usageDraft.annualSpend < 1 ||
      usageDraft.annualSpend > PROTOTYPE_PROFILE_MAX_ANNUAL_SPEND ||
      !Number.isInteger(usageDraft.annualSpend));
  const missingAnnualSpend = usageDraft.annualSpend === null && allocated > 0;
  const allocationOverflow =
    usageDraft.annualSpend !== null && allocated > usageDraft.annualSpend;
  const usageInvalid =
    annualOutOfRange ||
    invalidCategoryIds.size > 0 ||
    missingAnnualSpend ||
    allocationOverflow;
  const currentHero = heroContent[activeAccountTab];

  useEffect(() => {
    function warnBeforeUnload(event: BeforeUnloadEvent) {
      if (!anyDirty) return;
      event.preventDefault();
    }

    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [anyDirty]);

  useEffect(() => {
    if (pendingHref && !leaveDialogRef.current?.open) {
      leaveDialogRef.current?.showModal();
    }
  }, [pendingHref]);

  function updateSaveState(
    section: PrototypeProfileSection,
    state: PrototypeProfileSaveState,
  ) {
    setSaveStates((current) => ({ ...current, [section]: state }));
  }

  function saveSection(section: PrototypeProfileSection) {
    updateSaveState(section, "saving");
    const shouldFail = failNextSave;
    setFailNextSave(false);

    window.setTimeout(() => {
      if (shouldFail) {
        updateSaveState(section, "failed");
        window.requestAnimationFrame(() => statusRefs.current[section]?.focus());
        return;
      }

      setSavedProfile((current) => {
        if (section === "usage") {
          return {
            ...current,
            annualSpend: usageDraft.annualSpend,
            usageByCategory: { ...usageDraft.usageByCategory },
            frequentServiceIds: [...usageDraft.frequentServiceIds],
          };
        }
        if (section === "personal") {
          return { ...current, ...personalDraft };
        }
        return {
          ...current,
          pointPreferenceIds: [...pointsDraft.pointPreferenceIds],
        };
      });
      updateSaveState(section, "saved");
    }, 450);
  }

  function resetSection(section: PrototypeProfileSection) {
    if (section === "usage") {
      setUsageDraft({
        annualSpend: savedProfile.annualSpend,
        usageByCategory: { ...savedProfile.usageByCategory },
        frequentServiceIds: [...savedProfile.frequentServiceIds],
      });
    } else if (section === "personal") {
      setPersonalDraft({
        ageBand: savedProfile.ageBand,
        joiningTime: savedProfile.joiningTime,
      });
    } else {
      setPointsDraft({ pointPreferenceIds: [...savedProfile.pointPreferenceIds] });
    }
    updateSaveState(section, "saved");
  }

  function toggleHistoryDetails(id: string) {
    setExpandedHistoryIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function requestHistoryDelete(id: string) {
    setHistoryDeleteTargetId(id);
    setHistoryActionState("confirming");
    setHistoryActionMessage("");
  }

  function cancelHistoryDelete() {
    setHistoryDeleteTargetId(null);
    setHistoryActionState("idle");
  }

  function runHistoryDelete() {
    const target = historyEntries.find((entry) => entry.id === historyDeleteTargetId);
    if (!target) {
      setHistoryActionMessage("削除対象の履歴を確認できませんでした。");
      setHistoryActionState("failed");
      return;
    }

    const shouldFail = failNextHistoryDelete;
    setFailNextHistoryDelete(false);
    setHistoryActionState("processing");
    window.setTimeout(() => {
      if (shouldFail) {
        setHistoryActionMessage("UIモック用の失敗を発生させました。");
        setHistoryActionState("failed");
        return;
      }
      setHistoryEntries((current) => current.filter((entry) => entry.id !== target.id));
      setExpandedHistoryIds((current) => current.filter((id) => id !== target.id));
      setHistoryActionMessage(`「${target.title}」を削除しました。`);
      setHistoryActionState("succeeded");
      setHistoryDeleteTargetId(null);
    }, 450);
  }

  function requestDataAction(action: PrototypeDataAction) {
    setPendingDataAction(action);
    setDataActionStates((current) => ({ ...current, [action]: "confirming" }));
  }

  function cancelDataAction() {
    if (pendingDataAction) {
      setDataActionStates((current) => ({
        ...current,
        [pendingDataAction]: "idle",
      }));
    }
    setPendingDataAction(null);
  }

  function runDataAction(action: PrototypeDataAction) {
    const shouldFail = failNextDataAction;
    setFailNextDataAction(false);
    setPendingDataAction(null);
    setDataActionStates((current) => ({ ...current, [action]: "processing" }));
    window.setTimeout(() => {
      if (shouldFail) {
        setDataActionStates((current) => ({ ...current, [action]: "failed" }));
        return;
      }

      if (action === "history") {
        setHistoryEntries([]);
        setExpandedHistoryIds([]);
        setHistoryActionState("idle");
        setHistoryDeleteTargetId(null);
        setDataActionStates((current) => ({ ...current, history: "succeeded" }));
        return;
      }

      const cleared = emptyProfile();
      setSavedProfile(cloneProfile(cleared));
      setUsageDraft({
        annualSpend: cleared.annualSpend,
        usageByCategory: {},
        frequentServiceIds: [],
      });
      setPersonalDraft({
        ageBand: cleared.ageBand,
        joiningTime: cleared.joiningTime,
      });
      setPointsDraft({ pointPreferenceIds: [] });
      setSaveStates({ usage: "saved", personal: "saved", points: "saved" });
      setHistoryEntries([]);
      setAccountDeleted(true);
      setDataActionStates((current) => ({ ...current, account: "succeeded" }));
    }, 550);
  }

  function confirmDataAction() {
    if (pendingDataAction) runDataAction(pendingDataAction);
  }

  function resetAccountPrototype() {
    const restored = cloneProfile(initial);
    setSavedProfile(restored);
    setUsageDraft({
      annualSpend: restored.annualSpend,
      usageByCategory: { ...restored.usageByCategory },
      frequentServiceIds: [...restored.frequentServiceIds],
    });
    setPersonalDraft({
      ageBand: restored.ageBand,
      joiningTime: restored.joiningTime,
    });
    setPointsDraft({ pointPreferenceIds: [...restored.pointPreferenceIds] });
    setSaveStates({ usage: "saved", personal: "saved", points: "saved" });
    setFailNextSave(false);
    setHistoryEntries([...syntheticSearchHistoryFixture]);
    setExpandedHistoryIds([]);
    setHistoryActionState("idle");
    setHistoryDeleteTargetId(null);
    setHistoryActionMessage("");
    setFailNextHistoryDelete(false);
    setPendingDataAction(null);
    setDataActionStates({ history: "idle", account: "idle" });
    setFailNextDataAction(false);
    setAccountAcknowledged(false);
    setAccountConfirmPhrase("");
    setAccountDeleted(false);
    setActiveAccountTab("profile");
  }

  function toggleCategory(categoryId: PrototypeCategoryId) {
    setUsageDraft((current) => {
      const selected = Object.hasOwn(current.usageByCategory, categoryId);
      const usageByCategory = { ...current.usageByCategory };
      let frequentServiceIds = [...current.frequentServiceIds];
      if (selected) {
        delete usageByCategory[categoryId];
        const category = prototypeCategories.find((item) => item.id === categoryId);
        const serviceIds = new Set<string>(
          category?.services.map((service) => service.id),
        );
        frequentServiceIds = frequentServiceIds.filter((id) => !serviceIds.has(id));
      } else {
        usageByCategory[categoryId] = 0;
      }
      return { ...current, usageByCategory, frequentServiceIds };
    });
    updateSaveState("usage", "saved");
  }

  function toggleService(serviceId: string) {
    setUsageDraft((current) => ({
      ...current,
      frequentServiceIds: current.frequentServiceIds.includes(serviceId)
        ? current.frequentServiceIds.filter((id) => id !== serviceId)
        : [...current.frequentServiceIds, serviceId],
    }));
    updateSaveState("usage", "saved");
  }

  function togglePointPreference(id: string) {
    setPointsDraft((current) => {
      if (id === "none") {
        return {
          pointPreferenceIds: current.pointPreferenceIds.includes("none")
            ? []
            : ["none"],
        };
      }
      const withoutNone = current.pointPreferenceIds.filter((item) => item !== "none");
      return {
        pointPreferenceIds: withoutNone.includes(id)
          ? withoutNone.filter((item) => item !== id)
          : [...withoutNone, id],
      };
    });
    updateSaveState("points", "saved");
  }

  function handleNavigation(event: ReactMouseEvent<HTMLDivElement>) {
    if (!anyDirty || event.defaultPrevented || event.button !== 0) return;
    const target = event.target as HTMLElement;
    const anchor = target.closest("a");
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download"))
      return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    ) {
      return;
    }
    event.preventDefault();
    leaveTriggerRef.current = anchor;
    setPendingHref(`${url.pathname}${url.search}${url.hash}`);
  }

  function cancelLeave() {
    leaveDialogRef.current?.close();
    setPendingHref(null);
    window.requestAnimationFrame(() => leaveTriggerRef.current?.focus());
  }

  function confirmLeave() {
    if (pendingHref) window.location.assign(pendingHref);
  }

  function sectionStatus(
    section: PrototypeProfileSection,
    dirty: boolean,
  ): { label: string; className: string } {
    if (saveStates[section] === "saving") {
      return { label: "保存中", className: styles.statusSaving };
    }
    if (saveStates[section] === "failed") {
      return { label: "保存失敗", className: styles.statusFailed };
    }
    if (dirty) return { label: "変更あり", className: styles.statusDirty };
    return { label: "保存済み", className: styles.statusSaved };
  }

  function renderSectionStatus(section: PrototypeProfileSection, dirty: boolean) {
    const status = sectionStatus(section, dirty);
    const failed = saveStates[section] === "failed";
    return (
      <p
        className={`${styles.sectionStatus} ${status.className}`}
        role={failed ? "alert" : "status"}
        tabIndex={failed ? -1 : undefined}
        ref={(element) => {
          statusRefs.current[section] = element ?? undefined;
        }}
      >
        <span aria-hidden="true">{failed ? "!" : dirty ? "●" : "✓"}</span>
        {status.label}
        {failed && " — 入力は保持されています。もう一度保存してください。"}
      </p>
    );
  }

  function renderSectionActions(
    section: PrototypeProfileSection,
    dirty: boolean,
    invalid = false,
  ) {
    const saving = saveStates[section] === "saving";
    return (
      <div className={styles.sectionActions}>
        <button
          type="button"
          className={styles.resetButton}
          disabled={!dirty || saving}
          onClick={() => resetSection(section)}
        >
          変更を元に戻す
        </button>
        <button
          type="button"
          className={styles.saveButton}
          disabled={!dirty || invalid || saving}
          onClick={() => saveSection(section)}
        >
          {saving ? "保存しています…" : "変更を保存"}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page} onClickCapture={handleNavigation}>
      <a className={styles.skipLink} href="#profile-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="account" />

      <main id="profile-main">
        <div className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{currentHero.eyebrow}</p>
            <h1 id="profile-title">{currentHero.title}</h1>
            <p>{currentHero.description}</p>
          </div>
          <div className={styles.heroSummary} aria-label="選択中のAccount機能の説明">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>{currentHero.summary}</strong>
              <small>{currentHero.detail}</small>
            </div>
          </div>
        </div>

        <div className={styles.accountLayout}>
          {accountDeleted ? (
            <AccountDeletedPanel onReset={resetAccountPrototype} />
          ) : (
            <>
              <AccountTabs
                activeTab={activeAccountTab}
                onChange={setActiveAccountTab}
              />

              <div
                className={styles.profileContent}
                id="account-panel-profile"
                role="tabpanel"
                aria-labelledby="account-tab-profile"
                hidden={activeAccountTab !== "profile"}
              >
                <section
                  className={styles.mockNotice}
                  aria-labelledby="mock-notice-title"
                >
                  <div>
                    <strong id="mock-notice-title">UIモックとして表示しています</strong>
                    <p>
                      保存はこの画面のメモリ内だけで完結し、再読み込みすると合成初期値へ戻ります。
                      外部送信や永続化は行いません。
                    </p>
                  </div>
                  <label className={styles.failureToggle}>
                    <input
                      type="checkbox"
                      checked={failNextSave}
                      onChange={(event) => setFailNextSave(event.target.checked)}
                    />
                    <span>次の保存を失敗させる</span>
                    <small>UIモック確認用</small>
                  </label>
                </section>

                <nav className={styles.sectionLinks} aria-label="プロフィール内の項目">
                  <a href="#usage-section">利用額・よく使う場所</a>
                  <a href="#personal-section">あなたについて</a>
                  <a href="#points-section">ポイントの希望</a>
                </nav>

                <section
                  className={styles.formCard}
                  id="usage-section"
                  aria-labelledby="usage-title"
                >
                  <header className={styles.cardHeader}>
                    <div>
                      <span className={styles.stepNumber}>1</span>
                      <div>
                        <p>検索条件の基本</p>
                        <h2 id="usage-title">利用額・よく使う場所</h2>
                      </div>
                    </div>
                    {renderSectionStatus("usage", usageDirty)}
                  </header>

                  <div className={styles.cardBody}>
                    <div className={styles.fieldIntro}>
                      <div>
                        <h3>年間利用額</h3>
                        <p>カードで1年間に支払う予定の合計額を入力します。</p>
                      </div>
                      <label className={styles.amountInput}>
                        <span className={styles.srOnly}>年間利用額 円</span>
                        <input
                          type="number"
                          aria-label="年間利用額 円"
                          inputMode="numeric"
                          min="1"
                          max={PROTOTYPE_PROFILE_MAX_ANNUAL_SPEND}
                          step="1"
                          value={usageDraft.annualSpend ?? ""}
                          aria-invalid={annualOutOfRange || missingAnnualSpend}
                          aria-describedby={
                            annualOutOfRange || missingAnnualSpend
                              ? "annual-spend-error"
                              : "annual-spend-help"
                          }
                          onChange={(event) => {
                            const value = event.target.value;
                            setUsageDraft((current) => ({
                              ...current,
                              annualSpend: value === "" ? null : Number(value),
                            }));
                            updateSaveState("usage", "saved");
                          }}
                        />
                        <span>円／年</span>
                      </label>
                    </div>
                    <p className={styles.fieldHelp} id="annual-spend-help">
                      未設定にもできます。設定する場合は1円〜1億円の整数で入力してください。
                    </p>
                    {(annualOutOfRange || missingAnnualSpend) && (
                      <p className={styles.fieldError} id="annual-spend-error">
                        {missingAnnualSpend
                          ? "利用先別金額を保存するには、年間利用額を入力してください。"
                          : "年間利用額は1円〜1億円の整数で入力してください。"}
                      </p>
                    )}

                    <fieldset className={styles.categoryFieldset}>
                      <legend>よく使う場所と年間利用額</legend>
                      <p>
                        利用するカテゴリを選び、必要に応じて金額と架空サービスを設定します。
                      </p>
                      <div className={styles.categoryGrid}>
                        {prototypeCategories.map((category) => {
                          const selected = Object.hasOwn(
                            usageDraft.usageByCategory,
                            category.id,
                          );
                          return (
                            <div
                              className={`${styles.categoryCard} ${selected ? styles.categorySelected : ""}`}
                              key={category.id}
                            >
                              <label className={styles.categoryToggle}>
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => toggleCategory(category.id)}
                                />
                                <span aria-hidden="true">{category.mark}</span>
                                <strong>{category.label}</strong>
                              </label>
                              {selected && (
                                <div className={styles.categoryDetails}>
                                  <label className={styles.categoryAmount}>
                                    <span>{category.label}の年間利用額</span>
                                    <span>
                                      <input
                                        type="number"
                                        inputMode="numeric"
                                        min="0"
                                        step="1"
                                        value={
                                          usageDraft.usageByCategory[category.id] ?? 0
                                        }
                                        aria-invalid={
                                          allocationOverflow ||
                                          invalidCategoryIds.has(category.id)
                                        }
                                        onChange={(event) => {
                                          const value = Number(event.target.value);
                                          setUsageDraft((current) => ({
                                            ...current,
                                            usageByCategory: {
                                              ...current.usageByCategory,
                                              [category.id]: value,
                                            },
                                          }));
                                          updateSaveState("usage", "saved");
                                        }}
                                      />
                                      <em>円</em>
                                    </span>
                                  </label>
                                  <fieldset className={styles.serviceChoices}>
                                    <legend>よく使うサービス（複数選択可）</legend>
                                    {category.services.map((service) => (
                                      <label key={service.id}>
                                        <input
                                          type="checkbox"
                                          checked={usageDraft.frequentServiceIds.includes(
                                            service.id,
                                          )}
                                          onChange={() => toggleService(service.id)}
                                        />
                                        <span>{service.label}</span>
                                      </label>
                                    ))}
                                  </fieldset>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div
                      className={`${styles.totalPanel} ${usageInvalid ? styles.totalPanelError : ""}`}
                      role={usageInvalid ? "alert" : "status"}
                    >
                      <div>
                        <span>利用先別の合計</span>
                        <strong>{yen.format(allocated)}円</strong>
                      </div>
                      <div>
                        <span>まだ割り振っていない利用額</span>
                        <strong>
                          {usageDraft.annualSpend === null
                            ? "年間利用額が未設定"
                            : `${yen.format(usageDraft.annualSpend - allocated)}円`}
                        </strong>
                      </div>
                      {allocationOverflow && (
                        <p>
                          利用先別の合計が年間利用額を
                          {yen.format(allocated - (usageDraft.annualSpend ?? 0))}
                          円超えています。
                        </p>
                      )}
                      {invalidCategoryIds.size > 0 && (
                        <p>利用先別金額は0円以上の整数で入力してください。</p>
                      )}
                    </div>
                  </div>
                  {renderSectionActions("usage", usageDirty, usageInvalid)}
                </section>

                <section
                  className={styles.formCard}
                  id="personal-section"
                  aria-labelledby="personal-title"
                >
                  <header className={styles.cardHeader}>
                    <div>
                      <span className={styles.stepNumber}>2</span>
                      <div>
                        <p>候補の絞り込みに利用</p>
                        <h2 id="personal-title">あなたについて</h2>
                      </div>
                    </div>
                    {renderSectionStatus("personal", personalDirty)}
                  </header>
                  <div className={styles.cardBody}>
                    <fieldset className={styles.choiceFieldset}>
                      <legend>年齢帯</legend>
                      <p>申込条件を確認しやすくするために使用します。</p>
                      <div className={styles.choiceGrid}>
                        {ageBandOptions.map((option) => (
                          <label
                            className={
                              personalDraft.ageBand === option.id
                                ? styles.choiceSelected
                                : ""
                            }
                            key={option.id}
                          >
                            <input
                              type="radio"
                              name="age-band"
                              value={option.id}
                              checked={personalDraft.ageBand === option.id}
                              onChange={() => {
                                setPersonalDraft((current) => ({
                                  ...current,
                                  ageBand: option.id as PrototypeAgeBand,
                                }));
                                updateSaveState("personal", "saved");
                              }}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className={styles.choiceFieldset}>
                      <legend>カードへの入会予定時期</legend>
                      <p>
                        受付状況や期間のある情報を確認しやすくするために使用します。
                      </p>
                      <div className={styles.choiceGrid}>
                        {joiningTimeOptions.map((option) => (
                          <label
                            className={
                              personalDraft.joiningTime === option.id
                                ? styles.choiceSelected
                                : ""
                            }
                            key={option.id}
                          >
                            <input
                              type="radio"
                              name="joining-time"
                              value={option.id}
                              checked={personalDraft.joiningTime === option.id}
                              onChange={() => {
                                setPersonalDraft((current) => ({
                                  ...current,
                                  joiningTime: option.id as PrototypeJoiningTime,
                                }));
                                updateSaveState("personal", "saved");
                              }}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <p className={styles.privacyNote}>
                      年収、職業、雇用形態は保存しません。年齢帯も「回答しない」を選べます。
                    </p>
                  </div>
                  {renderSectionActions("personal", personalDirty)}
                </section>

                <section
                  className={styles.formCard}
                  id="points-section"
                  aria-labelledby="points-title"
                >
                  <header className={styles.cardHeader}>
                    <div>
                      <span className={styles.stepNumber}>3</span>
                      <div>
                        <p>使いやすさの希望</p>
                        <h2 id="points-title">ポイントの希望</h2>
                      </div>
                    </div>
                    {renderSectionStatus("points", pointsDirty)}
                  </header>
                  <div className={styles.cardBody}>
                    <fieldset className={styles.pointFieldset}>
                      <legend>希望するポイント・交換先</legend>
                      <p>
                        複数選択できます。「特に希望なし」はほかの選択と併用しません。
                      </p>
                      <div className={styles.pointGrid}>
                        {pointPreferenceOptions.map((option) => {
                          const selected = pointsDraft.pointPreferenceIds.includes(
                            option.id,
                          );
                          return (
                            <label
                              className={selected ? styles.choiceSelected : ""}
                              key={option.id}
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => togglePointPreference(option.id)}
                              />
                              <span>
                                <strong>{option.label}</strong>
                                <small>{option.description}</small>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                  {renderSectionActions("points", pointsDirty)}
                </section>

                <section className={styles.dataUse} aria-labelledby="data-use-title">
                  <div aria-hidden="true">i</div>
                  <div>
                    <h2 id="data-use-title">保存項目の使い方</h2>
                    <p>
                      保存したプロフィールは検索・比較の初期値として使います。検索画面で変更した値は、
                      利用者が明示的に保存しない限りプロフィールへ反映しません。
                    </p>
                    <p>
                      Profile全体の削除と履歴管理はAccount
                      Tabから確認できます。Export機能は初期Releaseに含みません。
                    </p>
                  </div>
                </section>
              </div>

              <HistoryPanel
                hidden={activeAccountTab !== "history"}
                entries={historyEntries}
                expandedIds={expandedHistoryIds}
                actionState={historyActionState}
                deleteTargetId={historyDeleteTargetId}
                actionMessage={historyActionMessage}
                failNextDelete={failNextHistoryDelete}
                onFailNextDeleteChange={setFailNextHistoryDelete}
                onToggleDetails={toggleHistoryDetails}
                onRequestDelete={requestHistoryDelete}
                onCancelDelete={cancelHistoryDelete}
                onConfirmDelete={runHistoryDelete}
                onRetryDelete={runHistoryDelete}
              />

              <DataManagementPanel
                hidden={activeAccountTab !== "data"}
                summary={syntheticDataSummaryFixture}
                historyCount={historyEntries.length}
                pendingAction={pendingDataAction}
                historyActionState={dataActionStates.history}
                accountActionState={dataActionStates.account}
                failNextAction={failNextDataAction}
                accountAcknowledged={accountAcknowledged}
                accountConfirmPhrase={accountConfirmPhrase}
                onFailNextActionChange={setFailNextDataAction}
                onAccountAcknowledgedChange={setAccountAcknowledged}
                onAccountConfirmPhraseChange={setAccountConfirmPhrase}
                onRequestAction={requestDataAction}
                onCancelAction={cancelDataAction}
                onConfirmAction={confirmDataAction}
                onRetryAction={runDataAction}
              />
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <strong>カードみっけ</strong>
        <span>Account UI-only mock</span>
      </footer>

      <dialog
        className={styles.leaveDialog}
        ref={leaveDialogRef}
        aria-labelledby="leave-title"
        onCancel={(event) => {
          event.preventDefault();
          cancelLeave();
        }}
      >
        <div>
          <span className={styles.dialogIcon} aria-hidden="true">
            !
          </span>
          <h2 id="leave-title">保存していない変更があります</h2>
          <p>このページから移動すると、変更した内容は失われます。</p>
          <div>
            <button type="button" className={styles.resetButton} onClick={cancelLeave}>
              編集を続ける
            </button>
            <button
              type="button"
              className={styles.dangerButton}
              onClick={confirmLeave}
            >
              変更を破棄して移動
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
