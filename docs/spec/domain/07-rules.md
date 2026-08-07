# Rules

## Concept: Rule

### Definition

Ruleは、対象、条件、算定、適用期間、Evidenceを持つドメイン上の判断単位である。

### Responsibility

Ruleは「いつ、誰に、何が、どの条件で適用されるか」を説明する。専用Ruleを大量に作る前に、共通Rule、Domain固有Rule、単なるValueのどれかを判断する。

### Identity

Ruleの同一性は対象、条件、効果、適用期間、対象コホート、Evidenceで判断する。Rule typeだけでは同一性を決めない。

### Lifecycle

Ruleは公開、適用開始、変更、終了、旧会員のみ継続、将来適用予定を持ちうる。

### Relationships

RuleはProduct、Offering、Variant、Feature、Member Cohort、Payment Scheme、Reward、Evidenceと関係する。

### Invariants

- 将来適用Ruleを現在Ruleとして返さない。
- 同じ対象、条件、期間で矛盾するRuleを無条件にCurrentとしない。
- Unknownを推測値で補完しない。
- Ruleの公開状態と有効状態を分ける。

### Boundaries

Ruleは実装上の条件分岐ではない。ドメインで説明可能な根拠と適用範囲を持つものだけをRuleとして扱う。

### Examples

- イオンゴールドカードの年間カードショッピング50万円（税込）以上、集計期間、審査あり。
- Paidyの3・6・12回あと払いの手数料条件と変更可否。
- ライフカード デポジット型の保証金と利用限度額の関係。

### Counterexamples

PaidyのActor登録区分をProduct単位のPaymentModel Ruleとして使うと、Schemeごとの法的分類を説明できない。

### Temporal Behavior

Ruleにはpublished_at、effective_from、effective_to、observed_at、retrieved_atに相当する時点がある。名称は暫定で、実装名ではない。

### Evidence Requirements

Ruleは公式規約、FAQ、告知、行政資料などで条件、効果、期間、対象が確認できる必要がある。

### Open Questions

- Rule typeをどこまで固定するか。
- 複数Ruleの競合解決をDomainで定義するかRequirementsへ委ねるか。

## Concept: Eligibility Rule

### Definition

Eligibility Ruleは、申込、入会、利用、Benefit受領、Payment Scheme利用などの資格条件を表すRuleである。

### Responsibility

対象者、外部資格、年齢、安定収入、法人属性、既存会員状態、招待条件などを表す。

### Identity

対象OfferingまたはFeature、条件、期間、対象コホート、Evidenceで判断する。

### Lifecycle

条件変更、公開、非公開化、対象範囲変更、旧会員のみ継続がありうる。

### Relationships

Offering、Application Route、External Membership、Member Cohort、Evidenceと関係する。

### Invariants

- EligibilityとApplication Routeを同一視しない。
- 外部団体所属を単なるフラグとして潰さない。
- 非公開条件はundisclosedとして扱う。

### Boundaries

Eligibility Ruleは審査結果ではない。審査ロジックが非公開の場合はundisclosedであり、Ruleとして推測しない。

### Examples

- 全弁協カードは全国の各弁護士協同組合の組合員であることが条件。
- bitFlyer クレカは個人対象で、bitFlyerアカウント開設が前提。
- アメックス・ゴールド・プリファードは一般申込可能で、20歳以上・安定収入が明記される。

### Counterexamples

外部団体所属者限定カードを一般公開または招待制だけで分類すると、専用申込経路と資格条件の関係が消える。

### Temporal Behavior

Eligibilityは申込時点、Benefit判定時点、更新時点で異なる可能性がある。

### Evidence Requirements

公式申込条件、団体公式案内、特約、FAQが必要である。

### Open Questions

- 法人代表者と社員利用者のEligibilityをどの粒度で扱うか。

## Concept: Fee Rule

### Definition

Fee Ruleは、年会費、発行手数料、分割手数料、コンビニ払い手数料、サービス年会費等の費用条件を表すRuleである。

### Responsibility

金額、免除条件、発生タイミング、対象Member、対象Variant、支払方法ごとの差を説明する。

### Identity

対象、金額または算定式、条件、期間、Evidenceで判断する。

### Lifecycle

新設、改定、免除条件変更、旧会員条件継続、終了がありうる。

### Relationships

Product、Variant、Offering、Member Cohort、Payment Scheme、Evidenceと関係する。

### Invariants

- 条件付き年会費を固定年会費として扱わない。
- 支払方法ごとの手数料差をPayment Scheme共通値にしない。

### Boundaries

Fee RuleはRewardではない。Fee免除はBenefitと関連するが、費用条件として扱う。

### Examples

- JCBゴールド ザ・プレミアのサービス年会費はJCBゴールド年会費とは別建てで、条件達成により免除がある。
- Paidyの分割あと払いは口座振替・銀行振込では手数料無料、コンビニ払いでは手数料が発生する。
- Kyash Cardにはカード種別ごとの発行手数料がある。

### Counterexamples

Paidyの3・6・12回あと払いを単一Schemeとして扱い、支払方法による手数料差を潰すと、実際の費用条件を説明できない。

### Temporal Behavior

Fee改定はpublished_atとeffective_fromを分ける。将来改定を現在値にしない。

### Evidence Requirements

公式料金表、規約、FAQ、改定告知が必要である。

### Open Questions

- 条件達成期間と請求期間の対応をどこまでDomainで扱うか。

## Concept: Reward Rule

### Definition

Reward Ruleは、Member RewardやBenefitの発生、計算、付与、失効、変換、移行を決めるRuleである。

### Responsibility

還元率、対象利用、倍率、外部会員資格、年間利用額、付与時期、変換条件、資産移行有無を説明する。

### Identity

対象Reward、条件、算定方法、対象Feature、期間、Evidenceで判断する。

### Lifecycle

改定、終了、旧会員継続、Feature終了、資産移行、失効がありうる。

### Relationships

Member Reward、Benefit、Asset Conversion、Product Feature、External Membership、Evidenceと関係する。

### Invariants

- Reward受益者をEvidenceで確認する。
- 変換後Assetを中間ポイントと同一視しない。
- 移行有無が明記されない場合はUnknownにする。

### Boundaries

Reward RuleはPartner Revenue Shareではない。

### Examples

- bitFlyer クレカのアプラスポイントからBTCへの変換。
- Marriott Bonvoy Amexの年間400万円以上利用による無料宿泊特典。
- Hilton Honors Amexプレミアムの年間利用額によるダイヤモンドステータス付与。
- 複数段階のReward算定は、Marriott Bonvoy AmexやHilton Honors Amexの年間利用額特典、bitFlyer クレカのポイントからBTCへの変換で確認できる。ただし基本還元率や端数処理は追加Evidenceが必要である。

### Counterexamples

セゾンゲーミングカードからDigitalへゲーミングコインが自動移行されると推論すると、公式の「自動移行されない」記述と矛盾する。

### Temporal Behavior

Reward RuleはFeature Lifecycleと強く連動する。付与終了、交換終了、失効、換金期限を分ける。

### Evidence Requirements

公式特典ページ、ポイント規約、終了案内、移行案内、FAQが必要である。

### Open Questions

- 複数段階のポイント計算を共通Ruleで扱えるか。

## Concept: Deposit Rule

### Definition

Deposit Ruleは、保証金の納付、金額、利用限度額との関係、返還条件を表すRuleである。

### Responsibility

デポジット型カードが通常のクレジットカード利用とどう結びつくかを説明する。

### Identity

対象Product、保証金額、限度額、納付方法、返還条件、期間、Evidenceで判断する。

### Lifecycle

申込時納付、増額、減額、解約後返還がありうる。

### Relationships

Deposit、Product、Credit Limit、Member、Issuance、Evidenceと関係する。

### Invariants

- Depositをプリペイド残高と同一視しない。
- Deposit型であることを理由にCoreクレジットカードから除外しない。

### Boundaries

Deposit RuleはFunding Methodではない。保証金は利用時に直接消費される資金ではない。

### Examples

ライフカード デポジット型では保証金が利用限度額と対応し、解約後返還される。

### Counterexamples

v1ではデポジット型の国内事例を未確認としていたが、v2でライフカード公式により訂正された。

### Temporal Behavior

返還までの期間は解約日と同日ではない場合がある。

### Evidence Requirements

公式商品説明、FAQ、保証金条件が必要である。

### Open Questions

- Deposit RuleをCredit Limit Ruleと統合できるか。

## Concept: Multi Card Relationship Rule

### Definition

Multi Card Relationship Ruleは、複数のIssuanceまたはProduct保有が条件や便益に影響するRule候補である。

### Responsibility

デュアル発行、複数カード保有、法人カードと個人カードの条件付き特典などを説明する。

### Identity

対象Issuance群、条件、効果、期間、Evidenceで判断する。現時点ではProvisionalであり、専用Conceptを確定しない。

### Lifecycle

対象カード追加、条件変更、特典終了がありうる。

### Relationships

Issuance、Member、Product、Variant、Reward Rule、Fee Rule、Evidenceと関係する。

### Invariants

- 複数カードの存在と、複数カード利用による特典成立を混同しない。
- EvidenceなしにCross Card Synergyを推論しない。

### Boundaries

Dual IssuanceとCross Card Synergyをすぐ別Conceptに分けるかは未決定である。共通構造で扱える可能性がある。

### Examples

三井住友カードのVisa/Mastercardデュアル発行は、同一会員に複数Issuanceが並ぶ例である。

### Counterexamples

03ではDualIssuanceRuleとCrossCardSynergyRuleの責務重複可能性が指摘されたが、統合すべき確定的反証はない。

### Temporal Behavior

複数カード条件は、各Issuanceの有効期間と条件判定期間に依存する。

### Evidence Requirements

公式FAQ、年会費説明、特典条件、対象カード一覧が必要である。

### Open Questions

- Dual issuanceと複数Product保有のRuleを同じ上位Conceptで扱えるか。
