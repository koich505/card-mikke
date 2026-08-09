# UI-first Implementation Policy

Status: Adopted working decision
Decision date: 2026-08-09

## Purpose

本書は、承認済みRequirementsを基にHigh-fidelity UI Mockをコードで作成し、承認後に本実装へ安全に昇格させる方針を定める。

本プロジェクトでは、使い捨ての別Applicationを原則作らず、本番候補のFrontend Applicationを`UI-only mode`で先行構築する。UI-only codeはUI Mock Approval前の設計検証成果物であり、本番機能、本番Data Contract、Gate 3 / Gate 4の本番実装ではない。承認およびPromotion Assessmentなしに本番利用しない。

## Entry Conditions

UI作成を開始するには、以下を満たす必要がある。

- Requirementsが人間に承認されている。
- UI工程へ持ち越す仮説とOpen Questionが識別されている。
- UI Bootstrapに必要な暫定Frontend判断がHumanに承認され、`docs/architecture/decisions/`の暫定ADRに記録されている。
- UI Bootstrap / Review用の最小`quality` Command、Secret scan、依存脆弱性監査Toolと実行方法が決定され、再現可能である。
- 暫定ADRにはApplication配置、Runtime、Package Manager、候補Framework、型・Lint・Format方針のうちUI Mock実行に必要な範囲、判断理由、固定範囲、再評価範囲、再評価Gateがある。特定Frameworkを未承認の既定値として扱わない。
- DomainまたはRequirementsのCritical / Majorが残っていない。

暫定Frontend判断はUI Mockを再現可能に動かすためだけに固定する。本番Architecture判断とは分離し、Feature Specification後かつTechnical Plan確定前のPromotion AssessmentとArchitecture工程で再評価する。DB、API、認証、Hosting、本番Data Contract、最終的なFramework・Package Manager選定を先取りしない。本番Architectureの承認者もHumanとする。

## Application Placement

UI Mockの実行コードは`docs/`内へ置かない。最終的なApplicationとして利用する予定の場所へ置く。

配置場所はFrontend Bootstrap時に決定し、`apps/web/`またはリポジトリルート等からProject構成に合うものを選ぶ。同じUIを`prototype/`と本番Applicationへ二重管理しない。

UI Scope、Information Architecture、Screen Inventory、UI Requirementsは`docs/design/ui/`直下、User Flowは`docs/design/ui/user-flows/`、Mockの説明・Version・Screenshotは`docs/design/ui/mocks/`、人間の承認記録は`docs/design/ui/approvals/`へ置く。レビュー結果は`docs/reviews/ui/`へ置く。

## UI-only Mode

UI工程で実装してよいものは以下である。

- Design Token
- Typography、Color、Spacing、Layout
- Navigationと主要なUser Flow
- Presentational Component
- Responsive表示
- Loading、Empty、Error、Partial、Unknown等の一般画面状態
- Keyboard操作、Focus、Semantic HTML等のAccessibility
- Metadata、見出し、内部Link等のUIに直接関係するSEO
- 実際に近い日本語文言とデータ量
- UI上のInteraction
- UI表示用の暫定View Model
- Fixtureを用いた画面状態

Domain上のDisclosure Statusは`unknown`、`undisclosed`、`partially_disclosed`、`disclosed`の4状態を正式表記とし、一般画面状態のUnknownと区別する。

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
- 実在個人情報、Credential、Secretを含むFixture
- UI検証に不要な永続化、Analytics、外部送信、外部Content埋込

## Fixture Boundary

Fixtureは合成データだけを使用し、実在個人情報、Credential、Secretを含めない。専用Directoryへ隔離し、Presentational Component内へ直接埋め込まない。

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

仮Formは送信・保存しない安全な挙動を既定とし、送信や保存を模擬する場合もMemory内の合成データだけで完結させて明示する。Analytics、外部通信、外部Link、埋込Contentは原則無効化し、検証に必要な例外はHuman承認と送信先・送信Dataを記録する。User inputをHTMLとして無加工表示せず、危険なURL schemeや注入を防ぐ。UI-only工程にもSecret scanを適用し、依存脆弱性確認はBootstrap時とLockfile変更時に行う。

## Minimum Quality Foundation

Frontend Bootstrap時に、少なくとも以下を用意する。

- TypeScript strict
- 採用された候補Framework、UI Library、Accessibilityに対応するLinter Rule
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
├── 03-screen-inventory.md
├── 04-ui-requirements.md
├── user-flows/
│   └── <flow-id>.md
├── mocks/
│   ├── <mock-version>.md
│   └── screenshots/
│       └── <mock-version>/
└── approvals/
    └── ui-mock-approval.md
```

UIレビュー結果は、他レイヤーと同様に`docs/reviews/ui/`へ置く。

画面Screenshotは`docs/design/ui/mocks/screenshots/<mock-version>/`へ置き、Mock説明から対象Code VersionまたはCommitを追跡可能にする。実行コードを操作可能なMockのSource of Truthとし、画像だけでInteractionを確定しない。補助Design Toolを使う場合も、LinkとVersionをMock説明に記録する。

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

UI Agentは未承認の承認Templateを準備できるが、承認者、承認日、承認状態`UI Mock Approved`は空欄のままHumanへ引き渡し、Humanだけが確定する。

- 承認日
- 承認者
- 対象Requirements VersionまたはCommit
- 対象UI VersionまたはCommit
- 対象画面とUser Flow
- 承認済みの仮説
- 残存するOpen Question
- 既知のMinor findingと扱い

主要Flowの完結性、誤認リスク、Security / Privacy / Accessibility、Requirements適合に影響するOpen Questionは承認をblockする。それ以外は、Owner、期限、解決Gate、戻し先（Research / Domain / Requirements / UI / Architecture）を記録した場合に限り持ち越せる。

## Promotion to Production Implementation

UI承認後、Spec Kitでfeature sliceの`spec.md`を作成した後、Technical Plan確定前にUIコードを評価し、以下へ分類する。

- `As-is reuse`: そのまま本実装へ利用可能
- `Refactor before reuse`: 責務、型、Test等を整えて利用
- `Replace`: 本番の契約や品質に合わせて作り直す
- `Remove`: Fixture、Debug表示、仮Interaction等を削除

原則としてDesign Token、Layout、Presentational Component、Responsive、Accessibility対応は再利用候補とする。Fixture、データ取得、Business Logic、認証・認可、Cache、永続化、最終的な型はArchitectureとfeature planで再評価する。

評価結果は`plan.md`のArchitecture・Test方針と`tasks.md`の削除・置換・Refactor Taskへの必須入力にし、対象ファイルまたはComponent単位で追跡する。未評価のUI-only code、Fixture、暫定型、仮Interactionを本番へ昇格しない。

UI Mock Approval後の流れは以下とする。

```text
UI Mock Approved
    -> Spec Kit feature specification
    -> UI code promotion assessment
    -> Technical plan and task breakdown
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
