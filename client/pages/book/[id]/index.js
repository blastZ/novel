import { useState } from 'react';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SIZE = 20;

export default () => {
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery(GET_BOOK, {
    variables: {
      id
    }
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  const { book } = data;
  console.log(book);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={5}>
          <img className={classes.thumb} src={book.thumb} />
        </Grid>
        <Grid item xs={7} container direction="column" spacing={1}>
          <Typography className={classes.title} variant="h6">
            {book.name}
          </Typography>
          <Grid className={classes.subTitle} item container wrap="nowrap">
            <Grid item xs={6}>
              <Typography variant="body2">{`作者：${book.author}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{`分类：${book.category}`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.subTitle} item container wrap="nowrap">
            <Grid item xs={6}>
              <Typography variant="body2">{`状态：${book.status}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{`字数：0`}</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.subTitle} item>
            <Typography variant="body2">{`更新：${book.updatedAt}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{`最新：${book.latest.name}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography className={classes.title} variant="body1">
            内容简介
          </Typography>
        </Grid>
        <Grid className={classes.subTitle} item>
          <Typography className={classes.title} variant="body2">
            {book.desc}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <ChapterList classes={classes} book={book} page={page} />
    </Grid>
  );
};

const ChapterList = ({ classes, book, page }) => {
  return (
    <Grid item container>
      <Grid item>
        <Typography className={classes.title} variant="body1">
          章节列表
        </Typography>
      </Grid>
      <Grid item container>
        <Grid className={classes.listContainer} item>
          <List component="nav" aria-label="secondary mailbox folders">
            {book.chapters.slice(page * SIZE, page * SIZE + SIZE).map(o => (
              <div key={o.id}>
                <ListItem className={classes.listItem} button>
                  <ListItemText primary={o.name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      id
      name
      category
      status
      thumb
      desc
      author
      updatedAt
      latest {
        id
        name
      }
      chapters {
        id
        bookId
        name
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 8
  },
  subTitle: {
    color: '#888'
  },
  thumb: {
    width: '100%',
    maxWidth: 240
  },
  listContainer: {
    width: '100%'
  },
  listItem: {
    paddingLeft: 0
  }
}));
