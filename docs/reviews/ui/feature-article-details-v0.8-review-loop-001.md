# UI Review Loop — Feature article details v0.8

Review target: SCR-PUB-007 用途別記事、SCR-PUB-008 単一カード特集、UF-006、UIR-ARTICLE-DETAIL-001〜003

## Attempt 1

Three independent read-only reviewers checked requirements/flow, frontend/accessibility, and evidence/security.

Result: Fail

- Critical: 0
- Major: 4 consolidated findings
- Minor: 2
- Open Question: 0

### Major findings and resolution

1. Disclosure StatusをSource単位で表示し、複数責任主体を1 Sourceへ集約していた。
   - Resolution: Sourceを責任主体・文書単位へ分割し、claim ID、claim単位のDisclosure Status、確認日、適用期間を表示する構造へ変更した。
2. 適用期間へ変更確認状態を格納していた。
   - Resolution: 合成適用期間と`change-under-review`を別フィールド・別表示へ分離した。
3. 広告開示はあるが模擬申込Actionが存在しなかった。
   - Resolution: 開示近傍へ外部遷移・送信・保存を行わない明示的な申込Buttonと`role="status"`の結果表示を追加し、URL不変をBrowser Testへ追加した。
4. Verification記録と2画面×2 ViewportのScreenshotが不足していた。
   - Resolution: quality、対象Playwright、Secret scan、回帰結果、Keyboard、Screenshot hashをMock文書へ記録し、4枚を現行Sourceから再生成した。

### Minor findings and resolution

1. 記事Not Foundの戻り先が`/#articles`だった。
   - Resolution: `/articles`へ変更し、Browser Testを追加した。
2. UI RequirementsのStatusと更新日がv0.8を反映していなかった。
   - Resolution: Statusと更新日を更新した。

## Attempt 2

Result: Fail

- Critical: 0
- Major: 2 consolidated findings
- Minor: 0
- Open Question: 0

### Major findings and resolution

1. 用途別記事の単一Affiliate Actionでは、3候補それぞれの対象カード、Application Route、条件差の対応を識別できなかった。
   - Resolution: 候補ごとに対象カード、合成Application Route、条件差と補足を表示し、各模擬Actionを分離した。用途別記事でもURL不変、状態通知、外部遷移・送信・保存なしをBrowser Testへ追加した。
2. 単一カード特集の変更点では基本還元の差分候補と記載する一方、変更確認中のEvidenceはカテゴリ追加還元を対象としていた。
   - Resolution: 変更点をカテゴリ追加還元の対象外条件へ整合させ、同一Source内の対象claim、一部開示、変更確認中表示をBrowser Testで確認した。

## Attempt 3

Result: Pass

- Critical: 0
- Major: 0
- Minor: 0
- Open Question: 0

### Resolution confirmation

- Requirements reviewer: 用途別記事の各候補について、対象カード、合成Application Route、条件差、個別模擬Actionの対応とBrowser Testを確認した。
- Evidence / Security reviewer: 変更点と対象claimの整合、claim単位のDisclosure Status、責任主体別Source、期間と確認状態の分離、UI-only境界を確認した。
- Frontend / Accessibility reviewer: Desktop／Mobile、視覚階層、Semantic HTML、Keyboard、axe、横Overflow、Production Screenshotを確認した。

### Final verification

- `npm run quality`: Pass
- 対象Playwright: 20 / 20 Pass
- 全UI回帰: 144 Pass / 6 project-scope Skip
- Secret scan: Leak 0
- `git diff --check`: Pass
- Production Screenshot: 2画面 × 2 Viewport、記録済みSHA-256と一致
- Scope manifest: `c3f6d953e2e45ba1cbd0cc9c6216b0799f82b06027030fb45fc3dacfae9bac5f`

Independent reviewは完了した。HumanによるUI Mock Approvalは未実施であり、承認記録の承認者・承認日・承認状態は空欄のまま引き渡す。
