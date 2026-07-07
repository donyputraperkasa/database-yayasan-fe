import type { School, Student } from "@/types";
import { StudentPhotoField } from "./student-photo-field";

type StudentFormFieldsProps = {
  isSchoolUser: boolean;
  schools: School[];
  student?: Student | null;
};

export function StudentFormFields({
  isSchoolUser,
  schools,
  student,
}: StudentFormFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input label="Nama Siswa" name="name" required value={student?.name} />
      <Input label="Tempat/Tanggal Lahir" name="birthPlaceDate" value={student?.birthPlaceDate}/>
      <GenderSelect value={student?.gender} />
      <Input label="Agama" name="religion" value={student?.religion} />
      <Input label="Alamat" name="address" value={student?.address} />
      <SelectSchool isSchoolUser={isSchoolUser} schools={schools} value={student?.schoolId}/>
      <Input label="Kelas" name="className" value={student?.className} />
      <Input label="SPP" name="sppAmount" type="number" value={student?.sppAmount} />
      <Input label="Nama Ayah" name="fatherName" value={student?.fatherName} />
      <Input label="Nama Ibu" name="motherName" value={student?.motherName} />
      <Input label="Pekerjaan Ayah" name="fatherJob" value={student?.fatherJob} />
      <Input label="Pekerjaan Ibu" name="motherJob" value={student?.motherJob} />
      <StudentPhotoField photoUrl={student?.photoUrl} />
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

function SelectSchool(props: {
  isSchoolUser: boolean;
  schools: School[];
  value?: string;
}) {
  if (props.isSchoolUser) return null;

  return (
    <label className="block">
      <span className="text-sm font-semibold">Sekolah</span>
      <select
        defaultValue={props.value ?? ""}
        name="schoolId"
        required
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      >
        <option value="">Pilih sekolah</option>
        {props.schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function GenderSelect({ value }: { value?: Student["gender"] }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">Gender</span>
      <select
        defaultValue={value ?? ""}
        name="gender"
        className="mt-2 h-11 w-full rounded-md border border-[#ced9eb] px-3 text-sm outline-none focus:border-[#1f4f8f]"
      >
        <option value="">Pilih gender</option>
        <option value="male">Laki-laki</option>
        <option value="female">Perempuan</option>
      </select>
    </label>
  );
}
