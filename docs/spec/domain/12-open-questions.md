# Open Questions

Researchだけでは決められない事項を隠さず残す。Requirements作成には進めるが、ArchitectureやDB設計に入る前に解くべきものがある。

| # | Question | Why unresolved | Related Evidence | Impact if unresolved | Blocks Requirements | Blocks Architecture | Recommended next action |
|---|---|---|---|---|---|---|---|
| OQ-1 | Payment Scheme相当Conceptの粒度は何か | PaidyとKyashで必要性は強いが、一括、分割、リボと、別軸の後払いFundingをどう関係づけるかが未確定。DepositはFunding MethodにもPayment Schemeにも含めない | 02 §7.1、03 EC-4 | Payment/Legalの粒度が曖昧になり、法的分類をProduct単位に誤配置する | No | Yes | Paidy、Kyash、主要カード支払方式の規約をScheme単位で再調査 |
| OQ-2 | Transaction Legal ClassificationのEvidence基準は何か | Actor登録は確認できても、個別SchemeやTransaction分類の一次情報が不足 | Paidy、Kyash、atone | Unknownを固定列挙に押し込むリスク | No | Yes | 行政資料、利用規約、法令解釈資料の一次確認 |
| OQ-3 | Product、Offering、Variantの同一性判断基準は何か | セゾンゲーミングカードDigitalが名称上の後継だが新規契約であり、Product Familyの要否が未確定 | 03 EC-2、03 §7 | 商品一覧やRule適用範囲が不安定になる | No | Yes | 同様の後継・切替事例を2件以上追加調査 |
| OQ-4 | Product Featureの粒度はどこまで必要か | セゾンゲーミングカードDigitalは強い反例だが、独立事例は少ない | 02 §5.2、03 EC-2 | Lifecycle Eventが粗すぎる、または過剰に細かくなる | No | Yes | 終了・改定告知の追加サンプルを収集 |
| OQ-5 | Partner Revenue Shareを独立Conceptにするか | 全弁協では示唆が強いが、市場全体では1団体内の複数商品に留まる | 02 §7.1、03 EC-1 | RewardとEconomic Flowの境界が曖昧になる | No | Yes | 大学、専門職団体、地域団体カードの収益帰属を追加調査 |
| OQ-6 | Economic FlowとDonation Allocationを同じ上位概念に置くか | 収益分配、寄付、Member Rewardの関係がResearchだけでは不足 | 全弁協、大学系カード候補 | 価値移転の受益者設計が揺れる | No | Yes | 寄付型・提携収益型カードの公式資料を比較 |
| OQ-7 | External Membershipを単なるEligibilityに留めるか | bitFlyerでは申込前提かつReward destination、全弁協では申込資格かつ受益者候補 | 03 EC-1、03 EC-3 | 外部アカウント同一性やBenefit成立条件を追えない | No | Yes | 外部会員・アカウントが複数Ruleに作用する事例を追加調査 |
| OQ-8 | 法人、代表者、家族・追加カード利用者、社員利用者へMember Role、Contract Party、Cardholder/Userをどう割り当てるか | 法人カード、家族・追加カード、パーチェシングの契約構造が十分に深掘りされていない | 02 §3、02 §6.2、03 §5 | Actor、契約主体、利用者、会員Role、Issuanceの責務が混ざる | No | Yes | 法人カード規約、追加カード規約、パーチェシング規約を取得 |
| OQ-9 | カードレスパーチェシングをPayment Instrumentに含めるか | 非発行型・カードレスと記載されるが、支払手段のドメイン境界が未確定 | 三菱UFJカード パーチェシング、JCBパーチェシングサービス | Instrument/Service分類が揺れる | No | Yes | 法人購買決済の利用規約と請求プロセスを調査 |
| OQ-10 | NominalSuccessorRelation相当Conceptは必要か | セゾンゲーミング1事例のみで、新Concept確定には弱い | 03 EC-2 | Product切替と後継表示の混同リスク | No | No, but before product migration design | 類似事例を探索し、なければ既存Relationshipのセマンティクスで対応 |
| OQ-11 | DualIssuanceRuleとCrossCardSynergyRuleを統合するか | 責務重複の可能性はあるが、統合すべき反証も、現行baselineで確認済みの具体条件もない | 03 §5 | Rule体系が過剰または不足になる | No | No, but before rule architecture | 複数カード条件付き特典の公式事例を追加収集 |
| OQ-12 | True house cardの国内事例は必要か | UCSカードmajicaはブランド付きと訂正済みで、真のブランドなしカードは未確認 | 02 §1.1、02 §6.1 | 国際ブランドなし軸のCoverageが不十分 | No | No | 小売・専門店カードを追加調査 |
| OQ-13 | atoneの登録区分をどう扱うか | 本ラウンドでも一次確認できずUnknown | 02 §6.1、03 §6 | BNPL領域のLegal coverageが低い | No | Yes if BNPL architecture included | 事業者登録簿と規約を確認 |
| OQ-14 | Source消失時のFact履歴保持方針 | Evidence chain要件は明確だが、保存・版管理の方針は未決 | 02 §4、09 Evidence Model | 過去Factの説明責任が弱くなる | No | Yes | Evidence retention policyをRequirementsで明文化 |
| OQ-15 | 日本クレジット協会905会員Factの公式再確認 | v2では基準日に近い値として暫定採用だが、直接公式ページ再確認は未達 | 02 §7.2、03 §6 | 市場規模Factのconfidenceがmediumに留まる | No | No | 公式ページを次回調査で再確認 |
| OQ-16 | Rewardと非Reward Benefitの下位境界をどの単位で決めるか | working boundaryでは算定・蓄積される還元価値をReward、無料宿泊・ホテルステータス等を非Reward Benefitとしたが、マイル、宿泊ポイント、交換可能証書には両方の性質がありうる | 02のホテル提携・bitFlyer、03 EC-3 | 同じ便益の二重分類またはRule責務の混同が起きる | No | Yes | 外部プログラム規約を便益単位で比較し、残高性・譲渡性・失効・交換を確認 |
| OQ-17 | Disclosure Statusを付けるclaimの最小分解単位は何か | Source単位のStatusは廃止したが、複合claimの一部開示をどこまでObservation / Extracted Fact / Domain Factへ分解するかはResearchだけでは決められない | 02 §4、03 §6、全弁協の収益帰属 | partially_disclosedの不足部分をunknownとundisclosedに分けられない | No | Yes | 複合claimの監査例を収集し、Evidence policyで粒度を定義 |
| OQ-18 | v1由来のデュアル発行、家族カード、JCBゴールド ザ・プレミア条件を現行Factに採用できるか | v2/03に直接の支持Evidenceがなく、反証がないことは支持にならない | 01 historical only、09 Evidence Model | 未確認例がScenario、Invariant、Ruleの前提になる | No | No | v2相当の一次Sourceで再調査し、それまではResearch gapを維持 |
| OQ-19 | Brand / Network Identifier、Payment Network / Scheme、Network Operator Roleをどう対応づけるか | 現行baselineはブランド表示を確認できても、ネットワーク概念と運営Actorの責務粒度を確定するには不足 | UCSカードmajica、bitFlyer クレカ、02 §1.1 | IdentifierをActor Roleと誤認し、Instrumentや法的分類と混同する | No | Yes | ブランド規約・ネットワーク運営主体の一次資料を追加調査 |

## Domain Specificationとして暫定採用したConcept

| Concept | Status | Rationale |
|---|---|---|
| Actor / Actor Role separation | Adopted as working decision | bitFlyer、Kyash、Paidy、全弁協でRole分離が繰り返し必要になる |
| Evidence chain: Domain Fact -> Evidence -> Source | Adopted as working decision | v1監査で一次確認不足の誤りが多数発見された |
| Claim-level Disclosure Status | Adopted as working decision | unknown、undisclosed、partially_disclosedの区別が個別claim、Observation、Extracted Fact、Domain Factで必要。Source全体の単一Statusにはしない |
| Product Lifecycle / Feature Lifecycle separation | Adopted as working decision | セゾンゲーミングカードDigitalが具体的な段階的終了を示す |
| Regulatory Registration / Legal Classification separation | Adopted as working decision | Paidyの登録FactからScheme別分類を導出できない |
| Payment Instrument / Funding Method separation | Adopted as working decision | Kyashのカードと後払い入金で契約主体・責務が異なる |
| Application Route / Eligibility separation | Adopted as working decision | アメックス、全弁協、招待制カードで必要 |

## Provisional / 今後反証可能なConcept

| Concept | Status | Rationale |
|---|---|---|
| Product / Offering / Variant / Issuance / Memberの分離 | Supported but provisional | 既存評価はProbably supported、confidence medium。セゾンゲーミング型のProduct粒度は未決 |
| Payment Scheme相当Concept | Supported but provisional | Paidy/Kyashで有力だが、名称・粒度・法的分類保持方法は未確定 |
| Economic Flow / Partner Revenue Share | Supported but provisional | 全弁協で必要性が示されるが、独立事例が不足 |
| Member Cohort | Supported but provisional | 旧会員・新会員・切替・機能限定で有用だが、Rule条件として足りる可能性もある |
| Multi Card Relationship Rule | Supported but provisional | DualIssuanceRuleとCrossCardSynergyRuleの共通化余地があるが、統合判断は保留 |
| Asset Conversion | Supported but provisional | bitFlyerで必要だが、RewardとAssetの境界は未確定 |
| Brand / Network Identifier、Payment Network / Scheme、Network Operator Role | Supported but provisional | ブランド表示、ネットワーク、運営Actor責務を分ける必要はあるが、名称と対応関係は未確定 |

## 未解決で設計を止めるべきConcept

現時点でRequirements作成そのものを止めるConceptはない。ただし、次のConceptを固定的なArchitectureやDB構造として決めることは止めるべきである。

| Concept | Reason |
|---|---|
| Product単位のPaymentModelType | Paidy/KyashによりNeeds revision。Product単位固定は破綻する可能性が高い |
| Transaction Legal Classificationの固定列挙 | Unknownを推測分類へ押し込む危険がある |
| NominalSuccessorRelationの独立採用 | セゾンゲーミング1事例のみで過剰抽象化の可能性が高い |
| RewardProgramへのPartner Revenue Share統合 | Member Rewardと外部団体収益を混同する |

## Requirements作成には進めるがArchitecture決定前に解決すべきConcept

| Concept | Why |
|---|---|
| Payment Scheme粒度 | Legal Classification、手数料、支払方式の境界に直結する |
| Product / Offering / Variant同一性 | 商品一覧、Rule適用、比較表示、履歴の根本粒度になる |
| Evidence retention policy | Source消失時の説明責任に関わる |
| External Membership / Account同一性 | bitFlyer、ホテル、専門職団体のEligibilityとBenefitに影響する |
| Economic Flow受益者モデル | 全弁協、寄付型、提携収益型の扱いに影響する |
| 法人・社員利用者のMember境界 | 法人カード、パーチェシング、社員追加カードに影響する |
| Reward / 非Reward Benefit境界 | 外部ポイント、無料宿泊証書、ステータス等の分類とRule責務に影響する |
| Disclosure Statusのclaim分解粒度 | partially_disclosedの不足部分をunknown / undisclosedへ正しく分けるために必要 |
| Brand / Network / Operator Role境界 | ブランド識別値をActor Roleや法的分類へ誤接続しないために必要 |

## DB設計に進む前に解決すべきBlocking Open Questions

- OQ-1: Payment Scheme相当Conceptの粒度は何か。
- OQ-2: Transaction Legal ClassificationのEvidence基準は何か。
- OQ-3: Product、Offering、Variantの同一性判断基準は何か。
- OQ-5: Partner Revenue Shareを独立Conceptにするか。
- OQ-7: External Membershipを単なるEligibilityに留めるか。
- OQ-8: 法人、代表者、家族・追加カード利用者、社員利用者へMember Role、Contract Party、Cardholder/Userをどう割り当てるか。
- OQ-14: Source消失時のFact履歴保持方針。
- OQ-16: Rewardと非Reward Benefitの下位境界をどの単位で決めるか。
- OQ-17: Disclosure Statusを付けるclaimの最小分解単位は何か。
- OQ-19: Brand / Network Identifier、Payment Network / Scheme、Network Operator Roleをどう対応づけるか。
