import type { Meta, StoryObj } from '@storybook/preact';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Feedback/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Dialog component for displaying confirmation or action dialogs.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    title: {
      control: 'text',
      description: 'The title of the dialog',
    },
    message: {
      control: 'text',
      description: 'The message content of the dialog',
    },
    variant: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error', 'confirm'],
      description: 'The visual style of the dialog',
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button',
    },
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button',
    },
    onConfirm: {
      action: 'onConfirm',
      description: 'Function called when confirm is clicked',
    },
    onCancel: {
      action: 'onCancel',
      description: 'Function called when cancel is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Info: Story = {
  args: {
    open: true,
    title: 'Information',
    message: 'This is an informational dialog to notify you about something.',
    variant: 'info',
    confirmText: 'OK',
  },
};

export const Warning: Story = {
  args: {
    open: true,
    title: 'Warning',
    message: 'Are you sure you want to proceed? This action cannot be undone.',
    variant: 'warning',
    confirmText: 'Proceed',
    cancelText: 'Cancel',
  },
};

export const ErrorDialog: Story = {
  args: {
    open: true,
    title: 'Error',
    message:
      'An error occurred while processing your request. Please try again.',
    variant: 'error',
    confirmText: 'Try Again',
    cancelText: 'Cancel',
  },
};

export const Confirm: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
    message: 'Do you want to delete this item? This action cannot be undone.',
    variant: 'confirm',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
};

export const SimpleConfirm: Story = {
  args: {
    open: true,
    title: 'Save Changes',
    message: 'Do you want to save your changes before leaving?',
    variant: 'confirm',
    confirmText: 'Save',
    cancelText: "Don't Save",
  },
};
