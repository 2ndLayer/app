import React from 'react';
import { ProposalDescription } from './proposal-description';
import { ProposalTitle } from './proposal-title';
import { CardHeader } from '@stacks-os/ui';

interface ProposalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function ProposalHeader({ className, children }: ProposalHeaderProps) {
  React.Children.forEach(children, (child) => {
    if (
      !React.isValidElement(child) ||
      (child.type !== ProposalTitle && child.type !== ProposalDescription)
    ) {
      console.warn(
        'Invalid child passed to ProposalHeader component. Only ProposalTitle and ProposalDescription components are allowed.'
      );
    }
  });

  return <CardHeader className={className}>{children}</CardHeader>;
}
