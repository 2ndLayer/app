import * as React from 'react';
import { cn } from '../utils';
import { Color } from '../utils';
import { VariantProps, cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 text-white hover:bg-neutral-900/90 dark:bg-white dark:text-black dark:hover:bg-white/90 border-transparent',
        destructive:
          'bg-red-500 hover:bg-red-500/80 border-transparent text-white',
        outline:
          'bg-transparent text-black dark:bg-transparent dark:text-white border-black dark:border-white',
      },
      color: {
        inherit: 'bg-inherit text-inherit dark:bg-inherit dark:text-inherit',
        gray: 'bg-gray-200 text-gray-800 dark:bg-gray-200 dark:text-gray-800',
        red: 'bg-red-200 text-red-800 dark:bg-red-200 dark:text-red-800',
        yellow:
          'bg-yellow-200 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-800',
        orange:
          'bg-orange-200 text-orange-800 dark:bg-orange-200 dark:text-orange-800',
        green:
          'bg-green-200 text-green-800 dark:bg-green-200 dark:text-green-800',
        blue: 'bg-blue-200 text-blue-800 dark:bg-blue-200 dark:text-blue-800',
        indigo:
          'bg-indigo-200 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-800',
        purple:
          'bg-purple-200 text-purple-800 dark:bg-purple-200 dark:text-purple-800',
        pink: 'bg-pink-200 text-pink-800 dark:bg-pink-200 dark:text-pink-800',
        black: 'bg-black text-white dark:bg-white dark:text-black',
        white: 'bg-white text-black dark:bg-black dark:text-white',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        color: 'inherit',
        className:
          'bg-inherit text-inherit dark:bg-inherit dark:text-inherit hover:bg-inherit/90 dark:hover:bg-inherit/90 border-inherit dark:border-inherit',
      },
      {
        variant: 'outline',
        color: 'blue',
        className:
          'bg-transparent dark:bg-transparent text-blue-500 dark:text-blue-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-blue-500 dark:border-blue-500',
      },
      {
        variant: 'outline',
        color: 'gray',
        className:
          'bg-transparent dark:bg-transparent text-gray-500 dark:text-gray-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-gray-500 dark:border-gray-500',
      },
      {
        variant: 'outline',
        color: 'red',
        className:
          'bg-transparent dark:bg-transparent text-red-500 dark:text-red-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-red-500 dark:border-red-500',
      },
      {
        variant: 'outline',
        color: 'yellow',
        className:
          'bg-transparent dark:bg-transparent text-yellow-500 dark:text-yellow-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-yellow-500 dark:border-yellow-500',
      },
      {
        variant: 'outline',
        color: 'orange',
        className:
          'bg-transparent dark:bg-transparent text-orange-500 dark:text-orange-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-orange-500 dark:border-orange-500',
      },
      {
        variant: 'outline',
        color: 'green',
        className:
          'bg-transparent dark:bg-transparent text-green-500 dark:text-green-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-green-500 dark:border-green-500',
      },
      {
        variant: 'outline',
        color: 'indigo',
        className:
          'bg-transparent dark:bg-transparent text-indigo-500 dark:text-indigo-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-indigo-500 dark:border-indigo-500',
      },
      {
        variant: 'outline',
        color: 'purple',
        className:
          'bg-transparent dark:bg-transparent text-purple-500 dark:text-purple-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-purple-500 dark:border-purple-500',
      },
      {
        variant: 'outline',
        color: 'pink',
        className:
          'bg-transparent dark:bg-transparent text-pink-500 dark:text-pink-500 hover:bg-transparent/90 dark:hover:bg-transparent/90 border-pink-500 dark:border-pink-500',
      },
      {
        variant: 'outline',
        color: 'black',
        className:
          'bg-transparent text-black dark:bg-transparent dark:text-white hover:bg-transparent/90 dark:hover:bg-transparent/90 border-black dark:border-white',
      },
      {
        variant: 'outline',
        color: 'white',
        className:
          'bg-transparent text-white dark:bg-transparent dark:text-black hover:bg-transparent/90 dark:hover:bg-transparent/90 border-white dark:border-black',
      },
    ],
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: Color;
}

function Badge({ className, variant, color, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
