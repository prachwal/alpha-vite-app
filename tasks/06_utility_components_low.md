# 06_utility_components_low.md

## Zadanie: Implementacja komponentów pomocniczych i utility

### Priorytet: NISKI (Nice to have)

### Opis
Stworzenie komponentów pomocniczych, które zwiększają wygodę użytkowania ale nie są krytyczne dla podstawowej funkcjonalności - progress bars, timers, code display, images z lazy loading, etc.

### Struktura folderów docelowa
```
src/components/
├── utility/
│   ├── Progress/
│   │   ├── Progress.tsx
│   │   ├── ProgressCircle.tsx
│   │   ├── Progress.test.tsx
│   │   ├── Progress.stories.tsx
│   │   └── index.ts
│   ├── Image/
│   │   ├── Image.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── Image.test.tsx
│   │   ├── Image.stories.tsx
│   │   └── index.ts
│   ├── Code/
│   │   ├── CodeBlock.tsx
│   │   ├── InlineCode.tsx
│   │   ├── CodeHighlight.ts
│   │   ├── Code.test.tsx
│   │   ├── Code.stories.tsx
│   │   └── index.ts
│   ├── Timer/
│   │   ├── Timer.tsx
│   │   ├── Countdown.tsx
│   │   ├── useTimer.ts
│   │   ├── Timer.test.tsx
│   │   ├── Timer.stories.tsx
│   │   └── index.ts
│   ├── QRCode/
│   │   ├── QRCode.tsx
│   │   ├── QRCode.test.tsx
│   │   ├── QRCode.stories.tsx
│   │   └── index.ts
│   ├── Barcode/
│   │   ├── Barcode.tsx
│   │   ├── Barcode.test.tsx
│   │   ├── Barcode.stories.tsx
│   │   └── index.ts
│   ├── Clipboard/
│   │   ├── CopyButton.tsx
│   │   ├── useClipboard.ts
│   │   ├── Clipboard.test.tsx
│   │   ├── Clipboard.stories.tsx
│   │   └── index.ts
│   ├── Share/
│   │   ├── ShareButton.tsx
│   │   ├── SocialShare.tsx
│   │   ├── useShare.ts
│   │   ├── Share.test.tsx
│   │   ├── Share.stories.tsx
│   │   └── index.ts
│   └── PWA/
│       ├── InstallPrompt.tsx
│       ├── OfflineIndicator.tsx
│       ├── usePWA.ts
│       ├── PWA.test.tsx
│       ├── PWA.stories.tsx
│       └── index.ts
```

### Wymagania techniczne

#### 1. Progress Components
**Lokalizacja**: `src/components/utility/Progress/`

**Interface**:
```tsx
interface ProgressProps {
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

interface ProgressCircleProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  format?: (value: number, max: number) => string;
  color?: string;
  trailColor?: string;
  className?: string;
}
```

**Funkcjonalności**:
- Linear progress bar
- Circular progress
- Animated progress
- Custom formatting
- Multiple variants
- Striped pattern

#### 2. Image Components
**Lokalizacja**: `src/components/utility/Image/`

**Interface**:
```tsx
interface ImageProps {
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

interface ImageGalleryProps {
  images: readonly {
    src: string;
    alt: string;
    thumbnail?: string;
  }[];
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  preview?: boolean;
  lazyLoad?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- Lazy loading
- Preview modal
- Gallery layout
- Fallback handling
- Object fit options
- Loading placeholders

#### 3. Code Components
**Lokalizacja**: `src/components/utility/Code/`

**Interface**:
```tsx
interface CodeBlockProps {
  code: string;
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  showLineNumbers?: boolean;
  highlightLines?: readonly number[];
  copyable?: boolean;
  maxHeight?: string | number;
  wrapLines?: boolean;
  className?: string;
}

interface InlineCodeProps {
  children: string;
  copyable?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- Syntax highlighting
- Line numbers
- Line highlighting
- Copy functionality
- Multiple themes
- Language detection

#### 4. Timer Components
**Lokalizacja**: `src/components/utility/Timer/`

**Interface**:
```tsx
interface TimerProps {
  duration: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  format?: (time: number) => string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'circle';
  showProgress?: boolean;
  className?: string;
}

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
  format?: (time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => preact.ComponentChildren;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Funkcjonalności**:
- Timer z countdown
- Auto-start option
- Progress visualization
- Custom formatting
- Date countdown
- Callback events

#### 5. QR Code Component
**Lokalizacja**: `src/components/utility/QRCode/`

**Interface**:
```tsx
interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  fgColor?: string;
  bgColor?: string;
  includeMargin?: boolean;
  downloadable?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- QR code generation
- Error correction levels
- Custom colors
- Download functionality
- Size control

#### 6. Clipboard Components
**Lokalizacja**: `src/components/utility/Clipboard/`

**Interface**:
```tsx
interface CopyButtonProps {
  text: string;
  children?: preact.ComponentChildren;
  onCopy?: (text: string) => void;
  successMessage?: string;
  successDuration?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

interface UseClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  isSupported: boolean;
}
```

**Funkcjonalności**:
- Copy to clipboard
- Success feedback
- Browser compatibility
- Custom messages
- Hook implementation

#### 7. Share Components
**Lokalizacja**: `src/components/utility/Share/`

**Interface**:
```tsx
interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

interface ShareButtonProps {
  data: ShareData;
  children?: preact.ComponentChildren;
  fallbackUrl?: string;
  onShare?: (method: 'native' | 'fallback') => void;
  className?: string;
}

interface SocialShareProps {
  data: ShareData;
  platforms: readonly ('facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email')[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'circle' | 'square';
  className?: string;
}
```

**Funkcjonalności**:
- Native share API
- Social media sharing
- Fallback options
- Multiple platforms
- Custom styling

#### 8. PWA Components
**Lokalizacja**: `src/components/utility/PWA/`

**Interface**:
```tsx
interface InstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  title?: string;
  description?: string;
  installText?: string;
  dismissText?: string;
  className?: string;
}

interface OfflineIndicatorProps {
  position?: 'top' | 'bottom';
  message?: string;
  className?: string;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  install: () => Promise<boolean>;
}
```

**Funkcjonalności**:
- Install prompt
- Offline detection
- PWA status
- Install management
- Network status

### Wymagania implementacyjne

#### Performance
- Lazy loading dla images
- Code splitting dla heavy components
- Web Workers dla QR generation
- Optimized re-renders

#### Browser Support
- Feature detection
- Graceful degradation
- Polyfills gdzie needed
- Progressive enhancement

#### Security
- Input sanitization dla code
- Safe clipboard access
- URL validation dla shares
- XSS prevention

### Dependencies
```json
{
  "qrcode": "^1.5.3",
  "prismjs": "^1.29.0", 
  "jsbarcode": "^3.11.5"
}
```

### Kryteria akceptacji
1. ✅ Components gracefully degrade
2. ✅ No security vulnerabilities
3. ✅ Performance benchmarks met
4. ✅ Cross-browser compatibility
5. ✅ Mobile-friendly
6. ✅ Accessibility compliance
7. ✅ PWA features working
8. ✅ Offline functionality

### Timeline
- Progress: 3h
- Image: 4h
- Code: 5h
- Timer: 3h
- QRCode: 2h
- Clipboard: 2h
- Share: 3h
- PWA: 4h
- Testy wszystkich: 8h
- Stories wszystkich: 4h
- **Total: ~38h**

### Uwaga
Te komponenty mają najniższy priorytet i powinny być implementowane dopiero po ukończeniu wszystkich komponentów o wyższym priorytecie. Są to "nice to have" features które zwiększają funkcjonalność ale nie są kluczowe dla działania aplikacji.
