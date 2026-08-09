# UI-first Implementation Policy

Status: Adopted working decision
Decision date: 2026-08-09

## Purpose

本書は、承認済みRequirementsを基にHigh-fidelity UI Mockをコードで作成し、承認後に本実装へ安全に昇格させる方針を定める。

本プロジェクトでは、使い捨ての別Applicationを原則作らず、本番候補のFrontend Applicationを`UI-only mode`で先行構築する。ただし、UI Mockの承認を本番実装完了とはみなさない。

## Entry Conditions

UI作成を開始するには、以下を満たす必要がある。

- Requirementsが人間に承認されている。
- UI工程へ持ち越す仮説とOpen Questionが識別されている。
- Frontendの最小技術判断が記録されている。
- Applicationの配置場所、Node.js、Package Manager、Next.js、TypeScript、Linter、Formatterの方針が決まっている。
- DomainまたはRequirementsのCritical / Majorが残っていない。

Frontendの最小技術判断はUIを作るためのBootstrap判断であり、DB、API、認証、Hosting等の本番Architecture全体を先取りしない。

## Application Placement

UI Mockの実行コードは`docs/`内へ置かない。最終的なApplicationとして利用する予定の場所へ置く。

配置場所はFrontend Bootstrap時に決定し、`apps/web/`またはリポジトリルート等からProject構成に合うものを選ぶ。同じUIを`prototype/`と本番Applicationへ二重管理しない。

`docs/design/ui/`には、UI Scope、Information Architecture、User Flow、Screen Inventory、レビュー結果、承認記録を置く。

## UI-only Mode

UI工程で実装してよいものは以下である。

- Design Token
- Typography、Color、Spacing、Layout
- Navigationと主要なUser Flow
- Presentational Component
- Responsive表示
- Loading、Empty、Error、Partial、Unknown状態
- Keyboard操作、Focus、Semantic HTML等のAccessibility
- Metadata、見出し、内部Link等のUIに直接関係するSEO
- 実際に近い日本語文言とデータ量
- UI上のInteraction
- UI表示用の暫定View Model
- Fixtureを用いた画面状態

UI工程では以下を実装しない。

- DB Schema、ORM、Migration
- 本番APIまたは外部Service統合
- 認証・認可基盤
- CMSまたは本番更新Pipeline
- 本番Cache、Queue、Search Engine
- Hosting、Infrastructure as Code
- UI都合で固定したDomain Entity
- 本番用に見せかけた仮の永続化
- 複雑なBusiness Logic

## Fixture Boundary

Fixtureは専用Directoryへ隔離し、Presentational Component内へ直接埋め込まない。

```text
Application
├── src/app/
├── src/components/
├── src/features/
├── src/fixtures/
├── src/styles/
└── src/types/
```

UI ComponentはProps等を通じて表示用データを受け取る。Fixtureの形を、永続化Model、Domain Entity、API Contractとして確定しない。暫定型にはUI Prototype用のView Modelであることを明示する。

## Minimum Quality Foundation

Frontend Bootstrap時に、少なくとも以下を用意する。

- TypeScript strict
- LinterとNext.js / React / Accessibility Rule
- Formatter
- `dev`、`build`、`lint`、`typecheck`、`format:check` Command
- 上記をまとめる単一の`quality` Command
- Package ManagerのLockfile
- Node.jsとPackage ManagerのVersion方針
- Fixtureの配置規則

最初の主要画面が操作可能になった段階で、主要User Flow、Desktop / Mobile、Accessibilityを確認するBrowser Testを追加する。Unit Testは状態LogicやUtility等、独立して検証する価値が生じた時点で追加する。

## Required UI Artifacts

UI工程では、Requirementsに応じて以下を作成する。

```text
docs/design/ui/
├── 00-ui-scope.md
├── 01-information-architecture.md
├── 02-user-flows.md
├── 03-screen-inventory.md
├── 04-ui-requirements.md
└── approvals/
    └── ui-mock-approval.md
```

UIレビュー結果は、他レイヤーと同様に`docs/reviews/ui/`へ置く。

画面Screenshot等を保存する場合は、レビュー対象Versionを識別できる場所へ置き、実行コードをSource of Truthとする。画像だけでInteractionを確定しない。

## Iteration Flow

1. UI AgentがRequirementsとUI Open Questionを確認する。
2. ユーザーとInformation Architecture、User Flow、画面構成を対話で決める。
3. UI AgentがApplication上でHigh-fidelity UIを実装する。
4. ユーザーが実際に操作し、UI Agentが修正する。
5. UI Reviewerが独立ContextでRequirements、実装、状態、Accessibilityを確認する。
6. Critical / Majorを修正し、影響範囲を再レビューする。
7. UI Approval Checklistを満たした後、人間が`UI Mock Approved`を記録する。

Requirementsの変更が必要になった場合は、口頭でUIだけを変更せず、Requirementsへ戻して承認を更新する。

## Approval Gate

UI Mock Approvalは人間だけが行う。承認記録には以下を含める。

- 承認日
- 承認者
- 対象Requirements VersionまたはCommit
- 対象UI VersionまたはCommit
- 対象画面とUser Flow
- 承認済みの仮説
- 残存するOpen Question
- 既知のMinor findingと扱い

## Promotion to Production Implementation

UI承認後、Spec Kitのfeature sliceごとにUIコードを評価し、以下へ分類する。

- `As-is reuse`: そのまま本実装へ利用可能
- `Refactor before reuse`: 責務、型、Test等を整えて利用
- `Replace`: 本番の契約や品質に合わせて作り直す
- `Remove`: Fixture、Debug表示、仮Interaction等を削除

原則としてDesign Token、Layout、Presentational Component、Responsive、Accessibility対応は再利用候補とする。Fixture、データ取得、Business Logic、認証・認可、Cache、永続化、最終的な型はArchitectureとfeature planで再評価する。

UI Mock Approval後の流れは以下とする。

```text
UI Mock Approved
    -> Spec Kit feature specification
    -> Technical plan and task breakdown
    -> UI code promotion assessment
    -> Local implementation and review loop
    -> Codex final review
    -> Human delivery
```

## Exit Conditions

- 主要画面とUser Flowが実際に操作できる。
- Desktop / Mobileおよび主要状態が確認できる。
- RequirementsとUIのTraceabilityがある。
- UI ReviewerのCritical / Majorが0件である。
- MinorとOpen Questionの扱いが記録されている。
- 人間が`UI Mock Approved`を記録している。
- 本実装へ持ち越す項目と、再評価する項目が識別されている。
