# UI Mock v0.6: 特集記事一覧

Status: Review pending
Requirements baseline: FR-041 / AC-043（2026-08-13更新）
Code location: `apps/web/src/app/articles/`

## Scope

- 公開済み記事の一覧と記事詳細への導線
- フリーワード、複数タグ（すべて含む）、記事種別、新着順／更新順
- 結果件数、適用条件、全解除、0件
- 公開日・更新日・最終確認日と更新確認中の区別
- Desktop／Mobile、Keyboard、支援技術への結果通知

## Fixture and boundary

全記事、カード名、日付、状態はUI検証用の合成Fixtureである。公開・承認、検索、更新確認の本番Logic、外部通信、永続化およびCMSは実装しない。

## Validation hypotheses

- 複数タグがAND条件であることを、補足文と適用条件で理解できる。
- 公開日・更新日・最終確認日を別の時点として読み分けられる。
- 更新確認中が「最新記事」ではなく、公開済み旧記事であることを理解できる。
