import { JSX } from 'preact';

type StackResponsiveKeys = 'direction' | 'spacing' | 'align' | 'justify';

export interface StackProps {
  direction?: 'row' | 'column';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  divider?: JSX.Element;
  responsive?: {
    sm?: Partial<Pick<StackProps, StackResponsiveKeys>>;
    md?: Partial<Pick<StackProps, StackResponsiveKeys>>;
    lg?: Partial<Pick<StackProps, StackResponsiveKeys>>;
    xl?: Partial<Pick<StackProps, StackResponsiveKeys>>;
  };
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export function Stack({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider,
  responsive = {},
  children,
  className = '',
}: Readonly<StackProps>) {
  const spacingClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const directionClasses = {
    row: 'flex-row',
    column: 'flex-col',
  };

  const responsiveClasses = Object.entries(responsive)
    .map(([breakpoint, config]) => {
      const classes = [];
      if (config.direction) {
        classes.push(`${breakpoint}:${directionClasses[config.direction]}`);
      }
      if (config.spacing) {
        classes.push(`${breakpoint}:${spacingClasses[config.spacing]}`);
      }
      if (config.align) {
        classes.push(`${breakpoint}:${alignClasses[config.align]}`);
      }
      if (config.justify) {
        classes.push(`${breakpoint}:${justifyClasses[config.justify]}`);
      }
      return classes;
    })
    .flat()
    .join(' ');

  const stackClasses = [
    'flex',
    directionClasses[direction],
    spacingClasses[spacing],
    alignClasses[align],
    justifyClasses[justify],
    wrap ? 'flex-wrap' : 'flex-nowrap',
    responsiveClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const childrenArray = Array.isArray(children) ? children : [children];
  const filteredChildren = childrenArray.filter(Boolean);

  if (divider && filteredChildren.length > 1) {
    const dividedChildren: (JSX.Element | null)[] = [];
    filteredChildren.forEach((child, index) => {
      dividedChildren.push(child);
      if (index < filteredChildren.length - 1) {
        const prevChildKey =
          (child && (child as any).key) !== undefined
            ? (child as any).key
            : `child-${index}`;
        const nextChild =
          filteredChildren[index + 1] &&
          (filteredChildren[index + 1] as any).key !== undefined
            ? (filteredChildren[index + 1] as any).key
            : `child-${index + 1}`;
        dividedChildren.push(
          <div
            key={`divider-${prevChildKey}-${nextChild}`}
            className="flex-shrink-0"
          >
            {divider}
          </div>
        );
      }
    });
    return <div className={stackClasses}>{dividedChildren}</div>;
  }

  return (
    <div className={stackClasses} data-testid="stack">
      {children}
    </div>
  );
}
