import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { RadioGroup } from "./Radio";

describe("RadioGroup Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders with default props", () => {
    render(
      <RadioGroup name="test" options={options} value="" onChange={vi.fn()} />
    );
    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("renders with label", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        label="Test Label"
      />
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders selected option", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value="option2"
        onChange={vi.fn()}
      />
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[1]).toBeChecked();
  });

  it("renders disabled state", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        disabled
      />
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => expect(radio).toBeDisabled());
  });

  it("handles change events", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={handleChange}
      />
    );
    const firstRadio = screen.getAllByRole("radio")[0];
    if (firstRadio) {
      await user.click(firstRadio);
      expect(handleChange).toHaveBeenCalledWith("option1");
    }
  });

  it("renders with helper text", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        helperText="Helper text"
      />
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        className="custom-class"
      />
    );
    const container = screen.getByRole("radiogroup").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("renders required indicator", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        label="Required Field"
        required
      />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders with horizontal layout", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        layout="horizontal"
      />
    );
    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toHaveClass("flex", "flex-wrap");
  });

  it("renders with grid layout", () => {
    render(
      <RadioGroup
        name="test"
        options={options}
        value=""
        onChange={vi.fn()}
        layout="grid"
        gridColumns={3}
      />
    );
    const radiogroup = screen.getByRole("radiogroup");
    expect(radiogroup).toHaveClass("grid");
  });
});
