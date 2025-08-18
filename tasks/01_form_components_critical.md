# 01_form_components_critical.md

## Zadanie: Implementacja krytycznych komponentów formularzy (80% funkcjonalności)

### Priorytet: KRYTYCZNY ⭐⭐⭐

### Opis
Stworzenie podstawowych komponentów formularzy pokrywających 80% potrzeb aplikacji webowej. Komponenty muszą być zgodne z wytycznymi projektowymi, zawierać testy i być umieszczone w odpowiedniej strukturze folderów.

### Struktura folderów docelowa
```
src/components/
├── form/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   ├── Input.stories.tsx
│   │   └── index.ts
│   ├── TextArea/
│   │   ├── TextArea.tsx
│   │   ├── TextArea.test.tsx
│   │   ├── TextArea.stories.tsx
│   │   └── index.ts
│   ├── Checkbox/
│   │   ├── Checkbox.tsx
│   │   ├── Checkbox.test.tsx
│   │   ├── Checkbox.stories.tsx
│   │   └── index.ts
│   ├── Radio/
│   │   ├── Radio.tsx
│   │   ├── RadioGroup.tsx
│   │   ├── Radio.test.tsx
│   │   ├── Radio.stories.tsx
│   │   └── index.ts
│   └── Form/
│       ├── Form.tsx
│       ├── FormField.tsx
│       ├── FormValidation.ts
│       ├── Form.test.tsx
│       ├── Form.stories.tsx
│       └── index.ts
```

### Wymagania techniczne

#### 1. Button Component
**Lokalizacja**: `src/components/form/Button/`

**Interface**:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: preact.ComponentType<any>;
  rightIcon?: preact.ComponentType<any>;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: Event) => void;
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- 5 wariantów wizualnych (primary, secondary, tertiary, danger, ghost)
- 4 rozmiary (sm, md, lg, xl)
- Stan loading ze spinnerem
- Obsługa ikon (lewy/prawy)
- Pełna szerokość opcjonalna
- Responsywność
- Hover/focus/active states
- Accessibility (ARIA attributes)

**Testy wymagane**:
- Renderowanie wszystkich wariantów
- Obsługa kliknięć
- Stan disabled
- Stan loading
- Renderowanie z ikonami
- Accessibility tests

#### 2. Input Component
**Lokalizacja**: `src/components/form/Input/`

**Interface**:
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  leftIcon?: preact.ComponentType<any>;
  rightIcon?: preact.ComponentType<any>;
  fullWidth?: boolean;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  className?: string;
}
```

**Funkcjonalności**:
- Wszystkie standardowe typy input
- 3 rozmiary + 3 warianty wizualne
- Obsługa błędów z helperText
- Ikony lewy/prawy
- Label z obsługą required
- Walidacja HTML5
- Responsive design
- Focus management
- Accessibility complete

**Testy wymagane**:
- Wszystkie typy input
- Walidacja value/onChange
- Error states
- Disabled/readOnly states
- Icons rendering
- Label association
- Accessibility tests

#### 3. TextArea Component
**Lokalizacja**: `src/components/form/TextArea/`

**Interface**:
```tsx
interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  autoResize?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- Auto-resize opcjonalny
- Kontrola min/max rows
- Character count z maxLength
- Wszystkie standardy jak Input
- Resize kontrola

**Testy wymagane**:
- Auto-resize functionality
- Min/max rows
- Character counting
- Wszystkie standardowe testy jak Input

#### 4. Checkbox Component
**Lokalizacja**: `src/components/form/Checkbox/`

**Interface**:
```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- Stan indeterminate
- Custom checkbox styling
- Label integration
- Error states
- 3 rozmiary

**Testy wymagane**:
- Checked/unchecked states
- Indeterminate state
- Label clicks
- Disabled state
- Accessibility tests

#### 5. Radio Component
**Lokalizacja**: `src/components/form/Radio/`

**Interface**:
```tsx
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: readonly RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal' | 'grid';
  gridColumns?: 2 | 3 | 4;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- RadioGroup dla zarządzania grupą
- 3 układy (vertical, horizontal, grid)
- Grid z konfigurowalnymi kolumnami
- Individual radio disabled
- Group level disabled

**Testy wymagane**:
- Radio selection
- Group behavior
- Layout variants
- Disabled states
- Name attribute handling
- Accessibility tests

#### 6. Form Component
**Lokalizacja**: `src/components/form/Form/`

**Interface**:
```tsx
interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children: preact.ComponentChildren;
  className?: string;
}

interface FormProps {
  onSubmit: (event: Event) => void;
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- FormField wrapper dla labels/errors
- Form validation integration
- Submit handling
- Error state management
- Field spacing/layout

**Walidacja** (`FormValidation.ts`):
```tsx
interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

interface FieldValidation<T> {
  rules: ValidationRule<T>[];
  required?: boolean;
}

// Funkcje utility dla walidacji
function validateEmail(email: string): boolean;
function validateRequired<T>(value: T): boolean;
function validateMinLength(value: string, minLength: number): boolean;
function validateMaxLength(value: string, maxLength: number): boolean;
function validatePattern(value: string, pattern: RegExp): boolean;
```

**Testy wymagane**:
- Form submission
- Field validation
- Error display
- FormField wrapper
- Validation utilities

### Stories (Storybook)

Każdy komponent musi mieć `.stories.tsx` z:
- Default story
- Wszystkie warianty (size, variant, state)
- Interactive controls dla wszystkich props
- Dokumentacja usage examples
- Accessibility examples

### Wymagania implementacyjne

#### Styling
- Używaj CSS variables z systemu theme
- Responsive design obowiązkowy
- Dark/light mode support
- Consistent spacing system

#### TypeScript
- Strict typing dla wszystkich props
- Exported interfaces
- Generic types gdzie potrzebne
- JSDoc comments

#### Accessibility
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

#### Performance
- Memo dla expensive re-renders
- Lazy loading gdzie możliwe
- Optimal re-rendering

### Kryteria akceptacji
1. ✅ Wszystkie komponenty renderują się poprawnie
2. ✅ Testy pokrywają 100% funkcjonalności
3. ✅ Stories działają w Storybook
4. ✅ TypeScript bez błędów
5. ✅ Accessibility audit passes
6. ✅ Responsive na wszystkich breakpoints
7. ✅ Dark/light mode działa
8. ✅ Performance benchmarks spełnione

### Timeline
- Button: 2h
- Input: 3h  
- TextArea: 2h
- Checkbox: 2h
- Radio: 3h
- Form: 2h
- Testy wszystkich: 4h
- Stories wszystkich: 3h
- **Total: ~21h**

### Zależności
- Wymaga zaktualizowanej struktury folderów
- Wymaga aliasów @ w konfiguracji
- Wymaga systemu theme CSS variables
