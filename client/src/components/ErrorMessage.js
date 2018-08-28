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
		const { error, handleClearError } = this.props;
		const { errorDismissed } = this.state;
		return (
			<div>
				<Dialog open={error.showError}>
					<DialogTitle>Something went wrong.</DialogTitle>
					<DialogContent>
						<Typography>{`${error.status} - ${error.message}` }</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleClearError()}>Ok</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default ErrorMessage;
