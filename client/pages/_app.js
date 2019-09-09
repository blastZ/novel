import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';

import withApolloClient from '../lib/with-apollo-client';
import theme from '../lib/theme';
import Layout from '../components/common/Layout';
import { AppProvider } from '../reducer/useApp';

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
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

const styles = () => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }
  }
});

export default withApolloClient(withStyles(styles)(MyApp));
