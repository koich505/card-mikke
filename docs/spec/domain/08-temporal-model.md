# Temporal Model

本仕様の日時名はDomain上の区別を表すための仮称であり、実装名ではない。

## Concept: Temporal Fact

### Definition

Temporal Factは、Domain Factに関係する観測、公開、発表、有効、受付、利用可能、終了の時点または期間を表す。

### Responsibility

「いつ確認したか」と「いつから有効か」を分離し、履歴、将来Rule、旧会員Rule、Evidenceの取得時点を説明できるようにする。

### Identity

対象Fact、時間種別、時点または期間、Source、Evidenceで判断する。Temporal Fact自体はValue/Factであり、独立Entityとは限らない。

### Lifecycle

観測追加、訂正、Source更新、過去Factの失効、新Factへの置換がありうる。

### Relationships

Temporal FactはProduct、Feature、Rule、Offering、Partnership、Evidence、Domain Factと関係する。

### Invariants

- observed_atとeffective_fromを同一視しない。
- retrieved_atとpublished_atを同一視しない。
- 将来適用Ruleを現在Ruleとして扱わない。
- Sourceが消失しても過去に確認されたDomain Factの履歴を破壊しない。

### Boundaries

Temporal FactはLifecycle Eventそのものではない。Eventに複数の時点が付く場合がある。

### Examples

- Paidy行政処分資料にはPublished dateと登録事実がある。
- セゾンゲーミングカードDigitalは2024-08-30に終了発表、2024-09-10に新規入会停止、2025-02-01から機能限定、2025-03-31にサービス終了・自動解約。
- Marriott Bonvoy Amexは2025-08-21に特典・年会費改定が予定される。

### Counterexamples

「今日確認した」ことを「今日から有効」と扱うと、2026-08-07に取得した過去の終了告知や将来改定を誤って現在Ruleにしてしまう。

### Temporal Behavior

Temporal FactはDomain Factごとに複数持ちうる。観測日、取得日、公開日、発表日、有効開始、有効終了、受付開始、受付終了、Feature開始、Feature終了、サービス終了を区別する。

### Evidence Requirements

Source上の日付、取得日、本文中の有効日、告知日、適用対象期間を抽出し、明記がないものはUnknownにする。

### Open Questions

- Timezoneや営業日単位の扱い。
- 日付だけでなく時刻まで必要なRuleの有無。

## Temporal Labels

| Label | Meaning | Do Not Confuse With |
|---|---|---|
| observed_at | 調査者がFactを観測した日 | Factの有効開始日 |
| retrieved_at | Sourceを取得した日 | Source公開日 |
| published_at | Sourceが公開された日 | 告知された効力発生日 |
| announced_at | 変更や終了が告知された日 | 実際の終了日 |
| effective_from | RuleやFactの効力開始日 | 取得日 |
| effective_to | RuleやFactの効力終了日 | Source消失日 |
| application_available_from | 申込受付開始日 | Product提供開始日 |
| application_available_to | 申込受付終了日 | Product終了日 |
| feature_available_from | Feature提供開始日 | Product提供開始日 |
| feature_available_to | Feature提供終了日 | Product終了日 |
| service_ended_at | ProductまたはServiceの終了日 | 提携終了日、Feature終了日 |

## Concept: Lifecycle Event

### Definition

Lifecycle Eventは、Product、Offering、Variant、Feature、Rule、Partnership、Issuance等の状態遷移である。

### Responsibility

何が、どの状態からどの状態へ、いつ、誰に対して変わるかを説明する。

### Identity

対象、Event type、効力日、Source、対象コホート、Evidenceで判断する。

### Lifecycle

Event自体は発表、訂正、効力発生、無効化されうる。

### Relationships

Lifecycle EventはProduct、Feature、Rule、Member Cohort、Partnership、Evidenceと関係する。

### Invariants

- Product LifecycleとFeature Lifecycleを混同しない。
- Partnership終了をProduct終了にしない。
- 既存会員向け継続を新規申込可能と扱わない。

### Boundaries

Lifecycle Eventは履歴メモではない。Domainの状態を変える事実だけを扱う。

### Examples

- セゾンゲーミングカードDigitalの新規入会停止、特典終了、クレジット機能限定、自動解約。
- 弁護士VISAビジネスカードの提携終了。

### Counterexamples

単一のProductStatusだけでは、セゾンゲーミングカードDigitalの段階的終了を説明できない。

### Temporal Behavior

1つの告知Sourceから複数のLifecycle Eventが抽出される場合がある。

### Evidence Requirements

終了告知、改定告知、FAQ、規約改定、提携団体ページが必要である。

### Open Questions

- Event typeの標準語彙。
- ProductとFeatureのEvent境界。

## Concept: Member Cohort

### Definition

Member Cohortは、同一Product内で異なるRuleやFeatureが適用される会員群である。

### Responsibility

新規会員、既存会員、特定期間加入者、移行元会員、招待対象者、外部団体所属者を区別する。

### Identity

対象ProductまたはOffering、加入時期、条件、Rule適用範囲、Evidenceで判断する。

### Lifecycle

Cohortの発生、受付終了、Rule変更、消滅がありうる。

### Relationships

Member CohortはMember、Offering、Rule、Lifecycle Event、Evidenceと関係する。

### Invariants

- 新規会員向けRuleを既存会員へ自動適用しない。
- 旧会員のみ継続をProduct全体のCurrent Ruleにしない。

### Boundaries

Member CohortはMember個人そのものではない。Rule適用の対象範囲を示す。

### Examples

- セゾンゲーミングカードDigitalでは新規入会停止後も既存会員にクレジット機能のみの期間がある。
- アメックス・ゴールド・プリファードでは一般申込者と既存ゴールド会員の切替Routeが並存する。

### Counterexamples

Offeringの新規受付停止をProduct利用不可と扱うと、既存会員の継続利用状態を誤る。

### Temporal Behavior

Cohortは加入期間や移行元により定義され、Rule有効期間と重なる。

### Evidence Requirements

申込停止告知、既存会員向け案内、切替案内、規約改定が必要である。

### Open Questions

- CohortをDomain Conceptとして明示するか、Ruleの対象条件として扱うか。
