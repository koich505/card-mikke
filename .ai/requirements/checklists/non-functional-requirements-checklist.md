# Non-functional Requirements Checklist

## 使用目的

非機能要件が品質軸ごとに検討され、検証可能な要求または明示的なOpen Questionとして記録されているか確認する。

すべての項目を必須要件にするのではなく、`Required`、`Not Applicable`、`Open Question`を判断する。`Required`には`NFR-*` ID、基準、検証方法を記載する。

## Security and Privacy

- [ ] 対象となるデータ、個人情報、秘密情報が識別されている。
- [ ] 認証・認可が必要な利用者と操作が識別されている。
- [ ] 入力、外部Link、外部Content、管理操作の脅威が検討されている。
- [ ] Secret管理、依存脆弱性、Security scanの要求が検討されている。
- [ ] Logへ記録してよい情報と禁止する情報が識別されている。
- [ ] Security incident時の対応と連絡要否が検討されている。

## Accessibility

- [ ] 適用するAccessibility基準または目標Levelが定義されている。
- [ ] Keyboard操作、Focus、Semantic構造、Labelの要求がある。
- [ ] Contrast、文字拡大、Reduced motion等が検討されている。
- [ ] Error、Status、動的更新を支援技術へ伝える要求がある。
- [ ] 自動検査と人間による確認の範囲が区別されている。

## Performance

- [ ] 主要ページまたは主要操作の測定対象が定義されている。
- [ ] Performance目標に測定条件と許容値がある。
- [ ] Mobile環境、画像、JavaScript、外部通信の影響が検討されている。
- [ ] データ量増加時の期待動作または制約が定義されている。

## SEO and Discoverability

- [ ] Index対象と非対象が識別されている。
- [ ] Title、Description、Canonical、OGP等の要求が検討されている。
- [ ] Structured Dataの必要性と正確性が検討されている。
- [ ] URL、内部Link、Sitemap、更新情報の要求が検討されている。
- [ ] Unknownまたは古い情報を検索Engineへ誤って確定情報として提示しない。

## Evidence, Freshness, and Retention

- [ ] 重要な表示情報にSourceと確認日を追跡できる要求がある。
- [ ] 情報の鮮度、再確認周期、期限切れ時の扱いが定義されている。
- [ ] Source消失時のEvidence保持方針が定義またはOpen Question化されている。
- [ ] Fact変更時の履歴、訂正、監査可能性が検討されている。
- [ ] unknown、undisclosed、partially_disclosedの表示要求が検討されている。

## Availability and Operations

- [ ] Availability目標と対象時間帯が検討されている。
- [ ] 外部Service障害時の期待動作が定義されている。
- [ ] Maintenance、Rollback、Recoveryの要求が検討されている。
- [ ] Backup対象、保持期間、復旧目標が検討されている。
- [ ] Configurationと環境差を管理する要求がある。

## Observability

- [ ] 監視する主要な利用経路と失敗が識別されている。
- [ ] Log、Metric、Alertの目的と保持方針が検討されている。
- [ ] 個人情報やSecretをObservabilityデータへ含めない要求がある。
- [ ] 障害原因と影響範囲を追跡できる要求がある。

## Cost

- [ ] Hosting、Build、Storage、外部API、LLM等の費用項目が識別されている。
- [ ] 月額上限または警告閾値を決める時期と決定者が明示されている。
- [ ] 費用増加を計測・通知する要求が検討されている。
- [ ] 品質を損なう根拠のない微細最適化を要求していない。

## Maintainability and Delivery

- [ ] 対応Browser、Device、Locale等のSupport範囲が検討されている。
- [ ] Test、Review、CIの必須GateがRequirementsまたはProject Policyから追跡できる。
- [ ] 変更履歴、Versioning、互換性に関する要求が検討されている。
- [ ] 運用担当者が更新・訂正できる要求が検討されている。

## Legal and Editorial

- [ ] 情報提供と個別助言の境界、免責表示の必要性が検討されている。
- [ ] 広告、Affiliate、Ranking、比較基準の透明性が検討されている。
- [ ] 引用、商標、画像、Source利用に関する制約が検討されている。
- [ ] 法的判断が必要な事項をAIだけで確定しない。

## Completion

- [ ] 各品質軸がRequirement、Not Applicable、Open Questionのいずれかに分類されている。
- [ ] 必須NFRに一意なID、測定基準、検証方法がある。
- [ ] Architectureで決める内容とRequirementsとして必要な制約が分離されている。
- [ ] UI Mock工程で検証する品質要求が識別されている。
