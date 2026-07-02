"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import {
  deleteSchool,
  listSchools,
  setSchoolEditAccess,
} from "@/lib/api/schools";
import { getAccessToken } from "@/lib/auth/storage";
import type { School } from "@/types";
import { useEffect, useState } from "react";
import { CreateSchoolForm } from "./create-school-form";
import { SchoolsHeader } from "./schools-header";
import { SchoolsTable } from "./schools-table";

export function OwnerSchoolsPage() {
  const [error, setError] = useState<string | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [token] = useState(() => getAccessToken() ?? "");
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  useEffect(() => {
    if (!token) {
      return;
    }

    listSchools(token)
      .then(setSchools)
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const handleDelete = async (school: School) => {
    if (!confirm(`Hapus ${school.name}?`)) {
      return;
    }

    await deleteSchool(token, school.id);
    setSchools((current) => current.filter((item) => item.id !== school.id));
  };

  const handleToggleEditAccess = async (school: School) => {
    const updatedSchool = await setSchoolEditAccess(
      token,
      school.id,
      !school.canEdit,
    );

    setSchools((current) =>
      current.map((item) => (item.id === school.id ? updatedSchool : item)),
    );
  };

  if (!token) {
    return <PageState text="Sesi login tidak ditemukan." />;
  }

  if (isLoading) {
    return <PageState text="Memuat data sekolah..." />;
  }

  if (error) {
    return <PageState text={error} />;
  }

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Sekolah" }]}
      />
      <SchoolsHeader />
      <CreateSchoolForm
        onCreated={(school) => setSchools((current) => [school, ...current])}
        token={token}
      />
      <SchoolsTable
        onDelete={handleDelete}
        onToggleEditAccess={handleToggleEditAccess}
        schools={schools}
      />
    </div>
  );
}

function PageState({ text }: { text: string }) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 text-sm font-semibold text-[#1f4f8f] shadow-sm">
      {text}
    </section>
  );
}
