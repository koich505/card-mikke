# Rewards And Economic Flows

## Concept: Member Reward

### Definition

Member Rewardは、カード会員または対象利用者へ利用等に応じて発生・付与され、残高、数量、金額等として算定または蓄積される還元価値である。現時点のworking boundaryではポイント、マイル、キャッシュバック、資産変換前の価値を含む。

### Responsibility

Member Rewardは、受益者、発生条件、算定方法、付与タイミング、失効、変換、対象Featureを説明する。

### Identity

同一性はReward type、受益者、ProductまたはFeature、算定Rule、期間、Evidenceで判断する。

### Lifecycle

開始、還元率変更、付与停止、失効、変換、移行、終了がありうる。

### Relationships

Member RewardはMember、Reward Operator、Product Feature、Reward Rule、External Membership、Asset Conversion、Evidenceと関係する。

### Invariants

- Member本人へのRewardと、提携団体への収益分配を同じRewardにしない。
- Reward OperatorとAsset Operatorを同一視しない。
- 外部会員資格が必要なBenefitを、カード保有だけで成立扱いしない。

### Boundaries

Member RewardはBenefitの下位概念だが、Benefit全体でもEconomic Flow全体でもない。無料宿泊、ホテルステータス、ラウンジ等の資格・サービス便益は現時点では非Reward Benefitとして扱う。提携先団体への手数料収入、寄付、加盟店手数料、Issuer間精算は別Concept候補である。

### Examples

- bitFlyer クレカでは、カード利用でアプラスポイントが発生し、BTCへ変換されbitFlyerアカウントへ付与される。

### Counterexamples

全弁協カードの利用に伴う協同組合への手数料収入をMember Rewardに含めると、受益者がMemberではない経済フローを誤分類する。

### Temporal Behavior

RewardはProductやFeatureより細かい期間を持つ。付与期間、失効日、変換日、旧会員適用Ruleを分ける。

### Evidence Requirements

公式特典説明、規約、FAQ、終了告知、ポイント移行説明が必要である。移行有無が明記されない場合はUnknownを保持する。

### Open Questions

- Rewardと外部資産の境界。
- マイル、宿泊ポイント、交換可能な無料宿泊証書等をRewardと非Reward Benefitのどちらに置くか。
- ポイント、マイル、ホテルポイント、暗号資産を同じReward familyで扱うか。

## Concept: Asset Conversion

### Definition

Asset Conversionは、ポイント等のRewardが暗号資産や外部資産へ変換される処理またはRuleである。

### Responsibility

Asset Conversionは、変換元、変換先、変換主体、変換タイミング、レート、受領先アカウントを説明する。

### Identity

同一性は変換元Reward、変換先Asset、Operator、対象Account、期間、Evidenceで判断する。RuleまたはRelationshipとして扱える可能性がある。

### Lifecycle

変換開始、レート条件変更、変換停止、外部アカウント連携停止がありうる。

### Relationships

Asset ConversionはMember Reward、Reward Operator、Asset Operator、External Account、Evidenceと関係する。

### Invariants

- `CryptoConversionRule`相当のConcept自体を否定しない。
- Issuer、Reward Operator、Asset Operator、External Account Operatorを分離する。
- 中間ポイントと変換後資産の性質を混同しない。

### Boundaries

Asset ConversionはPayment Schemeではない。暗号資産へ変わるのは支払債務ではなくRewardである。

### Examples

bitFlyer クレカでは、アプラスポイントが市場レートでBTCに変換され、bitFlyerアカウントに付与される。

### Counterexamples

「カード発行会社が暗号資産変換も行う」と仮定すると、アプラスとbitFlyerのRole分離を説明できない。

### Temporal Behavior

変換レート、変換タイミング、付与タイミングは観測日と別に扱う。市場価格変動リスクを持つAsset化の時点が未確定である。

### Evidence Requirements

商品公式ページ、変換条件、外部アカウント条件、レート説明、運営主体説明が必要である。

### Open Questions

- RewardからAssetへ変わる境界時点。
- 暗号資産の評価額変動をDomain Factとして扱うか。

## Concept: Benefit

### Definition

Benefitは、Member Rewardを含む会員向け便益の総称である。現時点のworking boundaryでは、ラウンジ、コンシェルジュ、無料宿泊、ホテルステータス、ダイニング優待等の資格・サービス便益を非Reward Benefitとして扱う。

### Responsibility

Benefitは、誰に、どの条件で、どの期間、どの外部資格と連動して成立するかを説明する。

### Identity

同一性はBenefit type、Product/Feature、対象Member、条件、期間、Evidenceで判断する。

### Lifecycle

追加、改定、終了、対象変更、年次判定、コホート差がありうる。

### Relationships

BenefitはProduct Feature、Member、External Membership、Rule、Evidenceと関係する。

### Invariants

- Benefit eligibilityとApplication eligibilityを混同しない。
- 外部会員資格が必要なBenefitは、外部会員の状態を確認する。

### Boundaries

BenefitはPartner Revenue Shareではない。Memberに直接返らない価値移転はEconomic Flowとして扱う。
RewardはBenefitの下位概念である。同じ便益をRewardと非Reward Benefitの双方へ所属させない。交換可能な証書や外部ポイントなど境界が判断できないものは個別にUnknownとして扱う。

### Examples

- Marriott Bonvoy Amexの無料宿泊特典と宿泊実績付与。
- Hilton Honors Amexのエリートステータス付与。
- アメックスのダイニング優待は特典として扱うが、一部詳細はSource qualityに注意する。

### Counterexamples

ホテル会員資格が必要なBenefitをカード保有だけで成立扱いすると、External Membershipとの関係を失う。

### Temporal Behavior

年間利用額判定、更新時特典、期間改定、旧会員条件を分ける。

### Evidence Requirements

公式特典ページ、ホテルプログラム公式ページ、規約、改定告知が必要である。

### Open Questions

- ホテル会員資格とカード会員資格の契約上の分離度。

## Concept: Economic Flow

### Definition

Economic Flowは、Member Reward以外も含む、Actor間の価値、収益、手数料、寄付、資産移転の流れである。

### Responsibility

Economic Flowは、支払または利用に伴う価値の発生元、流れ、受益者、目的、条件を説明する。

### Identity

同一性は発生条件、支払元、受益者、対象ProductまたはPartnership、期間、Evidenceで判断する。現時点ではSupported but provisionalである。

### Lifecycle

提携開始、手数料条件変更、受益者変更、提携終了、寄付先変更がありうる。

### Relationships

Economic FlowはActor、Partner Organization、Partnership、Product、Transaction、Member Reward、Evidenceと関係する。

### Invariants

- Member Rewardに吸収しない。
- 受益者がMember、Partner Organization、大学、外部団体のいずれかをEvidenceで区別する。
- 単一事例だけで詳細構造を固定しない。

### Boundaries

Economic FlowはBenefitやRewardより広い。表示上の特典ではなく、裏側の収益配分や寄付を含む可能性がある。

### Examples

- 全弁協カードでは、利用に伴う手数料収入が所属協同組合へもたらされ、福利厚生事業に利用される可能性が示されている。
- 大学系カードでは寄付や校友会便益の可能性があるが、今回仕様ではEvidence不足のものは確定しない。

### Counterexamples

全弁協の手数料収入をReward Programに寄せると、Member本人へのポイントとPartner Organizationへの収益分配が同じ責務になってしまう。

### Temporal Behavior

Economic FlowはPartnershipやRuleの期間に従う。提携終了後の既存会員利用による収益発生は、Evidenceがない場合Unknownである。

### Evidence Requirements

提携団体公式資料、特約、Issuer規約、手数料収入や寄付に関する説明が必要である。分配率や税務処理が不明な場合はpartially_disclosedにする。

### Open Questions

- Partner Revenue Shareを独立Conceptとして採用するか。
- Donation Allocationと同じ上位概念に含めるか。

## Concept: Partner Revenue Share

### Definition

Partner Revenue Shareは、提携Productの利用等によりPartner Organizationへ収益や手数料が帰属するEconomic Flow候補である。

### Responsibility

提携先がMember本人以外の受益者になるケースを明示する。

### Identity

同一性はPartnership、受益者、発生条件、期間、Evidenceで判断する。現時点ではProvisionalであり、独立Conceptとして確定しない。

### Lifecycle

提携期間、分配条件、受益者変更、提携終了と連動する。

### Relationships

Partnership、Partner Organization、Economic Flow、Member、Product、Evidenceと関係する。

### Invariants

- Member Rewardと同一視しない。
- 手数料収入が存在することと、具体的分配率が判明していることを区別する。

### Boundaries

Partner Revenue Shareは会員向けポイントやキャッシュバックではない。

### Examples

全弁協提携カード群。

### Counterexamples

Partner Revenue Shareを扱わないと、全弁協の「会員本人に負担なく協同組合へ手数料収入がもたらされる」構造を説明できない。

### Temporal Behavior

提携終了後の継続有無はEvidenceが必要である。

### Evidence Requirements

提携団体公式資料、Issuer特約、収益帰属の記述が必要である。

### Open Questions

- 1団体内の複数商品以外に独立事例があるか。
- Requirementsでは「Economic Flow」として抽象化し、Architecture前に細分化判断するのが妥当か。
