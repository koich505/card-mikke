# Feature Planning and Architecture Process

Status: Adopted working decision
Decision date: 2026-08-09

## Purpose

本書は、承認済みRequirementsと、UI影響がある場合の承認済みUI Mockを、独立して受入・Review・Deliveryできるfeature sliceへ分割し、Spec Kitの`spec.md`、`plan.md`、`tasks.md`およびArchitecture Decisionへ変換する手順を定める。

この工程は実装内容を計画するが、Application codeを実装せず、Local Agentを起動しない。Task実行と並列可否の最終判定はImplementation工程の責任とする。

## Entry Conditions

- RequirementsがHumanに承認されている。
- UI影響があるfeatureでは、対象UI MockがHumanにより`UI Mock Approved`と記録されている。
- UI影響がないbackend、operations、enabling featureでは、UI Mockを`Not Applicable`とする理由と承認者が記録されている。
- Requirements Reviewer、およびUI影響がある場合はUI ReviewerのCritical / Majorが0件である。
- 持越Open QuestionにOwner、期限、解決Gate、戻し先がある。
- 対象Requirements Version、UI Version、関連Domain文書を追跡できる。
- Spec Kitを使用する場合、導入Versionと管理領域が確認されている。

## Standard Flow

```text
Approved Requirements and applicable UI
    -> Feature slice candidates
    -> Human provisional slice selection
    -> spec.md
    -> Clarify / Checklist
    -> Human final scope approval
    -> UI code promotion assessment or approved N/A
    -> Architecture decisions / ADR
    -> plan.md
    -> tasks.md and dependency graph
    -> Analyze / independent review
    -> Human planning approval
    -> Implementation handoff
```

小規模featureでも、Final Scope ApprovalとPlanning Approvalは意味と時点を分離する。Final Scope ApprovalはClarify完了後かつArchitecture、Promotion Assessment、`plan.md`、`tasks.md`の確定着手前に記録する。後のPlanning Approvalを同一の会議または連続した操作で扱うことはできるが、Planning成果物を根拠にFinal Scope Approvalを遡及記録したり、両者を一つの承認へ統合したりしない。

## Feature Slice

feature sliceは次を満たす単位とする。

- 独立したユーザー価値または運用価値がある。
- 明確なScope、Non-goals、Acceptance Criteriaがある。
- 1 branch、1 Pull RequestでReview可能である。
- 単独で検証可能である。
- Requirementsと承認済みUIへ追跡できる。
- 他featureとの依存関係を説明できる。
- 未完了の大きな基盤変更を暗黙の前提にしない。

大きすぎるfeatureは垂直に分割し、UI、Data、Test等の技術層だけを別featureとして分離しない。共有Contractや基盤を先に確定する必要がある場合は、価値・利用者・完了条件を持つ明示的なenabling featureとして扱う。

## Human Scope Decisions

Feature Planning Agentは候補を提示し、HumanはSpecification作成前に`Provisional Slice Selection`として対象候補を選ぶ。この判断は詳細Scopeの最終承認ではない。

`spec.md`とClarify完了後、Humanは`Final Scope Approval`として以下を判断する。

- User value
- ScopeとNon-goals
- Acceptance Criteriaの方向性
- feature境界と依存
- 1 PRとしての大きさ
- 主要RiskとOpen Question

Humanが個別Taskを書くことは要求しない。

Final Scope Approval後にScopeまたはNon-goalsが実質的に変わる場合、Architecture、Promotion Assessment、`plan.md`、`tasks.md`の作成・更新を止め、`spec.md`へ反映してClarifyとFinal Scope Approvalを再実行する。表現修正等、受入範囲を変えない変更は変更理由を記録して継続できる。

## Feature Specification

Spec Kitを使用する場合、featureごとに以下を作る。

```text
specs/<feature-id>-<feature-name>/
├── spec.md
├── plan.md
└── tasks.md
```

`spec.md`はWhat / Whyを扱い、実装方法を固定しない。少なくとも以下を含める。

- Purpose and user value
- Scope and Non-goals
- User scenarios
- Feature requirements
- Acceptance Criteria
- Edge cases and failure states
- Requirements / UI traceability
- Dependencies
- Open Questions

UI、Requirements、Domainの変更が必要と判明した場合、先へ進まず該当工程へ戻す。Clarify後のScopeをHumanが承認するまでArchitectureとTask Breakdownを確定しない。

## UI Code Promotion Assessment

`spec.md`が明確になった後、Technical Plan確定前に対象UI-only codeを評価する。正本は対象featureの`plan.md`にある`UI Code Promotion Assessment` sectionとし、別紙を作る場合も同sectionから参照する。

| Classification | Meaning |
|---|---|
| As-is reuse | 本番品質とContractに適合し、そのまま利用可能 |
| Refactor before reuse | 責務、型、Test、Security等を整えて利用 |
| Replace | 本番Contractまたは品質に合わせて作り直す |
| Remove | Fixture、Debug、仮Interaction等として削除 |

対象ファイルまたはComponent、判断理由、関連Requirement、必要なTaskを記録する。未評価のUI-only code、Fixture、暫定View Model、仮Interactionを本番へ昇格しない。

UI影響がなく、再利用・置換・削除を判断するUI-only codeもないbackend、operations、enabling featureでは、同sectionを`Not Applicable`にできる。その場合は対象確認結果、N/A理由、承認者、承認日を`plan.md`へ記録する。

## Architecture Decisions

feature実装に必要な範囲だけArchitectureを決定する。

- Component and module responsibility
- Data flow and contract boundary
- Security and privacy
- Error handling
- Performance and cache
- Accessibility and SEO
- Evidence and freshness
- Operations and observability
- Cost
- Test strategy
- Rollback and compatibility

重要Decisionは`docs/architecture/decisions/`へADRとして置く。ADRにはContext、Decision、Alternatives、Consequences、Status、Owner、再評価条件を含める。

Domain Open QuestionをEvidenceなしで解決せず、固定的なDB、API、型、列挙へ変換しない。Architectureを進められない場合はResearch、Domain、Requirements、UIの適切な戻し先へエスカレーションする。

## Technical Plan

`plan.md`は少なくとも以下を含める。

- Approved feature scope
- Relevant ADRs
- UI code promotion assessment
- Components and responsibilities
- Data and external contract boundaries
- Files or areas expected to change
- Quality considerations table。Security、Privacy、Error handling、Performance、Cache、Accessibility、SEO、Evidence、Freshness、Operations、Observability、Costの各観点を`Applicable`または`Not Applicable`で判定し、対応またはN/A理由を記録する
- Test strategy and quality commands
- Migration / rollback / compatibility
- Implementation phases and dependencies
- Risks and Open Questions

Implementation Agentが推測でArchitectureを補完しなくてよい具体性を持たせる一方、関数単位の手順まで過剰に固定しない。

## Task Breakdown

Taskは単独で完了判定できる最小の実装単位とする。各Taskに以下を記載する。

```text
Task ID
Purpose
Inputs
Outputs
Dependencies
Planned files or ownership area
Out-of-scope files
Related Requirement / Acceptance Criterion
Completion / Acceptance Criteria (expected result and verification method)
Promotion classification or approved N/A
Required checks and tests
Risk
Parallel planning status (No / Candidate)
Parallel candidate group
Parallel Execution (Implementation Orchestrator reserved; blank during Planning)
Integration or merge order
```

Taskは原則として同じfeature branch内の作業単位であり、個別branchや個別PRを意味しない。

## Dependency and Parallel Status

Task Planningでは依存Graphを作り、並列状態を次の3値で管理する。

| Status | Meaning |
|---|---|
| No | 依存・競合があり直列実行する |
| Candidate | Planning上は独立して見えるが、実行前確認が必要 |
| Approved | Implementation工程の実行直前Checkを通過した |

Planning Agentが付けられるのは`No`または`Candidate`までである。`Approved`または実行時の`No`はImplementation Orchestratorだけが、現在のRepository状態、依存Task、予定変更範囲、Worker間競合、Contract、Test、Local resourceを実行直前に再確認した後に付ける。正本は`tasks.md`の該当Taskにある`Parallel Execution`項目とし、判定結果、判定者、判定日時、根拠、同時実行Groupを記録する。Implementation Orchestratorの編集権限はこの項目だけに限定し、Application codeやその他のPlanning内容を変更しない。実装レイヤーの詳細設計時にも、この更新権限と記録先を変更しない。

初期運用のImplementation laneは1とし、`Candidate`であってもSingle Agentで直列実行できる。並列化をTask分割の目的にしない。

## Parallel Candidate Criteria

次をすべて満たす場合だけ`Candidate`にできる。

- すべての依存Taskが同じ地点まで完了可能である。
- Planned filesまたはOwnership areaが重複しない。
- 共有型、API、DB、Config、Design Token等を変更しない。
- 他Taskの未完成Outputを参照しない。
- 単独でTestできる。
- Integration orderが結果を変えない。
- 競合時に安全にSequentialへ戻せる。

不明な場合は`No`とする。

## Planning Review

独立Reviewerは以下を確認する。

- Spec / Plan / Tasks / ADR / `plan.md`内のPromotion Assessmentまたは承認済みN/Aの整合
- 全Acceptance CriteriaのTaskとTestへのCoverage
- Domain / Requirements / UI Traceability
- Task dependencyの循環と欠落
- Planned filesと責任範囲
- Architectureの過不足
- Security、Performance、Accessibility、Evidence、Operations、Cost
- Parallel Candidateの根拠
- Human Decisionが必要な事項

Spec Kitの`clarify`、`checklist`、`analyze`は補助として利用する。Toolの成功だけでHuman承認または独立Reviewを代替しない。

## Human Planning Approval

AgentはHuman向けに次を要約する。

- Feature value、Scope、Non-goals
- Main Acceptance Criteria
- Architecture DecisionsとAlternatives
- UI code promotion summary
- Task数、依存Graph、Parallel Candidate
- Security、Cost、運用Risk
- Open Questions
- Human Decisions Required

Humanは重要判断、Risk、実装開始を承認する。Task本文を一行ずつ作成する必要はない。

## Prohibited Actions

- Application codeを実装しない。
- Local Implementation Agentを起動しない。
- Taskをcommit、push、mergeしない。
- Human承認なしにfeature Scopeまたは重要ADRを確定しない。
- 並列候補を実行可能と自動承認しない。
- Spec Kit生成物をProject固有の正本と矛盾させない。

## Exit Conditions

- HumanによるProvisional Slice SelectionとFinal Scope Approval、およびPlanning Summary承認を追跡できる。
- `spec.md`、`plan.md`内のPromotion Assessment（または承認済みN/A）、ADR、`tasks.md`が整合している。
- Planning ReviewerのCritical / Majorが0件である。
- MinorとOpen Questionの扱いが記録されている。
- 全Acceptance CriteriaをTaskとTestへ追跡できる。
- Task依存GraphとParallel statusがある。
- Implementationへ渡す対象branch、feature、Task順序、品質Commandが識別されている。
