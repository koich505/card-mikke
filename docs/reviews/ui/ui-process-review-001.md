# UI Process Review 001

Review date: 2026-08-09
Review target: `.ai/ui/`, `docs/process/04-ui-first-implementation.md`, and related workflow documents
Reviewer: Independent sub-agent with no conversation context

## Conclusion

- Critical: 0
- Major: 6
- Minor: 4
- Open Question: 2

UI工程の方向性は妥当だが、既存ワークフローとの接続、暫定Frontend判断、成果物配置、Promotion順序、Reviewer入力、Security / Privacy条件をUI工程開始前に修正する必要がある。

## Major

### M-1: UI-only codeと本番実装Gateの境界が不明確

`docs/process/00-development-workflow.md`、`docs/process/02-quality-gates.md`、`docs/process/04-ui-first-implementation.md`の間で、UI Mock Approval前のApplication codeが設計検証成果物なのか本番実装なのかが明文化されていない。

UI-only codeをGate 3 / Gate 4の本番実装と区別し、承認前は本番機能・本番契約として利用できないことを定義する。

### M-2: Frontend Bootstrap判断とArchitecture順序が競合

`docs/process/04-ui-first-implementation.md`はUI開始前にNode.js、Package Manager、Framework等の判断を要求する一方、`docs/process/03-tooling-and-open-decisions.md`のWF-2はWeb StackをArchitecture / `speckit.plan`前の未決事項としている。

UI Bootstrap用の暫定Frontend判断と本番Architecture判断を分離し、承認者、記録場所、固定範囲、再評価範囲を定義する。

### M-3: UI成果物とレビュー結果の配置規則が矛盾

UIレビュー結果を`docs/design/ui/`へ置くよう読める箇所と、`docs/reviews/ui/`へ置く規則が併存する。また`docs/README.md`の`user-flows/`、`mocks/`と、UI Process文書の直下ファイル構成が一致しない。

UI設計文書、実行Code、Screenshot、レビュー、承認の正本Pathを一つの構成へ統一する。

### M-4: UI code promotion assessmentの順序が遅い

`As-is reuse / Refactor / Replace / Remove`の判断がTechnical PlanとTask分割後に置かれている。分類結果はArchitecture、Test方針、Taskへ影響するため、Feature Specification後かつTechnical Plan確定前に実行し、`plan.md`と`tasks.md`へ反映する。

### M-5: UI ReviewerのDomain / Evidence入力が不足

UI ReviewerはEvidence、Disclosure Status、Unknown表示を評価するが、`.ai/shared/evidence-policy.md`、`docs/spec/domain/`、Domain Review結果を必須入力にしていない。

これらを入力へ追加し、表示意味の検証に限定する。

### M-6: UI-only段階のSecurity / Privacy条件が不足

Fixtureへの実在個人情報混入、仮Formの保存・送信、外部Link、Analytics、外部通信、Secret、危険なHTML表示等の確認項目がない。

合成Fixture、意図しない永続化・外部送信の禁止、Secret禁止、外部Content、入力・HTML表示の安全性をChecklistとReviewerへ追加する。

## Minor

### m-1: WF-10が既決の保存場所を未決としている

レビュー結果とUI承認のPathは決定済みである。WF-10はTemplate、Versioning、Link方式だけの未決事項へ縮小する。

### m-2: UI Agentの出力にHuman専用の承認記録が含まれて見える

Agentは未承認Templateを準備できるが、承認者、承認日、`UI Mock Approved`はHumanだけが確定すると出力規則にも明記する。

### m-3: WF-1がCode Mock採用後もTool選定未決のまま

CodeによるUI Mockは採用済みである。WF-1は補助Design Tool、Screenshot、Versioning方式へ限定する。

### m-4: Disclosure Statusの列挙が揃っていない

`unknown`、`undisclosed`、`partially_disclosed`、`disclosed`の4状態を正式表記で列挙し、一般画面状態のUnknownと区別する。

## Open Questions

### OQ-1: Frontend Bootstrap判断の承認者と記録先

推奨Decision: Humanが承認し、`docs/architecture/decisions/`の暫定ADRへ、判断理由、固定範囲、再評価Gateを記録する。

### OQ-2: UI Approval時に残存可能なOpen Question

推奨Decision: 主要Flow、誤認、安全性、Requirements適合へ影響する事項はblockingとする。それ以外はOwner、期限、解決Gateを付けて持越可能とする。
