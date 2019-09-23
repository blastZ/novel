import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import SettingIcon from '@material-ui/icons/SettingsApplications';
import Button from '@material-ui/core/Button';

import Loading from '../../../components/common/Loading';

export default () => {
  const router = useRouter();
  const classes = useStyles();
  const { id, chapterId } = router.query;

  const { loading, error, data } = useQuery(GET_CHAPTER, {
    variables: {
      id: chapterId,
      bookId: id
    }
  });

  if (loading) return <Loading />;
  if (error) return <div>error...</div>;
  console.log(data);
  const { name, content } = data.chapter;
  const lines = content.split('<br>').filter(o => o);

  return (
    <Grid container className={classes.container}>
      <Header classes={classes} />
      <Grid item container justify="center">
        <Grid item>
          <Typography className={classes.title} variant="h4" align="center">
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.content} item container direction="column">
        {lines.map(
          (line, index) =>
            line.trim() !== '' &&
            !line.includes('www.biqiuge') && (
              <Grid item container key={index}>
                <Typography variant="body1" key={index} className={classes.line}>
                  {line}
                </Typography>
              </Grid>
            )
        )}
      </Grid>
      <Footer classes={classes} />
    </Grid>
  );
};

const Header = ({ classes }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <div className={classes.appBarRoot}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton onClick={handleBack} edge="start" color="inherit" aria-label="back">
            <BackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.appBarTitle}>
            {''}
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="back">
            <SettingIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const Footer = ({ classes }) => {
  return (
    <Grid className={classes.footer} container justify="space-between">
      <Grid item>
        <Button className={classes.pageButton}>上一页</Button>
      </Grid>
      <Grid item>
        <Button className={classes.pageButton}>下一页</Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    background: `#000`,
    color: `#fff`,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: `${56 + 32}px 16px 32px 16px`
  },
  title: {
    marginBottom: 32
  },
  content: {
    maxWidth: 900,
    width: '100%',
    margin: '0 auto',
    letterSpacing: `0.2em`,
    lineHeight: `180%`
  },
  line: {
    margin: `8px 0px`,
    padding: '0px 8px'
  },
  appBarRoot: {
    flexGrow: 1
  },
  appBarTitle: {
    flexGrow: 1,
    textAlign: 'center'
  },
  appBar: {
    background: 'rgba(0,0,0,1)'
  },
  footer: {
    margin: '16px 32px'
  },
  pageButton: {
    width: 96,
    color: '#fff',
    background: 'rgba(255,255,255,0.2)'
  }
}));

const GET_CHAPTER = gql`
  query getChapter($id: ID!, $bookId: ID!) {
    chapter(id: $id, bookId: $bookId) {
      id
      bookId
      name
      content
      book {
        chapters {
          id
        }
      }
    }
  }
`;
