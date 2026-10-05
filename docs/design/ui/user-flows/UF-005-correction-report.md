# UF-005: 公開情報の誤り・変更を指摘する

Status: Implemented in UI Mock v0.6; human approval pending

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-13 Approved baseline; RQ-037 disposition pending baseline reapproval）

Last updated: 2026-08-14

## Goal

利用者、カード会社その他の関係者が、Account登録なしで閲覧中のカード・記事・公開ページを特定し、誤りまたは変更と把握している根拠を安全に知らせる。

## Related Requirements

- FR-026
- NFR-SEC-004
- NFR-EVID-004
- AC-023

## Main flow

| Step | User action | UI response |
|---|---|---|
| 1 | カード詳細のEvidence、記事の注意事項、または公開画面Footerで`誤情報を指摘`を選ぶ | 対象Typeと合成Fixture IDを付けてFormへ遷移する |
| 2 | 対象と掲載項目を確認する | Queryの表示名を使わず合成Fixtureから対象を解決し、掲載項目だけ編集可能にする |
| 3 | 指摘内容と根拠を入力し、必要な場合だけメールを入力する | 各用途の上限、メール用途、Secret・不要な個人情報を入力しない案内を示す |
| 4 | `この内容で指摘する`を選ぶ | 空白、上限、メール形式を検証し、不正時はError summaryを表示して最初の項目へFocusを移す |
| 5 | Validationを通過する | 二重操作を止める処理中状態を経て、同一画面内の受付完了へ切り替える |
| 6 | 合成受付番号と連絡条件を確認する | メール有無に応じた連絡可否と、UI-onlyで送信・保存しない境界を示す |
| 7 | 指摘したページへ戻る | 解決済みの対象Hrefだけを使って遷移元へ戻る |

## Validation and recovery

- 掲載項目100文字、指摘内容1,000文字、根拠1,000文字、メール254文字を上限とする。
- 必須項目の空白のみ、上限超過、不正なメール形式では受付完了へ進まない。
- 未知または不正な対象Type / IDではFormを表示せず、該当ページの入口から開き直すよう案内する。
- 入力内容は再読込時に破棄し、外部送信、メール送信、永続化を行わない。

## Accessibility expectations

- 全項目と送信をKeyboardだけで操作できる。
- Error summary、項目Error、受付完了を支援技術へ通知する。
- Error時は最初の不正項目、完了時は完了見出しへFocusを移す。
- Desktop／Mobileで本文、Error、Focusが固定要素に隠れず、横Overflowがない。

## Approval boundary

UI-onlyの合成受付処理であり、本番送信先、API、DB、メール、Moderation処理、回答期限を確定しない。UI Mock Approvalと本番Promotion Assessmentは別に行う。
