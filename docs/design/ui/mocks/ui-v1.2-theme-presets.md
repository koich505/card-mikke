# UI Mock v1.2 — Theme Presets

Status: Implemented; independent review passed; Human UI Approval pending
Date: 2026-10-06
Requirements baseline: `docs/spec/requirements/07-approval.md`、FR-040、AC-041、AC-042

## Purpose

テーマ別プリセット検索と運営者向けテーマ管理をHigh-fidelity UI-only Mockとして検証する。

## Routes and entry points

- `/`: 公開中テーマを指定順で表示
- `/search?theme=<published-id>`: テーマ条件を適用した検索結果
- `/ops/themes`: SCR-OPS-014 / UF-OPS-007

## Implemented interactions

- `旅行好き`、`ショッピング好き`、`シンプルでお得重視`を1回選択して検索結果へ遷移する。
- 選択テーマ、年間利用額、利用先内訳、今回検索限定・Profile非更新を表示し、通常検索画面で条件を変更して再検索する。
- 非公開・不明テーマの直指定を適用せず、通常検索を案内する。
- 運営者が名称、説明、表示順、検索タイプ、年間利用額、11カテゴリ金額・Service条件を追加・編集し、Draft保存後に再認証して変更公開・新規公開・非公開化する。
- 公開順プレビューと保存済み履歴Snapshotを分離する。

## State coverage

- 公開テーマ、公開中Snapshotと編集Draft、非公開テーマ、新規非公開候補
- 必須入力Error、年間利用額未満Error、Draft保存、公開、非公開化
- 有効テーマ結果、条件変更済み、不明・非公開テーマ
- 保存済み履歴の当時条件・当時計算結果

## UI-only boundary

合成FixtureとReact Memoryだけを使用する。Profile、Cookie、Browser storage、API、DB、CMS、外部通信、Analytics、本番公開、Route間同期、履歴永続化は行わない。

## Verification

| Check | Result |
|---|---|
| `npm run quality` | Pass |
| 対象Playwright | 16 / 16 Pass（Desktop Chrome／Mobile Chrome） |
| 全Playwright | 202 Pass / 6 Skip / 0 Fail |
| Secret scan | Pass（漏えい検出0件） |
| Keyboard | 公開テーマ選択、条件変更、管理Form、再認証をKeyboard操作可能 |
| axe | 新規テーマ適用Panelとテーマ管理のDesktop／Mobileで違反0件 |
| 横Overflow | 対象公開・管理画面のDesktop／Mobileでなし |
| Security / persistence | 非公開直指定拒否、noindex、Cookie／storage 0件を確認 |

Artifact manifest: `docs/reviews/ui/theme-presets-v1.2-artifact-manifest.sha256`（SHA-256 `f1a9d5eeed2cf9c48cc934e70c08431ee57473a6e7f6de35d0d6b23155d13777`）

## Screenshots

`docs/design/ui/mocks/screenshots/ui-v1.2-theme-presets/`に、ホーム、テーマ適用結果、テーマ管理のDesktop／Mobileを保存した。

| File | SHA-256 |
|---|---|
| `desktop-home.png` | `e69feede7ee489842f34fa4339b257f2cb0b36e4a8bc952d0eb24b7ef2c9d844` |
| `desktop-result.png` | `93293a56d08cf7c402597e9bb3b1756aa4288660d68c9535339da823cff1cf67` |
| `desktop-ops.png` | `43c2810b45d74ba1c539b64c702fc52ffaa8fb807a1618bdb3d863d68e345daa` |
| `mobile-home.png` | `ad7eb5bcb788b6d878d2e5bb074003f0e693c2f839db166f6866dfe08caed71e` |
| `mobile-result.png` | `7e36162ca4e84ad7bd31f44b7d9430f3184c49cdd9de5643494a01dfc3fdaaba` |
| `mobile-ops.png` | `b267a49d1b755813094f9bf5c19c8362c19a670ff0da466d243e653fbbac05e0` |

## Traceability

- SCR-PUB-001 / UF-011 / UIR-HOME-004: FR-004、FR-005、FR-013、FR-014、FR-040、AC-041
- SCR-OPS-014 / UF-OPS-007 / UIR-OPS-011: FR-040、AC-041、AC-042

## Promotion boundary

Human UI Approval後、Feature Specification作成後かつTechnical Plan確定前に`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`を評価する。Fixture、暫定型、Memory状態、再認証、公開操作、履歴Snapshotを本番契約へ無条件に昇格しない。本番昇格時は非公開テーマを匿名Client bundleへ含めず、認証・認可済みServer経由で取得する。
