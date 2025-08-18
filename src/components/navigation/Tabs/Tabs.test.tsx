import { render, screen, fireEvent } from '@testing-library/preact';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Tabs, TabItem } from './Tabs';

describe('Tabs Component', () => {
  const mockTabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true },
  ];

  const defaultProps = {
    tabs: mockTabs,
    activeTab: 'tab1',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all tabs correctly', () => {
    render(<Tabs {...defaultProps} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('marks active tab correctly', () => {
    render(<Tabs {...defaultProps} />);

    const activeTab = screen.getByText('Tab 1').parentElement;
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    expect(activeTab).toHaveAttribute('tabIndex', '0');
  });

  it('marks inactive tabs correctly', () => {
    render(<Tabs {...defaultProps} />);

    const inactiveTab = screen.getByText('Tab 2').parentElement;
    expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
    expect(inactiveTab).toHaveAttribute('tabIndex', '-1');
  });

  it('marks disabled tabs correctly', () => {
    render(<Tabs {...defaultProps} />);

    const disabledTab = screen.getByText('Tab 3').parentElement;
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    expect(disabledTab).toHaveAttribute('tabIndex', '-1');
  });

  it('calls onChange when clicking active tab', () => {
    render(<Tabs {...defaultProps} />);

    const tab2 = screen.getByText('Tab 2').parentElement;
    fireEvent.click(tab2!);

    expect(defaultProps.onChange).toHaveBeenCalledWith('tab2');
  });

  it('does not call onChange when clicking disabled tab', () => {
    render(<Tabs {...defaultProps} />);

    const disabledTab = screen.getByText('Tab 3').parentElement;
    fireEvent.click(disabledTab!);

    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Tabs {...defaultProps} variant="pills" />);

    const tabsContainer = screen.getByRole('tablist');
    expect(tabsContainer).toHaveClass('flex');

    rerender(<Tabs {...defaultProps} variant="underline" />);
    expect(tabsContainer).toHaveClass('flex');
  });

  it('applies correct size classes', () => {
    render(<Tabs {...defaultProps} size="lg" />);

    const tab = screen.getByText('Tab 1').parentElement;
    expect(tab).toHaveClass('text-lg');
  });

  it('handles keyboard navigation', () => {
    render(<Tabs {...defaultProps} />);

    const tab1 = screen.getByText('Tab 1').parentElement as HTMLButtonElement;
    tab1.focus();

    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(
      screen.getByText('Tab 2').parentElement
    );
  });

  it('handles fullWidth prop', () => {
    render(<Tabs {...defaultProps} fullWidth />);

    const tabsContainer = screen.getByRole('tablist');
    expect(tabsContainer).toHaveClass('w-full');
  });

  it('handles centered prop', () => {
    render(<Tabs {...defaultProps} centered />);

    const tabsContainer = screen.getByRole('tablist');
    expect(tabsContainer).toHaveClass('justify-center');
  });

  it('handles vertical orientation', () => {
    const { container } = render(
      <Tabs {...defaultProps} orientation="vertical" />
    );
    const tabsContainer = container.querySelector('[role="tablist"]');
    expect(tabsContainer).toHaveClass('flex-col');
  });

  it('handles custom className', () => {
    render(<Tabs {...defaultProps} className="custom-tabs" />);

    const tabsContainer = screen.getByRole('tablist');
    expect(tabsContainer).toHaveClass('custom-tabs');
  });
});
