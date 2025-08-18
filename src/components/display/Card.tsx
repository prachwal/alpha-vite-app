import { JSX } from "preact";

export interface CardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export interface CardHeaderProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export interface CardBodyProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export interface CardFooterProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface-primary border border-border-subtle rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-border-subtle ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-border-subtle ${className}`}>
      {children}
    </div>
  );
}
