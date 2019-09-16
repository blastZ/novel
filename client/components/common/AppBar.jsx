import { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useRouter } from 'next/router';

import SearchDialog from './SearchDialog';

export default ({ title, isIndex, isSearch, isChapter }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const classes = useStyles({
    isChapter
  });
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
  }, [setSearchOpen]);

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false);
  }, [setSearchOpen]);

  const showBackIcon = !isIndex;
  const showSearchIcon = !isSearch;

  return (
    <div className={classes.root}>
      <SearchDialog onClose={handleSearchClose} open={searchOpen} />
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {showBackIcon && (
            <IconButton onClick={handleBack} edge="start" color="inherit" aria-label="back">
              <BackIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {showSearchIcon && (
            <IconButton onClick={handleSearchOpen} edge="start" color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  appBar: {}
}));
