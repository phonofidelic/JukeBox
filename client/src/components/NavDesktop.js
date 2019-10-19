import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../contexts/theme.context';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Storage from '@material-ui/icons/Storage';
import ExitToApp from '@material-ui/icons/ExitToApp';
import withTheme from '@material-ui/core/styles/withTheme';

class NavDesktop extends Component {
  static contextType = ThemeContext;

  // state = {
  //   currentPath: '/'
  // }

  // handleChange(e, value) {
  //   console.log('### NAV CHANGE, value:', value)
  //   this.setState({currentPath: value})
  // }

  render() {
    const { locationPathname, handleSignOut } = this.props;

    console.log('====================================');
    console.log('locationPathname:', locationPathname);
    console.log('====================================');
    const theme = this.context;

    const styles = {
      root: {
        position: 'fixed',
        left: '0px',
        top: '0px',
        height: '100vh',
        width: theme.dimensions.navDesktop.navWidth,
        padding: 10,
        marginTop: theme.dimensions.navDesktop.marginTop,
        backgroundColor: theme.palette.secondary.light
        // boxShadow: '0px -1px 10px 1px #ccc',
        // zIndex: 1,
      }
    };

    return (
      <Grid
        container
        component={BottomNavigation}
        value={locationPathname}
        alignContent={'flex-start'}
        style={styles.root}
        showLabels
        // onChange={this.handleChange}
      >
        <BottomNavigationAction
          component={Link}
          to="/home"
          label={
            <Typography color="inherit" variant="caption">
              Home
            </Typography>
          }
          value="/"
          icon={<Home />}
        />
        <BottomNavigationAction
          component={Link}
          to="/library"
          label={
            <Typography color="inherit" variant="caption">
              Library
            </Typography>
          }
          value="/library"
          icon={<Storage />}
        />
        <BottomNavigationAction
          component={Link}
          to="/uploader"
          label={
            <Typography color="inherit" variant="caption">
              Uploader
            </Typography>
          }
          value="/uploader"
          icon={<CloudUpload />}
        />
        {/* <BottomNavigationAction
          onClick={() => handleSignOut()}
          label={
            <Typography color="inherit" variant="caption">
              Sign out
            </Typography>
          }
          icon={<ExitToApp />}
        /> */}
      </Grid>
    );
  }
}

NavDesktop.propTypes = {
  locationPathname: PropTypes.string.isRequired
};

export default withTheme(NavDesktop);
