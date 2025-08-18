import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/preact";
import { List } from "./List";

describe("List Component", () => {
  const mockItems = [
    { id: 1, title: "Item 1", description: "Description 1" },
    { id: 2, title: "Item 2", description: "Description 2" },
  ];

  it("renders list with items", () => {
    render(
      <List
        items={mockItems}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            title={item.title}
            description={item.description}
          />
        )}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<List loading loadingRows={2} />);

    const skeletons = screen.getAllByRole("status");
    expect(skeletons).toHaveLength(2);
  });

  it("renders with header and footer", () => {
    render(
      <List
        header={<div data-testid="header">Header</div>}
        footer={<div data-testid="footer">Footer</div>}
      />
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("applies bordered style", () => {
    const { container } = render(<List bordered />);
    expect(container.firstChild).toHaveClass("border");
  });

  it("applies size classes", () => {
    const { container } = render(<List size="lg" />);
    expect(container.firstChild).toHaveClass("text-lg");
  });
});
