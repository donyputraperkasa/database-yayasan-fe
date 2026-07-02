import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DocumentsPage } from "@/components/documents/documents-page";

export default function DocumentsRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <DocumentsPage />
      </DashboardShell>
    </AuthGuard>
  );
}
