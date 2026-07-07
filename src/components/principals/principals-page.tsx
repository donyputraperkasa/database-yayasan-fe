"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { getMediaUrl } from "@/lib/api/media";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken } from "@/lib/auth/storage";
import type { School } from "@/types";
import { Mail, MessageCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PrincipalDetailModal } from "./principal-detail-modal";

export function PrincipalsPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
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
          <PrincipalCard
            key={school.id}
            onOpen={() => setSelectedSchool(school)}
            school={school}
          />
        ))}
      </section>
      <PrincipalDetailModal
        onClose={() => setSelectedSchool(null)}
        school={selectedSchool}
      />
    </div>
  );
}

function Header({ count }: { count: number }) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#748299]">Data Kepala Sekolah</p>
      <div className="mt-1 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Profil Unit Sekolah</h1>
        <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {count} unit sekolah
        </span>
      </div>
      <p className="mt-2 text-sm text-[#748299]">
        Menampilkan daftar unit sekolah beserta informasi kepala sekolah, alamat email, dan nomor WhatsApp yang terdaftar di lingkungan Yayasan BOPKRI.
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

function PrincipalCard(props: { onOpen: () => void; school: School }) {
  const { school } = props;
  const whatsappUrl = buildWhatsappUrl(school.phone);
  const photoUrl = getMediaUrl(school.profile?.photoUrl) ?? "/logo-yayasan.png";

  return (
    <article
      onClick={props.onOpen}
      className="cursor-pointer rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="h-28 w-28 shrink-0 rounded-xl border border-[#dbe5f4] bg-[#f8fbff] bg-contain bg-center bg-no-repeat shadow-inner"
          role="img"
          aria-label={school.principal ?? "Kepala sekolah"}
          style={{ backgroundImage: `url(${photoUrl})` }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#748299]">{school.name}</p>
          <h2 className="mt-1 text-xl font-semibold text-[#172033]">
            {school.principal ?? "Belum diisi"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className={buttonClass}
              >
                <MessageCircle size={16} aria-hidden="true" />
                {school.phone}
              </a>
            ) : (
              <span className={mutedClass}>WA belum diisi</span>
            )}
            {school.email ? (
              <a
                href={`mailto:${school.email}`}
                onClick={(event) => event.stopPropagation()}
                className={buttonClass}
              >
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
