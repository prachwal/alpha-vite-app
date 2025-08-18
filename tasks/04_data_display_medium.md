# 04_data_display_medium.md

## Zadanie: Implementacja komponentów wyświetlania danych

### Priorytet: ŚREDNI ⭐

### Opis
Stworzenie komponentów odpowiedzialnych za prezentację danych - tabele, listy, karty, badges i avatary. Komponenty te wspierają organizację i wyświetlanie informacji.

### Struktura folderów docelowa
```
src/components/
├── display/
│   ├── Table/
│   │   ├── Table.tsx
│   │   ├── TableHeader.tsx
│   │   ├── TableBody.tsx
│   │   ├── TableRow.tsx
│   │   ├── TableCell.tsx
│   │   ├── useTable.ts
│   │   ├── Table.test.tsx
│   │   ├── Table.stories.tsx
│   │   └── index.ts
│   ├── List/
│   │   ├── List.tsx
│   │   ├── ListItem.tsx
│   │   ├── ListGroup.tsx
│   │   ├── List.test.tsx
│   │   ├── List.stories.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── CardHeader.tsx
│   │   ├── CardBody.tsx
│   │   ├── CardFooter.tsx
│   │   ├── Card.test.tsx
│   │   ├── Card.stories.tsx
│   │   └── index.ts
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   ├── Badge.test.tsx
│   │   ├── Badge.stories.tsx
│   │   └── index.ts
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── AvatarGroup.tsx
│   │   ├── Avatar.test.tsx
│   │   ├── Avatar.stories.tsx
│   │   └── index.ts
│   ├── Tag/
│   │   ├── Tag.tsx
│   │   ├── TagGroup.tsx
│   │   ├── Tag.test.tsx
│   │   ├── Tag.stories.tsx
│   │   └── index.ts
│   └── Statistic/
│       ├── Statistic.tsx
│       ├── StatisticGroup.tsx
│       ├── Statistic.test.tsx
│       ├── Statistic.stories.tsx
│       └── index.ts
```

### Wymagania techniczne

#### 1. Table Component
**Lokalizacja**: `src/components/display/Table/`

**Interface**:
```tsx
interface Column<T> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => preact.ComponentChildren;
  width?: string | number;
  minWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  fixed?: 'left' | 'right';
}

interface TableProps<T> {
  columns: readonly Column<T>[];
  data: readonly T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowSelection?: {
    selectedRowKeys: readonly string[];
    onChange: (selectedRowKeys: readonly string[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  sortOrder?: { field: string; direction: 'asc' | 'desc' };
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onRow?: (record: T, index: number) => {
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
  expandable?: {
    expandedRowKeys: readonly string[];
    onExpand: (expanded: boolean, record: T) => void;
    expandedRowRender: (record: T) => preact.ComponentChildren;
  };
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  sticky?: boolean;
  scrollX?: string | number;
  scrollY?: string | number;
  className?: string;
}
```

**Funkcjonalności**:
- Sortowanie kolumn
- Row selection z checkboxami
- Pagination integration
- Expandable rows
- Fixed columns
- Sticky header
- Horizontal/vertical scroll
- Loading state
- Custom cell rendering

#### 2. List Component
**Lokalizacja**: `src/components/display/List/`

**Interface**:
```tsx
interface ListItemProps {
  title: string;
  description?: string;
  avatar?: preact.ComponentChildren;
  actions?: readonly preact.ComponentChildren[];
  extra?: preact.ComponentChildren;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

interface ListProps {
  items?: readonly any[];
  renderItem?: (item: any, index: number) => preact.ComponentChildren;
  header?: preact.ComponentChildren;
  footer?: preact.ComponentChildren;
  bordered?: boolean;
  split?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingRows?: number;
  virtual?: boolean;
  height?: string | number;
  children?: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Virtual scrolling dla dużych list
- Loading states z skeleton
- Header/footer support
- Custom item rendering
- Click/navigation handling
- Bordered/split variants

#### 3. Card Component
**Lokalizacja**: `src/components/display/Card/`

**Interface**:
```tsx
interface CardProps {
  title?: string;
  subtitle?: string;
  extra?: preact.ComponentChildren;
  cover?: preact.ComponentChildren;
  actions?: readonly preact.ComponentChildren[];
  loading?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  bodyStyle?: preact.CSSProperties;
  headStyle?: preact.CSSProperties;
  children?: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Header z title/subtitle/extra
- Cover image support
- Actions area
- Loading state z skeleton
- Hover effects
- Size variants
- Custom styling

#### 4. Badge Component
**Lokalizacja**: `src/components/display/Badge/`

**Interface**:
```tsx
interface BadgeProps {
  count?: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  status?: 'default' | 'processing' | 'success' | 'error' | 'warning';
  color?: string;
  text?: string;
  offset?: readonly [number, number];
  size?: 'sm' | 'md' | 'lg';
  children?: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Count badges z max value
- Dot indicator
- Status indicators
- Custom colors
- Positioning offset
- Standalone text badges

#### 5. Avatar Component
**Lokalizacja**: `src/components/display/Avatar/`

**Interface**:
```tsx
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  icon?: preact.ComponentType<any>;
  children?: preact.ComponentChildren;
  className?: string;
  onClick?: () => void;
}

interface AvatarGroupProps {
  max?: number;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'tight' | 'normal' | 'loose';
  children: preact.ComponentChildren;
  className?: string;
}
```

**Funkcjonalności**:
- Image avatars z fallback
- Icon/text avatars
- Size variants + custom sizes
- Circle/square shapes
- Avatar groups z overlap
- Max display z "+N" indicator

#### 6. Tag Component
**Lokalizacja**: `src/components/display/Tag/`

**Interface**:
```tsx
interface TagProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  closable?: boolean;
  onClose?: () => void;
  icon?: preact.ComponentType<any>;
  color?: string;
  children: preact.ComponentChildren;
  className?: string;
}

interface TagGroupProps {
  tags: readonly string[];
  closable?: boolean;
  onTagClose?: (tag: string) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Funkcjonalności**:
- Semantic color variants
- Closable z animacją
- Custom colors
- Icons support
- Tag groups z management
- Max display limit

#### 7. Statistic Component
**Lokalizacja**: `src/components/display/Statistic/`

**Interface**:
```tsx
interface StatisticProps {
  title: string;
  value: string | number;
  prefix?: preact.ComponentChildren;
  suffix?: preact.ComponentChildren;
  formatter?: (value: string | number) => preact.ComponentChildren;
  precision?: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  loading?: boolean;
  valueStyle?: preact.CSSProperties;
  className?: string;
}

interface StatisticGroupProps {
  statistics: readonly Omit<StatisticProps, 'className'>[];
  columns?: 1 | 2 | 3 | 4;
  bordered?: boolean;
  className?: string;
}
```

**Funkcjonalności**:
- Number formatting
- Prefix/suffix support
- Custom formatters
- Loading states
- Group layout
- Precision control

### Wymagania implementacyjne

#### Performance
- Virtual scrolling dla Table/List
- Lazy loading dla images
- Memoization dla expensive renders
- Efficient re-rendering

#### Accessibility
- ARIA labels dla wszystkich
- Keyboard navigation dla Table
- Screen reader support
- Semantic HTML

#### Mobile Support
- Responsive table (horizontal scroll)
- Touch-friendly interactions
- Mobile-optimized sizes
- Swipe gestures gdzie applicable

### Kryteria akceptacji
1. ✅ Table sorting/filtering działa
2. ✅ Virtual scrolling jest performant
3. ✅ Image loading z fallbackami
4. ✅ Mobile responsiveness
5. ✅ Accessibility compliance
6. ✅ Loading states są smooth
7. ✅ Custom rendering działa
8. ✅ Memory usage jest optimized

### Timeline
- Table: 8h
- List: 4h
- Card: 3h
- Badge: 2h
- Avatar: 3h
- Tag: 2h
- Statistic: 2h
- Testy wszystkich: 8h
- Stories wszystkich: 4h
- **Total: ~36h**
