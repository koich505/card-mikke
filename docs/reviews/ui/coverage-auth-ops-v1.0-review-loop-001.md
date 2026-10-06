# UI Review Loop — Coverage / User Auth / Image & Article Operations v1.0

Review target: SCR-PUB-010、SCR-ACC-001、SCR-OPS-004、SCR-OPS-005、UF-008、UF-009、UF-OPS-002、UF-OPS-003

## Attempt 1

Result: Fail

- Requirements: Critical 0 / Major 7 / Minor 0 / Open question 0
- Frontend: Critical 0 / Major 4 / Minor 2 / Open question 0
- Privacy / security: Critical 0 / Major 2 / Minor 1 / Open question 0

Consolidated findings and resolution:

1. UF／Mockの要件IDと記事生成失敗・再試行が不足。
   - 全UFとMockへTraceabilityを追加し、生成失敗→未公開維持→再試行を操作化した。
2. Policyに利用規約、Privacy、編集方針が不足。
   - 専用Sectionと目次を追加した。
3. Google同一メール連携・解除拒否が説明だけだった。
   - 同一メール検知→既存Login／本人確認→連携→解除と、Googleのみの場合の解除拒否を操作化した。
4. 券面の候補別状態、承認／却下terminal state、差替え・無効化が不足。
   - 候補別Memory state、再承認防止、履歴追加、公開中画像の再認証無効化を実装した。
5. 記事の評価基準・配置・除外編集と再検証Blockが不足。
   - 全項目を編集可能にし、空欄・危険Content・未検証をBlockした。
6. 記事安全性、承認後terminal state、監査Eventが不足。
   - Plain Text allowlist型Validation、危険scheme／外部URL／Markup拒否、再承認防止、保存・再検証・承認Event追加を実装した。
7. Account切替、Mobile Ops Menu、結果Focus、Validation、Reauth Accessibilityが不足。
   - Button semantics、busy中切替防止、Menu open／close Focus、Focus regionとstatus分離、`aria-invalid`、Dialog axe Testを追加した。
8. Secret scan、依存監査、noindex、Browser storage証跡が不足。
   - Secret scan結果と依存変更なし判断を記録し、robotsとCookie／storageのTestを追加した。

修正後の対象Testは12 / 12 Pass、`npm run quality` Pass。

## Attempt 2

Result: Fail

- Requirements: Critical 0 / Major 4 / Minor 0 / Open question 0
- Frontend: Critical 0 / Major 3 / Minor 2 / Open question 0
- Privacy / security: Critical 0 / Major 0 / Minor 0 / Open question 0

Resolution:

- Scheme検査をUnicode Plain Text allowlist基準へ変更し、配置の意味整合性も承認条件へ追加した。
- 編集・保存・再検証・承認を別の監査Eventとして記録した。
- 生成失敗・再試行時に保存・検証・本文確認・二軸確認をすべて失効させた。
- ReauthとAccountのErrorをfield別に関連付け、対象fieldへFocusするよう修正した。
- Menu closeとDialogのFocus復帰を自動Testへ追加した。

## Attempt 3

Result: Fail

- Requirements: Critical 0 / Major 1 / Minor 0 / Open question 0
- Frontend: Critical 0 / Major 0 / Minor 0 / Open question 0
- Privacy / security: Critical 0 / Major 0 / Minor 0 / Open question 0

文中Schemeの直前文字に依存する検出漏れが残ったため、境界条件と回帰例を追加した。

## Attempt 4

Result: Fail

- Requirements: Critical 0 / Major 1 / Minor 0 / Open question 0
- Privacy / security: Critical 0 / Major 0 / Minor 0 / Open question 0

`.`、`+`、`-`直後のScheme回避例が残ったため、前置文字に依存しないScheme token検出へ変更した。

## Attempt 5

Result: Pass

- Requirements: Critical 0 / Major 0 / Minor 0 / Open question 0
- Frontend（Attempt 3最終確認）: Critical 0 / Major 0 / Minor 0 / Open question 0
- Privacy / security（Attempt 4最終確認）: Critical 0 / Major 0 / Minor 0 / Open question 0

最終確認:

- 対象Playwright: 12 / 12 Pass（Desktop／Mobile）
- 全Playwright: 174 Pass / 6 Skip / 0 Fail
- `npm run quality`: Pass
- `npm run security:secrets`: Pass / Leak 0
- `git diff --check`: Pass
- 依存・Lockfile変更なし
