import { useState, useRef, useEffect } from "preact/hooks";
import { cn } from "../../../utils/cn";

export interface ColorPickerProps {
  /** Current color value */
  value: string;
  /** Callback when color changes */
  onChange: (color: string) => void;
  /** Color format (hex, rgb, hsl) */
  format?: "hex" | "rgb" | "hsl";
  /** Preset colors */
  presets?: readonly string[];
  /** Show input field */
  showInput?: boolean;
  /** Show alpha channel */
  showAlpha?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
}

/**
 * Color picker utility functions
 */
const colorUtils = {
  // Convert hex to RGB
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result?.[1] && result?.[2] && result?.[3]
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  // Convert RGB to hex
  rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  // Convert HSL to RGB
  hslToRgb(
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 12) % 12;
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };

    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    };
  },

  // Convert RGB to HSL
  rgbToHsl(
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  },
};

/**
 * Color picker component
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value={color}
 *   onChange={setColor}
 *   presets={['#ff0000', '#00ff00', '#0000ff']}
 *   showInput
 * />
 * ```
 */
export function ColorPicker({
  value,
  onChange,
  format = "hex",
  presets = [
    "#ff0000",
    "#ff8000",
    "#ffff00",
    "#80ff00",
    "#00ff00",
    "#00ff80",
    "#00ffff",
    "#0080ff",
    "#0000ff",
    "#8000ff",
    "#ff00ff",
    "#ff0080",
    "#000000",
    "#404040",
    "#808080",
    "#c0c0c0",
    "#ffffff",
  ],
  showInput = true,
  showAlpha = false,
  disabled = false,
  size = "md",
  className,
}: Readonly<ColorPickerProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setInputValue(color);

    // Add to recent colors
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== color);
      return [color, ...filtered].slice(0, 8);
    });

    setIsOpen(false);
  };

  const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    setInputValue(newValue);

    // Validate color
    if (isValidColor(newValue)) {
      onChange(newValue);
    }
  };

  const isValidColor = (color: string): boolean => {
    // Simple validation for hex colors
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const formatColor = (color: string): string => {
    if (format === "rgb") {
      const rgb = colorUtils.hexToRgb(color);
      return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
    }
    if (format === "hsl") {
      const rgb = colorUtils.hexToRgb(color);
      if (rgb) {
        const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      }
    }
    return color; // hex
  };

  return (
    <div className={cn("relative inline-block", className)} ref={pickerRef}>
      {/* Color Preview Button */}
      <button
        type="button"
        className={cn(
          "border-2 border-gray-300 dark:border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all",
          sizeClasses[size],
          disabled && "cursor-not-allowed opacity-50"
        )}
        style={{ backgroundColor: value }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-label="Select color"
      >
        <span className="sr-only">Current color: {formatColor(value)}</span>
      </button>

      {/* Color Picker Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-64">
          {/* Input Field */}
          {showInput && (
            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="#000000"
                aria-label="Color value input"
              />
            </div>
          )}

          {/* Preset Colors */}
          {presets.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preset Colors
              </h4>
              <div className="grid grid-cols-8 gap-1">
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "w-6 h-6 rounded border border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500",
                      value === color && "ring-2 ring-blue-500"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recent Colors */}
          {recentColors.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recent Colors
              </h4>
              <div className="grid grid-cols-8 gap-1">
                {recentColors.map((color) => (
                  <button
                    key={`recent-${color}`}
                    type="button"
                    className={cn(
                      "w-6 h-6 rounded border border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500",
                      value === color && "ring-2 ring-blue-500"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Simple Color Grid */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Palette
            </h4>
            <div className="grid grid-cols-12 gap-1">
              {/* Generate a simple color grid */}
              {Array.from({ length: 144 }, (_, i) => {
                const hue = (i % 12) * 30;
                const lightness = 30 + Math.floor(i / 12) * 6;
                const saturation = 80;
                const rgb = colorUtils.hslToRgb(hue, saturation, lightness);
                const color = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);

                return (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      "w-4 h-4 rounded border border-gray-300 dark:border-gray-600 cursor-pointer hover:scale-125 transition-transform focus:outline-none focus:ring-1 focus:ring-blue-500",
                      value === color && "ring-2 ring-blue-500"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                );
              })}
            </div>
          </div>

          {/* Format Display */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {formatColor(value)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
