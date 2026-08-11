# Products

## Concept: Product

### Definition

Productは、市場に提供され、名称、規約、Feature、Lifecycleを持つ商品またはサービスのまとまりである。発行・提供主体や申込条件はProduct同一性を判断するEvidence signalだが、単独の決定要素ではない。

### Responsibility

Productは、市場で識別される商品単位を表し、Offering、Variant、Feature、Rule、Lifecycle Eventを束ねる。

### Identity

同一Productかどうかは、契約・規約・権利義務・移行の連続性を主要な軸とし、名称、Issuer Role assignment、会員・資産移行、Feature構成、Evidenceを総合して判断する。Issuer差や申込条件差だけでProductを分割しない。

### Lifecycle

市場投入、Product自体の改定、商品終了がありうる。Offering/Routeの新規申込停止、Feature停止、既存会員Rule、Contract解約、Issuance終了は関連Conceptで非同期に発生しうる。

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

Productと関連Conceptは異なる時間軸を持つ。セゾンゲーミングカードDigitalでは、Offering/Routeの新規入会停止、Feature/Rewardの終了、Issuanceの機能限定、Contract/Issuanceの終了が段階的に発生している。

### Evidence Requirements

商品公式ページ、規約、サービス終了案内、FAQ、提携特約、Issuer資料が必要である。終了日、受付停止日、Feature停止日は別FactとしてEvidenceを持つ。

### Open Questions

- Product Familyという上位概念が必要か。
- グレード差を別ProductにするかVariantにするかの判断基準。
- セゾンゲーミングカードDigital型の名称的後継関係を独立Conceptにするには追加事例が必要。

## Concept: Offering

### Definition

Offeringは、Productが特定の市場・対象者へ、特定の期間と提供条件で提供される形態である。取得経路はApplication Routeとして分ける。

### Responsibility

Offeringは、外部団体限定、地域限定、既存会員向け、期間限定受付等の対象市場・提供条件を表現する。一般申込、招待、切替等はApplication Routeが表す。

### Identity

同一性はProduct、対象市場・対象者、提供条件、期間、Evidenceで判断する。Route差だけではOfferingを分けず、1つのOfferingに複数Application Routeが関係しうる。

### Lifecycle

開始、受付停止、条件変更、対象コホート変更がありうる。

### Relationships

OfferingはProduct、Eligibility Rule、Application Route、External Membership、Member Cohort、Evidenceと関係する。

### Invariants

- 招待を受けた人がいることと、Product自体が招待制であることを混同しない。
- Application RouteとEligibilityを同一視しない。
- OfferingとApplication Routeを同一視せず、Route固有のFee・EligibilityはRouteに適用されるRuleとして扱う。
- 外部団体限定Offeringを一般公開または純粋招待制の二値に押し込まない。

### Boundaries

OfferingはVariantではない。国際ブランド差やデザイン差ではなく、「誰に、どう提供されるか」を扱う。

### Examples

- アメックス・ゴールド・プリファードでは、対象Offeringへ直接Web申込Routeと既存会員切替Routeが並存する。
- イオンゴールドカードでは、既存会員向けOfferingに利用実績等を契機とする招待Routeがある。
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

Variantは、商品カタログ上で選択または区別される国際ブランド、design、grade等の構成差をProduct共通情報から分離する。

### Identity

同一性はProduct、差異軸、差異値、適用期間、Evidenceで判断する。VariantはIdentityを持つ候補だが、すべての差異をVariantと確定しない。

### Lifecycle

Variantの追加、受付停止、条件変更、終了がありうる。

### Relationships

VariantはProduct、Offering、Payment Instrument、Rule、Issuer Role、Brand / Network Identifierと関係する。Payment Network / Schemeや運営Actor Roleとの対応は暫定である。

### Invariants

- 国際ブランド差を常に単なる属性として潰さない。
- あるVariantにだけ適用されるRuleをProduct共通Ruleにしない。

### Boundaries

VariantはOfferingではない。申込経路差や会員コホート差はOfferingまたはRuleで扱う可能性がある。
Instrument Medium、Identifier、契約条件そのものはVariantではない。Variantごとの差はCompatibility、Feature、Fee等のRule assignmentで説明する。

### Examples

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

Product Featureは、Productに含まれる決済機能、特典、ポイント付与等の部分的な能力である。申込受付の可否はProduct Featureではなく、OfferingまたはApplication RouteのAvailabilityとして扱う。

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
- Productが継続中でも、特典等のFeatureが終了している場合がある。
- OfferingまたはApplication Routeの受付停止をFeature終了として重複記録しない。

### Boundaries

FeatureはProductの同一性そのものではない。ただし中核Featureの消滅によりProduct終了と評価される可能性はある。申込可能性はOfferingに、個別の申込入口の公開・停止はApplication Routeに置き、同一の受付停止Eventを両方に記述する場合は、Offering全体の提供可否とRoute別の利用可否という対象差を明示する。

### Examples

セゾンゲーミングカードDigitalでは、ゲーム関連特典、ポイント付与、クレジット機能が別々のFeature Lifecycleを持つ。新規受付停止はOffering availabilityのLifecycleである。

### Counterexamples

「サービス終了日」だけをProductに置くと、2025年2月から3月の「クレジット機能のみ」期間を説明できない。

### Temporal Behavior

feature_available_from、feature_available_toに相当する日時概念を、Productのapplication_available_toやservice_ended_atから分ける。

### Evidence Requirements

Feature単位の告知、スケジュール表、FAQ、規約改定通知が必要である。

### Open Questions

- Feature粒度をどこまで細分化するか。
- Feature終了が既存会員の契約状態にどう作用するか。

## Product Difference Axes Added By Research 04-13

Product、Offering、Variantの同一性判断では、申込対象・経路・期間、Issuer・共同発行・地域発行主体、国際ブランド、grade、design、物理素材、Virtual、ETC、Credit機能有無を一つの階層へ押し込まない。

- 申込対象・経路・期間はOfferingまたはApplication Route候補であり、RouteごとにFee、Eligibility、有効期間が異なりうる。
- 統一商品名だけで、地域・提携先ごとのIssuer、契約主体、Offeringを同一としない。
- 国際ブランド、grade、designはVariant候補だが、選択可否、Feature、Fee、再発行条件が異なる場合は境界を再評価する。
- gradeを単調な序数や上位互換と仮定せず、各FeatureとRuleを確認する。
- 物理素材、Virtual、ETCはInstrument Mediumまたは別Instrument候補であり、Product差、Issuance差、媒体差をEvidenceで分ける。
- 複数軸の全組合せが有効とは仮定せず、互換性・選択可能性をRuleで説明する。
- ブランド、design、grade変更が契約継続、再発行、新規申込のどれに当たるかは公式手続をEvidenceとする。
