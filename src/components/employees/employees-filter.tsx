import type { EmployeeFilters, School } from "@/types";
import { Search } from "lucide-react";
import type { FormEvent } from "react";
import { employeeTypeLabel } from "./employee-labels";

type EmployeesFilterProps = {
  filters: EmployeeFilters;
  isSchoolUser: boolean;
  onChange: (filters: EmployeeFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function EmployeesFilter(props: EmployeesFilterProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm xl:grid-cols-[1.2fr_0.8fr_1fr_auto]"
    >
      <input
        value={props.filters.query ?? ""}
        onChange={(event) =>
          props.onChange({ ...props.filters, query: event.target.value })
        }
        placeholder="Cari nama, jabatan, email..."
        className="h-11 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 text-sm outline-none"
      />
      <select
        value={props.filters.type ?? ""}
        onChange={(event) =>
          props.onChange({ ...props.filters, type: event.target.value as never })
        }
        className="h-11 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 text-sm outline-none"
      >
        <option value="">Semua jenis</option>
        {Object.entries(employeeTypeLabel).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        disabled={props.isSchoolUser}
        value={props.filters.schoolId ?? ""}
        onChange={(event) =>
          props.onChange({ ...props.filters, schoolId: event.target.value })
        }
        className="h-11 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 text-sm outline-none disabled:bg-[#eef3fb]"
      >
        <option value="">Semua sekolah</option>
        {props.schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white">
        <Search size={16} aria-hidden="true" />
        Terapkan
      </button>
    </form>
  );
}
