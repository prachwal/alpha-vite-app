# Alpha Vite App - AI Agent Instructions

## Architecture Overview

This is a **SSR Preact application** with dual server architecture:

- **Development**: Vite dev server with Express API (`npm run dev` → `node api/index.js`)
- **Production**: Static build with Express serving both SSR and API routes
- **State Management**: Preact Signals for reactive state across components
- **Routing**: `preact-iso` for client-side navigation with SSR support
- **Styling**: Tailwind CSS 4 with CSS custom properties for dynamic theming

## Critical Developer Workflows

### Development Commands

```bash
npm run dev          # Starts Express server with Vite middleware (port 5173)
npm run build        # Builds both client (dist/client) and server (dist/server)
npm test             # Vitest with jsdom environment
npx vercel --prod    # Deploy to production
```

### SSR Hydration Pattern

Components must handle SSR safely using `isHydrated` signal:

```typescript
// src/components/SidebarState.ts - always check before DOM operations
if (!isHydrated.value) {
  return "safe-default-classes"; // SSR-safe fallback
}
```

### Service Initialization

All services require explicit client-side initialization in `entry-client.tsx`:

```typescript
initializeTheme(); // src/services/ThemeProvider.ts
initializeSidebar(); // src/components/SidebarState.ts
// i18n auto-initializes via import
```

## Project-Specific Patterns

### Signal-Based State Management

- **Theme**: `themeConfig` signal with localStorage persistence and CSS class application
- **Sidebar**: `sidebarOpen`, `currentBreakpoint`, `isHydrated` signals for responsive behavior
- **API**: `apiState` signal tracks loading/error states per endpoint
- **i18n**: `currentLanguage` signal for reactive language switching

### Dynamic CSS with Custom Properties

Spacing system uses CSS variables + Tailwind integration:

```css
/* src/index.css */
:root {
  --spacing-xs: 0.5rem;
}
.spacing-compact {
  --spacing-xs: 0.25rem;
}

/* tailwind.config.js */
spacing: {
  xs: "var(--spacing-xs)";
}
```

Applied via `ThemeProvider` effect that adds classes to `document.documentElement`.

### Active Navigation Pattern

`Sidebar.tsx` implements real-time active state detection:

```typescript
const getCurrentPath = () => window.location.pathname;
const isActiveRoute = (path: string) => getCurrentPath() === path;
```

Uses custom CSS classes for active/inactive states instead of router-based active links.

## Integration Points

### API Client Architecture

- **Endpoint**: All API routes prefixed with `/api/` (Express routes in `api/routes.js`)
- **State Management**: `ApiClient` class updates global `apiState` signal per request
- **Error Handling**: HTTP errors stored in signal state, displayed in `ApiTester` component

### Theme System Integration

- **CSS**: Dark mode via `documentElement.classList.toggle('dark')`
- **Tailwind**: `dark:` prefix variants automatically work with theme classes
- **Persistence**: Theme config object stored in localStorage, restored on initialization
- **Components**: Access via `themeConfig.value.mode` signal

### i18n Integration

- **Setup**: `i18next` with browser language detection, localStorage caching
- **Usage**: `t()` function with fallback values for SSR safety
- **Reactive**: `currentLanguage` signal updates when language changes
- **Switching**: `changeLanguage()` function updates both i18next and signal

## Testing Conventions

### Component Testing

- **Location**: `src/test/*.test.tsx`
- **Pattern**: Mock i18n service with translation map for predictable test values
- **SSR Testing**: Mock `window` object and `isHydrated` signal states
- **API Testing**: Use `apiState` signal to verify loading/success/error states

### Mock Patterns

```typescript
// Always mock i18n service with fallback translations
vi.mock("../services/i18n", () => ({
  t: vi.fn((key: string) => translations[key] || key),
}));
```

## Key Files for Understanding

- **`src/entry-client.tsx`** - Client hydration and service initialization
- **`src/services/ThemeProvider.ts`** - Signal-based theme management with CSS integration
- **`src/components/SidebarState.ts`** - Responsive sidebar state with SSR safety
- **`api/index.js`** - Dual development/production server setup
- **`src/index.css`** - CSS custom properties system for dynamic spacing
- **`tailwind.config.js`** - Custom spacing integration with CSS variables
