import type { FacilityFilters, School } from "@/types";
import { Search } from "lucide-react";
import { facilityConditionLabel } from "./facility-labels";

type FacilitiesFilterProps = {
  filters: FacilityFilters;
  isSchoolUser: boolean;
  onChange: (filters: FacilityFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function FacilitiesFilter(props: FacilitiesFilterProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm">
      <div className="grid gap-3 xl:grid-cols-[1fr_220px_280px_auto]">
        <input
          value={props.filters.query ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, query: event.target.value })
          }
          placeholder="Cari fasilitas atau sekolah..."
          className="h-11 rounded-md border border-[#dbe5f4] px-3 text-sm outline-none"
        />
        <select
          value={props.filters.condition ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, condition: event.target.value as FacilityFilters["condition"] })
          }
          className="h-11 rounded-md border border-[#dbe5f4] px-3 text-sm outline-none"
        >
          <option value="">Semua kondisi</option>
          {Object.entries(facilityConditionLabel).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {!props.isSchoolUser ? <SchoolSelect {...props} /> : null}
        <button
          type="button"
          onClick={props.onSubmit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white"
        >
          <Search size={17} aria-hidden="true" />
          Terapkan
        </button>
      </div>
    </section>
  );
}

function SchoolSelect(props: FacilitiesFilterProps) {
  return (
    <select
      value={props.filters.schoolId ?? ""}
      onChange={(event) =>
        props.onChange({ ...props.filters, schoolId: event.target.value })
      }
      className="h-11 rounded-md border border-[#dbe5f4] px-3 text-sm outline-none"
    >
      <option value="">Semua sekolah</option>
      {props.schools.map((school) => (
        <option key={school.id} value={school.id}>{school.name}</option>
      ))}
    </select>
  );
}
