import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '../components/common/BottomNavigation';
import AppBar from '../components/common/AppBar';
import Card from '../components/index/Card';
import Explore from '../components/index/Explore';

export default () => {
  const [current, setCurrent] = useState(1);
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

  const getTitle = useCallback(value => {
    switch (value) {
      case 0:
        return '收藏';
      case 1:
        return '发现';
      case 2:
        return '我的';
    }
  });

  return (
    <Grid container direction="column">
      <Grid item container>
        <AppBar title={getTitle(current)} />
      </Grid>
      <Grid item container className={classes.mainContainer}>
        {getMainLayout(current)}
      </Grid>
      <Grid item container>
        <BottomNavigation value={current} onChange={setCurrent} />
      </Grid>
    </Grid>
  );
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

const useStyles = makeStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }
  },
  mainContainer: {
    padding: '32px 16px 88px 16px'
  }
});
