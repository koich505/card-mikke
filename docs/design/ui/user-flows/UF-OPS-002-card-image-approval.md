# UF-OPS-002: 券面画像確認・承認

## Goal

AI取得候補を未公開Draftとして確認し、許諾・対応条件・代替Textが揃った画像だけを再認証後に明示承認する。

## Main flow

1. 管理者Login・MFA後、`/ops/card-images`へ進む。
2. CSS合成券面とカード名称、Brand・Variant、Source、取得日、利用条件、期間、差分を確認する。
3. 代替Textを編集してDraft保存する。許諾不明は承認Blockedとする。
4. Password＋MFAで再認証し、UI-only公開承認を完了する。
5. 却下は理由必須とし、本体30日・metadata 3年の保持境界を確認する。
6. 差替え・無効化後も旧版と適用期間の履歴を確認する。

## Boundary

実Asset、AI収集、外部公開、永続化、監査Log保存を行わない。

Traceability: FR-035、AC-027、AC-040、NFR-SEC-003、NFR-SEC-007
