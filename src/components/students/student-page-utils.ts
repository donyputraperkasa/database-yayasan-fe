import type { Student, StudentFilters } from "@/types";

export function cleanStudentFilters(filters: StudentFilters): StudentFilters {
  return {
    className: filters.className?.trim() || undefined,
    schoolId: filters.schoolId || undefined,
  };
}

export function filterStudents(students: Student[], query?: string) {
  const keyword = query?.trim().toLowerCase();
  if (!keyword) return students;

  return students.filter((student) =>
    [
      student.name,
      student.school.name,
      student.className,
      student.fatherName,
      student.motherName,
      student.religion,
    ].some((value) => value?.toLowerCase().includes(keyword)),
  );
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
