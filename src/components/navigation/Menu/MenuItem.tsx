import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface MenuItemProps {
  id: string;
  label: string;
  icon?: preact.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: readonly MenuItemProps[];
  selected?: boolean;
  level?: number;
  onSelect?: (id: string) => void;
}

export function MenuItem({
  id,
  label,
  icon: Icon,
  href,
  onClick,
  disabled = false,
  selected = false,
  level = 0,
  onSelect,
}: Readonly<MenuItemProps>): JSX.Element {
  const handleClick = () => {
    if (disabled) return;

    onSelect?.(id);
    onClick?.();
  };

  const itemClasses = cn(
    "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200",
    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
    selected && "bg-primary text-white",
    !selected && "text-gray-700",
    disabled && "text-gray-400 cursor-not-allowed",
    level > 0 && "ml-4"
  );

  const content = (
    <>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <span className="flex-1 text-left">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={itemClasses}
        onClick={handleClick}
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={itemClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
