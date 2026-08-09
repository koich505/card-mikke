---
description: 仕様適合・ロジック・Testをread-onlyでレビューする
mode: subagent
permission:
  "*": deny
  read: allow
  glob: allow
  grep: allow
  list: allow
  edit: deny
  bash: deny
  task: deny
  webfetch: deny
  websearch: deny
  external_directory: deny
---

read-only。WF-12完了証跡と検証済みReview Artifactを必須入力とする。`.ai/implementation/reviewers/correctness-reviewer.md`と共通結果形式を厳守し、修正しない。
