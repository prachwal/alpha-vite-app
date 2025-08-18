import { render, screen, fireEvent } from "@testing-library/preact";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to first page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to last page")).toBeInTheDocument();
  });

  it("disables first/previous buttons on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText("Go to first page")).toBeDisabled();
    expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
  });

  it("disables next/last buttons on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    expect(screen.getByLabelText("Go to next page")).toBeDisabled();
    expect(screen.getByLabelText("Go to last page")).toBeDisabled();
  });

  it("calls onPageChange when clicking page number", () => {
    render(<Pagination {...defaultProps} />);
    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when clicking next", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(10);
  });

  it("calls onPageChange when clicking previous", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const prevButton = screen.getByLabelText("Go to previous page");
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange when clicking first", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const firstButton = screen.getByLabelText("Go to first page");
    fireEvent.click(firstButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange when clicking last", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const lastButton = screen.getByLabelText("Go to last page");
    fireEvent.click(lastButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(10);
  });

  it("handles ellipsis for many pages", () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("shows correct page range", () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={10} />);
    expect(screen.getByText("5")).toHaveClass("bg-primary", "text-white");
  });

  it("handles custom className", () => {
    const { container } = render(
      <Pagination {...defaultProps} className="custom-pagination" />
    );
    expect(container.firstChild).toHaveClass("custom-pagination");
  });

  it("handles showFirstLast prop", () => {
    render(<Pagination {...defaultProps} showFirstLast={false} />);
    expect(screen.queryByLabelText("Go to first page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Go to last page")).not.toBeInTheDocument();
  });

  it("handles showPrevNext prop", () => {
    render(<Pagination {...defaultProps} showPrevNext={false} />);
    expect(
      screen.queryByLabelText("Go to previous page")
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Go to next page")).not.toBeInTheDocument();
  });

  it("handles single page", () => {
    render(<Pagination {...defaultProps} totalPages={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("handles zero pages gracefully", () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={0} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
