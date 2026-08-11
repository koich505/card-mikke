# Requirements Review 009

Review date: 2026-08-11  
Review target: `docs/spec/requirements/00-scope.md`〜`07-approval.md`  
Inputs: `docs/spec/domain/00-scope.md`〜`15-insurance.md`、`docs/reviews/domain/domain-review-003.md`、`docs/research/04`〜`13`  
Method: Domain impact analysis、Requirements更新、観点別read-only独立レビュー、修正後の再レビュー  
Final result: Pass — Product owner re-approved on 2026-08-11

## Scope And Baseline

- 初期Releaseの個人向けカード比較Scopeは維持した。
- Domain Conceptの追加を、そのまま新機能や実装Entityへ変換していない。
- 2026-08-10の旧承認Baselineはstaleであり、現行Requirementsは2026-08-11にProduct ownerが再承認した。
- DB、API、ORM、Architectureおよび詳細UIは本Reviewの決定対象外である。

## Initial Findings

Domain影響分析ではCritical 2件、Major 7件を検出した。独立レビューでは、Domain境界・Traceability、機能要件・Acceptance Criteria、Evidence・Freshness・Content integrityの各観点から追加指摘を検出した。

主な修正は次のとおり。

- Product、Offering、Application Route、Contract、Issuance、InstrumentおよびCredit Facilityの境界と現行Domain OQをRequirementsへ再対応した。
- CampaignをInstance/effect、確定/抽選、Beneficiary、条件構造、複数期間、上限、重複・排他および早期終了の単位で扱うようにした。
- InsuranceをBenefitから分離し、Insurance Product/Coverage、Insured/Beneficiary、付帯条件、補償事故、Limit、ExclusionおよびClaim Requirementを区別した。
- Reward Filter、交換価値、家族・追加カードおよびETC Feeの初期Release算定境界を検証可能にした。
- Evidenceをclaim単位とし、Observation、Extracted Fact、Domain Fact、Disclosure Status、confidence、複数時点、競合・訂正・supersedesおよび承認履歴を扱うようにした。
- AI収集・構造化Flowにも未信頼Sourceの信頼境界と敵対的Source検証を適用した。
- Domain 00〜15からRequirementおよびAcceptance CriterionへのTraceabilityを更新した。

## Independent Re-review

| Review perspective | Critical | Major | Result |
|---|---:|---:|---|
| Domain boundary and Traceability | 0 | 0 | Pass |
| Functional Requirements and Acceptance Criteria | 0 | 0 | Pass |
| Evidence, Freshness, Content integrity and related Security | 0 | 0 | Pass |

前回指摘のMinorは本文修正または現行Open QuestionへのDispositionを行った。新たなBlocking Open Questionはない。Domain OQは固定分類、必須値または実装設計へ変換せず、`05-open-questions.md`にOwner、Gateおよび次Actionとともに維持した。

## Verification

- Requirement IDとAcceptance Criterion IDの重複: なし
- 存在しないFR/AC参照: なし
- 全FRからACへの参照: あり
- Domain 00〜15 Traceability: あり
- `git diff --check`: Pass
- 旧Domain Review/OQ固定参照の現行Requirements内残存: なし
- Security/Privacy: AI収集の信頼境界変更を再レビュー済み。Privacyの新規影響なし

## Gate Interpretation

- 独立Requirements ReviewはCritical 0 / Major 0のためPassとする。
- Product ownerが2026-08-11に改定Requirementsを明示的に承認した。
- 現行Baseline hashは`docs/spec/requirements/07-approval.md`に記録した。
- 現在のGate 1はPassedである。
