// No need to import h - it's handled by JSX transform
import { useMemo } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface ProgressCircleProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  format?: (value: number, max: number) => string;
  color?: string;
  trailColor?: string;
  className?: string;
}

export const ProgressCircle = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showText = true,
  format = (v, m) => `${Math.round((v / m) * 100)}%`,
  color = '#3b82f6',
  trailColor = '#e5e7eb',
  className,
}: ProgressCircleProps) => {
  const percentage = useMemo(() => {
    return Math.min(Math.max((value / max) * 100, 0), 100);
  }, [value, max]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trailColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {format(value, max)}
          </span>
        </div>
      )}
    </div>
  );
};
