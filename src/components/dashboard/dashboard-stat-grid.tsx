import type { DashboardStat } from "@/types";
import Link from "next/link";

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
        <StatCard
          key={stat.label}
          isLoading={isLoading}
          stat={stat}
        />
      ))}
    </section>
  );
}

function StatCard({
  isLoading,
  stat,
}: {
  isLoading: boolean;
  stat: DashboardStat;
}) {
  const className =
    "block rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm transition sm:p-5 hover:-translate-y-0.5 hover:border-[#b6cce8] hover:shadow-md";
  const content = (
    <>
      <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
      <p className="mt-3 text-2xl font-semibold sm:text-3xl">
        {isLoading ? "..." : stat.value}
      </p>
      <p className="mt-2 text-xs text-[#8b98ad]">{stat.note}</p>
    </>
  );

  return stat.href ? (
    <Link href={stat.href} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}
