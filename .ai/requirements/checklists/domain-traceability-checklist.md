# Domain Traceability Checklist

## 使用目的

RequirementsがDomain SpecificationのConcept、境界、不変条件、Evidence方針、Open Questionを正しく引き継いでいるか確認する。

各項目を`Pass`、`Fail`、`Not Applicable`、`Open Question`で判定し、根拠となるDomain文書とRequirement IDを記録する。

## Evidence and Disclosure

- [ ] 重要なDomain FactをEvidenceおよびSourceまで追跡できる要求がある。
- [ ] unknown、undisclosed、partially_disclosed、disclosedを区別して保持・表示できる要求がある。
- [ ] Source全体へ単一のDisclosure Statusを付けていない。
- [ ] retrieved、published、announced、effective等の時点を混同していない。
- [ ] SourceがClaimを裏付けない場合に推測値で補完しない。
- [ ] v1由来Factを、v2相当の一次Source確認なしに現行Factとして採用していない。

## Concept Boundaries

- [ ] ActorとActor Roleを分離している。
- [ ] Applicant、Contract Party、Cardholder / User、Member Role、Issuanceを同一視していない。
- [ ] Product、Offering、Variantを同一視していない。
- [ ] Payment Instrument、Payment Scheme、Funding Method、Credit Providerを混同していない。
- [ ] Regulatory RegistrationからTransaction Legal Classificationを自動導出していない。
- [ ] Member RewardとPartner Revenue ShareまたはEconomic Flowを混同していない。
- [ ] Product LifecycleとFeature Lifecycleを混同していない。
- [ ] Offering availabilityとApplication Route availabilityを必要に応じて区別している。
- [ ] Brand / Network IdentifierをNetwork Operator Roleまたは法的分類として扱っていない。

## Domain Open Questions

- [ ] OQ-8のActor／Member境界を確定済みとして扱っていない。
- [ ] OQ-16のReward／非Reward Benefit境界を確定済みとして扱っていない。
- [ ] OQ-17のClaim分解粒度を根拠なく固定していない。
- [ ] OQ-18のv1由来Factを確認済みとして扱っていない。
- [ ] OQ-19のBrand／Network／Operator Role境界を確定済みとして扱っていない。
- [ ] Architecture blocking Open QuestionをDB、API、固定列挙等へ変換していない。
- [ ] Requirementsで扱うべきOQ-14のEvidence retention policyを明示的に検討している。

## Traceability Records

- [ ] `06-traceability.md`から関連するDomain文書、Concept、Invariant、OQを追跡できる。
- [ ] Domain上ProvisionalなConceptはRequirementsでも確定事項として表現されていない。
- [ ] Domainとの不一致が必要な場合、その理由と承認者が明示されている。
- [ ] 追加Researchが必要な事項に、対象Factと必要なSource種別が記載されている。
