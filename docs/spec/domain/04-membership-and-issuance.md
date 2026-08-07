# Membership And Issuance

## Concept: Member

### Definition

Memberは、カードまたは決済サービスの会員として契約、申込、利用、請求、特典の対象になるRoleである。

### Responsibility

Memberは申込資格、契約状態、Issuance、利用権限、Reward受領、コホート別Rule適用の対象となる。

### Identity

個人、法人、法人代表者、家族会員、社員利用者など、契約上の単位で同一性を判断する。本人確認、契約主体、利用者、受益者が一致するとは限らない。

### Lifecycle

申込、審査、入会、発行、利用中、停止、退会、解約、自動解約、既存会員のみ継続がありうる。

### Relationships

MemberはIssuance、Offering、Eligibility Rule、External Membership、Account、Reward、Payment Scheme、Evidenceと関係する。

### Invariants

- Memberを常に個人と固定しない。
- Member本人へのRewardと、外部団体へのEconomic Flowを混同しない。
- 本会員、家族会員、法人、社員利用者の責務差を潰さない。

### Boundaries

MemberはActorと同一とは限らない。外部団体所属者、ホテル会員、bitFlyerアカウント保有者はExternal MembershipまたはAccountであり、カードMemberとは別に扱う。

### Examples

- JCBゴールド ザ・プレミアでは本会員向け招待条件と家族会員年会費の扱いが区別される。
- bitFlyer クレカでは個人のみ対象で、bitFlyerアカウントが申込前提となる。
- 全弁協カードでは弁護士協同組合員資格が申込条件となる。

### Counterexamples

全弁協の手数料収入をMember Rewardに寄せると、Member本人ではなく所属協同組合が受益する構造を表現できない。

### Temporal Behavior

新規会員、既存会員、特定期間加入者、移行元会員などのMember CohortごとにRuleやFeatureの有効性が変わる。

### Evidence Requirements

規約、申込条件、FAQ、特約、会員種別説明が必要である。家族会員や社員利用者の権限は、公式資料で確認できる範囲に限る。

### Open Questions

- 法人代表者と社員カード利用者をMemberのSubtypeとするか、別Roleとするか。
- 外部団体が受益者になる場合、Memberとは別のBeneficiary Roleが必要か。

## Concept: External Membership And Account

### Definition

External Membership And Accountは、カード契約外の団体所属、ホテル会員、航空マイレージ会員、暗号資産サービスアカウントなどである。

### Responsibility

Eligibility、Application Route、Benefit eligibility、Reward destination、Asset holdingのいずれか、または複数に作用する。

### Identity

外部運営主体、会員番号やアカウント、本人との紐づき、Evidenceで同一性を判断する。カードMemberとの同一人物性はEvidenceで確認する。

### Lifecycle

外部会員登録、資格喪失、アカウント停止、連携解除、Benefit対象期間の終了がありうる。

### Relationships

External MembershipはMember、Actor Role、Offering、Eligibility Rule、Reward Destination、Asset Conversion、Economic Flowと関係する。

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

## Concept: Issuance

### Definition

Issuanceは、Memberまたは利用者に対して、Payment Instrumentが発行または利用可能化された状態である。

### Responsibility

Issuanceは、誰に、どのProductまたはVariantの支払手段が、どの期間、どの権限で利用可能かを表す。

### Identity

同一性はMember、Product/Variant、発行形態、本会員または追加利用者との関係、期間、Evidenceで判断する。

### Lifecycle

申込、審査、発行、再発行、利用停止、機能限定、解約、自動解約がありうる。

### Relationships

IssuanceはMember、Payment Instrument、Variant、Attached Card、Payment Scheme、Rule、Lifecycle Eventと関係する。

### Invariants

- ProductとIssuanceを同一視しない。
- 複数カード発行を1つのProduct保有として潰さない。
- Issuanceの終了とProductの終了を同一視しない。

### Boundaries

Issuanceは契約そのものの全体ではない。契約、カード券面、アプリ内バーチャルカード、カード番号、利用者権限はEvidenceで区別する。

### Examples

- 三井住友カードのVisa/Mastercardデュアル発行は、同一会員に複数ブランドのIssuanceが並ぶ例である。
- Kyash Card Virtualは物理カードではないPayment Instrumentの利用可能化を示す。
- 法人カードやパーチェシングサービスでは、法人契約と利用者単位の支払権限が分かれる可能性がある。

### Counterexamples

セゾンゲーミングカードDigitalの「クレジット機能のみ」期間は、IssuanceがProduct Featureの一部だけを利用可能にする状態を示す。

### Temporal Behavior

IssuanceはProduct受付停止後も存続しうる。既存会員のみ継続、機能限定、提携終了後の扱いはEvidenceが必要である。

### Evidence Requirements

発行条件、カード種別、追加カード規約、停止・解約通知、FAQが必要である。

### Open Questions

- 社員追加カードと家族カードを同じAttached Card Conceptで扱えるか。
- カードレスのパーチェシングサービスをIssuanceに含めるか。

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
- JCBゴールド ザ・プレミアやイオンゴールドカードは招待による取得が中心である。
- 全弁協カードは組合員向けの専用申込経路を持つ。

### Counterexamples

「招待を受けた人がいる」だけでProductを招待制と定義すると、アメックス・ゴールド・プリファードの一般申込を説明できない。

### Temporal Behavior

Application Routeは期間限定で開閉する。2026年のJCBゴールド ザ・プレミア招待終了、次回予定のように、予定と現在状態を分ける。

### Evidence Requirements

公式申込ページ、FAQ、招待条件ページ、提携団体案内、申込停止告知が必要である。

### Open Questions

- Application Route typeの標準分類。
- 非公開招待ロジックをundisclosedとしてどこまで表現するか。
