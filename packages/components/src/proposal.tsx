import React from 'react';
import { ProposalCreate } from './proposal-create';
import { ProposalDescription } from './proposal-description';
import { ProposalHeader } from './proposal-header';
import { ProposalItem } from './proposal-item';
import { ProposalList } from './proposal-list';
import { ProposalTitle } from './proposal-title';
import { ProposalView } from './proposal-view';
import { cn } from '@stacks-os/ui/utils';

interface ProposalProps extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
}

export interface ProposalContextValue {
  address: string | null;
}

export const ProposalContext = React.createContext<ProposalContextValue>({
  address: 'SP12345',
});

function Proposal({ address, className, children, ...props }: ProposalProps) {
  const value: ProposalContextValue = {
    address,
  };

  return (
    <ProposalContext.Provider value={value}>
      <div className={cn('w-auto', className)} {...props}>
        {children}
      </div>
    </ProposalContext.Provider>
  );
}

Proposal.Header = ProposalHeader;
Proposal.Title = ProposalTitle;
Proposal.Description = ProposalDescription;
Proposal.List = ProposalList;
Proposal.Item = ProposalItem;
Proposal.View = ProposalView;
Proposal.Create = ProposalCreate;

export { Proposal };
