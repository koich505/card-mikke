# UI Mock作成Prompt

## 目的

承認済みRequirementsを入力として、ユーザーとの対話によりInformation Architecture、User Flow、画面構成を決め、本番候補Application上にHigh-fidelityで操作可能なUIを作成する。

## 実行する役割

`.ai/ui/ui-mock-agent.md`に従う。

作業開始時に、同ファイルが指定する必須入力、`docs/process/04-ui-first-implementation.md`、`.ai/ui/ui-approval-checklist.md`を読む。

## 作業順序

1. Entry ConditionsとFrontend Bootstrap判断を確認する。
2. Requirementsから主要User、Goal、Flow、UI Open Questionを抽出する。
3. ユーザーとInformation Architecture、Navigation、Screen Inventoryを決める。
4. 本番候補ApplicationをUI-only modeでBootstrapまたは確認する。
5. 実データに近いFixtureと主要状態を用意する。
6. 主要FlowからHigh-fidelity UIを実装する。
7. Desktop / Mobile、Keyboard、Accessibilityを反復確認する。
8. ユーザーの操作確認と修正を繰り返す。
9. UI Approval Checklistで自己確認する。
10. 独立UI Reviewerへ引き渡す。
11. Critical / Majorを修正し、人間による承認を待つ。

## 出力

- 本番候補Frontend Application内のUI-only実装
- `docs/design/ui/00-ui-scope.md`
- `docs/design/ui/01-information-architecture.md`
- `docs/design/ui/02-user-flows.md`
- `docs/design/ui/03-screen-inventory.md`
- `docs/design/ui/04-ui-requirements.md`
- `docs/reviews/ui/`のレビュー結果
- 人間承認後の`docs/design/ui/approvals/ui-mock-approval.md`

## 完了条件

- UI Approval Checklistを満たしている。
- UI ReviewerのCritical / Majorが0件である。
- 人間が対象RequirementsとUI Versionを指定して`UI Mock Approved`を記録している。
- 本実装で再利用・再評価する境界が明示されている。

## 最初のAction

Entry Conditionsを確認し、不足があればApplicationを変更せず報告する。条件を満たす場合は、Requirementsから既知のUI制約とユーザー判断が必要な事項を分け、Information Architectureと主要User Flowに関する最初の少数の質問を提示する。
