'use client';

import React from 'react';
import { endsWithValidExtension, runAddressCheck } from '../utils';
import { BnsApiClient, NameInfoResponse } from '@bns-x/client';
import {
  Badge,
  Button,
  Input,
  Label,
  Progress,
  Textarea,
  Text,
} from '@stacks-os/ui';
import { cn } from '@stacks-os/ui/utils';
import { truncateAddress, validateStacksAddress } from '@stacks-os/utils';
import Avatar from 'boring-avatars';
import { AlertCircle, Check, CheckCircle, DeleteIcon } from 'lucide-react';

interface ProposalCreateProps extends React.HTMLAttributes<HTMLDivElement> {
  transfer?: boolean;
  from?: string;
}

export interface ProposalCreateContextValue {
  step: number;
  setStep: (step: number) => void;
  from: string;
  transfers?: { amount: number; to: string }[];
}

const ProposalCreateContext = React.createContext<ProposalCreateContextValue>({
  step: 1,
  setStep: () => {},
  from: '',
  transfers: [],
});

const bns = new BnsApiClient();

export function ProposalCreate({ transfer, from }: ProposalCreateProps) {
  const [step, setStep] = React.useState(1);
  const [recipient, setRecipient] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [transfers, setTransfers] = React.useState<
    { amount: number; to: string }[]
  >([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState('');
  const [address, setAddress] = React.useState('');
  const value: ProposalCreateContextValue = {
    step,
    setStep,
    from: from || '',
    transfers,
  };
  const addRecipient = React.useCallback(async () => {
    if (
      recipient.endsWith('.btc') ||
      recipient.endsWith('.stx') ||
      recipient.endsWith('.id')
    ) {
      const name = await bns.getDisplayName(recipient);
      if (name) {
        setSearchResults(name);
      } else {
        setSearchResults('Not found');
      }
    }
    setTransfers([...transfers, { amount, to: recipient }]);
    setRecipient('');
    setAmount(0);
    setSearchResults('');
  }, [address, searchResults, recipient, amount]);

  const fetchBnsAddress = React.useCallback(async (e: any) => {
    const recipient = e.target.value;
    setRecipient(recipient);
    if (
      recipient.endsWith('.btc') ||
      recipient.endsWith('.stx') ||
      recipient.endsWith('.id')
    ) {
      const { address }: any = (await bns.getNameDetails(recipient)) || {};
      if (address) {
        setAddress(address);
        setSearchResults(address);
        setIsOpen(true);
      } else {
        setSearchResults('Not found');
        setAddress('');
      }
    } else {
      const name = await bns.getDisplayName(recipient);
      if (name) {
        setSearchResults(name);
        setIsOpen(true);
      } else {
        setSearchResults('');
        setIsOpen(false);
      }
    }
  }, []);

  if (transfer && !from) {
    throw new Error("The 'from' prop is required when 'transfer' is selected.");
  }

  if (step === 1) {
    return (
      <ProposalCreateContext.Provider value={value}>
        <div className='grid grid-cols-2 gap-6'>
          <div className='col-span-2 space-y-6'>
            <Progress className='w-full' value={25 * step} color='indigo' />
            <div className='dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800/50 rounded-md space-y-3'>
              <div className='space-y-0.5 p-3 bg-gray-50 dark:bg-neutral-800/25 rounded-t-md'>
                <Text className='font-bold'>Transfer</Text>
                <Text className='text-gray-200 font-light text-sm'>
                  Send tokens from your vault to any Stacks address
                </Text>
              </div>
              <div className='p-3 space-y-3 rounded-b-md'>
                <div className='grid grid-cols-7 gap-3'>
                  <div className='col-span-7 md:col-span-2 relative rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <img
                        src='https://cryptologos.cc/logos/stacks-stx-logo.png?v=022'
                        className='text-gray-500 sm:text-sm h-4'
                      />
                    </div>
                    <Input
                      type='text'
                      name='amount'
                      id='amount'
                      className='appearance-none text-md block w-full rounded-md py-1.5 pl-9 pr-12 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 border-gray-200 dark:border-neutral-800'
                      placeholder='0'
                      aria-describedby='amount'
                      value={amount !== 0 ? amount : ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                          setAmount(value);
                        }
                      }}
                    />
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                      <span
                        className='text-sm text-gray-500'
                        id='price-currency'
                      >
                        STX
                      </span>
                    </div>
                  </div>
                  <div className='relative flex items-center col-span-7 md:col-span-4 space-x-3'>
                    <div className='w-full relative'>
                      <Input
                        type='text'
                        name='search'
                        id='search'
                        className='block w-full rounded-md py-1.5 text-gray-900 dark:text-white shadow-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-gray-200 dark:border-neutral-800'
                        placeholder='Enter a Stacks address or BNS name'
                        value={recipient}
                        onChange={fetchBnsAddress}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addRecipient();
                          }
                        }}
                        onFocus={fetchBnsAddress}
                      />
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                        {runAddressCheck(recipient) &&
                          (validateStacksAddress(address) ? (
                            <div className='p-1 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-2xl'>
                              <Check className='w-3.5 h-3.5 text-indigo-500' />
                            </div>
                          ) : (
                            <div className='p-1 bg-red-500/10 dark:bg-red-500/10 rounded-2xl'>
                              <AlertCircle className='w-3.5 h-3.5 text-red-500' />
                            </div>
                          ))}
                      </div>

                      {isOpen && (
                        <div className='absolute w-full z-10 border border-gray-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 rounded-md my-2 dark:hover:bg-neutral-800'>
                          <div className='flex justify-between items-center space-y-3 p-3'>
                            <div
                              className='flex flex-row items-center gap-3 cursor-pointer'
                              onClick={() => {
                                endsWithValidExtension(recipient)
                                  ? setRecipient(recipient)
                                  : setRecipient(searchResults);
                                setIsOpen(false);
                              }}
                            >
                              {endsWithValidExtension(recipient) ? (
                                <>
                                  <Avatar
                                    size={20}
                                    name={recipient}
                                    variant='beam'
                                    colors={['#3b82f6', '#ec4899', '#d1d5db']}
                                  />
                                  <div className='flex flex-col space-y-1'>
                                    <h3 className='text-sm font-regular leading-none tracking-tight'>
                                      {recipient}
                                    </h3>
                                    <p className='text-gray-500 font-light text-xs'>
                                      {truncateAddress(searchResults)}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Avatar
                                    size={20}
                                    name={recipient}
                                    variant='beam'
                                    colors={['#3b82f6', '#ec4899', '#d1d5db']}
                                  />
                                  <div className='flex flex-col space-y-1'>
                                    <h3 className='text-sm font-regular leading-none tracking-tight'>
                                      {searchResults}
                                    </h3>
                                    <p className='text-gray-500 font-light text-xs'>
                                      {truncateAddress(recipient)}
                                    </p>
                                  </div>{' '}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-span-7 md:col-span-1 relative flex items-center space-x-3'>
                    <Button
                      onClick={addRecipient}
                      variant='outline'
                      size='sm'
                      className='w-full text-white dark:text-white border bg-indigo-500 border-indigo-500 dark:border-indigo-500 dark:bg-indigo-500 hover:bg-indigo-500/90 dark:hover:bg-indigo-500/90'
                    >
                      Add
                    </Button>
                  </div>
                </div>
                {transfers.map((transfer) => (
                  <div
                    key={transfer.to}
                    className='flex justify-between items-center space-y-3 p-6'
                  >
                    <div className='flex flex-row items-center gap-16'>
                      <div className='flex flex-col space-y-1.5'>
                        <p className='text-gray-500 font-light text-sm'>
                          I'd like to transfer
                        </p>
                        <h3 className='text-sm font-regular leading-none tracking-tight'>
                          {transfer.amount} STX
                        </h3>
                      </div>
                      <div className='flex flex-col space-y-1.5'>
                        <p className='text-gray-500 font-light text-sm'>to</p>
                        <h3 className='text-sm font-regular leading-none tracking-tight'>
                          {endsWithValidExtension(transfer.to)
                            ? transfer.to
                            : truncateAddress(transfer.to || '')}
                        </h3>
                      </div>
                      <div className='flex flex-col space-y-1.5'>
                        <p className='text-gray-500 font-light text-sm'>from</p>
                        <h3 className='text-sm font-regular leading-none tracking-tight'>
                          {truncateAddress(from || '')}
                        </h3>
                      </div>
                    </div>
                    <Badge
                      variant='outline'
                      color='red'
                      className='cursor-pointer hover:bg-red-500 hover:text-white bg-red-500/10 dark:hover:bg-red-500/10 dark:hover:text-white'
                      onClick={() =>
                        setTransfers(
                          transfers.filter((t) => t.to !== transfer.to)
                        )
                      }
                    >
                      Remove
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className='w-full'
              onClick={() => {}}
              disabled={transfers.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </ProposalCreateContext.Provider>
    );
  }

  if (step === 2) {
    return (
      <ProposalCreateContext.Provider value={value}>
        <div className='col-span-2 space-y-6'>
          <Progress className='w-full' value={25 * step} />
          <div className='bg-gray-200 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800/50 rounded-md space-y-3'>
            <div className='space-y-0.5 p-3 dark:bg-neutral-800/25'>
              <Text className='font-bold'>Details</Text>
              <Text className='text-gray-500 font-light text-sm'>
                Provide some details about your proposal
              </Text>
            </div>
            <div className='space-y-3'>
              <form
                action='#'
                className='space-y-3 dark:bg-neutral-900 rounded-b-md'
              >
                <Label htmlFor='title' className='sr-only'>
                  Title
                </Label>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  className='appearance-none block w-full border-none pt-2.5 text-lg font-medium placeholder:text-gray-400'
                  placeholder='Title'
                />
                <Label htmlFor='description' className='sr-only'>
                  Description
                </Label>
                <Textarea
                  rows={2}
                  name='description'
                  id='description'
                  className='block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  placeholder='Write a description...'
                  defaultValue={''}
                />
                <div className='h-24'></div>
              </form>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <Button variant='link' onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          </div>
        </div>
      </ProposalCreateContext.Provider>
    );
  }
}
