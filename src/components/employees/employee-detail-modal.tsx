import { DetailPhoto } from "@/components/ui/detail-photo";
import type { Employee } from "@/types";
import { X } from "lucide-react";
import {
  employeeStatusLabel,
  employeeTypeLabel,
  formatDate,
  genderLabel,
} from "./employee-labels";

type EmployeeDetailModalProps = {
  employee: Employee | null;
  onClose: () => void;
};

export function EmployeeDetailModal({ employee, onClose }: EmployeeDetailModalProps) {
  if (!employee) return null;

  const details = [
    ["Sekolah", employee.school.name],
    ["Jenis", employeeTypeLabel[employee.type]],
    ["Jabatan", employee.position],
    ["Jabatan lain", employee.otherPosition],
    ["Status", employee.status ? employeeStatusLabel[employee.status] : null],
    ["Gender", genderLabel(employee.gender)],
    ["Agama", employee.religion],
    ["Tanggal lahir", formatDate(employee.birthDate)],
    ["Tanggal masuk", formatDate(employee.joinDate)],
    ["Masa kerja", employee.workingPeriod],
    ["Usia pensiun", employee.retirementAge ? `${employee.retirementAge} tahun` : null],
    ["Tanggal pensiun", formatDate(employee.retirementDate)],
    ["Pendidikan", employee.lastEducation],
    ["Telepon", employee.phone],
    ["Email", employee.email],
    ["Nomor SK", employee.decreeNumber],
    ["Honor/Gaji", employee.fee],
  ];

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
        <div className="grid gap-5 md:grid-cols-[460px_1fr]">
          <DetailPhoto fill label="Foto pegawai" photoUrl={employee.photoUrl} />
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="mt-1 text-sm text-[#748299]">Detail data pegawai.</p>
              </div>
              <button onClick={onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#f8fbff] p-3">
                  <dt className="text-xs font-semibold text-[#748299]">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{value ?? "-"}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
