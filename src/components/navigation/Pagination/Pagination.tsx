import { useMemo } from 'preact/hooks';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showEllipsis?: boolean;
  maxPages?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  showEllipsis = true,
  maxPages = 5,
  size = 'md',
  variant = 'default',
  className = '',
}: Readonly<PaginationProps>) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const variantClasses = {
    default: 'bg-bg-surface border border-border-light hover:bg-bg-muted',
    outline: 'border border-border-light hover:bg-bg-muted',
    ghost: 'hover:bg-bg-muted',
  };

  const activeClasses = {
    default: 'bg-primary text-white border-primary',
    outline: 'bg-primary text-white border-primary',
    ghost: 'bg-primary text-white',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const pageNumbers = useMemo(() => {
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start === 1) {
      end = Math.min(totalPages, maxPages);
    } else if (end === totalPages) {
      start = Math.max(1, totalPages - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showEllipsis) {
      if (start > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      if (end < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, maxPages, showEllipsis]);

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const baseButtonClasses = [
    'inline-flex items-center justify-center rounded-md transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    sizeClasses[size],
  ].join(' ');

  const renderPageButton = (page: number | string, index: number) => {
    if (page === '...') {
      return (
        <span
          key={`ellipsis-${index}`}
          className="px-2 py-1 text-text-secondary"
        >
          ...
        </span>
      );
    }

    const isActive = page === currentPage;
    const classes = [
      baseButtonClasses,
      isActive ? activeClasses[variant] : variantClasses[variant],
      'min-w-[2.5rem]',
    ].join(' ');

    return (
      <button
        key={page}
        className={classes}
        onClick={() => handlePageClick(page)}
        aria-current={isActive ? 'page' : undefined}
        aria-label={`Go to page ${page}`}
      >
        {page}
      </button>
    );
  };

  const renderNavigationButton = (
    type: 'first' | 'prev' | 'next' | 'last',
    disabled: boolean,
    label: string,
    icon?: string
  ) => {
    const classes = [
      baseButtonClasses,
      variantClasses[variant],
      disabled ? disabledClasses : '',
      'min-w-[2.5rem]',
    ].join(' ');

    return (
      <button
        className={classes}
        onClick={() =>
          !disabled &&
          onPageChange(type === 'first' || type === 'prev' ? 1 : totalPages)
        }
        disabled={disabled}
        aria-label={label}
      >
        {icon || label}
      </button>
    );
  };

  return (
    <nav
      className={`flex items-center gap-1 ${className}`}
      aria-label="Pagination"
    >
      {showFirstLast &&
        renderNavigationButton(
          'first',
          currentPage === 1,
          'Go to first page',
          '«'
        )}

      {showPrevNext &&
        renderNavigationButton(
          'prev',
          currentPage === 1,
          'Go to previous page',
          '‹'
        )}

      {pageNumbers.map(renderPageButton)}

      {showPrevNext &&
        renderNavigationButton(
          'next',
          currentPage === totalPages,
          'Go to next page',
          '›'
        )}

      {showFirstLast &&
        renderNavigationButton(
          'last',
          currentPage === totalPages,
          'Go to last page',
          '»'
        )}
    </nav>
  );
}
