# Payment And Credit

## Concept: Payment Instrument

### Definition

Payment Instrumentは、決済時に提示または利用される支払手段である。クレジットカード、プリペイドカード、デビット、バーチャルカード、カードレス購買決済などが候補となる。

### Responsibility

Payment Instrumentは、利用場面、ブランド、発行形態、利用可能範囲、Issuanceとの関係を説明する。

### Identity

同一性はProduct、Variant、発行形態、国際ブランド、利用範囲、Evidenceで判断する。

### Lifecycle

発行、利用開始、利用停止、再発行、機能限定、終了がありうる。

### Relationships

Payment InstrumentはProduct、Variant、Issuance、Brand / Network Identifier、Payment Network / Scheme候補、Payment Scheme、Funding Method、Credit Providerと関係する。

### Invariants

- Payment InstrumentとFunding Methodを同一視しない。
- Payment InstrumentとPayment Schemeを同じ軸で分類しない。
- 国際ブランドの有無から法的分類を推論しない。

### Boundaries

Payment Instrumentは支払回数や後払い方式そのものではない。KyashのようにInstrumentはプリペイドで、Fundingだけが後払い型の場合がある。

### Examples

- 三井住友カードはクレジットカードPayment Instrumentである。
- Kyash Card/Card VirtualはVisaプリペイド型Payment Instrumentである。
- bitFlyer VISAプリペイドカードはプリペイドPayment Instrumentであり、bitFlyer クレカとは別Productである。
- 三菱UFJカード パーチェシングやJCBパーチェシングサービスはカードレスまたは非発行型の法人購買決済を含む。

### Counterexamples

Kyashを「後払いカード」と扱うと、VisaプリペイドInstrumentと後払い型入金手段の分離を失う。

### Temporal Behavior

Instrumentの利用可否はProductやFeatureの状態と連動するが、完全一致しない。Feature限定期間ではInstrumentの一部機能だけ利用可能になる。

### Evidence Requirements

商品公式ページ、カード種別説明、ブランド表示、規約、サポートFAQが必要である。

### Open Questions

- カードレス購買決済をPayment Instrumentに含めるか、Payment Serviceとして別Conceptにするか。

## Concept: Payment Scheme

### Definition

Payment Schemeは、一括払い、翌月払い、3・6・12回あと払い、分割、リボ、ボーナス払い等、支払の組み方を表す候補Conceptである。

### Responsibility

Payment Schemeは、Payment InstrumentやProductと独立して、支払回数、支払時期、手数料条件、変更可否、加盟店対応、Legal Classificationの対象候補を表す。

### Identity

同一性は支払方式、対象Product/Service、Billing Entity、Merchantまたはmerchant category、Brand/Network Identifier、利用条件、期間、Evidenceで判断する。現時点では名称・粒度ともSupported but provisionalである。

### Lifecycle

Schemeの開始、変更、停止、対象加盟店変更、手数料条件変更がありうる。

### Relationships

Payment SchemeはPayment Instrument、Funding Method、Credit Provider、Billing Entity、Merchant/merchant category、Brand/Network Identifier、Transaction Legal Classification、Rule、Evidenceと関係する。

### Invariants

- Product単位のPayment Modelで全支払方式を代表しない。
- Actorの登録区分からPayment Schemeの法的分類を自動導出しない。
- Payment Schemeごとに手数料、選択可否、変更可否を保持できる必要がある。
- Merchant、Brand、Billing Entityの組合せによるScheme可否をProduct固定属性へ潰さない。ただし具体的な動的切替は一次Evidenceで確認する。

### Boundaries

Payment SchemeはLegal Classificationそのものではない。Legal Classificationは別のEvidence付きFactとして扱う。

### Examples

- Paidyには一括あと払いと3・6・12回あと払いがある。分割あと払いは購入時または購入後に選択・変更可能で、加盟店により対応回数が異なる。
- クレジットカードには一括、分割、リボ等の支払方式が存在する。

### Counterexamples

Paidyを「包括信用購入あっせん登録事業者だから全Payment Schemeが同一法的分類」と扱うと、Actor-level registrationとTransaction-level classificationを混同する。

### Temporal Behavior

Payment Schemeの条件はRuleとして有効期間を持つ。将来適用Ruleを現在Ruleとして扱わない。

### Evidence Requirements

公式支払方式説明、FAQ、規約、手数料説明、行政資料が必要である。法的分類は明記がない場合Unknownを保持する。

### Open Questions

- Payment Schemeの最小粒度。
- 一括、分割、リボ、BNPL、デポジットをどの分類軸で並べるか。
- 名称をPayment Schemeとするか、別名にするか。
- Merchant/category、Brand/Network、Billing EntityがScheme可否へ作用する共通範囲。

## Concept: Funding Method

### Definition

Funding Methodは、Payment Instrumentや残高に資金を供給する方法である。

### Responsibility

Funding Methodは、前払い入金、銀行口座からの入金、後払いチャージ、クレジット供与等を、InstrumentやSchemeから分離する。信用リスクを補完する保証金は含めない。

### Identity

同一性は資金供給元、提供Actor、対象InstrumentまたはAccount、期間、Evidenceで判断する。

### Lifecycle

提供開始、条件変更、停止、精算期限変更がありうる。

### Relationships

Funding MethodはPayment Instrument、Account、Credit Provider、Billing Entity、Payment Scheme、Ruleと関係する。

### Invariants

- 後払い型Funding Methodがあることから、Instrument自体を後払いカードと呼ばない。
- Funding ProviderとInstrument発行者を同一視しない。

### Boundaries

Funding MethodはPayment Schemeとも異なる。残高へ後払い入金することと、加盟店取引の支払回数は別問題である。
また、Depositは支払や残高への資金供給ではなく、信用リスク軽減または発行条件として預け入れる担保的な保証金であり、Funding Methodから分離する。

### Examples

Kyash「イマすぐ入金」は、AGペイメントサービスが提供する後払い型Funding Methodであり、Kyash Card自体はVisaプリペイド型Payment Instrumentである。

### Counterexamples

Kyashを単一Productの属性だけで「プリペイド兼後払い」と記述すると、契約主体と責務が曖昧になる。

### Temporal Behavior

Funding Methodの利用可能期間、精算期限、手数料条件はPayment Instrumentの有効期間と一致しない可能性がある。

### Evidence Requirements

公式サポート、プレスリリース、利用規約、提供会社情報が必要である。提供元の登録状況は別途Regulatory Registrationとして確認する。

### Open Questions

- AGペイメントサービスの登録状況はUnknown。
- 後払いFundingをCredit ProviderのRoleで十分表現できるか。

## Concept: Legal Classification

### Definition

Legal Classificationは、Product、Payment Scheme、Transaction等が法令上どの性質を持つかを示すEvidence付きFactである。

### Responsibility

Legal Classificationは、法的分類を推測ではなく根拠付きで保持し、Unknownを許容する。

### Identity

同一性は対象、法的分類種別、適用条件、期間、Sourceで判断する。

### Lifecycle

法改正、規約変更、支払方式変更により変わりうる。事業者登録変更はLegal Classificationの変更を自動的に意味せず、再評価の契機として扱う。

### Relationships

Legal ClassificationはRegulatory Registration、Payment Scheme、Product、Transaction、Evidenceと関係する。

### Invariants

- Actor-level Regulatory RegistrationとTransaction-level Legal Classificationを分離する。
- Unknownを推測値で補完しない。
- 国際ブランド有無、BNPLというマーケティング名、プリペイド表示から法的分類を自動導出しない。

### Boundaries

Legal ClassificationはPayment InstrumentやPayment Schemeそのものではない。

### Examples

- PaidyはActor-levelでは包括信用購入あっせん業者登録が確認されている。
- Kyash「イマすぐ入金」の法的分類はResearch上Unknownである。
- atoneの登録区分はUnknownである。

### Counterexamples

v1ではPaidyを二月払購入あっせん相当と推定していたが、v2で登録包括信用購入あっせん業者であることが訂正された。

### Temporal Behavior

登録日、行政処分日、観測日、支払方式の適用日を分ける。

### Evidence Requirements

Tier1行政資料、公式規約、法令上の明記を優先する。確認不能な場合はUnknownのまま保持する。

### Open Questions

- 支払スキーム単位で法的分類を登録するためのEvidence基準。
- 少額包括、二月払、個別信用購入あっせんの境界調査。

## Concept: Deposit

### Definition

Depositは、利用限度額や信用補完のために事前に預け入れられる保証金である。

### Responsibility

Depositは、保証金額、限度額との関係、納付方法、返還条件、対象Productを説明する。

### Identity

同一性はMember、Product、保証金条件、期間、Evidenceで判断する。Value/Ruleとして扱える可能性が高く、独立Entity化は未決定である。

### Lifecycle

納付、増減、解約後返還、失効がありうる。

### Relationships

DepositはEligibility、Credit Limit、Issuance、Fee、Product、Evidenceと関係する。

### Invariants

- デポジット型であってもクレジットカードProductである可能性を排除しない。
- 保証金とプリペイド残高を同一視しない。

### Boundaries

DepositはFunding Methodではない。利用前に消費される残高ではなく、保証金として扱われる。

### Examples

ライフカードは個人向け、ゴールド、法人向けのデポジット型カードを公式に提供し、保証金が利用限度額と結びつく。

### Counterexamples

v1の「デポジット型カードは未確認」という扱いはv2で訂正された。

### Temporal Behavior

解約後返還時期など、Product終了やMember解約後の時間差を扱う。

### Evidence Requirements

公式商品説明、FAQ、保証金納付・返還条件の記載が必要である。

### Open Questions

- DepositをRule、Value、またはFinancial Obligationのどれとして扱うか。

## Concept: Credit Facility

### Definition

Credit Facilityは、Credit ProviderがContract Party等に供与する契約上の信用関係である。

### Responsibility

契約上の信用供与、Facilityに適用される総枠、複数Instrumentとの関係を説明する。媒体・利用者・用途ごとの運用上の制約はSpending Control Ruleへ分ける。

### Identity

Credit Provider、Contract Party、対象契約、通貨、期間、Evidenceで判断する。Product名、Instrumentまたは画面上の利用可能額だけでは同一性を決めない。

### Lifecycle

設定、増減、一時増枠、利用による消費、取消・返金・支払による回復、停止、終了がありうる。

### Relationships

Contract、Contract Party、Credit Provider、Issuance、Payment Instrument、Credit Limit Rule、Spending Control Rule、Transaction Lifecycle、Billing Cycle、Depositと関係する。

### Invariants

- Credit FacilityとPayment Instrumentを同一視しない。
- 複数Issuanceが常に別枠を持つとも、常に一つの枠を共有するとも仮定しない。
- Facility総枠・利用可能額と、利用者・媒体・用途別のSpending Controlを区別する。
- 表示された「限度額」が信用供与、取引上限、月次統制枠のどれかをEvidenceなしに決めない。

### Boundaries

Credit FacilityはProductの固定属性ではなく、Payment Scheme、請求、法的分類またはDepositでもない。与信審査ロジックは`undisclosed`としてよく、推測しない。

### Examples

- 家族カードの利用が本会員の利用可能枠へ影響する場合、Issuanceは別でもCredit Facilityを共有しうる。
- 法人カードではFacility総枠と社員カード別のSpending Controlが併存しうる。
- デポジット型カードではDepositと利用限度額が対応しても、Deposit自体をCredit FacilityまたはFunding Methodにしない。

### Counterexamples

カード枚数ごとに独立した利用枠があると固定すると、家族カードや複数媒体の共有枠を説明できない。

### Temporal Behavior

利用、取消、売上確定、返金、請求、支払の各時点で利用可能額への影響が異なりうる。回復時点はEvidenceなしに支払日と同一視しない。

### Evidence Requirements

会員規約、利用可能枠説明、法人管理機能、追加カード規約、請求・返金FAQが必要である。

### Open Questions

- Contract、Account、Credit Facilityの最終的な境界。
- 法定の信用供与枠と運用上の統制上限をどの粒度で区別するか。

## Concept: Billing Cycle

### Definition

Billing Cycleは、反復する請求スケジュールにおける対象期間と個別のcycle occurrenceである。

### Responsibility

対象Transactionをまとめる期間、締め、個別回の請求確定・支払期限を説明する。締日選択・変更、休日調整、再引落し、支払方法は関連Ruleとして分ける。

### Identity

Billing Entity、Contract、schedule、対象期間、cycle occurrence、対象Transaction集合、Evidenceで判断する。

### Lifecycle

Cycleの開始、締め、請求確定、支払期日、入金、再請求または延滞対応がありうる。

### Relationships

Billing Entity、Contract Party、Transaction Lifecycle、Payment Scheme、Funding Method、Fee Rule、Credit Facilityと関係する。

### Invariants

- Billing CycleをProduct全体の不変な固定値として扱わない。
- 締日、請求確定日、支払日、利用可能枠回復日を同一視しない。
- CampaignやRewardの集計期間をBilling Cycleから自動導出しない。

### Boundaries

Billing Cycleは個別Transaction、Payment Scheme、締め・支払日変更RuleまたはCampaign periodではない。再引落しや延滞の法的扱いは確認済みEvidenceに限る。

### Examples

- カード利用を所定の締日でまとめ、後日の支払日に口座から支払う関係。
- Payment Schemeや支払設定により、同じ利用期間でも請求回数・支払期日が異なりうる。

### Counterexamples

「毎月払い」という表示だけで締日、請求確定日、引落日、枠回復日を同一の日付として扱うと破綻する。

### Temporal Behavior

Cycle開始、締め、請求確定、支払期日、入金確認、再請求を分ける。休日や変更手続による日付差はEvidenceに従う。

### Evidence Requirements

会員規約、請求スケジュール、支払方法FAQ、変更・再請求案内が必要である。

### Open Questions

- 支払日変更、金融機関休日、再引落しの共通モデル化。
- schedule、cycle occurrence、締日・支払日変更Ruleを独立Conceptにする最小条件。
- 取引・加盟店種別によりBilling Entityが変わる事例の責任境界。

## Concept: Transaction Lifecycle

### Definition

Transaction Lifecycleは、個別利用がAuthorizationから売上確定、請求、支払、取消、返金等へ遷移する過程である。

### Responsibility

利用日、売上確定、請求対象化、支払、取消・返金、Credit Facilityへの影響を、Product Lifecycleから独立して説明する。

### Identity

対象利用、Payment Instrument、利用先、金額・通貨、発生時点、状態遷移Evidenceで判断する。Authorization識別子等の実装識別子は本仕様で決めない。

### Lifecycle

Authorization、売上確定、請求対象化、支払、取消、返品、返金等がありうる。Authorizationには期限切れがありうるが、公開Evidenceなしに共通状態として固定しない。全Transactionが同じ経路を通るとは仮定しない。

### Relationships

Payment Instrument、Payment Scheme、Billing Cycle、Credit Facility、Billing Entity、Fee Rule、Reward Rule、Campaign、Evidenceと関係する。

### Invariants

- Authorizationを売上確定または請求確定と同一視しない。
- 取消、返品、返金、支払を同じ状態遷移に潰さない。
- 購入時に選択されたPayment Schemeと、購入後の支払方法変更Ruleを分ける。
- Default、opt-in、merchant例外をPayment Schemeの名称だけから推論しない。

### Boundaries

Transaction Lifecycleは実装上の決済処理状態一覧ではない。公開Evidenceで説明できる利用・請求・支払上の状態だけを扱い、内部Processor状態はScope外とする。

### Examples

- 利用承認後に加盟店売上が確定し、締めを経て請求対象となる。
- 取消・返品・返金により請求や利用可能額への影響時点が異なりうる。

### Counterexamples

利用通知を請求確定と扱うと、未確定売上、取消、金額変更、返金を説明できない。

### Temporal Behavior

利用日、売上確定日、締日、請求確定日、支払日、取消日、返金日、枠回復日は別のTemporal Factになりうる。

### Evidence Requirements

規約、利用明細・請求FAQ、取消・返金案内、支払方法変更案内が必要である。

### Open Questions

- 国内カード横断で共通化できる最小状態語彙。
- 海外利用、為替確定、加盟店からの売上到着差を現Scopeに含める粒度。
