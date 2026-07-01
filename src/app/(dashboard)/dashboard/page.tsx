import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardHome />
      </DashboardShell>
    </AuthGuard>
  );
}
