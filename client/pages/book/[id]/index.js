import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '../../../components/common/AppBar';

export default () => {
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

  return <Grid container>test</Grid>;
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
