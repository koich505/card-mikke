# Functional Requirements

Status: Approved
Last updated: 2026-08-13

## Account and Profile

### FR-001: 利用者登録

- Priority: Required
- Need: 利用条件を継続的に保持し、検索・比較時の再入力を減らす。
- Expected behavior: 利用者はProfileまたは検索・比較結果の保存と再利用のためにAccountを作成し、後から同じProfileと保存項目を利用できる。
- Constraint: Account登録は任意とし、主要な検索・比較機能の利用条件にしない。
- Constraint: 登録の主な価値は、Profileによる属性・利用条件の入力省略と、明示的に保存した検索・比較の再利用であることを明確にする。
- Expected behavior: 登録利用者は、メールアドレスとパスワード、またはGoogle Accountを使用して登録・Loginできる。
- Expected behavior: メールアドレスとパスワードで登録する場合はメール確認を必須とし、Passwordを忘れた場合は確認済みの登録メールを通じて再設定できる。
- Constraint: Google認証では、Google側で本人確認されたAccountだけを利用する。
- Expected behavior: Google認証と同じメールアドレスの既存Accountがある場合は自動統合せず、利用者に既存AccountへのLoginを求め、本人確認後にGoogle Accountを連携できる。
- Constraint: メールアドレスの一致だけを本人確認としてAccountを統合しない。
- Expected behavior: Google Account連携を解除する場合、他に利用可能なLogin方法がなければ、代替のメール・Password等を設定するまで解除を許可しない。

### FR-002: 利用条件Profile

- Priority: Required
- Need: 年間利用状況を検索・比較へ繰り返し利用する。
- Expected behavior: 登録利用者は、年間利用額、利用先別金額、年齢帯、よく使うサービス、希望するポイント・交換先、入会予定時期をProfileへ保存・更新できる。
- Constraint: 保存する属性は利用目的に必要な範囲へ限定し、保存項目と利用目的を利用者が確認できる。
- Constraint: 年収、職業・雇用形態は、明確な利用目的が別途決定されるまで初期ReleaseのProfileへ保存しない。
- Constraint: ProfileはAccountが有効な間、利用者が削除するまで保持する。
- Constraint: Profileおよび保存した検索・比較のダウンロード・Export機能は初期Releaseの対象外とする。

### FR-003: Profile条件の自動反映と手入力

- Priority: Required
- Need: 通常利用では入力負担を減らし、別の利用Scenarioも試せるようにする。
- Expected behavior: 検索・比較を開始するとProfileの利用条件が初期値として反映され、利用者は実行前に確認し、手入力で変更できる。
- Constraint: 手入力による変更は今回の検索・比較だけに使用することを初期動作とし、利用者が明示的に選択した場合だけProfileへ保存する。

### FR-025: 利用者データの管理と削除

- Priority: Required
- Need: 登録利用者が自身の保存情報を管理し、不要になった情報を残さないようにする。
- Expected behavior: 登録利用者は、自身のProfile、保存した検索・比較およびAccountを自ら削除できる。
- Expected behavior: 削除操作の完了直後から、対象Accountと利用者データをLogin、表示、検索・比較への自動反映および保存した検索・比較の利用に使用できない状態にする。
- Expected behavior: Account削除時は、保持が必要な例外を利用者へ明示し、それ以外のAccountに関連する利用者データを削除対象とする。
- Constraint: 通常の利用領域から24時間以内、Backupから30日以内に削除する。
- Constraint: 法令、Securityまたは不正防止上の保持例外がある場合は、対象、理由および保持期間を利用者へ明示する。
- Expected behavior: 削除処理の失敗を検知し、期限内の完了に向けて再試行または運営者へ通知する。
- Expected behavior: Account削除時は、本人の公開Reviewと却下Review Draftを即時非公開にし、通常領域から24時間以内、Backupから30日以内に削除し、平均評価と件数を再計算する。
- Expected behavior: 本人が行ったReview通報は、Accountとの直接紐付けを削除する。不正防止に必要な最小限の仮名化識別情報、通報回数、制限理由、日時は目的を限定して90日間保持し、その後削除する。
- Expected behavior: Moderation、承認、通報処理の監査metadataは個人との直接紐付けを削除し、Account削除後3年間保持して期限後に削除する。
- Constraint: 仮名化した不正防止情報を一般分析、広告、Profile復元または公開表示に使用しない。

## Search and Economic Comparison

### FR-010: 未登録での検索・比較

- Priority: Required
- Need: 登録を利用開始の障壁にせず、短時間で候補へ到達できるようにする。
- Expected behavior: 未登録利用者は利用条件を手入力し、カードの検索と比較を利用できる。
- Constraint: 検索・比較結果の保存または保存済み検索・比較の利用を開始するときは登録を求める。

### FR-011: 検索・比較の明示保存と再利用

- Priority: Required
- Need: 過去の探索を再確認し、条件を変えた比較を行いやすくする。
- Expected behavior: 登録利用者は、検索結果または比較結果から保存操作を明示的に選択できる。
- Expected behavior: 保存時は、利用者が保存内容を識別するための概要を必須入力し、保存対象となる入力条件、表示された計算結果、計算時点、根拠情報の確認時点、および比較時は比較対象を確認できる。
- Expected behavior: 保存が完了した場合だけ、入力された概要と保存対象を後から利用できる状態にし、完了したことを利用者へ示す。
- Expected behavior: 保存処理中であることを示し、同じ保存操作の重複実行を防ぐ。
- Expected behavior: 保存に失敗した場合は概要入力と保存対象を保持し、失敗理由を示して再試行できる。失敗した操作を保存済みとして扱わず、保存済み検索・比較へ追加しない。
- Expected behavior: 保存成功時は一回の保存操作につき一つの保存項目だけを追加する。
- Expected behavior: 保存した検索・比較を再度開いた場合は、利用者が入力した概要、当時の条件・当時の計算結果と、最新の商品情報で再計算した結果を区別して確認できる。
- Constraint: 検索または比較を実行しただけでは自動保存せず、保存操作を完了していない検索・比較はAccountの保存済み検索・比較へ追加しない。
- Constraint: 概要が未入力または空白文字だけの場合は保存せず、修正を求める。
- Constraint: 利用者が入力した概要は文字列として安全に扱い、Markupまたは実行可能な内容として解釈しない。
- Constraint: 当時の結果を最新結果で上書きせず、各結果の計算時点と根拠情報の確認時点を追跡可能にする。
- Constraint: 保存した検索・比較はAccountが有効な間、利用者が削除するまで保持する。

### FR-004: 利用条件による候補探索

- Priority: Required
- Need: 利用者が自身の条件に合う個人向けクレジットカードへ到達する。
- Expected behavior: 年間利用額、利用先別金額、および今後確定する任意条件を基に候補を検索・比較できる。
- Expected behavior: 条件に一致する候補が0件の場合は、結果がないことと緩和可能な条件を提示し、利用者が条件を変更して再検索できる。
- Constraint: 0件の場合でも、利用者の許可なく条件を自動変更せず、一般申込Routeが確認できないOfferingまたは新規受付停止中のOffering/Routeを結果へ追加しない。
- Constraint: 非公開の審査基準から審査通過を推測しない。

### FR-040: テーマ別プリセット検索

- Priority: Required
- Need: 検索条件を一つずつ設定する負担を減らし、利用者の関心に近い候補へ短時間で到達できるようにする。
- Expected behavior: 利用者は、旅行好き、ショッピング好き、シンプルでお得重視等の運営者が事前設定したテーマを一つ選ぶだけで、対応する検索条件が適用された検索結果へ到達できる。
- Expected behavior: 各テーマには、利用者向けの名称・説明と、年間利用額を含む検索・算定に必要な条件一式を設定できる。
- Expected behavior: 運営者は、公開するテーマとその表示順、名称、説明および適用条件を追加・変更・非公開にできる。
- Expected behavior: テーマを選択した場合は、Profileから反映された条件または選択前に手入力した条件を、選択テーマの条件一式で今回の検索に限って置き換え、Profile自体は更新しない。
- Expected behavior: 検索結果では、選択したテーマと適用中の条件を確認でき、利用者は通常の条件検索と同様に条件を変更して再検索できる。
- Expected behavior: 非公開にしたテーマは新たに選択できず、公開中のテーマだけを利用者向け入口に表示する。
- Constraint: テーマ選択はAccount登録を要求せず、既存の手入力による条件検索およびProfile条件を利用する探索を置き換えない。
- Constraint: テーマ名または説明で「一番」「最適」「お得」等を用いる場合も、すべての利用者にとっての優位性を保証する表現にせず、実際の順位と算定は適用条件、確認済み情報およびFR-005、FR-013、FR-014に従う。
- Constraint: 公開後にテーマの条件を変更しても、保存済み履歴の当時条件および当時計算結果を上書きしない。

### FR-028: キーワード検索

- Priority: Required
- Need: 既に候補名や関連する名称を知っている利用者が、条件設定を経ずに対象情報へ到達できるようにする。
- Expected behavior: 利用者は、カード名、発行会社名、ポイント名、および利用先の企業・店舗・サービス名をキーワードとしてカードを検索できる。
- Expected behavior: 日本語・英字の表記揺れ、一般的な略称、および軽微な入力誤りを吸収して候補を提示する。
- Constraint: 入力と関係がない候補を、表記揺れまたは入力誤りへの対応として提示しない。
- Expected behavior: 該当しない場合は結果がないことを明示し、入力を変更して再検索できる。

### FR-013: 検索結果の順位・絞り込み

- Priority: Required
- Need: 利用者が金銭的に有利な候補へ短時間で到達し、別の条件でも候補を調整できるようにする。
- Expected behavior: 検索結果は、利用者の条件に基づく年間正味還元額が高い順を基本順位とする。
- Expected behavior: 利用者は、少なくとも年会費無料、および現在適用される確認済みの基本Reward Ruleによる通常還元率等の条件で結果を絞り込める。
- Constraint: 還元率FilterへCampaign、利用先別加算、交換先別価値または期間限定倍率を混在させず、対象Rule、適用期間、上限と基本/実効値の違いを確認できるようにする。
- Constraint: 現在有効な基本Reward Ruleとその対象利用・付与率をclaim単位で確認できる候補だけを還元率Filterへ一致させる。Rule世代、適用期間、対象利用または付与率がunknownもしくはpartially_disclosedで判定不能な候補を、推定値で一致させない。
- Expected behavior: 利用者は、対象となる個人向けProduct/Offeringに、家族・追加カードのIssuanceまたは関連するETC Payment Instrumentを申し込めることが確認済みの候補へ絞り込める。
- Constraint: 家族・追加カードまたはETCについて、対象Product/Offering、申込可能なApplication Route、Eligibilityおよび有効期間との関係が確認できない候補は、対応候補へ絞り込む条件に一致させない。
- Constraint: 上記の未確認カードについて、除外件数または未確認である旨の表示を必須としない。
- Expected behavior: 一般申込Routeが確認できず招待Route等だけが確認されるOffering、および新規受付停止中のOffering/Routeを検索結果へ含めるかを利用者が選択できる。
- Constraint: 上記Offeringは通常検索の初期状態では結果から除外する。招待の存在だけでProduct全体を招待制と判定せず、InvitationをEligibility充足、審査承認またはIssuance保証として扱わない。
- Constraint: 算定不完全な候補も順位から除外しないが、確認済み要素だけによる金額であることと、実際の順位が変わり得ることを識別可能にする。

### FR-012: 利用先カテゴリと企業・サービスによる条件指定

- Priority: Required
- Need: 利用者の実際の利用先に応じた特約還元を計算へ反映する。
- Expected behavior: 利用者は、コンビニ、スーパー、ドラッグストア、飲食店、ガソリン、公共料金、携帯電話、交通、旅行・宿泊、ネット通販、その他等の利用先カテゴリごとに利用額を指定できる。
- Expected behavior: 各カテゴリでは、対象となる企業・店舗・サービスを追加で指定できる。
- Constraint: カテゴリだけを指定した場合は、そのカテゴリ全体を条件として扱う。企業・店舗・サービスを指定した場合は、指定先に対応する利用額として扱う。
- Expected behavior: カテゴリだけを指定した場合は、そのカテゴリ内で公式確認できる最も高い企業・サービス別還元条件を採用し、採用した企業・サービス名、還元条件、およびカテゴリ内最良条件を仮定した目安であることを示す。
- Expected behavior: 企業・店舗・サービスを個別指定した場合は、指定先へ適用される確認済み還元条件を使用する。
- Constraint: 年間利用額を総額、利用先別金額をその内訳として扱い、両者を重複加算しない。
- Expected behavior: 利用先別金額の合計が年間利用額より少ない場合は、その差額を「その他の利用」として通常還元の計算対象にする。
- Expected behavior: 利用先別金額の合計が年間利用額を超える場合は計算を行わず、利用者へ不整合を知らせて訂正を求める。

### FR-005: 年間正味還元額の算定

- Priority: Required
- Need: 利用者の想定利用状況におけるカード間の金銭的な違いを、共通する仮定による目安として比較する。
- Expected behavior: 対象Product/Offering/Variant、Application Route、Contract世代、関連Issuanceに適用されることを確認できた年会費、通常還元、利用先別還元、Campaign、適用条件、期間および上限に基づき、年間正味還元額の目安を算定する。
- Expected behavior: 月次利用額が入力されておらず月次・期間別条件の判定が必要な場合は、年間利用額を12か月へ均等配分した仮定で算定し、その仮定を表示する。
- Expected behavior: 取引ごとの金額や付与単位が必要だが明細がない場合は、入力された年間・カテゴリ・企業別金額へ公式還元条件を適用した概算とし、取引単位の端数を再現していないことを表示する。
- Expected behavior: 公式Ruleに付与単位・端数処理が明示されている場合は計算説明へ表示し、入力情報で再現可能な範囲ではそのRuleを使用する。
- Constraint: 保険、ラウンジ等の金銭換算しにくいBenefitを算定額へ含めない。適用可否または換算価値が不明な値を推測で補完しない。
- Constraint: 現金同等に利用または交換しやすく、公式情報から換算価値を確認できるポイント等だけを金銭換算へ含める。
- Constraint: マイル、商品・アイテムへの交換等、安定した現金相当価値を確認できないものは年間正味還元額へ含めず、金銭評価外の情報として区別する。
- Expected behavior: 交換先により現金相当価値が変わる場合は、利用者が希望する交換先を指定したときだけ、確認可能な当該交換価値を使用する。
- Expected behavior: 公式Sourceで固定の円換算価値を確認できるカード請求額への充当、現金への交換、広く支払いに利用できる共通ポイント、および固定額で利用できる電子マネーへの交換を金銭換算の対象とする。
- Constraint: マイル、交換商品、用途が限定されたCoupon、または交換時期・条件等により価値が変動するものは年間正味還元額へ含めない。
- Constraint: 本カード、家族・追加カード、ETC等のFeeを同一料金にせず、初年度/次年度、免除、割引、過去実績のcarryover、ポイント充当が対象利用者へ適用されることを確認できる範囲だけ算定する。
- Constraint: 初期Releaseの年間正味還元額は本カード1契約・本会員向けのFeeを対象とし、利用者が取得枚数を指定する機能を持たない家族・追加カードおよびETCの任意Feeは合計へ含めず、詳細情報として区別して表示する。

### FR-015: Campaignの算定対象

- Priority: Required
- Need: 一時的な還元を過大評価せず、利用者に適用可能なCampaignを初年度計算へ反映する。
- Expected behavior: 対象Campaign Instance、Application Route、対象者、対象利用、登録、条件構造、確定付与されるReward、Beneficiary、上限および各期間を確認でき、利用者の入力条件から充足を判定できるCampaignだけを初年度の算定へ含める。
- Expected behavior: エントリーその他の利用者操作が必要な場合は、その条件を明示したうえで算定へ含める。
- Constraint: 抽選候補、当選確率を確認できない効果、および確定付与との対応を分離できない効果は年間正味還元額へ含めない。
- Constraint: 申込経路、対象者、登録・応募期間、対象利用期間、判定・付与期間、利用額、Reward/会員/期間/Campaign全体等の上限、重複可否その他の条件を確認できないCampaignは推測で含めない。
- Constraint: 予定終了日と実際の早期終了を区別し、早期終了が既登録者または発行済み権利へ及ぼす効果をEvidenceなしに推論しない。

### FR-014: 不完全な算定結果

- Priority: Required
- Need: 未確認情報を推測せず、候補自体は失わないようにする。
- Expected behavior: Campaign条件、ポイント価値その他の算定要素を確認できない場合、その要素を金額へ加算せず、確認できた要素だけで年間正味還元額を算定する。
- Expected behavior: 算定結果には、算定不完全であること、含めなかった要素、確認できなかった理由または状態、および結果が過小評価となる可能性を示す。
- Constraint: 未確認要素を0円の価値があると確定した扱いにしない。
- Constraint: 算定不完全な候補を検索結果と順位から自動的に除外しない。

### FR-016: 算定内訳の提示

- Priority: Required
- Need: 利用者が合計額の根拠とCampaign依存度を確認できるようにする。
- Expected behavior: 年間正味還元額とともに、少なくとも通常ポイント、利用先別の追加還元、Campaign還元、年会費を区別した内訳を提示する。
- Expected behavior: 計算対象外または未確認の項目と、その理由・適用条件を提示する。
- Expected behavior: カテゴリ内最良条件、月次均等配分、取引単位概算その他の仮定を、採用した企業・Service名とともに提示する。
- Constraint: 初年度と通常年の内訳を混在させない。

### FR-029: 複数カード比較

- Priority: Required
- Need: 候補間の差を同一の利用条件と基準で確認し、選択判断を行えるようにする。
- Expected behavior: 利用者は検索結果等から複数のカードを選択し、同一の入力条件に基づく年間正味還元額と内訳を比較できる。
- Expected behavior: 少なくとも対象Product/Offering、年会費、基本還元率、年間正味還元額、Reward名称、利用先別還元、Campaign Instance、Application RouteとEligibility、国際ブランド/Variant、関連する家族・追加カードIssuance、ETC Payment Instrument、確認日、適用期間および算定状態を候補間で比較できる。
- Constraint: 初期Releaseで同時に比較できるカードは最大5枚とする。
- Constraint: 初年度と通常年、確認済み結果と変更確認中・算定不完全な結果を混同しない。

### FR-030: お気に入り

- Priority: Required
- Need: 利用者が検討中の候補へ後から戻れるようにする。
- Expected behavior: 未登録利用者は利用中の環境で一時的にカードをお気に入りへ追加・解除し、確認できる。
- Expected behavior: 登録利用者はお気に入りをAccountへ継続保存し、後から確認・解除できる。
- Expected behavior: 未登録時の一時お気に入りがある状態でAccount登録した場合は、利用者へ確認し、同意した場合だけAccountのお気に入りへ引き継ぐ。
- Constraint: 未登録利用者の一時お気に入りについて、Accountに保存済みであるとの誤認を与えない。
- Constraint: 未登録利用者の一時お気に入りは最終利用から30日間保持する。利用環境側のデータが削除された場合は30日未満でも失われる可能性を明示する。
- Constraint: お気に入りの保存上限は、登録・未登録とも初期Releaseでは50枚とする。

### FR-006: 初年度と通常年の分離

- Priority: Required
- Need: 初年度限定Campaignによる一時的な便益と継続的な便益を誤認させない。
- Expected behavior: 対象Campaign Instance等を含む初年度の結果と、当該実施回終了後の通常年の結果を区別して提示する。
- Constraint: 計算基準日、Contract/Fee/Reward Ruleの世代、集計・判定・付与・利用期間、Campaign適用条件を追跡可能にする。

## Editorial Content

### FR-007: おすすめ記事・二軸比較記事・単一カード特集記事の閲覧

- Priority: Required
- Need: 検索条件を自ら組み立てない利用者への候補発見の入口と、特定カードの新商品・機能・特典を理解する入口を提供する。
- Expected behavior: 利用者は、選定理由を伴う用途別または読者像別の記事を閲覧できる。
- Expected behavior: 記事ごとに、各カードをおすすめする理由と選定基準を文章で確認できる。
- Expected behavior: 利用者は、2つの比較軸上に複数カードを配置した比較マップを含む記事を閲覧できる。
- Expected behavior: 二軸比較記事では、各軸の名称、方向、対象範囲、評価基準、各カードの配置理由、使用情報の確認時点、公式Source、および情報不足等により配置しなかったカードと理由を確認できる。
- Constraint: 二軸比較マップを客観的な総合順位として表示せず、定性的な軸または導出値を使う場合は、その評価基準と導出方法を利用者が確認できるようにする。
- Constraint: 比較マップと同じ内容を、位置関係だけに依存せず理解できる代替表現でも提供する。
- Expected behavior: 利用者は、単一カードを対象として、新商品、機能、特典または変更内容を解説する特集記事を閲覧できる。
- Expected behavior: 単一カード特集記事では、対象カードを明示し、扱う特徴、適用条件、確認時点および根拠となる公式Sourceを確認できる。
- Constraint: 記事内の順位またはおすすめ理由に、年間正味還元額の表示を必須としない。
- Constraint: 単一カード特集記事を複数カードの客観的な比較順位として扱わず、広告・Affiliate関係がある場合はその関係を開示する。

### FR-008: 記事の自動Draft生成

- Priority: Required
- Need: 保持するカード情報を再利用し、記事作成と更新の負担を減らす。
- Expected behavior: 運営者は、保持するカード情報とEvidenceに基づく記事Draftを生成できる。
- Expected behavior: 運営者が比較テーマを指定すると、AIは保持する承認済みカード情報とEvidenceから、比較対象、二軸の候補、軸の方向と評価基準、各カードの配置、配置理由、および配置不能・除外理由を含む比較マップDraftを生成できる。
- Expected behavior: AIが定性的な比較軸または既存項目からの導出値を提案する場合、使用した項目、評価基準、導出方法および各配置への寄与を運営者が確認できる。
- Constraint: 未承認Draft、公式Sourceで確認できない値、AIの既有知識または推測値を比較マップ生成の確定入力に使用しない。
- Constraint: `unknown`、`undisclosed`、`partially_disclosed`または必要項目不足を推測で補完せず、配置不能、除外または限定的な比較として理由を残す。
- Constraint: Draftであること、生成時点、入力に使用した承認済みデータのRevision、使用情報、Source、確認日、対象範囲、計算・評価条件、生成に使用したAIのService・Model・Version、生成TemplateのRevisionおよび生成結果を追跡可能にする。生成した内容を自動的に公開しない。

### FR-009: 記事の確認・編集・承認・公開

- Priority: Required
- Need: 自動生成内容の誤りや古い情報を公開前に確認する。
- Expected behavior: 権限を持つ運営者は記事Draftを確認・編集し、明示的に承認した後に公開できる。
- Expected behavior: 二軸比較記事では、運営者は比較軸と評価基準、対象・除外カード、各カードの配置と理由を確認・編集し、記事本文とは別に明示承認できる。
- Expected behavior: 比較軸、評価基準または配置を編集した場合は、公開前にすべての配置を編集後の基準で再検証し、整合しない配置を承認できないようにする。基準から導出できない編集を残す場合は、編集者による配置であることと変更理由を記録し、公開記事でも識別可能にする。
- Constraint: 人間による編集または承認後もAI生成Contentを信頼済み入力として扱わず、編集のたびと公開直前に公開可能な構造、Text、MarkupおよびURLだけであることを検証する。検証を通過しないContentは公開しない。
- Constraint: 承認前のDraftは公開状態にしない。

### FR-031: 公開済み記事の再確認・更新

- Priority: Required
- Need: 元となるカード情報が変わった場合に、古い記事を最新情報として誤認させず、公開を継続しながら訂正できるようにする。
- Expected behavior: 記事が参照するカード情報の変更を検知した場合、関連する公開記事を更新確認の対象として識別し、新しい記事Draftを生成できる。
- Expected behavior: 運営者が新Draftを確認・編集・再承認するまで、現在の公開記事を「更新確認中」の注意、最終確認日および公式Source確認の案内とともに掲載し続ける。
- Expected behavior: 再承認された記事だけを新しい公開版として反映し、更新前後の内容、根拠および承認履歴を追跡可能にする。
- Expected behavior: 二軸比較記事が参照する承認済みカード情報、評価基準または対象範囲が変わった場合は、比較マップも更新確認対象とし、新しい配置Draftと変更理由を提示する。
- Constraint: カード情報の変更検知またはDraft生成だけで、公開記事を自動更新しない。

### FR-041: 特集記事一覧・検索・絞り込み

- Priority: Required
- Need: 利用者が検索条件を組み立てなくても、関心に近い公開済み特集記事を見つけ、記事からカード探索へ進めるようにする。
- Expected behavior: 利用者は、公開済み特集記事の一覧から、フリーワード、記事へ付与されたタグ、および記事種別（用途・読者像別、二軸比較、単一カード特集）で記事を探せる。
- Expected behavior: フリーワード検索の対象は、記事タイトル、要約、タグおよび対象カード名とする。本文全体は初期Releaseの検索対象に含めない。
- Constraint: 初期Releaseの記事フリーワード検索は、対象文字列への一致検索に限定し、表記揺れ、略称および軽微な入力誤りの吸収を必須としない。
- Expected behavior: 複数のタグを選択した場合、選択したすべてのタグを持つ記事だけを表示する。
- Expected behavior: 利用者は、新着順または更新順で一覧を並び替えられる。新着順は公開日、更新順は現在の公開版の更新日を基準とし、最終確認日と混同しない。
- Constraint: 一覧、検索結果およびタグ検索結果には、承認済みの公開記事だけを含める。未承認Draft、更新Draftおよび自動検知だけの変更は表示しない。
- Expected behavior: 各記事には、記事種別、対象読者または対象カード、タグ、および更新確認中の状態を確認できる情報を表示する。通常記事の一覧では、公開日、更新日および最終確認日を表示しない。
- Expected behavior: 検索・絞り込み結果には件数、適用中の検索語・条件、およびすべての条件を解除する操作を示す。0件の場合は0件であることを示し、条件を自動変更せず、条件の解除または変更を可能にする。
- Constraint: 更新確認中の記事は、最新情報として確定した記事または新規更新として扱わず、FR-031に従い公開済み旧記事であること、最終確認日および公式Source確認の案内を一覧と記事詳細で識別可能にする。
- Expected behavior: 記事一覧と検索結果から記事詳細へ進み、記事詳細から関連するカード詳細または条件付き検索結果へ進める。

## Card Information and Monetization

### FR-020: 公式Sourceに限定した算定情報

- Priority: Required
- Need: 年間正味還元額と比較結果の根拠を信頼できる情報へ限定する。
- Expected behavior: 年会費、還元率、ポイント価値、Campaign、適用条件等、検索順位または算定結果へ使用する情報は、カード会社、ポイント運営会社その他の当該情報について責任を持つ公式Sourceで確認できたものだけを採用する。
- Constraint: Sourceの公式性はclaimごとに責任を持つ発行主体と内容を確認し、Source全体の一部が公式であることから、別のActor、Benefit、Insurance、Campaign等のclaimまで確認済みとしない。
- Constraint: 比較サイト、個人投稿、生成内容等の非公式情報だけを根拠として算定値を確定しない。
- Constraint: 公式Sourceでも確認できない内容は、推測で補完せずDisclosure Statusに従って扱う。

### FR-027: 掲載Coverageの開示

- Priority: Required
- Need: 「網羅的」という価値を検証可能にし、未掲載商品がないとの誤認を防ぐ。
- Expected behavior: 掲載会社数、Product/Offeringとして数える掲載カード数、現在有効な一般申込Routeを確認できた候補数、各集計単位、対象範囲および最終確認日を確認できる。
- Expected behavior: 未対応の会社・商品・利用先カテゴリ等の範囲を確認でき、段階的なCoverage拡大に伴って更新できる。
- Constraint: 国内のすべてのカードを掲載していると根拠なく断定しない。
- Constraint: 初期公開時点で国内すべての対象を掲載することを完了条件にしない。

### FR-021: 公式Sourceの変更検知と更新案作成

- Priority: Required
- Need: 年会費、還元条件、Campaign等の変更を把握し、古い情報による比較を減らす。
- Expected behavior: 管理対象の公式Sourceについて、内容変更、URL変更、取得不能その他の再確認が必要な状態を継続的に検知できる。
- Expected behavior: 既知のURLの監視に加え、新しく登場したカード商品および新しく開始されたCampaignの候補を継続的に探索できる。
- Constraint: 探索結果だけでCampaignを確定せず、当該Campaignについて責任を持つ公式Sourceを確認できた場合だけ更新案へ採用する。
- Expected behavior: 変更を検知したSourceを再確認し、変更内容、根拠、適用開始・終了時期、影響するカード情報、計算結果および記事を追跡可能な更新案として運営者へ提示する。
- Expected behavior: 更新案では、影響するProduct/Offering/Route/Feature/Rule version/Campaign Instance/effect/Benefit/Coverage/Issuance/Instrumentと対象期間を区別し、影響範囲を特定できない場合はその状態を保持する。
- Expected behavior: HTML等のSource内容に差分がある場合は、年会費、還元率、Campaign条件等の変更された可能性がある項目を特定し、候補として提示する。
- Expected behavior: ページ全体の変更有無だけでなく、管理対象の各項目について前回承認値、今回の抽出候補、差分、Source上の根拠箇所、取得時点および抽出確度を対応づけて提示する。
- Constraint: HTMLまたは文言の差分だけからDomain Factの変更を確定せず、項目別の変更候補と、確実に特定できない差分を区別する。
- Constraint: 変更検知または自動取得だけで公開情報と計算値を更新しない。
- Constraint: 変更検知と新規Campaign探索は1日1回を初期目標とする。ただし、費用、処理量、対象Source数、検知遅延を計測し、承認済みの頻度へ見直せるようにする。
- Constraint: 変更検知後、運営者は3営業日以内に確認へ着手する。
- Expected behavior: 日次確認が失敗した場合は自動的に再試行し、3日連続で成功しない場合は運営者が確認できる警告を記録する。

### FR-022: カード情報更新の確認・承認

- Priority: Required
- Need: 自動検知・抽出の誤りが検索順位や記事へ反映されることを防ぐ。
- Expected behavior: 権限を持つ運営者は、更新案のclaim分割、公式SourceとSource tier、根拠箇所、変更差分、適用条件、各時点、Disclosure Status、confidence、競合・訂正・supersedes関係および影響範囲を確認し、必要に応じて訂正したうえでclaimごとに承認または却下できる。
- Expected behavior: 承認された更新だけを公開情報、以後の計算および記事更新の入力へ反映する。
- Constraint: 誰がいつ何を承認・却下したかと、更新前後の内容を追跡可能にする。
- Constraint: 初期Releaseでは同一の運営者が編集と承認を行うことを許容する。ただし、編集と承認は別の明示的な操作とし、両方の時刻・内容・実行者を記録する。
- Constraint: 初期Releaseの管理権限は単一の管理者Roleを前提とし、同Roleが情報承認、記事、Review Moderation、通報処理、不正防止を担当する。

### FR-033: AI支援による公式情報の収集・構造化

- Priority: Required
- Need: 初回データ投入と継続更新をすべて人手入力に依存させず、運営者の確認・軽微な訂正を中心とする運用を可能にする。
- Expected behavior: 対象カードまたは公式Sourceを指定すると、AIを利用した自動処理が、Product/Offering/Variant候補、年会費、Reward/Benefit、Campaign Instance/effect、Application Route/Eligibility、国際ブランド、家族・追加カードIssuance、ETC Payment Instrument、Insurance/Coverage、受付状態、各条件・期間その他の管理対象情報を収集・抽出し、未承認Draftとして構造化する。
- Expected behavior: 各抽出claim候補に、公式Source、Source tier、取得・公開・発表・発効等の確認可能な時点、根拠箇所、適用期間、抽出confidence、およびDisclosure Status候補を対応づける。
- Expected behavior: 初回収集と、既存データに対する継続的な再収集の両方を行える。
- Expected behavior: 定期探索で発見した新しいカード商品について、公式Sourceを確認し、既存商品との重複候補を示したうえで新規カードDraftを作成できる。
- Expected behavior: 新しいカード候補が既存商品の改定、Variant、後継商品または独立した新商品かを判別できない場合は、「商品同一性の確認待ち」として人間判断へ回す。
- Constraint: 非公式Sourceだけを根拠として項目値を確定しない。検索結果やAIの既有知識を公式Factとして扱わない。
- Constraint: AI出力は未承認の候補であり、運営者の確認・必要な訂正・明示承認なしに、公開、年間正味還元額、順位または記事生成の確定入力へ使用しない。
- Constraint: 商品同一性が確認されるまで、新規商品として自動登録せず、既存商品へ自動統合しない。
- Constraint: Product、Offering、Variant、Application Route、Rule version、Campaign Instance/effect、Benefit、Insurance/Coverage、Issuance/Instrumentの候補を単一のカード共通値へ自動昇格または上書きしない。
- Constraint: SourceのAccess制限、利用条件、robots等の適用事項を確認せずに取得を強行しない。
- Constraint: Source本文、PDF、metadataその他の取得内容を未信頼データとして扱い、そこに含まれる命令、Tool実行、外部通信、権限変更またはSecret要求をAI収集・構造化処理の命令として実行しない。

### FR-034: 管理項目単位の差分確認

- Priority: Required
- Need: Sourceのレイアウト変更と、商品条件の実質的変更を区別し、運営者が確認すべき差分を絞り込む。
- Expected behavior: 再収集時は、管理対象の各項目について、追加、変更、削除候補、変更なし、抽出不能を区別する。
- Expected behavior: 前回承認値と今回候補を並べ、変更された可能性がある値、条件、期間および根拠箇所を運営者が確認できる。
- Expected behavior: 差分は、影響するProduct/Offering/Variant、Application Route、Feature、Rule version、Campaign Instance/effect、Benefit、Coverage、Issuance/Instrumentの対象範囲と期間を区別して確認できる。
- Expected behavior: SourceのHTML等に差分があっても管理対象項目に変更候補がない場合は、Source差分の要約と項目比較結果をまとめて確認し、一括承認できる。
- Constraint: 追加、変更、削除候補または抽出不能となった項目は、一括承認の対象にせず個別確認を必須とする。
- Constraint: Source自体にも管理対象項目にも差分がない場合は、データ更新承認を要求せず、確認成功の記録だけを残す。
- Expected behavior: 項目を特定できないSource差分も破棄せず、影響範囲不明の確認事項として提示する。
- Constraint: AIまたは自動比較が「変更なし」と判定したことだけを理由に、公式SourceのEvidence履歴を削除しない。

### FR-032: 運営者による業務情報管理

- Priority: Required
- Need: 日常的な情報追加・訂正をApplication codeの変更に依存させない。
- Expected behavior: 権限を持つ運営者は、カード、利用先カテゴリ、企業・店舗・サービス、ポイント換算基準、Campaignその他の検索・計算に必要な業務情報を追加、訂正、無効化できる。
- Expected behavior: 業務情報は、Product、Offering、Variant、Application Route、Rule version、Campaign Instance/effect、Benefit、Insurance/Coverage、関連Issuance/Instrument等のDomain上の対象と関係を区別して管理できる。
- Constraint: 変更は公式Source、適用時期、変更理由および承認記録と対応づける。
- Constraint: 無効化した情報を削除扱いにして過去の計算・記事・Evidenceとの追跡関係を失わない。
- Constraint: 初期Releaseでは同一運営者による編集と承認を許容するが、承認操作を編集操作と統合または省略しない。

### FR-023: 変更確認中の公開情報

- Priority: Required
- Need: 更新確認中であってもカード候補の掲載を継続し、同時に古い可能性のある情報を確定情報と誤認させない。
- Expected behavior: 公式Sourceの変更を検知してから承認が完了するまで、対象Product/Offeringの掲載を継続する。
- Expected behavior: 過去に公式Sourceで確認・承認されたclaimは、影響するOffering/Route/Feature/Rule/Campaign effect/Coverageと有効期間を特定でき、旧claimが引き続き有効である合理的な根拠がある場合だけ、注意表示付きで算定と順位へ継続使用する。
- Constraint: 影響範囲または旧claimの有効性を特定できない場合は、自動的に旧値を継続せず、算定から除外するか、根拠を確認した運営者の明示判断を要求する。
- Constraint: 算定対象外のBenefitまたはInsurance情報でも、影響範囲または旧claimの有効性を特定できない場合は確定情報として継続表示せず、変更確認中または該当するDisclosure Statusとして表示する。
- Expected behavior: 対象情報が変更確認中であること、使用している値の確認日、旧値に基づく暫定的な結果であること、結果と順位が変わり得ること、および申込前に最新情報を公式Sourceで確認する必要があることを明示する。
- Constraint: 変更検知後の旧値を使用する場合と、一度も公式Sourceで確認できていない値を区別する。後者は`FR-014`に従い推測で算定へ含めない。

### FR-024: Evidence metadataの履歴保持

- Priority: Required
- Need: 公式Sourceの消失・移動後も、過去に採用したFactの確認根拠を追跡できるようにする。
- Expected behavior: 採用・不採用のclaimごとに、Observation、Extracted Fact、Domain Factへの関係、値または記述、根拠箇所、取得・公開・発表・発効・観測等の確認可能な時点、適用期間、Sourceの発行主体・タイトル・URLまたは識別子、Source type/tier、Disclosure Status、confidence、確認結果、競合・訂正・supersedes関係、および更新・承認履歴を保持する。
- Constraint: 掲載・計算に使用している期間中は保持し、使用終了後も最低3年間保持する。
- Expected behavior: 使用終了後3年を経過し、未解決の監査、訂正または保持例外がないEvidence metadataと関連履歴を削除する。
- Constraint: Source全文または画像等の複製保存は本要件に含めず、権利、必要性、保存量を確認せずに必須化しない。

### FR-026: 情報訂正の受付と確認

- Priority: Required
- Need: 利用者、カード会社その他の関係者から、公開情報の誤り・変更を把握できるようにする。
- Expected behavior: Loginしていない利用者も、公開情報の誤りまたは変更を指摘できるFormを利用できる。
- Expected behavior: 指摘には、対象となるカード・記事・掲載項目、指摘内容、および利用者が把握している根拠を含められる。
- Expected behavior: 管理者は指摘内容と公式Sourceを確認し、修正が必要な場合は修正案を作成して`FR-022`の確認・承認後に反映し、掲載情報が正しい場合または根拠を確認できない場合は理由を記録して却下できる。
- Expected behavior: 各指摘について、未確認、確認中、修正対応、却下、完了等の処理状態と、判断者、判断日時、判断理由を管理できる。
- Expected behavior: 訂正連絡の受付後、3営業日以内に公式Sourceの確認へ着手することを努力目標とする。
- Constraint: 連絡内容だけを根拠としてFactを確定しない。
- Constraint: Login不要であることを理由に、指摘Formから送信された内容を信頼済みの入力として扱わない。

### FR-017: カード詳細情報

- Priority: Required
- Need: 利用者が候補の条件、便益、申込可否と情報根拠を確認できるようにする。
- Expected behavior: カード詳細では、少なくとも対象Product/Offering、年会費、基本還元率、Reward名称、利用先別還元、Campaign Instanceと確定/抽選の区別、Application Route/Eligibility、対応する国際ブランド/Variant、Benefit、関連する家族・追加カードIssuance、ETC Payment Instrument、Offering/Routeの新規受付状態、確認日、適用期間、Sourceを確認できる。
- Expected behavior: Benefitは確認できるProvider、対象User/Beneficiary、利用経路、登録・予約条件、上限、除外および期間を表示できる。保険はInsurance Product名だけでなく、確認できるCoverageごとのInsured、Beneficiary、Eligibility/Attachment条件、補償事故、Limit、Deductible、Exclusion、Claim Requirement、期間およびUnderwriterを区別して表示できる。
- Constraint: 確認できない項目を推測で補完せず、Disclosure Statusに従って扱う。
- Constraint: 家族・追加カードとETCは初期Releaseの独立した商品検索対象ではなく、対象Product/OfferingとのIssuanceまたはPayment Instrument関係として扱う。ただし、FR-013に従い、関係と申込可能性を確認できた対象カードへの絞り込みには使用できる。

### FR-018: ブランド等の視覚的識別

- Priority: Required
- Need: 貯まるポイントと対応する国際ブランドを利用者が識別しやすくする。
- Expected behavior: ポイント名称および国際ブランド名称とともに、利用許諾と正確性を確認できたブランドアイコンを識別情報として表示する。
- Constraint: アイコンだけに情報を依存せず、名称を確認可能にする。

### FR-035: カード券面デザイン画像

- Priority: Required
- Need: 利用者がカード商品と券面デザインを視覚的に識別できるようにする。
- Expected behavior: 権限を持つ運営者は、カードごとの券面デザイン画像を登録、確認、差替え、無効化できる。
- Expected behavior: 各画像に、対象カード、対応する国際ブランド・Variant・発行時期その他の適用条件、公式Source、取得日、利用許諾または利用条件、適用期間、代替Text、および状態を対応づける。
- Expected behavior: 同一カードに複数の券面デザインがある場合は、各画像の対応条件を区別して保持できる。
- Expected behavior: AI支援の自動収集は、公式Sourceから券面画像とmetadataを未公開Draftへ取得し、既存画像との差分候補を提示できる。
- Expected behavior: 運営者が画像、対応カード、Source、利用条件および適用期間を確認し、明示承認した場合だけ登録・公開できる。
- Constraint: 利用許諾または公式な利用条件を確認できない画像を公開しない。
- Constraint: AIが取得した画像を、人間の承認なしに公開情報へ使用しない。
- Constraint: 券面画像だけに商品識別を依存せず、カード名称等のText情報を併用する。
- Constraint: 券面デザイン変更時に旧画像を無条件で上書きせず、適用期間と履歴を保持する。
- Constraint: 券面画像またはdesignの変更だけからProduct、Contract、Issuanceまたは再発行の同一性・変更を推論しない。
- Expected behavior: 運営者が却下したAI取得画像の本体は通常領域から却下後30日以内、Backupからも却下後30日以内に削除し、Source、取得日、却下理由等のmetadataは却下後3年間保持して期限後に削除する。

## User Reviews

### FR-036: ログイン利用者によるカードReview投稿

- Priority: Required
- Need: 実際の利用者の評価や体験を、カード選びの補助情報として提供する。
- Expected behavior: Login中の利用者は、対象カードに対して1〜5の星評価とMessageを含むReviewを投稿できる。
- Constraint: 同一利用者が同一カードへ保持できるReviewは1件とし、再度投稿する場合は既存Reviewの編集として扱う。
- Expected behavior: 投稿者は自身のReviewを編集・削除できる。削除操作後は即時非公開とし、通常領域から24時間以内、Backupから30日以内に削除する。
- Constraint: 未登録または未Loginの利用者はReviewを投稿できない。
- Constraint: Reviewは公式商品情報、年間正味還元額または運営者の記事とは区別して扱い、利用者投稿であることを明示する。

### FR-037: Reviewの検査・承認・集計

- Priority: Required
- Need: 不適切なUGCや不正評価を公開せず、利用者評価を公式情報と混同しない形で提供する。
- Expected behavior: 投稿・編集されたReviewは未公開状態とし、AI支援により不適切表現、個人情報、Spamその他の確認候補を検出する。
- Expected behavior: 運営者はReview本文、AI検査結果、投稿・編集時点を確認し、必要に応じて却下理由を記録したうえで承認または却下できる。
- Expected behavior: 却下されたReviewは投稿者が修正して再申請できる。再申請されない却下Draftは却下から30日後に削除する。
- Constraint: AI検査結果だけでReviewを自動公開しない。運営者が明示承認したReviewだけを公開する。
- Expected behavior: 公開Reviewが1件以上ある場合は平均星評価と公開件数を表示し、0件の場合は平均値を表示しない。
- Constraint: Reviewの星評価、件数または本文を、年間正味還元額による検索順位または運営記事のおすすめ選定・順位へ影響させない。

### FR-038: 公開Reviewの通報

- Priority: Required
- Need: 公開後に判明した不適切・虚偽・個人情報・Spam等のReviewを運営者が再確認できるようにする。
- Expected behavior: Login利用者は、公開Reviewについて不適切、虚偽、個人情報、Spamその他の理由を選択し、必要に応じて説明を添えて通報できる。
- Expected behavior: 運営者は通報、対象Review、理由、通報時点を確認し、Reviewの掲載継続、一時非公開または削除を判断できる。
- Expected behavior: 通報受付後3営業日以内に運営者が確認へ着手することを努力目標とする。
- Constraint: 通報があったことだけを理由にReview内容を虚偽と確定しない。
- Constraint: 通報件数だけを理由としてReviewを自動的に非公開にしない。
- Constraint: 通報者の情報をReview投稿者または一般利用者へ公開しない。

### FR-019: Affiliate申込導線

- Priority: Required
- Need: 利用者をカード申込先へ案内し、サイトの収益化につなげる。
- Expected behavior: 検索結果、カード詳細または記事から、対象カードの申込先へAffiliate Linkを通じて移動できる。
- Expected behavior: Affiliate Link付近および該当記事では、広告・PRを含むことを利用者が識別できるようにする。
- Constraint: Link先、対象カード、申込経路およびCampaign条件の対応を確認できない場合に、同一の申込条件であると推測しない。
- Constraint: Affiliate Linkは確認済みのApplication Routeへ対応づけ、Linkの存在をEligibility充足、審査承認、Contract成立またはIssuance保証として表示しない。
- Constraint: Affiliate報酬の有無または金額を、年間正味還元額による検索順位、絞り込み結果、記事のおすすめ選定または選定順位へ影響させない。
- Expected behavior: Affiliate経由で申込条件または利用者負担が変わるかを確認し、差異がある場合は申込前に明示する。確認できない場合は、その状態を明示する。

## General States

### FR-039: 主要FlowのLoading・Empty・Error・Partial

- Priority: Required
- Need: 外部ServiceまたはAI処理の障害を、誤情報公開や主要機能全停止へ拡大させない。
- Expected behavior: 処理開始後、結果が未確定の間はLoadingまたは処理中であることを示し、完了・失敗・部分成功のいずれかへ遷移する。
- Expected behavior: 検索結果または保存した検索・比較が0件の場合はEmptyとして扱い、ErrorまたはDomain Factの`unknown`と混同しない。
- Expected behavior: Google認証が利用不能でも、未登録の検索・比較と、利用可能な場合のメール・Password Loginを継続し、Google認証障害を利用者へ示す。
- Expected behavior: AI抽出、Source取得、記事生成またはReview検査が失敗した場合は、失敗対象を未承認・未公開のまま保持し、失敗理由と再試行状態を記録する。既存の承認済み情報・公開記事は、それ自体を自動削除しない。
- Expected behavior: 一部カードの算定に失敗した場合は、成功した候補の結果をPartialとして提示し、失敗した候補と理由を区別する。失敗値を推測で補完しない。
- Expected behavior: Profile自動反映に失敗した場合は保存値を使用できなかったことを示し、利用者が手入力で検索を継続できる。
- Constraint: Error、Partial、一般画面状態のUnknownと、Disclosure Statusの`unknown`を別の状態として扱う。
- Constraint: AI・外部Service障害時に未承認Draftを自動承認または公開しない。
