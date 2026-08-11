# 日本国内クレジットカード市場 Domain Specification Scope

Status: Reviewed — Ready for Requirements (conditional)
Research baseline: 2026-08-10

## Purpose

本仕様は、日本国内クレジットカードおよび隣接する後払い決済領域について、実装に入る前にドメイン上の概念、責務、境界、関係、不変条件を明確にするための文書である。

ここで定義するConceptは、DB、API、ORM、UI、クラス構造の設計単位ではない。実装上の名前や構造は、RequirementsとArchitectureで別途決定する。

## Primary Inputs

- `docs/research/02-market-corpus-v2-audited.md`: 品質監査・訂正済みの最新市場コーパス。市場事実の正本として扱う。
- `docs/research/03-domain-counterexample-audit.md`: 既存Domain Modelへの反証調査。境界問題、不足概念、過剰抽象化、未解決事項の材料として扱う。
- `docs/research/04-affinity-corporate-house-card-audit.md`から`13-invitation-eligibility-audit.md`: 提携・法人・商品差・発行・時間軸・Campaign・Reward・Benefit・料金・請求・与信・保険・招待資格を対象とする追加監査。02・03を置き換えず、追加Evidenceとして扱う。
- `docs/research/01-market-corpus-v1.md`: 監査履歴・調査経緯の確認用途に限る。v1とv2が矛盾する場合はv2を優先する。

## Non Goals

以下は本仕様の対象外である。

- DBスキーマ、テーブル、カラム、SQL、Prisma Schema、ORM Model
- JSON Schema、API、REST Endpoint、GraphQL Schema
- ER図、UI設計、クラス設計、Repository設計
- 実装都合からのConcept名決定

## Interpretation Rules

- Research Evidenceは完成仕様ではなく、Domain Conceptを導くための根拠である。
- Research文書の記述は、絶対的な真実や完成したDomain Modelではなく、confidenceとdisclosure statusを持つObservationとして扱う。Research中の「必要」「フィールド」等の設計提案も、そのまま仕様へ昇格させない。
- `unknown`は「調査で確認できない」、`undisclosed`は「存在するが公開されていない」として区別する。
- 事業者の登録区分から、個別取引や支払方式の法的分類を自動導出しない。
- 商品名、提携名、ブランド名、特典名の類似から、契約上または資産上の連続性を推論しない。

## Concept Kinds

| Kind | Meaning | Examples |
|---|---|---|
| Actor | 法人、団体、個人など、Roleを担いうる当事者 | アプラス、bitFlyer、Paidy、全弁協 |
| Role | Actorが特定の文脈で担う責務 | Issuer、Reward Operator、Asset Operator、External Membership Operator |
| Product | 市場に提供される商品またはサービスの単位 | 三井住友カード、bitFlyer クレカ、ライフカード デポジット型 |
| Offering | 申込経路、対象者、期間、条件を伴う提供形態 | 一般申込、招待、外部団体限定、切替 |
| Variant | 同一Product内で選択または区別される仕様差 | 国際ブランド、カードデザイン、グレード候補 |
| Membership | 会員資格、外部サービスアカウント、団体所属 | カード本会員、家族会員、bitFlyerアカウント、ホテル会員 |
| Issuance | 会員に対して支払手段が発行または利用可能化された状態 | 本カード、家族カード、社員追加カード、バーチャルカード |
| Credit Facility | 信用供与と利用可能額の責務 | 契約単位の利用可能枠、複数媒体の共有枠、媒体別統制枠 |
| Billing | 利用を請求へまとめ、支払と枠回復へ至らせる責務 | 締日、支払日、請求確定、再請求 |
| Rule | 条件、算定、適用可否、期間を表す判断単位 | 年会費条件、Eligibility、Reward、Deposit |
| Campaign | 通常Ruleから独立した有限の施策とその実施回 | 入会Campaign、利用額達成Campaign、抽選施策 |
| Insurance | カードに関連する保険商品、担保、適用・請求条件 | 旅行傷害保険、ショッピング保険、不正利用補償 |
| Relationship | Actor、Product、Offering、Issuance間の関係 | 提携、後継、切替、複数カード条件 |
| Lifecycle Event | Product、Feature、Rule、Partnership等の状態遷移 | 新規停止、特典終了、提携終了、自動解約 |
| Evidence | Domain Factを支える根拠 | Source、Observation、Extracted Fact |

## Decision Status

| Status | Meaning |
|---|---|
| Adopted as working decision | Requirements作成に使う。追加反証で変更されうる。 |
| Supported but provisional | Evidenceは強いが、名称・粒度・境界は確定しない。 |
| Needs revision | 既存概念をそのまま使うと破綻する。責務や粒度の見直しが必要。 |
| Unresolved | Researchだけでは判断できない。Architecture前に解くべき場合がある。 |

## Decision Traceability

| Decision | Supporting Observation | Concrete Product Example | Evidence | Counterevidence | Confidence |
|---|---|---|---|---|---|
| ActorとActor Roleを分離する | 1社が複数Roleを持ち、1商品に複数Actorが関与する | bitFlyer クレカ、Kyash、Paidy、全弁協カード | 02 §7.1、03 EC-1、03 EC-3、03 EC-4 | Role名の完全一覧は未確定 | high |
| Actor、Applicant、Contract Party、Cardholder/User、Member Role、Issuanceを分ける | 申込資格、会員関係、契約主体、利用者、発行状態は同一責務ではない | bitFlyer クレカ、全弁協カード、法人購買決済候補 | 02 §3、02 §6.2、03 §7 | 法人・家族・社員利用者の具体境界は未確定 | medium |
| Payment Instrument、Payment Scheme、Funding Methodを分ける | カードそのものと後払いチャージ、支払方式が別契約・別Actorになる | Kyash、Paidy | 02 §1.1、02 §7.1、03 EC-4 | Kyash提供元の登録状況はUnknown | medium-high |
| Actor-level Regulatory RegistrationとTransaction-level Legal Classificationを分ける | Paidyは登録事業者だが、支払スキーム別の法的分類は登録事実から導けない | Paidy一括あと払い、3・6・12回あと払い | 02 §1.1、03 EC-4 | 具体的な取引分類の一次確認は不足 | high |
| Product LifecycleとFeature Lifecycleを分ける | 新規停止、特典終了、クレジット機能限定、自動解約が異なる日付で起きる | セゾンゲーミングカードDigital | 02 §5.2、03 EC-2 | 同型の独立事例は未確認 | high for separation, medium for generalization |
| Member RewardとEconomic Flowを分けて検討する | 利用に伴う手数料収入が会員本人ではなく協同組合へ帰属する可能性がある | 全弁協提携カード | 02 §7.1、03 EC-1 | 市場全体では独立事例が少ない | medium |
| Evidence chainを必須にする | v1には一次確認不足による誤分類が複数あった | Paidy、UCSカードmajica、デポジット型、ホテル提携 | 02 §1、02 §4 | Source消失時の保持方針は未設計 | high |
| Issuanceを契約・口座・媒体・識別子から分離する | 1契約に複数媒体があり、追加媒体ごとに利用者、料金、状態が異なる | 家族カード、社員カード、ETCカード、Amex Platinumの複数素材カード | 04、05、10、13 | カードレス購買の境界は未確定 | high for separation |
| Credit Facility、Limit、Instrumentを分離する | 複数媒体で枠を共有する一方、媒体別統制枠も存在する | 家族カード、法人カード、パーチェシング | 04、11、13 | 契約別の法的責任粒度は一部Unknown | medium-high |
| Campaignを通常Ruleから分離する | 実施回、予算、抽選、早期終了、重複条件が通常特典と異なる | 入会・利用Campaign各種 | 07 | 非公開予算・抽選ロジックはUnknownまたはundisclosed | high for separation |
| Insurance ProductとBenefit表示を分離する | 担保ごとに付帯条件、上限、免責、請求要件、引受会社が異なる | 旅行傷害保険、ショッピング保険、不正利用補償 | 09、12 | 一部の特殊保険は一次確認未達 | high |
| Product等のLifecycleとRule内の複数期間を分ける | 集計、判定、付与、利用、失効、補償、請求の期間が一致しない | Reward、年会費、Campaign、保険 | 06、07、08、10、12 | 時刻・営業日の共通扱いは未確定 | high |

## Requirements Readiness

Requirements作成には進める。ただし本更新に対するDomain ReviewでCritical・Majorが解消されることを条件とする。Architecture、特にデータ保持粒度、契約・信用供与、法的分類の扱いを決める前に、`12-open-questions.md`のBlocking Open Questionsを解決する必要がある。
