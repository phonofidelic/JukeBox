import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation, 
  BottomNavigationAction,
  Grid,
} from '@material-ui/core';
import { 
  Home,
  FileUpload,
  Storage,
  ExitToApp,
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

class NavDesktop extends Component {
  state = {
    value: '/library',
  }

  handleChange(event, value) {
    console.log(value)
    this.setState({ value: value });
  };

  render() {
    const { theme, location } = this.props;
    const { value } = this.state;
    const styles = {
      root: {
        position: 'fixed',
        left: '0px',
        top: '0px',
        height: '100vh',
        width: theme.dimensions.navDesktop.navWidth,
        // height: theme.dimensions.nav.navHeight,
        backgroundColor: theme.palette.secondary.light,
        zIndex: 1,
      },
    }

    console.log('location:', location)
    return(
      <Grid 
        container
        component={BottomNavigation} 
        value={location.pathname}
        alignContent={'flex-start'}
        style={styles.root}
      >
        <BottomNavigationAction 
          component={Link} 
          to="/"
          label="Home" 
          value="/" 
          icon={<Home />} 
        />
        <BottomNavigationAction 
          component={Link} 
          to="/library"
          label="Library" 
          value="/library" 
          icon={<Storage />} 
        />
        <BottomNavigationAction 
          component={Link}
          to="/uploader" 
          label="Uploader" 
          value="/uploader" 
          icon={<FileUpload />} 
        />
        <BottomNavigationAction 
          onClick={() => this.props.handleSignOut()}
          label="Sign out" 
          icon={<ExitToApp />} 
        />
      </Grid>
    );
  };
}

export default withTheme()(NavDesktop);
