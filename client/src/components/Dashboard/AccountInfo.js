import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme.context';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ByteConverter from 'byte-converter-react';

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

  return (
    <List
      className={classes.root}
      subheader={<ListSubheader>Account Info</ListSubheader>}
    >
      <ListItemText>
        <ListItem>Email: {user.email}</ListItem>
      </ListItemText>
      <ListItemText>
        <ListItem>
          Storage usage:{' '}
          <ByteConverter useSI inUnit="B" outUnit="MB">
            {user.storageUsage}
          </ByteConverter>{' '}
          MB
        </ListItem>
      </ListItemText>
    </List>
  );
};

export default AccountInfo;
