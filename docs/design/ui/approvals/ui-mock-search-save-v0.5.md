# UI Mock Approval — Search Save v0.5

Status: Pending

- Requirements baseline: 2026-08-13 approved baseline / Requirements Review 010 Pass
- UI version: `ui-v0.5-search-save`
- Screens: SCR-PUB-003、OVL-008
- Flow: UF-001 A-3
- Approver:
- Approval date:
- UI Mock Approved:

## Approval Scope

- 検索結果からの明示保存
- 概要入力、Validation、保存中、成功、失敗、再試行、取消
- Desktop／Mobile、Keyboard、Focus、支援技術通知

## Open Questions

- RQ-042: 本番の文字数上限、同名の扱い、保存後の概要編集可否

## Promotion Boundary

Feature Specification後、Technical Plan確定前にUI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Browser Memory保存、失敗切替、暫定50文字・同名可を本番へ無条件に昇格させない。
