import type { Meta, StoryObj } from '@storybook/preact';
import { Statistic } from './Statistic';

const meta: Meta<typeof Statistic> = {
  title: 'Components/Display/Statistic',
  component: Statistic,
  parameters: {
    docs: {
      description: {
        component: 'Statistic component for displaying numerical data.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    prefix: {
      control: { type: 'text' },
    },
    suffix: {
      control: { type: 'text' },
    },
    precision: {
      control: { type: 'number', min: 0, max: 5 },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1234,
  } as any,
};

export const WithTitle: Story = {
  args: {
    title: 'Total Users',
    value: 1234,
  } as any,
};

export const WithPrefix: Story = {
  args: {
    title: 'Revenue',
    value: 1234.56,
    prefix: '$',
  } as any,
};

export const WithSuffix: Story = {
  args: {
    title: 'Conversion Rate',
    value: 12.34,
    suffix: '%',
  } as any,
};

export const WithPrecision: Story = {
  args: {
    title: 'Average Score',
    value: 85.6789,
    precision: 2,
  } as any,
};

export const Loading: Story = {
  args: {
    title: 'Loading Data',
    value: 0,
    loading: true,
  } as any,
};

export const StringValue: Story = {
  args: {
    title: 'Status',
    value: 'Active',
  } as any,
};

export const LargeNumbers: Story = {
  args: {
    title: 'Total Sales',
    value: 1234567.89,
    prefix: '$',
    precision: 2,
  } as any,
};

export const ZeroValue: Story = {
  args: {
    title: 'Pending Tasks',
    value: 0,
  } as any,
};

export const NegativeValue: Story = {
  args: {
    title: 'Profit/Loss',
    value: -123.45,
    prefix: '$',
  } as any,
};

export const WithChildren: Story = {
  render: () => (
    <Statistic title="Total Revenue" value={12345.67} prefix="$">
      <div className="text-sm text-gray-500 mt-2">+12% from last month</div>
    </Statistic>
  ),
};

export const MultipleStatistics: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Statistic title="Total Users" value={1234} />
      <Statistic title="Revenue" value={5678.9} prefix="$" precision={2} />
      <Statistic title="Growth" value={12.34} suffix="%" />
    </div>
  ),
};
