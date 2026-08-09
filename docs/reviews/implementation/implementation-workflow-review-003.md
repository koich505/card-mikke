# Implementation Workflow Review 003

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 002 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-002.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 3
- Minor: 1
- Open Question: 1

Review 002の指摘はすべて設計上解消され、採用Versionでの実証はWF-12により安全にBlockingされている。新規監査で、Review Artifactの自己参照、Reviewer起動経路、Feature終端状態、Manifest resource制限、Target固定に修正が必要と判定した。

## Review 002 Follow-up

| ID | Status | Resolution |
|---|---|---|
| IMP-011 | Resolved | 全6 Commandを引数なしとし、検証済みActive Feature、Selected / Next Task、信頼済みReview記録から対象を解決する方式へ変更した |
| IMP-012 | Resolved by design | ReviewerとReview Orchestratorをdeny-by-defaultにし、Repository内のread / glob / grep / listだけを許可した。Runtime実証前はWF-12でBlockingする |
| IMP-013 | Resolved | Manifestへcanonical path、type、mode、symlink target、content hash、sizeを追加し、dirty file、rename、delete等のFixtureを定義した |
| IMP-014 | Resolved | Feature / Taskの状態遷移、Actor、Precondition、Resume、新Runを定義した |
| IMP-015 | Resolved | `project-context.md`をplanned / not yet createdと明記した |
| IMP-OQ-003 | Resolved as controlled verification | Owner、期限、証跡Path、完了条件、Gate 4 BlockingをWF-12へ定義した |

## Major

### IMP-016: Review Artifactの鮮度契約が自己参照する

全Tracked / Untracked fileをManifest対象としながら、Review ArtifactをRepository内の`specs/<feature>/review-input.md`へ書き、そのArtifact自身のHashを含むManifestをArtifactへ格納しようとしている。Artifact書込によってManifest対象が変わるため、固定点を作れない。

Collector出力をSource-tree Manifestの固定除外領域へ置き、Artifact payload hashとSource-tree Manifest hashを分離する。除外領域、許可Writer、Fixtureを明記し、Artifact書込後はSource-tree fingerprintだけを比較する。

### IMP-017: Reviewer起動経路が権限契約上閉じていない

Review Orchestratorは専門Reviewerを選択する責務を持つ一方、`task: deny`のため起動できない。Implementation Orchestratorが起動する場合の固定Agent ID、選択結果の受渡し、権限が定義されていない。

Review Orchestratorを純粋な選択・統合Roleとし、信頼済みControllerが固定AllowlistのReviewerを順次起動するなど、起動主体と受渡しArtifactを一意に定義する。Implementation Orchestratorもdeny-by-defaultとし、必要Toolだけを許可してWF-12で起動Chainと循環不在を実証する。

### IMP-018: Codex合格後のFeature終端状態がない

Feature状態には`Codex final review pending`から`Rework required`への遷移しかなく、Codex Critical / Majorが0件の場合にDelivery Readyへ進む遷移、Actor、証跡、条件がない。

`Codex final review pending -> Codex review passed / Delivery ready`、Rework後の再Pending、必要に応じたHuman Deliveredを追加する。対象Artifact / Revision、Review記録、残存FindingのHuman承認をPreconditionにする。

## Minor

### IMP-019: 全Untracked fileのHash処理にResource / Special-file Policyがない

Manifest / CollectorをRegular file、`lstat`、no-followへ限定し、ファイル単位・総量・時間上限を設ける。Oversize、FIFO、Device、Socket等は安全にBlockする。Secret候補のPathやContent hashをArtifactへ残さず、Redacted eventだけを記録し、Fixtureへ追加する。

## Open Question

### IMP-OQ-004: Target pointerとReview ArtifactのTOCTOU防止主体

Run開始時にcanonical Feature ID / Path / Base / Pointer revisionをImmutable bindingとして記録し、各Phase前に再検証する必要がある。ReviewはImmutable snapshot / Artifactだけを対象とするか、Review期間LockとPost-checkを採用する。Pointer mutationとCollector後の変更をWF-12 Fixtureへ追加する。
