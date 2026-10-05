# UI Mock Approval — Correction report v0.6

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/07-approval.md`（2026-08-13 Approved baseline; RQ-037 disposition pending baseline reapproval）
- UI Mock: `docs/design/ui/mocks/ui-v0.6-correction-report.md`
- Screens: SCR-PUB-011、SCR-PUB-012、カード詳細・記事・公開画面Footerの入口
- Flow: UF-005

## Human confirmation scope

- 文脈付き入口とFooter補助入口の発見性・優先順位
- 対象引継ぎ、入力上限、Validation、Error Focus
- Secret・不要な個人情報の注意、任意メールの用途、回答非保証
- 合成受付番号、メール有無による連絡条件、遷移元へ戻るAction
- Desktop／Mobile、Keyboard、Accessibility、UI-only境界

## Approved hypotheses


## Known minor findings accepted


## Remaining open questions


## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Fixture、暫定Target型、合成受付番号、Browser Memory処理は無条件に本番へ昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は空欄のままHumanへ引き渡す。
