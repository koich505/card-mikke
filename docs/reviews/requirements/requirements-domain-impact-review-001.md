# Requirements Domain Impact Review 001

Review date: 2026-08-11  
Input: `docs/spec/domain/00-scope.md`〜`15-insurance.md`、`docs/reviews/domain/domain-review-003.md`  
Target baseline: Requirements approved on 2026-08-10（現在stale）  
Method: read-only Domain impact analysis followed by Requirements Agent disposition

## Conclusion

初期Releaseの個人向けカード比較Scopeは維持できる。法人カード、BNPL、カードレス購買、家族・追加カードの独立商品検索等を追加する必要はない。

影響分析で検出したCritical 2件とMajor 7件は、Requirements、Acceptance Criteria、Open Questions、TraceabilityおよびRequirements AI指示へ反映し、独立再レビューで解消を確認した。

## Classification

| Classification | Requirement groups | Disposition |
|---|---|---|
| Valid | FR-001〜003、FR-007〜011、FR-019、FR-025/026/028〜031/036〜040、Security/Privacy等のNFR | Product value、利用者Account、記事、Review、Security/Privacyの振る舞いは変更しない |
| Needs revision | FR-004〜006、FR-012〜018、FR-020〜024、FR-027、FR-032〜035、NFR-EVID、関連AC、Traceability | Offering/Route、Campaign、Insurance、claim Evidence、Issuance/Instrument境界へ更新 |
| Missing | Campaign Instance/effect、Coverage単位表示、claim-level Evidence、Offering/Route単位受付の検証可能な要求 | 既存FR/ACへ追加し、新しい初期機能は増やさず解消 |
| Blocked | Product/Issuance、Campaign、Reward/Benefit、Insurance、Evidenceの最終Architecture境界 | 現行Domain OQ-2/3、8〜13、15〜17を対象Featureに応じてArchitecture前に解決 |
| Out of scope | 法人カード、BNPL、カードレス購買、家族・追加カードの独立商品検索、取引実行・詳細Billing/Credit | Future CandidatesまたはDomain knowledgeとして維持 |

## Findings And Resolution Targets

| ID | Initial severity | Finding | Requirements disposition | Status |
|---|---|---|---|---|
| DI-C-001 | Critical | Architecture Blocking参照が旧OQ番号体系 | `05-open-questions.md`と`06-traceability.md`を現行番号＋名称へ再対応 | Resolved / verified |
| DI-C-002 | Critical | Domain 13〜15のTraceability欠落 | Domain→Requirements表へResearch Traceability、Campaign、Insuranceを追加 | Resolved / verified |
| DI-M-001 | Major | Campaign算定が実施回・effect・複数期間等を表せない | FR-005/006/015/016、AC-007/009を更新 | Resolved / verified |
| DI-M-002 | Major | 「招待制カード」がProduct固定属性に見える | FR-004/013、AC-010をOffering/Application Route基準へ更新 | Resolved / verified |
| DI-M-003 | Major | Insuranceが単一Benefit項目 | FR-017、AC-014をInsurance Product/Coverage単位へ更新 | Resolved / verified |
| DI-M-004 | Major | Evidenceが値・Source metadataへ平坦化 | FR-024/033、NFR-EVID-003、AC-023/025をclaim chainへ更新 | Resolved / verified |
| DI-M-005 | Major | 収集・差分・業務管理がカード共通項目へ平坦化 | FR-032〜034、AC-017/018/025/026へ対象Concept/relationship/Rule versionを追加 | Resolved / verified |
| DI-M-006 | Major | 家族・ETCがProduct Boolean化されうる | FR-013/017/029、AC-010/014を関連Issuance/InstrumentとRoute条件へ更新 | Resolved / verified |
| DI-M-007 | Major | Source変更時の旧値継続範囲が粗い | FR-023、AC-009/017をclaim対象・期間・運営判断単位へ更新 | Resolved / verified |

## Security And Privacy Impact

認証、認可、利用者Profile、個人情報、管理者権限、Session、UGC、外部送信のScopeは変更していない。独立レビューでAI収集Flowへの信頼境界適用不足を検出したため、NFR-SEC-008、FR-033、AC-025を更新した。Evidence/Freshness/Content integrity Reviewerが関連Security観点を再レビューし、Critical 0 / Major 0を確認した。Privacyへの新規影響はない。
