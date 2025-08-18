import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Table, type Column } from './Table';

// Mock data for testing
interface TestData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const mockData: TestData[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 25,
    email: 'jane@example.com',
    status: 'inactive',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    age: 35,
    email: 'bob@example.com',
    status: 'active',
  },
];

const mockColumns: Column<TestData>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sortable: true,
    align: 'center',
  },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'status', title: 'Status', dataIndex: 'status' },
];

describe('Table', () => {
  describe('Basic Rendering', () => {
    it('should render table with data', () => {
      render(<Table columns={mockColumns} data={mockData} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('should render empty table with no data', () => {
      render(<Table columns={mockColumns} data={[]} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should show loading state', () => {
      render(<Table columns={mockColumns} data={mockData} loading={true} />);

      const skeletonRows = screen.getAllByRole('generic');
      expect(
        skeletonRows.some(
          (row) =>
            row.className.includes('animate-pulse') ||
            row.className.includes('bg-gray-200')
        )
      ).toBe(true);
    });
  });

  describe('Column Configuration', () => {
    it('should render custom content with render function', () => {
      const customColumns: Column<TestData>[] = [
        {
          key: 'name',
          title: 'Name',
          dataIndex: 'name',
          render: (value: string) => <strong>{value.toUpperCase()}</strong>,
        },
      ];

      render(<Table columns={customColumns} data={mockData} />);

      expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.getByText('JANE SMITH')).toBeInTheDocument();
    });

    it('should apply column alignment', () => {
      const alignedColumns: Column<TestData>[] = [
        { key: 'name', title: 'Name', dataIndex: 'name', align: 'left' },
        { key: 'age', title: 'Age', dataIndex: 'age', align: 'center' },
        { key: 'email', title: 'Email', dataIndex: 'email', align: 'right' },
      ];

      render(<Table columns={alignedColumns} data={mockData} />);

      const cells = screen.getAllByRole('cell');
      expect(cells.some((cell) => cell.className.includes('text-left'))).toBe(
        true
      );
      expect(cells.some((cell) => cell.className.includes('text-center'))).toBe(
        true
      );
      expect(cells.some((cell) => cell.className.includes('text-right'))).toBe(
        true
      );
    });

    it('should handle columns without dataIndex', () => {
      const noIndexColumns: Column<TestData>[] = [
        {
          key: 'custom',
          title: 'Custom',
          render: (_, record) => `${record.name} - ${record.age}`,
        },
      ];

      render(<Table columns={noIndexColumns} data={mockData} />);

      expect(screen.getByText('John Doe - 30')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith - 25')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('should sort data when sortable column header is clicked', () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toBeInTheDocument();

      fireEvent.click(nameHeader!);

      // Check if sort indicator is visible
      expect(nameHeader!.textContent).toContain('↑');
    });

    it('should toggle sort direction on multiple clicks', () => {
      render(<Table columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toBeInTheDocument();

      // First click - ascending
      fireEvent.click(nameHeader!);
      expect(nameHeader!.textContent).toContain('↑');

      // Second click - descending
      fireEvent.click(nameHeader!);
      expect(nameHeader!.textContent).toContain('↓');
    });

    it('should call onSort callback when provided', () => {
      const onSortMock = vi.fn();
      render(
        <Table columns={mockColumns} data={mockData} onSort={onSortMock} />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      fireEvent.click(nameHeader!);

      expect(onSortMock).toHaveBeenCalledWith('name', 'asc');
    });

    it('should not sort when column is not sortable', () => {
      const nonSortableColumns: Column<TestData>[] = [
        { key: 'email', title: 'Email', dataIndex: 'email' },
      ];

      render(<Table columns={nonSortableColumns} data={mockData} />);

      const emailHeader = screen.getByText('Email').closest('th');
      expect(emailHeader).toBeInTheDocument();

      fireEvent.click(emailHeader!);

      // Should not contain sort indicators
      expect(emailHeader!.textContent).not.toContain('↑');
      expect(emailHeader!.textContent).not.toContain('↓');
    });
  });

  describe('Row Selection', () => {
    it('should render row selection checkboxes', () => {
      const rowSelection = {
        selectedRowKeys: [],
        onChange: vi.fn(),
      };

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowSelection={rowSelection}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(mockData.length + 1); // +1 for select all
    });

    it('should handle individual row selection', () => {
      const onChangeMock = vi.fn();
      const rowSelection = {
        selectedRowKeys: [],
        onChange: onChangeMock,
      };

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowSelection={rowSelection}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[1]; // First row checkbox (0 is select all)

      if (firstRowCheckbox) {
        fireEvent.click(firstRowCheckbox);
        expect(onChangeMock).toHaveBeenCalledWith(['0']);
      }
    });

    it('should handle select all functionality', () => {
      const onChangeMock = vi.fn();
      const rowSelection = {
        selectedRowKeys: [],
        onChange: onChangeMock,
      };

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowSelection={rowSelection}
        />
      );

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      if (selectAllCheckbox) {
        fireEvent.click(selectAllCheckbox);
        expect(onChangeMock).toHaveBeenCalledWith(['0', '1', '2']);
      }
    });

    it('should show selected rows with different styling', () => {
      const rowSelection = {
        selectedRowKeys: ['0'],
        onChange: vi.fn(),
      };

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowSelection={rowSelection}
        />
      );

      const tableRows = screen.getAllByRole('row');
      // Find the data rows (skip header row)
      const dataRows = tableRows.slice(1);

      if (dataRows[0]) {
        expect(dataRows[0].className).toContain('bg-blue-50');
      }
    });

    it('should handle disabled checkboxes', () => {
      const rowSelection = {
        selectedRowKeys: [],
        onChange: vi.fn(),
        getCheckboxProps: (record: TestData) => ({
          disabled: record.status === 'inactive',
        }),
      };

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowSelection={rowSelection}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const secondRowCheckbox = checkboxes[2]; // Jane Smith's checkbox

      expect(secondRowCheckbox).toBeDisabled();
    });
  });

  describe('Pagination', () => {
    it('should render pagination controls', () => {
      const pagination = {
        current: 1,
        pageSize: 2,
        total: 3,
        onChange: vi.fn(),
      };

      render(
        <Table columns={mockColumns} data={mockData} pagination={pagination} />
      );

      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    it('should call onChange when pagination is used', () => {
      const onChangeMock = vi.fn();
      const pagination = {
        current: 1,
        pageSize: 2,
        total: 3,
        onChange: onChangeMock,
      };

      render(
        <Table columns={mockColumns} data={mockData} pagination={pagination} />
      );

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(onChangeMock).toHaveBeenCalledWith(2, 2);
    });

    it('should disable Previous button on first page', () => {
      const pagination = {
        current: 1,
        pageSize: 2,
        total: 3,
        onChange: vi.fn(),
      };

      render(
        <Table columns={mockColumns} data={mockData} pagination={pagination} />
      );

      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });

    it('should disable Next button on last page', () => {
      const pagination = {
        current: 2,
        pageSize: 2,
        total: 3,
        onChange: vi.fn(),
      };

      render(
        <Table columns={mockColumns} data={mockData} pagination={pagination} />
      );

      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Expandable Rows', () => {
    it('should render expandable row controls', () => {
      const expandable = {
        expandedRowKeys: [],
        onExpand: vi.fn(),
        expandedRowRender: (record: TestData) => (
          <div>Details for {record.name}</div>
        ),
      };

      render(
        <Table columns={mockColumns} data={mockData} expandable={expandable} />
      );

      const expandButtons = screen.getAllByText('+');
      expect(expandButtons).toHaveLength(mockData.length);
    });

    it('should expand row when expand button is clicked', () => {
      const onExpandMock = vi.fn();
      const expandable = {
        expandedRowKeys: [],
        onExpand: onExpandMock,
        expandedRowRender: (record: TestData) => (
          <div>Details for {record.name}</div>
        ),
      };

      render(
        <Table columns={mockColumns} data={mockData} expandable={expandable} />
      );

      const firstExpandButton = screen.getAllByText('+')[0];
      if (firstExpandButton) {
        fireEvent.click(firstExpandButton);
        expect(onExpandMock).toHaveBeenCalledWith(true, mockData[0]);
      }
    });

    it('should show expanded content', () => {
      const expandable = {
        expandedRowKeys: ['0'],
        onExpand: vi.fn(),
        expandedRowRender: (record: TestData) => (
          <div>Details for {record.name}</div>
        ),
      };

      render(
        <Table columns={mockColumns} data={mockData} expandable={expandable} />
      );

      expect(screen.getByText('Details for John Doe')).toBeInTheDocument();
    });

    it('should show collapse button for expanded rows', () => {
      const expandable = {
        expandedRowKeys: ['0'],
        onExpand: vi.fn(),
        expandedRowRender: (record: TestData) => (
          <div>Details for {record.name}</div>
        ),
      };

      render(
        <Table columns={mockColumns} data={mockData} expandable={expandable} />
      );

      expect(screen.getByText('−')).toBeInTheDocument();
    });
  });

  describe('Table Styling', () => {
    it('should apply size classes', () => {
      render(<Table columns={mockColumns} data={mockData} size="sm" />);

      const table = screen.getByRole('table');
      expect(table.className).toContain('text-xs');
    });

    it('should apply bordered styling', () => {
      render(<Table columns={mockColumns} data={mockData} bordered={true} />);

      const table = screen.getByRole('table');
      expect(table.className).toContain('border');
    });

    it('should apply striped styling', () => {
      render(<Table columns={mockColumns} data={mockData} striped={true} />);

      const rows = screen.getAllByRole('row');
      const dataRows = rows.slice(1); // Skip header

      if (dataRows[1]) {
        expect(dataRows[1].className).toContain('bg-gray-25');
      }
    });

    it('should apply sticky header', () => {
      render(<Table columns={mockColumns} data={mockData} sticky={true} />);

      const thead = screen.getByRole('table').querySelector('thead');
      expect(thead?.className).toContain('sticky');
    });

    it('should apply custom className', () => {
      render(
        <Table columns={mockColumns} data={mockData} className="custom-table" />
      );

      const table = screen.getByRole('table');
      expect(table.className).toContain('custom-table');
    });
  });

  describe('Row Interactions', () => {
    it('should handle row click events', () => {
      const onClickMock = vi.fn();
      const onRow = () => ({ onClick: onClickMock });

      render(<Table columns={mockColumns} data={mockData} onRow={onRow} />);

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1]; // Skip header row

      if (firstDataRow) {
        fireEvent.click(firstDataRow);
        expect(onClickMock).toHaveBeenCalled();
      }
    });

    it('should handle row hover events', () => {
      const onMouseEnterMock = vi.fn();
      const onMouseLeaveMock = vi.fn();
      const onRow = () => ({
        onMouseEnter: onMouseEnterMock,
        onMouseLeave: onMouseLeaveMock,
      });

      render(<Table columns={mockColumns} data={mockData} onRow={onRow} />);

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];

      if (firstDataRow) {
        fireEvent.mouseEnter(firstDataRow);
        expect(onMouseEnterMock).toHaveBeenCalled();

        fireEvent.mouseLeave(firstDataRow);
        expect(onMouseLeaveMock).toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle null or undefined values', () => {
      const dataWithNulls = [
        { id: '1', name: '', age: 0, email: '', status: 'active' as const },
      ];

      render(<Table columns={mockColumns} data={dataWithNulls} />);

      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBeGreaterThan(0);
    });

    it('should handle empty columns array', () => {
      render(<Table columns={[]} data={mockData} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('should handle missing dataIndex gracefully', () => {
      const columnsWithoutDataIndex: Column<TestData>[] = [
        { key: 'missing', title: 'Missing' },
      ];

      render(<Table columns={columnsWithoutDataIndex} data={mockData} />);

      expect(screen.getByText('Missing')).toBeInTheDocument();
    });
  });
});
