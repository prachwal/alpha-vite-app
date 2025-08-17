# Alpha Vite App - AI Agent Instructions

## Architecture Overview

This is a **SSR Preact application** with a dual server architecture designed for development and production environments.

- **Development**: The `npm run dev` command starts a Vite dev server that uses an Express server (`api/index.js`) for API routing and middleware. This provides a hot-reloading development experience.
- **Production**: `npm run build` creates a static client build (`dist/client`) and a server build (`dist/server`). The Express server then serves the static assets and handles SSR.
- **State Management**: The application uses **Preact Signals** (`@preact/signals`) for reactive state management. State is centralized in service files (e.g., `src/services/ThemeProvider.ts`, `src/components/SidebarState.ts`) and imported into components.
- **Routing**: Client-side routing is handled by `preact-iso`, which supports SSR.
- **Styling**: The project uses **Tailwind CSS 4** with a CSS variable-based theming system for dynamic light/dark modes and spacing.

## Critical Developer Workflows

### Development Commands

```bash
# Start the development server with Vite and Express
npm run dev

# Create a production build for both client and server
npm run build

# Run the production server
npm run preview

# Run unit tests with Vitest
npm test
```

### SSR Hydration and Client-Side Initialization

The application uses SSR, so client-side logic must be handled carefully to avoid hydration mismatches.

1.  **Initialization Entry Point**: All client-side services are initialized in `src/entry-client.tsx`.
2.  **Deferred Execution**: DOM-manipulating logic is deferred using `queueMicrotask` to ensure it runs _after_ Preact has hydrated the app. This is critical for preventing errors.

```typescript
// src/services/ThemeProvider.ts - Correct way to apply theme on client
effect(() => {
  if (typeof window === "undefined") return;
  queueMicrotask(() => {
    // DOM manipulation logic here
    document.documentElement.classList.add("dark");
  });
});

// src/entry-client.tsx - Initialization order
initializeI18n();
initializeTheme();
initializeSidebar();
```

## Project-Specific Patterns

### Signal-Based State Management

State is managed globally using signals, which are imported directly into components.

- **Theme**: `themeConfig` in `src/services/ThemeProvider.ts` controls the theme. It's persisted to `localStorage`.
- **Sidebar**: `sidebarOpen` and `currentBreakpoint` in `src/components/SidebarState.ts` manage the sidebar's responsive state.
- **API State**: `apiState` in `src/services/ApiClient.ts` tracks the loading, data, and error states for API requests.

### Dynamic Theming with CSS Variables

The theme system is built on CSS variables defined in `src/index.css` and consumed by Tailwind.

- **CSS Definitions**: Light mode variables are in `:root`, and dark mode overrides are in the `.dark` class.
- **Tailwind Config**: `tailwind.config.js` is minimal. The theme is defined in CSS, not in the config file.
- **Applying Themes**: The `ThemeProvider` service adds/removes the `.dark` class from the `<html>` element.

```css
/* src/index.css */
@theme {
  --color-bg-primary: #ffffff;
  /* ... other light theme variables */
}

.dark {
  --color-bg-primary: #0f172a;
  /* ... other dark theme variables */
}
```

### Active Navigation Links

The `Sidebar.tsx` component determines the active route by directly comparing `window.location.pathname` with the link's `href`.

```typescript
// src/components/SidebarState.ts
export const currentPath = signal(window.location.pathname);

// src/components/Sidebar.tsx
const isActive = currentPath.value === href;
```

## Integration Points

### API Client

- **Location**: The Express API is defined in `api/index.js` and `api/routes.js`.
- **Client**: The `ApiClient` class in `src/services/ApiClient.ts` provides methods for making requests and updates the global `apiState` signal.

### Internationalization (i18n)

- **Library**: `i18next` is used for translations.
- **Initialization**: The service is initialized in `src/entry-client.tsx`.
- **Usage**: The `t` function from `src/services/i18n.ts` is used in components.

## Testing

- **Framework**: **Vitest** with a `jsdom` environment.
- **Configuration**: `vitest.config.ts`.
- **Setup**: `src/test/setup.ts` contains global setup for tests.
- **Mocks**: Dependencies like `i18n` are typically mocked at the test file level.

## Key Files for Understanding

- `src/entry-client.tsx`: The starting point for client-side initialization.
- `src/services/ThemeProvider.ts`: The core of the signal-based theme management system.
- `api/index.js`: The Express server setup for both development and production.
- `src/index.css`: The definition of the application's theme using CSS variables.
- `package.json`: Lists all dependencies and scripts.
- `vite.config.ts`: Configuration for the Vite build tool.
