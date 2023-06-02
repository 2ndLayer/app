import React from 'react';
import { CardTitle } from '@stacks-os/ui';

interface ProposalTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function ProposalTitle({ className, children }: ProposalTitleProps) {
  return <CardTitle className={className}>{children}</CardTitle>;
}
