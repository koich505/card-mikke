# 日本国内クレジットカード市場 Domain Specification 作成

以下の調査成果物を入力として、日本国内クレジットカードおよび隣接する後払い決済領域の **Domain Specification** を作成してください。

## Primary Inputs

- `docs/research/02-market-corpus-v2-audited.md`
  - 品質監査・訂正済みの最新市場調査コーパス
  - 日本市場に実在する商品・サービス・規約・役割・例外のEvidenceとして使用する

- `docs/research/03-domain-counterexample-audit.md`
  - 既存Domain Modelに対する反証調査
  - 既存概念の境界問題、不足概念、過剰抽象化、未解決事項の検討材料として使用する

- `docs/research/04-affinity-corporate-house-card-audit.md` から `13-invitation-eligibility-audit.md`
  - 提携・法人、Product/Variant/Issuance、Lifecycle、Campaign、Reward、Benefit、Fee、Billing/Credit、Insurance、Invitation/Eligibilityの追加Evidenceとして使用する
  - 各Research内の設計提案を完成仕様として扱わず、一次Source到達状況、confidence、Unknownを維持する

`docs/research/01-market-corpus-v1.md` は監査履歴・調査経緯の確認用途に限る。
v1とv2で内容が矛盾する場合はv2を優先する。

ただし、02〜13のResearchはいずれも絶対的に正しい完成仕様として扱ってはならない。
各ファイルはDomain Specificationを作るためのResearch Evidenceである。

---

# 目的

今回の目的は、

**日本国内クレジットカード市場を実装可能な形へ落とし込む前に、そのドメインの概念・責務・境界・関係・不変条件を明確化すること**

である。

今回は以下を作成しないこと。

- DBスキーマ
- テーブル
- カラム
- SQL
- Prisma Schema
- ORM Model
- JSON Schema
- API設計
- REST Endpoint
- GraphQL Schema
- ER図
- UI設計
- クラス設計
- Repository設計

実装都合からDomain Conceptを決めてはいけない。

---

# 基本原則

## 1. Research EvidenceからDomain Conceptを導く

既存のEntity名やRule名をそのまま採用しないこと。

特に以下は「設計済みEntity」ではなく、検証対象となったDomain Concept候補として扱う。

- Issuer
- PartnerOrganization
- CardProduct
- CardVariant
- Member
- CardIssuance
- AttachedCard
- RewardProgram
- AnnualFeeRule
- RewardRule
- EligibilityRule
- DepositCardRule
- DualIssuanceRule
- CrossCardSynergyRule
- CryptoConversionRule
- RentGuaranteeService
- ExternalMembershipRequirement
- ProductChangeHistory
- PaymentModelType

Research Evidenceから必要性を説明できない概念を、過去ドキュメントに存在するという理由だけで採用しないこと。

---

# 2. 概念を以下の形式で定義する

主要Domain Conceptについて、最低限以下を記載する。

## Definition
その概念は何か。

## Responsibility
その概念が担当するドメイン上の責務。

## Identity
何をもって同一のものと判断するか。
Identityが不要なValue/Ruleであればその旨を記載する。

## Lifecycle
生成・変更・終了・失効等がある場合、そのライフサイクル。

## Relationships
他のDomain Conceptとの関係。

## Invariants
常に守らなければならないドメイン上の制約。

## Boundaries
その概念に含めるもの／含めないもの。

## Examples
Researchで確認された実在商品による例。

## Counterexamples
その概念を誤って理解した場合に破綻する実在事例。

## Temporal Behavior
時間によって意味や状態が変わる場合、その扱い。

## Evidence Requirements
その概念・Ruleを事実として登録するために必要なEvidence。

## Open Questions
Researchだけでは決められない事項。

---

# 3. Entity / Value / Rule / Role / Relationshipを区別する

すべてをEntityとして扱わないこと。

特に、

- Actor
- Actor Role
- Product
- Offering
- Variant
- Membership
- Issuance
- Payment Scheme
- Reward
- Economic Flow
- Benefit
- Rule
- Lifecycle Event
- Evidence

が本当に同じ種類の概念なのかを検討する。

Ruleについても、専用Rule Entityを大量に作る前に、

- 共通Ruleとして扱えるか
- Domain固有Ruleとして独立すべきか
- 単なる属性・Valueなのか

を検討する。

---

# 重点的に解決するDomain Boundary

以下について、02および03のEvidenceを使って境界を検討する。

## Actor / Organization / Role

特に、

- Issuer
- Member Contract Party
- Credit Provider
- Billing Entity
- Processor
- Acquirer
- International Brand
- Partner Organization
- Reward Operator
- Asset Operator
- Funding Provider
- Guarantee Provider
- External Membership Operator

を「会社そのもの」と「会社が担うRole」に分ける必要があるか検討する。

bitFlyerクレカ等の複数主体事例を利用すること。

---

## Product / Offering / Variant

`CardProduct`と`CardVariant`の分離はworking domain decisionとして検討してよいが、確定済み構造とはみなさない。

以下を検討する。

- Productとは何を同一商品とみなす単位か
- 国際ブランド差は常にVariantなのか
- デザイン差はVariantなのか
- グレード差は別Productなのか
- 募集条件差はOfferingなのか
- 旧会員／新会員の規約差はProduct差なのかRule差なのか
- 後継商品と商品変更はどう異なるのか

セゾンゲーミングカード／Digitalの事例をCounterexampleとして使用すること。

---

## Payment Instrument / Payment Scheme / Funding Method

特に、

- クレジットカード
- BNPL
- プリペイド
- デビット
- 後払いチャージ
- 一括払い
- 分割
- リボ
- デポジット

を同じ軸に置かないこと。

PaidyおよびKyashのEvidenceを利用し、

- Payment Instrument
- Payment Scheme
- Funding Method
- Credit Provider

の境界を検討する。

`PaymentScheme`または同等概念は有力候補だが、名称・構造を最初から確定しないこと。

---

## Regulatory Registration / Legal Classification

以下を明確に分離する。

- Actor-level Regulatory Registration
- Product/Service-level characteristics
- Payment Scheme-level characteristics
- Transaction-level Legal Classification

「事業者が包括信用購入あっせん業者として登録されている」
ことから
「その事業者の全取引が同一法的分類である」
と推論してはいけない。

確認不能なLegal ClassificationはUnknownとして保持する。

---

## Member / External Membership / Account

以下を区別する必要性を検討する。

- カード会員
- 本会員
- 家族会員
- 法人
- 法人代表者
- 社員カード利用者
- 外部団体所属
- ホテル会員
- 航空マイレージ会員
- bitFlyer等外部サービスアカウント

External Membershipが、

- Eligibility
- Application Route
- Benefit eligibility
- Reward destination

の複数箇所に作用するケースを考慮する。

---

## Reward / Economic Flow

以下を安易に同一概念へ統合しない。

- Memberへのポイント
- Cashback
- Mile
- Hotel Point
- 暗号資産への変換
- 提携団体への収益分配
- 大学等への寄付
- 外部団体への手数料収入

特に全弁協の事例について、

`Member Reward`

と

`Partner Revenue Share / Economic Flow`

を同じRewardとして扱うべきか検討する。

単一事例だけで新Entityを確定しない。

---

## Product Lifecycle / Feature Lifecycle

以下を区別する。

- 募集開始
- 新規申込停止
- 特典変更
- 特典終了
- 一部機能停止
- クレジット機能停止
- 商品終了
- 強制／自動解約
- 既存会員のみ継続
- 後継商品開始
- 商品切替
- ポイント等の資産移行

セゾンゲーミングカードの段階的終了を重要なCounterexampleとして利用する。

商品全体とFeatureが別々のLifecycleを持つ必要性を評価する。

ただし `NominalSuccessorRelation` 等の新概念は独立事例が少ないため、必要性を確定しない。

---

# Temporal Model

以下の日時概念を区別して検討する。

- observed_at
- retrieved_at
- published_at
- announced_at
- effective_from
- effective_to
- application_available_from
- application_available_to
- feature_available_from
- feature_available_to
- service_ended_at

名称は暫定であり、そのままDBカラム名として採用しない。

特に、

「今日確認した」
と
「今日から有効」
を同一視しないこと。

また、

- 新規会員
- 既存会員
- 特定期間加入者
- 移行元会員

など、同一商品内に複数の会員コホートが存在する可能性を考慮する。

---

# Evidence Model

本サービスでは、

**表示する値だけでなく、その値の根拠を説明できること**

を重要なドメイン要件とする。

以下の概念を検討する。

- Source
- Source Document
- Observation
- Evidence
- Extracted Fact
- Domain Fact

ただし既存名称をそのまま採用する必要はない。

最低でも、

Domain Fact
→ Evidence
→ Source

を追跡できる必要がある。

以下も扱う。

- disclosed
- partially_disclosed
- undisclosed
- unknown

`unknown` と `undisclosed` は別状態として扱う。

Sourceが消失しても、過去に確認されたDomain Factの履歴を破壊してはいけない。

---

# Invariants

Research EvidenceからDomain Invariantを抽出する。

例として以下を検討するが、Evidenceなしに確定しないこと。

- Unknownを推測値で補完しない
- UndisclosedをUnknownと同一視しない
- 将来適用Ruleを現在Ruleとして返さない
- 同じ対象・条件・期間で矛盾するRuleを無条件にCurrentとしない
- Variant差をProduct共通値として潰さない
- Actorの登録区分からTransaction Legal Classificationを自動導出しない
- Product LifecycleとFeature Lifecycleを混同しない
- Application RouteとEligibilityを同一視しない
- 外部サービス資格が必要なBenefitをカード保有だけで成立扱いしない

各Invariantについて、対応するResearch Evidenceまたは反例を記載する。

---

# Domain Scenarios

Given / When / Then形式で、最低でも以下を作成する。

1. 一般的なクレジットカードへの新規申込
2. 同一Productで国際ブランドごとに条件が異なる
3. Visa/Mastercardデュアル発行
4. 家族カード
5. 法人カード＋社員追加カード
6. 招待による上位カード取得
7. 外部団体所属者限定の申込経路
8. 商品切替
9. 名称上の後継商品だが新規契約となる
10. デポジット型カード
11. 条件付き年会費
12. 複数段階のポイント計算
13. ポイントからBTC等外部資産へ変換
14. 複数カード利用による特典
15. 商品の新規受付停止
16. Featureのみ段階的に終了
17. 旧会員のみ旧Ruleが継続
18. KyashのPayment Instrumentと後払いFunding Method
19. Paidyの複数Payment Scheme
20. ホテル等External MembershipによるBenefit成立

Research Evidenceで確認できない部分を創作しないこと。

---

# Decision Traceability

重要なDomain Decisionについて、

**Decision  
→ Supporting Observation  
→ Concrete Product Example  
→ Evidence  
→ Counterevidence  
→ Confidence**

を追跡できるようにする。

評価は必要に応じて、

- Adopted as working decision
- Supported but provisional
- Needs revision
- Unresolved

等を使用する。

「反例が見つからなかった」だけでStrongly Supportedとは判断しないこと。

---

# Output

以下のMarkdownファイルを作成する。

```text
docs/spec/domain/
├── 00-scope.md
├── 01-glossary.md
├── 02-actors-and-roles.md
├── 03-products.md
├── 04-membership-and-issuance.md
├── 05-payment-and-credit.md
├── 06-rewards-and-economic-flows.md
├── 07-rules.md
├── 08-temporal-model.md
├── 09-evidence-model.md
├── 10-invariants.md
├── 11-scenarios.md
└── 12-open-questions.md
```

各ファイルは相互に矛盾しないようにする。

同じConceptを複数ファイルで異なる意味に定義しないこと。

---

# 12-open-questions.md

特に重要。

Researchだけでは決定できなかった問題を隠さず残すこと。

各Open Questionについて、

- Question
- Why unresolved
- Related Evidence
- Impact if unresolved
- Whether it blocks Requirements
- Whether it blocks Architecture
- Recommended next action

を記載する。

---

# 完了条件

最後に、

## Domain Specificationとして暫定採用したConcept

## Provisional / 今後反証可能なConcept

## 未解決で設計を止めるべきConcept

## Requirements作成には進めるがArchitecture決定前に解決すべきConcept

の4群に分類する。

また、

**DB設計に進む前に解決すべきBlocking Open Questions**

を明示する。

今回の作業ではDomain Specificationまでとし、DB/API/Architecture/UIの設計には進まないこと。
