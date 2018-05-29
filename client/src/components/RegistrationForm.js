import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
				marginTop: '50px',
				marginBottom: '80px',
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
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						type="password"
						name="password"
						label="Password"
						label="Password"
						placeholder="Choose a password"
					/>
				</div>
				<div>
					<Field 
						component={renderField}
						type="password"
						name="password_confirm"
						label="Confirm password"
						placeholder="Confirm password"
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