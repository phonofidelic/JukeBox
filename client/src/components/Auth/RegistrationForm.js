import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validation } from '../../utils';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const form = reduxForm({
	form: 'registrationForm'
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

class RegistrationForm extends Component {
	render() {
		const { 
			handleNewRegistration,
			handleSubmit,
		} = this.props;

		const styles = {
			root: {
				marginTop: 50,
				marginBottom: 40,
			},
			header: {
				margin: '10px',
			}
		}

		return (
			<form
				style={styles.root}
				onSubmit={handleSubmit(handleNewRegistration)}
			>
				<div style={styles.header}>
					<Typography>
		        Create a new account:
		      </Typography>
				</div>
				<div>
					<Field 
						component={renderField}
						data-cy="registration-email"
						id="registration-email"
						label="Email"
						name="email"
						placeholder="Enter your email"
						type="email"
						validate={[validation.required]}
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						data-cy="registration-password"
						id="registration-password"
						label="Password"
						name="password"
						placeholder="Choose a password"
						type="password"
						validate={[validation.required]}
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						data-cy="registration-password-confirm"
						id="registration-password-confirm"
						label="Confirm password"
						name="password_confirm"
						placeholder="Confirm password"
						type="password"
						validate={[validation.required]}
					/>
				</div>
				<div style={{marginTop: '20px'}}>
					<Button 
						data-cy="registration-button"
						type="submit"
						variant="outlined"
					>
						Register
					</Button>
				</div>
			</form>
		);
	}
}

export default form(RegistrationForm);