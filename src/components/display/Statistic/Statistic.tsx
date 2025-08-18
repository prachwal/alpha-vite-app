import { JSX } from "preact";
import { cn } from "../../../utils/cn";

export interface StatisticProps {
  title?: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  precision?: number;
  loading?: boolean;
  valueStyle?: JSX.CSSProperties;
  valueClassName?: string;
  titleClassName?: string;
  className?: string;
  children?: preact.ComponentChildren;
}

export function Statistic({
  title,
  value,
  prefix,
  suffix,
  precision,
  loading = false,
  valueStyle,
  valueClassName,
  titleClassName,
  className,
  children,
}: Readonly<StatisticProps>): JSX.Element {
  const formatValue = (val: string | number): string => {
    if (typeof val === "number" && precision !== undefined) {
      return val.toFixed(precision);
    }
    return String(val);
  };

  const formattedValue = formatValue(value);

  if (loading) {
    return (
      <div className={cn("space-y-2", className)}>
        {title && (
          <div
            className={cn(
              "h-4 w-24 animate-pulse rounded bg-gray-200",
              titleClassName
            )}
          />
        )}
        <div
          className={cn(
            "h-8 w-32 animate-pulse rounded bg-gray-200",
            valueClassName
          )}
        />
        {children}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <div
          className={cn(
            "text-sm font-medium text-gray-700 dark:text-gray-300",
            titleClassName
          )}
        >
          {title}
        </div>
      )}
      <div
        className={cn(
          "text-2xl font-bold text-gray-900 dark:text-gray-100",
          valueClassName
        )}
        style={valueStyle}
      >
        {prefix}
        {formattedValue}
        {suffix}
      </div>
      {children}
    </div>
  );
}
