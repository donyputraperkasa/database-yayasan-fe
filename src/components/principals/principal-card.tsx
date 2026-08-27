import { getMediaUrl } from "@/lib/api/media";
import type { Asset, School } from "@/types";
import {
  ChevronRight,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  Trash2,
} from "lucide-react";

export function PrincipalCard(props: {
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
  const badgeStyle = getLevelBadgeStyle(school.level);

  return (
    <article
      onClick={props.onOpen}
      className="group flex flex-col justify-between rounded-xl border border-[#dbe5f4] bg-white p-5 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-[#a8c4e8] hover:shadow-md cursor-pointer"
    >
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className="h-24 w-24 shrink-0 rounded-xl border border-[#dbe5f4] bg-[#f8fbff] bg-contain bg-center bg-no-repeat shadow-inner"
            role="img"
            aria-label={school.name}
            style={{ backgroundImage: `url(${photoUrl})` }}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-[#0f2a4f] sm:text-lg">
                {school.name}
              </h3>
              <span
                className={`inline-flex shrink-0 items-center rounded-md border px-2.5 py-0.5 text-xs font-bold ${badgeStyle}`}
              >
                {getLevelLabel(school.level)}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#334155]">
              <span className="font-semibold text-[#64748b]">Kepala Sekolah:</span>
              <span className="font-bold text-[#172033]">
                {school.principal || "Belum diisi"}
              </span>
            </div>

            {school.address ? (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#64748b]">
                <MapPin size={13} className="shrink-0 text-[#94a3b8]" />
                <span className="truncate">{school.address}</span>
              </div>
            ) : null}

            {/* Kontak: WA & Email */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-1.5 text-xs font-semibold text-[#166534] transition hover:bg-[#dcfce7]"
                  title="Chat WhatsApp"
                >
                  <MessageCircle size={13} className="text-[#16a34a]" />
                  <span>{school.phone}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-xs font-medium text-[#94a3b8]">
                  <MessageCircle size={13} />
                  <span>WA belum diisi</span>
                </span>
              )}

              {school.email ? (
                <a
                  href={`mailto:${school.email}`}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-2.5 py-1.5 text-xs font-semibold text-[#1f4f8f] transition hover:bg-[#eaf2ff]"
                  title="Kirim Email"
                >
                  <Mail size={13} className="text-[#1f4f8f]" />
                  <span className="max-w-[180px] truncate">{school.email}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-xs font-medium text-[#94a3b8]">
                  <Mail size={13} />
                  <span>Email belum diisi</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="mt-4 flex items-center justify-between border-t border-[#f1f5f9] pt-3.5">
        <div className="flex items-center gap-2">
          {props.canManage ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  props.onEdit();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfe0f5] bg-[#f8fbff] px-3 py-1.5 text-xs font-semibold text-[#0f2a4f] transition hover:bg-[#eaf2ff]"
              >
                <Edit3 size={13} />
                <span>{props.asset ? "Edit Profil" : "Lengkapi Biodata"}</span>
              </button>

              {props.asset ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onDelete();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              ) : null}
            </>
          ) : (
            <span className="text-xs font-medium text-[#748299]">Unit BOPKRI</span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1f4f8f] transition group-hover:translate-x-0.5">
          <span>Lihat Profil</span>
          <ChevronRight size={14} />
        </span>
      </div>
    </article>
  );
}

function getLevelLabel(level?: string | null) {
  switch (level) {
    case "tk_kb":
      return "TK / KB";
    case "sd":
      return "SD";
    case "smp":
      return "SMP";
    case "sma_smk":
      return "SMA / SMK";
    default:
      return "Unit Sekolah";
  }
}

function getLevelBadgeStyle(level?: string | null) {
  switch (level) {
    case "tk_kb":
      return "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]";
    case "sd":
      return "bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe]";
    case "smp":
      return "bg-[#fef3c7] text-[#92400e] border-[#fde68a]";
    case "sma_smk":
      return "bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]";
    default:
      return "bg-[#eaf2ff] text-[#1f4f8f] border-[#dbe5f4]";
  }
}

function buildWhatsappUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}
