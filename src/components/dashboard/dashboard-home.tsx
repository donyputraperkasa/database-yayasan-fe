import type { DashboardProgress, DashboardStat, Role } from "@/types";
import { DashboardProgressCard } from "./dashboard-progress-card";
import { DashboardQuickActions } from "./dashboard-quick-actions";
import { DashboardSearchPanel } from "./dashboard-search-panel";
import { DashboardStatGrid } from "./dashboard-stat-grid";

type DashboardHomeProps = {
  errorMessage?: string | null;
  isLoading?: boolean;
  onRetry?: () => void;
  progress: DashboardProgress[];
  role: Role;
  stats: DashboardStat[];
};

export function DashboardHome({
  errorMessage,
  isLoading = false,
  onRetry,
  progress,
  role,
  stats,
}: DashboardHomeProps) {
  return (
    <div className="space-y-5">
      <DashboardSearchPanel errorMessage={errorMessage} onRetry={onRetry} />
      <DashboardStatGrid isLoading={isLoading} stats={stats} />

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <DashboardProgressCard items={progress} />
        <DashboardQuickActions role={role} />
      </section>
    </div>
  );
}
