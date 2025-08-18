import type { Meta, StoryObj } from "@storybook/preact";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Feedback/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          "Modal component for displaying content in an overlay dialog.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    title: {
      control: "text",
      description: "The title of the modal",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "fullscreen"],
      description: "The size of the modal",
    },
    closable: {
      control: "boolean",
      description: "Whether the modal can be closed by the user",
    },
    onClose: {
      action: "onClose",
      description: "Function called when the modal is closed",
    },
    children: {
      control: "text",
      description: "The content of the modal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    title: "Modal Title",
    closable: true,
    children: "This is the content of the modal.",
  },
};

export const Small: Story = {
  args: {
    open: true,
    title: "Small Modal",
    size: "small",
    closable: true,
    children: "This is a small modal with limited content.",
  },
};

export const Medium: Story = {
  args: {
    open: true,
    title: "Medium Modal",
    size: "medium",
    closable: true,
    children: "This is a medium-sized modal with moderate content.",
  },
};

export const Large: Story = {
  args: {
    open: true,
    title: "Large Modal",
    size: "large",
    closable: true,
    children:
      "This is a large modal that can contain more extensive content and forms.",
  },
};

export const Fullscreen: Story = {
  args: {
    open: true,
    title: "Fullscreen Modal",
    size: "fullscreen",
    closable: true,
    children: "This is a fullscreen modal that covers the entire viewport.",
  },
};

export const NotClosable: Story = {
  args: {
    open: true,
    title: "Non-Closable Modal",
    closable: false,
    children:
      "This modal cannot be closed by the user and requires programmatic control.",
  },
};
