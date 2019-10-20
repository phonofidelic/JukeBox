import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  theme,
  ThemeContext,
  getNavMobileHeight,
  getNavMobileZIndex
} from '../contexts/theme.context';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Storage from '@material-ui/icons/Storage';
import withTheme from '@material-ui/core/styles/withTheme';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  selected: theme.palette.secondary.main
};

const Container = styled(BottomNavigation)`
  border-top: 1px solid #dcdcdc;
  position: fixed;
  bottom: ${({ theme, showNav }) =>
    showNav ? 0 : -getNavMobileHeight({ theme })};
  width: 100%;
  height: ${({ theme }) => getNavMobileHeight({ theme })};
  background-color: #fafafa;
  z-index: ${({ theme }) => getNavMobileZIndex({ theme })};
`;

class NavMobile extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const { showNav, locationPathname } = this.props;
    const { classes } = this.props;

    // const styles = {
    //   root: {
    //     borderTop: '1px solid #dcdcdc',
    //     position: 'fixed',
    //     bottom: showNav ? '0px' : -getNavMobileHeight({ theme }),
    //     width: '100%',
    //     height: getNavMobileHeight({ theme }),
    //     backgroundColor: '#fafafa',
    //     zIndex: getNavMobileZIndex({ theme })
    //   }
    // };

    return (
      <Container
        value={locationPathname}
        classes={classes.root}
        showLabels
        showNav={showNav}
        theme={theme}
      >
        <BottomNavigationAction
          component={React.forwardRef((props, ref) => (
            <NavLink {...props} />
          ))}
          to="/home"
          label={
            <Typography color="inherit" variant="caption">
              Home
            </Typography>
          }
          value="/"
          icon={<Home />}
          classes={{ selected: classes.selected }}
          activeStyle={{ color: theme.palette.secondary.main }}
        />
        <BottomNavigationAction
          component={React.forwardRef((props, ref) => (
            <NavLink {...props} />
          ))}
          to="/library"
          label={
            <Typography color="inherit" variant="caption">
              Library
            </Typography>
          }
          value="/library"
          icon={<Storage />}
          classes={{ selected: classes.selected }}
          activeStyle={{ color: theme.palette.secondary.main }}
        />
      </Container>
    );
  }
}

NavMobile.propTypes = {
  locationPathname: PropTypes.string.isRequired
};

export default withStyles(styles)(NavMobile);
