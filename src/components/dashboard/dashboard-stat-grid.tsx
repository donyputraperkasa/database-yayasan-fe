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
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold">
            {isLoading ? "..." : stat.value}
          </p>
          <p className="mt-2 text-xs text-[#8b98ad]">{stat.note}</p>
        </article>
      ))}
    </section>
  );
}
