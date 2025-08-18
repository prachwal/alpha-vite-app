import { Button } from "./Button";

export default {
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
};

interface StoryProps {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "tertiary";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children?: string;
  icon?: preact.ComponentChildren;
}

const Template = (args: StoryProps) => (
  <Button {...args}>{args.children || "Button"}</Button>
);

export const Primary = Template({
  variant: "primary",
  children: "Primary Button",
});
export const Secondary = Template({
  variant: "secondary",
  children: "Secondary Button",
});
export const Danger = Template({
  variant: "danger",
  children: "Danger Button",
});
export const Ghost = Template({ variant: "ghost", children: "Ghost Button" });
export const Tertiary = Template({
  variant: "tertiary",
  children: "Tertiary Button",
});

export const Small = Template({ size: "sm", children: "Small Button" });
export const Medium = Template({ size: "md", children: "Medium Button" });
export const Large = Template({ size: "lg", children: "Large Button" });
export const ExtraLarge = Template({
  size: "xl",
  children: "Extra Large Button",
});

export const Disabled = Template({
  disabled: true,
  children: "Disabled Button",
});
export const Loading = Template({ loading: true, children: "Loading Button" });
export const FullWidth = Template({
  fullWidth: true,
  children: "Full Width Button",
});

export const WithIcon = Template({
  children: "Button with Icon",
  icon: <span>📧</span>,
});

export const LoadingWithIcon = Template({
  loading: true,
  children: "Loading with Icon",
  icon: <span>📧</span>,
});

// Interactive playground
export const Playground = (props: StoryProps) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicked {count} times</p>
      <Button {...props} onClick={() => setCount(count + 1)}>
        {props.children || "Click me"}
      </Button>
    </div>
  );
};

// Helper hook for playground
function useState<T>(initial: T): [T, (value: T) => void] {
  let state = initial;
  return [
    state,
    (value: T) => {
      state = value;
    },
  ];
}
