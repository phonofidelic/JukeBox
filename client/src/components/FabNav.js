import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
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

const FabNav = props => {
	const theme = useContext(ThemeContext);
	const [showNav, toggleNav] = useState(false);
	const styles = {
		navItem: {
			marginTop: '10px',
		}
	}

	return (
		<ClickAwayListener onClickAway={() => toggleNav(false)}>
			<Container theme={theme}>
				{
					showNav &&
					<NavList>
						<Fab 
							style={styles.navItem}
							component={NavLink} 
			        to="/"
			        value="/"
			        onClick={() => toggleNav(false)}
						>
							<Home />
						</Fab>
						<Fab 
							style={styles.navItem}
							component={NavLink} 
			        to="/library"
			        value="/library"
			        onClick={() => toggleNav(false)}
						>
							<Storage />
						</Fab>
						<Fab 
							style={styles.navItem}
							component={NavLink} 
			        to="/uploader"
			        value="/uploader"
			        onClick={() => toggleNav(false)}
						>
							<CloudUpload />
						</Fab>
					</NavList>
				}

				<Fab 
					color="primary"
					aria-label="Sow nav"
					onClick={() => toggleNav(!showNav)}
				>
					<Apps />
				</Fab>
			</Container>
		</ClickAwayListener>
	);
}

export default FabNav;