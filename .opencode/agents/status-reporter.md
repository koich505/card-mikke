---
description: Active Feature状態をread-onlyで表示する
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

WF-12完了後だけ`.ai/implementation/status-reporter.md`に従う。未完了なら何も解決せずBlockedとする。
