export const LEVEL_OPTIONS = [
  { id: "all", label: "Semua Jenjang" },
  { id: "tk_kb", label: "TK / KB" },
  { id: "sd", label: "SD" },
  { id: "smp", label: "SMP" },
  { id: "sma_smk", label: "SMA / SMK" },
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
    <div className="flex flex-wrap items-center gap-2">
      {LEVEL_OPTIONS.map((opt) => {
        const isActive = (activeLevel || "all") === opt.id;
        const colorClass = getLevelButtonClass(opt.id, isActive);

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectLevel(opt.id)}
            className={`inline-flex h-11 items-center justify-center rounded-lg border px-3.5 text-xs font-semibold transition ${colorClass}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function getLevelButtonClass(id: string, isActive: boolean) {
  if (isActive) {
    switch (id) {
      case "tk_kb":
        return "bg-[#0284c7] text-white border-[#0284c7] shadow-xs ring-2 ring-[#bae6fd]";
      case "sd":
        return "bg-[#2563eb] text-white border-[#2563eb] shadow-xs ring-2 ring-[#bfdbfe]";
      case "smp":
        return "bg-[#d97706] text-white border-[#d97706] shadow-xs ring-2 ring-[#fde68a]";
      case "sma_smk":
        return "bg-[#7c3aed] text-white border-[#7c3aed] shadow-xs ring-2 ring-[#ddd6fe]";
      default:
        return "bg-[#0f2a4f] text-white border-[#0f2a4f] shadow-xs ring-2 ring-[#dbe5f4]";
    }
  }

  switch (id) {
    case "tk_kb":
      return "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd] hover:bg-[#bae6fd]/50";
    case "sd":
      return "bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe] hover:bg-[#bfdbfe]/50";
    case "smp":
      return "bg-[#fef3c7] text-[#b45309] border-[#fde68a] hover:bg-[#fde68a]/50";
    case "sma_smk":
      return "bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe] hover:bg-[#ddd6fe]/50";
    default:
      return "border-[#dbe5f4] bg-[#f8fbff] text-[#526078] hover:border-[#a8c4e8] hover:bg-[#eaf2ff] hover:text-[#0f2a4f]";
  }
}

