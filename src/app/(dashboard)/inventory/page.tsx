import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { InventoryPage } from "@/components/inventory/inventory-page";

export default function InventoryRoutePage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <InventoryPage />
      </DashboardShell>
    </AuthGuard>
  );
}
