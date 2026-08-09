# Quality Gates

Status: Adopted working decision  
Decision date: 2026-08-08

## Goal

ローカルLLM内で実装とレビューを十分に収束させ、Codexは最終的な独立レビューに集中させる。LLMによる「完璧」は保証できないため、決定論的チェック、人間の承認、CIを組み合わせる。

## Severity

| Severity | Meaning | Delivery decision |
|---|---|---|
| Critical | 情報漏えい、権限逸脱、重大なデータ破壊、要件の根本的不履行等 | 必ず修正。commit候補・PR・mergeへ進めない |
| Major | 主要機能の誤動作、重要なテスト不足、重大な性能・アクセシビリティ・Evidence欠陥等 | 必ず修正。最終レビュー通過とみなさない |
| Minor | 局所的な改善、低リスクの保守性・表現上の問題等 | 人間が修正、別Task化、受容を明示的に判断 |
| Open Question | 仕様または判断材料が不足している事項 | 影響するゲートより前に解決または制約として記録 |

## Quality Axes

- **Requirement correctness**: 受入条件と承認済みMockを満たし、不要な機能を追加していない。
- **Tests**: 主要な正常系、境界値、失敗系、回帰リスクを検証している。
- **Maintainability**: 責務、命名、依存、複雑性、変更容易性が妥当である。
- **Security and privacy**: 入力検証、認証・認可、秘密情報、依存脆弱性、ログ、個人情報、外部通信を確認する。
- **Performance**: ページ速度、Bundle、画像、Query、Cache、外部API呼出しを確認する。
- **Accessibility**: Keyboard操作、Focus、Semantic HTML、Label、Contrast、Reduced motion等を確認する。
- **SEO**: Index制御、Metadata、Canonical、Structured Data、内部リンク等を確認する。
- **Evidence and freshness**: 出典、確認日、更新履歴、Disclosure Status（`unknown`、`undisclosed`、`partially_disclosed`、`disclosed`）を壊さない。一般画面状態のUnknownとは区別する。
- **Operations**: 可観測性、障害時挙動、Rollback、設定差、復旧可能性を確認する。
- **Cost**: Hosting、Build、Storage、外部API、モデル推論等を計測し、承認済み上限内に保つ。

Securityはblocking gateとする。コストは閾値を定めて計測・管理し、すべてのTaskで根拠なく微細最適化することは要求しない。

## Gate Sequence

### Gate 1: Requirements Ready

- 機能範囲、非対象、受入条件、非機能要件が記録されている。
- DomainのUnknownとOpen Questionが保持されている。
- Architectureを固定する未解決事項が識別されている。

### Gate 2: UI Mock Approved

ユーザー向け機能では次を確認し、人間が承認を記録する。

- 主要画面と画面遷移
- Desktop / Mobile
- Loading / Empty / Error / Partial / Unknown等の一般画面状態
- Filter、Sort、Search等の主要操作
- Evidence、確認日、Disclosure Status（`unknown`、`undisclosed`、`partially_disclosed`、`disclosed`）の見せ方
- Keyboard、Focus、Label等の主要アクセシビリティ
- 実際に近い日本語文言とデータ量
- UI-only codeが承認前の設計検証成果物として隔離され、本番機能・本番契約・本番Data Sourceに利用されていないこと
- Fixtureが合成データのみで、PII、Credential、Secretを含まず、仮Form、Analytics、外部通信・Link・埋込、永続化、入力・HTML表示の安全性が確認されていること
- UI Bootstrap / Review用に決定した最小`quality` Command（format check、lint、typecheck、build、および追加済みのTest）が成功していること
- UI-only codeへのSecret scanが成功し、Bootstrap時およびLockfile変更時の依存脆弱性監査が成功していること
- 主要Flow、誤認、安全性、Requirements適合に影響するOpen Questionが0件であること。持越可能な事項にはOwner、期限、解決Gateがあること

### Gate 3: Specification Ready

- `spec.md`作成後、Technical Plan確定前にUI code promotion assessmentを行っている。
- Promotion分類が`plan.md`と`tasks.md`へ反映され、`spec.md`、`plan.md`、`tasks.md`が相互に整合する。
- 受入条件が検証可能である。
- Taskの依存順、並列可否、テストが明示されている。

### Gate 4: Local Implementation Ready

Gate 4の対象は承認済み仕様・本番Architecture・本番契約に従う本番実装である。UI Mock Approval前のUI-only codeや未評価のFixture・暫定型・仮処理を、そのまま本番実装として扱わない。

- 必須のformat、lint、typecheck、test、buildが成功する。
- Secret scan、採用するSecurity scanner、依存監査が成功する。
- Correctness Reviewerが実行されている。
- Review Orchestratorが変更差分に必要な専門Reviewerを選択し、選択理由を記録している。
- 実行したすべてのLocal ReviewerでCritical/Majorが0件である。
- MinorとOpen Questionの扱いが記録されている。
- feature slice完了時にconvergeを通過している。

本実装用の具体的なコマンドと追加Security Toolは技術Stack決定後に定め、最終的に単一の品質コマンドから再現可能にする。Gate 2で使うUI用最小品質コマンド、Secret scan、依存脆弱性監査はUI Bootstrap前に決定する。

### Gate 5: Codex Final Review Ready

- レビュー対象差分がfeature sliceに限定されている。
- 仕様、Mock、計画、Task、チェック結果を参照できる。
- CodexのCritical/Majorが0件である。
- 指摘による実質的変更後はLocal Gateを再実行している。

### Gate 6: Merge Ready

- 人間が差分、UI、未解決事項を確認している。
- Pull Requestの必須CIが成功している。
- 承認されていない仕様変更とSecurity例外がない。
- 人間がSquash mergeを実行する。

## Review Loop

1. ImplementerがTaskを実装し、決定論的チェックを実行する。
2. Correctness Reviewerが別コンテキストで差分を評価する。
3. Review Orchestratorが変更内容に応じた専門Reviewerを選択する。
4. 選択された専門Reviewerが別々のread-only Contextで評価する。
5. Review Orchestratorが結果を統合し、Critical/MajorがあればImplementerへ戻す。
6. 修正後に影響する決定論的チェックとReviewerを再実行する。
7. 原則3周で収束しない場合は人間へエスカレーションする。
8. feature slice完了後にconvergeし、Codexの最終レビューへ進む。

## Local Reviewer Routing

| Reviewer | Default |
|---|---|
| Correctness | 原則すべての実装Taskで実行 |
| Security | 機械検査は常時。LLM詳細レビューはSecurityリスクがある変更時 |
| Frontend Quality | UI、操作、Accessibility、SEO、Metadata変更時 |
| Performance / Cost | 性能、外部API、Storage、Build、Hosting費用へ影響する変更時 |
| Evidence / Content | カード情報、記事、比較表示、Evidenceや更新日処理の変更時 |

Reviewerの選択を減らす目的でSecurityリスクを過小評価してはならない。一方、関連しない専門Reviewerを常時実行することも要求しない。

## Records

保持するのは、採用した仕様・判断、コマンド結果の要約、未解決事項、レビューの最終結果である。生のLLM会話ログ全体をSource of Truthやmerge条件にはしない。
