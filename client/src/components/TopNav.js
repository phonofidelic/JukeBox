import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';

class TopNav extends Component {
	render() {
		const { theme } = this.props;
		const styles = {
			root: {
				position: 'fixed',
        top: '0px',
        width: '100%',
        height: theme.dimensions.topNav.height,
        lineHeight: `${theme.dimensions.topNav.height}px`,
        backgroundColor: '#fafafa',
        zIndex: theme.dimensions.navMobile.zIndex,
			},
			navPoint: {
				border: `solid ${theme.palette.primary.dark} 1px`,
				borderRadius: '100%',
				height: '10px',
				width: '10px',
				display: 'inline-block',
				
				verticalAlign: 'middle',
				margin: '5px',
			},
			active: {
				backgroundColor: theme.palette.primary.dark,
			}
		}
		return (
			<div style={styles.root}>
				<NavLink 
					to="/"
					style={styles.navPoint}
					activeStyle={styles.active}
					exact={true}
				></NavLink>
				<NavLink 
					to="/library"
					style={styles.navPoint}
					activeStyle={styles.active}
					exact={true}
				></NavLink>
				<NavLink 
					to="/uploader"
					style={styles.navPoint}
					activeStyle={styles.active}
					exact={true}
				></NavLink>
			</div>
		);
	}
}

export default withTheme()(TopNav);
