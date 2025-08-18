import { ComponentProps } from 'preact';

export interface SpacerProps extends ComponentProps<'div'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'vertical' | 'horizontal';
}

export const Spacer = ({
  size = 'md',
  direction = 'vertical',
  className,
  ...props
}: SpacerProps) => {
  const sizeMap = {
    xs: '1',
    sm: '2',
    md: '4',
    lg: '6',
    xl: '8',
    '2xl': '12',
  };

  const sizeClass =
    direction === 'horizontal' ? `w-${sizeMap[size]}` : `h-${sizeMap[size]}`;

  const classes = ['flex-shrink-0', sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      data-testid="spacer"
      aria-hidden="true"
      className={classes}
      {...props}
    />
  );
};
