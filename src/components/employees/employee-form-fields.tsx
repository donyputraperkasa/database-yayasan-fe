import type { Employee, School } from "@/types";
import {
  birthPlaceDateValue,
  dateInputValue,
  employeeStatusLabel,
  employeeTypeLabel,
} from "./employee-labels";
import { EmployeePhotoField } from "./employee-photo-field";

type EmployeeFormFieldsProps = {
  employee?: Employee | null;
  isSchoolUser: boolean;
  schools: School[];
};

export function EmployeeFormFields(props: EmployeeFormFieldsProps) {
  const employee = props.employee;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input label="Nama" name="name" required value={employee?.name} />
      <Input
        label="Tempat/Tanggal Lahir"
        name="birthPlaceDate"
        value={birthPlaceDateValue(employee?.birthPlaceDate, employee?.birthDate)}
      />
      <Input label="Agama" name="religion" value={employee?.religion} />
      <Input label="Alamat" name="address" value={employee?.address} />
      <SelectMap label="Jenis Kepegawaian" name="type" options={employeeTypeLabel} required value={employee?.type} />
      <SelectSchool {...props} />
      <Input label="Jabatan" name="position" value={employee?.position} />
      <Input label="Jabatan Lain" name="otherPosition" value={employee?.otherPosition} />
      <SelectMap label="Status Kepegawaian" name="status" options={employeeStatusLabel} value={employee?.status} />
      <SelectGender value={employee?.gender} />
      <Input label="Tanggal Masuk" name="joinDate" type="date" value={dateInputValue(employee?.joinDate)} />
      <Input label="Pendidikan Terakhir" name="lastEducation" value={employee?.lastEducation} />
      <Input label="Nomor Telepon" name="phone" value={employee?.phone} />
      <Input label="Email" name="email" value={employee?.email} />
      <Input label="Nomor SK" name="decreeNumber" value={employee?.decreeNumber} />
      <Input label="Honor/Gaji" name="fee" value={employee?.fee} />
      <EmployeePhotoField photoUrl={employee?.photoUrl} />
      <EmployeePhotoField
        label="Scan SK Terakhir"
        name="decree"
        photoUrl={employee?.decreeUrl}
      />
    </div>
  );
}

function Input(props: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  value?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{props.label}</span>
      <input
        defaultValue={props.value ?? ""}
        name={props.name}
        required={props.required}
        type={props.type ?? "text"}
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      />
    </label>
  );
}

function SelectSchool(props: EmployeeFormFieldsProps) {
  if (props.isSchoolUser) return null;

  return (
    <SelectMap
      label="Sekolah"
      name="schoolId"
      options={Object.fromEntries(props.schools.map((school) => [school.id, school.name]))}
      required
      value={props.employee?.schoolId}
    />
  );
}

function SelectGender({ value }: { value?: string | null }) {
  return (
    <SelectMap
      label="Jenis Kelamin"
      name="gender"
      options={{ female: "Perempuan", male: "Laki-laki" }}
      value={value}
    />
  );
}

function SelectMap(props: {
  label: string;
  name: string;
  options: Record<string, string>;
  required?: boolean;
  value?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{props.label}</span>
      <select
        defaultValue={props.value ?? ""}
        name={props.name}
        required={props.required}
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      >
        <option value="">Pilih {props.label.toLowerCase()}</option>
        {Object.entries(props.options).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
