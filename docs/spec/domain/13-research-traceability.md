# Research 04-13 Traceability

本表は追加Researchの結論とUnknownをDomain Specificationへ追跡するための対応表である。ResearchはEvidenceであり、表中の対応先を実装構造として確定するものではない。

| Research | Main observations reflected | Domain destinations | Remaining status |
|---|---|---|---|
| 04 提携・法人・ハウスカード | 共同・地域Issuer、法人契約と利用者、パーチェシング、受益者、house card候補 | 02、03、04、05、06、12 | 法的責任、カードレス境界、純粋house card等はUnknown |
| 05 Product・Variant・Issuance | ブランド、grade、design、素材、ETC、複数媒体、変更・再発行 | 03、04、07、08、12 | 各差異のProduct同一性はProduct別に判定 |
| 06 Lifecycle・Timeline | 対象別Lifecycle、段階的終了、独立期間、後継と移行 | 03、04、08、10、11、12 | 共通Event語彙はProvisional |
| 07 Campaign条件 | 条件木、上限、重複、抽選、予算、早期終了、実施回 | 07、08、14、10、11、12 | 非公開予算・抽選ロジックはUnknown/undisclosed |
| 08 Reward・Points | 多段階算定、cap、制度世代、中間価値、付与・交換・失効 | 06、07、08、10、11、12 | Reward/Benefit下位境界は一部Provisional |
| 09 Benefit・Service | Provider、利用者、経路、登録、上限、除外、Feature変更 | 02、06、07、08、10、11、12 | 外部Service契約境界は個別確認 |
| 10 Annual/Card Fees | Issuance・媒体別Fee、初年度/次年度、免除条件、集計window | 03、04、07、08、10、11、12 | 一部例外・繰越条件はUnknown |
| 11 Payment・Billing・Credit Limit | Billing Cycle、共有/個別枠、取引状態、Scheme変更、枠回復 | 02、05、07、08、10、11、12 | 再引落し、海外利用等は一部Unknown |
| 12 Insurance・Compensation | Insurance Product、Coverage、担保別条件、合算、遡及、Underwriter | 02、06、07、08、15、10、11、12 | 特殊保険・一部引受対応はUnknown |
| 13 Invitation・Eligibility | 招待、一般申込、資格、審査、発行の分離、家族・法人Role | 02、03、04、07、08、10、11、12 | 招待・審査ロジックはundisclosedを維持 |

## Traceability Rules

- 各Researchの一次Source到達状況とconfidenceを保持し、第三者SourceだけのObservationを確定Invariantへ昇格させない。
- Research内のUnknownは「存在しない」へ変換せず、該当ConceptのOpen Questionsまたは`12-open-questions.md`へ移送する。
- 同名制度・商品・特典の世代差は有効期間とEvidenceで分ける。
- 04〜13が02・03と矛盾する場合は、Source tier、確認日、対象claim、適用期間を比較し、機械的に新しい文書を優先しない。

## Requirements Impact

RequirementsではProvisionalな境界を固定列挙や必須値へ変換しない。Campaign、Insurance、Billing/Creditを表示対象にする場合は、本仕様の独立した責務とUnknownを引き継ぐ。ArchitectureやDB構造の決定はBlocking Open Questionsの解消後に行う。

## Unknown Traceability

主要Unknownの個別群は`12-open-questions.md`のResearch Unknown Registerを正本とする。特にresearch 07の早期終了・家族適用・紹介条件、09の外部Provider/利用経路、11の再引落し・海外利用・枠回復、12の国内CDW・別建て不正利用補償・弁護士費用/サイバー/法人補償・Underwriter対応・廃止後代替、13の招待/審査ロジックを包括語だけで消さない。
