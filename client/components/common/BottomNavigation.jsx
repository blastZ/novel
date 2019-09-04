import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExploreIcon from '@material-ui/icons/Explore';
import PersonIcon from '@material-ui/icons/Person';

export default ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={value}
      onChange={(e, value) => {
        onChange(value);
      }}
      showLabels
      className={classes.root}>
      <BottomNavigationAction value={0} label="收藏" icon={<FavoriteIcon />} />
      <BottomNavigationAction value={1} label="发现" icon={<ExploreIcon />} />
      <BottomNavigationAction value={2} label="我的" icon={<PersonIcon />} />
    </BottomNavigation>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: '#fafafa',
    color: '#fff'
  }
});
