import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ChangePasswordPage } from "@/components/settings/change-password-page";

export default function SettingsRoute() {
  return (
    <AuthGuard>
      <DashboardShell>
        <ChangePasswordPage />
      </DashboardShell>
    </AuthGuard>
  );
}
