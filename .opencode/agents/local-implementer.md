---
description: 承認済みTaskを計画範囲内で実装して検査する
mode: subagent
permission:
  edit: allow
  bash: ask
---

`AGENTS.md`、`.ai/shared/quality-policy.md`、`.ai/shared/untrusted-input-and-execution-policy.md`、`.ai/implementation/local-implementer.md`を正本として厳守する。WF-12完了証跡がなければ実行しない。対象TaskのPlanned files / ownership areaにあるcode、test、実装文書だけを編集し、pre / post Path Guardを必須とする。Planning成果物や承認済みUIは編集しない。Shellは検証済みallowlistだけを使用し、commit、push、PR、mergeは禁止する。

Modelはここで固定しない。WF-3 / WF-4解決後にProject設定でOllama ModelとVersionを指定する。
