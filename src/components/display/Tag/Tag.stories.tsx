import type { Meta, StoryObj } from "@storybook/preact";
import { useState } from "preact/hooks";
import { Tag } from "./Tag";
import { TagGroup } from "./TagGroup";

const meta: Meta<typeof Tag> = {
  title: "Components/Display/Tag",
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: "Tag component for displaying labels and categories.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "success", "warning", "error", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    closable: {
      control: { type: "boolean" },
    },
    color: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Tag",
  } as any,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-2">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

export const Closable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag closable>Closable Tag</Tag>
      <Tag variant="primary" closable>
        Primary Closable
      </Tag>
      <Tag variant="success" closable>
        Success Closable
      </Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => {
    const Icon = () => (
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    );

    return (
      <div className="flex flex-wrap gap-2">
        <Tag icon={Icon}>Email</Tag>
        <Tag variant="primary" icon={Icon}>
          Primary Email
        </Tag>
      </div>
    );
  },
};

export const CustomColor: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag color="bg-purple-100 text-purple-800">Purple Tag</Tag>
      <Tag color="bg-pink-100 text-pink-800">Pink Tag</Tag>
      <Tag color="bg-indigo-100 text-indigo-800">Indigo Tag</Tag>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag onClick={() => alert("Tag clicked!")}>Clickable Tag</Tag>
      <Tag variant="primary" onClick={() => alert("Primary tag clicked!")}>
        Clickable Primary
      </Tag>
    </div>
  ),
};

export const TagGroupExample: Story = {
  name: "Tag Group",
  render: () => {
    const [tags, setTags] = useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Preact",
    ]);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Basic Tag Group</h3>
          <TagGroup>
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Tailwind</Tag>
            <Tag>Preact</Tag>
          </TagGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Closable Tag Group</h3>
          <TagGroup>
            {tags.map((tag) => (
              <Tag
                key={tag}
                closable
                onClose={() => setTags(tags.filter((t) => t !== tag))}
              >
                {tag}
              </Tag>
            ))}
          </TagGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Different Sizes</h3>
          <div className="space-y-2">
            <TagGroup size="sm">
              <Tag>Small</Tag>
              <Tag>Tags</Tag>
            </TagGroup>
            <TagGroup size="md">
              <Tag>Medium</Tag>
              <Tag>Tags</Tag>
            </TagGroup>
            <TagGroup size="lg">
              <Tag>Large</Tag>
              <Tag>Tags</Tag>
            </TagGroup>
          </div>
        </div>
      </div>
    );
  },
};
