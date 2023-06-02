import * as React from 'react';
import { cn } from '../utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  numCols?: number;
  numColsSm?: number;
  numColsMd?: number;
  numColsLg?: number;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      numCols = 1,
      numColsSm = 1,
      numColsMd = 1,
      numColsLg = 1,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-2',
          `grid-cols-${numCols}`,
          `sm:grid-cols-${numColsSm}`,
          `md:grid-cols-${numColsMd}`,
          `lg:grid-cols-${numColsLg}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export { Grid };
