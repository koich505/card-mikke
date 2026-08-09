# UI Workflow Consistency Checklist

## 使用目的

UI工程の方針、Agent、Reviewer、Checklist、成果物配置が、Requirements、品質ゲート、責任分界、Architecture、Spec Kit、本実装フローと矛盾していないか確認する。

各項目を`Pass`、`Fail`、`Not Applicable`、`Open Question`で判定する。`Fail`と`Open Question`には対象ファイル、影響、次のActionを記録する。

## Phase and Gate Boundary

- [ ] UI工程はRequirements承認後に開始する。
- [ ] UI-only codeは承認前の設計検証成果物であり、Gate 3 / Gate 4の本番実装と区別されている。
- [ ] UI Mock Approval前のコードを本番機能、本番契約、実装完了として利用しない。
- [ ] Requirements変更が必要な場合、Requirements工程へ戻して再承認する。
- [ ] UI Mock ApprovalとRequirements Approvalを混同していない。

## Frontend Bootstrap Decision

- [ ] UI Bootstrapに必要な暫定Frontend判断と、本番Architecture判断が分離されている。
- [ ] 暫定判断の承認者がHumanと定義されている。
- [ ] 暫定判断の記録場所が明示されている。
- [ ] 暫定判断で固定する範囲と、後工程で再評価する範囲が明示されている。
- [ ] 特定Frameworkを未承認の既定値として扱っていない。

## Artifact Placement

- [ ] UI設計文書の正本パスが一意である。
- [ ] 実行可能なUI codeを`docs/`へ置いていない。
- [ ] UIレビュー結果は`docs/reviews/ui/`へ置く。
- [ ] UI承認記録は`docs/design/ui/approvals/`へ置く。
- [ ] Screenshot、Mock Version、補助Design Toolの保存方針が矛盾していない。
- [ ] 同じ成果物をPrototypeと本番候補Applicationへ二重管理しない。

## Agent and Reviewer Responsibility

- [ ] UI Agentの編集範囲と禁止事項が明確である。
- [ ] UI Reviewerはread-onlyである。
- [ ] UI ReviewerがRequirements、Domain、Evidence Policy、品質方針を独立確認できる。
- [ ] AIは`UI Mock Approved`を確定しない。
- [ ] Agentが承認Templateを準備する場合、承認者、承認日、承認状態はHumanだけが確定する。

## Fixture and Contract Boundary

- [ ] Fixtureは合成データだけを使用し、専用Directoryへ隔離する。
- [ ] Presentational ComponentへFixtureを直接埋め込まない。
- [ ] 暫定View ModelをDomain Entity、DB Model、API Contractとして固定しない。
- [ ] Fixture、仮Interaction、Debug表示を本実装への昇格前に識別できる。

## Security and Privacy

- [ ] Fixtureへ実在個人情報、Credential、Secretを含めない。
- [ ] UI-only codeが意図せずデータを永続化または外部送信しない。
- [ ] 仮Form、Analytics、外部通信、外部Link、埋込Contentの動作が識別されている。
- [ ] User inputとHTML表示の基本的な安全性を確認する。
- [ ] Secret scanと依存脆弱性確認の適用時期が定義されている。
- [ ] UI用最小`quality` Command、Secret scan、依存脆弱性監査の決定期限がUI Bootstrap前であり、Gate 2まで再現可能である。
- [ ] 本実装用の拡張`quality` CommandとSAST等の追加Security Toolが、UI用検査手段とは別の期限で定義されている。

## Disclosure and Evidence

- [ ] `unknown`、`undisclosed`、`partially_disclosed`、`disclosed`の4状態を正式表記で扱う。
- [ ] 一般的な画面状態のUnknownとDomain上の`unknown`を混同しない。
- [ ] Source、確認日、適用期間、情報鮮度の表示意味をDomainと照合する。

## Promotion to Production

- [ ] Feature Specification後、Technical Plan確定前にUI code promotion assessmentを行う。
- [ ] `As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`を分類する。
- [ ] 分類結果を`plan.md`と`tasks.md`の入力・追跡対象にする。
- [ ] Fixture、暫定型、仮処理を無条件に本番へ昇格しない。

## Open Question Handling

- [ ] 主要Flow、誤認、安全性、Requirements適合に影響するOpen QuestionはUI Approvalをblockする。
- [ ] 持越可能なOpen QuestionにはOwner、期限、解決Gateがある。
- [ ] Research、Domain、Requirements、UI、Architectureの戻し先が識別されている。

## Completion

- [ ] 関連文書間に同じ用語・Path・Gateの矛盾がない。
- [ ] 未決事項一覧が採用済み決定と矛盾していない。
- [ ] Critical、Major、Minor、Open Questionが0件である。
