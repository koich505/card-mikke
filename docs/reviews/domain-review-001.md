# Domain Specification Review 001

Review date: 2026-08-07  
Review target: `docs/spec/domain/`  
Research baseline: `docs/research/02-market-corpus-v2-audited.md`, `docs/research/03-domain-counterexample-audit.md`

## 総評

主要な分離原則、特に Actor / Role、Payment Instrument / Payment Scheme / Funding Method、Regulatory Registration / Legal Classification、Product Lifecycle / Feature Lifecycle、Member Reward / Partner Revenue Share は概ね仕様へ反映されている。

ただし、概念定義どうしの矛盾、正本で裏づけられない v1 由来の具体例、Evidence と Disclosure Status の責務配置に Major finding がある。これらは Requirements で誤った概念境界や「確認済み事実」を前提にする原因となるため、Architecture 前ではなく Requirements 利用前に解消すべきである。

## Critical

該当なし。

## Major

### M-1: Deposit が Funding Method に含まれる定義と、含まれない定義が併存している

- `05-payment-and-credit.md:121` は Funding Method の対象に「保証金」を含める。
- 同ファイル `:249` および `07-rules.md:250` は、Deposit / Deposit Rule は Funding Method ではないと明記する。
- `11-scenarios.md:101` も両者を分離する。

同じ仕様内で概念の包含関係が反転している。Kyash 反例から導いた Instrument / Funding 分離を、デポジット型カードへ適用する際に誤分類を生む。Funding Method の責務から保証金を外すか、Deposit との境界を再定義する必要がある。

### M-2: Member が Role、契約主体、利用者分類、状態保持対象を同時に担っている

- `01-glossary.md:27` と `04-membership-and-issuance.md:7` は Member を Role と定義する。
- `04-membership-and-issuance.md:15` は個人、法人、法人代表者、家族会員、社員利用者を「契約上の単位」として Member の Identity 候補にする。
- 同ファイル `:19` は申込・審査・発行まで Member の Lifecycle に含めるが、申込者、契約主体、カード利用者、Issuance の状態境界が未分離である。
- 一方、`01-glossary.md:7` では個人は Actor になりうるとされる。

このままでは「Actor が Member Role を担う」のか「Member 自体が契約主体 Entity なのか」が定まらず、法人カード・家族カード・社員利用者で Entity / Role / State が混在する。OQ-8 が未解決である以上、少なくとも現時点の Member が何を表し、何を表さないかを一貫させる必要がある。

### M-3: Member Reward と Benefit の包含関係が循環・重複している

- `06-rewards-and-economic-flows.md:7` は Member Reward に無料宿泊と会員ステータスを含める。
- 同ファイル `:115` は Benefit を「Member Reward を含む総称」としつつ、無料宿泊とホテルステータスを Reward 以外の例として再掲する。
- `01-glossary.md:37-38` は Reward と Benefit を別語として定義するが、境界が上記本文と一致しない。
- `07-rules.md:170` は Reward Rule が Member Reward と Benefit の双方を決めるとしており、重複を固定している。

Reward が Benefit の下位概念なら、無料宿泊・ステータスが Reward か非 Reward Benefit かを決める必要がある。決められない場合は未解決境界として残すべきであり、双方へ同じ実例を所属させるべきではない。Partner Revenue Share との分離はできているが、会員向け便益内部の分類が不安定である。

### M-4: Disclosure Status を Source 自体の必須属性としている

- `09-evidence-model.md:13` と `:53` は Source が Disclosure Status を持つことを必須とする。
- 同ファイル `:226` と `:266` は Domain Fact にも同じ Status を持たせる。
- Evidence Policy が要求する区別は、ある claim の開示・確認状態に関するものである。同一 Source が、ある条件は disclosed、別の条件は partially_disclosed、記載のない事項は unknown という複数状態を同時に持ちうる。

Source 単位の単一 Status は Source / Evidence / Domain Fact / Value の責務を混同し、unknown と undisclosed の誤分類を誘発する。Status の評価対象を claim、Observation、Extracted Fact、Domain Fact のどこに置くかを明確にし、Source 自体の性質と分離する必要がある。

### M-5: 指定された正本で直接裏づけられない v1 由来の事実が仕様例・Scenario・Invariantに混入している

該当例:

- JCBゴールド ザ・プレミアの招待・年会費・家族会員条件: `04-membership-and-issuance.md:37,203,212`、`07-rules.md:146`、`11-scenarios.md:63,113`
- 三井住友カードのデュアル発行・2枚目年会費: `03-products.md:149`、`04-membership-and-issuance.md:147`、`07-rules.md:305`、`10-invariants.md:12`、`11-scenarios.md:23,31-33,113,143`
- 家族カードの構造: `11-scenarios.md:35-43`
- 「招待日和」: `01-glossary.md:38`

`11-scenarios.md:113` は一部を v1 由来と認め、「v2/03で反証されていない」ことを補助Evidenceとしている。しかし、反証がないことは支持Evidenceではなく、`09-evidence-model.md:86` の confirmation bias 禁止にも反する。v1 は履歴用途に限定されるため、これらを Domain Fact の例として使うなら v2 相当の一次確認が必要であり、それまでは未確認の例・調査課題として明示すべきである。

### M-6: 新規受付を Product Feature と Offering / Application Route の両方に配置している

- `03-products.md:174,203` は「受付」「新規受付」を Product Feature とする。
- 同ファイル `:64-80,102-104` は申込対象・経路・期間と受付停止を Offering の責務・Lifecycle とする。
- `04-membership-and-issuance.md:172-188` は Application Route にも受付停止Lifecycleを持たせる。
- `11-scenarios.md:147-151` は新規入会停止の対象を「ProductまたはOffering」として確定しない。

セゾンゲーミングカードDigitalの段階的終了を表現する必要性は支持されるが、「申込受付」を Feature とみなすか Offering / Route の利用可能性とみなすかは別問題である。現状は同一Eventの所有境界が三重化され、Product Lifecycle / Feature Lifecycle 分離をかえって曖昧にしている。

### M-7: International Brand を Actor Role と確定的に使用しつつ、概念境界を未解決のまま残している

- `01-glossary.md:16` は International Brand を Role とする。
- `02-actors-and-roles.md:93` や `03-products.md:135` も Role として関係づける。
- しかし `02-actors-and-roles.md:111` は Actor Role か別Conceptかを Open Question としている。

「Mastercard」というブランド／ネットワーク識別子と、その運営Actorが担うRoleは同一ではない。未解決であるなら仕様全体で Role として確定利用せず、ブランド値・ネットワーク・運営Actor Role のどこまでが確認済みかを分ける必要がある。これは Payment Instrument / Payment Scheme / Funding Method 分離と同じく、主体と分類値の混同を避けるための境界問題である。

## Minor

### m-1: Research 参照パスが文書位置から見て不正確である

`00-scope.md:14-16` の `research/...` は、`docs/spec/domain/` からの相対パスとしては対象ファイルを指さない。正本への追跡性を保つため、リポジトリルート基準であることを明記するか、正しい相対パスに統一すべきである。

### m-2: Status 語彙・表記が統一されていない

`00-scope.md:51-58` の正式語彙に対し、各文書で `Provisional`、`provisional`、`Supported but provisional` が混在する。特に `06-rewards-and-economic-flows.md:230` の「Provisional」と `12-open-questions.md:35-44` の区分が同一Decision Statusか判別しづらい。

### m-3: Legal Classification の Lifecycle に事業者登録変更を直接含めている

`05-payment-and-credit.md:179-181` は Legal Classification の変更要因として「事業者登録変更」を挙げる。登録変更と取引分類は別軸であり、登録変更は再評価の契機にはなっても分類変更を直接意味しない。因果を示唆しない表現に直すべきである。

## Open Question

### OQ-R1: External Membership の責務は、既に本文で解決済みなのか未解決なのか

`04-membership-and-issuance.md:62-88` は External Membership / Account が Eligibility、Application Route、Reward Destination、Asset Holding、Economic Flow に作用すると定義する。一方 `12-open-questions.md:13` の OQ-7 は「単なるEligibilityに留めるか」を未解決としている。本文が working decision なのか、仮説の例示なのかを明確にする必要がある。

### OQ-R2: Partner Revenue Share は独立Concept候補なのか、Economic Flow の事例なのか

`06-rewards-and-economic-flows.md:218-267` は完全なConcept形式で定義しているが、同ファイル `:230` と `12-open-questions.md:11,41` は独立採用を未決としている。未解決事項を形式上確定したConceptに見せないため、候補概念としての扱いを文書構造でも明示すべきである。

### OQ-R3: Account と External Membership を一つのConceptに束ねる根拠は十分か

`01-glossary.md:28-29` では別項目だが、`04-membership-and-issuance.md:58` 以降では `External Membership And Account` として一体化する。団体所属、ホテル会員資格、暗号資産口座は、資格・契約・資産保有の性質が異なる。03 EC-3 が要求するのは同一外部アカウント参照の保持であり、Membership と Account の概念統合までを支持してはいない。

### OQ-R4: Product / Service / Payment Instrument の境界をどこで決めるか

`03-products.md:7` は Product を商品またはサービスのまとまりとし、`05-payment-and-credit.md:7` はカードレス購買決済も Payment Instrument 候補とする。一方 OQ-9 ではこの境界を未解決としている。Paidy、Kyash、パーチェシングサービスを同じ Product 定義で扱うための識別基準は、OQ-3 と OQ-9を横断して整理する必要がある。

### OQ-R5: unknown と partially_disclosed の分解単位をどうするか

`09-evidence-model.md:277` は partially_disclosed の不足部分を unknown または undisclosed に分けるとしているが、複合claimをどの粒度で分解するかは未定義である。例えば全弁協の収益帰属は disclosed、分配率・終了後継続は unknown であり、Source全体やEconomic Flow全体へ単一Statusを付けると区別できない。M-4と併せ、Statusの評価対象とclaim粒度を未解決事項として明示すべきである。

## 確認できた適合事項

- Actor-level Regulatory Registration から Transaction-level Legal Classification を導出しない原則は、`02-actors-and-roles.md`、`05-payment-and-credit.md`、`10-invariants.md`、Scenario 19で一貫している。
- Payment Instrument / Payment Scheme / Funding Method の分離は、Depositに関するM-1を除き、KyashとPaidyの反例を適切に反映している。
- Product Lifecycle / Feature Lifecycle / Partnership Lifecycle / Issuance Lifecycle を分離する原則は明示されており、セゾンゲーミングカードDigitalと弁護士VISAビジネスカードの反例を概ね保持している。
- Member Reward と Partner Revenue Share / Economic Flow を同一視しない原則は一貫している。
- unknown、undisclosed、partially_disclosed、disclosed の4区分自体は明示され、未確認を「存在しない」としないInvariantも維持されている。
- 名称上の後継関係から契約・資産連続性を推論しない原則は、Product、Lifecycle、Scenario、Invariantへ一貫して反映されている。
