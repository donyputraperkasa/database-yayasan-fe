import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OwnerUsersPage } from "@/components/users/owner-users-page";

export default function UsersPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <OwnerUsersPage />
      </DashboardShell>
    </AuthGuard>
  );
}
