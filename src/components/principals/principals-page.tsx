"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { LevelFilterPills } from "@/components/ui/level-filter-pills";
import { PageState } from "@/components/ui/page-state";
import { deleteAsset, listAssets } from "@/lib/api/assets";
import { getMediaUrl } from "@/lib/api/media";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken } from "@/lib/auth/storage";
import { getStoredUser } from "@/lib/auth/storage";
import type { Asset, School, User } from "@/types";
import {
  ChevronRight,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  Trash2,
  UserRoundCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAssetErrorMessage, upsertAsset } from "../assets/asset-page-utils";
import { PrincipalDetailModal } from "./principal-detail-modal";
import { PrincipalProfileFormModal } from "./principal-profile-form-modal";

export function PrincipalsPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<string>("all");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  useEffect(() => {
    if (!token) return;

    Promise.all([listSchools(token), listAssets(token)])
      .then(([schoolData, assetData]) => {
        setSchools(schoolData);
        setAssets(assetData);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const selectedAsset =
    assets.find((asset) => asset.schoolId === selectedSchool?.id) ?? null;
  const canManage = user?.role === "owner";
  const principals = schools.filter((school) => {
    const matchesQuery = [school.name, school.principal, school.email, school.phone, school.address]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query.toLowerCase()));
    const matchesLevel = level === "all" || school.level === level;
    return matchesQuery && matchesLevel;
  });

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat kepala sekolah..." />;
  if (error) return <PageState text={error} />;

  const openAssetForm = (school: School) => {
    setEditingAsset(assets.find((asset) => asset.schoolId === school.id) ?? null);
    setEditingSchool(school);
    setIsFormOpen(true);
  };

  const handleDeleteAsset = async (school: School) => {
    const asset = assets.find((item) => item.schoolId === school.id);
    if (!asset || !confirm(`Hapus profil sekolah ${school.name}?`)) return;

    try {
      await deleteAsset(token, asset.id);
      setAssets((current) => current.filter((item) => item.id !== asset.id));
    } catch (deleteError) {
      setError(getAssetErrorMessage(deleteError));
    }
  };

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Kepala Sekolah" },
        ]}
      />
      <Header count={principals.length} />
      <SearchBox
        level={level}
        onClear={() => setQuery("")}
        query={query}
        setLevel={setLevel}
        setQuery={setQuery}
        totalCount={principals.length}
      />
      <section className="grid gap-4 xl:grid-cols-2">
        {principals.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-[#dbe5f4] bg-white p-8 text-center">
            <p className="text-sm font-semibold text-[#172033]">
              Data sekolah tidak ditemukan
            </p>
            <p className="mt-1 text-xs text-[#748299]">
              Coba kata kunci lain atau pilih filter jenjang yang berbeda.
            </p>
            {Boolean(query || level !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setLevel("all");
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#eaf2ff] px-3.5 py-1.5 text-xs font-semibold text-[#1f4f8f] transition hover:bg-[#dbe5f4]"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          principals.map((school) => (
            <PrincipalCard
              asset={assets.find((asset) => asset.schoolId === school.id) ?? null}
              canManage={canManage}
              key={school.id}
              onDelete={() => void handleDeleteAsset(school)}
              onEdit={() => openAssetForm(school)}
              onOpen={() => setSelectedSchool(school)}
              school={school}
            />
          ))
        )}
      </section>
      <PrincipalDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedSchool(null)}
        school={selectedSchool}
      />
      <PrincipalProfileFormModal
        asset={editingAsset}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSaved={(school, asset) => {
          setSchools((current) => current.map((item) => (item.id === school.id ? school : item)));
          if (asset) setAssets((current) => upsertAsset(current, asset));
        }}
        school={editingSchool}
        token={token}
      />
    </div>
  );
}

function Header({ count }: { count: number }) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
          <UserRoundCheck size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Profil Sekolah</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Daftar unit sekolah beserta informasi kepala sekolah, email, dan WhatsApp resmi.
          </p>
        </div>
      </div>
      <span className="inline-flex w-fit items-center rounded-full bg-[#f2d35f] px-3.5 py-1 text-xs font-semibold text-[#2d2a16]">
        {count} unit sekolah
      </span>
    </section>
  );
}

type SearchBoxProps = {
  level: string;
  onClear: () => void;
  query: string;
  setLevel: (level: string) => void;
  setQuery: (query: string) => void;
  totalCount: number;
};

function SearchBox(props: SearchBoxProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[#dbe5f4] bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
      {/* Search Input Box */}
      <div className="relative flex-1">
        <label className="flex h-11 items-center gap-2.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-3.5 transition focus-within:border-[#1f4f8f] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eaf2ff]">
          <Search size={17} className="shrink-0 text-[#1f4f8f]" aria-hidden="true" />
          <input
            value={props.query}
            onChange={(event) => props.setQuery(event.target.value)}
            placeholder="Cari nama sekolah, kepala sekolah, email, alamat, atau nomor WA..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94a3b8]"
          />
          {props.query ? (
            <button
              type="button"
              onClick={props.onClear}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#cbd5e1] text-white transition hover:bg-[#94a3b8]"
              title="Hapus pencarian"
            >
              <X size={12} />
            </button>
          ) : null}
        </label>
      </div>

      {/* Level Filters Pills */}
      <LevelFilterPills
        activeLevel={props.level}
        onSelectLevel={props.setLevel}
      />
    </section>
  );
}

function PrincipalCard(props: {
  asset: Asset | null;
  canManage: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onOpen: () => void;
  school: School;
}) {
  const { school } = props;
  const whatsappUrl = buildWhatsappUrl(school.phone);
  const photoUrl = getMediaUrl(school.profile?.photoUrl) ?? "/logo-yayasan.png";
  const badgeStyle = getLevelBadgeStyle(school.level);

  return (
    <article
      onClick={props.onOpen}
      className="group flex flex-col justify-between rounded-xl border border-[#dbe5f4] bg-white p-5 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-[#a8c4e8] hover:shadow-md cursor-pointer"
    >
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className="h-24 w-24 shrink-0 rounded-xl border border-[#dbe5f4] bg-[#f8fbff] bg-contain bg-center bg-no-repeat shadow-inner"
            role="img"
            aria-label={school.name}
            style={{ backgroundImage: `url(${photoUrl})` }}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-[#0f2a4f] sm:text-lg">
                {school.name}
              </h3>
              <span
                className={`inline-flex shrink-0 items-center rounded-md border px-2.5 py-0.5 text-xs font-bold ${badgeStyle}`}
              >
                {getLevelLabel(school.level)}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#334155]">
              <span className="font-semibold text-[#64748b]">Kepala Sekolah:</span>
              <span className="font-bold text-[#172033]">
                {school.principal || "Belum diisi"}
              </span>
            </div>

            {school.address ? (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#64748b]">
                <MapPin size={13} className="shrink-0 text-[#94a3b8]" />
                <span className="truncate">{school.address}</span>
              </div>
            ) : null}

            {/* Kontak: WA & Email */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-1.5 text-xs font-semibold text-[#166534] transition hover:bg-[#dcfce7]"
                  title="Chat WhatsApp"
                >
                  <MessageCircle size={13} className="text-[#16a34a]" />
                  <span>{school.phone}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-xs font-medium text-[#94a3b8]">
                  <MessageCircle size={13} />
                  <span>WA belum diisi</span>
                </span>
              )}

              {school.email ? (
                <a
                  href={`mailto:${school.email}`}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-2.5 py-1.5 text-xs font-semibold text-[#1f4f8f] transition hover:bg-[#eaf2ff]"
                  title="Kirim Email"
                >
                  <Mail size={13} className="text-[#1f4f8f]" />
                  <span className="max-w-[180px] truncate">{school.email}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-xs font-medium text-[#94a3b8]">
                  <Mail size={13} />
                  <span>Email belum diisi</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="mt-4 flex items-center justify-between border-t border-[#f1f5f9] pt-3.5">
        <div className="flex items-center gap-2">
          {props.canManage ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  props.onEdit();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfe0f5] bg-[#f8fbff] px-3 py-1.5 text-xs font-semibold text-[#0f2a4f] transition hover:bg-[#eaf2ff]"
              >
                <Edit3 size={13} />
                <span>{props.asset ? "Edit Profil" : "Lengkapi Biodata"}</span>
              </button>

              {props.asset ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onDelete();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              ) : null}
            </>
          ) : (
            <span className="text-xs font-medium text-[#748299]">Unit BOPKRI</span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1f4f8f] transition group-hover:translate-x-0.5">
          <span>Lihat Profil</span>
          <ChevronRight size={14} />
        </span>
      </div>
    </article>
  );
}

function getLevelLabel(level?: string | null) {
  switch (level) {
    case "tk_kb":
      return "TK / KB";
    case "sd":
      return "SD";
    case "smp":
      return "SMP";
    case "sma_smk":
      return "SMA / SMK";
    default:
      return "Unit Sekolah";
  }
}

function getLevelBadgeStyle(level?: string | null) {
  switch (level) {
    case "tk_kb":
      return "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]";
    case "sd":
      return "bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe]";
    case "smp":
      return "bg-[#fef3c7] text-[#92400e] border-[#fde68a]";
    case "sma_smk":
      return "bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]";
    default:
      return "bg-[#eaf2ff] text-[#1f4f8f] border-[#dbe5f4]";
  }
}

function buildWhatsappUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}
