import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

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
						<Button 
							data-cy="error-dismiss-button"
							variant="outlined" 
							onClick={() => handleClearError()}
						>
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

ErrorMessage.propTypes = {
	error: PropTypes.shape({
		showError: PropTypes.bool.isRequired,
		title: PropTypes.string,
		status: PropTypes.number,
		message: PropTypes.string,
	}),
	handleClearError: PropTypes.func.isRequired
}

export default ErrorMessage;
