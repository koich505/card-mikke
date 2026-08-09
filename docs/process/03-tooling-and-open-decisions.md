# Tooling and Open Decisions

Status: Adopted tools with deferred configuration  
Decision date: 2026-08-08

## Adopted Tool Roles

| Tool | Adopted role | Current state |
|---|---|---|
| GitHub Spec Kit | Feature仕様、計画、Task分割、整合性・収束確認 | 採用決定。未導入 |
| OpenCode | ローカルCoding AgentとImplementer / Reviewerの実行環境 | 採用決定。未導入 |
| Ollama | OpenCodeが利用するローカル推論Provider | 採用決定。Model未選定 |
| Codex | ローカルゲート後の独立した最終レビュー | 採用決定。運用詳細は実装前に確認 |
| Cursor | 人間による差分確認、軽微な編集、UI目視確認 | 採用可能 |
| Git / Git worktree | branch管理と安全な並列作業の隔離 | 採用決定 |
| GitHub Actions | Pull Request上の決定論的な最終CI | 採用決定。未設定 |

Spec Kitは実装主体ではない。Spec Kitの成果物とコマンドをOpenCodeで実行すると、接続されたOllamaのモデルが仕様作成支援や実装を行う。

## Initial Operating Assumptions

- 実装用とレビュー用のOpenCode Agentを分離する。
- Implementerは編集可能、Reviewerは原則read-onlyとする。
- 両Agentともcommit、push、PR作成、mergeを禁止する。
- OpenCodeで実用的な長文Contextを扱うため、まず64k tokens以上を候補条件とし、実機Benchmarkで確定する。
- 初期のローカル同時実行数は1とする。
- Spec Kitや各ToolのVersionは導入時に固定し、更新手順を記録する。

## Open Decisions

未決事項は導入を止めるものではない。右欄のGateまでに決定する。

| ID | Decision | Required before | Notes |
|---|---|---|---|
| WF-1 | UI Mockの作成Tool、保存形式、Versioning方法 | 最初のUI Mock作成 | Code、Figma等を比較し、レビュー可能な保存形式を選ぶ |
| WF-2 | Web技術Stack、Hosting、Package Manager | Architecture / `speckit.plan` | Requirementsと非機能要件を先に確定する |
| WF-3 | Ollamaの具体Model、Quantization、Context長 | 最初のローカル実装 | 実機の品質・速度・メモリBenchmarkで決める |
| WF-4 | Spec Kit、OpenCode、Ollama等の固定Version | Tool初期化 | 再現可能性とUpgrade方針を記録する |
| WF-5 | format / lint / typecheck / test / buildのコマンド | 最初の実装Task | 最終的に単一の品質コマンドへ統合する |
| WF-6 | SAST、Secret scan、依存脆弱性監査のTool | 最初のPR | ローカルとCIの双方で再現可能にする |
| WF-7 | Hosting、外部API、LLM等の費用上限と警告閾値 | Architecture承認 | 月額上限とfeature単位の増分確認方法を決める |
| WF-8 | 並列実行数を1から増やす条件 | 並列化開始 | メモリ、レビュー品質、競合率を測定する |
| WF-9 | GitHub Actionsの必須JobとBranch protection | 最初のPR | Local Gateと同一内容を基本とする |
| WF-10 | レビュー結果とUI Mock承認の記録場所・Template | 最初のfeature spec | 生ログではなく決定と結果を残す |
| WF-11 | Codexへ渡す最小Contextと再レビュー条件 | 最初のCodex review | Token使用量と検出品質を測定して調整する |

## Deferred Alternatives

Goose、Aider、OpenHands等は現時点では採用しない。OpenCode + Ollamaで不足が実測された場合に再評価する。初期段階で独自Adapterや独自Orchestratorは作成しない。

## Next Resume Point

次回は機能・非機能要件の作成へ進む。WF-1以外のTool詳細を先にすべて決定する必要はない。RequirementsとUI Mockで必要な情報が揃った後、Architectureと最初のfeature sliceに必要な項目から順に解決する。
