# Implementation Workflow Review 007

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 006 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-006.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 4
- Minor: 1
- Open Question: 0

Review 006の指摘は概ね解消された。Hash依存の循環、Human decision追加時のSnapshot境界、Installed Manifestの信頼根、ClosureのCanonical order、Gate順序を修正する必要がある。

## Major

### IMP-037: Hash依存に自己参照が残る

Run BindingがArtifact Payload Hashを含み、Source / Diff ManifestがRun Bindingを含み、それらのHashからArtifact Payload Hashを計算するため循環する。

ManifestのFieldを列挙してArtifact Payload Hashを除外するか、Payload確定後の外側Binding Envelopeへ分離する。Source Fingerprintを含むHash依存DAGと生成順序を固定する。

### IMP-038: Human decisionのLifecycleがImmutable Snapshotと両立しない

Finding発生後にTrackedなHuman Decision記録を編集するとSource SnapshotがStaleになる。同一Runで続行するか、新RunでPrior Findingへ結合するかが未定義である。

Review停止、Human記録、固定Revision、新Review Input / Run、Prior Result Hash付き再結合という状態遷移を定義する。Reviewed revisionとDecision source revisionを分離する。

### IMP-039: Installed Manifestの信頼根が閉じていない

Command File Hash付きInstalled Manifestを信頼するが、Manifest Schema、正本Path、Writer、Revision、Self-hash、WF-12 EvidenceとのAnchor更新手順がない。

Tooling Maintainer専用Writer、Version付きSchema、固定Path、外部Trust anchorまたは明示Human確認、Atomic update / Rollbackを定義する。OpenCodeで強制できなければExternal Wrapperのみを許可する。

### IMP-040: Closure Root HashのEdge / Cap Canonicalizationが一意でない

EdgeのSort keyがResolutionを含まず、Capsの一意性と並び順も未定義である。

Edgeを全Field tupleでSortし重複を拒否する。Capsは使用TierごとにExactly oneとし、固定Tier順でHash対象へ含める。

## Minor

### IMP-041: Current Gate比較の全順序と再Binding規則がない

`Gate 1 < ... < Gate 6`を規範として固定し、Gate変更時に新BindingとReintegrationを必須にし、旧ResultをStaleとする。
