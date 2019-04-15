import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'; 
import DialogActions from '@material-ui/core/Dialog/DialogActions',
import DialogContent from '@material-ui/core/Dialog/DialogContent',
import DialogContentText from '@material-ui/core/Dialog/DialogContentText',
import DialogTitle from '@material-ui/core/Dialog/DialogTitle',

class Alert extends Component {
	handleClose() {

	}

	render() {
		const {
			open,
			headerText,
			bodyText,
			cancleButtonText,
			confirmButtonText,
			handleCancelAction,
			handleConfirmAction
		} = this.props;

		return (
			<Dialog
				open={open}
				onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{headerText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {bodyText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancelAction()} color="primary" autoFocus>
            {cancleButtonText}
          </Button>
          <Button onClick={() => handleConfirmAction()} color="primary">
            {confirmButtonText}
          </Button>
        </DialogActions>
			</Dialog>
		);
	}
}

export default Alert;