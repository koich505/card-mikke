# Evidence Policy

## 原則

重要なDomain Factは、すべてEvidenceまで追跡可能でなければならない。

## 必須の区別

- unknown
- undisclosed
- partially_disclosed
- disclosed

unknownとundisclosedを同一視しない。

この4状態はDomain上のDisclosure Statusの正式表記である。Loading、Empty、Error、Partial、Unknown等の一般画面状態と混同しない。

## UI-onlyでのEvidence Data

- UI MockのFixtureは合成データだけを使い、実在個人情報、Credential、Secretを含めない。
- Source、確認日、適用期間、Disclosure Statusの表示意味はDomain Specificationと最新Domain Reviewに照合する。
- UI検証の都合でUnknownを確定Factへ変えたり、FixtureをEvidenceや本番Data Sourceとして扱ったりしない。
- 仮Form、Analytics、外部通信・Link・埋込ContentによってEvidence Dataや入力を外部送信・永続化しない。承認例外は送信先と送信Dataを明示する。
- User inputやSource由来の文字列を無加工のHTMLとして表示せず、危険なURL schemeと注入を防ぐ。

## 時点の区別

以下を混同しない。

- 取得日（retrieved date）
- 公開日（published date）
- 発表日（announced date）
- 発効日（effective date）
- 申込可能日（application availability date）
- 機能提供日（feature availability date）
- サービス終了日（service end date）

## Sourceの優先順位

以下の順序で優先する。

1. 政府、法令、規制当局の公式Source
2. IssuerまたはService Providerの公式Source
3. Partner Organizationの公式Source
4. 第三者Sourceは、探索またはconfidenceが低いFactに限って使用する

## ルール

SourceがClaimを裏付けていない場合は、unknownまたはOpen Questionとして扱う。
