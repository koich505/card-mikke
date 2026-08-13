# UI Requirements

Status: Card detail v0.2 and Profile v0.3 implemented; human approvals tracked separately
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-13 Approved、FR-041 / AC-043を含む）
Last updated: 2026-08-13

## Purpose and boundary

本書は承認済みRequirementsをUIで検証可能な表示・Interactionへ具体化する。UIRは新しいDomain Fact、本番Data Contract、Architectureまたは実装Taskを定義しない。UIRが承認済みRequirementsの変更を必要とする場合はRequirements工程へ戻す。

## Global UI requirements

### UIR-BRAND-001: 名称と視覚的性格

- サイト名称およびUI Mock上の名称は`カードみっけ`とする。
- 固い金融メディアではなく親しみやすさを保ちつつ、入力・比較を落ち着いて進められる視覚密度とする。
- 現行`/search`の青系Token、Whiteの情報面、明瞭な枠線、選択Card、余白、TypographyをUI v0.3の視覚基準とする。
- 特定店舗、Brand、Logo、Font、売場意匠を複製しない。
- 派手さを根拠のないRanking、確定額、公式推奨の表現へ使用しない。

### UIR-BRAND-002: Visual system

- BaseはWhite、淡いGray、Blue Grayとする。
- Primaryに濃淡Blue、ErrorにDark Red、変更確認中にMuted Orangeを使用する。
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

## Article list

### UIR-ARTICLE-LIST-001: Article discovery and conditions

- `特集記事`Navigationとホームの`すべての記事を見る`から記事一覧へ到達できる。
- フリーワードはタイトル、要約、タグ、対象カード名を対象とし、記事本文全体を検索対象であるかのように表示しない。
- 記事種別は用途・読者像別、二軸比較、単一カード特集を選択できる。
- タグは複数選択でき、選択したすべてを含む記事に絞り込むことを説明する。
- 新着順は公開日、更新順は公開版の更新日を基準に表示し、最終確認日と混同しない。
- 件数、適用中条件、全解除を確認できる。0件時に条件を自動で緩和せず、条件変更または全解除を選べる。
- Traceability: FR-041, AC-043

### UIR-ARTICLE-LIST-002: Card, update status and accessibility

- 記事Cardは記事種別、対象読者、要約、タグと記事詳細へのLinkを示す。通常記事の一覧では公開日、更新日および最終確認日を表示しない。
- 更新確認中は、公開済み旧記事であること、最終確認日および申込前の公式情報確認を一覧と詳細で明示する。新着・確定更新と同じ表現にしない。
- 記事一覧の検索語、Filter変更、結果件数、0件は支援技術へ通知する。タグ、記事種別、並び順、全解除はKeyboardだけで操作できる。
- DesktopではCard Grid、Mobileでは1列で表示し、Filter操作や重要な状態を横ScrollやHoverへ依存させない。
- Traceability: FR-031, FR-041, NFR-A11Y-001, AC-043

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

### UIR-RESULT-004: Explicit search save

- 検索結果に`検索条件を保存`を置き、検索実行だけでは保存しない。
- 保存Dialogで利用者入力の概要、年間利用額、検索条件、現在の結果件数を確認できる。
- 概要は必須とし、未入力、空白のみ、文字数上限超過では保存せず、理由と修正対象を示す。
- RQ-042検証用としてUIモックでは50文字以内・同名可を暫定採用し、本番要件へ無条件に昇格させない。
- 保存中は重複実行を防ぎ、成功時は一件だけ保存したことを通知する。失敗時は概要と保存対象を保持して再試行できる。
- Dialog表示時は概要入力へFocusを移し、取消・成功後は起点ButtonへFocusを戻す。Errorと成功は支援技術へ通知する。
- 概要は安全なTextとして表示し、HTMLまたはScriptとして解釈しない。
- UIモックの保存はBrowser Memory内だけで完結し、再読み込みで初期状態へ戻る。外部送信、本番認証、API、DBは使用しない。
- Traceability: FR-011, FR-039, NFR-PRIV-001, NFR-SEC-004, AC-022, AC-031, RQ-042

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

## Correction report

### UIR-REPORT-001: Input and receipt

- Login不要、メール任意とする。
- 対象、指摘内容、把握している根拠を必須にする。
- Secret、Credential、不要な個人情報を書かないよう案内する。
- 送信後は合成受付番号を表示する。
- メール未入力時は個別回答・追加確認ができないことを示す。
- 修正または回答を保証せず、内部の確認着手目標は画面表示しない。
- Traceability: FR-026, NFR-SEC-004, AC-023

## Account and Profile

### UIR-PROFILE-001: Page structure and purpose

- Login済みの合成利用者を前提に、Profileを1Page内の`利用額・よく使う場所`、`あなたについて`、`ポイントの希望`へ分ける。
- Account Navigationは全Viewportで上部横並びTabとし、選択中のTabに対応するPanelだけを下へ表示する。Tab間で未保存入力と各Panelの操作状態を保持する。
- 保存項目の利用目的、UI-onlyであること、再読込時に合成初期値へ戻ることを常時確認できる。
- Traceability: FR-001, FR-002, AC-002

### UIR-PROFILE-002: Usage condition validation

- 年間利用額は未設定または1〜100,000,000円の整数とし、Requirementsの11カテゴリについて0以上の利用先別年額を入力できる。
- 利用先別合計が年間利用額を超える場合、または内訳があるのに年間利用額が未設定の場合は、理由と修正対象を示して保存しない。
- 各カテゴリで2件の架空Serviceを複数選択でき、実在Service、PII、Credentialを使用しない。
- Traceability: FR-002, FR-003, AC-002, AC-005

### UIR-PROFILE-003: Minimal attributes and preferences

- 年齢帯と入会予定時期は単一選択、Serviceとポイント・交換先は複数選択とする。
- `特に希望なし`は他のポイント希望を解除する排他的選択とする。
- 年齢帯に`回答しない`を用意し、年収、職業、雇用形態を保存項目へ追加しない。
- Traceability: FR-002

### UIR-PROFILE-004: Section save and recovery

- 3章を独立保存し、`保存済み`、`変更あり`、`保存中`、`保存失敗`をTextと形状で示す。
- 保存失敗時は入力を保持して再試行でき、UI Mock専用の`次の保存を失敗させる`操作で状態を再現できる。
- 未保存変更がある内部遷移では破棄確認Dialogを表示し、取消時は起点LinkへFocusを戻す。
- 保存はBrowser Memory内だけで完結し、外部送信・永続化しない。
- Traceability: FR-002, FR-003, NFR-PRIV-001, NFR-SEC-004, AC-002

### UIR-HISTORY-001: Historical record and latest recalculation

- 履歴を新しい順に表示し、検索日時、入力条件、当時の合成計算結果、計算時点、根拠確認時点、結果件数、比較対象を確認できる。
- `検索のみ`と`比較あり`をText、形状、Iconで区別し、条件詳細はKeyboard操作可能な開閉Panelとする。
- 現在情報による再検索・比較再表示ではSearch画面に履歴起点の通知を表示し、当時の合成記録を上書きまたは最新結果として表示しない。
- Traceability: FR-011, AC-022

### UIR-HISTORY-002: History deletion and recovery

- 履歴単体削除は確認Dialogを経て対象だけを削除し、取消時は起点へFocusを戻す。
- 削除中、成功、失敗、再試行、全件削除後のEmpty状態をTextと形状で示す。
- 検索・比較履歴はAccountが有効な間、利用者が削除するまで保持する要件を表示する。
- Traceability: FR-011, FR-025, NFR-PRIV-004, AC-004

### UIR-DATA-001: Data inventory and deletion scope

- データ管理には検索・比較履歴の一括削除とAccount削除だけを表示し、履歴件数と削除対象を確認できる。
- 履歴一括削除はProfileとAccountへ影響させず、履歴PanelのEmpty状態へ即時反映する。
- 削除操作の完了直後から利用不能、通常領域24時間以内、Backup 30日以内という期限を示す。
- Traceability: FR-025, NFR-PRIV-003, NFR-PRIV-004, AC-004

### UIR-DATA-002: Account deletion and retention exceptions

- Account削除は影響範囲確認、確認文字列`削除する`、最終確認Dialogの三段階とする。
- 仮名化不正防止情報90日、個人との直接紐付けを外したModeration・通報処理Metadata 3年という保持対象・理由・期間を示す。
- 削除中、失敗、再試行、完了を支援技術へ通知し、完了後はReview用の合成初期状態復帰だけを提供する。
- Traceability: FR-025, NFR-PRIV-003, AC-004

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
- 運営画面のIAと主要Flow
- RQ-011の理解可能性は、算定不完全カードを順位から除外せず、未確認項目、理由、過小評価可能性を試算Panelで理解できるかをUI Mock Approval時に観測する。
- RQ-017の変更確認中表示は、Heroの全体Iconに加え、影響する個別Rule/effectのIconへ限定して示し、影響外のClaimへ伝播させない。
