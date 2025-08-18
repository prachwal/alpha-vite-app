import { Tabs } from './Tabs';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'object' },
    activeTab: { control: 'text' },
    variant: { control: 'text' },
    size: { control: 'text' },
    orientation: { control: 'text' },
    scrollable: { control: 'boolean' },
    centered: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2' },
      { id: 'tab3', label: 'Tab 3', disabled: true },
    ],
    activeTab: 'tab1',
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    scrollable: false,
    centered: false,
    fullWidth: false,
  },
};
