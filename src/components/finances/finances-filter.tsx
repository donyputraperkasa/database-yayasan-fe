import type { FinanceFilters, School } from "@/types";
import { Search } from "lucide-react";
import { financeTypeLabel } from "./finance-labels";

type FinancesFilterProps = {
  filters: FinanceFilters;
  isSchoolUser: boolean;
  onChange: (filters: FinanceFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function FinancesFilter(props: FinancesFilterProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm">
      <div className="grid gap-3 xl:grid-cols-[1fr_180px_180px_260px_auto]">
        <input
          value={props.filters.query ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, query: event.target.value })
          }
          placeholder="Cari sekolah, kelas, rekening, catatan..."
          className={inputClass}
        />
        <input
          value={props.filters.className ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, className: event.target.value })
          }
          placeholder="Kelas"
          className={inputClass}
        />
        <select
          value={props.filters.type ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, type: event.target.value as FinanceFilters["type"] })
          }
          className={inputClass}
        >
          <option value="">Semua jenis</option>
          {Object.entries(financeTypeLabel).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {!props.isSchoolUser ? <SchoolSelect {...props} /> : null}
        <button type="button" onClick={props.onSubmit} className={buttonClass}>
          <Search size={17} aria-hidden="true" />
          Terapkan
        </button>
      </div>
    </section>
  );
}

function SchoolSelect(props: FinancesFilterProps) {
  return (
    <select
      value={props.filters.schoolId ?? ""}
      onChange={(event) =>
        props.onChange({ ...props.filters, schoolId: event.target.value })
      }
      className={inputClass}
    >
      <option value="">Semua sekolah</option>
      {props.schools.map((school) => (
        <option key={school.id} value={school.id}>{school.name}</option>
      ))}
    </select>
  );
}

const inputClass =
  "h-11 rounded-md border border-[#dbe5f4] px-3 text-sm outline-none";
const buttonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white";
