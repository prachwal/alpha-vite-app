import { useEffect, useRef } from 'preact/hooks';
import QRCodeGenerator from 'qrcode';

export interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  bgColor?: string;
  fgColor?: string;
  includeMargin?: boolean;
  className?: string;
  onClick?: () => void;
}

export function QRCode({
  value,
  size = 128,
  level = 'M',
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  includeMargin = true,
  className = '',
  onClick,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      try {
        await QRCodeGenerator.toCanvas(canvasRef.current, value, {
          width: size,
          margin: includeMargin ? 4 : 0,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: level,
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [value, size, level, bgColor, fgColor, includeMargin]);

  return (
    <div
      className={`inline-block ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
