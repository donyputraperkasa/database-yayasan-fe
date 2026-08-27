import type { Student, StudentFilters } from "@/types";

export function cleanStudentFilters(filters: StudentFilters): StudentFilters {
  return {
    className: filters.className?.trim() || undefined,
    schoolId: filters.schoolId || undefined,
  };
}

export function filterStudents(
  students: Student[],
  query?: string,
  level?: string,
  schoolId?: string,
  className?: string,
) {
  const keyword = query?.trim().toLowerCase();
  const selectedLevel = level && level !== "all" ? level : null;
  const targetClass = className?.trim().toLowerCase();

  return students.filter((student) => {
    const matchesKeyword =
      !keyword ||
      [
        student.name,
        student.school.name,
        student.className,
        student.fatherName,
        student.motherName,
        student.religion,
      ].some((value) => value?.toLowerCase().includes(keyword));

    const matchesLevel = !selectedLevel || student.school.level === selectedLevel;
    const matchesSchool = !schoolId || student.schoolId === schoolId;
    const matchesClass = !targetClass || (student.className?.toLowerCase().includes(targetClass) ?? false);

    return matchesKeyword && matchesLevel && matchesSchool && matchesClass;
  });
}

export function groupStudentsBySchool(students: Student[]) {
  return students.reduce<Record<string, Student[]>>((groups, student) => {
    const schoolName = student.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), student];
    return groups;
  }, {});
}

export function upsertStudent(students: Student[], savedStudent: Student) {
  const exists = students.some((student) => student.id === savedStudent.id);

  if (!exists) {
    return [savedStudent, ...students];
  }

  return students.map((student) =>
    student.id === savedStudent.id ? savedStudent : student,
  );
}

export function getStudentErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal mengambil data.";
}

export function groupStudentsByClass(students: Student[]) {
  return students.reduce<Record<string, Student[]>>((groups, student) => {
    const className = getClassName(student);
    groups[className] ??= [];
    groups[className].push(student);

    return groups;
  }, {});
}

export function getClassName(student: Student) {
  return student.className?.trim() || "Tanpa kelas";
}

