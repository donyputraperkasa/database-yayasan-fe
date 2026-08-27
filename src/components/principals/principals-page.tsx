"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { deleteAsset, listAssets } from "@/lib/api/assets";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { Asset, School, User } from "@/types";
import { useEffect, useState } from "react";
import { getAssetErrorMessage, upsertAsset } from "../assets/asset-page-utils";
import { PrincipalCard } from "./principal-card";
import { PrincipalDetailModal } from "./principal-detail-modal";
import { PrincipalProfileFormModal } from "./principal-profile-form-modal";
import { PrincipalsHeader } from "./principals-header";
import { PrincipalSearchBox } from "./principals-search-box";

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
      <PrincipalsHeader count={principals.length} />
      <PrincipalSearchBox
        level={level}
        onClear={() => setQuery("")}
        query={query}
        setLevel={setLevel}
        setQuery={setQuery}
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
