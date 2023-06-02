import React from 'react';
import { useProposal } from '../hooks/useProposal';
import { ProposalContext } from './proposal';
import { useOpenContractCall } from '@micro-stacks/react';
import { Button, Flex, Text, Title, Progress, Badge } from '@stacks-os/ui';
import { cn } from '@stacks-os/ui/utils';
import { truncateAddress } from '@stacks-os/utils';
import { splitContractAddress } from '@stacks-os/utils';
import Avatar from 'boring-avatars';
import { tupleCV, trueCV, contractPrincipalCV } from 'micro-stacks/clarity';

interface ProposalViewProps extends React.HTMLAttributes<HTMLDivElement> {
  proposalId: string;
  proposalData?: {
    author?: string;
    type?: string;
    title: string;
    description: string;
  };
}

enum Status {
  PENDING = 'pending',
  ACTIVE = 'active',
  READY = 'ready',
  CONCLUDED = 'concluded',
}

type ProposalData = ReturnType<typeof useProposal>['data'];

export function ProposalView({
  proposalId,
  proposalData,
  ...props
}: ProposalViewProps) {
  const { address }: any = React.useContext(ProposalContext);
  const { data, isLoading } = useProposal(address, proposalId);
  const [metadata, setMetadata] = React.useState<{
    author?: string;
    type?: string;
    title?: string;
    description?: string;
  } | null>(null);

  React.useEffect(() => {
    if (proposalData) {
      setMetadata(proposalData);
    } else {
      setMetadata({
        author: data?.metadata.author,
        type: data?.metadata.type,
        title: data?.metadata.title,
        description: data?.metadata.description,
      });
    }
  }, [address, proposalId, proposalData, data]);

  const { openContractCall, isRequestPending } = useOpenContractCall();
  const [proposalAddress, proposalName] = splitContractAddress(proposalId);

  const handleVote = React.useCallback(async () => {
    const functionArgs = [
      tupleCV({
        for: trueCV(),
        proposal: contractPrincipalCV(proposalAddress, proposalName),
      }),
    ];
    const [contractAddress, contractName] = splitContractAddress(address);
    const functionName = 'vote';
    const postConditions: any = [];

    await openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs,
      postConditions,
      onFinish,
      onCancel: () => {
        console.log('Cancelled vote');
      },
    });
  }, [proposalId]);

  const onFinish = async (data: any) => {
    console.log({ data });
  };

  const getStatus = (data: ProposalData): any => {
    if (data && !data?.concluded && data?.startBlockHeight < 105000) {
      return Status.PENDING;
    } else if (
      data &&
      !data?.concluded &&
      data?.startBlockHeight >= 105000 &&
      data?.startBlockHeight <= data?.endBlockHeight
    ) {
      return Status.ACTIVE;
    } else if (
      data &&
      !data?.concluded &&
      data?.endBlockHeight + 250 > 105000
    ) {
      return Status.READY;
    } else if (data?.concluded) {
      return Status.CONCLUDED;
    }
  };

  const getBadgeProps = (
    status: Status
  ): { variant: string; color: string; className: string } => {
    switch (status) {
      case Status.PENDING:
        return {
          variant: 'outline',
          color: 'yellow',
          className:
            'bg-white text-yellow-500 dark:text-yellow-500 dark:bg-neutral-800/50 font-semibold border-gray-100 dark:border-neutral-800 hover:bg-white hover:text-yellow-500 dark:hover:bg-neutral-800/50 text-yellow-500',
        };
      case Status.ACTIVE:
        return {
          variant: 'outline',
          color: 'indigo',
          className:
            'bg-white text-indigo-500 dark:text-indigo-500 dark:bg-neutral-800/50 font-semibold border-gray-100 dark:border-neutral-800 hover:bg-white hover:text-indigo-500 dark:hover:bg-neutral-800/50 text-indigo-500',
        };
      case Status.READY:
        return {
          variant: 'outline',
          color: 'green',
          className:
            'bg-white text-green-500 dark:text-green-500 dark:bg-neutral-800/50 font-semibold border-gray-100 dark:border-neutral-800 hover:bg-white hover:text-green-500 dark:hover:bg-neutral-800/50 text-green-500',
        };
      case Status.CONCLUDED:
        return {
          variant: 'outline',
          color: 'gray',
          className:
            'bg-white text-gray-500 dark:text-gray-500 dark:bg-neutral-800/50 font-semibold border-gray-100 dark:border-neutral-800 hover:bg-white hover:text-gray-500 dark:hover:bg-neutral-800/50 text-gray-500',
        };
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !metadata) {
    return <div>Proposal not found</div>;
  }

  const status = getStatus(data);
  const { variant, color, className }: any = getBadgeProps(status);

  return (
    <div className={cn('w-auto p-3 space-y-3', props.className)} {...props}>
      <Flex className='space-x-8' justifyContent='between' alignItems='center'>
        <div className='space-x-2'>
          <Badge variant={variant} color={color} className={className}>
            {status === Status.PENDING && 'Pending'}
            {status === Status.ACTIVE && 'Active'}
            {status === Status.READY && 'Ready'}
            {status === Status.CONCLUDED && 'Complete'}
          </Badge>
        </div>
        {/* <Button variant="link" size="sm">
          View details
        </Button> */}
      </Flex>
      <div className='space-y-1'>
        <Flex className='flex-col space-y-3 mt-4' alignItems='start'>
          <Title className=' text-2xl md:text-4xl font-light tracking-tight'>
            {metadata?.title}
          </Title>
          <div className='flex flex-row items-center space-x-2'>
            <p className='text-gray-500 dark:text-gray-200 font-light text-sm'>
              submitted by
            </p>
            <div className='flex flex-row items-center space-x-1'>
              <Avatar
                size={13}
                name={metadata?.author}
                variant='beam'
                colors={['#3b82f6', '#ec4899', '#d1d5db']}
              />
              <p className='text-gray-500 dark:text-gray-200 font-light text-md'>
                {truncateAddress(metadata?.author || '')}
              </p>
            </div>
          </div>
        </Flex>
        <div className='grid grid-cols-2 gap-6'>
          <div className='col-span-1'>
            <Progress className='mt-8' color='indigo' value={42} />
            <Text className='mt-2 text-md text-gray-300 font-light'>For</Text>
            <Text className='font-semibold text-lg'>42</Text>
          </div>
          <div className='col-span-1'>
            <Progress className='mt-8' color='pink' value={18} />
            <Text className='mt-2 text-md text-gray-300 font-light'>
              Against
            </Text>
            <Text className='font-semibold text-lg'>15</Text>
          </div>
          {/* <div className="col-span-1">
            <Progress className="mt-8" color="gray" value={76} />
            <Text className="mt-2 text-lg text-gray-500 font-light">
              Abstain
            </Text>
            <Text className="font-semibold text-lg">76</Text>
          </div> */}
        </div>
      </div>
      <Flex justifyContent='center' className='gap-6 pt-8'>
        <Button variant='default' className='w-full' onClick={handleVote}>
          Approve
        </Button>
        <Button variant='outline' className='w-full' onClick={() => {}}>
          Reject
        </Button>
      </Flex>
    </div>
  );
}
