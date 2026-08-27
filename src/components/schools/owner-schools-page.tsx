"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import {
  deleteSchool,
  deleteSchoolPermanently,
  listArchivedSchools,
  listSchools,
  restoreSchool,
  setSchoolEditAccess,
} from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import { showToast } from "@/lib/feedback/toast";
import type { School, User } from "@/types";
import { useEffect, useState } from "react";
import { ArchivedSchools } from "./archived-schools";
import { ArchiveSchoolModal } from "./archive-school-modal";
import { CreateSchoolForm } from "./create-school-form";
import { DeleteArchivedSchoolModal } from "./delete-archived-school-modal";
import { SchoolsHeader } from "./schools-header";
import { SchoolsSearchBox } from "./schools-search-box";
import { SchoolsTable } from "./schools-table";

export function OwnerSchoolsPage() {
  const [deleteTarget, setDeleteTarget] = useState<School | null>(null);
  const [deleteArchivedTarget, setDeleteArchivedTarget] = useState<School | null>(null);
  const [archivedSchools, setArchivedSchools] = useState<School[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingArchived, setIsDeletingArchived] = useState(false);
  const [isRestoring, setIsRestoring] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [schools, setSchools] = useState<School[]>([]);
  const [user] = useState<User | null>(() => getStoredUser());
  const [token] = useState(() => getAccessToken() ?? "");
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  useEffect(() => {
    if (!token || user?.role !== "owner") {
      return;
    }

    Promise.all([listSchools(token), listArchivedSchools(token)])
      .then(([active, archived]) => {
        setSchools(active);
        setArchivedSchools(archived);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));
  }, [token, user?.role]);

  const handleArchive = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deleteSchool(token, deleteTarget.id);
      setSchools((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      setArchivedSchools((current) => [
        { ...deleteTarget, archivedAt: new Date().toISOString() },
        ...current,
      ]);
      showToast({ message: `${deleteTarget.name} berhasil diarsipkan.` });
      setDeleteTarget(null);
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : "Gagal mengarsipkan sekolah.";
      setError(message);
      showToast({ message, type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRestore = async (school: School) => {
    try {
      setIsRestoring(school.id);
      const restored = await restoreSchool(token, school.id);
      setArchivedSchools((current) => current.filter((item) => item.id !== school.id));
      setSchools((current) => [restored, ...current]);
      showToast({ message: `${school.name} berhasil dipulihkan.` });
    } catch (restoreError) {
      showToast({
        message: restoreError instanceof Error ? restoreError.message : "Gagal memulihkan sekolah.",
        type: "error",
      });
    } finally {
      setIsRestoring(null);
    }
  };

  const handleDeleteArchived = async () => {
    if (!deleteArchivedTarget) return;

    try {
      setIsDeletingArchived(true);
      await deleteSchoolPermanently(token, deleteArchivedTarget.id);
      setArchivedSchools((current) =>
        current.filter((item) => item.id !== deleteArchivedTarget.id),
      );
      showToast({ message: `${deleteArchivedTarget.name} berhasil dihapus permanen.` });
      setDeleteArchivedTarget(null);
    } catch (deleteError) {
      showToast({
        message:
          deleteError instanceof Error ? deleteError.message : "Gagal menghapus arsip sekolah.",
        type: "error",
      });
    } finally {
      setIsDeletingArchived(false);
    }
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

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (user?.role !== "owner") return <PageState text="Halaman ini khusus owner." />;
  if (isLoading) return <PageState text="Memuat data sekolah..." />;
  if (error) return <PageState text={error} />;

  const filteredSchools = schools.filter((school) => {
    const keyword = query.trim().toLowerCase();
    const matchesQuery =
      !keyword ||
      [
        school.name,
        school.principal,
        school.email,
        school.phone,
        school.address,
      ]
        .filter(Boolean)
        .some((val) => val!.toLowerCase().includes(keyword));

    const matchesLevel = level === "all" || school.level === level;

    return matchesQuery && matchesLevel;
  });

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
      <SchoolsSearchBox
        level={level}
        onClear={() => setQuery("")}
        query={query}
        setLevel={setLevel}
        setQuery={setQuery}
      />
      <SchoolsTable
        onDelete={setDeleteTarget}
        onToggleEditAccess={handleToggleEditAccess}
        schools={filteredSchools}
      />
      <ArchivedSchools
        isRestoring={isRestoring}
        onDelete={(school) => setDeleteArchivedTarget(school)}
        onRestore={(school) => void handleRestore(school)}
        schools={archivedSchools}
      />
      <ArchiveSchoolModal
        isLoading={isDeleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleArchive}
        school={deleteTarget}
      />
      <DeleteArchivedSchoolModal
        isLoading={isDeletingArchived}
        onClose={() => setDeleteArchivedTarget(null)}
        onConfirm={handleDeleteArchived}
        school={deleteArchivedTarget}
      />
    </div>
  );
}
