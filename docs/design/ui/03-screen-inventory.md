# Screen Inventory

Status: Operations and Account Prompt v1.1 and earlier mocks implemented in UI-only mode; human UI approvals pending
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-13 Approved、FR-041 / AC-043を含む。RQ-037 dispositionはbaseline再承認待ち）
Last updated: 2026-10-06

## Inventory policy

- Screen IDはUI設計・User Flow・Reviewの追跡用であり、URL、Component、実装Taskを確定しない。
- `Primary mock`は最初の主要Flowで操作可能にする画面、`Supporting mock`は関連Flowで追加する画面、`Inventory only`は詳細対話前の棚卸しを示す。
- Overlay、Dialog、MenuもKeyboard、Focus、Responsive確認が必要な独立対象として記録する。

## Public screens

| ID | Screen | Purpose | Mock priority | Primary traceability |
|---|---|---|---|---|
| SCR-PUB-001 | ホーム | 公開中テーマ、条件検索、注目カード、特集記事、新着情報から探索を始める | Primary mock v1.2 | FR-004, FR-007–FR-010, FR-019, FR-031, FR-040, AC-001, AC-015, AC-016, AC-020, AC-041 |
| SCR-PUB-002 | 条件入力 | 年間利用額、利用先カテゴリ、企業Serviceを段階的に指定する | Primary mock | FR-003, FR-004, FR-010, FR-012, AC-001, AC-002, AC-005, AC-006 |
| SCR-PUB-003 | 検索結果 | 順位、算定状態、テーマ・適用条件、Filterを確認し比較候補を選び、概要を付けて明示保存する | Primary mock extended in v1.2 | FR-005, FR-006, FR-011, FR-013, FR-014, FR-023, FR-040, NFR-SEC-004, AC-007, AC-009–AC-011, AC-022, AC-041 |
| SCR-PUB-004 | カード比較 | 最大5枚を同一条件で比較する | Primary mock implemented in v0.7 | FR-016, FR-029, AC-012 |
| SCR-PUB-005 | カード詳細 | 券面、費用、還元、Campaign、年間利用特典、追加Card、Benefit、Insurance、Review、Evidence、確認日、申込前確認を理解する | Primary mock implemented in v0.2 | FR-017–FR-020, FR-035, AC-014, AC-015 |
| SCR-PUB-006 | 記事一覧 | 公開済み記事をフリーワード、複数タグ（すべて含む）、記事種別、新着／更新順で探し、更新確認中の旧記事を識別する | Primary mock implemented in v0.6 | FR-007, FR-031, FR-041, AC-043 |
| SCR-PUB-007 | 用途別記事 | 対象読者、選定理由、候補、根拠を理解する | Supporting mock implemented in v0.8 | FR-007–FR-009, FR-019, AC-015, AC-016 |
| SCR-PUB-008 | 単一カード特集 | 特徴、変更点、条件、確認時点、Sourceを理解する | Supporting mock implemented in v0.8 | FR-007–FR-009, FR-019, FR-031, AC-015, AC-016 |
| SCR-PUB-009 | お気に入り | 一時お気に入りとAccount保存を区別して候補へ戻る | Supporting mock implemented in v0.9 | FR-030, AC-013 |
| SCR-PUB-010 | 掲載範囲・サイト方針 | Coverage、算定方法、更新、広告・Affiliate方針を確認する | Supporting mock implemented in v1.0 | FR-019, FR-027, AC-015, AC-019, AC-038 |
| SCR-PUB-011 | 誤情報指摘Form | Loginなしで対象と根拠を安全に送信するUIを検証する | Supporting mock implemented in v0.6 | FR-026, NFR-SEC-004, AC-023 |
| SCR-PUB-012 | 誤情報指摘受付完了 | 合成受付番号と連絡条件を確認する | Supporting mock implemented in v0.6 | FR-026, AC-023 |

## Account screens

| ID | Screen | Purpose | Mock priority | Primary traceability |
|---|---|---|---|---|
| SCR-ACC-001 | Login・登録 | 保存・履歴の価値を理解して任意にAccountを利用する | Supporting mock implemented in v1.0 | FR-001, AC-003 |
| SCR-ACC-002 | Profile | 年間利用額、利用先、必要最小限の属性を章ごとに保存・更新する | Primary mock implemented in v0.3 | FR-002, FR-003, AC-002 |
| SCR-ACC-003 | 検索・比較履歴 | 当時の結果と最新再計算を区別して確認する | Primary mock implemented in v0.4 | FR-011, AC-022 |
| SCR-ACC-004 | Account・データ管理 | Profile、履歴、Account削除と保持例外を確認する | Primary mock implemented in v0.4 | FR-025, NFR-PRIV-003, NFR-PRIV-004, AC-004 |

## Operations screens

Requirementsに運営者向けUIを含むためInventoryから除外しない。v0.3では認証とSource差分の主要FlowをPrimary mockとし、その他の運営業務は後続Mockとする。

| ID | Screen | Purpose | Mock priority | Primary traceability |
|---|---|---|---|---|
| SCR-OPS-001 | 運営Dashboard | 未承認Draft、確認中、失敗、訂正等の状態を把握する | Primary mock v0.3 | FR-009, FR-022, FR-026, FR-033–FR-039 |
| SCR-OPS-013 | 公式Source差分一覧 | Source変更Revisionと対象カードごとに未処理・処理中・完了・確認不能を検索、絞り込みする | Primary mock v0.3 | FR-022, FR-032, FR-033, FR-034 |
| SCR-OPS-002 | カード情報差分の確認・編集 | 前回値、候補、Evidenceを確認し、同一画面で編集・Draft保存・判断確定する | Primary mock v0.3 | FR-022, FR-032, FR-033, FR-034 |
| SCR-OPS-003 | カード情報編集・承認 | SCR-OPS-002へ統合 | Integrated into SCR-OPS-002 | FR-022, FR-032 |
| SCR-OPS-004 | 券面画像確認・承認 | Source、条件、代替Text、履歴、状態を確認する | Supporting mock implemented in v1.0 | FR-035, AC-027 |
| SCR-OPS-005 | 記事Draft編集・承認 | AI Draftを確認・編集し、人間承認後だけ公開する | Supporting mock implemented in v1.0 | FR-008, FR-009, FR-031 |
| SCR-OPS-006 | Review Moderation | Review本文、AI検査、状態を確認し承認・却下する | Supporting mock implemented in v1.1 | FR-036–FR-038, AC-028–AC-030 |
| SCR-OPS-007 | 誤情報指摘管理 | 指摘、公式Source、状態、判断理由を管理する | Supporting mock implemented in v1.1 | FR-026, AC-023 |
| SCR-OPS-008 | 業務情報管理 | カテゴリ、企業Service、換算基準、Campaign等を管理する | Supporting mock implemented in v1.1 | FR-032, AC-018 |
| SCR-OPS-009 | 管理者Login | 専用AccountとPasswordによる一次認証を確認する | Primary mock v0.3 | NFR-SEC-001, NFR-SEC-003, AC-040 |
| SCR-OPS-010 | 管理者MFA | 一次認証と異なる要素による確認を行う | Primary mock v0.3 | NFR-SEC-001, NFR-SEC-003, AC-040 |
| SCR-OPS-011 | MFA回復手続き | 本人確認、認証要素変更、監査、通知の境界を理解する | Supporting mock v0.3 | NFR-SEC-001, AC-040 |
| SCR-OPS-012 | 管理者Session管理 | Sessionを確認し個別・一括失効する | Primary mock v0.3 | NFR-SEC-003, AC-040 |
| SCR-OPS-014 | テーマ管理 | 名称、説明、表示順、年間利用額を含む条件一式、公開状態を追加・編集・非公開化する | Supporting mock implemented in v1.2 | FR-040, AC-041, AC-042 |

## Overlays and persistent UI

| ID | UI element | Trigger / responsibility | Mock priority |
|---|---|---|---|
| OVL-001 | Mobile Global Menu | Header Menuから全Navigationを操作する | Primary mock |
| OVL-002 | Mobile Filter Dialog | Filterの適用、取消、全解除を行う | Primary mock |
| OVL-003 | Comparison Action Bar | 選択枚数、最大5枚、比較開始、解除を扱う | Primary mock |
| OVL-004 | Calculation Detail | 算定内訳、対象外、仮定を追加確認する | Primary mock implemented in v0.7 |
| OVL-005 | Evidence Detail | Source、確認日、適用期間、Disclosure Statusを確認する | Primary mock implemented in v0.7 |
| OVL-006 | Clear Comparison Confirmation | 比較候補の全解除を確認する | Primary mock implemented in v0.7 |
| OVL-007 | Save / Account Prompt | 一時操作とAccount保存の違いを説明する | Supporting mock implemented in v1.1 |
| OVL-008 | 検索条件保存Dialog | 概要、保存対象、Validation、保存中・失敗・再試行を確認する | Primary mock implemented in v0.5 |
| OVL-OPS-001 | Mobile Operations Navigation | 管理画面の開閉式Side Navigationを操作する | Primary mock v0.3 |
| OVL-OPS-002 | 管理者再認証 | 承認・却下・Session失効前にPasswordとMFAを再確認する | Primary mock v0.3 |

## Required state coverage

| State | Primary screens |
|---|---|
| Default | 全Primary mock画面 |
| Loading | SCR-PUB-003、SCR-PUB-004、SCR-PUB-005 |
| Empty | SCR-PUB-003、SCR-PUB-006、SCR-PUB-009 |
| Validation Error | SCR-PUB-002、SCR-PUB-011 |
| Invalid target | SCR-PUB-011 |
| Submission pending | SCR-PUB-011 |
| Receipt complete | SCR-PUB-012 |
| Recoverable Error / Retry | SCR-PUB-003、SCR-PUB-005 |
| Partial result | SCR-PUB-003、SCR-PUB-004 |
| Complete calculation | SCR-PUB-003〜SCR-PUB-005 |
| Incomplete calculation | SCR-PUB-003〜SCR-PUB-005 |
| Change under review | SCR-PUB-001、SCR-PUB-003、SCR-PUB-005、記事 |
| Disclosure Status 4 states | SCR-PUB-005、OVL-005 |
| Section saving / saved | SCR-ACC-002 |
| Recoverable save error / retry | SCR-ACC-002 |
| Unsaved changes / leave confirmation | SCR-ACC-002 |
| Operations Loading / Empty / Error | SCR-OPS-001、SCR-OPS-013 |
| Operations Partial / impact unknown | SCR-OPS-002 |
| Session expired | SCR-OPS-001〜003、SCR-OPS-012 |
| Claim diff 5 states | SCR-OPS-002 |

## Current open screen decisions

- お気に入りは未登録時の一時保存とAccount保存を同一画面で明示的に分離し、Account登録時はDialogで同意した場合だけ引き継ぐ方針をv0.9で採用した。
- 掲載方針、利用者認証、券面画像、記事Draftの詳細Flowをv1.0でUI-only Mock化した。実数値、実認証、実Asset、公開・永続化は対象外とする。
- 用途別記事と単一カード特集は記事一覧の独立した記事種別として分類し、記事詳細では対象読者／対象カードを先頭で明示する方針をv0.8で採用した。
- Review、訂正、業務情報、Save / Account Promptの詳細Flowをv1.1でUI-only Mock化した。
- 公開テーマのワンクリック検索とテーマ管理をv1.2でUI-only Mock化した。非公開テーマの直指定は適用せず、保存済み履歴Snapshotを現在設定から分離する。

## Approved comparison screen decisions

- Desktopはカード列・比較項目行の比較表とする。
- Desktopはカード名・年間正味還元額・項目名を追従表示し、3〜5枚では横Scrollを許容する。
- Mobileは項目ごとの縦表示とし、横Scrollを主要操作にしない。
- Mobileに`違いがある項目のみ表示`とカードの削除・入替を用意する。
- 算定内訳とEvidenceはPage内の開閉領域とし、重要状態と注意事項は常時表示する。
