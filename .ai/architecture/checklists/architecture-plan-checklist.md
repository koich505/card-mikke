# Architecture and Plan Checklist

- [ ] Feature Scopeに必要な範囲だけを設計している。
- [ ] 関連ADRとStatusを追跡できる。
- [ ] Component、Module、Data、External Contractの責任境界が明確である。
- [ ] Domain Open Questionを固定的なContractへ変換していない。
- [ ] `plan.md`にUI Promotion Assessmentまたは承認済みN/Aがある。
- [ ] Security、Privacy、Error handlingをApplicable / N/Aで判定し、対応または理由を記録している。
- [ ] Performance、Cache、CostをApplicable / N/Aで判定し、対応または理由を記録している。
- [ ] Accessibility、SEO、Evidence、FreshnessをApplicable / N/Aで判定し、対応または理由を記録している。
- [ ] Operations、ObservabilityをApplicable / N/Aで判定し、対応または理由を記録している。
- [ ] RollbackとCompatibilityを扱っている。
- [ ] Test Strategyと品質Commandがある。
- [ ] AlternativesとTrade-offが重要Decisionに記録されている。
- [ ] Human承認が必要なDecisionを識別している。
- [ ] Implementation Agentが推測せず着手できる。
- [ ] 関数単位まで過剰に実装方法を固定していない。
