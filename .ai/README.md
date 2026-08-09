# AI Instruction Structure

Status: Adopted and active
Decision date: 2026-08-09

## Purpose

本書は、AIの役割、行動指針、レビュー観点、チェックリストの配置と読込規則を定める。

`.ai/`はTool非依存のAI指示の正本である。レイヤー優先構成を採用し、各成果物と、それを作成・レビューするAI指示を対応づける。

## Principles

- `.ai/`はAIの振る舞いを定め、プロジェクト成果物そのものは`docs/`へ置く。
- 開発レイヤーを第一階層とし、対応する成果物を後から追跡しやすくする。
- 全AI共通の制約は`shared/`へ集約し、レイヤー固有ファイルへコピーしない。
- 各Agentについて、責任、入力、出力、権限、禁止事項、停止条件を明記する。
- Reviewerは原則read-onlyとし、重大度と出力形式を共通化する。
- 実装レビューは単一の万能Reviewerへ集約せず、統括Reviewer、常設Reviewer、変更内容に応じた専門Reviewerへ責任分離する。
- 専門Reviewerを毎回すべて実行せず、変更差分とリスクに基づいて必要な観点だけを選択する。
- `.ai/`のファイルは、ToolのAdapterまたは実行Promptから明示的に参照された場合に使用される。配置しただけで自動実行・自動読込されるとはみなさない。
- 生のAI会話ログを保存する場所として使用しない。

## Target Structure

```text
.ai/
├── README.md
├── shared/
│   ├── project-context.md
│   ├── evidence-policy.md
│   ├── quality-policy.md
│   └── review-result-format.md
├── research/
│   ├── research-agent.md
│   ├── research-reviewer.md
│   └── research-checklist.md
├── domain/
│   ├── domain-spec-policy.md
│   ├── domain-reviewer.md
│   └── create-domain-spec.md
├── requirements/
│   ├── requirements-agent.md
│   ├── requirements-reviewer.md
│   ├── create-requirements.md
│   └── checklists/
│       ├── requirements-readiness-checklist.md
│       ├── domain-traceability-checklist.md
│       └── non-functional-requirements-checklist.md
├── ui/
│   ├── ui-mock-agent.md
│   ├── ui-reviewer.md
│   ├── ui-approval-checklist.md
│   └── create-ui-mock.md
├── architecture/
│   ├── architecture-agent.md
│   ├── architecture-reviewer.md
│   └── architecture-checklist.md
├── implementation/
│   ├── local-implementer.md
│   ├── review-orchestrator.md
│   ├── reviewers/
│   │   ├── correctness-reviewer.md
│   │   ├── security-reviewer.md
│   │   ├── frontend-quality-reviewer.md
│   │   ├── performance-cost-reviewer.md
│   │   └── evidence-content-reviewer.md
│   └── checklists/
│       ├── implementation-checklist.md
│       ├── security-checklist.md
│       ├── frontend-quality-checklist.md
│       └── performance-cost-checklist.md
└── delivery/
    ├── codex-final-reviewer.md
    └── merge-readiness-checklist.md
```

必要性が生じていないファイルや空フォルダは先回りして作らず、対象レイヤーの作業開始時に追加する。既存の`create-domain-spec.md`は作成指示と完了条件を兼ねるため、再利用上の必要が生じるまで`domain-spec-agent.md`と`domain-checklist.md`へ形式的に分割しない。

## File Responsibilities

| File kind | Responsibility |
|---|---|
| `*-agent.md` | 作成・実装主体の責任、入力、出力、編集権限、停止条件 |
| `*-reviewer.md` | レビュー対象、観点、重大度、禁止事項、通過条件 |
| `review-orchestrator.md` | 差分の分類、専門Reviewerの選択、結果統合、重複排除、通過判定 |
| `*-checklist.md` | 判定可能な確認項目と完了条件 |
| 作業名のPrompt | 特定作業を開始する再利用可能な入力Template |
| `shared/*-policy.md` | 複数レイヤーに適用する共通方針 |
| `shared/review-result-format.md` | Critical / Major / Minor / Open Questionの共通出力形式 |

## Context Loading Order

AIを実行するときは、必要な範囲だけを次の順序で読み込む。

1. ルート`AGENTS.md`の全体ルール
2. `docs/README.md`の成果物構成とSource of Truth
3. `.ai/shared/`のうち作業に必要な共通方針
4. `.ai/<layer>/`のAgentまたはReviewer定義
5. 対象となる`docs/`または`specs/`の成果物

関連しないレイヤーの全指示を一括で読み込まない。指示の重複と不要なContext消費を避ける。

## Implementation Review Architecture

実装レビューは次の順序で行う。

1. format、lint、typecheck、test、build、Secret scan、依存脆弱性検査等の決定論的チェックを実行する。
2. `correctness-reviewer.md`を原則すべての実装Taskで実行する。
3. `review-orchestrator.md`が変更内容とリスクから必要な専門Reviewerを選択する。
4. 選択された専門Reviewerを、Implementerとは分離したread-onlyのContextで実行する。
5. Review Orchestratorがfindingを統合し、重複を除き、Critical / Major / Minor / Open Questionへ整理する。
6. CriticalまたはMajorがあればImplementerへ戻し、修正後に影響するチェックとレビューを再実行する。

### Reviewer Routing

| Reviewer | Responsibility | Execution rule |
|---|---|---|
| Correctness | 仕様適合、ロジック、境界値、テスト、保守性 | 原則すべての実装Task |
| Security | 認証・認可、入力、秘密情報、依存関係、個人情報、外部通信 | 機械検査は常時。LLM詳細レビューは該当リスクがある変更時 |
| Frontend Quality | 承認済みMock、Responsive、Accessibility、SEO | UI、表示、操作、Metadata変更時 |
| Performance / Cost | 処理量、Bundle、画像、Query、Cache、外部API、運用費 | 性能または費用へ影響する変更時 |
| Evidence / Content | 出典、確認日、更新履歴、Unknown、Disclosure Status、表示表現 | カード情報、記事、検索・比較表示、Evidence処理変更時 |

命名、Format、単純なコード規約など機械的に判定できる事項は、専用LLM Reviewerを増やさずToolへ委ねる。専門Reviewerは品質軸ごとに細分化しすぎず、独立したリスクと入力Contextを持つ単位にまとめる。

## Tool-specific Boundaries

```text
.ai/               Tool非依存の行動指針の正本
.opencode/         OpenCode固有のAgent、Command、権限設定
.specify/          Spec Kitが管理する設定、Template、Script
specs/             Spec Kitによるfeature単位の成果物
AGENTS.md          リポジトリ全体の短い入口と絶対ルール
```

OpenCode導入時は、`.opencode/agents/`にImplementer、Review Orchestrator、各Reviewerの権限、Model、実行Modeと`.ai/`への参照を持つ薄いAdapterを置く。共通のレビュー観点を`.opencode/`へコピーしない。

Spec Kitが生成・管理するファイルは、初期化前に推測で作らない。導入後も独自のAI方針は`.ai/`に保持し、生成領域との責任を分離する。

## Result Placement

AIが作成またはレビューした結果は内容に応じて配置する。

- Research成果物: `docs/research/`
- Domain仕様: `docs/spec/domain/`
- Requirements: `docs/spec/requirements/`
- UI成果物と承認: `docs/design/ui/`
- Architecture Decision: `docs/architecture/`
- Review結果: `docs/reviews/<layer>/`
- Feature仕様・計画・Task: `specs/<feature>/`
- AI行動指針の変更: `.ai/<layer>/`または`.ai/shared/`

Reviewerの指摘は、自動的に仕様変更へ昇格させない。採用された修正だけを対象成果物へ反映する。
