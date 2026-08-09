# Implementation Workflow Review 005

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 004 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-004.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 5
- Minor: 0
- Open Question: 1

Review 004の指摘は解消された。新規監査で、Run ID、Finding Schema、Minimum Routingの入力順序、大規模依存のSnapshot表現、Secret scan順序、Command前Resolver主体に修正が必要と判定した。

## Major

### IMP-026: Secure RuntimeのRun ID契約が矛盾する

Runtime Policyは128-bit以上のRandom IDを要求する一方、Implementation Logは日時とSequenceから成るIDを規定している。

Runtime Run IDを128-bit以上のRandom IDへ一本化し、表示用日時とSequenceは別Fieldにする。Directory名、Schema、Binding、Logで同じID形式を使用する。

### IMP-027: Reviewer SchemaではOpen QuestionとGate判定を閉包できない

Finding SchemaにOwner、Affected Gate、Blocking、期限、Security / Privacy分類、承認済み例外参照がないため、Integration Resultを決定論的に再計算できない。

必要FieldをFindingへ追加するか、Human Dispositionを別の厳格SchemaとBound Artifactとして定義し、Result算出規則を閉じる。

### IMP-028: Minimum Routingの入力Producerと実行順序が閉じていない

ControllerはCollectorより先にMinimum Routingを算出するが、Routing規則はArtifact内のChanged path / Risk tagを入力としている。Risk tagのSchema、Producer、Hash bindingも未定義である。

Immutable Changed-path Manifest生成後にMinimum Routingを実行する。Review Input SchemaへNormalized path、Change type、機械生成Risk tag、Producer / Version / Hashを追加し、分類不能時のFallback Reviewer集合を固定する。

### IMP-029: 第三者・大規模DependencyのSnapshot Closure表現がない

直接・推移DependencyのExact bytes / CASを一律要求すると、`node_modules`、Vendor、SDK、Toolchain、大規模生成物によって恒常的に上限を超える。

First-partyはExact bytes / CAS、Third-partyはLockfile、Package integrity、Resolver / Version、必要な型・公開Contract、ToolchainはVersion / Digestという層別契約にする。Vendored codeは別CapでExact化し、縮退にはHuman承認を要求する。

### IMP-030: Secret検出とCAS永続化の順序が未規定

秘密候補をArtifactへ保存しない規則はあるが、CASへ書き込む前にSecret scanすることが保証されていない。

制限付きRead、永続化前Secret scan、検出時のCAS / Manifest / Hash chain非記録、Temporary buffer破棄、Redacted event、Oversize時停止の順序を固定する。

## Open Question

### IMP-OQ-005: Command前Resolverの実行主体

PolicyはAgent起動前のResolverを要求するが、OpenCode Commandが直接SubagentへMappingされ、Pre-hook相当の実行主体が不明である。

採用VersionでCommand前段に固定Resolverを置けるかWF-12で確認する。できない場合は、全Commandを専用ControllerへMappingし、解決済みBindingだけを各Roleへ渡す。
