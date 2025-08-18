# 03_feedback_components_high.md

## Zadanie: Implementacja komponentów feedback i notyfikacji

### Priorytet: WYSOKI ⭐⭐

### Opis
Stworzenie komponentów odpowiedzialnych za komunikację z użytkownikiem - alerty, notyfikacje, loading states, dialogi i tooltips. Te komponenty są kluczowe dla UX aplikacji.

### Struktura folderów docelowa
```
src/components/
├── feedback/
│   ├── Alert/
│   │   ├── Alert.tsx
│   │   ├── Alert.test.tsx
│   │   ├── Alert.stories.tsx
│   │   └── index.ts
│   ├── Toast/
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── useToast.ts
│   │   ├── Toast.test.tsx
│   │   ├── Toast.stories.tsx
│   │   └── index.ts
│   ├── Loading/
│   │   ├── Spinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── LoadingOverlay.tsx
│   │   ├── Loading.test.tsx
│   │   ├── Loading.stories.tsx
│   │   └── index.ts
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   ├── ModalHeader.tsx
│   │   ├── ModalBody.tsx
│   │   ├── ModalFooter.tsx
│   │   ├── useModal.ts
│   │   ├── Modal.test.tsx
│   │   ├── Modal.stories.tsx
│   │   └── index.ts
│   ├── Dialog/
│   │   ├── Dialog.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── useDialog.ts
│   │   ├── Dialog.test.tsx
│   │   ├── Dialog.stories.tsx
│   │   └── index.ts
│   └── Tooltip/
│       ├── Tooltip.tsx
│       ├── useTooltip.ts
│       ├── Tooltip.test.tsx
│       ├── Tooltip.stories.tsx
│       └── index.ts
```

### Wymagania techniczne

#### 1. Alert Component
**Lokalizacja**: `src/components/feedback/Alert/`

**Interface**:
```tsx
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  description?: string;
  icon?: preact.ComponentType<any> | boolean;
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  bordered?: boolean;
  children?: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- 4 semantic variants z kolorami
- Opcjonalny tytuł i opis
- Auto ikony lub custom
- Zamykanie z animacją
- Bordered variant
- Responsive sizing

#### 2. Toast System
**Lokalizacja**: `src/components/feedback/Toast/`

**Interface**:
```tsx
interface ToastData {
  id: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
  className?: string;
}

// Hook
interface UseToastReturn {
  toast: (options: Omit<ToastData, 'id'>) => string;
  success: (message: string, options?: Partial<ToastData>) => string;
  error: (message: string, options?: Partial<ToastData>) => string;
  warning: (message: string, options?: Partial<ToastData>) => string;
  info: (message: string, options?: Partial<ToastData>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
```

**Funkcjonalności**:
- Global toast system z provider
- 6 pozycji na ekranie
- Auto dismiss z configurable duration
- Persistent toasts
- Action buttons
- Stack management
- Swipe to dismiss
- Enter/exit animations

#### 3. Loading Components
**Lokalizacja**: `src/components/feedback/Loading/`

**Interface**:
```tsx
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'current';
  className?: string;
}

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  children?: preact.ComponentChildren;
  className?: string;
}

interface LoadingOverlayProps {
  loading: boolean;
  spinner?: preact.ComponentChildren;
  text?: string;
  blur?: boolean;
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Spinner w różnych rozmiarach
- Skeleton loader z variants
- LoadingOverlay dla całych sekcji
- Animacje pulse/wave
- Blur effect opcjonalny
- Custom spinner support

#### 4. Modal Component
**Lokalizacja**: `src/components/feedback/Modal/`

**Interface**:
```tsx
interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  className?: string;
  overlayClassName?: string;
  children: preact.ComponentChildren;
}

// Hook
interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
```

**Funkcjonalności**:
- Portal rendering
- Focus management
- Body scroll lock
- ESC to close
- Overlay click to close
- Multiple sizes
- Centered positioning
- Enter/exit animations
- Nested modal support

#### 5. Dialog Component
**Lokalizacja**: `src/components/feedback/Dialog/`

**Interface**:
```tsx
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    variant?: 'primary' | 'danger';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  icon?: preact.ComponentType<any>;
  variant?: 'default' | 'danger';
  className?: string;
}

interface ConfirmDialogOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
  onConfirm: () => void | Promise<void>;
}

// Hook
interface UseDialogReturn {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
  alert: (title: string, description?: string) => Promise<void>;
}
```

**Funkcjonalności**:
- Confirm dialogs
- Alert dialogs
- Promise-based API
- Loading states dla actions
- Icon support
- Danger variant
- Keyboard handling

#### 6. Tooltip Component
**Lokalizacja**: `src/components/feedback/Tooltip/`

**Interface**:
```tsx
interface TooltipProps {
  content: string | preact.ComponentChildren;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  delay?: number;
  offset?: number;
  disabled?: boolean;
  arrow?: boolean;
  maxWidth?: string | number;
  children: preact.ComponentChildren;
  className?: string;
}

// Hook
interface UseTooltipReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  targetRef: preact.RefObject<HTMLElement>;
  tooltipRef: preact.RefObject<HTMLDivElement>;
}
```

**Funkcjonalności**:
- 8 placement options
- Multiple triggers
- Delay support
- Positioning calculations
- Arrow pointer
- Auto-flip on viewport edges
- Portal rendering
- Touch support

### Wymagania implementacyjne

#### Animations
- Fade in/out dla modals/dialogs
- Slide animations dla toasts
- Loading animations dla spinners
- Smooth transitions wszędzie

#### Accessibility
- Focus trap dla modals
- ARIA roles i labels
- Keyboard navigation
- Screen reader announcements
- Color contrast compliance

#### Performance
- Portal dla overlays
- Event listener cleanup
- Memory leak prevention
- Efficient positioning calculations

#### Mobile Support
- Touch interactions
- Responsive sizing
- Safe area handling
- Swipe gestures

### Kryteria akceptacji
1. ✅ Focus management działa poprawnie
2. ✅ Animacje są smooth
3. ✅ Mobile interactions działają
4. ✅ No memory leaks
5. ✅ Accessibility compliance
6. ✅ Toast system jest performant
7. ✅ Positioning jest accurate
8. ✅ Keyboard navigation complete

### Timeline
+ Wszystkie komponenty feedback (Alert, Toast, Loading, Modal, Dialog, Tooltip) zakończone z testami i stories.
+ Testy: 100% pokrycia
+ Accessibility: pełne
+ Ostatnia aktualizacja: 2025-08-18
