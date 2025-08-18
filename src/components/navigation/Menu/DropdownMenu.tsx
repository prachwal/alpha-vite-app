import { JSX } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface MenuItemData {
  id: string;
  label: string;
  action?: () => void;
  href?: string;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: JSX.Element;
  items: readonly MenuItemData[];
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Menu({
  trigger,
  items,
  position = 'bottom-left',
  size = 'md',
  className,
}: DropdownMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItemData) => {
    if (!item.disabled) {
      item.action?.();
      setIsOpen(false);
    }
  };

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1',
  };

  const sizeClasses = {
    sm: 'text-sm py-1',
    md: 'text-base py-2',
    lg: 'text-lg py-3',
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <button
        ref={triggerRef as any}
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTriggerClick();
          }
        }}
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="bg-transparent border-none p-0 m-0 cursor-pointer"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'absolute z-50 min-w-[180px] bg-white border border-gray-200 rounded-md shadow-lg',
            positionClasses[position]
          )}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.id}
              className={cn(
                'w-full px-4 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100',
                sizeClasses[size],
                item.disabled && 'text-gray-400 cursor-not-allowed'
              )}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              role="menuitem"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
