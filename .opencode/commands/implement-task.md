---
description: 指定した1 Taskを実装・Reviewする
agent: command-controller
x-project-command-id: implement-task
---

引数を受け取らない。Active Feature pointerを検証済みResolverで解決し、`implementation-log.md`のHuman選択参照付き`Selected Task`、未設定なら一意なNext Ready Taskを解決する。未設定・複数・不整合ならHumanへ選択を求めてBlockedとする。WF-3 / 4 / 5B / 6B / 12完了証跡がなければ開始しない。対象Taskだけを最大3 Review Attemptsまで進める。commit、push、PR、mergeは禁止する。
