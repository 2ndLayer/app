import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import '../styles.css';
import * as MicroStacks from '@micro-stacks/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

const cartograph = localFont({
  src: [
    {
      path: '../public/fonts/cartograph/regular.otf',
      weight: '100',
    },
    {
      path: '../public/fonts/cartograph/regular-italic.otf',
      weight: '100',
    },
  ],
  variable: '--font-cartograph',
});

const monasans = localFont({
  src: [
    {
      path: '../public/fonts/monasans/font.woff2',
    },
  ],
  variable: '--font-monasans',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MicroStacks.ClientProvider
      appName='Stacks OS'
      appIconUrl='favicon.ico'
      network='mainnet'
    >
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Second Layer</title>
            <meta
              name='description'
              content='An opinionated UI framework for building apps on Bitcoin.'
            />
          </Head>
          <main
            className={`${cartograph.variable} ${monasans.variable} font-sans bg-gray-50 dark:bg-neutral-900/10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23262626' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </ThemeProvider>
    </MicroStacks.ClientProvider>
  );
}
