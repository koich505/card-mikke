# UI Mock v0.2 — Card detail

Status: In progress; human UI Mock Approval pending

Created: 2026-08-11

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-10 Approved）

UI code: `apps/web/` working tree（未Commit）

## Purpose

検索ページの黄・紺・赤、太い枠線、丸み、親しみやすいToneを継承し、カード詳細で券面、金額、条件、特典、保険、Review、情報鮮度を誤認なく確認できるかをHigh-fidelity UI-only Mockで検証する。

## Implemented routes and states

- `/cards/everyday-plus`: 通常状態、券面3種、複数Point Program、複数Campaign、年間利用特典、Reviewあり。
- `/cards/travel-step`: 変更確認中、金属製を含む券面2種、有料年会費、Lounge、旅行保険。
- `/cards/smart-basic`: 算定不完全、Review 0件、Campaign Empty、ETC情報Unknown。
- `/cards/<unknown>`: Card detail専用Not Found。
- Route transition中: Card detail専用Loading skeleton。
- 有効な検索Query経由: 検索条件と合成試算額を検索結果・詳細・関連Card・検索への戻りで共有。
- 無効または未知のQuery: 無視して対象Cardの`標準試算例`へFallback。

Traceability: SCR-PUB-002、SCR-PUB-003、SCR-PUB-005、UIR-DETAIL-001〜008、UIR-G-003〜004、UIR-A11Y-001、UIR-RESP-001

## Screen structure

1. CSS合成券面Gallery、Card名、発行会社、年会費、基本還元、申込状態、横スライド式Campaign、初年度／通常年試算、申込CTA。
2. 単一表示領域を切り替えるTab Navigation。
3. 初期表示のおトク試算。
4. Point Program・還元Rule。
5. 入会／期間限定Campaignと年間利用特典。
6. 年会費・手数料・家族Card・ETC Card。
7. 非金銭Benefit、Lounge、Insurance Product／Coverage。
8. 申込条件、受付Route、決済、Security。
9. Reviewと掲載方針。
10. 情報の根拠、確認日、適用期間、確認状態、関連Card。

重要な年会費、還元、申込状態、確認日、注意事項はHeroへ常時表示する。詳細情報は1つのTab Panelだけを表示し、選択したTabに応じて内容を切り替える。各Panel内の補足条件だけを`details`で開閉する。審査難易度・通過予測は表示しない。

## UI-only View Model and calculation

- `PrototypeCardDetailViewModel`、`PrototypeSearchScenario`は表示検証専用の暫定型であり、Domain Entity、DB Model、API Contractではない。
- `cardFaces[]`、`feeRules[]`、`rewardPrograms[]`、`rewardRules[]`、`campaigns[]`、`annualBenefits[]`、`benefits[]`、`insuranceProducts[].coverages[]`等を複数保持する。
- 合成試算は通常Point、カテゴリ追加還元、金銭額を持つ年間利用特典、確定Campaign、本会員年会費だけを対象にする。
- 詳細の「おトク試算」では、検索・プロフィール相当条件または標準試算例を初期値にし、年間／月間利用額と使い道別金額を変更できる。月間入力は年額へ換算し、検索と同じ`calculatePrototypeCard`で再試算する。
- 家族・ETC任意費用、抽選Campaign、非金銭Benefit、Insurance、未確認条件は算定外として明示する。
- Queryは既知のProfile、Category、`default`のScenario種別、0〜100,000,000円の整数だけを受理し、カテゴリ配分合計が年間利用額を超える場合はScenario全体を無効とする。
- Canonical URLはQueryを含めない。

## Interaction and safety boundary

- 券面は前後Button、Thumbnail、Keyboardで選択し、自動再生しない。
- HeroのCampaignは複数件を横スライドで1件ずつ表示し、前後Button、Indicator、左右Swipeで選択する。自動再生しない。
- CSS合成券面、架空名称、合成Fixtureだけを使用する。
- 申込CTA、Review投稿・通報は説明Statusを表示するだけで、外部遷移・送信・保存しない。
- 詳細内のカスタム試算もBrowser Memory内だけで完結し、プロフィール更新や永続化を行わない。
- DB、API、認証、Analytics、外部通信、本番Business Logicは実装していない。

## Screenshots

- Desktop 1440×1000: `screenshots/ui-v0.2-card-detail/card-detail-desktop-1440x1000.png`
- Mobile 390×844: `screenshots/ui-v0.2-card-detail/card-detail-mobile-390x844.png`

Screenshotは上部Hierarchy確認用であり、操作可能なSource of Truthは`apps/web/`である。

## Verification

| Check | Result |
|---|---|
| 3 Cards direct access | Pass |
| Search Query restore / result-to-detail / related Card | Pass |
| Invalid Query fallback | Pass |
| Loading / Campaign Empty / Review 0 / Partial / Under review / Not Found | Pass |
| Slideshow Pointer / Keyboard / current position / accessible name | Pass |
| Desktop 1440×1000 | Pass |
| Mobile 390×844 | Pass |
| Browser console Error | 0件 |
| `npm run quality` | Pass |
| 変更対象Source／UI文書のSecret scan | Pass、no leaks found |
| Repository全体のSecret scan | Fail、既存`docs/research/`内の署名付きSource URL 18件を検出。今回の変更外のため未編集 |
| `git diff --check` | Pass |

Repository全体のSecret scanは今回の差分に含まれない既存Research文書を検出する。検出値は画面・Fixture・Screenshotへ含まれず、変更対象の`apps/web/src`と`docs/design/ui`は個別ScanでPassしている。

## Human feedback requested

- Heroで券面、年会費、還元、入会特典、試算、CTAの優先順位を判断しやすいか。
- 情報量の多い詳細を単一Tab Panelへ切り替える構成が探しやすいか。
- Point Program、Campaign、年間利用特典、Benefit、Insuranceの違いを理解できるか。
- Mobileで券面から主要情報へ進む長さと情報密度が適切か。
- 未確認、変更確認中、合成Fixtureの表現が十分に目立つか。

## Approval boundary

人間による確認前のため未承認である。承認者、承認日、`UI Mock Approved`は`docs/design/ui/approvals/ui-mock-card-detail-v0.2.md`で空欄のまま保持する。
