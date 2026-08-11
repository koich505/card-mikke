# Requirements Open Questions

Status: Approved
Last updated: 2026-08-11

| ID | Question | Why unresolved | Impact | Decision owner | Needed by | Blocking Requirements | Recommended action |
|---|---|---|---|---|---|---|---|
| RQ-011 | 算定不完全な候補を含む順位を、誤認なく比較できたと判断する受入基準は何か | 表示理解はUI Mockでの検証が必要 | 「最もお得」の誤認 | Product owner | UI Mock Approval前 | No | 実データ量に近いMockで検証 |
| RQ-013 | Icon・券面画像をどの利用条件で表示できるか | 商標・Asset利用許諾が未確認 | 権利侵害、代替表示 | Product owner / Legal reviewer | UI Mock開始前 | No | 公式規約を確認し、不可時はText代替 |
| RQ-017 | 変更項目を特定できない場合、どの範囲へ確認中表示を付けるか | UIでの誤認防止検証が必要 | 暫定値の理解 | Product owner | UI Mock Approval前 | No | Source依存情報全体への表示をMock検証 |
| RQ-033 | 初期利用先カテゴリ・企業Service Coverageをどう管理するか | 段階拡大方針だが初期集合が未決 | 検索精度、Coverage表現 | Product owner | UI Mock開始前 | No | 初期集合とCoverage集計単位を記録 |
| RQ-034 | 追加Filter・Sortを初期Releaseへ含めるか | 必須項目以外は未決 | Scope、UI | Product owner | UI Mock開始前 | No | UI Mockで候補を評価 |
| RQ-035 | 変更なしSourceの定期再確認周期と確認完了期限は何か | 日次差分検知と着手期限のみ決定済み | 情報鮮度、運用負荷 | Product owner / Operations owner | Architecture Planning前 | No | 規模・費用測定後に承認 |
| RQ-036 | Source消失時に抜粋・hash等を追加保持するか | metadata保持は決定済みだが追加証跡は未決 | 過去Fact説明責任、権利 | Product owner / Legal reviewer | Architecture Planning前 | No | 現行OQ-15と権利確認後に決定 |
| RQ-037 | 誤情報指摘Formの連絡先・受付確認・回答期限をどうするか | Login不要の処理Flowのみ決定済み | 対応状況確認、Privacy | Product owner | UI Mock開始前 | No | 任意連絡先と受付確認方法を決定 |
| RQ-038 | 券面画像の形式・解像度・複数券面Coverageは何か | 表示・Performance検証が必要 | 画像品質、Cost、UI | Product owner | UI Mock開始前 | No | UI Mockと性能測定で決定 |
| RQ-039 | Affiliate・解析の計測範囲、Cookie同意、適用条件は何か | 利用Service・法的条件が未決 | Privacy、計測、収益 | Product owner / Legal reviewer | Public Release前 | No | 採用Service確定後に法的確認 |
| RQ-040 | Structured Data、Sitemap、更新通知を初期Releaseへ含めるか | SEO詳細が未決 | Discoverability、保守 | Product owner | Architecture Planning前 | No | SEO PlanでApplicable判定 |
| RQ-041 | 有料外部通知を採用するか | Cost評価前 | 障害認知時間、Cost | Product owner | Architecture Planning前 | No | 5,000円目標内で判断 |

## Related Domain Open Questions

| Domain OQ | Requirements treatment | Owner / needed by |
|---|---|---|
| OQ-2 Product/Offering/Variant同一性、OQ-3 Contract/Account/Issuance/Instrument境界 | FR-013/017/029/033/035ではProvisionalな関係を保持し、固定分類へ変換しない | Domain/Architecture owner、対象Feature planning前 |
| OQ-5 法人・家族等のRole、OQ-7カードレス購買 | 初期Releaseの個人向けScopeに必要な家族・ETC関係だけ扱い、法人・カードレスを追加しない | Domain owner、Scope拡張前 |
| OQ-6 共同Issuer・地域Issuer・動的Billing Entity | FR-017/020/027/028/033/034でIssuer等をProduct共通単一値に固定せず、対象Product/Offering/地域/期間付きRole assignmentとして扱う | Domain/Architecture owner、発行会社検索・表示設計前 |
| OQ-8 Campaign Template/Instance、OQ-9非公開予算・抽選 | FR-005/015/016では確認済みのCampaign Instance/effectだけ算定し、最終構造を決めない | Architecture owner、Campaign feature planning前 |
| OQ-10 Reward/Benefit境界、OQ-11 Benefit関係 | 金銭換算対象をRequirementsで限定するが、Domain分類自体を解決済みにしない | Domain/Architecture owner、比較設計前 |
| OQ-12 Insurance/保障制度、OQ-13合算Rule | FR-017ではCoverage単位の確認済み表示だけ要求し、法的分類・合算構造を固定しない | Domain/Architecture owner、Insurance feature planning前 |
| OQ-14 Billing/枠回復 | 初期Releaseでは経済比較に直接必要なFee/支払条件以外のTransaction実行を扱わない | Architecture owner、該当Scope追加前 |
| OQ-15 Source保持、OQ-16 claim分解 | FR-024/NFR-EVID-003でmetadata要件を定め、保存媒体・最終分解方式は固定しない | Product owner/Legal/Architecture、Architecture Planning前 |
| OQ-17 Brand/Network/Operator | 表示IdentifierとActor Role・法的分類を混同しない | Domain/Architecture owner、ブランド設計前 |
| OQ-18 merchant/acquiring、OQ-19未確認Fact群 | 初期Releaseで直接必要な確認済みFactだけ使用し、未確認を不存在へ変換しない | Domain/Research owner、対象Feature採用前 |
