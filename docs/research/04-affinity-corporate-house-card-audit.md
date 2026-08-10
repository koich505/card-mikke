# クレジットカードドメイン設計 追加調査レポート（04）

本調査は`01-market-corpus-v1.md`（過去調査記録）、`02-market-corpus-v2-audited.md`（現時点正本）、`03-domain-counterexample-audit.md`（反証調査、全弁協事例中心）を前提とし、02を市場事実の正本、03をドメインモデル反証の出発点として扱った上で、既存文書がまだ薄い領域（専門職団体カードの複数独立事例、法人・パーチェシング・経費精算連携、アフィニティ／ハウスカード／地域カードのロングテール構造）について、Tier1〜Tier4の情報源を用いて追加確認を行った結果をまとめる。人気ランキングではなく、構造が異なる実例・例外の発見を目的としており、単一事例による一般化は避け、可能な限り独立した複数発行会社での確認を行った。

***

## 領域1: 専門職団体カード（医師）— 全弁協以外の独立事例

`03-domain-counterexample-audit.md`のEC-1は弁護士（全弁協）の「1団体×4社イシュア並行」構造を扱っているが、医師領域には構造の異なる独立事例が複数存在する。これは「専門職団体提携カード」というパターン自体がisolated edge caseではなくrepeated market patternであることを補強する材料になる。

### 構造パターン: スイッチ・カード（二重加盟店網・二重請求主体）

**商品名**: JAPAN DOCTOR'S CARD（JDカード）

- **対象単位**: Product（複数都道府県医師協同組合が各地で発行主体となる並行商品群）
- **観測された事実**: 通常のVisaカードとして世界中のVisa加盟店で利用できる一方、全国のJDカード加盟店（百貨店・ホテル・レストラン等、約400〜450店）で利用すると独自の割引・優待が受けられる「スイッチ・カード」と呼ばれる仕組みを持つ。[^1][^2][^3]
- **適用条件**: 医師協同組合の組合員である医師とその家族のみが保有可能。[^4]
- **対象者・対象取引**: 個人（本会員）および家族会員。法人カード（代表者が医師である医療法人、または個人開業医向け）も別途存在する。[^5]
- **除外条件**: 分割・ボーナス払い等は利用不可で一括払いのみに限定される都道府県協同組合もある。[^1]
- **金額・率・回数・上限**: 一般カード利用限度額130万円、ゴールドカード200万円（協同組合により差異あり）。年会費は一般カード無料、ゴールドカード初年度5,000円・次年度10,000円等（協同組合ごとに異なる）。[^6][^7]
- **開始日・終了日・集計期間**: Unknown（発行開始年は都道府県ごとに異なり本ラウンドで特定できず）。
- **関係する事業者と役割**: Issuer/Billing entity（JDカード加盟店利用分）＝各都道府県医師協同組合、Issuer/Billing entity（通常Visa加盟店利用分）＝三井住友カード株式会社、International brand＝Visa、Partner network＝JDカード加盟店・協賛店（百貨店・ホテル等）。石川県医師協同組合の資料によれば、医師協加盟店での利用分は医師協同組合からの請求、それ以外のVisa加盟店利用分はカード会社（三井住友カード）からの請求という**二重請求構造**が明記されている。[^8][^9][^1]
- **現在の状態**: 新規受付中（複数の都道府県医師協同組合で確認）。[^10][^6]
- **公式一次情報URL**: https://ishikawa-ikyo.jp/wp-content/uploads/2024/07/jd_card.pdf ／ https://y-ikyo.or.jp/service/welfare/jdc/ ／ https://www.hmca.or.jp/jdcard.html ／ https://kmca.or.jp/card
- **ページタイトル**: 「スライド1（JDカード案内）」「JDカード」「JDカード｜広島県医師協同組合」「カード事業」
- **発行・公開主体**: 石川県医師協同組合、山口県医師協同組合、広島県医師協同組合、香川医師協同組合
- **公開日または改定日**: Unknown（PDF更新日2024年7月確認分あり）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier3（専門職団体公式）
- **Disclosure status**: disclosed
- **Confidence**: high（4団体で同一構造を独立確認）
- **既存文書との整合性**: 02/03ではUnknown・未確認とされていた専門職団体カードの領域を補完する。全弁協（弁護士）と異なり、JDカードは「単一ブランド名・複数地域発行主体」という並行構造を持ち、EC-1とは異なる構造パターンである。
- **既存モデルで表現しにくい点**: 「1つの加盟店網（JD加盟店）」に対して「地域ごとに異なる法的請求主体（各都道府県医師協同組合）」が対応するため、`CardPartnership`を単純に「1商品×1提携先」とするモデルでは、地域協同組合ごとの独立した請求主体を表現しづらい。また同一取引でも加盟店の種別（JD加盟店か否か）によって請求元（Billing Entity）が動的に切り替わる点は、既存の`Billing`概念が「カード単位で固定」であることを前提にしている場合、モデル上の反証点になりうる。
- **追加確認が必要な点**: JDカードの発行開始年・全国医師協同組合連合会（全医協連）と各地方医師協同組合の法的関係（連合会と単位組合の関係が全弁協と類似構造か）、都道府県間でのJDカード規約の差異の網羅確認。

### 構造パターン: 学会提携ゴールドカード（専門職団体≠学会の並存）

**商品名**: 形成外科学会VISAゴールドカード、脳神経外科学会VISAゴールドカード、整形外科学会MUFGゴールドカード

- **対象単位**: Offering（既存ゴールドカードに対する会員資格連動の年会費優遇プラン）
- **観測された事実**: 医師協同組合とは別に、各種専門医学会が独自にカード会社と提携し、学会員向けの優遇条件付きゴールドカードを提供している事例が存在する。[^11]
- **適用条件・対象者**: 各学会の会員であること（詳細な入会資格はTier4止まりで一次確認未達）。
- **金額・率・上限**: Unknown（一次情報未到達）。
- **関係する事業者と役割**: Affinity partner＝各専門医学会、Issuer＝三井住友カード（Visa系）またはMUFGカード。
- **現在の状態**: Unknown（Tier4記述のみ）。
- **公式一次情報URL**: 一次情報未発見（Tier4: https://dr-sleepy.com/drs_credit_card/）
- **Evidence Tier**: Tier4（発見用途のみ、事実確定には不十分）
- **Disclosure status**: unknown
- **Confidence**: low
- **既存文書との整合性**: 02/03いずれにも記載なし。新規発見領域。
- **既存モデルで表現しにくい点**: 医師という「職業資格」と、学会という「専門分野コミュニティ資格」が異なる粒度の外部資格として並存する可能性を示す。`ExternalMembershipRequirement`が「医師免許」なのか「学会会員資格」なのか、要件の種類を区別する必要が生じうる。
- **追加確認が必要な点**: 各学会公式サイトでの一次情報確認（本ラウンド未達、存在しないと断定はしない）。

### 構造パターン: 会員資格の身分証明機能とカードの一体化

**商品名**: ドクターズUCゴールドカード

- **対象単位**: Product
- **観測された事実**: ユーシーカード株式会社が全国医師協同組合連合会と提携し、2004年1月5日より発行開始した「医師限定の身分証明証機能付きカード」である。日本には医師の公的身分証明書が存在しないため、緊急時の身分証明に使えることを商品目的として明記している。[^12]
- **対象者・対象取引**: 全国医師協同組合連合会傘下の医師。
- **開始日**: 2004年1月5日発行開始。[^12]
- **関係する事業者と役割**: Issuer＝ユーシーカード株式会社、Affinity partner＝全国医師協同組合連合会。
- **現在の状態**: Unknown（2004年当時のプレスリリースのみ確認、現存有無は本ラウンド未確認）。
- **公式一次情報URL**: https://www2.uccard.co.jp/uc/profile/news_r/pdf/news_r321.pdf
- **ページタイトル**: 「リリース（全国医師協同組合連合会と提携　ＵＣカード、医師限定の身分証明証機能付カード）」
- **発行・公開主体**: ユーシーカード株式会社
- **公開日**: 2004年（正確な発表日は本文中に明記なし、発行開始日2004年1月5日）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（発行会社公式プレスリリース）
- **Disclosure status**: disclosed
- **Confidence**: medium（現存状況未確認のためlifecycle statusはUnknown）
- **既存文書との整合性**: 全弁協・JDカードとは別イシュア（UCカード）による医師向け専門職団体カードの独立事例。「専門職団体カード」パターンが複数の異なる発行会社（三井住友カード、ユーシーカード）にまたがって観測されたことになり、repeated market patternとしての根拠が強まる。
- **既存モデルで表現しにくい点**: カードが決済手段としての機能に加えて「公的身分証明の代替」という非決済的な機能的価値を持つ点。既存モデルの`Benefit`や`RewardProgram`は経済的便益を前提にしている可能性があり、「身分証明機能」という非経済的Benefit種別の要否を検討する必要がある。
- **追加確認が必要な点**: 2026年時点での本カードの存続状況（Lifecycle Status）。

### 構造パターン: 職域統一決済インフラ（カード発行と別契約のキャッシュレス基盤）

**商品名**: 日本医師会員向けキャッシュレスサービス

- **対象単位**: Offering（既存クレジットカードとは独立した、医療機関向け決済受入インフラ）
- **観測された事実**: 日本医師会が、日本医師会ORCA管理機構株式会社を包括代理店として、日医会員（医療機関側）向けにVisa・Mastercard決済手数料率1.45%、JCB等も同程度という優遇レートを提供している。これは会員が「カードを保有する」側の優待ではなく、会員（医療機関）が「決済を受け入れる」側（加盟店契約）の優待である。[^13][^14]
- **対象者・対象取引**: 日本医師会員（医療機関）。個人の医師会員に自動付帯されるものではなく、別途申込が必要。
- **金額・率**: 決済手数料率1.45%（非課税、Visa/Mastercard）、電子マネー2.53%（税込オプション）、月額利用料無料、端末初期費用無償（1台まで）。[^14]
- **開始日**: 2021年7月サービス開始（手数料率1.5%）、2023年6月より1.45%へ改定。[^13][^14]
- **関係する事業者と役割**: Affinity partner/Membership operator＝日本医師会、Payment aggregator/Acquiring代理店＝日本医師会ORCA管理機構株式会社、Card networks＝Visa、Mastercard、JCB等。
- **現在の状態**: 提供中。
- **公式一次情報URL**: https://www.orcamo.co.jp/products/cashless.html ／ https://www.med.or.jp/nichiionline/article/011252.html
- **ページタイトル**: 「日本医師会員向けキャッシュレスサービス」「『日本医師会員向けキャッシュレスサービス』の手数料が低減」
- **発行・公開主体**: 日本医師会ORCA管理機構株式会社、公益社団法人日本医師会
- **公開日または改定日**: 2023-08-04（手数料改定記事）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（会員団体・関連会社公式）
- **Disclosure status**: disclosed
- **Confidence**: high
- **既存文書との整合性**: 02/03に記載なし。新規発見。専門職団体が「会員向けカード発行」ではなく「会員（加盟店側）向け決済受入優遇」という全く逆方向のサービスを提供する構造であり、既存のCard発行中心モデルの範囲外にある事例。
- **既存モデルで表現しにくい点**: 既存モデルはMemberを「カード保有者（消費者）」と暗黙に想定している可能性が高いが、本事例のMemberは「加盟店（Acquiring契約者）」である。Actor Roleとして「Cardholder Member」と「Merchant Member」を区別する必要性を示す。
- **追加確認が必要な点**: 個人医師が直接享受できる便益があるか（本調査では医療機関＝加盟店側の便益のみ確認）。

***

## 領域2: 法人・パーチェシング・経費精算連携のロングテール構造

02では三菱UFJカード パーチェシング、JCBパーチェシングサービスの実在が確認済みだが、本ラウンドでは独立した複数発行会社によるパーチェシングカード・経費精算連携カードの並行事例を追加確認した。

### 構造パターン: 複数イシュアによるパーチェシングカードの並行存在

**商品名**: 三井住友パーチェシングカード／三井住友ビジネスパーチェシングカード、UCパーチェシングカード、りそなVISAパーチェシングカード、JCBパーチェシングサービス

- **対象単位**: Product（非発行型・カードレス決済専用商品）
- **観測された事実**: 経費精算システム「経費BANK」の連携先一覧によると、JCB、三井住友カード、ユーシーカード（クレディセゾン系）、りそなカードの少なくとも4社が、それぞれ独立して「パーチェシングカード」（あるいはパーチェシングサービス）を提供している。三井住友カードは「三井住友パーチェシングカード」と「三井住友ビジネスパーチェシングカード」という2種類のパーチェシング商品を並行提供している。[^15]
- **適用条件・対象者・対象取引**: B2B購買決済専用。カード実物発行を伴わない請求書一本化型が中心（Unknown: 各社の具体的な申込資格の詳細は本ラウンド未確認）。
- **除外条件**: Unknown。
- **金額・率・回数・上限**: Unknown（各社個別確認が必要）。
- **関係する事業者と役割**: Issuer＝JCB、三井住友カード、ユーシーカード、りそなカード（各社独立）、Aggregator/連携先＝株式会社SBIビジネス・ソリューションズ（経費BANK運営）。
- **現在の状態**: 提供中（連携先リストに現行製品として記載）。[^15]
- **公式一次情報URL**: https://kb2.sbi-bs.co.jp/function/creditcard/
- **ページタイトル**: 「クレジットカード連携 - 経費精算システム『経費BANK』」
- **発行・公開主体**: 株式会社SBIビジネス・ソリューションズ
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier4（経費精算ベンダーの連携先一覧、各カード会社自身の商品ページではない）
- **Disclosure status**: partially_disclosed
- **Confidence**: medium（存在自体は複数商品名の列挙により裏付けられるが、条件詳細はTier2での個別再確認が必要）
- **既存文書との整合性**: 02のパーチェシングカード確認（三菱UFJ、JCB）を補完し、三井住友・りそな・UCの独立事例を追加。4社以上の独立イシュアがパーチェシングカードを提供していることから、「非発行型・カードレスB2B決済」はrepeated market patternと判断できる（3件以上の独立事例基準を満たす）。
- **既存モデルで表現しにくい点**: パーチェシングカードは「カードを持たない決済主体」であるため、既存モデルが`CardIssuance`（物理・デジタルの発行行為）を前提にしている場合、非発行型商品を`CardProduct`のサブタイプとして扱うか、別のPayment Scheme概念として扱うかの判断が必要になる。
- **追加確認が必要な点**: 各社パーチェシングカードの一次情報（商品ページ）での申込資格・限度額・請求方式の個別確認。

### 構造パターン: 経費精算システム発行型カード（カード会社を介さない発行主体）

**商品名**: 楽楽ビジネスカード、freeeカード Unlimited

- **対象単位**: Product（経費精算SaaS事業者自身が発行主体となるカード）
- **観測された事実**: 株式会社ラクスが2026年5月26日より「楽楽ビジネスカード」の提供を開始した。これはVisa加盟店で利用可能なクレジットカードで、発行形態はリアルカード・バーチャルカードの両方があり、発行手数料は形態を問わず無料、発行枚数上限は原則無制限（カード会社判断による制限はあり）である。freeeも独自与信で最高限度額1億円の「freeeカード Unlimited」を提供し、追加カードを100枚まで発行可能としている。[^16][^17]
- **適用条件・対象者・対象取引**: 法人・個人事業主。既存の銀行系・信販系カード会社とは異なる、経費精算SaaS事業者自身が独自与信でカードを発行する構造。
- **金額・率・回数・上限**: 楽楽ビジネスカードは海外サービス手数料3.63%（税込）、発行枚数上限は無制限（ただしカード会社判断による制限の可能性を明記）。freeeカード Unlimitedは独自与信で最高限度額1億円、追加カード上限100枚。[^17][^16]
- **関係する事業者と役割**: Issuer/Underwriter＝経費精算SaaS事業者自身（ラクス、freee）、International brand＝Visa（楽楽ビジネスカードで確認）。Card manufacturing/Actual issuing bankがSaaS事業者と同一かは本ラウンド未確認。
- **現在の状態**: 提供中（楽楽ビジネスカードは2026年5月26日提供開始の新しい商品）。
- **公式一次情報URL**: https://www.rakus.co.jp/rakurakucloud/seisan/news/news260528.php ／ https://www.freee.co.jp/payment/card/
- **ページタイトル**: 「法人カード『楽楽ビジネスカード』を提供開始」「会計業務を効率化する法人カード｜freeeカード Unlimited」
- **発行・公開主体**: 株式会社ラクス、freee株式会社
- **公開日**: 2026-05-27（楽楽ビジネスカード）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（発行会社公式プレスリリース・商品ページ）
- **Disclosure status**: disclosed
- **Confidence**: high
- **既存文書との整合性**: 01/02いずれにも記載のない新規発見領域。「カード会社（銀行系・信販系・国際ブランド系イシュア）以外の主体が独自与信でカードを発行する」構造は、01の「Issuer類型」表に新たな類型（SaaS/経費精算事業者系）を追加する必要性を示唆する。
- **既存モデルで表現しにくい点**: 既存の「Issuer類型」（メガバンク系、信販系、流通小売系等、01 Section 3参照）のいずれにも該当しない新カテゴリであり、Credit underwriting（与信審査）をカード会社自身ではなくSaaS事業者が担う点が特異。また「発行枚数無制限・追加カード100枚」という枠組みは、既存モデルの`CardIssuance`が「Member 1名につきカード数枚」を暗黙の前提にしている場合、大量の追加カード発行（部門・プロジェクト単位）を表現する上での参照点になる。
- **追加確認が必要な点**: 楽楽ビジネスカード・freeeカード Unlimitedの実際のIssuer/Credit provider（提携先銀行等が背後に存在するか）の一次確認。

### 構造パターン: 経費精算システムにおける「コーポレートカード」という会計上の区分（Actorではなく会計フラグ）

**商品名**: TOKIUM経費精算「コーポレートカード」登録機能

- **対象単位**: Offering／システム上のフラグ（商品ではなく会計処理区分）
- **観測された事実**: TOKIUM経費精算では、既存の任意のクレジットカードを「コーポレートカード」として登録すると、そのカード利用分は「精算対象外（会社負担のため立替経費ではない）」として扱われ、社員への個人精算対象から自動的に除外され、会計ソフトのみへ連携される。[^18]
- **適用条件**: カード自体の種類を問わず、システム上の登録区分（会社名義／会社負担）によって決まる。
- **関係する事業者と役割**: SaaS提供者＝株式会社TOKIUM、カード発行会社＝任意（ユーザーが既に保有する任意のカード）。
- **現在の状態**: 提供中。
- **公式一次情報URL**: https://www.keihi.com/column/1572/
- **ページタイトル**: 「法人カードによる経費精算とは？メリット・注意点・導入時のルール」
- **発行・公開主体**: 株式会社TOKIUM
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier4（SaaS事業者のブログ記事、製品仕様の一次確認としてはTier2に近いが記事形式のため暫定Tier4）
- **Disclosure status**: disclosed
- **Confidence**: medium
- **既存文書との整合性**: 新規発見。「法人カード」であるか否かはカード自体の商品属性ではなく、経費精算システム側の会計処理区分として利用者が任意に設定できる、という点が重要な構造上の示唆。
- **既存モデルで表現しにくい点**: 既存モデルが「Personal/Business」をCardProduct属性として固定的に持たせている場合、本事例は「同一の物理カードが、外部システムの設定次第でBusiness決済扱いにもPersonal決済扱いにもなりうる」ことを示し、支払責任者（Payment responsible party）の区分がカード発行時点で確定するとは限らないという反証材料になる。
- **追加確認が必要な点**: TOKIUM公式ヘルプページでの一次確認（本ラウンドは二次情報止まり）。

### 構造パターン: 経費精算SaaS事業者ごとの対応カード限定（連携可否のホワイトリスト構造）

**商品名**: 楽楽精算 対応法人カード一覧（JCBビジネスカード、三井住友コーポレートカード、アメックス・コーポレート・カード、TOKYU CARD コーポレートカード、りそなコーポレートカード、UCコーポレートカード、MUFGカード ゴールドプレステージコーポレート、TS3コーポレートカード等）

- **対象単位**: Offering（連携可否という属性がCardProductとSaaSプロダクトの組み合わせごとに定義される）
- **観測された事実**: 楽楽精算は「連携可能なクレジットカード」を商品名単位でホワイトリスト化しており、対応外の法人カードは自動連携できない。TS3コーポレートカードは「トヨタグループ法人のみが入会対象」という発行主体側の資格制限が明記されている。[^19]
- **対象者・対象取引**: TS3コーポレートカードはトヨタグループ法人に限定。
- **除外条件**: 楽楽精算は「法人契約のクレジットカードのみ連携できる」とし、個人契約カードは対象外。[^19]
- **関係する事業者と役割**: SaaS提供者＝株式会社ラクス、カード発行会社＝JCB、三井住友カード、アメックス、東急、りそな、UC、三菱UFJニコス等（多数、独立）。
- **現在の状態**: 提供中。
- **公式一次情報URL**: https://www.rakus.co.jp/rakurakucloud/seisan/function/credit.php
- **ページタイトル**: 「クレジットカード・プリペイドカード連携機能のご紹介」
- **発行・公開主体**: 株式会社ラクス
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（SaaS提供者公式機能ページ、カード会社側の一次情報ではないため商品条件はTier3相当）
- **Disclosure status**: disclosed
- **Confidence**: medium-high
- **既存文書との整合性**: 新規発見。TS3コーポレートカード（トヨタグループ限定）は、法人カードの中にも「グループ企業限定」という特殊な申込資格を持つ商品が存在することを示す独立事例であり、専門職団体カードの「外部資格限定」パターンが法人カード領域にも及ぶことを示唆する。
- **既存モデルで表現しにくい点**: 「外部資格による申込制限」は個人向け専門職団体カード（医師・弁護士）だけでなく法人カード（グループ企業限定）にも存在するという点で、`ExternalMembershipRequirement`を個人会員限定の概念として設計すると不十分になる可能性がある。
- **追加確認が必要な点**: TS3コーポレートカードの発行主体・国際ブランド・具体的申込資格の一次確認（本ラウンドは二次情報のみ）。

### 構造パターン: 法人カード限度額の部門・用途別個別設定

**商品名**: 一般論（複数の法人カード・クラウド型法人カードサービスに共通する構造、特定1商品ではなく複数事業者にまたがる観測）

- **対象単位**: Benefit／Control機能（限度額制御の構造）
- **観測された事実**: 近年、追加カードごとに限度額を個別設定できる法人カードが登場しており、部門別・役職別・用途別に利用額を管理できる（例: 営業部門は月額50万円、管理部門は月額20万円）。あるクラウド型法人カードサービスでは「事前申請の金額に応じたカード利用上限設定」「Web上で即時利用停止」「最大1億円の高額決済、1取引あたり上限なし」という機能が確認できる。[^20][^21]
- **金額・率・上限**: 一般カード10万〜100万円、ゴールドカード50万〜500万円、プラチナカード300万〜1,000万円以上が目安として提示されるが、公式な平均値データは存在しないと明記されている。[^20]
- **関係する事業者と役割**: Unknown（比較サイトの一般論記述であり特定発行会社に紐づく一次情報ではない）。
- **現在の状態**: Unknown（一般的傾向の記述）。
- **公式一次情報URL**: なし（Tier4のみ）
- **Evidence Tier**: Tier4
- **Disclosure status**: partially_disclosed
- **Confidence**: low-medium（一次情報未到達、複数のTier4記述による傾向確認のみ）
- **既存文書との整合性**: 02/03に記載のない、部門・用途単位での利用制御という調査対象領域を補完する。ただし一次情報未到達のため、確定事実としては扱わない。
- **既存モデルで表現しにくい点**: 限度額がCardProductやCardIssuance単位ではなく、「追加カードごと・部門ごと」という中間的な粒度で設定される点。この粒度を`CardIssuance`の属性とするか、別途`SpendingControlRule`のような概念を要するかは未確定。
- **追加確認が必要な点**: 具体的なカード会社（三井住友ビジネスカード、JCB法人カード等）の公式商品ページでの部門別限度額設定機能の一次確認が必要（本ラウンドでは未達、Unknownとする）。

***

## 領域3: アフィニティ・ハウスカード・地域協同組合カードのロングテール構造

### 構造パターン: 会員証・交通系IC・クレジットの三位一体、かつ複数発行主体の三社提携

**商品名**: タカラヅカレビュー STACIA VISAカード（P/無印/STACIAカード/ジュニアカード の4バリエーション）

- **対象単位**: CardVariant（同一Product内の4バリエーション、うち1つは国際ブランドなし）
- **観測された事実**: 「宝塚友の会」（宝塚歌劇のオフィシャルファンクラブ）の会員証カード機能を持つカード群で、阪急電鉄株式会社・株式会社阪急阪神カード・三井住友カード株式会社の三社が提携して発行する。4種のバリエーション（STACIA VISAカードP＝PiTaPa+Visa+会員証、STACIA VISAカード＝Visa+会員証、STACIAカード＝会員証のみ・国際ブランドなし、STACIAジュニアカード＝18歳未満向け）が並行提供される。[^22][^23][^24][^25]
- **適用条件・対象者**: 本会員は18歳以上、ジュニア会員は中学生以上18歳未満で親権者が契約者となり使用者がジュニア会員となる特殊な契約構造を持つ。[^26]
- **除外条件**: STACIAジュニアカードはインターネット申込不可。[^26]
- **金額・率・回数・上限**: クレジット年会費は本会員1,375円（税込、初年度無料、前年1回以上利用で次年度無料）、宝塚友の会入会金1,100円・年会費3,300円は別建て、STACIAカード（クレジットなし）は年会費550円。[^25][^22]
- **開始日・終了日・集計期間**: サービス適用期間は会員証カード到着後1年間、以降は会員月から1年ごと。[^25]
- **関係する事業者と役割**: Affinity partner/Membership operator＝阪急電鉄（宝塚友の会運営）、Issuer（クレジット部分）＝三井住友カード、Co-issuer＝株式会社阪急阪神カード、Transit payment operator＝PiTaPa（STACIA VISAカードPのみ）、Reward operator＝阪急阪神カード（Sポイント）。[^24][^22]
- **現在の状態**: 新規受付中。
- **公式一次情報URL**: https://stacia.jp/lineup/takarazuka_visa/ ／ https://stacia.jp/privacy/takarazuka/ ／ https://faq.kageki.hankyu.co.jp/faq/show/224
- **ページタイトル**: 「タカラヅカレビューSTACIA スタシアVISAカード」「タカラヅカレビューSTACIAカード会員規約等」
- **発行・公開主体**: 阪急電鉄株式会社、株式会社阪急阪神カード、三井住友カード株式会社
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（発行三社公式規約・商品ページ）
- **Disclosure status**: disclosed
- **Confidence**: high
- **既存文書との整合性**: 02/03に記載のない新規発見。全弁協（EC-1）が「1団体×4イシュア×別商品」であるのに対し、STACIAは「1団体×1商品名×3社共同発行（うち1社は交通系IC運営者）」という異なる多者提携構造であり、多対多構造の別バリエーションを提供する。
- **既存モデルで表現しにくい点**: (1) 同一商品名の中に「国際ブランドあり」「国際ブランドなし（会員証専用）」のバリエーションが両方存在し、`CardVariant`の分岐軸が単なるブランド選択ではなく「クレジット機能の有無」自体に及ぶ。(2) ジュニアカードは契約者（親権者）と使用者（ジュニア会員）が異なるという、通常の家族カード（本会員が使用者兼実質契約者）とも異なる三者構造を持つ。(3) 発行が2社（阪急阪神カードと三井住友カード）による共同発行であり、単純な「Issuer 1社」を前提にした`CardIssuance`では表現しにくい。
- **追加確認が必要な点**: 阪急阪神カードと三井住友カードの間での収益分配・請求責任の分担詳細（本ラウンド未確認）。

### 構造パターン: 保証金預託制ハウスカード（デポジット型×国際ブランドなし×地域交通)の終了事例

**商品名**: 保証金預託制PiTaPaカード

- **対象単位**: Product（Lifecycle Status: サービス終了済み）
- **観測された事実**: PiTaPaベーシックカードのうち、保証金を預託することで無審査発行が可能な「保証金預託制PiTaPa」は、2026年3月31日をもってサービスを終了した。保証金額は利用枠に応じて4万円（月間利用枠1万円）〜20万円（月間利用枠5万円）の段階制であった。[^27][^28]
- **適用条件**: 保証金額と月間交通利用枠が比例する段階制（例: 保証金4万円→利用枠1万円、20万円→5万円）。[^28]
- **金額・率・回数・上限**: 維持管理料1,100円（税込）/年、年1回以上の利用で無料。オートチャージ金額一律2,000円（キッズカードは1,000円）。[^28]
- **開始日・終了日**: 終了日2026年3月31日、2026年2月・3月利用分の引き落としは2026年4月10日・5月11日。[^27]
- **関係する事業者と役割**: Issuer＝スルッとKANSAI（PiTaPa運営）。
- **現在の状態**: サービス終了済み（新規受付・既存利用ともに終了）。
- **公式一次情報URL**: https://www.pitapa.com/link/deposit ／ https://www.pitapa.com/direct/agreement/yotaku_pitapa_hosoku.pdf
- **ページタイトル**: 「保証金預託制PiTaPaカードをお持ちの方へ」「保証金預託制PiTaPa会員規約の補足事項」
- **発行・公開主体**: 株式会社スルッとKANSAI
- **公開日または改定日**: 終了告知（時期不明、確認時点で既に終了案内が掲載）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（運営会社公式）
- **Disclosure status**: disclosed
- **Confidence**: high
- **既存文書との整合性**: 02はライフカードのデポジット型カード実在を確認済みだが、本事例は「国際ブランドなし×交通系×デポジット型」という異なる組み合わせの独立事例であり、かつ2026年3月末で新規終了・完全サービス終了に至った点が新規情報である。ハウスカード（国際ブランドなし）の一種として、02が「未発見」としていたUCSカードmajica以外の真の国際ブランドなしハウスカード事例に該当する可能性が高い。
- **既存モデルで表現しにくい点**: 保証金額と利用枠が段階的テーブルで対応する構造（既存の`Deposit`概念が単一保証金額のみを想定している場合、テーブル型の対応関係を表現する必要がある）。またサービス終了が「新規受付停止」ではなく「既存会員含む完全終了」である点は、02のライフカードのデポジット型（受付継続中）と対照的なLifecycle Statusの反例になる。
- **追加確認が必要な点**: 「保証金預託制PiTaPaカード」が国際ブランドを一切持たない真のハウスカードに該当するか（Wikipediaの記述では「事実上のハウスカード」と表現され、純粋なハウスカードとは別カテゴリの可能性がある）の一次確認。[^29]

### 構造パターン: 単一飲食店グループのステータス・ハウスカード（ポイントでなくギフトカード付与）

**商品名**: 中納言グルメイトPLUSカード

- **対象単位**: Product
- **観測された事実**: ライフカード株式会社と株式会社中納言（伊勢海老料理店）が提携し、2024年10月7日より募集開始したカードで、年会費無料、常時10%飲食代割引、誕生月に3,000円分お食事券、利用10万円ごとに3,000円分の中納言グループギフトカードが付与される。[^30][^31]
- **適用条件**: 日本国内在住18歳以上、電話連絡可能な方。[^31]
- **対象者・対象取引**: 中納言およびグループ店（オステリアガウダンテ、マレロッソ）での利用が優待対象。
- **金額・率・回数・上限**: 飲食代常時10%オフ、10万円ごとに3,000円分ギフトカード（還元率換算で約3%相当）。[^30]
- **開始日**: 2024年10月7日募集開始。[^30]
- **関係する事業者と役割**: Issuer＝ライフカード株式会社（規約上の「乙」）、Partner＝株式会社中納言（規約上の「甲」）。会員規約上、カードの所有権は発行会社（乙＝ライフカード）に帰属すると明記されている。[^32]
- **現在の状態**: 新規受付中。
- **公式一次情報URL**: https://www.lifecard.co.jp/dynamic/pdf/nyukai/chunagon_kiyaku.pdf
- **ページタイトル**: 「中納言グルメイトPLUSカード会員規約」
- **発行・公開主体**: ライフカード株式会社
- **公開日または改定日**: 2025年9月30日現在（規約PDF記載の基準日）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（発行会社公式規約PDF）
- **Disclosure status**: disclosed
- **Confidence**: high
- **既存文書との整合性**: 02/03に記載なし。Wikipedia「ハウスカード」記事はこのカードを「国際ブランドなしハウスカード」の新規事例（2024年10月7日発行開始）として明記しており、02が「未発見」としていたUCSカードmajica以外の真のハウスカード事例として、保証金預託制PiTaPaと合わせて2件目の候補になる。[^29]
- **既存モデルで表現しにくい点**: RewardがポイントやマイルではなくGift Card（グループ内利用限定の金券）として付与される点。既存の`RewardProgram`/`PointBalance`概念がポイント通貨を前提としている場合、金券直接付与型のBenefitを別のReward種別として区別する必要性を示す。
- **追加確認が必要な点**: 本カードの国際ブランド有無の直接記述が規約PDF内で確認しきれておらず、Wikipedia（Tier4）の「ハウスカード」分類との整合をライフカード公式の商品ページで再確認する必要がある。

### 構造パターン: 球団単位のファンクラブ提携×収益分配なしポイント景品化

**商品名**: クラブホークスエポスカード

- **対象単位**: Product
- **観測された事実**: 福岡ソフトバンクホークス株式会社と株式会社エポスカードが提携し、2015年2月1日より公式ファンクラブ提携カード「クラブホークスエポスカード」を発行開始した。入会特典として球場内ショップで使える2,000円相当の買物券、カード利用で貯まるエポスポイントを球団オリジナルグッズに交換できるサービスを提供する。[^33]
- **対象者・対象取引**: 福岡ソフトバンクホークス公式ファンクラブ会員（西武ライオンズファンクラブカードのようにファンクラブ入会が前提となる構造もある）。[^34]
- **金額・率・回数・上限**: 年会費永年無料、入会特典2,000円相当の買物券。[^33]
- **開始日**: 2015年2月1日発行開始。[^33]
- **関係する事業者と役割**: Issuer＝株式会社エポスカード（丸井グループ）、Affinity partner＝福岡ソフトバンクホークス株式会社、International brand＝Visa、Reward operator＝エポスカード（エポスポイント）。
- **現在の状態**: Unknown（2015年当時のプレスリリースのみ確認、現存有無は本ラウンド未確認）。
- **公式一次情報URL**: https://pdf.0101maruigroup.co.jp/pdf/settlement/15_0109/15_0109_1.pdf
- **ページタイトル**: 「福岡ソフトバンクホークスとカード事業で提携」
- **発行・公開主体**: 株式会社丸井グループ、福岡ソフトバンクホークス株式会社
- **公開日**: 発表日不明（発行開始2015年2月1日）
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier2（発行会社・提携先共同プレスリリース）
- **Disclosure status**: disclosed
- **Confidence**: medium（現存状況未確認）
- **既存文書との整合性**: 02はゲーム/エンタメ提携（セゾンゲーミングカード）を確認済みだが、球団・スポーツ系提携は01の「9.3 発見できていない可能性が高い商品類型」に明記されていた領域であり、本事例で新規補完される。JCBの「セ・リーグ球団統一提携カード（JCBセントラルオフィシャルカード）」、楽天の「楽天カード 楽天イーグルスデザイン」、千葉ロッテマリーンズVISAカード等、複数の独立発行会社（エポス、JCB、楽天）による球団提携カードが確認でき、repeated market patternと言える。[^35][^36]
- **既存モデルで表現しにくい点**: ポイントが「グループ景品（球団グッズ）への交換」という、通常の金銭的キャッシュバックやマイルとは異なる非流動的Reward種別を持つ点。またファンクラブという外部組織への入会が申込前提となる点は、EC-1（弁護士協同組合）と類似する「外部会員資格が前提」パターンの、専門職団体以外（エンタメ・スポーツ）への拡張例である。
- **追加確認が必要な点**: クラブホークスエポスカードの現存状況（2026年時点で新規受付継続中か終了済みか）。

### 構造パターン: 統一ブランド名の下での地域別複数発行主体（協同組合系カード）

**商品名**: JAカード（農業協同組合系）

- **対象単位**: Product（全国のJA単位組合ごとに独立した発行契約が存在する可能性）
- **観測された事実**: JAカードは「協同クレジットサービス」というかつて存在したカード会社が発行していたが、2006年10月1日以降、NICOS/VISAブランドのJAカードとして仕組みが刷新され、地方会社（例: 秋田ニコス）が存在する地域では当該地域会社が、存在しない地域では三菱UFJニコスが発行会社となる、という地域ごとに異なる発行主体を持つ構造が確認された。特典として、JA直売所・ファーマーズマーケットでの5%割引、JA-SS・ホクレンSSでの給油2円/L割引等が付帯する。[^37][^38][^39]
- **対象者・対象取引**: JA組合員・利用者。
- **金額・率**: JA直売所5%割引、給油2円/L割引、Aコープ等購買店舗で通常ポイント+2%還元。[^38]
- **開始日**: 2006年10月1日よりNICOS/VISAブランドへ移行（従前利用者は新規申込が必要）。[^37]
- **関係する事業者と役割**: Affinity/Membership operator＝各地域JA（農業協同組合）、Issuer＝三菱UFJニコスまたは地方信販会社（地域により異なる）、International brand＝Visa、Mastercard。[^37]
- **現在の状態**: 新規受付中（各地のJA公式サイトで確認）。
- **公式一次情報URL**: https://www.ja-toyohashi.com/bank_ja_credit_card.php ／ https://ja.wikipedia.org/wiki/協同クレジットサービス ／ https://www.ja-awa.or.jp/contents/detail/id=617
- **ページタイトル**: 「JAのクレジットカード」「協同クレジットサービス」「JAカード（クレジットカード）」
- **発行・公開主体**: 豊橋農業協同組合、徳島県農業協同組合中央会等、複数のJA単位組合
- **確認日**: 2026-08-10
- **Evidence Tier**: Tier3（地域協同組合公式サイト）／Tier4（Wikipedia、発行体構造の経緯説明部分）
- **Disclosure status**: disclosed
- **Confidence**: medium-high（発行主体が地域ごとに異なるという構造は複数のJA公式サイトと歴史的経緯記事で整合するが、現行の正確な発行体マッピングの全件確認はできていない）
- **既存文書との整合性**: 02/03に記載なし。全弁協・JDカードとは異なる「地域協同組合×統一ブランド名×地域ごとに異なる発行体」という第三の多対多構造パターンであり、協同組合系カードにおけるActor Role分離の別事例として重要。
- **既存モデルで表現しにくい点**: 「JAカード」という単一ブランド名の下で、実際の発行会社（Issuer/Billing entity）が地域によって異なるという構造は、`CardProduct`を単一の発行主体に紐づける設計だと表現できない。ブランド名（Product Name）とActor（Issuer）を分離し、地域ごとに異なるIssuerを持つバリエーションとして扱う必要性を示す。
- **追加確認が必要な点**: 現在（2026年時点）の全国JA地域ごとの発行体マッピングの網羅的確認（本ラウンドは歴史的経緯と一部地域の事例確認にとどまる）。

***

## 領域4: 既存反証（EC-1〜EC-5）に対する追加の独立性検証

`03-domain-counterexample-audit.md`のEC-1（弁護士専門職団体×複数イシュア）について、本ラウンドで発見した医師領域の事例（JDカード：三井住友カード×複数地域医師協同組合、ドクターズUCゴールドカード：ユーシーカード×全国医師協同組合連合会）は、いずれも「専門職団体×カード会社の提携」という抽象パターンをEC-1とは異なる具体構造（地域分散型発行主体、身分証明機能の付加）で裏付けており、EC-1の脚注にある「弁護士カードは一団体×四社イシュア併存という点で特有」という位置づけを補強する独立証拠になる。ただし医師領域では「1団体×4社イシュア並行」という全弁協ほど極端な構造は本ラウンドで確認されず、全弁協の多重性は依然として専門職団体カードの中でも際立った事例と評価できる。

またEC-4（Paidyの事業者登録と個別支払スキームの法的性質の非対応）について、本ラウンドで新規に発見した「TS3コーポレートカード（トヨタグループ限定）」の存在は、Actor-level Legal Fact（イシュアの与信・登録）とEligibility（申込資格）の分離という別軸の反証材料であり、EC-4とは異なる観点からの補強情報として位置づけられる。

***

## 未解決のUnknown一覧（既存文書と合わせて維持すべき項目）

| 領域 | Unknown内容 | 状態 |
|---|---|---|
| 専門職団体カード（学会系） | 形成外科学会・脳神経外科学会・整形外科学会のゴールドカード一次情報 | Unknown（Tier4のみ、一次未達）[^11] |
| JDカード | 全国での発行開始年・全医協連と単位組合の法的関係 | Unknown |
| ドクターズUCゴールドカード | 2026年時点の現存状況 | Unknown |
| パーチェシングカード各社 | 三井住友・りそな・UCの申込資格・限度額詳細 | Unknown（Tier4止まり）[^15] |
| 楽楽ビジネスカード/freeeカード Unlimited | 背後の与信提携銀行の有無 | Unknown |
| TS3コーポレートカード | 発行主体・国際ブランド・具体的申込資格 | Unknown |
| 保証金預託制PiTaPa | 純粋な国際ブランドなしハウスカードに該当するかの厳密区分 | Unknown（Tier4の「事実上のハウスカード」表現のみ）[^29] |
| 中納言グルメイトPLUSカード | 国際ブランド有無の一次確認 | Unknown |
| クラブホークスエポスカード | 2026年時点の現存状況 | Unknown |
| JAカード | 全国の現行発行体マッピングの網羅確認 | Unknown |
| 部門・用途別限度額設定機能 | 特定カード会社商品での一次確認 | Unknown（Tier4のみ）[^20][^21] |

「存在しない」と断定した項目は本ラウンドでは発生していない。すべて確認未達の場合はUnknownとして維持している。

***

## ドメインモデルへの示唆（確定はせず、検討課題としてのみ提示）

1. **Billing Entityの動的切替**: JDカードのように、同一カード・同一取引でも加盟店の種別によって請求主体（Billing Entity）が動的に切り替わる構造は、`Billing`をカード単位で固定する設計に対する反証材料となる。
2. **Merchant側Member概念**: 日本医師会員向けキャッシュレスサービスのように、Memberが「カード保有者（消費者）」ではなく「加盟店（Acquiring契約者）」であるケースがあり、Actor Roleとしての「Cardholder Member」と「Merchant Member」の区別が必要になりうる。
3. **非カード会社系Issuer類型**: 楽楽ビジネスカード・freeeカード Unlimitedのような経費精算SaaS事業者自身が発行するカードは、01のIssuer類型表に新規カテゴリを追加する検討材料になる。
4. **会計処理区分としてのCorporate/Personal**: TOKIUM経費精算の事例は、Business/Personalの区分がカード発行時点で固定される属性ではなく、外部システム側の設定で事後的に決まりうることを示す。
5. **グループ企業限定という第三のEligibility軸**: TS3コーポレートカード（トヨタグループ限定）は、外部資格による申込制限が個人向け専門職団体カードだけでなく法人カードにも及ぶことを示し、`ExternalMembershipRequirement`の対象をMember個人に限定しない設計を要請する可能性がある。
6. **非ポイント型Reward**: 中納言グルメイトPLUSカードの「グループ内ギフトカード直接付与」、クラブホークスエポスカードの「球団グッズ交換」は、既存の`RewardProgram`/`PointBalance`がポイント通貨を前提とする場合の反例候補になる。
7. **ブランド名とIssuerの分離**: JAカードの「地域ごとに異なる発行主体・統一ブランド名」構造は、`CardProduct`の識別を単一Issuerに紐づける設計への反証材料であり、全弁協・JDカードとは異なる第三の多対多提携パターンとして記録する価値がある。

---

## References

1. [02-market-corpus-v2-audited-2.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/ce283961-a91c-4b61-845b-f65ff7082ba7/02-market-corpus-v2-audited-2.md?AWSAccessKeyId=ASIA2F3EMEYE343GSOGZ&Signature=gvhUIZsW8CL086J7prF99i4AE2A%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIANYkLs9yZ8Up6%2FgYVXuVhjLasNCMstBE%2B8%2FFfoWuVOMAiEA0h5dXD7pWiru9grgyKB6Z6qMJddgpEJyuLI7VWQsatcq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDGqfAR71xy%2F8tRcCdirQBFQYW466fv0Dhiot6BXhHtmi8ZUMB5aNMG9ZVwUa898cqQdbPr%2FwfQZ40Tjaxxmc5BicL7OEyx0nJEDYyJIUb5Je2D3I5xS3kNQSxFe4l%2FNNVWi5898N%2BznAmsYjQytcfOj7gyFx9xeWbJ4LOwSb560qJ3MXsp%2BXI%2BvjqWiOQTvS2tQxDgAXMa6g7tt0DPkv00ib072QEPuxyGb%2F8Mci0k0pU7rb7oI%2B0SvOgEPHrdnSDOi62eoWHy8gOujiXv8SJdLUELZJwJ2F%2BJ8qR2Br3KZJ%2B21gxrdmhmSC0I0gNWsw%2F3nymuGu8KWCx7lD%2ByBqJUXiwS%2BQr9Vq6k%2BRXtmWDJXtKJh4tiV2vjJ4DyVdBmXmNZIYbecU6CuigKSYpc61%2BNKKK3XaRz1vHNnKZQzxJtZr7%2Fw0YdwD8x2uQJm8LkQaYZPo0vI3a76vaw8mPYLYKHEiN9yGx8PVhUpYkYZyAXTbHy11aMX%2Ff476O4UO22Ts%2BqsVJbpEANoSnArXFQ6FEt2PBhToRHNNPIPsXNHSpbqg5jOwpppvG9no3dPsavEP2r34TTT3hIVEv3G8iBpxhye11IlCOEYHoRg0F8hhY0etRxgdyW18Jc29QoCzSL0k732kNNsKlt7M4Sxz54CxwX%2BHnZUW7OIiJ%2FAYY%2B3o0y%2FkVDNBPc9JtQG44uWQf7uY8%2FAcPP7IwbAWpixifslCw1xVJ%2FdXKepeq2x6xSsGqARHeaoBtX5vsKJDAk0TWlluUBMStpUxNK9JnssVn4JU13eR2BrDnolpf8Gj7qDb8MYwsbjn0wY6mAG77SBOvEovjFG3%2FjfICxKyXoNNRcatiwwgMRe9VfgalStJhy0Xg1QFkU0%2Bmy64rE7G%2FKHXceTCNd1OmYGRvW3%2FoFeRUX1CzfGUY9BFzy8lMtgSnwRAqnRAO5z9QxKN1zkYUA15HoEGZi0bygFQy9BbIWHo0%2FBG9MlExbSTd7F2npTEGSqq3v7RWfiSc9Q7pLSaH8DyBKBZ%2BQ%3D%3D&Expires=1786374660) - # 日本クレジットカード・後払い決済市場 最新市場コーパス v2（監査済み、調査基準日: 2026-08-07）
本ドキュメントは、現在参照すべき最新の市場コーパスである。v1を監査対象として再検証し...

2. [01-market-corpus-v1.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/370ff412-259a-4af3-8cb9-beb305a7eabf/01-market-corpus-v1.md?AWSAccessKeyId=ASIA2F3EMEYE343GSOGZ&Signature=97BA1gVZ7ZTj88pYf3BzNwuMOFQ%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIANYkLs9yZ8Up6%2FgYVXuVhjLasNCMstBE%2B8%2FFfoWuVOMAiEA0h5dXD7pWiru9grgyKB6Z6qMJddgpEJyuLI7VWQsatcq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDGqfAR71xy%2F8tRcCdirQBFQYW466fv0Dhiot6BXhHtmi8ZUMB5aNMG9ZVwUa898cqQdbPr%2FwfQZ40Tjaxxmc5BicL7OEyx0nJEDYyJIUb5Je2D3I5xS3kNQSxFe4l%2FNNVWi5898N%2BznAmsYjQytcfOj7gyFx9xeWbJ4LOwSb560qJ3MXsp%2BXI%2BvjqWiOQTvS2tQxDgAXMa6g7tt0DPkv00ib072QEPuxyGb%2F8Mci0k0pU7rb7oI%2B0SvOgEPHrdnSDOi62eoWHy8gOujiXv8SJdLUELZJwJ2F%2BJ8qR2Br3KZJ%2B21gxrdmhmSC0I0gNWsw%2F3nymuGu8KWCx7lD%2ByBqJUXiwS%2BQr9Vq6k%2BRXtmWDJXtKJh4tiV2vjJ4DyVdBmXmNZIYbecU6CuigKSYpc61%2BNKKK3XaRz1vHNnKZQzxJtZr7%2Fw0YdwD8x2uQJm8LkQaYZPo0vI3a76vaw8mPYLYKHEiN9yGx8PVhUpYkYZyAXTbHy11aMX%2Ff476O4UO22Ts%2BqsVJbpEANoSnArXFQ6FEt2PBhToRHNNPIPsXNHSpbqg5jOwpppvG9no3dPsavEP2r34TTT3hIVEv3G8iBpxhye11IlCOEYHoRg0F8hhY0etRxgdyW18Jc29QoCzSL0k732kNNsKlt7M4Sxz54CxwX%2BHnZUW7OIiJ%2FAYY%2B3o0y%2FkVDNBPc9JtQG44uWQf7uY8%2FAcPP7IwbAWpixifslCw1xVJ%2FdXKepeq2x6xSsGqARHeaoBtX5vsKJDAk0TWlluUBMStpUxNK9JnssVn4JU13eR2BrDnolpf8Gj7qDb8MYwsbjn0wY6mAG77SBOvEovjFG3%2FjfICxKyXoNNRcatiwwgMRe9VfgalStJhy0Xg1QFkU0%2Bmy64rE7G%2FKHXceTCNd1OmYGRvW3%2FoFeRUX1CzfGUY9BFzy8lMtgSnwRAqnRAO5z9QxKN1zkYUA15HoEGZi0bygFQy9BbIWHo0%2FBG9MlExbSTd7F2npTEGSqq3v7RWfiSc9Q7pLSaH8DyBKBZ%2BQ%3D%3D&Expires=1786374660) - # 日本クレジットカード・後払い決済市場 市場調査コーパス
調査基準日: 2026-08-07 / 目的: 後工程でのドメインモデル・要件定義のための一次証拠ベースの市場調査（DBスキーマ・ER図・S...

3. [03-domain-counterexample-audit-3.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/af6e847c-d64a-403f-829d-4e22ceb7ac19/03-domain-counterexample-audit-3.md?AWSAccessKeyId=ASIA2F3EMEYE343GSOGZ&Signature=wolW09EoWIHW2kHeLBxGeHx3Jho%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIANYkLs9yZ8Up6%2FgYVXuVhjLasNCMstBE%2B8%2FFfoWuVOMAiEA0h5dXD7pWiru9grgyKB6Z6qMJddgpEJyuLI7VWQsatcq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDGqfAR71xy%2F8tRcCdirQBFQYW466fv0Dhiot6BXhHtmi8ZUMB5aNMG9ZVwUa898cqQdbPr%2FwfQZ40Tjaxxmc5BicL7OEyx0nJEDYyJIUb5Je2D3I5xS3kNQSxFe4l%2FNNVWi5898N%2BznAmsYjQytcfOj7gyFx9xeWbJ4LOwSb560qJ3MXsp%2BXI%2BvjqWiOQTvS2tQxDgAXMa6g7tt0DPkv00ib072QEPuxyGb%2F8Mci0k0pU7rb7oI%2B0SvOgEPHrdnSDOi62eoWHy8gOujiXv8SJdLUELZJwJ2F%2BJ8qR2Br3KZJ%2B21gxrdmhmSC0I0gNWsw%2F3nymuGu8KWCx7lD%2ByBqJUXiwS%2BQr9Vq6k%2BRXtmWDJXtKJh4tiV2vjJ4DyVdBmXmNZIYbecU6CuigKSYpc61%2BNKKK3XaRz1vHNnKZQzxJtZr7%2Fw0YdwD8x2uQJm8LkQaYZPo0vI3a76vaw8mPYLYKHEiN9yGx8PVhUpYkYZyAXTbHy11aMX%2Ff476O4UO22Ts%2BqsVJbpEANoSnArXFQ6FEt2PBhToRHNNPIPsXNHSpbqg5jOwpppvG9no3dPsavEP2r34TTT3hIVEv3G8iBpxhye11IlCOEYHoRg0F8hhY0etRxgdyW18Jc29QoCzSL0k732kNNsKlt7M4Sxz54CxwX%2BHnZUW7OIiJ%2FAYY%2B3o0y%2FkVDNBPc9JtQG44uWQf7uY8%2FAcPP7IwbAWpixifslCw1xVJ%2FdXKepeq2x6xSsGqARHeaoBtX5vsKJDAk0TWlluUBMStpUxNK9JnssVn4JU13eR2BrDnolpf8Gj7qDb8MYwsbjn0wY6mAG77SBOvEovjFG3%2FjfICxKyXoNNRcatiwwgMRe9VfgalStJhy0Xg1QFkU0%2Bmy64rE7G%2FKHXceTCNd1OmYGRvW3%2FoFeRUX1CzfGUY9BFzy8lMtgSnwRAqnRAO5z9QxKN1zkYUA15HoEGZi0bygFQy9BbIWHo0%2FBG9MlExbSTd7F2npTEGSqq3v7RWfiSc9Q7pLSaH8DyBKBZ%2BQ%3D%3D&Expires=1786374660) - # ドメインモデル反証調査（調査基準日: 2026-08-07）
本調査は`02-market-corpus-v2-audited.md`を入力として、既存の「ドメインモデル仮説」および「エッジケース...

4. [JAPAN DOCTOR'S CARD（略JDカード）のご利用案内](https://www.smbc-card.com/mem/for_userguide/detail/japan_doctors.jsp) - ご利用代金のお支払い 毎月15日締め切りで翌月10日(金融機関によっては8日)のお支払いとなります。 お問い合わせ 所属医師協へお問合せください。

5. [スライド 1](https://ishikawa-ikyo.jp/wp-content/uploads/2024/07/jd_card.pdf)

6. [医師のためのステータスカード「JAPAN DOCTOR'S CARD ...](https://s-ikyo.or.jp/archives/2656) - 医師協同組合に所属する医師とそのご家族のみが保有できるクレジットカードです。VISAカード加盟店に加え、約450店のJDカード加盟店・協賛店で独自の特典を受けることができます。============...

7. [JDカード](https://y-ikyo.or.jp/service/welfare/jdc/)

8. [カード事業](https://kmca.or.jp/card) - 香川医師協同組合は、開業医とそのご家族のための組合です。書籍・文房 具・医療機器等の組合員価格での販売、保険代理業などを行っております。

9. [日本医師会員向けキャッシュレスサービス](https://www.orcamo.co.jp/products/cashless.html) - 日医会員向けに特別手数料・価格にて決済サービスを提供します。また、初期費用はかかりません。 複数の決済方法に対応. 1台の端末でクレジットカード、 ...

10. [JDカード｜広島県医師協同組合｜広島市東区二葉の里](https://www.hmca.or.jp/jdcard.html) - 広島市東区二葉の里にある【広島県医師協同組合】のJDカード（JAPAN DOCTOR’S CARD）ぺージです。組織概要や保険サービス、医療サービス、暮らしのサービスなどをご紹介。JDカードのお得なポ...

11. [県医倶楽部 FMA VISAクラシックAカード（福岡県医師会提携 ...](https://www.kyushu-card.co.jp/get_card_personal/card_list/visa/standard/keniclub/classic_card_a/) - 福岡県医師会の会員専用クレジットカード医師会の身分証明書にもなります ; 海外・国内の旅行傷害保険が充実 ; 県医倶楽部専用特典あり ; WEB明細登録で年会費割引!

12. [Japan Doctor's Card（JDカード）](https://www.hojikyo.or.jp/life/jdc/)

13. [県医倶楽部 FMA VISAカード](https://www.keni.fukuoka.med.or.jp/keni_club.html) - 株式会社ケンイ Keni Co.,LTD

14. [医師にお得なクレジットカードとは - 民間医局コネクト](https://connect.doctor-agent.com/article/column09/) - 皆さんはクレジットカードを作る際に何を重要視していますか？ポイント加算率や利用限度額が高いクレジットカードは、実利を重視する人向けです。また、医師しか持つことのできないクレジットカードもあります。

15. [JAPAN DOCTOR'S CARD | 業務案内 - 滋賀県医師協同組合](https://s-ikyo.or.jp/service/lifesupport/jdcard) - 全国の医師のためのステータスカード。厳選した店舗・施設独自の特典・割引が得られます。

16. [医師限定のクレジットカードまとめ【ある意味発行難易度最高のクレジットカード】](https://dr-sleepy.com/drs_credit_card/) - ・医師になったからにはかっこいいクレジットカードの1枚や2枚持ってみたい。 ・学生時代作ったカードのままで限度額が低いので、何か新しいカードを作りたい。 そんなことを思ったことはありませんか？ アメッ...

17. [「日本医師会員向けキャッシュレスサービス」の手数料が低減 ...](https://www.med.or.jp/nichiionline/article/011252.html) - このような背景から、日本医師会は各クレジット会社と交渉を進め、VISAとMastercardの決済手数料率を1.45%まで、JCB関連も同程度まで低減することができ ...

18. [リリース](https://www2.uccard.co.jp/uc/profile/news_r/pdf/news_r321.pdf)

19. [経費精算システムとクレジットカードを連携させるには？メリット ...](https://bakuraku.jp/knowledge/knowledge-expense/expense-reimbursement-system/) - 経費精算システムとクレジットカードを連携させるには、導入方法やメリットを理解することが大切です。本記事では仕組みや選び方に加え、法人カードの特徴や効率的な運用のポイントまでわかりやすく解説します。

20. [法人カードの限度額はどうやって決まる？平均額や増額する ...](https://canon.jp/biz/trend/corporate-card-limit-amount) - ... 別、用途別に細かく利用額を管理することが可能です。例えば営業部門には月額50万円、管理部門には月額20万円というように、各部門の実態に応じた限度額を設定ができます。

21. [法人カード「楽楽ビジネスカード」を提供開始～「楽楽精算」と ...](https://www.rakus.co.jp/rakurakucloud/seisan/news/news260528.php) - 株式会社ラクスは、法人カード「楽楽ビジネスカード」の提供を2026年5月26日（火）より開始いたします。

22. [【2026年】クラウド法人カードのおすすめ7製品を徹底比較！ ...](https://www.itreview.jp/categories/cloud-corporate-card) - 安心して社員に渡せる 事前申請の金額に応じたカード利用上限設定。Web上で即時に利用停止可能。 ○最大1億円の高額決済 1取引あたりの上限なし、限度額 ...

23. [法人カードによる経費精算とは？メリット・注意点・導入時のルール](https://www.keihi.com/column/1572/) - 法人カードによる経費精算は、立替精算や小口現金の負担を減らし、利用状況の見える化にもつながります。本記事では、メリット・注意点・領収書や証憑の扱い・導入前に決めたい運用ルールをわかりやすく解説します。

24. [法人カードにも種類がある！それぞれのメリット・デメリットとは？](https://bts.jtbbwt.com/column/detail140) - 法人カードの運用では、利用限度額を役職や業務内容に応じて設定することが重要です。これにより、過剰な支出や誤使用を防止でき、経費管理の透明性が向上 ...

25. [クレジットカード連携可能な経費精算システム9選 | 内部統制や ...](https://boxil.jp/mag/a8476/) - 新しくカードを発行する場合には、経費精算システムの導入とあわせてカードの作成が必要です。なお、1で経費精算システムを導入するステップと、2でカード ...

26. [クレジットカード・ プリペイドカード連携機能のご紹介](https://www.rakus.co.jp/rakurakucloud/seisan/function/credit.php) - 経費精算システム「楽楽精算」のクレジットカード・プリペイドカード連携機能なら、法人カードで支払った経費の情報が自動で取り込まれるため、申請にかかる時間を大幅に削減！早期の経費精算促進が可能。内部統制強...

27. [法人カードで経費精算する方法とは？連携システム11選を紹介](https://www.aspicjapan.org/asu/article/17458) - たとえば「ハーモス経費」は、JCB、VISA、Mastercard、アメリカン・エキスプレスなど、代表的なクレジットカードと連携可能。連携実績に掲載されていない ...

28. [クレジットカード連携 - 経費精算システム「経費BANK」](https://kb2.sbi-bs.co.jp/function/creditcard/) - クレジットカードの利用明細を自動で取り込み、そのまま経費申請が可能です。日付・金額・利用店舗が明細に反映され、効率的に申請書を作成できます。

29. [3分でわかる！法人カードで経費精算を行うメリットや注意点、カードの作り方まで解説 | 法人カード活用ガイド - ビジネスカードの三井住友VISAカード](https://www.smbc-card.com/hojin/magazine/tips/expense.jsp) - 法人カードのビジネスカードやコーポレートカードで経費精算を行うメリットをわかりやすく解説。業務効率アップの方法などもあわせて紹介します。

30. [会計業務を効率化する法人カード｜freeeカード Unlimited](https://www.freee.co.jp/payment/card/) - Webでお申し込み可能な法人カード。独自与信で最高限度額1億円を実現。freee会計と最短当日に明細連携されるため月締めにも使えます。また、追加カードを100枚まで発行、利用の停止など統制もWebで完...

31. [経費精算は法人カードが便利！立て替えの手順やメリットを ...](https://www.jcb.co.jp/corporate/special/expenses.html) - 経費精算の効率化を実現するためには、法人カードの導入に加え、法人カードと会計ソフト. ETCカードを追加発行することができます。

32. [機能で選ぶ法人クレジットカード - freee](https://www.freee.co.jp/card/corporate/comparison/) - 機能で選ぶ法人クレジットカードfreeeユーザーならfreeeカードUnlimitedを使わなきゃもったいない！カードを申し込む資料ダウンロード「ただ決済するだけ」のクレジットカードを使っていませんか...

33. [法人カードの利用明細データと経費精算システム連携とは？ ...](https://bts.jtbbwt.com/column/detail141) - 法人カードの利用明細データと経費精算システムの連携は、カード会社と経費精算システム間でのデータ連携によって実現されます。従業員が加盟店で法人 ...

34. [野球ファン必見！プロ野球の球団とコラボしたクレジットカード一覧](https://cardranking.jp/ct/credit71.html) - プロ野球の球団とコラボしたクレジットカードを一覧で紹介。チケット先行販売や、選手の直筆サイン入りグッズ・公式戦観戦チケットが当たる抽選への参加等、プロ野球の球団とコラボしたクレジットカードには、野球フ...

35. [クレジットカードの特典でプロ野球｢マイナビオールスターゲーム ...](https://diamond.jp/zai/articles/-/1038391) - プロ野球の「マイナビオールスターゲーム」のチケットを購入する方法を解説！ セ・リーグとパ・リーグの各球団の公式クレジットカードなどに付帯する特典や、年会費が高額なプラチナカードなどでオールスターゲーム...

36. [【12球団】プロ野球デザインのクレジットカード20種を完全紹介！](https://baseball-blog.com/credit-card/) - 昨今、世の中には様々なクレジットカードがありますが、そのなかの1種としてプロ野球デザインのカードがあります。カードによっては、プロ野球観戦好きの方向けの特典が付与されるため、多くのプロ野球ファンが保持...

37. [Microsoft Word - 150109「ＳＢＨ」最終.doc](https://pdf.0101maruigroup.co.jp/pdf/settlement/15_0109/15_0109_1.pdf)

38. [ハウスカード](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%82%A6%E3%82%B9%E3%82%AB%E3%83%BC%E3%83%89) - ハウスカード（和製英語）とは、クレジットカードの一種である。Visa・JCBなどの国際ブランドと提携しておらず、主に発行する企業やそのグループ会社の店舗でしか利用 ...

39. [JAのクレジットカード - JAバンク | 【豊橋農業協同組合】 | 愛知県 ...](https://www.ja-toyohashi.com/bank_ja_credit_card.php) - 【豊橋農業協同組合】愛知県の東南部に位置し、概ね平坦な地形と穏やかな気候に恵まれ、露地、施設野菜、果樹、畜産と様々な農業経営をしています。 国内でも有数の園芸産地です。JAのクレジットカードJAバンク
