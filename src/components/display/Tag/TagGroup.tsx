import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { cn } from '../../../utils/cn';
import { Tag } from './Tag';

export interface TagGroupProps {
  tags?: readonly string[];
  closable?: boolean;
  onTagClose?: (tag: string) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: preact.ComponentChildren;
}

export function TagGroup({
  tags = [],
  closable = false,
  onTagClose,
  max = 5,
  size = 'md',
  className,
  children,
}: Readonly<TagGroupProps>): JSX.Element {
  if (children) {
    return (
      <div className={cn('flex flex-wrap gap-2', className)}>{children}</div>
    );
  }

  const [visibleTags, setVisibleTags] = useState(tags.slice(0, max));
  const [hiddenTags, setHiddenTags] = useState(tags.slice(max));

  const handleClose = (tag: string) => {
    if (onTagClose) {
      onTagClose(tag);
    }
    setVisibleTags(visibleTags.filter((t) => t !== tag));
  };

  const handleShowMore = () => {
    setVisibleTags([...visibleTags, ...hiddenTags]);
    setHiddenTags([]);
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visibleTags.map((tag) => (
        <Tag
          key={tag}
          size={size}
          closable={closable}
          onClose={() => handleClose(tag)}
        >
          {tag}
        </Tag>
      ))}
      {hiddenTags.length > 0 && (
        <Tag size={size} onClick={handleShowMore}>
          +{hiddenTags.length} more
        </Tag>
      )}
    </div>
  );
}
