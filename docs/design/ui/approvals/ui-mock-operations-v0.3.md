# UI Mock Approval — Operations v0.3

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）
- UI Mock: `docs/design/ui/mocks/ui-v0.3-operations.md`
- UI code version / Commit: Operations UI code/test scope hash `9a1846ae56f654d0a7e9ed046f5efd5e61a7d431205f3b57332808d2bc3592e7`（未Commit差分を含む。Mock文書記載のCommandで再現）
- Screens: SCR-OPS-001〜003、SCR-OPS-009〜012、OVL-OPS-001〜002
- Flow: UF-OPS-001

## Human confirmation scope

- Login、MFA、回復案内、Session期限・失効の理解可能性
- Dashboardの優先度、期限、失敗理由と作業入口
- claim差分5分類、Disclosure Status、Evidence、影響候補の情報密度
- 編集Draft保存と明示承認の分離
- 再認証Dialog、承認Block、監査Timeline
- Desktop表現、Mobile縦Card・Navigation
- UI-only境界、合成Fixture、Source文字列の未信頼表示

## Approved hypotheses


## Known minor findings accepted


## Remaining open questions


## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Auth Provider、Fixture、暫定型、合成監査、仮Interactionを本番へ無条件に昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は人間だけが記入する。
