import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions, errorActions } from '../actions';
import { getRedirectReferrer } from '../selectors';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Loader from '../components/Loader';
import ErrorMessageContainer from './ErrorMessageContainer';

const actions = {
	...authActions,
	...errorActions,
}

const STRINGS = {
	errorTitle_registration: 'Registration Error',
	errorMsg_passwordRequired: 'Please enter a password',
	errorMsg_passwordMissmatch: 'Passwords do not match',
	errorMsg_passwordLength: 'Password must be at least 8 characters long',
}

class AuthContainer extends Component {
	componentDidCatch(err, info) {
		console.log('AuthContainer componentDidCatch, err:', err)
	}

	handleNewRegistration(formData) {
		const { triggerErrorMessage } = this.props;

		console.log('handleNewRegistration', formData)

		// Check that password is entered 	<--------- this is never true. Handled by native html input pasword type?
		if (!formData.password) {
			triggerErrorMessage(
				new Error(STRINGS.errorTitle_registration),
				STRINGS.errorMsg_passwordRequired
			);

			return console.log('Please enter a password');
		}

		// Check that passwords match
		if (formData.password !== formData.password_confirm) {
			triggerErrorMessage(
				new Error(STRINGS.errorMsg_passwordMissmatch), 
				STRINGS.errorTitle_registration
			);

			return console.log('Passwords do not match');
		}

		// Check min length of password
		if (formData.password.length < 8) {
			triggerErrorMessage(
				new Error(STRINGS.errorMsg_passwordLength),
				STRINGS.errorTitle_registration
			);

			return console.log('Password must be at least 8 characters long')
		}

		this.props.postRegistration(formData);
	}

	handleLogin(formData) {
		this.props.login(formData);
	}

	render() {
		const { auth, from } = this.props;

		return auth.isAuthed ? 
		( <Redirect to={from} /> )
		:
		(
			<div>
				<ErrorMessageContainer />
				{ auth.loading ?
					<Loader />
					:
					<div>
						<LoginForm
							auth={auth}
							from={from}
							handleLogin={this.handleLogin.bind(this)}
						/>
						<Typography style={{marginTop: '50px', fontStyle: 'italic'}}>- or -</Typography>
						<RegistrationForm 
							auth={auth}
							handleNewRegistration={this.handleNewRegistration.bind(this)}
						/>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    from: getRedirectReferrer(state),
  }
}

export default connect(mapStateToProps, actions)(AuthContainer);
