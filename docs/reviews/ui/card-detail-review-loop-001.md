# Card detail UI-only Mock — Subagent review loop

Review target: カード詳細UI-only Mock v0.2

Scope reviewed: カード詳細、検索条件引継ぎ、カスタム試算、関連Card遷移、検索復帰、暫定View Model、Fixture、計算Utility、Accessibility

Checks / evidence used: 2026-08-11承認済みRequirements、Domain Specification、UI Requirements、現行Source、Desktop／Mobile Browser Test、axe、Quality Gate

Reviewers: requirements_review、domain_review、ui_a11y_review（全員read-only）

## Attempt 1

Result: Fail

主なFindings:

- ID: REVIEW-1-CALC
  - Severity: Major
  - Location: `apps/web/src/features/card-detail/prototype-scenario.ts`
  - Requirement / risk: FR-005、FR-014〜016。未確認Rule、上限、年会費免除、Campaign期間条件が試算へ正しく反映されない。
  - Evidence: Disclosure Statusを見ず、年額への単純乗算と年間利用額だけで判定していた。
  - Impact: 表示Ruleと正味還元額が矛盾し、過大／過小評価となる。
  - Required resolution: 確認済みRuleだけを算定し、cap、付与単位、Fee免除、Campaign固有期間額を構造化する。
- ID: REVIEW-1-EVIDENCE
  - Severity: Major
  - Location: 詳細View Model、Fixture、Evidence表示
  - Requirement / risk: FR-020、AC-014。Source全体とClaimのDisclosure Statusを混同しない。
  - Evidence: 複数Claimの集合へ単一Statusを付けていた。
  - Impact: 未確認箇所と根拠を特定できない。
  - Required resolution: 表示値ごとにStatus、確認日、期間、Source相当情報を参照可能にする。
- ID: REVIEW-1-FLOW-A11Y
  - Severity: Major
  - Location: カスタム試算、関連Card、鮮度Icon、Test
  - Requirement / risk: UIR-DETAIL-008〜011、NFR-A11Y-001。
  - Evidence: カスタム条件が関連Cardへ反映されず、更新通知、Focus可能Tooltip、自動Browser／A11y Testがなかった。
  - Impact: 説明と遷移条件が不一致となり、Keyboard／支援技術で状態を追跡しにくい。
  - Required resolution: active ScenarioでLinkを再生成し、Validation／live通知／Tooltip／Browser Testを追加する。

Summary: Critical 0 / Major 20（3観点の重複を含む）/ Minor 3 / Open Question 3

## Attempt 2

Result: Fail

主な残件:

- ID: REVIEW-2-CAMPAIGN
  - Severity: Major
  - Location: Campaign Scenarioとカスタム試算
  - Requirement / risk: FR-015。年間利用額をCampaign対象期間内利用額の代用にしない。
  - Evidence: 初期適格情報がカスタム条件へ残る可能性があった。
  - Impact: 成立不能なCampaignが初年度へ加算される。
  - Required resolution: Campaign期間内額を別保持し、カスタム変更時は適格情報を破棄する。
- ID: REVIEW-2-REQUIREMENTS
  - Severity: Major
  - Location: 情報鮮度、個別Service、Campaign詳細、E2E Test
  - Requirement / risk: FR-012、FR-015、FR-020、AC-006、AC-007、AC-014。
  - Evidence: 個別Service選択、最低利用額／判定期間、値ごとのEvidence対応、条件引継ぎTestが不足していた。
  - Impact: 試算根拠と遷移条件を利用者・後続Agentが再現できない。
  - Required resolution: 合成Service選択、Campaign全期間、Claim-level Tooltip、E2E Testを追加する。
- ID: REVIEW-2-A11Y
  - Severity: Major
  - Location: Detail／共通Header色、axe設定、UI版識別
  - Requirement / risk: WCAG AA、UI Approval Checklist。
  - Evidence: 赤文字のContrast不足、axeでContrast除外、変動するWorking treeだけを対象にしていた。
  - Impact: 小文字を判読しにくく、レビュー対象版を再現できない。
  - Required resolution: 色を修正してContrast検査を有効化し、安定したSource manifest hashを記録する。

Summary: Critical 0 / Major 7（3観点の重複を含む）/ Minor 0 / Open Question 2

## Attempt 3

Result: Pass

Findings:

- All clear（Critical／Major／Minorなし）
- Open Question: RQ-011とRQ-017の理解可能性は、人間によるUI Mock Approvalで確認する。実装Blockingではない。

Verification:

- Card detail scope manifest hash: `4c56fa5d4affe35ac9b99003d61e132cfbb392122ef43d90100ec8d840c94725`
- `npm run test:ui`: Desktop／Mobile 18 tests Pass、axe Color Contrastを含む
- `npm run quality`: Pass
- 変更対象Source／Test Secret scan: Pass
- `npm audit --audit-level=high`: 0 vulnerabilities
- `git diff --check`: Pass

Summary: Critical 0 / Major 0 / Minor 0 / Open Question 2（Non-blocking、Human UI Mock Approval対象）

## Approval boundary

この結果は独立Agentによる実装レビュー完了を示す。人間による`UI Mock Approved`、承認者、承認日は未記入のまま維持する。
