# Evidence Model

本サービスでは、表示する値だけでなく、その値の根拠を説明できることをDomain Requirementとする。

## Concept: Source

### Definition

Sourceは、Domain Factの根拠となる情報源である。

### Responsibility

Sourceは発行主体、URL、Source type、取得日、公開日、信頼Tier、Disclosure Statusを説明する。

### Identity

URL、発行主体、文書タイトル、公開日、版、取得日で判断する。同じURLでも内容が変わる可能性がある。

### Lifecycle

公開、更新、削除、移転、取得不能、版差し替えがありうる。

### Relationships

SourceはSource Document、Evidence、Observation、Domain Factと関係する。

### Invariants

- Sourceが消失しても過去に確認されたDomain Factを破壊しない。
- Tier4は発見用途に限定し、重要Factの確定にはTier1〜3を優先する。

### Boundaries

SourceはFactそのものではない。Sourceに書かれている内容からObservationやExtracted Factを分ける。

### Examples

- 経済産業省のPaidy行政処分PDF。
- クレディセゾンのセゾンゲーミングカードDigital終了告知。
- bitFlyer クレカ公式ページ。
- 全弁協公式サービス案内。

### Counterexamples

v1では一次情報で確認できた項目をTier4止まりまたは未確認として扱ったため、Paidy、UCSカードmajica、デポジット型、ホテル提携で誤りが生じた。

### Temporal Behavior

retrieved_at、published_at、announced_atを保持する。Sourceの現在取得可否と過去観測Factを分ける。

### Evidence Requirements

Sourceには最低限、発行主体、タイトル、取得日、URLまたは識別子、Source type、信頼度、Disclosure Statusが必要である。

### Open Questions

- Source消失時のアーカイブ保持方針。
- PDF、FAQ、LP、プレスリリースの版管理粒度。

## Concept: Evidence

### Definition

Evidenceは、SourceからDomain Factへ至る根拠の束である。

### Responsibility

Evidenceは、どのSourceのどのObservationが、どのFactやDecisionを支えているかを追跡する。

### Identity

対象Domain Fact、Source、Observation、抽出内容、取得日で判断する。Evidence自体は履歴を持つ。

### Lifecycle

追加、訂正、反証、失効、競合発見がありうる。

### Relationships

EvidenceはSource、Observation、Extracted Fact、Domain Fact、Decisionと関係する。

### Invariants

- Domain FactからEvidence、Sourceへ追跡できる。
- Counterevidenceを削除せずDecisionのConfidenceに反映する。
- Confirmation biasとして「反例が見つからない」をStrong evidenceにしない。

### Boundaries

EvidenceはSourceの単なるURL一覧ではない。抽出内容と対象Factを結びつける。

### Examples

- Paidyの登録Factは経済産業省PDFと結びつく。
- セゾンゲーミングカードDigitalのLifecycle Eventは公式終了告知と結びつく。
- bitFlyer クレカのActor Role分離はbitFlyer公式ページとニュース資料により支えられる。

### Counterexamples

JCA会員数905は今回の作業では公式再確認未達のため、暫定採用かつconfidence: mediumに留める。

### Temporal Behavior

Evidenceにはretrieved_atを持つ。Domain Factには別途effective_from等がある。

### Evidence Requirements

EvidenceにはFact claim、Source reference、Source type、confidence、disclosure status、observed_atまたはretrieved_atが必要である。

### Open Questions

- Evidenceの粒度をSource単位、段落単位、Fact単位のどこに置くか。

## Concept: Observation

### Definition

Observationは、調査時点でSourceから観測された内容である。

### Responsibility

Observationは、Raw SourceとDomain Factの中間にあり、調査者が何を見たかを記録する。

### Identity

Source、取得日、観測箇所、観測内容で判断する。

### Lifecycle

再観測、訂正、Source更新による差分がありうる。

### Relationships

ObservationはSource、Extracted Fact、Evidenceと関係する。

### Invariants

- ObservationからDomain Factへ変換するとき、推論を明示する。
- 観測できないものを「存在しない」としない。

### Boundaries

ObservationはDomain Decisionではない。解釈前の観測内容として扱う。

### Examples

- UCSカードmajicaの公式カード一覧でVisa/Mastercard/JCBブランド付きと観測された。
- Paidy公式サポートで3・6・12回あと払いの手数料条件が観測された。

### Counterexamples

「一次情報が見つからない」というObservationを「実在しない」というFactに変えると、v1のホテル提携、デポジット型、ゲーム提携の誤りを繰り返す。

### Temporal Behavior

Observationはretrieved_atに依存する。Source更新後の内容とは異なる可能性がある。

### Evidence Requirements

観測内容、取得日、Source、confidenceを残す。

### Open Questions

- スクリーンショットやPDFスナップショットをどこまで保持するか。

## Concept: Extracted Fact

### Definition

Extracted Factは、Observationから抽出された個別の事実候補である。

### Responsibility

Source内の文章や表から、Domain Fact候補として扱う単位を切り出す。

### Identity

抽出対象、値、条件、期間、Source、抽出時点で判断する。

### Lifecycle

抽出、訂正、反証、Domain Factへの昇格、棄却がありうる。

### Relationships

Extracted FactはObservation、Evidence、Domain Factと関係する。

### Invariants

- Extracted FactとDomain Factを同一視しない。
- 複数Sourceで矛盾する場合、Confidenceと適用期間を評価する。

### Boundaries

Extracted Factはまだ仕様上の決定ではない。

### Examples

- 「イオンゴールドカードは年間カードショッピング50万円（税込）以上」がExtracted Factとなる。
- 「bitFlyer クレカはアプラス発行・Mastercard」がExtracted Factとなる。

### Counterexamples

古い日本クレジット協会会員数をCurrent Factとして扱うと、基準日のズレを吸収できない。

### Temporal Behavior

Extracted FactはSource上の有効日と取得日を分ける。

### Evidence Requirements

抽出値、Source、抽出根拠、信頼度、適用条件を残す。

### Open Questions

- Fact抽出時に自然文の曖昧さをどう表現するか。

## Concept: Domain Fact

### Definition

Domain Factは、Evidenceによって支えられ、Domain SpecificationやRequirementsで参照可能な事実である。

### Responsibility

Domain Factは、値、状態、条件、期間、Confidence、Disclosure Status、Evidence chainを持つ。

### Identity

対象Concept、Fact type、値、条件、期間、Evidenceで判断する。

### Lifecycle

採用、訂正、反証、失効、履歴化がありうる。

### Relationships

Domain FactはEvidence、Source、Concept、Decision、Invariant、Scenarioと関係する。

### Invariants

- Domain FactはEvidenceなしに登録しない。
- Unknownとundisclosedを区別する。
- Sourceが消失しても履歴Factを削除しない。

### Boundaries

Domain FactはRequirementではない。RequirementはDomain FactとDecisionを入力として後工程で作る。

### Examples

- Paidyは包括信用購入あっせん業者として登録されている。
- Kyash CardはVisaプリペイド型Payment Instrumentである。
- セゾンゲーミングカードDigitalは段階的にFeature終了した。

### Counterexamples

Paidyの登録FactをTransaction Legal Classificationに流用すると、Fact boundaryを越える。

### Temporal Behavior

Domain Factはcurrentかhistoricalかfuture-effectiveかを区別する。

### Evidence Requirements

Domain Factには最低限、Evidence、Confidence、Disclosure Status、Temporal labelが必要である。

### Open Questions

- Domain Factの訂正履歴をどの粒度でRequirementsに引き渡すか。

## Disclosure Status

| Status | Definition | Domain Behavior |
|---|---|---|
| disclosed | Source上で明示されている | Factとして採用候補にできる |
| partially_disclosed | 一部は明示されるが条件や詳細が不足 | 不足部分をUnknownまたはundisclosedで分ける |
| undisclosed | 存在は示されるが非公開 | 推測しない |
| unknown | 調査で確認できない | 「存在しない」とは扱わない |
