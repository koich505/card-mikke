# 共通品質方針

## 原則

- 受入条件、承認済みUI、Domain境界への適合を最優先する。
- LLM Reviewを決定論的なformat、lint、typecheck、test、build、Security検査の代替にしない。
- Security / PrivacyはBlocking、Costは承認済み閾値に対して判定する。
- Accessibility、SEO、Evidence / Freshness、Operationsは`plan.md`のApplicable判定に従う。
- 未決のTool、Model、Command、閾値を推測でPassにしない。

## Local Gate

- 実行必須の決定論的検査が成功している。
- 必要なReviewerが実行済みである。
- Critical / Majorは0件である。
- Critical / MajorはHumanのaccept / defer / rejectでは解除せず、修正と再検証によるresolveだけを認める。
- Minorの`accept / defer`はHuman承認参照を持つ。Open QuestionはOwner、影響Gate、Blocking判定、期限を持ち、現在Gateへ影響すればBlockedとする。
- Security / Privacy findingはSeverityを問わず、Human承認済み例外参照がなければBlockedとする。
- 検査不能、未実行、対象外を成功と表現しない。

詳細な品質軸とGateは`docs/process/02-quality-gates.md`を正本とする。
