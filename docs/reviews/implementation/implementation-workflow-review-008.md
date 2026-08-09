# Implementation Workflow Review 008

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 007 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-007.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 4
- Minor: 0
- Open Question: 0

Review 007の指摘は解消されたが、Decision ReintegrationのCross-run Binding、停止Log Delta、Run確定Binding、Closure Root FieldにSchema不整合が残る。

## Major

### IMP-042: Decision Reintegrationの新Runが旧Review Resultを再利用できない

新RunでHuman Decisionを再統合する一方、DispositionとIntegration Resultが同一Run / Artifact Bindingを要求するため、旧RunへBindingされたReviewer Resultを参照できない。

Reintegration専用Schemaに旧Run、旧Artifact、旧Reviewer Result集合を明示し、Dispositionと旧Findingの対応を決定論的に定義する。

### IMP-043: 停止Log更新によってDecision-only Deltaが成立しない

Review停止後にOrchestratorが`implementation-log.md`を更新するため、Human Decision fileだけを変更するという軽量Reintegration条件を満たせない。

停止Log更新後にReintegration Baselineを固定するか、許可される機械的Log DeltaをSchemaで限定する。Cross-run Bindingと併せて循環を解消する。

### IMP-044: 新規RunのCommand Bindingが確定Run IDへ結合されない

起動前Command BindingではRun IDを`null`にできるが、Run生成後に最終Bindingを作り直す手順がなく、後続ArtifactのRootがRun IDを拘束しない。

起動前Intent Bindingと確定Run Bindingを分離し、Run ID生成後の最終Bindingだけを後続RoleとArtifactへ渡す。

### IMP-045: Closure SchemaのRequired FieldとRoot計算が矛盾する

Closure Payloadへ`entriesRoot`、`edgesRoot`、`capsRoot`を要求する一方、SchemaのRequired Field一覧に存在しない。

3 Fieldを正式に追加し、それぞれのDomain、Payload、Omit規則、最終Root Hashまでの生成順序を固定する。
