import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { 
	Button,
	TextField,
	Typography
} from '@material-ui/core';
import { validation } from '../../utils';

const form = reduxForm({
	form: 'loginForm'
});

const renderField = ({
 input, 
 label, 
 meta: { touched, error }, 
 children, 
 ...custom 
}) => (
	<TextField
		label={Boolean(touched && error) ? error : label}
		error={Boolean(touched && error)}
		{...input}
		{...custom} 
	/>
);

export class LoginForm extends Component {
	render() {
		const { 
			auth,
			handleLogin,
			handleSubmit,
		} = this.props;


		const styles = {
			root: {
				marginTop: '50px'
			},
			header: {
				margin: '10px'
			}
		}

		// console.log('LoginForm, auth.loginErr:', Boolean(auth.loginErr))
		return (
			<form
				style={styles.root}
				onSubmit={handleSubmit(handleLogin)}
				auth={auth}
			>
				<div style={styles.header}>
					<Typography>
		        Sign in:
		      </Typography>
				</div>
				<div>
					<Field 
						id="signin-email"
						component={renderField}
						type="email"
						name="email"
						label="Email"
						aria-label="Email"
						validate={[validation.required, validation.email]}
						placeholder="Enter your email"
						data-cy="signin-email"
					/>
				</div>
				<div>
					<Field
						id="signin-password"
						component={renderField}
						type="password"
						name="password"
						label="Password"
						aria-label="Password"
						validate={[validation.required]}
						placeholder="Enter your password"
						data-cy="signin-password"
					/>
				</div>
				<div style={{marginTop: '20px'}}>
					<Button 
						variant="outlined"
						type="submit"
						data-cy="signin-button"
					>
						Sign in
					</Button>
				</div>
			</form>
		);
	}
}

LoginForm.propTypes = {
	auth: PropTypes.object.isRequired,
	handleLogin: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default form(LoginForm);
