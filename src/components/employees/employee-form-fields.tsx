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
      <Input
        label="Nama"
        name="name"
        placeholder="Masukkan nama pegawai"
        required
        value={employee?.name}
      />
      <Input
        label="Tempat/Tanggal Lahir"
        name="birthPlaceDate"
        placeholder="Masukkan tempat tanggal lahir"
        value={birthPlaceDateValue(employee?.birthPlaceDate, employee?.birthDate)}
      />
      <Input
        label="Agama"
        name="religion"
        placeholder="Masukkan agama"
        value={employee?.religion}
      />
      <Input
        label="Alamat"
        name="address"
        placeholder="Masukkan alamat"
        value={employee?.address}
      />
      <SelectMap
        label="Jenis Kepegawaian"
        name="type"
        options={employeeTypeLabel}
        placeholder="Masukkan jenis kepegawaian"
        required
        value={employee?.type}
      />
      <SelectSchool {...props} />
      <Input
        label="Jabatan"
        name="position"
        placeholder="Masukkan jabatan"
        value={employee?.position} 
      />
      <Input 
        label="Jabatan Lain"
        name="otherPosition"
        placeholder="Masukkan jabatan lain"
        value={employee?.otherPosition} 
      />
      <SelectMap
        label="Status Kepegawaian"
        name="status"
        options={employeeStatusLabel}
        placeholder="Masukkan status kepegawaian"
        value={employee?.status}
      />
      <SelectGender
        value={employee?.gender}
      />
      <Input 
        label="Tanggal Masuk" 
        name="joinDate" 
        type="date" 
        value={dateInputValue(employee?.joinDate)} />
      <Input 
        label="Pendidikan Terakhir" 
        name="lastEducation" 
        placeholder="Contoh: S1 Pendidikan Matematika"
        value={employee?.lastEducation} 
      />
      <Input 
        label="Nomor Telepon" 
        name="phone" 
        placeholder="Contoh: 08123456789"
        value={employee?.phone} 
      />
      <Input 
        label="Email" 
        name="email" 
        placeholder="Contoh: budi@bopkri.org"
        value={employee?.email} 
      />
      <Input 
        label="Nomor SK" 
        name="decreeNumber" 
        placeholder="Contoh: 012/YAY/SK/2023"
        value={employee?.decreeNumber} 
      />
      <Input 
        label="Honor/Gaji" 
        name="fee" 
        placeholder="Contoh: Rp 3.500.000"
        value={employee?.fee} 
      />
      <EmployeePhotoField 
        photoUrl={employee?.photoUrl} 
      />
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
  placeholder?: string;
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
        placeholder={props.placeholder}
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
  placeholder?: string;
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
        <option value="">{props.placeholder ?? `Pilih ${props.label.toLowerCase()}`}</option>
        {Object.entries(props.options).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
