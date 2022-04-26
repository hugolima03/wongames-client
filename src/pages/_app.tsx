import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextProgress from 'nextjs-progressbar'
import { SessionProvider } from 'next-auth/react'

import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'
import { useApollo } from 'utils/apollo'
import { CartProvider } from 'hooks/use-cart'
import { WishlistProvider } from 'hooks/use-wishlist'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <WishlistProvider>
              <Head>
                <title>Won Games</title>
                <link rel="shortcut icon" href="/img/icon-512.png" />
                <link rel="apple-touch-icon" href="/img/icon-512.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                  name="description"
                  content="The best Game Stores in the world!"
                />
              </Head>
              <DefaultSeo {...SEO} />
              <GlobalStyles />
              <NextProgress
                color="#F231A5"
                startPosition={0.3}
                stopDelayMs={200}
                height={5}
              />
              <Component {...pageProps} />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default App
