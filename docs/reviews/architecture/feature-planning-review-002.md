# Feature Planning Review 002

Review date: 2026-08-09
Review target: Feature Planning / Architecture documents after Review 001 remediation
Previous review: `docs/reviews/architecture/feature-planning-review-001.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

- Critical: 0
- Major: 2
- Minor: 0
- Open Question: 0

Review 001の6件中4件はResolvedである。Scope承認の時系列と、Parallel `Approved`を記録するRoleの既存責任分界との不一致が残る。

## Review 001 Follow-up

| ID | Status | Resolution |
|---|---|---|
| M-1 | Unresolved | Provisional Slice SelectionとFinal Scope Approvalは導入されたが、小規模featureでFinal Scope ApprovalとPlanning Approvalを統合できる記述が時系列矛盾を残す |
| M-2 | Resolved | UI影響がないfeatureではUI GateとPromotionを`N/A`にでき、理由、承認者、承認日を記録する規則を追加した |
| M-3 | Resolved | Taskの必須項目へ期待結果と検証方法を含むCompletion / Acceptance Criteriaを追加した |
| M-4 | Resolved | Promotion Assessmentの正本を`specs/<feature>/plan.md`の必須Sectionへ統一した |
| m-1 | Resolved | Planへ品質観点ごとのApplicable / N/A判断と理由を追加した |
| OQ-1 | Unresolved | Implementation Orchestratorによる更新を定義したが、既存の責任分界と編集権限に反映されていない |

## Major

### M-1: 小規模featureの承認統合に時系列矛盾が残る

Final Scope ApprovalはArchitecture確定前に必要である。一方、Planning Approvalとの統合を許すと、Planning完成までScopeが未承認になるか、Planning完成前にPlanning Approvalすることになる。

同一会議または連続操作で扱うことは許容しても、Final Scope ApprovalはArchitecture着手前、Planning ApprovalはPlan / Tasks完成後という意味と記録時点を分離する。Final Scope承認後に実質的なScope変更があった場合は、Planningを停止してSpecification / Clarify / Final Scope Approvalへ戻す。

### M-2: Parallel `Approved`の更新権限が既存責任分界と矛盾する

Implementation Orchestratorが`tasks.md`を更新する規則を追加した一方、既存責任分界には正式Roleがなく、Implementerだけが編集可能、Review Orchestratorはread-onlyと定義されている。

Implementation OrchestratorをReviewerとは異なる正式Roleとして追加する。権限は実行直前の依存関係、変更範囲、共有Contract、Worker競合、Test、Local resourceの確認と、`tasks.md`の`Parallel Execution`記録だけに限定する。
