import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface GridItemProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  responsive?: {
    sm?: { span?: number; offset?: number };
    md?: { span?: number; offset?: number };
    lg?: { span?: number; offset?: number };
    xl?: { span?: number; offset?: number };
  };
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const spanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const offsetClasses = {
  0: "col-start-auto",
  1: "col-start-2",
  2: "col-start-3",
  3: "col-start-4",
  4: "col-start-5",
  5: "col-start-6",
  6: "col-start-7",
  7: "col-start-8",
  8: "col-start-9",
  9: "col-start-10",
  10: "col-start-11",
  11: "col-start-12",
};

function getResponsiveClasses(
  responsive?: GridItemProps["responsive"]
): string {
  if (!responsive) return "";
  const breakpoints = ["sm", "md", "lg", "xl"] as const;
  return breakpoints
    .map((breakpoint) => {
      const config = responsive[breakpoint];
      if (!config) return "";
      const classes: string[] = [];
      if (config.span) {
        classes.push(`${breakpoint}:col-span-${config.span}`);
      }
      if (config.offset) {
        classes.push(`${breakpoint}:col-start-${config.offset + 1}`);
      }
      return classes.join(" ");
    })
    .filter(Boolean)
    .join(" ");
}

export function GridItem({
  span,
  offset,
  responsive,
  children,
  className,
}: Readonly<GridItemProps>): JSX.Element {
  const responsiveClasses = getResponsiveClasses(responsive);

  return (
    <div
      className={cn(
        span ? spanClasses[span] : "",
        offset ? offsetClasses[offset] : "",
        responsiveClasses,
        className
      )}
    >
      {children}
    </div>
  );
}
