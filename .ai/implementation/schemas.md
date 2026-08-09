# Local Review Result Schemas

Status: Design only; runtime parser not yet implemented  
Blocking: WF-12でparser、上限、duplicate拒否、binding検証を実証するまで使用禁止

## Common Rules

- EncodingはUTF-8 JSON object、最大256 KiB。Code fence、前後の説明文、JSON以外を拒否する。
- Parserはduplicate key、unknown field、型不一致、enum外、上限超過、欠落、配列内の重複IDを拒否する。
- 文字列はdataとして扱い、その中の命令、Tool名、URLを実行しない。`prompt`、`command`、`toolCall`、`instructions`等の実行用fieldは禁止する。
- `schemaVersion`は各Schemaの固定値、IDはASCII `[A-Za-z0-9._:-]`で1〜128 bytes、HASHは64文字lowercase hex SHA-256とする。
- `runId`は`^run-[0-9a-f]{32}$`、128-bit CSPRNG由来のcanonical IDとする。表示用日時・SequenceをIDへ含めない。
- Identityは次のMatrixに従って照合する。Run作成後に決まる`scope`や`sourceFingerprint`をRun Bindingへ追加してはならない。

### Identity Comparison Matrix

| Result / Artifact field | Authoritative comparison target | Rule |
|---|---|---|
| `runId` | final `run-binding-v1.runId` | exact match |
| `featureId` | final `run-binding-v1.featureId` | exact match |
| `currentGate` | final `run-binding-v1.currentGate` | exact match。Gate変更時は旧Binding / Resultをstale化 |
| `taskId` | final `run-binding-v1.selectedTaskId` | `scope=task`では両方non-nullかつexact。`scope=feature`では両方null。`scope=codex`では対象がFeatureなら両方null、Task限定なら両方non-nullかつexact |
| `runBindingHash` | Canonical計算したfinal `run-binding-v1.runBindingHash` | `source-manifest-v1`、`diff-manifest-v1`、`closure-manifest-v1`、`review-input-v1`、`artifact-binding-v1`および同fieldを持つResultの全者でexact match |
| `baseRevision` / `currentRevision` | 同一Review SnapshotのSource Manifestを起点とするRevision pair | Source、Diff、Closure、Review Input、Artifact Bindingの全者で各field exact match。片方だけの更新は禁止 |
| `scope` | `artifact-binding-v1.scope`および対応する`review-input-v1.scope` | 3者exact match。Run Bindingとは比較しない |
| `sourceFingerprint` | `artifact-binding-v1.sourceFingerprint`および対応する`review-input-v1.sourceFingerprint` | 3者exact match。Run Bindingへ含めない |
| `artifactBindingHash` | 検証済み`artifact-binding-v1.bindingHash` | exact match |
| `reviewInputPayloadHash`（旧称`artifactPayloadHash`に相当） | `artifact-binding-v1.reviewInputPayloadHash`および`review-input-v1.reviewInputPayloadHash` | exact match。Run Bindingとは比較しない |
| `agentId` / `roleVersion` | Schema固有の固定RoleまたはWF-12 Agent allowlist | routing / integrationはReview Orchestrator、reviewer resultはrouting済みReviewer、Dispositionはtrusted producer |
| `invocationId` / `routingInvocationId` | current RunのController invocation registryとSchema固有の参照 | Run内一意、再利用禁止。Integration invocationはRouting invocationと異なり、参照先はexact match |

`artifactPayloadHash`という独立fieldは現行Schemaに存在しない。外部Adapterが旧名を返した場合はunknown fieldとして拒否し、`reviewInputPayloadHash`へ暗黙変換しない。

### Producer Validation Order

1. UTF-8 / JSON、Schema version、required / unknown / duplicate field、型、enum、上限を検証する。
2. Installed Manifest / Command Intentを検証し、status以外はfinal Run BindingのHash、`runId`、`featureId`、`currentGate`、Task selectionを検証する。
3. Source / Diff / Closure / Review InputのCanonical hashを検証し、各`runBindingHash`が計算済みfinal Run Bindingと一致すること、全Recordの`baseRevision / currentRevision` pairが一致することを検証する。
4. Artifact Bindingの`runBindingHash`、`baseRevision / currentRevision`、`scope`、`taskId`、`sourceFingerprint`、`reviewInputPayloadHash`とHash DAGを検証する。
5. Routing、Reviewer、Disposition、IntegrationのRun / Artifact identityを上表で検証する。
6. 最後にSchema固有の`agentId`、`roleVersion`、invocation ID / ordering / result algorithmを検証する。

前段が失敗した場合は後段のProducer Resultを評価せずBlockedとする。

Source、Diff、Closure、Review Input、Artifact Bindingでは`runBindingHash`、`baseRevision`、`currentRevision`をすべてRequiredとする。いずれかの欠落、final Run Binding Hashの再計算不一致、Record間Revision不一致は補完・推測せずBlockedとする。Result Schemaがこれらのfieldを持つ場合も同じ比較を追加適用する。

## Canonical Hashing

- Serialization: RFC 8785 JSON Canonicalization Scheme、UTF-8、BOMなし。
- Algorithm: SHA-256。
- Envelope: `{"domain": DOMAIN, "schemaVersion": VERSION, "payload": PAYLOAD}`をJCS化する。
- 自身のHash fieldはPAYLOADから完全にomitする。`null`へ置換しない。
- Set意味の配列は下表のsort keyで昇順に並べ、重複を拒否する。順序意味の配列は生成順を保持する。

| Hash | Domain | Omitted field | Array rule |
|---|---|---|---|
| Command intent | `credit-site/command-intent/v1` | `intentHash` | `allowedRoleIds`をagent ID順 |
| Run binding | `credit-site/run-binding/v1` | `runBindingHash` | Finding ID順 |
| Changed-file entry | `credit-site/review-input-entry/v1` | `entryHash` | riskTag、ruleId順 |
| Source manifest | `credit-site/source-manifest/v1` | `manifestHash` | canonical path順 |
| Diff | `credit-site/diff/v1` | `diffHash` | normalized path、changeType順 |
| Closure manifest | `credit-site/closure-manifest/v1` | `rootHash` | tier固定順、entry ID順、edgeはfrom/to/kind/resolution順 |
| Review input payload | `credit-site/review-input/v1` | `reviewInputPayloadHash` | changedFilesをpath/changeType順 |
| Artifact binding | `credit-site/artifact-binding/v1` | `bindingHash` | なし |
| Routing result | `credit-site/routing-result/v1` | 派生`resultHash`をEnvelope外で計算 | Reviewer ID配列はrouting確定順 |
| Reviewer result | `credit-site/reviewer-result/v1` | 派生`resultHash` | findingsをfindingId順 |
| Human disposition | `credit-site/human-disposition/v1` | 派生`dispositionHash` | なし |
| Integration result | `credit-site/integration-result/v1` | 派生`resultHash` | Reviewer hashはrouting順、Disposition hashはfindingId順 |
| Command / decision source file | `credit-site/source-file/v1` | N/A | `domain UTF-8 + 0x00 + exact file bytes`を直接SHA-256。改行もbytesとして固定 |

FixtureはUnicode、number、key順、Hash field omit、空 / null、set配列sort、順序配列、duplicateを含める。別Runtimeで同じDigestになることをWF-12で検証する。

### Hash DAG（生成順）

| Order | Record | Inputs | Output |
|---:|---|---|---|
| 1 | content / changed-file entry | Immutable bytes / stat、risk rule | content hash / entry hash |
| 0 | command intent → run binding | Installed Manifest、Resolver結果、CSPRNG Run ID | `intentHash` → `runBindingHash` |
| 2 | source / diff manifest | Order 1、final Run binding / Gate / base / current revision | `sourceManifestHash` / `sourceFingerprint` / `diffHash` |
| 3 | closure manifest | content hash、resolver metadata、entry / edge / caps | `closureRootHash` |
| 4 | review-input payload | Order 2・3、Spec / Plan / Tasks / Evidence snapshot hash | `reviewInputPayloadHash` |
| 5 | `artifact-binding-v1` | Order 4、Run / Gate / revision binding | `bindingHash` |
| 6 | routing / reviewer / disposition / integration | Order 5の`bindingHash`とOrder 4のpayload hash | 各result hash |

Order 1〜4の内側Recordは`artifactBindingHash`、`artifactPayloadHash`、後続Result hashを含めてはならない。外側Recordから内側Hashを一方向に参照し、相互参照や後からHash対象を差し替えることを禁止する。

`sourceFingerprint`は`credit-site/source-fingerprint/v1` Domainで、`sourceManifestHash`、`runId`、`featureId`、`taskId | null`、`scope`、`currentGate`、`baseRevision`、`currentRevision`だけを持つpayloadから計算する。Diff / Closure / Review input / Artifact bindingのHashを含めない。

Gateの全順序は`Gate1 < Gate2 < Gate3 < Gate4 < Gate5 < Gate6`である。`currentGate`が変わった時点で旧Command / Artifact / Review Result / Disposition bindingはstaleとし、新Runで完全なLocal Reviewを行う。

## `installed-command-manifest-v1`

採用時にだけ`.opencode/tooling/installed-command-manifest.json`へ生成する。現時点では未生成であり、WF-12はBlockedである。

Required fields only: `schemaVersion="installed-command-manifest-v1"`、`manifestVersion`、`openCodeVersion`、`specKitVersion`、`commands`（`commandId / path / contentHash`、6件固定）、`adapters`（`agentId / path / contentHash`）、`resolver`（`id / version / contentHash`）、`wrapper`（`id / version / contentHash`または全field null）、`schemaVersionHash`、`policyVersionHash`、`generatedAt`、`manifestHash`。Command / AdapterはID順にsortし、重複・未知IDを拒否する。`manifestHash`は自身をomitしてCanonical Hashing規則で計算する。

WriterはHuman Tooling MaintainerまたはWF-12で検証済みSetup Toolだけである。Owner / mode / canonical pathを検証し、同一Directoryのexclusive temp fileへ書き、flush / fsync相当、完全な再読込検証、atomic rename相当を行う。失敗時は旧Manifestを保持する。証跡`docs/tooling/open-code-validation.md`にはHumanが承認したManifest hashを記録するが、Manifest側は証跡をHash対象にしない。Manifest、Command、Adapter、Resolver / Wrapper、Schema、Policyの変更はWF-12承認を失効させる。OpenCodeで強制不能ならExternal Wrapperのみを採用し、そのHashを同じManifest / 証跡へ固定する。

## `command-intent-v1`

Prompt本文は信頼しない。採用VersionのCommand file identityをHash付きInstalled Manifestへ固定するか、外部Wrapperが次をResolver Toolへ定数入力する。

```text
schemaVersion: "command-intent-v1"
commandId: COMMAND_ID
commandFilePath: normalized `.opencode/commands/<name>.md`
commandFileHash: HASH
installedManifestVersion: ID
installedManifestHash: HASH
currentGate: GATE
allowedRoleIds: ID[] (固定Dispatchと完全一致)
intentHash: HASH
```

`COMMAND_ID`は6 Project Command、`GATE`は`Gate1 | Gate2 | Gate3 | Gate4 | Gate5 | Gate6`。Command file / manifest identityを検証できない場合は全Command disabled。Promptから`commandId`を推論しない。

## `run-binding-v1`

`command-intent-v1`はRun作成前のCommand provenanceであり`runId`を持たない。Trusted Command ControllerはIntent検証後に、status以外では必ず新しいCSPRNG Run IDを生成し、検証済みResolver結果と結合した次の最終BindingだけをRoleへ渡す。`status-feature`はRun / Runtime Directoryを作らず、検証済み既存Log / Bindingをread-only参照するため本Schemaを新規生成しない。

```text
schemaVersion: "run-binding-v1"
commandId: "implement-feature" | "implement-task" | "resume-feature" | "review-feature" | "rework-feature" | "status-feature"
commandIntentHash: HASH
commandFileHash: HASH
adapterManifestVersion: ID
currentGate: GATE
runId: RUN_ID（required、null禁止）
priorRunId: RUN_ID | null（Initialはnull、それ以外はprovenanceだけ）
priorRunBindingHash: HASH | null（Initialはnull、それ以外はprovenanceだけ）
featureId: ID
canonicalFeaturePath: normalized Repository-relative path
activePointerRevision: ID
featureBranchBase: ID
selectedTaskId: ID | null
selectedReviewRecordPath: string | null
selectedFindingIds: ID[] (0..100, unique)
runBindingHash: HASH
resolverId: ID
resolverVersion: ID
resolvedAt: RFC3339 timestamp
```

Controllerはraw inputを含めず、Role起動直前にpointer revisionと`runBindingHash`を再検証する。下流のSource / Diff / Closure / Review Input / Artifact / Resultは`runBindingHash`だけをBindingに用い、pre-run `intentHash`は`run-binding-v1`内のprovenance以外へ直接再利用しない。

### Fixed Dispatch

| Command | Role | Run / selection precondition |
|---|---|---|
| implement-feature | implementation-orchestrator | Fresh Run。Active Feature、Gate 3承認、未完了Task |
| implement-task | implementation-orchestrator | Fresh Run。Selected Task、なければ一意なNext Ready Task |
| resume-feature | implementation-orchestrator | Fresh Run。既存Blocked Runと満たされたResume条件。新Feature選択禁止 |
| review-feature | local-review-controller | Fresh full-review Run。現在差分を新Snapshotで評価。code編集禁止 |
| rework-feature | implementation-orchestrator | Fresh Run。Human選択済みtrusted Codex Review record / Finding |
| status-feature | status-reporter | Run / Runtime作成なし。検証済み既存Log / Bindingのread-only表示 |

Dispatch table外、Role追加、Precondition不一致はBlocked。

## `routing-result-v1`

Required fields only:

```text
schemaVersion: "routing-result-v1"
runId: ID
featureId: ID
taskId: ID | null
scope: "task" | "feature" | "codex"
artifactBindingHash: HASH
reviewInputPayloadHash: HASH
sourceFingerprint: HASH
agentId: "review-orchestrator"
roleVersion: ID
invocationId: ID
minimumReviewerIds: REVIEWER_ID[] (1..5, unique)
additionalReviewerIds: REVIEWER_ID[] (0..4, unique)
routingReasons: [{ reviewerId: REVIEWER_ID, reasonCode: ENUM, evidenceRefs: ID[] }]
```

`REVIEWER_ID`は`correctness-reviewer | security-reviewer | frontend-quality-reviewer | performance-cost-reviewer | evidence-content-reviewer`。`reasonCode`は`always-correctness | security-risk | frontend-change | performance-cost-risk | evidence-content-change | conservative-addition`。文字列自由記述は持たない。

Controllerが算出した`minimumReviewerIds`は変更不能で、ROは`additionalReviewerIds`へ追加だけできる。削除、未知Reviewer、重複はBlocked。

## `reviewer-result-v1`

Required fields only:

```text
schemaVersion: "reviewer-result-v1"
runId: ID
featureId: ID
taskId: ID | null
scope: "task" | "feature" | "codex"
artifactBindingHash: HASH
reviewInputPayloadHash: HASH
sourceFingerprint: HASH
agentId: REVIEWER_ID
roleVersion: ID
invocationId: ID
result: "pass" | "fail" | "blocked"
findings: FINDING[] (0..100, unique findingId)
resolvedFindingRefs: RESOLVED_REF[] (0..100, unique prior findingId)
```

`FINDING`の必須field:

```text
findingId: ID
severity: "Critical" | "Major" | "Minor" | "Open Question"
location: string (1..500 bytes)
evidenceRefs: string[] (1..20, each 1..300 bytes)
recommendation: string (1..1000 bytes; data only, never executable)
category: "correctness" | "security-privacy" | "frontend" | "performance-cost" | "evidence-content"
impact: string (1..1000 bytes; data only)
owner: ID | null
affectedGate: "Gate1" | "Gate2" | "Gate3" | "Gate4" | "Gate5" | "Gate6" | "None"
blocking: boolean
dueAt: RFC3339 timestamp | null
riskCategories: RISK_CATEGORY[] (1..10, unique)
exceptionApprovalRef: string | null (Repository内approval record path#hashだけ)
```

`RISK_CATEGORY`は`correctness | security | privacy | accessibility | seo | performance | cost | evidence-freshness | operations | maintainability`。Minor / Open QuestionはOwner必須、Open Questionは`affectedGate != None`かつ`dueAt`必須。Critical / Majorは`blocking=true`。Security / Privacyは有効なHuman exception dispositionが結合されるまでSeverityを問わずBlockingとする。

`RESOLVED_REF`は`findingId`、`priorArtifactBindingHash`、`priorSourceFingerprint`、`verificationEvidenceRefs`を必須とする。後続Artifact / revisionにBindingされた同一Reviewer categoryの新ResultだけがCritical / Major解消を主張できる。

## `human-disposition-v1`

Human判断はReviewer Resultを書き換えず、別のBound payloadとして保存する。

```text
schemaVersion: "human-disposition-v1"
runId: RUN_ID
featureId: ID
taskId: ID | null
scope: "task" | "feature" | "codex"
artifactBindingHash: HASH
reviewInputPayloadHash: HASH
sourceFingerprint: HASH
findingId: ID
decision: "accept" | "defer" | "reject" | "resolve"
actor: ID
decidedAt: RFC3339 timestamp
rationale: string (1..1000 bytes; data only)
affectedGate: "Gate1" | "Gate2" | "Gate3" | "Gate4" | "Gate5" | "Gate6" | "None"
deadline: RFC3339 timestamp | null
approvalRecordPath: string (Repository相対path、1..500 bytes)
approvalRecordHash: HASH
exceptionScope: string | null (0..500 bytes)
exceptionExpiresAt: RFC3339 timestamp | null
```

Critical / MajorはいずれのHuman decisionでも解消せず、後続Reviewer / Integration Resultだけが解消できる。Minorの`accept / defer`はapproval record必須。Open Questionは現在Gate以前に影響する間Blocking。Security / Privacy例外は`accept / defer`、限定scope、expiry、承認Recordが揃う場合だけ例外候補とする。

Human dispositionの`resolve`はMinor / Open Questionにだけ使用できる。Critical / MajorへのHuman `resolve / accept / defer / reject`はすべてBlockingを解除しない。

## `human-decision-record-v1`

Source recordは`docs/reviews/features/<feature-id>/human-decisions.md`内の厳格JSON blockで、Humanだけが作成・編集する。Required fields only: `schemaVersion`、`decisionId`、`featureId`、`findingId`、`decision`、`actorRole="Human"`、`actorLabel`、`decidedAt`、`rationale`、`currentGate`、`affectedGate`、`reviewedRevision`、`artifactBindingHash`、`deadline | null`、`exceptionScope | null`、`exceptionExpiresAt | null`。1 record 8 KiB、1 file 100 records、decision / finding ID重複禁止。

ControllerはSource record exact bytes hash、Source-tree revision、CSPRNG nonceへのInteractive Human confirmationを結合して`human-disposition-v1`を派生する。Source変更、非対話、actorRole不一致はBlocked。署名・本人性は保証せず、`docs/process/01-responsibility-boundaries.md`のローカル単一Humanを信頼境界とする。

Human decision / approval recordを編集した時点で旧Review Resultはstaleになる。次のfresh full-review RunのSnapshotは更新済みLogとDecision recordをContextとして含め、Reviewerが現在状態を再評価する。prior Finding IDはprovenanceにすぎない。`human-disposition-v1`をIntegrationへ使えるのは、新Reviewerがcurrent Runで発行・維持した同一Finding IDに対し、current Run / Artifact Bindingへ改めて派生した場合だけである。

## `integration-result-v1`

IntegrationはRoutingと別の新規RO Invocationで行い、同一Session状態へ依存しない。

Required fields only:

```text
schemaVersion: "integration-result-v1"
runId: ID
featureId: ID
taskId: ID | null
scope: "task" | "feature" | "codex"
artifactBindingHash: HASH
reviewInputPayloadHash: HASH
sourceFingerprint: HASH
agentId: "review-orchestrator"
roleVersion: ID
invocationId: ID (routing invocationとは異なる)
routingInvocationId: ID
routingResultHash: HASH
orderedReviewerResultHashes: HASH[] (1..5, routing順と一致、unique)
humanDispositionHashes: HASH[] (0..100, unique, findingとRun binding一致)
result: "pass" | "fail" | "blocked"
findingIds: ID[] (0..500, unique; Active Findingのみ)
resolvedFindingIds: ID[] (0..500, unique; Activeと重複禁止)
severityCounts: { Critical: integer, Major: integer, Minor: integer, OpenQuestion: integer }
```

全Reviewer ResultとHuman Dispositionは当該current Run / Artifact Bindingと一致しなければならない。prior Review Resultはprovenanceとして参照できるが、pass / Finding解消の入力へ再利用しない。

各countは0..500で、Active集合だけを数え、合計は`findingIds`件数と一致させる。Reviewer Result全集合からResolved refsと有効Dispositionを適用してActive / Resolved集合をfindingId順に再計算する。

ControllerはSchema parse後、Expected RO agent ID / roleVersion、routing hash、順序付きReviewer result hash、Run / Artifact binding、Finding集合と件数を決定論的に再計算する。不一致、parse失敗、上限超過はBlockedとする。

### Deterministic Result Algorithm

1. Schema、hash、identity、ordering、binding、Closure、Freshnessの不一致は`blocked`。
2. Reviewerが`blocked`、または必要Reviewer Result欠落なら`blocked`。
3. Critical / Majorは、later Artifact / Source revisionにBindingした`RESOLVED_REF`を含む新Reviewer Resultと新Integration Resultがある場合だけActive集合から除く。Human dispositionでは除かない。Active C / Mが1件以上なら`fail`。
4. 現在Gateへ影響するOpen Question、無効なMinor disposition、承認済み例外のないSecurity / Privacy findingは`blocked`。
5. 全FindingのDispositionとSeverity countを再計算し、矛盾があれば`blocked`。
6. 上記がなく全Reviewerがpassなら`pass`。

ROの申告`result`だけを信頼せずControllerが同じAlgorithmで再計算し、一致しなければBlockedとする。

## `review-input-v1`

Collectorだけが生成する。Required fields only:

```text
schemaVersion: "review-input-v1"
runId: RUN_ID
featureId: ID
taskId: ID | null
scope: "task" | "feature" | "codex"
currentGate: GATE
runBindingHash: HASH
baseRevision: ID
currentRevision: ID
sourceFingerprint: HASH
sourceManifestHash: HASH
diffHash: HASH
specSnapshotHash: HASH
planSnapshotHash: HASH
tasksSnapshotHash: HASH
evidenceSnapshotHashes: HASH[] (0..100, path順)
closureManifestHash: HASH
toolchainDigests: HASH[] (1..20, tool ID順)
producerId: ID
producerVersion: ID
changedFiles: CHANGED_FILE[] (0..10000)
reviewInputPayloadHash: HASH
```

各Snapshot / Diff / ManifestはRuntime内content-addressed ArtifactをHash参照する。必須SnapshotがN/Aの場合は省略せず、理由Codeを持つ空ArtifactのHashを使う。

`changedFiles`は最大10,000件、各Entryは次だけを持つ。

```text
path: normalized Repository-relative path
changeType: "add" | "modify" | "delete" | "rename" | "mode-change" | "symlink-change"
contentHash: HASH | null
riskTags: RISK_TAG[] (1..10, unique)
ruleIds: ID[] (1..20, unique)
producerVersion: ID
entryHash: HASH
```

`RISK_TAG`は`correctness | security | frontend | performance-cost | evidence-content | unknown`。Path / changeType / riskTag / ruleIdは検証済みCollectorがImmutable base snapshot作成後に生成し、Artifact hashへBindingする。`unknown`が1件でもあればMinimum Routingは5 Reviewerすべてとする。

`reviewInputPayloadHash`は同field自身をomitした上記payloadのHashである。次の外側RecordだけがこれをRunへBindingする。

## `artifact-binding-v1`

Required fields only: `schemaVersion="artifact-binding-v1"`、`runId`、`featureId`、`taskId | null`、`scope`、`currentGate`、`runBindingHash`、`baseRevision`、`currentRevision`、`sourceFingerprint`、`reviewInputPayloadHash`、`bindingHash`。`bindingHash`は自身をomitして計算する。下流Resultは`artifactBindingHash=bindingHash`を参照し、Review input payloadから下流Resultや外側Bindingへ逆参照しない。

## `closure-manifest-v1`

```text
schemaVersion: "closure-manifest-v1"
runId: RUN_ID
featureId: ID
taskId: ID | null
scope: "task" | "feature" | "codex"
currentGate: GATE
runBindingHash: HASH
baseRevision: ID
currentRevision: ID
resolverId: ID
resolverVersion: ID
entriesRoot: HASH
edgesRoot: HASH
capsRoot: HASH
caps: [{ tier: TIER, maxFiles: 0..100000, maxBytes: 0..2147483648, maxDepth: 0..100, timeoutMs: 1..3600000 }]
entries: CLOSURE_ENTRY[] (0..100000, unique entryId)
edges: CLOSURE_EDGE[] (0..200000, unique tuple)
unresolvedEdges: []
rootHash: HASH
```

`CLOSURE_ENTRY` required fields: `entryId`、`tier`（`first-party | vendored | third-party | toolchain | project-evidence`）、`pathOrPackage`、`type`（`source | config | type | schema | generated-source | test | fixture | build-config | package-contract | toolchain | evidence`）、`contentHash | null`、`integrity | null`、`size`、`resolverId`、`resolverVersion`、`toolchainDigest | null`。

`CLOSURE_EDGE` required fields: `fromEntryId`、`toEntryId`、`kind`（`import | require | type-ref | schema-ref | generated-from | test-of | config-for | package-dependency | toolchain-for | evidence-for`）、`resolution`（`exact-bytes | cas | lock-integrity-contract | toolchain-digest`）。

Tier順は`first-party, vendored, third-party, toolchain, project-evidence`で固定し、`caps`はこの5 Tierを各1件ちょうど含める。未使用Tierは`maxFiles=0, maxBytes=0`とする。Entryは`entryId`順、Edgeは完全tuple `(fromEntryId, toEntryId, kind, resolution)`順とし、tuple重複を拒否する。

`entriesRoot`、`edgesRoot`、`capsRoot`は必須のHASH型（64 lowercase hex）で、順にDomain `credit-site/closure-entries/v1`、`credit-site/closure-edges/v1`、`credit-site/closure-caps/v1`を使う。各inner rootのpayloadは対応する正規化配列だけであり、他配列やRoot fieldを含めない。

最終`rootHash`のpayloadは正確に`schemaVersion`、`runBindingHash`、`baseRevision`、`currentRevision`、`resolverId`、`resolverVersion`、`entriesRoot`、`edgesRoot`、`capsRoot`、`unresolvedEdges=[]`だけを持つ。`entries`、`edges`、`caps`配列は最終payloadへ含めず、`rootHash`自身もomitする。

Controllerは全changed / planned fileがEntry rootに存在し、Resolverが返す全必要edgeの両端が存在し、Tier表現とresolutionがPolicyに一致し、Caps内、`unresolvedEdges=[]`、再計算rootHash一致を確認する。Dynamic / generated / package contractを閉じられない場合はBlocked。

## `source-manifest-v1` and `diff-manifest-v1`

`source-manifest-v1` required fields: `schemaVersion`、`runId`、`featureId`、`taskId | null`、`scope`、`currentGate`、`runBindingHash`、`baseRevision`、`currentRevision`、`producerId / Version`、`entries`、`manifestHash`。Entry required fieldsは`path`、`type`、`mode`、`owner`、`device`、`inode`、`linkCount`、`symlinkTarget | null`、`size`、`contentHash | null`で、canonical path順とする。Runtime固定除外以外の全tracked / untrackedを含める。外側Artifact / Result hashは禁止する。

`diff-manifest-v1` required fields: `schemaVersion`、`runId`、`featureId`、`taskId | null`、`scope`、`currentGate`、`runBindingHash`、`baseRevision`、`currentRevision`、`sourceManifestHash`、`changes`、`diffHash`。Changeは`path`、`changeType`、`beforeHash | null`、`afterHash | null`、`oldPath | null`を持ち、path / changeType順とする。外側Artifact / Result hashは禁止する。

## Finding Lifecycle

| Severity / category | Human decision | State effect |
|---|---|---|
| Critical / Major | accept / defer / reject / resolve | Activeのまま。後続Reviewer ResultのRESOLVED_REFだけが解消可能 |
| Minor | accept | Human approval recordが有効ならNon-blocking accepted |
| Minor | defer | Owner、deadline、approvalが有効ならNon-blocking deferred |
| Minor | reject | Active。新ReviewでFinding不成立を検証するまで解除しない |
| Minor | resolve | 修正証拠と後続ReviewがあればResolved |
| Open Question | accept / defer | `affectedGate`が`currentGate`以前ならBlocking。将来GateかつOwner / deadline / constraint承認があればDeferred |
| Open Question | reject / resolve | 後続Review / 承認済み仕様証拠があればResolved、それ以外Active |
| Security / Privacy Minor / OQ | accept / defer | scope、expiry、承認Recordが有効な例外時だけ候補。C / Mは例外で解除不可 |

IntegrationはBindingの`currentGate`、Active Finding集合、Disposition、後続Resultをこの表で一意に再計算する。

## Deterministic Minimum Routing

ControllerはArtifactの機械的なchanged-path / risk tagから次を算出する。ROは削除できない。

| Condition | Required reviewer |
|---|---|
| Always | Correctness |
| Auth、input、external communication、secret、PII、dependency、permission | Security |
| UI、interaction、style、metadata、accessibility、SEO | Frontend Quality |
| Bundle、image、query、cache、API、build、storage、hosting、cost | Performance / Cost |
| Card data、article、comparison、search display、source、freshness、Disclosure Status | Evidence / Content |

Path / tag規則とFixtureはStack決定後WF-12証跡へ固定する。分類不能は保守的に該当候補を追加し、必要Closureを収集できなければBlockedとする。
