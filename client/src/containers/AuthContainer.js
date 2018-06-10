import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

class AuthContainer extends Component {
	handleNewRegistration(formData) {
		console.log('handleNewRegistration', formData)

		// TODO: Finish registration form validation
		// Check that password is entered
		if (!formData.password) {
			return console.log('Please enter a password')
		}
		// Check that passwords match
		if (formData.password !== formData.password_confirm) {
			return console.log('Passwords do not match')
		}
		// Check min length of password
		if (formData.password.length < 8) {
			return console.log('Password must be at least 8 characters long')
		}

		this.props.postRegistration(formData);
	}

	handleLogin(formData) {
		
    	
		console.log('handleLogin', formData)

		this.props.login(formData);
	}

	handleClearError() {
		this.props.clearError();
	}

	render() {
		const { auth, from } = this.props;

		if (auth.isAuthed) {
			<Redirect to={from} />
		}

		return (
			<div>
				<LoginForm
					auth={auth}
					from={from}
					handleLogin={this.handleLogin.bind(this)}
					handleClearError={this.handleClearError.bind(this)}
				/>
				<Typography style={{marginTop: '50px', fontStyle: 'italic'}}>- or -</Typography>
				<RegistrationForm 
					auth={auth}
					handleNewRegistration={this.handleNewRegistration.bind(this)}
				/>
			</div>
		);
	}
}

const getRedirectReferrer = (state) => {
	return state.router.location.pathname;
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    from: getRedirectReferrer(state),
  }
}

export default connect(mapStateToProps, authActions)(AuthContainer);
