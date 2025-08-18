import { JSX } from 'preact';

export interface BreadcrumbItem {
  label: string;
  href?: string | undefined;
  icon?: JSX.Element;
}
