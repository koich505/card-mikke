# UI Mock v0.7: カード比較

Status: Independent review complete / Human approval pending
Requirements baseline: FR-016 / FR-029 / AC-012
Code location: `apps/web/src/app/search/comparison-view.tsx`
Requirements revision: `5d116ff1526360e6a7bb616da1b4d8670a432c30`
UI code revision: uncommitted working tree based on `5d116ff1526360e6a7bb616da1b4d8670a432c30`（Agentはcommitしない）
Screenshot revision: 2026-10-06の同一working tree
Artifact manifest: `docs/reviews/ui/comparison-v0.7-artifact-manifest.sha256`
Manifest SHA-256: `5b06f9c16c147c20d6daae422f749966ddb74569fab41d5dc8b19cd5b104f90f`

Screenshots:

- `docs/design/ui/mocks/screenshots/ui-v0.7-comparison/comparison-desktop-1440x1000.png`
- `docs/design/ui/mocks/screenshots/ui-v0.7-comparison/comparison-mobile-390x844.png`
- `docs/design/ui/mocks/screenshots/ui-v0.7-comparison/comparison-mobile-rows-390x844.png`

取得条件:

- Desktop: CSS viewport 1440×1000、DPR 1、Viewport crop。
- Mobile: CSS viewport 390×844、DPR 1、Viewport crop。1枚目はカード操作、2枚目は項目別比較行へScrollした状態。

## Scope

- 検索結果または検索・比較履歴から選択した2〜5枚の比較
- 共通の入力条件、通常年・初年度の年間正味還元額、必須比較項目、算定状態、確認日・適用期間
- Desktopのカード列・比較項目行の表と、Mobileの項目単位の縦表示
- `違いがある項目だけ表示`、個別解除、入替、全解除確認
- 算定内訳、対象外項目、計算上の仮定、Evidence
- Loading、一部取得失敗、全面取得失敗、再試行、比較対象不足
- 5枚比較、6枚目の追加拒否理由と解除方法、長い商品名・長文条件

## Fixture and boundary

カード、Issuer、金額、条件、Campaign、申込経路、EvidenceはすべてUI検証用の合成Fixtureである。比較表示は既存のUI-only計算関数から生成し、本番API、DB、永続化、外部通信または本番Data Contractを実装しない。

比較表示モデルは`apps/web/src/features/search/comparison-prototype.ts`に分離し、Domain Entity、永続化Model、API Contractとして使用しない。

## Interaction

- 検索結果へ戻っても比較候補を保持する。
- 個別解除により2枚未満になった場合は、追加選択を案内する。
- 全解除は確認Dialogを経由し、取消時は起点ButtonへFocusを戻す。
- 全解除はNative modal dialogを使用し、Tab / Shift+TabをDialog内で循環させ、Escapeで閉じる。
- Loadingと一部取得失敗は`UIモックの状態を確認`から再現する。
- 一部取得失敗では対象カードの金額、比較項目、算定内訳、Evidenceを一貫して未取得表示とし、保持値や推測値で補完しない。
- 開示状態は`公式確認済み相当`、`一部未確認`、`非公開`、`確認できず`の日本語で表示し、一般画面状態と分離する。
- Campaignは実施回、登録、対象利用、判定、付与の各期間を分離して表示する。
- 商品情報状態とScenario固有の算定状態を分離し、算定不完全時は過小評価・順位変動可能性を閉じない領域へ表示する。

## Responsive behavior

- Desktopでは比較領域に固定高を設けず、すべての比較項目をページ上へ縦展開する。3〜5枚では横Scrollのみ許容し、比較項目は左側へ追従させる。
- Mobileでは横Scrollを主要操作にせず、比較項目ごとにカードを縦表示する。
- 200%文字拡大時にPage全体の横Overflowを発生させない。

## Validation hypotheses

- 利用者が金額差だけでなく、算定状態・条件・確認時点の差を説明できる。
- 算定不完全と変更確認中を確定額として誤認しない。
- Mobileでも項目ごとの差を往復せず確認できる。
- 算定内訳とEvidenceを必要時に確認しつつ、重要な状態は閉じた領域へ隠れない。

## Verification

- `npm run lint`
- `npm run typecheck`
- `CARD_MIKKE_TEST_PORT=<unused-port> npm run test:ui -- tests/comparison.spec.ts`
- `npm run quality`
- `npm run security:secrets`
- `npm audit --omit=dev --audit-level=high`

実行結果（2026-10-06）:

- `npm run quality`: Pass
- `CARD_MIKKE_TEST_PORT=3124 npx playwright test tests/comparison.spec.ts --workers=1`: 10 Pass / 6 Project-scope Skip
- Modal Focus反復: Desktop Chrome 10 / 10 Pass（Tab / Shift+Tabを3周、Escapeと起点復帰）
- Desktop Chrome / Mobile Chrome: axe違反0、Page Overflowなし
- Chrome Desktop: 比較項目の全縦展開、横Scroll、Sticky Row Header、Modal Keyboard Flowを確認
- `npm run security:secrets`: Pass（既存調査文書の期限切れ署名Queryを除去後）
- `npm audit --omit=dev --audit-level=high`: Pass、Production依存の脆弱性0件
- 関連回帰（Account history / Comparison / Search save）: 30 Pass / 6 Project-scope Skip
- Repository全体では既存Operations Session testの不安定さが比較機能と独立して残るため、比較UIの完了判定から分離して記録する。
- Full auditに残る開発時Glob解析のHighはReview記録で影響評価する。

Browser確認範囲はUI Mock段階ではChrome Desktop / Mobileとする。Firefox、Safari相当、Edgeは本番昇格前のFeature Specification / Gate 4で追加確認し、未確認のまま本番対応済みとは扱わない。

## Promotion boundary

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、Component、CSS、比較表示モデル、Fixture、状態再現Controlを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。合成Fixture、UI-only計算、状態再現Controlを本番へ無条件に昇格させない。
