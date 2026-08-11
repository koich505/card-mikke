# Campaigns

Campaignは通常のOffering、Reward Rule、Benefitまたは恒常的なFeatureから独立して扱う。ただし、実装上のEntityやSchemaを決めるものではない。

## Concept: Campaign

### Definition

Campaignは、特定の目的、Sponsor、対象、実施期間、条件および配賦方法を持つ有限の施策である。

### Responsibility

恒常Ruleと期間限定施策を分け、各効果についてどの条件から、どのBeneficiaryへ、どのReward・Benefit等を、どの実施回で提供するかを説明する。確定付与と抽選候補を効果ごとに分ける。

### Identity

Sponsor、施策目的、対象Offering/Product、Campaign Instance、期間、条件、Evidenceで判断する。同名Campaignや再実施を自動的に同一としない。

### Lifecycle

告知、応募・登録開始、対象利用開始、終了予定、予算等による早期終了、集計、抽選・判定、付与、取消がありうる。

### Relationships

Campaign Sponsor、Campaign Instance、Offering、Application Route、Member Cohort、Transaction、Rule、Beneficiary、Reward、Benefit、Evidenceと関係する。

### Invariants

- Campaignを恒常Reward Rule、Product FeatureまたはOfferingと同一視しない。
- 告知期間、応募期間、対象利用期間、集計期間、判定・抽選期間、付与期間、利用・失効期間を同一視しない。
- 条件のAND/OR/否定、段階閾値、対象外、Reward対応を保持する。
- Member単位、Transaction単位、期間単位、Campaign全体等の上限を区別する。
- 重複適用、抽選確率、予算、早期終了条件が明記されなければUnknownまたは`undisclosed`とする。
- 早期終了が登録済み・発行済みの権利またはBenefitへ遡及して作用するとEvidenceなしに推論しない。

### Boundaries

CampaignはApplication Routeでも、通常Fee/Reward/Benefit Ruleでもない。Campaignがそれらを参照または一時的に変更する場合は関係として扱う。広告表現だけから確実な付与を推論しない。

### Examples

- 新規入会と一定額利用の双方を必要とする施策は、申込資格、対象利用、Reward付与を一つの条件へ潰さない。
- 抽選施策は条件充足と当選を分ける。
- 予算到達等で早期終了しうることが公式条件で確認された施策は、予定終了日だけで有効性を判断しない。第三者Sourceだけの早期終了事例はProvisionalに留める。

### Counterexamples

「最大○○ポイント」を全参加者への確定付与とすると、段階条件、抽選、対象外、上限を誤る。

### Temporal Behavior

Campaign Instanceごとに複数期間を持つ。予定と実績、通常終了と早期終了、付与予定と実付与を分ける。

### Evidence Requirements

公式Campaignページ、規約、対象条件、対象外、期間、付与時期、上限、早期終了告知が必要である。終了後にSourceが消える可能性を考慮し、Evidence retentionはOQとして維持する。

### Open Questions

- Campaign Templateを独立Conceptとする最小条件。
- 非公開の全体予算、抽選確率、Fraud判定をどのclaim粒度で`undisclosed`とするか。
- 複数Campaign・通常Reward間の競合を共通Ruleとして扱える範囲。
- 早期終了が登録済み・発行済み権利へ及ぼす効果。
- 紹介者・被紹介者等の複数Beneficiaryと、確定/抽選の効果mappingの最小表現。

## Concept: Campaign Instance

Campaign InstanceはCampaignの個別実施回である。同一名称でも期間、対象、条件、Sponsor、予算、Rewardが異なる実施回を分け、終了した実施回の条件を次回へ自動継承しない。独立Identityが不要な場合はCampaignのversionまたはoccurrenceとして扱えるため、Conceptの最終形はProvisionalとする。
