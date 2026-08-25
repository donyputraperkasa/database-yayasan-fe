import type { DashboardSummary } from "@/types";
import { Building2, CheckCircle2, FileText, Layers, UsersRound } from "lucide-react";

type DashboardProgressCardProps = {
  summary: DashboardSummary;
};

export function DashboardProgressCard({ summary }: DashboardProgressCardProps) {
  const totals = summary.totals;
  const levels = summary.schoolsByLevel;

  const schoolDistributions = [
    {
      level: "TK / KB",
      count: levels.tkKb,
      color: "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]",
    },
    {
      level: "SD",
      count: levels.sd,
      color: "bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe]",
    },
    {
      level: "SMP",
      count: levels.smp,
      color: "bg-[#fef3c7] text-[#b45309] border-[#fde68a]",
    },
    {
      level: "SMA / SMK",
      count: levels.smaSmk,
      color: "bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]",
    },
  ];

  const operationalMetrics = [
    {
      icon: UsersRound,
      label: "Guru & Tendik",
      value: `${formatNumber(totals.teachers)} Guru / ${formatNumber(totals.staff)} Tendik`,
      sub: `${formatNumber(totals.permanentEmployees)} Tetap • ${formatNumber(totals.honoraryEmployees + totals.nonPermanentEmployees)} Non-Tetap`,
      bg: "bg-[#f8fafc]",
    },
    {
      icon: Building2,
      label: "Aset & Inventaris",
      value: `${formatNumber(totals.inventory)} Item Inventaris`,
      sub: `${formatNumber(totals.assets)} Unit Aset / Sarpras Terdaftar`,
      bg: "bg-[#f8fafc]",
    },
    {
      icon: FileText,
      label: "Dokumen & Keuangan",
      value: `${formatNumber(totals.documents)} Berkas Dokumen`,
      sub: `${formatNumber(totals.finances)} Laporan Keuangan Terunggah`,
      bg: "bg-[#f8fafc]",
    },
  ];

  return (
    <div className="rounded-xl border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
        <div>
          <h2 className="text-base font-bold text-[#172033] sm:text-lg">
            Rekapitulasi Data Operasional
          </h2>
          <p className="mt-0.5 text-xs text-[#748299] sm:text-sm">
            Rincian data PTK, sarana aset, berkas, serta sebaran unit sekolah.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0fdf4] px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Real Data</span>
        </span>
      </div>

      {/* Operational Breakdown Cards */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {operationalMetrics.map((item) => (
          <div
            key={item.label}
            className={`flex flex-col justify-between rounded-xl border border-[#e2eaf6] p-3.5 ${item.bg} transition hover:border-[#b6cce8] hover:bg-white`}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1f4f8f]">
                <item.icon size={15} />
                <span>{item.label}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-[#172033] sm:text-base">
                {item.value}
              </p>
            </div>
            <p className="mt-2 border-t border-[#edf2f7] pt-2 text-[11px] font-medium text-[#64748b]">
              {item.sub}
            </p>
          </div>
        ))}
      </div>

      {/* School Level Breakdown */}
      <div className="mt-5 border-t border-[#f1f5f9] pt-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#1f4f8f]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
              Distribusi {formatNumber(totals.schools)} Unit Sekolah Yayasan BOPKRI
            </p>
          </div>
          <span className="text-xs font-medium text-[#748299]">Semua Wilayah</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {schoolDistributions.map((dist) => (
            <div
              key={dist.level}
              className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition hover:shadow-2xs ${dist.color}`}
            >
              <span className="text-xs font-semibold">{dist.level}</span>
              <span className="mt-0.5 text-lg font-bold sm:text-xl">
                {formatNumber(dist.count)} <span className="text-xs font-medium">Unit</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value || 0);
}
