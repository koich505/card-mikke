# Implementation Workflow Review 006

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 005 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-005.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 5
- Minor: 1
- Open Question: 0

Review 005の指摘は解消された。新規監査では、Command Intent、Hash Canonicalization、Review Input / Closure Schema、Finding Disposition、Human承認記録の正本を実装可能な契約へ閉じる必要がある。

## Major

### IMP-031: Command IntentとDispatchが信頼済みBindingになっていない

全Commandは同じCommand Controllerへ自然言語Promptとして渡されるが、固定Command IDの信頼済み取得元と、Command IDごとの唯一のDispatch先が定義されていない。

Adapter、Pre-hook、またはExternal Wrapperが定数化したCommand Intentを渡す契約を定義する。Prompt本文からCommandを推論せず、Command IDごとの唯一Role、Run生成、Task選択条件を表で固定する。

### IMP-032: Hash Fieldが自己参照しCanonical hashing契約がない

Binding Hash、Artifact Payload Hash、Entry Hashについて、Hash Field自身の除外、Canonical serialization、Algorithm、Domain separator、配列順序が定義されていない。

Hash対象を明示したEnvelope、Canonical bytes、Algorithm ID、Domain separator、配列順序をSchemaごとに固定してFixture化する。

### IMP-033: Review InputとClosure Manifestが厳格Schemaとして閉じていない

Review InputにBase / Current revision、Binding、Manifest、Diff、Spec / Plan / Tasks Snapshot等の必須定義が不足し、Closure ManifestのEntry、Edge graph、Tier cap、Resolver、Root hashもSchema化されていない。

Review InputとClosure Manifestを完全なVersion付きSchemaとして定義し、閉包充足をControllerが決定論的に判定できるようにする。

### IMP-034: Finding DispositionのGate計算が閉じていない

現在Gate、C / M解消後の再検証証拠、Minor / OQのDecision別状態遷移が不足し、同じPayloadから異なるPass判定が可能である。

Immutable `currentGate`をBindingへ追加し、Severity / Category / Decision別の完全な遷移表を定義する。Resolveには後続Reviewer / Integration Hashを必須とし、有効Findingと残存件数を一意に再計算する。

### IMP-035: Human DispositionのWriter・正本・改ざん検出が未定義

Human承認記録から`human-disposition-v1`を生成する主体、正本Path、Authorized actor、対象Revision、Append-only性、真正性確認が定義されていない。

Human承認記録のSchemaと正本Path、Authorized actor registry、専用Trusted Writer、Reviewed revision、Record identity、Human再確認境界を固定し、ControllerがRecord bytesからDispositionを決定論的に生成してHash chainへ登録する。

## Minor

### IMP-036: `.ai/README.md`のSchema責務説明が不足する

`schemas.md`がCommand Binding、Review Input、Human Disposition等も扱うことをFile Responsibilitiesへ反映する。
