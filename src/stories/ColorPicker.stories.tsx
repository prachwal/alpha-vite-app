import { useState } from "preact/hooks";
import { ColorPicker } from "../components/form-advanced";

export default {
  title: "Design System/Advanced Form/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "color" },
    onChange: { action: "onChange" },
    format: {
      control: "select",
      options: ["hex", "rgb", "hsl"],
    },
    showAlpha: { control: "boolean" },
    disabled: { control: "boolean" },
    presets: { control: "object" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    value: "#1890ff",
    onChange: () => {},
  },
};

export const WithAlpha = {
  args: {
    value: "#1890ff80",
    onChange: () => {},
    showAlpha: true,
  },
};

export const RGB_Format = {
  args: {
    value: "#ff4d4f",
    onChange: () => {},
    format: "rgb",
  },
};

export const HSL_Format = {
  args: {
    value: "#52c41a",
    onChange: () => {},
    format: "hsl",
  },
};

export const With_Presets = {
  args: {
    value: "#1890ff",
    onChange: () => {},
    presets: [
      "#1890ff",
      "#52c41a",
      "#fa8c16",
      "#eb2f96",
      "#722ed1",
      "#13c2c2",
      "#fa541c",
      "#f5222d",
    ],
  },
};

export const Disabled = {
  args: {
    value: "#1890ff",
    onChange: () => {},
    disabled: true,
  },
};

export const Interactive_Demo = {
  render: () => {
    const [bgColor, setBgColor] = useState("#f0f0f0");
    const [textColor, setTextColor] = useState("#333333");
    const [accentColor, setAccentColor] = useState("#1890ff");

    return (
      <div className="space-y-6 p-4">
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            borderColor: accentColor,
          }}
        >
          <h3 className="text-lg font-semibold mb-4">Color Theme Preview</h3>
          <p className="mb-4">
            This text demonstrates how your selected colors work together.
          </p>
          <button
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: accentColor,
              color: "#ffffff",
            }}
          >
            Accent Button
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Background Color</div>
            <ColorPicker value={bgColor} onChange={setBgColor} format="hex" />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Text Color</div>
            <ColorPicker
              value={textColor}
              onChange={setTextColor}
              format="hex"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Accent Color</div>
            <ColorPicker
              value={accentColor}
              onChange={setAccentColor}
              format="hex"
              presets={[
                "#1890ff",
                "#52c41a",
                "#fa8c16",
                "#eb2f96",
                "#722ed1",
                "#13c2c2",
                "#fa541c",
                "#f5222d",
              ]}
            />
          </div>
        </div>
      </div>
    );
  },
};
