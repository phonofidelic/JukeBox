import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Typography from 'material-ui/Typography';

class AuthContainer extends Component {
	handleLogin(formData) {
		console.log('handleLogin', formData)
		this.props.login(formData);
	}

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

	render() {
		return (
			<div>
				<LoginForm
					handleLogin={this.handleLogin.bind(this)}
				/>
				<Typography style={{marginTop: '50px', fontStyle: 'italic'}}>- or -</Typography>
				<RegistrationForm 
					handleNewRegistration={this.handleNewRegistration.bind(this)}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, authActions)(AuthContainer);
