import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/preact";

// Setup global vi as jest for compatibility with existing tests
globalThis.jest = vi as any;

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Add custom matchers
expect.extend({
  toHaveClass(received: HTMLElement, ...expectedClasses: string[]) {
    const className = received.className || "";
    const classes = className.split(" ").filter(Boolean);

    const missingClasses = expectedClasses.filter(
      (cls) => !classes.includes(cls)
    );

    if (missingClasses.length === 0) {
      return {
        message: () =>
          `expected element not to have classes ${expectedClasses.join(", ")}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected element to have classes ${missingClasses.join(
            ", "
          )}, but it has ${classes.join(", ")}`,
        pass: false,
      };
    }
  },
});
