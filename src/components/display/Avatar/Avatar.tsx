import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  icon?: preact.ComponentType<{ className?: string }>;
  children?: preact.ComponentChildren;
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

export function Avatar({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  icon: Icon,
  children,
  className,
  onClick,
}: Readonly<AvatarProps>): JSX.Element {
  const [error, setError] = useState(false);
  const [, setLoaded] = useState(false);

  const actualSize = typeof size === 'string' ? sizeMap[size] : size;
  const sizeClasses = `w-${actualSize / 4} h-${actualSize / 4}`;

  const baseClasses = cn(
    'inline-flex items-center justify-center overflow-hidden',
    shape === 'circle' ? 'rounded-full' : 'rounded-md',
    sizeClasses,
    onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
    className
  );

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  const renderContent = () => {
    if (src && !error) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="w-full h-full object-cover"
          onError={handleError}
          onLoad={handleLoad}
        />
      );
    }

    if (Icon) {
      return <Icon className="w-3/4 h-3/4" />;
    }

    if (children) {
      return (
        <span className="text-sm font-medium">
          {typeof children === 'string'
            ? children.slice(0, 2).toUpperCase()
            : children}
        </span>
      );
    }

    return (
      <svg
        className="w-3/4 h-3/4 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div className={baseClasses} onClick={onClick}>
      {renderContent()}
    </div>
  );
}
