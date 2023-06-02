import React from 'react';
import {
  ProposalListContext,
  ProposalListContextValue,
} from '../src/proposal-list';

export function useProposalListContext(): ProposalListContextValue {
  const context = React.useContext(ProposalListContext);

  if (context === undefined) {
    console.warn('Component is not nested inside ProposalContext provider');
  }

  return context;
}
