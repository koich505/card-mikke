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

- Information Architecture、Global Navigation、主要入口の優先順位
- 最初に完成させる主要User Flow
- Desktop / Mobileにおける検索条件入力と比較導線
- 実在Serviceの初期収録一覧（Owner: Product owner、期限: UI Mock Approval前、戻し先: UI / Evidence）
- 算定不完全な候補を含む順位の理解可能性（RQ-011）
- 変更項目を特定できない場合の確認中表示範囲（RQ-017）

