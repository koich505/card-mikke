# UI Mock v0.8 — 用途別記事・単一カード特集

Status: Implemented; Attempt 3 independent review passed; human UI approval pending
Date: 2026-10-06
Requirements baseline: `docs/spec/requirements/07-approval.md`のCurrent Product-owner-approved Baseline
Code baseline: `e91cc41db7f08509f44cd032a0ef2c9c1f267448`を基点とするworking tree

## Purpose

用途・読者像別記事で対象読者、選定基準、候補と理由を理解できるか、単一カード特集で対象カード、特徴、適用条件、変更確認状態、公式Sourceを理解できるかをHigh-fidelity UI-only Mockで検証する。

## Routes

- `/articles/daily-shopping`: SCR-PUB-007 用途別記事
- `/articles/everyday-plus-feature`: SCR-PUB-008 単一カード特集、更新確認中の公開済み旧記事
- `/articles/<unknown>`: 記事詳細Not Found

## Implemented content and interaction

- 用途別記事: 対象読者、本文、選定基準、候補別の理由、関連カード比較、カード詳細導線。
- 単一カード特集: 対象カード、特徴、適用条件、未確認の変更候補、対象カード詳細導線。
- 共通: 記事種別、広告・Affiliate開示、対象カードごとの合成Application Routeと条件差、合成公式Source、Publisher、確認日、適用期間、claim単位のDisclosure Status。
- 更新確認中の記事は公開済み旧記事であることをHeroと変更点で示し、差分候補を確定情報として反映しない。
- 広告関係がある記事では開示の近傍に模擬申込Actionを置き、Sourceおよび申込Actionは外部へ遷移しない。

## Responsive and accessibility

- Desktopは本文と追従目次、記事固有Panel、比較、Evidenceを順に表示する。
- Mobileは1列へ変換し、比較表はカード別の縦表示とする。
- 見出し、Landmark、Table header、Link name、更新確認中のText表現を保持し、色や位置だけに依存しない。

## Screenshots

- 用途別記事 Desktop 1440×1000: `screenshots/ui-v0.8-feature-article-details/purpose-article-desktop-1440x1000.png`
- 用途別記事 Mobile 393×851: `screenshots/ui-v0.8-feature-article-details/purpose-article-mobile-393x851.png`
- 単一カード特集 Desktop 1440×1000: `screenshots/ui-v0.8-feature-article-details/single-card-article-desktop-1440x1000.png`
- 単一カード特集 Mobile 393×851: `screenshots/ui-v0.8-feature-article-details/single-card-article-mobile-393x851.png`

Screenshot SHA-256:

- Purpose Desktop: `8f7ca6b12575fd258a52155af0be6c8eda1d87a324aa2ad85e37323848b5fea3`
- Purpose Mobile: `26061eda8209fb22500b90d69d1a9b212848dd117406e497e446327281b72077`
- Single-card Desktop: `16602179ee5e6764aedcc9f4286802c290ed963d4c00d257b13c9c6a1531b62c`
- Single-card Mobile: `63f5ae68768c60402b9b6190f650c20cba47582cb9c8d2d521c11570981f6e46`

4枚ともProduction Buildから取得し、開発用Overlayを含まない。

## UI-only boundary

- 記事、カード、Source、Publisher、条件、日付は合成Fixtureである。
- DB、API、CMS、認証、記事生成、承認、公開、外部送信、外部Link、Analytics、永続化は実装しない。
- `PrototypeFeatureArticle`はUI-only表示用の暫定型であり、本番Data Contractではない。

## Traceability

- FR-007、FR-019、FR-031
- NFR-EDIT-001、NFR-A11Y-001
- AC-015、AC-016
- UIR-ARTICLE-DETAIL-001〜003
- UF-006

## Verification

| Check | Result |
|---|---|
| `npm run quality` | Pass（format、lint、typecheck、build） |
| 対象Playwright | 20 / 20 Pass（Desktop Chrome／Mobile Chrome） |
| 全UI回帰 | 144 Pass / 6 project-scope Skip |
| axe自動Accessibility | 用途別記事・単一カード特集のDesktop／Mobileで違反0件 |
| 横Overflow | 用途別記事・単一カード特集のDesktop／Mobileでなし |
| Keyboard | 単一カード特集の模擬申込Buttonと対象カード詳細導線をFocus・Enterで操作可能 |
| `npm run security:secrets` | Pass、Leak 0 |
| 依存脆弱性監査 | Lockfile変更なし。現行Lockfileは比較v0.7時の`npm audit --omit=dev --audit-level=high`でProduction脆弱性0件 |
| `git diff --check` | Pass |

UI code/test scope manifest hash: `c3f6d953e2e45ba1cbd0cc9c6216b0799f82b06027030fb45fc3dacfae9bac5f`

Manifest再現範囲: `apps/web/src/app/articles/[id]/`、`apps/web/src/fixtures/articles.ts`、`apps/web/src/types/article-prototype.ts`、`apps/web/tests/article-list.spec.ts`。

## Promotion boundary

UI Mock Approval後、Feature Specification作成後かつTechnical Plan確定前に、記事Componentを`As-is reuse`、`Refactor before reuse`、`Replace`、`Remove`へ分類する。合成Fixture、暫定型、更新確認状態、Source参照、広告表示を本番CMSやEvidence契約へ無条件に昇格しない。
