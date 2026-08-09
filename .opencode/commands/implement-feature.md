---
description: Featureの未完了Taskを依存順に実装・Reviewする
agent: command-controller
x-project-command-id: implement-feature
---

引数を受け取らない。検証済みResolverがSpec KitのActive Feature pointerをcanonical化し、`specs/`直下の一意な既存Directoryへ解決する。未設定・不正・複数ならHumanへ選択を求めてBlockedとする。WF-3 / 4 / 5B / 6B / 12の完了証跡がなければ開始しない。工程06とRunbookに従い依存順に自動Loopし、Human Stop ConditionsまたはCodex final review pendingで停止する。初期laneは1。commit、push、PR、mergeは禁止する。
