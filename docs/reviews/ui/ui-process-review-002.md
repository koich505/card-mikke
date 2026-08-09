# UI Process Review 002

Review date: 2026-08-09
Review target: UI process documents after Review 001 remediation
Previous review: `docs/reviews/ui/ui-process-review-001.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

Review 001のMajor 6件、Minor 4件、Open Question 2件はすべてResolvedである。

- New Critical: 0
- New Major: 1
- New Minor: 1
- New Open Question: 0
- UI Workflow Consistency Checklist: Fail

## Review 001 Follow-up

| ID | Status | Resolution |
|---|---|---|
| M-1 | Resolved | UI-only codeを設計検証成果物とし、Gate 3 / Gate 4および本番契約と分離した |
| M-2 | Resolved | UI Bootstrap暫定判断と本番Architectureを分離し、Human承認、暫定ADR、再評価範囲を定義した |
| M-3 | Resolved | UI設計、Flow、Mock、Screenshot、Approval、Review、Codeの配置を統一した |
| M-4 | Resolved | Promotion AssessmentをFeature Specification後、Technical Plan確定前へ移動した |
| M-5 | Resolved | UI ReviewerへEvidence Policy、Domain Specification、最新Domain Reviewを追加した |
| M-6 | Resolved | 合成Fixture、PII / Secret、送信・永続化、外部要素、入力、Scan等を追加した |
| m-1 | Resolved | WF-10をTemplate、Versioning、相互Link方式だけの未決事項へ縮小した |
| m-2 | Resolved | 未承認TemplateとHuman専用承認欄を分離した |
| m-3 | Resolved | WF-1を補助Design Tool、Screenshot、Versioningへ限定した |
| m-4 | Resolved | Disclosure Statusの4状態を正式表記し、一般画面状態のUnknownと分離した |
| OQ-1 | Resolved | Frontend BootstrapをHuman承認の暫定ADRへ記録するDecisionを採用した |
| OQ-2 | Resolved | UI ApprovalをblockするOQと、Owner・期限・解決Gate付きで持越可能なOQを定義した |

## New Major

### N-M1: UI検査手段の決定期限が必須実行時期より遅い

`docs/process/04-ui-first-implementation.md`とUI Approval Checklistは、Bootstrap時から`quality` Command、Secret scan、依存脆弱性確認を要求する。一方、`docs/process/03-tooling-and-open-decisions.md`のWF-5はCommand決定を最初の実装Taskまで、WF-6はSecurity Tool決定を最初のPRまでとしている。

UI Bootstrap / Review / Approval時に再現可能な検査手段が決まらず、Gateを判定できない。

### Required action

- WF-5をUI用最小`quality` Commandと本実装用拡張に分割する。
- WF-6をUI用Secret scan / 依存監査と、本実装・PR用SAST等に分割する。
- UI用検査手段をBootstrap前、遅くともUI Review前に決め、Gate 2との関係を明示する。

## New Minor

### N-m1: UI Reviewerの必須入力に品質ゲート正本がない

UI ReviewerはGate 2を評価するが、`.ai/ui/ui-reviewer.md`の必須入力に`docs/process/02-quality-gates.md`がない。

### Required action

UI Reviewerの必須入力へ`docs/process/02-quality-gates.md`を追加する。Workflow自体を評価する場合は`.ai/ui/ui-workflow-consistency-checklist.md`も使用する。
