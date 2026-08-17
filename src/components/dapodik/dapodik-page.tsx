"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { getStoredUser } from "@/lib/auth/storage";
import { Database } from "lucide-react";
import { useState } from "react";
import { DapodikForm } from "./dapodik-form";
import { DapodikPhoto } from "./dapodik-photo";
import type { User } from "@/types";

export default function DapodikPage() {
  const [user] = useState<User | null>(() => getStoredUser());

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Dapodik" },
        ]}
      />

      {/* Header */}
      <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
            <Database size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Data Pokok Pendidikan</h2>
            <p className="mt-1 text-sm text-[#748299]">
              Unduh formulir dan isi data dapodik{user?.name ? ` — ${user.name}` : ""}.
            </p>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="rounded-lg border border-[#dbe5f4] bg-[#f0f6ff] p-4 shadow-sm">
        <p className="text-sm font-semibold text-[#1f4f8f]">Panduan Pengisian Dapodik</p>
        <ol className="mt-2 list-decimal pl-5 text-sm text-[#526078] space-y-1">
          <li>Unduh panduan yang sesuai (NUPTK atau PTK) dari bagian di bawah.</li>
          <li>Isi formulir dengan data diri yang lengkap dan benar.</li>
          <li>Operator yayasan akan segera menginput ke dapodik untuk segera di verifikasi dinas pendidikan</li>
        </ol>
      </section>

      <DapodikPhoto />
      <DapodikForm />
    </div>
  );
}