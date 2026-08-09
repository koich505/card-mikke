# Feature Implementation Runbook

OpenCode TUIのPromptで次を使用する。

- `/implement-feature`: Active Featureの未完了Taskを依存順に自動実行する
- `/implement-task`: Logで選択済み、または一意なNext Ready Taskだけを実行する
- `/resume-feature`: Active Featureの停止点とHuman回答を確認して再開する
- `/review-feature`: Active Feature差分のLocal Reviewを再実行する
- `/rework-feature`: Human選択済みtrusted review recordのFindingを新Runで修正する
- `/status-feature`: Active Featureの状態、Finding、停止理由をread-only表示する

全Commandは引数なしでTrusted Command Controllerだけへ接続する。`status-feature`以外は毎回、pre-run Intent検証後にfresh CSPRNG Run ID、exclusive Runtime Directory、final Run Binding、新Snapshotを作る。statusはRun / Runtimeを作らず既存Log / Bindingをread-only表示する。Gate変更時は旧Review Resultをstaleにして完全なLocal Reviewを行う。Tool / Agent allowlistを強制できない場合は外部Wrapper決定まで全Commandを使用しない。

Command fileのDeclared IDは信頼せず、Hash付きInstalled ManifestまたはExternal Wrapperから得た`command-intent-v1`とFixed Dispatchを先に検証する。

Installed Manifestの予定Pathは`.opencode/tooling/installed-command-manifest.json`、Human承認証跡は`docs/tooling/open-code-validation.md`である。いずれもWF-12実証時に作成し、現時点では存在しないためCommandを実行しない。

各ReviewはLocal Review Controllerだけが開始し、Collector -> Review Orchestrator routing -> 固定Reviewer -> Review Orchestrator integration -> Controller Runtime記録の順を変えない。Active pointerまたはSource treeが途中で変わればstale / Blockedとする。Codex合格後はHumanがReview記録を`docs/reviews/features/`へ保存・承認し、`/resume-feature`でOrchestratorが`Delivery ready`へ転記する。

Immutable baseと`review-input-v1`生成後にMinimum Routingを計算する。RoutingとIntegrationは別Invocationとし、Finding / Human dispositionを含むDeterministic ResultをControllerが再計算する。WF-12完了前は`/status-feature`も実行しない。

Human判断が必要ならOrchestratorが停止状態をLogへ書いてRunを終了する。Humanはcommit前でもDecision / Approval recordを編集できる。次のresumeは新Run / Snapshotで全Reviewerを再実行し、旧Resultを合格判定へ使わない。Decision recordはContextとして読み、Dispositionは新Reviewerがcurrent Runで発行・維持したFindingへだけBindingする。Gate変更、Codex rework、Blocked resume、手動Source変更も同じ扱いとする。
