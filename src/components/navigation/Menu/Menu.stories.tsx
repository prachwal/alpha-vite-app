import type { Meta, StoryObj } from '@storybook/preact';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'Menu component for displaying navigation menus with hierarchical structure.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The layout direction of the menu',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the menu items',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'The color theme of the menu',
    },
    selectedKey: {
      control: 'text',
      description: 'The key of the currently selected menu item',
    },
    onSelect: {
      action: 'onSelect',
      description: 'Function called when a menu item is selected',
    },
    children: {
      description: 'The menu items and groups',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    selectedKey: 'home',
    children: [
      { key: 'home', label: 'Home' },
      { key: 'about', label: 'About' },
      { key: 'services', label: 'Services' },
      { key: 'contact', label: 'Contact' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    variant: 'vertical',
    selectedKey: 'dashboard',
    children: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'users', label: 'Users' },
      { key: 'settings', label: 'Settings' },
      { key: 'logout', label: 'Logout' },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    variant: 'vertical',
    selectedKey: 'profile',
    children: [
      {
        type: 'group',
        label: 'User Management',
        children: [
          { key: 'profile', label: 'Profile' },
          { key: 'account', label: 'Account' },
          { key: 'preferences', label: 'Preferences' },
        ],
      },
      {
        type: 'group',
        label: 'System',
        children: [
          { key: 'logs', label: 'Logs' },
          { key: 'monitoring', label: 'Monitoring' },
          { key: 'maintenance', label: 'Maintenance' },
        ],
      },
    ],
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'horizontal',
    size: 'small',
    selectedKey: 'item1',
    children: [
      { key: 'item1', label: 'Item 1' },
      { key: 'item2', label: 'Item 2' },
      { key: 'item3', label: 'Item 3' },
    ],
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'vertical',
    size: 'large',
    selectedKey: 'item1',
    children: [
      { key: 'item1', label: 'Large Item 1' },
      { key: 'item2', label: 'Large Item 2' },
      { key: 'item3', label: 'Large Item 3' },
    ],
  },
};

export const DarkTheme: Story = {
  args: {
    variant: 'vertical',
    theme: 'dark',
    selectedKey: 'home',
    children: [
      { key: 'home', label: 'Home' },
      { key: 'products', label: 'Products' },
      { key: 'services', label: 'Services' },
      { key: 'support', label: 'Support' },
    ],
  },
};
