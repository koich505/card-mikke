# Domain Specification Review 003

Review date: 2026-08-11  
Review target: `docs/spec/domain/`  
Research scope: `docs/research/02-market-corpus-v2-audited.md` through `docs/research/13-invitation-eligibility-audit.md`（01は履歴参照のみ）  
Previous review: `docs/reviews/domain/domain-review-002.md`

## Conclusion

Research 04〜13を反映したDomain Specificationについて、観点別のread-only reviewと修正後の再レビューを実施した。

- Critical: 0
- Major: 0
- Minor: 6（非Blocking。下記に記録）
- Open Questions: `docs/spec/domain/12-open-questions.md`へ統合済み

Domain SpecificationはRequirements作成の入力として条件付きで利用可能である。ArchitectureまたはDB設計へ進む場合は、対象Featureに関係するArchitecture Blocking Setを先に解決する。

## Review Coverage

### Boundary And Actor

Product / Offering / Variant、Contract / Account / Issuance / Payment Instrument / Medium / Credit Facility、法人・家族・利用者・受益者、Issuer / Providerの境界を確認した。

初回のCritical 2件（Contract未定義、IssuanceへのApplication/Screening混入）とMajor findingsを修正後、再レビューでCritical 0・Major 0を確認した。

### Rule And Temporal

Campaign、Fee、Payment Scheme、Billing Cycle、Credit Limit / Spending Control、条件構造、上限、制度世代、集計・判定・付与・利用・失効、Transaction Lifecycleを確認した。

初回のMajor 3件（Fee carryover/充当、SchemeのMerchant等への依存、Billing CycleのRule混在）を修正後、再レビューでCritical 0・Major 0を確認した。

### Reward, Benefit, Campaign And Insurance

Beneficiary、Provider、Account、派生残高、多段階交換、Campaign効果、Coverage、Trigger、Limit、Exclusion、Claim Requirement、Underwriter、合算Ruleを確認した。

初回のMajor 4件（Benefit関係、Reward受益者、Insurance条件、Unknown追跡）を修正後、再レビューでCritical 0・Major 0を確認した。

### Integrated Consistency

- `13-research-traceability.md`でresearch 04〜13からDomain文書への対応を確認した。
- Researchの設計提案を無条件で確定Conceptにせず、working decision、Provisional、Open Questionへ分類した。
- `unknown`、`undisclosed`、`partially_disclosed`、`disclosed`の区別を維持した。
- Product等のLifecycleと、Rule/Campaign/Insurance/Billingの複数期間を分離した。
- DB、API、ORM、ER図等の実装設計へ進んでいないことを確認した。

## Remaining Minor Findings

1. Billing Cycleはscheduleと個別occurrenceを暫定的に包含している。独立Concept化の最小条件はOQとして維持する。
2. Campaign固有期間と汎用Temporal labelの最終的な対応はArchitecture前に決める。
3. Instrument HolderとAuthorized Userの分離要否をOQとして維持する。
4. Card/Contract AccountとExternal/Reward/Asset Accountの最小共通項をOQとして維持する。
5. Asset Conversionをprocess、Reward redemption Rule、Economic Flowのどの関係として扱うかをOQとして維持する。
6. Campaign Template / Instanceおよび複数Beneficiary効果mappingの最終形をOQとして維持する。

これらはRequirementsでUnknownまたはProvisionalとして保持でき、現時点のRequirements readinessを阻害しない。未解決のまま固定的なArchitectureへ変換してはならない。

## Requirements Readiness

**判定: Ready（条件付き）**

- Requirementsは`12-open-questions.md`のWorking Decisions、Provisional Concepts、Research Unknown Registerを引き継ぐ。
- Campaign、Insurance、Billing/Creditを対象とするFeatureでは、該当するBlocking OQをArchitecture前に解決する。
- Source tier、confidence、claim-level Disclosure Statusを保持し、Research内のUnknownを不存在または固定値へ変換しない。
