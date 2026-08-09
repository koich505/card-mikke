# Requirements作成Prompt

## 目的

日本国内のクレジットカード情報サイトについて、Domain Specificationを入力とし、ユーザーとの複数回の対話を通じて機能要件、非機能要件、受入条件、Open Question、Traceabilityを作成する。

## 実行する役割

`.ai/requirements/requirements-agent.md`に従う。

作業開始時に、同ファイルが指定する必須入力と3つのChecklistを読む。

## 作業原則

- 一度の回答でRequirementsを完成させようとしない。
- 既存文書から確認できない事業判断だけを、関連する少数の質問へまとめる。
- 各質問について、必要な理由と後工程への影響を簡潔に説明する。
- ユーザーの回答を、採用した決定、仮説、対象外、Open Questionへ分類する。
- 採用した決定を`docs/spec/requirements/`へ段階的に反映する。
- 要件の変更により既存の回答が無効になった場合は、古い記述を残したまま併存させない。
- DomainまたはResearchへ戻す必要がある事項を隠さない。

## 対話と作成の順序

原則として以下の順序で進める。ただし、ユーザーの回答に応じて前後または反復してよい。

1. サイトの目的、成功条件、対象範囲、Non-goals
2. 対象ユーザー、ユーザーの課題、主要な利用Scenario
3. 情報探索、検索、絞り込み、並び替え、比較等の主要機能
4. カード詳細、Benefit、費用、Eligibility、Evidence、更新日の表示要求
5. 編集、更新、Evidence保持、監査、運用上の要求
6. Security、Privacy、Accessibility、SEO、Performance、Availability、Cost等の非機能要件
7. 検証可能な受入条件
8. Open QuestionとTraceability
9. Checklistによる自己確認
10. 独立Requirements Reviewerへの引き渡し

## 出力

以下を作成・更新する。

```text
docs/spec/requirements/
├── 00-scope.md
├── 01-users-and-goals.md
├── 02-functional-requirements.md
├── 03-non-functional-requirements.md
├── 04-acceptance-criteria.md
├── 05-open-questions.md
└── 06-traceability.md
```

## Draftの扱い

- 初期状態は`Draft`とする。
- ユーザー未確認の内容を`Approved`として記載しない。
- 仮説には`Provisional`、未決事項には`Open Question`を明示する。
- Requirements ReviewerのCritical／Majorが0件になっても、人間の承認前は`Approved`にしない。
- 最終承認後に`UI Mock Approved`と混同しない。Requirements承認とUI Mock承認は別Gateである。

## 完了条件

- Requirements Agentが3つのChecklistで自己確認している。
- Requirements ReviewerのCriticalとMajorが0件である。
- MinorとOpen Questionの扱いが記録されている。
- ユーザーがRequirementsを承認している。
- UI Mock工程へ渡す決定事項、仮説、未決事項が識別されている。

## 最初のAction

必須入力を確認した後、リポジトリから既に判断できる事項と、ユーザー判断が必要な事項を分ける。そのうえで、サイトの目的・対象ユーザー・初期Scopeに関する最初の少数の質問を提示する。
