# UI Mock Approval — Favorites v0.9

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/07-approval.md`のCurrent Product-owner-approved Baseline
- UI Mock: `docs/design/ui/mocks/ui-v0.9-favorites.md`
- UI code version / Commit: v0.9 scope manifest hash `64b1f2680d976fb734a882f48882907bbc48fecaf0a68975d55b687c9bdd9c7b`（未Commit差分を含む）
- Screen: SCR-PUB-009
- Flow: UF-007

## Human confirmation scope

- 未登録の一時お気に入りとAccount保存の区別
- 30日保持と利用環境側削除による早期消失可能性
- 追加、解除、取消、Empty、50枚上限
- Account登録時の自動引継ぎ防止と明示同意
- Desktop／Mobile、Keyboard、Accessibility、UI-only境界

## Approved hypotheses

## Known minor findings accepted

## Remaining open questions

## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Memory／Queryの合成状態を本番永続化・認証契約へ無条件に昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は空欄のままHumanへ引き渡す。
