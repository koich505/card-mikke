# Actors And Roles

## Concept: Actor

### Definition

Actorは、国内クレジットカードおよび隣接決済領域で、契約、発行、請求、与信、ブランド、提携、特典、外部会員、資産管理などのRoleを担いうる当事者である。

### Responsibility

ActorはRoleの担い手として識別される。Actor自体に「常にIssuerである」「常にReward Operatorである」といった恒久的責務を持たせない。

### Identity

法人や団体は法的同一性、名称、公式Source、登録番号等で同一性を判断する。サービス名だけで法人同一性が確認できない場合はUnknownとして扱う。

### Lifecycle

Actorの名称変更、組織再編、登録状態変更、提携開始・終了は時間を持つDomain Factとして扱う。過去のRole assignmentは後から破壊しない。

### Relationships

ActorはActor Roleを通じてProduct、Offering、Payment Scheme、Reward、Economic Flow、Evidenceと関係する。

### Invariants

- ActorとRoleを同一視しない。
- あるProductで担ったRoleを、同じActorの全Productへ自動適用しない。
- 事業者登録から個別Transactionの法的分類を導出しない。

### Boundaries

Actorは商品、カード券面、支払方式、Ruleではない。団体所属や外部アカウントも、運営主体と会員資格を分けて扱う。

### Examples

- アプラスはbitFlyer クレカでIssuer、Credit Provider、Billing Entity、Reward Operatorに相当するRoleを担う。
- bitFlyerはbitFlyer クレカでAsset Operator、Account Operatorに相当するRoleを担う。
- PaidyはRegulatory Registrant、Credit Provider、Billing Entityに相当する。
- 全弁協はExternal Membership Operator、Partner Organization、Economic Flowの受益者候補となる。

### Counterexamples

bitFlyer クレカでは、カード発行会社と暗号資産変換・外部アカウント運営主体が異なる。Issuerだけを商品主体として扱うと、Reward destinationや外部アカウント要件を説明できない。

### Temporal Behavior

Role assignmentには有効期間がある。弁護士VISAビジネスカードのように提携が2025-02-28で終了しても、Actor自体や商品自体の終了とは限らない。

### Evidence Requirements

Actorを登録するには、公式サイト、規約、行政資料、団体公式資料など、名称とRoleを結びつけるSourceが必要である。登録番号や行政処分はSourceの発行主体と日付を保持する。

### Open Questions

- Processor、Acquirer、Guarantee Providerの具体例は今回のResearchで十分に検証されていない。
- Contract PartyをIssuer、Billing Entity、Credit Providerからどう切り分けるかは追加規約調査が必要。

## Concept: Actor Role

### Definition

Actor Roleは、Actorが特定の文脈で担う責務である。RoleはActorの属性ではなく、Product、Offering、Contract、Account、Issuance、Transaction、Campaign、Insurance、Payment Scheme、Reward、Economic Flow等の対象、期間、Evidenceと結びつく。

### Responsibility

Roleは「誰が何を担うか」を明示し、Actor間の責務混同を防ぐ。

### Identity

Role自体は独立Identityを持たないValue/Relationshipに近い。実務上の同一性はActor、Role type、対象、期間、Evidenceで判断する。

### Lifecycle

Role assignmentは開始、変更、終了しうる。提携終了や商品改定によりRoleの範囲が変わる場合がある。

### Relationships

Actor RoleはActorと対象Conceptを結ぶ。対象はProduct、Offering、Contract、Account、Issuance、Payment Instrument、Payment Scheme、Transaction、Campaign、Insurance Product、Coverage、Reward、Benefit、Economic Flow、External Membership等である。

### Invariants

- RoleはEvidenceなしに推定しない。
- 同一Actorが複数Roleを担っても、Role間の責務を統合しない。
- 同一Productに複数Actorが関与しても、代表Actorだけに全責務を寄せない。

### Boundaries

Roleは法人情報ではない。Role typeの一覧は固定列挙ではなく、Research追加により拡張されうる。

### Examples

- Issuer、Credit Provider、Billing Entity、Partner Organization、Reward Operator、Asset Operator、Funding Provider、External Membership Operator。
- Kyash CardのPayment Instrument提供と、AGペイメントサービスによる後払い型Funding Method。

### Counterexamples

Kyashを「後払いカード」と単純分類すると、Visaプリペイド型Payment Instrumentと後払い型Funding Methodの契約主体差が消える。

### Temporal Behavior

Role assignmentはProductやFeatureのLifecycleと同期しない場合がある。提携だけが終了し、商品や既存会員の扱いはUnknownに残る場合がある。

### Evidence Requirements

Roleを事実として扱うには、公式商品説明、規約、FAQ、行政資料、団体公式ページ等で、対象と責務が直接または十分に示されている必要がある。

### Open Questions

- Role typeをどこまで細分化するか。
- ブランド／ネットワーク識別値、Payment Network / Scheme、運営ActorのRoleをどう対応づけるか。

## Provisional Boundary: Brand, Network, And Operator

Visa、Mastercard、JCB、Amex等の表示は、現時点では`Brand / Network Identifier`という暫定的な識別値として扱う。これをActor Roleとは確定しない。

Payment Instrumentが接続するネットワークまたはスキームは`Payment Network / Scheme`候補として識別値と分ける。また、その運営主体が担う責務は`Network Operator Role`候補としてActorに割り当てうるが、現行Research baselineでは名称、粒度、識別値との対応関係を確定するEvidenceが不足している。

したがって、ブランド表示だけから運営Actor、ネットワーク上の責務、法的分類を推論しない。この未解決境界は`12-open-questions.md`に残す。

## Concept: Partnership

### Definition

Partnershipは、Issuer等の商品提供ActorとPartner Organizationの間で、特定ProductまたはOfferingを成立させる関係である。

### Responsibility

Partnershipは、提携先、対象商品、適用期間、外部資格要件、特約、収益や便益の流れを説明する入口となる。

### Identity

同一性はPartner Organization、商品提供側Actor、対象ProductまたはOffering、期間、Evidenceで判断する。1つのPartner Organizationが複数Issuer、複数Productと提携しても別Partnershipとして扱える。

### Lifecycle

提携は開始、改定、終了しうる。提携終了はProduct終了ではない場合がある。

### Relationships

PartnershipはProduct、Offering、Eligibility Rule、Application Route、Economic Flow、Source Documentと関係する。

### Invariants

- Partnershipの多対多自体は問題ではない。
- 提携による経済的受益者をMemberと決めつけない。
- 提携終了と商品終了を同一視しない。

### Boundaries

PartnershipはReward Programではない。外部団体への収益帰属はEconomic Flowとして別途検討する。

### Examples

- 全弁協は三菱UFJニコス、クレディセゾン、UCカード、ダイナースクラブ等と複数の弁護士専用カードを並行して提供する。
- 東京税理士協同組合の税理士カードは専門職団体提携の類似例である。

### Counterexamples

全弁協の利用連動手数料収入をMember Rewardとして扱うと、会員本人ではない協同組合への価値移転を表現できない。

### Temporal Behavior

弁護士VISAビジネスカードは2025-02-28に提携終了が示されるが、既存会員の扱いはUnknownである。提携終了日、商品終了日、Feature終了日は分ける。

### Evidence Requirements

提携公式ページ、提携特約、Issuer規約、提携団体資料が必要である。受益者や分配率が不明な場合はpartially_disclosedまたはunknownを保持する。

### Open Questions

- Partner Revenue ShareをPartnershipの責務に含めるか、独立したEconomic Flowとして扱うか。
- 外部団体がApplication Route、Eligibility、Benefit、Economic Flowに同時作用する場合の最小Concept境界。

## Concept: Regulatory Registration

### Definition

Regulatory Registrationは、Actorが法令上の登録、許可、監督対象であることを示すActor-level Legal Factである。

### Responsibility

Actor単位の法的状態を説明し、Sourceと取得時点を伴って保持する。

### Identity

登録番号、登録種別、登録主体、登録日、監督官庁、Sourceで同一性を判断する。

### Lifecycle

登録、更新、取消、行政処分、名称変更がありうる。

### Relationships

Regulatory RegistrationはActorに属する。Product、Payment Scheme、Transaction Legal Classificationとは別の関係で結ぶ。

### Invariants

- 登録事業者であることから、そのActorの全Product、全Payment Scheme、全Transactionが同一の法的分類であるとは推論しない。
- Legal Classificationが確認不能な場合はUnknownとして扱う。

### Boundaries

Regulatory RegistrationはProduct characteristicでもTransaction classificationでもない。

### Examples

Paidyは経済産業省登録の包括信用購入あっせん業者であり、2024年10月の行政処分資料で登録番号等が確認されている。

### Counterexamples

Paidyの登録事実から、一括あと払い、3・6・12回あと払いの個別法的分類を自動決定すると破綻する。

### Temporal Behavior

登録日、行政処分日、Sourceの公開日、Retrieved dateを分ける。

### Evidence Requirements

Tier1行政資料または同等の一次情報を優先する。商品サイト上の表示だけでは登録事実の根拠として不足する場合がある。

### Open Questions

- Kyash「イマすぐ入金」提供元の登録状況はUnknown。
- atoneの登録区分はUnknown。

## Role Assignment Boundaries Added By Research 04-13

追加Researchにより、Applicant、Reviewed Party、Contract Party、Cardholder / User、Beneficiary、Billing Entity、Benefit Provider、Campaign Sponsor、Insurance Underwriter、Claims HandlerはActorの恒久属性ではなく、対象Product、契約、取引、施策または保険と期間を伴うRole Assignmentとして扱う。

- Applicantであることから契約主体、利用者、審査対象または発行先を自動決定しない。
- Contract PartyであることからInstrumentの実利用者、Reward受益者または被保険者を自動決定しない。
- Issuer、Billing Entity、Benefit Provider、Campaign Sponsor、Insurance Underwriter、Claims Handlerが同一Actorであると仮定しない。
- 法人、代表者、従業員、家族、本会員、追加会員への具体的なRole割当は、Productごとの規約・申込条件・請求関係をEvidenceとして決める。
- 共同発行、地域ごとのIssuer表示、取引または加盟店種別によるBilling Entityの差はProvisionalとし、Researchの示唆だけで一般化しない。

加盟店会員、加盟店契約、Acquiringの詳細は現行サイトの発行側中心Scope外とする。発行商品・請求・Benefitの説明に直接必要なRoleだけを保持し、包括的な加盟店ドメインには拡張しない。
