# Glossary

この用語集はDomain Specification内での意味を統一するためのもの。名称は実装名ではない。

| Term | Kind | Definition | Boundary | Evidence |
|---|---|---|---|---|
| Actor | Actor | ドメイン上の責務を担う法人、団体、個人、サービス主体。 | Roleそのものではない。 | 02 §7.1、03 EC-1、EC-3、EC-4 |
| Organization | Actor subtype | 法人格または団体として観測されるActor。 | 法人格がないサービス名だけではOrganizationと断定しない。 | 全弁協、Paidy、アプラス、bitFlyer |
| Actor Role | Role | ActorがProduct、Offering、Contract、Account、Issuance、Transaction、Campaign、Insurance、Scheme、Flow等の特定文脈で担う責務。 | Actorの恒久属性ではない。 | bitFlyer クレカ、Kyash |
| Issuer | Role | 特定Product、InstrumentまたはIssuanceについて発行責務を担うRole。 | 公称表示だけで契約主体、Credit Provider、Billing Entityと同一視しない。共同発行では複数assignmentを許し、責任内容はEvidenceに従う。 | アプラス、三井住友カード、クレディセゾン |
| Member Contract Party | Contract Party sub-role | 会員契約においてContract Partyを担うRole。 | Issuerと常に同一とは仮定しない。 | 全弁協カード、Kyash |
| Credit Provider | Role | 信用供与または後払い与信を提供するRole。 | Payment Instrument提供者と常に同一ではない。 | Kyash「イマすぐ入金」、Paidy |
| Billing Entity | Role | 請求・精算の主体となるRole。 | ブランドや提携団体ではない場合がある。 | Paidy、アプラス |
| Reviewed Party | Role | 申込・更新等で資格または信用の審査対象となるActorのRole。 | Applicant、Contract Party、Userと一致するとは限らず、審査判断そのものでもない。 | 04、11、13 |
| Beneficiary | Role | Reward、Benefit、保険金、Economic Flow等の価値を受けるActorのRole。 | Member、Contract Party、Userと常に同一ではない。 | 04、08、09、12、13 |
| Benefit Provider | Role | Benefitの提供または履行を担うActor Role。 | Issuer、Partner Organization、Reward Operatorと一致するとは限らない。 | 09 |
| Campaign Sponsor | Role | Campaignの費用、実施責任または施策目的を担うActor Role。 | Campaign運営窓口やReward Operatorと一致するとは限らない。 | 07 |
| Insurance Underwriter | Role | 保険契約を引き受けるActor Role。 | Issuer、Benefit Provider、Claims Handlerと分ける。 | 12 |
| Claims Handler | Role | 保険事故の受付・査定・支払手続を担うActor Role。 | Underwriterと一致する場合もあるが推定しない。 | 12 |
| Processor | Role | 決済処理を担うRole。 | 本Researchでは詳細未調査。 | 01 actor分類 |
| Acquirer | Role | 加盟店契約を担うRole。 | Issuerと同一会社の場合も別会社の場合もある。 | 01 actor分類 |
| Brand / Network Identifier | Value (provisional) | Visa、Mastercard、JCB、Amex等として表示されるブランドまたはネットワークの識別値。 | 運営ActorやそのRoleと同一視せず、法的与信分類を決める軸にも置かない。 | UCSカードmajica、bitFlyer クレカ |
| Payment Network / Scheme | Concept (provisional) | Payment Instrumentが接続する決済ネットワークまたはスキームの候補概念。 | Payment Scheme（支払回数・支払時期）とは別であり、運営Actor Roleの粒度は未解決。 | Visaプリペイド型Instrument、Mastercard表示 |
| Network Operator Role | Role (provisional) | Payment Network / Schemeを運営するActorが担う可能性のあるRole。 | ブランド識別値だけから運営Actorや責務を推定しない。 | 現行ResearchではRole境界の確定に不足 |
| Partner Organization | Role | ProductやOfferingに提携する外部団体Role。 | 会員本人へのReward受益者とは限らない。 | 全弁協、東京税理士協同組合 |
| Reward Operator | Role | ポイント等のMember Rewardを運営するRole。 | Asset Operatorと分ける。 | bitFlyer クレカのアプラス |
| Asset Operator | Role | 暗号資産、ホテルポイント等の外部資産・資格を管理するRole。 | Reward計算主体とは限らない。 | bitFlyer、ホテル会員プログラム |
| Account Operator | Role | カードまたは外部ServiceのAccountを運営するRole。 | Actor、Member、Asset Operatorと常に同一ではない。 | bitFlyer等 |
| Funding Provider | Role | 残高や支払に必要な資金供給手段を提供するRole。 | Payment Instrument発行者と分ける。 | Kyash「イマすぐ入金」 |
| Guarantee Provider | Role | 保証や立替保証を担うRole。 | 今回はRentGuaranteeServiceの反証不足。 | 03 §5 |
| External Membership Operator | Role | カード外の会員資格やアカウントを運営するRole。 | Eligibility、Application Route、Reward Destinationのいずれにも作用しうる。 | 全弁協、bitFlyer、Marriott、Hilton |
| Product | Product | 市場に提供され、規約・申込・利用条件のまとまりを持つ商品またはサービス。 | OfferingやVariantをすべてProduct化しない。 | 三井住友カード、Paidy、Kyash Card |
| Offering | Product boundary | Productを誰に、どの経路で、どの期間、どの条件で提供するか。 | Productの本質的同一性とは分ける。 | Amex切替、全弁協限定申込 |
| Variant | Product boundary | 同一Product内のブランド、デザイン、券面、グレード等の差異候補。 | 国際ブランド差が常にVariantとは限らない。 | UCSカードmajicaの複数ブランド表示 |
| Product Feature | Product boundary | Productに含まれる決済機能、特典、ポイント付与等の機能的な部分。 | Product全体の状態、OfferingやApplication Routeの受付可否と混同しない。 | セゾンゲーミングカードDigital |
| Applicant | Role | 特定OfferingまたはApplication Routeで申込を行うActorの文脈上のRole。 | Member Role、契約主体、Cardholder/User、Issuance状態とは分ける。 | 一般申込、外部団体限定申込 |
| Invitation | Fact/Relationship | Actorに特定Application Routeを提示した事実。 | Eligibility充足、審査承認、契約またはIssuanceを保証しない。 | 13 |
| Screening | Decision process | Reviewed Partyについて申込・更新等の判断を行う過程。 | 公開Eligibility Ruleと分け、非公開ロジックを推測しない。 | 11、13 |
| Contract Party | Role | カードまたはサービス契約の当事者となるActorの文脈上のRole。 | Applicant、利用者、受益者と一致するとは限らない。 | 法人・追加利用者の境界は未解決 |
| Cardholder / User | Role (provisional grouping) | 発行・利用可能化されたPayment Instrumentを保有または利用するActorのRole。 | 契約主体やMember Roleと一致するとは限らず、Instrument HolderとAuthorized Userの分離要否をOQに残す。 | 法人カード・追加カードの詳細は未解決 |
| Member Role | Role | 有効な会員関係の文脈でActorが担う会員Role。 | Actor、申込プロセス、契約主体、Issuanceの状態保持対象ではない。 | カード会員、サービス会員 |
| External Membership | Membership | カード外部の団体所属、ホテル会員、マイレージ会員、サービスアカウント。 | 単なるEligibilityフラグではない。 | 全弁協、bitFlyer、Marriott、Hilton |
| Account | Membership | 外部サービスまたはカードサービスにおける利用者単位。 | 法人格・会員契約・資産保有の同一性はEvidenceで確認する。 | bitFlyerアカウント、Kyashアカウント |
| Issuance | Issuance | 契約またはAccountのもとで、特定ActorにPayment Instrumentまたは利用権限を割り当てる関係。 | Product、契約、媒体、カード番号、信用供与そのものではない。 | 04、05、06、10、13 |
| Attached Card | Issuance subtype | 本会員・法人等に紐づいて追加発行されるカード。 | 独立契約か従属利用かはEvidenceが必要。 | 家族カード、社員追加カード |
| Instrument Medium | Value/Object candidate | 物理カード、メタル／プラスチック素材、バーチャル表示等、Instrumentを提示・利用する形態。 | Issuance、Product、Payment Instrument、Identifierと同一視しない。ETCは関連する別Instrument候補として扱う。 | 05、10 |
| Instrument Identifier | Value candidate | カード番号等、Payment Instrumentを識別・利用するための値。 | ActorやAccountのIdentityとして扱わず、機密情報の保持方法は本仕様の対象外。 | 05、06 |
| Payment Instrument | Payment | 決済能力またはcredentialとして利用される支払手段。 | Medium、Identifier、Funding Method、Credit Facility、Legal Classificationと同一視しない。 | クレジットカード、ETC、Kyash Card、プリペイド |
| Payment Scheme | Payment | 一括、分割、リボ、翌月払い等の支払方式候補。 | 名称・構造は暫定。法的分類とは分ける。 | Paidy、クレジットカードの支払方式 |
| Funding Method | Payment | 支払手段や残高へ資金を供給する方法。 | Payment Instrumentそのものではない。 | Kyash「イマすぐ入金」 |
| Credit Facility | Credit | Actorまたは契約に供与される信用と利用可能額の責務。 | Instrumentや表示上の利用可能枠と同一視しない。 | 04、11、13 |
| Credit Limit | Credit value/rule | Credit Facilityに適用される契約上の総枠または一時増枠。 | Product固定値、利用可能額、媒体・利用者・用途別のSpending Controlと区別する。 | 04、11 |
| Spending Control Rule | Rule | Issuance、Authorized User、媒体、用途、期間等に対する運用上の利用制約。 | Credit Facilityまたは契約上の総枠と同一視しない。 | 04、11 |
| Billing Cycle | Billing | Transactionを締め、請求を確定し、支払期限へ結びつける期間とRule。 | Product全体の固定属性やCampaign集計期間ではない。 | 10、11 |
| Transaction Lifecycle | Payment event sequence | Authorization、売上確定、請求、支払、取消、返金、枠回復等の取引状態遷移。 | Product LifecycleやPayment Schemeと混同しない。 | 11 |
| Regulatory Registration | Evidence/Legal fact | 事業者単位の登録・許認可に関するDomain Fact。 | 個別取引の法的分類を自動決定しない。 | Paidyの包括信用購入あっせん業者登録 |
| Legal Classification | Evidence/Legal fact | Product、Scheme、Transaction等に対する法的性質の分類。 | Unknownを推測で埋めない。 | Paidy、Kyash、atone |
| Reward | Benefit subtype | 利用等に応じてMemberへ発生・付与され、残高・数量・金額等として算定または蓄積される還元価値。 | 非蓄積型の資格・サービス便益およびPartner Revenue Shareとは分ける。 | アプラスポイント、BTC変換前の価値 |
| Benefit | Benefit | Rewardを含む会員向け便益の総称。無料宿泊やホテルステータスは現時点では非Reward Benefitとして扱う。 | Rewardとの下位境界に未解決部分を残し、Economic Flow全般とはしない。 | ホテルステータス、無料宿泊 |
| Economic Flow | Flow | Member以外のActorも含む価値・収益・寄付・手数料の流れ。 | 1事例だけで独立構造を固定しない。 | 全弁協手数料収入、大学寄付候補 |
| Partner Revenue Share | Flow candidate | 提携先団体への利用連動収益分配候補。 | Member Rewardに吸収しない。 | 全弁協 |
| Rule | Rule | 条件、算定、適用期間、対象範囲を持つ判断単位。 | すべてを専用Entity化しない。 | 年会費、Eligibility、Reward、Deposit |
| Campaign | Campaign | 通常Ruleから区別される、目的・実施主体・実施回・期間・予算または配賦方式を持つ有限の施策。 | 恒常RewardやOfferingそのものではない。 | 07 |
| Campaign Instance | Campaign occurrence | Campaign Templateまたは施策方針に基づく個別の実施回。 | 同名Campaignの別期間・別条件を同一視しない。 | 07 |
| Insurance Product | Insurance | 独自の約款、引受主体、期間を持ち、カード関係に付帯または関連する保険商品。 | Product FeatureやBenefit表示だけに還元しない。 | 12 |
| Coverage | Insurance component | 保険Product内の担保・補償項目。Trigger、Limit、Exclusion、Claim Requirementを持つ。 | Insurance Product全体や単なる表示上の最高額と同一視しない。 | 12 |
| Insured | Role | Coverageの対象となる人またはActorのRole。 | Contract Party、Member、Cardholder/User、Beneficiaryと一致するとは限らない。 | 12 |
| Claim Requirement | Rule/Requirement | 保険事故の通知、書類、期限等、請求成立・手続に必要な条件。 | Coverage Trigger、支払結果、Claims Handlerと同一視しない。 | 12 |
| Lifecycle Event | Event | Product、Feature、Rule、Partnership、Issuanceの状態変化。 | 観測日や掲載日と有効日を混同しない。 | セゾンゲーミング、弁護士VISA提携終了 |
| Evidence | Evidence | Domain Factの根拠。Source、Observation、Extracted Factを追跡する。 | 表示値だけを保存する発想は不可。 | v1監査の誤り群 |
| Disclosure Status | Value | 個別claim、Observation、Extracted Fact、Domain Factに対するdisclosed、partially_disclosed、undisclosed、unknownの区別。 | Source全体へ単一Statusを付けず、unknownとundisclosedを同一視しない。 | 02 §4、03 §6 |
