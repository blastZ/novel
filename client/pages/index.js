import { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../components/index/Card';
import Explore from '../components/index/Explore';
import useApp from '../reducer/useApp';

export default () => {
  const {
    state: { current }
  } = useApp();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USER);

  let books = [];

  if (!loading && !error && data.user) books = data.user.books;

  const getMainLayout = useCallback(value => {
    switch (value) {
      case 0:
        return (
          <React.Fragment>
            {books.map(o => (
              <Card key={o.id} />
            ))}
          </React.Fragment>
        );
      case 1:
        return <Explore />;
      case 2:
        return <div>Setting</div>;
    }
  }, []);

  return <Grid container>{getMainLayout(current)}</Grid>;
};

const GET_USER = gql`
  query getUser {
    user {
      id
      name
      books {
        id
        name
        thumb
      }
    }
  }
`;

const useStyles = makeStyles({});
