import { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
    <Grid className={classes.container} container direction="column" alignItems="center">
      <Grid className={classes.content} item container direction="column" alignItems="center">
        <Grid item>
          <TextField
            autoComplete="off"
            id="outlined-name"
            label="用户名"
            className={classes.textField}
            value={name}
            onChange={handleName}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            id="outlined-password"
            label="密码"
            className={classes.textField}
            value={password}
            onChange={handlePassword}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleLogin(name, password)} variant="contained" color="secondary" className={classes.button}>
            登陆
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  container: {
    background: `linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%)`,
    height: '100vh'
  },
  content: {
    marginTop: '35%'
  },
  textField: {
    background: 'rgba(0,0,0,0.3)',
    '& > *': {
      color: '#fff !important'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid rgba(0,0,0,0.4) !important',
      borderRadius: 0
    }
  },
  button: {
    width: 203,
    height: 56,
    marginTop: 32,
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    fontSize: 16
  }
});
