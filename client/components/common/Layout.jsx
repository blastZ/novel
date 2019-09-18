import { useState, useCallback } from 'react';
import AppBar from './AppBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import BottomNavigation from './BottomNavigation';
import useApp from '../../reducer/useApp';
import BottomBar from './BottomBar';

export default props => {
  const router = useRouter();
  const isIndex = router.route === '/';
  const isSearch = router.route === '/search';
  const isLogin = router.route === '/login';

  const classes = useStyles({ isIndex });
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
  }, []);

  const showAppBar = !isLogin;
  const showBottomNavigation = isIndex;
  const showBottomInfo = !isIndex && !isLogin;

  return (
    <>
      <Grid className={classes.container} container direction="column">
        {showAppBar && (
          <Grid item container>
            <AppBar isIndex={isIndex} isSearch={isSearch} title={getTitle(current)} />
          </Grid>
        )}
        <Grid item container className={classes.mainContainer} justify="center">
          {props.children}
        </Grid>
        {showBottomNavigation && (
          <Grid item container>
            <BottomNavigation value={current} onChange={handleCurrent} />
          </Grid>
        )}
      </Grid>
      {showBottomInfo && <BottomBar handleCurrent={handleCurrent} router={router} />}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  mainContainer: {
    height: '100%',
    background: 'linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%)',
    padding: ({ isIndex }) => `${56 + 32}px 16px ${isIndex ? 88 : 32}px 16px`
  }
}));
