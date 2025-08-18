import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { Stack } from "./Stack";

describe("Stack Component", () => {
  it("renders with default props", () => {
    render(
      <Stack>
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toBeInTheDocument();
    expect(stack).toHaveClass("flex", "flex-col", "gap-4", "items-stretch");
  });

  it("renders with row direction", () => {
    render(
      <Stack direction="row">
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("flex-row");
  });

  it("applies correct spacing classes", () => {
    const { rerender } = render(
      <Stack spacing="xs">
        <div>Child</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("gap-1");

    rerender(
      <Stack spacing="lg">
        <div>Child</div>
      </Stack>
    );
    expect(stack).toHaveClass("gap-6");
  });

  it("applies correct alignment classes", () => {
    const { rerender } = render(
      <Stack align="center">
        <div>Child</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("items-center");

    rerender(
      <Stack align="end">
        <div>Child</div>
      </Stack>
    );
    expect(stack).toHaveClass("items-end");
  });

  it("applies correct justify classes", () => {
    const { rerender } = render(
      <Stack justify="center">
        <div>Child</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("justify-center");

    rerender(
      <Stack justify="between">
        <div>Child</div>
      </Stack>
    );
    expect(stack).toHaveClass("justify-between");
  });

  it("applies wrap class when wrap is true", () => {
    render(
      <Stack wrap={true}>
        <div>Child</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("flex-wrap");
  });

  it("applies custom className", () => {
    render(
      <Stack className="custom-class">
        <div>Child</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("custom-class");
  });

  it("renders with divider between children", () => {
    const divider = <div data-testid="divider">|</div>;
    render(
      <Stack divider={divider}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Stack>
    );

    const dividers = screen.getAllByTestId("divider");
    expect(dividers).toHaveLength(2);
  });

  it("applies responsive classes", () => {
    render(
      <Stack
        responsive={{
          sm: { direction: "row", spacing: "sm" },
          md: { align: "center" },
        }}
      >
        <div>Child</div>
      </Stack>
    );
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("sm:flex-row", "sm:gap-2", "md:items-center");
  });

  it("handles single child", () => {
    render(
      <Stack>
        <div>Single Child</div>
      </Stack>
    );
    const child = screen.getByText("Single Child");
    expect(child).toBeInTheDocument();
  });
});
