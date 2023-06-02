import * as React from 'react';
import { cn } from '../utils';
import { Color, colors } from '../utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: Color;
}

const Heading: React.FC<HeadingProps> = ({
  color = 'inherit',
  children,
  className,
  ...props
}) => {
  const textColor = colors[color] ?? colors.inherit;
  return (
    <h1 className={cn('text-4xl font-bold', textColor, className)} {...props}>
      {children}
    </h1>
  );
};

const Title: React.FC<HeadingProps> = ({
  color = 'inherit',
  children,
  className,
  ...props
}) => {
  const textColor = colors[color] ?? colors.inherit;
  return (
    <h2 className={cn('text-2xl font-bold', textColor, className)} {...props}>
      {children}
    </h2>
  );
};

const Subtitle: React.FC<HeadingProps> = ({
  color = 'inherit',
  children,
  className,
  ...props
}) => {
  const textColor = colors[color] ?? colors.inherit;
  return (
    <h3
      className={cn('text-lg font-semibold', textColor, className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

const Text: React.FC<TextProps> = ({
  color = 'inherit',
  children,
  className,
  ...props
}) => {
  const textColor = colors[color] ?? colors.inherit;
  return (
    <p className={cn('text-base', textColor, className)} {...props}>
      {children}
    </p>
  );
};

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Bold: React.FC<SpanProps> = ({ children, className, ...props }) => {
  return (
    <span className={cn('font-bold', className)} {...props}>
      {children}
    </span>
  );
};

const Italic: React.FC<SpanProps> = ({ children, className, ...props }) => {
  return (
    <span className={cn('italic', className)} {...props}>
      {children}
    </span>
  );
};

export { Heading, Title, Subtitle, Text, Bold, Italic };
