import React, { Component } from 'react';
import styles from './Dashboard.styles';
import {
	Button,
	Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SecCodeForm from './SecCodeForm';

class Dashboard extends Component {
	state = {
		showSecCodeForm: false
	}

	handleGDButtonClick = () => {
		this.setState({showSecCodeForm: true});
		this.props.handleGDriveConnect();
	}

	render() {
		const { 
			user,
			classes,
			handleSignOut,
			handleSubmitGDSecCode,
		} = this.props;

		return (
			<div className={classes.root}>
				<Typography>email: { user && user.email }</Typography>
				<div>
					<Button variant="outlined" onClick={() => this.handleGDButtonClick()}>Connect Google Drive</Button>
				</div>
				{/*<div>
					{this.state.showSecCodeForm && <SecCodeForm handleSubmitGDSecCode={handleSubmitGDSecCode} />}
				</div>*/}
				<div>
					<Button variant="outlined" onClick={() => handleSignOut()}>Sign out</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Dashboard);