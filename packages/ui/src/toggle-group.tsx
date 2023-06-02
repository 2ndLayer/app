'use client';

import * as React from 'react';
import { cn } from '../utils';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { VariantProps, cva } from 'class-variance-authority';

const toggleGroupVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-white data-[state=on]:text-gray-500 dark:data-[state=on]:text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'bg-transparent border border-gray-100 dark:border-neutral-800 hover:bg-gray-100 hover:text-gray-100',
      },
      size: {
        default: 'h-10 px-2',
        sm: 'h-9 px-2',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleGroupVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      'flex-nowrap inline-flex justify-start py-6 rounded-lg',
      toggleGroupVariants({ variant, size, className })
    )}
    {...props}
  />
));

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleGroupVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      'flex items-center px-1 py-1 text-sm rounded-md bg-white text-gray-500 border data-[state=on]:border-gray-100 data-[state=off]:border-none dark:data-[state=on]:border-neutral-800 dark:data-[state=on]:bg-neutral-800/50',
      toggleGroupVariants({ variant, size, className })
    )}
    {...props}
  />
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

export { ToggleGroup, ToggleGroupItem, toggleGroupVariants };
