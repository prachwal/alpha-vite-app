import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface BadgeProps {
  count?: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  status?: "default" | "processing" | "success" | "error" | "warning";
  color?: string;
  text?: string;
  offset?: readonly [number, number];
  size?: "sm" | "md" | "lg";
  children?: preact.ComponentChildren;
  className?: string;
}

const statusColors = {
  default: "bg-gray-500",
  processing: "bg-blue-500",
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
};

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-1 text-sm",
  lg: "px-2.5 py-1 text-base",
};

export function Badge({
  count,
  max = 99,
  showZero = false,
  dot = false,
  status = "default",
  color,
  text,
  offset,
  size = "md",
  children,
  className,
}: Readonly<BadgeProps>): JSX.Element {
  let displayCount: string | number | undefined;
  if (count !== undefined) {
    displayCount = count > max ? `${max}+` : count;
  } else {
    displayCount = undefined;
  }
  const showBadge = count !== undefined ? showZero || count > 0 : true;

  const badgeClasses = cn(
    "inline-flex items-center justify-center rounded-full font-medium",
    sizeClasses[size],
    color || statusColors[status],
    className
  );

  const badgeStyle = offset
    ? {
        transform: `translate(${offset[0]}px, ${offset[1]}px)`,
      }
    : {};

  const renderBadge = () => {
    if (dot) {
      return <span className={cn(badgeClasses, "w-2 h-2 min-w-0 p-0")} />;
    }

    if (text) {
      return <span className={badgeClasses}>{text}</span>;
    }

    if (displayCount !== undefined && showBadge) {
      return <span className={badgeClasses}>{displayCount}</span>;
    }

    return <span className={cn(badgeClasses, "hidden")} />;
  };

  if (!children) {
    return renderBadge();
  }

  return (
    <span className="relative inline-block">
      {children}
      {renderBadge() && (
        <span
          className="absolute transform -translate-y-1/2 -translate-x-1/2"
          style={badgeStyle}
        >
          {renderBadge()}
        </span>
      )}
    </span>
  );
}
