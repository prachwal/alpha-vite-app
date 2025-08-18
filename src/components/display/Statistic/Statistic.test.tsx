import { render } from "@testing-library/preact";
import { Statistic } from "./Statistic";

describe("Statistic Component", () => {
  it("renders basic statistic", () => {
    const { getByText } = render(<Statistic value={123} />);
    expect(getByText("123")).toBeInTheDocument();
  });

  it("renders with title", () => {
    const { getByText } = render(<Statistic title="Total Users" value={123} />);
    expect(getByText("Total Users")).toBeInTheDocument();
    expect(getByText("123")).toBeInTheDocument();
  });

  it("renders with prefix and suffix", () => {
    const { getByText } = render(
      <Statistic prefix="$" suffix="USD" value={123.45} />
    );
    expect(getByText("$123.45USD")).toBeInTheDocument();
  });

  it("formats number with precision", () => {
    const { getByText } = render(<Statistic value={123.4567} precision={2} />);
    expect(getByText("123.46")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    const { container } = render(<Statistic value={123} loading={true} />);
    const loadingElements = container.querySelectorAll(".animate-pulse");
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it("renders string value", () => {
    const { getByText } = render(<Statistic value="Active" />);
    expect(getByText("Active")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Statistic value={123} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies custom valueClassName", () => {
    const { getByText } = render(
      <Statistic value={123} valueClassName="value-class" />
    );
    expect(getByText("123")).toHaveClass("value-class");
  });

  it("applies custom titleClassName", () => {
    const { getByText } = render(
      <Statistic title="Test" value={123} titleClassName="title-class" />
    );
    expect(getByText("Test")).toHaveClass("title-class");
  });

  it("renders children", () => {
    const { getByText } = render(
      <Statistic value={123}>
        <div>Additional content</div>
      </Statistic>
    );
    expect(getByText("Additional content")).toBeInTheDocument();
  });
});
