# Domain Scenarios

各ScenarioはResearch Evidenceで確認できる範囲に限定する。不明な条件はUnknownまたはundisclosedとして扱う。

## 1. 一般的なクレジットカードへの新規申込

Given: 一般申込可能なProduct Offeringが公式ページで確認されている。

When: 申込者が当該Offeringから申し込む。

Then: Product、Offering、Application Route、Eligibility Rule、Applicant Role、将来のMember Role候補、Issuer Roleを分けて扱う。審査ロジックが非公開ならundisclosedとする。

Evidence: アメックス・ゴールド・プリファードの直接Web申込可能性。

## 2. 同一Productで国際ブランドごとに条件が異なる

Given: 同一Product内でVisa、Mastercard、JCB等のVariantが選択または併存する。

When: ブランドごとに年会費、特典、発行可否、デュアル可否が異なる。

Then: Variant固有Ruleとして保持し、Product共通Ruleへ上書きしない。ブランド有無からLegal Classificationを推論しない。

Evidence: UCSカードmajicaのVisa/Mastercard/JCBブランド付き訂正。ブランド別条件の具体例は現行baselineでは未確認。

## 3. 複数ブランドIssuance（未確認シナリオ）

Given: 同一Actorに複数ブランドのPayment Instrumentが発行される構造を検討する。

When: 複数Issuanceの関係を表す必要が生じる。

Then: Product、Variant、Issuanceを分ける候補とする。ただし発行条件や追加費用を確認済みFactとして置かない。

Evidence: v1由来の例は現行Research baselineで直接再確認されていないため、Research gapとして扱う。

## 4. 家族・追加カード（未解決シナリオ）

Given: 本人以外の利用者に追加のPayment Instrumentが発行される構造を検討する。

When: Actor、Applicant、Contract Party、Cardholder/User、Member Role、Issuanceの関係を区別する必要が生じる。

Then: 追加利用者を自動的にMember RoleまたはContract Partyと確定せず、Issuanceと利用権限を分ける。具体的な契約・請求・権限はUnknownにする。

Evidence: 03のExisting Model Assessmentの一般的言及だけでは具体構造を確定できないため、OQ-8のResearch gapとして扱う。

## 5. 法人カード＋社員追加カード

Given: 法人・コーポレート向けProductまたはパーチェシングサービスが確認されている。

When: 法人代表者または社員利用者が利用する。

Then: 法人、代表者、社員利用者、Billing Entity、利用枠を同一Memberに潰さない。カードレスの場合はIssuanceに含めるか未決として扱う。

Evidence: 三菱UFJカード パーチェシング、JCBパーチェシングサービス、FFGパーチェシングカード。社員追加カードの詳細はResearch不足。

## 6. 招待による上位カード取得

Given: 招待制または利用実績に基づくランクアップProductがある。

When: 既存Memberが条件達成またはカード会社判断で招待される。

Then: Product、Offering、Application Route、Eligibility Rule、Member Cohortを分ける。非公開判定ロジックはundisclosedとする。

Evidence: イオンゴールドカードの年間カードショッピング50万円（税込）以上・審査あり。

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

Evidence: 現行Research baselineには条件付き年会費の具体条件をDomain Factとして確定できる十分な例がない。v1由来例はOQ-18の再調査対象とする。

## 12. 複数段階のポイント計算

Given: 基本還元、加盟店・利用経路別倍率、年間利用条件、外部プログラム条件などが重なる。

When: 利用実績からRewardが算定される。

Then: それぞれをReward Ruleとして分け、対象Feature、対象Member Cohort、期間を明示する。Researchで未確認の還元率や端数処理は創作しない。

Evidence: Marriott Bonvoy Amexの年間利用額特典、Hilton Honors Amexの年間利用額特典、bitFlyer クレカのポイントからBTCへの変換。基本還元率や端数処理は追加Evidenceが必要。

## 13. ポイントからBTC等外部資産へ変換

Given: カード利用で中間ポイントが発生し、外部資産へ変換されるProductがある。

When: Reward Operatorがポイントを付与し、Asset OperatorがBTC付与先アカウントを管理する。

Then: Member Reward、Asset Conversion、Reward Operator、Asset Operator、Account Operatorを分ける。

Evidence: bitFlyer クレカ。

## 14. 複数カード利用による特典

Given: 複数Issuanceまたは複数Product保有が条件となる特典候補がある。

When: BenefitやFeeが複数カード状態に依存する。

Then: Multi Card Relationship Rule候補として扱う。ただしResearchでは統合すべき確定反証はないため、Rule名や構造はProvisionalに留める。

Evidence: 03のDualIssuanceRuleとCrossCardSynergyRuleの重複可能性指摘のみであり、具体的市場Factは未確認。

## 15. 商品の新規受付停止

Given: Offeringが新規入会停止を告知する。

When: 新規申込受付が終了する。

Then: Offering availabilityのLifecycle Eventとして扱い、Product Feature終了、Product終了、既存会員利用停止とは分ける。特定Application Routeだけが停止する場合はRoute availabilityとし、Offering全体の停止と区別する。

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

Then: Card Member Role、External Membership、非Reward Benefit、Benefitに適用されるRule、Member Cohortを分ける。無料宿泊・ホテルステータスをMember Rewardにも重複所属させない。ホテル会員資格とカード会員資格の契約上の分離度は追加調査事項として残す。

Evidence: Marriott Bonvoy Amex、Hilton Honors Amex。

## 21. 1契約に複数InstrumentまたはMediumがある

Given: 基本カードに異なる素材のセカンドカードや、関連するETC Payment Instrumentが存在する。

When: Instrumentまたは媒体ごとの利用・停止・Feeを説明する。

Then: Product、契約、Issuance、Payment Instrument、Instrument Medium、Identifierを分ける。媒体枚数と契約数、Credit Facility数が一致すると推論しない。

## 22. 法人契約と従業員利用・統制枠

Given: 法人が契約し、従業員が追加媒体を利用する。

When: 契約全体枠と利用者別上限が併存する。

Then: Contract Party、Reviewed Party、Cardholder/User、Billing Entity、Issuance、Credit Facility、Credit Limit Ruleを分ける。具体的Role割当はProductごとのEvidenceに従う。

## 23. 条件・上限を持つ期間限定Campaign

Given: 登録、入会、対象利用、金額閾値を満たすとReward候補となり、全体予算で早期終了しうる。

When: Campaignの有効性と付与可否を説明する。

Then: Campaign Instance、Rule、対象Transaction、各期間、Member単位上限、Campaign全体上限を分ける。条件達成者全員への確定付与、通常Rewardとの重複、予定終了日までの継続を推論しない。

## 24. 多段階Rewardと交換後の独自失効

Given: 利用で中間ポイントが発生し、別ポイントまたはマイルへ交換される。

When: 交換後に異なる有効期限が適用される。

Then: 各Reward/Asset、Reward Rule、Asset Conversion、集計・付与・交換・失効期間を分ける。表示上の交換率だけから実質還元率や同一残高を決めない。

## 25. Fee免除と複数媒体の料金

Given: 本カード年会費は条件付き無料だが、家族カード、ETC、発行・再発行には別条件がある。

When: 費用を比較する。

Then: 対象Issuance/媒体、初年度・次年度、集計window、免除・繰越条件ごとにFee Ruleを分ける。「年会費無料」から全費用が無料と推論しない。

## 26. 取引から請求・枠回復まで

Given: 利用承認後に売上が確定し、締め・請求・支払を経て利用可能額が変化する。

When: 取消・返金も起こりうる。

Then: Transaction Lifecycle、Billing Cycle、Payment Scheme、Credit Facilityを分ける。利用日、売上確定日、請求日、枠回復日が一致すると推論しない。

## 27. 招待から発行まで

Given: Actorが招待を受け、申込後に審査される。一般申込Routeも並存しうる。

When: 発行に至る過程を説明する。

Then: Invitation、Application Route、Eligibility、Applicant、Reviewed Party、Screening、Contract Party、Issuanceを分ける。招待が資格充足、審査承認または発行を保証すると推論しない。

## 28. 担保別条件を持つ付帯保険

Given: 旅行傷害保険の担保ごとに利用付帯条件、対象者、Limitが異なる。

When: 複数カードの補償に最大値キャップがある。

Then: Benefit表示、Insurance Product、Coverage、Underwriter、Insured/Beneficiary、Trigger、Limit、Exclusion、Claim Requirement、合算Ruleを分ける。商品ページの最高額が全担保・全対象者へ適用されることや単純加算を推論しない。
