import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageActions } from '../actions';
import Alert from '../components/Alert';

class AlertContainer extends Component {
	handleSetAlert(alert) {
		this.props.setAlert(alert);
	}

	handleCancelAction() {
		console.log('handleCancelAction')
		this.props.clearAlert();
	}

	handleConfirmAction() {
		console.log('handleConfirmAction, pendingAction:', this.props.pendingAction)
		console.log('handleConfirmAction, pendingActionData:', this.props.pendingActionData)
		this.props.clearAlert();
		this.props.pendingAction(this.props.pendingActionData);
	}

	render() {
		const { alert, pendingAction } = this.props;
		if (alert) console.log('[LOG] alert:', alert)
	
		if (alert) {
			return (
				<Alert
					open={Boolean(alert)}
					headerText={ alert.headerText }
					bodyText={ alert.bodyText }
					cancleButtonText={ alert.cancleButtonText }
					confirmButtonText={ alert.confirmButtonText }
					handleCancelAction={ this.handleCancelAction.bind(this) }
					handleConfirmAction={ this.handleConfirmAction.bind(this) }
				/>
			);
		}
		return(<div />);
	}
}

const mapStateToProps = state => {
	return {
		alert: state.message.alert,
		pendingAction: state.message.pendingAction
	}
}

export default connect(mapStateToProps, messageActions)(AlertContainer);
