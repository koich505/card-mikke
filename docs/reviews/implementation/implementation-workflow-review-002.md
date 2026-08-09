# Implementation Workflow Review 002

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 001 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-001.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 3
- Minor: 2
- Open Question: 1

Review 001の主要指摘は多くが解消されたが、Command引数の展開順序、Reviewerの実効権限、Planned-path Guardの内容検証に修正が必要である。OpenCode採用Versionでの実証は未実施だが、WF-12により安全にBlockingされている。

## Review 001 Follow-up

| ID | Status | Resolution |
|---|---|---|
| IMP-001 | Resolved | WF-12完了を全実装・Review入口のblocking条件へ追加した |
| IMP-002 | Unresolved | Policyは追加されたが、`$ARGUMENTS`がResolverより先にLLM Promptへ展開されるため、生引数をLLMへ渡さない要件を満たさない |
| IMP-003 | Resolved | Path権限検証とpre / post Guardを追加した。ただし内容Fingerprintは新規Findingで扱う |
| IMP-004 | Resolved | Task差分とFeature差分を分離し、tracked / untrackedを含むReview Artifact契約を追加した |
| IMP-005 | Resolved | Minor受容、Open Question、Security / Privacy例外にHuman承認規則を追加した |
| IMP-006 | Resolved | Run、状態、Attempt、Log単独Writer、更新前提条件を追加した。ただしTask状態遷移の表現はMinorで扱う |
| IMP-007 | Resolved | Shell allowlistと禁止操作を追加した |
| IMP-008 | Resolved | 採用Versionで検証済みの収束手段と代替Traceability Reviewへ統一した |
| IMP-009 | Resolved | Review Attemptの増加点と上限を定義した |
| IMP-010 | Resolved | WF-11解決前はCodex Critical / Major修正後の再レビューを必須にした |
| IMP-OQ-001 | Unresolved / Safely blocked | OpenCode採用Version未決・未導入のため未実証だが、WF-12完了前は全入口が停止する |
| IMP-OQ-002 | Resolved | Task SnapshotとHuman承認済みFeature Branch Baseを比較基準として定義した |

## Major

### IMP-011: `$ARGUMENTS`を安全なResolverより前にLLMへ渡している

OpenCodeのMarkdown Command本文はLLMへ送信されるTemplateであり、`$ARGUMENTS`は送信前に置換される。そのため、Prompt内で「先に検証する」と指示しても、生引数自体はすでにLLM Contextへ入っている。

外部の安全なWrapperを採用Versionで実証するか、実装Commandから`$ARGUMENTS`を除去し、検証済みのActive Feature / Selected Task記録だけを参照する。Finding本文もCommand引数へ渡さない。

### IMP-012: ReviewerとReview Orchestratorの実効read-only権限が不足する

Reviewer Adapterは`edit`と`bash`のみを`deny`にしている。OpenCodeではAgent権限がGlobal設定とMergeされ、`task`、`webfetch`、`websearch`、外部Directory、Custom Tool等から書込や外部通信が可能になる余地がある。

Permissionをdeny-by-defaultにし、Repository内の必要なread、glob、grep、listだけを許可する。`task`、外部通信、外部Directory、MCP / Custom mutationを明示的に禁止し、採用Versionで実証する。

### IMP-013: Planned-path Guardがファイル内容の変更を検出できない

GuardがPathとStatus中心であり、既にdirtyな範囲外Tracked fileを再編集してもStatusが変わらない場合に検出できない。

pre / post ManifestへPath、Type、Mode、Symlink解決先、Content hashを含め、全Tracked / Untracked fileのDeltaをPlanned path集合と照合する。Fixtureを用いて採用Versionで実証する。

## Minor

### IMP-014: Task状態遷移が機械判定可能な表になっていない

BlockedからのResume、Local Gate通過後のRework、新Run開始などについて、各Statusの遷移先、Actor、Preconditionを明示する。

### IMP-015: Target Structureに未作成の`project-context.md`が現行資材として見える

`.ai/shared/project-context.md`を必要時に作成する予定と明記するか、現行Target Structureから削除して構成ドリフトを解消する。

## Open Question

### IMP-OQ-003: OpenCode採用VersionでのAdapter実証

Frontmatterの構文は現行公式仕様と整合するが、採用Version、実効Permission、`ask`の非対話Loop中の挙動は未実証である。これはTool導入時にWF-12の証跡を作成するまで、すべての実装入口をBlockingする既知の未決事項として扱う。
