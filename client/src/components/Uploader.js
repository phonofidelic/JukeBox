import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

// Register uploader form
const form = reduxForm({
	form: 'uploaderForm'
})

// Set up file input component
// https://github.com/erikras/redux-form/issues/1989 @damonmaria commented on Mar 18, 2017
const adaptFileEventToValue = delegate => 
	e => {
		console.log('adaptFileEventToValue, e:', e)
		delegate(e.target.files[0]);
	}
const FileInput = ({
	input: {
		value: omitValue,
		onChange,
		onBlur,
		...inputProps
	},
	meta: omitMetta,
	...props
}) => (
	<input
		onChange={adaptFileEventToValue(onChange)}
		onBlur={adaptFileEventToValue(onBlur)}
		type="file"
		{...inputProps}
		{...props}
	/>
);

class Uploader extends Component {
	render() {
		const { 
			trackName, 
			handleUploadTrack,
			handleSubmit
		} = this.props;
	
		return (
			<form onSubmit={handleSubmit(handleUploadTrack)} style={{margin: '20px'}}>
				<Field
					type="text"
					component="input"
					name="trackName"
					value={trackName}
				/>
				<Field 
					type="file"
					component={FileInput}
					name="selectedFile"
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default form(Uploader);