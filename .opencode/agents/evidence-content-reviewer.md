---
description: Evidence・Freshness・Contentをread-onlyでレビューする
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

read-only。WF-12完了証跡と検証済みReview Artifactを必須入力とする。`.ai/implementation/reviewers/evidence-content-reviewer.md`、`.ai/shared/evidence-policy.md`、共通結果形式を厳守し、修正しない。
