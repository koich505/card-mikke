# UI Mock Approval — Profile v0.3

Approval status:

Approved by:

Approval date:

## Approval target

- Requirements: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）
- UI Mock: `docs/design/ui/mocks/ui-v0.3-profile.md`
- UI code version / Commit: Profile scope manifest hash `74866265ef679d7a667895edbb01ed0f64cb3df3c4d390c4bf0fee1f7aae9cb2`（未Commit差分を含む。Mock文書記載の範囲で再現）
- Screen: SCR-ACC-002
- Flow: UF-002 Profile edit

## Human confirmation scope

- Desktop／MobileのAccount Tab、対応Panelの切り替え、章立て、情報密度
- 年間利用額、11カテゴリ、架空Serviceの入力とValidation
- 年齢帯、入会予定時期、ポイント・交換先の選択
- 章ごとの保存、取消、保存失敗、再試行、未保存離脱確認
- Profile値と検索時の一時変更の区別、保存項目の利用目的
- UI-only境界、合成Fixture、外部送信・永続化を行わないこと

## Approved hypotheses

## Known minor findings accepted

## Remaining open questions

## Promotion reminder

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、対象UI codeを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。Fixture、暫定型、仮保存、失敗切替は無条件に本番へ昇格しない。

> このTemplateはAgentが準備した未承認記録である。承認者、承認日、承認状態`UI Mock Approved`は人間だけが記入する。
