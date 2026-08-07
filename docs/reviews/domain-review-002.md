# Domain Specification Review 002

Review date: 2026-08-07  
Review target: `docs/spec/domain/`  
Previous review: `docs/reviews/domain-review-001.md`  
Review scope: Major findings M-1 through M-7 の解消確認

## 結論

M-1〜M-7について、元レビューで指摘された仕様内の直接的な矛盾または未確認Factの確定利用は解消されている。

- Resolved: M-1、M-4、M-6
- Partially resolved: M-3
- Not resolved: なし
- Converted to explicit Open Question: M-2、M-5、M-7

Domain Specificationは、Requirements作成の入力として利用可能である。ただし、未解決事項を確定事項として扱わず、Unknownを許容する要件と、Architectureで固定してはならない境界を引き継ぐことが条件となる。

## Major findings follow-up

### M-1: Deposit と Funding Method の包含関係

**Classification: Resolved**

- `05-payment-and-credit.md:121` はFunding Methodから保証金を明示的に除外した。
- 同ファイル `:143`、`:250` と `07-rules.md:258` も、Deposit / Deposit RuleはFunding Methodではないと一貫している。
- `11-scenarios.md:96-102` でもDeposit、Credit Limit、Payment Instrument、Funding Methodを分離している。

保証金をFunding Methodへ含める定義は残っておらず、包含関係の反転は解消された。

### M-2: Member における Role、契約主体、利用者分類、状態の混在

**Classification: Converted to explicit Open Question**

- `01-glossary.md:29-32` はApplicant、Contract Party、Cardholder / User、Member Roleを別のRoleとして定義した。
- `04-membership-and-issuance.md:7-19` はMemberをActorが担うMember Roleに限定し、申込、契約当事者性、利用、Issuance状態の責務を分離した。
- 法人、代表者、家族・追加カード利用者、社員利用者への具体的なRole割当は、同ファイル `:51-54` および `12-open-questions.md` のOQ-8に未解決事項として明示された。

Member自体の責務混在は解消された。一方、具体的な主体へのRole割当はEvidence不足のため確定せず、OQ-8へ正しく移管されている。

### M-3: Member Reward と Benefit の循環・重複

**Classification: Partially resolved**

- `01-glossary.md:42-43` と `06-rewards-and-economic-flows.md:33`、`:114`、`:139-140` は、RewardをBenefitの下位概念とする方向で統一した。
- 無料宿泊、ホテルステータス、ラウンジ等はworking boundary上の非Reward Benefitとされ、同じ便益をRewardと非Reward Benefitの双方へ所属させないInvariantが追加された。
- `07-rules.md:166-188` はReward RuleをMember Rewardに限定し、非Reward Benefitの成立条件と分離した。
- ただし、マイル、宿泊ポイント、交換可能な無料宿泊証書等の境界は `06-rewards-and-economic-flows.md:51-55` およびOQ-16に残る。

元の循環定義と具体例の二重所属は解消されたが、Reward / 非Reward Benefitの下位境界はworking decisionであり、全便益への分類基準は未確定である。

### M-4: Source 自体への単一 Disclosure Status の付与

**Classification: Resolved**

- `09-evidence-model.md:13`、`:26`、`:45` は、Source全体には単一Disclosure Statusを付けないと明記した。
- 同ファイル `:76`、`:121`、`:165`、`:194-195`、`:226-235` は、Statusを個別claim、Observation、Extracted Fact、Domain Factへ配置した。
- claimの最小分解粒度はOQ-17として明示されており、未決の粒度をSource単位のStatusで代替していない。

Source metadataとclaimの開示・確認状態の責務分離が一貫しており、元の混同は解消された。

### M-5: v1 由来の未確認Factの仕様例・Scenario・Invariantへの混入

**Classification: Converted to explicit Open Question**

- JCBゴールド ザ・プレミアの具体条件、三井住友カードのデュアル発行・2枚目年会費、「招待日和」を確認済みFactとして用いる記述は除かれた。
- `07-rules.md:292-304` はMulti Card Relationship Ruleの具体例が現行baselineでは未確認であると明記した。
- `11-scenarios.md:23-33`、`:105-113` は、複数カード条件および条件付き年会費の具体例をResearch gapとして扱う。
- `12-open-questions.md` のOQ-18は、v1由来のデュアル発行、家族カード、JCBゴールド ザ・プレミア条件を、一次Sourceで再調査するまで現行Factに採用しないと明示した。
- `09-evidence-model.md:65-68` の「反例が見つからない」をStrong evidenceにしない原則も維持されている。

未確認事実の確定利用は解消されたが、当該市場事実自体は未確認のため、Research gapとしてOQ-18へ移管されている。

### M-6: 新規受付の Feature / Offering / Application Route への重複配置

**Classification: Resolved**

- `03-products.md:166-201` は、申込受付可否をProduct Featureから除外し、Offering availabilityまたはApplication Route availabilityへ配置した。
- Offering全体の提供可否と個別Routeの利用可否を区別し、同一Eventを重複記録しないInvariantを置いた。
- `11-scenarios.md:145-151` は、商品の新規受付停止をOffering availabilityとして扱い、特定Routeだけの停止をRoute availabilityとして分けた。

Featureと申込受付の所有境界は明確になった。OfferingとApplication Routeの双方にLifecycleがある点も、対象範囲の差として説明されている。

### M-7: International Brand の Actor Role 確定利用と未解決境界の併存

**Classification: Converted to explicit Open Question**

- `01-glossary.md:16-18` はBrand / Network Identifier、Payment Network / Scheme、Network Operator Roleを分離し、いずれも暫定的な境界としている。
- `02-actors-and-roles.md:109-117` はブランド表示をActor Roleと確定せず、表示から運営Actor、責務、法的分類を推論しないと明記した。
- `10-invariants.md:14` もMastercard表示を暫定Identifierとして扱い、Roleと確定しない。
- 名称、粒度、対応関係はOQ-19へ明示的に移管された。

IdentifierとActor Roleの確定的な混同は解消されたが、ネットワークおよび運営Roleの最終的な概念境界はResearch不足のため未解決である。

## Requirements readiness

**判定: Ready（条件付き）**

Domain SpecificationはRequirements作成の入力として使用できる。M-1〜M-7に起因する、Requirements開始を止めるMajor findingは残っていない。`00-scope.md` と `12-open-questions.md` も、各Open Questionについて `Blocks Requirements: No` とし、Requirements作成へ進む方針で一致している。

Requirementsでは、少なくとも次を制約として引き継ぐ必要がある。

- OQ-8、OQ-16、OQ-17、OQ-18、OQ-19を確定済みの概念境界または市場Factとして扱わない。
- unknown、undisclosed、partially_disclosed、disclosedを保持し、未確認値を必須値や固定列挙へ押し込まない。
- Requirements作成とArchitecture決定を混同せず、`12-open-questions.md` がArchitecture前の解決を要求する事項を先取りして固定しない。
- v1由来Factを利用する場合は、OQ-18に従ってv2相当の一次Sourceで再確認する。

したがって、Requirementsへの入力としては準備完了だが、ArchitectureやDB設計へそのまま進める状態ではない。
