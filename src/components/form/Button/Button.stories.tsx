import type { Meta, StoryObj } from "@storybook/preact";
import { Button, type ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Form/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Professional button component with multiple variants, sizes, and states.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "danger", "ghost"],
      description: "Button visual variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Button size",
    },
    fullWidth: {
      control: "boolean",
      description: "Button takes full width",
    },
    disabled: {
      control: "boolean",
      description: "Disable button",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    leftIcon: {
      control: false,
      description: "Icon on the left",
    },
    rightIcon: {
      control: false,
      description: "Icon on the right",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Button type",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
    children: {
      control: "text",
      description: "Button label",
    },
    className: {
      control: "text",
      description: "Custom class",
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button with Icon",
    rightIcon: () => <span>📧</span>,
  },
};

export const LoadingWithIcon: Story = {
  args: {
    loading: true,
    children: "Loading with Icon",
    rightIcon: () => <span>📧</span>,
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: () => <span>⭐</span>,
    rightIcon: () => <span>➡️</span>,
    children: "Button with Icons",
  },
};
