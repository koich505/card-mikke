# Glossary

この用語集はDomain Specification内での意味を統一するためのもの。名称は実装名ではない。

| Term | Kind | Definition | Boundary | Evidence |
|---|---|---|---|---|
| Actor | Actor | ドメイン上の責務を担う法人、団体、個人、サービス主体。 | Roleそのものではない。 | 02 §7.1、03 EC-1、EC-3、EC-4 |
| Organization | Actor subtype | 法人格または団体として観測されるActor。 | 法人格がないサービス名だけではOrganizationと断定しない。 | 全弁協、Paidy、アプラス、bitFlyer |
| Actor Role | Role | Actorが特定Product、Offering、Scheme、Flowで担う責務。 | Actorの恒久属性ではない。 | bitFlyer クレカ、Kyash |
| Issuer | Role | カードまたは支払手段を発行するRole。 | 暗号資産変換主体や外部会員運営主体とは限らない。 | アプラス、三井住友カード、クレディセゾン |
| Member Contract Party | Role | 会員と契約関係を持つRole。 | Issuerと常に同一とは仮定しない。 | 全弁協カード、Kyash |
| Credit Provider | Role | 信用供与または後払い与信を提供するRole。 | Payment Instrument提供者と常に同一ではない。 | Kyash「イマすぐ入金」、Paidy |
| Billing Entity | Role | 請求・精算の主体となるRole。 | ブランドや提携団体ではない場合がある。 | Paidy、アプラス |
| Processor | Role | 決済処理を担うRole。 | 本Researchでは詳細未調査。 | 01 actor分類 |
| Acquirer | Role | 加盟店契約を担うRole。 | Issuerと同一会社の場合も別会社の場合もある。 | 01 actor分類 |
| Brand / Network Identifier | Value (provisional) | Visa、Mastercard、JCB、Amex等として表示されるブランドまたはネットワークの識別値。 | 運営ActorやそのRoleと同一視せず、法的与信分類を決める軸にも置かない。 | UCSカードmajica、bitFlyer クレカ |
| Payment Network / Scheme | Concept (provisional) | Payment Instrumentが接続する決済ネットワークまたはスキームの候補概念。 | Payment Scheme（支払回数・支払時期）とは別であり、運営Actor Roleの粒度は未解決。 | Visaプリペイド型Instrument、Mastercard表示 |
| Network Operator Role | Role (provisional) | Payment Network / Schemeを運営するActorが担う可能性のあるRole。 | ブランド識別値だけから運営Actorや責務を推定しない。 | 現行ResearchではRole境界の確定に不足 |
| Partner Organization | Role | ProductやOfferingに提携する外部団体Role。 | 会員本人へのReward受益者とは限らない。 | 全弁協、東京税理士協同組合 |
| Reward Operator | Role | ポイント等のMember Rewardを運営するRole。 | Asset Operatorと分ける。 | bitFlyer クレカのアプラス |
| Asset Operator | Role | 暗号資産、ホテルポイント等の外部資産・資格を管理するRole。 | Reward計算主体とは限らない。 | bitFlyer、ホテル会員プログラム |
| Funding Provider | Role | 残高や支払に必要な資金供給手段を提供するRole。 | Payment Instrument発行者と分ける。 | Kyash「イマすぐ入金」 |
| Guarantee Provider | Role | 保証や立替保証を担うRole。 | 今回はRentGuaranteeServiceの反証不足。 | 03 §5 |
| External Membership Operator | Role | カード外の会員資格やアカウントを運営するRole。 | Eligibility、Application Route、Reward Destinationのいずれにも作用しうる。 | 全弁協、bitFlyer、Marriott、Hilton |
| Product | Product | 市場に提供され、規約・申込・利用条件のまとまりを持つ商品またはサービス。 | OfferingやVariantをすべてProduct化しない。 | 三井住友カード、Paidy、Kyash Card |
| Offering | Product boundary | Productを誰に、どの経路で、どの期間、どの条件で提供するか。 | Productの本質的同一性とは分ける。 | Amex切替、全弁協限定申込 |
| Variant | Product boundary | 同一Product内のブランド、デザイン、券面、グレード等の差異候補。 | 国際ブランド差が常にVariantとは限らない。 | UCSカードmajicaの複数ブランド表示 |
| Product Feature | Product boundary | Productに含まれる決済機能、特典、ポイント付与等の機能的な部分。 | Product全体の状態、OfferingやApplication Routeの受付可否と混同しない。 | セゾンゲーミングカードDigital |
| Applicant | Role | 特定OfferingまたはApplication Routeで申込を行うActorの文脈上のRole。 | Member Role、契約主体、Cardholder/User、Issuance状態とは分ける。 | 一般申込、外部団体限定申込 |
| Contract Party | Role | カードまたはサービス契約の当事者となるActorの文脈上のRole。 | Applicant、利用者、受益者と一致するとは限らない。 | 法人・追加利用者の境界は未解決 |
| Cardholder / User | Role | 発行・利用可能化されたPayment Instrumentを保有または利用するActorのRole。 | 契約主体やMember Roleと一致するとは限らない。 | 法人カード・追加カードの詳細は未解決 |
| Member Role | Role | 有効な会員関係の文脈でActorが担う会員Role。 | Actor、申込プロセス、契約主体、Issuanceの状態保持対象ではない。 | カード会員、サービス会員 |
| External Membership | Membership | カード外部の団体所属、ホテル会員、マイレージ会員、サービスアカウント。 | 単なるEligibilityフラグではない。 | 全弁協、bitFlyer、Marriott、Hilton |
| Account | Membership | 外部サービスまたはカードサービスにおける利用者単位。 | 法人格・会員契約・資産保有の同一性はEvidenceで確認する。 | bitFlyerアカウント、Kyashアカウント |
| Issuance | Issuance | Memberに対して支払手段が発行または利用可能化された状態。 | Productそのものではない。 | 本カード、家族カード、社員カード、Virtual |
| Attached Card | Issuance subtype | 本会員・法人等に紐づいて追加発行されるカード。 | 独立契約か従属利用かはEvidenceが必要。 | 家族カード、社員追加カード |
| Payment Instrument | Payment | 決済時に提示または利用される支払手段。 | Funding MethodやLegal Classificationと同軸に置かない。 | クレジットカード、Kyash Card、プリペイド |
| Payment Scheme | Payment | 一括、分割、リボ、翌月払い等の支払方式候補。 | 名称・構造は暫定。法的分類とは分ける。 | Paidy、クレジットカードの支払方式 |
| Funding Method | Payment | 支払手段や残高へ資金を供給する方法。 | Payment Instrumentそのものではない。 | Kyash「イマすぐ入金」 |
| Regulatory Registration | Evidence/Legal fact | 事業者単位の登録・許認可に関するDomain Fact。 | 個別取引の法的分類を自動決定しない。 | Paidyの包括信用購入あっせん業者登録 |
| Legal Classification | Evidence/Legal fact | Product、Scheme、Transaction等に対する法的性質の分類。 | Unknownを推測で埋めない。 | Paidy、Kyash、atone |
| Reward | Benefit subtype | 利用等に応じてMemberへ発生・付与され、残高・数量・金額等として算定または蓄積される還元価値。 | 非蓄積型の資格・サービス便益およびPartner Revenue Shareとは分ける。 | アプラスポイント、BTC変換前の価値 |
| Benefit | Benefit | Rewardを含む会員向け便益の総称。無料宿泊やホテルステータスは現時点では非Reward Benefitとして扱う。 | Rewardとの下位境界に未解決部分を残し、Economic Flow全般とはしない。 | ホテルステータス、無料宿泊 |
| Economic Flow | Flow | Member以外のActorも含む価値・収益・寄付・手数料の流れ。 | 1事例だけで独立構造を固定しない。 | 全弁協手数料収入、大学寄付候補 |
| Partner Revenue Share | Flow candidate | 提携先団体への利用連動収益分配候補。 | Member Rewardに吸収しない。 | 全弁協 |
| Rule | Rule | 条件、算定、適用期間、対象範囲を持つ判断単位。 | すべてを専用Entity化しない。 | 年会費、Eligibility、Reward、Deposit |
| Lifecycle Event | Event | Product、Feature、Rule、Partnership、Issuanceの状態変化。 | 観測日や掲載日と有効日を混同しない。 | セゾンゲーミング、弁護士VISA提携終了 |
| Evidence | Evidence | Domain Factの根拠。Source、Observation、Extracted Factを追跡する。 | 表示値だけを保存する発想は不可。 | v1監査の誤り群 |
| Disclosure Status | Value | 個別claim、Observation、Extracted Fact、Domain Factに対するdisclosed、partially_disclosed、undisclosed、unknownの区別。 | Source全体へ単一Statusを付けず、unknownとundisclosedを同一視しない。 | 02 §4、03 §6 |
