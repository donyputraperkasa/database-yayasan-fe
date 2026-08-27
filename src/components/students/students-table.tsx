"use client";

import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { StudentsTableProps } from "@/types";
import { useMemo } from "react";
import { ClassDetailHeader, ClassGrid, DetailHeader } from "./students-class-grid";
import { DesktopTable, MobileList } from "./students-list-view";
import { getClassName, groupStudentsBySchool } from "./student-page-utils";

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
          <ClassGrid onSelect={props.onSelectClass} students={students} />
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
