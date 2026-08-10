# Requirements Review 005

Review date: 2026-08-10  
Review target: `docs/spec/requirements/`  
Scope reviewed: AI生成二軸比較マップのRequirements変更（00、01、02、03、04、06）と既存要件・Domain境界の整合性  
Checks / evidence used: Requirements Reviewer必須文書、3つのRequirements Checklist、`git diff --check`、Requirement / AC / Traceability参照確認  
Reviewer: Independent Requirements Reviewer `/root/req_review_005`  
Result: Fail

## Findings

### RR5-001

- Severity: Major
- Location: NFR-SEC-008、FR-009、AC-016
- Requirement / risk: AI出力は未承認中の自動実行・自動公開を禁止しているが、人間の承認後に公開Contentへ変換する際の安全性検証が定義されていない。FR-009では承認後の公開が可能になる一方、Script、危険なURL scheme、Event Handler、外部埋込等を編集・承認後にも拒否または無害化する要件がない。
- Evidence: NFR-SEC-008は「未承認Text・Data」と「自動実行しない」を要求し、Verificationも未承認Draftへの限定までである。FR-009はその後の承認・公開を許可する。NFR-SEC-004の安全なText処理は公開Form・UGCが対象で、AI記事Draftを明示的に包含しない。
- Impact: Source由来のPrompt InjectionまたはAI生成誤りにより、承認済み記事を経由したStored XSS、危険Link、外部送信・埋込Contentが成立しうる。人間承認はContentの安全性を保証しない。
- Required resolution: AI出力を承認後も未信頼Contentとして扱い、編集のたびと公開直前に、許可した構造・Text・Markup・URLだけであることを検証する要件を追加する。Script、Event Handler、危険なURL scheme、未承認の外部埋込・外部送信を拒否または無害化し、悪意あるAI出力を用いたAcceptance Criterionを追加する。
- 戻し先: Requirements

### RR5-002

- Severity: Minor
- Location: AC-016、AC-032、`06-traceability.md` Requirement-to-AC表
- Requirement / risk: NFR-SEC-008の実質的な受入動作はAC-016に記載されているが、AC-016のRequirements欄にNFR-SEC-008がなく、Traceability表はNFR-SEC-008をAC-032だけへ接続している。AC-032のThenにはAI信頼境界の動作が記載されていない。
- Evidence: AC-016、AC-032、`06-traceability.md` Requirement-to-AC表。
- Impact: Test計画でAI信頼境界の受入条件がSecurity要件から追跡されず、AC-032だけを検証して完了と誤判定する可能性がある。
- Required resolution: AC-016のRequirements欄へNFR-SEC-008を追加し、Requirement-to-AC表を実際の検証内容に合わせる。AC-032にも残す場合は、対応するSecurity動作をThenへ明記する。
- Owner: Requirements Agent
- Disposition: fix
- Due / resolution gate: Requirements再Review前

## Checklist Summary

- Requirements Readiness Checklist: Fail。公開直前の未信頼AI Content検証不足がMajor。
- Non-functional Requirements Checklist: Fail。承認後の公開Content sinkに対する検証・無害化が不足。
- Domain Traceability Checklist: Pass。Evidence、Disclosure Status、時点、Unknown、Domain境界、Architecture-blocking OQを維持。

## Summary

- Critical: 0
- Major: 1
- Minor: 1
- Open Question: 0
- Requirements Ready: Fail
