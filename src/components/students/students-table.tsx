import { TableActions } from "@/components/ui/table-actions";
import type { Student } from "@/types";

type StudentsTableProps = {
  canManage: boolean;
  onDelete: (student: Student) => void;
  onDetail: (student: Student) => void;
  onEdit: (student: Student) => void;
  students: Student[];
};

export function StudentsTable(props: StudentsTableProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Daftar Siswa</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Data siswa yang sudah masuk ke sistem.
          </p>
        </div>
        <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {props.students.length} siswa
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:hidden">
        {props.students.map((student) => (
          <article
            key={student.id}
            className="rounded-lg border border-[#e8edf6] p-4"
          >
            <p className="font-semibold text-[#172033]">{student.name}</p>
            <p className="mt-1 text-sm text-[#748299]">{student.school.name}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-[#1f4f8f]">
                {student.className ?? "Tanpa kelas"}
              </span>
              <span className="rounded-full bg-[#fff6cf] px-3 py-1 text-[#765a00]">
                {student.religion ?? "Agama belum diisi"}
              </span>
            </div>
            <Actions student={student} {...props} />
          </article>
        ))}
      </div>

      <div className="mt-5 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-[#dbe5f4] text-[#748299]">
            <tr>
              <th className="py-3 font-semibold">Nama</th>
              <th className="py-3 font-semibold">Sekolah</th>
              <th className="py-3 font-semibold">Kelas</th>
              <th className="py-3 font-semibold">Agama</th>
              <th className="py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef3fb]">
            {props.students.map((student) => (
              <tr key={student.id}>
                <td className="py-3 font-semibold text-[#172033]">
                  {student.name}
                </td>
                <td className="py-3 text-[#526078]">{student.school.name}</td>
                <td className="py-3 text-[#526078]">{student.className ?? "-"}</td>
                <td className="py-3 text-[#526078]">{student.religion ?? "-"}</td>
                <td className="py-3 text-center">
                  <Actions student={student} {...props} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.students.length === 0 ? (
        <p className="mt-5 rounded-md bg-[#f8fbff] p-4 text-sm font-semibold text-[#748299]">
          Data siswa belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function Actions(props: StudentsTableProps & { student: Student }) {
  return (
    <TableActions
      canManage={props.canManage}
      onDelete={() => props.onDelete(props.student)}
      onDetail={() => props.onDetail(props.student)}
      onEdit={() => props.onEdit(props.student)}
    />
  );
}
