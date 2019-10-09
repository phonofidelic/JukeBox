import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  }
}));

const CookieMessage = () => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.root}
      message="This website uses cookies for security and performance purposes. By continuing to use this site, you agree to the use of cookies."
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <Button color="secondary" onClick={() => setOpen(false)}>
          Ok
        </Button>
      }
    />
  );
};

export default CookieMessage;
