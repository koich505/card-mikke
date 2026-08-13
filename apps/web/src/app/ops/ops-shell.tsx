"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useOps } from "./ops-provider";
import styles from "./ops.module.css";

const navigation = [
  { href: "/ops", label: "運営Dashboard", active: true },
  { href: "/ops/changes", label: "カード情報差分", active: true },
  { href: "", label: "記事Draft", active: false },
  { href: "", label: "Review Moderation", active: false },
  { href: "", label: "誤情報指摘", active: false },
  { href: "", label: "業務情報", active: false },
  { href: "/ops/account/sessions", label: "Session管理", active: true },
] as const;

export function OpsShell({ children }: { children: ReactNode }) {
  const { authState, operatorEmail, logout, simulateExpiry, simulateReauthExpiry } =
    useOps();
  const pathname = usePathname();
  const router = useRouter();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        mobileMenuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  const closeMobileMenu = ({ restoreFocus = true } = {}) => {
    setMenuOpen(false);
    if (restoreFocus) window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

  const runMobileScenario = (scenario: "idle" | "absolute" | "reauth") => {
    closeMobileMenu({ restoreFocus: scenario === "reauth" });
    if (scenario === "reauth") simulateReauthExpiry();
    if (scenario === "idle" || scenario === "absolute") {
      simulateExpiry(scenario);
    }
  };

  if (authState === "signed_out" || authState === "primary_verified") {
    return (
      <main className={styles.guardPage} id="main-content">
        <section className={styles.guardCard} aria-labelledby="guard-heading">
          <span className={styles.prototypeBadge}>UI-only Mock</span>
          <h1 id="guard-heading">管理者Loginが必要です</h1>
          <p>管理情報は表示していません。合成AccountでLoginしてください。</p>
          <Link className={styles.primaryButton} href="/ops/login">
            管理者Loginへ
          </Link>
        </section>
      </main>
    );
  }

  if (authState === "expired") {
    return (
      <main className={styles.guardPage} id="main-content">
        <section className={styles.guardCard} aria-labelledby="expired-heading">
          <span className={styles.statusChip} data-tone="warning">
            Session expired
          </span>
          <h1 id="expired-heading">Sessionの有効期限が切れました</h1>
          <p>30分間の無操作、または最長12時間の期限を再現したUIモック状態です。</p>
          <Link className={styles.primaryButton} href="/ops/login">
            再Loginする
          </Link>
        </section>
      </main>
    );
  }

  const navItems = (
    <nav aria-label="運営管理ナビゲーション" className={styles.opsNav}>
      {navigation.map((item) =>
        item.active ? (
          <Link
            href={item.href}
            key={item.label}
            aria-current={
              pathname === item.href ||
              (item.href === "/ops/changes" && pathname.startsWith("/ops/changes/"))
                ? "page"
                : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ) : (
          <span key={item.label} aria-disabled="true">
            {item.label}
            <small>後続Mock</small>
          </span>
        ),
      )}
    </nav>
  );

  return (
    <div className={styles.opsApp}>
      <a className={styles.skipLink} href="#main-content">
        本文へ移動
      </a>
      <aside className={styles.sidebar}>
        <Link href="/ops" className={styles.opsBrand}>
          <span aria-hidden="true">C</span>
          <strong>
            カードみっけ
            <small>運営管理 UIモック</small>
          </strong>
        </Link>
        {navItems}
        <div className={styles.sidebarNotice}>
          <strong>UI-only</strong>
          <p>外部送信・保存・公開は行いません。</p>
        </div>
      </aside>

      <div className={styles.opsWorkspace}>
        <header className={styles.opsHeader}>
          <button
            ref={menuButtonRef}
            className={styles.mobileMenuButton}
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-ops-menu"
          >
            {menuOpen ? "メニューを閉じる" : "メニュー"}
          </button>
          <div>
            <small>管理者Account（合成）</small>
            <strong>{operatorEmail}</strong>
          </div>
          <details className={styles.scenarioMenu}>
            <summary>Session状態を確認</summary>
            <button onClick={() => simulateExpiry("idle")}>30分無操作を再現</button>
            <button onClick={() => simulateExpiry("absolute")}>12時間経過を再現</button>
            <button onClick={simulateReauthExpiry}>再認証から15分経過を再現</button>
          </details>
          <button
            className={styles.textButton}
            onClick={() => {
              logout();
              router.push("/ops/login");
            }}
          >
            Logout
          </button>
        </header>
        {children}
      </div>

      {menuOpen && (
        <aside
          ref={mobileMenuRef}
          id="mobile-ops-menu"
          className={styles.mobileSideMenu}
          aria-labelledby="mobile-ops-menu-heading"
        >
          <div className={styles.dialogHeader}>
            <strong id="mobile-ops-menu-heading">運営管理メニュー</strong>
            <button onClick={() => closeMobileMenu()}>閉じる</button>
          </div>
          {navItems}
          <div className={styles.mobileScenarioActions}>
            <strong>Session状態を確認</strong>
            <button onClick={() => runMobileScenario("idle")}>30分無操作を再現</button>
            <button onClick={() => runMobileScenario("absolute")}>
              12時間経過を再現
            </button>
            <button onClick={() => runMobileScenario("reauth")}>
              再認証から15分経過を再現
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
