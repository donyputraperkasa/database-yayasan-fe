import type { Asset, AssetFilters } from "@/types";

export function cleanAssetFilters(filters: AssetFilters) {
  return {
    schoolId: filters.schoolId || undefined,
  };
}

export function filterAssets(assets: Asset[], query?: string) {
  const keyword = query?.toLowerCase().trim();

  if (!keyword) {
    return assets;
  }

  return assets.filter((asset) =>
    [
      asset.school.name,
      asset.landArea,
      asset.buildingArea,
      asset.certificateOwner,
      asset.origin,
      asset.procurementYear?.toString(),
    ]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(keyword)),
  );
}

export function groupAssetsBySchool(assets: Asset[]) {
  return assets.reduce<Record<string, Asset[]>>((groups, asset) => {
    const schoolName = asset.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), asset];
    return groups;
  }, {});
}

export function upsertAsset(assets: Asset[], savedAsset: Asset) {
  const exists = assets.some((asset) => asset.id === savedAsset.id);

  if (!exists) {
    return [savedAsset, ...assets];
  }

  return assets.map((asset) => (asset.id === savedAsset.id ? savedAsset : asset));
}

export function getAssetErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Data aset gagal diproses.";
}
