# ADR-0001: UI Mock用の暫定Frontend Bootstrap

Status: Provisionally approved for UI-only mode  
Decision date: 2026-08-10  
Approver: Product owner

## Context

承認済みRequirementsを入力として、本番候補Application上に操作可能なHigh-fidelity UI Mockを作成する。UI Mockを再現可能に実行・検査するために必要なFrontend判断だけを暫定的に固定する。本ADRは本番Architecture、DB、API、認証、Hostingまたは本番Data Contractを承認しない。

## Decision

| Item | Provisional decision |
|---|---|
| Application placement | `apps/web/` |
| Candidate framework | Next.js `16.3.0` + React `19.2.8` |
| Language | TypeScript strict |
| Runtime | Node.js `24.14.1`。`.nvmrc`へ固定する |
| Package manager | npm `11.11.0`。`package.json#packageManager`と`package-lock.json`へ固定する |
| Styling | CSS Modules |
| Design tokens | CSS Custom Properties |
| Global CSS | Reset、基本Typography、Design Token、共通Focus表示に限定する |
| Utility CSS framework | UI Mock工程ではTailwind CSSを採用しない |
| Lint | ESLint。Next.js、React、Accessibilityに必要なRuleを有効化する |
| Format | Prettier |
| Browser test | 最初の主要画面が操作可能になった時点でPlaywrightを追加する |

## Minimum quality commands

`apps/web/package.json`に以下を用意する。

| Command | Responsibility |
|---|---|
| `npm run dev` | UI-only Applicationを起動する |
| `npm run build` | Next.js production buildを検証する |
| `npm run lint` | ESLintを実行する |
| `npm run typecheck` | TypeScriptを出力なしで検査する |
| `npm run format:check` | Prettierの差分を検査する |
| `npm run quality` | `format:check`、`lint`、`typecheck`、`build`を順に実行する。Browser Test追加後はTestも含める |

## Security checks

- Secret scanはGitleaks `v8.29.0`を使用し、`gitleaks dir . --redact --no-banner`でRepositoryの作業Treeを検査する。
- Bootstrap時に公式Release ArtifactとChecksumを用いてProject-localの`apps/web/.tools/`へ導入し、`gitleaks version`で採用Versionを確認する。BinaryはGit管理しない。
- macOS ARM64 Artifact `gitleaks_8.29.0_darwin_arm64.tar.gz`の確認済みSHA-256は`e85fa832ea341fb05485bf483e55e9d421f473348f0ede51b5212e0e5c19b7c4`である。
- `.gitleaks.toml`で生成物`.next/`、依存物`node_modules/`、検証済みTool格納先`.tools/`をWorking Tree scanから除外する。Source codeと文書は除外しない。
- 依存脆弱性監査は`apps/web/`で`npm audit --audit-level=high`を実行する。
- 依存監査はBootstrap時と`package-lock.json`変更時に再実行する。
- Critical / High相当は、影響なしを追跡可能に説明できる場合を除き、UI Reviewへ進む前に解消する。

## UI-only boundary

- 合成Fixtureを`apps/web/src/fixtures/`へ隔離し、PII、Credential、Secretを含めない。
- 暫定View ModelはUI Prototype用であることを明示し、Domain Entity、DB Model、API Contractとして扱わない。
- Formは外部送信・永続化せず、模擬処理はMemory内で完結する。
- Analytics、外部通信、外部Content埋込は無効とする。
- DB、ORM、Migration、本番API、認証、CMS、Hostingを実装・決定しない。

## Rationale

- `apps/web/`はApplication codeと文書を分離し、将来のApplication追加余地を保つ。
- Next.js + React + TypeScript strictは公開画面、Metadata、Responsive UIを同じ本番候補Applicationで検証できる候補である。
- npmはProduct ownerの選択であり、LockfileとVersion固定により再現性を確保する。
- CSS ModulesとCSS Custom Propertiesは、Componentの見通し、High-fidelity調整、Token一元化を両立し、UI Mock工程でUtility class依存を追加しない。

## Fixed scope

本ADRによりUI Mock工程中だけ固定する範囲は、Application配置、候補Frontend Stack、Runtime / Package Manager方針、Style方針、最小品質Command、Secret scan、依存監査、Fixture境界である。変更が必要な場合はApplication変更を停止し、Human承認のうえ本ADRを更新する。

## Reassessment scope and gate

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前のPromotion AssessmentとArchitecture工程で、以下を再評価する。

- Frontend FrameworkとPackage Managerの最終選定
- CSS Modulesの継続、Refactorまたは置換
- Runtime Version方針
- Component・型・Testの本番責務
- UI-only codeの`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`

DB、API、認証、Hosting、本番Data Contractは本ADRの固定範囲外である。
