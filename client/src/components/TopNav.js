import React, { Component, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { 
	ThemeContext, 
	getTopNavHeight,
	getColorPrimaryDark,
	getSecondaryBackgroundColor,
	getNavMobileZIndex,
} from '../contexts/theme.context';
import styled from 'styled-components';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Storage from '@material-ui/icons/Storage';

// const Container = styled.div`
// 	position: fixed;
// 	top: 0px;
// 	width: 100%;
// 	height: ${getTopNavHeight}px;
// 	line-height: ${getTopNavHeight}px;
// 	background-color: ${getSecondaryBackgroundColor};
// 	z-index: ${getNavMobileZIndex};
// `

// const NavPoint = styled(NavLink)`
// 	border: solid ${getColorPrimaryDark} 1px;
// 	border-radius: 100%;
// 	height: 10px;
// 	width: 10px;
// 	display: inline-block;
// 	vertical-align: middle;
// 	margin: 5px;
// `

const Container = styled(BottomNavigation)`
	position: fixed;
	bottom: 0px;
	width: 100%;
	// height: ${getTopNavHeight}px;
	// line-height: ${getTopNavHeight}px;
	background-color: ${getSecondaryBackgroundColor};
	z-index: ${getNavMobileZIndex};
`

const NavPoint = styled(NavLink)`
	border: solid ${getColorPrimaryDark} 1px;
	border-radius: 100%;
	height: 10px;
	width: 10px;
	display: inline-block;
	vertical-align: middle;
	margin: 5px;
`

const TopNav = props => {
	const theme = useContext(ThemeContext);
	const { locationPathname } = props;

	// return (
	// 	<Container theme={theme}>
	// 		<NavPoint
	// 			theme={theme}
	// 			to="/"
	// 			activeStyle={{'backgroundColor': '#222'}}
	// 			exact={true}
	// 		/>
	// 		<NavPoint
	// 			theme={theme}
	// 			to="/library"
	// 			activeStyle={{'backgroundColor': '#222'}}
	// 			exact={true}
	// 		/>
	// 		<NavPoint
	// 			theme={theme}
	// 			to="/uploader"
	// 			activeStyle={{'backgroundColor': '#222'}}
	// 			exact={true}
	// 		/>
	// 	</Container>
	// );

	return(
    <Container 
      value={locationPathname}
      showLabels
      theme={theme}
    >
      <BottomNavigationAction 
        component={NavLink} 
        to="/"
        label={<Typography color="inherit" variant="caption">Home</Typography>}
        value="/" 
        icon={<Home />} 
      />
      <BottomNavigationAction 
        component={NavLink} 
        to="/library"
        label={<Typography color="inherit" variant="caption">Library</Typography>}
        value="/library" 
        icon={<Storage />} 
      />
      <BottomNavigationAction 
        component={NavLink}
        to="/uploader" 
        label={<Typography color="inherit" variant="caption">Uploader</Typography>}
        value="/uploader" 
        icon={<CloudUpload />} 
      />
      {/*<BottomNavigationAction 
        onClick={() => handleSignOut()}
        label={<Typography color="inherit" variant="caption">Sign out</Typography>} 
        icon={<ExitToApp />} 
      />*/}
    </Container>
  );
}

export default TopNav;
