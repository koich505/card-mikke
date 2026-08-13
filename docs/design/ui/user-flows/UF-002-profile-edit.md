# UF-002 — Profile edit

Status: Implemented in UI Mock v0.3; human approval pending

Requirements baseline: `docs/spec/requirements/07-approval.md`（2026-08-11 Approved）

Traceability: SCR-ACC-002、FR-002、FR-003、AC-002、UIR-PROFILE-001〜004

## Preconditions

- Login済みの登録利用者を合成Fixtureで表現する。
- 本番認証、API、DB、外部送信、永続化は存在しない。
- 初期Profileは実在個人を表さない合成値である。

## Primary flow

1. Global Headerの`Account`からProfileへ入る。
2. Account Tabの`プロフィール`が選択され、対応するProfile Panelだけが表示されていることを確認する。
3. 保存項目の利用目的とUI-only境界を確認する。
4. `利用額・よく使う場所`で年間利用額、カテゴリ別年額、架空Serviceを変更する。
5. 内訳合計と未配分額を確認し、当該章だけを保存する。
6. `あなたについて`で年齢帯と入会予定時期を変更し、当該章だけを保存する。
7. `ポイントの希望`で希望項目を複数選択し、当該章だけを保存する。
8. 各章が`保存済み`になり、他章の未保存変更が維持されることを確認する。

## Validation and recovery

- 年間利用額が範囲外、内訳合計が年間利用額超過、または内訳があるのに年間利用額未設定の場合は理由を表示して保存を止める。
- `変更を元に戻す`で当該章だけを直前の保存値へ戻す。
- `次の保存を失敗させる`を選んだ場合、次の1回だけ保存失敗とし、入力を保持して再試行可能にする。
- 未保存変更がある内部遷移ではDialogを表示する。`編集を続ける`はDialogを閉じて起点へFocusを戻し、`変更を破棄して移動`は遷移する。
- Account Tabの切り替えは同一画面内の表示変更として扱い、未保存入力を保持したままDialogなしで切り替える。

## Boundary

- 再読み込み後は合成初期値へ戻る。
- Profile全体の削除、履歴、Account管理はSCR-ACC-004等の別Flowで扱う。
- Search画面の一時変更をProfileへ自動保存する挙動は実装しない。
