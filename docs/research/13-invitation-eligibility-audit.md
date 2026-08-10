## 調査の位置づけ

本調査は`01-market-corpus-v1.md`・`02-market-corpus-v2-audited-2.md`（正本）・`03-domain-counterexample-audit-3.md`を前提とし、02を市場事実の正本、03を既存ドメインモデルへの反証調査として扱う。今回のスコープは、申込資格（Eligibility Rule）と申込経路（Application Route）の分離、および条件達成・招待・申込・審査・発行の順序関係に限定した追加反例探索である。商品スペック・年会費恒常額・保険約款・キャンペーン規約そのものの網羅調査は対象外とし、あくまでEligibility/Application構造に付随する範囲で扱う。DBテーブル・カラム・API・画面は確定しない。人気ランキングではなく構造の異なる実例・反例の発見を目的とし、原則として異なる発行会社から2〜3件の独立事例を確認したうえで一般化の可否を判断する。[^1][^2][^3]

***

## パターン1: 完全招待制・一般申込ボタンが存在しない（条件達成が招待を保証しない）

**構造パターン名**: Pure Invitation-Only, No Self-Application Route, Undisclosed Criteria

代表事例としてJCBザ・クラス、ダイナースクラブ プレミアムカード、セブンカード・プラス（ゴールド）の3社独立事例を確認した。いずれも「一般申込ボタンが存在しない」「招待の具体的基準が非公開」という共通構造を持つが、招待対象母集団は商品ごとに異なる。

| 項目 | JCBザ・クラス | ダイナースクラブ プレミアムカード | セブンカード・プラス（ゴールド） |
|---|---|---|---|
| 対象単位 | Product（招待制上位グレード） | Product（招待制上位グレード） | Variant（既存カードの上位グレード） |
| 観測された事実 | 「JCBが定めた条件を満たした方を招待します」とのみ記載、条件非公開[^4] | ダイナースクラブカード会員向けの招待制最上位カードと明記[^5][^6] | 「特にご愛顧いただいております会員様へ」送付とのみ記載、条件は一切非公開と公式FAQで明言[^7] |
| 適用条件（推測、Tier4） | JCBプラチナ等での年間高額利用の継続（推測、確定情報ではない）[^8][^9] | ダイナースクラブカード会員であることが前提と推測されるが、公式に招待基準は非公開 | セブンカード・プラス利用者、Tier4推定で「年間100万円以上」または「セブン&アイグループで月5万円/年60万円以上」（口コミベース、公式否定はしていないが確定できない）[^7][^10][^11] |
| 対象者・対象取引 | Unknown（公式非公開） | Unknown | セブンカード・プラス既存会員のみ（新規セブンカード・プラス自体は2026年6月30日新規申込終了予定と報道あり[^12]） |
| 除外条件 | Unknown | Unknown | Unknown |
| 金額・率・回数・上限 | 年会費55,000円（税込、Tier4）[^9] | Unknown（一次未取得） | 年会費永年無料（本会員・家族会員とも）[^10] |
| 開始日・終了日・集計期間 | 招待時期はTier4推定で例年11-12月[^13] | Unknown | 集計期間は公式に非公開。Tier4推定は年1回・時期不定[^11] |
| 関係する事業者と役割 | Issuer/Brand/Billing: 株式会社ジェーシージー（単一主体） | Issuer/Brand/Billing: 三井住友トラストクラブ／ダイナースクラブジャパン（単一主体想定、詳細要確認） | Issuer/Billing: 株式会社セブン・カードサービス、Brand: JCB[^10] |
| 現在の状態 | 新規受付中（招待経由のみ） | 新規受付中（招待経由のみ） | 新規受付中（招待経由のみ）。母体のセブンカード・プラス自体が新規受付終了予定であるため、将来的な招待対象母集団縮小の可能性あり[^12] |
| 公式一次情報URL | https://www.jcb.co.jp/premium/theclass/open.html | https://www.diners.co.jp/ja/cardlineup/dinersclub_premiumcard.html | https://www.7card.co.jp/（公式FAQへの言及、直接URL要再確認） |
| ページタイトル | JCB ザ・クラス | ダイナースクラブ プレミアムカード | セブンカード・プラス公式 |
| 発行・公開主体 | 株式会社ジェーシービー | ダイナースクラブジャパン | 株式会社セブン・カードサービス |
| 確認日 | 2026-08-10 | 2026-08-10 | 2026-08-10 |
| Evidence Tier | Tier2（構造）／Tier4（具体的閾値） | Tier2（構造のみ、条件は未取得） | Tier2（FAQで「非公開」と明言）／Tier4（推定閾値） |
| Disclosure status | undisclosed | undisclosed | undisclosed |
| Confidence | high（構造）、low（閾値） | medium（構造のみ確認、詳細未取得） | high（構造・非公開の明言） |

**既存文書との整合性**: 02はAmexゴールドプリファードについて「招待を受けた人が存在する」ことと「商品が招待制であること」の混同を是正した。本パターンの3事例はいずれも一般申込ボタンが存在しない真正の招待制であり、02の訂正ロジックに従えば「招待制」区分として妥当に分類できる対照事例である。[^2]

**既存モデルで表現しにくい点**: 「条件達成が招待を保証しない」という非決定的関係を確定的なEligibilityRuleとして表現すると誤りを生む。EligibilityRule（外部推測条件）とInvitationDecision（発行会社内部の非公開裁量判断）を同一エンティティに混在させるべきではない。審査ロジック・招待ロジックはいずれもundisclosedとし、推測値をConfidence: highの事実として扱わないことが必須である。

**順序モデル**: 条件達成（内容はundisclosed）→ 招待（発行会社内部裁量、時期・基準非公開）→ 申込（招待状記載の書式）→ 審査（招待後も存在するかはUnknown）→ 発行。

**追加確認が必要な点**: 3商品それぞれの招待閾値・集計期間・審査有無の一次確認。セブンカード・プラス本体の新規受付終了後の招待制度存続可否。

***

## パターン2: 一般申込と招待経由アップグレードの併存（招待制の二値区分では表現不能）

**構造パターン名**: Dual Route Coexistence — Self-Apply Product + Separate Invitation-Based Upgrade Channel from Lower Grade

| 項目 | 内容 |
|---|---|
| 商品名 | アメリカン・エキスプレス・ゴールド・プリファード・カード |
| 対象単位 | Variant／Application Route |
| 観測された事実 | 02の監査により「招待制上位カード」という01の記述は誤りと訂正された。公式サイトに直接申込ボタンが存在し、一般申込者が招待なしでオンライン申込可能。既存アメックス・ゴールド会員には別途「切替」導線が並存するが、これは商品構造上の招待制を意味しない[^2] |
| 適用条件 | 20歳以上、安定収入があること（一般申込ルート） |
| 対象者・対象取引 | 一般申込者、または既存アメックス・ゴールド会員（切替ルート） |
| 除外条件 | Unknown（詳細未確認） |
| 金額・率・回数・上限 | 年会費39,600円（税込）[^2] |
| 関係する事業者と役割 | Issuer/Billing/Brand: アメリカン・エキスプレス・インターナショナル,Inc.日本支社（単一主体） |
| 現在の状態 | 新規受付中（2ルート併存） |
| Evidence Tier | Tier2 |
| Disclosure status | disclosed（一般申込条件）／undisclosed（既存会員切替の具体的基準） |
| Confidence | high |

**既存文書との整合性**: 03のExisting Model Assessmentは、招待制/一般公開の二元区分について「専門職団体所属者向け専用ルートのような第三の申込経路パターンを表現できない」と指摘している。本事例はさらに「一般公開＋招待経由の切替」という別の複線構造であり、ApplicationRouteが単一の二値属性ではなく、同一Product/Variantに対して複数のRoute（各々独自のEligibilityRuleと審査有無を持つ）が並行し得る多対多構造であることを示す。[^3]

**既存モデルで表現しにくい点**: ApplicationRouteを商品の属性として単一値で持たせると、一般公開ルートと招待ルートが同一Variantに同時に存在する事実を表現できない。ApplicationRouteをProduct/Variantに従属する複数レコードとして持たせ、各RouteごとにEligibilityRule・審査有無・申込経路（Web／郵送等）を独立管理する必要性が示唆される。

**追加確認が必要な点**: 既存ゴールド会員からの切替時審査有無の一次確認。

***

## パターン3: 既存カード会員限定・年間利用実績による招待（審査あり、集計期間明記）

**構造パターン名**: Existing-Cardholder-Only Upgrade by Disclosed Annual Spend Threshold with Review

| 項目 | 内容 |
|---|---|
| 商品名 | イオンゴールドカード |
| 対象単位 | Variant（既存カードの上位グレード） |
| 観測された事実 | 年間カードショッピング50万円（税込）以上、対象は指定6種のイオンカードの利用者のみ、集計期間は毎年1月11日〜翌年1月10日、審査ありと02で確定（Tier2で再確認済み）[^2] |
| 適用条件 | 指定イオンカード種別の既存会員であること＋年間利用額50万円以上＋審査通過 |
| 対象者・対象取引 | イオンカード（指定6種）の既存本会員のみ |
| 除外条件 | 指定6種以外のイオン系カード会員は対象外（詳細な除外リストはUnknown） |
| 金額・率・回数・上限 | 年間50万円（税込）以上 |
| 開始日・終了日・集計期間 | 毎年1月11日〜翌年1月10日（集計期間として明記） |
| 関係する事業者と役割 | Issuer/Billing: イオンクレジットサービス株式会社 |
| 現在の状態 | 招待のみ（自己申込不可） |
| Evidence Tier | Tier2 |
| Disclosure status | disclosed（金額・集計期間・審査有無すべて公開） |
| Confidence | high |

**既存文書との整合性**: 01ではTier4根拠のみでConfidence: low-mediumとされていたが、02でTier2による確定に格上げされた事例であり、02優先原則の典型的な適用例である。同種の「既存下位カード会員限定＋年間利用額基準＋審査あり」という構造は、後述のセブンカード・プラス（ゴールド、条件完全非公開）と対照させることで、同じ「小売系ゴールド招待制」カテゴリ内でも情報開示度（disclosed対undisclosed）が全く異なる独立2事例として確認できる。この対比自体が反例（同一業態内でDisclosure statusが一律ではない）である。[^2]

**既存モデルで表現しにくい点**: 「招待制」という単一ラベルの下で、条件が公開されている商品（イオンゴールド）と非公開の商品（セブンゴールド）が混在する。EligibilityRuleに`disclosure_status`フィールドを持たせ、同じApplication Route種別（既存会員限定招待）でも条件の可視性が個別商品ごとに異なることを表現する必要がある。

***

## パターン4: 年齢下限・上限を持つ若年層専用商品と、その後の扱いの3類型（自動切替／継続利用／アップグレード不可）

**構造パターン名**: Age-Bounded Products with Divergent Post-Threshold Outcomes

同じ「学生・若年層限定」という表面的分類の下で、少なくとも3種類の異なる終了後挙動が観測され、単一の「学生カード」概念モデルでは表現できないことが確認された。

| 商品名 | 発行会社 | 年齢/属性条件 | 卒業・年齢超過後の扱い | 資産（ポイント等）の引継ぎ | Evidence |
|---|---|---|---|---|---|
| 学生専用ライフカード | ライフカード | 満18-25歳の在学中学生（進学予定の高校生も可） | 自動的に年会費無料タイプへ切替（申請不要） | 契約情報は引き継がれる | Tier2[^14] |
| 楽天カード アカデミー | 楽天カード | 学生 | 卒業年の6月に通常の楽天カードへ自動切替 | ポイント還元率等は維持（Tier4） | Tier4[^15] |
| 三井住友カード 学生 | 三井住友カード | 学生 | 卒業予定の3カ月前に案内、勤務先等の登録情報更新後に社会人向けカードへ自動切替 | ポイント・利用実績は引き継がれる（Tier4） | Tier4[^16] |
| ANAカードJCB学生 | 三菱UFJニコス（JCB系） | 学生、18〜29歳 | 卒業後は一般カードへ自動切替。ANA JCB CARD FIRSTへのアップグレードパスは存在しない（学生カード保有のままFIRSTへの変更は不可） | Unknown | Tier4（JCB公式のカード切り替え一覧に学生→FIRSTの記載なしとの言及）[^17] |
| 三井住友カード（NL）「U25」還元 | 三井住友カード | 25歳以下（年齢条件のみ、学生限定ではない） | 学校を卒業しても自動切替されない。年齢条件（25歳超過）に達した時点で優待自体が終了するのみで、カード自体の切替は発生しない（01/02） | N/A（優待終了のみ） | Tier2/Tier4混在（01/02で言及済み）[^1][^2]、Tier4補強[^18] |

**Why It Is An Edge Case**: 「学生カード」というラベルは、(a) 学籍という属性に紐づき卒業で自動終了するもの、(b) 年齢のみに紐づき学籍とは独立して年齢到達で終了するもの、(c) 自動切替はするが上位アップグレードパスは提供しないもの、という異なる終了トリガーと遷移先を持つ。ANAカードJCB学生の事例は、自動切替先が必ずしも「同系列上位カード」ではなく「デフォルトの一般カード」であり、ユーザーが上位カードを希望する場合は改めて新規申込が必要という非連続な遷移である点で重要な反例となる。

**既存モデルで表現しにくい点**: `CardUpgradeRelation`と`ProductChangeHistory`のいずれも「学籍終了」と「年齢到達」という異なるトリガー種別を区別する属性を持たない可能性がある。トリガー種別（学籍終了／年齢到達／利用実績）と遷移先（自動切替商品／優待終了のみ／新規申込が必要）を独立した軸として持たせる必要がある。

**追加確認が必要な点**: 学生専用ライフカード・楽天カードアカデミー・三井住友カード学生の一次資料でのポイント引継ぎ有無の完全確認（現状一部Tier4依存）。

***

## パターン5: 法人・個人事業主における申込資格の主体差異（三者分離：法人代表者／個人事業主／従業員）

**構造パターン名**: Applicant Identity Divergence within "Corporate Card" Label

法人カードは「法人代表者」「個人事業主」「従業員（追加カード）」という異なる申込主体を一つの商品ラインで扱う場合があり、それぞれ審査対象・引落口座・付帯サービスが異なることが確認された。

| 項目 | 内容 |
|---|---|
| 対象領域 | Eligibility Rule |
| 観測された事実 | 法人カードの多くは「法人代表者・個人事業主」を主たる申込資格とし、審査は経営者個人の信用情報＋法人としての信用力の両方を対象とする。引落口座は法人口座（一部個人口座可）[^19] |
| 適用条件 | 申込者が「法人の代表者」であるか「個人事業主」であるかにより、審査対象となる法的主体（法人格の有無）が異なる |
| 除外条件 | 従業員は法人代表者名義の追加カードとしてのみ発行可能というケースが一般的（一次情報での網羅確認は本ラウンドでは未達、01では「三井住友カード家族カード・追加カード制度に類する社員カード」として要確認とされていた）[^1] |
| 関係する事業者と役割 | Applicant（法人代表者個人）／Corporate Entity（法人格そのもの）／Issuer（審査主体）が異なる法的主体として並存 |
| Evidence Tier | Tier4（一般的傾向の記述、個別発行会社ごとの一次規約未確認） |
| Disclosure status | partially_disclosed |
| Confidence | medium |

**既存モデルで表現しにくい点**: 「Member」を常に個人として固定する前提が、法人カードの文脈では成立しにくい。法人代表者個人（Applicant/Reviewed Party）と法人格（Billing Entity候補）が分離しており、03がEC-1（全弁協事例）で指摘した「経済的受益者がMemberではない」構造と同様に、「審査対象者」と「契約主体（法人）」が分離するケースが法人カード領域にも存在する可能性がある。[^3]

**追加確認が必要な点**: 個別発行会社（三井住友ビジネスカード、三菱UFJカード ビジネス等）ごとの従業員カード発行要件の一次確認。パーチェシングカード（三菱UFJカード パーチェシング、JCBパーチェシングサービス）は非発行型・カードレスであり、そもそも物理的Applicant個人が存在しない構造であることが02で既に確認されている。[^2]

***

## パターン6: 家族会員の資格要件は本会員と大きく異なる（生計同一性・年齢下限・学生除外の複合条件）

**構造パターン名**: Family Member Eligibility as an Independent Rule Set, Not a Subset of Principal Member Rules

三井住友カード、JCB、イオンカード、ANAカード、JALカードの5社独立事例で、家族会員資格が本会員資格の派生ではなく独立したルールセットであることを確認した。

| 発行会社 | 家族会員資格 | 本会員が学生の場合の扱い | 発行上限人数 | Evidence |
|---|---|---|---|---|
| 三井住友カード | 生計同一の配偶者・満18歳以上の子（高校生除く）・両親 | 本会員が学生の場合は配偶者のみに限定 | 同時申込は1名まで、以降は個別申込 | Tier2[^20] |
| JCB | 生計同一の配偶者・親・子（高校生除く18歳以上） | 本会員が学生の場合は家族カード申込不可 | Unknown | Tier2[^21] |
| イオンカード | 生計同一18歳以上（配偶者［内縁・同性パートナー含む］・親・子） | Unknown | 最大3名まで | Tier2[^22] |
| ANAカード | 生計同一の配偶者・両親・子（高校生除く18歳以上） | Unknown | Unknown（電話申込のみ受付） | Tier2[^23] |
| JALカード | 生計同一の配偶者・両親・18歳以上の子（JALカードSuica・JALダイナースカードは高校生も可） | Unknown | Unknown | Tier2[^24] |

**Why It Is An Edge Case**: JCB・三井住友カードでは「本会員が学生の場合、家族カード発行不可（三井住友は配偶者のみ例外）」という、本会員の属性（学生か否か）が家族会員の申込可否そのものを左右する構造が確認された。これは家族会員のEligibilityRuleが本会員のEligibilityRuleに従属するのではなく、本会員属性を参照する独立した条件式であることを示す。また、JALカードのように「対象カード種別によって高校生の可否が異なる」という、同一発行会社内でも商品（Variant）ごとに家族会員資格が変動する事例も確認された。[^25][^20][^24][^21][^26]

**既存モデルで表現しにくい点**: 家族会員の`EligibilityRule`を本会員の`EligibilityRule`のサブセットとして継承的にモデリングすると、「本会員が学生の場合は家族カード発行不可」という否定条件や、「対象商品によって年齢条件が変わる」という商品単位の例外を表現できない。家族会員の審査は本会員のみが対象（家族会員自身は個別審査を受けない）という点は5社共通で確認できた。[^27][^28][^25]

**追加確認が必要な点**: 家族カード発行上限人数の全社横断的な一次確認（ANA・JALは未確認）。

***

## パターン7: 申込経路別の条件差異（店頭受取制度の終了と経路の非対称性）

**構造パターン名**: Application Channel as a Time-Bound, Independently-Lifecycled Sub-Route

| 項目 | 内容 |
|---|---|
| 対象領域 | Application Route |
| 商品名 | イオンカード（複数種） |
| 観測された事実 | 「カード店頭受取りサービス」は2026年6月1日17:00をもって新規申込受付を終了した。従来はWeb申込＋店頭受取という経路が存在したが、終了後はデジタル即時発行（AEON Payアプリ）のみが当日利用可能な経路として残存[^29][^30] |
| 適用条件 | 終了前は満20歳以上等の条件付きで店頭受取可能、終了後はスマホアプリでの即時発行のみ |
| 現在の状態 | 一部経路終了、代替経路（アプリ即時発行）は一時休止期間（2026年6月15日21:00〜6月26日9:00）を経て再開[^30] |
| 関係する事業者と役割 | Issuer/Billing: イオンクレジットサービス株式会社 |
| Evidence Tier | Tier2（公式終了告知） |
| Disclosure status | disclosed |
| Confidence | high |

**Why It Is An Edge Case**: 同一商品（イオンカード）に対して、複数のApplication Route（Web＋店頭受取、店舗窓口申込、Webのみ＋アプリ即時発行）が異なるライフサイクル（開始日・終了日）を持ち、経路ごとに独立して開始・終了する。これは03のEC-2（セゾンゲーミングカードの機能単位ライフサイクル）と同型のパターンが、商品自体ではなくApplication Route単位でも発生することを示す新規反例である。[^3]

**既存モデルで表現しにくい点**: Application Routeを商品の付随的な列挙値として扱うと、経路ごとの独立した`effective_from`/`effective_to`を持たせる設計になっていない場合、経路の段階的終了を表現できない。

***

## パターン8: 同一発行会社・同一ブランド内での重複保有制限（券種単位の1人1枚原則、ブランド変更迂回）

**構造パターン名**: Same-Issuer Duplicate-Product Restriction Circumvented by Brand Variation

| 項目 | 内容 |
|---|---|
| 対象領域 | Eligibility Rule（重複保有制限） |
| 観測された事実 | JCBオリジナルシリーズでは同一会員が同じ券種（例: JCBカードW）を複数枚保有することは原則不可（1人1枚）だが、国際ブランドを変える、または提携カードなど異なる商品カテゴリを選べば同一発行会社内でも複数保有が可能（Tier4だが構造としては一般的に知られる）[^31] |
| 適用条件 | 「同一名義人が同じ種類のカードを複数枚持つことは通常不可」だが「発行会社が異なれば同一国際ブランドの重複保有は可能」「同一発行会社でも異なる商品カテゴリなら重複保有可能」という二重の例外構造 |
| 利用可能枠の扱い | 同一発行会社（カード会社）が発行する複数カードは、国際ブランドが異なっていても共通枠（合算枠）として扱われるのが基本（Tier4だがカード会社規約に基づく一般知識として広く言及）[^32] |
| Evidence Tier | Tier4（個別発行会社規約の網羅的一次確認は本ラウンドでは未達） |
| Disclosure status | partially_disclosed |
| Confidence | medium |

**Why It Is An Edge Case**: 「同時保有不可」という制約は、(1) 同一商品（同一券種）レベルでのみ適用され、(2) 発行会社レベルでは適用されず、(3) 利用枠は発行会社単位（商品横断）で合算されるという3層構造を持つ。これは`EligibilityRule`（重複保有制限）の適用単位が`CardProduct`（券種）であり、`CreditLimit`（利用枠）の適用単位が`Issuer`（発行会社）であるという、2つの異なる粒度が交差する構造である。三井住友カードのデュアル発行（Visa/Mastercard同時発行、01/02で既確認）は、この「同一発行会社・同一券種でもブランド違いなら複数保有可能」という例外をカード会社側が公式に制度化した事例であり、JCBオリジナルシリーズの「1人1枚原則」とは対照的な設計判断である。[^1]

**既存モデルで表現しにくい点**: 重複保有制限を`CardProduct`単位の単純な一意制約として設計すると、三井住友カードのデュアル発行のような「公式に認められた例外」と、JCBのような「原則不可」が同一モデルで両立しない。制限の適用粒度（Product単位／Variant単位／Issuer単位）を商品ごとに可変にする必要がある。

**追加確認が必要な点**: JCBオリジナルシリーズの重複保有禁止規定の一次規約確認（本ラウンドはTier4のみ）。他発行会社（三菱UFJニコス、クレディセゾン等）における同様の制限の有無。

***

## パターン9: プラチナ帯における年齢下限のみが異なる並行商品ライン（三井住友カードの内部比較）

**構造パターン名**: Age-Threshold Variance Within a Single Issuer's Product Tier Ladder

| 商品名 | 年齢下限 | 年会費（本会員） | インビテーション要否 | Evidence |
|---|---|---|---|---|
| 三井住友カード プラチナプリファード | 満20歳以上 | 33,000円（税込） | 不要（一般申込可） | Tier2[^33][^34] |
| 三井住友カード プラチナ | 満30歳以上 | 55,000円（税込） | 不要（一般申込可、但し招待経路もある可能性は本ラウンド未確認） | Tier2[^33] |
| 三井住友カード Visa Infinite | 満20歳以上（学生を除く） | 99,000円（税込） | Unknown（一次未確認） | Tier2[^33] |

**Why It Is An Edge Case**: 一般に「プラチナ以上は年齢条件が厳しくなる」という単調な序列を想定しがちだが、三井住友カードの内部比較では年齢下限がプラチナプリファード（20歳）＜プラチナ（30歳）という非単調な関係にあり、さらに最上位帯のVisa Infiniteは20歳以上（学生を除く）とプラチナより緩い年齢条件に戻る。年会費・ブランド格上げの序列と年齢条件の序列が一致しないことは、`CardVariant`の「グレード順序」を単一の線形スケールとしてモデリングすると誤りを生む可能性を示す反例である。

**既存モデルで表現しにくい点**: グレード（一般＜ゴールド＜プラチナ＜インフィニット等）を序数として扱い、それに比例して年齢・年収条件が単調増加すると仮定する設計は、本事例により反証される。年齢条件・年会費・招待要否はグレード内でも独立した属性として個別に持たせる必要がある。

**追加確認が必要な点**: 三井住友カード プラチナの招待要否の一次確認（本ラウンドでは一般公開情報として扱われている可能性が高いが、招待経路併存の有無は未確認）。

***

## Eligibility Rule と Application Route の分離、および順序の一般化

今回確認した全事例を横断すると、次の5段階が独立変数として観測される。

1. **条件達成（Condition Achievement）**: 年間利用額、年齢到達、学籍終了、外部資格取得等。disclosed（イオンゴールド）からundisclosed（JCBザ・クラス、セブンゴールド）まで開示度に幅がある。
2. **招待（Invitation）**: 発行会社の内部裁量による通知行為。「条件達成→招待」は確率的関係であり、決定的な保証関係ではない（イオンゴールドのように審査ありと明記される場合を除き、条件達成が招待を保証する一次情報は本ラウンドでも確認できなかった）。
3. **申込（Application）**: 経路は一般Web申込、招待状記載の郵送申込、店頭申込、アプリ即時発行など複数あり、経路ごとに独立したライフサイクル（開始・終了日）を持ちうる（パターン7）。
4. **審査（Underwriting）**: 招待後にも審査が存在する場合（イオンゴールド）と、招待＝発行同義に近い場合（一部完全招待制、Unknown）がある。審査ロジック自体は全事例を通じて非公開（undisclosed）であり、本調査では一切推測していない。
5. **発行（Issuance）**: 即時発行（デジタル）と郵送発行では、当日利用可能な範囲（加盟店限定等）が異なる場合がある（イオン即時発行カード）。

この5段階を単一の`ProductStatus`や`EligibilityRule`に一元化せず、各段階を独立したレコード・イベントとして表現し、特に「条件達成」と「招待」の間、および「招待」と「発行」の間に決定的な保証関係を置かないことが、本ラウンドで確認した反例群から導かれる設計上の示唆である。既存モデルの`ExternalMembershipRequirement`や`CardUpgradeRelation`（03で指摘済み）は、この非決定的な段階遷移を表現する上で見直しが必要な候補として維持される。[^3]

***

## Unknown一覧（本ラウンドで確認できなかった事項）

| 領域 | Unknown内容 |
|---|---|
| 招待審査ロジック全般 | JCBザ・クラス、セブンカード・プラス（ゴールド）、ダイナースクラブ プレミアムカードいずれも招待基準の具体的ロジックは非公開。数値は全てTier4推測であり、公式には未確定 |
| 法人カード従業員向け発行要件 | 発行会社ごとの一次規約は本ラウンドで未確認 |
| 三井住友カード プラチナの招待経路併存有無 | 一般申込可能なことは確認したが、招待経路が別途存在するかは未確認 |
| JCBオリジナルシリーズの重複保有禁止の一次規約 | Tier4情報のみで、JCB公式会員規約の該当条項は本ラウンドで直接確認できず |
| 家族カード発行上限人数（ANA・JAL） | 三井住友・イオンは確認できたが、ANA・JALは電話申込のみで公開ページに上限記載なし |
| ANAカードJCB学生からFIRSTへの変更不可の一次確認 | Tier4（個人ブログ）のみが根拠であり、JCB公式のカード切替一覧原本は未取得 |

これらは「存在しない」と断定せず、いずれもUnknownとして維持する。

---

## References

1. [03-domain-counterexample-audit-3.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/259d7772-eba1-4356-9c51-8199c2b75d62/03-domain-counterexample-audit-3.md?AWSAccessKeyId=ASIA2F3EMEYEZQ3L6MIM&Signature=rCySdQL5ITDmSpMmBWgYdUvn8ss%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIFu2w2u4tN3AqDuynYg1gpfVwtmclsXPxWQhtiQhMAqSAiBS%2BmS%2FsjpDmvOcNgqT5%2FCX3e5ubNeLdTFmr2ZBvpaptSr8BAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMTEoCGaZStWxaw2N5KtAEgkLBSc55rerOuxAlygvF%2FFkgcb3wmIoLfAzUI%2BWUd%2FVOYs32ziSnLvGzNtMxSszdGpqn21PhdFYyFSL0LS509k5MWYjU7r12SnQjR%2BUrytPrYLOnOYobmXQiUyTAfEKFOwg9fxGCpyaEyATkeUBZhzKF8ny3%2FK2wACiiPwxBSpUxnSwBWDgAaCSi9YpHB2Xe7pCUsfg2LJZQWXqJZhTkS2fOoFlDkZPkjC3CaIKXVYGtLeN5BpXjXFOf2a%2FJv5BuotV0hMfuCeWTbVOmXTWm%2BSaMhJYP0k2zJnHrWIAzpj2pc9c%2FfdT2R17aRMD884zRp6lPzr9voyb4TaxEZuqizFWvW%2B%2FVhqYt%2FWFQNtcGxkrg%2BjjNOktfmixPxYE93PXw%2FcBFInhgwV6WtirRVV08jxeO%2B01iMdNG07vHKMaNhFBHIYeSQBA9yazJW8vgvnWL2aqDfyG%2F0HKzR4u5MEcDmdXKEjEvZ73YhTiCUxGMlppH%2BLCVcm%2F7kj%2B%2BcZCH6B%2FxnmC6tc7IzcQ%2FNGatNupml1sweFvotU%2FshHOv9l2o2eShDA9dgYRIWUEuMp4qzOiCRtGtlsPn90hqKdPD3o2QyiuxEjqyodXaHhxiyCXFfICG2OOGnYSLZdBdO8KA5U5SCgIL35irlejoiUud3xoGD4yA8VMCG%2FUeQ8R8pO4cOYzmRLxhLZXpkf4ReHuKRsyv4l5BqL%2BqpGaxbs2ivMoHxZXXTLzLFpLVooKPTlSyPdQOJydvmoeiMzEA%2FHXLcXCMrGt5HYDkhzNebWxLDiTPVjDrtufTBjqZAR6HQvzol6k2%2FVs9mZIG2JnQWW6L22PvBLJOE%2FKZxNMNo4L3MFdNfogGp3JYN2ySoDAyfWD6sJMNCgDJxctXrOkZLeOgMeoqlmwbkpL27ajZikEACewrWEWtVDBBJl4LieKMQdUXf%2BiYxZ4cWhrVccpUPF9bHJfR33N%2FLun%2FhrE9P35%2BHcBxsod%2BXEG2NW2TujcGK5yQ3S0Jbg%3D%3D&Expires=1786374462) - # ドメインモデル反証調査（調査基準日: 2026-08-07）
本調査は`02-market-corpus-v2-audited.md`を入力として、既存の「ドメインモデル仮説」および「エッジケース...

2. [01-market-corpus-v1.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/47bc50ab-f70c-4ec6-a4df-13235c36a1fc/01-market-corpus-v1.md?AWSAccessKeyId=ASIA2F3EMEYEZQ3L6MIM&Signature=zHM%2FVC6fWdI6Jb%2FLpV9NIFqd%2B7U%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIFu2w2u4tN3AqDuynYg1gpfVwtmclsXPxWQhtiQhMAqSAiBS%2BmS%2FsjpDmvOcNgqT5%2FCX3e5ubNeLdTFmr2ZBvpaptSr8BAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMTEoCGaZStWxaw2N5KtAEgkLBSc55rerOuxAlygvF%2FFkgcb3wmIoLfAzUI%2BWUd%2FVOYs32ziSnLvGzNtMxSszdGpqn21PhdFYyFSL0LS509k5MWYjU7r12SnQjR%2BUrytPrYLOnOYobmXQiUyTAfEKFOwg9fxGCpyaEyATkeUBZhzKF8ny3%2FK2wACiiPwxBSpUxnSwBWDgAaCSi9YpHB2Xe7pCUsfg2LJZQWXqJZhTkS2fOoFlDkZPkjC3CaIKXVYGtLeN5BpXjXFOf2a%2FJv5BuotV0hMfuCeWTbVOmXTWm%2BSaMhJYP0k2zJnHrWIAzpj2pc9c%2FfdT2R17aRMD884zRp6lPzr9voyb4TaxEZuqizFWvW%2B%2FVhqYt%2FWFQNtcGxkrg%2BjjNOktfmixPxYE93PXw%2FcBFInhgwV6WtirRVV08jxeO%2B01iMdNG07vHKMaNhFBHIYeSQBA9yazJW8vgvnWL2aqDfyG%2F0HKzR4u5MEcDmdXKEjEvZ73YhTiCUxGMlppH%2BLCVcm%2F7kj%2B%2BcZCH6B%2FxnmC6tc7IzcQ%2FNGatNupml1sweFvotU%2FshHOv9l2o2eShDA9dgYRIWUEuMp4qzOiCRtGtlsPn90hqKdPD3o2QyiuxEjqyodXaHhxiyCXFfICG2OOGnYSLZdBdO8KA5U5SCgIL35irlejoiUud3xoGD4yA8VMCG%2FUeQ8R8pO4cOYzmRLxhLZXpkf4ReHuKRsyv4l5BqL%2BqpGaxbs2ivMoHxZXXTLzLFpLVooKPTlSyPdQOJydvmoeiMzEA%2FHXLcXCMrGt5HYDkhzNebWxLDiTPVjDrtufTBjqZAR6HQvzol6k2%2FVs9mZIG2JnQWW6L22PvBLJOE%2FKZxNMNo4L3MFdNfogGp3JYN2ySoDAyfWD6sJMNCgDJxctXrOkZLeOgMeoqlmwbkpL27ajZikEACewrWEWtVDBBJl4LieKMQdUXf%2BiYxZ4cWhrVccpUPF9bHJfR33N%2FLun%2FhrE9P35%2BHcBxsod%2BXEG2NW2TujcGK5yQ3S0Jbg%3D%3D&Expires=1786374462) - # 日本クレジットカード・後払い決済市場 市場調査コーパス
調査基準日: 2026-08-07 / 目的: 後工程でのドメインモデル・要件定義のための一次証拠ベースの市場調査（DBスキーマ・ER図・S...

3. [02-market-corpus-v2-audited-2.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/069016bf-586e-420a-a5b7-5028892bfb0f/02-market-corpus-v2-audited-2.md?AWSAccessKeyId=ASIA2F3EMEYEZQ3L6MIM&Signature=qw%2BEM%2BJ4QHnnFgBJBgEzeT7Qk%2Bk%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIFu2w2u4tN3AqDuynYg1gpfVwtmclsXPxWQhtiQhMAqSAiBS%2BmS%2FsjpDmvOcNgqT5%2FCX3e5ubNeLdTFmr2ZBvpaptSr8BAif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY5OTc1MzMwOTcwNSIMTEoCGaZStWxaw2N5KtAEgkLBSc55rerOuxAlygvF%2FFkgcb3wmIoLfAzUI%2BWUd%2FVOYs32ziSnLvGzNtMxSszdGpqn21PhdFYyFSL0LS509k5MWYjU7r12SnQjR%2BUrytPrYLOnOYobmXQiUyTAfEKFOwg9fxGCpyaEyATkeUBZhzKF8ny3%2FK2wACiiPwxBSpUxnSwBWDgAaCSi9YpHB2Xe7pCUsfg2LJZQWXqJZhTkS2fOoFlDkZPkjC3CaIKXVYGtLeN5BpXjXFOf2a%2FJv5BuotV0hMfuCeWTbVOmXTWm%2BSaMhJYP0k2zJnHrWIAzpj2pc9c%2FfdT2R17aRMD884zRp6lPzr9voyb4TaxEZuqizFWvW%2B%2FVhqYt%2FWFQNtcGxkrg%2BjjNOktfmixPxYE93PXw%2FcBFInhgwV6WtirRVV08jxeO%2B01iMdNG07vHKMaNhFBHIYeSQBA9yazJW8vgvnWL2aqDfyG%2F0HKzR4u5MEcDmdXKEjEvZ73YhTiCUxGMlppH%2BLCVcm%2F7kj%2B%2BcZCH6B%2FxnmC6tc7IzcQ%2FNGatNupml1sweFvotU%2FshHOv9l2o2eShDA9dgYRIWUEuMp4qzOiCRtGtlsPn90hqKdPD3o2QyiuxEjqyodXaHhxiyCXFfICG2OOGnYSLZdBdO8KA5U5SCgIL35irlejoiUud3xoGD4yA8VMCG%2FUeQ8R8pO4cOYzmRLxhLZXpkf4ReHuKRsyv4l5BqL%2BqpGaxbs2ivMoHxZXXTLzLFpLVooKPTlSyPdQOJydvmoeiMzEA%2FHXLcXCMrGt5HYDkhzNebWxLDiTPVjDrtufTBjqZAR6HQvzol6k2%2FVs9mZIG2JnQWW6L22PvBLJOE%2FKZxNMNo4L3MFdNfogGp3JYN2ySoDAyfWD6sJMNCgDJxctXrOkZLeOgMeoqlmwbkpL27ajZikEACewrWEWtVDBBJl4LieKMQdUXf%2BiYxZ4cWhrVccpUPF9bHJfR33N%2FLun%2FhrE9P35%2BHcBxsod%2BXEG2NW2TujcGK5yQ3S0Jbg%3D%3D&Expires=1786374462) - # 日本クレジットカード・後払い決済市場 最新市場コーパス v2（監査済み、調査基準日: 2026-08-07）
本ドキュメントは、現在参照すべき最新の市場コーパスである。v1を監査対象として再検証し...

4. [JCB ザ・クラス](https://www.jcb.co.jp/premium/theclass/open.html) - JCB最高位のカード「JCB ザ・クラス」。特別に選ばれた方にふさわしいサービスとおもてなしをご用意しております。

5. [ダイナースクラブ プレミアムカード](https://www.diners.co.jp/ja/cardlineup/dinersclub_premiumcard.html) - 上質なサービスとステータスを兼ね備えた、ダイナースクラブ最上級のプレミアムカードについてご案内。クレジットカードのダイナースクラブ公式サイトをぜひご活用ください。

6. [ダイナースクラブカード](https://www.diners.co.jp/ja/cardlineup/dinersclubcard.html) - ダイナースクラブカードについてご案内。ポイント有効期限なし、ご利用金額一律制限なし、日本で最初のクレジットカード、ダイナースクラブカード。

7. [イレブンで最大11%還元！セブンカード・プラスの魅力と利用 ...](https://magazine.d-money.jp/creditcard/sevencard/) - セブンカード・プラスは、セブン-イレブンや電子マネーnanacoを利用する機会の多い人におすすめのクレジットカードです。一部店舗では最大11％のポイント還元を受けられたり、優待サービスの利用で買い物代...

8. [JCB the classとは？インビテーション条件・特典・年会費を解説](https://www.tickety.jp/column/knowledge/jcb-the-class/) - 「毎月の通信費が高い気がするが、どこから手をつければいいかわからない」と感じている経営者や総務担当者は多いのではないでしょうか。法人の通信費は、固定電話・携帯電話・インターネット回線・FAXと複数の契...

9. [【FiEl】JCB THE CLASS招待条件と特典を完全解説｜経営者の活用術｜RJ&FE](https://note.com/reex_japan/n/na278924aa748) - JCB THE CLASSは年会費55,000円のJCB最高峰カードですが、経営者・個人事業主にとっては単なるステータスではなく、接待・福利厚生・採用差別化に転用できる戦略的経費です。本記事では招待条...

10. [世界一わかりやすいセブンゴールドカード『セブンカード プラス ゴールド』解説｜あなたにベストな一枚かわかる！](https://okane-hosoku.com/7card-plus-gold/) - セブンのゴールドカードであるセブンカード プラス ゴールドについて招待（インビテーション）条件・ポイント情報・保険・特典情報からおすすめかどうかをご紹介。

11. [セブンカード・プラス（ゴールド）のインビテーション到着！条件・時期を解説](https://amatou-papa.com/seven-card-plus-gold-invitation-arrived/) - セブンカード・プラス（ゴールド）というクレジットカードがあります。セブンカード・プラス（ゴールド）は、セブンカード・プラスの招待制カードです。公式サイトには以下のように記載されています。セブンカード・...

12. [セブンカード・プラス（ゴールド）のメリットは？インビテーション条件や注意点について解説](https://adviser-navi.co.jp/card/column/6965/) - セブンカード・プラス（ゴールド）の招待条件、通常カードとの違い、最大11％還元、保険、注意点を最新情報で解説。2026年6月30日の新規申込終了予定も紹介します。

13. [JCB THE CLASS（ザ・クラス）のインビテーション（招待）とカードを受けるまで【2019年～2020年】 | たばねたブログ](https://tabaneta.com/creditcard/2567/)

14. [学生専用ライフカード ＜学生向けクレジットカード](https://www.lifecard.co.jp/card/credit/std/) - 「学生専用ライフカード」のご案内です。学生生活を強力サポート！おトクな特典が盛りだくさん。

15. [学生におすすめのクレジットカード8選｜在学中の特典と卒業後 ...](https://www.soico.jp/no1/news/creditcard/38376) - 編集部の結論 迷ったら、まずこの1枚から JCB CARD W JCB CARD W 年会費永年無料 ｜ 39

16. [三井住友カード学生が年会費無料になる条件と審査基準比較｜NL・ゴー...](https://pay-route.co.jp/article/2026/04/10/mitsui-sumitomo-card-student-fee-waiver-criteria-and-rewards-comparison/) - 「三井住友カード 学生」について調べている方の中には、「年会費無料って本当？」「アルバイト収入がなくても作れるの？」「ポイント還元は実際どれくらい受け取れる？」といった疑問や不安を感じていませんか。三...

17. [ANAカードJCB学生は卒業で自動的に年会費発生！FIRSTへ ...](https://tikarakobura.hatenablog.com/entry/2025/11/17/070000) - こんにちは！ ANAカードの中でも手数料が無料であるANAカードJCB学生とANA JCB CARD FIRST。学生から社会人になる際にうまく切り替えれば手数料がかからなくお得そう。そう思うことあり...

18. [学生は卒業間近（就職前）でも学生専用カードを作った方が良い？](https://creditcard-tsukurou.com/gakusei-sotugyou-madika/)

19. [法人カードと個人カードの違いを解説！法人カードはいらない ...](https://sovagroup.co.jp/media_article/corporate-card-personal-card-differcence/) - この記事では、法人カードと個人カードの違いから法人カードを持つメリット・デメリット、注意点まで解説していきます。

20. [家族カードのご案内・お申し込み](https://www.smbc-card.com/nyukai/add/family/index.jsp) - 家族カードなら安心と信頼の三井住友VISAカード。ご家族で一緒にカードを申込される時にお得にカードが作れます。しかもサービス内容は本会員と一緒！この機会にぜひお申し込みください。初年度の年会費は無料で...

21. [家族カードのご案内 ｜ クレジットカードのお申し込みなら](https://www.jcb.co.jp/ordercard/family_card/family_card.html) - JCBではご家族で入会する方におすすめのクレジットカード、「家族カード」を発行しています。家族カードは年会費がおトクで本会員と同様にさまざまなサービスを受けることができるクレジットカードです。

22. [家族カード | イオンカード 暮らしのマネーサイト](https://www.aeon.co.jp/service/familycard/) - イオンのお買い物だけじゃない、おトク・便利に使えるイオンカードの公式サイトです。

23. [家族カードについて](https://www.ana.co.jp/ja/jp/amc/anacard/family_card/) - 【ANA公式サイト】家族カードについて。あなたの旅や暮らしを豊かに彩る「ANAマイレージクラブ」。特典航空券や、キャンペーンなどANAのマイルを貯めて使えるサービス満載。

24. [家族会員カード](https://www.jal.co.jp/jp/ja/jalcard/card/family.html) - 家族会員の年会費は本会員の年会費の半額以下で、フライトのボーナスマイルやカード付帯保険など本会員と同等のサービス（一部対象外）が適用されます。さらに家族でマイルを合算できる「家族プログラム」に登録でき...

25. [家族カードとは？メリットやデメリット、発行条件について解説](https://www.jcb.co.jp/ordercard/special/family_card.html) - 家族カードは、クレジットカード会員の家族に対して発行できるクレジットカード。本会員と同様の特典を利用できるだけでなく、ポイントを効率よくためられる便利なカードです。この記事では、家族カードのしくみやメ...

26. [クレジットカードなら三菱UFJニコス](https://www.cr.mufg.jp/apply/card/mucard/index06.html) - 対象のコンビニ・飲食店・スーパーなどのご利用分が最大20％グローバルポイント還元。年会費永年無料 新規ご入会で最大10,000円相当グローバルポイントプレゼント。お申し込みはこちら。

27. [家族カードとは？作るメリットと条件や注意点を解説](https://www.smbc-card.com/nyukai/magazine/knowledge/family.jsp) - 家族カード・ファミリーカードは、専業主婦や学生など年収の少ない方でも持てるクレジットカードです。メリットや限度額、注意点について説明します。【三井住友VISAカード】

28. [家族カードの名義は誰になる？発行条件や注意点を解説](https://www.lifecard.co.jp/media/student/column-0087.html) - 家族カードとは、クレジットカード会員の家族が利用できるように発行するクレジットカードのことです。誰が名義人となるのか、申し込むにはどのような条件を満たす必要があるのか、わかりやすく解説します。

29. [カード店舗受取りサービスの終了について](https://www.aeon.co.jp/information/2026/instant_issue_notice/) - イオンのお買い物だけじゃない、おトク・便利に使えるイオンカードの公式サイトです。

30. [イオンカードを即日発行する3つの方法｜最短5分の手順と対応 ...](https://adviser-navi.co.jp/card/column/5861/) - イオンカードの即日発行は現在デジタル発行が中心です。店頭受取りサービス終了、システム移行による一時休止、対応カード、使えない原因まで最新情報で整理します。

31. [クレジットカードを複数申し込みすると審査落ちする？2枚 ...](https://magazine.d-money.jp/creditcard/simultaneous-application/) - クレジットカードは複数枚発行できますが、短期間に申し込みを重ねると審査で不利になる可能性があります。そこでこの記事では、多重申し込みが信用情報に与える影響や、適切な申し込みタイミングを解説。2枚同時申...

32. [クレジットカードって同じ会社のものが複数枚だと利用可能 ...](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q11276403591) - クレジットカードって同じ会社のものが複数枚だと利用可能金額が同じになるんですか？ 三井住友カード発行カード2枚持ってますが上限額同じで結局2枚持ってても利用した分だけ同時に減るので1枚にしたところです...

33. [プラチナカードとは？年会費や限度額、入会条件から作り方 ...](https://www.smbc-card.com/nyukai/magazine/status-card/platinum.jsp) - プラチナカードはハイステータスなカードですが、高い年収ではなくても申し込み可能なカードもあります。申し込み条件や審査基準、年会費やメリットを詳しく解説。【三井住友VISAカード】

34. [三井住友カード プラチナプリファードの審査の流れや期間](https://www.smbc-card.com/nyukai/magazine/status-card/platinum-preferred-examination.jsp) - 三井住友カード プラチナプリファードはインビテーションなしでお申し込み可能。入会に際しての審査の流れや発行期間、審査前にチェックすべきポイントについて解説します。【三井住友VISAカード】
