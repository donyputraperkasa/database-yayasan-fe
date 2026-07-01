export function CreatorFooter() {
  return (
    <footer className="absolute inset-x-0 bottom-5 z-10 px-6">
      <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-[#d8e3f4] bg-white/78 px-5 py-3 text-sm text-[#617089] shadow-lg shadow-[#1f4f8f]/8 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#f2d35f]" />
        <span>created by :</span>
        <a
          href="https://portofolio-ku-gold.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#1f4f8f] underline-offset-4 transition hover:text-[#29328f] hover:underline"
        >
          dony putra perkasa
        </a>
      </div>
    </footer>
  );
}
