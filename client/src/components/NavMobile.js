import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Storage from '@material-ui/icons/Storage';
import ExitToApp from '@material-ui/icons/ExitToApp';
import withTheme from '@material-ui/core/styles/withTheme';

class NavMobile extends Component {
  render() {
    const { 
      locationPathname,
      handleSignOut,
      theme,
    } = this.props;

    const styles = {
      root: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        height: theme.dimensions.navMobile.height,
        backgroundColor: '#fafafa',
        zIndex: theme.dimensions.navMobile.zIndex,
      }
    }

    return(
      <BottomNavigation 
        value={locationPathname}
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
          icon={<CloudUpload />} 
        />
        <BottomNavigationAction 
          onClick={() => handleSignOut()}
          label={<Typography color="inherit" variant="caption">Sign out</Typography>} 
          icon={<ExitToApp />} 
        />
      </BottomNavigation>
    );
  };
}

NavMobile.propTypes = {
  locationPathname: PropTypes.string.isRequired
};

export default withTheme()(NavMobile);
