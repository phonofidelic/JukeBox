import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageActions } from '../actions';
import Message from '../components/Message';
import { CLEAR_MESSAGE } from '../actiontypes'

class MessageContainer extends Component {
	handleClearMessage() {
		console.log('Snackbar is closed!');
		this.props.clearMessage();
	}

	render() {
		const { message } = this.props;
		if (message) console.log('MessageContainer, messages', message)

		if (message) 
			return (
				<Message 
					open={Boolean(message)}
					text={message.text}
					context={message.context} 
					handleClearMessage={this.handleClearMessage.bind(this)} 
				/>
			)
		

		return (
			<Message open={Boolean(message)} />
		)
	}
}

// Selector checks for current message
const getMessage = state => {
	for (const reducer in state) {
		if (state[reducer].message) {
			return state[reducer].message
		}
	}
}

const getMessages = state => {

}

const mapStateToProps = state => {
	return {
		message: state.messages.message
	}
}

export default connect(mapStateToProps, messageActions)(MessageContainer);