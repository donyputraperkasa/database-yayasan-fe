import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OwnerSchoolsPage } from "@/components/schools/owner-schools-page";

export default function SchoolsPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <OwnerSchoolsPage />
      </DashboardShell>
    </AuthGuard>
  );
}
