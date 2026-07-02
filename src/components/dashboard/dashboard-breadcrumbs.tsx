import Link from "next/link";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type DashboardBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function DashboardBreadcrumbs({ items }: DashboardBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-semibold">
      <ol className="flex flex-wrap items-center gap-2 text-[#748299]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-[#1f4f8f] hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-[#172033]" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className="text-[#b6c2d4]">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
