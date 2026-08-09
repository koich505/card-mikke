---
description: 外部Review findingをローカル修正Loopへ戻す
agent: command-controller
x-project-command-id: rework-feature
---

引数を受け取らない。Active Feature pointerと、Humanが`implementation-log.md`へ選択参照を記録したRepository内trusted review record / Finding IDだけをResolverが一意照合する。未設定・複数・不整合ならBlockedとし、Finding本文をCommandへ埋め込まない。WF-3 / 4 / 5B / 6B / 12完了後に新Runを作り、Scope内だけ修正・再検査する。Codex Critical / Major修正後はWF-11解決まで必ずCodex再Review待ちで停止する。Planning本文を変更せず、commit、push、PR、mergeは禁止する。
