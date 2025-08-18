import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { CounterButton } from '../components/CounterButton';
import { count } from '../components/Counter';

describe('CounterButton Component', () => {
  beforeEach(() => {
    count.value = 0; // Reset counter before each test
  });

  it('should render with initial count value', () => {
    render(<CounterButton />);
    expect(screen.getByRole('button')).toHaveTextContent('Count: 0');
  });

  it('should increment count when clicked', () => {
    render(<CounterButton />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Count: 1');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Count: 2');
  });

  it('should have correct CSS classes', () => {
    render(<CounterButton />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(
      'bg-primary',
      'text-white',
      'rounded-lg',
      'hover:bg-primary-hover',
      'transition-colors'
    );
  });
});
