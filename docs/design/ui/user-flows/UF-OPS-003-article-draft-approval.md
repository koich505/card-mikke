# UF-OPS-003: 記事Draft編集・承認

## Goal

AI記事を未信頼Draftとして編集し、本文と二軸配置を別々に確認して再認証後だけ承認する。

## Main flow

1. 管理者Login・MFA後、`/ops/articles`へ進む。
2. 生成時点、Model、Template、入力Revision、Evidence、旧公開版継続を確認する。
3. 本文を編集・ValidationしてDraft保存する。
4. 二軸の評価基準、対象・除外、配置理由を確認する。基準編集後は全配置を再検証する。
5. 本文と二軸を別々に明示確認し、Password＋MFA再認証後にUI-only承認する。
6. 編集・保存・再検証・承認を別Eventとして監査表示する。

## Blocking states

危険Markup／URL、必須入力不足、未保存、配置未検証、本文または二軸未確認では承認不可。公開中旧版は自動更新・削除しない。

記事生成失敗時は未承認・未公開を維持し、旧公開版を継続して再試行できる。

Traceability: FR-008、FR-009、FR-031、FR-039、AC-016、AC-040、NFR-SEC-008
