# ドメインモデル反証調査（調査基準日: 2026-08-07）
本調査は`02-market-corpus-v2-audited.md`を入力として、既存の「ドメインモデル仮説」および「エッジケース／特殊規約一覧」を反証した調査である。目的は市場事実を訂正することではなく、モデルが表現できない、または誤った抽象化を引き起こす実在事例を発見することである。市場事実の正本と訂正履歴は`02-market-corpus-v2-audited.md`を参照する。

***

# 0. 調査の位置づけ

`02-market-corpus-v2-audited.md`で確定またはUnknownとして整理された市場事実を前提に、既存Domain ModelのAssumption、Entity境界、Temporal Model、Actor Role、Legal Classificationの粒度を評価する。市場事実の追加訂正は本ファイルの責務に含めない。

***

# 1. edge-case-catalog.md

## EC-1: 弁護士専用カードにおける「同一専門職団体×複数イシュア×複数ブランド」構造

**Observation**: 全国弁護士協同組合連合会（全弁協）は、単一の専門職団体でありながら、三菱UFJニコス（弁護士DCカード、ロイヤーズ・MUFGカード）、クレディセゾン（全弁協セゾンプラチナ・ビジネス・アメックス）、UCカード（全弁協UCカード）、ダイナースクラブの合計4社と提携し、少なくとも5つの異なるカード商品を並行発行している。かつて存在した「弁護士VISAビジネスカード」は2025年2月28日に提携終了となったが、他の4系統は継続している。[^3][^4][^5]

**Concrete Product**: 弁護士DCカード、ロイヤーズ・MUFGカード・プラチナ・アメリカン・エキスプレス・カード、全弁協《セゾン》プラチナ・ビジネス・アメリカン・エキスプレス・カード、全弁協UCカード、ダイナースクラブカード

**Actors**:
- External membership operator: 全国弁護士協同組合連合会（全弁協、中小企業等協同組合法準拠の協同組合）[^8]
- Issuer/Billing entity: 三菱UFJニコス、クレディセゾン、UCカード、ダイナースクラブジャパン（商品ごとに異なる）
- International brand: MUFG系はVisa/Mastercard/Amex、セゾン系はAmex、他はJCB系等（商品ごとに異なる）
- Reward operator: 各カード会社のポイントプログラム
- 手数料収益先: 組合員の利用に応じて「所属の単位協同組合」に手数料収入が発生する構造がある。これは会員向けRewardではなく、Partner Revenue Share／Economic Flowとして別概念になる可能性がある[^9][^8]

**Rule**: 入会資格は「全国の各弁護士協同組合の組合員であること」に限定され、カード会社規約に加えて組合との提携特約（例: 全弁協セゾンプラチナ特約）が別途適用される。キャッシングサービスは本会員のみに限定される等、通常のセゾン規約に対する上書き規定が存在する。[^10][^11]

**Why It Is An Edge Case**: 単一の外部資格団体（全弁協）に対して、複数の独立イシュアが並行して別商品を発行し、しかもそれぞれ商品ごとに規約上書き（特約）が存在する。「1つの外部会員資格→1つの提携カード」という単純な1:1関係ではなく、1外部会員資格→N提携カード（N社のイシュア）という構造。さらに、利用による手数料収入が「会員個人」ではなく「所属の単位協同組合」という別の法人格に帰属する、通常のポイント／キャッシュバックとは異なる収益フロー。

**Existing Model Impact**: 経済フロー部分にモデル拡張の検討が必要。複数の`CardPartnership`が独立並行する構造は、元モデルの多対多で表現可能であり、反証点ではない。反証点は「収益が会員個人ではなく外部団体（組合）に帰属する」構造が明示されていないことである。

**Smallest Necessary Change**: 優先順位2（既存概念の責務・境界変更）で対応可能と考えられる。「収益の帰属先が会員本人ではなく外部団体」という点について、`Member Reward`とは別に`Partner Revenue Share`／`Economic Flow`として扱う必要性を検討する。`RewardProgram`/`PointBalance`をそのまま法人受益者へ拡張するとは決めず、`CardPartnership`との関係もDomain Specificationで評価する。

**Design Implication**: `Member Reward`と`Partner Revenue Share`／`Economic Flow`を混同しない。提携による経済的受益者がMemberとは限らないことが、本事例の中心的な示唆である。

**Evidence**:
- Source title: クレジットカード（全弁協公式サービス案内）／ Publisher: 全国弁護士協同組合連合会 ／ URL: https://www.zenbenkyo.or.jp/service/card.php ／ Source type: Tier3（専門職団体公式） ／ Retrieved date: 2026-08-07 ／ Confidence: high ／ Disclosure status: disclosed[^3]
- Source title: 全弁協セゾンプラチナ･ビジネス･アメリカン･エキスプレス･カード特約 ／ Publisher: 株式会社クレディセゾン ／ URL: https://www.saisoncard.co.jp/pdf/card_terms/zenbenkyo.pdf ／ Source type: Tier2（発行会社公式規約PDF） ／ Retrieved date: 2026-08-07 ／ Confidence: high ／ Disclosure status: disclosed[^11]
- Source title: 提携クレジットカード ／ Publisher: 神奈川県弁護士協同組合 ／ URL: https://www.kanabenkyo.com/featured_item/creditcard-2/ ／ Source type: Tier3 ／ Published date: 2024-12-03 ／ Retrieved date: 2026-08-07 ／ Confidence: high（弁護士VISAビジネスカードの2025年2月28日提携終了を明記） ／ Disclosure status: disclosed[^5]

**類似ケース確認**: 東京税理士協同組合の税理士カード（三菱UFJニコス発行、プラチナ・アメックス版含む）も同種の「専門職団体×提携カード」構造を持つ。ただし税理士カードは今回1社のみの提携が確認されており、複数イシュア並行という点では弁護士カードほど極端ではない。したがって本パターンは **repeated market pattern**（専門職団体提携カード自体は繰り返し観測されるが、「1団体×4社イシュア並行」という極端な多重構造は弁護士カードに特有であり、その点ではisolated edge caseの性質も併せ持つ）と分類する。[^6][^7]

***

## EC-2: セゾンゲーミングカード「機能単位の段階的終了」と「後継商品への非自動移行」の組み合わせ

**Observation**: セゾンゲーミングカード（初代）は2022年8月22日にリニューアル発表、2023年1月16日以降再発行不可、2023年3月27日サービス終了。後継の「セゾンゲーミングカードDigital」は2022年9月12日から募集開始されたが、公式に「初代からの自動切替ではなく新規契約」「初代で貯めたゲーミングコインは自動移行されない」と明記されている。さらにDigital版自体も2024年8月30日にサービス終了を発表し、新規入会は2024年9月10日で停止、2025年2月1日〜3月31日は「カード利用（クレジット機能）のみ」に機能限定され、2025年3月31日に自動解約となった。[^12][^13][^14][^15]

**Concrete Product**: セゾンゲーミングカード、セゾンゲーミングカードDigital

**Actors**:
- Issuer/Billing entity: 株式会社クレディセゾン
- International brand: Visa[^14]
- Reward operator: クレディセゾン（ゲーミングコインプログラム運営）

**Rule**: 「後継商品」という名称上の連続性があっても、契約は新規、ポイント資産は移行されない。かつ、Digital版のサービス終了プロセスは「新規入会停止→特典系サービス順次終了→クレジット機能限定期間→自動解約」という4段階以上のライフサイクルを持つ。[^13]

**Why It Is An Edge Case**: 既存モデルの`ProductChangeHistory`や`ProductStatus`は「商品の終了」を単一のイベントとして扱う前提があるが、実際には（1）新規受付停止、（2）一部特典（ゲームギフトコード購入等）の終了、（3）ポイント付与の終了、（4）機能限定（クレジット機能のみ）期間への移行、（5）自動解約、という5段階が異なる日付で発生している。また「後継商品」という名称的連続性が、契約上・資産上の連続性を意味しないことも重要な反例である。

**Existing Model Impact**: モデル境界の修正が必要。既存の`ProductChangeHistory`は日付を持つが、単一の「終了イベント」ではなく「機能単位のライフサイクル遷移」を表現する責務分割が必要。

**Smallest Necessary Change**: 優先順位2〜3（既存概念の責務・境界変更、または既存Ruleの一般化）。新規Entityの追加ではなく、`ProductChangeHistory`に「変更対象の機能単位（新規受付／特典付与／機能全体）」を持たせるフィールド追加で対応可能と考えられる。ポイント移行の有無は`CardUpgradeRelation`ではなく、「後継商品」という名称的関連はあるが契約上は無関係であることを示す新しいリレーション種別（例: "successor_in_name_only"）が必要になる可能性がある。

**Design Implication**: 「商品名の後継関係」と「契約上・資産上の連続性」を混同しないための概念分離が示唆される。

**Evidence**:
- Source title: 「セゾンゲーミングカードDigital」のサービス終了について ／ Publisher: 株式会社クレディセゾン ／ URL: https://www.saisoncard.co.jp/customer-support/information/240830_2/ ／ Source type: Tier2 ／ Published date: 2024-08-29 ／ Effective date: 2025-03-31 ／ Retrieved date: 2026-08-07 ／ Confidence: high ／ Disclosure status: disclosed[^12]
- Source title: セゾンゲーミングカードのサービス終了について ／ Publisher: 株式会社クレディセゾン ／ URL: https://www.saisoncard.co.jp/customer-support/information/0822gaming/ ／ Source type: Tier2 ／ Published date: 2022-08-21 ／ Effective date: 2023-03-27 ／ Retrieved date: 2026-08-07 ／ Confidence: high ／ Disclosure status: disclosed（「自動的にお切り替えにはなりません」「ゲーミングコインは自動移行されません」と明記）[^15]
- Source title: セゾンゲーミングカードをリニューアルし、新たに募集開始 ／ Publisher: 株式会社クレディセゾン（PR TIMES） ／ URL: https://prtimes.jp/main/html/rd/p/000000163.000004442.html ／ Source type: Tier2 ／ Published date: 2022-08-21 ／ Retrieved date: 2026-08-07 ／ Confidence: high ／ Disclosure status: disclosed[^14]

**類似ケース確認**: 現時点で本ラウンドでは、同種の「名称上の後継商品だが契約非連続・資産非移行」パターンを持つ他社の類似事例は追加確認できていない。したがって **isolated edge case** として暫定的に分類する（過度な一般化は避ける）。

***

## EC-3: bitFlyerクレカ ― Payment Instrument発行主体とブランド運営主体と暗号資産変換提供主体の三者分離

**Observation**: 「bitFlyer クレカ」は、bitFlyer自身がカード発行会社ではなく、新生銀行グループのアプラスがカードを発行し、Mastercardブランドを採用、カード利用で発生するのはアプラスポイントであり、それが自動的に市場レートでBTCに変換されbitFlyerアカウントへ付与される、という3社関与の構造を持つ。個人のみが対象で、法人ユーザーは入会できず、bitFlyerでのアカウント開設がカード申込前提となる。[^1]

**Concrete Product**: bitFlyer クレカ（bitFlyer Card、bitFlyer Platinum Card）

**Actors**:
- Issuer/Credit provider/Billing entity: 株式会社アプラス（新生銀行グループ）
- International brand: Mastercard
- Reward operator（中間ポイント）: アプラス（アプラスポイント）
- Asset operator/Crypto conversion operator: bitFlyer（BTC付与・アカウント管理）
- External account operator: bitFlyer（カード申込前提としてのアカウント開設要件）

**Rule**: カード利用によりアプラスポイントが発生し、そのポイントが一定のタイミングで市場レートによりBTCへ変換されbitFlyerアカウントに付与される。対象は個人のみ。事前にbitFlyerアカウントの開設が必要。[^1]

**Why It Is An Edge Case**: 既存モデルの`CryptoConversionRule`は「中間ポイントを暗号資産に変換する」ことは既に想定しているが、本事例は「カード発行会社（アプラス）」と「暗号資産変換・保有アカウントの運営会社（bitFlyer）」が異なる法人であり、かつ「bitFlyerアカウント開設」がカード申込の前提条件（External Membership相当）になっている点が重要。これは単なる`RewardProgram`の一種ではなく、Reward Operator（アプラス）とFunding/Asset Operator（bitFlyer）が分離した構造である。

**Existing Model Impact**: 表現可能だが不自然。既存モデルの`CryptoConversionRule`と`ExternalMembershipRequirement`を組み合わせれば理論上表現できるが、「カード申込の前提条件としての外部アカウント」と「ポイント変換先としての外部アカウント」が同一の外部主体（bitFlyer）に対する二重の依存関係になっており、これを`ExternalMembershipRequirement`と`CryptoConversionRule`という別々のルールテーブルに分割すると、両者が同一のbitFlyerアカウントを指しているという整合性をモデル上保証できない。

**Smallest Necessary Change**: 優先順位2（既存概念の責務・境界変更）。`CryptoConversionRule`自体を否定せず、Issuer／Reward Operator／Asset Operator／External Account OperatorのActor Roleと、それぞれが参照する外部アカウントの同一性を表現できるようにする。新規Entity追加までは不要と判断する。

**Design Implication**: 「カード申込前提の外部アカウント」と「特典受領先の外部アカウント」が同一主体である場合、両ルールが同じ外部アカウント参照を共有するべきという設計上の示唆。

**Evidence**:
- Source title: bitFlyer、ビットコインが貯まるクレカをスタート ／ Publisher: CoinDesk JAPAN ／ URL: https://www.coindeskjapan.com/131690/ ／ Source type: Tier4（ニュースメディア、ただし発表内容の直接引用） ／ Published date: 2021-11-30 ／ Retrieved date: 2026-08-07 ／ Confidence: medium（Tier2直接確認を推奨） ／ Disclosure status: disclosed[^1]
- Source title: ビットコインが貯まる bitFlyer クレカ ／ Publisher: bitFlyer ／ URL: https://bitflyer.com/ja-jp/s/lp/creditcard ／ Source type: Tier2 ／ Retrieved date: 2026-08-07 ／ Confidence: high（年会費・商品名を直接確認） ／ Disclosure status: disclosed[^2]

**類似ケース確認**: 本ラウンドでは同種の「暗号資産取引所×銀行系カード発行会社×国際ブランド」という三者分離構造を持つ他の日本国内カードは追加確認できていない。**isolated edge case** として分類する。

***

## EC-4: Paidyの「事業者登録」と「個別支払スキームの法的性質」の非対応関係

**Observation**: Paidyは経済産業省登録の包括信用購入あっせん業者（関東（包）第122号）である。しかし、Paidyが提供する複数の支払スキーム（一括あと払い、3・6・12回あと払い）が、それぞれ個別にどの法的分類（包括信用購入あっせん／二月払購入あっせん等）に該当するかは、事業者登録の事実からは自動的に導出できない。

**Concrete Product**: Paidy（一括あと払い、Paidyプラス、3・6・12回あと払い）

**Actors**:
- Regulatory registrant: 株式会社Paidy（包括信用購入あっせん業者として登録）
- Credit provider/Billing entity: Paidy

**Rule**: 分割あと払いは口座振替・銀行振込の場合手数料無料、コンビニ払いは手数料発生。一括あと払いから分割への変更は可能だが、二重の分割変更は不可。[^16]

**Why It Is An Edge Case**: 既存モデルの暗黙の前提は「イシュア（事業者）の登録区分＝そのイシュアが提供する全支払いスキームの法的分類」であるが、これは論理的に正しくない。Actor-level Legal Fact（事業者登録）とTransaction-level Legal Classification（個別の支払方式の法的性質）は独立した情報である。

**Existing Model Impact**: 現在の抽象化が誤っている可能性。既存モデルの`PaymentModelType`は「通常クレジット、分割・リボ、BNPL、ハウスアカウント、立替保証」という商品単位の列挙型として設計されているが、これは「1商品＝1法的分類」という前提に立っており、Paidyのように「1事業者が複数の支払スキームを提供し、各スキームが独立した法的性質を持ちうる」構造を表現できない可能性がある。

**Smallest Necessary Change**: 優先順位2〜3（既存概念の責務・境界変更、Ruleの一般化）。`PaymentModelType`をCardProduct単位ではなく、支払スキーム単位（PaymentSchedule相当、または新たな粒度）に付与し直す必要がある。Issuerの登録区分（Actor-level）と支払スキームの法的分類（Transaction-level）を別テーブル・別ライフサイクルとして扱う。新規Entity追加は現時点では過剰と判断する。

**Design Implication**: 「事業者の regulatory registration」と「個別取引・支払スキームの legal classification」を同一視しないという設計原則が必要。

**Evidence**:
- Source title: 登録包括信用購入あっせん業者に対する行政処分を行いました ／ Publisher: 経済産業省 ／ URL: https://www.meti.go.jp/policy/economy/consumer/credit/20241003.pdf ／ Source type: Tier1 ／ Published date: 2024-10-03 ／ Retrieved date: 2026-08-07 ／ Confidence: high（登録番号・処分内容を直接記載） ／ Disclosure status: disclosed
- Source title: 3・6・12回あと払いがどんなサービスか知りたい ／ Publisher: Paidy公式サポート ／ URL: https://cs-support.paidy.com/support/solutions/articles/150000040637 ／ Source type: Tier2 ／ Retrieved date: 2026-08-07 ／ Confidence: medium（支払スキームの運用は確認できるが、法的分類そのものの明記はない） ／ Disclosure status: partially_disclosed

**類似ケース確認**: atoneについても同様の懸念（事業者登録区分と個別支払スキームの法的性質の非対応）が想定されるが、本ラウンドでもatoneの登録区分自体を一次確認できておらず、比較検証はできない（Unknown継続）。したがって本パターンは、Paidyという1事業者内で複数支払スキームが確認された時点では**isolated edge case**とするが、「事業者登録と個別取引分類は別軸である」という一般原則自体は、Kyash（Payment Instrument/Funding Method分離、v2で確認済み）とも構造的に類似しており、**repeated market pattern**の可能性を示唆する（confidence: medium、複数事業者の直接確認が必要）。

***

## EC-5: 全弁協「弁護士VISAビジネスカード」提携終了 ― 商品終了ではなく「提携」単位の終了

**Observation**: 神奈川県弁護士協同組合の公式ページには「弁護士VISAビジネスカード ※2025年2月28日提携終了」と明記されている。これは商品（カード）自体のサービス終了ではなく、全弁協という団体とカード会社の「提携」が終了したという扱いである。[^5]

**Concrete Product**: 弁護士VISAビジネスカード（三井住友）

**Actors**:
- Partner organization: 全国弁護士協同組合連合会
- Issuer: 三井住友カード

**Rule**: 提携終了の日付は明記されているが、既存会員のカードが提携終了後にどう扱われるか（継続利用可否、特典終了、通常カードへの移行等）は本ラウンドで確認できず（Unknown）。

**Why It Is An Edge Case**: 既存モデルの`CardPartnership.effective_to`は既にこの構造を想定しているが、「商品自体の終了」と「提携の終了（商品は他のブランドで存続するが、専門職団体との紐付けだけが切れる）」を区別する必要性を示す実例である。

**Existing Model Impact**: 表現可能。既存の`CardPartnership.effective_to`と`CardProduct.product_status`の分離という設計判断は、本事例に対して概念的に妥当。

**Smallest Necessary Change**: 優先順位1（既存概念で表現可能）。

**Design Implication**: 特になし（既存設計の想定が支持された数少ない例）。

**Evidence**:
- Source title: 弁護士専用クレジットカード（組合員のみ） ／ Publisher: 神奈川県弁護士協同組合 ／ URL: https://www.kanabenkyo.com/featured_item/creditcard-2/ ／ Source type: Tier3 ／ Published date: 2024-12-03 ／ Effective date: 2025-02-28 ／ Retrieved date: 2026-08-07 ／ Confidence: medium（単一団体の記載のみ、全弁協公式での直接確認は未達） ／ Disclosure status: disclosed

**類似ケース確認**: 追加探索できず。**isolated edge case**（ただし既存モデルにとっては支持材料）。

***

## Entity境界を壊す事例／Temporal Modelを壊す事例／その他カテゴリ別の探索結果

| カテゴリ | 発見結果 |
|---|---|
| Entity境界を壊す事例 | EC-1（全弁協×4イシュア構造）。ただし既存の多対多構造で概念上吸収可能であり、「壊す」というより「境界の想定漏れ」レベル |
| Temporal Modelを壊す事例 | EC-2（セゾンゲーミングカードDigitalの5段階ライフサイクル、名称的後継と契約非連続の分離） |
| Reward Modelを壊す事例 | EC-1（収益が会員個人ではなく外部団体に帰属）、EC-3（Reward OperatorとAsset/Funding Operatorの分離） |
| Fee Modelを壊す事例 | 本ラウンドでは新規発見なし。既存の`AffiliatedOrganizationFee`等の想定内と判断（判断不能ではなく、追加確認の結果、想定内と評価） |
| Issuer/Partner構造を壊す事例 | EC-1、EC-3 |
| Membership構造を壊す事例 | EC-1（外部団体資格が複数商品への申込資格になる一方、団体側が収益受益者にもなる二重の役割） |
| Corporate card構造を壊す事例 | 本ラウンドでは新規発見なし（パーチェシングカードは v2 で既に確認済みで、本ラウンドでは新しい反例は見つからない。Unknown継続） |
| Application/Upgrade構造を壊す事例 | Amexゴールドプリファードの「一般申込可能だが招待経由の優待も存在する」パターン（v2で既発見。今回は同型の専門職団体版として、EC-1の「全弁協所属者には一般公開されていない専用商品への直接申込経路が用意されている」という反例を追加確認：通常は招待制やブランド一般公開のカードにおいて、専門職団体所属というExternal Membership自体がApplication Routeを完全に変える例として位置づけられる） |
| Product Lifecycle構造を壊す事例 | EC-2 |
| Payment Instrument / Funding構造を壊す事例 | EC-3（bitFlyerクレカにおけるReward Operator/Asset Operatorの分離は、Kyashの「Payment Instrument/Funding Method分離」とは異なる形の分離パターンであり、Payment Instrument自体は単一（アプラス発行のMastercardカード）だが、特典受益権が別法人へ流れる点が新規） |
| Legal Classification構造を壊す事例 | EC-4 |

***

# 2. model-counterexamples.md

| Assumption | Counterexample | Evidence | Severity | Recommended action |
|---|---|---|---|---|
| 提携による経済的受益者は常にMember（会員個人）であり、提携収益もMember Rewardとして扱える | 全弁協提携カードの一部では、利用実績に応じた手数料収入が会員個人ではなく所属協同組合に帰属する | EC-1 | High | 既存の提携多対多構造は維持しつつ、`Member Reward`とは別の`Partner Revenue Share`／`Economic Flow`が必要か検討する |
| 商品終了は単一の日付・単一のイベントとして記録できる | セゾンゲーミングカードDigitalは新規停止・特典終了・機能限定・自動解約が異なる日付で段階的に発生 | EC-2 | High | `ProductChangeHistory`のイベント粒度を機能単位に細分化する責務変更が必要 |
| 「後継商品」という名称的関連は契約・資産の連続性を意味する | セゾンゲーミングカード→Digitalへの移行は新規契約扱いで、ポイントも自動移行されない | EC-2 | Critical | 名称的関連と契約上の連続性を明示的に区別するリレーション種別の追加を検討（新規Entity追加は現時点では過剰、既存`CardUpgradeRelation`のセマンティクス明確化で対応可能な可能性がある） |
| 暗号資産連携カードは「カード発行会社＝暗号資産変換運営主体」という単純な関係で表現できる | bitFlyerクレカはアプラス（発行・中間ポイント）、Mastercard（ブランド）、bitFlyer（変換・外部アカウント運営）のActor Role分離を持つ | EC-3 | Medium | `CryptoConversionRule`は維持し、Issuer／Reward Operator／Asset Operator／External Account Operatorの主体参照を明示化する |
| 事業者の登録区分（Regulatory Registration）から個別支払スキームの法的分類（Legal Classification）を導出できる | Paidyは包括信用購入あっせん業者登録済みだが、複数の支払スキーム（一括／3・6・12回）の個別法的性質は登録事実だけからは確定できない | EC-4 | Critical | `PaymentModelType`の付与単位をCardProduct単位からPaymentScheme単位に見直す必要がある。Actor-level Legal FactとTransaction-level Legal Classificationを別テーブルとして明確に分離する設計原則を追加すべき |
| 通常招待制・一般公開型の商品区分は、外部団体所属によって変化しない | 専門職団体所属者に対しては、一般消費者向けの通常ルート（招待制/一般公開）とは異なる専用申込経路が用意される（全弁協・東京税理士協同組合の事例） | EC-1、税理士カード事例 | Medium | `EligibilityRule`と`ApplicationLink`の関係で、外部団体所属が「申込資格」だけでなく「申込ルート自体」を変えるケースを明示的にモデル化する必要がある |

***

# 3. unresolved-domain-boundaries.md

| 境界 | 未確定な点 | 関連Edge Case |
|---|---|---|
| Product vs Offering vs Variant | セゾンゲーミングカードとDigital版は「同じProduct系列の新Offering」なのか「完全に独立したProduct」なのか、公式文書上は明確な位置付けの記述がない（「新規でのご契約」という文言はあるが、Product Family概念があるかは不明） | EC-2 |
| Issuer vs Contract Party | 全弁協提携カードでは、Issuer（カード発行・請求主体）とExternal Membership Operator（全弁協）が別法人でありながら、利用実績に基づく収益が外部団体に流れるという「三者関係」があり、Contract Partyの定義（誰が誰と契約しているか）が単純な二者関係のモデルでは表現しづらい | EC-1 |
| Reward vs Discount vs Asset Conversion | bitFlyerクレカの「アプラスポイント→BTC変換」は、ポイント（Reward）と暗号資産（Asset）の境界がどこにあるかが曖昧。中間ポイントの時点ではRewardだが、変換後は市場価格変動リスクを持つAssetになる。この遷移点をどこで区切るかは概念的に未確定 | EC-3 |
| Member vs External Membership | 全弁協の事例では、External Membership（弁護士協同組合員資格）がカード申込資格であるだけでなく、収益受益者としての「もう一つのMember的存在」になっている。ExternalMembershipを単なる「資格確認フラグ」として扱うのか、収益フローの当事者として扱うのかが未確定 | EC-1 |
| Product Lifecycle vs Feature Lifecycle | セゾンゲーミングカードDigitalの終了プロセスが示す通り、「Product全体の終了」と「特定機能（新規入会、特典付与、クレジット機能）の終了」は別々のライフサイクルを持つが、既存モデルの`ProductStatus`がProduct単位かFeature単位かは未確定 | EC-2 |
| Actor Registration vs Transaction Legal Classification | Paidyの事例が示す通り、事業者単位の登録区分と、個別の支払スキーム・取引単位の法的分類は別の軸だが、既存モデルの`PaymentModelType`がどちらの粒度で管理されるべきかは未確定 | EC-4 |

***

# 4. missing-concepts.md

## 候補1: Member Rewardと分離された提携経済フロー（仮称: PartnerRevenueShare / EconomicFlow）
- **Supporting products**: 全弁協提携カード群（弁護士DCカード、ロイヤーズ・MUFGカード等）
- **Number of independent examples**: 1団体内で複数商品（少なくとも4イシュア分）に共通する構造だが、団体自体は1件のみ確認
- **Why existing concepts are insufficient**: `RewardProgram`/`PointBalance`はMember（個人会員）への還元を表す。外部団体への手数料収入は経済的に関連しても同じRewardとは限らず、別のEconomic Flowとして扱う可能性がある
- **Whether this is isolated or repeated**: 全弁協内では repeated（複数商品に共通）だが、市場全体で見ると他団体の同種事例は本ラウンドで確認できておらず、市場全体としては isolated の可能性が高い
- **Confidence**: medium（1団体内での再現性は高いが、他団体への一般化はUnknown）

## 候補2: 名称的後継関係と契約的連続性を区別する概念（仮称: NominalSuccessorRelation）
- **Supporting products**: セゾンゲーミングカード→セゾンゲーミングカードDigital
- **Number of independent examples**: 1件のみ
- **Why existing concepts are insufficient**: `CardUpgradeRelation`は「親カードから子カードへの昇格・切替」という契約上の連続性を前提にしているが、本事例では契約は新規かつ資産（ポイント）も移行されないため、既存の`CardUpgradeRelation`のセマンティクスとは異なる
- **Whether this is isolated or repeated**: 本ラウンドでは isolated（他の類似事例は未確認）
- **Confidence**: low〜medium（新規Entity導入の必要性を主張するには、最低2件の独立事例確認が望ましいが、本ラウンドでは1件のみ。既存`CardUpgradeRelation`のセマンティクス明確化・条件フラグ追加で対応できる可能性が高く、新規Entityとしての導入は時期尚早と判断）

## 候補3: Actor-level Legal Registration とTransaction-level Legal Classificationの明示的分離（仮称: PaymentSchemeLegalClassification）
- **Supporting products**: Paidy（一括あと払い vs 3・6・12回あと払い）、Kyash（Card vs イマすぐ入金、v2で既発見）
- **Number of independent examples**: 2件（Paidy、Kyash）、事業者は異なるが構造的パターンは類似
- **Why existing concepts are insufficient**: 既存の`PaymentModelType`はCardProduct単位の列挙型であり、1事業者が複数の法的性質の異なる支払スキームを提供するケースを表現できない
- **Whether this is isolated or repeated**: repeated market pattern（2つの独立事業者で確認）
- **Confidence**: medium〜high（新規Concept導入の妥当性が比較的強く支持される）

***

# 5. duplicate-or-overmodeled-concepts.md

- `DualIssuanceRule`と`CrossCardSynergyRule`は、いずれも「複数カード間の相互関係」を扱う点で責務が重複する可能性がある。前者は同一契約者の2枚（Visa/Mastercard等）、後者は異なる商品間（個人カードと法人カード等）のシナジーだが、両者とも「複数CardIssuance間の条件付き特典」という共通構造を持つため、上位の一般化ルール（例: MultiCardConditionRule）に統合可能か再検討の余地がある。ただし本ラウンドでは両者を統合すべきという具体的な反証は発見できておらず、判断保留とする。
- `RentGuaranteeService`は、今回の調査対象では新規の反例が見つからなかった。v2コーパスでも同様にUnknown/未検証扱いであり、既存モデルとの整合性評価には至っていない。
- `ExternalMembershipRequirement`は、EC-1の発見により「申込資格の確認」という責務に加えて「収益受益者としての外部団体」という別の責務を暗黙に負わされる可能性があることが判明した。これは責務の過度な集約（一般化しすぎ）の兆候であり、将来的に分離が必要になる可能性がある。

***

# 6. research-gaps.md

| 領域 | Unknown（確認できない） | 「存在しない」と確定したもの |
|---|---|---|
| atoneの割賦販売法上の登録区分 | Unknown（本ラウンドでも一次確認できず） | 該当なし |
| Kyash「イマすぐ入金」提供元（AGペイメントサービス）の登録状況 | Unknown | 該当なし |
| セゾンゲーミングカードDigitalのゲーミングコイン、終了後の他プログラムへの移行有無 | Unknown（公式終了案内に移行の明記なし） | 該当なし |
| UCSカードmajica以外の真の国際ブランドなしハウスカード | Unknown（本ラウンドでも新規発見なし） | 「存在しない」と確定するには全国の小売・専門店ハウスカードの網羅調査が必要であり、現時点では確定できない |
| 弁護士VISAビジネスカード提携終了後の既存会員の扱い | Unknown | 該当なし |
| 全弁協の会員個人以外への収益帰属フローの詳細（分配率、税務処理等） | Unknown（公式資料に「手数料収入となる」との記載のみ） | 該当なし |
| 日本クレジット協会の会員数（2026年7月1日時点905社）の直接公式ページ再確認 | Unknown（本ラウンドではユーザー提示情報の検証止まり、直接ページ取得未達） | 該当なし |

***

# 7. Existing Model Assessment

## Design decision: `CardProduct`と`CardVariant`の分離（ブランド差異をVariant単位で管理）
- **Assessment**: Probably supported
- **Supporting evidence**: v1/v2コーパスで確認した複数の商品（デュアル発行、ブランド別特典差異）はこの構造で説明可能
- **Counterevidence**: 本ラウンドでは直接的な反証は発見できず
- **Confidence**: medium（反証が見つからなかったことは支持の直接証拠ではないため、Strongly supportedにはしない）
- **Open questions**: セゾンゲーミングカードのように「名称は同じでも契約が完全に別」なケースがCardVariantの粒度で表現しきれるか、あるいはCardProduct自体を分けるべきかの判断基準が明確でない

## Design decision: `Member`/`CardIssuance`/`CardProduct`の三層分離
- **Assessment**: Probably supported
- **Supporting evidence**: デュアル発行、家族カード等のv2確認事例
- **Counterevidence**: EC-1で「収益受益者がMemberではなく外部団体」というケースが発見され、Member中心設計に例外があることが示された
- **Confidence**: medium
- **Open questions**: Memberを「常に個人」と固定する前提が正しいか、外部団体を別の受益者ロールとしてモデル上表現する必要があるか

## Design decision: `ProductChangeHistory`による商品終了・改定の履歴管理
- **Assessment**: Needs revision
- **Supporting evidence**: 弁護士VISAビジネスカードの提携終了はこの構造で説明可能（EC-5）
- **Counterevidence**: セゾンゲーミングカードDigitalの5段階ライフサイクル（EC-2）は、単一の`effective_to`日付では表現できない粒度の細かさを要求する
- **Confidence**: medium〜high（反証が具体的かつ複数日付で構成される実例により裏付けられている）
- **Open questions**: 機能単位のライフサイクルをどこまで細分化するべきか、粒度の設計基準が未確定

## Design decision: `PaymentModelType`をCardProduct単位で持たせる設計
- **Assessment**: Needs revision
- **Supporting evidence**: 大多数の一般カードでは1商品＝1支払モデルであり問題ない
- **Counterevidence**: Paidy（EC-4）、Kyash（v2既発見）の2つの独立事例が、1事業者が複数の法的性質の異なる支払スキームを提供する構造を示している
- **Confidence**: medium〜high（2つの独立事業者での確認により、isolated caseとは言えない）
- **Open questions**: PaymentModelTypeの付与単位をCardProductからPaymentScheme相当の粒度に変更する場合、既存の他エンティティ（EligibilityRule等）への影響範囲をどう見積もるか

## Design decision: `ExternalMembershipRequirement`による外部資格要件の表現
- **Assessment**: Needs revision
- **Supporting evidence**: 早稲田カードの校友資格要件（v1/v2確認済み）はこの構造で説明可能
- **Counterevidence**: 全弁協の事例（EC-1）では、外部資格が単なる申込条件を超えて、収益受益者としての役割も持つ
- **Confidence**: medium
- **Open questions**: 外部団体の役割を「資格確認」に限定する設計を維持するか、「収益受益者」ロールを別に追加するか

## Design decision: 招待制/一般公開の二元区分（v2で訂正済みのAmexゴールドプリファード事例が示す軸）
- **Assessment**: Probably supported（区分自体は有効だが、外部団体所属による第三の申込経路の存在を追加する必要がある）
- **Supporting evidence**: Amexゴールドプリファードの一般申込可能性（v2確認）、全弁協所属者向けの専用申込経路（EC-1）
- **Counterevidence**: 専門職団体所属者向けの専用ルートは、「一般公開」でも「純粋な招待制」でもない第三の申込経路パターンであり、二元区分では表現できない
- **Confidence**: medium
- **Open questions**: Application Routeを「一般公開／招待制」の二値ではなく、複数の並行ルート（一般公開＋外部団体限定＋招待制）を許容する多値構造にすべきか

***

# 最終サマリー

## Working domain decisionとして暫定採用可能な概念
- `CardProduct`/`CardVariant`/`CardIssuance`/`Member`の四層分離（Existing Model Assessmentは`Probably supported`、confidence: medium。Domain Specificationではworking decisionとして採用し、追加反証に応じて見直す）
- `CardPartnership`の多対多構造（`PartnerOrganization`↔`CardProduct`。全弁協の構造は既存モデルで表現可能であり、提携多対多不足という反証は成立しない）
- `disclosure_status`（unknown/undisclosed等）を明示的に持つという設計原則（本ラウンドでも複数の非公開情報に遭遇し、有効性が再確認された）

## Domain Specificationへ採用する前に再検討が必要な概念
- `ProductChangeHistory`（商品終了イベントの粒度。機能単位のライフサイクル遷移を扱えるよう責務見直しが必要）
- `PaymentModelType`（Paidy・Kyashから、Payment Scheme相当の粒度を持つDomain Conceptは有力。ただしDBカラム名、新Entity名、法的分類の保持方法は断定しない）
- `ExternalMembershipRequirement`（外部団体が「資格確認対象」であるだけでなく「収益受益者」になるケースへの対応要否）
- `CardUpgradeRelation`（名称的後継関係と契約上の連続性を区別するセマンティクスの明確化が必要）

## 一旦削除または保留した方がよい概念
- 本ラウンドでは、既存モデルの中で明確に「不要」「過剰」と断定できる概念は発見できなかった。`DualIssuanceRule`と`CrossCardSynergyRule`の責務重複可能性は指摘したが、統合すべきという確定的な反証はなく、判断保留とする。

本調査は「既存モデルを壊す事例が見つからなかった領域」を積極的な支持の証拠として扱っていない。特にCorporate card構造、Fee Model、RentGuaranteeServiceについては、反例が見つからなかったことは「調査不足で判断不能」であり、モデルが正しいことの証拠ではない。今回発見された重大な反証（EC-2の名称的後継関係、EC-4のActor/Transaction Legal Classification分離）は、いずれも既存文書で明示的に扱われていなかった観点であり、今後さらに複数の専門職団体・地域カード・法人カードのロングテール領域を追加調査することで、同種の反例がさらに発見される可能性が高いと考えられる。

---

## References

1. [bitFlyer、ビットコインが貯まるクレカをスタート | CoinDesk JAPAN（コインデスク・ジャパン）](https://www.coindeskjapan.com/131690/) - 暗号資産（仮想通貨）取引所を運営するbitFlyerは12月1日、新生銀行グループのアプラスと共同で、ビットコイン（BTC）が貯まるクレジットカードの提供を開始 ...

2. [ビットコインが貯まる bitFlyer クレカ](https://bitflyer.com/ja-jp/s/lp/creditcard)

3. [クレジットカード](https://www.zenbenkyo.or.jp/service/card.php) - 全弁協の提携クレジットカードは、組合員である弁護士でなければ所持できないものであり、高い信用度を表すものであって、全国でも多くの弁護士に利用されています。 · 提携 ...

4. [提携クレジットカード｜サービスのご案内](https://fukubenkyo.jp/service/partnership_credit/) - 提携クレジットカード（各カードの詳細は全弁協HPをご覧ください） · 弁護士DCカード · ロイヤーズ・MUFGカード・プラチナ・アメリカン・エキスプレスカード · 全弁協《セゾン》 ...

5. [弁護士専用クレジットカード（組合員のみ） | 神奈川県 ...](https://www.kanabenkyo.com/featured_item/creditcard-2/) - 提携クレジットカード（各カードの詳細は全弁協HPをご覧ください） · 弁護士DCカード · ロイヤーズ・MUFGカード・プラチナ・アメリカン・エキスプレスカード · 全弁協《セゾン》 ...

6. [[PDF] 年会費のご案内 税理士カード・プラチナ・ アメリカン ...](https://www.cr.mufg.jp/member/card/tokuyaku/nicos/pdf/e00019.pdf)

7. [[PDF] 東京税理士協同組合 - 事業案内](https://www.tozeikyo.or.jp/wp-content/themes/tozeikyo/pdf/08_brochure_business_guide_2022.pdf)

8. [弁護士DCカード / DC](http://card.h-o-w.jp/carddata/lawyer-dc-card)

9. [提携クレジットカード](https://www.osakalaw.jp/service/credit/) - 提携クレジットカードをご利用いただくと、ご本人には一切ご負担なく、協同組合に手数料収入が もたらされ、これが組合員の皆さまの福利厚生事業のために利用されています ...

10. [全弁協セゾンプラチナ･ビジネス･アメリカン･エキスプレス･カード特約](https://www.saisoncard.co.jp/news/system/kiyaku/pdf_toku/s35.pdf)

11. [CL-16-619585_2023.indd](https://www.saisoncard.co.jp/pdf/card_terms/zenbenkyo.pdf)

12. [「セゾンゲーミングカードDigital」のサービス終了について](https://www.saisoncard.co.jp/customer-support/information/240830_2/) - このたび、2025年3月31日(月)をもちまして、誠に勝手ながら「セゾンゲーミングカードDigital」のサービスを終了することとなりました。 各サービス終了ス ...

13. [ゲーマー向けクレジットカード「セゾンゲーミングカードDigital」](https://www.4gamer.net/games/999/G999905/20240830047/) - クレディセゾンは本日（2024年8月30日），「セゾンゲーミングカードDigital」のサービスを2025年3月31日に終了すると発表した。

14. [セゾンゲーミングカードをリニューアルし、新たに募集開始](https://prtimes.jp/main/html/rd/p/000000163.000004442.html) - 株式会社クレディセゾンのプレスリリース（2022年8月22日 16時10分）セゾンゲーミングカードをリニューアルし、新たに募集開始

15. [セゾンゲーミングカードのサービス終了について](https://www.saisoncard.co.jp/customer-support/information/0822gaming/) - カードのサービスが終了いたします。 カード取扱終了日の2023年3月27日(月)までゲーミングコインの交換が可能です。また、3月 コインは失効となります。

16. [クレジットカード発行会社一覧](https://www.bandainamcoid.com/portal/creditCardCompany)
