import React, { Component } from 'react';
import styles from './Dashboard.styles';
import {
	Button,
	Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class Dashboard extends Component {

	render() {
		const { 
			user,
			classes,
			handleSignOut
		} = this.props;

		return (
			<div className={classes.root}>
				<Typography>email: { user && user.email }</Typography>
				<Button variant="outlined" onClick={() => handleSignOut()}>Sign out</Button>
			</div>
		);
	}
}

export default withStyles(styles)(Dashboard);