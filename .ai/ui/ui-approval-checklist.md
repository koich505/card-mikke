# UI Mock Approval Checklist

## 使用目的

High-fidelity UI Mockが独立レビューと人間による承認へ進める状態か確認する。

各項目を`Pass`、`Fail`、`Not Applicable`、`Open Question`で判定する。`Fail`と`Open Question`には対象画面、Requirement ID、次のActionを記載する。

## Traceability

- [ ] 対象Requirements VersionまたはCommitが識別されている。
- [ ] 各主要画面とUser Flowから関連Requirement IDを追跡できる。
- [ ] UIで検証する仮説とOpen Questionが明示されている。
- [ ] Requirements変更が口頭合意だけで残っていない。

## Information Architecture and Flow

- [ ] Sitemap、Navigation、画面階層が定義されている。
- [ ] 主要ユーザーが目的を達成するFlowが完結している。
- [ ] 戻る、取消、再試行、条件解除等の経路が必要に応じてある。
- [ ] 迷いやすい分岐と選択肢に説明がある。
- [ ] 主要画面とOverlay、Dialog、Menu等がScreen Inventoryに含まれている。

## Screen States

- [ ] Default状態がある。
- [ ] Loading状態がある。
- [ ] Empty状態がある。
- [ ] ErrorとRetry状態がある。
- [ ] Partial Data状態がある。
- [ ] Disclosure Statusの`unknown`、`undisclosed`、`partially_disclosed`、`disclosed`が必要に応じて表現され、一般画面状態のUnknownと区別されている。
- [ ] 長文、長い商品名、多数項目等の現実的なEdge Caseを確認している。

## Responsive and Browser Interaction

- [ ] 主要画面をDesktopとMobileで確認している。
- [ ] Navigation、Table、Filter、Comparison等が狭い画面で利用できる。
- [ ] 横Scroll、固定要素、Viewport高さ、Zoomで重要情報が失われない。
- [ ] Pointerだけに依存しない。
- [ ] 対応Browser範囲または未決事項が記録されている。

## Accessibility

- [ ] 各Pageに一意で説明的なTitleと主要見出しがある。
- [ ] 見出し構造とLandmarkが意味的に正しい。
- [ ] 主要操作をKeyboardだけで完了できる。
- [ ] Focus順序、Focus表示、Focus移動が適切である。
- [ ] Form Control、Button、Linkに理解可能なNameがある。
- [ ] Error、Status、動的更新を支援技術へ伝えられる。
- [ ] Colorだけで情報を伝えていない。
- [ ] Contrastと文字拡大を確認している。
- [ ] AnimationでReduced motionを考慮している。
- [ ] 自動Accessibility検査と人間による確認を実施している。

## Content, Evidence, and Trust

- [ ] 実際に近い日本語文言とデータ量を使用している。
- [ ] 金額、還元、条件、期間等が誤認しにくい。
- [ ] Source、確認日、適用期間を必要に応じて確認できる。
- [ ] Advertising、Affiliate、Ranking、比較基準を誤認させない。
- [ ] 古い情報、未確認情報、終了情報の状態が理解できる。
- [ ] 法的助言または公式情報であるかのような誤認を招かない。

## Visual Consistency

- [ ] Color、Typography、Spacing、Radius、Shadow等がToken化または一貫している。
- [ ] 同じ意味のComponentとInteractionが一貫している。
- [ ] 重要度に応じた視覚階層がある。
- [ ] Content密度が実データに耐えられる。
- [ ] EmptyやError状態も通常画面と同等に設計されている。

## UI-only Implementation Boundary

- [ ] UI-only codeが承認前の設計検証成果物であり、本番機能、本番契約、Gate 3 / Gate 4の実装として利用されていない。
- [ ] 合成Fixtureだけが専用Directoryへ隔離され、PII、Credential、Secretを含まない。
- [ ] Presentational ComponentへFixtureを直接埋め込んでいない。
- [ ] 暫定View ModelをDomain Entity、DB Model、API Contractとして扱っていない。
- [ ] DB、ORM、本番API、認証、CMS等を先取りしていない。
- [ ] UI Mock固有のDebug表示と仮Interactionが識別されている。
- [ ] `quality` Commandが成功している。
- [ ] 主要User FlowのBrowser Testが成功している。

## Security and Privacy

- [ ] 仮Formは外部送信・永続化せず、模擬処理はMemory内の合成データだけで完結する。
- [ ] Analytics、外部通信、外部Link、埋込Contentが識別され、原則無効化されている。承認例外には送信先と送信Dataが記録されている。
- [ ] User inputを無加工のHTMLとして表示せず、危険なURL schemeと注入を防いでいる。
- [ ] Secret scanが成功している。
- [ ] Bootstrap時およびLockfile変更時の依存脆弱性確認が成功している。

## Approval Record

- [ ] UI ReviewerのCriticalが0件である。
- [ ] UI ReviewerのMajorが0件である。
- [ ] MinorとOpen Questionの扱いが記録されている。
- [ ] 主要Flow、誤認、安全性、Requirements適合に影響するOpen Questionが0件である。
- [ ] 持越可能なOpen QuestionにOwner、期限、解決Gate、戻し先がある。
- [ ] 承認対象のRequirementsとUI VersionまたはCommitが識別されている。
- [ ] 本実装で`As-is reuse`、`Refactor`、`Replace`、`Remove`を評価することが記録されている。
- [ ] Agent準備時は承認者、承認日、承認状態が空欄であり、人間だけが対象範囲とともに`UI Mock Approved`を確定している。
