# Documentation Structure

Status: Adopted and active
Decision date: 2026-08-09

## Purpose

本書は、プロジェクト成果物の配置、開発工程との対応、およびSource of Truthの境界を定める。

この構成を成果物配置の現行ルールとして使用する。必要性が生じていない空フォルダは先回りして作らず、各レイヤーの作業開始時に追加する。

## Placement Principles

- `docs/`には、人間とAIが共同で参照する成果物、判断、レビュー結果を置く。
- `.ai/`には、AIの役割、行動指針、レビュー観点、チェックリストを置く。
- 成果物と、それを作成・レビューするAIへの指示を同じフォルダへ混在させない。
- `docs/`と`.ai/`は開発レイヤー単位で対応させる。
- 共通ルールを複数ファイルへコピーせず、正本を一か所に置いて参照する。
- 生のAI会話ログはSource of Truthにしない。採用した結論だけを適切な成果物へ反映する。
- Toolが生成・管理する領域へ、独自ファイルを無秩序に混在させない。

## Target Structure

```text
docs/
├── README.md
├── research/
├── spec/
│   ├── domain/
│   └── requirements/
├── design/
│   └── ui/
│       ├── user-flows/
│       ├── mocks/
│       │   └── screenshots/
│       └── approvals/
├── architecture/
│   └── decisions/
├── reviews/
│   ├── domain/
│   ├── requirements/
│   ├── ui/
│   └── features/
└── process/
```

Spec Kit導入後は、feature slice単位の生成成果物をリポジトリルートの`specs/`へ置く。

```text
specs/
└── <feature-id>-<feature-name>/
    ├── spec.md
    ├── plan.md
    └── tasks.md
```

`docs/spec/requirements/`はサイト全体の要件、`specs/<feature>/`は実装対象となるfeature sliceの仕様・計画・Taskを扱う。両者を混同しない。

## Phase and Artifact Mapping

| Phase | Primary output | AI instructions |
|---|---|---|
| Market research and audit | `docs/research/` | `.ai/research/` |
| Domain specification | `docs/spec/domain/` | `.ai/domain/` |
| Domain review and correction | `docs/reviews/domain/` | `.ai/domain/` |
| Functional / non-functional requirements | `docs/spec/requirements/` | `.ai/requirements/` |
| Requirements review | `docs/reviews/requirements/` | `.ai/requirements/` |
| User flow and UI mock | `docs/design/ui/` | `.ai/ui/` |
| Architecture decisions | `docs/architecture/` | `.ai/architecture/` |
| Feature specification and tasks | `specs/<feature>/` | Spec Kit and `.ai/implementation/` |
| Implementation and local review | Application code and tests | `.ai/implementation/` |
| Final review and delivery | `docs/reviews/features/` and Pull Request | `.ai/delivery/` |

## Directory Responsibilities

### `docs/research/`

市場調査、一次Sourceの確認、監査済みCorpus、反証調査を置く。ResearchはDomain SpecificationのEvidenceであり、完成仕様ではない。

### `docs/spec/domain/`

Concept、責務、境界、関係、不変条件、Scenario、Open Questionを置く。DB、API、ORM、UIの実装構造を直接決定しない。

### `docs/spec/requirements/`

サイト全体の対象範囲、ユーザー、機能要件、非機能要件、受入条件を置く。DomainのUnknownとOpen Questionを根拠なく確定事項へ変換しない。

### `docs/design/ui/`

UI Scopeと要件対応は`docs/design/ui/`直下、User Flowは`docs/design/ui/user-flows/`、Mockの説明・Version・Screenshotは`docs/design/ui/mocks/`、人間による承認記録は`docs/design/ui/approvals/`へ置く。実行可能なUIコードは`docs/`へ置かず、`docs/process/04-ui-first-implementation.md`に従って本番候補ApplicationをUI-only modeで構築する。UIレビュー結果は`docs/reviews/ui/`へ置く。ユーザー向けfeatureの実装計画は、該当Mockの承認後に開始する。

### `docs/architecture/`

技術構成とArchitecture Decisionを置く。`docs/spec/domain/12-open-questions.md`でArchitectureを止める事項を、未解決のまま固定しない。

### `docs/reviews/`

レビューの最終結果と解消状況を対象レイヤー別に置く。生の思考過程や全会話ログではなく、finding、重大度、判断、追跡可能な参照を残す。

### `docs/process/`

開発フロー、責任分界、品質ゲート、Tool方針など、複数レイヤーにまたがる運用上の決定を置く。

## Source of Truth

- 市場Factの現行baselineは、監査済みの`docs/research/02-market-corpus-v2-audited.md`および関連する最新Research文書とする。
- Domainの正本は`docs/spec/domain/`とする。
- サイト全体の要件は、今後作成する`docs/spec/requirements/`を正本とする。
- 承認済みUIは`docs/design/ui/approvals/`から対象Mockを追跡可能にする。
- feature単位の仕様・計画・Taskは`specs/<feature>/`を正本とする。
- 開発運用は`docs/process/`を正本とする。
- AIの行動指針は`.ai/`を正本とし、詳細は`.ai/README.md`に従う。

## Migration Rule

構成変更でファイルを移動するときは、内容を複製せず履歴を保つ形で移動し、リポジトリ内の参照パスを同じ変更内で更新する。移動後は旧パスを正本として残さない。
