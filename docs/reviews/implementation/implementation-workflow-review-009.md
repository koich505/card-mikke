# Implementation Workflow Review 009

Review date: 2026-08-09
Review target: Implementation workflow documents after Review 008 remediation
Previous review: `docs/reviews/implementation/implementation-workflow-review-008.md`
Reviewer: Independent sub-agent with no conversation context

## Conclusion

**Fail**

- Critical: 0
- Major: 4
- Minor: 0
- Open Question: 0

Decision ReintegrationとRun再利用の契約が複雑化し、Gate変更、Secure Runtime、Fingerprint、Closure Rootに矛盾が残っている。

## Major

### IMP-046: Gate変更時の再統合経路が矛盾する

Gate変更を新Decision Reintegrationで扱う規則と、通常Local Review全体を要求する規則が併存する。

Gate変更時の経路を一意にし、旧BindingとResultをStaleとして新しい完全Local Reviewを実行する。

### IMP-047: Resume / ReviewのRun ID LifecycleがSecure Runtimeと両立しない

Resume / Reviewは既存Run IDを使用する一方、Secure RuntimeはRun IDの再利用と既存Directoryを拒否する。

Resume、Review、Reworkを含む各実行Operationで新しいRun IDを発行し、`priorRunId`で履歴を接続する。StatusはRuntimeを作成しないread-only Operationとする。

### IMP-048: Reintegration Baseline / DeltaのHash Schemaが未定義

Baseline FingerprintとDecision Source FingerprintのDomain、Payload、Canonical計算、Source Manifestとの関係が定義されていない。

軽量Decision Reintegrationを廃止するか、Hash Schemaを完全に定義する。単純化のため、人間判断後は新しい完全Local Reviewを推奨する。

### IMP-049: Closure最終RootのHash対象が一意でない

最終RootがInner rootとMetadataだけをHashするのか、元のEntries / Edges / Caps配列も含むのか不明である。

Entries / Edges / Capsは各Inner rootだけの入力とし、最終Root Payloadは3つのInner rootと固定Metadataのみ、と明示する。
