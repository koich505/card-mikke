# UI Review Loop — Moderation / Correction / Business Data / Account Prompt v1.1

Review target: SCR-OPS-006、SCR-OPS-007、SCR-OPS-008、OVL-007、UF-OPS-004〜006、UF-010

## Attempt 1

独立した要件、Frontend、Privacy/Securityレビューを実施。

- 要件: Fail（Critical 0 / Major 4 / Minor 1）
- Frontend: Fail（Critical 0 / Major 3 / Minor 2）
- Privacy/Security: Pass
- 主な修正: 個別通報表示、案件別Audit、record別変更前、明示的無効化候補、動的件数、保存Dialog Focus循環、状態別tone、Production Gate準備。

## Attempt 2–4

同じレビュアーで修正・再レビューを反復。

- Review現在状態の固定表示をstate導出へ修正。
- 自由記述のAudit複製を廃止し、機微情報の補助検出・拒否と非監査境界を追加。
- 必須の構造化理由カテゴリを追加し、案件別Auditへ記録。
- Review Action、訂正Outcome、業務情報候補種別と理由カテゴリの許可Matrixを実装。不一致はBlock、reset、disabledで防止。
- 不要な個人情報の入力禁止とClient検出範囲を分けて明記。

## Final review

- Requirements: Pass（Critical 0 / Major 0 / Minor 0 / Open Question 0）
- Frontend/UI: Pass（Critical 0 / Major 0 / Minor 0 / Open Question 0）
- Privacy/Security: Pass（Critical 0 / Major 0 / Minor 0 / Open Question 0）
- 対象Playwright: 18 / 18 Pass
- 全Playwright: 186 Pass / 6 Skip / 0 Fail
- `npm run quality`: Pass
- `npm run security:secrets`: Pass / Leak 0
- `git diff --check`: Pass
- Production screenshots: Desktop／Mobile 8枚を採取・目視確認
- Scope manifest: `629a849fb8461db26c5f434ca1db7f1268e70a83a62f927a97f6cfdc7a69281b`

未完了はHuman UI Approvalのみ。Approval recordの承認者・承認日・承認状態は意図的に空欄のまま保持する。
