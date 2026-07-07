"use client";

import { TableActions } from "@/components/ui/table-actions";
import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { Student } from "@/types";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { groupStudentsBySchool } from "./student-page-utils";

type StudentsTableProps = {
  canBackToSchools?: boolean;
  canManage: boolean;
  onDelete: (student: Student) => void;
  onDetail: (student: Student) => void;
  onEdit: (student: Student) => void;
  onBackToSchools: () => void;
  onBackToClasses: () => void;
  onSelectClass: (className: string) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedClassName?: string | null;
  selectedSchoolName?: string | null;
  students: Student[];
};

export function StudentsTable(props: StudentsTableProps) {
  const groups = Object.entries(groupStudentsBySchool(props.students));
  const selectedGroup = groups.find(([name]) => name === props.selectedSchoolName);

  const selectedClassStudents = useMemo(() => {
    if (!selectedGroup || !props.selectedClassName) return [];

    return selectedGroup[1].filter(
      (student) => getClassName(student) === props.selectedClassName,
    );
  }, [props.selectedClassName, selectedGroup]);

  if (selectedGroup) {
    const [schoolName, students] = selectedGroup;

    if (!props.selectedClassName) {
      return (
        <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
          <DetailHeader
            canBackToSchools={props.canBackToSchools ?? true}
            count={students.length}
            onBack={props.onBackToSchools}
            schoolName={schoolName}
          />
          <ClassGrid
            onSelect={props.onSelectClass}
            students={students}
          />
        </section>
      );
    }

    return (
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <ClassDetailHeader
          classNameLabel={props.selectedClassName}
          count={selectedClassStudents.length}
          onBack={props.onBackToClasses}
          schoolName={schoolName}
        />
        <MobileList {...props} students={selectedClassStudents} />
        <DesktopTable {...props} students={selectedClassStudents} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {groups.map(([schoolName, students]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${students.length} siswa`}
          description="Daftar siswa per sekolah."
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.students.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm lg:col-span-2">
          Data siswa belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function ClassGrid(props: {
  onSelect: (className: string) => void;
  students: Student[];
}) {
  const classEntries = Object.entries(groupStudentsByClass(props.students)).sort(
    ([firstClass], [secondClass]) =>
      firstClass.localeCompare(secondClass, "id", { numeric: true }),
  );

  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {classEntries.map(([className, students]) => (
        <button
          key={className}
          type="button"
          onClick={() => props.onSelect(className)}
          className="group rounded-lg border border-[#dbe5f4] bg-[#f8fbff] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#b6cce8] hover:bg-white hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#748299]">Kelas</p>
              <h3 className="mt-1 text-xl font-semibold text-[#172033]">
                {className}
              </h3>
            </div>
            <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold text-[#172033]">
              {students.length} siswa
            </span>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#1f4f8f]">
            Lihat daftar siswa
            <ArrowRight size={17} aria-hidden="true" className="transition group-hover:translate-x-1" />
          </div>
        </button>
      ))}
      {props.students.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm md:col-span-2 xl:col-span-3">
          Data siswa belum ditemukan.
        </p>
      ) : null}
    </div>
  );
}

function ClassDetailHeader(props: {
  classNameLabel: string;
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#748299]">{props.schoolName}</p>
        <h2 className="mt-1 text-lg font-semibold">
          Kelas {props.classNameLabel}
        </h2>
        <p className="mt-1 text-sm text-[#748299]">
          {props.count} siswa tercatat.
        </p>
      </div>
      <button
        type="button"
        onClick={props.onBack}
        className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
      >
        Kembali ke kelas
      </button>
    </div>
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

function DetailHeader(props: {
  canBackToSchools: boolean;
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <GroupHeader count={props.count} schoolName={props.schoolName} />
      {props.canBackToSchools ? (
        <button
          type="button"
          onClick={props.onBack}
          className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
        >
          Kembali ke sekolah
        </button>
      ) : null}
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

function groupStudentsByClass(students: Student[]) {
  return students.reduce<Record<string, Student[]>>((groups, student) => {
    const className = getClassName(student);
    groups[className] ??= [];
    groups[className].push(student);

    return groups;
  }, {});
}

function getClassName(student: Student) {
  return student.className?.trim() || "Tanpa kelas";
}
