import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';

import withApolloClient from '../lib/with-apollo-client';
import theme from '../lib/theme';

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
            <Component {...pageProps} />
          </AppProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

const styles = () => ({
  '@global': {
    'html, body': {
      height: '100%',
      margin: 0,
      padding: 0
    },
    '#__next': {
      minHeight: '100%'
    },
    '*': {
      boxSizing: 'border-box',
      scrollBehavior: 'smooth'
    },
    input: {
      '&:-internal-autofill-selected, &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
        '-webkit-text-fill-color': 'white',
        border: 'none',
        '-webkit-box-shadow': '0 0 0px 1000px rgba(0, 0, 0, 0.8) inset',
        background: 'none !important',
        color: 'white !important'
      }
    },
    textarea: {
      '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
        '-webkit-text-fill-color': 'white',
        border: 'none',
        '-webkit-box-shadow': '0 0 0px 1000px rgba(0, 0, 0) inset'
      }
    }
  }
});

export default withApolloClient(withStyles(styles)(MyApp));
