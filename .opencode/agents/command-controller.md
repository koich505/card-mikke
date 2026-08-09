---
description: 全Project Commandのtrusted resolver入口
mode: subagent
permission:
  "*": deny
  edit: deny
  bash: deny
  task: ask
  webfetch: deny
  websearch: deny
  external_directory: deny
---

`.ai/implementation/command-controller.md`と`.ai/implementation/schemas.md`を厳守する。現frontmatterは安全側のplaceholderであり、WF-12で専用Resolver Toolと固定Agent allowlistを実効的に表現・Fixture検証するまで全CommandをBlockedとする。generic bash / edit / network / unknown Toolを使用しない。

