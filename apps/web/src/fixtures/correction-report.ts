import { featureArticles } from "@/fixtures/articles";
import { redesignedCardDetails } from "@/fixtures/card-detail-v2";
import type {
  CorrectionReportTarget,
  CorrectionReportTargetType,
} from "@/types/correction-report-prototype";
import type { PrototypeCardId } from "@/types/ui-prototype";

const pageTargets: Record<string, CorrectionReportTarget> = {
  home: {
    type: "page",
    id: "home",
    label: "トップページ",
    kindLabel: "公開ページ",
    sourceHref: "/",
    defaultItem: "トップページの掲載情報",
  },
  search: {
    type: "page",
    id: "search",
    label: "カード検索・比較",
    kindLabel: "公開ページ",
    sourceHref: "/search",
    defaultItem: "検索・比較画面の掲載情報",
  },
};

export function resolveCorrectionReportTarget(
  type: string | undefined,
  id: string | undefined,
): CorrectionReportTarget | undefined {
  if (!type || !id) return undefined;

  if (type === "card") {
    const detail = redesignedCardDetails[id as PrototypeCardId];
    if (!detail) return undefined;
    return {
      type,
      id: detail.id,
      label: detail.name,
      kindLabel: "カード詳細",
      sourceHref: `/cards/${detail.id}`,
      defaultItem: "カード詳細の掲載情報",
    };
  }

  if (type === "article") {
    const article = featureArticles.find((candidate) => candidate.slug === id);
    if (!article) return undefined;
    return {
      type,
      id: article.slug,
      label: article.title,
      kindLabel: "特集記事",
      sourceHref: `/articles/${article.slug}`,
      defaultItem: "記事の掲載情報",
    };
  }

  if (type === "page") return pageTargets[id];
  return undefined;
}

export function correctionReportHref(
  targetType: CorrectionReportTargetType,
  targetId: string,
  item?: string,
) {
  const params = new URLSearchParams({ targetType, targetId });
  if (item) params.set("item", item);
  return `/correction-report?${params.toString()}`;
}
