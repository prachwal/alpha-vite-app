import type { Meta, StoryObj } from "@storybook/preact";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip component for displaying helpful information on hover or focus.",
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "The content to display in the tooltip",
    },
    placement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
      description: "Where to position the tooltip relative to the trigger",
    },
    trigger: {
      control: { type: "select" },
      options: ["hover", "focus", "click"],
      description: "How to trigger the tooltip",
    },
    delay: {
      control: "number",
      description: "Delay before showing the tooltip (in ms)",
    },
    children: {
      control: "text",
      description: "The element that triggers the tooltip",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    placement: "top",
    children: "Hover me",
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip positioned at the bottom",
    placement: "bottom",
    children: "Hover for bottom tooltip",
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip positioned to the left",
    placement: "left",
    children: "Hover for left tooltip",
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip positioned to the right",
    placement: "right",
    children: "Hover for right tooltip",
  },
};

export const ClickTrigger: Story = {
  args: {
    content: "This tooltip appears on click",
    trigger: "click",
    placement: "top",
    children: "Click me",
  },
};

export const FocusTrigger: Story = {
  args: {
    content: "This tooltip appears on focus",
    trigger: "focus",
    placement: "top",
    children: "Focus me (use Tab)",
  },
};

export const WithDelay: Story = {
  args: {
    content: "This tooltip has a 500ms delay",
    delay: 500,
    placement: "top",
    children: "Hover me (with delay)",
  },
};
