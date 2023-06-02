import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPercentage = (totalSupply: number, totalVotes: number) => {
  if (isNaN((totalVotes / totalSupply) * 100)) {
    return 0;
  }
  return (totalVotes / totalSupply) * 100;
};

export type Color =
  | 'inherit'
  | 'gray'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'black'
  | 'white';

export const colors: Record<Color, string> & Record<string, string> = {
  inherit: 'text-inherit',
  gray: 'text-gray-500',
  red: 'text-red-500',
  yellow: 'text-yellow-500',
  orange: 'text-orange-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  indigo: 'text-indigo-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  black: 'text-black',
  white: 'text-white',
};

export const bgColors: Record<Color, string> & Record<string, string> = {
  inherit: 'bg-inherit',
  gray: 'bg-gray-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  black: 'bg-black',
  white: 'bg-white',
};
