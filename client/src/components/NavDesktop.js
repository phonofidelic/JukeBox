import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  BottomNavigation, 
  BottomNavigationAction,
  Grid,
  Typography,
} from '@material-ui/core';
import { 
  Home,
  FileUpload,
  Storage,
  ExitToApp,
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

class NavDesktop extends Component {
  render() {
    const { 
      locationPathname,
      handleSignOut,
      theme, 
    } = this.props;

    const styles = {
      root: {
        position: 'fixed',
        left: '0px',
        top: '0px',
        height: '100vh',
        width: theme.dimensions.navDesktop.navWidth,
        padding: 10,
        backgroundColor: theme.palette.secondary.light,
        zIndex: 1,
      },
    }

    return(
      <Grid 
        container
        component={BottomNavigation} 
        value={locationPathname}
        alignContent={'flex-start'}
        style={styles.root}
        showLabels
      >
        <BottomNavigationAction 
          component={Link} 
          to="/"
          label={<Typography color="inherit" variant="caption">Home</Typography>}
          value="/" 
          icon={<Home />} 
        />
        <BottomNavigationAction 
          component={Link} 
          to="/library"
          label={<Typography color="inherit" variant="caption">Library</Typography>}
          value="/library" 
          icon={<Storage />} 
        />
        <BottomNavigationAction 
          component={Link}
          to="/uploader" 
          label={<Typography color="inherit" variant="caption">Uploader</Typography>}
          value="/uploader" 
          icon={<FileUpload />} 
        />
        <BottomNavigationAction 
          onClick={() => handleSignOut()}
          label={<Typography color="inherit" variant="caption">Sign out</Typography>} 
          icon={<ExitToApp />} 
        />
      </Grid>
    );
  };
}

NavDesktop.propTypes = {
  locationPathname: PropTypes.string.isRequired
};


export default withTheme()(NavDesktop);
