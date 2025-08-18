import { Stack } from "./Stack";

export default {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "text" },
    spacing: { control: "text" },
    align: { control: "text" },
    justify: { control: "text" },
    wrap: { control: "boolean" },
    className: { control: "text" },
  },
};

export const Default = {};
