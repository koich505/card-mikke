# UI Mock v0.4 — Account history and data management

Status: Implemented; human UI Mock Approval pending

Created: 2026-08-12

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

UI code baseline: Account v0.4 scope manifest hash `034c80d55eab63bd75e4261133fca3e059f2eb4e68ac0be18cf4f37b87d3361d`（未Commit差分を含む）

## Purpose

Profile v0.3のAccount Tabを拡張し、当時の検索・比較記録と現在情報による再計算の区別、履歴削除、Account削除の影響範囲・期限・保持例外を理解できるか検証する。

## Implemented route and states

- `/account/profile`: Profile、検索・比較履歴、データ管理を単一Tab Panelとして表示。
- `検索・比較履歴`: Default、詳細展開、現在情報で再検索、比較再表示、単体削除、削除中、成功、失敗、再試行、Empty。
- `データ管理`: 履歴一括削除、Account削除三段階確認、削除中、成功、失敗、再試行、完了。
- `/search`: 履歴条件による現在情報の再計算通知、2〜5枚の検証済み比較対象による比較画面初期表示、不正QueryのFallback。

Traceability: SCR-ACC-003、SCR-ACC-004、UF-003、UF-004、FR-011、FR-025、NFR-PRIV-003、NFR-PRIV-004、AC-004、AC-022

## UI-only boundary

- 履歴、当時の計算結果、日時、データ概要は合成Fixtureであり、本番Snapshot、Domain Entity、DB Model、API Contractではない。
- 状態変更はBrowser Memory内だけで完結し、再読み込みで合成初期値へ戻る。
- 本番認証、API、DB、Logout、削除Job、Export、Analytics、外部通信を実装しない。
- `次の履歴削除を失敗させる`、`次の削除操作を失敗させる`、`合成初期状態へ戻す`はReview専用操作であり、本番UIへ無条件に昇格しない。

## Requirements alignment

- 検索・比較履歴はAccountが有効な間、利用者が削除するまで保持する方針を表示する。
- Account削除直後から対象を利用不能とし、通常領域24時間以内、Backup 30日以内に削除する期限を表示する。
- 不正防止に限定した仮名化情報90日、個人との直接紐付けを外したModeration・通報処理Metadata 3年の保持例外を表示する。
- 当時の合成計算記録とSearch側の現在情報による再計算通知を別の面・Textで表示する。

## Screenshots

- History Desktop 1440×1000: `screenshots/ui-v0.4-account-history-data/history-desktop-1440x1000.png`
- History Mobile 390×844: `screenshots/ui-v0.4-account-history-data/history-mobile-390x844.png`
- Data management Desktop 1440×1000: `screenshots/ui-v0.4-account-history-data/data-desktop-1440x1000.png`
- Data management Mobile 390×844: `screenshots/ui-v0.4-account-history-data/data-mobile-390x844.png`

ScreenshotはHierarchy確認用であり、操作可能なSource of Truthは`apps/web/`である。

## Verification

| Check | Result |
|---|---|
| History expand / current search / compare launch | Pass |
| Invalid compare Query fallback | Pass |
| Single / bulk history delete, cancel, failure, retry, Empty | Pass |
| Account delete confirmation, failure, completion, reset | Pass |
| Desktop 1440×1000 / Mobile 390×844 | Pass |
| Account v0.4 Playwright Desktop / Mobile Chrome | 14 tests Pass |
| Repository Playwright Desktop / Mobile Chrome | 56 tests Pass |
| axe automated accessibility | Pass（Desktop／Mobile、違反0件） |
| 200% text / horizontal overflow | Pass |
| `npm run quality` | Pass |
| 変更対象のSecret scan | Pass、Gitleaks `8.29.0`、no leaks found |
| `git diff --check` | Pass |

## Human feedback requested

- 当時の合成記録と現在情報の再計算が混同されないか。
- 検索のみ／比較あり、履歴詳細、削除Actionの優先順位が分かりやすいか。
- Profile、履歴、Account削除の影響範囲と期限、保持例外を理解できるか。
- Account削除の三段階確認が過不足なく、Mobileでも完了できるか。
- UI-only境界とReview専用操作が十分に識別できるか。

## Approval boundary

人間による確認前のため未承認である。承認者、承認日、`UI Mock Approved`は`docs/design/ui/approvals/ui-mock-account-v0.4.md`で空欄のまま保持する。
