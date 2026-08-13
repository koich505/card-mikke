# UI Review: 特集記事一覧 v0.6

Review target: `apps/web/src/app/articles/` と関連する記事詳細・Navigation・Fixture・UI文書

Scope reviewed: FR-041 / AC-043、FR-031の更新確認中表示、Desktop／Mobile、Keyboard、Accessibility、UI-only境界

Checks/evidence used:

- `npm run quality`（format、lint、typecheck、build）: Pass
- `CARD_MIKKE_TEST_PORT=4316 npx playwright test tests/article-list.spec.ts --workers=1 --reporter=list`: Pass（Desktop／Mobile 合計8件）
- axe-coreによる特集記事一覧の自動Accessibility検査: Pass
- 独立UI Reviewerの再レビュー: Pass
- `npm run security`: 未完了。指定された`.tools/gitleaks`がworktreeに存在せず、Secret scan開始前に停止したため、依存脆弱性監査も未実行。
- `npm audit --audit-level=high`: Sandbox内ではnpm registryの名前解決に失敗。外部registryへの依存関係metadata送信を伴う再実行は許可されなかったため、未実行として扱う。

Reviewer: UI Reviewer（独立read-only）

Result: Pass with non-blocking verification limitation

Findings:

- ID: UI-SEC-001
  Severity: Open Question
  Location: `apps/web/package.json#security:secrets`、`docs/architecture/decisions/ADR-0001-provisional-frontend-bootstrap.md`
  Requirement / risk: UI-only工程でSecret scanと依存脆弱性確認を行う必要があるが、Project-local Gitleaks binaryが未導入のため再現できない。
  Evidence: `npm run security` は `.tools/gitleaks: No such file or directory` で停止。
  Impact: 今回の変更範囲でSecret scanおよび`npm audit`の結果を確認できない。
  Required resolution: ADR-0001の導入手順に従い、検証済みGitleaksを`apps/web/.tools/`へHuman承認のもと導入し、Secret scanを再実行する。依存脆弱性監査は、外部registryへのmetadata送信をHumanが承認した場合だけ実行する。
  Owner: Product owner / Tooling maintainer
  Disposition: clarify
  Due / resolution gate: UI Mock Approval前
  Blocking: No

Summary:

- Critical: 0
- Major: 0
- Minor: 0
- Open Question: 1
