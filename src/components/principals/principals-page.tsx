"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { deleteAsset, listAssets } from "@/lib/api/assets";
import { getMediaUrl } from "@/lib/api/media";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken } from "@/lib/auth/storage";
import { getStoredUser } from "@/lib/auth/storage";
import type { Asset, School, User } from "@/types";
import { Mail, MessageCircle, Search, UserRoundCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getAssetErrorMessage, upsertAsset } from "../assets/asset-page-utils";
import { PrincipalDetailModal } from "./principal-detail-modal";
import { PrincipalProfileFormModal } from "./principal-profile-form-modal";

export function PrincipalsPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [query, setQuery] = useState("");
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
  const principals = schools.filter((school) =>
    [school.name, school.principal, school.email, school.phone]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query.toLowerCase())),
  );

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
      <SearchBox query={query} setQuery={setQuery} />
      <section className="grid gap-4 xl:grid-cols-2">
        {principals.map((school) => (
          <PrincipalCard
            asset={assets.find((asset) => asset.schoolId === school.id) ?? null}
            canManage={canManage}
            key={school.id}
            onDelete={() => void handleDeleteAsset(school)}
            onEdit={() => openAssetForm(school)}
            onOpen={() => setSelectedSchool(school)}
            school={school}
          />
        ))}
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
          {props.canManage ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  props.onEdit();
                }}
                className={manageClass}
              >
                {props.asset ? "Edit Biodata" : "Lengkapi Biodata"}
              </button>
              {props.asset ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onDelete();
                  }}
                  className={dangerClass}
                >
                  Hapus Profil
                </button>
              ) : null}
            </div>
          ) : null}
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
const manageClass =
  "rounded-md border border-[#cfe0f5] bg-[#f8fbff] px-3 py-2 text-sm font-semibold text-[#0f2a4f]";
const dangerClass =
  "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700";
