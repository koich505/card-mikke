# Requirements Review 002

Review target: `docs/spec/requirements/`  
Scope reviewed: Requirements Review 001の全Finding、Security Review 001とResolution、Security Review 002、管理者MFA、単一カード特集記事、3つのRequirements Checklist  
Checks/evidence used: `AGENTS.md`、`docs/README.md`、`.ai/README.md`、`.ai/shared/evidence-policy.md`、`.ai/shared/review-result-format.md`、`.ai/requirements/requirements-agent.md`、`.ai/requirements/requirements-reviewer.md`、3つのRequirements Checklist、`docs/spec/domain/`、`docs/reviews/domain/domain-review-002.md`、`docs/process/02-quality-gates.md`、`docs/reviews/requirements/requirements-review-001.md`、Security Review 001 / Resolution / 002、`docs/spec/requirements/`、`git diff --check`  
Reviewer: Independent Requirements Reviewer `/root/requirements_review_001`  
Result: Fail

## Findings

- ID: RR2-001
  Severity: Major
  Location: `docs/spec/requirements/03-non-functional-requirements.md:179-184`（NFR-PERF-003）、`docs/spec/requirements/04-acceptance-criteria.md:174-179`（AC-034）
  Requirement / risk: AC-034が存在しない`RQ-031`で決定したデータ量を前提にしている。NFR-PERF-003はReviewと履歴も増加対象に含めるが、NFR-PERF-002が定量化するのはカード、Rule、利用先だけであり、Review・履歴の測定量がない。
  Evidence: `05-open-questions.md`にRQ-031は存在せず、現行RQはRQ-011、RQ-013、RQ-017、RQ-033〜RQ-041である。
  Impact: AC-034のGivenを準備できず、データ増加時要件の合否を一意に検証できない。Review・履歴増加に起因する性能劣化がGate外になる。
  Required resolution: AC-034の誤参照を除去し、Review・履歴を含む測定量をNFRで定義するか、初期Releaseの性能対象外として明示的に分類する。（戻し先: Requirements）

- ID: RR2-002
  Severity: Major
  Location: `docs/spec/requirements/03-non-functional-requirements.md:230-239`（NFR-AVAIL-002）、`docs/spec/requirements/04-acceptance-criteria.md:292-297`（AC-024）
  Requirement / risk: NFRはRTOを「重大障害を検知した時点から24時間以内」と修正したが、AC-024は旧来の「復旧着手後24時間以内」のままである。
  Evidence: NFR-AVAIL-002:235とAC-024:297で起算点が一致しない。
  Impact: 復旧着手を遅らせてもACを満たせるため、Product ownerが採用したRTO 24時間を受入条件で保証できない。
  Required resolution: AC-024の起算点をNFR-AVAIL-002と同じ重大障害の検知時点へ統一する。（戻し先: Requirements）

- ID: RR2-003
  Severity: Minor
  Location: `docs/spec/requirements/06-traceability.md:59-100`
  Requirement / risk: NFR-EDIT-002はAC-028〜AC-030から参照されているが、Requirement-to-AC表に行がない。
  Evidence: AC-028、AC-029、AC-030はいずれもNFR-EDIT-002を明示する一方、Traceability表はNFR-EDIT-001までしか列挙していない。
  Impact: 自動または人手のTraceability確認で、Reviewと公式評価の分離要件が未検証と誤判定される。
  Required resolution: NFR-EDIT-002からAC-028〜AC-030への対応をTraceability表へ追加する。
  Owner: Requirements Agent
  Disposition: fix
  Due / resolution gate: Requirements再Review前

- ID: RR2-004
  Severity: Minor
  Location: `docs/spec/requirements/01-users-and-goals.md:4`
  Requirement / risk: 2026-08-10にU-004と単一カード特集記事Scenarioが追加されているが、更新日が2026-08-09のままである。
  Evidence: `06-traceability.md`のRD-027は単一カード特集記事の決定日を2026-08-10としている。
  Impact: 追加要件の改訂時点を誤認しやすい。
  Required resolution: 更新日を実態へ合わせる。
  Owner: Requirements Agent
  Disposition: fix
  Due / resolution gate: Requirements再Review前

- ID: RR2-005
  Severity: Minor
  Location: `docs/spec/requirements/06-traceability.md:102-112`、`docs/spec/requirements/04-acceptance-criteria.md:223-229`（FR-007、AC-016）
  Requirement / risk: 単一カード特集記事はScope、User Goal、FR、ACには追加されたが、UI Mock Handoff表では記事種別、公式Source・確認時点、Affiliate開示の理解確認として明示されていない。
  Evidence: UI Mock Handoffの「記事更新確認中」はFR-031だけを対象にしている。
  Impact: 新しい主要記事種別の情報根拠と広告関係がUI Review対象から漏れる可能性がある。
  Required resolution: 単一カード特集記事の対象カード、特徴、適用条件、確認時点、公式Source、広告関係をUI Mock Handoffへ追加する。
  Owner: Requirements Agent
  Disposition: fix
  Due / resolution gate: UI Mock開始前

## Review 001 resolution verification

- RR-001: Resolved。RD-023、FR-005、FR-012、FR-016、AC-006、AC-007に、カテゴリ内最良条件、月次均等配分、取引単位概算と表示要件が追加された。
- RR-002: Resolved。FR-039とAC-031が主要FlowのLoading、Empty、Error、Partial、外部Service・AI失敗時の継続動作を定義した。
- RR-003 / RR-010: Resolved。NFR-SEC-005〜007、AC-032、管理者MFA・高Risk操作再認証・Session保護が追加され、Security Review 002はPassである。
- RR-004: Resolved。FR-025、NFR-PRIV-003、AC-004がAccount削除時のReview、通報、不正防止情報、監査metadataの扱いを定義した。
- RR-005: Partially resolved。性能測定、外部障害、Rollback、Configuration、Observability、RTO起算点はNFRへ追加されたが、RR2-001とRR2-002のAC不整合が残る。
- RR-006: Resolved。本文の未決事項はRQ-033〜RQ-041へ移され、Owner、期限、Blocking、Actionを持つ。
- RR-007: Resolved in substance。Product owner判断はRD-001〜RD-028として正本化され、Required FR / NFRの大部分がACへ追跡された。NFR-EDIT-002の表記漏れだけをRR2-003とする。
- RR-008: Resolved。Evidence metadataは使用終了後3年間へ統一され、却下券面画像本体の通常領域・Backup削除期限も30日以内と明記された。
- RR-009: Resolved for NFR。`03-non-functional-requirements.md`の更新日は2026-08-10となった。追加変更を含むUsers and Goalsの更新日はRR2-004とする。
- RR-011、RR-012: 適切に持越し。RQ-011、RQ-013、RQ-017はOwner、期限、解決Actionを持ち、Requirements ApprovalをBlockingしない。

## Focus verification

- 管理者MFA: Pass。管理者専用・非共有Account、MFA必須、回復時本人確認、認証変更通知、Session確認・失効、無操作30分、最長12時間、高Risk操作の15分以内再認証がNFR-SEC-001、NFR-SEC-003、AC-040、RD-028で一貫する。
- 単一カード特集記事のScope: Pass。`00-scope.md`、U-004、FR-007、RD-027で初期対象として一致する。
- 単一カード特集記事のEvidence・公開Flow: Pass。対象カード、特徴、適用条件、確認時点、公式Sourceを要求し、FR-008、FR-009、FR-031のAI Draft・人間承認・更新確認を共通適用する。
- 単一カード特集記事の広告独立性: Pass。FR-007は比較順位と区別し、FR-019、NFR-EDIT-001、AC-015がAffiliate関係の開示と報酬からの独立を記事にも適用する。
- 単一カード特集記事のAcceptance Criteria: Pass。AC-016で複数カード記事と単一カード特集記事の双方を作成・承認・公開できることを観測可能にしている。

## Checklist Summary

### Requirements Readiness Checklist: Fail

- Pass: Scope、User、Non-goals、主要FR、Error / Partial状態、Open Question管理、Product owner判断、Domain・Requirement・AC Traceability、単一カード特集記事。
- Fail: AC-034の存在しないRQ参照と測定量不足、AC-024のRTO起算点不一致。
- Open Question: RQ-011、RQ-013、RQ-017、RQ-033〜RQ-041はOwner、期限、Action、非Blocking判定を持つ。

### Non-functional Requirements Checklist: Fail

- Pass: Security / Privacy、Accessibility、SEO、Evidence、Observability、Cost、Maintainability、Legal / Editorial、管理者MFA。
- Fail: PerformanceのReview・履歴測定量とAC参照、RecoveryのAC起算点。
- Open Question: RQ-036、RQ-039〜RQ-041は後続Gateまで管理されている。

### Domain Traceability Checklist: Pass

- Pass: Disclosure Status、Source・Evidence、時点区別、公式Source、Concept境界、Domain Open Question保持、OQ-14のRetention検討、Product owner Decision、Requirement-to-AC追跡。
- Note: NFR-EDIT-002の表記漏れはDomain境界を壊さない局所的なTraceability不足としてRR2-003に記録した。

## Summary

- Critical: 0
- Major: 2
- Minor: 3
- Open Question: 0 new findings（既存の非Blocking RQ 11件は管理済み）
- Requirements Ready: Fail
