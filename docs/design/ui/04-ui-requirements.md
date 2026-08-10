# UI Requirements

Status: Draft under UI dialogue  
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-10 Approved）
Last updated: 2026-08-10

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
- 運営画面のIAと主要Flow
- RQ-011の理解可能性を判定する具体的なUser Test観測項目
- RQ-017の変更確認中表示範囲
