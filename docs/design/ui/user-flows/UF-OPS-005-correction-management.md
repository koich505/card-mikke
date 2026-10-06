# UF-OPS-005 — 誤情報指摘管理

Status: Implemented in UI Mock v1.1
Date: 2026-10-06
Traceability: FR-022、FR-026、AC-017、AC-023、AC-040、SCR-OPS-007、UIR-OPS-009

## Goal and flow

1. 未確認の指摘を選び、受付内容と着手目標を確認する。
2. 公式Source確認を開始し、対象・適用時期・Rule versionを確認する。
3. 修正対応または却下を選び、判断理由を含むDraftを保存する。
4. 再認証後に判断を確定する。修正案はカード情報差分の確認・承認へ送り、直接公開しない。

実在連絡先、外部送信、公開反映、永続化を扱わない。
