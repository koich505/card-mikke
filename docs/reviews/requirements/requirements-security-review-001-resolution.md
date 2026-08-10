# Requirements Security Review 001 Resolution

Status: Ready for re-review  
Last updated: 2026-08-10

## Disposition

| Finding | Resolution | Evidence |
|---|---|---|
| SR-001 | Resolved in requirements | 管理者専用・非共有Account、管理者MFA、認証変更通知、Session確認・失効、無操作30分、最長12時間、高Risk操作の15分以内再認証、CSRF等の検証を必須化。NFR-SEC-001、NFR-SEC-003、AC-040 |
| SR-002 | Resolved in requirements | 通常管理機能から変更・削除できない監査記録、欠落・改変検知、Actor・時刻・対象・変更前後・結果・承認の記録を必須化。NFR-SEC-007、AC-032 |
| SR-003 | Resolved by Product owner decision | 管理者のみMFA必須を採用。一般利用者は初期ReleaseではMFAを必須にしない。RD-028 |

## Scope note

初期Releaseの単一管理者Roleは維持する。専任の不正防止Roleを設けない判断は、管理者Account保護および監査証跡保護を省略する根拠にはしない。
