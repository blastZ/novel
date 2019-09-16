import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Loading from '../components/common/Loading';

export default () => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    setValue(keyword);
  }, []);

  const { data, error, loading, refetch } = useQuery(SEARCH_BOOKS, {
    variables: {
      keyword
    }
  });

  const handleChange = useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const handleSearch = useCallback(
    value => () => {
      router.replace(`/search?keyword=${value}`);
    },
    [refetch]
  );

  if (loading) return <Loading />;
  if (error) return <div>error...</div>;

  const { books } = data;
  console.log(books);

  return (
    <Grid className={classes.container} container direction="column" spacing={2} alignItems="center">
      <Grid className={classes.searchBar} alignItems="center" item container spacing={3}>
        <Grid className={classes.inputRoot} item>
          <Input
            value={value}
            onChange={handleChange}
            placeholder="请输入书名或作者搜索"
            className={classes.input}
            inputProps={{
              'aria-label': 'search-value'
            }}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSearch(value)} variant="contained" color="primary">
            搜索
          </Button>
        </Grid>
      </Grid>
      {books.map(book => (
        <Book key={book.id} classes={classes} book={book} />
      ))}
    </Grid>
  );
};

const Book = ({ book, classes }) => (
  <Grid item container spacing={2}>
    <Grid item xs={5}>
      <img className={classes.thumb} src={book.thumb} />
    </Grid>
    <Grid item xs={7} container direction="column" spacing={1}>
      <Typography className={classes.title} variant="h6">
        {book.name}
      </Typography>
      <Grid className={classes.desc} item>
        <Typography variant="caption">{book.desc}</Typography>
      </Grid>
      <Grid className={classes.subTitle} item>
        <Typography variant="body2">{`作者：${book.author}`}</Typography>
      </Grid>
      <Grid className={classes.subTitle} item>
        <Typography variant="body2">{`分类：${book.category}`}</Typography>
      </Grid>
      <Grid className={classes.subTitle} item>
        <Typography variant="body2">{`更新时间：${book.updatedAt}`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{`最新章节：${book.latest.name}`}</Typography>
      </Grid>
    </Grid>
  </Grid>
);

const SEARCH_BOOKS = gql`
  query searchBooks($keyword: String!) {
    books(keyword: $keyword) {
      id
      name
      category
      thumb
      desc
      author
      updatedAt
      latest {
        id
        name
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 800,
    minHeight: 'calc(100vh - 56px)'
  },
  title: {
    marginBottom: 4
  },
  subTitle: {
    color: '#888'
  },
  thumb: {
    width: '100%',
    maxWidth: 240
  },
  desc: {
    '& > span': {
      '-webkit-line-clamp': 2,
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-box-orient': 'vertical'
    }
  },
  searchBar: {
    width: '80%',
    marginTop: 4,
    marginBottom: 24
  },
  inputRoot: {
    flex: 1
  },
  input: {
    width: '100%'
  }
}));
