# UI Mock v0.5 — Search Save

Status: Draft / Human approval pending  
Version: `ui-v0.5-search-save`  
Date: 2026-08-13

## Purpose

検索結果を自動履歴化せず、登録利用者が残したい結果だけに概要を入力して明示保存するFlowを検証する。

## Scope

- `/search`検索結果の`検索条件を保存`
- 概要入力、保存対象Preview、未入力・空白・50文字超過Validation
- 保存中、成功、失敗、入力保持、再試行、取消後のFocus復帰
- `次の保存を失敗させる`はUIモック確認専用

## UI-only Boundary

- 保存はComponentのBrowser Memory内だけで模擬し、再読み込みで初期状態へ戻る。
- Account履歴、認証、本番API、DB、外部通信へ接続しない。
- 50文字以内・同名可はRQ-042を検証する暫定値であり、本番仕様ではない。
- 利用者入力はReactのText表示として扱い、HTMLとして解釈しない。

## Traceability

FR-011、FR-039、NFR-PRIV-001、NFR-SEC-004、AC-022、AC-031、RQ-042、SCR-PUB-003、OVL-008、UIR-RESULT-004

## Review Points

- 保存Actionと条件変更・比較Actionの優先順位が理解しやすいか。
- 概要が利用者入力であること、保存対象、UI-only境界を誤認しないか。
- Desktop／Mobile、Keyboard、Focus、Error／Status通知が適切か。
