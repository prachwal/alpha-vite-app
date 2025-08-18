# Navigation Components

This directory contains navigation components for building user interfaces.

## Components

### Tabs

A tab navigation component with keyboard support and accessibility features.

```tsx
import { Tabs } from '@components/navigation';

const tabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
];

<Tabs
  tabs={tabs}
  activeTab="tab1"
  onChange={(tabId) => console.log(tabId)}
  variant="default"
/>;
```

### Breadcrumb

A breadcrumb navigation component for hierarchical navigation.

```tsx
import { Breadcrumb } from '@components/navigation';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Product Name' },
];

<Breadcrumb items={items} separator="/" />;
```

### Pagination

A pagination component for navigating through large datasets.

```tsx
import { Pagination } from '@components/navigation';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
  showFirstLast
  showPrevNext
/>;
```

### Menu

A dropdown menu component with support for submenus and keyboard navigation.

```tsx
import { Menu } from '@components/navigation';

const menuItems = [
  { label: 'Profile', action: () => console.log('Profile') },
  { label: 'Settings', href: '/settings' },
  { label: 'Logout', action: () => console.log('Logout') },
];

<Menu
  trigger={<button>Menu</button>}
  items={menuItems}
  position="bottom-right"
/>;
```

## Usage Examples

### Tab Navigation

```tsx
const [activeTab, setActiveTab] = useState('profile');

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'notifications', label: 'Notifications' },
];

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>;
```

### Breadcrumb with Icons

```tsx
const items = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

<Breadcrumb items={items} maxItems={5} />;
```
