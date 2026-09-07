export const LEVEL_OPTIONS = [
  { id: "all", label: "Semua" },
  { id: "tk_kb", label: "TK" },
  { id: "sd", label: "SD" },
  { id: "smp", label: "SMP" },
  { id: "sma_smk", label: "SMA/K" },
] as const;

export type LevelOptionId = (typeof LEVEL_OPTIONS)[number]["id"];

type LevelFilterPillsProps = {
  activeLevel?: string;
  onSelectLevel: (level: string) => void;
};

export function LevelFilterPills({
  activeLevel = "all",
  onSelectLevel,
}: LevelFilterPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter jenjang">
      {LEVEL_OPTIONS.map((opt) => {
        const isActive = (activeLevel || "all") === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectLevel(opt.id)}
            className={`inline-flex h-11 items-center justify-center rounded-[12px] border-[1.5px] px-3.5 sm:px-4 text-xs sm:text-sm font-semibold transition cursor-pointer select-none ${
              isActive
                ? "bg-[#1d4ed8] text-white border-[#1d4ed8] shadow-[0_4px_14px_rgba(29,78,216,0.25)]"
                : "border-[#e2e8f0] bg-[#f8fafc] text-[#475569] hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-[#1d4ed8] hover:-translate-y-0.5"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

