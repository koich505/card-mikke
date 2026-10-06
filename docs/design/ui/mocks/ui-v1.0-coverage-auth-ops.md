# UI Mock v1.0 — Coverage / User Auth / Image & Article Operations

Status: Implemented; independent review passed at Attempt 5
Date: 2026-10-06
Requirements baseline: `docs/spec/requirements/07-approval.md`のCurrent Product-owner-approved Baseline

## Purpose

掲載範囲・サイト方針、任意の利用者Login・登録、券面画像確認・承認、記事Draft編集・承認をHigh-fidelity UI-only Mockでまとめて検証する。

## Routes

- `/policy`: SCR-PUB-010 / UF-008
- `/account/login`: SCR-ACC-001 / UF-009
- `/ops/card-images`: SCR-OPS-004 / UF-OPS-002
- `/ops/articles`: SCR-OPS-005 / UF-OPS-003

## Implemented interactions

- Coverage集計単位、未対応範囲、算定、更新、訂正、Affiliate、免責を表示する。
- Login／登録切替、メール確認、Password再設定、Google同一メール自動統合防止、唯一のLogin方法を失う解除防止を表示する。
- 券面候補の許諾・条件・alt・履歴確認、Draft保存、承認Block、却下、MFA込み再認証を操作できる。
- 記事生成metadata、本文編集、安全性Validation、二軸配置再検証、別承認、MFA込み再認証、監査表示を操作できる。

## UI-only boundary

- 合成Fixture、CSS抽象券面、React Memoryだけを使用する。
- 実Coverage、実認証、OAuth、メール送信、AI取得・生成、実Asset、CMS、外部公開、永続化、Analyticsを実装しない。
- Query、View Model、固定日、合成数値を本番Data Contractまたは実Factへ昇格しない。

## Screenshots

Production Buildから各画面のDesktop 1440×1000とMobile 393×851を取得した。

- Policy: `policy-desktop.png` `ebcc25a421a16b4292ff1117ae42f28097af578910c1738c8c7ef6d1d8a23ceb` / `policy-mobile.png` `510d3c6351150fb8c8f53efafe2373921bcbba3dbb25f31e8174681001705cd2`
- Account: `account-login-desktop.png` `b026d2108752c9bdb49912fdc68b41b336d957b6889fbbb77f3690dfa96e59f1` / `account-login-mobile.png` `e727568607d688c963a015493eddcf8eb2c63da2c59d624365c95dbe798ac724`
- Image: `card-images-desktop.png` `a0ee98673734f1b09ef09e477a4b253bdc560061e678cd74d4a597ad2c13eeea` / `card-images-mobile.png` `ed8cb8ff9d5e9df701f94631878b60c25f71b69e149fdf1bc75146e22ae1a34f`
- Article: `article-draft-desktop.png` `d1e0d50c612cf377f1e5cf5549b8ad8cccec8853a7ccbb553c1a14bd96f345ff` / `article-draft-mobile.png` `1abe12b52b2af83d6ad7a528fc40339fab99b6a9d3f0166436b7c9eefc4ea97b`

Directory: `docs/design/ui/mocks/screenshots/ui-v1.0-batch/`

## Verification

| Check | Result |
|---|---|
| `npm run quality` | Pass |
| 対象Playwright | 12 / 12 Pass（Desktop Chrome／Mobile Chrome） |
| 全Playwright | 174 Pass / 6 Skip / 0 Fail |
| axe | 4画面のDesktop／Mobileで違反0件 |
| 横Overflow | 4画面のDesktop／Mobileでなし |
| Security / persistence | 危険Content拒否、許諾Block、再認証、再読込でMemory消去を確認 |
| Production Screenshot | 4画面 × 2 Viewportを確認 |
| `npm run security:secrets` | Pass、Leak 0 |
| 依存監査 | Lockfile・依存変更なしのため対象外 |

UI code/test scope manifest hash: `c459a5d0913572abc56c92c33dd56b14f9c76353c65b7d6dfa5ca5b8374db029`

## Traceability

- SCR-PUB-010 / UF-008 / UIR-COVERAGE-001: FR-019、FR-027、AC-015、AC-019、AC-038、NFR-LEGAL-001〜002
- SCR-ACC-001 / UF-009 / UIR-AUTH-001: FR-001、FR-010、AC-001、AC-003、NFR-SEC-001
- SCR-OPS-004 / UF-OPS-002 / UIR-OPS-006: FR-035、AC-027、AC-040、NFR-SEC-003、NFR-SEC-007
- SCR-OPS-005 / UF-OPS-003 / UIR-OPS-007: FR-008、FR-009、FR-031、FR-039、AC-016、AC-040、NFR-SEC-008

## Promotion boundary

Human UI Approval後、Feature Specification作成後かつTechnical Plan確定前に、UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。認証・承認・公開・保持・Coverageの合成状態を本番契約へ無条件に昇格しない。
