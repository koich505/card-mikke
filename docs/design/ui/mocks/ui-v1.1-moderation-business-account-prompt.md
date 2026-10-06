# UI Mock v1.1 — Moderation / Correction / Business Data / Account Prompt

Status: Implemented; independent review passed; Human UI Approval pending
Date: 2026-10-06
Requirements baseline: `docs/spec/requirements/07-approval.md`のCurrent Product-owner-approved Baselineと現行Review関連Requirements

## Purpose

Review Moderation、誤情報指摘管理、業務情報管理、Save / Account PromptをHigh-fidelity UI-only Mockとして検証する。

## Routes and entry point

- `/ops/reviews`: SCR-OPS-006 / UF-OPS-004
- `/ops/corrections`: SCR-OPS-007 / UF-OPS-005
- `/ops/business-data`: SCR-OPS-008 / UF-OPS-006
- `/search`の保存Action: OVL-007 / UF-010

## Implemented interactions

- 確認候補と公開後通報を区別し、個別通報、判定失敗・再試行、人間判断、構造化理由、再認証、terminal stateを操作できる。
- 誤情報指摘を未確認から公式Source確認、判断Draft、修正対応または却下へ進め、修正案を直接公開せず差分承認へ送る。
- 業務情報の追加・訂正・無効化候補を編集し、Draft保存と再認証承認を分け、変更前後・Domain関係・案件別監査履歴を確認できる。
- 未登録利用者の保存ActionでAccount価値と未保存境界を説明し、取消、Login・登録、UIモック専用の登録済みFlowを選べる。

## UI-only boundary

- 合成FixtureとReact Memoryだけを使用する。
- 実Moderation、実訂正、実業務情報、認証・認可、API、DB、外部送信、公開、削除、永続化、Analyticsを実装しない。
- AI判定候補、通報件数、Fixture、暫定状態を本番Data Contractまたは確定Factへ昇格しない。

## Verification

| Check | Result |
|---|---|
| `npm run quality` | Pass |
| 対象Playwright | 18 / 18 Pass（Desktop Chrome／Mobile Chrome） |
| Playwright全体 | 186 Pass / 6 Skip / 0 Fail（全192件） |
| axe | 3管理画面とAccount PromptのDesktop／Mobileで違反0件 |
| 横Overflow | 3管理画面のDesktop／Mobileでなし |
| Security / persistence | Plain Text Validation、構造化理由、機微情報補助検出、再認証、noindex、Cookie／storage 0件を確認 |
| Production Screenshot | Production buildからDesktop／Mobile 8枚を採取・目視確認 |
| `npm run security:secrets` | Pass / Leak 0 |
| 依存監査 | Lockfile・依存変更なしのため対象外 |

UI code/test scope manifest hash: `629a849fb8461db26c5f434ca1db7f1268e70a83a62f927a97f6cfdc7a69281b`

## Production screenshots

| Screen | Desktop SHA-256 | Mobile SHA-256 |
|---|---|---|
| Account Prompt | `bb4a804f80416f6a59f4199d7b4fff6a90f4284fb84359071eff3475087ea499` | `2c3d4b14a8881e18861c2d4e74e4c1d84176256c8f4808d49c63bb9685466cfb` |
| Review Moderation | `1175a96fe300caaf36fafe99cac865b0e5fdf8d6a97013ff71d61ab0749f1d5b` | `21994cb1d942989e82027513c4a8f41cd31e50414946ca135ef7c72a1ca4e1ed` |
| 誤情報指摘管理 | `5bac85ef4d7d932faa918ef3fdd05710847b13a91c31761c2febb0431135b5d1` | `93d42cdff5fb18cddbca512adbcafdae35634059933f5de0645235d2936972c1` |
| 業務情報管理 | `5a88a5c5ff5ac33cb8623beb1636e45488974239891b814acffa58cd08549447` | `6aed6ad3a0a20e4a027e6db203318230429343ebf85025111965b8254d178504` |

Files: `docs/design/ui/mocks/screenshots/ui-v1.1-batch/`

## Traceability

- SCR-OPS-006 / UF-OPS-004 / UIR-OPS-008: FR-036〜FR-039、AC-028〜AC-031、AC-040
- SCR-OPS-007 / UF-OPS-005 / UIR-OPS-009: FR-022、FR-026、AC-017、AC-023、AC-040
- SCR-OPS-008 / UF-OPS-006 / UIR-OPS-010: FR-032、NFR-MAINT-001、AC-018、AC-040
- OVL-007 / UF-010 / UIR-ACCOUNT-PROMPT-001: FR-001、FR-010、FR-011、AC-001、AC-022

## Promotion boundary

Human UI Approval後、Feature Specification作成後かつTechnical Plan確定前に、UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。合成判定、Memory状態、再認証、公開・削除・保存の仮Interactionを本番契約へ無条件に昇格しない。
