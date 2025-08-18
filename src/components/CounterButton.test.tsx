/**
 * @fileoverview Tests for CounterButton component
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { CounterButton } from './CounterButton';
import { count } from './Counter';

// Mock the Counter module
vi.mock('./Counter', () => ({
  count: {
    value: 0,
  },
}));

describe('CounterButton component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    count.value = 0;
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render button with initial count', () => {
    render(<CounterButton />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render button with custom count value', () => {
    count.value = 5;
    render(<CounterButton />);

    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('should increment count when clicked', () => {
    const initialValue = 0;
    count.value = initialValue;

    render(<CounterButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(count.value).toBe(1);
  });

  it('should increment count multiple times', () => {
    count.value = 0;

    render(<CounterButton />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(count.value).toBe(1);

    fireEvent.click(button);
    expect(count.value).toBe(2);

    fireEvent.click(button);
    expect(count.value).toBe(3);
  });

  it('should have correct CSS classes', () => {
    render(<CounterButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('hover:bg-primary-hover');
    expect(button).toHaveClass('transition-colors');
  });

  it('should render with large count values', () => {
    count.value = 999;
    render(<CounterButton />);

    expect(screen.getByText('Count: 999')).toBeInTheDocument();
  });

  it('should render with negative count values', () => {
    count.value = -5;
    render(<CounterButton />);

    expect(screen.getByText('Count: -5')).toBeInTheDocument();
  });

  it('should handle zero count correctly', () => {
    count.value = 0;
    render(<CounterButton />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
