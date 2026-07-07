import { getMediaUrl } from "@/lib/api/media";

type EmployeePhotoFieldProps = {
  label?: string;
  name?: string;
  photoUrl?: string | null;
};

export function EmployeePhotoField({
  label = "Foto Pegawai",
  name = "photo",
  photoUrl,
}: EmployeePhotoFieldProps) {
  const previewUrl = getMediaUrl(photoUrl);

  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-2 flex flex-col gap-3 rounded-lg border border-[#ced9eb] bg-[#f8fbff] p-3 sm:flex-row sm:items-center">
        {previewUrl ? (
          <div
            aria-label="Foto pegawai saat ini"
            className="h-20 w-20 rounded-lg bg-white bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        ) : (
          <div className="grid h-20 w-20 place-items-center rounded-lg bg-white text-xs font-semibold text-[#748299]">
            Belum ada
          </div>
        )}
        <div className="min-w-0 flex-1">
          <input
            accept="image/jpeg,image/png,image/webp"
            name={name}
            type="file"
            className="w-full text-sm text-[#526078] file:mr-3 file:rounded-md file:border-0 file:bg-[#0f2a4f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          <p className="mt-2 text-xs leading-5 text-[#748299]">
            Format JPG, PNG, atau WEBP. Maksimal 2 MB.
          </p>
        </div>
      </div>
    </label>
  );
}
