import type { Meta, StoryObj } from '@storybook/preact';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    docs: {
      description:
        'Alert component for displaying important messages to users with different severity levels.',
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'The visual style of the alert',
    },
    title: {
      control: 'text',
      description: 'The title of the alert',
    },
    children: {
      control: 'text',
      description: 'The content of the alert',
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the alert is closed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    title: 'Information',
    children:
      'This is an informational message to help users understand something important.',
  },
};

export const Success: Story = {
  args: {
    title: 'Success',
    children: 'Your action has been completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    children: 'Please be careful, this action might have consequences.',
  },
};

export const ErrorAlert: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again later.',
  },
};

export const WithoutTitle: Story = {
  args: {
    children: 'This alert does not have a title, just the content.',
  },
};

export const Closable: Story = {
  args: {
    title: 'Closable Alert',
    children: 'This alert can be closed by clicking the X button.',
    closable: true,
  },
};

export const LongContent: Story = {
  args: {
    title: 'Detailed Information',
    children:
      'This is a longer message that might contain multiple lines of text. It demonstrates how the alert component handles more complex content and ensures proper readability for users.',
  },
};
