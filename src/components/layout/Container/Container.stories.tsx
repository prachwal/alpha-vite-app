import { Container, ContainerProps } from "./Container";

export default {
  title: "Layout/Container",
  component: Container,
  argTypes: {
    maxWidth: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl"],
    },
    centered: {
      control: { type: "boolean" },
    },
    fluid: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args: ContainerProps) => (
  <Container {...args}>
    <div className="bg-primary/10 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Container Content</h3>
      <p className="text-text-secondary">
        This content is inside the container. The container controls the maximum
        width and padding.
      </p>
    </div>
  </Container>
);

export const Default = Template.bind({});
(Default as any).args = {
  maxWidth: "lg",
  padding: "md",
  centered: true,
  fluid: false,
};

export const Small = Template.bind({});
(Small as any).args = {
  maxWidth: "sm",
  padding: "sm",
};

export const Large = Template.bind({});
(Large as any).args = {
  maxWidth: "xl",
  padding: "lg",
};

export const Fluid = Template.bind({});
(Fluid as any).args = {
  fluid: true,
  padding: "md",
};

export const NoPadding = Template.bind({});
(NoPadding as any).args = {
  padding: "none",
};

export const NotCentered = Template.bind({});
(NotCentered as any).args = {
  centered: false,
};
