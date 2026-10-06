# UF-010 — Save / Account Prompt

Status: Implemented in UI Mock v1.1
Date: 2026-10-06
Traceability: FR-001、FR-010、FR-011、AC-001、AC-022、OVL-007、UIR-ACCOUNT-PROMPT-001

## Goal

未登録利用者が検索・比較を完了した後、保存を希望した時点だけAccountの価値と保存境界を理解できることを検証する。

## Flow

1. 検索結果で`検索条件を保存`を選ぶ。
2. Promptで、未登録でも検索・比較できること、現時点では保存されていないことを確認する。
3. `今回は保存しない`では閉じて起点へ戻る。`Login・登録へ進む`では利用者認証へ進む。
4. UIモック専用の登録済み状態を選んだ場合だけ、既存の検索条件保存Dialogへ進む。

## Boundary

認証、Cookie、Browser storage、外部通信、永続化、自動移行を行わない。
