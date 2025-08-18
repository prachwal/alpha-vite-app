import type { Meta, StoryObj } from '@storybook/preact';
import { List, type ListProps } from './List';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';

const meta: Meta<ListProps> = {
  title: 'Components/Display/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: 'List component for displaying data in a structured format.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ListProps>;

const sampleData = [
  {
    id: 1,
    title: 'John Doe',
    description: 'Software Engineer at Tech Corp',
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'john@example.com',
    status: 'active',
  },
  {
    id: 2,
    title: 'Jane Smith',
    description: 'Product Manager at Startup Inc',
    avatar: 'https://i.pravatar.cc/150?img=2',
    email: 'jane@example.com',
    status: 'inactive',
  },
  {
    id: 3,
    title: 'Bob Johnson',
    description: 'Designer at Creative Studio',
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'bob@example.com',
    status: 'active',
  },
];

export const Default: Story = {
  args: {
    items: sampleData,
    renderItem: (item) => (
      <List.Item
        key={item.id}
        title={item.title}
        description={item.description}
        avatar={<Avatar src={item.avatar} size={40} />}
        extra={
          <Badge
            status={item.status === 'active' ? 'success' : 'default'}
            text={item.status}
          />
        }
      />
    ),
  },
};

export const Bordered: Story = {
  args: {
    ...Default.args,
    bordered: true,
  },
};

export const WithHeaderFooter: Story = {
  args: {
    ...Default.args,
    header: <div className="font-semibold">Team Members</div>,
    footer: <div className="text-sm text-gray-500">3 members total</div>,
    bordered: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingRows: 4,
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const WithoutSplit: Story = {
  args: {
    ...Default.args,
    split: false,
  },
};

export const CustomContent: Story = {
  args: {
    children: (
      <>
        <List.Item title="Custom Item 1" description="Custom description" />
        <List.Item title="Custom Item 2" description="Another custom item" />
      </>
    ),
  },
};
