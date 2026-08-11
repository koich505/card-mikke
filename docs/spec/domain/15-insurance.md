# Insurance And Compensation

カードサイト上で「付帯保険」「補償」「プロテクション」と表示される便益について、表示上のBenefitと保険・補償の契約上の責務を分離する。法的に保険か会員保障制度かが確認できないものを、名称だけでInsurance Productへ分類しない。

## Concept: Insurance Product

### Definition

Insurance Productは、独自の約款、引受主体、対象期間およびCoverageを持ち、カード契約に付帯または関連する保険商品である。

### Responsibility

Product/Issuanceとの付帯関係、Underwriter、対象被保険者、Coverage集合、約款世代および独立Lifecycleを説明する。

### Identity

約款、Underwriter、契約・付帯関係、対象者、期間、Evidenceで判断する。カード商品名やBenefit表示だけでは同一性を決めない。

### Lifecycle

付帯開始、約款改定、Underwriter変更、対象grade・地域変更、終了、既存事故への経過措置がありうる。

### Relationships

Product、Offering、Variant、Issuance、Member/User/Beneficiary、Insurance Underwriter、Claims Handler、Coverage、Rule、Evidenceと関係する。

### Invariants

- Insurance ProductとProduct FeatureまたはBenefit表示を同一視しない。
- Issuer、Underwriter、Claims Handlerが同一Actorであると仮定しない。
- Insurance Productの販売・付帯期間と各Coverageの補償期間を同一視しない。
- Underwriterだけの変更からProductまたはCoverageの終了を推論しない。

### Boundaries

不正利用補償等が保険契約か会員保障制度か確認できない場合はLegal ClassificationをUnknownにする。任意加入保険と自動・利用付帯を同一Productにまとめない。

### Examples

- カード付帯の旅行傷害保険は、カードProductとは別の約款、Underwriter、複数Coverageを持つ。
- ショッピング保険では、購入品、購入方法、購入日からの期間がCoverage成立に作用する。

### Counterexamples

カード名称が継続していることから同じ保険約款・Underwriter・Coverageが継続すると推論すると、付帯条件改定や引受会社変更を説明できない。

### Temporal Behavior

カードProduct、Insurance Product、約款世代、Underwriter assignment、Coverageは独立して変更されうる。改定の発表日と適用日、事故日と請求日を分ける。

### Evidence Requirements

公式約款、保険案内、改定告知、引受会社表示、カード会社FAQを優先する。第三者の要約だけでCoverageを確定しない。

### Open Questions

- 会員保障制度とInsurance Productの共通上位Concept。
- Underwriting Contractを独立Conceptにする最小条件。

## Concept: Coverage

### Definition

CoverageはInsurance Productまたは補償制度内の個別の担保・補償項目である。

### Responsibility

Eligibility/Attachment Trigger、Insured Event、対象者・対象物、付帯方式、地域、Limit scope、Deductible、Exclusion、Claim Requirement、補償期間、合算Ruleを説明する。

### Identity

Insurance Product、担保種別、対象、Eligibility/Attachment Trigger、Insured Event、期間、約款世代、Evidenceで判断する。表示上の「最高額」だけでは同一性を決めない。

### Lifecycle

追加、条件変更、Limit・免責変更、自動付帯から利用付帯への変更、終了、請求期限到来がありうる。

### Relationships

Insurance Product、Insured/Beneficiary Role、Issuance、Transaction、Rule、Temporal Fact、Claim Requirement、Evidenceと関係する。

### Invariants

- 担保ごとに付帯方式、Limit、Deductible、Exclusion、Claim Requirementを判断する。
- 決済・登録等のEligibility/Attachment Triggerと、事故・疾病・損害等のInsured Eventを区別する。
- 1事故、1旅行、年間、複数契約共有pool等のLimit scopeと、事由別sublimitの関係を保持する。
- ExclusionとClaim Requirementを相互変換せず、書類不足等の手続要件と補償対象外事由を分ける。
- 自動付帯、利用付帯、登録・支払設定連動をInsurance Product全体の単一属性にしない。
- 複数カード・複数契約の補償額を単純加算しない。最大値キャップ、按分、併用不可等はEvidenceに従う。
- 事故日からの順算期間と、申告日等から遡るlookback期間を区別する。
- 年間Limitの集計年度を会員年度または暦年と推測しない。

### Boundaries

CoverageはInsurance Product全体、Claim、事故、支払結果ではない。金額上限、自己負担、対象外および必要手続は別の責務を持つが、実装構造は本仕様では決めない。

### Examples

- 旅行傷害保険では死亡・後遺障害、疾病治療、携行品等が別Coverageとなり、付帯条件が担保ごとに異なりうる。
- ショッピング保険は購入日からの補償期間、年間上限、1事故の自己負担、対象外を持つ。
- 不正利用補償には申告日を基準とする遡及期間がありうる。

### Counterexamples

旅行保険の「最高○○万円」を全担保・全会員へ共通適用すると、担保別上限、家族条件、利用付帯条件を誤る。

### Temporal Behavior

Insurance Productの有効期間、Coverage period、事故日、購入日、利用付帯を成立させるTransaction、申告日、lookback、請求期限を分ける。

### Evidence Requirements

担保別の公式約款・案内から、対象、Eligibility/Attachment Trigger、Insured Event、Limit、Deductible、Exclusion、付帯方式、期間、請求要件を確認する。不記載部分はUnknownとする。

### Open Questions

- 国内カードにおける特殊保険の実在性と引受対応。
- 複数保険の合算・按分Ruleを共通化できる範囲。
- 逆算型期間と固定会計年度をTemporal Modelへどの粒度で標準化するか。
- Eligibility/Attachment TriggerとInsured Eventの共通語彙。
- shared annual pool、sublimit、最大値capの共通Rule範囲。
- Claim Requirementと条件付きExclusionの境界。
