import { JSX } from 'preact';

export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  fluid?: boolean;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export function Container({
  maxWidth = 'lg',
  padding = 'md',
  centered = true,
  fluid = false,
  children,
  className = '',
}: Readonly<ContainerProps>) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const containerClasses = [
    'container',
    fluid ? 'w-full' : maxWidthClasses[maxWidth],
    paddingClasses[padding],
    centered ? 'mx-auto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={containerClasses}>{children}</div>;
}
