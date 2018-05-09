import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withTheme } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { 
	Cancel,
	Done
} from 'material-ui-icons';
import Grid from 'material-ui/Grid';

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
			handleEditTrackData, 
			handleToggleEditMode,
			theme,
		} = this.props;

		const styles = {
			save: {
				color: theme.palette.context.success
			},
			cancel: {
				color: theme.palette.context.danger
			}
		}

		return (
			<form 
				style={{width: '100%'}} 
				onSubmit={
					handleSubmit((formData) => {
						handleEditTrackData(formData, track); 
						handleToggleEditMode();
					})
				}
			>
				<Grid container alignItems="center">
					<Grid item xs={6}>
						<Field 
							type="text"
							name="title"
							autoFocus
							component={renderField}
							label="Track title"
							placeholder={track.title}
						/>
						<Field 
							type="text"
							name="artist"
							component={renderField}
							label="Artist"
							placeholder={track.artist}
						/>
						<Field 
							type="text"
							name="album"
							component={renderField}
							label="Album"
							placeholder={track.album}
						/>
					</Grid>
					<Grid item xs={6}>
						<Grid container justify="flex-end">
							<IconButton title="Save changes" type="submit">
								<Done style={styles.save} />
							</IconButton>
							<IconButton title="Cancel" onClick={handleToggleEditMode}>
								<Cancel style={styles.cancel} />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</form>
		);
	}
}

export default withTheme()(form(EditTrackForm));
