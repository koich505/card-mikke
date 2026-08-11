# Open Questions

Researchだけでは決められない事項を隠さず残す。Requirements作成は可能だが、ArchitectureやDB設計ではBlocking事項を未解決のまま固定しない。

## Existing Question Disposition After Research 04-13

| Existing OQ | Disposition | Result |
|---|---|---|
| OQ-1 Payment Scheme粒度 | Partially resolved | 購入時Scheme、購入後変更、default/opt-in、merchant例外を分離したが、法的分類との対応は未解決 |
| OQ-2 Transaction Legal Classification | Continues | Actor登録から推論せず、Scheme/TransactionごとにEvidenceが必要 |
| OQ-3 Product/Offering/Variant同一性 | Partially resolved | 差異軸と判定原則を追加したが、全商品共通の同一性基準は未確定 |
| OQ-4 Product Feature粒度 | Partially resolved | 独立Lifecycleを持つ対象として支持。最小粒度は未確定 |
| OQ-5/6 Partner Revenue Share/Economic Flow | Partially resolved | Beneficiary Roleを追加。法的・会計的な共通上位概念は未確定 |
| OQ-7 External Membership | Partially resolved | Eligibility、Route、Reward destination、Benefitへ作用する独立Conceptとして支持 |
| OQ-8 法人・家族等のRole | Partially resolved | Role分離は確定。Productごとの具体的割当と契約責任は未確定 |
| OQ-9 カードレスパーチェシング | Continues | Instrument、Issuance、利用権限の境界は未確定 |
| OQ-10 Nominal Successor | Continues, non-blocking | 独立Conceptを採用せず、Identity・Lifecycle・移行Evidenceで判断 |
| OQ-11 Multi Card Rule | Partially resolved | 複数Issuance/Credit Facility/Benefit・Fee条件を分離。専用Ruleの要否は未確定 |
| OQ-12 True house card | Continues, non-blocking | 一次Evidence未達の候補をUnknownとして維持 |
| OQ-13 atone登録区分 | Continues | Unknownを維持 |
| OQ-14 Evidence retention | Continues | Campaign、PDF、終了告知により重要性が増加 |
| OQ-15 市場規模Fact | Continues, non-blocking | 公式再確認待ち |
| OQ-16 Reward/Benefit境界 | Partially resolved | 分類観点を追加したが、証書・外部ポイント等は個別判断 |
| OQ-17 claim分解粒度 | Continues | 「最大」「無料」「招待」等の複合claimにも適用 |
| OQ-18 v1由来Fact | Partially resolved | 追加Researchで支持されたFactのみ04〜13へ置換。残りはResearch gap |
| OQ-19 Brand/Network/Operator | Continues | 追加Researchでも完全な責任境界は未確定 |

## Current Open Questions

| # | Question | Evidence / reason | Blocks Requirements | Blocks Architecture | Recommended next action |
|---|---|---|---|---|---|
| OQ-1 | Payment SchemeとTransaction Legal Classificationの最小粒度 | 02、03、11。購入時/事後変更は分離できるが法的分類は不足 | No | Yes | 規約・行政資料をScheme/Transaction単位で確認 |
| OQ-2 | Product、Offering、Variantの市場横断の同一性基準 | 03、05、13。差異軸は支持されるが組合せが商品ごとに異なる | No | Yes | 変更・再発行・切替規約を商品横断で比較 |
| OQ-3 | Contract、Account、Issuance、Instrument、Medium、Identifierの境界 | 04、05、06、10、13。1対1でないことは支持 | No | Yes | 家族・法人・ETC・複数媒体規約を契約単位で比較 |
| OQ-4 | Credit Facility、法的な信用供与、共有枠、個別統制枠の境界 | 04、11、13 | No | Yes | 会員規約と法人管理機能を比較 |
| OQ-5 | 法人、代表者、従業員、家族、本会員へのRole割当 | 04、11、13。Role分離は支持されるが具体責任が商品別 | No | Yes | 契約・請求・審査・利用規約を商品別に確認 |
| OQ-6 | 共同Issuer、地域Issuer、動的Billing Entityの責任粒度 | 04、11。表示上の主体だけでは不足 | No | Yes | 一次規約・請求書面を取得 |
| OQ-7 | カードレスパーチェシングをInstrument/Issuanceに含めるか | 04、05 | No | Yes | 利用規約と取引・請求過程を確認 |
| OQ-8 | Campaign Template/Instanceと共通競合Ruleの要否 | 07。実施回分離は支持、TemplateはProvisional | No | Before campaign architecture | 複数回実施・複数Campaign併用の公式規約を比較 |
| OQ-9 | Campaignの非公開予算・抽選・Fraud判定のclaim粒度 | 07 | No | Yes if campaign data included | Evidence policyでunknown/undisclosed境界を定義 |
| OQ-10 | Rewardと非Reward Benefitの最小分類基準 | 08、09。外部ポイント・証書等に混合的性質 | No | Yes | 残高性、譲渡性、失効、交換を便益単位で確認 |
| OQ-11 | Benefit Provider、User、Beneficiary、利用経路の最小関係 | 09、12 | No | Yes | 外部Provider規約と利用条件を比較 |
| OQ-12 | Insurance Product、会員保障制度、Underwriting Contractの境界 | 12。一部補償の法的性質が不明 | No | Yes | 約款・引受表示・保障規定を比較 |
| OQ-13 | 複数Coverageの合算・按分Ruleを共通化できるか | 12。最大値キャップは反復確認されたが全担保共通ではない | No | Before insurance architecture | 担保別約款を追加比較 |
| OQ-14 | Billing Cycle、再引落し、枠回復の共通Temporal語彙 | 11 | No | Yes | 主要Issuerの請求・返金FAQを比較 |
| OQ-15 | Source消失時のFact・Source保持方針 | 02、03、07、09、12 | No | Yes | Requirementsでretention policyを定義 |
| OQ-16 | Disclosure Statusを付けるclaimの最小分解単位 | 02、03、07〜13 | No | Yes | 複合claim監査例をEvidence policyへ反映 |
| OQ-17 | Brand / Network Identifier、Payment Network / Scheme、Operator Roleの対応 | 02〜05 | No | Yes | ブランド規約・運営主体の一次資料を追加調査 |
| OQ-18 | merchant member/acquiring領域をどこまで含めるか | 04。発行側サイトの直接責務を超える可能性 | No | No unless feature requires | 現Scopeでは直接必要なRoleだけに限定 |
| OQ-19 | research 04〜13の未確認市場Fact群 | 04、07、09、11、12、13 | No | 対象featureに含む場合のみ | 下記Unknown Registerごとに一次Sourceを追加調査 |

## Working Decisions

次は追加Researchにより複数事例で支持され、本仕様でworking decisionとして採用する。

- Actor Role、契約主体、利用者、Beneficiaryを分離する。
- Product、Offering、Variant、Issuance、Payment Instrument、Credit Facilityを分離する。
- Product等のLifecycleとRule内の集計・判定・付与・利用・失効期間を分離する。
- Campaignを恒常Ruleから、Insurance Product/CoverageをBenefit表示から分離する。
- Billing CycleとTransaction LifecycleをProduct Lifecycleから分離する。
- unknown、undisclosed、partially_disclosed、disclosedをclaim単位で保持する。

## Provisional Concepts

- Instrument Medium / Identifierの独立Concept性。
- Campaign Template / Instanceの最終形。
- Credit Limit Ruleの共通化範囲。
- Underwriting Contract、Claim Requirement、会員保障制度の共通上位概念。
- Partner Revenue Shareと他のEconomic Flowの共通上位概念。
- Member Cohort、Multi Card Relationship Rule、Payment Network / Operator Role。

## Research Unknown Register

| Source | Unknown group | Treatment |
|---|---|---|
| 04 | 専門職団体・法人カードの一次情報、共同/地域Issuerの法的責任、カードレス購買、true house card | Product/Actor/Contract境界を確定せずOQ-3、5〜7、19へ |
| 07 | Visa等の早期終了事例の一次確認、招待日和の家族適用、紹介条件の起点、既発行権利への遡及効果 | Campaign ExampleをProvisionalとしOQ-8、9、19へ |
| 09 | Benefit Providerとの契約関係、家族等の利用者・Beneficiary、外部予約・登録要件の非公開部分 | Benefitの確定値にせずOQ-10、11へ |
| 10 | Fee免除のcarryover、ポイント充当、媒体別例外の未開示部分 | Fee RuleのOpen QuestionとOQ-19へ |
| 11 | 再引落し、海外手数料・為替確定、枠回復、動的Billing Entityの責任 | OQ-4、6、14、19へ |
| 12 | 国内CDW、オンライン不正利用補償の別建て性、弁護士費用・サイバー・法人補償、特殊保険、Underwriter対応表、廃止後の代替措置 | 不存在とせずInsurance/CoverageのOpen QuestionおよびOQ-12、13、19へ |
| 13 | 招待・審査ロジック、家族・法人の具体Role、Invitationと一般Routeの非公開条件 | `undisclosed`または`unknown`を維持しOQ-5、19へ |

## Architecture Blocking Set

ArchitectureまたはDB設計へ進む前に、少なくともOQ-1〜7、OQ-10〜17を対象Featureの範囲に応じて解決する。OQ-8、OQ-9、OQ-12、OQ-13はCampaign/Insuranceを扱うFeatureでBlockingとなる。OQ-18、OQ-19は対象Featureに含めない限りRequirementsを止めない。
