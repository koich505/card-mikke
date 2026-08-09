# Feature Planning Review 001

Review date: 2026-08-09
Review target: `docs/process/05-feature-planning-and-architecture.md`, `.ai/architecture/`, and related workflow documents
Reviewer: Independent sub-agent with no conversation context

## Conclusion

- Critical: 0
- Major: 4
- Minor: 1
- Open Question: 1

Feature Planning / Architecture工程の基本的な方向性は妥当だが、Scope承認時点、非UI featureの入口条件、Task完了条件、UI Code Promotion Assessmentの正本、Plan品質項目、並列実行承認の記録責任を修正する必要がある。

## Major

### M-1: Scope承認時点が一致していない

`docs/process/05-feature-planning-and-architecture.md`と関連PromptはFeature Specification作成前のScope承認を要求する一方、小規模featureではFinal Planning Approvalとの統合を許し、`docs/process/00-development-workflow.md`はSpecification作成後の承認として読める。

暫定的なFeature Slice選択、Specification / Clarify、Final Scope Approvalの順序を定義し、小規模featureでも承認の意味と時点が曖昧にならないよう統一する。

### M-2: 非UI featureとUI必須Entry条件が矛盾する

運用価値を持つbackend、operations、enabling featureを許容している一方、すべてのfeatureにUI Mock ApprovalとUI Review通過を要求している。

UI影響がないfeatureではUI条件とPromotion Assessmentを`N/A`にできるようにし、理由、承認者、承認日を記録する。

### M-3: Taskの独立した完了条件が必須項目にない

TaskのPurpose、Outputs、Tests等は定義されているが、期待結果と検証方法を含むCompletion / Acceptance Criteriaが必須フィールドとして明記されていない。

各Taskへ期待結果と検証方法を追加し、Agent、Reviewer、Checklistで同じ完了判定を使用する。

### M-4: UI Code Promotion Assessmentの正本が未定義

Promotion Assessmentの作成と参照は要求されているが、保存先と形式が一意に決まっていない。

`specs/<feature>/plan.md`の必須Sectionとするか、独立ファイルの正式Pathを定義し、ReviewerとImplementerが一意に発見できるようにする。

## Minor

### m-1: Plan生成規約に品質観点の一部が明記されていない

Security、Privacy、Performance、Costに加え、Error handling、Cache、Accessibility、SEO、Evidence、Freshness、Operations、Observabilityについて、Applicable / N/Aと判断理由をPlanの必須項目にする。

## Open Question

### OQ-1: Parallel `Approved`の更新責任と記録先

Planning Agentは並列状態を`No`または`Candidate`までしか設定できないが、実行直前に`Approved`へ更新するRole、編集権限、記録先が定義されていない。

推奨Decision: Implementation Orchestratorを正式Roleとして定義し、Gate 4入口で実行条件を再確認したうえで、限定された並列実行記録だけを更新できるようにする。
