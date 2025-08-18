/**
 * @fileoverview Tests for AppTitle component
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { AppTitle } from './AppTitle';
import { appName } from './Counter';

// Mock the Counter module
vi.mock('./Counter', () => ({
  appName: {
    value: 'Test App',
  },
}));

describe('AppTitle component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    appName.value = 'Test App';
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render app title with default value', () => {
    render(<AppTitle />);

    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render app title with custom value', () => {
    appName.value = 'My Custom App';
    render(<AppTitle />);

    expect(screen.getByText('My Custom App')).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    render(<AppTitle />);

    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-4xl');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-center');
    expect(heading).toHaveClass('text-text-primary');
  });

  it('should be an h1 element', () => {
    render(<AppTitle />);

    const heading = screen.getByRole('heading');
    expect(heading.tagName).toBe('H1');
  });

  it('should handle empty app name', () => {
    appName.value = '';
    render(<AppTitle />);
    // Znajdź wszystkie elementy z pustym tekstem
    const emptyNodes = screen.getAllByText('');
    // Sprawdź, czy jest H1 z pustym tekstem
    expect(emptyNodes.some((el) => el.tagName === 'H1')).toBe(true);
  });

  it('should handle long app names', () => {
    const longName =
      'This is a very long application name that should still render correctly';
    appName.value = longName;
    render(<AppTitle />);

    expect(screen.getByText(longName)).toBeInTheDocument();
  });

  it('should handle special characters in app name', () => {
    const specialName = 'App & More - 2024!';
    appName.value = specialName;
    render(<AppTitle />);

    expect(screen.getByText(specialName)).toBeInTheDocument();
  });
});
