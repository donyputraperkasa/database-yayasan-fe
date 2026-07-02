import { AuthGuard } from "@/components/auth/auth-guard";
import { AssetsPage } from "@/components/assets/assets-page";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AssetsRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <AssetsPage />
      </DashboardShell>
    </AuthGuard>
  );
}
