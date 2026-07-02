import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { FacilitiesPage } from "@/components/facilities/facilities-page";

export default function FacilitiesRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <FacilitiesPage />
      </DashboardShell>
    </AuthGuard>
  );
}
