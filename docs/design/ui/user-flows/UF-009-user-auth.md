# UF-009: 利用者Login・登録

## Goal

Accountが任意であることを保ちつつ、Login・登録・メール確認・Password再設定・Google連携境界を確認する。

## Main flow

1. `/account/login`で未登録検索とAccountの価値を比較する。
2. メール・PasswordでLoginまたは登録し、登録時はメール確認待ちを確認する。
3. Password再設定は確認済みメール経由と既存Session失効を確認する。
4. Google利用では同一メールを自動統合せず、既存Account Loginと本人確認を求める。
5. 唯一のLogin方法を失うGoogle解除は代替手段設定まで拒否する。

## Boundary

合成`.invalid`メールとMemory状態だけを使用し、認証、OAuth、メール送信、Credential保存、Cookie、永続化を行わない。

Traceability: FR-001、FR-010、AC-001、AC-003、NFR-SEC-001
