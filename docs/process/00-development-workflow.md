# Development Workflow

Status: Adopted working decision  
Decision date: 2026-08-08

## Purpose

本書は、日本国内のクレジットカード情報サイトを、仕様・UI・実装の対応関係を保ちながら開発するための標準フローを定める。

Spec Kit、OpenCode、Ollama等の導入手順ではなく、導入後も維持するプロジェクト上の責任分界とゲートを定義する。

成果物とAI指示の配置ルールは、`docs/README.md`および`.ai/README.md`を正本とする。

## Artifact Locations

| Phase | Primary output | AI instructions |
|---|---|---|
| Market research and audit | `docs/research/` | `.ai/research/` |
| Domain specification | `docs/spec/domain/` | `.ai/domain/` |
| Domain review and correction | `docs/reviews/domain/` | `.ai/domain/` |
| Functional / non-functional requirements | `docs/spec/requirements/` | `.ai/requirements/` |
| Requirements review | `docs/reviews/requirements/` | `.ai/requirements/` |
| User flow and UI mock approval | `docs/design/ui/` | `.ai/ui/` |
| Architecture decisions | `docs/architecture/` | `.ai/architecture/` |
| Feature specification, architecture, and tasks | `specs/<feature>/`, `docs/architecture/decisions/` | Spec Kit and `.ai/architecture/` |
| Implementation and local review | Application code and tests | `.ai/implementation/` |
| Final review and delivery | `docs/reviews/features/` and Pull Request | `.ai/delivery/` |

上記を現行の配置ルールとする。必要性が生じていない空フォルダは先回りして作らず、対象レイヤーの作業開始時に追加する。

## Standard Flow

1. **Domain Specification**
   - 市場調査を根拠としてConcept、境界、不変条件、Open Questionを管理する。
   - 現行仕様はRequirements作成への入力として条件付きReadyである。
2. **Functional / Non-functional Requirements**
   - ユーザー価値、対象範囲、受入条件、品質要求を自然言語で定義する。
   - Domain SpecificationのUnknownとOpen Questionを確定事項へ変換しない。
3. **User Flow and High-fidelity UI Mock**
   - AIとの対話を用い、主要画面と状態を実装前に具体化する。
   - RequirementsとMockは相互に反復してよい。
   - `docs/process/04-ui-first-implementation.md`に従い、本番候補ApplicationをUI-only modeで構築する。
   - このUI-only codeは承認前の設計検証成果物であり、本番機能、本番Data Contract、Gate 3 / Gate 4の本番実装ではない。承認前に本番利用しない。
4. **UI Mock Approval Gate**
   - 人間がMockを承認し、`UI Mock Approved`を記録する。
   - ユーザー向け機能は、この承認前に実装計画へ進めない。
   - UI影響がないbackend、operations、enabling featureは、理由と承認者を記録してUI Mockを`Not Applicable`にできる。
5. **Feature Specification with Spec Kit**
   - 承認済みRequirementsとMockを入力に、機能スライス単位の`spec.md`を作成する。
   - Humanが候補からProvisional Sliceを選択した後に仕様化し、Clarify後のFinal Scopeを承認する。
   - `/speckit.clarify`と要件チェックリストで曖昧さを減らす。
   - UIに影響する曖昧さが判明した場合はMockへ戻り、再承認する。
   - `spec.md`作成後、Technical Plan確定前に`plan.md`へUI code promotion assessment、またはUI影響なしの承認済みN/Aを記録する。
   - 小規模featureでもFinal Scope ApprovalをArchitecture着手前に記録し、Planning Approvalと意味・時点を分離する。同一会議または連続操作で扱えても統合・遡及承認しない。
   - Final Scope Approval後に実質的なScope変更が生じた場合はPlanningを止め、`spec.md`、Clarify、Final Scope Approvalへ戻る。
6. **Technical Plan and Task Breakdown**
   - `/speckit.plan`で機能スライス全体の技術計画・テスト方針を作る。
   - `/speckit.tasks`で依存順の実装Taskへ分割する。
   - `/speckit.analyze`で`spec.md`、`plan.md`、`tasks.md`の整合性を確認する。
   - Task Planningでは並列状態を`No`または`Candidate`まで判定する。Implementation Orchestratorだけが実行直前に依存、予定変更範囲、Worker競合等を確認し、`tasks.md`の`Parallel Execution`項目へ`Approved`または`No`を根拠付きで記録できる。
   - HumanがPlanning Summaryと実装開始を承認する。
7. **Local Implementation and Review Loop**
   - OpenCodeからOllamaのローカルモデルへ実装Taskを渡す。
   - 実装、決定論的チェック、別コンテキストのローカルレビュー、修正を反復する。
   - 原則3周を上限とし、収束しない場合は人間へエスカレーションする。
8. **Feature Convergence**
   - 機能スライス内のTask完了後、`/speckit.converge`で仕様に対する実装漏れを確認する。
   - 不足Taskが追加された場合はローカルループへ戻す。
9. **Codex Final Review**
   - ローカルゲート通過後の機能差分をCodexが原則1回レビューする。
   - CriticalまたはMajorがあれば、指摘をローカルループへ戻す。
   - 修正後はローカルゲートを再実行し、影響が実質的ならCodexも再レビューする。
10. **Human Delivery**
    - 人間がCursor等で差分、動作、UIを最終確認する。
    - 人間がcommit、push、Pull Request作成、CI確認、Squash mergeを行う。

## Delivery Unit

- **1 feature slice = 1 branch = 1 Pull Request**を標準とする。
- Spec Kitの個別Taskは、機能スライス内部の作業単位であり、原則として個別PRにはしない。
- 人間は必要に応じてTask単位で論理的な途中commitを作成できる。
- 大きすぎる機能は、独立して受入可能な複数のfeature sliceへ分割する。
- Codexの最終レビュー対象は、原則としてfeature slice全体の差分とする。

## Parallel Work

並列実行は、依存関係がなく、編集対象・契約・Migration等が競合しないTaskまたはfeature sliceに限る。

- Task一覧で並列可能性が示されても、実際のファイル競合がないことを確認する。
- 並列feature sliceは別branchと別worktreeで隔離する。
- 初期運用の同時実行数は1とし、モデル品質、メモリ使用量、競合頻度を確認してから増やす。
- 共有契約や基盤変更は先に直列で確定する。

## Change Control

- 承認済みMockのユーザー体験を変える場合は、RequirementsとMockを更新し再承認する。
- `spec.md`、`plan.md`、`tasks.md`と実装の差異を口頭合意だけで残さない。
- Codexレビュー後の実質的変更は、該当するローカルゲートと最終レビューを再実行する。
- AIの会話ログはSource of Truthにしない。採用した決定だけをMarkdownへ反映する。

## Current Boundary

現時点ではDomain Specificationと開発・UI工程方針が文書化され、次の工程はRequirements作成である。Requirements、UI Mock、Architecture、本番実装、およびSpec Kit / OpenCode / Ollama / CIの初期化・設定は、各Entry Conditionと明示的な作業依頼を満たすまで開始しない。
