# UI Review Loop — Favorites v0.9

Review target: SCR-PUB-009、UF-007、UIR-FAVORITE-001〜003、FR-030、AC-013

## Attempt 1

Result: Fail

- Critical: 0
- Major: 3
- Minor: 2
- Open question: 0

Findings and resolution:

1. 検索結果・カード詳細のうち特集外カードは追加Linkがあってもお気に入りへ追加されなかった。
   - 許可対象を全検索カードへ広げ、特集外の`daily-light`を検索結果・詳細から追加する回帰Testを追加した。
2. 50枚上限状態で表示中カードを解除すると、49枚表示とEmpty表示が同時に現れた。
   - 上限シナリオを代表表示と明示し、解除後は残り49枚の説明を表示するよう修正した。
3. 解除とAccount引継ぎ確定後にFocusが`body`へ落ちた。
   - 操作結果StatusへProgrammatic Focusを移し、Keyboard回帰Testを追加した。
4. 引継ぎDialogを開いた状態のaxe検証がなかった。
   - Dialog表示中のaxe検証をDesktop／Mobileへ追加した。
5. 不正Query、再読込時のMemory初期化、Browser storage／Cookie未使用の自動検証がなかった。
   - 無害化、再読込、`localStorage`／`sessionStorage`／Cookie空を確認するTestを追加した。

修正後の対象Testは18 / 18 Pass、全UI回帰は162 Pass / 6 project-scope Skip。

## Attempt 2

Result: Pass with one non-blocking minor finding

- Requirements / traceability: Critical 0 / Major 0 / Minor 0 / Open question 0
- Privacy / security / UI-only: Critical 0 / Major 0 / Minor 0 / Open question 0
- Frontend / responsive / accessibility: Critical 0 / Major 0 / Minor 1 / Open question 0

前回指摘5件の解消と新規Blocking findingなしを確認した。

Minor finding and resolution:

1. 操作結果の`role="status"`自体をProgrammatic Focus対象にしていた。
   - Keyboard Focus対象を名前付き`region`へ分離し、内側の`role="status"`はLive region通知専用へ変更した。
   - Focus継続とaxe検証を含む対象Test 18 / 18 Pass、`npm run quality` Passを確認した。

## Attempt 3

Result: Pass

- Critical: 0
- Major: 0
- Minor: 0
- Open question: 0

Focus対象とLive regionの分離、Desktop／Mobile、Keyboard、Dialog、Semantic、状態整合に新規回帰がないことを確認した。対象Test 18 / 18 Pass、全UI回帰162 Pass / 6 project-scope Skip。Human UI Approvalのみ未実施。
