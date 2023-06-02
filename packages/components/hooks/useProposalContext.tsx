import React from 'react';
import { ProposalContext, ProposalContextValue } from '../src/proposal';

export function useProposalContext(): ProposalContextValue {
  const context = React.useContext(ProposalContext);

  if (context === undefined) {
    console.warn('Component is not nested inside ProposalContext provider');
  }

  return context;
}
