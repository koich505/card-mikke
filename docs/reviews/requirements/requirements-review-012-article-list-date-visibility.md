# Requirements Review 012: 特集記事一覧の日付表示方針

Review target: FR-041 / AC-043 / RD-037、UIR-ARTICLE-LIST-002およびUI Mock v0.6

Scope reviewed: 通常記事の一覧では日付を表示せず、更新確認中の記事だけ一覧と記事詳細で最終確認日および公式Source確認の案内を示す方針

Checks/evidence used:

- FR-031、FR-041
- AC-043
- RD-037
- `docs/design/ui/04-ui-requirements.md` — UIR-ARTICLE-LIST-002
- `docs/design/ui/mocks/ui-v0.6-article-list.md`
- 独立Requirements Reviewerによる修正前後のread-onlyレビュー

Reviewer: Requirements Reviewer（独立read-only）

Result: Pass with tracked Open Question

Findings:

- 初回Major: UI Mock v0.6に通常記事でも公開日・更新日・最終確認日を読み分ける旧方針が残っていた。
  - Disposition: 修正済み。通常記事では日付を表示せず、更新確認中だけ最終確認日と公式Source確認の案内を示す方針に統一した。
- ID: REQ-ART-012
  Severity: Open Question
  Location: `docs/spec/requirements/05-open-questions.md` — RQ-043
  Requirement / risk: 記事検索の初期・増加時性能試験量は未決である。
  Owner: Product owner
  Due / resolution gate: Architecture Planning前
  Blocking: Yes

Summary:

- Critical: 0
- Major: 0
- Minor: 0
- Open Question: 1（RQ-043、既存）
