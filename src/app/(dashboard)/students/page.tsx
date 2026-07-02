import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StudentsPage } from "@/components/students/students-page";

export default function StudentsRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <StudentsPage />
      </DashboardShell>
    </AuthGuard>
  );
}
