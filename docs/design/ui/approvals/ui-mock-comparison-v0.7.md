# UI Mock Approval — Comparison v0.7

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/02-functional-requirements.md`（FR-016、FR-029）
- Acceptance Criteria: `docs/spec/requirements/04-acceptance-criteria.md`（AC-012）
- Requirements revision: `5d116ff1526360e6a7bb616da1b4d8670a432c30`
- UI Mock: `docs/design/ui/mocks/ui-v0.7-comparison.md`
- UI code revision: uncommitted working tree based on `5d116ff1526360e6a7bb616da1b4d8670a432c30`
- Screenshot revision: 2026-10-06の同一working tree
- Artifact manifest: `docs/reviews/ui/comparison-v0.7-artifact-manifest.sha256`
- Manifest SHA-256: `5b06f9c16c147c20d6daae422f749966ddb74569fab41d5dc8b19cd5b104f90f`
- Screen: SCR-PUB-004
- Flow: UF-001 Step 8〜10、UF-003の比較再表示

## Human confirmation scope

- Desktopの全項目縦展開、追従項目、比較領域内の横Scroll
- Mobileの項目別縦表示、差分表示、個別解除・入替
- 通常年・初年度、算定完全・不完全・変更確認中の区別
- 必須比較項目、算定内訳、対象外項目、仮定、Evidence、確認日・適用期間
- Loading、一部取得失敗、全面取得失敗、再試行、比較対象不足
- 2枚・3枚・5枚、6枚目拒否、長文、Desktop全項目縦展開・横Scroll、Mobile縦表示
- 全解除確認、取消時のFocus復帰
- Tab / Shift+Tab / Escapeを含むModal Focus管理
- 4つのDisclosure Status、Claim別確認日・適用期間、Campaign Instanceと各期間
- UI-only境界、合成Fixture、外部送信・永続化を行わないこと

Screenshot SHA-256:

- Desktop: `5768af42bc2d88a5461c3be38ec60b1034732900d6f2e5677094e6fd80f69d07`
- Mobile card operations: `0b5520f57b92f3e241608e1443ced663e293c3ec26c897352476269507374e51`
- Mobile comparison rows: `9809c97d3115f2e0c1a6fe0b9304c2532cd6311cfde5acfb3bba0e3664dae8eb`

## Approved hypotheses

## Known minor findings accepted

## Remaining open questions

## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Fixture、暫定表示モデル、UI-only計算、状態再現Controlを本番へ無条件に昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は人間だけが記入する。
