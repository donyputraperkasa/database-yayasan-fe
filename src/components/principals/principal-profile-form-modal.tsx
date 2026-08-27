"use client";

import { createAsset, updateAsset, uploadAssetPhoto } from "@/lib/api/assets";
import { getMediaUrl } from "@/lib/api/media";
import {
  updateSchool,
  updateSchoolProfile,
  uploadSchoolProfilePhoto,
} from "@/lib/api/schools";
import { showToast } from "@/lib/feedback/toast";
import type { Asset, AssetPayload, PrincipalProfileFormModalProps, School } from "@/types";
import { X } from "lucide-react";
import { useState, type FormEvent } from "react";

export function PrincipalProfileFormModal(props: PrincipalProfileFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  if (!props.isOpen || !props.school) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const formData = new FormData(event.currentTarget);
      const savedSchool = await updateSchool(props.token, props.school!.id, {
        address: value(formData, "address"),
        email: value(formData, "email"),
        phone: value(formData, "phone"),
        principal: value(formData, "principal"),
      });
      const savedProfile = await updateSchoolProfile(props.token, props.school!.id, {
        history: value(formData, "history"),
        mission: value(formData, "mission"),
        motto: value(formData, "motto"),
        vision: value(formData, "vision"),
      });
      const schoolPhoto = file(formData, "schoolPhoto");
      const nextProfile = schoolPhoto
        ? await uploadSchoolProfilePhoto(props.token, props.school!.id, schoolPhoto)
        : savedProfile;
      const assetPayload = buildAssetPayload(formData, props.school!.id);
      const assetPhoto = file(formData, "assetPhoto");
      const savedAsset = props.asset
        ? await updateAsset(props.token, props.asset.id, assetPayload)
        : await createAsset(props.token, assetPayload);
      const nextAsset =
        assetPhoto && savedAsset
          ? await uploadAssetPhoto(props.token, savedAsset.id, assetPhoto)
          : savedAsset;

      props.onSaved({ ...savedSchool, profile: nextProfile }, nextAsset);
      showToast({ message: "Biodata unit sekolah berhasil disimpan.", type: "success" });
      props.onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Profil unit gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        className="modal-panel-enter max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
      >
        <Header isSaving={isSaving} onClose={props.onClose} />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input label="Kepala Sekolah" name="principal" value={props.school.principal} />
          <Input label="Email Sekolah" name="email" type="email" value={props.school.email} />
          <Input label="Nomor WA/Telepon" name="phone" value={props.school.phone} />
          <Input label="Motto" name="motto" value={props.school.profile?.motto} />
          <Upload label="Logo/Foto Sekolah" name="schoolPhoto" photoUrl={props.school.profile?.photoUrl} />
          <Upload label="Foto Tanah/Bangunan" name="assetPhoto" photoUrl={props.asset?.photoUrl} />
          <Textarea label="Alamat" name="address" value={props.school.address} />
          <Textarea label="Sejarah Singkat" name="history" value={props.school.profile?.history} />
          <Textarea label="Visi" name="vision" value={props.school.profile?.vision} />
          <Textarea label="Misi" name="mission" value={props.school.profile?.mission} />
          <Textarea label="Luas Tanah" name="landArea" value={props.asset?.landArea} />
          <Textarea label="Luas Bangunan" name="buildingArea" value={props.asset?.buildingArea} />
          <Textarea label="Status Kepemilikan Sertifikat" name="certificateOwner" value={props.asset?.certificateOwner} />
          {/* <Input label="Asal Perolehan" name="origin" value={props.asset?.origin} />
          <Input label="Tahun Perolehan" name="procurementYear" type="number" value={props.asset?.procurementYear} /> */}
        </div>
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      </form>
    </div>
  );
}

function Header(props: { isSaving: boolean; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-[#172033]">Edit Profil Unit Sekolah</h2>
        <p className="mt-1 text-sm text-[#748299]">
          Lengkapi biodata, visi misi, tanah, bangunan, dan foto pendukung.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="h-10 rounded-md bg-[#0f2a4f] px-4 text-sm font-semibold text-white">
          {props.isSaving ? "Menyimpan..." : "Simpan"}
        </button>
        <button type="button" onClick={props.onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Input(props: { label: string; name: string; type?: string; value?: number | string | null }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#172033]">{props.label}</span>
      <input name={props.name} type={props.type ?? "text"} defaultValue={props.value ?? ""} className={fieldClass} />
    </label>
  );
}

function Textarea(props: { label: string; name: string; value?: string | null }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-semibold text-[#172033]">{props.label}</span>
      <textarea name={props.name} defaultValue={props.value ?? ""} className={`${fieldClass} h-auto min-h-28 py-3`} />
    </label>
  );
}

function Upload(props: { label: string; name: string; photoUrl?: string | null }) {
  const previewUrl = getMediaUrl(props.photoUrl);
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#172033]">{props.label}</span>
      <div className="mt-2 flex gap-3 rounded-lg border border-[#ced9eb] bg-[#f8fbff] p-3">
        <PhotoPreview previewUrl={previewUrl} />
        <input accept="image/jpeg,image/png,image/webp" name={props.name} type="file" className={fileClass} />
      </div>
    </label>
  );
}

function PhotoPreview({ previewUrl }: { previewUrl: string | null }) {
  if (!previewUrl) {
    return <div className="grid h-20 w-24 shrink-0 place-items-center rounded-md bg-white text-xs font-semibold text-[#748299]">Belum ada</div>;
  }
  return <div className="h-20 w-24 shrink-0 rounded-md bg-white bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${previewUrl})` }} />;
}

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function file(formData: FormData, key: string) {
  const candidate = formData.get(key);
  return candidate instanceof File && candidate.size > 0 ? candidate : null;
}

function buildAssetPayload(formData: FormData, schoolId: string): AssetPayload {
  return {
    buildingArea: optional(formData, "buildingArea"),
    certificateOwner: optional(formData, "certificateOwner"),
    landArea: optional(formData, "landArea"),
    origin: optional(formData, "origin"),
    procurementYear: optionalNumber(formData, "procurementYear"),
    schoolId,
  };
}

function optional(formData: FormData, key: string) {
  return value(formData, key) || undefined;
}

function optionalNumber(formData: FormData, key: string) {
  const input = optional(formData, key);
  return input ? Number(input) : undefined;
}

const fieldClass =
  "mt-2 h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#d7e7ff]";
const fileClass =
  "min-w-0 flex-1 text-sm text-[#526078] file:mr-3 file:rounded-md file:border-0 file:bg-[#0f2a4f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white";
