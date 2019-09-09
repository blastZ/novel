import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Router from 'next/router';

export default () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TOP_BOOKS);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  const { topBooks } = data;

  return (
    <Grid container direction="column" spacing={3}>
      {topBooks.map(o => (
        <Grid key={o.top.id} item>
          <TopBooksCard key={o.category} data={o} classes={classes} />
        </Grid>
      ))}
    </Grid>
  );
};

const TopBooksCard = ({ data, classes }) => {
  console.log(data);

  const handleClick = React.useCallback(
    id => () => {
      Router.push(`/book/${id}`);
    },
    []
  );

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader} title={data.category} />
      <CardContent className={classes.cardContent}>
        <Grid container direction="column">
          <Grid item container spacing={2}>
            <Grid onClick={handleClick(data.top.id)} item xs={5}>
              <img style={{ width: '100%' }} src={data.top.thumb} />
            </Grid>
            <Grid item xs={7} container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">{data.top.name}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.topDesc} variant="body2">
                  {data.top.desc}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container>
            <List component="nav" className={classes.list}>
              {data.list.map(oo => (
                <React.Fragment key={oo.id}>
                  <ListItem button component="a" key={oo.id} href={oo.id}>
                    <ListItemText primary={`${oo.name} / ${oo.author}`} />
                  </ListItem>
                  <Divider light />
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const GET_TOP_BOOKS = gql`
  query getTopBooks {
    topBooks {
      category
      top {
        thumb
        id
        name
        desc
      }
      list {
        id
        name
        author
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  card: {
    width: '100%'
  },
  cardHeader: {
    background: '#f5f5f5'
  },
  cardContent: {
    width: '100%'
  },
  list: {
    width: '100%'
  },
  topDesc: {
    color: '#B3B3B3'
  }
}));
