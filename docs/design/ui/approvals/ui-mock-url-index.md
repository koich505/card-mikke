# UI Mock URL Index

Status: Human review checklist
Base URL: `http://localhost:3000`
Last updated: 2026-10-06

## 起動方法

```bash
cd apps/web
npm run dev
```

起動後、同じBrowser Sessionで下表の「開く」を上から順に確認する。`localhost:3000`以外のPortで起動した場合は、URLのHostとPortを読み替える。

## 承認の進め方

- `[ ]`は確認順を管理する補助Checklistであり、正式な承認記録ではない。
- 正式な承認は各「承認記録」の`Approval status`、`Approved by`、`Approval date`へ記録する。
- DesktopとMobile、Keyboard操作、主要状態、UI-only境界を各承認記録のHuman confirmation scopeに沿って確認する。
- 運営画面は最初に管理者LoginとMFAを完了し、同じBrowser Sessionで続けて確認する。

## 推奨確認順

| 確認 | Version / 対象              | Screen ID                     | URL                                                                                                                                                                                                                                                                       | 仕様                                                              | 承認記録                                                       |
| ---- | --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| [ ]  | v0.1 ホーム                 | SCR-PUB-001                   | [開く](http://localhost:3000/)                                                                                                                                                                                                                                            | [ui-v0.1](../mocks/ui-v0.1.md)                                    | 未作成                                                         |
| [ ]  | v0.1 条件入力・検索結果     | SCR-PUB-002、SCR-PUB-003      | [開く](http://localhost:3000/search)                                                                                                                                                                                                                                      | [ui-v0.1](../mocks/ui-v0.1.md)                                    | 未作成                                                         |
| [ ]  | v0.2 カード詳細・通常       | SCR-PUB-005                   | [開く](http://localhost:3000/cards/everyday-plus)                                                                                                                                                                                                                         | [ui-v0.2](../mocks/ui-v0.2-card-detail.md)                        | [承認記録](ui-mock-card-detail-v0.2.md)                        |
| [ ]  | v0.2 カード詳細・変更確認中 | SCR-PUB-005                   | [開く](http://localhost:3000/cards/travel-step)                                                                                                                                                                                                                           | [ui-v0.2](../mocks/ui-v0.2-card-detail.md)                        | [承認記録](ui-mock-card-detail-v0.2.md)                        |
| [ ]  | v0.2 カード詳細・算定不完全 | SCR-PUB-005                   | [開く](http://localhost:3000/cards/smart-basic)                                                                                                                                                                                                                           | [ui-v0.2](../mocks/ui-v0.2-card-detail.md)                        | [承認記録](ui-mock-card-detail-v0.2.md)                        |
| [ ]  | v0.3 Profile                | SCR-ACC-002                   | [開く](http://localhost:3000/account/profile)                                                                                                                                                                                                                             | [ui-v0.3 Profile](../mocks/ui-v0.3-profile.md)                    | [承認記録](ui-mock-profile-v0.3.md)                            |
| [ ]  | v0.3 運営認証・Dashboard    | SCR-OPS-009〜011、SCR-OPS-001 | [Loginを開く](http://localhost:3000/ops/login)                                                                                                                                                                                                                            | [ui-v0.3 Operations](../mocks/ui-v0.3-operations.md)              | [承認記録](ui-mock-operations-v0.3.md)                         |
| [ ]  | v0.3 公式Source差分一覧     | SCR-OPS-013                   | [開く](http://localhost:3000/ops/changes)                                                                                                                                                                                                                                 | [ui-v0.3 Operations](../mocks/ui-v0.3-operations.md)              | [承認記録](ui-mock-operations-v0.3.md)                         |
| [ ]  | v0.3 差分確認・編集         | SCR-OPS-002、SCR-OPS-003      | [通常差分](http://localhost:3000/ops/changes/change-20260812-001) / [変更なし](http://localhost:3000/ops/changes/change-20260812-002) / [競合](http://localhost:3000/ops/changes/change-20260812-003) / [確定済み](http://localhost:3000/ops/changes/change-20260812-004) | [ui-v0.3 Operations](../mocks/ui-v0.3-operations.md)              | [承認記録](ui-mock-operations-v0.3.md)                         |
| [ ]  | v0.3 Session管理            | SCR-OPS-012                   | [開く](http://localhost:3000/ops/account/sessions)                                                                                                                                                                                                                        | [ui-v0.3 Operations](../mocks/ui-v0.3-operations.md)              | [承認記録](ui-mock-operations-v0.3.md)                         |
| [ ]  | v0.4 検索・比較履歴         | SCR-ACC-003                   | [Accountを開く](http://localhost:3000/account/profile) →「検索・比較履歴」Tab                                                                                                                                                                                             | [ui-v0.4](../mocks/ui-v0.4-account-history-data.md)               | [承認記録](ui-mock-account-v0.4.md)                            |
| [ ]  | v0.4 Account・データ管理    | SCR-ACC-004                   | [Accountを開く](http://localhost:3000/account/profile) →「データ管理」Tab                                                                                                                                                                                                 | [ui-v0.4](../mocks/ui-v0.4-account-history-data.md)               | [承認記録](ui-mock-account-v0.4.md)                            |
| [ ]  | v0.5 検索条件保存           | SCR-PUB-003、OVL-008          | [検索を開く](http://localhost:3000/search) → 検索実行 →「検索条件を保存」                                                                                                                                                                                                 | [ui-v0.5](../mocks/ui-v0.5-search-save.md)                        | [承認記録](ui-mock-search-save-v0.5.md)                        |
| [ ]  | v0.6 特集記事一覧           | SCR-PUB-006                   | [開く](http://localhost:3000/articles)                                                                                                                                                                                                                                    | [ui-v0.6 記事一覧](../mocks/ui-v0.6-article-list.md)              | 未作成                                                         |
| [ ]  | v0.6 誤情報指摘・受付完了   | SCR-PUB-011、SCR-PUB-012      | [カード対象で開く](http://localhost:3000/correction-report?targetType=card&targetId=everyday-plus&item=%E6%83%85%E5%A0%B1%E3%81%AE%E6%A0%B9%E6%8B%A0%E3%83%BB%E7%A2%BA%E8%AA%8D%E7%8A%B6%E6%85%8B)                                                                        | [ui-v0.6 指摘](../mocks/ui-v0.6-correction-report.md)             | [承認記録](ui-mock-correction-report-v0.6.md)                  |
| [ ]  | v0.7 カード比較             | SCR-PUB-004                   | [3枚比較を開く](http://localhost:3000/search?annualSpend=1200000&profile=everyday&usage=convenience%3A120000&usage=supermarket%3A360000&view=compare&compare=everyday-plus&compare=travel-step&compare=smart-basic)                                                       | [ui-v0.7](../mocks/ui-v0.7-comparison.md)                         | [承認記録](ui-mock-comparison-v0.7.md)                         |
| [ ]  | v0.8 用途別記事             | SCR-PUB-007                   | [開く](http://localhost:3000/articles/daily-shopping)                                                                                                                                                                                                                     | [ui-v0.8](../mocks/ui-v0.8-feature-article-details.md)            | [承認記録](ui-mock-feature-article-details-v0.8.md)            |
| [ ]  | v0.8 単一カード特集         | SCR-PUB-008                   | [開く](http://localhost:3000/articles/everyday-plus-feature)                                                                                                                                                                                                              | [ui-v0.8](../mocks/ui-v0.8-feature-article-details.md)            | [承認記録](ui-mock-feature-article-details-v0.8.md)            |
| [ ]  | v0.9 お気に入り             | SCR-PUB-009                   | [通常](http://localhost:3000/favorites) / [追加済み](http://localhost:3000/favorites?add=everyday-plus) / [上限](http://localhost:3000/favorites?scenario=limit) / [引継ぎDialog](http://localhost:3000/favorites?dialog=transfer)                                        | [ui-v0.9](../mocks/ui-v0.9-favorites.md)                          | [承認記録](ui-mock-favorites-v0.9.md)                          |
| [ ]  | v1.0 掲載範囲・サイト方針   | SCR-PUB-010                   | [開く](http://localhost:3000/policy)                                                                                                                                                                                                                                      | [ui-v1.0](../mocks/ui-v1.0-coverage-auth-ops.md)                  | [承認記録](ui-mock-v1.0-coverage-auth-ops.md)                  |
| [ ]  | v1.0 利用者Login・登録      | SCR-ACC-001                   | [開く](http://localhost:3000/account/login)                                                                                                                                                                                                                               | [ui-v1.0](../mocks/ui-v1.0-coverage-auth-ops.md)                  | [承認記録](ui-mock-v1.0-coverage-auth-ops.md)                  |
| [ ]  | v1.0 券面画像確認・承認     | SCR-OPS-004                   | [開く](http://localhost:3000/ops/card-images)                                                                                                                                                                                                                             | [ui-v1.0](../mocks/ui-v1.0-coverage-auth-ops.md)                  | [承認記録](ui-mock-v1.0-coverage-auth-ops.md)                  |
| [ ]  | v1.0 記事Draft編集・承認    | SCR-OPS-005                   | [開く](http://localhost:3000/ops/articles)                                                                                                                                                                                                                                | [ui-v1.0](../mocks/ui-v1.0-coverage-auth-ops.md)                  | [承認記録](ui-mock-v1.0-coverage-auth-ops.md)                  |
| [ ]  | v1.1 Review Moderation      | SCR-OPS-006                   | [開く](http://localhost:3000/ops/reviews)                                                                                                                                                                                                                                 | [ui-v1.1](../mocks/ui-v1.1-moderation-business-account-prompt.md) | [承認記録](ui-mock-v1.1-moderation-business-account-prompt.md) |
| [ ]  | v1.1 誤情報指摘管理         | SCR-OPS-007                   | [開く](http://localhost:3000/ops/corrections)                                                                                                                                                                                                                             | [ui-v1.1](../mocks/ui-v1.1-moderation-business-account-prompt.md) | [承認記録](ui-mock-v1.1-moderation-business-account-prompt.md) |
| [ ]  | v1.1 業務情報管理           | SCR-OPS-008                   | [開く](http://localhost:3000/ops/business-data)                                                                                                                                                                                                                           | [ui-v1.1](../mocks/ui-v1.1-moderation-business-account-prompt.md) | [承認記録](ui-mock-v1.1-moderation-business-account-prompt.md) |
| [ ]  | v1.1 Save / Account Prompt  | OVL-007                       | [検索を開く](http://localhost:3000/search) → 検索実行 → 保存Action                                                                                                                                                                                                        | [ui-v1.1](../mocks/ui-v1.1-moderation-business-account-prompt.md) | [承認記録](ui-mock-v1.1-moderation-business-account-prompt.md) |
| [ ]  | v1.2 テーマ別プリセット検索 | SCR-PUB-001、SCR-PUB-003      | [ホーム](http://localhost:3000/) / [旅行好き](http://localhost:3000/search?theme=travel-lover) / [ショッピング好き](http://localhost:3000/search?theme=shopping-lover) / [シンプルでお得重視](http://localhost:3000/search?theme=simple-value)                            | [ui-v1.2](../mocks/ui-v1.2-theme-presets.md)                      | [承認記録](ui-mock-v1.2-theme-presets.md)                      |
| [ ]  | v1.2 テーマ管理             | SCR-OPS-014                   | [開く](http://localhost:3000/ops/themes)                                                                                                                                                                                                                                  | [ui-v1.2](../mocks/ui-v1.2-theme-presets.md)                      | [承認記録](ui-mock-v1.2-theme-presets.md)                      |

## 運営画面の確認用認証

実際のCredentialは入力せず、次の合成値を使用する。

| 項目                 | 合成値                     |
| -------------------- | -------------------------- |
| 管理者メールアドレス | `operator@example.invalid` |
| Password             | `prototype-passphrase`     |
| 6桁のMFAコード       | `123456`                   |

再認証Dialogでも同じPasswordとMFAコードを使用する。認証状態はBrowser Memoryだけに保持されるため、再読込や別Tabでの確認時は再Loginが必要になる場合がある。

## 補助状態URL

以下は主画面の承認後、状態表現を追加確認するときに使用する。

| 対象                   | URL                                                      |
| ---------------------- | -------------------------------------------------------- |
| 運営Dashboard Loading  | [開く](http://localhost:3000/ops?scenario=loading)       |
| 運営Dashboard Empty    | [開く](http://localhost:3000/ops?scenario=empty)         |
| 運営Dashboard Error    | [開く](http://localhost:3000/ops?scenario=error)         |
| MFA回復                | [開く](http://localhost:3000/ops/mfa/recovery)           |
| 不明カードNot Found    | [開く](http://localhost:3000/cards/not-a-card)           |
| 不明記事Not Found      | [開く](http://localhost:3000/articles/not-an-article)    |
| 非公開テーマ直指定拒否 | [開く](http://localhost:3000/search?theme=weekend-drive) |
| 不明テーマ直指定拒否   | [開く](http://localhost:3000/search?theme=unknown-theme) |

## 関連資料

- [Screen Inventory](../03-screen-inventory.md)
- [UI Requirements](../04-ui-requirements.md)
- [UI Scope](../00-ui-scope.md)
