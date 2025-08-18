import type { Meta, StoryObj } from "@storybook/preact";
import {
  Table,
  type TableProps,
  type Column,
} from "../components/display/Table";

// Sample data for stories
interface Person {
  id: string;
  name: string;
  age: number;
  email: string;
  status: "active" | "inactive";
  department: string;
  salary: number;
}

const sampleData: Person[] = [
  {
    id: "1",
    name: "John Doe",
    age: 32,
    email: "john.doe@example.com",
    status: "active",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    email: "jane.smith@example.com",
    status: "active",
    department: "Design",
    salary: 72000,
  },
  {
    id: "3",
    name: "Bob Johnson",
    age: 35,
    email: "bob.johnson@example.com",
    status: "inactive",
    department: "Marketing",
    salary: 68000,
  },
  {
    id: "4",
    name: "Alice Brown",
    age: 29,
    email: "alice.brown@example.com",
    status: "active",
    department: "Engineering",
    salary: 78000,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    age: 31,
    email: "charlie.wilson@example.com",
    status: "active",
    department: "Sales",
    salary: 65000,
  },
];

const basicColumns: Column<Person>[] = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    sortable: true,
    align: "center",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {value}
      </span>
    ),
  },
];

const meta: Meta<TableProps<Person>> = {
  title: "Components/Display/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible table component with sorting, pagination, row selection, and expandable rows support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: false,
      description: "Array of column configurations",
    },
    data: {
      control: false,
      description: "Array of data objects to display",
    },
    loading: {
      control: "boolean",
      description: "Show loading skeleton",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Table size",
    },
    bordered: {
      control: "boolean",
      description: "Show table borders",
    },
    striped: {
      control: "boolean",
      description: "Alternating row colors",
    },
    sticky: {
      control: "boolean",
      description: "Sticky table header",
    },
    pagination: {
      control: false,
      description: "Pagination configuration object",
    },
    rowSelection: {
      control: false,
      description: "Row selection configuration object",
    },
    expandable: {
      control: false,
      description: "Row expansion configuration object",
    },
  },
};

export default meta;
type Story = StoryObj<TableProps<Person>>;

// Basic table
export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    loading: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

// Sortable table
export const Sortable: Story = {
  args: {
    columns: [
      ...basicColumns,
      {
        key: "salary",
        title: "Salary",
        dataIndex: "salary",
        sortable: true,
        align: "right" as const,
        render: (value: number) => `$${value.toLocaleString()}`,
      },
    ],
    data: sampleData,
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    size: "sm",
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    size: "lg",
  },
};

// Bordered
export const Bordered: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    bordered: true,
  },
};

// Striped
export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    striped: true,
  },
};

// Sticky header
export const StickyHeader: Story = {
  args: {
    columns: basicColumns,
    data: [...sampleData, ...sampleData, ...sampleData], // More data to show scrolling
    sticky: true,
    scrollY: "300px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with sticky header that remains visible when scrolling vertically.",
      },
    },
  },
};

// With pagination
export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    pagination: {
      current: 1,
      pageSize: 3,
      total: sampleData.length,
      onChange: (page: number, pageSize: number) => {
        console.log("Page changed:", page, pageSize);
      },
    },
  },
};

// With row selection
export const WithRowSelection: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    rowSelection: {
      selectedRowKeys: ["1", "3"],
      onChange: (selectedRowKeys: readonly string[]) => {
        console.log("Selected rows:", selectedRowKeys);
      },
    },
  },
};

// With disabled row selection
export const WithDisabledRowSelection: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    rowSelection: {
      selectedRowKeys: [],
      onChange: (selectedRowKeys: readonly string[]) => {
        console.log("Selected rows:", selectedRowKeys);
      },
      getCheckboxProps: (record: Person) => ({
        disabled: record.status === "inactive",
      }),
    },
  },
};

// Expandable rows
export const ExpandableRows: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    expandable: {
      expandedRowKeys: ["1"],
      onExpand: (expanded: boolean, record: Person) => {
        console.log("Row expanded:", expanded, record);
      },
      expandedRowRender: (record: Person) => (
        <div className="p-4 bg-gray-50 border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-900 mb-2">Employee Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Department:</span>{" "}
              {record.department}
            </div>
            <div>
              <span className="font-medium">Salary:</span> $
              {record.salary.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Employee ID:</span> {record.id}
            </div>
            <div>
              <span className="font-medium">Status:</span> {record.status}
            </div>
          </div>
        </div>
      ),
    },
  },
};

// Custom render columns
export const CustomRender: Story = {
  args: {
    columns: [
      {
        key: "avatar",
        title: "Avatar",
        render: (_, record: Person) => (
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {record.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        ),
      },
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        sortable: true,
      },
      {
        key: "info",
        title: "Info",
        render: (_, record: Person) => (
          <div>
            <div className="font-medium">{record.email}</div>
            <div className="text-sm text-gray-500">{record.department}</div>
          </div>
        ),
      },
      {
        key: "actions",
        title: "Actions",
        render: () => (
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              Edit
            </button>
            <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">
              Delete
            </button>
          </div>
        ),
      },
    ],
    data: sampleData,
  },
};

// Complex example with all features
export const ComplexExample: Story = {
  args: {
    columns: [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        sortable: true,
        width: 200,
      },
      {
        key: "age",
        title: "Age",
        dataIndex: "age",
        sortable: true,
        align: "center" as const,
        width: 80,
      },
      {
        key: "email",
        title: "Email",
        dataIndex: "email",
        width: 250,
      },
      {
        key: "department",
        title: "Department",
        dataIndex: "department",
        sortable: true,
        width: 150,
      },
      {
        key: "status",
        title: "Status",
        dataIndex: "status",
        render: (value: string) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        key: "salary",
        title: "Salary",
        dataIndex: "salary",
        sortable: true,
        align: "right" as const,
        render: (value: number) => `$${value.toLocaleString()}`,
      },
    ],
    data: sampleData,
    bordered: true,
    size: "md",
    rowSelection: {
      selectedRowKeys: [],
      onChange: (selectedRowKeys: readonly string[]) => {
        console.log("Selected rows:", selectedRowKeys);
      },
    },
    pagination: {
      current: 1,
      pageSize: 3,
      total: sampleData.length,
      onChange: (page: number, pageSize: number) => {
        console.log("Page changed:", page, pageSize);
      },
    },
    expandable: {
      expandedRowKeys: [],
      onExpand: (expanded: boolean, record: Person) => {
        console.log("Row expanded:", expanded, record);
      },
      expandedRowRender: (record: Person) => (
        <div className="p-4 bg-gray-50">
          <h4 className="font-semibold mb-2">Additional Information</h4>
          <p>Employee ID: {record.id}</p>
          <p>Full Email: {record.email}</p>
          <p>Annual Salary: ${record.salary.toLocaleString()}</p>
        </div>
      ),
    },
  },
};
