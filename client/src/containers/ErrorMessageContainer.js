import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorActions } from '../actions';
import ErrorMessage from '../components/ErrorMessage';

class ErrorMessageContainer extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	handleClearError() {
		const { clearError } = this.props;
		clearError();
	}

	// TODO: add handler for error reporting

	render() {
		const { error } = this.props;

		return (
			<div>
				<ErrorMessage 
					error={error}
					handleClearError={this.handleClearError.bind(this)} 
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { 
		error: state.error
	}
};

export default connect(mapStateToProps, errorActions)(ErrorMessageContainer);
