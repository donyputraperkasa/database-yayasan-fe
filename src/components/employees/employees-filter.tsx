import { LevelFilterPills } from "@/components/ui/level-filter-pills";
import type { EmployeeType, EmployeesFilterProps } from "@/types";
import { Search, X } from "lucide-react";

const EMPLOYEE_TYPE_OPTIONS = [
  { id: "", label: "Semua Jenis Pegawai" },
  { id: "guru", label: "Guru" },
  { id: "pegawai", label: "Pegawai" },
] as const;

export function EmployeesFilter(props: EmployeesFilterProps) {
  const isSchoolSelected = Boolean(props.selectedSchoolName || props.isSchoolUser);

  return (
    <section className="flex flex-col gap-4 rounded-[18px] border border-[#e2e8f0] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <label className="flex h-11 items-center gap-3 rounded-[12px] border-[1.5px] border-[#dbeafe] bg-[#f8fafc] px-3.5 transition focus-within:border-[#1d4ed8] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#1d4ed8]/15">
            <Search size={19} className="shrink-0 text-[#1d4ed8]" aria-hidden="true" />
            <input
              value={props.filters.query ?? ""}
              onChange={(event) =>
                props.onChange({ ...props.filters, query: event.target.value })
              }
              placeholder="Cari nama pegawai, jabatan, email, telepon..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
            />
            {props.filters.query ? (
              <button
                type="button"
                onClick={() => props.onChange({ ...props.filters, query: "" })}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[#64748b] transition hover:bg-[#cbd5e1] hover:text-[#1e293b]"
                title="Hapus pencarian"
              >
                <X size={13} />
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
              const colorClass = isActive
                ? "bg-[#1d4ed8] text-white border-[#1d4ed8] shadow-[0_4px_14px_rgba(29,78,216,0.25)]"
                : "border-[#e2e8f0] bg-[#f8fafc] text-[#475569] hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-[#1d4ed8] hover:-translate-y-0.5";

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
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border-[1.5px] px-3.5 sm:px-4 text-xs sm:text-sm font-semibold transition cursor-pointer select-none ${colorClass}`}
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


