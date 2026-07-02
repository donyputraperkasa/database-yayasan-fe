import type { Finance, School } from "@/types";
import { financeTypeLabel } from "./finance-labels";

type FinanceFormFieldsProps = {
  finance?: Finance | null;
  isSchoolUser: boolean;
  schools: School[];
};

export function FinanceFormFields(props: FinanceFormFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {!props.isSchoolUser ? (
        <Field label="Sekolah">
          <select
            name="schoolId"
            defaultValue={props.finance?.schoolId ?? ""}
            required
            className={inputClass}
          >
            <option value="">Pilih sekolah</option>
            {props.schools.map((school) => (
              <option key={school.id} value={school.id}>{school.name}</option>
            ))}
          </select>
        </Field>
      ) : null}
      <Field label="Jenis">
        <select
          name="type"
          defaultValue={props.finance?.type ?? "spp"}
          required
          className={inputClass}
        >
          {Object.entries(financeTypeLabel).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </Field>
      <Input label="Kelas" name="className" value={props.finance?.className} />
      <Input label="Nominal" name="amount" type="number" value={props.finance?.amount} />
      <Input label="Nomor Rekening" name="accountNo" value={props.finance?.accountNo} />
      <Input label="Saldo" name="balance" type="number" value={props.finance?.balance} />
      <Input label="Tanggal" name="date" type="date" value={toDateValue(props.finance?.date)} />
      <label className="block md:col-span-2">
        <span className="text-sm font-semibold">Catatan</span>
        <textarea
          name="note"
          defaultValue={props.finance?.note ?? ""}
          className="mt-2 min-h-24 w-full rounded-md border border-[#ced9eb] p-3 text-sm outline-none"
        />
      </label>
    </div>
  );
}

function Input(props: {
  label: string;
  name: string;
  type?: string;
  value?: number | string | null;
}) {
  return (
    <Field label={props.label}>
      <input
        name={props.name}
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

function toDateValue(value?: string | null) {
  return value ? value.slice(0, 10) : "";
}

const inputClass =
  "h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]";
