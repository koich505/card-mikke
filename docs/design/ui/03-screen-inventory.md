# Screen Inventory

Status: Draft under UI dialogue  
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-10 Approved）  
Last updated: 2026-08-10

## Inventory policy

- Screen IDはUI設計・User Flow・Reviewの追跡用であり、URL、Component、実装Taskを確定しない。
- `Primary mock`は最初の主要Flowで操作可能にする画面、`Supporting mock`は関連Flowで追加する画面、`Inventory only`は詳細対話前の棚卸しを示す。
- Overlay、Dialog、MenuもKeyboard、Focus、Responsive確認が必要な独立対象として記録する。

## Public screens

| ID | Screen | Purpose | Mock priority | Primary traceability |
|---|---|---|---|---|
| SCR-PUB-001 | ホーム | 条件検索、注目カード、特集記事、新着情報から探索を始める | Primary mock | FR-004, FR-007–FR-010, FR-019, FR-031, AC-001, AC-015, AC-016, AC-020 |
| SCR-PUB-002 | 条件入力 | 年間利用額、利用先カテゴリ、企業Serviceを段階的に指定する | Primary mock | FR-003, FR-004, FR-010, FR-012, AC-001, AC-002, AC-005, AC-006 |
| SCR-PUB-003 | 検索結果 | 順位、算定状態、Filterを確認し比較候補を選ぶ | Primary mock | FR-005, FR-006, FR-013, FR-014, FR-023, AC-007, AC-009–AC-011 |
| SCR-PUB-004 | カード比較 | 最大5枚を同一条件で比較する | Primary mock | FR-016, FR-029, AC-012 |
| SCR-PUB-005 | カード詳細 | 条件、内訳、Evidence、確認日、申込前確認を理解する | Primary mock | FR-017–FR-020, FR-035, AC-014, AC-015 |
| SCR-PUB-006 | 記事一覧 | 用途別記事と単一カード特集を探す | Supporting mock | FR-007, FR-031 |
| SCR-PUB-007 | 用途別記事 | 対象読者、選定理由、候補、根拠を理解する | Supporting mock | FR-007–FR-009, FR-019, AC-015, AC-016 |
| SCR-PUB-008 | 単一カード特集 | 特徴、変更点、条件、確認時点、Sourceを理解する | Supporting mock | FR-007–FR-009, FR-019, FR-031, AC-015, AC-016 |
| SCR-PUB-009 | お気に入り | 一時お気に入りとAccount保存を区別して候補へ戻る | Supporting mock | FR-030, AC-013 |
| SCR-PUB-010 | 掲載範囲・サイト方針 | Coverage、算定方法、更新、広告・Affiliate方針を確認する | Supporting mock | FR-019, FR-027, AC-015, AC-019, AC-038 |
| SCR-PUB-011 | 誤情報指摘Form | Loginなしで対象と根拠を安全に送信するUIを検証する | Supporting mock | FR-026, NFR-SEC-004, AC-023 |
| SCR-PUB-012 | 誤情報指摘受付完了 | 合成受付番号と連絡条件を確認する | Supporting mock | FR-026, AC-023 |

## Account screens

| ID | Screen | Purpose | Mock priority | Primary traceability |
|---|---|---|---|---|
| SCR-ACC-001 | Login・登録 | 保存・履歴の価値を理解して任意にAccountを利用する | Inventory only | FR-001, AC-003 |
| SCR-ACC-002 | Profile | 年間利用額、利用先、必要最小限の属性を保存・更新する | Inventory only | FR-002, FR-003, AC-002 |
| SCR-ACC-003 | 検索・比較履歴 | 当時の結果と最新再計算を区別して確認する | Inventory only | FR-011, AC-022 |
| SCR-ACC-004 | Account・データ管理 | Profile、履歴、Account削除と保持例外を確認する | Inventory only | FR-025, AC-004 |

## Operations screens

Requirementsに運営者向けUIを含むためInventoryから除外しない。ただし、最初の公開主要Flowとは分離し、詳細IAとUser Flowは別のUI対話で決める。

| ID | Screen | Purpose | Mock priority | Primary traceability |
|---|---|---|---|---|
| SCR-OPS-001 | 運営Dashboard | 未承認Draft、確認中、失敗、訂正等の状態を把握する | Inventory only | FR-009, FR-022, FR-026, FR-033–FR-039 |
| SCR-OPS-002 | カード情報差分確認 | 前回承認値、候補、Evidence、影響を項目単位で確認する | Inventory only | FR-022, FR-033, FR-034 |
| SCR-OPS-003 | カード情報編集・承認 | 編集と承認を別操作として実行する | Inventory only | FR-022, FR-032 |
| SCR-OPS-004 | 券面画像確認・承認 | Source、条件、代替Text、履歴、状態を確認する | Inventory only | FR-035, AC-027 |
| SCR-OPS-005 | 記事Draft編集・承認 | AI Draftを確認・編集し、人間承認後だけ公開する | Inventory only | FR-008, FR-009, FR-031 |
| SCR-OPS-006 | Review Moderation | Review本文、AI検査、状態を確認し承認・却下する | Inventory only | FR-036, FR-037, AC-028, AC-029 |
| SCR-OPS-007 | 誤情報指摘管理 | 指摘、公式Source、状態、判断理由を管理する | Inventory only | FR-026, AC-023 |
| SCR-OPS-008 | 業務情報管理 | カテゴリ、企業Service、換算基準、Campaign等を管理する | Inventory only | FR-032, AC-018 |

## Overlays and persistent UI

| ID | UI element | Trigger / responsibility | Mock priority |
|---|---|---|---|
| OVL-001 | Mobile Global Menu | Header Menuから全Navigationを操作する | Primary mock |
| OVL-002 | Mobile Filter Dialog | Filterの適用、取消、全解除を行う | Primary mock |
| OVL-003 | Comparison Action Bar | 選択枚数、最大5枚、比較開始、解除を扱う | Primary mock |
| OVL-004 | Calculation Detail | 算定内訳、対象外、仮定を追加確認する | Primary mock |
| OVL-005 | Evidence Detail | Source、確認日、適用期間、Disclosure Statusを確認する | Primary mock |
| OVL-006 | Clear Comparison Confirmation | 比較候補の全解除を確認する | Primary mock |
| OVL-007 | Save / Account Prompt | 一時操作とAccount保存の違いを説明する | Supporting mock |

## Required state coverage

| State | Primary screens |
|---|---|
| Default | 全Primary mock画面 |
| Loading | SCR-PUB-003、SCR-PUB-004、SCR-PUB-005 |
| Empty | SCR-PUB-003、SCR-PUB-009、記事一覧 |
| Validation Error | SCR-PUB-002、SCR-PUB-011 |
| Recoverable Error / Retry | SCR-PUB-003、SCR-PUB-005 |
| Partial result | SCR-PUB-003、SCR-PUB-004 |
| Complete calculation | SCR-PUB-003〜SCR-PUB-005 |
| Incomplete calculation | SCR-PUB-003〜SCR-PUB-005 |
| Change under review | SCR-PUB-001、SCR-PUB-003、SCR-PUB-005、記事 |
| Disclosure Status 4 states | SCR-PUB-005、OVL-005 |

## Current open screen decisions

- 記事一覧で用途別記事と単一カード特集をどう分類するか
- Account画面と運営画面の詳細IA・優先Flow

## Approved comparison screen decisions

- Desktopはカード列・比較項目行の比較表とする。
- Desktopはカード名・年間正味還元額・項目名を追従表示し、3〜5枚では横Scrollを許容する。
- Mobileは項目ごとの縦表示とし、横Scrollを主要操作にしない。
- Mobileに`違いがある項目のみ表示`とカードの削除・入替を用意する。
- 算定内訳とEvidenceはPage内の開閉領域とし、重要状態と注意事項は常時表示する。
