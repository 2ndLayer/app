import React from 'react';
import { ProposalItem } from './proposal-item';
import { cn } from '@stacks-os/ui/utils';

interface ProposalListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
    | React.ReactElement<typeof ProposalItem>
    | React.ReactElement<typeof ProposalItem>[];
  view?: 'grid' | 'list';
}

export interface ProposalListContextValue {
  view?: 'grid' | 'list';
}

export const ProposalListContext = React.createContext<{
  view: 'list' | 'grid';
}>({ view: 'list' });

export function ProposalList({
  children,
  view = 'list',
  className,
  ...props
}: ProposalListProps) {
  const isGridView = view === 'grid';

  return (
    <ProposalListContext.Provider value={{ view }}>
      <div
        className={cn(
          'space-y-4',
          isGridView &&
            'grid gap-4 py-4 space-y-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child: any) => {
          if (!React.isValidElement(child)) {
            console.warn('Invalid child passed to ProposalList component.');
            return null;
          }

          return React.cloneElement(child);
        })}
      </div>
    </ProposalListContext.Provider>
  );
}
