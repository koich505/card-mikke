# Requirements Review 001

Review date: 2026-08-10  
Review target: `docs/spec/requirements/`  
Reviewer: Independent Requirements Reviewer `/root/requirements_review_001`  
Result: Fail

## Scope and Evidence

- `AGENTS.md`
- `docs/README.md`
- `.ai/README.md`
- `.ai/shared/evidence-policy.md`
- `.ai/requirements/requirements-agent.md`
- `.ai/requirements/requirements-reviewer.md`
- 3つのRequirements Checklist
- `docs/spec/domain/`
- `docs/reviews/domain/domain-review-002.md`
- `docs/spec/requirements/`
- `docs/process/02-quality-gates.md`
- `git diff --check`

## Findings

### RR-001

- Severity: Major
- Location: FR-002、FR-004、FR-005、FR-012、FR-015、AC-005〜AC-008
- Requirement / risk: 年間正味還元額の入力・計算境界が不足している。カテゴリ金額の企業別配分、月次・期間別条件、決済単位の端数処理が未定義である。
- Impact: 同じ入力から複数結果が成立し、企業別特約の過大加算やCampaign誤適用につながる。
- Required resolution: Product ownerへ、カテゴリのみ指定時の企業別還元、月次・期間別入力または算定不能条件、公式Ruleに基づく付与単位・端数処理を確認し、FR / ACへ反映する。
- 戻し先: User → Requirements

### RR-002

- Severity: Major
- Location: General States、FR-001、FR-004、FR-008、FR-021、FR-033〜FR-038
- Requirement / risk: Loading、Empty、Error、Partial、Unknownの期待動作が未確定で、Google認証停止、AI抽出失敗、Source取得不能、記事生成失敗、Review検査失敗時の扱いが不明である。
- Impact: UI Mockへ渡す状態と失敗時の受入条件が実装者判断になる。
- Required resolution: 主要Flowごとの失敗・部分成功・外部Service停止時の期待結果をFR / ACへ定義し、UI Handoffへ追加する。
- 戻し先: Requirements

### RR-003

- Severity: Major
- Location: NFR-SEC-001〜004、NFR-OBS-001〜002、RQ-020
- Requirement / risk: Secret管理、依存脆弱性検査、Security scan、Log記録可否、Security incident対応が未定義で、運営者MFAなしも未Reviewである。
- Impact: 不正更新、Affiliate Link改変、利用者データ漏えいをGateで検証できない。
- Required resolution: Security / Privacy項目をRequired、N/A、Open Questionへ分類し、RQ-020を独立Security Reviewへ渡す。
- 戻し先: Requirements / Security reviewer / User

### RR-004

- Severity: Major
- Location: FR-025、FR-036〜038、NFR-PRIV-003、NFR-EDIT-002
- Requirement / risk: Account削除時の公開Review、却下Draft、通報、Moderation・承認履歴の削除・匿名化・保持例外が未定義である。
- Impact: 利用者の削除期待、公開Content、監査履歴、Privacy Policyが不整合になる。
- Required resolution: Product ownerがデータ種別ごとの扱いを決定し、FR / NFR / AC / Policy要件へ反映する。
- 戻し先: User → Requirements

### RR-005

- Severity: Major
- Location: Performance、Availability、Operations、Observability、Maintainability、AC-021
- Requirement / risk: 測定条件、部分障害、外部Service障害、Rollback、Configuration、Log / Metric / Alert保持、データ増加時動作、互換性が未定義で、RTO起算点も検証不能である。
- Impact: Performance、Availability、RTOの合否と障害時動作が一意にならない。
- Required resolution: Requirementsで必要な測定境界と運用成果を定義し、RTO起算点を検証可能にする。
- 戻し先: Requirements。測定値はUser

### RR-006

- Severity: Major
- Location: Requirements本文内の`Open points`、`05-open-questions.md`
- Requirement / risk: 本文内の多数の未決事項にRQ ID、影響、決定者、期限、Action、Blocking判定がない。
- Impact: Requirements Approval前に解く事項と後工程への持越しを判別できない。
- Required resolution: すべてのOpen pointを確定要件、N/A、または一意なRQへ変換する。
- 戻し先: Requirements / User

### RR-007

- Severity: Major
- Location: `06-traceability.md`
- Requirement / risk: 多数のNFRからACへのTraceabilityと、RequirementのProduct owner決定への追跡が不足している。
- Impact: 検証漏れと、会話ログにしかない事業判断の消失を検出できない。
- Required resolution: 全Required FR / NFRからACまたは検証基準へ追跡し、Product owner決定を日付・Decision IDで正本化する。
- 戻し先: Requirements

### RR-008

- Severity: Minor
- Location: FR-024、FR-035、NFR-EVID-003
- Requirement / risk: Evidence metadataの3年が最低期間か固定削除期限か曖昧で、却下画像のBackup削除期限も不明である。
- Required resolution: 固定期限または最低期限へ統一し、通常領域・Backupの削除期限を明示する。
- Owner: Requirements Agent
- Disposition: fix
- Due / resolution gate: Requirements再Review前

### RR-009

- Severity: Minor
- Location: `03-non-functional-requirements.md`
- Requirement / risk: 更新日が2026-08-09のままである。
- Required resolution: 2026-08-10へ更新する。
- Owner: Requirements Agent
- Disposition: fix
- Due / resolution gate: Requirements再Review前

### RR-010

- Severity: Open Question
- Location: RQ-020、NFR-SEC-001
- Requirement / risk: 多要素認証なしで運営者の公開・承認権限を許可する残存Riskを受容できるか。
- Required resolution: 独立Security ReviewとProduct owner判断を記録する。
- Owner: Product owner / Security reviewer
- Disposition: clarify
- Due / resolution gate: Requirements Approval前
- Blocking: Yes

### RR-011

- Severity: Open Question
- Location: RQ-011、RQ-017
- Requirement / risk: 算定不完全・変更確認中情報を利用者が誤認せず比較できる表示条件。
- Required resolution: 実データ量に近いUI Mockで検証する。
- Owner: Product owner / UI reviewer
- Disposition: clarify
- Due / resolution gate: UI Mock Approval前
- Blocking: No

### RR-012

- Severity: Open Question
- Location: RQ-013、FR-018、FR-035
- Requirement / risk: ブランドIcon・券面画像の利用条件が未確認である。
- Required resolution: 公式Asset規約を確認し、利用不可時のText代替を確定する。
- Owner: Product owner / Legal reviewer
- Disposition: clarify
- Due / resolution gate: UI Mock開始前
- Blocking: No（Requirementsには非Blocking、UI開始をBlocking）

## Checklist Summary

### Requirements Readiness Checklist: Fail

- Pass: Purpose、対象User、初期Scope、Non-goals、主要FR ID、主要FRからAC、Domain制約。
- Fail: 算定境界、Error / Partial状態、Open Question一元管理、全RequirementのAC・Product owner決定Traceability。
- Open Question: RQ-011、RQ-013、RQ-017、RQ-020。RQ-020はRequirements ApprovalをBlocking。

### Non-functional Requirements Checklist: Fail

- Pass: Accessibility、Cost、Evidence metadata、基本Backup、対応Browser、広告独立性。
- Fail: Security incident、Secret・依存検査、Log policy、性能測定、外部Service障害、Rollback、Configuration、Observability保持、互換性、全品質軸分類。

### Domain Traceability Checklist: Fail

- Pass: Disclosure Status、Source単位Status禁止、時点区別、公式Source、主要Concept境界、Domain OQ保持、OQ-14検討。
- Fail: Product owner決定へのTraceability、全Required NFRから検証条件へのTraceability。

## Summary

- Critical: 0
- Major: 7
- Minor: 2
- Open Question: 3
- Requirements Ready: Fail
