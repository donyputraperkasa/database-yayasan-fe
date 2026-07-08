import { getMediaUrl } from "@/lib/api/media";
import type { School } from "@/types";
import { Mail, MessageCircle, X } from "lucide-react";

type PrincipalDetailModalProps = {
  onClose: () => void;
  school: School | null;
};

export function PrincipalDetailModal({ onClose, school }: PrincipalDetailModalProps) {
  if (!school) return null;

  const photoUrl = getMediaUrl(school.profile?.photoUrl) ?? "/logo-yayasan.png";
  const whatsappUrl = buildWhatsappUrl(school.phone);
  const details = [
    ["Kepala Sekolah", school.principal],
    ["Email Sekolah", school.email],
    ["Nomor WA/Telepon", school.phone],
    ["Alamat", school.address],
    ["Sejarah Singkat", school.profile?.history],
    ["Visi", school.profile?.vision],
    ["Misi", school.profile?.mission],
    ["Motto", school.profile?.motto],
  ];

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[70] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="grid items-stretch gap-8 lg:grid-cols-[360px_1fr]">
          <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-[#f8fbff] p-4">
            <div
              aria-label={school.name}
              className="flex h-full min-h-[520px] w-full items-center justify-center rounded-2xl border border-[#dbe5f4] bg-white p-3 shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={school.name}
                className="h-full max-h-full w-full object-contain"
              />
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#748299]">
                  Profil Sekolah
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#172033]">{school.name}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#748299]">
                  Informasi profil sekolah beserta data kepala sekolah, kontak, alamat, visi, misi, motto, dan identitas singkat unit pendidikan.
                </p>
              </div>

              <button onClick={onClose} className="rounded-md p-2 hover:bg-[#eef3fb]">
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className={actionClass}>
                  <MessageCircle size={16} aria-hidden="true" />
                  Hubungi WA
                </a>
              ) : null}
              {school.email ? (
                <a href={`mailto:${school.email}`} className={actionClass}>
                  <Mail size={16} aria-hidden="true" />
                  Kirim Email
                </a>
              ) : null}
            </div>

            <dl className="mt-5 grid gap-3 md:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#f8fbff] p-4">
                  <dt className="text-xs font-semibold text-[#748299]">{label}</dt>
                  <dd className="mt-1 whitespace-pre-line text-sm font-semibold text-[#172033]">
                    {value || "-"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}

function buildWhatsappUrl(phone?: string | null) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}

const actionClass =
  "inline-flex h-10 items-center gap-2 rounded-md bg-[#eaf2ff] px-3 text-sm font-semibold text-[#0f2a4f]";
