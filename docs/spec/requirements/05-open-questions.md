# Requirements Open Questions

Status: Approved
Last updated: 2026-08-10

| ID | Question | Why unresolved | Impact | Decision owner | Needed by | Blocking Requirements | Recommended action |
|---|---|---|---|---|---|---|---|
| RQ-011 | 算定不完全な候補を含む順位を、誤認なく比較できたと判断する受入基準は何か | 表示理解はUI Mockでの検証が必要 | 「最もお得」の誤認 | Product owner | UI Mock Approval前 | No | 実データ量に近いMockで検証 |
| RQ-013 | Icon・券面画像をどの利用条件で表示できるか | 商標・Asset利用許諾が未確認 | 権利侵害、代替表示 | Product owner / Legal reviewer | UI Mock開始前 | No | 公式規約を確認し、不可時はText代替 |
| RQ-017 | 変更項目を特定できない場合、どの範囲へ確認中表示を付けるか | UIでの誤認防止検証が必要 | 暫定値の理解 | Product owner | UI Mock Approval前 | No | Source依存情報全体への表示をMock検証 |
| RQ-033 | 初期利用先カテゴリ・企業Service Coverageをどう管理するか | 段階拡大方針だが初期集合が未決 | 検索精度、Coverage表現 | Product owner | UI Mock開始前 | No | 初期集合とCoverage集計単位を記録 |
| RQ-034 | 追加Filter・Sortを初期Releaseへ含めるか | 必須項目以外は未決 | Scope、UI | Product owner | UI Mock開始前 | No | UI Mockで候補を評価 |
| RQ-035 | 変更なしSourceの定期再確認周期と確認完了期限は何か | 日次差分検知と着手期限のみ決定済み | 情報鮮度、運用負荷 | Product owner / Operations owner | Architecture Planning前 | No | 規模・費用測定後に承認 |
| RQ-036 | Source消失時に抜粋・hash等を追加保持するか | metadata保持は決定済みだが追加証跡は未決 | 過去Fact説明責任、権利 | Product owner / Legal reviewer | Architecture Planning前 | No | OQ-14と権利確認後に決定 |
| RQ-037 | 誤情報指摘Formの連絡先・受付確認・回答期限をどうするか | Login不要の処理Flowのみ決定済み | 対応状況確認、Privacy | Product owner | UI Mock開始前 | No | 任意連絡先と受付確認方法を決定 |
| RQ-038 | 券面画像の形式・解像度・複数券面Coverageは何か | 表示・Performance検証が必要 | 画像品質、Cost、UI | Product owner | UI Mock開始前 | No | UI Mockと性能測定で決定 |
| RQ-039 | Affiliate・解析の計測範囲、Cookie同意、適用条件は何か | 利用Service・法的条件が未決 | Privacy、計測、収益 | Product owner / Legal reviewer | Public Release前 | No | 採用Service確定後に法的確認 |
| RQ-040 | Structured Data、Sitemap、更新通知を初期Releaseへ含めるか | SEO詳細が未決 | Discoverability、保守 | Product owner | Architecture Planning前 | No | SEO PlanでApplicable判定 |
| RQ-041 | 有料外部通知を採用するか | Cost評価前 | 障害認知時間、Cost | Product owner | Architecture Planning前 | No | 5,000円目標内で判断 |

## Related Domain Open Questions

- OQ-14（Source消失時のFact履歴保持方針）は非機能要件で検討する。
- OQ-16（Rewardと非Reward Benefitの境界）を、独自の金銭換算によって解決済みにしない。
- OQ-17（Disclosure Statusのclaim分解粒度）を、比較表示の都合で固定しない。
- OQ-18のv1由来Factは、一次Sourceで再確認されるまで検索・記事の確定情報に使用しない。
