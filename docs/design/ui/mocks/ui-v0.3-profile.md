# UI Mock v0.3 — Profile edit

Status: Implemented; human UI Mock Approval pending

Created: 2026-08-12

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

UI code baseline: Profile scope manifest hash `74866265ef679d7a667895edbb01ed0f64cb3df3c4d390c4bf0fee1f7aae9cb2`（未Commit差分を含む）

## Purpose

現行`/search`の青系Token、Whiteの情報面、明瞭な枠線、選択Card、金額入力を継承し、登録利用者がProfileの保存値と未保存変更を誤認せず章ごとに更新できるかを検証する。

## Implemented route and states

- `/account/profile`: Login済み合成利用者のProfile編集。
- `利用額・よく使う場所`: Default、変更あり、Validation Error、保存中、保存済み、保存失敗、再試行。
- `あなたについて`: 年齢帯・入会予定時期の単一選択、章単位の保存・取消。
- `ポイントの希望`: 複数選択、`特に希望なし`の排他動作、章単位の保存・取消。
- 共通: 未保存変更の離脱確認、Account Tabと対応Panelの切り替え、Tab間での未保存入力保持。
- `検索・比較履歴`、`データ管理`: 選択時に`モック未作成`の専用Panelを表示し、機能境界を明示。

Traceability: SCR-ACC-002、UF-002、UIR-PROFILE-001〜004、FR-002、FR-003、AC-002

## UI-only boundary

- `PrototypeProfile`は表示検証専用の暫定型であり、Domain Entity、DB Model、API Contractではない。
- 合成Fixtureと架空Serviceだけを使用し、氏名、メール、Credential、Secretを含めない。
- 保存はBrowser Memory内だけで完結し、再読み込みで合成初期値へ戻る。
- 認証、API、DB、Analytics、外部通信、Profile削除、履歴機能、Account管理機能は実装しない。
- `次の保存を失敗させる`はReview用のUIモック専用操作であり、本番UIへ昇格しない。

## Screenshots

- Desktop 1440×1000: `screenshots/ui-v0.3-profile/profile-desktop-1440x1000.png`
- Mobile 390×844: `screenshots/ui-v0.3-profile/profile-mobile-390x844.png`

Screenshotは上部Hierarchy確認用であり、操作可能なSource of Truthは`apps/web/`である。

## Verification

| Check | Result |
|---|---|
| Section save / reset / independent dirty state | Pass |
| Usage validation / save disabled | Pass |
| Save failure / input retention / retry | Pass |
| Unsaved leave Dialog / Focus return | Pass |
| Desktop 1440×1000 / Mobile 390×844 | Pass |
| Profile Playwright Desktop Chrome / Mobile Chrome | 24 tests Pass |
| Repository Playwright Desktop Chrome / Mobile Chrome | 42 tests Pass |
| axe automated accessibility | Pass（Desktop／Mobile、違反0件） |
| `npm run quality` | Pass |
| 変更対象のSecret scan | Pass、Gitleaks `8.29.0`、no leaks found |
| Repository全体のSecret scan | Fail、既存検出18件。今回の追加・変更対象外 |
| `git diff --check` | Pass |

Browser Testは`CARD_MIKKE_TEST_PORT=<unused-port> npm run test:ui`で、既存開発Serverと衝突しないPortを指定して再現できる。

Repository全体のSecret scanは既存文書等の18件を検出する。Profileの追加Source、Fixture、Test、UI文書は個別Scanで`no leaks found`であり、ScreenshotへSecret・Credential・PIIを含めていない。

## Human feedback requested

- 3章と章ごとの保存が、保存済み・未保存の状態を理解しやすくしているか。
- 年間利用額、利用先別金額、架空Serviceの情報量と入力順序が適切か。
- 年齢帯、入会時期、ポイント希望の選択肢と説明が理解しやすいか。
- Desktop／MobileでAccount TabとPanelの対応が分かりやすく、長いFormを無理なく操作できるか。
- UI-only、利用目的、保存対象外項目の説明が十分に目立つか。

## Approval boundary

人間による確認前のため未承認である。承認者、承認日、`UI Mock Approved`は`docs/design/ui/approvals/ui-mock-profile-v0.3.md`で空欄のまま保持する。
