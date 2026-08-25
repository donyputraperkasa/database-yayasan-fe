import type { DashboardStat } from "@/types";
import { FileText, GraduationCap, School, UsersRound } from "lucide-react";
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
        <StatCard key={stat.label} isLoading={isLoading} stat={stat} />
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
  const iconConfig = getStatIcon(stat.label);
  const Icon = iconConfig.icon;

  const className =
    "group relative block overflow-hidden rounded-xl border border-[#dbe5f4] bg-white p-4 shadow-sm transition duration-200 sm:p-5 hover:-translate-y-0.5 hover:border-[#b6cce8] hover:shadow-md";

  const content = (
    <>
      {/* Top subtle hover glow line */}
      <div className="absolute inset-x-6 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#f2d35f] to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#748299] sm:text-sm">
          {stat.label}
        </p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconConfig.bg} ${iconConfig.color} transition group-hover:scale-110 sm:h-9 sm:w-9`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
        {isLoading ? "..." : stat.value}
      </p>
      <p className="mt-1 text-xs text-[#8b98ad]">{stat.note}</p>
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

function getStatIcon(label: string) {
  switch (label.toLowerCase()) {
    case "sekolah":
      return {
        icon: School,
        color: "text-[#1f4f8f]",
        bg: "bg-[#eef4fc]",
      };
    case "siswa":
      return {
        icon: GraduationCap,
        color: "text-[#2563eb]",
        bg: "bg-[#eff6ff]",
      };
    case "pegawai":
      return {
        icon: UsersRound,
        color: "text-[#d97706]",
        bg: "bg-[#fefce8]",
      };
    case "dokumen":
    default:
      return {
        icon: FileText,
        color: "text-[#475569]",
        bg: "bg-[#f1f5f9]",
      };
  }
}
