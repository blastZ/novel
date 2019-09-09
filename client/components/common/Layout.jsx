import { useState, useCallback } from 'react';
import AppBar from './AppBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import BottomNavigation from './BottomNavigation';
import useApp from '../../reducer/useApp';

export default props => {
  const router = useRouter();
  const isIndex = router.route === '/';

  const classes = useStyles();
  const {
    state: { current },
    handleCurrent
  } = useApp();

  const getTitle = useCallback(value => {
    if (!isIndex) return '';

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
        {props.children}
      </Grid>
      {isIndex && (
        <Grid item container>
          <BottomNavigation value={current} onChange={handleCurrent} />
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles({
  mainContainer: {
    padding: '32px 16px 88px 16px'
  }
});
