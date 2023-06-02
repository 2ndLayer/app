import React from 'react';
import { cn } from '../utils';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, justifyContent = 'between', alignItems = 'center', ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        `flex justify-${justifyContent} items-${alignItems}`,
        className
      )}
      {...props}
    />
  )
);
