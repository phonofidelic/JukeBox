import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authActions, errorActions } from '../actions';
import { getRedirectReferrer } from '../selectors';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Loader from '../components/Loader';
import ErrorMessageContainer from './ErrorMessageContainer';
import posed from 'react-pose';
import { Button, Typography } from '@material-ui/core';

const actions = {
	...authActions,
	...errorActions,
};

const STRINGS = {
	errorTitle_registration: 'Registration Error',
	errorMsg_passwordRequired: 'Please enter a password',
	errorMsg_passwordMissmatch: 'Passwords do not match',
	errorMsg_passwordLength: 'Password must be at least 8 characters long',
};

// const Section = posed.div({
//   visible: { opacity: 1 },
//   hidden: { opacity: 0 }
// });

const Reveal = posed.div({
  visible: { 
  	height: '100%', 
  	opacity: 1,
  },
  hidden: { 
  	height: '0px',
  	opacity: 0,
  }
});

class AuthContainer extends Component {
	state = {
		showLogin: false,
		showRegistration: false,
	}

	componentDidCatch(err, info) {
		console.log('AuthContainer componentDidCatch, err:', err)
	}

	handleSignInReveal = () => {
		this.setState(state => ({
			showLogin: true,
			showRegistration: false,
		}));
	}

	handleRegistrationReveal = () => {
		this.setState(state => ({
			showLogin: false,
			showRegistration: true,
		}));
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
			<div style={{paddingTop: '50px', paddingBottom: '50px'}}>
				<ErrorMessageContainer />
				{ auth.loading ?
					<Loader />
					:
					<div>
						<Reveal pose={this.state.showLogin ? 'visible' : 'hidden' }>
								<LoginForm
									auth={auth}
									from={from}
									handleLogin={this.handleLogin.bind(this)}
								/>
						</Reveal>
						{ !this.state.showLogin && <Button onClick={() => this.handleSignInReveal()}>Sign in</Button> }
						<Typography style={{marginTop: '50px', marginBottom: '50px', fontStyle: 'italic'}}>- or -</Typography>
						<Reveal pose={this.state.showRegistration ? 'visible' : 'hidden' }>
							<RegistrationForm 
								auth={auth}
								handleNewRegistration={this.handleNewRegistration.bind(this)}
							/>
						</Reveal>
						{ !this.state.showRegistration && <Button onClick={() => this.handleRegistrationReveal()}>Regeister</Button> }
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
