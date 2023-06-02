import { parseSourceCode } from '../utils';
import { splitContractAddress } from '@stacks-os/utils';
import { fetchReadOnlyFunction, fetchContractSource } from 'micro-stacks/api';
import { contractPrincipalCV, stringAsciiCV } from 'micro-stacks/clarity';

export interface ProposalData {
  concluded: boolean;
  endBlockHeight: number;
  passed: boolean;
  proposer: string;
  startBlockHeight: number;
  votesAgainst: number;
  votesFor: number;
}

export async function getProposal(
  address: string,
  proposalId: string,
  network: any
) {
  const [extensionAddress, extensionName] = splitContractAddress(address);
  const [proposalAddress, proposalName] = splitContractAddress(proposalId);

  const data: ProposalData = await fetchReadOnlyFunction({
    network,
    contractAddress: extensionAddress,
    contractName: extensionName,
    senderAddress: extensionAddress,
    functionArgs: [contractPrincipalCV(proposalAddress, proposalName)],
    functionName: 'get-proposal-data',
  });

  const { source } = await fetchContractSource({
    url: network.getCoreApiUrl(),
    contract_address: proposalAddress,
    contract_name: proposalName,
    proof: 0,
    tip: '',
  });

  const metadata = parseSourceCode(source);

  const quorumThreshold = await fetchReadOnlyFunction({
    network,
    contractAddress: extensionAddress,
    contractName: extensionName,
    senderAddress: 'SP143YHR805B8S834BWJTMZVFR1WP5FFC03WZE4BF',
    functionArgs: [stringAsciiCV('quorumThreshold')],
    functionName: 'get-parameter',
  });

  const executionDelay = await fetchReadOnlyFunction({
    network,
    contractAddress: extensionAddress,
    contractName: extensionName,
    senderAddress: 'SP143YHR805B8S834BWJTMZVFR1WP5FFC03WZE4BF',
    functionArgs: [stringAsciiCV('executionDelay')],
    functionName: 'get-parameter',
  });

  return {
    proposer: data.proposer,
    votesFor: Number(data.votesFor),
    votesAgainst: Number(data.votesAgainst),
    startBlockHeight: Number(data.startBlockHeight),
    endBlockHeight: Number(data.endBlockHeight),
    passed: data.passed,
    concluded: data.concluded,
    quorumThreshold: Number(quorumThreshold),
    executionDelay: Number(executionDelay),
    source,
    metadata,
  };
}
