import React, { Component } from 'react';
import { connect } from 'react-redux';
import { messageActions } from '../actions';
import Message from '../components/Message';

class MessageContainer extends Component {
	handleClearMessage() {
		console.log('Snackbar is closed!');
		this.props.clearMessage();
	}

	render() {
		const { messages, trackList } = this.props;
		return (
			<Message messageData={trackList.message.text} context={trackList.message.context} handleClearMessage={this.handleClearMessage.bind(this)} />
		);
	}
}

const mapStateToProps = state => {
	return {
		messages: state.messages,
		trackList: state.trackList
	}
}

export default connect(mapStateToProps, messageActions)(MessageContainer);