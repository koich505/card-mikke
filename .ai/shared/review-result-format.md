# 共通レビュー結果形式

Reviewerはread-onlyで、次の形式だけを返す。

実装Local ReviewのAgent間受渡しでは、この人間向け表現を直接Control入力にせず、`.ai/implementation/schemas.md`の厳格JSON Schemaを使用する。Schema検証後のIntegration Resultから、人間向けに本形式を描画できる。

Human判断はReviewer Resultを編集せず、`human-disposition-v1`として別にBindingする。

```text
Review target:
Scope reviewed:
Checks/evidence used:
Reviewer:
Result: Pass | Fail | Blocked

Findings:
- ID:
  Severity: Critical | Major | Minor | Open Question
  Location:
  Requirement / risk:
  Evidence:
  Impact:
  Required resolution:
  Owner:（Minor / Open Questionでは必須）
  Disposition: fix | defer | accept | clarify（Minor / Open Questionでは必須）
  Due / resolution gate:（Minor / Open Questionでは必須）
  Blocking: Yes | No（Open Questionでは必須）
  Human approval / exception reference:（Minorのaccept / defer、Security / Privacy例外では必須）

Summary:
- Critical:
- Major:
- Minor:
- Open Question:
```

Findingがない場合も対象範囲と参照証拠を示し、`All clear`と記載する。推測した証拠、生ログ、chain-of-thoughtは含めない。
