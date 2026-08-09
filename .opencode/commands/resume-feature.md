---
description: 人間回答後に停止位置からFeature実装を再開する
agent: command-controller
x-project-command-id: resume-feature
---

引数を受け取らない。Active Feature pointerと既存Logを再検証し、WF-3 / 4 / 5B / 6B / 12完了証跡を確認する。BlockedのResume条件またはHuman保存済みCodex Review記録を照合し、必ずfresh Run ID / Runtime / Snapshotで完全なLocal Reviewを開始する。旧Review Resultをpassへ再利用せず、回答を推測しない。
