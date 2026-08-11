# Membership And Issuance

## Concept: Member

### Definition

Memberは、カードまたは決済サービスとの有効な会員関係においてActorが担うMember Roleである。

### Responsibility

Member Roleは、会員としての利用資格、Reward受領、コホート別Rule適用の対象を説明する。申込資格はApplicant、契約上の当事者性はContract Party、カードの保有・利用はCardholder/User、発行状態はIssuanceがそれぞれ担う。

### Identity

Member Role自体をActorのIdentityや契約単位にしない。誰がMember Roleを担うかはActor、対象Productまたはサービス、会員関係、期間、Evidenceで判断する。個人、法人、法人代表者、家族・追加カード利用者、社員利用者のどれがMember Roleまたは別Roleを担うかは、確認済みの契約関係を超えて確定しない。

### Lifecycle

Member Roleは入会による開始、停止、退会・解約による終了、既存会員のみ継続がありうる。申込・審査はApplicantを対象とする過程、発行・利用停止・再発行はIssuanceの状態遷移として分離する。

### Relationships

Member RoleはActor、Contract Party、Cardholder/User、Issuance、Offering、External Membership、Account、Reward、Evidenceと関係する。

### Invariants

- Member RoleをActor、Applicant、Contract Party、Cardholder/User、Issuanceと同一視しない。
- Member Roleを常に個人が担うと固定しない一方、法人・代表者・家族・社員のいずれが担うかをEvidenceなしに確定しない。
- Member本人へのRewardと、外部団体へのEconomic Flowを混同しない。
- 本会員、家族会員、法人、社員利用者の責務差を潰さない。

### Boundaries

Member RoleはActorそのものでも、契約や発行の状態保持対象でもない。外部団体所属、ホテル会員、bitFlyerアカウントはExternal MembershipまたはAccountであり、カードのMember Roleとは別に扱う。

### Examples

- bitFlyer クレカでは個人のみ対象で、bitFlyerアカウントが申込前提となる。
- 全弁協カードでは弁護士協同組合員資格が申込条件となる。

### Counterexamples

全弁協の手数料収入をMember Rewardに寄せると、Member本人ではなく所属協同組合が受益する構造を表現できない。

### Temporal Behavior

新規会員、既存会員、特定期間加入者、移行元会員などのMember CohortごとにRuleやFeatureの有効性が変わる。

### Evidence Requirements

規約、申込条件、FAQ、特約、会員種別説明が必要である。家族会員や社員利用者の権限は、公式資料で確認できる範囲に限る。

### Open Questions

- 法人、法人代表者、家族・追加カード利用者、社員利用者のうち誰がMember Role、Contract Party、Cardholder/Userを担うか。
- Reward、Benefit、Insurance、Economic Flowごとに、どのActorへBeneficiary Roleを割り当てるか。

## Concept: External Membership

### Definition

External Membershipは、カード契約外の団体所属、ホテル会員、航空マイレージ会員等の資格・会員関係である。これを保持・利用するAccountとは分ける。

### Responsibility

Eligibility、Application Route、Benefit eligibility、Reward destination、Asset holdingのいずれか、または複数に作用する。

### Identity

外部運営主体、会員番号やアカウント、本人との紐づき、Evidenceで同一性を判断する。カードMemberとの同一人物性はEvidenceで確認する。

### Lifecycle

外部会員登録、資格喪失、アカウント停止、連携解除、Benefit対象期間の終了がありうる。

### Relationships

External MembershipはMember、Account、Actor Role、Offering、Eligibility Rule、Reward Destination、Asset Conversion、Economic Flowと関係する。

### Invariants

- 外部サービス資格が必要なBenefitを、カード保有だけで成立扱いしない。
- 申込資格としての外部会員と、特典受領先としての外部アカウントを無条件に同一視しない。
- 同じ外部アカウントが複数Ruleから参照される場合、その同一性をEvidenceで扱う。

### Boundaries

External Membershipは単なる属性ではない。EligibilityだけでなくReward destinationやEconomic Flowの当事者になりうる。

### Examples

- bitFlyer クレカはbitFlyerアカウント開設が前提で、BTC付与先もbitFlyerアカウントである。
- Marriott Bonvoy、Hilton Honorsのホテル会員資格はカード特典と結びつく。
- 全弁協の組合員資格は専門職団体カードの申込条件である。

### Counterexamples

bitFlyerの外部アカウントをEligibility RuleとCrypto Conversionの別々の条件として扱うだけでは、両者が同じアカウントを指す整合性を説明しにくい。

### Temporal Behavior

外部会員資格の有効期間とカード会員資格の有効期間は一致しない場合がある。Benefit判定時点と申込時点を分ける。

### Evidence Requirements

外部会員規約、カード商品説明、連携条件、特典付与条件、資産受領先の説明が必要である。

### Open Questions

- ホテル会員資格とカード会員資格の契約上の分離度は今回Researchでは不足している。
- External MembershipをEligibility、Application Route、Reward Destinationで共有参照する最小概念が必要か。

## Concept: Contract

### Definition

Contractは、特定のProductまたはServiceについて、1以上のContract Party Role assignmentを伴う権利義務関係である。当事者の全体が開示されない場合は、不足部分をUnknownとして保持する。

### Responsibility

Contract Party、Member Contract Party、対象Product/Offering、適用規約、Account、Credit Facility、Billing Cycle、期間を結び、利用者・媒体・発行関係と契約関係を分ける。

### Identity

契約当事者Role assignment、対象Product/Offering、適用規約、成立・終了期間、Evidenceで判断する。申込、Account、Issuance、InstrumentまたはProduct名だけでは同一性を決めない。

### Lifecycle

申込・Screeningとは分離し、成立、変更、更新、停止、解約、終了がありうる。申込または承認だけで成立を推論しない。

### Relationships

Actor Role、Product、Offering、Account、Member Role、Issuance、Credit Facility、Billing Cycle、Rule、Evidenceと関係する。

### Invariants

- ContractをApplication、Screening、Member、Account、Issuanceと同一視しない。
- Contract Party、User、Beneficiary、Billing Entityが同じActorであると仮定しない。
- 1 Product、1 Contract、1 Account、1 Issuanceが常に一対一になると仮定しない。

### Boundaries

Contractは実装上の契約テーブルや電子契約文書を意味しない。約款はEvidenceおよび契約条件であり、Contractそのものと同一視しない。

### Examples

法人カードでは法人がContract Party、従業員がUserとなりうる。家族カードでは本会員側の契約関係と家族利用者へのIssuanceが分かれうる。

### Counterexamples

カードを利用するActorを必ずContract Partyとすると、法人・家族・社員利用者の責務を表現できない。

### Temporal Behavior

Contractの成立・終了と、Offering受付、Issuance有効性、Feature・Ruleの有効期間は独立しうる。

### Evidence Requirements

会員規約、申込同意、追加カード規約、法人規約、変更・解約告知が必要である。

### Open Questions

- Contractを独立Conceptとして保持する最小条件と、会員関係との境界。

## Concept: Account

### Definition

Accountは、カードまたは外部ServiceがActorとの関係、利用資格、設定、残高・明細等を管理するサービス上の単位である。

### Responsibility

Card/Contract Account、External Service Account、Reward/Asset Account等を区別し、External Membership、Contract、Issuance、Asset holdingとの関係を説明する。

### Identity

運営Actor Role、Account type、対象Actor、関連Contract/Membership、期間、Evidenceで判断する。ログインIDや会員番号だけではDomain identityを決めない。

### Lifecycle

開設、連携、停止、復旧、統合、解除、閉鎖がありうる。

### Relationships

Actor、Contract、External Membership、Member Role、Issuance、Reward/Asset、Evidenceと関係する。

### Invariants

- AccountをActor、Contract、Membership、Issuance、資産残高と同一視しない。
- Card AccountとExternal Service Accountの本人同一性をEvidenceなしに推論しない。

### Boundaries

Accountは実装上のユーザーテーブル、ログインCredentialまたは金融口座を意味しない。

### Examples

bitFlyerアカウントは申込前提とReward/Asset受領先に作用する。カードサービスAccountは契約・Issuance・利用明細と関係しうる。

### Counterexamples

External MembershipとAccountを同一視すると、団体所属とログイン可能なサービス単位の差を失う。

### Temporal Behavior

Accountの停止・連携解除と、Contract、External Membership、保有Assetの終了は自動連動しない。

### Evidence Requirements

公式アカウント案内、会員規約、連携条件、停止・閉鎖案内が必要である。

### Open Questions

- Card/Contract AccountとExternal/Reward/Asset Accountの最小共通項。

## Concept: Issuance

### Definition

Issuanceは、契約またはAccountのもとで、特定ActorにPayment Instrumentまたはその利用権限を割り当てる関係である。

### Responsibility

Issuanceは、誰に、どの契約・Accountとの関係で、どのInstrumentまたは利用権限が、いつ割り当てられているかを表す。本カード、家族カード、社員追加カード、関連するETC Instrument、物理・Virtual媒体を区別するが、媒体差だけで別Issuanceと断定しない。

### Identity

同一性は割当先Actor、契約またはAccountとの関係、Payment Instrument、発行単位、期間、Evidenceで判断する。カード番号、券面素材、媒体は同一性の証拠になりうるが、単独で決定しない。

### Lifecycle

割当生成、Instrumentの発行・利用可能化、再発行・差替え、利用停止、機能限定、割当終了がありうる。Application、Screening、Contract formationは前段の別Lifecycleである。

### Relationships

IssuanceはActor Role、Contract、Account、Product、Variant、Payment Instrument、Instrument Medium、Credit Facility、Lifecycle Eventと関係する。Application Routeとは、どの申込・取得過程から生じたかを追跡する起源関係に限る。

### Invariants

- ProductとIssuanceを同一視しない。
- 複数カード発行を1つのProduct保有として潰さない。
- Issuanceの終了とProductの終了を同一視しない。
- 1契約、1Account、1Issuance、1Instrument、1媒体、1Identifierが常に一対一になると仮定しない。
- 利用可能枠をIssuanceの固有属性とせず、Credit FacilityおよびCredit Limit Ruleとの関係で扱う。

### Boundaries

IssuanceはProduct、契約、Account、Payment Instrument、媒体、Identifierまたは信用供与そのものではない。カード番号等の機密情報をどう保持するかは本仕様では決めない。

### Examples

- Kyash Card Virtualは物理カードではないPayment Instrumentの利用可能化を示す。
- 法人カードやパーチェシングサービスでは、法人契約と利用者単位の支払権限が分かれる可能性がある。
- Amex Platinumのメタル製基本カードとプラスチック製セカンドカードは、異なるIdentifier・機能を持つ複数Instrumentである可能性を示し、単なる1 Instrumentの複数媒体とは確定しない。
- ETCカードは本カードに関連しながら、別Instrument、Fee Rule、Lifecycleを持ちうる。

### Counterexamples

セゾンゲーミングカードDigitalの「クレジット機能のみ」期間は、IssuanceがProduct Featureの一部だけを利用可能にする状態を示す。

### Temporal Behavior

IssuanceはProduct受付停止後も存続しうる。既存会員のみ継続、機能限定、提携終了後の扱いはEvidenceが必要である。

### Evidence Requirements

発行条件、カード種別、追加カード規約、停止・解約通知、FAQが必要である。

### Open Questions

- 社員追加カードと家族カードを同じAttached Card Conceptで扱えるか。
- カードレスのパーチェシングサービスをIssuanceに含めるか。
- Contract、Account、Issuance、Payment Instrument、Instrument Medium、Identifierの最終的な同一性境界。
- ブランドまたはデザイン変更時に既存Issuanceの更新と再発行のどちらとして扱うか。
- Instrument HolderとAuthorized Userを分ける必要があるか。

## Concept: Application Route

### Definition

Application Routeは、申込または取得に至る経路である。

### Responsibility

Application Routeは、一般申込、招待、切替、追加発行、外部団体限定申込などを区別する。

### Identity

同一性はOffering、対象Member Cohort、入口、条件、期間、Evidenceで判断する。独立Identityが必要かは未確定で、Value/Relationshipとして扱える可能性がある。

### Lifecycle

公開、非公開化、受付停止、対象変更がありうる。

### Relationships

Application RouteはOffering、Eligibility Rule、External Membership、Member Cohort、Product Lifecycle Eventと関係する。

### Invariants

- Application RouteとEligibilityを同一視しない。
- 招待制と一般申込可能性を排他的に扱わない。
- 外部団体所属による専用ルートを一般公開や招待の二値に潰さない。

### Boundaries

Application RouteはProductでもMemberでもない。申込可否そのものはEligibility Ruleと分ける。

### Examples

- アメックス・ゴールド・プリファードは直接Web申込と既存会員切替が並存する。
- イオンゴールドカードは利用実績と審査に基づく招待による取得例である。
- 全弁協カードは組合員向けの専用申込経路を持つ。

### Counterexamples

「招待を受けた人がいる」だけでProductを招待制と定義すると、アメックス・ゴールド・プリファードの一般申込を説明できない。

### Temporal Behavior

Application Routeは期間限定で開閉する。現在の受付状態と、将来の受付予定は分ける。

### Evidence Requirements

公式申込ページ、FAQ、招待条件ページ、提携団体案内、申込停止告知が必要である。

### Open Questions

- Application Route typeの標準分類。
- 非公開招待ロジックをundisclosedとしてどこまで表現するか。

## Acquisition Decision Sequence

Eligibility、Invitation、Application、Screening、Issuanceは責務を分離する。Eligibility Ruleは公開された必要条件、Invitationは特定Application Routeを提示した事実、Applicationは申込提出、ScreeningはReviewed Partyに対する非決定的な判断過程、Issuanceは承認または契約成立後に開始しうる割当である。

招待条件、審査条件、発行条件を一つのEligibility Ruleへ統合しない。招待を受けても審査や発行が保証されない場合があり、一般申込Routeと招待Routeが同時に存在しうる。非公開審査ロジックは`undisclosed`とし、推測しない。
