# UF-OPS-001: 公式Source差分の確認・承認

Status: Implemented in UI-only mock v0.3; human approval pending
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

## Goal

権限を持つ運営者が、AI支援で抽出された公式Sourceの変更候補を未信頼Draftとして確認し、claimごとに編集・判断した後、明示的な再認証と承認を経て公開反映可能な状態へ進める。

## Primary flow

1. 管理者が合成メールアドレスと12文字以上の合成Passwordを入力する。
2. 一次認証後、任意の6桁合成MFAコードを入力する。
3. Dashboardで未承認Draft、期限、失敗状態を確認する。
4. Dashboardから公式Source差分一覧を開き、未処理・処理中の変更Revisionを検索・絞り込みして対象を開く。
5. 統合された差分確認・編集画面で、変更対象カード、差分を検知した公式SourceのHTML取得情報、5種類の変更提案を確認する。
6. 同じ画面で提案ごとに現在値と変更後の値、追加値または削除内容を確認し、必要なら提案値を編集する。
7. 「採用（情報を更新する）」または「却下（情報はそのまま）」を押し、認証情報を求めない最終確認Dialogで対象項目・現在値・更新後の値・処理内容を確認する。
8. 処理成功後、その提案を未処理一覧から除外し、処理済み一覧と監査Timelineへ前後値・判断を表示する。
9. UI-onlyのため外部公開・永続化はしない。

## Alternate and failure flows

- Login入力が不正: 合成メールまたはPassword条件を示し、MFAへ進めない。
- MFA入力が不正: 6桁入力を求め、Dashboardを表示しない。
- MFA喪失: 本人確認、認証要素変更、監査、通知の回復手続き案内へ進む。
- Session expired: 管理内容を隠し、再Loginを要求する。
- Dashboard Loading / Empty / Error: 未確定件数を推測せず、再試行または正常状態へ戻れる。
- 抽出不能 / claim単位の影響範囲不明: 当該提案の採用をBlockし、却下または再収集・再確認へ戻す。
- 候補却下: 提案単位で却下し、現在値は変更しない。
- 影響範囲不明 / Revision競合: 当該提案の採用を無効化し、再収集・確認へ戻す。
- 再認証取消・失敗: 提案を一覧に残して再試行できる。
- Session個別・一括失効: 再認証を要求し、現在Sessionを失効した場合は管理内容を隠す。
- 再認証から15分超過: 高Risk操作で再認証を再要求する。
- 全Session失効後の再Login: Login・MFAを省略せず、新しいcurrent Sessionを作る。

## UI-only boundary

- 認証状態、Draft、Session、監査EventはReact stateだけで保持し、再読込で消去する。
- 実Credential、PII、Secretを使用しない。
- Source文字列をHTML、Command、URL、外部通信として実行しない。
- DB、API、本番認証、AI収集、公開、計算更新、監査Log永続化を行わない。

## Traceability

- FR-021, FR-022, FR-024, FR-032–FR-034, FR-039
- NFR-SEC-001, NFR-SEC-003, NFR-SEC-007, NFR-SEC-008
- AC-017, AC-018, AC-025, AC-026, AC-031, AC-040
