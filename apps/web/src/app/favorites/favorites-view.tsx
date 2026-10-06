"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "@/app/components/site-header";
import { prototypeSearchCards } from "@/fixtures/home";
import type { PrototypeCardId } from "@/types/ui-prototype";
import styles from "./favorites.module.css";

type StorageMode = "temporary" | "account";

type RemovedFavorite = {
  id: PrototypeCardId;
  index: number;
};

export default function FavoritesView() {
  const searchParams = useSearchParams();
  const add = searchParams.get("add");
  const initialAddId = prototypeSearchCards.some((card) => card.id === add)
    ? (add as PrototypeCardId)
    : null;

  return (
    <FavoritesViewContent
      key={searchParams.toString()}
      initialAddId={initialAddId}
      initialLimitScenario={searchParams.get("scenario") === "limit"}
      initialTransferOpen={searchParams.get("dialog") === "transfer"}
    />
  );
}

function FavoritesViewContent({
  initialAddId,
  initialLimitScenario,
  initialTransferOpen,
}: {
  initialAddId: PrototypeCardId | null;
  initialLimitScenario: boolean;
  initialTransferOpen: boolean;
}) {
  const initialIds = useMemo(
    () =>
      Array.from(
        new Set<PrototypeCardId>([
          "travel-step",
          ...(initialAddId ? [initialAddId] : []),
        ]),
      ),
    [initialAddId],
  );
  const [favoriteIds, setFavoriteIds] = useState<PrototypeCardId[]>(initialIds);
  const [favoriteCount, setFavoriteCount] = useState(
    initialLimitScenario ? 50 : initialIds.length,
  );
  const [storageMode, setStorageMode] = useState<StorageMode>("temporary");
  const [message, setMessage] = useState(
    initialAddId
      ? `${prototypeSearchCards.find((card) => card.id === initialAddId)?.name}を一時お気に入りに追加しました。Accountには保存されていません。`
      : "",
  );
  const [lastRemoved, setLastRemoved] = useState<RemovedFavorite | null>(null);
  const [transferOpen, setTransferOpen] = useState(initialTransferOpen);
  const [statusFocusRequest, setStatusFocusRequest] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const transferTriggerRef = useRef<HTMLButtonElement>(null);
  const transferDialogRef = useRef<HTMLDivElement>(null);
  const transferConfirmRef = useRef<HTMLButtonElement>(null);

  const favorites = favoriteIds
    .map((id) => prototypeSearchCards.find((card) => card.id === id))
    .filter((card): card is (typeof prototypeSearchCards)[number] => Boolean(card));
  const suggestion = prototypeSearchCards.find(
    (card) => !favoriteIds.includes(card.id),
  );

  useEffect(() => {
    if (transferOpen) transferConfirmRef.current?.focus();
  }, [transferOpen]);

  useEffect(() => {
    if (statusFocusRequest === 0) return;
    statusRef.current?.focus({ preventScroll: true });
  }, [statusFocusRequest]);

  function closeTransfer(returnFocus = true) {
    setTransferOpen(false);
    if (returnFocus) {
      window.requestAnimationFrame(() => transferTriggerRef.current?.focus());
    }
  }

  function handleTransferKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTransfer();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      transferDialogRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
    ).filter((element) => !element.disabled);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function removeFavorite(id: PrototypeCardId) {
    const card = prototypeSearchCards.find((item) => item.id === id);
    const index = favoriteIds.indexOf(id);
    setFavoriteIds((current) => current.filter((item) => item !== id));
    setFavoriteCount((current) => Math.max(0, current - 1));
    setLastRemoved({ id, index });
    setMessage(`${card?.name}をお気に入りから解除しました。`);
    setStatusFocusRequest((current) => current + 1);
  }

  function undoRemove() {
    if (!lastRemoved) return;
    const card = prototypeSearchCards.find((item) => item.id === lastRemoved.id);
    setFavoriteIds((current) => {
      const next = [...current];
      next.splice(Math.min(lastRemoved.index, next.length), 0, lastRemoved.id);
      return next;
    });
    setFavoriteCount((current) => Math.min(50, current + 1));
    setMessage(`${card?.name}の解除を取り消しました。`);
    setLastRemoved(null);
    setStatusFocusRequest((current) => current + 1);
  }

  function addSuggestion() {
    if (!suggestion) return;
    if (favoriteCount >= 50) {
      setMessage(
        "お気に入りは最大50枚です。追加するには、いずれかのカードを解除してください。",
      );
      return;
    }
    setFavoriteIds((current) => [...current, suggestion.id]);
    setFavoriteCount((current) => current + 1);
    setLastRemoved(null);
    setMessage(
      `${suggestion.name}を${storageMode === "temporary" ? "一時" : "Accountの"}お気に入りに追加しました。`,
    );
  }

  function completeTransfer(shouldTransfer: boolean) {
    const countBeforeTransfer = favoriteCount;
    setStorageMode("account");
    if (!shouldTransfer) {
      setFavoriteIds([]);
      setFavoriteCount(0);
      setMessage(
        "一時お気に入りはAccountへ引き継ぎませんでした。自動では引き継がれません。",
      );
    } else {
      setMessage(
        `${countBeforeTransfer}枚をAccountのお気に入りへ引き継ぎました（UI-only）。`,
      );
    }
    setLastRemoved(null);
    setStatusFocusRequest((current) => current + 1);
    closeTransfer(false);
  }

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#favorites-main">
        本文へ移動
      </a>
      <SiteHeader currentPage="favorite" />

      <main id="favorites-main">
        <nav className={styles.breadcrumbs} aria-label="パンくずリスト">
          <ol>
            <li>
              <Link href="/">トップ</Link>
            </li>
            <li aria-current="page">お気に入り</li>
          </ol>
        </nav>

        <section className={styles.hero} aria-labelledby="favorites-title">
          <div>
            <p className={styles.kicker}>FAVORITES</p>
            <h1 id="favorites-title">気になるカードを、あとでじっくり。</h1>
            <p>
              検討中の候補をまとめて確認できます。比較や申込判断の前に、最新条件をカード詳細で確認してください。
            </p>
          </div>
          <div className={styles.countPanel} aria-label="お気に入り枚数">
            <strong>{favoriteCount}</strong>
            <span>/ 50枚</span>
            <small>
              {storageMode === "temporary" ? "一時お気に入り" : "Account保存"}
            </small>
          </div>
        </section>

        {message ? (
          <div
            ref={statusRef}
            className={styles.statusRow}
            role="region"
            aria-label="お気に入りの操作結果"
            tabIndex={-1}
          >
            <span role="status">{message}</span>
            {lastRemoved ? (
              <button type="button" onClick={undoRemove}>
                解除を取り消す
              </button>
            ) : null}
          </div>
        ) : null}

        <section
          className={styles.storagePanel}
          data-mode={storageMode}
          aria-labelledby="storage-title"
        >
          <div>
            <p>{storageMode === "temporary" ? "未登録で利用中" : "登録済みの想定"}</p>
            <h2 id="storage-title">
              {storageMode === "temporary"
                ? "この端末の一時お気に入りです"
                : "Accountに継続保存するお気に入りです"}
            </h2>
          </div>
          {storageMode === "temporary" ? (
            <>
              <ul>
                <li>
                  最終利用日 <time dateTime="2026-10-06">2026-10-06</time> から30日間、
                  <time dateTime="2026-11-05">2026-11-05</time>まで保持する想定です。
                </li>
                <li>
                  Browserのデータ削除や端末変更により、30日より前でも失われる場合があります。
                </li>
                <li>Accountには保存されていません。</li>
              </ul>
              <button
                ref={transferTriggerRef}
                type="button"
                onClick={() => setTransferOpen(true)}
              >
                Account登録時の引継ぎを確認
              </button>
            </>
          ) : (
            <p>
              有効期限のある一時保存ではありません。解除するまでAccountに保持する想定です。
            </p>
          )}
        </section>

        <section className={styles.listSection} aria-labelledby="list-title">
          <div className={styles.sectionHeading}>
            <div>
              <p>YOUR SHORTLIST</p>
              <h2 id="list-title">お気に入りのカード</h2>
            </div>
            <Link href="/search">カードを追加する →</Link>
          </div>

          {favorites.length === 0 && favoriteCount === 0 ? (
            <div className={styles.emptyState}>
              <span aria-hidden="true">☆</span>
              <h3>お気に入りはまだありません</h3>
              <p>検索結果やカード詳細から、検討中のカードを追加できます。</p>
              <Link href="/search">カードを探す</Link>
            </div>
          ) : favorites.length > 0 ? (
            <div className={styles.favoriteGrid}>
              {favorites.map((card) => (
                <article className={styles.favoriteCard} key={card.id}>
                  <div className={styles.cardTopline}>
                    <span>
                      {storageMode === "temporary" ? "一時保存" : "Account保存"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFavorite(card.id)}
                      aria-label={`${card.name}をお気に入りから解除`}
                    >
                      解除
                    </button>
                  </div>
                  <div className={styles.cardVisual} data-accent={card.accent}>
                    <small>CARD MIKKE</small>
                    <strong>{card.name}</strong>
                  </div>
                  <h3>{card.name}</h3>
                  <p>{card.issuer}</p>
                  <dl>
                    <div>
                      <dt>年会費</dt>
                      <dd>{card.annualFeeLabel.replace("年会費 ", "")}</dd>
                    </div>
                    <div>
                      <dt>基本還元</dt>
                      <dd>{card.baseRewardLabel.replace("基本還元 ", "")}</dd>
                    </div>
                  </dl>
                  <div className={styles.cardState} data-state={card.state}>
                    <strong>{card.stateLabel}</strong>
                    <small>確認日 {card.confirmedOn}</small>
                  </div>
                  <Link href={`/cards/${card.id}`}>カード詳細を見る →</Link>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.representativeState}>
              <strong>{favoriteCount}枚のお気に入りが残っています</strong>
              <p>
                上限確認Scenarioでは代表カードだけを表示しています。Empty状態ではありません。
              </p>
            </div>
          )}

          {initialLimitScenario ? (
            <p className={styles.fixtureNote}>
              上限確認Scenarioでは、50枚中の代表カードだけを表示しています。
            </p>
          ) : null}
        </section>

        {suggestion ? (
          <section className={styles.suggestion} aria-labelledby="suggestion-title">
            <div>
              <p>UI確認用の追加候補</p>
              <h2 id="suggestion-title">{suggestion.name}</h2>
              <span>{suggestion.reason}</span>
            </div>
            <button type="button" onClick={addSuggestion}>
              お気に入りに追加
            </button>
          </section>
        ) : null}
      </main>

      <footer className={styles.footer}>
        <Link href="/">カードみっけ</Link>
        <p>UI-only Mock — 外部通信・永続化は行いません。</p>
        <nav aria-label="フッターナビゲーション">
          <Link href="/">トップページ</Link>
          <Link href="/search">カードを探す</Link>
          <Link href="/account/profile">Account</Link>
        </nav>
      </footer>

      {transferOpen ? (
        <div className={styles.dialogBackdrop}>
          <div
            ref={transferDialogRef}
            className={styles.transferDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="transfer-title"
            aria-describedby="transfer-description"
            onKeyDown={handleTransferKeyDown}
          >
            <p>ACCOUNT TRANSFER</p>
            <h2 id="transfer-title">一時お気に入りを引き継ぎますか？</h2>
            <p id="transfer-description">
              Account登録だけでは自動で引き継ぎません。現在の{favoriteCount}
              枚をAccountへ保存する場合だけ同意してください。
            </p>
            <div className={styles.dialogActions}>
              <button
                ref={transferConfirmRef}
                type="button"
                onClick={() => completeTransfer(true)}
              >
                同意して{favoriteCount}枚を引き継ぐ
              </button>
              <button type="button" onClick={() => completeTransfer(false)}>
                引き継がずAccountを利用
              </button>
              <button type="button" onClick={() => closeTransfer()}>
                キャンセル
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
