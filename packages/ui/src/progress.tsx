'use client';

import * as React from 'react';
import { cn } from '../utils';
import { bgColors } from '../utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  color?: string;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, color = 'gray', value, ...props }, ref) => {
  const bg = bgColors[color];
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'bg-gray-200 dark:bg-neutral-800/50 relative h-3 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`${bg} h-full w-full flex-1 rounded-lg transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

const CircularProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, color = 'gray', value, ...props }, ref) => {
  const bg = bgColors[color];
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'bg-gray-200 dark:bg-neutral-800/50 relative h-16 w-16 rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`${bg} absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all`}
        style={{
          strokeDasharray: 'calc(2 * 3.14 * 7.5rem)',
          strokeDashoffset: `calc(2 * 3.14 * 7.5rem * (1 - ${
            (value || 0) / 100
          }))`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = 'CircularProgress';

export { Progress, CircularProgress };
