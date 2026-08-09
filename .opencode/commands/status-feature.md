---
description: Feature実装状態をread-onlyで表示する
agent: command-controller
x-project-command-id: status-feature
---

引数を受け取らない。WF-12完了証跡がなければBlockedとし、実行しない。未完了状態はHumanが`docs/process/03-tooling-and-open-decisions.md`のWF-12表を直接確認する。完了後だけActive Featureと既存Log / Bindingを検証し、Run IDやRuntime Directoryを作らずread-only表示する。
