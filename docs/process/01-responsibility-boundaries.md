# Responsibility Boundaries

Status: Adopted working decision  
Decision date: 2026-08-08
Last updated: 2026-10-06（Codex Local Committer境界を追加）

## Human

人間は最終的な意思決定とリポジトリへの反映責任を持つ。

- 要件、UI Mock、Architecture上の重要判断を承認する。
- UI Bootstrap用の暫定Frontend判断を承認し、暫定ADRの固定範囲、再評価範囲、再評価Gateを確定する。本番Architecture判断は後工程で別に承認する。
- ローカルLLMやCodexの指摘が競合した場合に採否を決定する。
- UX、視覚品質、事業上の妥当性を最終確認する。
- 必要に応じてローカルcommitを行い、push、Pull Request作成、CI確認、merge等のRemote Deliveryを行う。
- セキュリティ例外、品質ゲート例外、費用上限の変更を承認する。
- Feature固有判断を`docs/reviews/features/<feature-id>/human-decisions.md`へHuman自身が記録し、使用時の明示確認に応答する。署名基盤のないローカル単一Human境界であり、AIは判断を代筆・捏造しない。

## Spec Kit

Spec Kitは仕様駆動開発の成果物と手順を整える。自律的に実装する主体ではない。

- `spec.md`で何を、なぜ実現するかを記録する。
- `plan.md`でfeature slice全体の技術計画とテスト方針を記録する。
- `tasks.md`で依存順の実装Taskを管理する。
- clarify、checklist、analyze、および採用Version上で検証済みの収束手段によって曖昧さ・不整合・実装漏れを検出する。
- `/speckit.implement`は、接続されたCoding AgentにTask実行を依頼する入口として扱う。

## OpenCode and Local LLM

OpenCodeはCoding Agentの実行環境、Ollamaはローカル推論Providerとして使用する。

Project固有Commandは引数なしとし、採用Versionで検証済みのSpec Kit Active Feature pointer、`implementation-log.md`のSelected Task、人間が選択したtrusted review recordだけを入力とする。WF-12未完了または選択が一意でない場合は実装を開始しない。

### Trusted Command Controller

- 全Project Commandの唯一の入口としてpre-run Intentと専用Resolver結果を検証し、CSPRNG Run ID必須の厳格なfinal `run-binding-v1`だけを下流へ渡す。
- `implementation-orchestrator`、`local-review-controller`、`status-reporter`以外を起動しない。
- generic Shell、編集、Network、任意Repository read、未知Toolを使用しない。
- OpenCodeでTool / Agent allowlistを強制できない場合は実行せず、外部Wrapper判断へ戻す。

### Implementation Orchestrator

Implementation Orchestratorは、各Taskの実行直前にPlanning上の並列候補を現在の作業状態と照合する実行調整Roleである。

- 依存Taskの完了、予定変更範囲、共有Contract、Worker間の編集競合、Test、Local resourceを確認する。
- `Parallel: Candidate`を実行時の`Approved`または`No`へ判定する。
- `tasks.md`の該当Taskにある`Parallel Execution`項目へ、判定結果、判定者、判定日時、根拠、同時実行Groupを記録する。
- `tasks.md`の編集権限は上記`Parallel Execution`項目だけに限定する。別途`implementation-log.md`を単独Writerとして更新し、Application code、Test、Spec、Plan、Task本文は変更しない。
- Reviewerの選択、finding統合、品質通過判定はReview Orchestratorへ委ねる。
- commit、push、PR作成、mergeを行わない。
- `implementation-log.md`の単独Writerとして、Revision確認後に直列更新する。Reviewer入力Artifactは検証済みread-only Collectorだけが生成する。

このRoleのOpenCode用Agent / Command資材は`.opencode/`に定義済みである。採用OpenCode Versionで権限構文と実効範囲を検証するまで、Gate 4の実行可能状態とはみなさない。

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
- 例外なくread-onlyとし、ファイルを編集・修正しない。指摘をImplementerへ返す。
- Reviewerを自ら起動せず、routing / integrationを会話ResultでLocal Review Controllerへ返す。

### Local Review Controller

- Reviewerではない実行調整RoleとしてImmutable Runtime Artifactを生成する。
- 固定allowlistのReview OrchestratorとReviewerだけを一意な順序で起動し、循環・再委譲を禁止する。
- Runtime Artifactだけを書き、code、Planning成果物、implementation-log、Git管理Review記録を変更しない。
- Runtimeを排他的・安全に作成し、Deterministic Minimum Routing、Schema検証、別InvocationのRouting / Integration、Snapshot Closureを調整する。

### Local Reviewers

- Correctness、Security、Frontend Quality、Performance / Cost、Evidence / Contentの責任を分離する。
- Correctness以外は変更内容とリスクに応じて実行し、関連しないReviewerを毎回起動しない。
- 各ReviewerはImplementerと別のコンテキストで差分をレビューする。
- 例外なくread-onlyとし、ファイルを編集・修正しない。Critical、Major、Minor、Open QuestionでfindingをPlanning AgentまたはImplementerへ返す。
- 機械的に判定できるコード規約はlint等へ委ね、専用LLM Reviewerを作らない。

同じモデルを利用する場合でも、Implementer、Review Orchestrator、各Reviewerの指示・コンテキスト・権限を分離する。

## Codex

Codexはローカルゲート通過後の外部最終レビューを担当する。

- feature slice全体の差分を、仕様・計画・Task・テストと照合する。
- ローカルレビューの見落とし、とくにCritical/Majorを検出する。
- Final Reviewerとして例外なくread-onlyとし、ファイルを編集・修正しない。指摘をHumanとImplementerへ返す。
- Final Reviewerとして動作中はcommitしない。Final Review完了後にLocal Committer Phaseへ明示的に移った場合だけ、下記境界でローカルcommitできる。

Codexはローカル品質工程の代替ではない。ローカル側で可能な限り収束させ、Codexのトークン利用を最終確認に集中させる。

### Codex Local Committer

- 適用する決定論的Checkと独立Reviewが成功し、対象差分と範囲が特定できる場合、Codexは通常のローカルcommitを作成できる。この権限は本RepositoryについてHumanから継続的に委任されたものとする。
- commit前にbranch / worktree、全tracked / untracked差分、Secret scan対象、Review対象Revisionを確認し、対象外変更を混入させない。commit後にstatusとcommit内容を照合する。
- `git add`と通常の`git commit`以外の履歴変更は既定で許可しない。`commit --amend`、rebase、reset、force操作等は、Humanが対象と操作を明示した場合だけローカルで実行できる。
- Git remoteまたはRemote Repository Serviceへ接続しない。`fetch`、`pull`、`push`、`clone`、remote submodule更新、`git ls-remote`、GitHub API / CLI、PR作成、mergeを禁止する。remote設定のローカル読取は接続を伴わないため許可する。
- commit後のpush、Pull Request、CI、mergeはHumanへ引き渡す。ローカルcommitだけで`Human delivered`またはGate 6通過とはみなさない。

## Cursor

Cursorは人間による差分閲覧、軽微な調整、UI確認のためのEditorとして使用できる。Cursor上の確認だけで品質ゲート通過とはみなさず、実行結果とレビュー記録を根拠にする。

## GitHub and CI

- GitHubはbranch、Pull Request、レビュー履歴、mergeの管理に使用する。
- CIはローカルと同じ必須チェックを再実行し、環境差と実行漏れを検出する。
- 必須CIの失敗中はmergeしない。
- AI AgentへGitHub権限を設定していても、Codexを含むAIはRemote Repository Serviceへ接続しない。Codex Local Committerの権限はローカルcommitだけに限定する。

## Escalation

次の場合は自動ループを止め、人間へ判断を求める。

- 同じCritical/Majorが修正後も再発する。
- 初回をAttempt 1とする最大3 Review Attemptsで収束しない、または同一Critical / Majorが再発する。
- Requirementsまたは承認済みMockの変更が必要になる。
- Domain Open QuestionをArchitecture上の固定値にする必要が生じる。
- セキュリティ例外、データ損失、外部費用増加、互換性破壊の可能性がある。
