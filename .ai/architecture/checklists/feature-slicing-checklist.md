# Feature Slicing Checklist

- [ ] 独立したユーザー価値または運用価値がある。
- [ ] ScopeとNon-goalsが明確である。
- [ ] Acceptance Criteriaが検証可能である。
- [ ] Requirementsと、UI影響がある場合は承認済みUIへ追跡できる。
- [ ] 1 branch、1 PRでReview可能な大きさである。
- [ ] 単独でTest可能である。
- [ ] 他featureとの依存が明示されている。
- [ ] 技術層だけでなく垂直な価値単位で分割されている。
- [ ] Enabling featureには利用者、価値、完了条件がある。
- [ ] 共有Contractの未確定を暗黙の前提にしていない。
- [ ] HumanのProvisional Slice Selectionを追跡できる。
- [ ] `spec.md`とClarify後のFinal Scope Approvalを追跡できる。
- [ ] Final Scope ApprovalがArchitectureとPlanning成果物の確定着手前に記録されている。
- [ ] Final Scope ApprovalとPlanning Approvalが意味・時点の異なる承認として記録され、統合または遡及承認されていない。
- [ ] Final Scope Approval後の実質的なScope変更ではPlanningを止め、Clarifyと再承認へ戻っている。
