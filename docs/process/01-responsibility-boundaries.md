# Responsibility Boundaries

Status: Adopted working decision  
Decision date: 2026-08-08

## Human

人間は最終的な意思決定とリポジトリへの反映責任を持つ。

- 要件、UI Mock、Architecture上の重要判断を承認する。
- UI Bootstrap用の暫定Frontend判断を承認し、暫定ADRの固定範囲、再評価範囲、再評価Gateを確定する。本番Architecture判断は後工程で別に承認する。
- ローカルLLMやCodexの指摘が競合した場合に採否を決定する。
- UX、視覚品質、事業上の妥当性を最終確認する。
- commit、push、Pull Request作成、CI確認、mergeを行う。
- セキュリティ例外、品質ゲート例外、費用上限の変更を承認する。

## Spec Kit

Spec Kitは仕様駆動開発の成果物と手順を整える。自律的に実装する主体ではない。

- `spec.md`で何を、なぜ実現するかを記録する。
- `plan.md`でfeature slice全体の技術計画とテスト方針を記録する。
- `tasks.md`で依存順の実装Taskを管理する。
- clarify、checklist、analyze、convergeによって曖昧さ・不整合・実装漏れを検出する。
- `/speckit.implement`は、接続されたCoding AgentにTask実行を依頼する入口として扱う。

## OpenCode and Local LLM

OpenCodeはCoding Agentの実行環境、Ollamaはローカル推論Providerとして使用する。

### Local Implementer

- 承認済みの仕様、計画、Task、Mockの範囲でコードとテストを変更する。
- format、lint、typecheck、test、build等の決定論的チェックを実行する。
- 仕様変更が必要な場合は推測で拡張せず、Open Questionとして返す。
- commit、push、PR作成、mergeは行わない。

### Review Orchestrator

- 変更差分、Task、リスクを分類し、必要な専門Reviewerを選択する。
- Correctness Reviewerを原則すべての実装Taskで必須とする。
- 専門Reviewerのfindingを統合し、重複を除き、通過可否を判定する。
- 自身ですべての品質観点を再レビューする万能Reviewerにはしない。
- 原則read-onlyとし、直接修正せず指摘をImplementerへ返す。

### Local Reviewers

- Correctness、Security、Frontend Quality、Performance / Cost、Evidence / Contentの責任を分離する。
- Correctness以外は変更内容とリスクに応じて実行し、関連しないReviewerを毎回起動しない。
- 各ReviewerはImplementerと別のコンテキストで差分をレビューする。
- 原則read-onlyとし、Critical、Major、Minor、Open Questionでfindingを返す。
- 機械的に判定できるコード規約はlint等へ委ね、専用LLM Reviewerを作らない。

同じモデルを利用する場合でも、Implementer、Review Orchestrator、各Reviewerの指示・コンテキスト・権限を分離する。

## Codex

Codexはローカルゲート通過後の外部最終レビューを担当する。

- feature slice全体の差分を、仕様・計画・Task・テストと照合する。
- ローカルレビューの見落とし、とくにCritical/Majorを検出する。
- 原則としてレビューのみを行い、明示的に修正を依頼されない限りファイルを変更しない。
- commit、push、PR作成、mergeは行わない。

Codexはローカル品質工程の代替ではない。ローカル側で可能な限り収束させ、Codexのトークン利用を最終確認に集中させる。

## Cursor

Cursorは人間による差分閲覧、軽微な調整、UI確認のためのEditorとして使用できる。Cursor上の確認だけで品質ゲート通過とはみなさず、実行結果とレビュー記録を根拠にする。

## GitHub and CI

- GitHubはbranch、Pull Request、レビュー履歴、mergeの管理に使用する。
- CIはローカルと同じ必須チェックを再実行し、環境差と実行漏れを検出する。
- 必須CIの失敗中はmergeしない。
- AI AgentへGitHub書込権限を与える場合でも、本プロジェクトではcommit、push、mergeを禁止する。

## Escalation

次の場合は自動ループを止め、人間へ判断を求める。

- 同じCritical/Majorが修正後も再発する。
- 原則3周でレビューが収束しない。
- Requirementsまたは承認済みMockの変更が必要になる。
- Domain Open QuestionをArchitecture上の固定値にする必要が生じる。
- セキュリティ例外、データ損失、外部費用増加、互換性破壊の可能性がある。
