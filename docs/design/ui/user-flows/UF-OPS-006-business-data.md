# UF-OPS-006 — 業務情報管理

Status: Implemented in UI Mock v1.1
Date: 2026-10-06
Traceability: FR-032、NFR-MAINT-001、AC-018、AC-040、SCR-OPS-008、UIR-OPS-010

## Goal and flow

1. 追加・訂正・無効化候補を選び、Domain対象と関係を確認する。
2. 値、Source識別子、適用時期、変更理由を安全なPlain Textで編集する。
3. 変更Draftを保存し、変更前後と追跡関係を確認する。
4. 再認証後に承認または無効化を確定し、編集と承認を別Eventとして確認する。

無効化で過去履歴を削除せず、追加候補を無効化しない。Application code、本番Data、外部Service、永続化は変更しない。
