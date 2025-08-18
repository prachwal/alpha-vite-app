import { JSX } from 'preact';
import { cn } from '../../../utils/cn';

interface ListGroupProps {
  readonly title?: string;
  readonly children: preact.ComponentChildren;
  readonly className?: string;
}

export function ListGroup({
  title,
  children,
  className,
}: ListGroupProps): JSX.Element {
  return (
    <div className={cn('list-group', className)}>
      {title && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
