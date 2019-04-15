import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import posed from 'react-pose';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const STRINGS = {
	errorTitle_registration: 'Registration Error',
	errorMsg_passwordRequired: 'Please enter a password',
	errorMsg_passwordMissmatch: 'Passwords do not match',
	errorMsg_passwordLength: 'Password must be at least 8 characters long',
};

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

class Auth extends Component {
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

		return (
			<div>
				<Reveal pose={this.state.showLogin ? 'visible' : 'hidden' }>
					<LoginForm
						auth={auth}
						from={from}
						handleLogin={this.handleLogin.bind(this)}
					/>
				</Reveal>
				{ !this.state.showLogin && 
					<Button 
						onClick={() => this.handleSignInReveal()} 
						data-cy="signin-reveal"
					>Sign in
					</Button> 
				}
				<Typography style={{marginTop: '50px', marginBottom: '50px', fontStyle: 'italic'}}>- or -</Typography>
				<Reveal pose={this.state.showRegistration ? 'visible' : 'hidden' }>
					<RegistrationForm 
						auth={auth}
						handleNewRegistration={this.handleNewRegistration.bind(this)}
					/>
				</Reveal>
				{ !this.state.showRegistration && 
					<Button 
						onClick={() => this.handleRegistrationReveal()}
						data-cy="registration-reveal"
					>Regeister
					</Button> 
				}
			</div>
		);
	}
}



export default Auth;
