# UI Mock v0.1

Status: In progress; human interaction review pending  
Created: 2026-08-10  
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-10 Approved）  
UI code: `apps/web/` working tree（未Commit）

## Purpose

`カード比較くん`の視覚方針、ホームから条件入力・検索結果・比較へ進む主要Flow、Desktop / Mobileの情報密度と状態表現を操作可能なUI-only Mockで検証する。

## Included routes and states

### `/`

- `カード比較くん`の名称と、Warm ivory、Clear gold、Vitamin coralで整理する落ち着きと活気を両立した視覚方針
- 条件検索への主要導線
- 注目のカード3件
- おすすめ特集記事3件
- 新着情報
- Coverage・算定・広告方針のTrust領域
- 完全算定、算定不完全、変更確認中の合成例

Traceability: SCR-PUB-001、UIR-BRAND-001〜003、UIR-HOME-001〜003

### `/search`

- 年間利用額 → 利用先 → 確認の3段階入力
- 11カテゴリ、利用先内訳、`その他の利用`、内訳超過Error
- Desktop左Filter、Mobile全画面Filter Dialog
- 通常年の年間正味還元額順、初年度副表示
- 比較候補追加・解除と固定Comparison Action Bar
- Desktop比較表、Mobile項目別縦比較
- `違いがある項目のみ表示`
- 算定内訳と根拠のPage内開閉

Traceability: SCR-PUB-002〜SCR-PUB-004、UF-001、UIR-COND-001〜003、UIR-RESULT-001〜003、UIR-COMP-001〜003

## UI-only boundary

- 表示は合成Fixtureだけを使用する。
- 入力、Filter、比較はBrowser Memory内だけで動作する。
- DB、API、認証、永続化、Analytics、外部送信を実装しない。
- 実在カード、実在企業、実在Assetを使用しない。
- 抽象券面はCSSで作成する。

## Verification result

| Check | Result |
|---|---|
| `npm run quality` | Pass |
| `npm run audit:dependencies` | Pass、0 vulnerabilities |
| `npm run security:secrets` | Pass、Gitleaks `8.29.0`、no leaks found |
| Desktop structure / interaction | Pass for current scope |
| Mobile 390px structure / interaction | Pass for current scope |
| Major Flow | 条件入力 → 検索結果 → 2枚選択 → 比較を操作確認済み |

## Known limitations and next UI work

- カード詳細画面は未実装。
- Mobile Filter DialogのFocus trapとFocus復帰はBrowser Test追加時に確認する。
- Desktop 3〜5枚比較とKeyboard横Scrollを追加確認する。
- Loading、Empty、Retry、Partial専用画面は未実装。
- 記事、カード詳細、お気に入り、掲載範囲、誤情報指摘FormはSupporting mockで追加する。
- Accountと運営画面はInventoryのみで、詳細IA・Flowは未決定である。
- Screenshotは人間のv0.1操作確認後、修正版の対象Viewportとともに保存する。

## Human feedback requested

- 清潔感と必要な情報量のバランス
- ホームの注目カード、検索導線、記事、新着情報の優先順位
- 条件入力の3段階と情報量
- 検索結果Cardで通常年、初年度、算定状態を理解できるか
- Mobile比較の縦表示が比較判断に使いやすいか
