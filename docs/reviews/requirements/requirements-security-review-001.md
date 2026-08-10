# Requirements Security Review 001

Review date: 2026-08-10  
Review target: `docs/spec/requirements/` Security / Privacy and RQ-020  
Reviewer: Independent Security Reviewer `/root/requirements_security_review_001`  
Result: Fail

## Findings

### SR-001

- Severity: Major
- Location: NFR-SEC-001、NFR-SEC-003、FR-022、FR-032、RQ-020
- Requirement / risk: MFAなしの単一管理者Accountに対し、高Risk操作の本人再認証、管理者認証変更通知、Session確認・一括失効、専用管理者Account、アイドル失効等が不足している。
- Impact: 単一CredentialまたはSessionの侵害で、不正公開、Affiliate Link改変、利用者データ操作、Moderation改変が可能になる。
- Required resolution: MFA、または専用Account・再認証・通知・Session管理・アイドル期限・CSRF等の代替統制と残存Risk判断を追加する。
- 戻し先: Requirements / User

### SR-002

- Severity: Major
- Location: NFR-SEC-007、FR-022、FR-032
- Requirement / risk: 監査記録の管理者による変更・削除禁止、欠落・改変検知、完全性要件がない。
- Impact: 侵害後に証跡を消去できると、異常検知、影響確認、復旧に利用できない。
- Required resolution: 通常管理機能からの監査記録編集・削除禁止、欠落・改変検知、主体・時刻・対象・変更前後・成否の追跡をRequired要件とACへ追加する。
- 戻し先: Requirements

### SR-003

- Severity: Open Question
- Location: RQ-020、NFR-SEC-001、NFR-SEC-003
- Requirement / risk: 代替統制後も残るフィッシング・Password・メールAccount侵害Riskを受容するか未決である。
- Required resolution: 管理者MFA、MFAなしの初期Release限定例外、または管理権限縮小からProduct ownerが選択する。
- Owner: Product owner
- Disposition: clarify
- Due / resolution gate: Requirements Approval前
- Blocking: Yes
- Human approval / exception reference: MFAなしの場合は必須

## Summary

- Critical: 0
- Major: 2
- Minor: 0
- Open Question: 1
- Result: Fail
