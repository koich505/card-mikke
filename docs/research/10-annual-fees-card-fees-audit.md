# 年会費・サービス料金・カード関連手数料 反例探索調査

調査基準日: 2026-08-10。本調査は`01-market-corpus-v1.md`、`02-market-corpus-v2-audited-2.md`、`03-domain-counterexample-audit-3.md`を前提とし、02を正本、01は矛盾時に劣後、03は既存ドメインモデルへの反証調査として位置づける。既存文書はFee構造を十分に扱っておらず、本調査は年会費・サービス料金・カード関連手数料に特化した追加一次情報確認である。ランキング目的ではなく、構造の異なる実例・例外の発見を目的とする。

## 調査方針の確認

既存3文書はいずれもFee構造（年会費決定条件、免除判定時点、家族会員差、ETC手数料等）を主目的としては扱っていない。02の`corrected-claims.md`はイオンゴールドの年間50万円条件などFeeに隣接する情報を含むが、年会費そのものの構造網羅は行われていない。したがって本調査は既存文書の欠落領域を独立に一次情報で埋めるものであり、Product／Variant／Offering／Benefit／Campaignの区別を保持したまま記録する。

***

## 1. Fee構造パターン一覧

| # | 構造パターン | 独立事例数 | 分類 |
|---|---|---|---|
| P1 | 永年無料 | 3件以上 | repeated market pattern |
| P2 | 初年度無料 | 3件以上 | repeated market pattern |
| P3 | 前年度利用額による翌年度永年無料化 | 2件（三井住友、Olive） | repeated market pattern |
| P4 | 利用回数（1回以上）による無料化 | 2件（JCB系、三井住友ETC） | repeated market pattern |
| P5 | リボ払い登録＋利用実績による割引・無料化 | 1件（三井住友「マイ・ペイすリボ」） | isolated candidate |
| P6 | WEB明細利用による年会費割引 | 1件（三井住友） | isolated candidate |
| P7 | 通信契約（ドコモ）等外部サービス契約は年会費割引ではなくポイント還元条件として機能 | 1件（dカード GOLD） | isolated candidate（ただし年会費免除ではない点が重要な反例） |
| P8 | ポイントによる年会費支払い | 5件以上（ダイナース、TRUST CLUB、アメックス、エムアイカード、TOKYU CARD等） | repeated market pattern |
| P9 | 月会費制 | 2件（セゾンローズゴールド・アメックス、アメリカン・エキスプレス・カード） | repeated market pattern |
| P10 | ETC発行手数料と年会費の別建て・別ライフサイクル | 3件以上 | repeated market pattern |
| P11 | 本会員・家族会員の年会費差、かつ1枚目/2枚目以降差 | 2件以上（dカード GOLD、他社比較） | repeated market pattern |
| P12 | デュアル発行時の2枚目年会費差 | 1件（三井住友カード） | isolated candidate |
| P13 | 招待経路とオンライン直接申込経路で年会費・条件が異なる | 2件（エポスゴールド、エポスプラチナ） | repeated market pattern（同一発行会社内） |
| P14 | 年会費改定（手数料含む） | 2件（三菱UFJニコスETC発行手数料改定、ダイナース年会費改定） | repeated market pattern |
| P15 | 再発行手数料 | 2件以上（楽天カード、ETCカード各社） | repeated market pattern |

***

## 2. 代表事例と一次情報

### P1/P2: 永年無料・初年度無料の並存構造

**エポスカード（一般）**は入会金・年会費が永年無料であることを公式サイトで一貫して明記している。一方、**エポスゴールドカード**は通常年会費5,000円（税込）だが、招待経由の申込では年会費が永年無料になる、かつプラチナ・ゴールド会員からの紹介で家族が申し込む場合も永年無料になるという、同一発行会社内での「Application Route（申込経路）」によるOffering差分が確認できる。ここでProductは同一（エポスゴールドカード）でも、Application Route（自発申込／招待／紹介）によってFeeを決定するOfferingが3種類存在する。[^1][^2][^3][^4]

- 観測された事実: エポスゴールドの通常年会費は5,000円（税込）。招待経由申込は永年無料。[^4]
- 適用条件: 「当社からご招待」であること。無料での申込には有効期限があり、エポスNetマイページで確認が必要。[^4]
- 除外条件: 招待有効期限を過ぎた場合の扱いは本調査では確認できず（Unknown）。
- Evidence Tier: Tier2（発行会社公式）。Disclosure status: partially_disclosed（招待発生条件自体は非公開）。Confidence: high（年会費条件は明記）。
- 既存文書との整合性: 02・03いずれもエポスカードのFee構造には触れておらず、新規発見。
- 既存モデルで表現しにくい点: 「同一Product、同一Grade（ゴールド）」でも、Application RouteによってOffering単位の年会費が0円と5,000円に分岐する構造。単純な「Product×Variant」の2軸では表現できず、Application Route自体をFee決定軸として持つ必要がある。

### P3: 前年度利用額による翌年度永年無料化（利用実績アップグレード型）

**三井住友カード ゴールド（NL）**は通常年会費5,500円（税込）だが、入会日から11か月後末日までの期間に対象利用額100万円（税込）以上を達成すると、翌年度以降の年会費が永年無料になる。この「永年無料化」は一度でも達成すれば、その後の利用額にかかわらず無料が継続する片方向のラチェット構造である。初年度に未達成でも、2年目に達成すれば3年目以降が無料になるなど、判定期間は年度ごとにローリングする。[^5][^6][^7][^8]

- 観測された事実: 入会後11か月間（初年度）または加入月1日から11か月後末日（2年目以降）の期間に100万円以上利用すれば、次年度以降年会費永年無料。[^8]
- 対象取引: SBI証券のつみたて投資や一部電子マネーチャージなど、集計対象外の支払いが存在する。[^7]
- 除外条件: 年間利用額の集計対象外取引（電子マネーチャージ、キャッシング等）は判定対象に含まれない可能性がある（要公式規約全文での確認、現時点はTier4記載）。
- 免除判定時点: 加入日基準の11か月サイクルごとに判定され、一度でも達成すれば永続的免除になる非対称なルール。
- 独立事例2件目: **Oliveフレキシブルペイ ゴールド**も同様に、三井住友カード ゴールド（NL）で年間100万円利用済みの場合、新規入会で年会費永年無料になるという、Product間で判定結果を持ち越す構造がある。[^9]
- Evidence Tier: Tier2（三井住友カード公式）。Disclosure status: disclosed。Confidence: high。
- 既存モデルで表現しにくい点: 「年会費免除の判定」が単一Product内に留まらず、別Product（Olive）への入会時にも過去の利用実績が引き継がれる。これは`CardUpgradeRelation`とは異なる「Fee Waiver Eligibility Carryover」という概念が必要になりうる。

### P4: 利用回数による無料化（ETCカード特有パターン）

ETCカードの年会費無料化条件は「利用回数（1回以上）」型と「利用金額」型の二重ORロジックを持つ事業者が複数存在する。三井住友カードのETCカードは年会費550円（税込）だが、前年度に1回以上のETC利用請求があれば無料になる（初年度は無料）。楽天カードのETCカードは、前年度に1回以上の利用、または前年度のショッピング利用合計50万円以上のいずれかを満たせば翌年無料という「利用回数OR利用金額」の複合条件を採用する。[^10][^11]

- 対象単位: Benefit（Fee Waiver Condition）としてのETCカード年会費、Productとは別建て。
- 適用条件: 三井住友カードは「前年度年会費請求月の翌月から当年度年会費請求月までの間に請求が1回以上」という厳密な集計期間定義を持つ。[^10]
- 免除判定時点: ETC利用から請求までに約2か月のラグがあるため、利用日ベースと請求日ベースで判定期間がずれる（三井住友の例では前年3月〜2月利用が当年4月請求判定に対応）。[^10]
- 独立事例: 三井住友カード、楽天カード、JCB CARD W［年1回利用または前年利用額50万円以上］の3社で確認。repeated market pattern。[^11][^10]
- Evidence Tier: Tier2（各社公式FAQ）。Disclosure status: disclosed。Confidence: high。
- 既存モデルで表現しにくい点: 「利用実績による無料化」判定の起点（利用日）と反映日（請求日）が約2か月ずれるため、単純な「年度内利用フラグ」では正確に表現できない。判定用の集計ウィンドウをEntityとして明示する必要がある。

### P5/P6: 支払方式設定・明細方式による割引（三井住友カード「マイ・ペイすリボ」／WEB明細）

三井住友カードは「マイ・ペイすリボ」（リボ払い自動設定）に登録し、年1回以上リボ払い手数料の支払いがあれば年会費が無料または半額になる制度と、WEB明細利用で年会費が最大1,100円割引になる制度を並行して提供する。重要な反例は、この割引が全カード共通ではなく、三井住友カード Visa Infinite、プラチナ、プラチナプリファード、ゴールド（NL）、Oliveフレキシブルペイ（プラチナプリファード・ゴールド）、ビジネスオーナーズ（プラチナプリファード・ゴールド）等が明示的に対象外とされている点である。[^12][^13]

- 適用条件: 「マイ・ペイすリボ」登録＋次回年会費請求月の前月までに1回以上のリボ払い手数料支払い。[^13]
- 除外条件（Grade単位の除外）: 上位グレード（プラチナ以上、ゴールド（NL）等）は対象外。[^13]
- 既存モデルで表現しにくい点: 「特定の支払設定（リボ登録）」による年会費割引という同一制度が、Grade（Variant）によって適用可否が分岐する。単一の`FeeDiscountRule`をProduct単位で持たせると、Grade単位の除外を表現できない。Grade（Variant）をFeeDiscountRuleの適用範囲として明示的に持つ必要がある。
- Evidence Tier: Tier2。Disclosure status: disclosed。Confidence: high。isolated candidate（他社での同型確認は本ラウンド未達、"支払設定による年会費割引"としては三井住友以外の類似事例を確認できず）。

### P7: 通信契約による外部条件は年会費免除ではなくポイント倍率条件として機能する反例（dカード GOLD）

既存文書・一般的想定では「通信契約による年会費割引」が構造の一つとして想定されるが、dカード GOLDの一次情報確認では、通信契約（ドコモ利用料金・ドコモ光）は年会費11,000円（税込）自体の減免には一切関与しない。ドコモ利用料金の10%ポイント還元という別のBenefitにのみ影響し、年会費は「利用額に応じて年会費が無料・割引になる制度はありません」と明記される（Tier4だが公式挙動と整合）。[^14]

- 観測された事実: dカード GOLDの年会費は通信契約の有無・利用額にかかわらず11,000円（税込）で固定。[^15][^16]
- 除外条件: 「年間100万円利用で翌年以降年会費無料」といった他社型の仕組みは存在しない。[^16]
- 既存モデルで表現しにくい点: 「外部条件（通信契約）による年会費割引」を一般化されたパターンとして想定すると誤りになる。dカード GOLDでは通信契約は年会費とは独立したRewardBenefit（10%還元）の適用条件であり、Fee（年会費）とBenefit（ポイント倍率）を混同しないという設計要請を直接的に支持する反例。
- Evidence Tier: Tier2（NTTドコモ公式サイト）を主根拠に、Tier4（各比較記事）で挙動を補強。Disclosure status: disclosed。Confidence: high。[^14][^15][^16]
- 独立事例確認: 本ラウンドでは「通信契約による年会費直接減免」を提供する事業者を発見できておらず、逆に「通信契約は年会費に影響しない」という反証のみ確認できた。市場全体への一般化はできない（他社は未調査、Unknown）。

### P8: ポイントによる年会費支払い

ダイナースクラブは2024年11月1日より、ダイナースクラブリワードポイントで年会費を支払えるサービスを開始し、カード種別ごとに必要ポイント数が異なる（例: ダイナースクラブカード49,000ポイント→2026年4月1日以降60,000ポイントに改定、ダイナースクラブ プレミアムカード286,000ポイント→330,000ポイント）。TRUST CLUBカードも同様の制度を持ち、カードGradeごとに必要ポイント数が異なる（プラチナ93,000ポイント、ゴールド32,000ポイント、エリート8,000ポイント等）。アメリカン・エキスプレスは2021年11月1日より1ポイント=1円相当で年会費充当が可能になったが、対象はプロパーカードとANAアメックスのみで、全カードには適用されない。エムアイカード（三越伊勢丹グループ）も同様の制度を持つが、ハウスカード・鹿島神宮カード・nimoca MICARD・VIOROカードは対象外と明記される。[^17][^18][^19][^20][^21][^22][^23]

- 適用条件（共通構造）: いずれも「カード有効期限月の一定日（多くは15日18:00）までのオンライン申込」という締切があり、複数年分の事前申込は不可という共通制約を持つ。[^18][^20]
- 対象単位: Reward（ポイント）からFee（年会費）への変換ルールであり、`RewardProgram`とは別に`FeePaymentConversionRule`として扱う必要がある。
- 除外条件（Product単位）: ダイナースの一部カードは対象外（「一部のカードを除き」と明記）、アメックスはプロパー系のみ、エムアイカードはハウスカード系除外。[^19][^22][^23]
- 金額・率: ダイナースクラブカードは60,000ポイント（2026年4月1日以降）で年会費全額に充当。アメックスは1ポイント=1円。[^21][^18]
- 開始日・改定日: ダイナース制度開始2024年11月1日、必要ポイント数改定2026年4月1日。[^18][^19]
- Evidence Tier: Tier2（各社公式）。Disclosure status: disclosed。Confidence: high。
- 独立事例数: ダイナースクラブ、TRUST CLUB、アメックス、エムアイカード、TOKYU CARDの5社以上で確認、明確なrepeated market pattern。[^24][^20][^22][^17][^21]
- 既存モデルで表現しにくい点: 必要ポイント数がProduct（カード種別）ごとに個別に定義され、かつ改定履歴を持つ。単純な固定レート（1ポイント=1円）ではなく、Product別の「Fee Redemption Table」という時系列を持つEntityが必要。

### P9: 月会費制

クレディセゾンは2020年11月26日から2021年6月30日の期間限定募集で、日本初の月会費制カード「セゾンローズゴールド・アメリカン・エキスプレス・カード」を発表し、月額980円（税込）、オンライン申込限定という構造を持つ。アメリカン・エキスプレスも2022年9月28日、従来年会費13,200円（税込）だった「アメリカン・エキスプレス・カード」を月会費1,100円（税込）に変更し、日本国内発行カードとして初の月会費制導入と報じられている。年間の支払い総額自体は変わらないため実質的な値上げではないと説明されている。[^25][^26]

- 観測された事実: 両社ともProduct自体の年会費構造を「月次分割請求」に変更した事例であり、月額980円×12=11,760円（セゾン）、月額1,100円×12=13,200円（アメックス、既存年会費と同額）という設計。[^26][^25]
- 適用条件: セゾンローズゴールドはオンライン申込のみという募集期間限定のApplication Route制約付き。[^25]
- 現在の状態: セゾンローズゴールド・アメックスは期間限定募集（2021年6月30日締切）であり、現在の募集有無は本調査で未確認（Unknown、追加確認要）。アメックスの月会費制は2022年の恒久的な制度変更として報じられている。[^26]
- 独立事例数: 2社（クレディセゾン、アメリカン・エキスプレス）で確認、repeated market pattern。ただし月会費制自体は国内では稀少（両社が「日本初」を主張している点に注意、時系列の整合性は要確認）。
- 既存モデルで表現しにくい点: `PaymentSchedule`のような支払頻度の概念がFee自体（年会費という商品属性）に適用される構造。既存モデルが「年会費＝年1回請求される固定額」という暗黙の前提を持つ場合、月次請求される年会費相当額をどう表現するかが課題になる。

### P10: ETCカード発行手数料と年会費の別建て・料率改定

ETCカードの年会費（無料が主流）と新規発行手数料（1,100円前後が主流）は明確に別建てで管理される構造が業界横断的に確認できる。三菱UFJニコスはETCカード年会費を無料としつつ新規発行手数料1,100円（税込）を課しており、2026年10月より新規発行手数料を1,100円から1,650円に改定することを公式発表している（MUFGカード系は2026年10月16日発行分より、NICOSカード系は2026年10月1日発行分より、適用開始日がブランド系統ごとに異なる）。三井住友カードはETCカード年会費550円（税込、初年度無料）だが、前年度利用1回以上で翌年度無料になり、新規発行手数料は別途1,100円（税込）が必要という三重構造を持つ。[^27][^10]

- 対象単位: ETCカードはCardProductとは別のOffering（付帯カード）であり、Fee（年会費）とFee（発行手数料）が別ライフサイクルを持つ。
- 適用条件: 三菱UFJニコスはJAカード付帯ETCカードなど一部カードは新規発行手数料無料の例外がある。[^28][^27]
- 金額・改定: 新規発行手数料1,100円→1,650円（三菱UFJニコス、2026年10月改定、ブランド系統ごとに適用開始日が異なる）。[^27]
- 独立事例: 三菱UFJニコス、三井住友カード、リクルートカード（JCBのみ無料、Visa/Mastercardは1,100円）の3社以上で確認、repeated market pattern。[^11][^27][^10]
- 国際ブランド別の料金差: リクルートカードはJCBブランドのETCカード発行手数料が無料だが、Visa・Mastercardは1,100円（税込）かかるという、同一Product内でのBrand単位のFee差が確認された。[^29][^11]
- Evidence Tier: Tier2（各社公式）。Disclosure status: disclosed。Confidence: high。
- 既存モデルで表現しにくい点: 同一CardProduct（例: リクルートカード）でも国際ブランド選択によって付帯ETCカードの発行手数料が変わる。Payment SchemeまたはInternational Brandを、ETCカードのFee決定軸として持たせる必要がある。また発行手数料の改定日がブランド系統（旧MUFGカード/DCカード系とNICOSカード系）で異なる点は、同一発行会社内でも旧ブランド系統ごとに異なるFeeスケジュールが並存することを示す。

### P11: 本会員・家族会員の年会費差、1枚目/2枚目以降差（dカード GOLD）

dカード GOLDは本会員年会費11,000円（税込）に対し、家族カードは1枚目無料、2枚目以降は1枚あたり1,100円（税込）で最大3枚まで発行可能という構造を持つ。家族カードは本会員とほぼ同等の特典（10%ポイント還元、旅行保険、ケータイ補償、空港ラウンジ）を受けられるが、年間利用額特典（100万円/200万円達成時のボーナス）は本会員のみが対象という、Benefit単位での本会員／家族会員差も存在する。[^30][^31][^32][^14]

- 除外条件: 家族カードの利用額は年間集計に合算されるが、達成時のボーナスポイント自体は本会員にのみ付与される（家族会員は集計対象だが受益者ではない）。[^32]
- 対象単位: Product（dカード GOLD）は共通だが、Variant（本会員／家族会員）でFeeとBenefitの両方に差がある。さらに家族会員内でも1枚目／2枚目以降でFeeが分岐するという二重の枝分かれ構造。
- 独立事例: 三井住友カード ゴールド（NL）も家族カードは無料（人数制限なし）としており、dカード GOLD（1枚目無料・2枚目以降有料）とは異なる構造を採る。両者は「家族会員年会費」という同一パターン名の中でも「全員無料」型と「1枚目のみ無料」型に分岐する異なる構造であり、単純な一般化はできない。[^9]
- Evidence Tier: Tier2（NTTドコモ公式、三井住友カード公式）。Disclosure status: disclosed。Confidence: high。
- 既存モデルで表現しにくい点: 「家族会員年会費」を単一のBoolean（無料/有料）で持つと、dカード GOLDのような「枚数依存の段階的Fee」を表現できない。家族カードの発行順序（1st, 2nd, 3rd）をFee決定変数として持つ必要がある。

### P12: デュアル発行時の2枚目年会費差（三井住友カード）

三井住友カードはVisa/Mastercardデュアル発行時の2枚目年会費が券種別に異なり、ゴールド2,200円（税込）、プラチナ5,500円（税込）等と設定されている（02文書内で既に記録済みの事実、一次情報での再確認は本ラウンドでは未実施、02の記述を正本として維持）。プラチナプリファードはVisaのみでデュアル発行対象外という除外もある。

- 既存モデルで表現しにくい点: デュアル発行の「2枚目」は別ブランドの同一Grade製品であり、独立したCardProductではないが、独立した年会費が発生する。「1つの会員契約に対して複数のPayment Instrument（ブランド別カード）が存在し、それぞれに個別のFeeが発生する」構造。isolated candidate（他社での同型のデュアル発行年会費差は本調査では確認できず）。

### P13: 招待経路 vs オンライン直接申込経路による年会費差（エポスプラチナ）

エポスプラチナカードは通常年会費30,000円（税込）だが、年間100万円以上利用した翌年以降は20,000円（税込）に割引される。ただしインビテーション経由で申込んだ場合は初年度から20,000円（税込）が適用されるという、Application Routeによる初年度Fee差が確認された。[^33]

- 対象単位: Offering（招待経由申込 vs 自主申込）単位でのFee差。
- 適用条件: インビテーション受領が前提（招待条件自体は非公開、undisclosed）。
- 免除判定時点: 自主申込は初年度30,000円確定、その後年間100万円利用達成で翌年度から20,000円。招待経由は初年度から20,000円が確定する非対称構造。[^33]
- Evidence Tier: Tier4（ダイヤモンド・ザイ記事）が主根拠であり、エポス公式での年会費初年度額の直接確認は本ラウンドで未達（要Tier2確認）。Confidence: medium。Disclosure status: partially_disclosed。
- 既存文書との整合性: 既存3文書はエポスプラチナのFee構造に触れていない。新規発見であり、かつTier4止まりのため追加のTier2確認が必要。

***

## 3. 既存モデルで表現できない反例（優先度高）

1. **Fee Waiver Eligibility Carryover（免除資格の商品間持ち越し）**: 三井住友カード ゴールド（NL）での年間100万円達成実績が、別Product（Oliveフレキシブルペイ ゴールド）への新規入会時にも年会費永年無料の判定に引き継がれる。既存の`CardUpgradeRelation`は同一発行会社内の「昇格」を想定するが、この事例は「別契約への新規入会でも過去の実績を承継する」という、契約の非連続性と実績の連続性が同時に成立する構造であり、03文書のEC-2（名称的後継関係の非連続性）とは正反対の性質を持つ反例である。[^9]

2. **Fee と Benefit の判定軸の完全分離（dカード GOLD）**: 通信契約という外部条件は、一般的な想定（外部条件による年会費割引）に反して、年会費には一切影響せず、別のBenefit（ポイント倍率）にのみ影響する。既存モデルが「外部条件→Fee変動」という単一の関連を想定していると、この構造を正しく表現できない。FeeとBenefitの決定条件セットは完全に独立したルールセットとして保持する必要がある。[^15][^14]

3. **Application Route依存のFeeが同一Product内で3種類以上分岐（エポスゴールド）**: 自主申込（5,000円）、招待経由（永年無料）、紹介経由（家族の場合永年無料）という3系統が同一CardProduct内に併存する。既存モデルの「Product×Variant」の2軸だけでは、Application Route軸でのFee分岐を捉えられない。[^4]

4. **ブランド系統ごとに異なる改定スケジュール（三菱UFJニコスETC発行手数料）**: 同一発行会社（三菱UFJニコス）内で、旧MUFGカード/DCカード系とNICOSカード系で改定適用開始日が異なる（2026年10月16日 vs 2026年10月1日）。単一のIssuerに対して単一のFeeスケジュールを想定するモデルでは、旧ブランド系統ごとの並存を表現できない。[^27]

5. **家族カードのFee構造が「全員無料型」と「段階的枚数依存型」に分岐（三井住友 vs dカード GOLD）**: 同じ「家族会員年会費」という概念名の下で、構造として全く異なる2つのパターンが市場に併存する。単一の家族会員Feeモデルで一般化すると誤りになる。[^30][^9]

6. **Fee Redemption Table（ポイントによる年会費充当）のProduct別・時系列的な非対称性**: ダイナースクラブの必要ポイント数がProductごとに異なり、かつ改定履歴を持つ（2026年4月1日改定）。かつ対象外Product（一部カード）が存在する。これは`RewardProgram`から独立した「Fee Payment Conversion Rule」という時系列付きEntityが必要であることを示す。[^19][^18]

***

## 4. 未確認パターン（Unknown）

以下は今回の調査で十分な一次情報を確認できず、Unknownとして維持する。

- 給与受取・口座指定による年会費割引・無料化の直接事例（銀行系カードでの類似制度は本ラウンドで発見できず、Unknown。三井住友カードの「マイ・ペイすリボ」はリボ払い設定条件であり、口座指定条件とは異なる）。
- 特定サービス契約（通信以外、例えば保険契約・電力契約等）による年会費割引の事例。
- 学生カードにおける年会費構造の特殊性（在学中無料、卒業後の自動切替時のFee変化等）は本ラウンドで深掘りできておらず、Unknown。
- 法人カードにおける従業員追加カードのFee構造（本会員・追加カードのFee差）は個別事例を確認できず、Unknown。
- デポジット型カード（ライフカード）における年会費構造（デポジット自体は保証金であり年会費とは別だが、年会費の有無・額は本ラウンドで未確認、Unknown）。
- 年度途中入会・退会時の年会費按分計算の有無（多くのカードは「年会費は一括請求」との記述はあるが、按分返金の有無を明記した一次情報は本ラウンドで発見できず、Unknown）。
- 年会費請求後の退会・切替時の返金有無の一般的なルール（個別カードごとに規約が異なる可能性が高く、包括的な確認はできていない、Unknown）。
- 招待・アップグレード・ダウングレード時の具体的な料金遷移ルール（アメックスゴールドプリファードへの招待条件は非公開のまま、undisclosed）。
- 物理カードとバーチャルカードの年会費差（Kyash Card Virtualは無料だがクレジットカードではなくプリペイドのAdjacent領域であり、Core領域でのバーチャル/物理の年会費差は本ラウンドで確認できず、Unknown）。
- 招待制カード（イオンゴールド、セブンカード・プラス）における年会費の存在自体（多くが年会費無料と言われるが、一次情報での明記は本ラウンドで再確認していない、要追加確認）。

***

## 5. 次に探索すべき検索クエリ

- 「学生カード 卒業 年会費 切替」「学生カード 在学中無料 条件」
- 「法人カード 追加カード 年会費 従業員」「ビジネスカード 追加カード 年会費 三井住友」
- 「クレジットカード 退会 年会費 返金」「クレジットカード 途中解約 年会費 按分」
- 「ライフカード デポジット型 年会費」「デポジット型カード 年会費 保証金 別」
- 「イオンゴールドカード 年会費 公式」「セブンカード・プラス ゴールド 年会費」
- 「給与受取 クレジットカード 年会費割引」「口座振替 年会費 優遇 クレジットカード」
- 「Kyash Card 発行手数料 バーチャル 比較」「クレジットカード バーチャル 年会費 物理」
- 「三井住友カード プラチナプリファード 年会費 デュアル発行 対象外」（P12の一次確認）
- 「エポスプラチナカード 公式 年会費 20000円 招待」（P13のTier2確認）
- 「アメリカン・エキスプレス・カード 月会費 現在」（P9制度の現状継続確認）
- 「セゾンローズゴールド・アメックス 募集 現在」（P9制度の終了有無確認）

---

## References

1. [02-market-corpus-v2-audited-2.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/f098709c-3f4f-44b0-b94d-80b87c1fe56b/02-market-corpus-v2-audited-2.md?AWSAccessKeyId=ASIA2F3EMEYEQCN7I2V7&Signature=7wZO8OBUY8iklVxX4xyMQTEdJ6s%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIBwK12E08aH0i7b62NGAwA3CCXW67QtnzOEO6aiEo1RYAiEAkxiXazOR6gx%2FAanOBcNRd9pR%2B6ZnDxi2LH0%2FVjIkfDwq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDDiCJZTwm4IY043hKCrQBP4ypbuicNWpZm4Y9T69V91%2F%2FvfuqUntzsAD8ya1re0LeBC5o5cWp4RRAPNRUfCLloNU224SKk5gcvVt3uexOYUxiHbOiAs30%2Fpfpl077b9iunJMFNWpgN6j8iVr7%2FR%2BkZ7HlsEdfIOQIbse9Lk9SjGxQTxB7HNyk6K6gPUfQ954Dm6OiD4viPCxf%2FmIK02PADf0u3q1F20KyMNJr8u1TRYJXFXNgwoy64K5GPcxumDceFg6Y%2F4HBOwKNv56D7hmB%2BlS3V6TZH8QjIR7y9DCb9zmfK0GfH0RljOiIqLr7KUDFGmIBoxcM40hmE2jsq%2FGGHI3JumbcShGUAgRKxKDcRhaeTEArzmo6b3Xq0x0NdcfDwi03nbTxEKr9hBrGbjsnk9ZgPvg%2FhbxF5tcOF6xXsKNJF8nLxotlPhWbQK%2BVweirBHzET1qpbeFw9pNqXBqTF9UIEyxIrAeY4o9mCIaQ0LXAtR5CpNpDTLyYsYxQ3OwdgqqPVgN2qMtcuYrRSlEK9ouRfgoXUlqxaCh8aO1ohu%2Bex%2BSK9XFR1Yeyivr0Zm%2BmSVJW3fLNGKxaKQcqLfvqjYQeFsMGhC%2F1IoABCA4fD4rdzYJ4QomnLsibmH5zC3yuaVEwzXJ7DtDFPNWw%2B5ihXlNNn3JFg87D7BljVHGnYNAelZ5Yz%2BGES6M5gYBQFCiVQDB7szptu87Bm%2BEYSZL2kZC%2FAxG8dHBr7aXjhWxOZa%2BNa7Rm4muQxXV%2FwZsX4jEXa0rH5FVTV9zRyBu8nIjl6XMQcpOy%2BHCM4s6sGNXC9QwmLTn0wY6mAHRAuY91IFfHB%2Bul058hMteu9sEPOfgm3IHrHZXg8R5ksl0LeeqSUe3lga3N9LGWPH6NQNPQErQMmVs3nu6f1Kv28Y5AtoN5Te%2FA49zmYPvw9FHhTZzXVTB8fNA4BKtxNSJlhqr%2F4XyJW2gXUcjsWE5ApTgdBx%2Bp4t4VJasrHHgII3xsvrnxzcnQARNFRiLpwtgF%2FgH8Rw3SQ%3D%3D&Expires=1786374123) - # 日本クレジットカード・後払い決済市場 最新市場コーパス v2（監査済み、調査基準日: 2026-08-07）
本ドキュメントは、現在参照すべき最新の市場コーパスである。v1を監査対象として再検証し...

2. [03-domain-counterexample-audit-3.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/cb1f22c5-594a-44d5-9cff-74a30a6a6b20/03-domain-counterexample-audit-3.md?AWSAccessKeyId=ASIA2F3EMEYEQCN7I2V7&Signature=kdsIKTBbv2GJk%2FpsNo4mD30hX6k%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIBwK12E08aH0i7b62NGAwA3CCXW67QtnzOEO6aiEo1RYAiEAkxiXazOR6gx%2FAanOBcNRd9pR%2B6ZnDxi2LH0%2FVjIkfDwq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDDiCJZTwm4IY043hKCrQBP4ypbuicNWpZm4Y9T69V91%2F%2FvfuqUntzsAD8ya1re0LeBC5o5cWp4RRAPNRUfCLloNU224SKk5gcvVt3uexOYUxiHbOiAs30%2Fpfpl077b9iunJMFNWpgN6j8iVr7%2FR%2BkZ7HlsEdfIOQIbse9Lk9SjGxQTxB7HNyk6K6gPUfQ954Dm6OiD4viPCxf%2FmIK02PADf0u3q1F20KyMNJr8u1TRYJXFXNgwoy64K5GPcxumDceFg6Y%2F4HBOwKNv56D7hmB%2BlS3V6TZH8QjIR7y9DCb9zmfK0GfH0RljOiIqLr7KUDFGmIBoxcM40hmE2jsq%2FGGHI3JumbcShGUAgRKxKDcRhaeTEArzmo6b3Xq0x0NdcfDwi03nbTxEKr9hBrGbjsnk9ZgPvg%2FhbxF5tcOF6xXsKNJF8nLxotlPhWbQK%2BVweirBHzET1qpbeFw9pNqXBqTF9UIEyxIrAeY4o9mCIaQ0LXAtR5CpNpDTLyYsYxQ3OwdgqqPVgN2qMtcuYrRSlEK9ouRfgoXUlqxaCh8aO1ohu%2Bex%2BSK9XFR1Yeyivr0Zm%2BmSVJW3fLNGKxaKQcqLfvqjYQeFsMGhC%2F1IoABCA4fD4rdzYJ4QomnLsibmH5zC3yuaVEwzXJ7DtDFPNWw%2B5ihXlNNn3JFg87D7BljVHGnYNAelZ5Yz%2BGES6M5gYBQFCiVQDB7szptu87Bm%2BEYSZL2kZC%2FAxG8dHBr7aXjhWxOZa%2BNa7Rm4muQxXV%2FwZsX4jEXa0rH5FVTV9zRyBu8nIjl6XMQcpOy%2BHCM4s6sGNXC9QwmLTn0wY6mAHRAuY91IFfHB%2Bul058hMteu9sEPOfgm3IHrHZXg8R5ksl0LeeqSUe3lga3N9LGWPH6NQNPQErQMmVs3nu6f1Kv28Y5AtoN5Te%2FA49zmYPvw9FHhTZzXVTB8fNA4BKtxNSJlhqr%2F4XyJW2gXUcjsWE5ApTgdBx%2Bp4t4VJasrHHgII3xsvrnxzcnQARNFRiLpwtgF%2FgH8Rw3SQ%3D%3D&Expires=1786374123) - # ドメインモデル反証調査（調査基準日: 2026-08-07）
本調査は`02-market-corpus-v2-audited.md`を入力として、既存の「ドメインモデル仮説」および「エッジケース...

3. [01-market-corpus-v1.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/556da1f8-7cc4-48fd-8bbe-02f3f5ac997d/01-market-corpus-v1.md?AWSAccessKeyId=ASIA2F3EMEYEQCN7I2V7&Signature=eo%2FT6ZRsZT63oN951PLV5VkCtk8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIBwK12E08aH0i7b62NGAwA3CCXW67QtnzOEO6aiEo1RYAiEAkxiXazOR6gx%2FAanOBcNRd9pR%2B6ZnDxi2LH0%2FVjIkfDwq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDDiCJZTwm4IY043hKCrQBP4ypbuicNWpZm4Y9T69V91%2F%2FvfuqUntzsAD8ya1re0LeBC5o5cWp4RRAPNRUfCLloNU224SKk5gcvVt3uexOYUxiHbOiAs30%2Fpfpl077b9iunJMFNWpgN6j8iVr7%2FR%2BkZ7HlsEdfIOQIbse9Lk9SjGxQTxB7HNyk6K6gPUfQ954Dm6OiD4viPCxf%2FmIK02PADf0u3q1F20KyMNJr8u1TRYJXFXNgwoy64K5GPcxumDceFg6Y%2F4HBOwKNv56D7hmB%2BlS3V6TZH8QjIR7y9DCb9zmfK0GfH0RljOiIqLr7KUDFGmIBoxcM40hmE2jsq%2FGGHI3JumbcShGUAgRKxKDcRhaeTEArzmo6b3Xq0x0NdcfDwi03nbTxEKr9hBrGbjsnk9ZgPvg%2FhbxF5tcOF6xXsKNJF8nLxotlPhWbQK%2BVweirBHzET1qpbeFw9pNqXBqTF9UIEyxIrAeY4o9mCIaQ0LXAtR5CpNpDTLyYsYxQ3OwdgqqPVgN2qMtcuYrRSlEK9ouRfgoXUlqxaCh8aO1ohu%2Bex%2BSK9XFR1Yeyivr0Zm%2BmSVJW3fLNGKxaKQcqLfvqjYQeFsMGhC%2F1IoABCA4fD4rdzYJ4QomnLsibmH5zC3yuaVEwzXJ7DtDFPNWw%2B5ihXlNNn3JFg87D7BljVHGnYNAelZ5Yz%2BGES6M5gYBQFCiVQDB7szptu87Bm%2BEYSZL2kZC%2FAxG8dHBr7aXjhWxOZa%2BNa7Rm4muQxXV%2FwZsX4jEXa0rH5FVTV9zRyBu8nIjl6XMQcpOy%2BHCM4s6sGNXC9QwmLTn0wY6mAHRAuY91IFfHB%2Bul058hMteu9sEPOfgm3IHrHZXg8R5ksl0LeeqSUe3lga3N9LGWPH6NQNPQErQMmVs3nu6f1Kv28Y5AtoN5Te%2FA49zmYPvw9FHhTZzXVTB8fNA4BKtxNSJlhqr%2F4XyJW2gXUcjsWE5ApTgdBx%2Bp4t4VJasrHHgII3xsvrnxzcnQARNFRiLpwtgF%2FgH8Rw3SQ%3D%3D&Expires=1786374123) - # 日本クレジットカード・後払い決済市場 市場調査コーパス
調査基準日: 2026-08-07 / 目的: 後工程でのドメインモデル・要件定義のための一次証拠ベースの市場調査（DBスキーマ・ER図・S...

4. [年会費無料のクレジットカード](https://www.eposcard.co.jp/eposcard/annual_fee.html) - クレジットカードなら入会金・年会費永年無料のエポスカード。最短即日発行！おトクなネットショップや全国10,000店舗のご優待も。あなたのライフスタイルをもっとべんりに、おトクにするクレジットカードです...

5. [三井住友カード ゴールド（NL）の還元率や年会費、付帯特典など](https://www.diamond.co.jp/zai/articles/-/144) - 三井住友カード ゴールド（NL）の年会費や還元率、貯まるポイント、付帯特典などのメリット・デメリットを詳しく解説！ 三井住友カード ゴールド（NL）の通常年会費は5500円（税込）だが、年間100万円...

6. [「三井住友カード ゴールド（NL）」は条件クリアで年会費永年 ...](https://kakakumag.com/money/?id=17250) - 価格.comでも人気の「三井住友カード ゴールド（NL）」は年間100万円利用すると、翌年以降の年会費が永年無料となる1枚。"クレカの達人"がその魅力を解説します。

7. [三井住友カード ゴールド（NL）の年会費永年無料って ...](https://my-best.com/articles/1844) - 三井住友カード ゴールド（NL）への申し込みを検討している人のなかには、年会費が永年無料になる期間や条件など気になることも多いのではないでしょうか。本記事では、三井住友カード ゴールド（NL）の年会費...

8. [三井住友カード ゴールド（NL）の特典を解説｜年間100万円 ...](https://fukurou.yaritori.jp/article/20676/) - 三井住友カード ゴールド（NL）の特典を解説。年会費永年無料、毎年10,000ポイント獲得など詳しく紹介します。一般カードとの違いも解説しますので、どちらが良いか迷っている方はぜひ参考にしてください。

9. [ゴールドカードなら三井住友カード ゴールド（NL）がおすすめ！](https://www.smbc-card.com/nyukai/magazine/gold.jsp) - ゴールドカードなら三井住友カード ゴールド（NL）がおすすめ。条件達成で翌年以降の年会費が永年無料、対象のコンビニ・飲食店利用でポイント還元率が最大8％など充実した特典が魅力です。

10. [ETCカードの年会費を教えてください。 | 三井住友カード](https://qa.smbc-card.com/mem/detail?site=4H4A00IO&category=29&id=294) - お持ちのカードがWEBサービスにて「VpassID」を利用するカード、または「セディナビID」を利用するカードかにより異なります。 カード種類の見分け方については以下のリンクをご確認ください。 ‣Vp...

11. [【17枚を徹底比較】ETCカードのおすすめ人気ランキング【年会費無料の...](https://my-best.com/12658) - ETCカードに年会費を支払うのはもったいないと感じる人も多いでしょう。年会費無料のETCカードなら、余計なコストをかけずに保有できます。しかし、楽天カードや三井住友カードなどETCカードを発行できるク...

12. [FAQ詳細 -年会費が割引になる方法はありますか？](https://qa.smbc-card.com/mem/nyukai/detail?site=4H4A00IO&category=112&id=694) - 三井住友カード株式会社、 「年会費が割引になる方法はありますか？」のFAQ詳細ページになります。

13. [Q年会費を無料または半額にするためには、いつまでに「マイ・ペイ ...](https://qa.smbc-card.com/mem/nyukai/detail?site=4H4A00IO&category=112&id=236) - 三井住友カード株式会社、 「年会費を無料または半額にするためには、いつまでに「マイ・ペイすリボ」を利用すればよいですか？」のFAQ詳細ページになります。

14. [dカード GOLDは年会費1万円以上のメリットあり！ドコモ ...](https://www.nc-card.co.jp/magazine/dcard-gold/) - dカード GOLDはドコモユーザーは特にお得になるカードですが、ドコモユーザーでなくても年会費の元が取れる方法があります。dカード GOLDのメリット、デメリット、申し込み方法などについて詳しくご紹介...

15. [dカード GOLD - NTTドコモ](https://dcard.docomo.ne.jp/st/dcard_gold/index.html) - dカード GOLDはオンラインにて入会申し込みが可能です。dカード GOLDは圧倒的にdポイントがたまるゴールドカード！毎月の携帯電話料金の10％、dポイントがたまります。さらに「ケータイ補償」「国内...

16. [dカードゴールドの評判・口コミは？メリット・デメリットを ...](https://shinpan-friend.com/financial-magazine/dcard-gold-review/) - 金融マガジン [ dカードゴールドの評判・口コミは？メリット・デメリットを徹底レビュー ] 本記事はプロモーションを含みます 「dカード GOLDって年会費11,000円も払う価値があるの？」「ドコモ...

17. [ダイナースクラブカード、年会費をポイントで支払えるサービスを ...](https://www.poitan.jp/archives/136257) - ダイナースクラブカードでは、2024年11月1日より、年会費をポイントで支払えるサービスを開始する。 三井住友信託ダイナースクラブカード ブルーは5000ポイント、ダイナースクラブカード、三井住友信託

18. [ポイントで年会費を支払う](https://www.diners.co.jp/ja/point/apply.html) - ダイナースクラブカードで貯まったポイントで、年会費をお支払いいただけます。クレジットカードのダイナースクラブ公式サイトをぜひご活用ください。

19. [貯めたポイントで年会費を支払えるようになります | お知らせ](https://www.diners.co.jp/ja/press/inf_20241023_3.html)

20. [ポイントで年会費を  払う - TRUST CLUBカード](https://www.sumitclub.jp/ja/point/apply.html) - TRUST CLUB カードで貯まったポイントで、次年度の年会費をお⽀払いいただけます。クレジットカードのTRUST CLUBカード公式サイトをぜひご活用ください。

21. [アメックスの年会費をポイントで支払える！ プラチナ・カードは ...](https://www.poitan.jp/archives/92997) - アメリカン・エキスプレス・カードでは、メンバーシップ・リワードのポイントを年会費に充当できるサービスがあったが、1ポイント＝0.5円相当と充当するメリットがほとんど無かった。 2021年11月1日（月

22. [エムアイポイントで年会費お支払い｜百貨店のクレジットカードなら三越伊勢丹グループのエムアイカード](https://www2.micard.co.jp/benefits/nenkaihi.html?top=slide) - エムアイポイントが貯まるカードをお持ちのお客さまは、貯まったエムアイポイントを、エムアイカードの年会費お支払いにご利用いただけます！ご利用にはお申し込みが必要です。

23. [アメックスポイントで年会費を払う方法！写真を添えて手順を ...](https://amex-guide.jp/amex/info/645/) - アメックスポイントでクレジットカードの年会費を支払う方法を詳しく解説。手順、ポイント交換レート、注意点などを初心者向けに紹介。年会費を賢く節約しましょう。

24. [年会費ポイントお支払い | TOKYU CARD - 東急グループや全国の ...](https://www.topcard.co.jp/services/pay_with_points)

25. [日本初「月会費制」のクレジットカード。セゾンローズゴールド・アメックス](https://www.watch.impress.co.jp/docs/news/1291441.html) - クレディセゾンは、日本初の「月会費制」を採用したクレジットカード「セゾンローズゴールド・アメリカン・エキスプレス・カード」の申込みを11月26日から2021年6月30日までの期間限定で募集する。

26. [アメックス、国内初の「月会費制」を導入。新サービスも追加で ...](https://www.businessinsider.jp/article/259893/) - 「アメリカン・エキスプレス・カード」が10年ぶりのリニューアルで、月会費制を導入しました。新しい月会費は1100円で、入会のハードルが下がりました。また、「グリーン・オファーズ」という特典サービスも追...

27. [ETCカード](https://www.cr.mufg.jp/apply/card/etc/index.html) - 三菱UFJニコスのクレジットカードで使えるETCカードのご案内。ETCマークのある有料道路の料金所をキャッシュレスでスムーズに通行いただけます。

28. [ETCカードの申込みに手数料や年会費はかかりますか？](https://www.cr.mufg.jp/faq/detail/2369/index.html) - クレジットカードの申込みなら、ポイントプログラム・サービスが充実の三菱UFJニコス。お客様からいただく『よくあるご質問』について、ご回答しています。

29. [【2026年】ETCカードのおすすめ13選！年会費・手数料無料 ...](https://www.a-tm.co.jp/top/creditcard/etccard/) - 年会費も発行手数料も無料のETCカードを紹介しています。どのETCカードが良いの？と迷う方向けに「迷ったらとりあえずこれ！3選」「使い方・持ち方次第でお得！おすすめETCカード4選」「ガソリンをお得に...

30. [dカード GOLDの年会費の元を取る方法！キャンペーンや特典 ...](https://coetas.jp/creditcard/dcard-gold-nenkaihi/) - NTTドコモ・フィナンシャルグループ「dカード GOLD」を作ろうとして、年会費が高いと感じて申し込みを断念する方もいるのではないでしょうか。 しかし、dカード GOLDは使い方次第で年会費以上の価値...

31. [dカードGOLD 家族カードを徹底解説！支払い方法やサービス ...](https://www.randcins.jp/creditcard/personal/cc017/)

32. [dカードゴールドの家族カードはお得？メリットや注意点を解説](https://my-best.com/articles/216) - ポイント還元率の高さと充実した付帯サービスが魅力のdカードGOLDの家族カード。家族カードを検討しているものの、具体的なメリットや本会員との違い、年会費の有無などわからないことが多く踏みとどまっている...

33. [｢エポスプラチナカード｣を“実質”年会費無料で使う方法！ ...](https://diamond.jp/zai/articles/-/1042318) - 「エポスプラチナカード」で獲得したエポスポイントは、年会費の支払いに充当するのがおすすめ！「エポスプラチナカード」で年100万円を利用すれば2万ポイントを獲得できるので、そのポイントを年会費の支払いに...
