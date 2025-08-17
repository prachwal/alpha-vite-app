import { useEffect, useState } from "preact/hooks";

interface DebugInfoProps {
  readonly customData?: readonly string[];
}

export function DebugInfo({ customData }: DebugInfoProps) {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    const updateDebugInfo = () => {
      const debug = customData
        ? [...customData]
        : [`Timestamp: ${new Date().toLocaleString()}`];
      setDebugInfo(debug);
    };

    updateDebugInfo();
  }, [customData]);

  return (
    <div className="space-y-2">
      {debugInfo.map((info, index) => (
        <div
          key={`debug-${info}-${index}`}
          className="text-sm text-text-muted font-mono"
        >
          {info}
        </div>
      ))}
    </div>
  );
}
