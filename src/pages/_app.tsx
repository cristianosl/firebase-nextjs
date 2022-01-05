import type { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import React from 'react';
import { getApolloClient } from '../services/getApolloClient';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Provider store={store}>
      <Component {...pageProps} />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
    </Provider>
    </ApolloProvider>)
}

export default MyApp
