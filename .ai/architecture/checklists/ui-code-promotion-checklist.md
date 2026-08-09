# UI Code Promotion Checklist

## Applicableの場合

- [ ] 対象UI VersionまたはCommitが明示されている。
- [ ] 対象ファイルまたはComponentを漏れなく列挙している。
- [ ] 各対象をAs-is reuse / Refactor before reuse / Replace / Removeへ分類している。
- [ ] 分類理由と関連Requirementがある。
- [ ] Fixture、暫定View Model、仮Interaction、Debug表示を識別している。
- [ ] Domain Entity、DB Model、API Contractとして誤昇格していない。
- [ ] Security、Privacy、Test、Accessibility、Performanceを評価している。
- [ ] Refactor / Replace / Removeに対応するTaskがある。
- [ ] 未評価のUI-only codeを本番へ昇格しない。
- [ ] 分類結果をPlanとTasksへ追跡できる。
- [ ] 分類結果の正本が`plan.md`の`UI Code Promotion Assessment` sectionにある。

## Not Applicableの場合

- [ ] UI影響と対象UI-only codeの有無を確認している。
- [ ] `plan.md`の同sectionにN/A理由、承認者、承認日がある。
