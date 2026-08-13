# UF-003 — Search and comparison history

Status: Implemented in UI Mock v0.4; human approval pending

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

Traceability: SCR-ACC-003、FR-011、FR-025、NFR-PRIV-004、AC-004、AC-022

## Preconditions

- Login済み利用者と3件の検索・比較履歴を合成Fixtureで表現する。
- 履歴、当時の計算結果、日時、比較対象は実在利用者や実取引を表さない。
- 本番API、DB、外部送信、永続化は存在しない。

## Primary flow

1. Account Tabで`検索・比較履歴`を選択する。
2. 新しい順の履歴から、検索日時、年間利用額、利用先、結果件数、比較枚数を確認する。
3. `条件を確認`で当時の入力条件、合成計算結果、計算時点、根拠確認時点を展開する。
4. `現在の情報で再検索`または`比較を再表示`を選択する。
5. Search画面で、当時の合成記録ではなく現在のUIモック情報による再計算であることを確認する。

## Delete and recovery

- `この履歴を削除`は確認Dialogを表示し、取消時は起点ButtonへFocusを戻す。
- 成功時は対象だけをBrowser Memoryから除き、ほかの履歴とProfileへ影響させない。
- `次の履歴削除を失敗させる`では入力を保持し、理由と再試行Actionを表示する。
- 全件削除後はEmpty状態と検索入口を表示する。

## Boundary

- 当時の計算結果は合成Fixtureであり、本番Snapshot Contractや再計算Logicではない。
- 最新情報との差分計算、履歴追加、Pagination、Sort変更は実装しない。
- 再読み込み後は3件の合成初期履歴へ戻る。
