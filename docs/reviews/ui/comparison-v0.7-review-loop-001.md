# Comparison v0.7 Review Loop 001

Status: Independent review complete / Human UI approval pending  
Date: 2026-10-06  
Base revision: `5d116ff1526360e6a7bb616da1b4d8670a432c30`  
Review target: uncommitted working tree（Agentはcommitしない）
Artifact manifest: `docs/reviews/ui/comparison-v0.7-artifact-manifest.sha256`  
Manifest SHA-256: `5b06f9c16c147c20d6daae422f749966ddb74569fab41d5dc8b19cd5b104f90f`

## Attempt 1

Independent reviewers:

- Requirements / UI correctness
- Frontend quality / accessibility / responsive / SEO
- Evidence / content / security

Result: Critical 0。重複を統合したMajor論点は次の8系統。

1. カード名・通常年金額・項目名のStickyが実Scrollで成立しない。
2. Variantが表示モデルから欠落する。
3. 5枚比較と6枚目拒否を操作・検証できない。
4. Partial Dataで表と詳細の信頼境界が一致しない。
5. 算定不完全、Disclosure Status、変更確認中の影響が閉じた領域または内部値のままになる。
6. Modal DialogからFocusが背景へ漏れる。
7. 全面Error、長文、Desktop Accessibility、Metadata / noindex等の状態・検証が不足する。
8. Requirements / Code / Screenshot revisionの追跡情報がない。

Security固有では、既存依存のCritical 1 / High 8と、既存調査文書に期限切れ署名付きURL 18件を確認した。

## Attempt 1 resolution

- 比較領域へ明示的な高さを与え、Headerに通常年金額を追加。表内縦横Scroll時のStickyをBrowser Testで検証。
- 券面名、国際ブランド、Grade、素材、選択条件をVariantとして表示。
- UI検証用合成カードを追加し、2 / 3 / 5枚と6枚目拒否、長い商品名を検証。
- Partial対象カードの金額、比較値、内訳、Evidenceを一貫して未取得表示。全面Error / Retryも追加。
- Claimを`value + disclosureStatus + evidence + confirmedOn + effectivePeriod`で保持。4状態を日本語化し、Campaign Instanceと4期間を分離。
- 商品情報状態とScenario固有の算定状態を分離。過小評価、順位変動、変更確認中の影響を常時表示。
- Native modal dialogと明示的なTab循環、Escape、Focus復帰を実装。
- `/search`を`noindex`とし、比較状態のDocument Titleを追加。
- Requirements / Code / Screenshot revisionをMock説明とApproval Templateへ記録。
- 期限切れ署名付きURLから一時認証Queryだけを除去し、参照パスと文書内容を保持。
- Next.js / eslint-config-nextを16.3.0から16.3.8へ更新。CriticalとProduction依存のHighを解消。

## Deterministic checks after resolution

- `npm run quality`: Pass
- `CARD_MIKKE_TEST_PORT=3115 npm run test:ui -- tests/comparison.spec.ts`: 8 Pass / 6 Project-scope Skip
- Desktop / Mobile Chrome axe: 0 violations
- Desktop / Mobile Page Overflow: 0
- `git diff --check`: Pass
- `npm run security:secrets`: Pass、Leak 0
- `npm audit --omit=dev --audit-level=high`: Pass、Production依存の脆弱性0件
- Full UI suite: 109 Pass / 6 Scope Skip / 1 existing Operations parallel flake
- Flaky Operations Session test isolated with `--workers=1`: Desktop / Mobile 2 Pass

## Dependency audit disposition

Full `npm audit`に残るHighは`eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces@3.0.3`の開発時Glob解析経路である。開発依存を除外した`npm audit --omit=dev`では0件で、配信Bundleや利用者入力の処理経路には含まれない。現在の入力はRepository内で管理する静的Lint対象だけである。

- Advisory: `GHSA-vfj7-8cjw-p6xm`
- 影響Version: `braces <= 3.0.3`
- 現在Version: `braces 3.0.3`（`eslint-config-next 16.3.8`の開発依存経路）
- Owner: Tooling Maintainer
- 再確認期限: Gate 4開始前。修正版提供状況とFull auditを再確認する。

本記録はUI Mock段階の影響評価であり、本番昇格時に未修正版を無条件に許容する例外ではない。修正版の提供状況をGate 4で再確認し、非該当説明が維持できない場合は更新またはHuman承認済み例外を必要とする。

## Attempt 2

Independent re-review result: Critical 0 / Major 7 / Minor 5 / Open Question 0（3名のFindingを重複を含めて計数）。

Major:

1. Partial状態と差分Filterの不整合、およびHeaderの商品情報状態に保持値が残る。
2. Reward Program、申込経路、家族・追加カード、ETCカードのClaim別Timelineが不足する。
3. CodeとScreenshotを同一対象へ固定するArtifact fingerprintがない。
4. 比較密度用FixtureがTopのFeatured表示へ混入し、検索結果件数表示とも不整合になる。
5. Modal Focus trapが不安定で背景へFocusが漏れる。
6. 個別解除後にFocusが`BODY`へ移る。
7. 検索結果への復帰後にFocusが`BODY`へ移る。

Minor:

1. 2枚の下限境界を明示的にAssertしていない。
2. Mobile Screenshotの取得条件と実PNG寸法が一致しない。
3. Variant固有DisclosureにEvidence未設定のまま`partially_disclosed`を割り当てる。
4. 開発依存Auditの説明に除外方向の誤記があり、Advisory・Owner・期限が不足する。
5. Mobileの静的証跡でカード操作と比較行を確認できない。

## Attempt 2 resolution

- Partial対象は差分Filter、Header、表、詳細を一貫して取得失敗表示にした。
- Reward Program、申込経路、家族・追加カード、ETCカードをClaim別Timelineへ追加し、開示状態、確認日、適用期間、Evidenceを表示した。
- 比較専用Fixtureを検索結果へ限定し、Top Featuredを3枚へ維持。検索結果見出しは実件数へ同期した。
- 2枚下限をTestで明示し、Variant固有Evidence未設定は`unknown`として明示した。
- Modal表示後の遅延Focus競合を除去し、先頭・末尾ButtonでTabを循環。3周の双方向操作、Escape、起点復帰を10回反復した。
- 個別解除後は次の表示中カード操作へ、検索結果復帰後は結果見出しへFocusを移した。Desktop / Mobile双方で検証した。
- Mobileのカード操作と比較行を390×844、DPR 1で再取得した。
- 対象Source、Test、関連Document、ScreenshotのSHA-256 Manifestを作成し、Mock説明、Approval Template、本記録で同じManifest hashを参照した。
- 開発依存AuditへAdvisory、影響Version、現在Version、Owner、Gate 4再確認期限を記録した。

## Deterministic checks after Attempt 2 resolution

- `npm run quality`: Pass
- `CARD_MIKKE_TEST_PORT=3124 npx playwright test tests/comparison.spec.ts --workers=1`: 10 Pass / 6 Project-scope Skip
- Modal Focus反復: 10 / 10 Pass
- Desktop / Mobile Chrome axe: 0 violations
- Desktop / Mobile Page Overflow: 0
- `npm audit --omit=dev --audit-level=high`: Pass、Production依存の脆弱性0件

## Attempt 3

Independent reviewers:

- Requirements / UI correctness: Pass
- Frontend quality / accessibility / responsive / SEO: Pass
- Evidence / content / security: Pass

Result: Critical 0 / Major 0 / Minor 0 / Open Question 0。

全ReviewerがAttempt 1 / 2のFinding解消を確認した。途中で検出したArtifact Manifest不一致は、既存Copy互換を戻した2ファイルのSHA-256を更新し、全27エントリの再照合後にResolvedとなった。

Final deterministic checks:

- `npm run quality`: Pass
- Comparison Playwright: 10 Pass / 6 Project-scope Skip
- Modal Focus反復: 10 / 10 Pass
- 関連回帰（Account history / Comparison / Search save）: 30 Pass / 6 Project-scope Skip
- Artifact Manifest全27エントリ: Pass
- `git diff --check`: Pass
- `npm run security:secrets`: Pass、Leak 0
- `npm audit --omit=dev --audit-level=high`: Pass、Production依存の脆弱性0件

Repository全体では、比較機能と独立した既存Operations Session testの不安定さが残る。比較対象の変更で発生した検索Copy互換の失敗は最新Buildで関連回帰30件を再実行し、すべて解消した。

本Review Loopの技術的完了条件は満たした。UI Mock Approval欄は方針どおり未記入であり、Human承認を次のGateとする。

## Post-review UI adjustment

2026-10-06のHuman指示により、Desktop比較表の固定高と内部縦Scrollを削除した。比較項目はページ上へすべて縦展開し、3〜5枚で幅が不足する場合の横Scrollだけを維持する。比較Playwrightは更新後に10 Pass / 6 Project-scope Skip、`npm run quality`はPass。Desktop ScreenshotとArtifact Manifestを同じ変更へ更新した。
