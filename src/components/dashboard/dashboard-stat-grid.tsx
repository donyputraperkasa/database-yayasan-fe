import type { DashboardStat } from "@/types";

type DashboardStatGridProps = {
  stats: DashboardStat[];
  isLoading?: boolean;
};

export function DashboardStatGrid({
  stats,
  isLoading = false,
}: DashboardStatGridProps) {
  return (
    <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm sm:p-5"
        >
          <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
          <p className="mt-3 text-2xl font-semibold sm:text-3xl">
            {isLoading ? "..." : stat.value}
          </p>
          <p className="mt-2 text-xs text-[#8b98ad]">{stat.note}</p>
        </article>
      ))}
    </section>
  );
}
