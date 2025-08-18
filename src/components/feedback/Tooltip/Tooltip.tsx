// No need to import h - it's handled by JSX transform
import { cloneElement, VNode } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export interface TooltipProps {
  content: string;
  children: preact.ComponentChildren;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  delay?: number;
  disabled?: boolean;
  className?: string;
}

const positionStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-1',
  right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
};

const arrowDirections = {
  top: 'border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
  bottom:
    'border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
  left: 'border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
  right:
    'border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent',
};

const variantStyles = {
  default: 'bg-gray-900 text-white',
  info: 'bg-blue-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-white',
  error: 'bg-red-600 text-white',
};

export function Tooltip({
  content,
  children,
  position = 'top',
  variant = 'default',
  delay = 0,
  disabled = false,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const tooltipIdRef = useRef(
    `tooltip-${Math.random().toString(36).substr(2, 9)}`
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const styles = variantStyles[variant];

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (delay === 0) {
      setIsVisible(true);
      setIsAnimating(true);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, delay);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsAnimating(false);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const child = Array.isArray(children) ? children[0] : children;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {typeof child === 'object' && child !== null && 'type' in child
        ? cloneElement(child as VNode<any>, {
            'aria-describedby': content ? tooltipIdRef.current : undefined,
            onMouseEnter: (e: any) => {
              if (!disabled && (child as any).props?.onMouseEnter)
                (child as any).props.onMouseEnter(e);
              if (!disabled) showTooltip();
            },
            onMouseLeave: (e: any) => {
              if (!disabled && (child as any).props?.onMouseLeave)
                (child as any).props.onMouseLeave(e);
              if (!disabled) hideTooltip();
            },
            onFocus: (e: any) => {
              if (!disabled && (child as any).props?.onFocus)
                (child as any).props.onFocus(e);
              if (!disabled) showTooltip();
            },
            onBlur: (e: any) => {
              if (!disabled && (child as any).props?.onBlur)
                (child as any).props.onBlur(e);
              if (!disabled) hideTooltip();
            },
          })
        : child}
      {isVisible && (
        <div
          id={tooltipIdRef.current}
          className={`
            absolute z-50 px-3 py-2 text-sm rounded-md shadow-lg
            ${positionStyles[position]}
            ${styles}
            ${isAnimating ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-150
          `}
          role="tooltip"
        >
          {content}
          <div
            className={`
              absolute w-0 h-0 border-4
              ${arrowStyles[position]}
              ${arrowDirections[position]}
            `}
          />
        </div>
      )}
    </div>
  );
}
