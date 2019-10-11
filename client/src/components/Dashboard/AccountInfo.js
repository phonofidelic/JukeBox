import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme.context';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';

const STORAGE_MAX = 16106127360;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    textAlign: 'left'
  }
}));

const AccountInfo = ({ user }) => {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);

  /**
   * Byte converter from Stackoverflow: https://stackoverflow.com/a/18650828
   */
  const formatBytes = (a, b) => {
    if (0 == a) return '0 Bytes';
    var c = 1024,
      d = b || 2,
      e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  };

  return (
    <List
      className={classes.root}
      subheader={<ListSubheader>Account Info</ListSubheader>}
    >
      <ListItemText>
        <ListItem>Email: {user.email}</ListItem>
      </ListItemText>
      <ListItem>
        <div>
          <ListItemText>
            Storage usage: {formatBytes(user.storageUsage)}
          </ListItemText>
          <LinearProgress
            variant="determinate"
            value={user.storageUsage / STORAGE_MAX}
            color="secondary"
          />
        </div>
      </ListItem>
    </List>
  );
};

export default AccountInfo;
