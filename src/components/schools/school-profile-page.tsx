"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { getMediaUrl } from "@/lib/api/media";
import {
  getSchoolProfile,
  listSchools,
  updateSchool,
  updateSchoolProfile,
  uploadSchoolProfilePhoto,
} from "@/lib/api/schools";
import { getCurrentSchool } from "@/lib/auth/permissions";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { School, SchoolProfile, User } from "@/types";
import { Save } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { SchoolEditAccessNotice } from "./school-edit-access-notice";

export function SchoolProfilePage() {
  const [error, setError] = useState<string | null>(null);
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
          setProfile(await getSchoolProfile(token, currentSchool.id));
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

      setSchools((current) =>
        current.map((item) => (item.id === savedSchool.id ? savedSchool : item)),
      );
      setProfile(nextProfile);
      setSuccess("Profil sekolah berhasil disimpan.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Profil gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (user?.role !== "school") return <PageState text="Halaman ini khusus role school." />;
  if (isLoading) return <PageState text="Memuat profil sekolah..." />;
  if (!school) return <PageState text="Akun belum terhubung ke sekolah." />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Profil Sekolah" }]}
      />
      <Header school={school} profile={profile} />
      <SchoolEditAccessNotice school={school} user={user} />
      <form onSubmit={handleSubmit} className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Input disabled={!canEdit} label="Unit Sekolah" name="principal" value={school.principal} />
          <Input disabled={!canEdit} label="Email Sekolah" name="email" type="email" value={school.email} />
          <Input disabled={!canEdit} label="Nomor WA/Telepon" name="phone" value={school.phone} />
          <PhotoField disabled={!canEdit} photoUrl={profile?.photoUrl} />
          <Textarea disabled={!canEdit} label="Alamat" name="address" value={school.address} />
          <Textarea disabled={!canEdit} label="Sejarah Singkat" name="history" value={profile?.history} />
          <Textarea disabled={!canEdit} label="Visi" name="vision" value={profile?.vision} />
          <Textarea disabled={!canEdit} label="Misi" name="mission" value={profile?.mission} />
          <Input disabled={!canEdit} label="Motto" name="motto" value={profile?.motto} />
        </div>
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {success ? <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{success}</p> : null}
        <button
          disabled={!canEdit || isSaving}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white disabled:bg-[#93a4bd]"
        >
          <Save size={17} aria-hidden="true" />
          {isSaving ? "Menyimpan..." : "Simpan Profil"}
        </button>
      </form>
    </div>
  );
}

function Header({ profile, school }: { profile: SchoolProfile | null; school: School }) {
  const previewUrl = getMediaUrl(profile?.photoUrl);

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div
        className="h-24 w-24 shrink-0 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] bg-contain bg-center bg-no-repeat"
        style={previewUrl ? { backgroundImage: `url(${previewUrl})` } : undefined}
      />
      <div>
        <p className="text-sm font-semibold text-[#748299]">Profil Sekolah</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#172033]">{school.name}</h1>
        <p className="mt-2 text-sm text-[#748299]">
          Lengkapi kontak dan bio sekolah yang akan terlihat oleh owner dan office.
        </p>
      </div>
    </section>
  );
}

function Input(props: {
  disabled: boolean;
  label: string;
  name: string;
  type?: string;
  value?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#172033]">{props.label}</span>
      <input
        className={fieldClass}
        defaultValue={props.value ?? ""}
        disabled={props.disabled}
        name={props.name}
        type={props.type ?? "text"}
      />
    </label>
  );
}

function Textarea(props: {
  disabled: boolean;
  label: string;
  name: string;
  value?: string | null;
}) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-semibold text-[#172033]">{props.label}</span>
      <textarea
        className={`${fieldClass} h-auto min-h-28 py-3`}
        defaultValue={props.value ?? ""}
        disabled={props.disabled}
        name={props.name}
      />
    </label>
  );
}

function PhotoField(props: { disabled: boolean; photoUrl?: string | null }) {
  const previewUrl = getMediaUrl(props.photoUrl);

  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-semibold text-[#172033]">Logo/Foto Sekolah</span>
      <div className="mt-2 flex flex-col gap-3 rounded-lg border border-[#ced9eb] bg-[#f8fbff] p-3 sm:flex-row sm:items-center">
        {previewUrl ? (
          <div
            aria-label="Logo atau foto sekolah saat ini"
            className="h-24 w-24 rounded-lg bg-white bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        ) : (
          <div className="grid h-24 w-24 place-items-center rounded-lg bg-white text-xs font-semibold text-[#748299]">
            Belum ada
          </div>
        )}
        <div className="min-w-0 flex-1">
          <input
            accept="image/jpeg,image/png,image/webp"
            disabled={props.disabled}
            name="photo"
            type="file"
            className="w-full text-sm text-[#526078] file:mr-3 file:rounded-md file:border-0 file:bg-[#0f2a4f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white disabled:text-[#8b98ad] disabled:file:bg-[#93a4bd]"
          />
          <p className="mt-2 text-xs leading-5 text-[#748299]">
            Format JPG, PNG, atau WEBP. Maksimal 2 MB.
          </p>
        </div>
      </div>
    </label>
  );
}

function getValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getPhotoFile(formData: FormData) {
  const file = formData.get("photo");

  return file instanceof File && file.size > 0 ? file : null;
}

const fieldClass =
  "mt-2 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none disabled:bg-[#f4f7fb] disabled:text-[#8b98ad] focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff] h-11";
