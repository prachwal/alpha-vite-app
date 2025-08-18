// No need to import h - it's handled by JSX transform
import { useMemo } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface ProgressProps {
  value: number;
  max?: number;
  showText?: boolean;
  format?: (value: number, max: number) => string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

export const Progress = ({
  value,
  max = 100,
  showText = false,
  format = (v, m) => `${Math.round((v / m) * 100)}%`,
  size = 'md',
  variant = 'default',
  striped = false,
  animated = false,
  className,
}: ProgressProps) => {
  const percentage = useMemo(() => {
    return Math.min(Math.max((value / max) * 100, 0), 100);
  }, [value, max]);

  const variantClasses = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-in-out',
            variantClasses[variant],
            striped &&
              'bg-gradient-to-r from-transparent via-white/20 to-transparent',
            animated && striped && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
          {format(value, max)}
        </div>
      )}
    </div>
  );
};
