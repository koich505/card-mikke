# UF-OPS-007 — テーマ別プリセット管理

Status: Implemented in UI Mock v1.2
Date: 2026-10-06
Traceability: FR-040、AC-041、AC-042、SCR-OPS-014、UIR-OPS-011

## Goal

権限を持つ運営者が、テーマの追加・編集・公開・非公開化と利用者向け表示順を確認し、保存済み履歴を上書きしない境界を検証する。

## Flow

1. 管理者Login・MFA後、`テーマ管理`を開く。
2. 既存テーマまたは非公開の新規候補を選ぶ。
3. 名称、説明、表示順、年間利用額、11カテゴリの条件を編集する。
4. 必須値と内訳合計を検証し、DraftをBrowser Memoryへ保存する。
5. Password＋MFAで再認証し、公開または非公開化する。
6. 公開中テーマだけの表示順プレビューと、変更されない保存済み履歴Snapshotを確認する。

## Boundary

認証・認可、API、DB、CMS、本番公開、Route間同期、監査Log・履歴の永続化は実装しない。再読込で初期状態へ戻る。
