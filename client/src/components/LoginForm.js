import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
		label={label}
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
		} = this.props;


		const styles = {
			root: {
				marginTop: '50px'
			},
			header: {
				margin: '10px'
			}
		}

		return (
			<form
				style={styles.root}
				onSubmit={handleSubmit(handleLogin)}
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
						placeholder="Enter your email"
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						type="password"
						name="password"
						label="Password"
						label="Password"
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