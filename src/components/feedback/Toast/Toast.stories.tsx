import type { Meta, StoryObj } from "@storybook/preact";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: "Toast component for displaying brief messages to users.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
      description: "The visual style of the toast",
    },
    title: {
      control: "text",
      description: "The title of the toast",
    },
    description: {
      control: "text",
      description: "The description of the toast",
    },
    duration: {
      control: "number",
      description: "How long the toast should be visible (in ms)",
    },
    persistent: {
      control: "boolean",
      description: "Whether the toast should persist until manually closed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "This is an informational toast message.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    description: "Your action was completed successfully!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please be careful with this action.",
  },
};

export const ErrorToast: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const Persistent: Story = {
  args: {
    variant: "info",
    title: "Persistent Toast",
    description: "This toast will not auto-dismiss.",
    persistent: true,
  },
};
