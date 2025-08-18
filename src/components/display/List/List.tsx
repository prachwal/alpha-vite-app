import { JSX } from 'preact';
import { cn } from '../../../utils/cn';
import { ListItem } from './ListItem';
import { ListGroup } from './ListGroup';

export interface ListItemProps {
  title: string;
  description?: string;
  avatar?: preact.ComponentChildren;
  actions?: readonly preact.ComponentChildren[];
  extra?: preact.ComponentChildren;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export interface ListProps {
  items?: readonly any[];
  renderItem?: (item: any, index: number) => preact.ComponentChildren;
  header?: preact.ComponentChildren;
  footer?: preact.ComponentChildren;
  bordered?: boolean;
  split?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingRows?: number;
  virtual?: boolean;
  height?: string | number;
  children?: preact.ComponentChildren;
  className?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const sizeSpacing = {
  sm: 'py-2 px-3',
  md: 'py-3 px-4',
  lg: 'py-4 px-5',
};

export function List({
  items,
  renderItem,
  header,
  footer,
  bordered = false,
  split = true,
  size = 'md',
  loading = false,
  loadingRows = 3,
  children,
  className,
}: Readonly<ListProps>): JSX.Element {
  const baseClasses = cn(
    'list',
    sizeClasses[size],
    bordered && 'border border-gray-200 dark:border-gray-700 rounded-lg',
    className
  );

  const renderLoadingSkeleton = () => {
    return Array.from({ length: loadingRows }).map((_, index) => (
      <output
        key={`loading-${index}`}
        aria-label="Loading"
        className={cn(
          'flex items-center space-x-3',
          sizeSpacing[size],
          split &&
            index !== loadingRows - 1 &&
            'border-b border-gray-100 dark:border-gray-700'
        )}
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </output>
    ));
  };

  const renderContent = () => {
    if (loading) {
      return renderLoadingSkeleton();
    }

    if (items && renderItem) {
      return items.map((item, index) => {
        // Use item.id if available, otherwise fallback to index (not recommended)
        const key =
          item && typeof item === 'object' && 'id' in item
            ? item.id
            : `item-${index}`;
        return (
          <div
            key={key}
            className={cn(
              split &&
                index !== items.length - 1 &&
                'border-b border-gray-100 dark:border-gray-700'
            )}
          >
            {renderItem(item, index)}
          </div>
        );
      });
    }

    return children;
  };

  return (
    <div className={baseClasses}>
      {header && (
        <div
          className={cn(
            'border-b border-gray-100 dark:border-gray-700',
            sizeSpacing[size]
          )}
        >
          {header}
        </div>
      )}
      <div>{renderContent()}</div>
      {footer && (
        <div
          className={cn(
            'border-t border-gray-100 dark:border-gray-700',
            sizeSpacing[size]
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

List.Item = ListItem;
List.Group = ListGroup;
