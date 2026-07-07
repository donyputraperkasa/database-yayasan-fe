import { DetailPhoto } from "@/components/ui/detail-photo";
import type { Student } from "@/types";
import { X } from "lucide-react";

type StudentDetailModalProps = {
  onClose: () => void;
  student: Student | null;
};

export function StudentDetailModal({ onClose, student }: StudentDetailModalProps) {
  if (!student) return null;

  const details: Array<[string, string | null | undefined]> = [
    ["Tempat/Tanggal Lahir", student.birthPlaceDate],
    ["Gender", genderLabel(student.gender)],
    ["Agama", student.religion],
    ["Alamat", student.address],
    ["Sekolah", student.school.name],
    ["Kelas", student.className],
    ["Nama Ayah", student.fatherName],
    ["Pekerjaan Ayah", student.fatherJob],
    ["Nama Ibu", student.motherName],
    ["Pekerjaan Ibu", student.motherJob],
    ["SPP", student.sppAmount ? `Rp ${student.sppAmount.toLocaleString("id-ID")}` : null],
  ];

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
        <div className="grid gap-5 md:grid-cols-[460px_1fr]">
          <DetailPhoto fill label="Foto siswa" photoUrl={student.photoUrl} />
          <div>
            <ModalHeader onClose={onClose} subtitle="Detail data siswa." title={student.name} />
            <DetailGrid details={details} />
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailGrid({ details }: { details: Array<[string, string | null | undefined]> }) {
  return (
    <dl className="mt-5 grid gap-3 sm:grid-cols-2">
      {details.map(([label, value]) => (
        <div key={label} className="rounded-lg bg-[#f8fbff] p-3">
          <dt className="text-xs font-semibold text-[#748299]">{label}</dt>
          <dd className="mt-1 text-sm font-semibold text-[#172033]">
            {value ?? "-"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ModalHeader(props: {
  onClose: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold">{props.title}</h2>
        <p className="mt-1 text-sm text-[#748299]">{props.subtitle}</p>
      </div>
      <button onClick={props.onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
        <X size={20} aria-hidden="true" />
      </button>
    </div>
  );
}

function genderLabel(gender: Student["gender"]) {
  if (gender === "male") return "Laki-laki";
  if (gender === "female") return "Perempuan";
  return "-";
}
