import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { FinancesPage } from "@/components/finances/finances-page";

export default function FinancesRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <FinancesPage />
      </DashboardShell>
    </AuthGuard>
  );
}
