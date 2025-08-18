import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    separator: { control: 'text' },
    maxItems: { control: 'number' },
    collapseFrom: { control: 'text' },
    size: { control: 'text' },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current' },
    ],
    separator: '/',
    size: 'md',
  },
};
