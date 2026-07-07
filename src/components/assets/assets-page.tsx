"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { SchoolEditAccessNotice } from "@/components/schools/school-edit-access-notice";
import { PageState } from "@/components/ui/page-state";
import { deleteAsset, listAssets } from "@/lib/api/assets";
import { listSchools } from "@/lib/api/schools";
import { canManageSchoolData, getCurrentSchool } from "@/lib/auth/permissions";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { Asset, AssetFilters, School, User } from "@/types";
import { useEffect, useState } from "react";
import { AssetDetailModal } from "./asset-detail-modal";
import { AssetFormModal } from "./asset-form-modal";
import {
  cleanAssetFilters,
  filterAssets,
  getAssetErrorMessage,
  upsertAsset,
} from "./asset-page-utils";
import { AssetStats } from "./asset-stats";
import { AssetsFilter } from "./assets-filter";
import { AssetsHeader } from "./assets-header";
import { AssetsTable } from "./assets-table";

export function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [detailAsset, setDetailAsset] = useState<Asset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AssetFilters>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  const loadAssets = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setAssets(await listAssets(token, cleanAssetFilters(nextFilters)));
    } catch (loadError) {
      setError(getAssetErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (asset: Asset | null) => {
    setSelectedAsset(asset);
    setIsFormOpen(true);
  };

  const handleDelete = async (asset: Asset) => {
    if (!confirm(`Hapus data aset ${asset.school.name}?`)) return;
    try {
      await deleteAsset(token, asset.id);
      setAssets((current) => current.filter((item) => item.id !== asset.id));
    } catch (deleteError) {
      setError(getAssetErrorMessage(deleteError));
    }
  };

  useEffect(() => {
    if (!token) return;

    Promise.all([listSchools(token), listAssets(token)])
      .then(([schoolData, assetData]) => {
        setSchools(schoolData);
        setAssets(assetData);
      })
      .catch((loadError) => setError(getAssetErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const currentSchool = getCurrentSchool(user, schools);
  const canManage = canManageSchoolData(user, schools);
  const activeSchoolName =
    user?.role === "school" ? currentSchool?.name : selectedSchoolName;
  const visibleAssets = filterAssets(assets, filters.query);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat data aset..." />;
  if (error) return <PageState text={error} action={() => void loadAssets()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[
          { href: "/dashboard", label: "Dashboard" },
          ...(selectedSchoolName
            ? [
                {
                  href: "/assets",
                  label: selectedSchoolName,
                  onClick: () => setSelectedSchoolName(null),
                },
                { label: "Aset" },
              ]
            : [{ label: "Aset" }]),
        ]}
      />
      <AssetsHeader canManage={canManage} onCreate={() => openForm(null)} />
      <SchoolEditAccessNotice school={currentSchool} user={user} />
      <AssetStats assets={visibleAssets} />
      <AssetsFilter
        filters={filters}
        isSchoolUser={user?.role === "school"}
        onChange={setFilters}
        onSubmit={() => void loadAssets()}
        schools={schools}
      />
      <AssetsTable
        assets={visibleAssets}
        canBackToSchools={user?.role !== "school"}
        canManage={canManage}
        onBackToSchools={() => setSelectedSchoolName(null)}
        onDelete={handleDelete}
        onDetail={setDetailAsset}
        onEdit={openForm}
        onSelectSchool={setSelectedSchoolName}
        selectedSchoolName={activeSchoolName}
      />
      <AssetDetailModal asset={detailAsset} onClose={() => setDetailAsset(null)} />
      <AssetFormModal
        asset={selectedAsset}
        isOpen={isFormOpen}
        isSchoolUser={user?.role === "school"}
        onClose={() => setIsFormOpen(false)}
        onSaved={(asset) => setAssets((current) => upsertAsset(current, asset))}
        schools={schools}
        token={token}
      />
    </div>
  );
}
