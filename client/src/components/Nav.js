import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import { 
  Home,
  FileUpload,
  Storage,
  ExitToApp,
} from 'material-ui-icons';

class Nav extends Component {
  render() {
    const styles = {
      root: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
      }
    }

    return(
      <BottomNavigation 
        value={null}
        showLabels 
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
          to="/tracklist"
          label="Tracks" 
          value="/tracklist" 
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
          component={Link}
          to="/login" 
          label="Sign out" 
          value="/login" 
          icon={<ExitToApp />} 
        />
      </BottomNavigation>
    );
  };
}

export default Nav;
