import { JSX } from 'preact';
import { cn } from '../../../utils/cn';
import { Avatar } from './Avatar';

export interface AvatarGroupProps {
  max?: number;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'tight' | 'normal' | 'loose';
  children: preact.ComponentChildren;
  className?: string;
}

const spacingMap = {
  tight: '-ml-2',
  normal: '-ml-3',
  loose: '-ml-4',
};

export function AvatarGroup({
  max = 5,
  size = 'md',
  spacing = 'normal',
  children,
  className,
}: Readonly<AvatarGroupProps>): JSX.Element {
  const childrenArray = Array.isArray(children) ? children : [children];
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  const spacingClass = spacingMap[spacing];

  return (
    <div className={cn('flex items-center', className)}>
      {visibleChildren.map((child, index) => {
        // Try to use child's key if available, otherwise fallback to index (should be improved if possible)
        const childKey =
          typeof child === 'object' &&
          child &&
          'key' in child &&
          child.key != null
            ? child.key
            : `avatar-group-child-${index}`;
        return (
          <div key={childKey} className={cn(index > 0 && spacingClass)}>
            {child}
          </div>
        );
      })}
      {remainingCount > 0 && (
        <div className={cn(spacingClass)}>
          <Avatar size={size} shape="circle">
            +{remainingCount}
          </Avatar>
        </div>
      )}
    </div>
  );
}
