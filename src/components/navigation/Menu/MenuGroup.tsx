import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface MenuGroupProps {
  title: string;
  children: preact.ComponentChildren;
  className?: string;
}

export function MenuGroup({
  title,
  children,
  className,
}: Readonly<MenuGroupProps>): JSX.Element {
  return (
    <div className={cn("menu-group", className)}>
      <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
