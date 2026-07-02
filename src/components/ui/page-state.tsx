type PageStateProps = {
  action?: () => void;
  text: string;
};

export function PageState({ action, text }: PageStateProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 text-sm font-semibold text-[#1f4f8f] shadow-sm">
      <p>{text}</p>
      {action ? (
        <button
          onClick={action}
          className="mt-3 rounded-md bg-[#0f2a4f] px-4 py-2 text-white"
        >
          Muat ulang
        </button>
      ) : null}
    </section>
  );
}
