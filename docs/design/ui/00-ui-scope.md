# UI Scope

Status: Draft for UI dialogue  
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-10 Approved）  
Last updated: 2026-08-10

## Purpose

承認済みRequirementsを、主要利用者が実際に操作して理解可能性と誤認リスクを検証できるHigh-fidelity UI Mockへ変換する。本成果物はUI-only modeの設計検証であり、本番機能、本番Data Contract、Gate 3 / Gate 4の実装ではない。

## Primary users and goals

- U-001: 初めてカードを作る個人が、自身の条件に合う候補へ到達する。
- U-002: 利用状況に基づく年間正味還元額と条件を比較する。
- U-003: 用途別記事から候補と選定理由を理解する。
- U-004: 単一カード特集記事から特徴、変更点、条件、根拠を理解する。

## UI validation scope

- 注目のカード、特集記事、新着情報から候補を発見できるホーム
- Profile値の自動反映と、保存されない一時変更の識別
- 年間利用額、利用先カテゴリ、企業・Service別金額の入力
- 年間正味還元額、初年度・通常年、内訳、仮定の表示
- 完全、算定不完全、変更確認中の区別
- 検索、必須Filter、0件、最大5枚の比較
- カード詳細、Evidence、確認日、適用期間、Disclosure Status
- お気に入りの一時保存・Account保存の区別
- 用途別記事と単一カード特集記事
- 広告・Affiliate関係と申込前の公式確認
- Login不要の誤情報指摘Form
- Loading、Empty、Error、Partial等の一般画面状態
- Desktop / Mobile、Keyboard、Focus、Semantic HTML、WCAG 2.2 AA目標

## Out of scope for UI-only mode

- DB、ORM、Migration、本番API、認証・認可、CMS
- 本番の検索・算定・Moderation・承認Logic
- 外部送信、メール送信、Analytics、永続化、外部Content埋込
- Hosting、Infrastructure、本番Data Contract
- 実在する個人情報、Credential、Secretを含むFixture

## Adopted UI-stage decisions

### Product name and visual direction

- UI Mock上の名称は`カード比較くん`とする。
- 情報量を保ちながら、比較結果を落ち着いて検討できる静かな編集物の印象を目指す。従来の`整理されたごちゃごちゃ感`は採用しない。
- 背景はWarm ivoryから淡いStoneを基調とし、細い枠線、柔らかな影、十分な余白で情報のまとまりを示す。
- Clear Goldは先頭候補、主要・補助Action、進捗、金額、通常の状態表示に使用し、Vitamin Coralは選択状態と案内に使用する。変更確認中はMuted Orange、ErrorはDark Redとして意味を分離する。
- Ranking Cardは1位をGold、2位をSilver、3位をBronzeで表現し、順位Badge、帯見出し、枠線、金額Panelの淡い背景へ一貫して適用する。
- 背景面は低彩度のまま保ち、GoldとVitamin Coralを帯、順位、選択状態、金額、CTAなど限定した面で高彩度・高Contrastに使用する。Blue系とGreen系はUI Accent、状態色、抽象券面で使用しない。
- 単色の広い面を避け、Actionには明確なGradient、背景と情報Cardには白から淡色へ移る低ContrastのGradientを使用する。
- 主要・補助CTAは文字Contrastを確保した淡いGold Gradientとし、進捗、順位、比較等の補助表示もGold系で統一する。
- Footerは濃色面を使用せず、明るいIvoryから明確なGoldへ移るGradientと細いGold境界線で、余白のある軽い終端をつくる。
- 特集記事Cardは白い面を基準とし、記事種別のAccentは上辺とLabelに限定する。
- 先頭候補をほかの候補より少し大きく見せる一方、推薦精度、相性、現在利用中カードとの差額など、Requirementsにない意味は付加しない。
- 注目カードは順位Ribbon、抽象券面、還元額Panel、特徴Tile、主要Actionの順に構成し、先頭候補だけ横長の強調Layoutを使用する。
- 条件入力は注目カードと同じ配色、帯見出し、金額Panel、補足Tileを用い、簡潔なStep表示と入力結果を一つのCard内で把握できる構成とする。
- 算定状態、確認日、Evidence、広告・Affiliate、仮定、Error、Focusは装飾から分離し、理解可能性とAccessibilityを優先する。

### Asset policy（RQ-013 / RQ-038）

- 実在ブランドの券面画像とIconはUI Mockで使用しない。
- CSSによる抽象的な券面と名称のText代替を使用する。
- 画像領域、約`1.586:1`の比率、複数券面、代替TextのUIを検証する。
- 実Assetは利用条件と正確性を確認し、人間が承認した後だけ利用する。
- 表示形式は本番Architectureで再評価する。

### Merchant and service coverage（RQ-033）

- Requirements記載の11カテゴリをすべてUIへ用意する。
- UI Mockでは各カテゴリ2〜4件の架空企業・Serviceを合成Fixtureとして使用する。
- カテゴリ指定と企業・Service指定を区別する。
- Coverage件数と確認日を表示可能にする。
- 実在Serviceの初期収録一覧はEvidence確認後、UI Mock Approval前に確定する。

### Filter and sort（RQ-034）

- 初期ReleaseのUIはRequirements必須項目に限定する。
- Filterは年会費無料、還元率、家族・追加カード発行可、ETCカード発行可、招待制を含める、新規受付停止を含めるを対象とする。
- 基本Sortは年間正味還元額が高い順とする。
- その他のFilter / Sortは今回のMockへ追加しない。

### Correction report form（RQ-037）

- Login不要とし、連絡先メールアドレスは任意とする。
- 対象カード・記事・掲載項目、指摘内容、利用者が把握している根拠を必須とする。
- 送信後は画面上に受付完了と合成受付番号を表示する。
- メール未入力時は個別回答や追加確認ができないことを表示する。
- メール入力時は確認結果または追加確認の連絡にのみ使用する。
- 修正または回答を保証しない。内部の確認着手目標は利用者向け画面へ明示しない。
- Secret、Credential、不要な個人情報を書かないよう案内する。
- UI Mockでは外部送信・メール送信・永続化せず、Memory内の合成結果だけを表示する。

## Remaining UI questions

- 検索結果Cardと比較画面の情報優先順位
- Desktop / MobileにおけるFilterと比較候補の操作方法
- 実在Serviceの初期収録一覧（Owner: Product owner、期限: UI Mock Approval前、戻し先: UI / Evidence）
- 算定不完全な候補を含む順位の理解可能性（RQ-011）
- 変更項目を特定できない場合の確認中表示範囲（RQ-017）
