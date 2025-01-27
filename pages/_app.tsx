import '@mantine/core/styles.css';
import '../style.css';

import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { setupStore } from '@/components/state/store';
import { appTheme } from '@/components/theme';
import { FullPageTobamsLoader } from '@/components/TobamsLoader';
import { emotionCache } from '@/emotion/cache';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [loading, setLoading] = useState(true);
  const handlePageScroll = useCallback(() => {
    setTimeout(() => {
      if (typeof window !== undefined && window.location.hash) {
        const pageSection = document.getElementById(window.location.hash.substring(1));
        if (pageSection && pageSection.offsetTop) {
          window.scrollTo({
            top: pageSection.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    setLoading(false);
    handlePageScroll();
  }, [handlePageScroll]);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
    handlePageScroll();
  });
  return (
    <Provider store={setupStore()}>
      <MantineEmotionProvider cache={emotionCache}>
        <MantineProvider
          stylesTransform={emotionTransform}
          theme={appTheme}
          defaultColorScheme="light"
        >
          <Head>
            <title>Homiverse</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg" />
          </Head>

          {loading ? <FullPageTobamsLoader /> : <>{getLayout(<Component {...pageProps} />)}</>}
        </MantineProvider>
      </MantineEmotionProvider>
    </Provider>
  );
}
