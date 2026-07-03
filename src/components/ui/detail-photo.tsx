import { getMediaUrl } from "@/lib/api/media";

type DetailPhotoProps = {
  fill?: boolean;
  label: string;
  photoUrl?: string | null;
};

export function DetailPhoto({ fill = false, label, photoUrl }: DetailPhotoProps) {
  const previewUrl = getMediaUrl(photoUrl);
  const sizeClass = fill
    ? "h-96 w-full md:h-full md:min-h-[680px]"
    : "h-32 w-32 sm:h-40 sm:w-40";

  if (!previewUrl) {
    return (
      <div
        className={`grid shrink-0 place-items-center rounded-xl bg-[#f8fbff] text-sm font-semibold text-[#748299] ${sizeClass}`}
      >
        Belum ada foto
      </div>
    );
  }

  return (
    <div
      aria-label={label}
      className={`shrink-0 rounded-xl border border-[#dbe5f4] bg-cover bg-center shadow-sm ${sizeClass}`}
      style={{ backgroundImage: `url(${previewUrl})` }}
    />
  );
}
