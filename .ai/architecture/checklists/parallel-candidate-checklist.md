# Parallel Candidate Checklist

## 判定

すべてPassの場合だけ`Parallel: Candidate`にできる。1項目でも不明またはFailなら`Parallel: No`とする。

- [ ] 依存Taskを実行前に完了できる。
- [ ] Planned filesが他Candidateと重複しない。
- [ ] Ownership areaが他Candidateと重複しない。
- [ ] 共有型、API、DB、Config、Design Tokenを変更しない。
- [ ] 他Taskの未完成Outputを必要としない。
- [ ] 単独でTestできる。
- [ ] Integration orderが結果を変えない。
- [ ] Acceptance Criteriaの責任が重複しない。
- [ ] 競合時にSequentialへ安全に戻せる。
- [ ] Candidateの根拠が`tasks.md`に記録されている。
- [ ] Initial Implementation laneが1でも実行可能な順序がある。

Planning段階では`Parallel: Approved`にしない。Implementation Orchestratorが実行直前にRepository状態とLocal resourceを再確認する。
