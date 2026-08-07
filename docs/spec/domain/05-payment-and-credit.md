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

Payment InstrumentはProduct、Variant、Issuance、International Brand Role、Payment Scheme、Funding Method、Credit Providerと関係する。

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

同一性は支払方式、対象Productまたはサービス、利用条件、期間、Evidenceで判断する。現時点では名称・粒度ともSupported but provisionalである。

### Lifecycle

Schemeの開始、変更、停止、対象加盟店変更、手数料条件変更がありうる。

### Relationships

Payment SchemeはPayment Instrument、Funding Method、Credit Provider、Billing Entity、Transaction Legal Classification、Rule、Evidenceと関係する。

### Invariants

- Product単位のPayment Modelで全支払方式を代表しない。
- Actorの登録区分からPayment Schemeの法的分類を自動導出しない。
- Payment Schemeごとに手数料、選択可否、変更可否を保持できる必要がある。

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

## Concept: Funding Method

### Definition

Funding Methodは、Payment Instrumentや残高に資金を供給する方法である。

### Responsibility

Funding Methodは、前払い、銀行口座、後払いチャージ、クレジット供与、保証金等を、InstrumentやSchemeから分離する。

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

法改正、規約変更、事業者登録変更、支払方式変更により変わりうる。

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
