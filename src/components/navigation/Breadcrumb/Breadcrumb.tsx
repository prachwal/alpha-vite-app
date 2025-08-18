import { JSX } from 'preact';
import { useMemo } from 'preact/hooks';
import { BreadcrumbItem } from './BreadcrumbItem';

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  separator?: string | JSX.Element;
  maxItems?: number;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = '/',
  maxItems = 8,
  className = '',
}: Readonly<BreadcrumbProps>) {
  const displayItems = useMemo(() => {
    if (items.length <= maxItems) {
      return items;
    }

    const ellipsis: BreadcrumbItem = { label: '...', href: undefined };
    const half = Math.floor((maxItems - 1) / 2);

    return [
      ...items.slice(0, half),
      ellipsis,
      ...items.slice(items.length - half),
    ];
  }, [items, maxItems]);

  const containerClasses = [
    'flex items-center gap-2 text-sm',
    'text-text-secondary',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const linkClasses = [
    'hover:text-primary transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
    'rounded-sm',
  ].join(' ');

  const currentClasses = 'text-text-primary font-medium';

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className="flex items-center gap-2">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';
          const key =
            item.label + (item.href ?? '') + (item.icon ? '-icon' : '');

          return (
            <li key={key} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-text-secondary" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isLast || isEllipsis ? (
                <span
                  className={isEllipsis ? '' : currentClasses}
                  aria-current={isLast && !isEllipsis ? 'page' : undefined}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={linkClasses}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
