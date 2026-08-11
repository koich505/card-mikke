# Requirements Approval

Status: Approved
Approved at: 2026-08-11
Approver: Product owner
Approval statement: 「オッケーです。要件定義の改定を承認します。」

## Gate Decision

- Gate: Gate 1 — Requirements Ready
- Current decision: Passed
- Previous decision: Passed
- Independent Requirements Review: `docs/reviews/requirements/requirements-review-008.md` — Pass after fix and re-review
- Current Domain-alignment Review: `docs/reviews/requirements/requirements-review-009.md` — Pass
- Security-relevant change review: `docs/reviews/requirements/requirements-review-005.md`–`requirements-review-007.md` — NFR-SEC-008およびAC-016 / AC-032を含めPass
- Baseline Security Review: `docs/reviews/requirements/requirements-security-review-002.md` — Pass
- Current review Critical findings: 0
- Current review Major findings: 0
- Current review Blocking open questions: 0

## Previous Approved Baseline (stale)

以下のhashは2026-08-10承認時点の旧Baselineであり、現行Requirementsのhashではない。新しいhashはProduct ownerの再承認後だけ記録する。

| Document | SHA-256 |
|---|---|
| `00-scope.md` | `58a477155c0cc4e5a83e83954e4eb93e1a58be1be057aa5f0ae9ff4bbaecf046` |
| `01-users-and-goals.md` | `93fdc4897d61e1f55bbe78a91e45d748bcc0eadfa5368380000ff4e9283ad7ce` |
| `02-functional-requirements.md` | `cef68c1805b70d1b7aa52232615fdd1b6f2b013c262fa630bab31066096b4818` |
| `03-non-functional-requirements.md` | `5a6463a359a4ebb72c49dda4a5fd3d604a077dfab664ab1d6fe3710e4567dc69` |
| `04-acceptance-criteria.md` | `027a7e2f74692c522e32b11388161d197947709006233e7da26c70e0e9c20356` |
| `05-open-questions.md` | `6be1834fd4096531d2aa0f4457ab7a79ccdeb891d98429fc2f65b52f39a161dc` |
| `06-traceability.md` | `2e30ae1c5bcbc26e54f384d273fb51ad0ef11b98100367c6f3c7862fb7b1d91e` |

## Current Approved Baseline

以下は2026-08-11にProduct ownerが承認した、Domain 04〜15反映後のRequirements Baselineである。

| Document | SHA-256 |
|---|---|
| `00-scope.md` | `4815a8d3b79aa35330835708f28014de8d1c096329302a2d7186e4e715d48e15` |
| `01-users-and-goals.md` | `d2b945d8c878b7aa2eb6ce82ffeb2719d508b414c92c8688bd01bfa326dfbee5` |
| `02-functional-requirements.md` | `6be6442de510f163680b1b8bc9437bf60a7713c65d3b11dafb206871e4371ab4` |
| `03-non-functional-requirements.md` | `301aa04b9316b72d27a67a29008c300e10d7422af1ddae2b14694b764458b2a3` |
| `04-acceptance-criteria.md` | `76f1b8508a6a8e324da751b1c95370eedf38a2a3aa957a8d21c329ca8a416cc2` |
| `05-open-questions.md` | `507e2233f8e2d09ab5f07ae0f6a3c74d5c3bfd50d6f51b81bb14be9479c7e5a3` |
| `06-traceability.md` | `741b41fbc8abbc1305dbe9043cdd83dfb738da2934ce618da2ffbfd4665bdd13` |

## Carry-over Conditions

- `05-open-questions.md`に記録した非Blocking事項は、各Owner、期限、解決Gateに従って扱う。
- RQ-013はUI Mock開始前に確認する。
- Requirements変更時は影響範囲を再レビューし、承認Baselineを更新する。
- 本承認はUI Mock Approval、Final Scope Approval、Planning Approvalまたは実装開始承認を兼ねない。
- Domain 04〜15反映後の現行RequirementsはProduct ownerによる再承認を完了し、上記hashをGate 1の現行Baselineとして扱う。
