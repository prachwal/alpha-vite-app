import { type ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface RateProps {
  /** Current rating value */
  value: number;
  /** Callback when rating changes */
  onChange: (value: number) => void;
  /** Number of stars (default: 5) */
  count?: number;
  /** Allow half star ratings */
  allowHalf?: boolean;
  /** Allow clearing rating by clicking current rating */
  allowClear?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Custom character instead of star */
  character?: ComponentChildren;
  /** Tooltip text for each rating */
  tooltips?: readonly string[];
  /** Additional CSS class */
  className?: string;
}

/**
 * Rate component for star ratings
 *
 * @example
 * ```tsx
 * <Rate
 *   value={rating}
 *   onChange={setRating}
 *   allowHalf
 *   tooltips={['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful']}
 * />
 * ```
 */
export function Rate({
  value,
  onChange,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  character = '★',
  tooltips,
  className,
}: Readonly<RateProps>) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleStarClick = (index: number, half: boolean = false) => {
    if (disabled) return;

    const newValue = index + (half && allowHalf ? 0.5 : 1);

    // Allow clearing if clicking the same value
    if (allowClear && newValue === value) {
      onChange(0);
    } else {
      onChange(newValue);
    }
  };

  const handleStarHover = (index: number, half: boolean = false) => {
    if (disabled) return;
    const newValue = index + (half && allowHalf ? 0.5 : 1);
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const getStarState = (index: number) => {
    const currentValue = hoverValue ?? value;
    const starValue = index + 1;

    if (currentValue >= starValue) {
      return 'full';
    } else if (allowHalf && currentValue >= starValue - 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  const renderStar = (index: number) => {
    const starState = getStarState(index);
    const tooltip = tooltips?.[index];

    return (
      <button
        key={index}
        type="button"
        className={cn(
          'relative inline-block text-2xl leading-none bg-transparent border-none p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm',
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:scale-110 transition-transform duration-200'
        )}
        onMouseLeave={handleMouseLeave}
        title={tooltip}
        disabled={disabled}
        onClick={() => handleStarClick(index)}
        onMouseEnter={() => handleStarHover(index)}
        aria-label={`Rate ${index + 1} star${index > 0 ? 's' : ''}`}
      >
        {/* Background star (empty) */}
        <span className="text-gray-300 dark:text-gray-600 transition-colors duration-200">
          {character}
        </span>

        {/* Half star overlay */}
        {allowHalf && (
          <span
            className={cn(
              'absolute top-1 left-1 w-1/2 overflow-hidden transition-colors duration-200 pointer-events-none',
              starState === 'half' ? 'text-yellow-400' : 'text-transparent'
            )}
          >
            {character}
          </span>
        )}

        {/* Full star overlay */}
        <span
          className={cn(
            'absolute top-1 left-1 transition-colors duration-200 pointer-events-none',
            starState === 'full' ? 'text-yellow-400' : 'text-transparent'
          )}
        >
          {character}
        </span>
      </button>
    );
  };

  return (
    <div
      className={cn('inline-flex items-center gap-1', className)}
      role="radiogroup"
      aria-label={`Rate ${count} stars`}
    >
      {Array.from({ length: count }, (_, index) => renderStar(index))}
    </div>
  );
}
