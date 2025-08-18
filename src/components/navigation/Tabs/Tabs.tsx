import { JSX } from 'preact';
import { useRef } from 'preact/hooks';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: JSX.Element;
}

export interface TabsProps {
  tabs: readonly TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  scrollable?: boolean;
  centered?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  scrollable = false,
  centered = false,
  fullWidth = false,
  className = '',
}: Readonly<TabsProps>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    default: 'border-b-2 border-transparent hover:border-border-light',
    pills: 'rounded-md hover:bg-bg-muted',
    underline: 'border-b-2 border-transparent hover:border-primary',
  };

  const activeVariantClasses = {
    default: 'border-primary text-primary',
    pills: 'bg-primary text-white',
    underline: 'border-primary text-primary',
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const tab = tabs[index];
        if (tab && !tab.disabled) {
          onChange(tab.id);
        }
        return;
      }
    }

    if (newIndex !== index) {
      tabRefs.current[newIndex]?.focus();
    }
  };

  const containerClasses = [
    'flex',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    centered ? 'justify-center' : 'justify-start',
    scrollable ? 'overflow-x-auto' : '',
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tabContainerClasses = [
    'inline-flex',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    fullWidth ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      role="tablist"
      aria-orientation={orientation}
    >
      <div className={tabContainerClasses}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          const isDisabled = tab.disabled;

          const tabClasses = [
            'flex items-center gap-2 cursor-pointer transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            sizeClasses[size],
            variantClasses[variant],
            isActive ? activeVariantClasses[variant] : '',
            isDisabled ? 'opacity-50 cursor-not-allowed' : '',
            fullWidth ? 'flex-1' : '',
          ]
            .filter(Boolean)
            .join(' ');

          const getTabIndex = () => {
            if (isDisabled) return -1;
            return isActive ? 0 : -1;
          };

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              tabIndex={getTabIndex()}
              className={tabClasses}
              onClick={() => !isDisabled && onChange(tab.id)}
              onKeyDown={(e) =>
                handleKeyDown(e as unknown as KeyboardEvent, index)
              }
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
