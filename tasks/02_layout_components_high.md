# 02_layout_components_high.md

## Zadanie: Implementacja komponentów layoutu i nawigacji

### Priorytet: WYSOKI ⭐⭐

### Opis
Stworzenie komponentów odpowiedzialnych za strukturę strony, nawigację i organizację treści. Komponenty te zapewniają spójny wygląd i użyteczność aplikacji.

### Struktura folderów docelowa
```
src/components/
├── layout/
│   ├── Container/
│   │   ├── Container.tsx
│   │   ├── Container.test.tsx
│   │   ├── Container.stories.tsx
│   │   └── index.ts
│   ├── Grid/
│   │   ├── Grid.tsx
│   │   ├── GridItem.tsx
│   │   ├── Grid.test.tsx
│   │   ├── Grid.stories.tsx
│   │   └── index.ts
│   ├── Stack/
│   │   ├── Stack.tsx
│   │   ├── Stack.test.tsx
│   │   ├── Stack.stories.tsx
│   │   └── index.ts
│   ├── Divider/
│   │   ├── Divider.tsx
│   │   ├── Divider.test.tsx
│   │   ├── Divider.stories.tsx
│   │   └── index.ts
│   └── Spacer/
│       ├── Spacer.tsx
│       ├── Spacer.test.tsx
│       ├── Spacer.stories.tsx
│       └── index.ts
├── navigation/
│   ├── Breadcrumb/
│   │   ├── Breadcrumb.tsx
│   │   ├── BreadcrumbItem.tsx
│   │   ├── Breadcrumb.test.tsx
│   │   ├── Breadcrumb.stories.tsx
│   │   └── index.ts
│   ├── Tabs/
│   │   ├── Tabs.tsx
│   │   ├── Tab.tsx
│   │   ├── TabPanel.tsx
│   │   ├── Tabs.test.tsx
│   │   ├── Tabs.stories.tsx
│   │   └── index.ts
│   ├── Pagination/
│   │   ├── Pagination.tsx
│   │   ├── Pagination.test.tsx
│   │   ├── Pagination.stories.tsx
│   │   └── index.ts
│   └── Menu/
│       ├── Menu.tsx
│       ├── MenuItem.tsx
│       ├── MenuGroup.tsx
│       ├── Menu.test.tsx
│       ├── Menu.stories.tsx
│       └── index.ts
```

### Wymagania techniczne

#### 1. Container Component
**Lokalizacja**: `src/components/layout/Container/`

**Interface**:
```tsx
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  fluid?: boolean;
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Responsive max-width breakpoints
- Konfigurowalne padding
- Centrowanie opcjonalne
- Fluid mode (full width)
- Consistent margins

#### 2. Grid Component
**Lokalizacja**: `src/components/layout/Grid/`

**Interface**:
```tsx
interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  };
  children: preact.ComponentChildren;
  className?: string;
}

interface GridItemProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  responsive?: {
    sm?: { span?: number; offset?: number };
    md?: { span?: number; offset?: number };
    lg?: { span?: number; offset?: number };
    xl?: { span?: number; offset?: number };
  };
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- CSS Grid implementation
- Responsive breakpoints
- Span/offset dla GridItem
- Configurable gaps

#### 3. Stack Component
**Lokalizacja**: `src/components/layout/Stack/`

**Interface**:
```tsx
interface StackProps {
  direction?: 'row' | 'column';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  divider?: preact.ComponentChildren;
  responsive?: {
    sm?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>;
    md?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>;
    lg?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>;
    xl?: Partial<Pick<StackProps, 'direction' | 'spacing' | 'align' | 'justify'>>;
  };
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Flexbox implementation
- Row/column direction
- Spacing control
- Alignment options
- Optional dividers
- Responsive variants

#### 4. Tabs Component
**Lokalizacja**: `src/components/navigation/Tabs/`

**Interface**:
```tsx
interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: preact.ComponentType<any>;
}

interface TabsProps {
  tabs: readonly TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  scrollable?: boolean;
  centered?: boolean;
  fullWidth?: boolean;
  className?: string;
}

interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Multiple visual variants
- Vertical/horizontal orientation
- Scrollable tabs
- Icons support
- Keyboard navigation
- ARIA compliance

#### 5. Breadcrumb Component
**Lokalizacja**: `src/components/navigation/Breadcrumb/`

**Interface**:
```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: preact.ComponentType<any>;
}

interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  separator?: string | preact.ComponentChildren;
  maxItems?: number;
  collapseFrom?: 'start' | 'end';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Funkcjonalności**:
- Customizable separators
- Item collapsing
- Click/navigation handling
- Icons support
- Accessibility

#### 6. Pagination Component
**Lokalizacja**: `src/components/navigation/Pagination/`

**Interface**:
```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  showPageSize?: boolean;
  pageSizeOptions?: readonly number[];
  onPageSizeChange?: (pageSize: number) => void;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
  disabled?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- Page navigation
- Page size selector
- Quick jumper
- Total items display
- Previous/next controls
- First/last controls

#### 7. Menu Component
**Lokalizacja**: `src/components/navigation/Menu/`

**Interface**:
```tsx
interface MenuItemData {
  id: string;
  label: string;
  icon?: preact.ComponentType<any>;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: readonly MenuItemData[];
}

interface MenuProps {
  items: readonly MenuItemData[];
  mode?: 'horizontal' | 'vertical' | 'inline';
  theme?: 'light' | 'dark';
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  selectedKeys?: readonly string[];
  openKeys?: readonly string[];
  onSelect?: (key: string) => void;
  onOpenChange?: (openKeys: readonly string[]) => void;
  className?: string;
}
```

**Funkcjonalności**:
- Hierarchical menu structure
- Multiple modes
- Collapsible sidebar mode
- Selection states
- Open/close states
- Icons support

### Wymagania implementacyjne

#### Styling
- CSS Grid/Flexbox dla layouts
- CSS variables dla spacing
- Responsive breakpoints
- Theme support

#### Accessibility
- Keyboard navigation dla wszystkich
- ARIA roles i properties
- Focus management
- Screen reader support

#### Performance
- Lazy loading dla large menus
- Virtualization dla long lists
- Optimized re-renders

### Kryteria akceptacji
1. ✅ Komponenty działają na wszystkich breakpoints
2. ✅ Keyboard navigation działa poprawnie
3. ✅ ARIA compliance
4. ✅ Performance w dużych listach
5. ✅ Theme switching
6. ✅ Testy unit i integration
7. ✅ Stories w Storybook

### Timeline
- Container, Grid, Stack, Divider, Spacer: 6h
- Breadcrumb: 3h
- Tabs: 4h
- Pagination: 4h
- Menu: 6h
- Testy wszystkich: 6h
- Stories wszystkich: 4h
- **Total: ~33h**
