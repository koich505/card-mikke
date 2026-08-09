---
description: Feature差分のローカルReviewだけを再実行する
agent: command-controller
x-project-command-id: review-feature
---

引数を受け取らない。Active Feature pointerと既存Logを解決し、未設定・不一致ならBlockedとする。WF-12完了後、fresh Run ID / Runtime / Snapshotを作り、Local Review ControllerだけがCollector、RO routing、固定Reviewer、RO integrationを順次実行する。旧Resultはpassへ再利用しない。Source tree post-check不一致はstale / Blockedとし、Application codeを変更しない。
