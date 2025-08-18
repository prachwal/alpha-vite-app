import { useState } from "preact/hooks";
import { Slider, RangeSlider } from "../components/form-advanced";

export default {
  title: "Design System/Advanced Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    onChange: { action: "onChange" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    vertical: { control: "boolean" },
    tooltip: { control: "boolean" },
    included: { control: "boolean" },
    marks: { control: "object" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    value: 50,
    onChange: () => {},
    min: 0,
    max: 100,
    step: 1,
  },
};

export const WithTooltip = {
  args: {
    value: 75,
    onChange: () => {},
    tooltip: true,
  },
};

export const WithMarks = {
  args: {
    value: 50,
    onChange: () => {},
    marks: { 0: "0°", 25: "25°", 50: "50°", 75: "75°", 100: "100°" },
  },
};

export const Disabled = {
  args: {
    value: 30,
    onChange: () => {},
    disabled: true,
  },
};

export const Range_Slider = {
  render: () => {
    const [value, setValue] = useState<readonly [number, number]>([25, 75]);

    return (
      <div className="p-4">
        <h4 className="font-medium mb-4">
          Range: {value[0]} - {value[1]}
        </h4>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={5}
          tooltip
        />
      </div>
    );
  },
};

export const Interactive_Demo = {
  render: () => {
    const [temp, setTemp] = useState(22);
    const [volume, setVolume] = useState(50);
    const [range, setRange] = useState<readonly [number, number]>([300, 700]);

    return (
      <div className="space-y-8 p-4">
        <div className="border rounded p-4">
          <h4 className="font-medium mb-2">Temperature: {temp}°C</h4>
          <Slider
            value={temp}
            onChange={setTemp}
            min={10}
            max={35}
            step={0.5}
            tooltip
            tooltipFormatter={(val) => `${val}°C`}
            marks={{ 10: "10°", 22: "Room", 35: "35°" }}
          />
        </div>

        <div className="border rounded p-4">
          <h4 className="font-medium mb-2">Volume: {volume}%</h4>
          <Slider
            value={volume}
            onChange={setVolume}
            min={0}
            max={100}
            tooltip
            tooltipFormatter={(val) => `${val}%`}
            marks={{ 0: "🔇", 50: "🔉", 100: "🔊" }}
          />
        </div>

        <div className="border rounded p-4">
          <h4 className="font-medium mb-2">
            Price Range: ${range[0]} - ${range[1]}
          </h4>
          <RangeSlider
            value={range}
            onChange={setRange}
            min={0}
            max={1000}
            step={50}
            tooltip
            tooltipFormatter={(val) => `$${val}`}
          />
        </div>
      </div>
    );
  },
};
