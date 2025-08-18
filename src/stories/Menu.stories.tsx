import { Menu } from '../components/navigation/Menu/Menu';

export default {
  title: 'Design System/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: 'text' },
    items: { control: 'object' },
    position: { control: 'text' },
    size: { control: 'text' },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    trigger: <button>Menu</button>,
    items: [
      { label: 'Edit', action: () => alert('Edit') },
      { label: 'Delete', action: () => alert('Delete'), disabled: true },
      { label: 'Share', href: '/share' },
      { label: 'Settings', action: () => alert('Settings') },
    ],
    position: 'bottom-right',
    size: 'md',
  },
};
