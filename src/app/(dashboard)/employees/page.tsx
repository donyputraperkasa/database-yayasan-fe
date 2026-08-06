import { AuthGuard } from "@/components/auth/auth-guard";
import { RoleGuard } from "@/components/auth/role-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeesPage } from "@/components/employees/employees-page";

export default function EmployeesRoutePage() {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={["owner", "office", "school", "psdm"]}>
        <DashboardShell>
          <EmployeesPage />
        </DashboardShell>
      </RoleGuard>
    </AuthGuard>
  );
}
