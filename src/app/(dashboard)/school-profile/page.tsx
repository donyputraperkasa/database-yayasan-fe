import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SchoolProfilePage } from "@/components/schools/school-profile-page";

export default function SchoolProfileRoute() {
  return (
    <AuthGuard>
      <DashboardShell>
        <SchoolProfilePage />
      </DashboardShell>
    </AuthGuard>
  );
}
