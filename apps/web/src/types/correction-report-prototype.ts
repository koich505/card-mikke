export type CorrectionReportTargetType = "card" | "article" | "page";

/**
 * UI Mockで誤情報指摘の遷移元を表示するための暫定View Model。
 * Domain Entity、永続化Model、API Contractとして使用しない。
 */
export type CorrectionReportTarget = {
  type: CorrectionReportTargetType;
  id: string;
  label: string;
  kindLabel: string;
  sourceHref: string;
  defaultItem: string;
};
