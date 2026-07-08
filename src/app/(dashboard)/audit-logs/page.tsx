import { AuthGuard } from "@/components/auth/auth-guard";
import { AuditLogsPage } from "@/components/audit-logs/audit-logs-page";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AuditLogsRoute() {
  return (
    <AuthGuard>
      <DashboardShell>
        <AuditLogsPage />
      </DashboardShell>
    </AuthGuard>
  );
}
