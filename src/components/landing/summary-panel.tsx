import { progressItems, summaryCards } from "./landing-data";

export function SummaryPanel() {
  return (
    <section className="relative min-h-[360px] lg:min-h-[470px]">
      <div className="absolute left-0 top-10 hidden h-44 w-80 rounded-lg border border-[#dfe7f5] bg-white/54 shadow-sm backdrop-blur-sm md:block" />
      <div className="absolute bottom-5 right-2 hidden h-48 w-96 rounded-lg border border-[#dfe7f5] bg-white/54 shadow-sm backdrop-blur-sm md:block" />

      <div className="relative mx-auto mt-3 w-full max-w-[620px] rounded-lg border border-[#cbd8ec] bg-white/94 p-5 shadow-2xl shadow-[#1f4f8f]/12 backdrop-blur">
        <div className="flex items-start justify-between gap-4 border-b border-[#e2e9f5] pb-4">
          <div>
            <p className="text-lg font-semibold text-[#1f4f8f]">
              Ringkasan Yayasan
            </p>
            <p className="mt-1 text-sm text-[#6c788f]">Periode berjalan</p>
          </div>
          <div className="rounded-md bg-[#eaf2ff] px-4 py-3 text-sm font-semibold text-[#1f4f8f]">
            36 Sekolah
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {summaryCards.map((item) => (
            <div
              key={item.label}
              className="rounded-md border border-[#dce5f3] bg-[#fbfdff] p-4"
            >
              <p className="text-sm text-[#7a8699]">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-[#182033]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {progressItems.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-[#3f4a5f]">
                  {item.label}
                </span>
                <span className="text-[#7a8699]">{item.value}</span>
              </div>
              <div className="h-2.5 rounded-sm bg-[#e8edf6]">
                <div
                  className="h-2.5 rounded-sm"
                  style={{ width: item.value, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-md bg-[#fff6d8] p-4 text-sm leading-6 text-[#6d5615]">
          Data sekolah dapat dibiarkan kosong saat akun dibuat, lalu dilengkapi
          oleh unit sekolah masing-masing.
        </div>
      </div>
    </section>
  );
}
