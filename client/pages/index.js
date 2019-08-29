import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '../components/common/BottomNavigation';
import AppBar from '../components/common/AppBar';
import Card from '../components/index/Card';

export default () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(gql`
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
  `);

  let books = [];

  if (!loading && !error && data.user) books = data.user.books;

  return (
    <Grid container direction="column">
      <Grid item container>
        <AppBar />
      </Grid>
      <Grid item container className={classes.mainContainer}>
        {books.map(o => (
          <Card key={o.id} />
        ))}
      </Grid>
      <Grid item container>
        <BottomNavigation />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }
  },
  mainContainer: {
    padding: '32px 16px'
  }
});
