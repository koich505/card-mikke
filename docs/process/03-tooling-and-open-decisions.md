# Tooling and Open Decisions

Status: Adopted tools with deferred configuration  
Decision date: 2026-08-08

## Adopted Tool Roles

| Tool | Adopted role | Current state |
|---|---|---|
| GitHub Spec Kit | Feature仕様、計画、Task分割、整合性・収束確認 | 採用決定。未導入 |
| OpenCode | ローカルCoding AgentとImplementer / Reviewerの実行環境 | 採用決定。未導入 |
| Ollama | OpenCodeが利用するローカル推論Provider | 採用決定。Model未選定 |
| Codex | ローカルゲート後の独立した最終レビュー | 採用決定。運用詳細は実装前に確認 |
| Cursor | 人間による差分確認、軽微な編集、UI目視確認 | 採用可能 |
| Git / Git worktree | branch管理と安全な並列作業の隔離 | 採用決定 |
| GitHub Actions | Pull Request上の決定論的な最終CI | 採用決定。未設定 |

Spec Kitは実装主体ではない。Spec Kitの成果物とコマンドをOpenCodeで実行すると、接続されたOllamaのモデルが仕様作成支援や実装を行う。

## Initial Operating Assumptions

- Implementation Orchestrator、実装用Agent、Review Orchestrator、専門Reviewerを分離する。
- Implementerは計画済みApplication code、Test、実装文書だけを編集可能とし、採用VersionでPath permissionを検証する。表現できない場合はpre / post manifest Guardを必須とする。Implementation OrchestratorはReviewerではない別Roleとして`tasks.md`の`Parallel Execution`項目と`implementation-log.md`だけを更新可能とする。Review OrchestratorとすべてのReviewerは例外なくread-onlyとし、編集・修正は禁止する。
- ShellはWF-12で検証した固定allowlistだけを許可し、git write、破壊的操作、Package install、Network、Credential / environment dumpを禁止する。
- Implementation OrchestratorはTask実行直前に依存、予定変更範囲、Worker競合、共有Contract、Test、Local resourceを再確認し、Parallel Candidateを`Approved`または`No`へ確定する。
- Correctness Reviewerは原則常時実行し、その他の専門Reviewerは差分とリスクに応じて選択する。
- すべてのAgentでcommit、push、PR作成、mergeを禁止する。
- OpenCodeで実用的な長文Contextを扱うため、まず64k tokens以上を候補条件とし、実機Benchmarkで確定する。
- 初期のローカル同時実行数は1とする。
- Spec Kitや各ToolのVersionは導入時に固定し、更新手順を記録する。

## Open Decisions

未決事項は導入を止めるものではない。右欄のGateまでに決定する。

| ID | Decision | Required before | Notes |
|---|---|---|---|
| WF-1 | Code Mockを補助するDesign Tool、Screenshot、Mock Versioning方法 | 最初のUI Mock承認 | 実行可能なCode Mockは採用済み。補助成果物は`docs/design/ui/mocks/`から対象Code Versionを追跡可能にする |
| WF-2A | UI Bootstrap用の暫定Frontend Stack、Package Manager、Application配置 | 最初のUI Mock作成 | Humanが承認し、`docs/architecture/decisions/`の暫定ADRへ固定範囲と再評価範囲を記録する。特定Frameworkを未承認の既定値にしない |
| WF-2B | 本番Web Stack、Hosting、Package Managerの最終判断 | Architecture承認 / `speckit.plan`確定 | Requirements、非機能要件、暫定ADRを再評価し、本番ArchitectureとしてHumanが承認する |
| WF-3 | Ollamaの具体Model、Quantization、Context長 | 最初のローカル実装 | 実機の品質・速度・メモリBenchmarkで決める |
| WF-4 | Spec Kit、OpenCode、Ollama等の固定Version | Tool初期化 | 再現可能性とUpgrade方針を記録する |
| WF-5A | UI Bootstrap / Review用の最小品質コマンド（`format:check`、`lint`、`typecheck`、`build`およびそれらをまとめる`quality`） | UI Bootstrap前 | Gate 2まで継続して再現可能にし、UI Mock Approval時に成功結果を確認する。UIでTestを追加した場合は`quality`へ含める |
| WF-5B | 本実装Task用に`test`等を含めて拡張する品質コマンド | 最初の本実装Task | Gate 4で必要なformat / lint / typecheck / test / buildを単一の品質コマンドから再現可能にする |
| WF-6A | UI-only code用のSecret scanと依存脆弱性監査Toolおよび実行方法 | UI Bootstrap前 | Gate 2まで継続して再現可能にし、Secret scanはUI-only工程、依存監査はBootstrap時とLockfile変更時に実行する |
| WF-6B | 本実装 / PR用のSAST等の追加Security scannerとCI実行方法 | 最初の本実装Task（CI設定は最初のPR） | Gate 4のLocal GateとGate 6のCIの双方で再現可能にする |
| WF-7 | Hosting、外部API、LLM等の費用上限と警告閾値 | Architecture承認 | 月額上限とfeature単位の増分確認方法を決める |
| WF-8 | 並列実行数を1から増やす条件 | 並列化開始 | メモリ、レビュー品質、競合率に加え、Logの単独Writer、lock、Revision precondition、Task ownership、Artifact Path競合防止を検証する |
| WF-9 | GitHub Actionsの必須JobとBranch protection | 最初のPR | Local Gateと同一内容を基本とする |
| WF-10 | UIレビュー・承認記録のTemplate、Versioning、相互Link方式 | 最初のUI Mock承認 | 保存場所はレビュー=`docs/reviews/ui/`、承認=`docs/design/ui/approvals/`で決定済み |
| WF-11 | Codexへ渡す最小Contextと再レビュー条件 | 最初のCodex review | 解決まではCodex Critical / Major修正後の再Reviewを必須とし、不要例外を設けない |
| WF-12 | OpenCode / Spec Kit実行契約のVersion検証 | 最初の本実装TaskがGate 4へ入る前 | Owner: Human / Tooling Maintainer。`.opencode/tooling/installed-command-manifest.json`（採用時生成、現時点なし）またはExternal Wrapper、status以外のfresh Run / Runtime、Run IDなしIntent→CSPRNG ID必須final Run Binding、Hash DAG、Closure inner roots、変更後のfull-review再実行、Controller allowlistを実証する。Prompt推論は禁止。強制不能ならWrapper承認まで全Command使用不可。証跡は`docs/tooling/open-code-validation.md`へ一意に保存する |

## Deferred Alternatives

Goose、Aider、OpenHands等は現時点では採用しない。OpenCode + Ollamaで不足が実測された場合に再評価する。`review-orchestrator.md`はPrompt上の役割として定義し、初期段階で専用のOrchestration softwareは作成しない。

## Known Deferred Verification

WF-12 / IMP-OQ-003 / IMP-OQ-004 / IMP-OQ-005は`Not yet verified / Blocking by design`である。OQ-005はCommand file identityから定数Intentを得るInstalled ManifestまたはExternal Wrapper、専用Resolver、固定Agent allowlistを検証する。実効的に強制できなければExternal Wrapper方式をHumanが決定する。

- Owner: Human / Tooling Maintainer
- Deadline: 最初の本実装TaskがGate 4へ入る前
- Evidence: `docs/tooling/open-code-validation.md`（未作成。WF-12実証時にHuman Tooling MaintainerがManifest hashを承認して作成）
- Completion: 上表WF-12へ採用VersionとEvidence Pathを追記し、Gate 4 Checklistから参照可能にする
- Current effect: `/status-feature`を含む全Project固有CommandはBlocked。未検証状態はHumanが本表を直接確認する

## Next Resume Point

次の成果物作成工程は機能・非機能要件である。UI開始前にWF-2A、WF-5A、WF-6Aを解決するが、その他のTool詳細を先にすべて決定する必要はない。RequirementsとUI Mockで必要な情報が揃った後、Architectureと最初のfeature sliceに必要な項目から順に解決する。WF-3、WF-4、WF-5B、WF-6B、およびWF-12のAdapter検証は、最初の本実装TaskがGate 4へ入る前に完了する。
