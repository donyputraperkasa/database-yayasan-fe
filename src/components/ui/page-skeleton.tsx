export function PageSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-28 animate-pulse rounded-lg bg-white shadow-sm" />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-28 animate-pulse rounded-lg bg-white shadow-sm" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-lg bg-white shadow-sm" />
    </div>
  );
}
