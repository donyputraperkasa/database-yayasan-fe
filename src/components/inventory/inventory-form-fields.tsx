import type { Inventory, School } from "@/types";
import { InventoryConditionFields } from "./inventory-condition-fields";
import { InventoryPhotoField } from "./inventory-photo-field";

type InventoryFormFieldsProps = {
  inventory?: Inventory | null;
  isSchoolUser: boolean;
  schools: School[];
};

export function InventoryFormFields(props: InventoryFormFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {!props.isSchoolUser ? (
        <Field label="Sekolah">
          <select
            name="schoolId"
            defaultValue={props.inventory?.schoolId ?? ""}
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
      <Input
        label="Nama Inventaris"
        name="name"
        placeholder="Contoh: Laptop Asus Vivobook / Meja Guru / Proyektor Epson"
        required
        value={props.inventory?.name}
      />
      <InventoryConditionFields inventory={props.inventory} />
      <label className="block md:col-span-2">
        <span className="text-sm font-semibold">Keterangan</span>
        <textarea
          name="description"
          maxLength={2000}
          rows={4}
          defaultValue={props.inventory?.description ?? ""}
          placeholder="Contoh: Dibeli tahun 2024 menggunakan dana BOS / Sumbangan Alumni."
          className={`${inputClass} h-auto resize-y py-3`}
        />
      </label>
      <InventoryPhotoField photoUrl={props.inventory?.photoUrl} />
    </div>
  );
}

function Input(props: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: number | string | null;
}) {
  return (
    <Field label={props.label}>
      <input
        name={props.name}
        placeholder={props.placeholder}
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
