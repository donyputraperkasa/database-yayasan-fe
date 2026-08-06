type TableActionsProps = {
  canDetail?: boolean;
  canManage: boolean;
  onDelete: () => void;
  onDetail: () => void;
  onEdit: () => void;
};

export function TableActions({
  canDetail = true,
  canManage,
  onDelete,
  onDetail,
  onEdit,
}: TableActionsProps) {
  if (!canManage && !canDetail) {
    return <span className="text-xs text-[#94a3b8]">-</span>;
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 md:mt-0">
      {canDetail ? (
        <ActionButton tone="info" onClick={onDetail}>Detail</ActionButton>
      ) : null}
      {canManage ? (
        <>
          <ActionButton tone="edit" onClick={onEdit}>Edit</ActionButton>
          <ActionButton tone="danger" onClick={onDelete}>Hapus</ActionButton>
        </>
      ) : null}
    </div>
  );
}

function ActionButton(props: {
  children: string;
  onClick: () => void;
  tone: "danger" | "edit" | "info";
}) {
  const toneClass = {
    danger: "border-red-100 bg-red-50 text-red-700 hover:bg-red-100",
    edit: "border-amber-100 bg-amber-50 text-amber-700 hover:bg-amber-100",
    info: "border-[#cfe0f5] bg-[#eaf2ff] text-[#0f2a4f] hover:bg-[#dbeafe]",
  }[props.tone];

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`rounded-md border px-3 py-2 text-xs font-semibold ${toneClass}`}
    >
      {props.children}
    </button>
  );
}
