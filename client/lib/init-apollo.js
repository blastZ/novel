import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

function create(initialState) {
  const isBrowser = typeof window !== 'undefined';

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: onError(({ networkError }) => {
      if (networkError.statusCode === 401) {
        typeof window !== 'undefined' && (window.location = '/login');
      }
    }).concat(
      new HttpLink({
        uri: 'http://127.0.0.1:1338/graphql',
        credentials: 'include',
        fetch: !isBrowser && fetch
      })
    ),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
