# Domain Scenarios

各ScenarioはResearch Evidenceで確認できる範囲に限定する。不明な条件はUnknownまたはundisclosedとして扱う。

## 1. 一般的なクレジットカードへの新規申込

Given: 一般申込可能なProduct Offeringが公式ページで確認されている。

When: 申込者が当該Offeringから申し込む。

Then: Product、Offering、Application Route、Eligibility Rule、Member候補、Issuer Roleを分けて扱う。審査ロジックが非公開ならundisclosedとする。

Evidence: アメックス・ゴールド・プリファードの直接Web申込可能性、三井住友カード等の一般CoreカードObservation。

## 2. 同一Productで国際ブランドごとに条件が異なる

Given: 同一Product内でVisa、Mastercard、JCB等のVariantが選択または併存する。

When: ブランドごとに年会費、特典、発行可否、デュアル可否が異なる。

Then: Variant固有Ruleとして保持し、Product共通Ruleへ上書きしない。ブランド有無からLegal Classificationを推論しない。

Evidence: 三井住友カードのデュアル発行、UCSカードmajicaのブランド付き訂正。

## 3. Visa/Mastercardデュアル発行

Given: 同一会員がVisaとMastercardの2枚を発行できるProductがある。

When: 新規申込または既存会員の追加申込でデュアル発行になる。

Then: 1つのProduct保有ではなく、複数IssuanceまたはVariant-linked Issuanceとして扱う。2枚目年会費等はFee Ruleとして扱う。

Evidence: 三井住友カードのデュアル発行Observation。

## 4. 家族カード

Given: 本会員に紐づく家族会員の扱いが公式資料で確認されている。

When: 家族会員に追加カードが発行される。

Then: 本会員Memberと家族会員MemberまたはAttached Card利用者を分ける。年会費や利用権限はEvidenceが確認できる範囲に限定する。

Evidence: 03のExisting Model Assessmentでは家族カード等の確認事例がSupporting evidenceに挙げられている。詳細権限は追加Evidenceが必要。

## 5. 法人カード＋社員追加カード

Given: 法人・コーポレート向けProductまたはパーチェシングサービスが確認されている。

When: 法人代表者または社員利用者が利用する。

Then: 法人、代表者、社員利用者、Billing Entity、利用枠を同一Memberに潰さない。カードレスの場合はIssuanceに含めるか未決として扱う。

Evidence: 三菱UFJカード パーチェシング、JCBパーチェシングサービス、FFGパーチェシングカード。社員追加カードの詳細はResearch不足。

## 6. 招待による上位カード取得

Given: 招待制または利用実績に基づくランクアップProductがある。

When: 既存Memberが条件達成またはカード会社判断で招待される。

Then: Product、Offering、Application Route、Eligibility Rule、Member Cohortを分ける。非公開判定ロジックはundisclosedとする。

Evidence: イオンゴールドカードの年間カードショッピング50万円（税込）以上・審査あり、JCBゴールド ザ・プレミアの招待条件。

## 7. 外部団体所属者限定の申込経路

Given: 外部団体所属が申込条件となる専門職団体カードがある。

When: 所属者が団体専用Routeから申し込む。

Then: External Membership、Eligibility Rule、Application Route、Partnershipを分ける。団体への収益帰属はMember Rewardにしない。

Evidence: 全弁協カード群、東京税理士協同組合の税理士カード。

## 8. 商品切替

Given: 一般申込可能Productに、既存会員向け切替Routeも存在する。

When: 既存会員が切替Routeを利用する。

Then: 一般申込Offeringと切替Offeringを分ける。切替に伴う契約・資産・会員番号の連続性はEvidenceで確認する。

Evidence: アメックス・ゴールド・プリファードの一般申込と既存ゴールド会員切替Route。

## 9. 名称上の後継商品だが新規契約となる

Given: 旧Productと名称上の後継Productがある。

When: 旧Productから自動切替されず、新規契約が必要で、ポイント資産も自動移行されない。

Then: 名称的後継関係と契約・資産の連続性を分ける。NominalSuccessorRelation相当はProvisionalに留める。

Evidence: セゾンゲーミングカードからセゾンゲーミングカードDigital。

## 10. デポジット型カード

Given: 保証金を預けることで利用可能になるクレジットカードProductがある。

When: Memberが保証金を納付し、利用限度額が設定される。

Then: Deposit、Credit Limit、Payment Instrument、Funding Methodを分ける。保証金をプリペイド残高として扱わない。

Evidence: ライフカード デポジット型。

## 11. 条件付き年会費

Given: 年会費またはサービス年会費に免除条件がある。

When: Memberが対象期間の利用条件を満たす、または満たさない。

Then: Fee Ruleとして条件、対象期間、対象Member、免除有無を扱う。非公開判定条件はundisclosedとする。

Evidence: JCBゴールド ザ・プレミアのサービス年会費免除条件はv1由来の補助Observationであり、v2/03で反証されていないが、Architecture前に一次再確認が必要。三井住友デュアル発行時の2枚目年会費Observationも補助Evidenceとして扱う。

## 12. 複数段階のポイント計算

Given: 基本還元、加盟店・利用経路別倍率、年間利用条件、外部プログラム条件などが重なる。

When: 利用実績からRewardが算定される。

Then: それぞれをReward Ruleとして分け、対象Feature、対象Member Cohort、期間を明示する。Researchで未確認の還元率や端数処理は創作しない。

Evidence: Marriott Bonvoy Amexの年間利用額特典、Hilton Honors Amexの年間利用額特典、bitFlyer クレカのポイントからBTCへの変換。基本還元率や端数処理は追加Evidenceが必要。

## 13. ポイントからBTC等外部資産へ変換

Given: カード利用で中間ポイントが発生し、外部資産へ変換されるProductがある。

When: Reward Operatorがポイントを付与し、Asset OperatorがBTC付与先アカウントを管理する。

Then: Member Reward、Asset Conversion、Reward Operator、Asset Operator、External Account Operatorを分ける。

Evidence: bitFlyer クレカ。

## 14. 複数カード利用による特典

Given: 複数Issuanceまたは複数Product保有が条件となる特典候補がある。

When: BenefitやFeeが複数カード状態に依存する。

Then: Multi Card Relationship Rule候補として扱う。ただしResearchでは統合すべき確定反証はないため、Rule名や構造はProvisionalに留める。

Evidence: 三井住友デュアル発行、03のDualIssuanceRuleとCrossCardSynergyRuleの重複可能性指摘。

## 15. 商品の新規受付停止

Given: ProductまたはOfferingが新規入会停止を告知する。

When: 新規申込受付が終了する。

Then: application_available_toを持つLifecycle Eventとして扱い、Product終了や既存会員利用停止とは分ける。

Evidence: セゾンゲーミングカードDigitalの2024-09-10新規入会停止。

## 16. Featureのみ段階的に終了

Given: Product終了前に特典やポイント等のFeatureが段階的に停止する。

When: 一部Featureが終了し、クレジット機能のみの期間が残る。

Then: Product LifecycleとFeature Lifecycleを分け、Feature単位のavailable_toを扱う。

Evidence: セゾンゲーミングカードDigitalの2025-02-01から2025-03-31の機能限定期間。

## 17. 旧会員のみ旧Ruleが継続

Given: 新規受付停止後も既存会員に一部機能や旧条件が残る。

When: 新規会員と既存会員で適用Ruleが異なる。

Then: Member Cohortを明示し、新規向けRuleを既存会員へ、または既存向けRuleを新規向けへ流用しない。

Evidence: セゾンゲーミングカードDigitalの新規停止後既存会員向け機能限定。その他旧会員Ruleは追加Evidenceが必要。

## 18. KyashのPayment Instrumentと後払いFunding Method

Given: Kyash Card/Card VirtualはVisaプリペイド型Payment Instrumentである。

When: 「イマすぐ入金」で残高に後払いチャージする。

Then: Payment Instrument、Funding Method、Funding Provider、Legal Classificationを分ける。AGペイメントサービスの登録状況はUnknownのまま保持する。

Evidence: Kyash公式サポート、Kyashお知らせ。

## 19. Paidyの複数Payment Scheme

Given: PaidyはActor-levelで包括信用購入あっせん業者登録が確認されている。

When: 一括あと払い、3・6・12回あと払いなど複数支払方式が利用される。

Then: Regulatory RegistrationとPayment Scheme、Transaction Legal Classificationを分ける。各Schemeの法的分類は一次確認がない限りUnknownにする。

Evidence: 経済産業省Paidy行政処分資料、Paidy公式サポート。

## 20. ホテル等External MembershipによるBenefit成立

Given: カードProductがホテル会員プログラムと連動する。

When: Memberが対象年間利用額を満たし、ホテルステータスや無料宿泊特典を受ける。

Then: Card Member、External Membership、Benefit、Reward Rule、Member Cohortを分ける。ホテル会員資格とカード会員資格の契約上の分離度は追加調査事項として残す。

Evidence: Marriott Bonvoy Amex、Hilton Honors Amex。
