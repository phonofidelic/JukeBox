import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { 
  Home,
  FileUpload,
  Storage,
  ExitToApp,
} from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

class NavMobile extends Component {
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
        bottom: '0px',
        width: '100%',
        height: theme.dimensions.nav.navHeight,
        backgroundColor: '#fafafa',
        borderTop: `solid 1px ${theme.palette.primary.main}`,
        zIndex: 3,
      },
    }

    console.log('location:', location)
    return(
      <BottomNavigation 
        value={location.pathname}
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
      </BottomNavigation>
    );
  };
}

export default withTheme()(NavMobile);
