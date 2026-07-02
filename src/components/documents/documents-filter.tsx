import type { DocumentFilters, School } from "@/types";
import { Search } from "lucide-react";

type DocumentsFilterProps = {
  filters: DocumentFilters;
  isSchoolUser: boolean;
  onChange: (filters: DocumentFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function DocumentsFilter(props: DocumentsFilterProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_280px_auto]">
        <input
          value={props.filters.query ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, query: event.target.value })
          }
          placeholder="Cari nama dokumen atau sekolah..."
          className={inputClass}
        />
        {!props.isSchoolUser ? <SchoolSelect {...props} /> : null}
        <button type="button" onClick={props.onSubmit} className={buttonClass}>
          <Search size={17} aria-hidden="true" />
          Terapkan
        </button>
      </div>
    </section>
  );
}

function SchoolSelect(props: DocumentsFilterProps) {
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
