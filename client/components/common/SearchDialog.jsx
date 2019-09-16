import { useState, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { useRouter } from 'next/router';

export default ({ open, onClose }) => {
  const classes = useStyles();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = useCallback(
    e => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );

  const handleSearch = useCallback(
    value => () => {
      if (value.trim() !== '') {
        onClose();
        router.push(`/search?keyword=${value}`);
      }
    },
    []
  );

  return (
    <Dialog
      classes={{
        paper: classes.paper
      }}
      onClose={onClose}
      aria-labelledby="search-dialog"
      open={open}>
      <DialogTitle>小说搜索</DialogTitle>
      <DialogContent>
        <Input
          value={searchValue}
          onChange={handleChange}
          placeholder="请输入书名或作者搜索"
          className={classes.input}
          inputProps={{
            'aria-label': 'search-value'
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
        <Button onClick={handleSearch(searchValue)} color="primary">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%'
  },
  input: {
    width: '100%'
  }
}));
