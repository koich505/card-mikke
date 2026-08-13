# UI Mock Approval — Card detail v0.2

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）
- UI Mock: `docs/design/ui/mocks/ui-v0.2-card-detail.md`
- UI code version / Commit: Card detail scope manifest hash `c230984525f878079363a8fea001770306d199e2f149663ed2fa897f4427ae00`（未Commit差分を含む。Mock文書記載のCommandで再現）
- Screens: SCR-PUB-003、SCR-PUB-005、Card detail Loading／Not Found
- Flow: Search result → Card detail → Review投稿・自動判定・通報 → Related Card / Search result return

## Human confirmation scope

- Desktop／Mobileの視覚階層と情報密度
- CSS合成券面Slideshowと金属製表示
- 初年度／通常年、年会費、確定／抽選Campaign、算定対象外の理解可能性
- Point Program、年間利用特典、Benefit、Insurance Coverageの区別
- Partial、Under review、Review 0件、Not Found、Review投稿・自動判定・通報受付の状態表現
- UI-only境界、広告表示、外部送信・遷移を行わない仮Interaction

## Approved hypotheses


## Known minor findings accepted


## Remaining open questions


## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Fixture、暫定型、合成計算、仮Interactionは無条件に本番へ昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は人間だけが記入する。
