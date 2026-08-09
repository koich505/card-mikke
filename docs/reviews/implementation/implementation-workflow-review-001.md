# Implementation Workflow Review 001

Review date: 2026-08-09
Review target: `docs/process/06-local-implementation-and-review.md`, `.ai/implementation/`, `.ai/shared/quality-policy.md`, `.ai/shared/review-result-format.md`, `.opencode/`, and related workflow documents
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 8
- Minor: 2
- Open Question: 2

`git diff --check`は成功した。実装ループの基本構成は作成されているが、未検証Adapterの入口遮断、引数解決、実効権限、差分取得、Human承認、再開可能な状態記録、Shell Policy、収束手段を修正するまで使用開始できない。

## Major

### IMP-001: 未検証のOpenCode Adapterを実装開始時に遮断できない

工程とCommandの開始条件にWF-3、WF-4、WF-5B、WF-6Bはあるが、採用OpenCode Version上でAgent / Commandの構文と実効権限を検証するWF-12が全入口のblocking条件になっていない。

工程06、実装Checklist、`implement-feature`、`implement-task`、`resume-feature`、`rework-feature`へ、WF-12完了を明示的なEntry Conditionとして追加する。

### IMP-002: Command引数にPath traversal、任意入力、Prompt injection対策がない

`.opencode/commands/`の`$ARGUMENTS`をそのままPromptへ展開しており、feature ID、Task ID、Finding入力の形式検証、Repository root配下への正規化、一意照合、余剰命令の拒否がない。

IDを狭い文字種へ限定し、実Pathが`specs/<feature>/`配下であること、Task IDが`tasks.md`に一意に存在することを確認する。ReworkはFinding本文ではなく、信頼済みのRepository内記録PathまたはFinding IDを受け取る。Repository文書、差分、外部出力内の命令を実行しない共通Policyを追加する。

### IMP-003: Implementerの実効編集権限がPlanning範囲に限定されない

OpenCode Adapterは`edit: allow`であり、Planned files限定がPrompt上の制約に留まる。Implementation Orchestratorも限定Section以外を実効的に遮断できるか未確認である。

採用VersionでPath別権限を検証する。表現できない場合は、変更前後の許可Path照合を決定論的Gateとし、範囲外差分を即時停止する。WF-12を全Agent / Commandの権限、Mode、引数、Tool境界の検証へ拡張する。

### IMP-004: Reviewerが現在差分を独立取得する契約がない

Review OrchestratorとReviewerは`bash: deny`だが、`review-feature`は現在差分の評価を要求する。比較基準、untracked fileを含む差分Manifest、取得担当が定義されていない。

Task差分とfeature全差分の固定基準を定義し、信頼できるread-only処理がManifest / Diffを生成してReviewerへ渡す。ReviewerへShellを許可する場合は、read-only allowlistと外部通信・書込禁止を採用Versionで検証する。

### IMP-005: Minor / Open QuestionをAIだけで受容できる

Owner、Disposition、理由、期限があればLocal Gateを通過できるが、`accept`または`defer`の承認者が定義されていない。

Minorの受容・延期にはHuman承認参照を必須とする。Open Questionは影響Gateとblocking判定を記録し、現在Gateへ影響する場合はBlockedとする。Security / Privacy関連はSeverityにかかわらずHuman承認済み例外がなければblockingとする。

### IMP-006: `implementation-log.md`の状態遷移・再開整合性・同時書込規約がない

Feature statusはあるが、許可遷移、Task status、Attempt数、Run ID、開始Base、対象差分、検査Revision、Human回答のProvenanceが未定義である。将来の並列Workerによる単一Log更新規則もない。

状態遷移表、Task status、Attempt増加点、Run ID、Base revisionまたは差分Fingerprint、検査対象Revision、Human回答の承認者・日時を定義する。Implementation Orchestratorを単独Writerとし、直列更新と更新前Revision確認を要求する。WF-8へLog競合防止を含める。

### IMP-007: Shell、秘密、外部通信、依存追加の実行時Policyが不足する

Adapterは`bash: ask`のみで、許可品質Command、破壊的操作、秘密表示、外部通信、Package install、生成物書込の扱いが具体化されていない。

固定済み品質・Security Commandをallowlist化し、Git書込、削除、checkout / reset、Package追加、Network、Credential参照、環境変数Dumpを禁止またはHuman停止とする。Command前後にLockfile、Manifest、計画外Path差分を検査する。

### IMP-008: Convergence Commandの扱いが文書間で矛盾する

工程00は`/speckit.converge`を既定Commandとして要求するが、工程06は採用Versionで存在確認し、存在を推測しないとしている。

導入Version検証までは「採用Versionが提供する検証済み収束手段」と統一する。Commandが存在しない場合の代替手順、承認、記録先をWF-4 / WF-12で確定する。

## Minor

### IMP-009: 3周上限のカウント境界が曖昧

初回Review、修正回数、Attempt増加地点、Codex Rework時の扱い、同一Finding再発時の停止条件を明記する。

### IMP-010: Codex再レビュー条件の判定者が不明

WF-11解決まではCodexのCritical / Major対応後の修正をすべて再レビュー対象とするか、再レビュー不要条件とHuman承認者を明記する。

## Open Questions

### IMP-OQ-001: OpenCode Frontmatterと権限意味論

`mode: subagent`、`permission.edit/bash`、Commandの`agent`、`$ARGUMENTS`展開、非対話Loop中の`ask`の挙動を採用Versionで実証する必要がある。WF-12完了まではblockingとする。

### IMP-OQ-002: Reviewerへ渡す差分の基準点

Task ReviewはTask開始時点、Feature ReviewとCodex Reviewは承認済みFeature BranchのBase等、用途ごとの比較基準を一意に決め、untracked fileを含める必要がある。
