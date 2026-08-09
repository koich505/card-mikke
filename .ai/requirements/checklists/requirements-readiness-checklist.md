# Requirements Readiness Checklist

## 使用目的

Requirements一式が、独立レビューおよびUI Mock工程へ進める品質に達しているか確認する。

各項目を`Pass`、`Fail`、`Not Applicable`、`Open Question`で判定し、`Fail`と`Open Question`には対象Requirement IDと次のActionを記載する。

## Scope

- [ ] サイトの目的と提供価値が明示されている。
- [ ] 対象ユーザーと主要な課題が明示されている。
- [ ] 初期Releaseの対象範囲が明示されている。
- [ ] Non-goalsと将来候補が区別されている。
- [ ] 成功条件が測定または確認可能である。
- [ ] 日本国内のクレジットカード情報サイトというProject境界と一致している。

## Functional Requirements

- [ ] 各機能要件に一意な`FR-*` IDがある。
- [ ] 各機能要件がユーザー価値または運用上の必要性に結びついている。
- [ ] 正常系だけでなく、Empty、Error、Partial、Unknown等の状態が考慮されている。
- [ ] 必須機能と任意機能が区別されている。
- [ ] 要件同士の重複と矛盾がない。
- [ ] 対象外の振る舞いが必要な箇所で明示されている。
- [ ] UI Componentや実装方法ではなく、期待する振る舞いとして記載されている。

## Acceptance Criteria

- [ ] 主要なRequirementに対応する`AC-*`がある。
- [ ] 各Acceptance Criterionから対応Requirement IDを追跡できる。
- [ ] 各Acceptance Criterionが観測または検証可能である。
- [ ] 「適切」「高速」「使いやすい」等の主観表現だけで完了を判定していない。
- [ ] 境界値、失敗、権限、Unknown等の重要条件が含まれている。
- [ ] UI Mockで検証する事項と、実装テストで検証する事項が区別されている。

## Open Questions

- [ ] 各未決事項に一意な`RQ-*` IDがある。
- [ ] 未決理由、影響、決定者、必要な時期、推奨Actionがある。
- [ ] Requirementsを止める事項と、UIまたはArchitectureへ持ち越せる事項が区別されている。
- [ ] 未決事項を仮の確定値で隠していない。

## Traceability

- [ ] Domain ConceptまたはDomain Open QuestionからRequirementを追跡できる。
- [ ] RequirementからAcceptance Criterionを追跡できる。
- [ ] Requirementの根拠またはユーザー決定を追跡できる。
- [ ] UI Mock工程へ渡すRequirementとOpen Questionが識別されている。

## Readiness Decision

- [ ] Criticalに相当する不足がない。
- [ ] Majorに相当する不足がない。
- [ ] Minorの扱いが記録されている。
- [ ] ユーザーが未確認の事項をApprovedとしていない。
- [ ] 独立Requirements Reviewerへ渡せる状態である。
