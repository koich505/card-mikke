# Invariants

Research Evidenceから導くDomain Invariantを以下に定義する。Invariantは実装上の制約ではなく、ドメイン理解で常に守るべき制約である。

| # | Invariant | Evidence / Counterexample | Scope | Confidence |
|---|---|---|---|---|
| 1 | Unknownを推測値で補完しない | atone登録区分、Kyash「イマすぐ入金」提供元登録状況、bitFlyer VISAプリペイド現存状況はUnknownとして残されている | Evidence、Legal、Payment | high |
| 2 | UndisclosedをUnknownと同一視しない | JCBや招待条件の一部は存在するが非公開。未調査のUnknownとは異なる | Evidence、Rule | high |
| 3 | Source取得日と有効開始日を混同しない | 2026-08-07に取得したセゾンゲーミング終了告知は、2025-03-31終了Factを示す | Temporal | high |
| 4 | 将来適用Ruleを現在Ruleとして返さない | Marriott Bonvoy Amexの2025-08-21改定のように、告知と適用日を分ける必要がある | Rule、Temporal | high |
| 5 | 同じ対象・条件・期間で矛盾するRuleを無条件にCurrentとしない | v1とv2のPaidy、UCSカードmajica、JCA会員数の訂正 | Evidence、Rule | high |
| 6 | Variant差をProduct共通値として潰さない | UCSカードmajicaではVisa/Mastercard/JCBのブランド表示が確認されるが、各差異のRuleはEvidence単位で扱う | Product、Variant | medium |
| 7 | 国際ブランド有無と法的与信分類を同軸に置かない | Paidyはブランド非依存だが登録事業者、UCSカードmajicaはブランド付き、Kyashはプリペイド | Payment、Legal | high |
| 8 | ActorとActor Roleを同一視しない | bitFlyer クレカではアプラスとbitFlyerの責務が分離する。Mastercard表示は暫定的なBrand / Network Identifierであり、Roleと確定しない | Actor | high |
| 9 | Actorの登録区分からTransaction Legal Classificationを自動導出しない | Paidyは包括信用購入あっせん業者登録済みだが、個別Scheme分類は登録Factだけでは確定しない | Legal、Payment | high |
| 10 | Payment Instrument、Payment Scheme、Funding Methodを混同しない | Kyash CardはVisaプリペイド型Instrument、「イマすぐ入金」は後払い型Funding Method | Payment | high |
| 11 | Product LifecycleとFeature Lifecycleを混同しない | セゾンゲーミングカードDigitalは新規停止、Feature終了、クレジット機能限定、自動解約が段階的 | Product、Temporal | high |
| 12 | Product終了とPartnership終了を混同しない | 弁護士VISAビジネスカードは提携終了として観測され、既存会員扱いはUnknown | Product、Partnership | medium |
| 13 | Application RouteとEligibilityを同一視しない | アメックス・ゴールド・プリファードは一般申込と切替Routeが並存し、全弁協は外部団体限定Route | Offering、Membership | high |
| 14 | 招待経験と商品構造上の招待制を混同しない | アメックス・ゴールド・プリファードは直接Web申込可能 | Offering | high |
| 15 | 外部サービス資格が必要なBenefitをカード保有だけで成立扱いしない | bitFlyerアカウント、Marriott Bonvoy、Hilton Honorsなど外部会員・アカウントが関与 | Membership、Reward | medium-high |
| 16 | Member RewardとPartner Revenue Shareを同一視しない | 全弁協の手数料収入は会員本人ではなく協同組合へのEconomic Flow候補 | Reward、Economic Flow | medium |
| 17 | CryptoConversionRule相当の必要性をbitFlyer事例で否定しない | bitFlyer クレカは変換RuleよりActor Role分離を示す | Reward、Actor | high |
| 18 | 名称上の後継関係から契約・資産連続性を推論しない | セゾンゲーミングカードからDigitalは新規契約で、コイン自動移行なし | Product、Lifecycle | high |
| 19 | 単一事例だけで新しい独立Conceptを確定しない | NominalSuccessorRelationはセゾンゲーミング1事例のみ | Product | high |
| 20 | Tier4だけで重要Legal Factを確定しない | v1の誤りはTier4依存や一次確認不足から発生した | Evidence | high |
| 21 | Applicant、Reviewed Party、Contract Party、Member、Cardholder/User、Beneficiaryを相互に自動変換しない | 法人・家族・招待・保険でRoleが分かれる | Actor、Membership | high |
| 22 | Issuer、Billing Entity、Benefit Provider、Campaign Sponsor、Insurance Underwriter、Claims Handlerを同一Actor Roleと仮定しない | 複数主体が商品・請求・特典・保険に関与する | Actor | high |
| 23 | Product、Offering、Variant、契約、Account、Issuance、Payment Instrument、媒体、Identifier、Credit Facilityを同一視しない | 複数媒体、ETC、法人カード、共有枠 | Product、Issuance、Credit | high |
| 24 | 1契約、1Issuance、1Instrument、1媒体、1Identifier、1Credit Facilityが常に一対一になると仮定しない | 複数素材カード、追加カード、共有枠 | Issuance、Credit | high |
| 25 | Product、Offering、Route、Feature、Rule、Reward、Benefit、Campaign、Insurance、Coverage、Issuance、TransactionのLifecycleを統合しない | 追加Research 06〜13の非同期変更 | Temporal | high |
| 26 | Ruleの公開・有効期間と集計・判定・付与・利用・失効期間を同一視しない | Reward、Fee、Campaign、Insuranceで複数期間が存在 | Rule、Temporal | high |
| 27 | Campaign条件充足をReward確定付与または抽選当選と同一視しない | 抽選、予算、早期終了が存在 | Campaign | high |
| 28 | Feeの「無料」を他のFee、全期間、全Issuanceへ拡張しない | 本カード、家族、ETC、発行料で条件が異なる | Rule | high |
| 29 | Billing Cycle、Reward/Campaign集計期間、Coverage periodを相互に自動導出しない | 各期間の責務が異なる | Temporal、Billing | high |
| 30 | Credit Limit、利用可能額、媒体別統制上限、取引上限を同じ値として扱わない | 法人・家族・共有枠 | Credit | high |
| 31 | Insurance Product、Coverage、Benefit表示、会員保障制度を名称だけで同一分類にしない | 担保別条件と法的性質が異なる | Insurance | high |
| 32 | 複数保険・カードの補償額をEvidenceなしに単純加算しない | 最大値キャップが複数事例で確認された | Insurance | high |

## Conflict Handling

- v1とv2が矛盾する場合はv2を優先する。
- v2と03が概念評価で異なる場合は、02を市場事実の正本、03を反証と設計示唆として扱う。
- Evidenceが不足する場合、RequirementsではUnknown許容の要件に落とし、Architectureで固定列挙や必須値にしない。

## Confidence Policy

- `high`: 複数または一次Sourceで直接確認でき、反証も明確に評価済み。
- `medium`: Evidenceはあるが、追加事例、法的分類、対象範囲に不確実性がある。
- `low`: 存在や条件が限定的にしか確認できない。
- `unknown`: 判断材料がない、または今回Researchの範囲外。
