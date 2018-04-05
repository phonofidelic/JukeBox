import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { withTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { 
	Cancel,
	Done
} from 'material-ui-icons';

const form = reduxForm({
	form: 'editTrackForm'
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

class EditTrackForm extends Component {
	render() {
		const { 
			track, 
			handleSubmit, 
			handlePostTrackData, 
			handleToggleEditMode 
		} = this.props;
		// const styles = {
		// 	save: {
		// 		color: theme.palette.context.success
		// 	},
		// 	cancel: {
		// 		color: theme.palette.context.danger
		// 	}
		// }

		return (
			<form 
				onSubmit={handleSubmit((formData) => handlePostTrackData(formData, track))}
				style={{display: 'flex'}}>
					<Field 
						type="text"
						name="name"
						autoFocus
						component={renderField}
						label="Track name"
						value={track.name}
					/>
					<div style={{flex: 'flex-end'}}>
					<IconButton 
						title="Save changes"
						type="submit"
					>
						<Done />
					</IconButton>
					<IconButton 
						title="Cancel"
						onClick={handleToggleEditMode}
					>
						<Cancel />
					</IconButton>
					</div>
			</form>
		);
	}
}

export default form(EditTrackForm);
