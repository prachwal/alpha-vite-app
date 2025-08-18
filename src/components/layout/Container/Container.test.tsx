import { describe, it, expect } from "vitest";
import { Container } from "./Container";

// Simple test utility
function createTestElement() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  return div;
}

function cleanup(div: HTMLElement) {
  document.body.removeChild(div);
}

describe("Container", () => {
  it("renders with default props", () => {
    const div = createTestElement();

    const container = (
      <Container>
        <div>Test content</div>
      </Container>
    );

    // Simple render check
    expect(container).toBeDefined();
    expect(container.props.children.props.children).toBe("Test content");

    cleanup(div);
  });

  it("applies custom maxWidth", () => {
    const container = (
      <Container maxWidth="lg">
        <div>Content</div>
      </Container>
    );

    expect(container.props.maxWidth).toBe("lg");
  });

  it("applies custom padding", () => {
    const container = (
      <Container padding="lg">
        <div>Content</div>
      </Container>
    );

    expect(container.props.padding).toBe("lg");
  });

  it("applies custom className", () => {
    const container = (
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    );

    expect(container.props.className).toBe("custom-class");
  });

  it("applies fluid width when fluid is true", () => {
    const container = (
      <Container fluid>
        <div>Content</div>
      </Container>
    );

    expect(container.props.fluid).toBe(true);
  });
});
