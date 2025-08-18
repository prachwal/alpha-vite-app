import { useState, useEffect, useRef } from 'preact/hooks';

export interface TimerProps {
  duration: number; // in seconds
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  format?: 'seconds' | 'minutes' | 'hours';
  className?: string;
}

export function Timer({
  duration,
  autoStart = false,
  onComplete,
  onTick,
  format = 'seconds',
  className = '',
}: TimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setRemaining((prev) => {
          const newRemaining = prev - 1;
          onTick?.(newRemaining);

          if (newRemaining <= 0) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }

          return newRemaining;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remaining, onComplete, onTick]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setRemaining(duration);
  };

  const formatTime = (seconds: number) => {
    switch (format) {
      case 'hours':
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${mins
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      case 'minutes':
        const totalMinutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${totalMinutes.toString().padStart(2, '0')}:${remainingSeconds
          .toString()
          .padStart(2, '0')}`;

      default:
        return seconds.toString();
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="text-2xl font-mono">{formatTime(remaining)}</div>
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Pause
          </button>
        )}
        <button
          onClick={reset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
