# UF-004 — Account data management

Status: Implemented in UI Mock v0.4; human approval pending

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

Traceability: SCR-ACC-004、FR-025、NFR-PRIV-003、NFR-PRIV-004、AC-004

## Preconditions

- Login済み利用者、Profile、検索・比較履歴、Account概要を合成Fixtureで表現する。
- 削除はBrowser Memory内の合成状態だけを変更し、本番認証、API、DB、Logoutを実行しない。

## History deletion flow

1. Account Tabで`データ管理`を選択する。
2. 履歴件数を確認する。
3. `検索・比較履歴をすべて削除`を選択し、ProfileとAccountへ影響しないことをDialogで確認する。
4. 実行後、履歴件数が0件となり、履歴PanelがEmpty状態になることを確認する。

## Account deletion flow

1. Danger Zoneで削除対象、削除期限、保持例外を確認する。
2. 影響範囲確認Checkboxを選択し、確認文字列`削除する`を入力する。
3. 最終確認DialogでAccount削除を実行する。
4. Profileと履歴が利用不能となった想定の完了Panelを確認する。
5. Reviewを継続する場合だけ`合成初期状態へ戻す`を選択する。

## Failure and retention

- `次の削除操作を失敗させる`では確認入力を保持し、失敗理由と再試行Actionを表示する。
- 削除完了直後から利用不能、通常領域24時間以内、Backup 30日以内の削除期限を表示する。
- 仮名化不正防止情報90日、直接紐付けを外したModeration・通報処理Metadata 3年の保持例外を表示する。

## Boundary

- 実際の削除、Logout、認証情報変更、削除Job監視は実装しない。
- 再読み込みまたはReview用復帰Actionで合成初期状態へ戻る。
