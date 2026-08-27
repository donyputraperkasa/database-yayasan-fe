"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import {
  createAsset,
  listAssets,
  updateAsset,
  uploadAssetPhoto,
} from "@/lib/api/assets";
import {
  getSchoolProfile,
  listSchools,
  updateSchool,
  updateSchoolProfile,
  uploadSchoolProfilePhoto,
} from "@/lib/api/schools";
import { getCurrentSchool } from "@/lib/auth/permissions";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import { showToast } from "@/lib/feedback/toast";
import type { Asset, School, SchoolProfile, User } from "@/types";
import { Save } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { SchoolEditAccessNotice } from "./school-edit-access-notice";
import {
  ProfileAssetFields,
  ProfileInput,
  ProfileTextarea,
  SchoolPhotoField,
  SchoolProfileHeader,
} from "./school-profile-form-fields";
import {
  buildAssetPayload,
  getFile,
  getPhotoFile,
  getValue,
  hasAssetPayload,
} from "./school-profile-utils";

export function SchoolProfilePage() {
  const [error, setError] = useState<string | null>(null);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<SchoolProfile | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  const school = getCurrentSchool(user, schools);
  const canEdit = Boolean(school?.canEdit);

  useEffect(() => {
    if (!token || user?.role !== "school") return;

    listSchools(token)
      .then(async (schoolData) => {
        setSchools(schoolData);
        const currentSchool = getCurrentSchool(user, schoolData);
        if (currentSchool) {
          const [profileData, assetData] = await Promise.all([
            getSchoolProfile(token, currentSchool.id),
            listAssets(token, { schoolId: currentSchool.id }),
          ]);
          setProfile(profileData);
          setAsset(assetData[0] ?? null);
        }
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Data gagal dimuat.");
      })
      .finally(() => setIsLoading(false));
  }, [token, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!school) return;
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const formData = new FormData(event.currentTarget);
      const savedSchool = await updateSchool(token, school.id, {
        address: getValue(formData, "address"),
        email: getValue(formData, "email"),
        phone: getValue(formData, "phone"),
        principal: getValue(formData, "principal"),
      });
      const savedProfile = await updateSchoolProfile(token, school.id, {
        history: getValue(formData, "history"),
        mission: getValue(formData, "mission"),
        motto: getValue(formData, "motto"),
        vision: getValue(formData, "vision"),
      });
      const photoFile = getPhotoFile(formData);
      const nextProfile = photoFile
        ? await uploadSchoolProfilePhoto(token, school.id, photoFile)
        : savedProfile;
      const assetPayload = buildAssetPayload(formData);
      const assetPhotoFile = getFile(formData, "assetPhoto");
      const savedAsset =
        asset || hasAssetPayload(assetPayload) || assetPhotoFile
          ? asset
            ? await updateAsset(token, asset.id, assetPayload)
            : await createAsset(token, assetPayload)
          : null;
      const nextAsset =
        savedAsset && assetPhotoFile
          ? await uploadAssetPhoto(token, savedAsset.id, assetPhotoFile)
          : savedAsset;

      setSchools((current) =>
        current.map((item) => (item.id === savedSchool.id ? savedSchool : item)),
      );
      setProfile(nextProfile);
      setAsset(nextAsset);
      setSuccess("Biodata sekolah berhasil disimpan.");
      showToast({ message: "Biodata sekolah berhasil disimpan.", type: "success" });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Biodata gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (user?.role !== "school") return <PageState text="Halaman ini khusus role school." />;
  if (isLoading) return <PageState text="Memuat biodata sekolah..." />;
  if (!school) return <PageState text="Akun belum terhubung ke sekolah." />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Biodata Sekolah" }]}
      />
      <SchoolProfileHeader school={school} profile={profile} />
      <SchoolEditAccessNotice school={school} user={user} />
      <form onSubmit={handleSubmit} className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInput disabled={!canEdit} label="Unit Sekolah" name="principal" value={school.principal} />
          <ProfileInput disabled={!canEdit} label="Email Sekolah" name="email" type="email" value={school.email} />
          <ProfileInput disabled={!canEdit} label="Nomor WA/Telepon" name="phone" value={school.phone} />
          <SchoolPhotoField disabled={!canEdit} photoUrl={profile?.photoUrl} />
          <ProfileTextarea disabled={!canEdit} label="Alamat" name="address" value={school.address} />
          <ProfileTextarea disabled={!canEdit} label="Sejarah Singkat" name="history" value={profile?.history} />
          <ProfileTextarea disabled={!canEdit} label="Visi" name="vision" value={profile?.vision} />
          <ProfileTextarea disabled={!canEdit} label="Misi" name="mission" value={profile?.mission} />
          <ProfileInput disabled={!canEdit} label="Motto" name="motto" value={profile?.motto} />
          <ProfileAssetFields asset={asset} disabled={!canEdit} />
        </div>
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {success ? <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p> : null}
        <button
          disabled={!canEdit || isSaving}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white disabled:bg-[#93a4bd]"
        >
          <Save size={17} aria-hidden="true" />
          {isSaving ? "Menyimpan..." : "Simpan Biodata"}
        </button>
      </form>
    </div>
  );
}
