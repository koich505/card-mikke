# UF-006: 用途別記事・単一カード特集の閲覧

Status: Implemented in UI Mock v0.8; human approval pending
Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-13のCurrent Product-owner-approved Baseline）

## Goal

検索条件を自ら組み立てない利用者が、用途別記事から候補と選定理由を理解する。また、特定カードを詳しく知りたい利用者が、単一カード特集から特徴、適用条件、変更確認状態、公式Sourceを理解する。

## Related requirements

- FR-007、FR-019、FR-031
- NFR-EDIT-001、NFR-A11Y-001
- AC-015、AC-016
- SCR-PUB-007、SCR-PUB-008

## Main flow: 用途別記事

1. 記事一覧で`用途・読者像別`を選び、対象読者と要約を確認して記事を開く。
2. 対象読者、選定基準、候補カードごとの選定理由を確認する。
3. 年会費・基本還元・利用先別還元を混同しない比較観点と、関連カードの合成比較を確認する。
4. 確認に使用した合成公式Source、確認日、適用期間、claim単位のDisclosure Statusを確認する。
5. 関連カードの詳細へ進み、算定条件と申込前確認事項を確認する。

## Main flow: 単一カード特集

1. 記事一覧で`単一カード特集`を選び、対象カードを確認して記事を開く。
2. 対象カード、特徴、適用条件、変更点を確認する。
3. 更新確認中の場合は、公開済み旧記事、最終確認日、未反映の差分候補を確認する。
4. 広告・Affiliate関係と申込条件差の確認状態を確認する。
5. 合成公式Sourceの裏付け範囲とDisclosure Statusを確認し、対象カード詳細へ進む。

## Alternative states

- 更新確認中: 新しい条件を確定表示せず、公開済み旧記事と未確認の差分候補を分離する。
- 一部開示: 未確認部分を推測せず、`一部開示`としてclaim単位で表示する。
- Not Found: 合成Fixtureにない記事IDでは記事本文を表示せず、記事一覧へ戻れる。

## UI-only boundary

- 記事、カード、Source、日付、条件はすべて合成Fixtureである。
- Sourceおよび申込Actionは外部へ遷移せず、外部通信、Analytics、永続化を行わない。
- Fixture型はUI表示用の暫定View Modelであり、本番CMS、Domain Entity、API Contractではない。
