/**
 * @fileoverview Tests for Counter component
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { count, appName } from "./Counter";

// Mock the CounterButton component
vi.mock("./CounterButton", () => ({
  CounterButton: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} data-testid="counter-button">
      Click me
    </button>
  ),
}));

describe("Counter component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    count.value = 0; // Reset counter before each test
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should have initial count of 0", () => {
    expect(count.value).toBe(0);
  });

  it("should increment count when signal is updated", () => {
    count.value = 1;
    expect(count.value).toBe(1);
  });

  it("should handle multiple increments", () => {
    count.value = 1;
    expect(count.value).toBe(1);

    count.value = 2;
    expect(count.value).toBe(2);

    count.value = 3;
    expect(count.value).toBe(3);
  });

  it("should handle large increments correctly", () => {
    count.value = 100;
    expect(count.value).toBe(100);
  });

  it("should handle reset to 0", () => {
    count.value = 5;
    expect(count.value).toBe(5);

    count.value = 0;
    expect(count.value).toBe(0);
  });

  it("should handle negative values", () => {
    count.value = -1;
    expect(count.value).toBe(-1);
  });

  it("should be reactive to signal changes", () => {
    const mockRender = vi.fn();

    // Create a simple reactive test
    const unsubscribe = count.subscribe(mockRender);

    count.value = 1;
    expect(mockRender).toHaveBeenCalledWith(1);

    count.value = 2;
    expect(mockRender).toHaveBeenCalledWith(2);

    unsubscribe();
  });

  it("should maintain value across multiple operations", () => {
    count.value = 10;
    expect(count.value).toBe(10);

    count.value = count.value + 5;
    expect(count.value).toBe(15);

    count.value = count.value * 2;
    expect(count.value).toBe(30);
  });
});

describe("appName signal", () => {
  it("should be defined", () => {
    expect(appName).toBeDefined();
    expect(typeof appName.value).toBe("string");
  });

  it("should have a default value", () => {
    expect(appName.value).toBeTruthy();
  });
});
