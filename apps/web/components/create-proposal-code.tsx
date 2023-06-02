import React from 'react';
import { Icons } from '@stacks-os/ui';

export default function CreateProposalCode() {
  return (
    <div className='whitespace-nowrap text-left rounded-lg overflow-hidden w-full bg-white dark:bg-neutral-900 p-2 border border-gray-100 dark:border-neutral-800 relative'>
      <Icons.copy className='absolute top-4 right-4 w-4 h-4 text-neutral-800 dark:text-neutral-500/90' />
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
        <p className='my-4 pb-4 font-mono text-sm tracking-wide'>
          <span className='text-neutral-700'>import </span>
          <span className='text-neutral-500'>{`{`} </span>
          <span className='text-gray-300'>{`Proposal`} </span>
          <span className='text-neutral-500'>{`}`} </span>
          <span className='text-neutral-700'>from </span>
          <span className='text-indigo-400'>{`"@2ndlayer/components"`}</span>
        </p>
        <p className='my-4 font-mono text-sm tracking-wide'>
          <span className='text-neutral-700'>export default function </span>
          <span className='text-gray-300'>{`App`}</span>
          <span className='text-neutral-500'>{`() {`}</span>
        </p>
        <p className='ml-3 font-mono text-sm tracking-wide'>
          <span className='text-neutral-700'>return </span>
          <span className='text-neutral-500'>{`(`}</span>
        </p>
        <p className='ml-6 font-mono text-sm tracking-wide'>
          <span className='text-neutral-700'>{`<Proposal.Create `}</span>
        </p>
        <p className='ml-9 font-mono text-sm tracking-wide'>
          <span className='text-gray-300'>{`transfer`}</span>
        </p>
        <p className='ml-9 font-mono text-sm tracking-wide'>
          <span className='text-gray-300'>{`from`}</span>
          <span className='text-neutral-700'>{`=`}</span>
          <span className='text-indigo-400'>{`'SPTFDG7Q0MPKJPF2YEE1GZG6X1RM5TTQZJ287NEZ.treasury'`}</span>
        </p>
        <p className='ml-6 font-mono text-sm tracking-wide'>
          <span className='text-neutral-700'>{` />`}</span>
        </p>
        <p className='ml-3 font-mono text-sm tracking-wide'>
          <span className='text-neutral-500'>{`)`}</span>
        </p>
        <p className='font-mono text-sm tracking-wide'>
          <span className='text-neutral-500'>{`};`}</span>
        </p>
      </div>
    </div>
  );
}
