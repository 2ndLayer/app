import * as React from 'react';
import { cn } from '../utils';

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  numColSpan?: number;
  numColSpanSm?: number;
  numColSpanMd?: number;
  numColSpanLg?: number;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>(
  (
    {
      className,
      numColSpan = 1,
      numColSpanSm = 1,
      numColSpanMd = 1,
      numColSpanLg = 1,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'col-span-1',
          `col-span-${numColSpan}`,
          `sm:col-span-${numColSpanSm}`,
          `md:col-span-${numColSpanMd}`,
          `lg:col-span-${numColSpanLg}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
export { Col };
