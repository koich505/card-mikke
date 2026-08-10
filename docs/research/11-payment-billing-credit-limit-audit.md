# 支払方法・請求・利用可能枠・手数料 追加反証調査（調査基準日: 2026-08-10）

本調査は`01-market-corpus-v1.md`（過去記録）、`02-market-corpus-v2-audited-2.md`（現行正本）、`03-domain-counterexample-audit-3.md`（反証調査）を前提とし、これら3文書で十分に調査されていなかった「支払方法・請求・利用可能枠・手数料」領域について、独立した一次情報の再確認と反例探索を行った結果である。02の記述と矛盾する場合は02を優先し、01は参考情報としてのみ扱う。本調査は市場事実の訂正ではなく、ドメインモデルが表現しにくい構造的事実の発見を目的とし、DBスキーマ・API・画面は確定しない。

***

## 調査対象領域の全体像

対象は、一括・分割・リボ・ボーナス払いの構造差、自動リボの発生条件、締日・支払日の複数選択、家族・社員カードの枠共有、利用枠回復の時点、海外事務手数料、支払遅延時の再引落・振込、Payment InstrumentとFunding Methodの分離、同一事業者内の複数Payment Scheme、BNPL・プリペイド・後払いチャージとの境界である。02および03がすでに確定・提示した論点（Paidyの事業者登録とTransaction-level Legal Classificationの分離、KyashのPayment Instrument/Funding Method分離）は前提として踏まえ、本調査ではその上に積む独立事例を中心に扱う。[^1]

***

## PS-1: 自動リボの発生様式が事業者によって「明示同意型」と「デフォルト組込型」に分岐する

**構造パターン名**: 自動リボ（Automatic Revolving Enrollment）の発生様式差

**対象単位**: Payment Scheme（Automatic Revolving Enrollment Rule）

**観測された事実**:
楽天カードの「自動でリボ払い」は、公式FAQ上で「カード申込時に会員様に任意でご選択いただいており、弊社で、会員様の了承を得ずに設定することはございません」と明記されている。一方、三井住友カードの「マイ・ペイすリボ」は、新規入会申込フォームの選択画面で「申し込む」側がデフォルト表示・選択されている構成になっており、入会時の操作によって意図せず設定されるケースが多数報告されている（Tier4記事だが、三井住友カード公式Vpassの解除手順ページの存在自体がTier2で確認できる）。三井住友カード公式サイトは「事前に設定した毎月のお支払い金額を超えたご利用分が自動的にリボ払いになる」と機能自体は明記するが、申込フローにおけるデフォルト選択状態の当否については公式ページ上で明言していない。[^2][^3][^4][^5][^6]

**適用条件**: 楽天カードは「1回払い（ボーナス1回払いは除く）」指定分のみが自動リボ対象。三井住友カードのマイ・ペイすリボは「1回払い利用分のうち、設定した毎月の最低支払金額を超えた部分」のみがリボ扱いとなり、2回払い・ボーナス一括・分割払いでの利用分は対象外。[^6][^2]

**対象者・対象取引**: 両社ともショッピング1回払い（またはそれに相当する初期指定）のみが対象。キャッシングは別枠。

**除外条件**: 楽天カードはボーナス1回払いを除外。三井住友カードは1回払い以外（2回払い・ボーナス一括・分割）を除外。[^2][^6]

**金額・率・回数・上限**: マイ・ペイすリボの最低支払金額は5,000円から、1万円単位で設定。リボ手数料（実質年率）は楽天カードで15.00%～17.64%、三井住友カード系で概ね年率15.0%程度と紹介されている（Tier4、要個別確認）。[^7][^6][^2]

**関係する事業者と役割**: Issuer（楽天カード株式会社、三井住友カード株式会社）が同時にPayment Scheme設計主体である。第三者の関与は確認されない。

**現在の状態**: 両サービスとも現行提供中。

**公式一次情報URL・ページタイトル・発行主体**:
- 「自動でリボ払い」／楽天カード株式会社／https://www.rakuten-card.co.jp/adjustment/revo/automatic/[^2]
- 「自動リボ」について知りたい｜よくあるご質問／楽天カード株式会社／https://support.rakuten-card.jp/faq/show/106[^3]
- 「マイ・ペイすリボとは」／三井住友カード株式会社／https://www.smbc-card.com/nyukai/merit/revolving.jsp[^6]

**確認日**: 2026-08-10 / **Evidence Tier**: Tier2 / **Disclosure status**: partially_disclosed（機能の存在と適用条件はdisclosedだが、申込フロー上のデフォルト選択状態そのものは公式ページで直接言及されていない） / **Confidence**: medium

**既存文書との整合性**: 01・02・03のいずれも自動リボの事業者間比較は行っていない。新規論点。

**既存モデルで表現しにくい点**: 「Payment Schemeの選択がOpt-in（能動的選択）か、申込フローの初期状態（Default State）か」という区別は、単純な`PaymentModelType`列挙型では表現できない。同じ「自動リボ」という名称でも、会員の意思決定コストと法的な同意の質が事業者によって異なりうる。

**追加確認が必要な点**: 三井住友カードの入会申込フォームにおけるマイ・ペイすリボのデフォルト選択状態を、三井住友カード公式のスクリーンショットまたは規約文言で直接確認する必要がある（現状はTier4記事の画像引用に依存）。

***

## PS-2: 「あとからリボ」「あとから分割」という購入後の支払方法変更サービスの対象取引範囲が事業者間で異なる

**構造パターン名**: 購入後支払方法変更（Post-purchase Payment Method Change）の対象範囲差

**対象単位**: Payment Scheme（Post-purchase Change Rule）

**観測された事実**:
楽天カードは「翌月1回払い・分割払い・ボーナス1回払い・キャッシング1回払いのご利用分を、あとからリボ払いへ変更できる」と明記している。dカードは「あとからリボ」を「1回払い・ボーナス払いで購入した商品を後日、リボ払いに変更できる」サービスとして提供している。両社ともキャッシングとショッピングの扱いに差があり、楽天カードはキャッシング1回払いも変更対象に含める一方、dカードの説明ではショッピング（1回・ボーナス払い）のみに言及しており、キャッシングの扱いは本ラウンドで確認できていない（Unknown）。[^8][^9]

**適用条件**: 楽天カードは「一部店舗を除く」と注記があり、加盟店単位で対応可否が分岐する可能性を明示している。[^8]

**対象者・対象取引**: 会員一般。ショッピング利用（一部キャッシング含む事業者あり）。

**除外条件**: 楽天カードは一部加盟店を除外。dカードにおけるキャッシングの扱いはUnknown。

**関係する事業者と役割**: Issuer（楽天カード、NTTドコモ／dカード）がPayment Scheme変更ルールの設計主体。

**現在の状態**: 両社現行提供中。

**公式一次情報URL・ページタイトル・発行主体**:
- リボルビング払いについて知りたい｜楽天カード／https://support.rakuten-card.jp/faq/show/54[^8]
- あとからリボ／dカード（NTTドコモ）／https://dcard.docomo.ne.jp/st/service_payment/revo/how/aboutafterrevo.html[^9]

**確認日**: 2026-08-10 / **Evidence Tier**: Tier2 / **Disclosure status**: disclosed（楽天）／partially_disclosed（dカードのキャッシング扱いは不明） / **Confidence**: medium

**既存文書との整合性**: 02・03は「購入時指定と購入後変更」を明示的なカテゴリとして扱っていない。新規論点。

**既存モデルで表現しにくい点**: 「購入時に指定した支払方法」と「事後変更可能な支払方法」は別の時制を持つルールであり、単一の`PaymentMethod`属性では、事後変更の可否・対象範囲・変更可能期限を同時に表現できない。加えて、変更可否が「加盟店単位」で例外を持つ（楽天カードの「一部店舗を除く」）ため、Payment SchemeのルールがCard Product単位に閉じず、Merchant（加盟店）という第三の軸に依存する。

**追加確認が必要な点**: dカードのキャッシング利用分の「あとからリボ」対象可否、変更可能な期限（利用日から何日以内か）を一次情報で確認する必要がある。

***

## PS-3: 締日・支払日の「複数選択制」と「選択不可・固定制」が事業者によって明確に分岐する

**構造パターン名**: 締日・支払日の選択制度差

**対象単位**: Payment Scheme（Billing Cycle Selection Rule）

**観測された事実**:
三井住友カードは「15日締め・翌月10日払い」と「末日締め・翌月26日払い」の2パターンから選択可能で、入会後もVpassまたは郵送で変更できる（ただし変更後は一定期間再変更不可）。一方、三井住友カード（FS）・三井住友カード（OMC）ブランドでは「月末締め・翌月27日払い」の単一パターンのみが確認され、選択制の記載はない。同一グループ内（三井住友カード）でも、ブランド・提携先（きらぼしVISAカード等）によって支払スキームの選択制度自体が異なる可能性があり、きらぼしVISAカード会員は「マイ・ペイすリボ」の申込自体ができないという除外規定も確認された。[^10][^11][^12][^13]

**適用条件**: 三井住友カード本体ブランドは選択・変更可能。FS・OMCブランドは固定（変更可否は未確認、Unknown）。

**除外条件**: きらぼしVISAカード会員はマイ・ペイすリボの申込資格から除外。[^13]

**金額・率・回数・上限**: 変更申込後、一定期間（Tier4情報では「2ヵ月間」との言及あり、要一次確認）は再変更不可。[^14]

**関係する事業者と役割**: Issuer（三井住友カード株式会社）が単一だが、内部ブランド・提携先（FS、OMC、きらぼし銀行提携）ごとに異なるBilling Cycle Ruleを適用している。

**現在の状態**: 現行提供中。

**公式一次情報URL・ページタイトル・発行主体**:
- カードの支払日と締め日が知りたい／三井住友カード株式会社／https://qa.smbc.co.jp/faq/show/5164[^10]
- マイ・ペイすリボの申し込みや返済設定の変更をしたいです。／三井住友トラスト・カード／https://www.smtcard.jp/support/faq/payment/detail_005.html[^13]
- 三井住友カード（FS）・三井住友カード（OMC）の締め日と請求日／三井住友カード株式会社／https://qa.smbc-card.com/fs/memfs/detail[^12]

**確認日**: 2026-08-10 / **Evidence Tier**: Tier2 / **Disclosure status**: disclosed（締日・支払日パターン自体）／unknown（再変更禁止期間の正確な長さ、FS/OMCの変更可否） / **Confidence**: medium-high

**既存文書との整合性**: 01・02・03は締日・支払日構造を扱っていない。新規論点。

**既存モデルで表現しにくい点**: 「同一Issuer（三井住友カード株式会社）」が、ブランド・提携先単位で異なるBilling Cycle（締日・支払日パターン）を持ち、かつ選択可否自体もブランド単位で異なる。これは`CardProduct`単位でBilling Cycleを固定属性として持たせるモデルでは表現できず、Billing CycleはCardProductではなくBilling Entity（請求実務単位）×提携先という別粒度に紐づく可能性がある。また「きらぼしVISAカード会員はマイ・ペイすリボ対象外」という除外規定は、Payment Schemeの適用可否が国際ブランドや発行主体だけでなく、提携先（地銀）によっても制御されることを示す。

**追加確認が必要な点**: 三井住友カード（FS）・（OMC）ブランドにおける締日選択制度の有無、再変更禁止期間の正確な日数・条件を一次情報で確認する必要がある。

***

## PS-4: 家族カードの利用可能枠共有構造は「同一枠共有」で一致するが、Oliveアカウントでは請求と枠の分離粒度が異なる

**構造パターン名**: 家族・社員カードの枠共有モデル

**対象単位**: Benefit / Offering（Family Card Credit Limit Sharing Rule）

**観測された事実**:
三井住友カードの家族カードは、本会員の利用可能枠を家族会員と共有する構造であり、独自の枠は設定されない（本会員が80万円の枠で家族カードと合計80万円までしか利用できない）。利用代金は本会員名義で一括請求され、口座も本会員のものが使用される。一方、Olive（三井住友銀行）フレキシブルペイの家族カードも同様に本会員の利用限度額に含まれる枠共有構造だが、こちらは銀行口座（Oliveアカウント）に紐づくクレジットモードという別のPayment Instrument区分の中での枠共有であり、カード会社発行の家族カードとは契約主体・口座の紐づき方が異なる。[^15][^16][^17][^18]

**適用条件**: 三井住友カード家族カードの発行対象は「生計を共にする配偶者、満18歳以上の子（高校生を除く）、両親」に限定される。[^19][^20]

**対象者・対象取引**: 本会員が申込む家族会員（複数人可、ただし同時申込は1名まで、以降は個別追加）。[^15]

**除外条件**: 家族カードは名義人本人以外の利用が規約上禁止され、名義人以外の家族（配偶者と子が共有カードを使う等）は認められない（利用者ごとに個別カード発行が必要）。[^20]

**金額・率・回数・上限**: 家族カード年会費は三井住友カード（NL）・ゴールド（NL）等で人数制限なく永年無料、プラチナプリファードも永年無料。プラチナ・Visa Infiniteでは家族カードも無料だが本会員年会費は33,000円・99,000円と券種間で差がある。[^21][^20]

**関係する事業者と役割**: Issuer（三井住友カード株式会社）が本会員契約主体かつ家族会員の請求・枠管理主体。Oliveの場合はIssuer機能が三井住友銀行の口座機能と統合されている。

**現在の状態**: 現行提供中。

**公式一次情報URL・ページタイトル・発行主体**:
- 家族カードのご案内・お申し込み／三井住友カード株式会社／https://www.smbc-card.com/nyukai/add/family/index.jsp[^15]
- 家族カードとは？作るメリットと条件や注意点を解説／三井住友カード株式会社／https://www.smbc-card.com/nyukai/magazine/knowledge/family.jsp[^20]
- Oliveフレキシブルペイがお得になる家族カード／三井住友銀行／https://www.smbc.co.jp/kojin/olive-account/merit/family/[^18]

**確認日**: 2026-08-10 / **Evidence Tier**: Tier2 / **Disclosure status**: disclosed / **Confidence**: high

**既存文書との整合性**: 01・02・03は家族・社員カードの枠共有を扱っていない。新規論点。

**既存モデルで表現しにくい点**: 家族カードの「利用可能枠」は本会員に対する単一の`CreditLimit`エンティティの部分集合ではなく、本会員・家族会員複数枚が動的に同一枠を消費し合う構造である。加えてOliveのようにPayment Instrument（クレジットモード）が銀行口座（Funding的性質）と統合されている場合、家族カードの枠共有ルールはCard Productの属性ではなく、Account（口座）レベルの属性になる可能性がある。「社員カード」については本ラウンドで一次情報を確認できておらず、Unknownとして維持する。

**追加確認が必要な点**: 社員カード（法人カードにおける従業員向け追加カード）の枠共有構造が、家族カードと同一パターンか、個別枠配分型か、法人カードでは一次情報を確認できていない（Unknown）。

***

## PS-5: 利用可能枠の回復時点は「支払完了時」だが、締日跨ぎのデータ到達遅延により実質的な回復タイミングがずれる

**構造パターン名**: 利用可能枠の回復トリガーと加盟店データ到達タイムラグの不一致

**対象単位**: Payment Scheme（Credit Limit Recovery Trigger）

**観測された事実**:
三井住友カードの家族カードFAQでは「お支払い日に代金が引き落とされて利用枠が復活するまでの期間は、本会員と合わせて〇万円までしか利用できません」と明記されており、枠回復のトリガーは「支払日の引き落とし完了」である。ただし、締め日当日の利用は「店舗が売上を計上した日」が基準となるため、利用者の実利用日と、カード会社が締め日内として処理する日付が一致しない場合がある（Yahoo!知恵袋回答だがカード会社公式FAQの引用に基づく説明、Tier4）。[^16][^22][^23]

**適用条件**: 引き落とし（支払完了）をトリガーとして枠が復活する。加盟店から利用データが到達するタイミングは加盟店側の処理速度に依存する。[^23]

**除外条件**: 加盟店データ到達が遅延した場合、利用日ベースでは当月内利用のはずが、次月の締め回に計上され、請求・枠回復のタイミングが1ヵ月単位でずれ込む。[^23]

**関係する事業者と役割**: Issuer（請求・枠管理主体）と加盟店（Acquiring経由の売上データ送信主体）の間で、データ到達の非同期性が発生する。

**現在の状態**: 継続する運用上の一般的構造（特定商品のライフサイクルイベントではない）。

**公式一次情報URL・ページタイトル・発行主体**:
- 家族カードが利用できません。なぜですか？／三井住友カード株式会社／https://qa.smbc-card.com/mem/detail[^16]
- クレジットカードの引き落とし日｜変更方法と間に合わない場合／三井住友カード株式会社／https://www.smbc-card.com/mem/hitotoki/card_use/payday.jsp[^24]

**確認日**: 2026-08-10 / **Evidence Tier**: Tier2（枠回復トリガー自体）／Tier4（データ到達遅延の具体的影響、公式による直接明記は未確認） / **Disclosure status**: disclosed（回復トリガー）／partially_disclosed（データ到達遅延の影響） / **Confidence**: medium

**既存文書との整合性**: 新規論点。01・02・03いずれも枠回復のタイミング構造を扱っていない。

**既存モデルで表現しにくい点**: 「オーソリ（利用承認）」「売上確定（加盟店データ到達）」「請求確定」「支払完了（引き落とし）」「枠回復」という5段階が、時間軸上で厳密に順序が保証されない（加盟店側の処理遅延により、利用日と売上確定日の間に月単位のずれが生じうる）。既存モデルが単一の`TransactionDate`で利用・請求・枠変動を紐づける設計だと、この非同期性を表現できない。EC-2（03文書のセゾンゲーミングカード終了プロセス）と同様に、単一イベントではなく多段階ライフサイクルとして扱う必要性を示す事例である。

**追加確認が必要な点**: オーソリから売上確定までの標準的な許容日数、確定後の取消・返金がオーソリ枠・確定枠のどちらに影響するかを、Visa/Mastercard等の加盟店規約またはイシュア公式規約で確認する必要がある（本ラウンドでは未達、Unknown）。

***

## PS-6: 海外事務手数料は同一イシュアでも国際ブランドによって異なる可能性があり、加盟店の処理ブランドにも依存する

**構造パターン名**: 海外事務手数料のブランド間差異

**対象単位**: Benefit / Fee（Foreign Transaction Fee Rule）

**観測された事実**:
比較サイトの集計（Tier4）では、JCBブランドの海外事務手数料は1.60%であるのに対し、他の国際ブランド（Visa、Mastercard等）は同一カードでも異なる率（1.6%〜3.85%程度）が設定されているとされる。この情報はTier4集計のみに依存しており、個別カード会社の公式規約での一次確認は本ラウンドでは実施していない（Unknown、要Tier2確認）。[^25][^26]

**適用条件**: 海外での現地通貨決済時に発生。国際ブランドのレート変換手数料とイシュア側の事務手数料が合算される構造（詳細な内訳は本ラウンドで未確認）。

**関係する事業者と役割**: 国際ブランド（Visa/Mastercard/JCB等、外貨換算レート決定）とIssuer（事務手数料上乗せ率決定）が別主体として関与する可能性が高いが、両者の役割分担・手数料内訳の公式開示は本ラウンドで確認できていない。

**現在の状態**: Unknown（変更頻度不明）。

**Evidence Tier**: Tier4のみ（比較サイト2件） / **Disclosure status**: unknown（公式一次情報で個別ブランド別手数料率を明記した文書は本ラウンドで未発見） / **Confidence**: low[^26][^25]

**既存文書との整合性**: 新規論点。01・02・03は海外事務手数料を扱っていない。

**既存モデルで表現しにくい点**: 海外事務手数料が「Card Product属性」なのか「国際ブランド属性」なのか「Issuer×Brandの組み合わせ属性」なのかが、Tier4情報だけでは切り分けられない。同一Issuerが複数ブランドを発行する場合（デュアル発行の三井住友カード等）、手数料率がブランド単位で異なるのか、Issuer単位で統一されているのかは重要な設計論点だが、一次情報未確認のため断定しない。

**追加確認が必要な点**: 三井住友カード、JCB、アメックス等の公式規約・会員規約における海外事務手数料の明示的な記載を個別に確認する必要がある。Visaブランドの三井住友カードとJCBブランドの三井住友カードで手数料率が異なるかどうかは、デュアル発行構造（EC相当）における重要な検証ポイントであり、次ラウンドの優先調査項目とする。

***

## PS-7: 支払遅延時の「再引落」制度は事業者ごとに有無・手数料が異なる可能性（本ラウンドでは一次情報未達）

**構造パターン名**: 支払遅延後の再引落・振込プロセス

**観測された事実**: 本ラウンドの検索では、三井住友カードの支払日変更・引き落とし日FAQページの存在は確認できたが、支払日に引き落としができなかった場合の「再引落し」の有無、再引落し手数料、再引落しがない場合の振込先案内プロセスについて、公式一次情報での直接確認は完了していない。Tier4記事（YouTube動画解説）は「残高不足で引き落としができなかった場合」に言及しているが、これはTier4であり事実確定には使用しない。[^27][^24]

**現在の状態**: Unknown

**Disclosure status**: inaccessible（本ラウンドで到達できず） / **Confidence**: 該当なし

**既存文書との整合性**: 新規論点として提起するが、確定情報なし。

**既存モデルで表現しにくい点**: 現時点で評価不可（情報不足のため）。

**追加確認が必要な点**: 主要イシュア（三井住友カード、JCB、楽天カード等）の会員規約における「支払遅延時の取扱い」条項を個別に確認する必要がある。再引落しの実施有無、実施日、再引落し不能時の督促・振込指示プロセス、遅延損害金の発生条件・利率を次ラウンドで調査する。

***

## PS-8: Paidyの分割あと払いにおける決済手段別の手数料差構造（02の記述を補強する独立確認）

**構造パターン名**: 決済手段（口座振替／銀行振込／コンビニ払い）による分割手数料差

**対象単位**: Campaign相当ではなくOffering（Installment Fee-by-Payment-Method Rule、恒常仕様）

**観測された事実**: 02文書はすでに「分割手数料は口座振替・銀行振込のみ無料、コンビニ払いは手数料発生」「一括あと払いへの二重の分割変更は不可」と記述している。本ラウンドでは、この記述がPaidy公式サポートページで確認できることをKyash「イマすぐ入金」の構造（後払い型Funding Method、AGペイメントサービス株式会社提供）と対比する形で再確認した。両者は「Fintech事業者が提供する後払い機能」という共通項を持つが、Paidyは自社が包括信用購入あっせん業者登録主体でありPayment SchemeとRegulatory Registrantが同一法人内に閉じる一方、Kyashの「イマすぐ入金」はPayment Instrument提供主体（Kyash）とFunding提供主体（AGペイメントサービス株式会社）が別法人であるという、03文書のEC-4と類似するが別軸の反例である。[^1]

**関係する事業者と役割**: Paidy＝Issuer兼Regulatory Registrant（単一法人）。Kyash＝Payment Instrument Issuer（Kyash）とFunding Method Provider（AGペイメントサービス、旧AGミライバライ）が分離（別法人）。

**確認日**: 2026-08-10 / **Evidence Tier**: Tier2（02文書内で確認済みの一次情報） / **Disclosure status**: disclosed / **Confidence**: high

**既存文書との整合性**: 02・03の既存確定事実と整合。新規反例ではなく、既存反証パターン（Actor Role分離）の別事例としての位置づけ。

**既存モデルで表現しにくい点**: 「1事業者内で契約主体が完全に一致するPaidy型」と「Payment InstrumentとFundingが別法人に分離するKyash型」の両方が市場に併存することから、`PaymentModelType`や`FundingMethod`のモデルは、Actor Roleの一致・分離を前提としない汎用設計が必要という示唆を再確認した。

**追加確認が必要な点**: atoneの決済手段別手数料構造、法的登録区分は02時点でもUnknown継続であり、本ラウンドでも追加確認できていない（継続Unknown）。

***

## 総括的な設計上の示唆

本ラウンドの調査は、人気カードのランキングではなく構造差の発見を目的とし、複数の独立事業者（楽天カード、三井住友カード、dカード、三井住友銀行Olive、Paidy、Kyash）にわたる支払方法・請求・枠構造の反例を収集した。特に、（1）自動リボの「同意の質」がOpt-in型とデフォルト組込疑義型に分岐する可能性、（2）締日・支払日の選択制度が同一Issuer内でもブランド・提携先単位で異なる、（3）利用枠回復のトリガーと加盟店データ到達の非同期性、という3点は、単純な列挙型属性では表現できない時制・主体分離の構造であり、Payment Schemeを Card Product の固定属性としてではなく、Billing Entity・Merchant・Brand の組み合わせに応じて動的に変わりうる別粒度のエンティティとして扱う必要性を示している。海外事務手数料のブランド間差異と支払遅延時の再引落プロセスについては、本ラウンドでは公式一次情報への到達が不十分であり、Unknownとして維持し次ラウンドの優先調査項目とする。

---

## References

1. [01-market-corpus-v1.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/513aa081-c44a-490e-a762-d0b48c1ba075/01-market-corpus-v1.md?AWSAccessKeyId=ASIA2F3EMEYERYVL7ZTU&Signature=kxHVbwnHghPJx3NqoWc%2BXuYheRg%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDrh68umxs9q6pz7vS6LmaIzAkbEsFeWpfFAdYKe4ZEdgIgdrR6JKG6RQII%2BVANwfGHEw9pr%2FftUMeL2dZYk3dprYkq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDAG6MEJIb5ITn4mM9yrQBDqqfuV%2Bs35400dsg%2BrjrJ6DoUEaRB37m49TfrgnkSdbi1dJcmpywI1zcFEGgmaEhQ0OrT%2BK%2BvYOG7V9bmtjk7e6TsM1ceISgkrlMsZnkcWm3DC22c%2FD3Wm11CTz%2BWNzbA6YEhjnapNvNfqs7VR6Cz1Rl2I%2FF9Nr8bL86tVg5SbgUaSZl9nRLNF%2Fn%2BCKBfpgOBuftSvkHvqKW3LDaI8SRXSfFkRb5qPzKEnKk%2B2FyYePhzZBoWRhaimzqpKLVNoRitwp6TigGzOMOXweSG1rcWn0KPoHN13EiY8w6NQc0BApjo%2FQqpY%2BaatwMx7r6%2BWXhaibCt41kb0u8c3dYRbmShaLuBRgHr9LDjsYkElCbzM8PYEUSaxGlh2piMo1dKgq4Y%2BLLn7Aki4TvhmZDJSFiiSbyiAyJEtAspyK8270wh4TfljOai08esDRWJ4P2nB2%2F87mD9iXXZ3kGVpdp3T4TDHGcKoJO5PspzwDQna0PGtBr2uCS6jJldzjFvmzkh3jviOOjuxt2meg2gYvjA0sDcM%2FuZJsn3gz2pKZJev1%2FRefRwmljZ1nIkJbt0sU7MBxQxykmAEyQkX61wkm8MrSmf9HbeG45rpRAc0BrFKK6tuiK8LDpzvIyOXY60mgLhgqwpzEbEGt4VoURAkcbRW%2BNNgTcXqsVGlRo2xEHsU1RBWVKItVKIawyqU%2BVuDR576dal4uYNyGJVzcYEHTNwMPM5Ep4%2B5NZ6PcHKiq1SdiJMoPh0qZGHawJlCVthKANDiab4ZnqGGUUrWbOMavqfjC3Kow57Tn0wY6mAFqk2nzKDmLqEKPFax5Uvqw%2F5ZB1%2BzHn%2FjMCHKvEMMDI9g0OMsqJQIdODMhQIDS5rLPNVOPlXghJVD9jFVsV3NcHd7rA9LeBQ0EycVH0g8gsMZI4HsO7Sy10q%2FoQ7LeyLVhY8jiFvaO5wnUkCByvnL6K%2FBvJCVXPGVsG11xZSs9fgaLYy7iiVpYbKj%2BmhM0lsV4BjRXJUJUMQ%3D%3D&Expires=1786374202) - # 日本クレジットカード・後払い決済市場 市場調査コーパス
調査基準日: 2026-08-07 / 目的: 後工程でのドメインモデル・要件定義のための一次証拠ベースの市場調査（DBスキーマ・ER図・S...

2. [02-market-corpus-v2-audited-2.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/3373e31f-bcf0-4c43-bba5-29c1e43ea0b9/02-market-corpus-v2-audited-2.md?AWSAccessKeyId=ASIA2F3EMEYERYVL7ZTU&Signature=ZuC7jFWv4uX0E1V0dIAS3itPgE8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDrh68umxs9q6pz7vS6LmaIzAkbEsFeWpfFAdYKe4ZEdgIgdrR6JKG6RQII%2BVANwfGHEw9pr%2FftUMeL2dZYk3dprYkq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDAG6MEJIb5ITn4mM9yrQBDqqfuV%2Bs35400dsg%2BrjrJ6DoUEaRB37m49TfrgnkSdbi1dJcmpywI1zcFEGgmaEhQ0OrT%2BK%2BvYOG7V9bmtjk7e6TsM1ceISgkrlMsZnkcWm3DC22c%2FD3Wm11CTz%2BWNzbA6YEhjnapNvNfqs7VR6Cz1Rl2I%2FF9Nr8bL86tVg5SbgUaSZl9nRLNF%2Fn%2BCKBfpgOBuftSvkHvqKW3LDaI8SRXSfFkRb5qPzKEnKk%2B2FyYePhzZBoWRhaimzqpKLVNoRitwp6TigGzOMOXweSG1rcWn0KPoHN13EiY8w6NQc0BApjo%2FQqpY%2BaatwMx7r6%2BWXhaibCt41kb0u8c3dYRbmShaLuBRgHr9LDjsYkElCbzM8PYEUSaxGlh2piMo1dKgq4Y%2BLLn7Aki4TvhmZDJSFiiSbyiAyJEtAspyK8270wh4TfljOai08esDRWJ4P2nB2%2F87mD9iXXZ3kGVpdp3T4TDHGcKoJO5PspzwDQna0PGtBr2uCS6jJldzjFvmzkh3jviOOjuxt2meg2gYvjA0sDcM%2FuZJsn3gz2pKZJev1%2FRefRwmljZ1nIkJbt0sU7MBxQxykmAEyQkX61wkm8MrSmf9HbeG45rpRAc0BrFKK6tuiK8LDpzvIyOXY60mgLhgqwpzEbEGt4VoURAkcbRW%2BNNgTcXqsVGlRo2xEHsU1RBWVKItVKIawyqU%2BVuDR576dal4uYNyGJVzcYEHTNwMPM5Ep4%2B5NZ6PcHKiq1SdiJMoPh0qZGHawJlCVthKANDiab4ZnqGGUUrWbOMavqfjC3Kow57Tn0wY6mAFqk2nzKDmLqEKPFax5Uvqw%2F5ZB1%2BzHn%2FjMCHKvEMMDI9g0OMsqJQIdODMhQIDS5rLPNVOPlXghJVD9jFVsV3NcHd7rA9LeBQ0EycVH0g8gsMZI4HsO7Sy10q%2FoQ7LeyLVhY8jiFvaO5wnUkCByvnL6K%2FBvJCVXPGVsG11xZSs9fgaLYy7iiVpYbKj%2BmhM0lsV4BjRXJUJUMQ%3D%3D&Expires=1786374202) - # 日本クレジットカード・後払い決済市場 最新市場コーパス v2（監査済み、調査基準日: 2026-08-07）
本ドキュメントは、現在参照すべき最新の市場コーパスである。v1を監査対象として再検証し...

3. [03-domain-counterexample-audit-3.md](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/2122664342/8d628b5b-615a-473d-972e-9af9ac58a72e/03-domain-counterexample-audit-3.md?AWSAccessKeyId=ASIA2F3EMEYERYVL7ZTU&Signature=jZLOY%2F6wYCtg60idUzYNkRkQFT8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDrh68umxs9q6pz7vS6LmaIzAkbEsFeWpfFAdYKe4ZEdgIgdrR6JKG6RQII%2BVANwfGHEw9pr%2FftUMeL2dZYk3dprYkq%2FAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2OTk3NTMzMDk3MDUiDAG6MEJIb5ITn4mM9yrQBDqqfuV%2Bs35400dsg%2BrjrJ6DoUEaRB37m49TfrgnkSdbi1dJcmpywI1zcFEGgmaEhQ0OrT%2BK%2BvYOG7V9bmtjk7e6TsM1ceISgkrlMsZnkcWm3DC22c%2FD3Wm11CTz%2BWNzbA6YEhjnapNvNfqs7VR6Cz1Rl2I%2FF9Nr8bL86tVg5SbgUaSZl9nRLNF%2Fn%2BCKBfpgOBuftSvkHvqKW3LDaI8SRXSfFkRb5qPzKEnKk%2B2FyYePhzZBoWRhaimzqpKLVNoRitwp6TigGzOMOXweSG1rcWn0KPoHN13EiY8w6NQc0BApjo%2FQqpY%2BaatwMx7r6%2BWXhaibCt41kb0u8c3dYRbmShaLuBRgHr9LDjsYkElCbzM8PYEUSaxGlh2piMo1dKgq4Y%2BLLn7Aki4TvhmZDJSFiiSbyiAyJEtAspyK8270wh4TfljOai08esDRWJ4P2nB2%2F87mD9iXXZ3kGVpdp3T4TDHGcKoJO5PspzwDQna0PGtBr2uCS6jJldzjFvmzkh3jviOOjuxt2meg2gYvjA0sDcM%2FuZJsn3gz2pKZJev1%2FRefRwmljZ1nIkJbt0sU7MBxQxykmAEyQkX61wkm8MrSmf9HbeG45rpRAc0BrFKK6tuiK8LDpzvIyOXY60mgLhgqwpzEbEGt4VoURAkcbRW%2BNNgTcXqsVGlRo2xEHsU1RBWVKItVKIawyqU%2BVuDR576dal4uYNyGJVzcYEHTNwMPM5Ep4%2B5NZ6PcHKiq1SdiJMoPh0qZGHawJlCVthKANDiab4ZnqGGUUrWbOMavqfjC3Kow57Tn0wY6mAFqk2nzKDmLqEKPFax5Uvqw%2F5ZB1%2BzHn%2FjMCHKvEMMDI9g0OMsqJQIdODMhQIDS5rLPNVOPlXghJVD9jFVsV3NcHd7rA9LeBQ0EycVH0g8gsMZI4HsO7Sy10q%2FoQ7LeyLVhY8jiFvaO5wnUkCByvnL6K%2FBvJCVXPGVsG11xZSs9fgaLYy7iiVpYbKj%2BmhM0lsV4BjRXJUJUMQ%3D%3D&Expires=1786374202) - # ドメインモデル反証調査（調査基準日: 2026-08-07）
本調査は`02-market-corpus-v2-audited.md`を入力として、既存の「ドメインモデル仮説」および「エッジケース...

4. [自動でリボ払い - 楽天カード](https://www.rakuten-card.co.jp/adjustment/revo/automatic/) - 「自動でリボ払い」とは、お店やネットショッピング等で「翌月1回払い」と指定したショッピングご利用分が自動的にリボ払いになるサービスです。

5. [Amazonギフト券のオートチャージ設定がおすすめ！ ...](https://diamond.jp/zai/articles/-/126339) - 「Amazon Mastercard」など、「三井住友」のクレジットカードの年会費割引条件を忘れずにクリアしたいなら、「Amazonギフト券」のオートチャージ設定をするのがおすすめ！ 「三井住友カード...

6. [「自動リボ」について知りたい | よくあるご質問](https://support.rakuten-card.jp/faq/show/106?site_domain=guest) - カードショッピングご利用時に「翌月1回払い」でご指定いただいたご利用分がすべてリボ払いになるお支払い方法です。 そのため、1度登録をすれば、月々のお支払管理が簡単です。また、お会計時にお支払い方法を設

7. [勝手にリボ払いになる理由とは？解除方法と設定の注意点、支払えない時の対処法](https://hibiki-law.or.jp/debt/hensai/h-ribo/5958/) - キャンペーンの申し込み条件が「リボ払い」であったなど、気づかずにリボ払いを利用してしまうケースはいくつか考えられます。リボ払いを解除する場合は基本的に、クレジットカード会社の会員サイトから行います。

8. [三井住友カードの年会費を永遠に無料にする方法](https://creditcard-rescue.com/column/smbc-no-annual-fee/) - 三井住友カードは、マイ・ペイすリボを使って年会費を永遠に無料にする方法があります。ただし、年会費を減らすためにカードを使いすぎるのは本末転倒で、あくまで無理なく生活に必要な支払いだけで割引特典を利用出...

9. [リボ払い](https://www.rakuten-card.co.jp/adjustment/revo/) - 楽天カードのリボ払いとは、状況に応じて毎月自分で支払い額を設定できる便利なサービスです。24時間お申し込み可能。

10. [マイ・ペイすリボの申し込みや返済設定の変更をしたいです。](https://www.smtcard.jp/support/faq/payment/detail_005.html) - 三井住友トラスト・カードのマイ・ペイすリボご利用方法に関するよくあるご質問を掲載しています。

11. [マイ・ペイすリボで三井住友カードの年会費割引とリボ手数料の目安](https://yumefuwa.com/mypaceribo/) - <div class="appreach"> <img class="appreach__icon" src="https://is

12. [リボルビング払いについて知りたい | よくあるご質問｜楽天カード](https://support.rakuten-card.jp/faq/show/54?site_domain=guest) - ショッピングやキャッシングのご利用金額やご利用件数にかかわらず、毎月のお支払い元金がほぼ一定となるお支払い方法です。毎月のお支払い金額は、お手持ちのカードに設定されているリボお支払いコースの元金と、前

13. [自動リボ払いについて](https://support.rakuten-card.jp/category/show/2392?site_domain=guest) - 自動リボ払いについて,カードのお支払い

14. [三井住友カードのリボ払いを解約する方法](https://card-lab.com/column/article/article214.html) - 三井住友カードのリボ払いを解約する方法。三井住友カードには「マイ・ペイすリボ」という制度があります。この制度を設定した覚えがないのにリボ払いになっている場合は、もしかしたら設定になっているかもしれませ...

15. [【三井住友カード】勝手にリボ払いになる原因と対処方法【解除して利息を節約】](https://168g.work/smbccard-revolving-start) - 三井住友カードで買い物をしたところ、勝手にリボ払いになっていたという経験はありませんか？ リボ払いは、毎月一定額の支払いを続けるため、一括払いに比べて手元に残るお金が多くなります。しかし、その分、利息...

16. [マイ・ペイすリボに勝手になる？三井住友カードがリボ払いになっている確認・解約方法・取り消し等解説｜ナクセルダイアリー](https://www.toint.co.jp/diary/mypace-rivo-katteni/) - 三井住友カードを利用した際に、なぜか支払いがリボ払いになっていたことはありませんか。支払がリボ払いになる原因は、マイ・ペ

17. [リボお支払いコース変更・リボ残高のおまとめ払い](https://www.rakuten-card.co.jp/adjustment/revo/change/) - リボ払いのお支払い金額を自分のペースに合わせて、増額・減額など変更することができます。

18. [マイ・ペイすリボとは - 三井住友カード](https://www.smbc-card.com/nyukai/merit/revolving.jsp) - 便利なお支払い方法「マイ・ペイすリボ」！お買物の都度リボ払いのご指定が面倒な方、年会費を無料（半額）にしたい方にオススメ！

19. [家族カードのご案内・お申し込み](https://www.smbc-card.com/nyukai/add/family/index.jsp) - 家族カードなら安心と信頼の三井住友VISAカード。ご家族で一緒にカードを申込される時にお得にカードが作れます。しかもサービス内容は本会員と一緒！この機会にぜひお申し込みください。初年度の年会費は無料で...

20. [家族カードとは？作るメリットと条件や注意点を解説](https://www.smbc-card.com/nyukai/magazine/knowledge/family.jsp) - 家族カード・ファミリーカードは、専業主婦や学生など年収の少ない方でも持てるクレジットカードです。メリットや限度額、注意点について説明します。【三井住友VISAカード】

21. [三井住友カードの家族カードに申...](https://manekai.ameba.jp/creditcard/smcc/family/) - 家族が三井住友カードを持っているのであれば、家族カードは審査ハードルが低くとても便利です。この記事は三井住友カードにおける家族カードの審査基準や作成メリットを、詳しく解説しています。

22. [夫婦でクレジットカードは共有できる？本会員カードと家族カード ...](https://www.smbc-card.com/nyukai/magazine/knowledge/creditcard-marriedcouple.jsp) - 夫婦でクレジットカードの共有はできません。本会員カードを別々に作るか家族カードを作るかの2つの方法があります。それぞれのメリットとデメリットを検討して選びましょう。【三井住友VISAカード】

23. [三井住友カードの「家族カード」の特徴とおすすめ活用法](https://www.smbc-card.com/mem/hitotoki/card_use/family_card.jsp) - 専業主婦や学生など年収の少ない方でもクレジットカードを持つことができる家族カード。家族カードとは何？という基本的な解説からメリットやおすすめの活用方法のほか、家族ポイントとの違いも紹介します。 三井住...

24. [三井住友ゴールド家族カードは年会費無料！100万円修行の ...](https://creditcard24.xsrv.jp/smbc-gold-family-card/) - 三井住友ゴールドカード家族カードは年会費0円で何枚でも発行可能！家族カードの利用も100万円修行に合算されるため達成が2倍速に。6人家族で8ヶ月達成した実体験・支出内訳を公開。

25. [三井住友カードの家族カードの作り方・年会費・ポイント共有まとめ](https://money.it-trend.jp/articles/brand/smbc/01-0004)

26. [Oliveフレキシブルペイがお得になる家族カード ： 三井住友銀行](https://www.smbc.co.jp/kojin/olive-account/merit/family/) - Oliveフレキシブルペイの家族カードは、本会員の1親等が作成できるクレジットモード専用カードです。ポイント還元率アップや継続特典の対象になるなど、お得な特典を受けられます。

27. [【三井住友経済圏 No.17】家族カードの作り方と活用法｜Vポイント ...](https://kaneno-money-money.com/smbc-card-kazoku/) - 年会費無料で家族もVポイントが貯まる｜ゴールドNL年会費無料化にも家族カードが貢献する
