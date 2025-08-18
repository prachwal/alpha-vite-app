import { useRef, useState, useCallback } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Marks to show on track */
  marks?: Record<number, string>;
  /** Vertical orientation */
  vertical?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Show tooltip on hover/drag */
  tooltip?: boolean;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: number) => string;
  /** Whether included style (fill from start) */
  included?: boolean;
  /** Additional CSS class */
  className?: string;
}

export interface RangeSliderProps {
  /** Current range value */
  value: readonly [number, number];
  /** Callback when range changes */
  onChange: (value: readonly [number, number]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Marks to show on track */
  marks?: Record<number, string>;
  /** Vertical orientation */
  vertical?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Show tooltip on hover/drag */
  tooltip?: boolean;
  /** Custom tooltip formatter */
  tooltipFormatter?: (value: number) => string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Single value slider component
 *
 * @example
 * ```tsx
 * <Slider
 *   value={volume}
 *   onChange={setVolume}
 *   min={0}
 *   max={100}
 *   marks={{ 0: '0%', 50: '50%', 100: '100%' }}
 * />
 * ```
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks,
  vertical = false,
  disabled = false,
  tooltip = true,
  tooltipFormatter = (val) => val.toString(),
  included = true,
  className,
}: Readonly<SliderProps>) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromEvent = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!sliderRef.current) return value;

      const rect = sliderRef.current.getBoundingClientRect();
      let clientX: number;
      let clientY: number;
      if ('touches' in event && event.touches && event.touches[0]) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if ('clientX' in event && 'clientY' in event) {
        clientX = (event as MouseEvent).clientX;
        clientY = (event as MouseEvent).clientY;
      } else {
        clientX = 0;
        clientY = 0;
      }

      let percentage: number;
      if (vertical) {
        percentage = ((rect.bottom - clientY) / rect.height) * 100;
      } else {
        percentage = ((clientX - rect.left) / rect.width) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      const rawValue = min + (percentage / 100) * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step, vertical, value]
  );

  const handleMouseDown = (event: MouseEvent) => {
    if (disabled) return;

    event.preventDefault();
    setIsDragging(true);
    setShowTooltip(true);

    const newValue = getValueFromEvent(
      event as unknown as globalThis.MouseEvent | globalThis.TouchEvent
    );
    onChange(Math.max(min, Math.min(max, newValue)));

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newValue = getValueFromEvent(
        moveEvent as unknown as globalThis.MouseEvent | globalThis.TouchEvent
      );
      onChange(Math.max(min, Math.min(max, newValue)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setShowTooltip(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const percentage = getPercentage(value);

  return (
    <div
      className={cn(
        'relative flex items-center',
        vertical ? 'flex-col h-48 w-6' : 'flex-row w-full h-6',
        className
      )}
    >
      {/* Track */}
      <div
        ref={sliderRef}
        className={cn(
          'relative bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer',
          vertical ? 'w-2 h-full' : 'h-2 w-full',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => !isDragging && setShowTooltip(false)}
      >
        {/* Visually hidden native range input for accessibility */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label="Slider"
          className="absolute w-full h-full opacity-0 pointer-events-none"
          tabIndex={-1}
          readOnly
        />
        {/* Fill */}
        {included && (
          <div
            className={cn(
              'absolute bg-blue-500 rounded-full transition-all duration-150',
              vertical ? 'w-full bottom-0' : 'h-full left-0'
            )}
            style={
              vertical
                ? { height: `${percentage}%` }
                : { width: `${percentage}%` }
            }
          />
        )}

        {/* Handle */}
        <div
          className={cn(
            'absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 shadow-sm',
            'hover:scale-110 focus:scale-110',
            isDragging && 'scale-125 shadow-lg',
            disabled && 'border-gray-400 bg-gray-100'
          )}
          style={
            vertical
              ? {
                  bottom: `calc(${percentage}% - 8px)`,
                  left: '50%',
                }
              : {
                  left: `calc(${percentage}% - 8px)`,
                  top: '50%',
                }
          }
        />

        {/* Tooltip */}
        {tooltip && (showTooltip || isDragging) && (
          <div
            className={cn(
              'absolute bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none',
              vertical
                ? 'left-full ml-2'
                : 'bottom-full mb-2 left-1/2 transform -translate-x-1/2'
            )}
            style={
              vertical
                ? { bottom: `calc(${percentage}% - 12px)` }
                : { left: `calc(${percentage}% - 0px)` }
            }
          >
            {tooltipFormatter(value)}
            <div
              className={cn(
                'absolute w-0 h-0',
                vertical
                  ? 'right-full top-1/2 transform -translate-y-1/2 border-r-4 border-r-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent'
                  : 'top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-900'
              )}
            />
          </div>
        )}

        {/* Marks */}
        {marks &&
          Object.entries(marks).map(([markValue, label]) => {
            const markPercentage = getPercentage(Number(markValue));
            return (
              <div
                key={markValue}
                className="absolute"
                style={
                  vertical
                    ? { bottom: `calc(${markPercentage}% - 1px)`, left: '100%' }
                    : { left: `calc(${markPercentage}% - 1px)`, top: '100%' }
                }
              >
                <div
                  className={cn(
                    'w-1 h-1 bg-gray-400 rounded-full',
                    vertical ? 'ml-1' : 'mt-1'
                  )}
                />
                <div
                  className={cn(
                    'text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap',
                    vertical ? 'ml-3 -translate-y-1/2' : 'mt-2 -translate-x-1/2'
                  )}
                  style={vertical ? {} : { transform: 'translateX(-50%)' }}
                >
                  {label}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

/**
 * Range slider component for selecting a range between two values
 *
 * @example
 * ```tsx
 * <RangeSlider
 *   value={[minPrice, maxPrice]}
 *   onChange={setPriceRange}
 *   min={0}
 *   max={1000}
 *   marks={{ 0: '$0', 500: '$500', 1000: '$1000' }}
 * />
 * ```
 */
export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks,
  vertical = false,
  disabled = false,
  tooltip = true,
  tooltipFormatter = (val) => val.toString(),
  className,
}: Readonly<RangeSliderProps>) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromEvent = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!sliderRef.current) return min;

      const rect = sliderRef.current.getBoundingClientRect();
      let clientX: number;
      let clientY: number;
      if ('touches' in event) {
        // TouchEvent branch
        clientX = event.touches?.[0]?.clientX ?? 0;
        clientY = event.touches?.[0]?.clientY ?? 0;
      } else if ('clientX' in event && 'clientY' in event) {
        // MouseEvent branch
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        clientX = 0;
        clientY = 0;
      }

      let percentage: number;
      if (vertical) {
        percentage = ((rect.bottom - clientY) / rect.height) * 100;
      } else {
        percentage = ((clientX - rect.left) / rect.width) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      const rawValue = min + (percentage / 100) * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step, vertical]
  );

  const handleMouseDown = (event: MouseEvent, handleIndex: number) => {
    if (disabled) return;

    event.preventDefault();
    event.stopPropagation();
    setIsDragging(handleIndex);
    setShowTooltip(handleIndex);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newValue = getValueFromEvent(
        moveEvent as unknown as globalThis.MouseEvent | globalThis.TouchEvent
      );
      const newValues: [number, number] = [...value] as [number, number];

      if (handleIndex === 0) {
        newValues[0] = Math.min(newValue, value[1]);
      } else {
        newValues[1] = Math.max(newValue, value[0]);
      }

      onChange(newValues);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      setShowTooltip(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const [leftPercentage, rightPercentage] = value.map(getPercentage);

  return (
    <div
      className={cn(
        'relative flex items-center',
        vertical ? 'flex-col h-48 w-6' : 'flex-row w-full h-6',
        className
      )}
    >
      {/* Track */}
      <div
        ref={sliderRef}
        className={cn(
          'relative bg-gray-200 dark:bg-gray-700 rounded-full',
          vertical ? 'w-2 h-full' : 'h-2 w-full',
          disabled && 'opacity-50'
        )}
        role="slider"
        aria-valuenow={value[0]}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
      >
        {/* Fill between handles */}
        <div
          className={cn(
            'absolute bg-blue-500 rounded-full',
            vertical ? 'w-full' : 'h-full'
          )}
          style={
            vertical
              ? {
                  bottom: `${leftPercentage || 0}%`,
                  height: `${(rightPercentage || 0) - (leftPercentage || 0)}%`,
                }
              : {
                  left: `${leftPercentage || 0}%`,
                  width: `${(rightPercentage || 0) - (leftPercentage || 0)}%`,
                }
          }
        />

        {/* Left/Bottom Handle */}
        <div
          className={cn(
            'absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-150 shadow-sm',
            'hover:scale-110 focus:scale-110',
            isDragging === 0 && 'scale-125 shadow-lg',
            disabled && 'border-gray-400 bg-gray-100 cursor-not-allowed'
          )}
          style={
            vertical
              ? {
                  bottom: `calc(${leftPercentage}% - 8px)`,
                  left: '50%',
                }
              : {
                  left: `calc(${leftPercentage}% - 8px)`,
                  top: '50%',
                }
          }
          onMouseDown={(event) => handleMouseDown(event, 0)}
          onMouseEnter={() => setShowTooltip(0)}
          onMouseLeave={() => isDragging !== 0 && setShowTooltip(null)}
          tabIndex={disabled ? -1 : 0}
        />

        {/* Right/Top Handle */}
        <div
          className={cn(
            'absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-150 shadow-sm',
            'hover:scale-110 focus:scale-110',
            isDragging === 1 && 'scale-125 shadow-lg',
            disabled && 'border-gray-400 bg-gray-100 cursor-not-allowed'
          )}
          style={
            vertical
              ? {
                  bottom: `calc(${rightPercentage}% - 8px)`,
                  left: '50%',
                }
              : {
                  left: `calc(${rightPercentage}% - 8px)`,
                  top: '50%',
                }
          }
          onMouseDown={(event) => handleMouseDown(event, 1)}
          onMouseEnter={() => setShowTooltip(1)}
          onMouseLeave={() => isDragging !== 1 && setShowTooltip(null)}
          tabIndex={disabled ? -1 : 0}
        />

        {/* Tooltips */}
        {tooltip && showTooltip !== null && showTooltip !== undefined && (
          <div
            className={cn(
              'absolute bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none',
              vertical
                ? 'left-full ml-2'
                : 'bottom-full mb-2 transform -translate-x-1/2'
            )}
            style={
              vertical
                ? {
                    bottom: `calc(${
                      showTooltip === 0
                        ? leftPercentage || 0
                        : rightPercentage || 0
                    }% - 12px)`,
                  }
                : {
                    left: `${
                      showTooltip === 0
                        ? leftPercentage || 0
                        : rightPercentage || 0
                    }%`,
                  }
            }
          >
            {tooltipFormatter(value[showTooltip as number] || 0)}
            <div
              className={cn(
                'absolute w-0 h-0',
                vertical
                  ? 'right-full top-1/2 transform -translate-y-1/2 border-r-4 border-r-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent'
                  : 'top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-900'
              )}
            />
          </div>
        )}

        {/* Marks */}
        {marks &&
          Object.entries(marks).map(([markValue, label]) => {
            const markPercentage = getPercentage(Number(markValue));
            return (
              <div
                key={markValue}
                className="absolute"
                style={
                  vertical
                    ? { bottom: `calc(${markPercentage}% - 1px)`, left: '100%' }
                    : { left: `calc(${markPercentage}% - 1px)`, top: '100%' }
                }
              >
                <div
                  className={cn(
                    'w-1 h-1 bg-gray-400 rounded-full',
                    vertical ? 'ml-1' : 'mt-1'
                  )}
                />
                <div
                  className={cn(
                    'text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap',
                    vertical ? 'ml-3 -translate-y-1/2' : 'mt-2 -translate-x-1/2'
                  )}
                  style={vertical ? {} : { transform: 'translateX(-50%)' }}
                >
                  {label}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
