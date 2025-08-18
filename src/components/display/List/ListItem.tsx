import { JSX } from 'preact';
import { cn } from '../../../utils/cn';
import { ListItemProps } from './List';

export function ListItem({
  title,
  description,
  avatar,
  actions,
  extra,
  onClick,
  href,
  disabled = false,
  className,
}: Readonly<ListItemProps>): JSX.Element {
  const isClickable = !disabled && (onClick || href);
  const Component = href ? 'a' : 'div';

  const baseClasses = cn(
    'flex items-start space-x-3 transition-colors',
    isClickable && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const content = (
    <>
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {extra && <div className="ml-4 flex-shrink-0">{extra}</div>}
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="flex items-center space-x-2 ml-4">{actions}</div>
      )}
    </>
  );

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Component
      className={baseClasses}
      onClick={handleClick}
      href={href}
      aria-disabled={disabled}
    >
      {content}
    </Component>
  );
}
