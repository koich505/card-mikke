# Products

## Concept: Product

### Definition

Productは、市場に提供され、名称、規約、発行主体または提供主体、申込・利用条件、Feature、Lifecycleを持つ商品またはサービスのまとまりである。

### Responsibility

Productは、市場で識別される商品単位を表し、Offering、Variant、Feature、Rule、Lifecycle Eventを束ねる。

### Identity

同一Productかどうかは、名称だけでなく、契約の連続性、発行主体、規約、会員移行、資産移行、申込条件、Feature構成、Evidenceを総合して判断する。

### Lifecycle

募集開始、新規申込停止、改定、Feature停止、商品終了、既存会員のみ継続、強制または自動解約がありうる。

### Relationships

ProductはOffering、Variant、Feature、Issuer Role、Partnership、Payment Instrument、Payment Scheme、Rule、Evidenceと関係する。

### Invariants

- Product名の類似や後継表現だけで契約連続性を推論しない。
- Variant差やOffering差をProduct共通値として潰さない。
- Product終了とFeature終了を同一視しない。

### Boundaries

Productは申込経路そのものではない。国際ブランド、券面、デザイン、会員コホート、支払方式はProductの一部となる場合もあるが、常にProduct同一性を決めるわけではない。

### Examples

- 三井住友カードは一般的なCoreカードの例として扱える。
- bitFlyer クレカは暗号資産連携クレジットカードのProductである。
- Kyash Cardはプリペイド型Payment Instrumentを持つAdjacent Productである。
- ライフカード デポジット型は保証金を伴うCoreクレジットカードProductである。

### Counterexamples

セゾンゲーミングカードとセゾンゲーミングカードDigitalは名称上の後継関係があるが、自動切替ではなく新規契約で、ゲーミングコインも自動移行されない。このため「後継商品なら同一Product系列で契約・資産が連続する」とは言えない。

### Temporal Behavior

ProductはFeatureごとに異なる時間軸を持つ。セゾンゲーミングカードDigitalでは、新規入会停止、特典終了、クレジット機能のみ利用可能期間、自動解約が段階的に発生している。

### Evidence Requirements

商品公式ページ、規約、サービス終了案内、FAQ、提携特約、Issuer資料が必要である。終了日、受付停止日、Feature停止日は別FactとしてEvidenceを持つ。

### Open Questions

- Product Familyという上位概念が必要か。
- グレード差を別ProductにするかVariantにするかの判断基準。
- セゾンゲーミングカードDigital型の名称的後継関係を独立Conceptにするには追加事例が必要。

## Concept: Offering

### Definition

Offeringは、Productが特定の対象者、申込経路、期間、条件で提供される形態である。

### Responsibility

Offeringは、一般申込、招待、外部団体限定、既存会員切替、期間限定受付などを表現する。

### Identity

同一性はProduct、申込対象、申込経路、期間、Eligibility、Evidenceで判断する。IdentityはProductより細かい。

### Lifecycle

開始、受付停止、条件変更、対象コホート変更がありうる。

### Relationships

OfferingはProduct、Eligibility Rule、Application Route、External Membership、Member Cohort、Evidenceと関係する。

### Invariants

- 招待を受けた人がいることと、Product自体が招待制であることを混同しない。
- Application RouteとEligibilityを同一視しない。
- 外部団体限定Offeringを一般公開または純粋招待制の二値に押し込まない。

### Boundaries

OfferingはVariantではない。国際ブランド差やデザイン差ではなく、「誰に、どう提供されるか」を扱う。

### Examples

- アメックス・ゴールド・プリファードは一般ユーザーが直接Web申込可能で、既存ゴールド会員には切替ルートも並存する。
- イオンゴールドカードは利用実績と審査に基づく招待制ランクアップカードである。
- 全弁協カードは弁護士協同組合員向けの外部団体限定Offeringを持つ。

### Counterexamples

アメックス・ゴールド・プリファードを「招待制上位カード」とだけ扱うと、直接申込可能なOfferingと既存会員切替Offeringの並存を表現できない。

### Temporal Behavior

OfferingはProductより先に停止することがある。セゾンゲーミングカードDigitalではProduct終了前に新規入会が停止された。

### Evidence Requirements

公式申込ページ、FAQ、招待条件ページ、提携団体専用ページ、終了告知が必要である。非公開条件はundisclosedとして扱う。

### Open Questions

- Offering typeを固定分類にするか、Evidence由来の記述として保持するか。
- 旧会員と新会員で規約差がある場合、Offering差かRule差か。

## Concept: Variant

### Definition

Variantは、同一Product内で選択または区別される仕様差の候補である。

### Responsibility

Variantは、国際ブランド、券面、カード形態、グレード、条件差などをProduct共通情報から分離する。

### Identity

同一性はProduct、差異軸、差異値、適用期間、Evidenceで判断する。VariantはIdentityを持つ候補だが、すべての差異をVariantと確定しない。

### Lifecycle

Variantの追加、受付停止、条件変更、終了がありうる。

### Relationships

VariantはProduct、Offering、Payment Instrument、Rule、Issuer Role、International Brand Roleと関係する。

### Invariants

- 国際ブランド差を常に単なる属性として潰さない。
- あるVariantにだけ適用されるRuleをProduct共通Ruleにしない。
- デュアル発行では、複数VariantのIssuance関係を表現できる必要がある。

### Boundaries

VariantはOfferingではない。申込経路差や会員コホート差はOfferingまたはRuleで扱う可能性がある。

### Examples

- 三井住友カードではVisa/Mastercardのデュアル発行が確認されている。
- UCSカードmajicaはVisa/Mastercard/JCBブランド付きであり、ブランドなしハウスカードの例ではない。
- bitFlyer クレカにはスタンダードとプラチナがある。

### Counterexamples

UCSカードmajicaを「ハウスカード的」と扱うと、国際ブランド有無と法的与信分類の軸が混同される。

### Temporal Behavior

Variantごとに受付可否、年会費、特典、ブランド提供状況が変わりうる。調査時点の観測と有効期間を分ける。

### Evidence Requirements

公式カード一覧、申込FAQ、商品説明、ブランド表示、規約が必要である。Tier4記事だけのVariant条件はprovisionalに留める。

### Open Questions

- グレード差をVariantにするか別Productにするか。
- デザイン差が契約やRuleに影響しない場合、Domain Conceptとして保持する必要があるか。

## Concept: Product Feature

### Definition

Product Featureは、Productに含まれる機能、特典、受付、ポイント付与、クレジット機能などの部分的な能力である。

### Responsibility

FeatureはProduct全体のLifecycleと分離して、個別の開始、改定、停止、終了を表現する。

### Identity

同一性はProduct、Feature type、対象コホート、期間、Evidenceで判断する。

### Lifecycle

FeatureはProductより早く開始または終了しうる。Featureだけが段階的に停止する場合がある。

### Relationships

FeatureはProduct、Rule、Lifecycle Event、Member Cohort、Reward、Evidenceと関係する。

### Invariants

- Feature終了をProduct終了として扱わない。
- Productが継続中でも、特典や新規受付が終了している場合がある。

### Boundaries

FeatureはProductの同一性そのものではない。ただし中核Featureの消滅によりProduct終了と評価される可能性はある。

### Examples

セゾンゲーミングカードDigitalでは、ゲーム関連特典、ポイント付与、クレジット機能、新規受付が別々のLifecycleを持つ。

### Counterexamples

「サービス終了日」だけをProductに置くと、2025年2月から3月の「クレジット機能のみ」期間を説明できない。

### Temporal Behavior

feature_available_from、feature_available_toに相当する日時概念を、Productのapplication_available_toやservice_ended_atから分ける。

### Evidence Requirements

Feature単位の告知、スケジュール表、FAQ、規約改定通知が必要である。

### Open Questions

- Feature粒度をどこまで細分化するか。
- Feature終了が既存会員の契約状態にどう作用するか。
