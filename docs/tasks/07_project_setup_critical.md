# 07_project_setup_critical.md

## Zadanie: Konfiguracja projektu i infrastruktury

### Priorytet: KRYTYCZNY ⭐⭐⭐ (WYKONAĆ NAJPIERW)

### Opis
Przygotowanie infrastruktury projektu - aliasy importów, nowa struktura folderów, migracja istniejących komponentów, konfiguracja Storybook, testów i narzędzi development.

### Lista zadań do wykonania

#### 1. Konfiguracja aliasów @ w TypeScript i Vite

**Pliki do modyfikacji:**
- `vite.config.ts`
- `tsconfig.json`  
- `vitest.config.ts`

**Wymagana konfiguracja:**
```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@components': path.resolve(__dirname, './src/components'),
    '@services': path.resolve(__dirname, './src/services'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@utils': path.resolve(__dirname, './src/utils'),
    '@hooks': path.resolve(__dirname, './src/hooks'),
    '@test': path.resolve(__dirname, './src/test')
  }
}

// tsconfig.json
"paths": {
  "@/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@services/*": ["./src/services/*"],
  "@pages/*": ["./src/pages/*"],
  "@assets/*": ["./src/assets/*"],
  "@utils/*": ["./src/utils/*"],
  "@hooks/*": ["./src/hooks/*"],
  "@test/*": ["./src/test/*"]
}
```

#### 2. Utworzenie nowej struktury folderów

**Struktura docelowa:**
```
src/
├── components/
│   ├── form/               # Podstawowe komponenty formularzy (KRYTYCZNE)
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── TextArea/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Form/
│   │   └── index.ts
│   ├── layout/             # Komponenty layoutu (WYSOKIE)
│   │   ├── Container/
│   │   ├── Grid/
│   │   ├── Stack/
│   │   ├── Divider/
│   │   ├── Spacer/
│   │   └── index.ts
│   ├── navigation/         # Komponenty nawigacji (WYSOKIE)
│   │   ├── Breadcrumb/
│   │   ├── Tabs/
│   │   ├── Pagination/
│   │   ├── Menu/
│   │   └── index.ts
│   ├── feedback/           # Feedback komponenty (WYSOKIE)
│   │   ├── Alert/
│   │   ├── Toast/
│   │   ├── Loading/
│   │   ├── Modal/
│   │   ├── Dialog/
│   │   ├── Tooltip/
│   │   └── index.ts
│   ├── display/            # Komponenty wyświetlania danych (ŚREDNIE)
│   │   ├── Table/
│   │   ├── List/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Tag/
│   │   ├── Statistic/
│   │   └── index.ts
│   ├── form-advanced/      # Zaawansowane formularze (ŚREDNIE)
│   │   ├── DatePicker/
│   │   ├── FileUpload/
│   │   ├── RichTextEditor/
│   │   ├── ColorPicker/
│   │   ├── Slider/
│   │   ├── Switch/
│   │   ├── Rate/
│   │   ├── AutoComplete/
│   │   └── index.ts
│   ├── utility/           # Komponenty pomocnicze (NISKIE)
│   │   ├── Progress/
│   │   ├── Image/
│   │   ├── Code/
│   │   ├── Timer/
│   │   ├── QRCode/
│   │   ├── Clipboard/
│   │   ├── Share/
│   │   ├── PWA/
│   │   └── index.ts
│   └── legacy/            # Stare komponenty (do migracji/usunięcia)
│       ├── ButtonGroup.tsx
│       ├── CheckIcon.tsx
│       ├── DebugInfo.tsx
│       ├── SectionCard.tsx
│       └── Select.tsx
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
├── types/                 # TypeScript definitions
└── stories/               # Storybook stories
```

#### 3. Migracja istniejących komponentów

**Komponenty do przeniesienia:**
- `src/components/common/ButtonGroup.tsx` → `src/components/legacy/ButtonGroup.tsx`
- `src/components/common/CheckIcon.tsx` → `src/components/legacy/CheckIcon.tsx`
- `src/components/common/DebugInfo.tsx` → `src/components/legacy/DebugInfo.tsx`
- `src/components/common/SectionCard.tsx` → `src/components/legacy/SectionCard.tsx`
- `src/components/common/Select.tsx` → `src/components/legacy/Select.tsx`

**Aktualizacja importów:**
- Znajdź wszystkie pliki importujące z `../components/common/`
- Zmień na `@components/legacy/` lub odpowiedni alias
- Sprawdź kompilację i testy

#### 4. Konfiguracja Storybook

**Instalacja i konfiguracja:**
```bash
npm install --save-dev @storybook/preact @storybook/addon-essentials @storybook/addon-a11y @storybook/addon-docs
```

**Pliki konfiguracyjne:**
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `.storybook/manager.ts`

**Wymagania:**
- Integracja z aliasami @
- Support dla CSS/Tailwind
- Addon accessibility
- Addon docs z autodocs
- Theme switching support

#### 5. Utworzenie index.ts files

**Template dla każdego folderu komponentów:**
```typescript
// src/components/form/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { TextArea } from './TextArea';
export { Checkbox } from './Checkbox';
export { Radio, RadioGroup } from './Radio';
export { Form, FormField } from './Form';

export type { 
  ButtonProps,
  InputProps,
  TextAreaProps,
  CheckboxProps,
  RadioProps,
  RadioGroupProps,
  FormProps,
  FormFieldProps
} from './types';
```

**Root index:**
```typescript
// src/components/index.ts
export * from './form';
export * from './layout';
export * from './navigation';
export * from './feedback';
export * from './display';
export * from './form-advanced';
export * from './utility';
export * from './legacy';
```

#### 6. Aktualizacja testów

**Konfiguracja vitest:**
- Aliasy @ w `vitest.config.ts`
- Setup dla nowej struktury
- Mock dla komponentów zewnętrznych
- Coverage configuration

**Template testów:**
```typescript
// src/components/form/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  // Więcej testów...
});
```

#### 7. Package.json scripts

**Dodanie nowych skryptów:**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint:components": "eslint src/components --ext .tsx,.ts",
    "type-check": "tsc --noEmit"
  }
}
```

#### 8. TypeScript strict configuration

**Dodanie strict rules:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

#### 9. ESLint i Prettier rules

**Dodanie rules dla komponentów:**
```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external", 
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "pathGroups": [
        {
          "pattern": "@/**",
          "group": "internal",
          "position": "before"
        }
      ]
    }]
  }
}
```

### Kryteria akceptacji

1. ✅ Aliasy @ działają we wszystkich narzędziach (Vite, TypeScript, Vitest, Storybook)
2. ✅ Stara struktura folderów przeniesiona do legacy/
3. ✅ Nowa struktura folderów utworzona z index.ts files
4. ✅ Wszystkie importy zaktualizowane i działające
5. ✅ Storybook skonfigurowany i działający
6. ✅ Testy przechodzą z nową konfiguracją
7. ✅ TypeScript kompiluje bez błędów
8. ✅ ESLint i Prettier działają z nowymi rules
9. ✅ Build production działa poprawnie
10. ✅ Dev server działa z aliasami

### Timeline
- Aliasy i konfiguracja: 2h
- Struktura folderów: 1h
- Migracja komponentów: 2h
- Storybook setup: 3h
- Index files: 1h
- Testy update: 2h
- Scripts i tools: 1h
- Verification: 1h
- **Total: ~13h**

### Zależności
- **MUSI być wykonane przed wszystkimi innymi taskami**
- Inne taski używają tej struktury i aliasów
- Komponenty będą implementowane w nowej strukturze

### Uwagi implementacyjne
- Commituj każdy krok osobno
- Testuj po każdej zmianie
- Zachowaj backwards compatibility gdzie możliwe
- Dokumentuj breaking changes
