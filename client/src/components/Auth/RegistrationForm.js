import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { validation } from '../../utils';

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
		label={label}
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
						type="email"
						name="email"
						label="Email"
						placeholder="Enter your email"
						validate={[validation.required]}
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						type="password"
						name="password"
						label="Password"
						placeholder="Choose a password"
						validate={[validation.required]}
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						type="password"
						name="password_confirm"
						label="Confirm password"
						placeholder="Confirm password"
						validate={[validation.required]}
					/>
				</div>
				<div style={{marginTop: '20px'}}>
					<Button 
						variant="outlined"
						type="submit"
					>
						Register
					</Button>
				</div>
			</form>
		);
	}
}

export default form(RegistrationForm);