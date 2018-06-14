import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { validation } from '../utils';

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
		label={Boolean(touched && error || custom.loginerr) ? error : label}
		error={Boolean(touched && error)}
		{...input}
		{...custom} 
	/>
);

class LoginForm extends Component {
	render() {
		const { 
			auth,
			handleLogin,
			handleSubmit,
			handleClearError,
		} = this.props;


		const styles = {
			root: {
				marginTop: '50px'
			},
			header: {
				margin: '10px'
			}
		}

		console.log('LoginForm, auth.loginErr:', Boolean(auth.loginErr))
		return (
			<form
				style={styles.root}
				onSubmit={handleSubmit(handleLogin)}
				onChange={auth.loginErr && handleClearError}
				auth={auth}
			>
				<div style={styles.header}>
					<Typography>
		        Sign in:
		      </Typography>
				</div>
				<div>
					<Field 
						component={renderField}
						type="email"
						name="email"
						label="Email"
						loginerr={auth.loginErr}
						validate={[validation.required, validation.email]}
						placeholder="Enter your email"
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						type="password"
						name="password"
						label="Password"
						loginerr={auth.loginErr}
						validate={[validation.required]}
						placeholder="Enter your password"
					/>
				</div>
				<div style={{marginTop: '20px'}}>
					<Button 
						variant="outlined"
						type="submit"
					>
						Sign in
					</Button>
				</div>
			</form>
		);
	}
}

export default form(LoginForm);