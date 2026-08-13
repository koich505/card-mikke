# Non-functional Requirements

Status: Approved
Last updated: 2026-08-13

## Security and Privacy

### NFR-PRIV-001: データ最小化と目的明示

- Classification: Required
- Requirement: Profile、保存した検索・比較、その利用者入力概要、Affiliate計測およびアクセス解析で取得・保存する情報を、明示した利用目的に必要な範囲へ限定する。
- Verification: 取得項目ごとに利用目的、必須・任意、保持期間、共有先を確認できることをRequirements Reviewで検査する。

### NFR-PRIV-002: Cookie等の計測技術に関する選択

- Classification: Required
- Requirement: Affiliate計測またはアクセス解析でCookieその他の利用者識別・追跡技術を使用する場合、利用目的と関係する外部事業者を明示し、適用される要件に従った同意または拒否手段を提供する。
- Verification: 計測の開始条件、拒否後の挙動、同意変更・撤回、および主要な検索・比較機能への影響を検証する。

### NFR-PRIV-003: 利用者による削除

- Classification: Required
- Requirement: 登録利用者がProfile、保存した検索・比較およびAccountの削除を自身で要求・実行でき、削除操作直後から利用者入力概要を含む対象データを利用不能にする。
- Requirement: 通常の利用領域から24時間以内、Backupから30日以内に削除する。
- Requirement: 保持例外がある場合は、対象、理由、保持期間を利用者へ明示する。
- Verification: 即時の利用停止、各期限内の削除、保持例外の表示、および削除失敗時の検知・再試行または通知を検証する。
- Requirement: 利用者Reviewの削除にも、即時非公開、通常領域24時間以内、Backup 30日以内の削除期限を適用する。
- Requirement: Account削除時は公開Reviewと却下Draftを同期限で削除し、通報者との直接紐付けを削除する。不正防止に必要な最小限の仮名化情報だけを90日、個人との直接紐付けを外したModeration・通報処理metadataを3年間保持する。
- Constraint: 初期Releaseでは単一管理者Roleが不正防止情報を扱う。仮名化情報を不正防止以外に使用しない。

### NFR-PRIV-004: Profile・保存した検索・比較の保持とExport対象外

- Classification: Required
- Requirement: Profileと明示的に保存した検索・比較はAccountが有効な間、利用者が削除するまで保持する。検索または比較を実行しただけの未保存データは、この保持対象に含めない。
- Requirement: Profile・保存した検索・比較のダウンロードまたはExport機能は初期Releaseの対象外とする。
- Verification: Account継続中の保持、個別削除、Account削除、およびExport機能が提供されていないことを確認する。

### NFR-SEC-001: Accountおよび運営機能の保護

- Classification: Required
- Requirement: 登録利用者のProfile・保存した検索・比較・利用者入力概要は本人だけが利用でき、カード情報や記事の確認・承認・公開は権限を持つ運営者だけが実行できるようにする。
- Verification: 未認証、別利用者、一般利用者および権限のない運営者によるアクセス・変更が拒否されることを検証する。
- Constraint: 初期Releaseでは一般利用者の多要素認証を必須にしない。
- Requirement: 管理者Accountでは多要素認証を必須とし、Passwordまたは外部Identity Providerによる一次認証とは異なる要素で本人を確認する。
- Requirement: 管理者の多要素認証手段を喪失した場合は、本人確認を伴う回復手続を使用し、回復の実行と認証要素の変更を監査記録および管理者通知の対象とする。
- Requirement: Passwordは最低12文字とし、漏洩済みまたは一般的すぎるPasswordを拒否する。大文字・小文字・数字・記号の種類別組合せは必須にしない。
- Requirement: Loginの連続失敗時は段階的に待ち時間を増やし、不自然な大量試行を一時制限する。失敗回数だけを理由とする恒久的なAccount Lockは行わない。
- Requirement: Sessionの最長期間は一般利用者30日、運営者12時間とし、Password変更・再設定時は既存Sessionを失効させる。
- Verification: 短い・漏洩済みPasswordの拒否、試行制限と回復、Session期限、Password変更後のSession失効、運営操作履歴を検証する。

### NFR-SEC-002: メール確認とPassword再設定

- Classification: Required
- Requirement: メールアドレスとPasswordによる登録ではメール確認を必須とし、Password再設定は確認済みの登録メールを通じて行う。
- Requirement: Password再設定後は、旧PasswordによるLoginと無効化対象のSessionを利用できないようにする。
- Verification: 未確認メールでの登録完了防止、再設定手続、期限切れ・再利用済み手続の拒否、および旧認証情報の無効化を検証する。

### NFR-SEC-003: 運営者Session

- Classification: Required
- Requirement: カード情報・記事の編集または承認時に、運営者Sessionが有効で権限を持つことを再確認する。
- Requirement: 運営者Sessionは最長12時間とし、期限後は再Loginを要求する。
- Requirement: 運営者Sessionは30分間操作がない場合に失効させ、再Loginと多要素認証を要求する。
- Constraint: 初期Releaseでは単一の管理者Roleを使用し、情報承認、記事、Review Moderation、通報処理、不正防止の専任Roleは分けない。
- Requirement: 管理者Accountを日常利用の一般利用者Accountと分離し、共有Accountとして使用しない。
- Requirement: 管理者Login、Password再設定、Google連携、認証方法変更および全Session失効を管理者が認識できる方法で通知する。
- Requirement: 管理者は自身の有効Sessionを確認し、個別または一括で失効できる。
- Requirement: 公開、承認、Affiliate Link変更、認証方法変更、利用者データ操作その他の高Risk操作では、過去15分以内に完了した本人再認証を要求する。本人再認証には管理者の多要素認証を含める。
- Requirement: 認証・管理操作について、CSRF、Session固定化、Credential stuffingおよび盗まれたSessionの再利用を検証対象とする。
- Verification: 一般利用者、期限切れSession、30分間無操作のSession、権限のない運営者からの編集・承認が拒否され、管理者Loginと高Risk操作で多要素認証が要求されることを検証する。

### NFR-SEC-004: 利用者入力Content

- Classification: Required
- Requirement: Login不要の誤情報指摘Form、利用者Review、および保存した検索・比較の概要を、Spam、不正な自動投稿、過大な入力、Script・HTML等の不正Contentから保護する。
- Requirement: 利用者入力に用途ごとの文字数上限を設け、上限を超える入力を保存・送信しない。保存した検索・比較の概要に適用する具体的な上限はRQ-042で決定する。
- Requirement: 利用者入力に含まれるHTMLやScriptを実行せず、安全なTextとして扱う。
- Requirement: Secret、Credential、不要な個人情報を投稿内容またはLogへ含めないよう案内し、運営者が不適切情報を非公開・削除できるようにする。
- Verification: 誤情報指摘、Review、保存概要について、未信頼入力、連続操作、過大入力、Script文字列、不正な権限操作が安全に拒否または無害化されることを検証する。

### NFR-SEC-005: Secret管理

- Classification: Required
- Requirement: Password、認証Token、API Key、Affiliate Credentialその他のSecretをSource code、公開Content、利用者向けError、Review本文、通常Logへ保存・表示しない。
- Requirement: SecretへのAccessを必要な運営・実行主体へ限定し、漏えいまたは不要化時に失効・更新できるようにする。
- Verification: Repository、公開成果物、Log、Error出力へのSecret混入検査と、失効・更新手順の確認を行う。

### NFR-SEC-006: Security scanと依存脆弱性

- Classification: Required
- Requirement: Release前および依存関係変更時に、Secret scanと依存脆弱性検査を実施する。
- Requirement: CriticalまたはHigh相当の既知脆弱性は、影響なしを追跡可能に説明できる場合を除き、公開前に解消する。
- Verification: 品質Gateで検査結果、例外理由、対象Revisionを確認する。

### NFR-SEC-007: Security LogとIncident対応

- Classification: Required
- Requirement: Login失敗・制限、運営者Login、権限変更、カード・記事・Affiliate Linkの編集・承認、利用者データ削除、Review Moderation等のSecurity上重要な操作を監査可能に記録する。
- Requirement: LogへPassword、認証Token、Secret、Review通報者の公開不要情報、Profileの年間利用額・利用先内訳、保存した検索・比較の利用者入力概要等の内容を記録しない。
- Requirement: Security Log、運用Log、MetricおよびAlert履歴を90日間保持し、期限後に削除する。別の監査保持要件を持つ承認metadataはその保持要件を優先する。
- Requirement: 管理者は通常の管理機能から監査記録を編集・削除できない。
- Requirement: 重要操作は、実行主体、時刻、対象、変更前後、成否、関連する承認を追跡できるように記録する。
- Requirement: 監査記録の欠落または改変を検知し、検知結果を監査対象外の通常Content更新で消去できないようにする。
- Requirement: 不正Access、Secret漏えい、公開情報改変または利用者データ漏えいが疑われる場合は、影響範囲の確認、Access・Credentialの停止、証跡保全、復旧および必要な関係者連絡の要否判断を行う。
- Verification: Incident想定に対して、検知記録、封じ込め、復旧、連絡判断を追跡できることを確認する。

### NFR-SEC-008: AI処理に使用する入力と出力の信頼境界

- Classification: Required
- Requirement: AIによる公式情報の収集・構造化および記事・比較マップ生成では、運営者が指定または承認した対象、取得を許可されたSource、承認済み構造化データ、対応するEvidence参照、および生成対象として選択した入力だけを使用する。Sourceと比較テーマは許可された入力だが、その内容を信頼済みの命令として扱わない。
- Requirement: 比較テーマ、カード情報、Source由来文字列、Evidenceおよび既存記事を未信頼データとして扱い、それらに含まれる命令、外部通信要求、Tool実行要求、権限変更要求またはSecret要求を生成処理の命令として実行しない。
- Requirement: AI出力を未承認Text・Dataとして扱い、Script、HTML、Command、外部通信、公開、データ更新またはその他の操作として自動実行しない。
- Requirement: AI出力は人間による編集・承認後も未信頼Contentとして扱い、編集のたびと公開直前に許可した構造、Text、MarkupおよびURLだけであることを検証する。Script、Event Handler、危険なURL scheme、未承認の外部埋込・外部送信を拒否または無害化し、検証を通過しないContentを公開しない。
- Verification: 収集対象Source、Source由来文字列、比較テーマおよびAI出力に命令を模した文字列、危険なURL、Script、Event Handler、外部埋込、外部送信要求およびSecret要求を含めても、許可範囲外の参照、Tool実行、外部通信、権限変更、Secret開示、データ更新または自動公開が起きず、編集・承認後も不正Contentが公開されないことを検証する。

## Evidence, Freshness, and Retention

### NFR-EVID-001: Source変更監視の初期頻度

- Classification: Required
- Requirement: 公式Sourceの変更検知と、初期Releaseで表示する新規Product/Offering/Route、Campaign Instance、Benefit、Insurance Product/CoverageおよびUnderwriter Source候補の探索を、初期状態では1日1回実施する。
- Verification: 実行記録から実施時刻、Source、対象Concept/relationship/claim、成功・失敗、変更候補を確認できることを検証する。
- Constraint: 費用、処理量、対象Source数および検知遅延を計測し、承認を伴って頻度を変更できるようにする。
- Requirement: 日次確認の失敗時は自動再試行し、3日連続で成功しない場合は運営者が確認できる警告を記録する。
- Requirement: 非AI運用費が月額4,000円へ到達した、日次処理が24時間以内に完了しない、3日連続で日次確認に失敗した、または公式Source側のAccess制限・利用条件に抵触する可能性が判明した場合は、確認頻度を見直す。
- Constraint: 見直し条件へ該当しても頻度を自動変更せず、費用、情報鮮度、Sourceへの影響を確認したうえでProduct ownerが新しい頻度を承認する。

### NFR-EVID-002: 変更確認への着手

- Classification: Required
- Requirement: 公式Sourceの変更検知後、運営者は3営業日以内に確認へ着手する。
- Verification: 検知時刻と最初の確認記録から期限内の着手を確認する。

### NFR-EVID-004: 訂正連絡の確認着手

- Classification: Required
- Requirement: 情報訂正の連絡受付後、3営業日以内に公式Sourceの確認へ着手することを努力目標とする。
- Verification: 受付時刻と最初の確認記録から達成状況を月次で確認する。

### NFR-EVID-003: Evidence metadataの保持

- Classification: Required
- Requirement: 掲載・計算に使用するEvidence metadataと更新・承認履歴を使用期間中保持し、使用終了後3年間保持する。
- Requirement: Evidence metadataはclaim単位で、Source type/tier、根拠箇所、取得・公開・発表・発効・観測等の確認可能な時点、適用期間、Disclosure Status、confidence、競合・訂正・supersedes関係および承認履歴を追跡できるようにする。
- Requirement: 使用終了後3年を経過したmetadataと関連履歴は、未解決の監査、訂正または明示された保持例外がない限り削除する。
- Verification: 現行・将来・廃止情報と、採用・不採用claimについて、SourceからObservation、Extracted Fact、Domain Fact、公開・算定利用、訂正まで追跡できることを検証する。

## Accessibility

### NFR-A11Y-001: Accessibility適合目標

- Classification: Required
- Requirement: 初期ReleaseからWCAG 2.2 Level AAへの適合を目標とする。
- Requirement: Keyboard操作、Focus、Semantic構造、Label、Contrast、文字拡大、Reduced motion、Error・Status・動的更新の通知を対象とする。
- Verification: 自動検査と、Keyboardおよび支援技術を用いた人間による主要Flowの確認を組み合わせる。

## SEO and Discoverability

### NFR-SEO-001: Index対象の分離

- Classification: Required
- Requirement: 公開されたカード詳細と記事を検索EngineのIndex対象とする。
- Requirement: Profile、保存した検索・比較、管理機能および利用者が入力した条件に基づく個人別検索結果をIndex対象外とする。
- Verification: 各Page種別のIndex可否と、認証が必要な情報が検索Engineへ公開されないことを検証する。

### NFR-SEO-002: 公開情報の検索向け表現

- Classification: Required
- Requirement: 公開カード詳細と記事について、内容と一致するTitle、Description、Canonicalおよび共有用Metadataを提供する。
- Requirement: 古い情報、変更確認中の情報、Disclosure Statusが`unknown`等の情報を、確定した最新情報として検索Engineへ提示しない。
- Verification: 代表PageのMetadataと表示内容、Canonical、Index制御の整合性を検証する。

## Performance

### NFR-PERF-001: 公開ページ表示性能

- Classification: Required
- Requirement: 中程度のSmartphone、下り10Mbps、往復遅延100ms、Cacheなしの条件で、公開ページの主要内容を2.5秒以内に表示することを初期目標とする。
- Requirement: 20回以上の測定における75 Percentileで目標を満たす。
- Verification: 代表的なカード詳細と記事について、主要な見出し、カード識別情報、主要Factが利用可能になるまでを測定する。

### NFR-PERF-002: 検索・比較応答性能

- Classification: Required
- Requirement: 検索・比較操作後、結果を2秒以内に提示することを初期目標とする。
- Requirement: 結果提示が目標時間を超える場合も、処理中であることを利用者へ即座に通知する。
- Requirement: カード2,000件、Rule 20,000件、利用先5,000件、中程度のSmartphone、下り10Mbps、往復遅延100ms、Cacheなしで、20回以上の測定における75 Percentileを合格判定に使用する。
- Verification: 検索実行操作から、順位と主要な年間正味還元額の目安が利用可能になるまでを測定する。

### NFR-PERF-003: データ増加時の動作

- Classification: Required
- Requirement: 初期測定量をカード2,000件、Rule 20,000件、利用先5,000件、公開Review 100,000件、保存した検索・比較100,000件とする。これらは性能検証用のデータ量であり、業務上の保存上限を意味しない。
- Requirement: カード、Rule、利用先、Review、保存した検索・比較が初期測定量および各項目を同時に2倍とした増加時測定量まで増加しても、結果を欠落・重複させず、NFR-PERF-001 / 002の条件で測定可能にする。
- Requirement: 性能目標を満たせない場合も、結果を推測・省略せず、処理中または制約を明示する。
- Verification: 上記の初期測定量と各項目を同時に2倍としたデータ量で、結果の欠落・重複と応答時間を確認する。

## Observability

### NFR-OBS-001: 主要障害の検知と記録

- Classification: Required
- Requirement: 公開サイトまたは検索・比較の停止、計算処理の継続的失敗、公式Sourceの日次確認失敗、記事・カード情報の更新失敗、Affiliate Linkの到達不能、および利用者データ削除の失敗を検知・記録できるようにする。
- Requirement: 障害記録から発生時刻、対象、状態、継続時間および対応状況を確認できるようにする。
- Requirement: 公開サイトと主要検索・比較Flowの到達性を継続的に確認し、AvailabilityとRTOの起算に使用する検知時刻を記録する。
- Verification: 各障害種別について、意図的に発生させた失敗が検知・記録されることを検証する。

### NFR-OBS-002: 運営者への障害通知

- Classification: Optional
- Requirement: 月額費用上限内で利用できる場合は、`NFR-OBS-001`の障害を運営者へ通知する。
- Constraint: 有料の外部通知Service導入によって月額費用上限を超えない。通知を採用しない場合も、運営者が障害状態と記録を確認できる手段を必要とする。

## Cost

### NFR-COST-001: 月額運用費上限

- Classification: Required
- Requirement: AI生成費を除くHosting、Build、Storage、外部API、監視・通知その他の継続費用について、初期Releaseの月額運用費を5,000円以内に保つことを目標とする。
- Requirement: 費用を主要項目別に計測し、少なくとも月次で合計と内訳を確認できるようにする。
- Requirement: 対象費用が月額4,000円へ到達した時点で、Product ownerが認識できる警告を行う。
- Constraint: 障害通知等の任意機能より、公開サイト、検索・比較、Evidence更新、Securityおよび利用者データ削除の必須要件を優先する。
- Constraint: 5,000円へ到達または超過しても、機能や処理を自動停止・制限しない。
- Verification: 想定利用量と実測費用に基づく月額見積り、請求実績、AI生成費を除外した内訳、および4,000円到達時の警告を確認する。

### NFR-COST-002: AI生成費の分離

- Classification: Required
- Requirement: 記事Draftその他のAI生成費を`NFR-COST-001`の月額5,000円目標とは分離して計測し、月次で金額と利用量を確認できるようにする。
- Constraint: AI生成費には現時点で自動停止または金額上限を設定しない。

## Availability

### NFR-AVAIL-001: 公開機能のAvailability

- Classification: Required
- Requirement: 計画停止を除く公開サイトおよび主要な検索・比較機能について、月間Availability 99.0%を初期目標とする。
- Requirement: 外部の利用者相当地点から公開Topと代表検索を5分間隔で確認し、いずれかが2回連続で失敗した最初の失敗時刻から、連続して成功を確認するまでを停止時間とする。
- Verification: 月次で対象時間から計画停止を除き、上記停止時間、部分障害、Availability算定結果を確認する。
- Constraint: 計画停止の事前告知は初期Releaseの必須要件としない。

### NFR-AVAIL-002: 最小BackupとRecovery

- Classification: Required
- Requirement: Profile、保存した検索・比較、お気に入り、カード・Campaign等の業務情報、記事、Evidence metadata、および更新・承認履歴をBackup対象とする。
- Requirement: 1日1回相当のBackupを取得し、障害発生前24時間以内の状態へ復旧できることを目標とする（RPO 24時間）。
- Requirement: 重大障害を検知した時点から24時間以内に主要機能を利用可能な状態へ戻すことを目標とする（RTO 24時間）。
- Requirement: 少なくとも年1回、Backupから実際に復旧できることと、主要データの整合性を確認する。
- Requirement: Backupは30日以内で循環・消去し、月額5,000円の対象費用へ含める。
- Requirement: Backupから復旧した場合も、Backup取得後に受け付けた利用者データ削除要求を特定し、再適用する。
- Verification: Backup実行記録、保持期間、年次復旧確認、RPO / RTO実績、および削除要求再適用の検証結果を確認する。
- Constraint: Backup製品、Storage、実行方式はRequirementsで固定しない。

## Legal and Editorial

### NFR-LEGAL-001: 公開Policy

- Classification: Required
- Requirement: 初期Releaseで、利用規約、Privacy Policy、広告・Affiliate Policy、記事・ランキングの編集方針、および情報の確認・更新方針を公開する。
- Requirement: 各Policyは、実際のデータ取得、計測、広告関係、選定基準および更新運用と一致させる。
- Verification: 公開内容と機能・運用の対応をRequirements Reviewおよび公開前確認で検証する。
- Constraint: 法的判断が必要な内容をAIだけで確定しない。

### NFR-LEGAL-002: 計算結果と情報提供の境界

- Classification: Required
- Requirement: 年間正味還元額は、利用者の入力条件と確認済み情報に基づく参考値であり、実際のポイント付与、審査通過、申込条件または便益を保証しないことを明示する。
- Requirement: 申込前にカード会社等の公式Sourceで最新情報と適用条件を確認する必要があることを明示する。
- Constraint: 免責表示を、未確認情報の推測、計算根拠の非表示、古い情報の確定表示を許容する理由として使用しない。
- Verification: 検索結果、計算内訳、カード詳細およびAffiliate導線から、参考値の意味、確認日、適用条件、未確認事項、公式確認の必要性を追跡できることを検証する。

### NFR-EDIT-001: 広告と編集判断の独立性

- Classification: Required
- Requirement: Affiliate報酬の有無・金額を検索順位、絞り込み結果、記事のおすすめ選定・順位へ影響させず、その方針を広告・Affiliate Policyと編集方針で公開する。
- Verification: 算定・選定基準にAffiliate報酬が含まれず、公開Policyと一致することを確認する。

### NFR-EDIT-002: 利用者Reviewと公式評価の分離

- Classification: Required
- Requirement: 利用者Review、平均星評価および件数を、公式商品情報、年間正味還元額、検索順位および運営記事の選定判断と区別する。
- Requirement: ReviewのModeration方針、禁止内容、自動判定の公開／非公開、編集・削除の扱いを利用者が確認できるようにする。
- Verification: Review集計値が年間正味還元額・検索順位・記事順位へ入力されず、公開Reviewが自動判定で公開可となったものであることを確認する。
- Requirement: 公開後通報の理由と処理結果を記録し、通報者の情報を投稿者または一般利用者へ開示しない。
- Requirement: 通報件数だけで自動非公開にせず、受付後3営業日以内の確認着手を努力目標とする。
- Requirement: 修正・再投稿されない確認が必要な非公開Review Draftは30日後に削除する。

## Maintainability

### NFR-MAINT-001: 業務情報の運用変更

- Classification: Required
- Requirement: カード、利用先カテゴリ、企業・サービス、ポイント換算基準、Campaign等の日常的な追加・訂正・無効化を、Application codeの変更なしに権限を持つ運営者が実施できるようにする。
- Requirement: 業務情報の変更は、公式Source、適用時期、変更理由、変更者および承認履歴から追跡可能にする。
- Verification: 代表的な追加、条件改定、終了、誤訂正について、コード変更なしに承認済み情報へ反映でき、過去履歴を追跡できることを検証する。

### NFR-MAINT-002: Configuration・環境差・変更互換性

- Classification: Required
- Requirement: 開発・検証・公開環境のConfigurationとSecretを分離し、環境差を追跡可能にする。
- Requirement: 検証環境で本番の利用者Credentialや不要な個人データを使用しない。
- Requirement: Releaseや業務情報変更後も、既存Account、Profile、保存した検索・比較、Evidence、承認履歴および公開URLの必要な継続性を損なわない。互換性を失う変更は影響、移行、復旧方法を事前に承認する。
- Verification: 環境別設定、個人データ不使用、代表的な既存データと公開URLの継続性をRelease前に確認する。

### NFR-OPS-001: 公開情報・業務情報のRollback

- Classification: Required
- Requirement: 誤ったカード情報、計算Rule、記事、Affiliate LinkまたはReview Moderation結果を公開した場合、直前の承認済み状態へ戻せるようにする。
- Requirement: Rollback後も誤変更、Rollback理由、実行者、時刻および前後状態を保持する。
- Constraint: Rollbackで利用者データ削除要求やSecurity修正を無条件に取り消さない。
- Verification: 代表的な業務情報変更について、承認済み状態への復元と監査履歴を確認する。

### NFR-COMPAT-001: 対応Device・Browser

- Classification: Required
- Requirement: PCおよびSmartphoneを初期対象とし、Chrome、Safari、Edge、Firefoxの現行Major versionと直前Major versionをSupportする。
- Verification: 対象Browser・Deviceの組合せで、主要な検索、比較、Account、記事閲覧および運営承認Flowを確認する。

## Other Quality Areas

追加の品質軸はChecklist自己確認時にRequirement、Not ApplicableまたはOpen Questionへ分類する。
