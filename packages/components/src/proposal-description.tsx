import React from 'react';
import { CardDescription } from '@stacks-os/ui';

interface ProposalDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function ProposalDescription({
  className,
  children,
}: ProposalDescriptionProps) {
  return <CardDescription className={className}>{children}</CardDescription>;
}
