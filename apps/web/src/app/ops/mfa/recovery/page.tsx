import type { Metadata } from "next";
import { OpsMfaRecoveryPage } from "../../auth-pages";

export const metadata: Metadata = { title: "MFA回復手続き | カードみっけ" };

export default function Page() {
  return <OpsMfaRecoveryPage />;
}
