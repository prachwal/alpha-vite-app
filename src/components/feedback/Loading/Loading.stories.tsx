import type { Meta, StoryObj } from '@storybook/preact';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: 'Loading component for displaying loading states to users.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the loading indicator',
    },
    variant: {
      control: { type: 'select' },
      options: ['spinner', 'pulse', 'dots'],
      description: 'The visual style of the loading indicator',
    },
    text: {
      control: 'text',
      description: 'Optional text to display with the loading indicator',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Whether to display as fullscreen loading overlay',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const SpinnerSmall: Story = {
  args: {
    size: 'small',
    variant: 'spinner',
  },
};

export const SpinnerMedium: Story = {
  args: {
    size: 'medium',
    variant: 'spinner',
  },
};

export const SpinnerLarge: Story = {
  args: {
    size: 'large',
    variant: 'spinner',
  },
};

export const Pulse: Story = {
  args: {
    size: 'medium',
    variant: 'pulse',
  },
};

export const Dots: Story = {
  args: {
    size: 'medium',
    variant: 'dots',
  },
};

export const WithText: Story = {
  args: {
    size: 'medium',
    variant: 'spinner',
    text: 'Loading...',
  },
};

export const Fullscreen: Story = {
  args: {
    size: 'large',
    variant: 'spinner',
    text: 'Please wait...',
    fullscreen: true,
  },
};
