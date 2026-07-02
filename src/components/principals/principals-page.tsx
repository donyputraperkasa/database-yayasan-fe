"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken } from "@/lib/auth/storage";
import type { School } from "@/types";
import { Mail, MessageCircle, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function PrincipalsPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [token] = useState(() => getAccessToken() ?? "");

  useEffect(() => {
    if (!token) return;

    listSchools(token)
      .then(setSchools)
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const principals = schools.filter((school) =>
    [school.name, school.principal, school.email, school.phone]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query.toLowerCase())),
  );

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat kepala sekolah..." />;
  if (error) return <PageState text={error} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Kepala Sekolah" },
        ]}
      />
      <Header count={principals.length} />
      <SearchBox query={query} setQuery={setQuery} />
      <section className="grid gap-4 xl:grid-cols-2">
        {principals.map((school) => (
          <PrincipalCard key={school.id} school={school} />
        ))}
      </section>
    </div>
  );
}

function Header({ count }: { count: number }) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#748299]">Kontak Unit</p>
      <div className="mt-1 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Kepala Sekolah</h1>
        <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {count} kontak
        </span>
      </div>
      <p className="mt-2 text-sm text-[#748299]">
        Daftar kepala sekolah beserta kontak WA dan email unit.
      </p>
    </section>
  );
}

function SearchBox(props: { query: string; setQuery: (query: string) => void }) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-lg border border-[#dbe5f4] bg-white px-4 shadow-sm">
      <Search size={18} className="text-[#748299]" aria-hidden="true" />
      <input
        value={props.query}
        onChange={(event) => props.setQuery(event.target.value)}
        placeholder="Cari nama kepala sekolah, sekolah, email, atau nomor WA..."
        className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
    </label>
  );
}

function PrincipalCard({ school }: { school: School }) {
  const whatsappUrl = buildWhatsappUrl(school.phone);

  return (
    <article className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#dbe5f4] bg-[#f8fbff]">
          <Image
            src="/logo-yayasan.png"
            alt={school.principal ?? "Kepala sekolah"}
            fill
            sizes="96px"
            className="object-contain p-3"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#748299]">{school.name}</p>
          <h2 className="mt-1 text-xl font-semibold text-[#172033]">
            {school.principal ?? "Belum diisi"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={buttonClass}>
                <MessageCircle size={16} aria-hidden="true" />
                {school.phone}
              </a>
            ) : (
              <span className={mutedClass}>WA belum diisi</span>
            )}
            {school.email ? (
              <a href={`mailto:${school.email}`} className={buttonClass}>
                <Mail size={16} aria-hidden="true" />
                {school.email}
              </a>
            ) : (
              <span className={mutedClass}>Email belum diisi</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function buildWhatsappUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}

const buttonClass =
  "inline-flex items-center gap-2 rounded-md border border-[#cfe0f5] bg-[#eaf2ff] px-3 py-2 text-sm font-semibold text-[#0f2a4f]";
const mutedClass =
  "inline-flex items-center rounded-md bg-[#f8fbff] px-3 py-2 text-sm font-semibold text-[#748299]";
