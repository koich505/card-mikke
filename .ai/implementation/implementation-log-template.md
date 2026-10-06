# Implementation Log: <feature-id>

Writer: Implementation Orchestrator only

## State Model

### Feature transitions

| From | To | Actor | Precondition | Required log record |
|---|---|---|---|---|
| Not started | In progress | Orchestrator | Gate 3承認、Active Feature一意、WF-3/4/5B/6B/12完了 | Initial Run ID、base、承認参照 |
| In progress | Human decision required | Orchestrator | Human Stop Condition | 理由、影響Gate、必要判断、Resume条件を記録してRun終了 |
| Human decision required | In progress | Orchestrator | Human回答済み、fresh full Local Review成功 | 新Run / Binding / Snapshot、prior Run / Finding provenance、Decision record revision |
| In progress | Local gate passed | Orchestrator | 全Task Local GateとFeature検査成功 | checked revision / fingerprint、収束結果 |
| Local gate passed | Codex final review pending | Orchestrator | Review Artifact鮮度一致、handoff準備完了 | Artifact、remaining finding、handoff日時 |
| Codex final review pending | Rework required | Orchestrator | Humanがtrusted Codex review record / Findingを選択 | review path、Finding ID、Human選択参照 |
| Rework required | In progress | Orchestrator | Scope内、Entry Conditions再確認 | 新Codex rework Run ID、Prior Run ID |
| In progress | Codex final review pending | Orchestrator | Rework後のLocal Gateと収束手段を再通過 | 新Artifact、evidence revision、prior Finding解消状況 |
| Codex final review pending | Codex review passed | Orchestrator | Codex C/M=0、review recordと対象Artifact / revision一致 | `docs/reviews/features/`Path、reviewer、日時、revision |
| Codex review passed | Delivery ready | Orchestrator | Minor / OQのHuman承認とSecurity例外、全Gate確認 | Human decision evidence、残存Finding、delivery revision |
| Delivery ready | Human delivered | Orchestrator | Gate 6全条件をHumanが完了 | 最終差分/UI/OQ確認、PR URL、対象CI成功、例外確認、Squash merged revision/URL、Human actor、日時 |

### Task transitions

| From | To | Actor | Precondition | Required log record |
|---|---|---|---|---|
| Pending | Readiness blocked | Orchestrator | 依存、選択、受入条件、Tool readinessの不足 | blocker、Owner、Resume条件 |
| Readiness blocked | In progress | Orchestrator | blocker解消とHuman provenance確認 | 新Resume Run ID、Task-start snapshot |
| Pending | In progress | Orchestrator | Selected Taskまたは一意なNext Ready Task、依存解決 | Selected Task根拠、snapshot、planned paths |
| In progress | Review blocked | Orchestrator | Guard / Check失敗、Finding、最大Attempt、同一C/M再発 | attempt、artifact、finding、停止理由 |
| Review blocked | In progress | Orchestrator | 修正可能かつAttempt上限内、またはHuman承認済み新Run | Run / attempt、解消対象、checked revision |
| In progress | Local gate passed | Orchestrator | Guard / Check成功、Review Gate通過 | checks、artifact、finding disposition |
| Local gate passed | In progress | Orchestrator | Codex reworkで該当Taskを再開 | 新Codex rework Run、Finding参照、旧状態維持 |

状態を書けるActorはOrchestratorだけである。遷移理由、日時、Run ID、更新前Log revisionを必須とし、BlockedからはResume条件を満たす遷移だけを許可する。完了状態からのReworkは新Runを作り、履歴を上書きしない。

Codex Reviewerはread-onlyで結果を返す。Humanがその結果を`docs/reviews/features/`へ保存・承認して判断証拠を提示し、Implementation OrchestratorだけがLogへ転記する。Codex自身もHumanもLogを直接更新しない。

## Concurrency Rule

- WriterはImplementation Orchestratorだけとし、Reviewer、Implementer、Collectorは書き込まない。
- 更新を直列化し、更新前に記録した`Log revision / fingerprint`が現在値と一致することを確認する。
- 不一致なら更新せず再読込する。自動mergeやlast-write-winsは禁止する。
- WF-8でlaneを増やす前に、Log lock、Task ownership、Artifact Pathの競合防止を採用Versionで検証する。

## Run Context

- Run ID: `run-<32 lowercase hex>`（128-bit CSPRNG、再利用禁止）
- Display started timestamp:
- Display sequence:
- Run kind: Initial | Resume | Manual review | Codex rework
- Feature:
- Branch:
- Feature branch base revision:
- Immutable canonical Feature ID / path:
- Active Feature pointer value / revision at Run start:
- Started at:
- Orchestrator:
- Log revision / fingerprint before update:
- Approved model / version reference:
- WF-12 completion evidence:
- Quality command / Security tools reference:
- Resolver / Guard / Collector version:
- Human implementation approval: approver, timestamp, source path / ID
- Prior Run ID / prior Finding refs:（provenance only。合格判定へ再利用禁止）
- Active Feature pointer evidence:
- Command intent hash / final Run binding schema / hash / resolver version:
- Selected Task: Task ID、Human / Orchestrator選択理由、承認者、日時、source reference
- Selected review findings: trusted record path、Finding ID、Human選択者、日時

## Task Status

| Task | Status | Review attempt | Task-start snapshot | Current revision / fingerprint | Checks revision | Review artifact | Updated at |
|---|---|---:|---|---|---|---|---|

初回ReviewをAttempt 1、修正後の再Reviewごとに+1とし、最大3回とする。Codex reworkは新RunのAttempt 1から始めるが、旧Runとfinding履歴を保持する。同一Critical / Major再発時は即時停止する。

## Manifest Guards

- Pre implementation all-file manifest fingerprint（canonical path / type / mode / symlink target / content hash / size）:
- Post implementation all-file manifest fingerprint（同上）:
- Review input payload hash / Artifact binding hash（Source-tree fingerprintとは分離）:
- Post-artifact Source-tree fingerprint / stale check:
- Runtime root / run / scope owner-mode-device-inode identity:
- Runtime integrity Manifest / previous Artifact hash / current hash:
- Routing invocation ID / result hash / RO roleVersion:
- Ordered reviewer invocation IDs / result hashes:
- Integration invocation ID / result hash / RO roleVersion:
- Review input schema / producer version / risk rules hash:
- Human disposition payload hashes:
- Human decision source path / bytes hash / revision:
- Prior Run / Finding provenance:
- Fresh full-review Run / Snapshot / Reviewer result hashes:
- Current Gate / prior Gate / Gate-change stale result:
- Human confirmation nonce event / actor label / confirmedAt:
- Planned path comparison:
- Lockfile / Package manifest comparison:
- Human-approved fixed exclusions and approval reference:
- Out-of-scope result:

範囲外変更は`Human decision required`とし、自動rollbackしない。

## Decisions and Stops

| Decision ID | Reason | Affected Task / Gate | Required decision | Approver | Decision | Timestamp | Source reference | Resume condition |
|---|---|---|---|---|---|---|---|---|

Human回答は承認者、日時、Repository内Source fileのexact bytes / workspace revisionを必須とし、会話要約だけを根拠にしない。Delivery前commitは前提にしない。Orchestratorが停止Logを書いた後にHumanがDecision / Approval recordを編集し、次CommandはLogとDecisionを含むfresh Snapshotで完全なLocal Reviewを行う。

Human decision / approval編集、Gate変更、Codex rework、Blocked resume、手動Source変更では旧Review Result / Dispositionをstaleにする。旧Run / Findingはprovenanceに限り、新Reviewer Resultを全件取得するまでLocal Gateを通さない。

## Review Findings

| Finding | Severity | Run / Attempt | Owner | Disposition | Human approval / exception | Affected gate / blocking | Status |
|---|---|---|---|---|---|---|---|

Minorの`accept / defer`はHuman承認参照必須。Open Questionは影響GateとBlocking判定必須。Security / Privacyは承認済み例外なしではSeverityを問わずBlockingとする。

Critical / MajorはHuman dispositionでResolvedにせず、後続Artifact / revisionにBindingした新Reviewer ResultのResolved referenceを記録する。

## Feature Completion

- Full quality checks and checked revision:
- Convergence method / version / result:
- Traceability artifact or Command evidence:
- Remaining Minor / Open Question and approvals:
- Codex review Run / result:
- Codex review record path / reviewed revision / Artifact binding hash:
- Codex re-review required: Yes（WF-11解決まではCritical / Major修正後常にYes）
- Codex handoff status:
- Codex local commit used: Yes / No
- Local commit reviewed fingerprint / explicit paths / commit hash:
- Committer phase / post-commit status / remote connection: `Codex Local Committer` / `<status>` / `None`
- Gate 6 Human final diff / UI / OQ check:
- Pull Request URL / reviewed revision:
- Required CI jobs / result / revision:
- Unapproved scope / security exception check:
- Squash merged revision / URL:
- Human delivery actor / timestamp:

`Human delivered`は上記Gate 6証拠がすべて揃った場合だけ記録する。Commit、push、PR作成だけでは不足する。

生ログ、秘密情報、プロンプト全文、chain-of-thoughtを保存しない。
