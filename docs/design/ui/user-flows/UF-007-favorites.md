# UF-007 — お気に入りの一時保存とAccount引継ぎ

Status: Implemented in UI Mock v0.9
Date: 2026-10-06
Traceability: FR-030、AC-013、SCR-PUB-009、UIR-FAVORITE-001〜003

## Goal

未登録利用者が検討中カードを一時お気に入りとして確認・解除でき、一時保存とAccount保存を誤認せず、Account登録時は明示同意した場合だけ引き継げることを検証する。

## Primary flow

| Step | User action | Expected UI result |
|---|---|---|
| 1 | 検索結果またはカード詳細で一時お気に入りを選ぶ | 対象カードを含むお気に入り画面へ移り、追加結果とAccount未保存を通知する |
| 2 | お気に入り一覧を確認する | 保存区分、枚数／50枚、カード条件、状態、確認日を確認できる |
| 3 | カードを解除する | 対象だけを一覧から除き、結果と取消Actionを通知する |
| 4 | 解除を取り消す | 元の位置へ戻し、取消結果を通知する |
| 5 | Account登録時の引継ぎを確認する | 自動引継ぎではないこと、対象枚数、3つの選択肢をDialogで示す |
| 6a | 同意して引き継ぐ | 一時分をAccount保存として表示し、引継ぎ件数を通知する |
| 6b | 引き継がずAccountを利用する | 一時分をAccountへ移さず、Account側をEmptyとして表示する |

## Alternate and boundary flows

- 0件ではEmpty説明とカード探索Actionを表示する。
- 50枚時は追加を拒否し、解除が必要であることを通知する。
- 利用環境側のデータ削除または端末変更では30日未満でも消失しうることを表示する。
- DialogのキャンセルまたはEscapeでは一時お気に入りを変更せず、起点へFocusを戻す。

## UI-only boundary

- 合成カードだけを使用する。
- `add`、`scenario`、`dialog` Queryは状態検証用であり、本番Data Contractではない。
- Browser storage、Cookie、API、認証、Account登録、外部送信、Analytics、永続化を実装しない。
