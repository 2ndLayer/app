'use client';

import React from 'react';
import Code from '../components/code';
import CreateProposalCode from '../components/create-proposal-code';
import ListProposalCode from '../components/list-proposal-code';
import { Proposal } from '@stacks-os/components';
import {
  Card,
  Heading,
  Grid,
  Col,
  Text,
  Icons,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  Toggle,
  ToggleGroupItem,
  Button,
} from '@stacks-os/ui';
import { cn } from '@stacks-os/ui/utils';
import { Code2, Eye, Grid as GridIcon, List } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster, toast } from 'sonner';

export default function Web() {
  const { theme, setTheme } = useTheme();
  const [view, setView] = React.useState<'grid' | 'list'>('list');
  const [proposalView, setProposalView] = React.useState<'preview' | 'code'>(
    'preview'
  );
  const [proposalListView, setProposalListView] = React.useState<
    'preview' | 'code'
  >('preview');
  const [proposalCreateView, setProposalCreateView] = React.useState<
    'preview' | 'code'
  >('preview');
  const [copied, setCopied] = React.useState(null);
  const handleCopy = (type: string, text: string) => {
    setCopied(type);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(null);
    }, 3000);
  };

  const proposals = [
    {
      identifier: 'MDP-010',
      title: 'Add execution delay to voting extension',
      description: 'Description',
      proposedBy: 'SP143YHR805B8S834BWJTMZVFR1WP5FFC03WZE4BF',
      status: 'active',
      votesFor: 124,
      votesAgainst: 24,
      totalVotes: 148,
    },
    {
      identifier: 'MDP-011',
      title: 'Stack STX in treasury for 3 cycles',
      description: 'Description',
      proposedBy: 'SP3J7H167C2EMZNFTRTT5B1QWBFM5RT4DQ7VRM5NX',
      status: 'active',
      votesFor: 420,
      votesAgainst: 69,
      totalVotes: 489,
    },
    {
      identifier: 'MDP-012',
      title: 'Distribute STX mining rewards',
      description: 'Description',
      proposedBy: 'SPTFDG7Q0MPKJPF2YEE1GZG6X1RM5TTQZJ287NEZ',
      status: 'pending',
      votesFor: 51,
      votesAgainst: 49,
      totalVotes: 100,
    },
    {
      identifier: 'MDP-013',
      title: 'Auction off remaining NFTs',
      description: 'Description',
      proposedBy: 'SP248NZ0P20BH3M3ZTM9DS69EMC9G6H3MQC6KM3E',
      status: 'pending',
      votesFor: 87,
      votesAgainst: 118,
      totalVotes: 205,
    },
    {
      identifier: 'MDP-014',
      title: 'Swap 420 STX for $ALEX',
      description: 'Description',
      proposedBy: 'SPRABA1HZS6XZTK6HRKH0V9PRN40RSJAR41C9FAX',
      status: 'executed',
      votesFor: 344,
      votesAgainst: 202,
      totalVotes: 546,
    },
  ];

  const templates = [
    {
      id: '1',
      name: 'Vault and asset management',
      description:
        'Transfer and manage your assets, add new tokens to whitelist, etc.',
    },
    {
      id: '2',
      name: 'Protocol upgrades',
      description:
        'Upgrade your protocol configuration, add new extensions, etc.',
    },
    {
      id: '3',
      name: 'Custom smart contract',
      description: 'Write your own smart contract proposal.',
    },
  ];

  return (
    <div className='max-w-4xl min-h-screen mx-auto py-20 px-6 sm:px-8'>
      {/* <div className="flex justify-between items-center h-24">
        <div className="flex justify-start items-center space-x-3">
          <div className="inline-flex items-center space-x-2">
            <p className="text-indigo-400">
              <span className="text-neutral-800 dark:text-white text-md font-medium">
                Second Layer
              </span>
            </p>
            <span className="bg-gradient-to-l shadow-sm from-indigo-600 to-indigo-500 px-2.5 py-1 rounded-lg text-white text-xs font-bold">
              Beta
            </span>
            <Icons.arrowRight className="w-4 h-4 dark:text-white text-neutral-900 transition-all" />
          </div>
        </div>
        <div className="flex items-center space-x-8 gap-8">
          <div className="relative hidden lg:flex justify-center text-base font-medium space-x-8">
            <a
              href="#"
              className="dark:text-white dark:hover:text-gray-100 text-neutral-900 hover:text-neutral-900/80"
            >
              Components
            </a>
            <a
              href="#"
              className="dark:text-white dark:hover:text-gray-100 text-neutral-900 hover:text-neutral-900/80"
            >
              SDK
            </a>
            <a
              href="#"
              className="dark:text-white dark:hover:text-gray-100 text-neutral-900 hover:text-neutral-900/80"
            >
              Docs
            </a>
          </div>
          <div className="lg:flex justify-end">
            <div
              className="inline-flex flex-shrink-0 py-2 text-base font-medium group
                md:text-lg transition-all
                text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-800 dark:hover:text-gray hover:bg-gray-100 h-9 rounded-md w-9 px-0">
                  <a href="https://github.com/2ndLayer/app" target="_blank">
                    <Icons.gitHub className="w-5 h-5 fill-black text-neutral-800 dark:fill-white dark:text-white" />
                  </a>
                </div>
                <div className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-800 dark:hover:text-gray hover:bg-gray-100 h-9 rounded-md w-9 px-0">
                  <a href="https://twitter.com/ryan_waits" target="_blank">
                    <Icons.twitter className="w-5 h-5 fill-black text-neutral-800 dark:fill-white dark:text-white" />
                  </a>
                </div>
                <div className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-800 dark:hover:text-gray hover:bg-gray-100 h-9 rounded-md w-9 px-0">
                  {theme === "dark" ? (
                    <Icons.moon
                      className="w-5 h-5 text-black dark:text-white"
                      onClick={() => setTheme("light")}
                    />
                  ) : (
                    <Icons.sun
                      className="w-5 h-5 text-black dark:text-white"
                      onClick={() => setTheme("dark")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <main className='max-w-7xl px-0 sm:px-8'>
        <div className='relative font-regular text-neutral-900/90 dark:text-white space-y-3'>
          {/* <Heading className="text-6xl font-regular tracking-tight">
              Second{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Layer
              </span>
            </Heading> */}
          <h1 className='text-3xl'>Build faster with pre-built components.</h1>
          {/* <Text className="text-neutral-900 dark:text-gray-500">
              An opinionated UI framework for building apps on Bitcoin.
            </Text> */}
          <p className='pb-12 text-gray-300 text-md font-light'>
            Quickly interact with native smart contracts on Stacks with
            ready-to-use components. Built using{' '}
            <a
              href='https://www.radix-ui.com/'
              target='_blank'
              className='text-gray-500 hover:text-gray-400'
            >
              Radix UI
            </a>{' '}
            ,
            <a
              href='https://tailwindcss.com/'
              target='_blank'
              className='text-gray-500 hover:text-gray-400'
            >
              Tailwind
            </a>{' '}
            and{' '}
            <a
              href='https://micro-stacks.dev/'
              target='_blank'
              className='text-gray-500 hover:text-gray-400'
            >
              Micro Stacks
            </a>
            .
          </p>
        </div>
        <div className='flex flex-col items-center justify-center mx-auto max-w-4xl space-y-16'>
          <div className='w-full space-y-4'>
            <div className='flex justify-between w-full items-center'>
              <div>
                <p className='text-neutral-900 dark:text-gray-100 text-xl font-regular'>
                  Installation
                </p>
              </div>
            </div>
            <div className='flex flex-row gap-2 text-sm bg-white dark:bg-neutral-900 p-4 rounded-lg font-mono items-center justify-between border border-gray-100 dark:border-neutral-800'>
              <div className='flex gap-2'>
                <div className='text-gray-400 select-none '>$</div>
                <div> npm install @secondlayer/components</div>
              </div>
              {copied === 'install' ? (
                <Icons.check className='w-4 h-4 text-green-500/90' />
              ) : (
                <Icons.copy
                  className='w-4 h-4 text-neutral-800 dark:text-neutral-500/90'
                  onClick={() =>
                    handleCopy('install', 'npm install @secondlayer/components')
                  }
                />
              )}
            </div>
          </div>
          <div className='w-full space-y-4'>
            <div className='flex justify-between w-full items-center'>
              <div>
                <p className='text-neutral-900 dark:text-gray-100 text-xl font-regular'>
                  Take action on a proposal
                </p>
              </div>
              <ToggleGroup
                type='single'
                className='bg-gray-100 dark:bg-neutral-900'
                defaultValue='preview'
                onValueChange={(view: 'preview' | 'code') =>
                  setProposalView(view)
                }
              >
                <ToggleGroupItem value='preview'>
                  <Eye className='h-5' />
                </ToggleGroupItem>
                <ToggleGroupItem value='codeProposal'>
                  <Code2 className='h-5' />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className='h-100'>
              {proposalView === 'preview' ? (
                <Card className='w-full space-y-2'>
                  <Proposal address='SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X.mega-voting'>
                    <Proposal.View
                      proposalId='SP32DFA3HXYZ2BV3P8H6XQM8EN94D2212QM71BRYG.MDP-004'
                      proposalData={{
                        title: 'Upgrade treasury contracts for pox3',
                        description: 'Proposal Description',
                        author: 'SP32DFA3HXYZ2BV3P8H6XQM8EN94D2212QM71BRYG',
                        type: 'MIP',
                      }}
                    />
                  </Proposal>
                </Card>
              ) : (
                <Code />
              )}
            </div>
          </div>
          <div className='w-full space-y-4 h-full'>
            <div className='flex justify-between w-full items-center'>
              <div>
                <p className='text-neutral-900 dark:text-gray-100 text-xl font-regular'>
                  Get a list of the latest proposals
                </p>
              </div>
              <ToggleGroup
                type='single'
                className='bg-gray-100 dark:bg-neutral-900'
                defaultValue='preview'
                onValueChange={(view: 'preview' | 'code') =>
                  setProposalListView(view)
                }
              >
                <ToggleGroupItem value='preview'>
                  <Eye className='h-5' />
                </ToggleGroupItem>
                <ToggleGroupItem value='code'>
                  <Code2 className='h-5' />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className='h-100'>
              {proposalListView === 'preview' ? (
                <Card className='space-y-2 w-full'>
                  <ToggleGroup
                    type='single'
                    className='flex justify-start'
                    defaultValue='list'
                    onValueChange={(view: 'grid' | 'list') => setView(view)}
                  >
                    <ToggleGroupItem value='list'>
                      <List className='h-5' />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='grid'>
                      <GridIcon className='h-5' />
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <Proposal.List view={view}>
                    {proposals.map((proposal) => (
                      <Proposal.Item key={proposal.identifier} {...proposal} />
                    ))}
                  </Proposal.List>
                </Card>
              ) : (
                <ListProposalCode view={view} />
              )}
            </div>
          </div>
          <div className='w-full space-y-4 h-full'>
            <div className='flex justify-between w-full items-center'>
              <div>
                <p className='text-neutral-900 dark:text-gray-100 text-xl font-regular'>
                  Submit your own proposal
                </p>
              </div>
              <ToggleGroup
                type='single'
                className='bg-gray-100 dark:bg-neutral-900'
                defaultValue='preview'
                onValueChange={(view: 'preview' | 'code') =>
                  setProposalCreateView(view)
                }
              >
                <ToggleGroupItem value='preview'>
                  <Eye className='h-5' />
                </ToggleGroupItem>
                <ToggleGroupItem value='code'>
                  <Code2 className='h-5' />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className='h-[50vh]'>
              {proposalCreateView === 'preview' ? (
                <Card className='space-y-8 w-full'>
                  {/* <RadioGroup defaultValue="1">
                  <div className="space-y-4 w-full">
                    {templates.map((template, index) => (
                      <Label
                        key={template.id}
                        htmlFor={template.id}
                        className={cn(
                          "relative flex cursor-pointer border bg-white dark:bg-neutral-800/50 rounded-md p-4 focus:outline-none border-neutral-200 text-neutral-900 dark:text-white dark:border-neutral-800 [&:has([data-state=checked])]:bg-blue-500/5 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:dark:bg-blue-500/5 [&:has([data-state=checked])]:dark:border-blue-500 "
                        )}
                      >
                        <div className="flex items-center space-x-4">
                          <RadioGroupItem
                            value={template.id}
                            id={template.id}
                            className="border text-blue-500 border-blue-500 dark:border dark:border-blue-500 dark:text-blue-500"
                          />
                          <div className="flex flex-col text-sm">
                            <span className="font-medium text-neutral-900 dark:text-white">
                              {template.name}
                            </span>
                            <span className="text-neutral-900 dark:text-gray-500 font-light">
                              {template.description}
                            </span>
                          </div>
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup> */}

                  <Proposal address='SP143YHR805B8S834BWJTMZVFR1WP5FFC00V8QTV4.core-dao'>
                    <Proposal.Create
                      transfer
                      from='SP143YHR805B8S834BWJTMZVFR1WP5FFC00V8QTV4.treasury'
                    />
                  </Proposal>
                </Card>
              ) : (
                <CreateProposalCode />
              )}
            </div>
          </div>
        </div>
      </main>
      <div className='h-16' />
    </div>
  );
}
