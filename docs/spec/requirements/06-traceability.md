# Requirements Traceability

Status: Approved
Last updated: 2026-08-13

## Product Owner Decisions

以下は対話で採用され、Requirementsへ反映された判断の正本である。生の会話Logを承認根拠として使用しない。

| Decision ID | Date | Adopted decision | Requirements |
|---|---|---|---|
| RD-001 | 2026-08-09 | 個人向けクレジットカードを初期対象とし、法人、デビット、プリペイド、BNPL等を対象外とする | `00-scope.md` |
| RD-002 | 2026-08-09 | 年間利用額、現金相当還元、年会費から年間正味還元額を算定し、非金銭Benefitを含めない | FR-005, FR-016 |
| RD-003 | 2026-08-09 | 初年度と通常年を分け、抽選Campaignを算定へ含めない | FR-006, FR-015 |
| RD-004 | 2026-08-09 | 未登録でも検索・比較でき、登録時はProfile・保存した検索・比較・お気に入りを利用できる。検索・比較の保存契機はRD-035で明確化した | FR-001–FR-003, FR-010, FR-011, FR-030 |
| RD-005 | 2026-08-09 | 利用先カテゴリと個別企業・Serviceを指定し、年間総額と内訳を重複加算しない | FR-012 |
| RD-006 | 2026-08-09 | 算定不能値は推測せず、変更確認中の過去承認値は注意表示付きで継続算定する | FR-014, FR-023 |
| RD-007 | 2026-08-09 | 記事はAI Draft、人間確認・承認後公開とし、自動公開しない | FR-008, FR-009, FR-031 |
| RD-008 | 2026-08-09 | Affiliate報酬を検索順位・記事選定へ影響させず、広告関係を開示する | FR-019, NFR-EDIT-001 |
| RD-009 | 2026-08-09 | 公式Sourceだけを確定情報に使い、日次探索・差分検知・人間承認後に更新する | FR-020–FR-024, FR-033, FR-034 |
| RD-010 | 2026-08-09 | Account・利用者データは即時利用不能、通常領域24時間、Backup 30日以内で削除する | FR-025, NFR-PRIV-003 |
| RD-011 | 2026-08-09 | メール・PasswordとGoogle認証を採用する。MFAを必須にしない当初判断はRD-028により一般利用者だけへ限定した | FR-001, NFR-SEC-001–003 |
| RD-012 | 2026-08-09 | Accessibility WCAG 2.2 AA、公開2.5秒、検索2秒を初期目標とする | NFR-A11Y-001, NFR-PERF-001, NFR-PERF-002 |
| RD-013 | 2026-08-09 | 非AI運用費は月額5,000円目標、4,000円警告、超過時自動停止なしとする | NFR-COST-001, NFR-COST-002 |
| RD-014 | 2026-08-09 | Availability 99.0%、最小BackupのRPO / RTOを各24時間とする | NFR-AVAIL-001, NFR-AVAIL-002 |
| RD-015 | 2026-08-10 | 一般申込Routeが確認できず招待Route等だけが確認されるOffering、および受付停止中のOffering/Routeを初期検索から除外し、Filterで含められるようにする | FR-013 |
| RD-016 | 2026-08-10 | 比較最大5枚、お気に入り最大50枚、未登録お気に入り30日とする | FR-029, FR-030 |
| RD-017 | 2026-08-10 | AIが公式情報を初回・継続収集し、項目差分を人間が承認する | FR-021, FR-022, FR-033, FR-034 |
| RD-018 | 2026-08-10 | 商品同一性を判別できない新規カード候補は自動登録・統合せず人間判断へ回す | FR-033 |
| RD-019 | 2026-08-10 | 券面画像もAIが未公開Draftへ取得し、人間承認後だけ公開する | FR-035 |
| RD-020 | 2026-08-10 | Login不要の誤情報指摘Formを設け、公式確認後に修正または理由付き却下する | FR-026 |
| RD-021 | 2026-08-10 | Login利用者Reviewを1人1カード1件、星1〜5＋Message、AI検査＋人間承認で公開する | FR-036, FR-037 |
| RD-022 | 2026-08-10 | Review集計は経済順位・記事順位へ影響させず、Login利用者からの通報を人間判断する | FR-037, FR-038, NFR-EDIT-002 |
| RD-023 | 2026-08-10 | 経済計算は厳密額ではなく、カテゴリ内最良条件、月次均等配分、取引単位概算を明示した目安とする | FR-005, FR-012, FR-016 |
| RD-024 | 2026-08-10 | Account削除時はReviewを削除し、通報は直接識別を外し、最小限の仮名化不正防止情報を90日保持する | FR-025, NFR-PRIV-003 |
| RD-025 | 2026-08-10 | 初期運営は単一管理者Roleとし、専任の不正防止Roleを設けない | FR-022, NFR-SEC-003 |
| RD-026 | 2026-08-10 | Performance・Availabilityは指定Mobile条件、75 Percentile、規定データ量、外部5分監視で測定する | NFR-PERF-001–003, NFR-AVAIL-001 |
| RD-027 | 2026-08-10 | 用途・読者像別の複数カード記事に加え、単一カードの新商品・機能・特典・変更内容を扱う特集記事を初期対象とする | FR-007, FR-008, FR-009, FR-031 |
| RD-028 | 2026-08-10 | 管理者のみMFA必須、運営者Sessionは無操作30分で失効、高Risk操作はMFAを含む再認証から15分以内に限定する | NFR-SEC-001, NFR-SEC-003, AC-040 |
| RD-029 | 2026-08-10 | 初期性能試験量をカード2,000件、Rule 20,000件、利用先5,000件、公開Review 100,000件、保存した検索・比較100,000件とし、各項目同時2倍も増加時試験に使用する。これらは保存上限としない | NFR-PERF-002, NFR-PERF-003, AC-034 |
| RD-030 | 2026-08-10 | 家族・追加カードIssuanceおよび関連ETC Payment Instrumentの申込可能性を検索Filterに含め、対象Product/Offering/Routeとの関係が未確認の候補は一致扱いにしない。除外件数・未確認理由の表示は必須としない | FR-013, FR-017, AC-010 |
| RD-031 | 2026-08-10 | 二軸比較マップは、AIが既存の承認済みカード情報から比較軸・評価基準・配置・理由をDraft生成し、人間が軸と配置を明示承認した後だけ記事として公開する。生成入力・出力は未信頼データとして分離し、人間の編集後も基準との整合を再検証する | FR-007–FR-009, FR-031, NFR-SEC-008, AC-016, AC-032 |
| RD-032 | 2026-08-10 | 既存の手入力・Profile条件による探索を残し、運営者が事前設定した旅行好き、ショッピング好き、シンプルでお得重視等のテーマをワンクリックで適用して検索結果へ到達できる入口を追加する | FR-040, AC-041 |
| RD-033 | 2026-08-10 | サイト名称を`カードみっけ`とする | `00-scope.md`, `docs/design/ui/00-ui-scope.md`, UIR-BRAND-001 |
| RD-034 | 2026-08-10 | テーマ条件は年間利用額を含む検索・算定条件一式とし、選択時はProfile反映値または手入力値を今回の検索だけ置き換え、Profileは更新しない | FR-040, AC-041, AC-042 |
| RD-035 | 2026-08-13 | 検索・比較は自動履歴化せず、登録利用者が結果から明示的に保存し、保存内容を識別する概要を自分で入力する | FR-010, FR-011, FR-025, NFR-PRIV-001, NFR-PRIV-003, NFR-PRIV-004, AC-004, AC-022 |
| RD-036 | 2026-08-13 | 公開済み特集記事にフリーワード検索、タグ・記事種別による絞り込み、新着順・更新順、更新確認中表示を追加する。複数タグはすべて含む条件とし、本文全体は初期検索対象に含めない | FR-041, AC-043 |

## Domain to Requirements

| Domain source | Concept / Constraint | Requirements | Status |
|---|---|---|---|
| `00-scope.md` | 日本国内のカードおよび隣接領域、条件付きRequirements Ready | Requirements `00-scope.md`, FR-004, FR-027 | Adopted within narrowed initial scope |
| `01-glossary.md` | Issuer、Contract/Account/Issuance/Instrument、Campaign、Insurance/Coverage、Evidence等の共通語彙 | FR-013, FR-015, FR-017, FR-020, FR-024, FR-028, FR-029, FR-032–FR-035, NFR-EVID-003 | 実装Entity名として扱わず、Provisional/OQを固定しない |
| `02-actors-and-roles.md` | Actor / Role分離、運営者、利用者、発行主体 | FR-001, FR-022, FR-025, FR-032, NFR-SEC-001, NFR-SEC-003 | Traced |
| `03-products.md` | Product / Offering / Variant、受付状態 | FR-013, FR-017, FR-027, FR-032, FR-033 | 商品同一性が不明な新規候補を自動登録・統合せず、現行OQ-2のProvisional境界を固定しない |
| `04-membership-and-issuance.md` | Contract、Account、Eligibility、Application Route、Member Role、Issuance | FR-002, FR-004, FR-013, FR-017, FR-019, FR-029, FR-033 | Invitationを審査・発行保証へ変換せず、家族等をBooleanへ平坦化しない |
| `05-payment-and-credit.md` | Payment Instrument / Scheme / Funding / Credit Facility / Billing分離 | FR-005, FR-013, FR-017, FR-020, FR-029 | 初期Releaseに必要なFee/Instrument表示以外を固定分類へ先取りしない |
| `06-rewards-and-economic-flows.md` | Reward / Benefit / Partner Revenue Share分離 | FR-005, FR-015, FR-016, FR-017 | 現行OQ-10/11を保持。金銭換算境界を要件で限定 |
| `07-rules.md` | Fee、Reward、Eligibility、Campaign等の条件 | FR-005, FR-006, FR-012, FR-015, FR-016, FR-021, FR-032 | 適用条件・期間・上限を保持 |
| `08-temporal-model.md` | Product / Feature Lifecycle、時点・期間 | FR-006, FR-011, FR-017, FR-021, FR-023, FR-024, FR-031 | 当時値と最新値を分離 |
| `09-evidence-model.md` | Evidence chain、claim-level Disclosure Status | FR-014, FR-017, FR-020–FR-024, FR-026, FR-033, FR-034, NFR-EVID-001–003 | Source全体へ単一Statusを付与しない |
| `10-invariants.md` | 未確認を不存在としない、各Conceptを混同しない | FR-005, FR-014, FR-020, NFR-LEGAL-002 | Traced |
| `11-scenarios.md` | 検索・比較で必要となる主要境界Scenario | FR-004–FR-006, FR-012–FR-017, FR-023 | 未確認具体例をFact化しない |
| `12-open-questions.md` | OQ-1–19 | Requirements `05-open-questions.md`, FR-014, FR-020, FR-024, NFR-EVID-003 | Blocks Requirements: Noを維持。Architectureへ先送りする境界を固定しない |
| `13-research-traceability.md` | research 04〜13の主要結論・Unknown対応 | FR-013–FR-017, FR-020–FR-024, FR-029, FR-032–FR-035, NFR-EVID-001–004 | Unknown Registerを不存在・固定値へ変換しない |
| `14-campaigns.md` | Campaign Instance/effect、確定/抽選、条件、上限、複数期間、早期終了 | FR-005, FR-006, FR-015, FR-016, FR-021, FR-023, FR-032–FR-034 | OQ-8/9を保持し、確認済みeffectだけ算定 |
| `15-insurance.md` | Insurance Product / Coverage、Trigger、Limit、Exclusion、Claim、Underwriter | FR-017, FR-020–FR-024, FR-032–FR-034 | 初期Releaseは金銭算定外の確認済みCoverage表示。OQ-12/13を保持 |
| `.ai/shared/evidence-policy.md` | 公式Source、確認日、Disclosure Status、外部送信制約 | FR-008, FR-014, FR-017, FR-020–FR-024, FR-026, NFR-PRIV-001, NFR-EVID-001–003 | Traced |

## Requirement to Acceptance Criteria

| Requirement | Acceptance Criteria |
|---|---|
| FR-001 | AC-001, AC-003 |
| FR-002, FR-003 | AC-002 |
| FR-004, FR-010 | AC-001, AC-011 |
| FR-005, FR-006, FR-015, FR-016 | AC-007, AC-008, AC-009 |
| FR-007, FR-008, FR-009, FR-031 | AC-016 |
| FR-011 | AC-022 |
| FR-012 | AC-005, AC-006 |
| FR-013 | AC-010 |
| FR-014, FR-023 | AC-009 |
| FR-017, FR-018, FR-020 | AC-014 |
| FR-035 | AC-014, AC-027 |
| FR-019 | AC-015 |
| FR-021, FR-022, FR-023 | AC-017, AC-009 |
| FR-024, FR-026 | AC-023 |
| FR-025 | AC-004 |
| FR-027 | AC-019 |
| FR-028 | AC-011 |
| FR-029 | AC-012 |
| FR-030 | AC-013 |
| FR-032 | AC-018 |
| FR-033, FR-034 | AC-017, AC-025, AC-026 |
| FR-036, FR-037 | AC-028, AC-029 |
| FR-038 | AC-030 |
| FR-039 | AC-031 |
| FR-040 | AC-041, AC-042 |
| FR-041 | AC-043 |
| NFR-SEC-005, NFR-SEC-006, NFR-SEC-007 | AC-032 |
| NFR-SEC-008 | AC-016, AC-032 |
| NFR-MAINT-002, NFR-OPS-001 | AC-033 |
| NFR-PERF-003 | AC-034 |
| NFR-PRIV-001, NFR-PRIV-002, NFR-PRIV-004, NFR-SEC-001, NFR-SEC-002, NFR-SEC-003 | AC-035, AC-040 |
| NFR-SEC-004 | AC-022, AC-028, AC-035 |
| NFR-EVID-001, NFR-EVID-002, NFR-EVID-004, NFR-SEO-001, NFR-SEO-002 | AC-036 |
| NFR-OBS-001, NFR-OBS-002 | AC-037 |
| NFR-LEGAL-001, NFR-LEGAL-002 | AC-038 |
| NFR-COMPAT-001 | AC-039 |
| NFR-PRIV-003 | AC-004 |
| NFR-EVID-003 | AC-023 |
| NFR-MAINT-001 | AC-018 |
| NFR-EDIT-001 | AC-015 |
| NFR-EDIT-002 | AC-028, AC-029, AC-030 |
| NFR-A11Y-001, NFR-PERF-001, NFR-PERF-002, NFR-AVAIL-001, NFR-COST-001, NFR-COST-002 | AC-021 |
| NFR-AVAIL-002 | AC-024 |
| Requirements `00-scope.md` Success Conditions | AC-020 |

## UI Mock Handoff

| Topic | Requirements / AC | Handoff status |
|---|---|---|
| Profile自動反映と一時変更 | FR-003 / AC-002 | UI Mockで保存有無の誤認を検証 |
| 検索・比較の明示保存 | FR-010, FR-011 / AC-022, RQ-042 | 結果からの保存Action、概要入力、保存成功・失敗・取消、未保存時に保存一覧へ追加されないこと、および保存済み項目の時点差を改訂UI Mockで検証 |
| 利用先カテゴリと企業・サービス | FR-012 / AC-005, AC-006 | 階層指定と金額不整合を検証 |
| 完全・不完全・変更確認中の算定 | FR-014, FR-023 / AC-009 | 状態、旧値、順位変動可能性の理解を検証 |
| Filter、0件、比較 | FR-004, FR-013, FR-029 / AC-010–012 | Desktop / Mobileと主要状態を検証 |
| Evidence、確認日、Source | FR-017 / AC-014 | Disclosure Statusと一般画面状態を混同しない表示を検証 |
| Affiliate・広告 | FR-019 / AC-015 | PR表示と申込前確認の認識を検証 |
| 記事更新確認中 | FR-031 / AC-016 | 旧記事継続掲載時の誤認防止を検証 |
| 特集記事一覧・検索・絞り込み | FR-041 / AC-043 | フリーワード、複数タグ（すべて含む）、記事種別、新着／更新順、公開済み限定、0件、更新確認中、Desktop／Mobileの操作を検証 |
| 単一カード特集記事 | FR-007, FR-019 / AC-015, AC-016 | 対象カード、特徴、適用条件、確認時点、公式Sourceおよび広告・Affiliate関係の理解を検証 |
| 二軸比較記事 | FR-007–FR-009, FR-031, NFR-SEC-008 / AC-016, AC-032 | 軸・方向・評価基準・配置理由・配置不能理由・確認時点・Source・代替表現の理解、総合順位としての誤認、AI入力・出力の信頼境界および編集後の整合性を検証 |
| テーマ別プリセット検索 | FR-040 / AC-041, AC-042 | テーマの発見性、ワンクリック到達、適用条件の理解、通常検索との併存、条件変更導線、運営管理、および優位性を保証する表現への誤認を検証 |
| Campaign算定 | FR-005, FR-006, FR-015, FR-016 / AC-007–009 | 実施回、確定/抽選、複数期間、上限、算定除外理由の理解を検証 |
| Benefit・Insurance表示 | FR-017 / AC-014 | Provider/Beneficiary、Coverageごとの条件・上限・除外・確認状態を最高額や単一特典へ誤認しないか検証 |

## Architecture-blocking Domain Questions

`docs/spec/domain/12-open-questions.md`の現行Architecture Blocking Setに従う。初期Releaseの対象Featureでは、少なくともOQ-2（Product/Offering/Variant）、OQ-3（Contract/Account/Issuance/Instrument）、OQ-6（共同/地域Issuer・Billing Entity）、OQ-8/9（Campaign）、OQ-10/11（Reward/Benefit）、OQ-12/13（Insurance）、OQ-15/16（Evidence/claim）、OQ-17（Brand/Network）を対象範囲に応じてArchitecture前に解決する。OQ-5、OQ-7、OQ-14、OQ-18/19は、家族・ETC表示、Scope拡張または該当機能に関係する場合だけBlockingとする。本RequirementsはDB、API、固定列挙または実装構造によってこれらを解決済みにしない。
