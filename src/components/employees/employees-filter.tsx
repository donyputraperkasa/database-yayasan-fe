import { LevelFilterPills } from "@/components/ui/level-filter-pills";
import type { EmployeeFilters, EmployeeType, School } from "@/types";
import { Search, X } from "lucide-react";

type EmployeesFilterProps = {
  filters: EmployeeFilters;
  isSchoolUser: boolean;
  onChange: (filters: EmployeeFilters) => void;
  onSubmit: () => void;
  schools: School[];
  selectedSchoolName?: string | null;
};

const EMPLOYEE_TYPE_OPTIONS = [
  { id: "", label: "Semua Jenis Pegawai" },
  { id: "guru", label: "Guru" },
  { id: "pegawai", label: "Pegawai" },
] as const;

export function EmployeesFilter(props: EmployeesFilterProps) {
  const isSchoolSelected = Boolean(props.selectedSchoolName || props.isSchoolUser);

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[#dbe5f4] bg-white p-3.5 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <label className="flex h-11 items-center gap-2.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-3.5 transition focus-within:border-[#1f4f8f] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eaf2ff]">
            <Search size={17} className="shrink-0 text-[#1f4f8f]" aria-hidden="true" />
            <input
              value={props.filters.query ?? ""}
              onChange={(event) =>
                props.onChange({ ...props.filters, query: event.target.value })
              }
              placeholder="Cari nama pegawai, jabatan, email, telepon..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94a3b8]"
            />
            {props.filters.query ? (
              <button
                type="button"
                onClick={() => props.onChange({ ...props.filters, query: "" })}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#cbd5e1] text-white transition hover:bg-[#94a3b8]"
                title="Hapus pencarian"
              >
                <X size={12} />
              </button>
            ) : null}
          </label>
        </div>

        {/* Dynamic Filter Pills: Type Pills when School is Selected, Level Pills when Viewing All Schools */}
        {isSchoolSelected ? (
          <div className="flex flex-wrap items-center gap-2">
            {EMPLOYEE_TYPE_OPTIONS.map((opt) => {
              const currentType = props.filters.type ?? "";
              const isActive = currentType === opt.id;
              const colorClass = getEmployeeTypeButtonClass(opt.id, isActive);

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    props.onChange({
                      ...props.filters,
                      type: (opt.id || undefined) as EmployeeType | undefined,
                    })
                  }
                  className={`inline-flex h-11 items-center justify-center rounded-lg border px-3.5 text-xs font-semibold transition ${colorClass}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        ) : (
          <LevelFilterPills
            activeLevel={props.filters.level}
            onSelectLevel={(level) => props.onChange({ ...props.filters, level })}
          />
        )}
      </div>
    </section>
  );
}

function getEmployeeTypeButtonClass(id: string, isActive: boolean) {
  if (isActive) {
    switch (id) {
      case "guru":
        return "bg-[#047857] text-white border-[#047857] shadow-xs ring-2 ring-[#a7f3d0]";
      case "pegawai":
        return "bg-[#d97706] text-white border-[#d97706] shadow-xs ring-2 ring-[#fde68a]";
      default:
        return "bg-[#0f2a4f] text-white border-[#0f2a4f] shadow-xs ring-2 ring-[#dbe5f4]";
    }
  }

  switch (id) {
    case "guru":
      return "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0] hover:bg-[#a7f3d0]/50";
    case "pegawai":
      return "bg-[#fef7df] text-[#b45309] border-[#fde68a] hover:bg-[#fde68a]/50";
    default:
      return "border-[#dbe5f4] bg-[#f8fbff] text-[#526078] hover:border-[#a8c4e8] hover:bg-[#eaf2ff] hover:text-[#0f2a4f]";
  }
}


