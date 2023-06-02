'use client';

import React from 'react';
import { useProposalListContext } from '../hooks/useProposalListContext';
import { Badge, Button, Flex, Title, Text, Progress } from '@stacks-os/ui';
import { cn, getPercentage } from '@stacks-os/ui/utils';
import { truncateAddress } from '@stacks-os/utils';
import Avatar from 'boring-avatars';
import { CheckCheck, DollarSign } from 'lucide-react';

interface ProposalItemProps extends React.HTMLAttributes<HTMLDivElement> {
  identifier: string;
  title: string;
  description: string;
  proposedBy: string;
  status?: string;
  votesFor?: number;
  votesAgainst?: number;
  totalVotes?: number;
}

export function ProposalItem({
  identifier,
  title,
  description,
  proposedBy,
  status,
  votesFor,
  votesAgainst,
  totalVotes,
  ...props
}: ProposalItemProps) {
  const { view } = useProposalListContext();
  const isGridView = view === 'grid';
  return (
    <div
      className={cn(
        'divide-y divide-muted-foreground',
        status === 'active' && 'font-bold'
      )}
      {...props}
    >
      {isGridView ? (
        <div
          className={cn(
            'bg-white dark:bg-neutral-800/50 p-6 border border-gray-100 dark:border-neutral-800 rounded-lg shadow-sm',
            props.className
          )}
          {...props}
        >
          <Flex
            className='space-x-8'
            justifyContent='between'
            alignItems='center'
          >
            <div className='space-x-2'>
              {status === 'pending' && (
                <Badge
                  className={cn(
                    'bg-white text-yellow-500 dark:text-yellow-500 dark:bg-neutral-800/50 border-gray-100 dark:border-neutral-800 shadow-bg-gray-50 rounded-full border shadow-sm no-underline transition-colors duration-200 hover:bg-white hover:text-yellow-500 dark:hover:bg-neutral-800/50'
                  )}
                >
                  Pending
                </Badge>
              )}
              {status === 'active' && (
                <Badge
                  className={cn(
                    'bg-white text-green-500 dark:text-green-500 dark:bg-neutral-800/50 border-gray-100 dark:border-neutral-800 shadow-bg-gray-50 rounded-full border shadow-sm no-underline transition-colors duration-200 hover:bg-white hover:text-green-500 dark:hover:bg-neutral-800/50'
                  )}
                >
                  Active
                </Badge>
              )}
              {status === 'executed' && (
                <Badge
                  className={cn(
                    'bg-white text-gray-500 dark:text-gray-500 dark:bg-neutral-800/50 border-gray-100 dark:border-neutral-800 shadow-bg-gray-50 rounded-full border shadow-sm no-underline transition-colors duration-200 hover:bg-white hover:text-gray-500 dark:hover:bg-neutral-800/50'
                  )}
                >
                  Executed
                </Badge>
              )}
            </div>
          </Flex>
          <div className='space-y-1'>
            <Flex className='flex-col space-y-1 mt-4' alignItems='start'>
              <div className='flex flex-row items-center space-x-2'>
                <div className='flex flex-row items-center space-x-1'>
                  <Avatar
                    size={10}
                    name={proposedBy}
                    variant='beam'
                    colors={['#3b82f6', '#ec4899', '#d1d5db']}
                  />
                  <p className='text-gray-500 dark:text-neutral-500 font-light text-xs'>
                    {truncateAddress(proposedBy)}
                  </p>
                </div>
              </div>
              <Title className='text-lg font-light tracking-tighter'>
                {title}
              </Title>
            </Flex>
            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-1'>
                <Progress className='mt-8' color='indigo' value={votesFor} />
                <Text className='mt-2 text-sm text-gray-500 font-light'>
                  For
                </Text>
                <Text className='font-semibold text-sm'>{votesFor}</Text>
              </div>
              <div className='col-span-1'>
                <Progress className='mt-8' color='pink' value={votesAgainst} />
                <Text className='mt-2 text-sm text-gray-500 font-light'>
                  Against
                </Text>
                <Text className='font-semibold text-sm'>{votesAgainst}</Text>
              </div>
              {/* <div className="col-span-1">
                <Progress
                  className="mt-8"
                  color="gray"
                  value={525 - ((votesFor || 0) + (votesAgainst || 0))}
                />
                <Text className="mt-2 text-sm text-gray-500 font-light">
                  Abstain
                </Text>
                <Text className="font-semibold text-sm">
                  {525 - ((votesFor || 0) + (votesAgainst || 0))}
                </Text>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'flex flex-col items-start space-y-3 md:flex-row md:items-center md:space-y-0 justify-between border-b border-gray-100 dark:border-neutral-800 py-6 hover:cursor-pointer',
            props.className
          )}
        >
          <div className='flex flex-row items-center space-x-4'>
            <div className='flex flex-col space-y-1'>
              <Title className='text-md font-light tracking-tighter'>
                {title}
              </Title>
              <div className='flex flex-row items-center space-x-2'>
                <p className='text-gray-500 dark:text-gray-200 font-light text-sm'>
                  submitted by
                </p>
                <div className='flex flex-row items-center space-x-1'>
                  <Avatar
                    size={13}
                    name={proposedBy}
                    variant='beam'
                    colors={['#3b82f6', '#ec4899', '#d1d5db']}
                  />
                  <p className='text-gray-500 dark:text-gray-200 font-light text-sm'>
                    {truncateAddress(proposedBy)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center space-x-8'>
            <div className='flex flex-row items-center space-x-2'>
              <p className='text-sm font-light text-gray-200'>
                {totalVotes} votes
              </p>
              <div className='w-24'>
                <div className='h-2'>
                  <div className='flex space-x-2'>
                    <div
                      className='h-2.5 rounded-md border border-indigo-500 bg-indigo-500'
                      style={{
                        width: `${
                          ((votesFor || 0) / (totalVotes || 0)) * 100
                        }%`,
                      }}
                    />
                    <div
                      className='h-2.5 rounded-md border border-pink-500 bg-pink-500'
                      style={{
                        width: `${
                          ((votesAgainst || 0) / (totalVotes || 0)) * 100
                        }%`,
                      }}
                    />
                    {/* <div
                      className="h-2.5 rounded-md border border-gray-500 bg-gray-500"
                      style={{
                        width: `${
                          (((totalVotes || 0) -
                            (votesFor || 0) -
                            (votesAgainst || 0)) /
                            (totalVotes || 1)) *
                          100
                        }%`,
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            {status === 'pending' && (
              <Badge
                className={cn(
                  'bg-white text-yellow-500 dark:text-yellow-500 dark:bg-neutral-800/50 border-gray-100 dark:border-neutral-800 shadow-bg-gray-50 rounded-full border shadow-sm no-underline transition-colors duration-200 hover:bg-white hover:text-yellow-500 dark:hover:bg-neutral-800/50'
                )}
              >
                Pending
              </Badge>
            )}
            {status === 'active' && (
              <Badge
                className={cn(
                  'bg-white text-green-500 dark:text-green-500 dark:bg-neutral-800/50 border-gray-100 dark:border-neutral-800 shadow-bg-gray-50 rounded-full border shadow-sm no-underline transition-colors duration-200 hover:bg-white hover:text-green-500 dark:hover:bg-neutral-800/50'
                )}
              >
                Active
              </Badge>
            )}
            {status === 'executed' && (
              <Badge
                className={cn(
                  'bg-white text-gray-500 dark:text-gray-500 dark:bg-neutral-800/50 border-gray-100 dark:border-neutral-800 shadow-bg-gray-50 rounded-full border shadow-sm no-underline transition-colors duration-200 hover:bg-white hover:text-gray-500 dark:hover:bg-neutral-800/50'
                )}
              >
                Executed
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
