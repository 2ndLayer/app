export interface SourceCodeMetadata {
  type: string;
  author: string;
  title: string;
  description: string;
}

export const parseSourceCode = (sourceCode: string): SourceCodeMetadata => {
  const metadataRegex = /;;\s*(Type|Author|Title|Description):\s*([^\n]*)/g;
  const matches = Array.from(sourceCode.matchAll(metadataRegex));
  const metadata: SourceCodeMetadata = {
    type: '',
    author: '',
    title: '',
    description: '',
  };
  for (const match of matches) {
    const [, key, value] = match;
    switch (key) {
      case 'Type':
        metadata.type = value.trim();
        break;
      case 'Author':
        metadata.author = value.trim();
        break;
      case 'Title':
        metadata.title = value.trim();
        break;
      case 'Description':
        metadata.description = value.trim();
        break;
    }
  }
  return metadata;
};

const genesisTime = new Date('2009-01-03T18:15:05Z');
const blockTimeSeconds = 600; // 10 minutes in seconds

export const addRealWorldTime = (
  data: { Month: string; [key: string]: any }[],
  genesisTime: Date,
  blockTimeSeconds: number
) =>
  data.map((item) => {
    const blockHeight = item.BlockHeight;
    const secondsSinceGenesis = blockHeight * blockTimeSeconds;
    const timeInMillis = genesisTime.getTime() + secondsSinceGenesis * 1000;
    const date = new Date(timeInMillis);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return {
      ...item,
      Month: `${month} ${day}`,
    };
  });

export const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export const runAddressCheck = (address: string) => {
  return (
    address.length === 34 ||
    address.endsWith('.btc') ||
    address.endsWith('.stx') ||
    address.endsWith('.id')
  );
};

export const endsWithValidExtension = (str: string) => {
  return str.endsWith('.btc') || str.endsWith('.stx') || str.endsWith('.id');
};
