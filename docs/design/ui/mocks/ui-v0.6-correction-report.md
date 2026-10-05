# UI Mock v0.6 — Correction report

Status: Implemented; human UI Mock Approval pending

Created: 2026-08-14

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-13 Approved baseline; RQ-037 disposition pending baseline reapproval）

## Purpose

カード詳細・記事・公開画面Footerから対象を引き継ぎ、Loginなしで誤情報または変更を安全に指摘し、受付条件を理解できるかをHigh-fidelity UI-only Mockで検証する。

## Routes and entry points

- `/correction-report?targetType=card&targetId=<fixture-id>&item=<initial-item>`
- `/correction-report?targetType=article&targetId=<fixture-id>&item=<initial-item>`
- `/correction-report?targetType=page&targetId=home|search`
- カード詳細「情報の根拠」末尾、記事「記事情報と注意事項」直後に文脈付き入口を配置する。
- ホーム、検索、カード詳細、記事のFooterに現在画面を対象とする補助入口を配置する。

## Screen structure and behavior

- 対象、掲載項目、指摘内容、把握している根拠、任意メールを表示する。対象は合成Fixtureから解決し、Formでは変更しない。
- 掲載項目100文字、指摘内容1,000文字、根拠1,000文字、メール254文字を上限とする。
- Error summary、項目Error、最初の不正項目へのFocus移動、二重送信防止を含む。
- 成功時は同一画面内で`CM-MOCK-0001`を表示し、メール有無に応じた連絡条件を示す。
- 未知の対象ではFormを表示せず、元画面から開き直す案内を表示する。

## Safety boundary

- 合成Fixtureだけを使用し、入力はBrowser Memory内だけで扱う。
- 外部送信、メール送信、永続化、API、DB、認証、Analyticsを実装しない。
- 入力内容をHTMLとして表示せず、Secret、Credential、不要な個人情報を書かないよう案内する。
- 暫定Target型とFixtureをDomain Entity、API Contract、本番Data Sourceとして扱わない。

## Screenshots

- Desktop 1440×1000 input: `screenshots/ui-v0.6-correction-report/correction-report-desktop-1440x1000.png`
- Mobile 390×844 input: `screenshots/ui-v0.6-correction-report/correction-report-mobile-390x844.png`
- Desktop 1440×1000 receipt: `screenshots/ui-v0.6-correction-report/correction-report-complete-desktop-1440x1000.png`
- Mobile 390×844 receipt: `screenshots/ui-v0.6-correction-report/correction-report-complete-mobile-390x844.png`

操作可能なApplicationをSource of Truthとし、ScreenshotだけでInteractionを確定しない。

## Verification

| Check | Result |
|---|---|
| Card / article contextual target handoff | Pass |
| Home / search Footer target handoff | Pass |
| Required / whitespace / length / email validation | Pass |
| Invalid target and duplicate-submit prevention | Pass |
| Optional-email receipt conditions | Pass |
| Keyboard Focus and status notification | Pass |
| Desktop Chrome / Mobile Chrome | 20 tests Pass |
| Repository UI regression suite | 82 tests Pass |
| Horizontal overflow | Pass |
| axe automated accessibility | Pass |
| `npm run quality` | Pass |
| 変更対象Source／Test／UI文書／RequirementsのSecret scan | Pass、no leaks found |
| 依存脆弱性監査 | Pass、0 vulnerabilities |
| External send / persistence | Not implemented by design |

## Human feedback requested

- Evidenceや記事注意事項の近くにある入口が見つけやすく、主要CTAを妨げないか。
- 指摘対象を変更不可とする構成と、開き直し案内が理解しやすいか。
- Secret・個人情報の注意、メール用途、回答を保証しない説明が十分に理解できるか。
- Mobileで入力説明と文字数表示が過密でないか。

## Approval boundary

人間による確認前のため未承認である。承認者、承認日、`UI Mock Approved`は`docs/design/ui/approvals/ui-mock-correction-report-v0.6.md`で空欄のまま保持する。
