import type { Asset, School } from "@/types";
import { AssetPhotoField } from "./asset-photo-field";

type AssetFormFieldsProps = {
  asset?: Asset | null;
  isSchoolUser: boolean;
  schools: School[];
};

export function AssetFormFields(props: AssetFormFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {!props.isSchoolUser ? (
        <Field label="Sekolah">
          <select
            name="schoolId"
            defaultValue={props.asset?.schoolId ?? ""}
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
      <Input label="Luas Tanah" name="landArea" value={props.asset?.landArea} />
      <Input
        label="Luas Bangunan"
        name="buildingArea"
        value={props.asset?.buildingArea}
      />
      <Input
        label="Pemilik Sertifikat"
        name="certificateOwner"
        value={props.asset?.certificateOwner}
      />
      <Input label="Asal Aset" name="origin" value={props.asset?.origin} />
      <Input
        label="Tahun Pengadaan"
        name="procurementYear"
        type="number"
        value={props.asset?.procurementYear}
      />
      <AssetPhotoField photoUrl={props.asset?.photoUrl} />
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

const inputClass =
  "h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]";
