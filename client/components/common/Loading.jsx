import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} alignItems="center" justify="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  container: {
    height: 'calc(100vh - 56px - 64px)'
  }
});
