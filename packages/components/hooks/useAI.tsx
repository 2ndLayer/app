// Hook (use-ai.tsx)
import { useMicroStacksClient } from '@micro-stacks/react';
import { useQuery } from '@tanstack/react-query';

interface AIOptions {
  prompt?: string;
  // other common options for all types of functionality
}

interface ProposalOptions extends AIOptions {
  prompt: string;
  vaultAddress: string;
  // other options for proposal functionality
}

interface DocsOptions extends AIOptions {
  prompt: string;
  temperature?: number;
  // other options for docs functionality
}

interface ContractOptions extends AIOptions {
  contractAddress: string;
  // other options for contract functionality
}
export function useAI(
  type: 'proposal' | 'docs' | 'contract',
  options: ProposalOptions | DocsOptions | ContractOptions
) {
  const client = useMicroStacksClient();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['ai'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });

  return { isLoading, isError, data };
}
