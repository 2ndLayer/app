// Hook (use-proposal.tsx)
import { getProposal } from '../api';
import { useMicroStacksClient } from '@micro-stacks/react';
import { useQuery } from '@tanstack/react-query';

export function useProposal(address: string, proposalId: string) {
  const client = useMicroStacksClient();
  const network = client.getState().network;
  const { isLoading, isError, data } = useQuery({
    queryKey: ['proposal', proposalId],
    queryFn: async () => {
      const data = await getProposal(address, proposalId, network);
      if (data === undefined) {
        throw new Error('Network response was not ok');
      }
      return data;
    },
  });

  return { isLoading, isError, data };
}
