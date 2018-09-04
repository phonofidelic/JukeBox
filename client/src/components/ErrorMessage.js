import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

	render() {
		const { 
			error, 
			handleClearError,
		} = this.props;

		return (
			<div>
				<Dialog open={error.showError}>
					<DialogTitle>{error.title}</DialogTitle>
					<DialogContent>
						<Typography>{error.status && `${error.status} - `}{error.message}</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleClearError()}>Ok</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

ErrorMessage.propTypes = {
	error: PropTypes.object.isRequired,
	handleClearError: PropTypes.func.isRequired,
}

export default ErrorMessage;
