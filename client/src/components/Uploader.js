import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import Upload from 'material-ui-upload/Upload';

const FILE_FIELD_NAME = 'audioFiles';

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

const MaterialUiFileInput = () => (
	<Upload label="Add" />
);

export class Uploader extends Component {
	renderDropzoneInput(field) {
    const files = field.input.value;

    return (
      <div>
        <Dropzone
          name={field.name}
          onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
        >
          {
            field.meta.touched && 
            field.meta.error &&
            <span className="error">{field.meta.error}</span>
          }
          {
            files && Array.isArray(files) &&
            <ul>
              { files.map((file, i) => <li key={i}>{file.name}</li>) }
            </ul>
          }
        </Dropzone>
      </div>
    );
  }

	render() {
		const { 
			trackName, 
			handleUploadTrack,
			handleUploadTracks,
			handleSubmit,
			reset
		} = this.props;
		return (
			<form onSubmit={handleSubmit(handleUploadTracks)} style={{margin: '20px'}}>
				<div>
					{/*
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
					<Button type="submit">Submit</Button>
				*/}
				</div>

				<div>
					<div>
            <label htmlFor={FILE_FIELD_NAME}>Files</label>
            <Field name={FILE_FIELD_NAME} component={this.renderDropzoneInput} />
          </div>
          <div>
            <button type="submit">Submit</button>
            <button onClick={() => reset()}>Clear Values</button>
          </div>
				</div>
			</form>
		);
	}
}

export default form(Uploader);
