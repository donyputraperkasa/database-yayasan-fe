import { AuthGuard } from "@/components/auth/auth-guard";
import DapodikPage from "@/components/dapodik/dapodik-page";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DapodikRoutePage() {
    return (
      <AuthGuard>
        <DashboardShell>
            <DapodikPage />
        </DashboardShell>
      </AuthGuard> 
    )
}