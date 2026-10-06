# UI Mock v0.9 — お気に入り

Status: Implemented; Attempt 3 independent review passed; human UI approval pending
Date: 2026-10-06
Requirements baseline: `docs/spec/requirements/07-approval.md`のCurrent Product-owner-approved Baseline
Code baseline: `f488244c685bdc683a39522eafea159f8a55850e`を基点とするworking tree

## Purpose

未登録の一時お気に入りとAccount保存の差、追加・解除・取消・Empty・50枚上限、Account登録時の明示同意による引継ぎをHigh-fidelity UI-only Mockで検証する。

## Routes and entry points

- `/favorites`: SCR-PUB-009 お気に入り
- `/favorites?add=<synthetic-card-id>`: 検索結果・カード詳細からの追加結果
- `/favorites?scenario=limit`: 50枚上限のUI確認
- `/favorites?dialog=transfer`: 引継ぎDialogの視覚確認
- Global Header、検索結果、カード詳細から到達できる。

## Implemented content and interaction

- 一時保存／Account保存、現在枚数／上限50枚、保持期限、環境削除による消失可能性を表示する。
- カード条件、状態、確認日、カード詳細導線を表示する。
- 解除、直前解除の取消、Empty、追加候補、50枚時の追加拒否をMemory内で操作できる。
- 引継ぎDialogは同意あり、同意なし、取消、Escape、Focus trap、起点Focus復帰を扱う。
- HeaderはDesktop／Mobileでお気に入りへの現在地を示す。

## Screenshots

- Default Desktop 1440×1000: `screenshots/ui-v0.9-favorites/favorites-desktop-1440x1000.png`
- Default Mobile 393×851: `screenshots/ui-v0.9-favorites/favorites-mobile-393x851.png`
- Transfer Dialog Desktop 1440×1000: `screenshots/ui-v0.9-favorites/transfer-dialog-desktop-1440x1000.png`
- Transfer Dialog Mobile 393×851: `screenshots/ui-v0.9-favorites/transfer-dialog-mobile-393x851.png`

Screenshot SHA-256:

- Default Desktop: `e4713f9a6acaf0c045fd67dc45254d1e907c07c12c0f6936f475566ca6d6749e`
- Default Mobile: `1a8d14ad00160502ca4ea6ae10c73e98438054c31f4928aa3d5caf18c7967b6a`
- Transfer Desktop: `9fd338002b18ddec3a9cbe1dd694080372218d75b70f37f0b4fdd34eb0db7925`
- Transfer Mobile: `aa271264487b8ba0046395c6b7272f1a2e7cb72e345f1ffeb3b4eb5d7671c67b`

4枚ともProduction Buildから取得し、開発用Overlayを含まない。

## UI-only boundary

- 合成FixtureとComponent Memoryだけを使用する。
- Browser storage、Cookie、API、認証・認可、Account登録、外部送信、Analytics、永続化を実装しない。
- Query parameterと表示用型はUI検証専用であり、本番Data Contractではない。

## Traceability

- FR-030、AC-013
- SCR-PUB-009
- UIR-FAVORITE-001〜003
- UF-007

## Verification

| Check | Result |
|---|---|
| `npm run quality` | Pass（format、lint、typecheck、build） |
| 対象Playwright | 18 / 18 Pass（Desktop Chrome／Mobile Chrome） |
| axe自動Accessibility | Defaultと引継ぎDialogのDesktop／Mobileで違反0件 |
| 横Overflow | DefaultのDesktop／Mobileでなし |
| Keyboard | 引継ぎDialogの初期Focus、Focus trap、Escape、起点Focus復帰を確認 |
| Production Screenshot | 2状態 × 2 Viewportを確認 |
| 全UI回帰 | 162 Pass / 6 project-scope Skip |
| `npm run security:secrets` | Pass、Leak 0 |
| `git diff --check` | Pass |

UI code/test scope manifest hash: `64b1f2680d976fb734a882f48882907bbc48fecaf0a68975d55b687c9bdd9c7b`

Manifest再現範囲: `apps/web/src/app/favorites/`、`apps/web/src/app/components/site-header.*`、`apps/web/src/app/search/search-prototype.tsx`、`apps/web/src/app/search/search.module.css`、`apps/web/src/app/cards/[id]/card-detail-view.tsx`、`apps/web/src/app/cards/[id]/card-detail.module.css`、`apps/web/tests/favorites.spec.ts`。

## Promotion boundary

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。一時保持期間、Account引継ぎ、上限判定、認証状態を本番契約へ無条件に昇格しない。
