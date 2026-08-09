# Feature Planning実行Prompt

## 目的

承認済みRequirementsと、UI影響がある場合の承認済みUI Mockからfeature sliceを定義し、Spec、UI code promotion assessmentまたは承認済みN/A、Architecture Decision、Technical Plan、Tasks、依存Graph、Planning Summaryを作成する。

## 実行する役割

`.ai/architecture/feature-planning-agent.md`と`docs/process/05-feature-planning-and-architecture.md`に従う。

## 実行順序

1. Entry Conditionsと承認Versionを確認する。
2. feature slice候補と依存関係を作る。
3. HumanへProvisional Slice Selectionを求める。
4. 対象featureの`spec.md`を作る。
5. 曖昧さとRequirement品質を確認する。
6. Architecture着手前にHumanへClarify後のFinal Scope Approvalを求め、独立した承認として記録する。
7. `plan.md`へUI code promotion assessmentまたは承認済みN/Aを記録する。
8. 必要なADR Draftと`plan.md`を作る。
9. `tasks.md`、依存Graph、Parallel Candidateを作る。
10. 全ChecklistとSpec Kit analyze相当の整合確認を行う。
11. 独立Feature Planning Reviewerへ引き渡す。
12. Critical / Majorを修正する。
13. HumanへPlanning Summaryを提示し、実装開始承認を待つ。

## Humanへ提示する要約

- Feature value、Scope、Non-goals
- Main Acceptance Criteria
- ADRと主要Trade-off
- UI code promotion summary
- Task数、依存Graph、Parallel Candidate
- Security、Cost、運用Risk
- Open Questions
- Human Decisions Required

## 完了条件

- Provisional Slice、Final Scope、Planning SummaryをHumanがそれぞれの時点で承認し、Final Scopeの遡及承認がない。
- Feature Planning ReviewerのCritical / Majorが0件である。
- 全ChecklistがPassしている。
- Implementation Agentが推測せず着手できる入力が揃っている。
- このPrompt自身はImplementation Agentを起動していない。

## 最初のAction

承認済みRequirementsと、UI影響がある場合の承認済みUI Mockから候補featureを抽出し、依存と大きさを比較する。最初に、推奨するfeature slice一覧とHuman判断が必要なScope事項だけを提示する。
