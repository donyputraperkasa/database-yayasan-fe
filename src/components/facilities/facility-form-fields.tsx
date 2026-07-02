import type { Facility, School } from "@/types";
import { facilityConditionLabel } from "./facility-labels";

type FacilityFormFieldsProps = {
  facility?: Facility | null;
  isSchoolUser: boolean;
  schools: School[];
};

export function FacilityFormFields(props: FacilityFormFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {!props.isSchoolUser ? (
        <Field label="Sekolah">
          <select
            name="schoolId"
            defaultValue={props.facility?.schoolId ?? ""}
            required
            className={inputClass}
          >
            <option value="">Pilih sekolah</option>
            {props.schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </Field>
      ) : null}
      <Input label="Nama Fasilitas" name="name" required value={props.facility?.name} />
      <Input
        label="Jumlah"
        name="quantity"
        required
        type="number"
        value={props.facility?.quantity}
      />
      <Field label="Kondisi">
        <select
          name="condition"
          defaultValue={props.facility?.condition ?? "baik"}
          required
          className={inputClass}
        >
          {Object.entries(facilityConditionLabel).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function Input(props: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  value?: number | string | null;
}) {
  return (
    <Field label={props.label}>
      <input
        name={props.name}
        required={props.required}
        type={props.type ?? "text"}
        defaultValue={props.value ?? ""}
        className={inputClass}
      />
    </Field>
  );
}

function Field(props: { children: React.ReactNode; label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{props.label}</span>
      <div className="mt-2">{props.children}</div>
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]";
