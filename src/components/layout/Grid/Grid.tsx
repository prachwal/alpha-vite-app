import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = "none" | "sm" | "md" | "lg" | "xl";

export interface GridProps {
  columns?: GridColumns;
  gap?: GridGap;
  responsive?: {
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
    xl?: GridColumns;
  };
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

export function Grid({
  columns = 12,
  gap = "md",
  responsive,
  children,
  className,
}: Readonly<GridProps>): JSX.Element {
  const responsiveClasses = responsive
    ? Object.entries(responsive)
        .map(([breakpoint, cols]) => {
          const className = columnClasses[cols as keyof typeof columnClasses];
          if (breakpoint === "sm") {
            return `sm:${className}`;
          } else if (breakpoint === "md") {
            return `md:${className}`;
          } else if (breakpoint === "lg") {
            return `lg:${className}`;
          } else if (breakpoint === "xl") {
            return `xl:${className}`;
          }
          return "";
        })
        .join(" ")
    : "";

  return (
    <div
      className={cn(
        "grid",
        columnClasses[columns],
        gapClasses[gap],
        responsiveClasses,
        className
      )}
    >
      {children}
    </div>
  );
}
