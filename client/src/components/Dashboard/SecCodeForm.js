import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
	Button,
	TextField,
} from '@material-ui/core';

const form = reduxForm({
	form: 'secCodeForm'
});

const renderField = ({
 input, 
 label, 
 meta: { pristine, touched, error }, 
 children, 
 ...custom 
}) => (
	<TextField
		label={label}
		{...input}
		{...custom}
	/>
);

const SecCodeForm = (props) => {
	const { 
		handleSubmitGDSecCode,
		handleSubmit,
	} = props;
	return (
		<form
			onSubmit={
				handleSubmit((formData) => {
					handleSubmitGDSecCode(formData);
				})
			}
		>
			<div>
				<Field 
					component={renderField}
					id="GD-sec-code"
					name="GDSecCode"
					label="Google Drive code"
					placeholder="Paste your security code here"
					type="password"
				/>
			</div>
			<div>
				<Button
					variant="outlined"
					type="submit"
				>
					Connect
				</Button>
			</div>
		</form>
	);
};

export default form(SecCodeForm);
