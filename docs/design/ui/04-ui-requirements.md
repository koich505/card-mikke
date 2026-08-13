# UI Requirements

Status: Card detail v0.2 and Operations v0.3 implemented; human UI approvals pending
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）
Last updated: 2026-08-12

## Purpose and boundary

本書は承認済みRequirementsをUIで検証可能な表示・Interactionへ具体化する。UIRは新しいDomain Fact、本番Data Contract、Architectureまたは実装Taskを定義しない。UIRが承認済みRequirementsの変更を必要とする場合はRequirements工程へ戻す。

## Global UI requirements

### UIR-BRAND-001: 名称と視覚的性格

- サイト名称およびUI Mock上の名称は`カードみっけ`とする。
- 固い金融メディアではなく、親しみやすく、情報探索のテンションが上がる活気を表現する。
- 情報密度を高め、太い見出し、強いサイズ差、明快な枠線、Sticker、吹き出し、帯見出し等で`整理されたごちゃごちゃ感`を作る。
- 特定店舗、Brand、Logo、Font、売場意匠を複製しない。
- 派手さを根拠のないRanking、確定額、公式推奨の表現へ使用しない。

### UIR-BRAND-002: Visual system

- Baseは明るいCreamまたは淡いYellowとする。
- Primaryに濃いNavy、AccentにRed、Blue Green、Orangeを使用する。
- 金額と主要Actionは大きく示すが、単位、対象年、算定状態を近接して表示する。
- Cardは明快な枠線を基本とし、角丸、Shadow、傾き等は一貫したToken範囲で変化を付ける。
- 外部Fontを取得せず、日本語System Fontを使用する。
- 賑やかさは主に静的なLayoutとTypographyで表現し、Animationは控えめにする。
- Color、Typography、Spacing、Radius、Border、Shadow、LayerをToken化する。

### UIR-BRAND-003: Trust-safe zones

- 算定不完全、変更確認中、Disclosure Status、Errorは装飾Badgeと意味を混同しない専用表現を持つ。
- 確認日、公式Source、広告・Affiliate、算定仮定、修正Actionを高密度な装飾の中へ埋没させない。
- Colorだけで状態を伝えず、Iconまたは形状と明示的なTextを併用する。
- Focus表示、Contrast、文字拡大時の情報順序を装飾より優先する。

### UIR-G-001: 未登録の主要Flow

- 未登録利用者がAccount作成なしで条件入力、検索結果、比較、カード詳細へ進める。
- 保存または履歴利用を開始する時点でAccountの価値を説明する。
- Traceability: FR-001, FR-010, AC-001

### UIR-G-002: Navigation

- DesktopとMobileで`カードを探す`、`比較`、`記事`、`お気に入り`、`掲載範囲・サイト方針`、`Account`へ到達できる。
- Headerからキーワード検索へ到達できる。
- 比較候補がある場合は枚数をTextと数字で示す。
- Traceability: FR-004, FR-028–FR-030

### UIR-G-003: 情報状態の分離

- Default、Loading、Empty、Error、Partial、一般画面状態のUnknownを区別する。
- 算定完全、算定不完全、変更確認中を区別する。
- Domain上の`unknown`、`undisclosed`、`partially_disclosed`、`disclosed`を一般画面状態と区別する。
- 状態はColorだけで伝えない。
- Traceability: FR-014, FR-023, FR-039, AC-009

### UIR-G-004: UI-only安全境界

- Fixtureは合成データだけを使用し、専用Directoryへ隔離する。
- Formは外部送信・永続化せず、Memory内の合成結果だけを表示する。
- Analytics、外部通信、外部Content埋込を行わない。
- PII、Credential、SecretをFixtureへ含めない。
- 暫定View ModelをDomain Entity、DB Model、API Contractとして扱わない。
- Traceability: NFR-SEC-004–NFR-SEC-006, UI-only policy

## Home

### UIR-HOME-001: 探索入口

- ホームの最上位でサイトの価値と`条件からカードを探す`Actionを提示する。
- 条件検索とは別に、注目のカード、おすすめ特集記事、新着情報から探索できる。
- Traceability: FR-004, FR-007–FR-010, FR-031, AC-020

### UIR-HOME-002: 注目のカード

- 3〜6件の合成カードを編集枠として表示する。
- 個人条件に基づく順位または`最もお得`という意味にしない。
- 選定理由または基準、確認日、算定状態を確認可能にする。
- 広告・Affiliate関係、算定不完全、変更確認中を隠さない。
- Traceability: FR-014, FR-019, FR-023, AC-009, AC-015

### UIR-HOME-003: 特集記事と新着情報

- 用途別記事と単一カード特集を識別できる。
- 記事種別、対象読者、公開日または更新日を示す。
- 新着情報は種別と日付を示し、承認済みの公開内容だけを通常の新着として扱う。
- 更新確認中の記事は旧記事継続掲載であることを識別可能にする。
- Traceability: FR-007–FR-009, FR-023, FR-031, AC-016

### UIR-HOME-004: テーマからワンクリックで探す

- ホームに、旅行好き、ショッピング好き、シンプルでお得重視等の公開中テーマを、名称と短い説明付きで選択できる探索入口を置く。
- テーマを1回選択すると、追加入力やAccount登録を挟まず、対応する条件を適用した検索結果へ遷移する。
- 遷移後は選択テーマと適用中の条件を確認でき、個別に条件を変更して再検索できる。
- 既存の`条件からカードを探す`ActionおよびProfile条件を利用する探索を同時に提供し、テーマ検索で置き換えない。
- テーマ名の`お得`等を、すべての利用者に対する最適性または順位保証として表現しない。
- Traceability: FR-004, FR-005, FR-013, FR-014, FR-040, AC-041

## Search conditions

### UIR-COND-001: 段階入力

- 同一Page内で`年間利用額`、`利用先`、`確認`の順に進む。
- 前後移動で入力値を失わない。
- 年額入力を基本とし、月額換算機能を追加しない。
- Traceability: FR-004, FR-010, FR-012, AC-001, AC-005, AC-006

### UIR-COND-002: 利用先内訳

- Requirements記載の11カテゴリをすべて選択可能にする。
- 選択カテゴリだけ金額と企業Service入力を展開する。
- 内訳合計と残りの`その他の利用`を常時表示する。
- 内訳超過時は検索せず、超過額と修正対象を示す。
- カテゴリだけの指定では、確認済み最良条件を使用する目安と採用企業Serviceを示す。
- Traceability: FR-012, AC-005, AC-006

### UIR-COND-003: Profile値

- 保存済みProfile値と今回だけの変更を識別可能にする。
- 明示保存しない限りProfile更新と誤認させない。
- Profile反映失敗時も手入力で継続できる。
- Traceability: FR-002, FR-003, FR-039, AC-002

## Search results

### UIR-RESULT-001: Result card hierarchy

- 通常年の年間正味還元額を主表示、初年度を副表示にする。
- 算定状態、確認日、主要な仮定をCardから識別可能にする。
- 算定不完全な候補を除外せず、含めなかった要素と順位変動可能性を示す。
- Traceability: FR-005, FR-006, FR-013, FR-014, FR-023, AC-007, AC-009, AC-010

### UIR-RESULT-002: Filter

- Desktopは左側Filter、右側Resultとする。
- Mobileは全画面Filter Dialogを使用する。
- 適用中FilterをResult上部で個別解除可能にする。
- Filterは年会費無料、還元率、家族・追加カード発行可、ETCカード発行可、招待制を含める、新規受付停止を含めるに限定する。
- 0件でも条件を自動で緩和しない。
- Traceability: FR-004, FR-013, AC-010, AC-011

### UIR-RESULT-003: 比較候補

- 各Result Card内で比較候補を追加・解除できる。
- 1枚以上選択すると画面下部に選択枚数と`比較する`Actionを示す。
- 最大5枚とし、上限時は追加できない理由と解除方法を示す。
- Traceability: FR-029, AC-012

## Comparison

### UIR-COMP-001: Desktop comparison

- カードを列、比較項目を行とする。
- カード名と年間正味還元額を上部、項目名を左側に追従表示する。
- 3〜5枚では横Scrollを許容し、Keyboardでも全内容へ到達可能にする。
- Traceability: FR-029, AC-012

### UIR-COMP-002: Mobile comparison

- 比較項目ごとにカードを縦に並べ、横Scrollを主要操作にしない。
- `違いがある項目のみ表示`を提供する。
- 比較カードを削除・入替できる。
- Traceability: FR-029, AC-012

### UIR-COMP-003: Comparison content

- 年会費、基本還元率、年間正味還元額、ポイント、利用先別還元、Campaign、申込条件、国際ブランド、家族・追加カード、ETCカード、確認日、算定状態を比較する。
- 初年度と通常年、算定完全・不完全・変更確認中を混同しない。
- 算定内訳とEvidenceはPage内で開閉し、重要な状態、確認日、注意事項を閉じた領域へ隠さない。
- Traceability: FR-016, FR-029, AC-012

## Card detail and trust

### UIR-DETAIL-001: Product and evidence

- Requirementsで定めた商品条件、確認日、適用期間、公式Source、Disclosure Statusを確認できる。
- 実在Assetを使用せず、CSSによる抽象券面と名称Textを表示する。
- Iconや画像だけに情報を依存しない。
- Traceability: FR-017, FR-018, FR-020, FR-035, AC-014

### UIR-DETAIL-002: Calculation explanation

- 通常還元、利用先別追加還元、Campaign、年会費、計算対象外を区別する。
- カテゴリ内最良条件、月次均等配分、取引単位概算等の仮定を示す。
- 確定額や公式な推奨と誤認させない。
- Traceability: FR-005, FR-006, FR-014–FR-016, AC-007–AC-009

### UIR-DETAIL-003: Advertising and outbound action

- 広告・Affiliate関係を申込Action前に確認可能にする。
- 申込前に公式Sourceで最新情報を確認する必要性を示す。
- UI MockのActionは外部へ遷移しない。
- Traceability: FR-019, AC-015, AC-038

### UIR-DETAIL-004: Card face gallery

- 1 Cardに複数のCSS合成券面を表示でき、前後Button、Thumbnail、現在位置を提供する。自動再生しない。
- 券面ごとに名称、素材、国際Brand、Grade、選択可否、追加料金、変更・再発行条件、適用期間、代替Textを確認できる。
- 金属製等の特殊素材を年会費・発行手数料と混同せず明示する。
- 券面変更で商品・契約そのものが切り替わったように表現しない。

### UIR-DETAIL-005: Rewards, Campaigns, and annual benefits

- 基本Point Program、選択Course、交換先、還元Ruleを分離し、付与単位、端数、付与時期、有効期限、対象外、上限、重複を確認できる。
- 入会特典と期間限定Campaignは、実施回、対象Route、確定／抽選、条件、各期間、対象外、上限、付与時期を確認できる。
- 恒常的な年間利用額達成RuleはCampaignと分けて表示する。

### UIR-DETAIL-006: Fees, benefits, and insurance

- 本会員年会費、初年度／通常年、条件付き無料、海外事務・再発行手数料、家族Card、ETC Cardを別項目で表示する。
- BenefitはProvider、対象者、保有／登録／予約／利用条件、上限、同伴者、除外、期間を表示する。
- Insurance ProductごとにCoverageを並べ、対象者、付帯条件、補償事故、限度額、免責、除外、請求要件、期間、引受主体を確認できる。

### UIR-DETAIL-007: Application, review, and evidence

- 公開Eligibility、一般申込／招待／切替、受付状態、発行目安、締め日・支払日、Touch決済、Mobile Wallet、利用通知、Card Lock、本人認証を表示する。
- 審査難易度・通過予測は表示せず、審査の有無と非公開であることだけを扱う。
- Reviewは平均、件数、分布、本文、投稿日、掲載方針を示し、`ログインユーザーの投稿`と表現する。
- 利用者向けには公式確認済み相当、一部未確認、非公開、確認できず、確認日、適用期間、Source相当情報を表示し、内部IDを出さない。

### UIR-DETAIL-008: Search scenario continuity

- 検索結果と詳細で年間利用額、Profile、カテゴリ別利用額を共有し、同じ合成計算結果を表示する。
- 関連Cardと検索への戻りでも有効な条件を維持する。
- Queryは既知Categoryと安全な数値範囲へ限定し、無効値を無視する。
- 直接アクセスまたは有効条件がない場合は、合成Fixtureの`標準試算例`であることを明示する。
- Canonical URLは検索Queryを含めない。

### UIR-DETAIL-009: Detail tab panel and freshness icon

- Hero下の詳細情報は単一の表示領域とし、選択したTabに対応するPanelだけを表示する。
- TabはPointerとKeyboardで操作でき、選択状態、TabとPanelの対応、左右Key、Home／End Keyを支援技術へ伝える。
- Disclosure Statusと情報鮮度は画面上ではIconで簡潔に示し、状態名はTooltipと読み上げ名で補完する。

### UIR-DETAIL-010: Hero campaign carousel

- Heroで複数のCampaignを横スライド方式により1件ずつ表示する。
- 複数件では前後Button、現在位置、Indicator、左右Swipeを提供し、1件だけの場合は切替操作を表示しない。
- 自動再生せず、Campaign Tabの全件一覧は詳細な条件比較用として維持する。

### UIR-DETAIL-011: Inline custom calculation

- 詳細のおトク試算は、検索・プロフィール相当条件を引き継ぎ、有効条件がない場合は合成Fixtureの標準条件を初期値にする。
- 利用者は年間／月間を切り替え、総利用額と使い道別利用額を入力して同じ合成計算Utilityで再試算できる。
- 月間入力は年額へ換算し、使い道合計が総利用額を超える場合は適用を停止して修正理由を表示する。
- 詳細内のカスタム条件はBrowser Memory内だけで扱い、プロフィール更新、保存、外部送信を行わない。

## Operations

### UIR-OPS-001: 管理者認証とSession

- 一般利用者と分離した管理者Account、Password一次認証、6桁MFAを表現する。
- MFA回復では、別経路の本人確認、認証要素変更、監査記録、管理者通知が必要であることを示す。
- 管理者Sessionの最長12時間、無操作30分、Password変更後の失効を確認できる。
- Session一覧から個別・一括失効でき、高Risk操作前にPasswordとMFAを再確認する。
- 最長12時間、無操作30分、再認証15分超過を待機なしScenarioで確認でき、期限切れからLogin・MFAを省略して復帰できない。
- UI Mockは合成入力だけを使用し、本人確認、Credential保存、外部通信を行わない。
- Traceability: NFR-SEC-001, NFR-SEC-003, AC-040

### UIR-OPS-002: 運営Dashboard

- 未承認Draft、変更確認中、抽出失敗、訂正、Review待ち、期限警告、日次確認状態を件数だけでなく期限・優先度・失敗理由とともに表示する。
- Source差分だけをv0.3で操作可能とし、後続業務を空Routeへ遷移させない。
- Default、Loading、Empty、Error/Retry、Session expiredを確認できる。
- AI生成費と非AI運用費を分離して表示する。
- Traceability: FR-021, FR-026, FR-033, FR-039, NFR-EVID-001, NFR-OBS-001, NFR-COST-001, NFR-COST-002

### UIR-OPS-003: Sourceとclaim差分

- 変更対象のカード商品、差分件数・概要、差分を検知した公式SourceのHTML取得情報を1つの情報カードにまとめて表示する。
- 公式Sourceの長いHTML差分は初期状態で閉じ、ユーザー操作で展開する。展開時は変更前・変更後を折り返して表示し、削除側と追加側を視覚的に区別する。
- Source本文、識別子、取得・公開時点を未信頼Textとして表示し、命令、Script、危険URLを実行・遷移可能にしない。
- 取得時点は運営側のObservation記録として表示し、Sourceが明示した日時claimに付与するDisclosure Statusとは分離する。
- claimごとに`追加・変更・削除候補・変更なし・抽出不能`を分離する。
- 変更では現在値と変更後の提案値、追加では新しい提案値、削除候補では削除する現在値を表示する。判断根拠のメタデータは常時表示しない。
- 各提案カード内で提案値を直接編集でき、編集後の値を採用または却下できる。
- Campaignの付与額、対象条件、上限、付与時期、Beneficiary等、開示状態が異なる複合claimは独立して判断可能な粒度へ分ける。Product/Feature lifecycleとCampaign・Rule・Coverage等の期間を単一の適用期間へまとめない。
- `unknown`、`undisclosed`、`partially_disclosed`、`disclosed`を一般画面状態と区別する。
- 影響範囲不明またはRevision競合では承認画面へ進めない。
- Traceability: FR-021, FR-022, FR-024, FR-033, FR-034, NFR-SEC-008, AC-017, AC-025, AC-026

### UIR-OPS-004: 編集・承認・監査

- 追加・変更・削除候補は提案単位のButtonで「採用（情報を更新する）」または「却下（情報はそのまま）」を確定する。処理成功後は未処理一覧から除外し、処理済み一覧で確認できる。失敗時は一覧に残す。
- 採用・却下Buttonの押下後は、対象項目・現在値・更新後の値・処理内容を示す最終確認Dialogを表示する。PasswordやMFAの再認証は要求しない。
- 抽出不能またはclaim単位の影響範囲不明が1件でも残る更新案は判断確定をBlockし、Draft保存後に再収集・再確認へ戻す。
- 全管理項目が変更なしの場合だけ一括確認を許可する。
- 提案値の編集だけでは情報を変更せず、「採用」または「却下」の操作でその提案だけを確定する。
- 操作主体、編集時刻、判断確定時刻、提案ごとの現在値・編集後の提案値・採用／却下を合成監査Timelineで別々に表示する。
- 判断確定後は完了状態としてキューから除外し、同じRevisionを未承認表示または再確定できない。
- UI Mockの承認は外部送信、公開、計算更新、永続化を行わない。
- Traceability: FR-022, FR-032, NFR-SEC-003, NFR-SEC-007, NFR-OPS-001, AC-017, AC-018, AC-040

### UIR-OPS-005: Operations responsive and index boundary

- Desktopは固定Sidebar、Mobileは開閉式の非モーダルSide Navigationを使用する。Menu Button、閉じるButton、Escape、領域外Clickで閉じられ、同一画面では起動元へFocusを戻す。
- Mobileではclaimを縦Cardとし、重要状態、Source、判断、承認Actionを横Scroll内へ隠さない。
- 全管理Routeへ一意なTitleと`noindex, nofollow`を設定する。
- KeyboardだけでLogin、MFA、Navigation、Draft保存、再認証、承認、Session失効を完了できる。
- Traceability: NFR-A11Y-001, NFR-SEO-001, NFR-COMPAT-001, AC-039

## Correction report

### UIR-REPORT-001: Input and receipt

- Login不要、メール任意とする。
- 対象、指摘内容、把握している根拠を必須にする。
- Secret、Credential、不要な個人情報を書かないよう案内する。
- 送信後は合成受付番号を表示する。
- メール未入力時は個別回答・追加確認ができないことを示す。
- 修正または回答を保証せず、内部の確認着手目標は画面表示しない。
- Traceability: FR-026, NFR-SEC-004, AC-023

## Responsive and accessibility

### UIR-A11Y-001: Required behavior

- WCAG 2.2 Level AAを目標とする。
- 主要FlowをKeyboardだけで完了できる。
- Semantic HTML、説明的なPage Title、主要見出し、Landmark、Control Nameを用意する。
- Focus順序とFocus表示を維持し、DialogのFocusを適切に閉じ込めて復帰する。
- Error summaryと各Field Errorを関連付け、修正対象へFocus移動できる。
- Result件数、Filter適用、比較候補追加、Loading完了等の動的更新を支援技術へ通知する。
- Contrast、200%文字拡大、Reduced motionを確認する。
- Traceability: NFR-A11Y-001, AC-021

### UIR-RESP-001: Desktop and Mobile

- 全Primary mock画面をDesktopとMobileで検証する。
- Zoom、Software Keyboard、Viewport高さの変化で重要情報とFocusを隠さない。
- Pointer、Hover、Swipeだけに依存するActionを作らない。
- Comparison、Filter、Navigationを狭い画面でも完了可能にする。
- Traceability: NFR-COMPAT-001, AC-039

## Open UI requirements

- 記事一覧の分類・Filterと、用途別記事／単一カード特集の視覚的区別
- Account・Profile・履歴Flowの詳細
- 運営画面の後続領域（記事、Review、訂正、業務情報）の詳細Flow
- RQ-011の理解可能性は、算定不完全カードを順位から除外せず、未確認項目、理由、過小評価可能性を試算Panelで理解できるかをUI Mock Approval時に観測する。
- RQ-017の変更確認中表示は、Heroの全体Iconに加え、影響する個別Rule/effectのIconへ限定して示し、影響外のClaimへ伝播させない。
