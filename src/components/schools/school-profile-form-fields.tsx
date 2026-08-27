import { getMediaUrl } from "@/lib/api/media";
import type { Asset, School, SchoolProfile } from "@/types";
import { fieldClass } from "./school-profile-utils";

export function SchoolProfileHeader({
  profile,
  school,
}: {
  profile: SchoolProfile | null;
  school: School;
}) {
  const previewUrl = getMediaUrl(profile?.photoUrl);

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div
        className="h-24 w-24 shrink-0 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] bg-contain bg-center bg-no-repeat"
        style={previewUrl ? { backgroundImage: `url(${previewUrl})` } : undefined}
      />
      <div>
        <p className="text-sm font-semibold text-[#748299]">Biodata Sekolah</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#172033]">{school.name}</h1>
        <p className="mt-2 text-sm text-[#748299]">
          Lengkapi kontak dan bio sekolah yang akan terlihat oleh owner dan office.
        </p>
      </div>
    </section>
  );
}

export function ProfileAssetFields(props: { asset: Asset | null; disabled: boolean }) {
  return (
    <>
      <ProfileInput disabled={props.disabled} label="Luas Tanah" name="landArea" value={props.asset?.landArea} />
      <ProfileInput disabled={props.disabled} label="Luas Bangunan" name="buildingArea" value={props.asset?.buildingArea} />
      <ProfileInput disabled={props.disabled} label="Status Kepemilikan Sertifikat" name="certificateOwner" value={props.asset?.certificateOwner} />
      <AssetPhotoField disabled={props.disabled} photoUrl={props.asset?.photoUrl} />
    </>
  );
}

export function ProfileInput(props: {
  disabled: boolean;
  label: string;
  name: string;
  type?: string;
  value?: number | string | null;
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

export function ProfileTextarea(props: {
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

export function SchoolPhotoField(props: { disabled: boolean; photoUrl?: string | null }) {
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
            className="block w-full text-xs text-[#526078] file:mr-3 file:rounded-md file:border-0 file:bg-[#0f2a4f] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
          />
          <p className="mt-1 text-xs text-[#748299]">Format JPG, PNG, atau WEBP.</p>
        </div>
      </div>
    </label>
  );
}

export function AssetPhotoField(props: { disabled: boolean; photoUrl?: string | null }) {
  const previewUrl = getMediaUrl(props.photoUrl);

  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-semibold text-[#172033]">Foto Aset Bangunan/Tanah</span>
      <div className="mt-2 flex flex-col gap-3 rounded-lg border border-[#ced9eb] bg-[#f8fbff] p-3 sm:flex-row sm:items-center">
        {previewUrl ? (
          <div
            aria-label="Foto aset saat ini"
            className="h-24 w-24 rounded-lg bg-white bg-cover bg-center"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        ) : (
          <div className="grid h-24 w-24 place-items-center rounded-lg bg-white text-xs font-semibold text-[#748299]">
            Belum ada foto aset
          </div>
        )}
        <div className="min-w-0 flex-1">
          <input
            accept="image/jpeg,image/png,image/webp"
            disabled={props.disabled}
            name="assetPhoto"
            type="file"
            className="block w-full text-xs text-[#526078] file:mr-3 file:rounded-md file:border-0 file:bg-[#0f2a4f] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
          />
          <p className="mt-1 text-xs text-[#748299]">Opsional. Foto sertifikat, tanah, atau bangunan.</p>
        </div>
      </div>
    </label>
  );
}
