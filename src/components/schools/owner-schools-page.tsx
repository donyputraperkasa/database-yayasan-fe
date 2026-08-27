"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { LevelFilterPills } from "@/components/ui/level-filter-pills";
import {
  deleteSchool,
  listArchivedSchools,
  listSchools,
  restoreSchool,
  setSchoolEditAccess,
} from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import { showToast } from "@/lib/feedback/toast";
import type { School, User } from "@/types";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateSchoolForm } from "./create-school-form";
import { SchoolsHeader } from "./schools-header";
import { SchoolsTable } from "./schools-table";
import { ArchivedSchools } from "./archived-schools";

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
      setArchivedSchools((current) =>
        current.filter((item) => item.id !== deleteArchivedTarget.id),
      );
      showToast({ message: `${deleteArchivedTarget.name} berhasil dihapus dari arsip.` });
      setDeleteArchivedTarget(null);
    } catch (err) {
      showToast({
        message: err instanceof Error ? err.message : "Gagal menghapus arsip.",
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

  if (!token) {
    return <PageState text="Sesi login tidak ditemukan." />;
  }

  if (user?.role !== "owner") {
    return <PageState text="Halaman ini khusus owner." />;
  }

  if (isLoading) {
    return <PageState text="Memuat data sekolah..." />;
  }

  if (error) {
    return <PageState text={error} />;
  }

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
      <section className="flex flex-col gap-3 rounded-xl border border-[#dbe5f4] bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <label className="flex h-11 items-center gap-2.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-3.5 transition focus-within:border-[#1f4f8f] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eaf2ff]">
            <Search size={17} className="shrink-0 text-[#1f4f8f]" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama sekolah, kepala sekolah, email, alamat, atau nomor telepon..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94a3b8]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#cbd5e1] text-white transition hover:bg-[#94a3b8]"
                title="Hapus pencarian"
              >
                <X size={12} />
              </button>
            ) : null}
          </label>
        </div>
        <LevelFilterPills activeLevel={level} onSelectLevel={setLevel} />
      </section>
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

function ArchiveSchoolModal(props: {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  school: School | null;
}) {
  if (!props.school) return null;

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <p className="text-sm font-semibold text-amber-700">Konfirmasi Arsip</p>
        <h2 className="mt-2 text-xl font-semibold text-[#172033]">
          Anda yakin mengarsipkan sekolah?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#748299]">
          Data <strong>{props.school.name}</strong> disembunyikan dari sistem aktif,
          tetapi tetap tersimpan dan dapat dipulihkan oleh owner.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={props.onClose}
            className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold text-[#526078] hover:bg-[#f8fbff]"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={props.isLoading}
            onClick={props.onConfirm}
            className="h-11 rounded-md bg-amber-600 px-5 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:bg-amber-300"
          >
            {props.isLoading ? "Mengarsipkan..." : "Ya, Arsipkan"}
          </button>
        </div>
      </section>
    </div>
  );
}

function DeleteArchivedSchoolModal(props: {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  school: School | null;
}) {
  if (!props.school) return null;

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <p className="text-sm font-semibold text-red-700">Hapus Arsip Sekolah</p>
        <h2 className="mt-2 text-xl font-semibold text-[#172033]">
          Hapus sekolah dari arsip?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#748299]">
          Data arsip untuk <strong>{props.school.name}</strong> akan dihapus dari daftar arsip.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={props.onClose}
            className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold text-[#526078] hover:bg-[#f8fbff]"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={props.isLoading}
            onClick={props.onConfirm}
            className="h-11 rounded-md bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-red-300"
          >
            {props.isLoading ? "Menghapus..." : "Ya, Hapus Arsip"}
          </button>
        </div>
      </section>
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
