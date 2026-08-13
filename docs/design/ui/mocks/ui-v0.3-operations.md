# UI Mock v0.3 — Operations source change approval

Status: Implemented; human UI Mock Approval pending

Created: 2026-08-12

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

UI code/test scope SHA-256: `9a1846ae56f654d0a7e9ed046f5efd5e61a7d431205f3b57332808d2bc3592e7`

Reproduction command: `find apps/web/src/app/ops apps/web/src/fixtures/ops.ts apps/web/src/types/ops-prototype.ts apps/web/tests/operations.spec.ts apps/web/playwright.config.ts -type f -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256`

## Purpose

管理者Login・MFA・Session管理と、`Dashboard → 公式Source差分 → 提案編集 → 最終確認 → 提案単位の採用／却下`をHigh-fidelity UI-only Mockで検証する。

## Implemented routes and states

- `/ops/login`: 合成Accountによる一次認証と入力Error。
- `/ops/mfa`: 6桁MFAと失敗状態。
- `/ops/mfa/recovery`: MFA喪失時の本人確認・要素変更・通知境界。
- `/ops`: Dashboard Default。`scenario=loading|empty|error`で一般画面状態を確認できる。
- `/ops/changes/change-20260812-001`: Source・差分確認から提案編集、提案単位の採用／却下までを同一画面で行う。追加、変更、削除候補、変更なし、抽出不能を表示する。
- `/ops/changes/change-20260812-002`: 管理項目がすべて変更なしの一括確認。
- `/ops/changes/change-20260812-003`: 影響範囲不明とRevision競合によるBlock。
- `/ops/changes/change-20260812-004`: 判断確定、監査前後値、確定後キュー遷移を確認する単純差分。
- `/ops/account/sessions`: Session確認、個別・一括失効、再認証。

## Interaction and safety boundary

- `/ops`Layout内のClient Providerで認証、Session、Draft、Audit Eventを保持し、再読込時に未Loginへ戻す。
- 合成メールは`.invalid`、Passwordは12文字以上、MFAは任意の6桁だけをUI検証条件とする。
- 管理者Session最長12時間、無操作30分、再認証15分は待機せずScenario操作で確認できる。
- Source本文、Script文字列、危険URLをReact Textとして表示し、外部Link、HTML、Commandとして実行しない。
- 変更対象カード、差分概要、変更提案件数、HTML取得元の公式Source情報を1つの「差分情報」カードにまとめる。変更提案一覧の見出しは独立したカードにしない。
- HTMLの変更箇所は初期状態で閉じ、展開時に変更前・変更後を折り返し表示して色分けする。
- Campaignの付与額、対象条件、上限、付与時期、Beneficiaryを分け、Source記載消失を`undisclosed`ではなく`unknown`として扱う。
- 提案ごとに、変更は現在値と変更後の提案値、追加は新しい提案値、削除候補は削除内容を表示する。判断根拠メタデータは常時表示しない。
- 抽出不能またはclaim単位の影響範囲不明は判断確定をBlockする。候補却下には理由と前回値の扱いを要求する。
- 提案値はユーザーが直接編集でき、修正した値をそのまま採用できる。各提案内のButtonで「採用（情報を更新する）」または「却下（情報はそのまま）」を確定し、成功後は未処理一覧から除外して処理済み一覧へ移す。
- 採用・却下時は認証情報を求めず、対象項目、現在値、更新後の値、処理内容を最終確認Dialogに表示する。提案ごとの前後値と判断を監査Eventへ残す。
- UI Mock上の承認・Session操作は外部送信、永続化、本人確認、公開、計算更新を行わない。

## Responsive and visual direction

- 公開画面のTokenを継承しつつ、白・Neutral・Navy中心の業務優先デザインとする。
- Desktopは固定Sidebarと高密度な比較、Mobileは開閉式の非モーダルSide Navigationとclaim縦Cardを使用する。
- Diff、Disclosure Status、一般画面状態をColorだけでなく明示Textと枠線で区別する。

## Verification result

- `npm run quality`: Pass（Prettier、ESLint、TypeScript、Next.js production build）。
- `npm run test:ui`: Mobile Navigationを非モーダルSide Navigationへ変更し、差分確認・編集画面を統合後、50件 Pass。変更提案表示の簡略化後は、実行環境のChrome起動制約により未再実行。
- axe: Operations主要画面を含むUI Test内でPass。
- Source Text: 命令風文字列、HTML、Script、危険URLをTextとして表示し、外部Anchorおよび外部Requestがないことを確認した。
- Responsive: 1440×1000と390×844で目視確認し、Mobile横Overflowなし、Desktop/Mobile Navigation切替を確認した。
- `npm audit --audit-level=high`: 0 vulnerabilities。
- 変更範囲Secret scan: Pass。
- Repository全体Secret scan: 既存の`docs/research/`由来18 findingsが残るため、Gate 2はPass扱いにしない。既存findingの解消またはHuman承認済み例外を待つ。

## Review captures

- `screenshots/ui-v0.3-operations/operations-dashboard-desktop-1440x1000.jpg`
- `screenshots/ui-v0.3-operations/operations-change-review-mobile-390x844.jpg`

## Approval boundary

本Mockは人間による確認前であり未承認である。Fixtureと暫定型は本番Data Contractではなく、Gate 3前のPromotion Assessmentなしに本番利用しない。

## Open questions carried forward

- Payment Instrument / Payment Scheme / Funding Method / Credit Provider、Member Reward / Partner Revenue Share、Product / Feature Lifecycleの代表的な差分Scenarioをv0.3へ追加するか、後続Operations Mockへ持ち越すか。Owner: Product owner / Domain owner、期限: UI Mock Approval前のcoverage方針確認、Blocking: No（今回Fixtureでこれらを統合・推論してはいない）。
- `concept`と`scope`はUI表示用自由Textであり、本番Contractへ昇格しない。Owner: Feature Planning / Human architect、期限: Gate 3のPromotion Assessment、Blocking: No。
