/**
 * @fileoverview Tests for Switch component
 */

import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('renders with label', () => {
      render(<Switch>Enable notifications</Switch>);
      const label = screen.getByText('Enable notifications');
      expect(label).toBeInTheDocument();
    });

    it('renders in checked state', () => {
      render(<Switch checked />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('renders in disabled state', () => {
      render(<Switch disabled>Disabled switch</Switch>);
      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Disabled switch');
      expect(switchElement).toBeDisabled();
      expect(label).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('renders in loading state', () => {
      render(<Switch loading />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('cursor-wait');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Switch size="sm" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('w-8', 'h-4');
    });

    it('renders medium size (default)', () => {
      render(<Switch size="md" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('w-10', 'h-5');
    });

    it('renders large size', () => {
      render(<Switch size="lg" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('w-12', 'h-6');
    });
  });

  describe('Interaction', () => {
    it('toggles state when clicked', () => {
      const onChange = vi.fn();
      render(<Switch onChange={onChange} />);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(switchElement);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles state with keyboard (Space)', () => {
      const onChange = vi.fn();
      render(<Switch onChange={onChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.keyDown(switchElement, { key: ' ' });
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles state with keyboard (Enter)', () => {
      const onChange = vi.fn();
      render(<Switch onChange={onChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.keyDown(switchElement, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle when disabled', () => {
      const onChange = vi.fn();
      render(<Switch disabled onChange={onChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle when loading', () => {
      const onChange = vi.fn();
      render(<Switch loading onChange={onChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clicking label toggles switch', () => {
      const onChange = vi.fn();
      render(<Switch onChange={onChange}>Click me</Switch>);

      const label = screen.getByText('Click me');
      fireEvent.click(label);
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component', () => {
      render(<Switch defaultChecked />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      fireEvent.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('works as controlled component', () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <Switch checked={false} onChange={onChange} />
      );

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(switchElement);
      expect(onChange).toHaveBeenCalledWith(true);

      // State doesn't change until parent updates props
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      // Simulate parent updating props
      rerender(<Switch checked={true} onChange={onChange} />);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Switch aria-label="Toggle feature" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-label', 'Toggle feature');
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <div id="switch-label">Feature toggle</div>
          <Switch aria-labelledby="switch-label" />
        </>
      );
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-labelledby', 'switch-label');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <div id="switch-desc">This enables the feature</div>
          <Switch aria-describedby="switch-desc" />
        </>
      );
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-describedby', 'switch-desc');
    });

    it('has focus styles', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500'
      );
    });
  });

  describe('Form Integration', () => {
    it('supports name attribute', () => {
      render(<Switch name="notifications" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('name', 'notifications');
    });

    it('supports id attribute', () => {
      render(<Switch id="my-switch" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('id', 'my-switch');
    });

    it('generates id when not provided', () => {
      render(<Switch>Test switch</Switch>);
      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Test switch');

      const switchId = switchElement.getAttribute('id');
      expect(switchId).toBeTruthy();
      expect(label).toHaveAttribute('for', switchId);
    });
  });

  describe('Visual States', () => {
    it('shows loading spinner when loading', () => {
      render(<Switch loading />);
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('applies correct colors when checked', () => {
      render(<Switch checked />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('bg-blue-600', 'dark:bg-blue-500');
    });

    it('applies correct colors when unchecked', () => {
      render(<Switch checked={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveClass('bg-gray-200', 'dark:bg-gray-700');
    });

    it('applies custom className', () => {
      render(<Switch className="custom-switch" />);
      const container = document.querySelector('.custom-switch');
      expect(container).toBeInTheDocument();
    });
  });
});
