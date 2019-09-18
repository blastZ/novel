import { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleName = useCallback(e => {
    setName(e.target.value);
  }, []);

  const handlePassword = useCallback(e => {
    setPassword(e.target.value);
  });

  const handleLogin = useCallback(
    (name, password) => () => {
      fetch('http://127.0.0.1:1338/api/v1/user/login', {
        method: 'POST',
        body: JSON.stringify({
          name,
          password
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(o => o.json())
        .then(o => {
          if (o.success) {
            router.replace('/');
          }
        });
    },
    []
  );

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <TextField
          id="outlined-name"
          label="用户名"
          className={classes.textField}
          value={name}
          onChange={handleName}
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="password"
          id="outlined-password"
          label="密码"
          className={classes.textField}
          value={password}
          onChange={handlePassword}
          margin="normal"
          variant="outlined"
        />
        <Button onClick={handleLogin(name, password)} variant="contained" color="primary" className={classes.button}>
          登陆
        </Button>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({
  card: {
    width: '80%',
    height: 'calc(100vh - 32px - 56px - 32px - 56px)'
  },
  cardContent: {
    paddingTop: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: 160,
    marginTop: 32
  }
});
