# Acceptance Criteria

Status: Approved
Last updated: 2026-08-13

## Account, Profile, and Privacy

### AC-001: 未登録利用

- Requirements: FR-001, FR-004, FR-010
- Given: 利用者が未登録である
- When: 年間利用額等を手入力して検索・比較する
- Then: Account作成を要求されず、検索結果と比較結果を利用できる

### AC-002: Profile反映と一時変更

- Requirements: FR-002, FR-003
- Given: 登録利用者がProfileを保存している
- When: 検索・比較を開始し、反映値を手入力で変更する
- Then: Profile値が初期値として反映され、変更値は明示保存しない限りProfileを更新しない

### AC-003: Account認証と連携

- Requirements: FR-001
- Given: メール登録またはGoogle認証を利用する
- When: 登録、Password再設定、同一メールのGoogle連携、またはGoogle連携解除を行う
- Then: メール確認と本人確認を経て処理され、自動統合されず、唯一のLogin方法を失う解除は拒否される

### AC-004: 利用者データ削除

- Requirements: FR-025, NFR-PRIV-003
- Given: 登録利用者がProfile、保存した検索・比較またはAccountを削除する
- When: 削除操作が完了する
- Then: 対象は直ちに利用不能となり、通常領域から24時間以内、Backupから30日以内に削除され、公開・却下Reviewも削除されて集計が再計算され、通報者は直接識別不能となり、限定した仮名化不正防止情報だけが90日、匿名化監査metadataが3年保持される

### AC-022: 検索・比較の明示保存と時点比較

- Requirements: FR-011, NFR-SEC-004
- Given: 登録利用者が検索結果または比較結果を表示している
- When: 保存操作を選び、内容を識別する概要を入力して保存を完了する
- Then: 概要、当時の入力条件・計算結果・計算時点・根拠情報の確認時点、および比較時は比較対象が一つの保存項目として後から利用できる
- And: 概要が未入力または空白文字だけの場合は保存されず、修正箇所を確認できる
- And: 概要が文字数上限を超える場合は保存されず、HTMLまたはScriptを含む文字列は実行可能なContentとして解釈されない
- And: 保存中は処理状態が示され、同じ操作を重複実行できない
- And: 保存に失敗した場合は概要と保存対象が保持され、理由を確認して再試行でき、保存済み検索・比較へ追加されない
- And: 保存に成功した場合だけ、一回の保存操作につき一つの保存項目が追加される
- And: 検索または比較を実行しただけの場合、または保存を完了しなかった場合は、保存済み検索・比較へ追加されない
- And: 保存後に元の商品情報が変更されても、当時の情報は上書きされず、最新情報による再計算結果と区別して確認できる

## Search, Calculation, and Comparison

### AC-005: 年間総額と利用先内訳

- Requirements: FR-012
- Given: 年間総額と利用先別金額を入力する
- When: 内訳合計が総額未満、同額、または超過している
- Then: 未満の差額は「その他」として扱い、同額は重複加算せず、超過時は計算せず訂正を求める

### AC-006: 利用先の階層指定

- Requirements: FR-012
- Given: 利用者が利用先条件を指定する
- When: カテゴリのみ、またはカテゴリ内の企業・店舗・サービスを指定する
- Then: カテゴリのみではカテゴリ内最良条件と採用企業名が表示され、個別指定時は指定先の条件が使われ、年間総額と内訳が重複加算されない

### AC-007: 初年度・通常年の算定

- Requirements: FR-005, FR-006, FR-015, FR-016
- Given: 年間利用額と適用可能なカード条件がある
- When: 年間正味還元額を算定する
- Then: 初年度と通常年が分離され、通常還元、利用先別還元、対象Campaign Instanceの確定付与部分、対象Contract/Issuanceに適用される年会費、対象外項目、カテゴリ内最良条件、月次均等配分、取引単位概算の内訳・仮定・根拠を確認できる
- And: Campaignの登録・対象利用・判定・付与期間、上限scope、抽選除外、予定/実終了と、Fee/Reward Ruleの制度世代を確認できる
- And: 複数Campaignまたは通常Rewardが並行する場合は、確認済みの重複・排他・優先条件に従い、同じeffectを二重加算しない
- And: Campaign effectごとの対象者、Application Route、条件構造、BeneficiaryとRewardの対応を確認し、紹介者等の別Beneficiary向けeffectを利用者本人の算定へ加算しない
- And: 家族・追加カードおよびETCの任意Feeは本カードの年間正味還元額へ自動加算せず、詳細情報として区別される

### AC-008: 金銭換算境界

- Requirements: FR-005
- Given: ポイントまたはBenefitに複数の利用・交換方法がある
- When: 年間正味還元額へ換算する
- Then: 公式Sourceで固定円価値を確認できる対象だけが含まれ、マイル、商品、用途限定Coupon、変動価値は含まれない
- And: 交換先によって価値が異なる場合、利用者が交換先を指定しなければ算定から除外され、指定した場合だけ確認済みの当該交換価値が使用される

### AC-009: 不完全・変更確認中の算定

- Requirements: FR-014, FR-023
- Given: 一度も確認できない要素、または過去確認済みだが変更確認中の値がある
- When: 算定と順位表示を行う
- Then: 前者は算定から除外され、後者は影響対象と期間を特定でき、旧claimが引き続き有効である根拠がある場合だけ旧値で算定を継続し、それぞれの状態、確認日、除外・暫定理由、順位変動可能性を確認できる
- And: 影響範囲または旧claimの有効性を特定できない場合は自動継続せず、算定除外または根拠を伴う運営者判断となる

### AC-010: 検索順位とFilter

- Requirements: FR-013
- Given: 複数の候補が検索条件に一致する
- When: 初期結果を表示し、Filterを変更する
- Then: 年間正味還元額の高い順を基本とし、年会費無料、還元率、関連する家族・追加カードIssuance、ETC Payment Instrument、一般申込Routeなし・受付停止中のOffering/Routeを含む条件で絞り込め、後二者は初期状態で除外される
- And: 還元率Filterは現在適用される確認済みの基本Reward Ruleによる通常還元率を使用し、Campaign、利用先別加算、交換先別価値または期間限定倍率を混在させず、対象Rule、期間、上限と基本/実効値を区別する
- And: Rule世代、対象利用、適用期間または付与率が判定不能な候補を、unknownまたはpartially_disclosedなclaimの推定値で還元率Filterへ一致させない
- And: 家族・追加カードまたはETCと対象Product/Offering/Routeの関係・申込可能性が未確認の候補は各Filterに一致せず、その除外件数または未確認理由の表示は要求されない
- And: 一般Routeと招待Routeが併存するOfferingを「招待Routeあり」だけで通常検索から除外せず、InvitationをEligibility、審査承認またはIssuance保証として表示しない

### AC-011: 0件とキーワード検索

- Requirements: FR-004, FR-028
- Given: 条件検索またはキーワード検索を行う
- When: 該当候補がない
- Then: 表記揺れ、一般的略称、軽微な入力誤りに対応した関係のある候補、または0件と緩和可能条件が示され、条件は自動変更されず、再検索できる

### AC-041: テーマ別プリセット検索

- Requirements: FR-040, FR-004, FR-005, FR-013, FR-014
- Given: 運営者が名称、説明、表示順および検索条件を設定して公開したテーマがある
- When: 未登録または登録利用者がテーマを一つ選択する
- Then: 追加の条件入力やAccount登録なしで、年間利用額を含むテーマ条件一式が適用された検索結果へ1回の選択で到達し、選択テーマと適用中の条件を確認・変更して再検索できる
- And: Profile反映値または選択前の手入力値はテーマ条件一式で今回の検索に限って置き換えられ、Profile自体は更新されない
- And: 順位と算定状態は通常の条件検索と同じ要件に従い、テーマ名だけを根拠に「一番」「最適」等の優位性を保証しない
- And: 運営者がテーマを変更または非公開にしても、保存済み履歴の当時条件と当時計算結果は上書きされない

### AC-042: テーマ別プリセットの運営管理

- Requirements: FR-040
- Given: 権限を持つ運営者がテーマ別プリセットを管理する
- When: 名称、説明、表示順、年間利用額を含む適用条件および公開状態を追加または変更する
- Then: 公開中のテーマだけが指定した表示順で利用者向け入口に表示され、選択時に設定した条件一式が適用される
- And: 非公開にしたテーマは新たに選択できず、既存の保存済み履歴には影響しない

### AC-012: 複数カード比較

- Requirements: FR-029
- Given: 利用者が複数カードを選ぶ
- When: 同一の利用条件で比較する
- Then: 最大5枚について、必須比較項目、初年度・通常年、算定状態、確認日をカード間で区別して確認できる

### AC-013: お気に入り

- Requirements: FR-030
- Given: 未登録または登録利用者がお気に入りを操作する
- When: 追加、解除、Account登録を行う
- Then: 最大50枚まで、未登録では最終利用から30日間一時保持され、登録後は継続保持され、一時分は本人の同意時だけ引き継がれ、利用環境側の削除による消失可能性が示される

## Content, Evidence, and Operations

### AC-014: カード詳細とEvidence

- Requirements: FR-017, FR-018, FR-020, FR-035
- Given: カード詳細を閲覧する
- When: 各商品条件と識別情報を確認する
- Then: Product/Offering/Variant、Application Route、関連Issuance/ETC Instrumentを混同せず、必須情報、確認日、適用期間、公式Source、claim単位のDisclosure Statusを確認でき、許諾確認済みAssetだけが名称とともに表示される
- And: Campaignは実施回、確定/抽選、条件、上限、複数期間を、BenefitはProvider/User/Beneficiary/利用条件を、保険はCoverageごとのInsured、Beneficiary、付帯条件、補償事故、Limit、免責・除外、請求要件、期間および確認できるUnderwriterを区別して確認できる

### AC-027: 券面画像の登録と履歴

- Requirements: FR-035
- Given: 公式Sourceに券面画像があり、単一または複数のデザインが存在する
- When: 運営者が画像を登録、差替えまたは無効化する
- Then: AI取得画像は未公開Draftとなり、対象カード、ブランド・Variant等の対応条件、Source、取得日、利用条件、適用期間、代替Text、状態を確認でき、人間が承認した画像だけが公開され、旧画像の履歴が失われず、却下画像本体は30日後に削除される

### AC-028: 利用者Review投稿

- Requirements: FR-036, FR-037, NFR-SEC-004, NFR-EDIT-002
- Given: Login中または未Loginの利用者がカードReviewを投稿しようとする
- When: 星評価とMessageを送信する
- Then: Login中の利用者だけが1〜5の評価とMessageを同一カードへ1件保持でき、自身で編集・削除でき、削除時は即時非公開・通常領域24時間以内・Backup 30日以内に削除され、投稿は公式情報と区別され、不正なContentは実行されない

### AC-029: Reviewの承認と集計

- Requirements: FR-037, NFR-EDIT-002
- Given: 新規または編集されたReviewがある
- When: AI検査と運営者確認を行う
- Then: 人間が明示承認したReviewだけが公開され、却下Reviewは修正・再申請でき、未再申請Draftは30日後に削除され、1件以上では公開分の平均星評価と件数、0件では件数のみが表示され、Review情報は年間正味還元額・検索順位・記事順位へ影響しない

### AC-030: 公開Reviewの通報

- Requirements: FR-038, NFR-EDIT-002
- Given: Login利用者が公開Reviewを確認している
- When: 理由と説明を添えて通報する
- Then: 運営者が3営業日以内の着手を努力目標として通報内容を確認し、掲載継続・一時非公開・削除を判断でき、通報件数だけで自動非公開・虚偽確定されず、通報者情報は公開されない

### AC-031: 主要Flowの失敗・部分成功

- Requirements: FR-039
- Given: Google認証、Profile反映、検索算定、検索・比較の保存、AI抽出、Source取得、記事生成またはReview検査の一部が失敗する
- When: 利用者または運営者が処理状態を確認する
- Then: Loading、Empty、Error、Partial、一般画面状態のUnknownが区別され、利用可能な機能は継続し、失敗対象と理由・再試行状態が示され、未承認情報や推測値が公開されない

### AC-032: Security検査とIncident対応

- Requirements: NFR-SEC-005, NFR-SEC-006, NFR-SEC-007, NFR-SEC-008
- Given: Release、依存変更、Security上重要な操作またはIncident疑いがある
- When: Security GateとIncident手順を確認する
- Then: Secret・依存検査、禁止情報を含まず通常管理機能から変更・削除できない監査記録、欠落・改変検知、封じ込め・証跡保全・復旧・連絡要否判断を追跡できる
- And: AI生成の入力・出力に命令、Script、Event Handler、危険なURL、未承認の外部埋込・外部送信またはSecret要求を含めても、Tool実行、外部通信、権限変更、Secret開示または自動公開が起きず、編集・承認後も公開直前の検証を通過しないContentが公開されない

### AC-040: 管理者Account保護

- Requirements: NFR-SEC-001, NFR-SEC-003
- Given: 管理者がLogin、認証変更、Session管理または高Risk操作を行う
- When: 管理者保護要件を検証する
- Then: 専用・非共有Account、管理者のみ必須の多要素認証、認証要素喪失時の本人確認付き回復、認証変更通知、Session確認・失効、最長12時間・無操作30分のSession期限、CSRF・Session固定化・Credential stuffing・盗難Session対策を確認できる
- And: 公開、承認、Affiliate Link変更、認証方法変更、利用者データ操作その他の高Risk操作は、管理者の多要素認証を含む本人再認証から15分を超えた場合に拒否される

### AC-033: 外部障害・Rollback・環境差

- Requirements: FR-039, NFR-MAINT-002, NFR-OPS-001
- Given: 外部Service障害、誤った公開変更、またはReleaseがある
- When: 継続利用、Rollback、環境差・互換性を確認する
- Then: 利用可能な主要Flowは継続し、未承認情報は公開されず、直前承認状態へ戻せ、削除要求とSecurity修正を失わず、既存データ・必要な公開URLの継続性を確認できる

### AC-034: データ増加時の性能

- Requirements: NFR-PERF-003
- Given: カード2,000件、Rule 20,000件、利用先5,000件、公開Review 100,000件、保存した検索・比較100,000件の初期測定データと、各項目を同時に2倍とした増加時測定データがある
- When: 公開ページと検索・比較を測定する
- Then: 結果の欠落・重複がなく、性能目標または処理中・制約が示される

### AC-035: Privacy・認証・公開入力

- Requirements: NFR-PRIV-001, NFR-PRIV-002, NFR-PRIV-004, NFR-SEC-001, NFR-SEC-002, NFR-SEC-003, NFR-SEC-004
- Given: Profile、保存した検索・比較、Cookie計測、Login、運営操作、公開FormまたはReview投稿を利用する
- When: Privacy・Security要件を検証する
- Then: データ最小化、同意・拒否、保持、本人・権限確認、Session期限、Password再設定、不正入力の無害化を確認できる

### AC-036: Evidence運用・SEO

- Requirements: NFR-EVID-001, NFR-EVID-002, NFR-EVID-004, NFR-SEO-001, NFR-SEO-002
- Given: 日次Source確認、訂正受付、カード詳細または記事公開がある
- When: Evidence・SEO要件を検証する
- Then: 日次実行・失敗・3営業日着手をSource、対象Concept/relationship/claim単位で追跡でき、Index対象・非対象、Metadata、変更確認中・Unknownの検索向け表現が公開内容と一致する

### AC-037: Observability

- Requirements: NFR-OBS-001, NFR-OBS-002
- Given: 主要障害または通知対象が発生する
- When: 運営者が状態を確認する
- Then: 発生時刻、対象、継続、対応状態が記録され、90日保持され、費用上限内で採用した通知または確認手段から認識できる

### AC-038: 公開Policyと免責

- Requirements: NFR-LEGAL-001, NFR-LEGAL-002
- Given: 公開Policy、年間正味還元額の目安、Affiliate導線がある
- When: 公開内容を確認する
- Then: 実際の運用とPolicyが一致し、計算仮定・参考値・非保証・公式確認の必要性が追跡でき、法的判断がAIだけで確定されていない

### AC-039: 対応Device・Browser

- Requirements: NFR-COMPAT-001
- Given: PC・SmartphoneとSupport対象Browserの現行・直前Major versionがある
- When: 主要な検索、比較、Account、記事閲覧、運営承認Flowを実行する
- Then: 必須Flowを完了でき、対象外環境をSupport済みと表示しない

### AC-015: Affiliate導線

- Requirements: FR-019, NFR-EDIT-001
- Given: Affiliate Linkを含む検索結果、詳細または記事を閲覧する
- When: 申込導線と選定理由を確認する
- Then: 広告・PR関係と条件差が示され、報酬の有無・金額は検索順位と記事選定に影響しない

### AC-016: 記事生成・公開・更新

- Requirements: FR-007, FR-008, FR-009, FR-031, NFR-SEC-008
- Given: 公式情報に基づく記事Draftまたは更新対象記事がある
- When: 運営者が確認、編集、承認、再承認する
- Then: 承認前Draftは公開されず、公開中の旧記事は更新確認中と表示され、承認済み版と履歴だけが反映される
- And: 用途・読者像別の複数カード記事と、対象カード、特徴、適用条件、確認時点および公式Sourceを示す単一カード特集記事の両方を作成・公開できる
- And: 比較テーマから、承認済みカード情報だけを使用した比較対象、二軸候補、評価基準、配置、配置理由および配置不能・除外理由が未承認Draftとして生成される
- And: 定性的な軸または導出値を使う場合は、使用項目、評価基準、導出方法および配置への寄与を確認でき、情報不足を推測で補完しない
- And: 入力データRevision、AIのService・Model・Version、生成Template Revisionおよび生成結果を追跡でき、Source・Evidence・比較テーマ内の命令を実行せず、AI出力からTool実行、外部通信、データ更新または自動公開が行われない
- And: 運営者が比較軸・評価基準と各カードの配置・理由を別々に確認・編集・明示承認した後だけ、比較マップ、確認時点、公式Source、限定事項および位置関係に依存しない代替表現を含む記事として公開される
- And: 比較軸、評価基準または配置の編集後は全配置が再検証され、基準と整合しない配置は承認されず、基準から導出できない編集を残す場合は編集者による配置と変更理由が記録・表示される
- And: AI生成Contentは人間による編集・承認後も未信頼Contentとして検証され、Script、Event Handler、危険なURL scheme、未承認の外部埋込・外部送信を含む場合は拒否または無害化され、公開直前の検証を通過しないContentは公開されない
- And: 参照する承認済みカード情報、評価基準または対象範囲の変更時は比較マップが更新確認対象となり、再承認前に自動更新されない

### AC-043: 特集記事の一覧・検索・絞り込み

- Requirements: FR-007, FR-031, FR-041
- Given: 承認済み公開記事、未承認Draft、更新確認中の記事、および複数のタグを持つ公開記事がある
- When: 利用者が記事一覧でフリーワード、タグ、記事種別または並び順を指定する
- Then: タイトル、要約、タグまたは対象カード名に一致し、指定したすべてのタグと記事種別に一致する承認済み公開記事だけが、選択した新着順または更新順で表示される
- And: 未承認Draft、更新Draftおよび自動検知だけの変更は表示されず、更新確認中の記事は公開済み旧記事、最終確認日および公式Source確認の案内とともに識別できる
- And: 件数、適用中の検索語・条件、全解除操作を確認でき、0件時は条件を自動変更せず、解除または変更して再検索できる
- And: 各記事から記事詳細へ、記事詳細から関連するカード詳細または条件付き検索結果へ到達できる

### AC-017: Source変更とカード情報承認

- Requirements: FR-021, FR-022, FR-023, FR-033, FR-034
- Given: 公式Sourceの変更、URL変更、取得不能または新Campaign候補が検知される
- When: 更新案を確認する
- Then: 変更候補と不明差分が区別され、3営業日以内に確認へ着手し、別の明示的な承認操作後だけ新情報へ更新され、日次確認の失敗は再試行されて3日連続失敗時に警告される
- And: 影響範囲はProduct全体へ固定せず、Product/Offering/Variant/Application Route/Feature/Rule version/Campaign Instanceまたはeffect/Benefit/Insurance Product/Coverage/Issuance/Instrumentと期間を区別し、範囲不明または旧claimの有効性不明なら旧値を自動継続しない
- And: 承認者はclaim分割、Source tier、根拠箇所、各時点、Disclosure Status、confidence、競合・訂正・supersedes関係を確認し、必要な訂正後にclaimごとに承認または却下する

### AC-025: AI支援の初回収集・項目差分

- Requirements: FR-033, FR-034
- Given: 未登録の公式Source、または前回承認値を持つ公式Sourceがある
- When: AI支援の収集・再収集を行う
- Then: Domain Concept/relationship/Rule version/対象期間ごとのclaim候補、Source tier、取得・公開・発表・発効等の時点、根拠箇所、適用期間、抽出confidence、Disclosure Status候補、および前回claimとの差分・競合・supersedes状態が未承認Draftとして提示される
- And: Offering/Variant/Route、Campaign Instance/effect、Benefit/Coverage、Issuance/Instrumentの差をProduct共通値へ自動昇格しない
- And: 運営者の明示承認前は公開、計算、順位、記事生成の確定入力に使用されない
- And: Source本文に命令、Tool実行、外部通信、権限変更またはSecret要求を模した文字列があっても、それを命令として実行せず、許可された収集・構造化以外の操作を行わない

### AC-026: 新規カード探索と差分承認単位

- Requirements: FR-021, FR-033, FR-034
- Given: 定期探索または既存Sourceの再収集を行う
- When: 新規カード候補、HTML差分、または項目差分が検知される
- Then: 新規カード候補は公式Sourceと既存商品との重複候補を伴うDraftになり、HTML差分のみで管理項目が同一の場合は一括確認できる
- And: 追加・変更・削除候補・抽出不能の項目は個別確認が必要で、Sourceと項目の双方に差分がなければ確認成功記録だけが残る
- And: 商品同一性を判別できない新規候補は人間判断待ちとなり、自動登録も既存商品への自動統合も行われない
- And: 同名ProductのOffering/Variant/Route差、Rule世代、Campaign実施回、Coverageまたは関連Instrument差を共通値の変更として自動承認しない

### AC-018: 業務情報管理

- Requirements: FR-032, NFR-MAINT-001
- Given: 権限を持つ運営者が業務情報を変更する
- When: 追加、訂正、無効化、承認を行う
- Then: Application codeを変更せず反映でき、Domain上の対象・関係・Rule versionを区別して、Source、適用時期、変更者、承認者、変更前後を追跡できる

### AC-019: Coverage

- Requirements: FR-027
- Given: Coverage情報を確認する
- When: 掲載範囲が拡大または変更される
- Then: 掲載会社数、Product/Offeringとして数えるカード数、現在有効な一般申込Routeを確認できた候補数、未対応範囲、集計単位および最終確認日が更新され、全件網羅を断定しない

### AC-023: Evidence保持と訂正受付

- Requirements: FR-024, FR-026, NFR-EVID-003
- Given: 採用情報が使用終了する、または訂正連絡を受け付ける
- When: 保持期限または訂正処理を確認する
- Then: 採用・不採用claimのSource tier、根拠箇所、各時点、適用期間、Disclosure Status、confidence、競合・訂正・supersedes、Observation→Extracted Fact→Domain Factおよび承認履歴を使用終了後3年間追跡でき、例外がなければ期限後に削除される
- And: Login不要の指摘は状態・判断理由を記録して処理され、訂正は公式Source確認と明示承認後だけ反映される

## Quality Goals

### AC-020: 最短到達

- Requirements: `00-scope.md` Success Conditions
- Given: 初期対象利用者による利用Testを実施する
- When: 検索開始から比較可能な候補を探す
- Then: 参加者の80%以上が3分以内に候補を3件以上見つけられる

### AC-021: Accessibility・Performance・Availability・Cost

- Requirements: NFR-A11Y-001, NFR-PERF-001, NFR-PERF-002, NFR-AVAIL-001, NFR-COST-001, NFR-COST-002
- Given: 合意した検証条件と月次実績がある
- When: 品質Gateを確認する
- Then: Accessibility検査、2.5秒・2秒の性能目標、月間99.0%、費用内訳と4,000円警告、AI生成費の分離を検証できる

### AC-024: BackupとRecovery

- Requirements: NFR-AVAIL-002
- Given: 日次Backupと、Backup取得後に受け付けた削除要求がある
- When: 年次復旧確認または重大障害からの復旧を行う
- Then: 障害発生前24時間以内の状態へ復旧でき、重大障害を検知した時点から24時間以内に主要機能を戻せ、削除要求が再適用され、30日を超えるBackupが残らない

## UI Mock Handoff

AC-009の算定状態、AC-010のFilter、AC-012の比較、AC-014のEvidence、AC-015の広告表示、AC-016の記事種別・更新確認中表示、AC-043の記事一覧・検索・絞り込みは、機能Testに加えてUI Mock工程で理解可能性と誤認防止を検証する。
