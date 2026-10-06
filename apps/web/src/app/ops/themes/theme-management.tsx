"use client";

import { useMemo, useRef, useState } from "react";
import { prototypeCategories } from "@/features/search/prototype-condition-options";
import { prototypeThemeHistory, prototypeThemePresets } from "@/fixtures/theme-presets";
import type { PrototypeThemePreset } from "@/types/theme-preset-prototype";
import { OpsShell } from "../ops-shell";
import { ReauthDialog } from "../reauth-dialog";
import styles from "../workflow.module.css";

const yen = new Intl.NumberFormat("ja-JP");
const cloneThemes = () => structuredClone(prototypeThemePresets);
const profileOptions = [
  ["custom", "こだわり条件"],
  ["everyday", "日常使い重視"],
  ["points", "ポイント重視"],
  ["travel", "旅行・交通重視"],
  ["simple", "年会費重視"],
  ["shopping", "買い物重視"],
] as const;
const serviceOptions = [
  ["best", "カテゴリ内最良条件"],
  ["featured", "指定した架空Service"],
  ["other", "その他（通常還元のみ）"],
] as const;

export default function ThemeManagement() {
  const [themes, setThemes] = useState<PrototypeThemePreset[]>(cloneThemes);
  const [publishedSnapshot, setPublishedSnapshot] = useState<PrototypeThemePreset[]>(
    () => cloneThemes().filter((theme) => theme.state === "published"),
  );
  const [selectedId, setSelectedId] = useState(themes[0].id);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");
  const [reauthOpen, setReauthOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"publish" | "unpublish">(
    "publish",
  );
  const resultRef = useRef<HTMLDivElement>(null);
  const selected = themes.find((theme) => theme.id === selectedId)!;
  const published = useMemo(
    () => publishedSnapshot.toSorted((a, b) => a.displayOrder - b.displayOrder),
    [publishedSnapshot],
  );
  const allocated = Object.values(selected.scenario.usageByCategory).reduce(
    (total, amount) => total + (amount ?? 0),
    0,
  );

  const update = (patch: Partial<PrototypeThemePreset>) => {
    setSavedId(null);
    setError("");
    setErrorField("");
    setThemes((current) =>
      current.map((theme) =>
        theme.id === selectedId ? { ...theme, ...patch } : theme,
      ),
    );
  };
  const updateScenario = (patch: Partial<PrototypeThemePreset["scenario"]>) => {
    update({ scenario: { ...selected.scenario, ...patch } });
  };
  const announce = (text: string) => {
    setMessage(text);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };
  const saveDraft = () => {
    if (!selected.name.trim()) {
      setError("名称と説明を入力してください。");
      setErrorField("name");
      return;
    }
    if (!selected.description.trim()) {
      setError("名称と説明を入力してください。");
      setErrorField("description");
      return;
    }
    if (
      !Number.isFinite(selected.displayOrder) ||
      !Number.isInteger(selected.displayOrder) ||
      selected.displayOrder < 1
    ) {
      setError("表示順は1以上の整数で入力してください。");
      setErrorField("displayOrder");
      return;
    }
    if (
      !Number.isFinite(selected.scenario.annualSpend) ||
      !Number.isInteger(selected.scenario.annualSpend) ||
      selected.scenario.annualSpend < 1 ||
      selected.scenario.annualSpend > 100_000_000
    ) {
      setError("年間利用額は1〜100,000,000の整数で入力してください。");
      setErrorField("annualSpend");
      return;
    }
    const invalidAmount = Object.entries(selected.scenario.usageByCategory).find(
      ([, amount]) =>
        amount !== undefined &&
        (!Number.isFinite(amount) || !Number.isInteger(amount) || amount < 0),
    );
    if (invalidAmount) {
      setError("利用先別金額は0以上の整数で入力してください。");
      setErrorField(invalidAmount[0]);
      return;
    }
    if (
      themes.some(
        (theme) =>
          theme.id !== selectedId && theme.displayOrder === selected.displayOrder,
      )
    ) {
      setError("表示順が重複しています。別の整数を指定してください。");
      setErrorField("displayOrder");
      return;
    }
    if (allocated > selected.scenario.annualSpend) {
      setError("利用先の内訳合計を年間利用額以下にしてください。");
      setErrorField("amounts");
      return;
    }
    setError("");
    setErrorField("");
    setSavedId(selectedId);
    announce(
      "DraftをBrowser Memory内に保存しました。外部送信・永続化・利用者向け公開は行っていません。",
    );
  };
  const addTheme = () => {
    const id = `theme-candidate-${themes.length + 1}`;
    const next: PrototypeThemePreset = {
      id,
      name: "新しいテーマ候補",
      description: "利用者向けの短い説明を入力してください。",
      displayOrder: Math.max(...themes.map((theme) => theme.displayOrder)) + 1,
      state: "private",
      scenario: {
        annualSpend: 1_000_000,
        profileId: "custom",
        usageByCategory: {},
        serviceByCategory: {},
        source: "search",
      },
      updatedAt: "未保存",
    };
    setThemes((current) => [...current, next]);
    setSelectedId(id);
    setSavedId(null);
    setError("");
    setErrorField("");
    announce("非公開の新規テーマ候補を追加しました。");
  };

  return (
    <OpsShell>
      <main id="main-content" className={styles.main}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>THEME PRESET MANAGEMENT</p>
            <h1>テーマ管理</h1>
            <p>名称、説明、表示順、条件一式、公開状態をUI-onlyで管理します。</p>
          </div>
          <span className={styles.badge}>Browser Memory / 外部公開なし</span>
        </div>

        {message && (
          <div
            ref={resultRef}
            tabIndex={-1}
            role="region"
            aria-label="テーマ管理の操作結果"
            className={styles.result}
          >
            <span role="status">{message}</span>
          </div>
        )}

        <div className={styles.grid}>
          <aside className={styles.panel} aria-label="テーマ一覧">
            <div className={styles.heading}>
              <div>
                <h2>テーマ {themes.length}件</h2>
                <p className={styles.help}>公開・非公開を含む編集対象です。</p>
              </div>
              <button type="button" className={styles.secondary} onClick={addTheme}>
                新規追加
              </button>
            </div>
            <div className={styles.queue}>
              {themes
                .toSorted((a, b) => a.displayOrder - b.displayOrder)
                .map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    aria-pressed={theme.id === selectedId}
                    onClick={() => {
                      setSelectedId(theme.id);
                      setSavedId(null);
                      setError("");
                      setErrorField("");
                    }}
                  >
                    <span
                      className={styles.status}
                      data-tone={theme.state === "published" ? "success" : "warning"}
                    >
                      {theme.state === "published" ? "公開中" : "非公開"}
                    </span>
                    <strong>
                      {theme.displayOrder}. {theme.name}
                    </strong>
                    <small>年間 {yen.format(theme.scenario.annualSpend)}円</small>
                  </button>
                ))}
            </div>
          </aside>

          <div>
            <section className={styles.panel} aria-labelledby="theme-editor-heading">
              <div className={styles.heading}>
                <div>
                  <span
                    className={styles.status}
                    data-tone={selected.state === "published" ? "success" : "warning"}
                  >
                    {selected.state === "published" ? "公開中" : "非公開"}
                  </span>
                  <h2 id="theme-editor-heading">テーマ設定</h2>
                </div>
                <small className={styles.help}>更新 {selected.updatedAt}</small>
              </div>
              {error && (
                <div className={styles.alert} id="theme-form-error" role="alert">
                  {error}
                </div>
              )}
              <div className={styles.form}>
                <label>
                  利用者向け名称
                  <input
                    value={selected.name}
                    maxLength={40}
                    onChange={(event) => update({ name: event.target.value })}
                    aria-invalid={errorField === "name"}
                    aria-describedby={
                      errorField === "name" ? "theme-form-error" : undefined
                    }
                  />
                </label>
                <label>
                  利用者向け説明
                  <textarea
                    value={selected.description}
                    maxLength={120}
                    onChange={(event) => update({ description: event.target.value })}
                    aria-invalid={errorField === "description"}
                    aria-describedby={
                      errorField === "description" ? "theme-form-error" : undefined
                    }
                  />
                </label>
                <div className={styles.editorGrid}>
                  <label>
                    検索タイプ
                    <select
                      value={selected.scenario.profileId ?? "custom"}
                      onChange={(event) =>
                        updateScenario({
                          profileId: event.target
                            .value as PrototypeThemePreset["scenario"]["profileId"],
                        })
                      }
                    >
                      {profileOptions.map(([value, label]) => (
                        <option value={value} key={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    表示順
                    <input
                      type="number"
                      min="1"
                      value={selected.displayOrder}
                      onChange={(event) =>
                        update({ displayOrder: Number(event.target.value) })
                      }
                      aria-invalid={errorField === "displayOrder"}
                      aria-describedby={
                        errorField === "displayOrder" ? "theme-form-error" : undefined
                      }
                    />
                  </label>
                  <label>
                    年間利用額（円）
                    <input
                      type="number"
                      min="1"
                      max="100000000"
                      step="10000"
                      value={selected.scenario.annualSpend}
                      onChange={(event) =>
                        updateScenario({ annualSpend: Number(event.target.value) })
                      }
                      aria-invalid={errorField === "annualSpend"}
                      aria-describedby={
                        errorField === "annualSpend" ? "theme-form-error" : undefined
                      }
                    />
                  </label>
                </div>
                <fieldset
                  className={styles.conditionFieldset}
                  aria-describedby={
                    errorField === "amounts" ? "theme-form-error" : undefined
                  }
                >
                  <legend>利用先別の年間利用額（条件一式）</legend>
                  <p className={styles.help}>
                    未使用カテゴリは0円。合計 {yen.format(allocated)}円／年間利用額{" "}
                    {yen.format(selected.scenario.annualSpend)}円
                  </p>
                  <div className={styles.conditionGrid}>
                    {prototypeCategories.map((category) => (
                      <div className={styles.conditionItem} key={category.id}>
                        <label>
                          {category.label}（円）
                          <input
                            type="number"
                            min="0"
                            step="1000"
                            value={selected.scenario.usageByCategory[category.id] ?? 0}
                            onChange={(event) =>
                              updateScenario({
                                usageByCategory: {
                                  ...selected.scenario.usageByCategory,
                                  [category.id]: Number(event.target.value),
                                },
                              })
                            }
                            aria-invalid={errorField === category.id}
                            aria-describedby={
                              errorField === category.id
                                ? "theme-form-error"
                                : undefined
                            }
                          />
                        </label>
                        <label>
                          <span className={styles.srOnly}>
                            {category.label}のService条件
                          </span>
                          <select
                            value={
                              selected.scenario.serviceByCategory?.[category.id] ??
                              "best"
                            }
                            onChange={(event) =>
                              updateScenario({
                                serviceByCategory: {
                                  ...selected.scenario.serviceByCategory,
                                  [category.id]: event.target.value as
                                    "best" | "featured" | "other",
                                },
                              })
                            }
                          >
                            {serviceOptions.map(([value, label]) => (
                              <option value={value} key={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <p className={styles.notice}>
                <strong>テーマ名だけで最適性や順位を保証しません。</strong>
                <small>
                  順位と算定は通常検索と同じ確認済み情報・算定条件を使用します。
                </small>
              </p>
              <div className={styles.actions}>
                <button type="button" className={styles.primary} onClick={saveDraft}>
                  Draftを保存
                </button>
                <button
                  type="button"
                  className={styles.secondary}
                  disabled={savedId !== selectedId}
                  onClick={() => {
                    setPendingAction("publish");
                    setReauthOpen(true);
                  }}
                >
                  {selected.state === "published"
                    ? "再認証して変更を公開"
                    : "再認証して公開"}
                </button>
                {selected.state === "published" && (
                  <button
                    type="button"
                    className={styles.danger}
                    disabled={savedId !== selectedId}
                    onClick={() => {
                      setPendingAction("unpublish");
                      setReauthOpen(true);
                    }}
                  >
                    再認証して非公開化
                  </button>
                )}
              </div>
              {selected.state === "published" && savedId === selectedId && (
                <p className={styles.help} role="status">
                  Draft保存済みです。再認証して変更を公開するまで、利用者向け公開順プレビューは現在のSnapshotを維持します。
                </p>
              )}
            </section>

            <section className={styles.panel} aria-labelledby="public-order-heading">
              <h2 id="public-order-heading">利用者向け公開順プレビュー</h2>
              {published.length ? (
                <ol
                  className={styles.placementList}
                  data-testid="published-order-preview"
                >
                  {published.map((theme) => (
                    <li key={theme.id}>
                      {theme.name}（表示順 {theme.displayOrder}）
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={styles.help}>公開中テーマはありません。</p>
              )}
              <p className={styles.help}>
                非公開テーマは利用者向け入口へ表示しません。
              </p>
            </section>

            <section className={styles.panel} aria-labelledby="snapshot-heading">
              <h2 id="snapshot-heading">保存済み履歴スナップショット</h2>
              <dl className={styles.definition} data-testid="theme-history-snapshot">
                <div>
                  <dt>保存日時</dt>
                  <dd>{prototypeThemeHistory.savedAt}</dd>
                </div>
                <div>
                  <dt>当時のテーマ名</dt>
                  <dd>{prototypeThemeHistory.themeName}</dd>
                </div>
                <div>
                  <dt>当時の年間利用額</dt>
                  <dd>{yen.format(prototypeThemeHistory.scenario.annualSpend)}円</dd>
                </div>
                <div>
                  <dt>当時の条件一式</dt>
                  <dd>
                    Profile {prototypeThemeHistory.scenario.profileId}／
                    {prototypeCategories
                      .filter(
                        (category) =>
                          (prototypeThemeHistory.scenario.usageByCategory[
                            category.id
                          ] ?? 0) > 0,
                      )
                      .map(
                        (category) =>
                          `${category.label} ${yen.format(
                            prototypeThemeHistory.scenario.usageByCategory[
                              category.id
                            ] ?? 0,
                          )}円（${
                            serviceOptions.find(
                              ([value]) =>
                                value ===
                                (prototypeThemeHistory.scenario.serviceByCategory?.[
                                  category.id
                                ] ?? "best"),
                            )?.[1]
                          }）`,
                      )
                      .join("・")}
                  </dd>
                </div>
                <div>
                  <dt>当時計算結果</dt>
                  <dd>{prototypeThemeHistory.resultNames.join("、")}</dd>
                </div>
              </dl>
              <p className={styles.help}>
                現在のテーマを変更・非公開化しても、この記録は上書きしません。
              </p>
            </section>
          </div>
        </div>

        <ReauthDialog
          open={reauthOpen}
          actionLabel={
            pendingAction === "unpublish"
              ? "テーマを非公開化"
              : selected.state === "published"
                ? "テーマの変更を公開"
                : "テーマを公開"
          }
          description="対象テーマ、表示順、条件一式、履歴非上書きを確認し、UI-onlyの操作結果表示へ反映します。"
          onCancel={() => setReauthOpen(false)}
          onConfirm={() => {
            setReauthOpen(false);
            const nextState = pendingAction === "unpublish" ? "private" : "published";
            const nextTheme = {
              ...selected,
              state: nextState,
              updatedAt: "2026-10-06 操作済み（合成）",
            } as PrototypeThemePreset;
            update({ state: nextState, updatedAt: nextTheme.updatedAt });
            setPublishedSnapshot((current) =>
              nextState === "private"
                ? current.filter((theme) => theme.id !== selectedId)
                : [...current.filter((theme) => theme.id !== selectedId), nextTheme],
            );
            setSavedId(null);
            announce(
              nextState === "published"
                ? "テーマを公開中としたUI-only状態です。外部公開・永続化は行っていません。"
                : "テーマを非公開としたUI-only状態です。保存済み履歴は変更していません。",
            );
          }}
        />
      </main>
    </OpsShell>
  );
}
