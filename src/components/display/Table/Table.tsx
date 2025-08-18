import { useMemo, useState } from 'preact/hooks';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => preact.ComponentChildren;
  width?: string | number;
  minWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  fixed?: 'left' | 'right';
}

export interface TableProps<T = any> {
  columns: readonly Column<T>[];
  data: readonly T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowSelection?: {
    selectedRowKeys: readonly string[];
    onChange: (selectedRowKeys: readonly string[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  sortOrder?: { field: string; direction: 'asc' | 'desc' };
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onRow?: (
    record: T,
    index: number
  ) => {
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
  expandable?: {
    expandedRowKeys: readonly string[];
    onExpand: (expanded: boolean, record: T) => void;
    expandedRowRender: (record: T) => preact.ComponentChildren;
  };
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  sticky?: boolean;
  scrollX?: string | number;
  scrollY?: string | number;
  className?: string;
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Table<T = any>({
  columns,
  data,
  loading = false,
  pagination,
  rowSelection,
  sortOrder,
  onSort,
  onRow,
  expandable,
  size = 'md',
  bordered = false,
  striped = false,
  sticky = false,
  scrollX,
  scrollY,
  className = '',
}: Readonly<TableProps<T>>) {
  const [internalSortOrder, setInternalSortOrder] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  } | null>(sortOrder || null);

  const currentSortOrder = sortOrder || internalSortOrder;

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    const field = (column.dataIndex as string) || column.key;
    const currentDirection =
      currentSortOrder?.field === field ? currentSortOrder.direction : null;
    const newDirection: 'asc' | 'desc' =
      currentDirection === 'asc' ? 'desc' : 'asc';

    const newSortOrder = { field, direction: newDirection };

    if (onSort) {
      onSort(field, newDirection);
    } else {
      setInternalSortOrder(newSortOrder);
    }
  };

  const sortedData = useMemo(() => {
    if (!currentSortOrder) return data;

    const { field, direction } = currentSortOrder;
    const column = columns.find(
      (col) => ((col.dataIndex as string) || col.key) === field
    );
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = column.dataIndex
        ? a[column.dataIndex]
        : a[field as keyof T];
      const bValue = column.dataIndex
        ? b[column.dataIndex]
        : b[field as keyof T];

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, currentSortOrder, columns]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (pagination.current - 1) * pagination.pageSize;
    return sortedData.slice(start, start + pagination.pageSize);
  }, [sortedData, pagination]);

  const handleRowSelection = (rowKey: string, checked: boolean) => {
    if (!rowSelection) return;

    const newSelectedRowKeys = checked
      ? [...rowSelection.selectedRowKeys, rowKey]
      : rowSelection.selectedRowKeys.filter((key) => key !== rowKey);

    rowSelection.onChange(newSelectedRowKeys);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!rowSelection) return;

    const newSelectedRowKeys = checked
      ? paginatedData.map((_, index) => String(index))
      : [];

    rowSelection.onChange(newSelectedRowKeys);
  };

  const isAllSelected =
    rowSelection &&
    rowSelection.selectedRowKeys.length === paginatedData.length;
  const isIndeterminate =
    rowSelection && rowSelection.selectedRowKeys.length > 0 && !isAllSelected;

  const tableClasses = [
    'min-w-full table-auto',
    sizeClasses[size],
    bordered ? 'border border-gray-200 dark:border-gray-700' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: any = {};
  if (scrollX) containerStyle.overflowX = 'auto';
  if (scrollY) {
    containerStyle.overflowY = 'auto';
    containerStyle.maxHeight = scrollY;
  }

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={`skeleton-row-${i + 1}`}
              className="h-8 bg-gray-100 dark:bg-gray-700 rounded mb-1"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div style={containerStyle} className="overflow-hidden">
        <table className={tableClasses}>
          <thead
            className={
              sticky ? 'sticky top-0 bg-white dark:bg-gray-800 z-10' : ''
            }
          >
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {rowSelection && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = Boolean(isIndeterminate);
                    }}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                    className="rounded border-gray-300"
                  />
                </th>
              )}
              {expandable && <th className="px-4 py-3 w-12"></th>}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 font-medium text-gray-900 dark:text-gray-100 ${
                    alignClasses[column.align || 'left']
                  } ${
                    column.sortable
                      ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                      : ''
                  }`}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-2">
                    {column.title}
                    {column.sortable && (
                      <span className="text-gray-400 dark:text-gray-500">
                        {(() => {
                          if (
                            currentSortOrder?.field ===
                            ((column.dataIndex as string) || column.key)
                          ) {
                            return currentSortOrder.direction === 'asc'
                              ? '↑'
                              : '↓';
                          }
                          return '↕';
                        })()}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((record, index) => {
              const rowKey = String(index);
              const rowProps = onRow?.(record, index) || {};
              const isSelected = rowSelection?.selectedRowKeys.includes(rowKey);
              const isExpanded = expandable?.expandedRowKeys.includes(rowKey);

              return (
                <tr
                  key={rowKey}
                  className={`
                    border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700
                    ${
                      striped && index % 2 === 1
                        ? 'bg-gray-25 dark:bg-gray-800'
                        : 'dark:bg-gray-900'
                    }
                    ${isSelected ? 'bg-blue-50 dark:bg-blue-900' : ''}
                  `}
                  onClick={rowProps.onClick}
                  onMouseEnter={rowProps.onMouseEnter}
                  onMouseLeave={rowProps.onMouseLeave}
                >
                  {rowSelection && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          handleRowSelection(rowKey, e.currentTarget.checked)
                        }
                        disabled={
                          rowSelection.getCheckboxProps?.(record)?.disabled
                        }
                        className="rounded border-gray-300"
                      />
                    </td>
                  )}
                  {expandable && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => expandable.onExpand(!isExpanded, record)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = column.dataIndex
                      ? record[column.dataIndex]
                      : record[column.key as keyof T];
                    const content = column.render
                      ? column.render(value, record, index)
                      : String(value || '');

                    return (
                      <td
                        key={column.key}
                        className={`px-4 py-3 ${
                          alignClasses[column.align || 'left']
                        }`}
                        style={{
                          width: column.width,
                          minWidth: column.minWidth,
                        }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {expandable?.expandedRowKeys.map((rowKey) => {
              const record = paginatedData[Number(rowKey)];
              if (!record) return null;

              return (
                <tr
                  key={`expanded-${rowKey}`}
                  className="bg-gray-50 dark:bg-gray-800"
                >
                  <td
                    colSpan={columns.length + (rowSelection ? 1 : 0) + 1}
                    className="px-4 py-3"
                  >
                    {expandable.expandedRowRender(record)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex justify-between flex-1 sm:hidden">
            <button
              onClick={() =>
                pagination.onChange(
                  Math.max(1, pagination.current - 1),
                  pagination.pageSize
                )
              }
              disabled={pagination.current === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                pagination.onChange(pagination.current + 1, pagination.pageSize)
              }
              disabled={
                pagination.current >=
                Math.ceil(pagination.total / pagination.pageSize)
              }
              className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{' '}
                <span className="font-medium">
                  {(pagination.current - 1) * pagination.pageSize + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(
                    pagination.current * pagination.pageSize,
                    pagination.total
                  )}
                </span>{' '}
                of <span className="font-medium">{pagination.total}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                {/* Pagination controls would go here */}
                <button
                  onClick={() =>
                    pagination.onChange(
                      Math.max(1, pagination.current - 1),
                      pagination.pageSize
                    )
                  }
                  disabled={pagination.current === 1}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  ‹
                </button>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  Page {pagination.current} of{' '}
                  {Math.ceil(pagination.total / pagination.pageSize)}
                </span>
                <button
                  onClick={() =>
                    pagination.onChange(
                      pagination.current + 1,
                      pagination.pageSize
                    )
                  }
                  disabled={
                    pagination.current >=
                    Math.ceil(pagination.total / pagination.pageSize)
                  }
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
