import type { Meta, StoryObj } from "@storybook/preact";
import {
  Switch,
  type SwitchProps,
} from "../components/form-advanced/Switch/Switch";
import { useState } from "preact/hooks";

const meta: Meta<SwitchProps> = {
  title: "Components/Form Advanced/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          "Switch component for boolean input with visual toggle state. Provides an accessible alternative to checkboxes for on/off controls.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked/on",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state for uncontrolled component",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    loading: {
      control: "boolean",
      description: "Loading state - shows spinner",
    },
    children: {
      control: "text",
      description: "Label text",
    },
    name: {
      control: "text",
      description: "HTML name attribute",
    },
    "aria-label": {
      control: "text",
      description: "ARIA label for accessibility",
    },
    onChange: { action: "changed" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<SwitchProps>;

export const Default: Story = {
  args: {
    children: "Enable notifications",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <Switch {...args} checked={checked} onChange={setChecked} />
        <p className="text-sm text-gray-600">
          Current state: {checked ? "ON" : "OFF"}
        </p>
      </div>
    );
  },
  args: {
    children: "Controlled switch",
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
    children: "Uncontrolled switch (starts checked)",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Switch {...args} size="sm" children="Small" />
        <Switch {...args} size="md" children="Medium" />
        <Switch {...args} size="lg" children="Large" />
      </div>
    </div>
  ),
  args: {
    defaultChecked: true,
  },
};

export const States: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Switch {...args} checked={false} children="Unchecked" />
      <Switch {...args} checked={true} children="Checked" />
      <Switch {...args} disabled children="Disabled" />
      <Switch {...args} loading children="Loading" />
      <Switch {...args} disabled checked children="Disabled & Checked" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    "aria-label": "Toggle feature",
  },
};

export const CustomStyling: Story = {
  args: {
    className: "p-4 bg-gray-50 dark:bg-gray-800 rounded-lg",
    children: "Custom styled switch",
    defaultChecked: true,
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setPreferences((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          User Preferences
        </h3>

        <div className="space-y-3">
          <Switch
            name="notifications"
            checked={preferences.notifications}
            onChange={handleChange("notifications")}
          >
            Push notifications
          </Switch>

          <Switch
            name="darkMode"
            checked={preferences.darkMode}
            onChange={handleChange("darkMode")}
          >
            Dark mode
          </Switch>

          <Switch
            name="autoSave"
            checked={preferences.autoSave}
            onChange={handleChange("autoSave")}
          >
            Auto-save documents
          </Switch>
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-xs">
          <pre>{JSON.stringify(preferences, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <div
          id="switch1-label"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email notifications
        </div>
        <div
          id="switch1-desc"
          className="text-xs text-gray-500 dark:text-gray-400 mb-2"
        >
          Receive email notifications when someone mentions you
        </div>
        <Switch
          aria-labelledby="switch1-label"
          aria-describedby="switch1-desc"
          defaultChecked
        />
      </div>

      <div>
        <Switch aria-label="Toggle auto-backup feature">
          Auto-backup (with aria-label)
        </Switch>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleChange = (newChecked: boolean) => {
      setLoading(true);
      // Simulate async operation
      setTimeout(() => {
        setChecked(newChecked);
        setLoading(false);
      }, 1500);
    };

    return (
      <div className="space-y-4">
        <Switch checked={checked} loading={loading} onChange={handleChange}>
          Async toggle (1.5s delay)
        </Switch>

        <Switch loading size="sm">
          Small loading
        </Switch>

        <Switch loading size="lg">
          Large loading
        </Switch>
      </div>
    );
  },
};
