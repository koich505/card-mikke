# UI Mock Approval — Account v0.4

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）
- UI Mock: `docs/design/ui/mocks/ui-v0.4-account-history-data.md`
- UI code version / Commit: Account v0.4 scope manifest hash `034c80d55eab63bd75e4261133fca3e059f2eb4e68ac0be18cf4f37b87d3361d`（未Commit差分を含む）
- Screens: SCR-ACC-003、SCR-ACC-004
- Flows: UF-003 Search and comparison history、UF-004 Account data management

## Human confirmation scope

- Desktop／MobileのAccount Tab、履歴一覧、詳細展開、Empty状態
- 当時の合成計算記録と現在情報による再検索・比較再表示の区別
- 履歴単体削除、一括削除、失敗、再試行、Focus復帰
- 履歴とAccountの削除範囲、削除期限、保持例外
- Account削除の三段階確認、完了表示、Review用初期状態復帰
- UI-only境界、合成Fixture、外部送信・永続化・実削除を行わないこと

## Approved hypotheses

## Known minor findings accepted

## Remaining open questions

## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Fixture、暫定型、Browser Memory処理、失敗切替、Review用復帰は無条件に本番へ昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は人間だけが記入する。
