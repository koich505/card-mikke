/**
 * UI-only Mockの表示検証専用View Model。
 * Domain Entity、API Contract、永続化Modelとして再利用しない。
 */
export type PrototypeOpsAuthState =
  "signed_out" | "primary_verified" | "authenticated" | "expired";

export type PrototypeOpsSession = {
  id: string;
  device: string;
  location: string;
  startedAt: string;
  lastActiveAt: string;
  current: boolean;
  state: "active" | "revoked";
};

export type PrototypeOpsQueueItem = {
  id: string;
  kind: "source_change" | "correction" | "review" | "article";
  title: string;
  status: string;
  priority: "high" | "normal";
  detectedAt: string;
  dueLabel: string;
  actionable: boolean;
  failureReason?: string;
};

export type PrototypeClaimDiffKind =
  "added" | "changed" | "deletion_candidate" | "unchanged" | "extraction_failed";

export type PrototypeDisclosureStatus =
  "unknown" | "undisclosed" | "partially_disclosed" | "disclosed";

export type PrototypeClaimDecision = "pending" | "approve" | "reject";

export type PrototypeTemporalFact = {
  kind:
    | "retrieved"
    | "published"
    | "announced"
    | "effective"
    | "application"
    | "transaction"
    | "grant"
    | "coverage";
  label: string;
  value: string;
  /** Source上の日時claimだけに設定する。retrievedは取得記録なので設定しない。 */
  disclosureStatus?: PrototypeDisclosureStatus;
};

export type PrototypeEvidenceRelation = {
  kind: "none" | "conflict" | "correction" | "supersedes";
  label: string;
  referenceId?: string;
};

export type PrototypeRejectedValueDisposition =
  "keep_previous" | "mark_under_review" | "exclude_from_use" | "recollect";

export type PrototypeOpsClaimDiff = {
  id: string;
  label: string;
  concept: string;
  scope: string;
  scopeStatus: "resolved" | "unknown";
  temporalFacts: PrototypeTemporalFact[];
  previousValue: string;
  extractedCandidateValue: string;
  candidateValue: string;
  diffKind: PrototypeClaimDiffKind;
  evidenceClaimId: string;
  sourceTier: string;
  sourcePublisher: string;
  sourceType: string;
  sourceLocation: string;
  evidenceExcerpt: string;
  evidenceRelation: PrototypeEvidenceRelation;
  confidence: number | null;
  disclosureStatus: PrototypeDisclosureStatus;
  decision: PrototypeClaimDecision;
  rejectionReason: string;
  rejectionDisposition: PrototypeRejectedValueDisposition | null;
  evidenceConfirmed: boolean;
  manualCorrectionReason: string;
  manualEvidenceReference: string;
  previousValueEvidenceReference: string;
};

export type PrototypeOpsSourceChange = {
  id: string;
  productName: string;
  sourceTitle: string;
  sourcePublisher: string;
  sourceIdentifier: string;
  retrievedAt: string;
  publishedAt: string;
  sourceDiffSummary: string;
  sourceBeforeExcerpt: string;
  sourceAfterExcerpt: string;
  status: "unreviewed" | "in_review" | "approved" | "blocked";
  scopeUnknown: boolean;
  revisionConflict: boolean;
  impactCandidates: string[];
  claims: PrototypeOpsClaimDiff[];
};

export type PrototypeOpsAuditEvent = {
  id: string;
  changeId?: string;
  actor: string;
  action: string;
  occurredAt: string;
  detail: string;
  claimSnapshots?: Array<{
    claimId: string;
    label: string;
    previousValue: string;
    extractedCandidateValue: string;
    candidateValue: string;
    decision: PrototypeClaimDecision;
    rejectionReason: string;
    rejectionDisposition: PrototypeRejectedValueDisposition | null;
    evidenceClaimId: string;
    manualCorrectionReason: string;
    manualEvidenceReference: string;
    previousValueEvidenceReference: string;
  }>;
};

export type PrototypeOpsDraft = {
  changeId: string;
  savedAt: string;
  savedBy: string;
  claims: PrototypeOpsClaimDiff[];
};
