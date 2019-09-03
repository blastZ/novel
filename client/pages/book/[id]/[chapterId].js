import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';

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

  if (loading) return <div>Loading...</div>;

  const { name, content } = data.chapter;
  const lines = content.split('<br>').filter(o => o);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.content}>
        <div>
          {lines.map(
            (line, index) =>
              line.trim() !== '' && (
                <p key={index} className={classes.line}>
                  {line}
                </p>
              )
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    background: `#000`,
    color: `#fff`,
    overflowY: 'auto',
    padding: '80px 32px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '18px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '900px',
    maxWidth: '100%',
    margin: '0 auto',
    fontSize: `18`,
    letterSpacing: `0.2em`,
    lineHeight: `180%`
  },
  line: {
    margin: `15 0px`,
    padding: '0px 8px'
  }
}));

const GET_CHAPTER = gql`
  query getChapter($id: ID!, $bookId: ID!) {
    chapter(id: $id, bookId: $bookId) {
      id
      bookId
      name
      content
    }
  }
`;
