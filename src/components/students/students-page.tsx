"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { listSchools } from "@/lib/api/schools";
import { deleteStudent, listStudents } from "@/lib/api/students";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { School, Student, StudentFilters, User } from "@/types";
import { useEffect, useState } from "react";
import { StudentDetailModal } from "./student-detail-modal";
import { StudentFormModal } from "./student-form-modal";
import {
  cleanStudentFilters,
  filterStudents,
  getStudentErrorMessage,
  upsertStudent,
} from "./student-page-utils";
import { StudentStats } from "./student-stats";
import { StudentsFilter } from "./students-filter";
import { StudentsHeader } from "./students-header";
import { StudentsTable } from "./students-table";

export function StudentsPage() {
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<StudentFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [detailStudent, setDetailStudent] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  const loadStudents = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setStudents(await listStudents(token, cleanStudentFilters(nextFilters)));
    } catch (loadError) {
      setError(getStudentErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (student: Student | null) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleSaved = (savedStudent: Student) => {
    setStudents((current) => upsertStudent(current, savedStudent));
  };

  const handleDelete = async (student: Student) => {
    if (!confirm(`Hapus data siswa ${student.name}?`)) return;

    try {
      await deleteStudent(token, student.id);
      setStudents((current) => current.filter((item) => item.id !== student.id));
    } catch (deleteError) {
      setError(getStudentErrorMessage(deleteError));
    }
  };

  useEffect(() => {
    if (!token) return;

    Promise.all([listSchools(token), listStudents(token)])
      .then(([schoolData, studentData]) => {
        setSchools(schoolData);
        setStudents(studentData);
      })
      .catch((loadError) => setError(getStudentErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const canManage = user?.role === "owner" || user?.role === "school";
  const visibleStudents = filterStudents(students, filters.query);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat data siswa..." />;
  if (error) return <PageState text={error} action={() => void loadStudents()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Siswa" }]}
      />
      <StudentsHeader canManage={canManage} onCreate={() => openForm(null)} />
      <StudentStats students={visibleStudents} />
      <StudentsFilter
        filters={filters}
        isSchoolUser={user?.role === "school"}
        onChange={setFilters}
        onSubmit={() => void loadStudents()}
        schools={schools}
      />
      <StudentsTable
        canManage={canManage}
        onDelete={handleDelete}
        onDetail={setDetailStudent}
        onEdit={openForm}
        students={visibleStudents}
      />
      <StudentDetailModal onClose={() => setDetailStudent(null)} student={detailStudent} />
      <StudentFormModal
        isOpen={isFormOpen}
        isSchoolUser={user?.role === "school"}
        onClose={() => setIsFormOpen(false)}
        onSaved={handleSaved}
        schools={schools}
        student={selectedStudent}
        token={token}
      />
    </div>
  );
}
