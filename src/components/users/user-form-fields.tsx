import type { School } from "@/types";

export function UserInput(props: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{props.label}</span>
      <input
        name={props.name}
        placeholder={props.placeholder}
        required
        type={props.name === "password" ? "password" : "text"}
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      />
    </label>
  );
}

export function SchoolSelect({ schools }: { schools: School[] }) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-semibold">Sekolah</span>
      <select
        name="schoolId"
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      >
        <option value="">Pilih sekolah</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
    </label>
  );
}
