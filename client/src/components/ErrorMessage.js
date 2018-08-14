import React, { Component } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Typography,	
} from '@material-ui/core';

class ErrorMessage extends Component {
	state = {
		errorDismissed: false
	}

	handleDismissError() {
		this.setState({
			errorDismissed: true
		});
	}

	render() {
		const { error, handleCloseError } = this.props;
		const { errorDismissed } = this.state;
		return (
			<div>
				<Dialog open={Boolean(!errorDismissed && error)}>
					<DialogTitle>Something went wrong.</DialogTitle>
					<DialogContent>
						<Typography>{ Boolean(error) && `${error.status} - ${error.message}` }</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.handleDismissError()}>Ok</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default ErrorMessage;
