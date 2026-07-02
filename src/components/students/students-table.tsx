import { TableActions } from "@/components/ui/table-actions";
import type { Student } from "@/types";
import { groupStudentsBySchool } from "./student-page-utils";

type StudentsTableProps = {
  canManage: boolean;
  onDelete: (student: Student) => void;
  onDetail: (student: Student) => void;
  onEdit: (student: Student) => void;
  students: Student[];
};

export function StudentsTable(props: StudentsTableProps) {
  const groups = Object.entries(groupStudentsBySchool(props.students));

  return (
    <section className="space-y-4">
      {groups.map(([schoolName, students]) => (
        <article
          key={schoolName}
          className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm"
        >
          <GroupHeader count={students.length} schoolName={schoolName} />
          <MobileList {...props} students={students} />
          <DesktopTable {...props} students={students} />
        </article>
      ))}
      {props.students.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm">
          Data siswa belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function GroupHeader(props: { count: number; schoolName: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold">{props.schoolName}</h2>
        <p className="mt-1 text-sm text-[#748299]">Daftar siswa per sekolah.</p>
      </div>
      <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
        {props.count} siswa
      </span>
    </div>
  );
}

function MobileList(props: StudentsTableProps) {
  return (
    <div className="mt-5 grid gap-3 md:hidden">
      {props.students.map((student) => (
        <article key={student.id} className="rounded-lg border border-[#e8edf6] p-4">
          <p className="font-semibold text-[#172033]">{student.name}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            <Badge tone="blue">{student.className ?? "Tanpa kelas"}</Badge>
            <Badge tone="yellow">{student.religion ?? "Agama belum diisi"}</Badge>
          </div>
          <Actions student={student} {...props} />
        </article>
      ))}
    </div>
  );
}

function DesktopTable(props: StudentsTableProps) {
  return (
    <div className="mt-5 hidden overflow-x-auto md:block">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="border-b border-[#dbe5f4] text-[#748299]">
          <tr>
            <th className="py-3 font-semibold">Nama</th>
            <th className="py-3 font-semibold">Kelas</th>
            <th className="py-3 font-semibold">Agama</th>
            <th className="py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef3fb]">
          {props.students.map((student) => (
            <tr key={student.id}>
              <td className="py-3 font-semibold text-[#172033]">{student.name}</td>
              <td className="py-3 text-[#526078]">{student.className ?? "-"}</td>
              <td className="py-3 text-[#526078]">{student.religion ?? "-"}</td>
              <td className="py-3 text-center"><Actions student={student} {...props} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

function Badge(props: { children: string; tone: "blue" | "yellow" }) {
  const toneClass =
    props.tone === "blue"
      ? "bg-[#eaf2ff] text-[#1f4f8f]"
      : "bg-[#fff6cf] text-[#765a00]";

  return (
    <span className={`rounded-full px-3 py-1 ${toneClass}`}>
      {props.children}
    </span>
  );
}
