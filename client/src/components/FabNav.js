import React, { useState, useContext, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { 
	ThemeContext, 
	// getTopNavHeight,
	// getColorPrimaryDark,
	// getSecondaryBackgroundColor,
	// getNavMobileZIndex,
	getPlayerHeight,
} from '../contexts/theme.context';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fab from '@material-ui/core/Fab';
import Apps from '@material-ui/icons/Apps';
import Home from '@material-ui/icons/Home';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Storage from '@material-ui/icons/Storage';

const Container = styled.div`
	position: fixed;
	bottom: ${getPlayerHeight}px;
	margin-bottom: 10px;
	right: 10px;
`

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0;
`

const NavItem = styled(posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
}))`
	border: 1px solid red;
	background: green;
	width: 56px;
	height: 56px;
	line-height: 68px;
	padding: auto;
	border-radius: 100%;
	margin-top: 10px;
`

const renderLocationIcon = location => {
	switch(location) {
		case '/':
			return <Home />
		case '/library':
			return <Storage />
		case '/uploader':
			return <CloudUpload />

		default: return <Apps />
	}
}

const FabNav = props => {
	const theme = useContext(ThemeContext);
	const [showNav, toggleNav] = useState(false);
	const { locationPathname } = props;

	console.log('*** locationPathname:', locationPathname)

	return (
		<ClickAwayListener onClickAway={() => toggleNav(false)}>
			<Container theme={theme}>
				<NavList>
					<PoseGroup>
						{	showNav && [
							<NavItem key="home"> 
								<NavLink
					        to="/"
					        value="/"
					        onClick={() => toggleNav(false)}
								>
									<Home />
								</NavLink>
							</NavItem>,
							<NavItem key="library">
								<NavLink 
					        to="/library"
					        value="/library"
					        onClick={() => toggleNav(false)}
								>
									<Storage />
								</NavLink>
							</NavItem>,
							<NavItem key="uploader">
								<NavLink 
					        to="/uploader"
					        value="/uploader"
					        onClick={() => toggleNav(false)}
								>
									<CloudUpload />
								</NavLink>
							</NavItem>
						]}
					</PoseGroup>
				</NavList>
				<Fab 
					color="primary"
					aria-label="Sow nav"
					onClick={() => toggleNav(!showNav)}
				>
					{renderLocationIcon(locationPathname)}
				</Fab>
			</Container>
		</ClickAwayListener>
	);
}

export default FabNav;