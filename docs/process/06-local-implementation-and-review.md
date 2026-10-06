# Local Implementation and Review

Status: Adopted working decision  
Decision date: 2026-08-09
Last updated: 2026-10-06（Delivery ready後のCodexローカルcommit境界を追加）

## Purpose

承認済みの`specs/<feature>/tasks.md`をOpenCodeとOllamaで実装し、決定論的検査と独立したローカルレビューを収束させてCodex最終レビューへ渡す工程を定める。

## Entry Conditions

- Gate 3を通過し、人間の実装開始承認がある。
- 対象branchは1 feature slice専用である。
- WF-3、WF-4、WF-5B、WF-6B、WF-12が解決済みで、採用モデル、固定Version、品質Command、Security Tool、Adapter検証完了証跡を再現できる。
- `spec.md`、`plan.md`、`tasks.md`、必要なADRと承認済みUIを参照できる。

未決の項目を仮Commandや推測で補って開始してはならない。

WF-12はCommand Controllerの専用Resolver Tool / Agent allowlist、`.opencode/tooling/installed-command-manifest.json`またはWrapper、status以外のfresh Run / Runtime、Intent / final Run Binding分離、一方向Hash DAG、Review / Human disposition Schema、状態変更後のfull-review再実行、Routing順、Closureの3 inner root / Tier / Edge順、Secret-safe Collectionを採用Versionで実証し、`docs/tooling/open-code-validation.md`へHuman承認済みManifest hashを記録する。Tool / Agent単位制約が不可能なら外部Wrapper判断まで全CommandをBlockedにする。

## Source of Truth and Records

- Scope、設計、Task本文、依存、完了条件の正本: `specs/<feature>/{spec.md,plan.md,tasks.md}`
- 実行状態、検査結果、レビューfinding、停止・再開情報の正本: `specs/<feature>/implementation-log.md`
- 並列実行判定の正本: `tasks.md`各Taskの`Parallel Execution`
- Application code、Test、必要な実装文書: Repository内の計画済みPath
- Reviewer Runtime入力: `.opencode/runtime/review-artifacts/<run-id>/<scope-id>/`

`implementation-log.md`はプロジェクト管理成果物であり、Spec Kit生成物を上書きしない。生ログ、秘密情報、chain-of-thoughtは保存せず、Command、結果、日時、要約、参照可能なfindingだけを残す。Task本文や完了Checkboxは自動変更しない。

Implementation Orchestratorだけが`implementation-log.md`を書き、更新を直列化して事前Revision / Fingerprint一致を必須とする。Reviewer、Implementer、CollectorはLogを変更しない。将来laneを増やす場合もWF-8の競合防止検証を先に通す。

## Standard Task Loop

1. Trusted Command ControllerがRun IDなしの`command-intent-v1`とResolver結果を検証し、CSPRNG Run ID必須のfinal `run-binding-v1`だけを固定Roleへ渡す。
2. Implementation Orchestratorが対象FeatureとTask、依存、現在状態、WF-12完了証跡を読む。
3. Entry Conditions、予定変更範囲、受入条件、Tool readinessを確認し、Task開始snapshotとRun IDを記録する。
4. Implementation Orchestratorが`Candidate`を実行直前に`Approved`または`No`へ判定する。初期laneは1で、WF-8解決前は実際の並列実装を行わない。
5. Implementerが計画範囲内のcode、test、実装文書を編集する。
6. Guardが前後の全tracked / untracked fileについてcanonical path、type、mode、symlink target、content hash、sizeを比較し、DeltaがPlanned pathと許可実行記録だけであることを検証する。範囲外差分は即停止し、自動rollbackしない。
7. allowlist済み品質CommandとSecurity Toolを実行する。
8. Local Review ControllerがImmutable base後にSecret-safe Collectorで`review-input-v1`とTier別Closureを生成する。
9. Controllerが検証済みrisk tagsから最低Reviewer集合を算出し、RO追加、固定Reviewer、別RO Integrationを順次実行する。Human dispositionを含む全ResultをSchema / hash / binding検証する。
10. Critical / MajorがあればImplementerへ戻し、影響する検査とReviewを再実行する。
11. 最大3 Review Attemptsで収束しなければ停止して人間へ報告する。
12. Local Gateを満たせばTaskを完了記録し、次の依存解決済みTaskへ進む。

引数なしの`/implement-feature`から上記を依存順に継続する。Active Feature pointerが未設定または不正なら人間へ選択を求めて停止する。

## Human Stop Conditions

- ScopeまたはAcceptance Criteriaの矛盾・不足
- Planned files / ownership areaを超える変更
- Architecture、共有Contract、Requirements、承認済みUIの変更
- Packageまたは外部Dependencyの追加・更新
- Security / Privacy例外、秘密情報、破壊的操作
- 承認済み費用閾値の超過または測定不能
- 最大3 Review AttemptsでCritical / Majorが解消しない
- 同一Critical / Majorが修正後に再発する
- 入力解決、Path Guard、diff Collector、Artifact鮮度確認の失敗
- OpenCode Roleによるcommit、またはAIによるGit remote接続、push、fetch、pull、PR作成、mergeが必要

停止時は理由、影響Task、必要な人間判断、再開条件を`implementation-log.md`へ記録する。

## Reviewer Contract

Review Orchestratorと全Reviewerはread-onlyであり、修正しない。Findingは`Critical / Major / Minor / Open Question`で記録する。Task Local GateはCritical / Majorが0であることを必須とする。Minorの`accept / defer`にはHuman承認参照が必要である。Open QuestionはOwner、影響Gate、Blocking判定、期限を記録し、現在Gateへ影響すればBlockedとする。Security / Privacy findingはSeverityを問わず、承認済み例外参照がなければBlockedとする。

Human判断SourceはHumanだけが`docs/reviews/features/<feature-id>/human-decisions.md`へ記録する。Local Review Controllerは使用直前にnonce付き明示確認を求め、Source hash / revisionへBindingした`human-disposition-v1`をRuntimeへ派生する。暗号学的Human identityは保証せず、Source変更時はDispositionを無効化する。

初回ReviewをAttempt 1とし、修正後の再Reviewごとに1増やす。最大3 Review Attemptsである。Codex findingによるreworkは新しいRun IDで開始し、過去Runを消さず累積履歴を維持する。同一Critical / Majorの再発時はAttempt数にかかわらずHumanへ停止する。

## Feature Completion

全TaskのLocal Gate後にFeature全体の決定論的検査と、WF-4 / WF-12で固定した検証済み収束手段を実行する。採用Spec Kitに専用Commandがなければ、全Acceptance CriteriaからTask / Test / 差分への代替traceability reviewを固定し、Human承認と実行結果を`implementation-log.md`へ記録する。不足TaskはPlanningへ戻す。

収束後、状態を`Codex final review pending`と記録する。Codexはread-onlyでImmutable Artifactをレビューして結果を返し、Humanが`docs/reviews/features/`へ保存・承認する。Implementation Orchestratorだけが結果をLogへ転記する。Critical / Majorがあれば新RunでLocal Loopへ戻し、再びPendingへ進む。Critical / Majorが0で残存FindingのHuman判断が完了すれば`Codex review passed -> Delivery ready`へ進む。Human delivery後は任意の終端`Human delivered`を記録できる。

`Delivery ready`後、CodexはFinal Reviewerとは別のLocal Committer Phaseで、Review済みSource fingerprintと現在差分が一致する場合だけ通常のローカルcommitを作成できる。CodexはGit remoteへ接続せず、push、fetch、pull、PR作成、mergeをHumanへ引き渡す。commit後に実質的変更が生じた場合は旧Reviewをstaleとし、fresh Reviewを要求する。

## OpenCode Use

Repository rootでOpenCodeを起動し、TUIのPrompt欄で`.opencode/commands/`のProject固有Commandを実行する。標準OpenCode / Spec Kit Commandと衝突しない名称を用いる。Spec Kit初期化時は生成物とのPath・Command名衝突を確認し、独自資材を上書きしない。

引数、Shell、差分Artifactの信頼境界は`.ai/shared/untrusted-input-and-execution-policy.md`を正本とする。
