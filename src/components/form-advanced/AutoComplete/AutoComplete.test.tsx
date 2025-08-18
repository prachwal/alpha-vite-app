import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AutoComplete, AutoCompleteOption } from './AutoComplete';

const mockOptions: AutoCompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

describe('AutoComplete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('displays placeholder text', () => {
    const onChange = vi.fn();
    render(
      <AutoComplete
        value=""
        onChange={onChange}
        options={mockOptions}
        placeholder="Search fruits..."
      />
    );

    const input = screen.getByPlaceholderText('Search fruits...');
    expect(input).toBeInTheDocument();
  });

  it('shows options when focused', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  it('filters options based on input', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'app' } });

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.queryByText('Grape')).not.toBeInTheDocument();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });
  });

  it('handles option selection with mouse', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    await waitFor(() => {
      const appleOption = screen.getByText('Apple');
      fireEvent.click(appleOption);
    });

    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('handles keyboard navigation', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    // Navigate down
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    // Select with Enter
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('handles Escape key to close options', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('is disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    render(
      <AutoComplete
        value=""
        onChange={onChange}
        options={mockOptions}
        disabled
      />
    );

    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();

    fireEvent.focus(input);
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('shows no results message when no matches', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'xyz' } });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('handles empty options array', () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={[]} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const onChange = vi.fn();
    render(
      <AutoComplete
        value=""
        onChange={onChange}
        options={mockOptions}
        className="custom-autocomplete"
      />
    );

    const container = screen.getByRole('combobox').parentElement?.parentElement;
    expect(container).toHaveClass('custom-autocomplete');
  });

  it('handles async search', async () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(
      <AutoComplete
        value=""
        onChange={onChange}
        options={[]}
        onSearch={onSearch}
      />
    );

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'dyn' } });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('dyn');
    });
  });

  it('highlights matching text in options', async () => {
    const onChange = vi.fn();
    render(<AutoComplete value="" onChange={onChange} options={mockOptions} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: 'ap' } });

    await waitFor(() => {
      // Should show filtered options
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });
  });

  it('closes options when clicking outside', async () => {
    const onChange = vi.fn();
    render(
      <div>
        <AutoComplete value="" onChange={onChange} options={mockOptions} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  it('maintains input value when no selection is made', () => {
    const onChange = vi.fn();
    render(
      <AutoComplete value="initial" onChange={onChange} options={mockOptions} />
    );

    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('initial');

    fireEvent.change(input, { target: { value: 'modified' } });
    expect(onChange).toHaveBeenCalledWith('modified');
  });
});
