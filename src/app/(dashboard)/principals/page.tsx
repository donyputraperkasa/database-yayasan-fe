import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PrincipalsPage } from "@/components/principals/principals-page";

export default function PrincipalsRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <PrincipalsPage />
      </DashboardShell>
    </AuthGuard>
  );
}
