'use client';

import React from 'react';
import { Icons } from '@stacks-os/ui';

export default function Code() {
  const [copied, setCopied] = React.useState(null);
  const handleCopy = (type: string, text: string) => {
    setCopied(type);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(null);
    }, 3000);
  };

  return (
    <div className='whitespace-nowrap text-left rounded-lg overflow-hidden w-full bg-white dark:bg-neutral-900 p-2 border border-gray-100 dark:border-neutral-800 relative'>
      {copied === 'view' ? (
        <Icons.check className='absolute top-4 right-4 w-4 h-4 text-green-500/90 z-10' />
      ) : (
        <Icons.copy
          className='absolute top-4 right-4 w-4 h-4 text-neutral-800 dark:text-neutral-500/90 z-10'
          onClick={() =>
            handleCopy(
              'view',
              `
              import { Proposal } from '@2ndlayer/components'

              export default function App() {
                return (
                  <Proposal.View
                    address='SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-voting'
                    proposalId='SP2F40S465JTD7AMZ2X9SMN229617HZ9YB0HHY98A.MDP-010'
                  />
                )
              };
              `
            )
          }
        />
      )}
      <div className='relative flex text-center'>
        <div className='flex pl-3.5 pt-3'>
          <svg
            className='-ml-0.5 mr-1.5 h-3 w-3 text-red-500/90'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='12'></circle>
          </svg>
          <svg
            className='-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/90'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='12'></circle>
          </svg>
          <svg
            className='-ml-0.75 mr-1.5 h-3 w-3 text-green-500/90'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <circle cx='12' cy='12' r='12'></circle>
          </svg>
        </div>
        <span className='absolute inset-x-0 top-2 text-xs text-gray-900'>
          App.tsx
        </span>
      </div>
      <div className='mt-5 space-y-1.5 px-5 pb-5'>
        <p className='mt-2 font-mono text-xs tracking-wide text-gray-600'> </p>
        <p className='my-4 pb-4 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-700'>import </span>
          <span className='text-neutral-500'>{`{`} </span>
          <span className='text-gray-300'>{`Proposal`} </span>
          <span className='text-neutral-500'>{`}`} </span>
          <span className='text-neutral-700'>from </span>
          <span className='text-indigo-400'>{`'@2ndlayer/components'`}</span>
        </p>

        <p className='my-4 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-700'>export default function </span>
          <span className='text-gray-300'>{`App`}</span>
          <span className='text-neutral-500'>{`() {`}</span>
        </p>
        <p className='ml-3 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-700'>return </span>
          <span className='text-neutral-500'>{`(`}</span>
        </p>
        <p className='ml-6 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-700'>{`<Proposal.View`} </span>
        </p>
        <p className='ml-9 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-gray-300'>{`address`}</span>
          <span className='text-neutral-700'>{`=`}</span>
          <span className='text-indigo-400'>
            {`'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-voting'`}{' '}
          </span>
        </p>
        <p className='ml-9 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-gray-300'>{`proposalId`}</span>
          <span className='text-neutral-700'>{`=`}</span>
          <span className='text-indigo-400'>
            {`'SP2F40S465JTD7AMZ2X9SMN229617HZ9YB0HHY98A.MDP-010'`}{' '}
          </span>
        </p>
        <p className='ml-6 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-700'>{`/>`}</span>
        </p>
        <p className='ml-3 font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-500'>{`)`}</span>
        </p>
        <p className='font-mono text-sm tracking-wide text-violet-400'>
          <span className='text-neutral-500'>{`};`}</span>
        </p>
      </div>
    </div>
  );
}
