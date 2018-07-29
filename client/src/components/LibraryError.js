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

class LibraryError extends Component {
	render() {
		const { error, handleCloseError } = this.props;
		return (
			<div>
				<Dialog open={Boolean(error)}>
					<DialogTitle>Something went wrong.</DialogTitle>
					<DialogContent>
						<Typography>{ error && error.data.message }</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleCloseError()}>Ok</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default LibraryError;
