"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import {
  deleteSchool,
  listSchools,
  setSchoolEditAccess,
} from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import { showToast } from "@/lib/feedback/toast";
import type { School, User } from "@/types";
import { useEffect, useState } from "react";
import { CreateSchoolForm } from "./create-school-form";
import { SchoolsHeader } from "./schools-header";
import { SchoolsTable } from "./schools-table";

export function OwnerSchoolsPage() {
  const [deleteTarget, setDeleteTarget] = useState<School | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [user] = useState<User | null>(() => getStoredUser());
  const [token] = useState(() => getAccessToken() ?? "");
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  useEffect(() => {
    if (!token || user?.role !== "owner") {
      return;
    }

    listSchools(token)
      .then(setSchools)
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));
  }, [token, user?.role]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deleteSchool(token, deleteTarget.id);
      setSchools((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      showToast({ message: `${deleteTarget.name} berhasil dihapus.` });
      setDeleteTarget(null);
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : "Gagal menghapus sekolah.";
      setError(message);
      showToast({ message, type: "error" });
    } finally {
      setIsDeleting(false);
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
        onDelete={setDeleteTarget}
        onToggleEditAccess={handleToggleEditAccess}
        schools={schools}
      />
      <DeleteSchoolModal
        isLoading={isDeleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        school={deleteTarget}
      />
    </div>
  );
}

function DeleteSchoolModal(props: {
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
        <p className="text-sm font-semibold text-red-700">Konfirmasi Hapus</p>
        <h2 className="mt-2 text-xl font-semibold text-[#172033]">
          Anda yakin hapus sekolah?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#748299]">
          Data sekolah <strong>{props.school.name}</strong> akan dihapus dari sistem.
          Pastikan data ini memang sudah tidak diperlukan.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={props.onClose}
            className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={props.isLoading}
            onClick={props.onConfirm}
            className="h-11 rounded-md bg-red-600 px-5 text-sm font-semibold text-white disabled:bg-red-300"
          >
            {props.isLoading ? "Menghapus..." : "Ya, Hapus"}
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
