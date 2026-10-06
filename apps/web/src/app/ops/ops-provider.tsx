"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  prototypeOpsAudit,
  prototypeOpsChanges,
  prototypeOpsSessions,
} from "@/fixtures/ops";
import type {
  PrototypeOpsAuditEvent,
  PrototypeOpsAuthState,
  PrototypeOpsClaimDiff,
  PrototypeOpsDraft,
  PrototypeOpsSession,
  PrototypeOpsSourceChange,
} from "@/types/ops-prototype";

type LoginResult =
  { ok: true } | { ok: false; message: string; field?: "email" | "password" | "code" };

type OpsContextValue = {
  authState: PrototypeOpsAuthState;
  operatorEmail: string;
  sessions: PrototypeOpsSession[];
  changes: Record<string, PrototypeOpsSourceChange>;
  drafts: Record<string, PrototypeOpsDraft>;
  auditEvents: PrototypeOpsAuditEvent[];
  lastReauthenticatedAt: string | null;
  reauthenticationState: "not_performed" | "fresh" | "expired";
  login: (email: string, password: string) => LoginResult;
  verifyMfa: (code: string) => LoginResult;
  logout: () => void;
  simulateExpiry: (kind: "idle" | "absolute") => void;
  simulateReauthExpiry: () => void;
  reauthenticate: (password: string, code: string) => LoginResult;
  revokeSession: (sessionId: string) => void;
  revokeAllSessions: () => void;
  saveDraft: (changeId: string, claims: PrototypeOpsClaimDiff[]) => void;
  approveChange: (changeId: string, claims: PrototypeOpsClaimDiff[]) => void;
  resolveClaim: (changeId: string, claim: PrototypeOpsClaimDiff) => void;
};

const OpsContext = createContext<OpsContextValue | null>(null);

const timestamp = () =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

const cloneChanges = () => structuredClone(prototypeOpsChanges);

export function OpsProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<PrototypeOpsAuthState>("signed_out");
  const [operatorEmail, setOperatorEmail] = useState("");
  const [sessions, setSessions] = useState<PrototypeOpsSession[]>(() =>
    structuredClone(prototypeOpsSessions),
  );
  const [changes, setChanges] =
    useState<Record<string, PrototypeOpsSourceChange>>(cloneChanges);
  const [drafts, setDrafts] = useState<Record<string, PrototypeOpsDraft>>({});
  const [auditEvents, setAuditEvents] = useState<PrototypeOpsAuditEvent[]>(() =>
    structuredClone(prototypeOpsAudit),
  );
  const [lastReauthenticatedAt, setLastReauthenticatedAt] = useState<string | null>(
    null,
  );
  const [reauthenticationState, setReauthenticationState] = useState<
    "not_performed" | "fresh" | "expired"
  >("not_performed");

  const addAudit = (event: Omit<PrototypeOpsAuditEvent, "id" | "occurredAt">) => {
    setAuditEvents((current) => [
      {
        ...event,
        id: `audit-ui-${current.length + 1}`,
        occurredAt: timestamp(),
      },
      ...current,
    ]);
  };

  const touchCurrentSession = () => {
    const activeAt = timestamp();
    setSessions((current) =>
      current.map((session) =>
        session.current && session.state === "active"
          ? { ...session, lastActiveAt: activeAt }
          : session,
      ),
    );
  };

  const login = (email: string, password: string): LoginResult => {
    if (!/^[^\s@]+@[^\s@]+\.invalid$/.test(email)) {
      return {
        ok: false,
        message: "UIモックでは.example.invalidの合成メールを使用してください。",
      };
    }
    if (password.length < 12) {
      return { ok: false, message: "Passwordは12文字以上で入力してください。" };
    }
    setOperatorEmail(email);
    setAuthState("primary_verified");
    return { ok: true };
  };

  const verifyMfa = (code: string): LoginResult => {
    if (!/^\d{6}$/.test(code)) {
      return { ok: false, message: "6桁の合成確認コードを入力してください。" };
    }
    setAuthState("authenticated");
    setSessions((current) => {
      const activeCurrent = current.some(
        (session) => session.current && session.state === "active",
      );
      if (activeCurrent) return current;
      return [
        ...current.map((session) => ({ ...session, current: false as const })),
        {
          id: `session-current-${current.length + 1}`,
          device: "Chrome / macOS（この端末・合成）",
          location: "東京（推定・合成）",
          startedAt: timestamp(),
          lastActiveAt: timestamp(),
          current: true,
          state: "active" as const,
        },
      ];
    });
    addAudit({
      actor: "管理者（合成）",
      action: "管理者Login",
      detail: "PasswordとMFAを入力したUI Mock上のLoginです。",
    });
    return { ok: true };
  };

  const logout = () => {
    setAuthState("signed_out");
    setOperatorEmail("");
    setLastReauthenticatedAt(null);
    setReauthenticationState("not_performed");
  };

  const simulateExpiry = (kind: "idle" | "absolute") => {
    setAuthState("expired");
    setSessions((current) =>
      current.map((session) =>
        session.current ? { ...session, state: "revoked" as const } : session,
      ),
    );
    addAudit({
      actor: "UIモック状態操作",
      action: "Session失効",
      detail:
        kind === "idle"
          ? "30分間無操作の状態を再現しました。"
          : "Session開始から12時間経過した状態を再現しました。",
    });
  };

  const simulateReauthExpiry = () => {
    setLastReauthenticatedAt((current) => current ?? "2026/08/12 09:00:00（合成）");
    setReauthenticationState("expired");
  };

  const reauthenticate = (password: string, code: string): LoginResult => {
    if (password.length < 12) {
      return {
        ok: false,
        message: "Passwordは12文字以上で入力してください。",
        field: "password",
      };
    }
    if (!/^\d{6}$/.test(code)) {
      return {
        ok: false,
        message: "6桁の合成MFAコードを入力してください。",
        field: "code",
      };
    }
    setLastReauthenticatedAt(timestamp());
    setReauthenticationState("fresh");
    touchCurrentSession();
    return { ok: true };
  };

  const revokeSession = (sessionId: string) => {
    setSessions((current) =>
      current.map((session) =>
        session.id === sessionId ? { ...session, state: "revoked" } : session,
      ),
    );
    addAudit({
      actor: "管理者（合成）",
      action: "Sessionを個別失効",
      detail: `対象Session ${sessionId} をUI Mock上で失効しました。`,
    });
    if (sessions.find((session) => session.id === sessionId)?.current) logout();
  };

  const revokeAllSessions = () => {
    setSessions((current) =>
      current.map((session) => ({ ...session, state: "revoked" })),
    );
    addAudit({
      actor: "管理者（合成）",
      action: "全Sessionを失効",
      detail: "すべての合成Sessionを失効しました。",
    });
    logout();
  };

  const saveDraft = (changeId: string, claims: PrototypeOpsClaimDiff[]) => {
    const savedAt = timestamp();
    touchCurrentSession();
    setDrafts((current) => ({
      ...current,
      [changeId]: {
        changeId,
        claims: structuredClone(claims),
        savedAt,
        savedBy: operatorEmail || "operator@example.invalid",
      },
    }));
    setChanges((current) => ({
      ...current,
      [changeId]: { ...current[changeId], status: "in_review" },
    }));
    addAudit({
      changeId,
      actor: operatorEmail || "管理者（合成）",
      action: "編集Draftを保存",
      detail: "公開中の承認済み値は変更していません。",
      claimSnapshots: claims.map((claim) => ({
        claimId: claim.id,
        label: claim.label,
        previousValue: claim.previousValue,
        extractedCandidateValue: claim.extractedCandidateValue,
        candidateValue: claim.candidateValue,
        decision: claim.decision,
        rejectionReason: claim.rejectionReason,
        rejectionDisposition: claim.rejectionDisposition,
        evidenceClaimId: claim.evidenceClaimId,
        manualCorrectionReason: claim.manualCorrectionReason,
        manualEvidenceReference: claim.manualEvidenceReference,
        previousValueEvidenceReference: claim.previousValueEvidenceReference,
      })),
    });
  };

  const approveChange = (changeId: string, claims: PrototypeOpsClaimDiff[]) => {
    touchCurrentSession();
    setChanges((current) => ({
      ...current,
      [changeId]: {
        ...current[changeId],
        status: "approved",
        claims: structuredClone(claims),
      },
    }));
    setDrafts((current) => {
      const next = { ...current };
      delete next[changeId];
      return next;
    });
    addAudit({
      changeId,
      actor: operatorEmail || "管理者（合成）",
      action: "claim判断を再認証して確定",
      detail: `採用 ${claims.filter((claim) => claim.decision === "approve").length}件・却下 ${claims.filter((claim) => claim.decision === "reject").length}件を確定しました。`,
      claimSnapshots: claims.map((claim) => ({
        claimId: claim.id,
        label: claim.label,
        previousValue: claim.previousValue,
        extractedCandidateValue: claim.extractedCandidateValue,
        candidateValue: claim.candidateValue,
        decision: claim.decision,
        rejectionReason: claim.rejectionReason,
        rejectionDisposition: claim.rejectionDisposition,
        evidenceClaimId: claim.evidenceClaimId,
        manualCorrectionReason: claim.manualCorrectionReason,
        manualEvidenceReference: claim.manualEvidenceReference,
        previousValueEvidenceReference: claim.previousValueEvidenceReference,
      })),
    });
  };

  const resolveClaim = (changeId: string, claim: PrototypeOpsClaimDiff) => {
    touchCurrentSession();
    setChanges((current) => {
      const currentChange = current[changeId];
      const nextClaims = currentChange.claims.map((item) =>
        item.id === claim.id ? structuredClone(claim) : item,
      );
      return {
        ...current,
        [changeId]: {
          ...currentChange,
          claims: nextClaims,
          status: nextClaims.every((item) => item.decision !== "pending")
            ? "approved"
            : "in_review",
        },
      };
    });
    addAudit({
      changeId,
      actor: operatorEmail || "管理者（合成）",
      action: claim.decision === "approve" ? "変更提案を採用" : "変更提案を却下",
      detail:
        claim.decision === "approve"
          ? "この提案の情報更新を確定しました。"
          : "現在の情報を変更せず、この提案を却下しました。",
      claimSnapshots: [
        {
          claimId: claim.id,
          label: claim.label,
          previousValue: claim.previousValue,
          extractedCandidateValue: claim.extractedCandidateValue,
          candidateValue: claim.candidateValue,
          decision: claim.decision,
          rejectionReason: claim.rejectionReason,
          rejectionDisposition: claim.rejectionDisposition,
          evidenceClaimId: claim.evidenceClaimId,
          manualCorrectionReason: claim.manualCorrectionReason,
          manualEvidenceReference: claim.manualEvidenceReference,
          previousValueEvidenceReference: claim.previousValueEvidenceReference,
        },
      ],
    });
  };

  const value: OpsContextValue = {
    authState,
    operatorEmail,
    sessions,
    changes,
    drafts,
    auditEvents,
    lastReauthenticatedAt,
    reauthenticationState,
    login,
    verifyMfa,
    logout,
    simulateExpiry,
    simulateReauthExpiry,
    reauthenticate,
    revokeSession,
    revokeAllSessions,
    saveDraft,
    approveChange,
    resolveClaim,
  };

  return <OpsContext.Provider value={value}>{children}</OpsContext.Provider>;
}

export function useOps() {
  const value = useContext(OpsContext);
  if (!value) throw new Error("useOps must be used inside OpsProvider");
  return value;
}
