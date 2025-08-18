/**
 * @fileoverview Tests for ApiTester component
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { ApiTester } from './ApiTester';
import { apiState } from '@services/ApiClient';

// Mock the ApiClient service
vi.mock('@services/ApiClient', () => ({
  apiClient: {
    getHealth: vi.fn(),
    getHello: vi.fn(),
    getTest: vi.fn(),
    getInfo: vi.fn(),
  },
  apiState: {
    value: {},
  },
}));

describe('ApiTester component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    apiState.value = {};
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render API Tester title', () => {
    render(<ApiTester />);

    expect(screen.getByText('API Tester')).toBeInTheDocument();
  });

  it('should render endpoint select with all options', () => {
    render(<ApiTester />);

    const select = screen.getByLabelText('Select Endpoint:');
    expect(select).toBeInTheDocument();

    const options = select.querySelectorAll('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('Health Check');
    expect(options[1]).toHaveTextContent('Hello');
    expect(options[2]).toHaveTextContent('Test');
    expect(options[3]).toHaveTextContent('Info');
  });

  it('should render Test API button', () => {
    render(<ApiTester />);

    expect(screen.getByText('Test API')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show custom name input only for /api/hello endpoint', () => {
    render(<ApiTester />);

    // Initially, custom name input should not be visible
    expect(screen.queryByLabelText('Name (optional):')).not.toBeInTheDocument();

    // Change to /api/hello endpoint
    const select = screen.getByLabelText('Select Endpoint:');
    fireEvent.change(select, { target: { value: '/api/hello' } });

    // Now custom name input should be visible
    expect(screen.getByLabelText('Name (optional):')).toBeInTheDocument();
  });

  it('should display error message when API call fails', () => {
    apiState.value = {
      '/api/health': {
        data: null,
        loading: false,
        error: 'Network error',
      },
    };
    render(<ApiTester />);
    // Wymuś rerender sygnału przez zmianę endpointu
    const select = screen.getByLabelText('Select Endpoint:');
    fireEvent.change(select, { target: { value: '/api/health' } });
    // Szukaj elementu, który zawiera fragment "Network error"
    expect(
      screen.getByText((content) => content.includes('Network error'))
    ).toBeInTheDocument();
  });

  it('should display response data when API call succeeds', () => {
    const mockResponse = { status: 'ok', timestamp: '2024-01-01' };
    apiState.value = {
      '/api/health': {
        data: mockResponse,
        loading: false,
        error: null,
      },
    };
    render(<ApiTester />);
    // Wymuś rerender sygnału przez zmianę endpointu
    const select = screen.getByLabelText('Select Endpoint:');
    fireEvent.change(select, { target: { value: '/api/health' } });
    expect(
      screen.getByText((content) => content.includes('Response:'))
    ).toBeInTheDocument();
    // Sprawdź czy JSON jest w container.textContent
    const { container } = render(<ApiTester />);
    fireEvent.change(screen.getByLabelText('Select Endpoint:'), {
      target: { value: '/api/health' },
    });
    expect(container.textContent).toContain('"status": "ok"');
    expect(container.textContent).toContain('"timestamp": "2024-01-01"');
  });

  it('should disable test button when loading', () => {
    apiState.value = {
      '/api/health': {
        data: null,
        loading: true,
        error: null,
      },
    };
    render(<ApiTester />);
    // Wymuś rerender sygnału przez zmianę endpointu
    const select = screen.getByLabelText('Select Endpoint:');
    fireEvent.change(select, { target: { value: '/api/health' } });
    const testBtn = screen.getByRole('button');
    expect(testBtn).toBeDisabled();
    expect(testBtn).toHaveTextContent('Testing...');
  });

  it('should clear custom name when switching from /api/hello', () => {
    render(<ApiTester />);

    // Change to /api/hello endpoint
    const select = screen.getByLabelText('Select Endpoint:');
    fireEvent.change(select, { target: { value: '/api/hello' } });

    // Enter custom name
    const nameInput = screen.getByLabelText('Name (optional):');
    fireEvent.change(nameInput, { target: { value: 'John' } });

    // Change back to /api/health
    fireEvent.change(select, { target: { value: '/api/health' } });

    // Custom name input should be hidden
    expect(screen.queryByLabelText('Name (optional):')).not.toBeInTheDocument();
  });

  it('should handle endpoint selection correctly', () => {
    render(<ApiTester />);

    const select = screen.getByLabelText('Select Endpoint:');

    // Test each endpoint
    fireEvent.change(select, { target: { value: '/api/hello' } });
    expect(screen.getByLabelText('Name (optional):')).toBeInTheDocument();

    fireEvent.change(select, { target: { value: '/api/test' } });
    expect(screen.queryByLabelText('Name (optional):')).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: '/api/info' } });
    expect(screen.queryByLabelText('Name (optional):')).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: '/api/health' } });
    expect(screen.queryByLabelText('Name (optional):')).not.toBeInTheDocument();
  });

  it('should render all UI elements correctly', () => {
    render(<ApiTester />);

    expect(screen.getByText('API Tester')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Endpoint:')).toBeInTheDocument();
    expect(screen.getByText('Test API')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle empty state correctly', () => {
    render(<ApiTester />);

    // Should not show error or response initially
    expect(screen.queryByText('Error:')).not.toBeInTheDocument();
    expect(screen.queryByText('Response:')).not.toBeInTheDocument();
  });
});
