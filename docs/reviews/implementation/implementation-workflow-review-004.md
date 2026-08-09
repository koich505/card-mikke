# Implementation Workflow Review 004

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 003 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-003.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 5
- Minor: 1
- Open Question: 0

Review 003の指摘は反映されたが、Runtime領域の完全性、Agent間Resultの検証、Review ContextのClosure、Delivery終端条件に追加修正が必要である。

## Major

### IMP-020: 固定除外Runtime領域が事前配置攻撃の隠れ場所になる

Source-tree Manifestから唯一除外されるRuntime領域に、既存File拒否、各Path componentの`lstat` / no-follow、排他的作成、Owner / Mode確認、Run ID再利用禁止がない。

空の新規Run directoryを安全に排他的作成し、全Path componentをno-followで検証する。既存Scope、Symlink、途中差替え、権限不正、Run ID衝突をBlockedとし、WF-12 Fixtureへ追加する。

### IMP-021: 会話Resultが未検証の制御入力になる

Review OrchestratorのRouting PlanとReviewer Resultを会話Resultとして受け取るが、機械検証可能なSchema、Unknown field拒否、サイズ上限、Run / Artifact hash binding、Parse失敗時の停止がない。

Version付き構造化Schemaを固定し、Artifact payload hash、Run ID、Scope、Reviewer IDを必須にする。不正・欠落・重複はBlockedとする。Controllerが差分分類から決定論的な最低限Reviewerを算出し、Review Orchestratorは追加だけを提案できるようにする。

### IMP-022: 2回のReview Orchestrator処理のIdentity / Freshnessが未定義

Routing後の統合を同じSessionで行うか、新規Invocationとするかが不明で、Session identity、Routing hash、個別Result hash、Artifact bindingがない。

Invocation方式を一意に固定し、Invocation ID、Role / Version、Routing hash、入力Result hash群、Run / Artifact hashをIntegration Resultへ含める。

### IMP-023: Immutable Snapshotに必要な未変更Source Contextが保証されない

差分とSpec / Plan / Tasksだけでは、変更Codeが依存する未変更Source、Config、生成Contract等が欠落し、Correctness / Security Reviewが誤ってPassする可能性がある。

変更対象ごとに必要な未変更Contextを決定論的に収集するClosure規則とManifestを定義する。完全性を保証できない、または上限超過で必要Contextが欠ける場合はReviewをBlockedにする。

### IMP-024: `Human delivered`がGate 6前でも成立し得る

終端遷移がCommit / Push / PR / Merge等のいずれかを証拠とするため、必須CI、Human確認、Squash merge前でも終端化できる。

`Human delivered`の前提をGate 6全条件の通過に固定し、PR、必須CI結果、Merged revision、Human actor、日時を必須証跡にする。

## Minor

### IMP-025: WF-12未完了時の`status-feature`契約が自己矛盾する

WF-12未完了でもStatus表示を許す一方、Commandは検証済みResolverを要求し、割当先AgentもWF-12証跡を必須とする。

`/status-feature`もWF-12完了までBlockingするか、Toolに依存しない安全なStatus経路を別途定義する。
