"use client";

import { deleteEmployee, listEmployees } from "@/lib/api/employees";
import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { Employee, EmployeeFilters, School, User } from "@/types";
import { useEffect, useState } from "react";
import { EmployeeDetailModal } from "./employee-detail-modal";
import { EmployeeFormModal } from "./employee-form-modal";
import {
  cleanEmployeeFilters,
  filterEmployees,
  getEmployeeErrorMessage,
  upsertEmployee,
} from "./employee-page-utils";
import { EmployeeStats } from "./employee-stats";
import { EmployeesFilter } from "./employees-filter";
import { EmployeesHeader } from "./employees-header";
import { EmployeesTable } from "./employees-table";

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EmployeeFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  const loadEmployees = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setEmployees(await listEmployees(token, cleanEmployeeFilters(nextFilters)));
    } catch (loadError) {
      setError(getEmployeeErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    Promise.all([listSchools(token), listEmployees(token)])
      .then(([schoolData, employeeData]) => {
        setSchools(schoolData);
        setEmployees(employeeData);
      })
      .catch((loadError) => setError(getEmployeeErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const canManage = user?.role === "owner" || user?.role === "school";
  const visibleEmployees = filterEmployees(employees, filters.query);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat data pegawai..." />;
  if (error) return <PageState text={error} action={() => void loadEmployees()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          ...(selectedSchoolName
            ? [{ label: selectedSchoolName }, { label: "Pegawai" }]
            : [{ label: "Pegawai" }]),
        ]}
      />
      <EmployeesHeader canManage={canManage} onCreate={() => openForm(null)} />
      <EmployeeStats employees={visibleEmployees} />
      <EmployeesFilter
        filters={filters}
        isSchoolUser={user?.role === "school"}
        onChange={setFilters}
        onSubmit={() => void loadEmployees()}
        schools={schools}
      />
      <EmployeesTable
        canManage={canManage}
        employees={visibleEmployees}
        onBackToSchools={() => setSelectedSchoolName(null)}
        onDelete={(employee) => void handleDelete(employee)}
        onDetail={setDetailEmployee}
        onEdit={openForm}
        onSelectSchool={setSelectedSchoolName}
        selectedSchoolName={selectedSchoolName}
      />
      <EmployeeDetailModal employee={detailEmployee} onClose={() => setDetailEmployee(null)} />
      <EmployeeFormModal
        employee={selectedEmployee}
        isOpen={isFormOpen}
        isSchoolUser={user?.role === "school"}
        onClose={() => setIsFormOpen(false)}
        onSaved={(employee) => setEmployees((current) => upsertEmployee(current, employee))}
        schools={schools}
        token={token}
      />
    </div>
  );

  function openForm(employee: Employee | null) {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  }

  async function handleDelete(employee: Employee) {
    if (!confirm(`Hapus data pegawai ${employee.name}?`)) return;
    try {
      await deleteEmployee(token, employee.id);
      setEmployees((current) => current.filter((item) => item.id !== employee.id));
    } catch (deleteError) {
      setError(getEmployeeErrorMessage(deleteError));
    }
  }
}
