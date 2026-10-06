# UF-OPS-004 — Review Moderation

Status: Implemented in UI Mock v1.1
Date: 2026-10-06
Traceability: FR-036〜FR-039、AC-028〜AC-031、AC-040、SCR-OPS-006、UIR-OPS-008

## Goal and flow

1. 確認候補または公開後通報を選ぶ。
2. 本文、評価、現在の公開状態、自動判定候補、通報時点を確認する。
3. 判定失敗時は状態を維持して再試行する。
4. 判断理由を入力し、公開承認／掲載継続／一時非公開／削除を選ぶ。
5. Password＋MFA再認証後に判断をterminal化し、監査Eventを確認する。

通報件数だけの自動非公開・虚偽確定、判定情報の利用者公開、外部公開・削除・永続化を行わない。
