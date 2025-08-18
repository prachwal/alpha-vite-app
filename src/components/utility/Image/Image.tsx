// No need to import h - it's handled by JSX transform
import { useState, useEffect, useRef } from 'preact/hooks';
import { cn } from '../../../utils/cn';

export interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  lazy?: boolean;
  placeholder?: string | preact.ComponentChildren;
  fallback?: string | preact.ComponentChildren;
  preview?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  placeholder = (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
  ),
  fallback = (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <span className="text-gray-400 dark:text-gray-500 text-sm">
        Image failed to load
      </span>
    </div>
  ),
  preview = false,
  objectFit = 'cover',
  onLoad,
  onError,
  className,
}: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = src;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, lazy]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
  };

  const handleClick = () => {
    if (preview) {
      setShowPreview(true);
    }
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    objectFit,
  };

  return (
    <>
      <div
        className={cn('relative overflow-hidden', className)}
        style={style}
        onClick={handleClick}
      >
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            {placeholder}
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            {fallback}
          </div>
        )}

        <img
          ref={imgRef}
          alt={alt}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            loading ? 'opacity-0' : 'opacity-100',
            preview && 'cursor-pointer hover:opacity-90'
          )}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          {...(!lazy ? { src } : {})}
        />
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowPreview(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
