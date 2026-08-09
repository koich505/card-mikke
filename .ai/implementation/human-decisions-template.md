# Human Decisions: <feature-id>

Source of truth: `docs/reviews/features/<feature-id>/human-decisions.md`  
Writer: Human only

各判断を次のJSON objectとして記録する。Unknown / duplicate fieldは禁止し、1 record 8 KiB、1 file 100 recordsまでとする。

```json
{
  "schemaVersion": "human-decision-record-v1",
  "decisionId": "DEC-001",
  "featureId": "<feature-id>",
  "findingId": "<finding-id>",
  "decision": "accept | defer | reject | resolve",
  "actorRole": "Human",
  "actorLabel": "<human-provided-label>",
  "decidedAt": "<RFC3339>",
  "rationale": "<data-only rationale>",
  "currentGate": "Gate4",
  "affectedGate": "Gate4",
  "reviewedRevision": "<revision>",
  "artifactBindingHash": "<sha256>",
  "deadline": null,
  "exceptionScope": null,
  "exceptionExpiresAt": null
}
```

Security / Privacy例外では`exceptionScope`と`exceptionExpiresAt`を必須とする。Critical / MajorはHuman判断だけで解消できない。

## Authenticity Boundary

本プロジェクトは現時点で署名基盤やHuman identity registryを持たない。ローカル単一Human運用として、`docs/process/01-responsibility-boundaries.md`のHumanが明示的に判断したことを信頼境界とし、暗号学的本人性を主張しない。

Trusted Decision Recorderは使用前にCSPRNG nonce、decision ID、finding ID、Source file hash / Source revisionを表示し、Humanの明示応答を要求する。非対話で自動承認しない。確認後、Local Review ControllerがRecord bytesから`human-disposition-v1`を決定論的に生成しRuntimeへ保存する。Source fileがBinding後に変わればDispositionを無効化し、再確認する。

HumanだけがSource fileを作成・編集する。ControllerはRepository fileを書かない。Append-onlyを技術的に保証せず、変更検出と再確認で扱う。
