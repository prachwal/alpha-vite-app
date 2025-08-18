import { Pagination } from "./Pagination";

export default {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
    pageSize: { control: "number" },
    totalItems: { control: "number" },
    showPageSize: { control: "boolean" },
    pageSizeOptions: { control: "object" },
    showQuickJumper: { control: "boolean" },
    showTotal: { control: "boolean" },
    size: { control: "text" },
    variant: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50],
    showQuickJumper: false,
    showTotal: true,
    size: "md",
    variant: "default",
    disabled: false,
  },
};
