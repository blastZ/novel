import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/styles';

import withApolloClient from '../lib/with-apollo-client';
import theme from '../lib/theme';

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
