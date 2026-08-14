# Information Architecture

Status: Approved direction; details under UI dialogue  
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）
Decision date: 2026-08-10
Last updated: 2026-08-12

## IA principles

- 未登録利用者がAccount作成なしで検索と比較を完了できる。
- 最短の主要導線を「条件入力 → 検索結果 → 比較 → カード詳細」とする。
- 年間正味還元額は確定額ではなく、入力条件と明示した仮定に基づく目安として示す。
- 算定不完全、変更確認中、Disclosure Status、一般画面状態を別の意味として表現する。
- 記事からも対象カード、検索結果、比較へ合流できる。
- 保存、履歴、継続利用が必要になった時点でAccountの価値を説明し、検索開始前に登録を要求しない。
- 運営管理は公開・Account領域からNavigationと認証を分離し、管理者専用AccountとMFAを入口にする。
- 未承認Draft、編集Draft、承認済み情報を同じ状態として扱わない。

## Top-level structure

| Area | User purpose | Primary Requirements |
|---|---|---|
| ホーム | サイトの価値を理解し、条件検索または注目カード・特集記事・新着情報から探索を開始する | FR-004, FR-007–FR-010, FR-019, FR-031, AC-001, AC-015, AC-016, AC-020 |
| カードを探す | 条件入力またはキーワードから候補を探す | FR-004, FR-028, AC-005, AC-006, AC-011 |
| 検索結果 | 順位、算定状態、Filterを確認し、比較候補を選ぶ。登録利用者は概要を入力して結果を明示保存する | FR-011, FR-013, FR-014, FR-023, AC-009–AC-011, AC-022 |
| 比較 | 同一条件で最大5枚の差を理解する | FR-029, AC-012 |
| カード詳細 | 商品条件、算定内訳、Evidence、記事、申込前確認を理解する | FR-017–FR-020, FR-035, AC-014, AC-015 |
| 記事 | 用途別または単一カード特集から候補と根拠を知る | FR-007–FR-009, FR-019, FR-031, AC-015, AC-016 |
| お気に入り | 検討中の候補へ戻り、一時保存とAccount保存を区別する | FR-030, AC-013 |
| 掲載範囲・サイト方針 | Coverage、算定方法、広告・Affiliate、情報更新方針を確認する | FR-019, FR-027, AC-015, AC-019, AC-038 |
| Account | Profileと明示的に保存した検索・比較を継続利用する | FR-001–FR-003, FR-011, FR-025 |
| 運営管理 | Source差分、Evidence、未承認Draftを確認し、明示承認後だけ公開反映可能な状態へ進める | FR-021, FR-022, FR-032–FR-034, NFR-SEC-001, NFR-SEC-003, AC-017, AC-018, AC-025, AC-026, AC-040 |

運営管理のSource差分は、Dashboardの要約から`/ops/changes`の一覧へ進み、`Source変更Revision × 対象カード`単位の`/ops/changes/[id]`で提案を処理する。

## Operations navigation and hierarchy

### Desktop

- 左Sidebarに`運営Dashboard`、`カード情報差分`、`Session管理`を置く。
- 記事Draft、Review Moderation、誤情報指摘、業務情報は後続Mockとして識別し、空Routeへ遷移させない。
- Headerに管理者Account、Session状態確認、Logoutを置く。

### Mobile

- HeaderのMenu Buttonから左側の開閉式Side Navigationを開く。本文操作を完全には遮断しない。
- claim差分は表の横Scrollへ依存せず、項目ごとの縦Cardで表示する。
- 重要状態、Source、Draft保存、承認Actionを横Scrollまたは閉じた領域へ隠さない。

```text
管理者Login
└── MFA
    ├── MFA回復手続き案内
    └── 運営Dashboard
        ├── 公式Source差分一覧
        │   └── カード情報差分の確認・編集 → 提案単位の最終確認
        └── Session管理
            └── 再認証 → 個別または一括失効
```

運営画面はすべて`noindex, nofollow`とし、UI Mockの認証状態、差分判断、監査TimelineはBrowser Memoryだけで保持する。再読込時は未Loginへ戻る。

## Global navigation

### Desktop

- Primary navigation: `カードを探す`、`比較`、`記事`
- Utility navigation: `お気に入り`、`掲載範囲・サイト方針`、`Account`
- Headerからキーワード検索へ到達可能にする。
- 比較候補がある場合、比較件数をTextと数字で示す。Colorだけに依存しない。

### Mobile

- HeaderにはHome、キーワード検索、Menu入口を置く。
- Menu内にDesktopと同じNavigation項目を保ち、情報を削除しない。
- 比較候補がある場合、画面下部の操作領域から選択枚数と比較Actionを確認できる候補とする。
- 固定要素が本文、Error、Keyboard Focusを隠さないことをMockで検証する。

## Hierarchy and cross-links

```text
ホーム
├── 条件からカードを探す
│   └── 検索結果
│       ├── 条件を変更
│       ├── 比較
│       │   └── カード詳細
│       └── カード詳細
├── キーワードで探す
│   └── 検索結果またはカード詳細
├── 注目のカード
│   └── カード詳細または比較候補
├── おすすめ特集記事
│   └── 特集記事一覧
│       └── 記事
└── 新着情報
    ├── 記事
    └── カード詳細

記事
    ├── 特集記事一覧
    │   ├── フリーワード・タグ・記事種別で絞り込み
    │   └── 用途別記事、二軸比較記事、単一カード特集
    ├── 用途別記事
    │   └── カード詳細または条件付き検索結果
    └── 単一カード特集
        └── カード詳細

共通入口
├── お気に入り
├── 掲載範囲・サイト方針
└── Account
    ├── Profile
    └── 検索・比較履歴
```

## Home content order

1. サイトの価値と`条件からカードを探す`主要Action
2. 年間利用額を起点とする条件入力の開始領域
3. 注目のカード
4. おすすめ特集記事
5. 新着情報
6. Coverage、算定方法、情報更新、広告・Affiliateに関するTrust情報

### 注目のカード

- 3〜6件を目安とする編集枠として扱う。
- 個人条件に基づく順位または「最もお得」という意味にしない。
- 掲載理由または選定基準、確認日、算定状態を確認可能にする。
- 広告・Affiliate関係がある場合は、カード詳細やActionまで隠さず表示する。
- 算定不完全または変更確認中のカードを掲載する場合は、その状態をCard上で識別可能にする。

### おすすめ特集記事

- 用途別記事と単一カード特集を区別する。
- 対象読者、記事種別、公開日または更新日を示す。
- 更新確認中の記事は、公開済み旧記事を継続掲載していることを識別可能にする。

### 新着情報

- 新規公開記事、記事更新、カード情報更新等の種別と日付を示す。
- 公開・承認済みの内容だけを通常の新着情報として扱う。
- 未承認Draftや自動検知だけを公開済み更新として表示しない。
- 情報更新と、新規受付開始・停止等のOffering状態を同じ意味にしない。

## Content hierarchy on decision screens

検索結果、比較、カード詳細では、次の順序を基本とする。

1. 現在の入力条件と、Profileからの反映・一時変更の状態
2. 年間正味還元額と初年度／通常年
3. 算定状態と、変更確認中・算定不完全に関する注意
4. 通常還元、利用先別還元、Campaign、年会費の内訳
5. 計算に含めない項目と仮定
6. 商品条件、確認日、適用期間、Evidence
7. 広告・Affiliate関係と、申込前の公式確認案内

## Entry points

- Primary: ホームの条件入力
- Secondary: Headerのキーワード検索
- Discovery: 用途別記事、単一カード特集記事
- Return visit: お気に入り、Accountの履歴
- Direct information: カード詳細

すべての入口は、必要に応じて同じ検索条件・比較Contextへ合流できるようにする。ただしUI Mockの暫定View Modelを本番Data Contractとして確定しない。

## Account IA（Account v0.4）

- Global Headerの`Account`から`/account/profile`へ到達する。UI MockはLogin済みの合成利用者を前提とし、認証Flowを実装しない。
- Account Navigationは全Viewportで上部横並びTabとし、選択中の内容だけを下のTab Panelへ表示する。
- Profileは1Page内を`利用額・よく使う場所`、`あなたについて`、`ポイントの希望`の3章に分ける。
- 各章を独立して保存し、他章の未保存変更へ影響させない。
- `検索・比較履歴`は当時の入力条件、当時の合成計算記録、計算時点、根拠確認時点を表示し、現在情報による再検索・比較再表示と区別する。
- `データ管理`は検索・比較履歴の一括削除とAccount削除だけを配置し、Account削除の影響範囲・期限・保持例外を確認できるようにする。
- Tab間で未保存Profile入力、展開中の履歴、失敗状態を保持し、履歴単体削除と一括削除は同じBrowser Memory上の合成履歴へ反映する。
- 未保存変更がある内部遷移では破棄確認を行い、取消時は起点LinkへFocusを戻す。

## SEO and indexing boundary

- 公開カード詳細と公開記事をIndex対象として設計する。
- Profile、履歴、個人別検索結果はIndex対象外であることをMetadataで表現できるようにする。
- Pageごとに一意で説明的なTitleと主要見出しを用意する。

## Approved search-result interactions

- Desktopは左側にFilter、右側に検索結果を配置する。
- MobileはFilter Buttonから全画面Dialogを開く。
- 適用中Filterを検索結果上部に解除可能な形で表示する。
- 比較候補は各検索結果Card内のButtonで追加・解除する。
- 1枚以上選択すると、画面下部に比較候補数と`比較する`Actionを表示する。
- 比較候補は最大5枚とし、上限時は理由と解除方法を表示する。
- 通常年の年間正味還元額を主表示、初年度を副表示にする。

## Approved comparison interactions

- Desktopはカードを列、比較項目を行とする比較表を使用する。
- Desktopではカード名と年間正味還元額を上部、項目名を左側に固定し、3〜5枚では横Scrollを許容する。
- Mobileは比較項目ごとに選択カードを縦に並べ、横Scrollを主要操作にしない。
- Mobileでは`違いがある項目のみ表示`と、比較カードの削除・入替を提供する。
- 算定内訳とEvidenceはPage内の開閉領域で表示する。
- 開閉状態にかかわらず、算定状態、確認日、重要な注意事項を隠さない。
