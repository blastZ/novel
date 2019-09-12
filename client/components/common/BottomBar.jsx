import { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TopIcon from '@material-ui/icons/ArrowUpwardRounded';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/MenuBook';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExploreIcon from '@material-ui/icons/Explore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default ({ handleCurrent, router }) => {
  const classes = useStyles();

  const handleTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExplore = useCallback(() => {
    handleCurrent(1);
    router.push('/').then(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const handleFavorite = useCallback(() => {
    handleCurrent(0);
    router.push('/').then(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <Grid className={classes.bottomBar} container alignItems="center" justify="space-evenly">
      <Grid item>
        <Button onClick={handleExplore}>
          <ExploreIcon className={classes.icon} />
          发现
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleFavorite}>
          <FavoriteIcon className={classes.icon} />
          收藏
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleTop}>
          <TopIcon />
          返回顶部
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  bottomBar: {
    background: theme.palette.primary[500],
    '& *': {
      color: '#fff'
    },
    height: 56
  },
  icon: {
    marginRight: 4
  }
}));
