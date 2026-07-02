import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeesPage } from "@/components/employees/employees-page";

export default function EmployeesRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <EmployeesPage />
      </DashboardShell>
    </AuthGuard>
  );
}
